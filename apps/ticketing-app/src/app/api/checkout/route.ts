import { NextResponse } from 'next/server';
import { createAdminClient } from '@soulfest/core-logic';
import { ID, Query } from 'node-appwrite';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, fullName, itemId, quantity } = body;

    if (!email || !itemId || !quantity) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const adminClient = createAdminClient(process.env.APPWRITE_API_KEY as string);
    const databases = new (await import('node-appwrite')).Databases(adminClient);

    const DB_ID = 'soulfest_db';

    // 1. Check or Create Customer Profile
    let customerProfileId = null;
    let authUserId = null;

    const profileQuery = await databases.listDocuments(DB_ID, 'customer_profiles', [
      Query.equal('email', email)
    ]);

    if (profileQuery.total > 0) {
      customerProfileId = profileQuery.documents[0].$id;
      authUserId = profileQuery.documents[0].userId;
    } else {
      // Create new Auth User using Admin Client
      const users = new (await import('node-appwrite')).Users(adminClient);
      const newAuthUser = await users.create(ID.unique(), email, undefined, undefined, 'Guest' + Date.now()); // random password logic usually needed, but for guests random pass or Appwrite 1.4 token is fine
      
      authUserId = newAuthUser.$id;
      
      const newProfile = await databases.createDocument(DB_ID, 'customer_profiles', ID.unique(), {
        userId: authUserId,
        email: email,
        fullName: fullName || '',
        isGuest: true
      });
      customerProfileId = newProfile.$id;
    }

    // 2. Fetch Item to verify price and stock
    const item = await databases.listDocuments(DB_ID, 'items', [Query.equal('itemId', itemId)]);
    if (item.total === 0) return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    
    const ticketItem = item.documents[0];
    if (ticketItem.remainingQty < quantity) {
       return NextResponse.json({ error: 'Insufficient stock' }, { status: 400 });
    }

    const totalAmount = ticketItem.price * quantity;

    // 3. Create Draft Order
    const orderNo = 'ORD-' + Math.floor(1000 + Math.random() * 9000);
    const newOrder = await databases.createDocument(DB_ID, 'orders', ID.unique(), {
      orderId: ID.unique(),
      orderNo: orderNo,
      orderDate: new Date().toISOString(),
      userId: authUserId,
      totalQuantity: parseInt(quantity),
      totalAmount: totalAmount,
      status: 'draft',
      remarks: 'Guest checkout initiated'
    });

    // 4. Create Order Items
    await databases.createDocument(DB_ID, 'order_items', ID.unique(), {
      orderItemId: ID.unique(),
      orderId: newOrder.orderId,
      itemId: itemId,
      quantity: parseInt(quantity),
      price: ticketItem.price
    });

    // 5. Decrement Stock
    await databases.updateDocument(DB_ID, 'items', ticketItem.$id, {
      remainingQty: ticketItem.remainingQty - quantity
    });

    // 6. Establish 1-Hour Guest Session Persistence
    const response = NextResponse.json({ success: true, orderNo: orderNo, authUserId });
    
    response.cookies.set('guest_email', email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600, // 1 Hour
      path: '/'
    });

    return response;
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

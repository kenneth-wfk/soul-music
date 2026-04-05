import { NextResponse } from 'next/server';
import { createAdminClient } from '@soulfest/core-logic';
import { Query } from 'node-appwrite';

export async function GET(req: Request, { params }: { params: Promise<{ orderNo: string }> }) {
  try {
    const { orderNo } = await params;
    const url = new URL(req.url);
    
    // 1. Try taking email from the request URL
    let email = url.searchParams.get('email');
    
    // 2. If it is missing, heavily rely on the encrypted HttpOnly session cookie
    if (!email) {
      const cookieHeader = req.headers.get('cookie') || '';
      const match = cookieHeader.match(/guest_email=([^;]+)/);
      if (match) email = decodeURIComponent(match[1]);
    }

    if (!orderNo || !email) {
      return NextResponse.json({ error: 'Order Number and Email required (No active session found)' }, { status: 401 });
    }

    const adminClient = createAdminClient(process.env.APPWRITE_API_KEY as string);
    const databases = new (await import('node-appwrite')).Databases(adminClient);

    const DB_ID = 'soulfest_db';

    // Verify Guest Email against Profiles
    const profileRes = await databases.listDocuments(DB_ID, 'customer_profiles', [
      Query.equal('email', email)
    ]);

    if (profileRes.total === 0) {
      return NextResponse.json({ error: 'No order found matching these credentials.' }, { status: 404 });
    }
    const userId = profileRes.documents[0].userId;

    // Fetch the Order securely matching both ID and user constraint
    const orderRes = await databases.listDocuments(DB_ID, 'orders', [
      Query.equal('orderNo', orderNo),
      Query.equal('userId', userId)
    ]);

    if (orderRes.total === 0) {
      return NextResponse.json({ error: 'No order found matching these credentials.' }, { status: 404 });
    }

    const order = orderRes.documents[0];

    // Fetch related Items (optional but helpful for UI)
    const orderItemsRes = await databases.listDocuments(DB_ID, 'order_items', [
      Query.equal('orderId', order.orderId)
    ]);

    return NextResponse.json({ 
      order: order, 
      items: orderItemsRes.documents 
    });

  } catch (error: any) {
    console.error('Order retrieval error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { createAdminClient } from '@soulfest/core-logic';
import { Query } from 'node-appwrite';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    if (!cookieStore.get('admin_auth')?.value) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const adminClient = createAdminClient(process.env.APPWRITE_API_KEY as string);
    const databases = new (await import('node-appwrite')).Databases(adminClient);
    const DB_ID = 'soulfest_db';

    // Fetch orders pending verification
    const pendingOrdersRes = await databases.listDocuments(DB_ID, 'orders', [
      Query.equal('status', 'pending_verification'),
      Query.orderDesc('orderDate')
    ]);

    // Also fetch users to attach Customer Names (optional optimization, Appwrite doesn't do SQL JOINs natively)
    // For now we map orders up. If CustomerProfiles is needed, we map them.
    const ordersWithProfiles = await Promise.all(pendingOrdersRes.documents.map(async (order: any) => {
       const profiles = await databases.listDocuments(DB_ID, 'customer_profiles', [
           Query.equal('userId', order.userId)
       ]);
       return {
           ...order,
           customerName: profiles.total > 0 ? profiles.documents[0].fullName || profiles.documents[0].email : 'Unknown Profile'
       }
    }));

    // Fetch generic metrics (Sales, Tickets Sold)
    const allOrders = await databases.listDocuments(DB_ID, 'orders', [
       Query.equal('status', 'paid')
    ]);
    const totalSales = allOrders.documents.reduce((acc: number, cur: any) => acc + cur.totalAmount, 0);
    const totalTicketsSold = allOrders.documents.reduce((acc: number, cur: any) => acc + cur.totalQuantity, 0);

    return NextResponse.json({ 
        orders: ordersWithProfiles,
        metrics: {
           pendingCount: pendingOrdersRes.total,
           totalSales,
           totalTicketsSold
        }
    });

  } catch (error: any) {
    console.error('Admin orders fetch error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

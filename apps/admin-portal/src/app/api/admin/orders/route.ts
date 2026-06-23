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
    // Optimized: Fetch all necessary customer profiles in a single query
    const uniqueUserIds = Array.from(new Set(pendingOrdersRes.documents.map((o: any) => o.userId)));

    const profileMap: Record<string, any> = {};
    if (uniqueUserIds.length > 0) {
      // Process in chunks of 100 to avoid any potential Appwrite query limit
      const chunkSize = 100;
      for (let i = 0; i < uniqueUserIds.length; i += chunkSize) {
        const chunk = uniqueUserIds.slice(i, i + chunkSize);
        const profilesRes = await databases.listDocuments(DB_ID, 'customer_profiles', [
            Query.equal('userId', chunk),
            Query.limit(chunkSize)
        ]);
        for (const profile of profilesRes.documents) {
            profileMap[profile.userId] = profile;
        }
      }
    }

    const ordersWithProfiles = pendingOrdersRes.documents.map((order: any) => {
       const profile = profileMap[order.userId];
       return {
           ...order,
           customerName: profile ? (profile.fullName || profile.email) : 'Unknown Profile'
       }
    });

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

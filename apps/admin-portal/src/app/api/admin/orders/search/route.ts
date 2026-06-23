import { NextResponse } from 'next/server';
import { createAdminClient } from '@soulfest/core-logic';
import { Query } from 'node-appwrite';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    if (!cookieStore.get('admin_auth')?.value) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const filterOrderNo = searchParams.get('orderNo');
    const filterCustomer = searchParams.get('customer'); // Note: exact match only for now
    const filterStatus = searchParams.get('status');

    const adminClient = createAdminClient(process.env.APPWRITE_API_KEY as string);
    const databases = new (await import('node-appwrite')).Databases(adminClient);
    const DB_ID = 'soulfest_db';

    // 1. Resolve Queries
    const queries: string[] = [Query.orderDesc('orderDate')];

    // Status Filter
    if (filterStatus && filterStatus !== 'all') {
      queries.push(Query.equal('status', filterStatus));
    }

    // Exact Match OrderNo Filter
    if (filterOrderNo) {
      queries.push(Query.equal('orderNo', filterOrderNo));
    }

    // Customer Name Filter (Requires mapping first, or fetching orders and filtering)
    // Because customerName is NOT stored on orders natively (only userId is), we shouldn't natively Query.equal on customerName directly on Orders schema
    // For now, we will fetch Orders, then merge Customer metadata. If a Customer filter exists, we filter down AFTER merging.

    const allOrdersRes = await databases.listDocuments(DB_ID, 'orders', queries);

    // Fetch and merge customer info - Optimized to prevent N+1 queries
    const uniqueUserIds = Array.from(new Set(allOrdersRes.documents.map(o => o.userId).filter(Boolean)));
    const profileMap: Record<string, { fullName?: string, email?: string }> = {};

    if (uniqueUserIds.length > 0) {
      try {
        // Appwrite limit for queries is generally 100, so we chunk just in case
        const chunkSize = 100;
        for (let i = 0; i < uniqueUserIds.length; i += chunkSize) {
          const chunk = uniqueUserIds.slice(i, i + chunkSize);
          const profilesRes = await databases.listDocuments(DB_ID, 'customer_profiles', [
            Query.equal('userId', chunk),
            Query.limit(chunkSize)
          ]);

          profilesRes.documents.forEach((profile) => {
            profileMap[profile.userId as string] = profile as { fullName?: string, email?: string };
          });
        }
      } catch (error) {
        console.error('Error fetching batch customer profiles:', error);
      }
    }

    let enrichedOrders = allOrdersRes.documents.map((order) => {
      const profile = profileMap[order.userId as string];

      return {
        ...order,
        customerName: profile ? (profile.fullName || profile.email) : 'Unknown User',
        customerEmail: profile ? profile.email : ''
      };
    });

    // Post-merge filters
    if (filterCustomer) {
        enrichedOrders = enrichedOrders.filter(o => 
             (o.customerName as string).toLowerCase() === filterCustomer.toLowerCase() ||
             (o.customerEmail as string).toLowerCase() === filterCustomer.toLowerCase()
        );
    }

    return NextResponse.json({ 
        total: enrichedOrders.length,
        orders: enrichedOrders 
    });

  } catch (error) {
    console.error('Order search error:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

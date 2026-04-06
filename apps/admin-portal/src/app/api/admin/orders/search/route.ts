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

    // Fetch and merge customer info
    let enrichedOrders = await Promise.all(allOrdersRes.documents.map(async (order: any) => {
        try {
            const profiles = await databases.listDocuments(DB_ID, 'customer_profiles', [
                Query.equal('userId', order.userId)
            ]);
            return {
                ...order,
                customerName: profiles.total > 0 ? (profiles.documents[0].fullName || profiles.documents[0].email) : 'Unknown User',
                customerEmail: profiles.total > 0 ? profiles.documents[0].email : ''
            };
        } catch {
            return {
                ...order,
                customerName: 'Unknown User',
                customerEmail: ''
            }
        }
    }));

    // Post-merge filters
    if (filterCustomer) {
        enrichedOrders = enrichedOrders.filter(o => 
             o.customerName.toLowerCase() === filterCustomer.toLowerCase() || 
             o.customerEmail.toLowerCase() === filterCustomer.toLowerCase()
        );
    }

    return NextResponse.json({ 
        total: enrichedOrders.length,
        orders: enrichedOrders 
    });

  } catch (error: any) {
    console.error('Order search error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

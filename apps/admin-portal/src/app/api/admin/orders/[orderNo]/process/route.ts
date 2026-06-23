import { NextResponse } from 'next/server';
import { createAdminClient } from '@soulfest/core-logic';
import { Query, ID } from 'node-appwrite';
import { cookies } from 'next/headers';

export async function POST(req: Request, { params }: { params: Promise<{ orderNo: string }> }) {
  try {
    const cookieStore = await cookies();
    if (!cookieStore.get('admin_auth')?.value) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { orderNo } = await params;
    const body = await req.json();
    const { action } = body; // 'approve' or 'reject'

    if (!orderNo || !action) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const adminClient = createAdminClient(process.env.APPWRITE_API_KEY as string);
    const databases = new (await import('node-appwrite')).Databases(adminClient);
    const DB_ID = 'soulfest_db';

    // 1. Fetch target order
    const orderRes = await databases.listDocuments(DB_ID, 'orders', [
      Query.equal('orderNo', orderNo)
    ]);

    if (orderRes.total === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    const order = orderRes.documents[0];

    // 2. Fetch order items
    const orderItemsRes = await databases.listDocuments(DB_ID, 'order_items', [
      Query.equal('orderId', order.orderId)
    ]);

    if (action === 'approve') {
      // Mark as paid
      await databases.updateDocument(DB_ID, 'orders', order.$id, {
        status: 'paid',
        remarks: 'Approved by admin'
      });

      // Generate Tickets
      const ticketPromises = [];
      for (const orderItem of orderItemsRes.documents) {
        for (let i = 0; i < orderItem.quantity; i++) {
            const ticketNo = 'TIC-' + Math.random().toString(36).substr(2, 9).toUpperCase();
            ticketPromises.push(databases.createDocument(DB_ID, 'tickets', ID.unique(), {
                ticketId: ID.unique(),
                orderItemId: orderItem.orderItemId,
                userId: order.userId,
                ticketNo: ticketNo,
                qrCodeData: `https://verify.soulfest.com/?t=${ticketNo}`, // simple deterministic URL
                isScanned: false
            }));
        }
      }
      await Promise.all(ticketPromises);

      return NextResponse.json({ success: true, message: 'Order approved and tickets generated.' });
    } 
    else if (action === 'reject') {
      // Mark as cancelled
      await databases.updateDocument(DB_ID, 'orders', order.$id, {
        status: 'cancelled',
        remarks: 'Bank slip rejected by admin',
        cancelledAt: new Date().toISOString()
      });

      // Restore Inventory Quantities
      const itemIds = orderItemsRes.documents.map((doc: any) => doc.itemId);
      const uniqueItemIds = Array.from(new Set(itemIds));

      if (uniqueItemIds.length > 0) {
          const itemsRes = await databases.listDocuments(DB_ID, 'items', [
              Query.equal('itemId', uniqueItemIds)
          ]);

          const itemsMap = new Map(itemsRes.documents.map((doc: any) => [doc.itemId, doc]));

          const restorePromises = orderItemsRes.documents.map((orderItem: any) => {
              const actualItem = itemsMap.get(orderItem.itemId);
              if (actualItem) {
                  return databases.updateDocument(DB_ID, 'items', actualItem.$id, {
                      remainingQty: actualItem.remainingQty + orderItem.quantity
                  });
              }
              return Promise.resolve();
          });

          await Promise.all(restorePromises);
      }

      return NextResponse.json({ success: true, message: 'Order rejected and inventory restored.' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error: any) {
    console.error('Process order error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

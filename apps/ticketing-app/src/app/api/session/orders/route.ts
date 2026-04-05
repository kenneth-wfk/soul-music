import { NextResponse } from 'next/server';
import { createAdminClient } from '@soulfest/core-logic';
import { Query } from 'node-appwrite';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const guestEmailRaw = cookieStore.get('guest_email')?.value;
    
    if (!guestEmailRaw) {
      return NextResponse.json({ orders: [] }); // No active session
    }
    
    const email = decodeURIComponent(guestEmailRaw);
    const adminClient = createAdminClient(process.env.APPWRITE_API_KEY as string);
    const databases = new (await import('node-appwrite')).Databases(adminClient);
    const DB_ID = 'soulfest_db';

    // Verify Guest Email
    const profileRes = await databases.listDocuments(DB_ID, 'customer_profiles', [
      Query.equal('email', email)
    ]);

    if (profileRes.total === 0) {
      return NextResponse.json({ orders: [] });
    }
    
    const userId = profileRes.documents[0].userId;

    // Fetch Orders
    const orderRes = await databases.listDocuments(DB_ID, 'orders', [
      Query.equal('userId', userId)
    ]);

    return NextResponse.json({ orders: orderRes.documents });

  } catch (error: any) {
    console.error('Session orders retrieval error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

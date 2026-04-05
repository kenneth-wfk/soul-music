"use client";
import React, { use, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { AppShell } from '../../../components/AppShell';

function OrderDetailsContent({ orderNo }: { orderNo: string }) {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const { data, isLoading, error } = useQuery({
    queryKey: ['order', orderNo, email],
    queryFn: async () => {
      const res = await fetch(`/api/orders/${orderNo}?email=${encodeURIComponent(email || '')}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      return json;
    },
    enabled: !!orderNo,
    retry: false
  });

  if (isLoading) return <AppShell title="Order"><div className="p-10 text-center text-slate-400">Locating your slip...</div></AppShell>;
  if (error) return <AppShell title="Order"><div className="p-10 text-center font-bold text-red-500 bg-red-50 m-6 rounded-2xl">{error.message}</div></AppShell>;

  const order = data?.order;

  return (
    <AppShell title={`Order ${orderNo}`}>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden">
          {/* Status Indicator */}
          <div className={`absolute top-0 right-0 px-4 py-1.5 rounded-bl-xl text-[10px] font-black uppercase tracking-widest text-white ${
            order.status === 'draft' ? 'bg-orange-500' :
            order.status === 'pending_verification' ? 'bg-blue-500' :
            order.status === 'paid' ? 'bg-[#008080]' : 'bg-red-500'
          }`}>
            {order.status.replace('_', ' ')}
          </div>
          
          <h2 className="text-xl font-black text-slate-900 mb-1">{order.orderNo}</h2>
          <p className="text-xs font-semibold text-slate-500 mb-6">Secured on {new Date(order.orderDate).toLocaleDateString()}</p>
          
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex justify-between items-center">
            <div>
               <p className="font-bold text-slate-800 uppercase tracking-widest text-[10px]">Total Due</p>
               <span className="font-black text-[#FF1493] text-2xl">RM {(order.totalAmount).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {order.status === 'draft' && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border top-3 border-orange-200">
            <h3 className="font-black text-slate-900 mb-2 leading-tight">Bank Slip Required</h3>
            <p className="text-xs text-slate-500 mb-4 font-medium leading-relaxed">
              Your tickets are temporarily reserved. To confirm, transfer RM {order.totalAmount.toFixed(2)} to <strong>Soulfest Sdn Bhd (Maybank 5123 4567 8900)</strong> and upload the receipt below.
            </p>
            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
               <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">📄</span>
               <p className="text-sm font-bold text-slate-600">Tap to browse file...</p>
            </div>
            <button className="w-full bg-slate-900 focus:outline-none hover:bg-slate-800 text-white font-bold py-3.5 mt-4 rounded-xl text-xs uppercase tracking-wider transition-transform active:scale-95 shadow-md">
                Upload & Submit
            </button>
          </div>
        )}

        {order.status === 'paid' && (
           <div className="bg-gradient-to-tr from-[#008080] to-teal-400 p-8 rounded-3xl text-white text-center shadow-lg relative overflow-hidden">
               <div className="relative z-10">
                   <div className="text-5xl mb-4">🎉</div>
                   <h2 className="text-2xl font-black mb-2">You're going to Soulfest!</h2>
                   <p className="text-sm font-medium opacity-90">Your payment has been verified. Tickets have been issued.</p>
                   {/* E-Ticket Display Placeholder */}
                   <div className="mt-6 bg-white p-4 rounded-2xl text-slate-900 flex items-center justify-center h-32 border-4 border-teal-500/30">
                       <p className="font-black opacity-30">[ QR CODE SECURELY LOCKED ]</p>
                   </div>
               </div>
           </div>
        )}

        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 text-center">
             <span className="text-2xl block mb-2">🎁</span>
             <h4 className="text-sm font-black text-blue-900 mb-1">Claim your permanent account</h4>
             <p className="text-xs text-blue-700 mb-3">Guests can safely attach a password to keep tickets permanently.</p>
             <button className="text-[10px] font-black uppercase tracking-widest bg-blue-600 text-white px-4 py-2 rounded-full">Sign Up</button>
        </div>
      </div>
    </AppShell>
  );
}

export default function OrderDetailsPage(props: { params: Promise<{ orderNo: string }> }) {
  const params = use(props.params); 
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <OrderDetailsContent orderNo={params.orderNo} />
    </Suspense>
  );
}

"use client";
import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { databases } from '@soulfest/core-logic';
import { Query } from 'appwrite';
import { AppShell } from '../../components/AppShell';

function CheckoutForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const itemId = searchParams.get('itemId');

  const [quantity, setQuantity] = useState(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const { data: ticket, isLoading } = useQuery({
    queryKey: ['ticket', itemId],
    queryFn: async () => {
      const response = await databases.listDocuments('soulfest_db', 'items', [Query.equal('itemId', itemId as string)]);
      return response.documents[0] || null;
    },
    enabled: !!itemId
  });

  const mutation = useMutation({
    mutationFn: async (payload: any) => {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      return data;
    },
    onSuccess: (data) => {
      router.push(`/orders/${data.orderNo}?email=${encodeURIComponent(email)}`);
    }
  });

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticket) return;
    mutation.mutate({ fullName, email, itemId, quantity });
  };

  if (isLoading) return <AppShell title="Checkout"><div className="p-10 text-center text-slate-400">Loading order details...</div></AppShell>;
  if (!ticket) return <AppShell title="Checkout"><div className="p-10 text-center text-slate-400">Invalid Ticket Selection.</div></AppShell>;

  return (
    <AppShell title="Checkout">
      <div className="p-6">
        <form onSubmit={handleCheckout} className="space-y-6 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div>
            <h2 className="text-xl font-black text-slate-900 mb-2">Order Summary</h2>
            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div>
                <p className="font-bold text-slate-800">{ticket.name}</p>
                <p className="text-xs text-slate-500">RM {ticket.price} &times; {quantity}</p>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-full bg-slate-200 font-bold">-</button>
                <span className="font-black w-4 text-center">{quantity}</span>
                <button type="button" onClick={() => setQuantity(Math.min(ticket.remainingQty, quantity + 1))} className="w-8 h-8 rounded-full bg-slate-200 font-bold">+</button>
              </div>
            </div>
            <div className="flex justify-between mt-4 px-1">
              <span className="font-bold text-slate-500 uppercase tracking-widest text-xs">Total Amount</span>
              <span className="font-black text-[#FF1493] text-lg">RM {(ticket.price * quantity).toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">Guest Details</h2>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 mb-1 block">Full Name</label>
              <input required value={fullName} onChange={e => setFullName(e.target.value)} type="text" placeholder="John Doe" className="w-full bg-slate-50 rounded-xl px-4 py-3 font-semibold text-slate-900 focus:outline-none border-2 border-transparent focus:border-[#FF1493] transition-colors" />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 mb-1 block">Email Address <span className="text-red-500">*</span></label>
              <input required value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="hello@soulfest.com" className="w-full bg-slate-50 rounded-xl px-4 py-3 font-semibold text-slate-900 focus:outline-none border-2 border-transparent focus:border-[#FF1493] transition-colors" />
            </div>
          </div>

          <button 
            disabled={mutation.isPending}
            type="submit" 
            className="w-full bg-[#008080] hover:bg-teal-700 text-white font-bold py-4 rounded-2xl transition-transform active:scale-95 shadow-md text-sm uppercase tracking-wide disabled:opacity-50"
          >
            {mutation.isPending ? 'Processing...' : 'Reserve Ticket & Upload Slip'}
          </button>
          
          {mutation.isError && (
             <p className="text-red-500 text-xs text-center font-bold">{mutation.error.message}</p>
          )}
        </form>
      </div>
    </AppShell>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <CheckoutForm />
    </Suspense>
  );
}

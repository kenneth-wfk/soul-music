"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { AppShell } from '../../components/AppShell';

export default function OrderLookup() {
  const router = useRouter();
  const [orderNo, setOrderNo] = useState('');
  const [email, setEmail] = useState('');

  // Silently check if the user has an active 1-hour session cookie
  const { data, isLoading } = useQuery({
    queryKey: ['session_orders'],
    queryFn: async () => {
      const res = await fetch('/api/session/orders');
      return await res.json();
    }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNo || !email) return;
    router.push(`/orders/${orderNo.toUpperCase()}?email=${encodeURIComponent(email)}`);
  };

  return (
    <AppShell title="My Orders">
      <div className="p-6">
        {isLoading && (
          <div className="flex justify-center p-10">
            <div className="w-8 h-8 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {data?.orders && data.orders.length > 0 && (
          <div className="mb-8 space-y-4">
            <h2 className="text-xl font-black text-slate-900 leading-tight">Active Session Orders</h2>
            {data.orders.map((order: any) => (
              <div 
                key={order.$id} 
                className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 cursor-pointer hover:border-slate-400 transition-colors"
                onClick={() => router.push(`/orders/${order.orderNo}`)}
              >
                 <div className="flex justify-between items-center mb-2">
                    <span className="font-black text-slate-800">{order.orderNo}</span>
                    <span className={`text-[10px] uppercase font-black px-2 py-1 tracking-widest rounded-full text-white ${order.status === 'draft' ? 'bg-orange-500' : 'bg-[#008080]'}`}>
                       {order.status}
                    </span>
                 </div>
                 <p className="text-xs font-bold text-slate-500">RM {order.totalAmount.toFixed(2)} &nbsp;&bull;&nbsp; {new Date(order.orderDate).toLocaleDateString()}</p>
                 <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tap to manage &rarr;</span>
                 </div>
              </div>
            ))}
            
            <div className="flex items-center gap-4 py-4">
              <div className="flex-1 h-px bg-slate-200"></div>
              <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Or find another</span>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>
          </div>
        )}

        {(!isLoading) && (
          <form onSubmit={handleSearch} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col gap-6">
            <div className="text-center mb-2">
              <h2 className="text-xl font-black text-slate-900 leading-tight">Retrieve Your Order</h2>
              <p className="text-xs text-slate-500 mt-1 font-medium">To upload a bank slip or view your tickets, please securely verify your purchase.</p>
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 mb-1 block">Order Number</label>
              <input 
                required 
                value={orderNo} 
                onChange={e => setOrderNo(e.target.value)} 
                type="text" 
                placeholder="e.g. ORD-1234" 
                className="w-full bg-slate-50 rounded-xl px-4 py-3 font-semibold text-slate-900 focus:outline-none border-2 border-transparent focus:border-[#008080] transition-colors uppercase" 
              />
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 mb-1 block">Guest Email</label>
              <input 
                required 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                type="email" 
                placeholder="Your checkout email" 
                className="w-full bg-slate-50 rounded-xl px-4 py-3 font-semibold text-slate-900 focus:outline-none border-2 border-transparent focus:border-[#008080] transition-colors" 
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl transition-transform active:scale-95 shadow-md text-sm uppercase tracking-wide"
            >
              Find My Order
            </button>
          </form>
        )}
      </div>
    </AppShell>
  );
}

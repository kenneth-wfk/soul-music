"use client";
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

export default function OrdersListingPage() {
  const [filterOrderNo, setFilterOrderNo] = useState('');
  const [filterCustomer, setFilterCustomer] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Debounce could be added, but for basic exact-match filters pressing enter or manual refetch works fine.
  // We will refetch dynamically whenever the status dropdown changes, or via a search button.

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['admin_orders_search', filterStatus, filterOrderNo, filterCustomer],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filterStatus !== 'all') params.append('status', filterStatus);
      if (filterOrderNo.trim()) params.append('orderNo', filterOrderNo.trim());
      if (filterCustomer.trim()) params.append('customer', filterCustomer.trim());

      const res = await fetch(`/api/admin/orders/search?${params.toString()}`);
      if (!res.ok) throw new Error("Search failed");
      return await res.json();
    }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  const orders = data?.orders || [];

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white mb-2">Order Management</h1>
          <p className="text-white/50 text-sm">Search and trace exact historical transactions.</p>
        </div>
      </div>

      <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-5 shadow-lg">
        <form onSubmit={handleSearch} className="flex flex-wrap md:flex-nowrap gap-4 items-end">
          <div className="flex flex-col gap-1.5 flex-1 min-w-[200px]">
            <label className="text-xs font-bold uppercase tracking-wider text-white/40">Order No</label>
            <input 
              type="text" 
              placeholder="e.g. ORD-12345"
              value={filterOrderNo}
              onChange={(e) => setFilterOrderNo(e.target.value)}
              className="bg-[#111] border border-white/10 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors w-full"
            />
          </div>
          <div className="flex flex-col gap-1.5 flex-1 min-w-[200px]">
            <label className="text-xs font-bold uppercase tracking-wider text-white/40">Customer Email / Name</label>
            <input 
              type="text" 
              placeholder="Exact match only..."
              value={filterCustomer}
              onChange={(e) => setFilterCustomer(e.target.value)}
              className="bg-[#111] border border-white/10 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors w-full"
            />
          </div>
          <div className="flex flex-col gap-1.5 flex-[0.5] min-w-[150px]">
            <label className="text-xs font-bold uppercase tracking-wider text-white/40">Status</label>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-[#111] border border-white/10 rounded px-4 py-2.5 text-sm text-white/90 focus:outline-none focus:border-primary transition-colors w-full appearance-none"
            >
              <option value="all">All</option>
              <option value="draft">Draft</option>
              <option value="pending_verification">Pending</option>
              <option value="paid">Paid</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <button type="submit" className="bg-primary text-black font-bold uppercase tracking-wider text-xs px-6 py-3 rounded hover:bg-white transition-colors whitespace-nowrap h-[42px] mb-0.5">
             Search
          </button>
        </form>
      </div>

      <div className="border border-white/10 bg-[#000000]/60 rounded-xl overflow-hidden shadow-2xl backdrop-blur-md">
        <div className="overflow-x-auto min-h-[400px]">
          {isLoading && <div className="p-20 text-center text-white/50 animate-pulse">Loading orders pipeline...</div>}
          {error && <div className="p-10 text-center text-red-500 font-bold bg-red-500/10">Failed to fetch orders via Appwrite.</div>}
          
          {!isLoading && !error && orders.length === 0 && (
              <div className="p-20 text-center text-white/40 flex flex-col items-center">
                  <span className="text-4xl mb-3 opacity-50">📂</span>
                  <p className="font-bold">No orders found.</p>
                  <p className="text-xs mt-1">Adjust your strict filters or sync the database.</p>
              </div>
          )}

          {!isLoading && !error && orders.length > 0 && (
            <table className="w-full text-left text-sm text-white/80">
              <thead className="bg-white/5 text-xs uppercase text-white/50 font-semibold border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 w-[20%]">Order ID</th>
                  <th className="px-6 py-4 w-[25%]">Customer</th>
                  <th className="px-6 py-4 w-[20%]">Date</th>
                  <th className="px-6 py-4 w-[15%]">Total</th>
                  <th className="px-6 py-4 w-[20%] text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.map((order: any) => (
                  <tr key={order.$id} className="hover:bg-white-[0.03] bg-[#050505] transition-colors group cursor-default">
                    <td className="px-6 py-4">
                      <Link href={`/orders/${order.orderNo}`} className="font-bold text-[#87CEEB] hover:text-white hover:underline transition-colors">
                        {order.orderNo}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-white/90">{order.customerName}</span>
                        <span className="text-xs text-white/40">{order.customerEmail}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white/60">
                        {new Date(order.orderDate).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 font-bold text-white">
                        RM {order.totalAmount?.toFixed(2) || '0.00'}
                    </td>
                    <td className="px-6 py-4 text-right">
                       <span className={`text-xs px-3 py-1 rounded-full font-bold border 
                          ${order.status === 'paid' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                            order.status === 'pending_verification' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                            order.status === 'cancelled' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                            'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}
                        >
                         {order.status.replace('_', ' ').toUpperCase()}
                       </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

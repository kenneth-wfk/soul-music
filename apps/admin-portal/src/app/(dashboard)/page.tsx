"use client";
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export default function AdminDashboardPage() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['admin_dashboard'],
    queryFn: async () => {
      const res = await fetch('/api/admin/orders');
      if (!res.ok) throw new Error("Unauthorized or server error");
      return await res.json();
    },
    refetchInterval: 15000 // Poll every 15s manually
  });

  const processMutation = useMutation({
    mutationFn: async ({ orderNo, action }: { orderNo: string, action: 'approve' | 'reject' }) => {
      const res = await fetch(`/api/admin/orders/${orderNo}/process`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });
      if (!res.ok) throw new Error("Failed to process");
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_dashboard'] });
    }
  });

  const metrics = data?.metrics || { totalSales: 0, pendingCount: 0, totalTicketsSold: 0 };
  const orders = data?.orders || [];

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border border-white/10 bg-[#0a0a0a] rounded-xl p-6 relative overflow-hidden">
          <h3 className="text-sm font-medium text-white/60 mb-1 z-10 relative">Total Validated Sales</h3>
          <p className="text-3xl font-bold text-white z-10 relative">RM {(metrics.totalSales).toFixed(2)}</p>
          {isLoading && <div className="absolute top-0 right-0 w-full h-full bg-white/5 animate-pulse"></div>}
        </div>
        <div className="border border-white/10 bg-[#0a0a0a] rounded-xl p-6 relative overflow-hidden">
          <h3 className="text-sm font-medium text-white/60 mb-1 z-10 relative">Pending Bank Slips</h3>
          <p className="text-3xl font-bold text-white z-10 relative">{metrics.pendingCount}</p>
          <p className="text-xs text-amber-500 mt-2 z-10 relative">Action required</p>
          {isLoading && <div className="absolute top-0 right-0 w-full h-full bg-white/5 animate-pulse"></div>}
        </div>
        <div className="border border-white/10 bg-[#0a0a0a] rounded-xl p-6 relative overflow-hidden">
          <h3 className="text-sm font-medium text-white/60 mb-1 z-10 relative">Tickets Issued</h3>
          <p className="text-3xl font-bold text-white z-10 relative">{metrics.totalTicketsSold}</p>
          {isLoading && <div className="absolute top-0 right-0 w-full h-full bg-white/5 animate-pulse"></div>}
        </div>
      </div>

      {/* Bank Slip Verification Queue */}
      <div className="border border-white/10 bg-[#000000]/60 rounded-xl overflow-hidden shadow-2xl backdrop-blur-md">
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0a0a0a]">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isLoading ? 'bg-slate-500' : 'bg-amber-500 animate-pulse'}`}></span>
              Pending Bank Slip Verifications
            </h3>
            <p className="text-sm text-white/50 mt-1">Review user uploaded receipts to approve ticket issuance.</p>
          </div>
          <button 
            onClick={() => queryClient.invalidateQueries({ queryKey: ['admin_dashboard'] })}
            className="text-xs font-bold uppercase tracking-widest text-black bg-[#FFD700] hover:bg-white px-4 py-2 rounded-md transition-colors"
          >
            {isLoading ? 'Syncing...' : 'Sync Now'}
          </button>
        </div>
        
        <div className="overflow-x-auto min-h-[300px]">
          {error && <div className="p-10 text-center text-red-500 font-bold bg-red-500/10">Connection Error. Are you logged in?</div>}
          
          {!error && orders.length === 0 && !isLoading && (
              <div className="p-20 text-center text-white/40 flex flex-col items-center">
                  <span className="text-4xl mb-3 opacity-50">☕</span>
                  <p className="font-bold">Queue is empty!</p>
                  <p className="text-xs mt-1">No pending validations required.</p>
              </div>
          )}

          {!error && orders.length > 0 && (
            <table className="w-full text-left text-sm text-white/80">
              <thead className="bg-white/5 text-xs uppercase text-white/50 font-semibold border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 w-[15%]">Order ID</th>
                  <th className="px-6 py-4 w-[25%]">Customer</th>
                  <th className="px-6 py-4 w-[15%]">Amount</th>
                  <th className="px-6 py-4 w-[20%]">Bank Slip</th>
                  <th className="px-6 py-4 w-[25%] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.map((order: any) => (
                  <tr key={order.$id} className={`hover:bg-white-[0.02] bg-[#050505] transition-colors group ${processMutation.isPending && processMutation.variables?.orderNo === order.orderNo ? 'opacity-50' : ''}`}>
                    <td className="px-6 py-4 font-bold text-white">{order.orderNo}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-white/90">{order.customerName}</span>
                        <span className="text-xs text-white/40">{new Date(order.orderDate).toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-emerald-400 font-bold tracking-tight">RM {order.totalAmount.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      {order.bankSlipFileId ? (
                        <a 
                          href={`${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/bank_slips/files/${order.bankSlipFileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`} 
                          target="_blank" rel="noreferrer"
                          className="flex items-center gap-2 text-[#87CEEB] hover:text-white transition-colors"
                        >
                          📄 <span className="underline decoration-white/30 underline-offset-2">View Receipt</span>
                        </a>
                      ) : (
                        <span className="text-xs text-amber-500 font-bold bg-amber-500/10 px-2 py-1 rounded">No File Attached</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          disabled={processMutation.isPending}
                          onClick={() => processMutation.mutate({ orderNo: order.orderNo, action: 'approve' })}
                          className="bg-emerald-500/20 hover:bg-emerald-500 text-emerald-400 hover:text-white px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all border border-emerald-500/30 disabled:opacity-50"
                        >
                          Approve
                        </button>
                        <button 
                          disabled={processMutation.isPending}
                          onClick={() => {
                            if(window.confirm('Reject this slip and cancel the order?')) {
                                processMutation.mutate({ orderNo: order.orderNo, action: 'reject' })
                            }
                          }}
                          className="bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white px-3 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all border border-red-500/30 disabled:opacity-50"
                        >
                          Reject
                        </button>
                      </div>
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

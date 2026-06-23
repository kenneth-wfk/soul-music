"use client";
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { databases } from '@soulfest/core-logic';
import { Query } from 'appwrite';
import { useRouter } from 'next/navigation';
import { AppShell } from '../components/AppShell';

export default function Storefront() {
  const router = useRouter();

  // Fetch Items collection where itemType === 'ticket'
  const { data, isLoading, error } = useQuery({
    queryKey: ['tickets'],
    queryFn: async () => {
      const response = await databases.listDocuments(
        'soulfest_db',
        'items',
        [Query.equal('itemType', 'ticket')]
      );
      return response.documents;
    }
  });

  return (
    <AppShell title="Tickets & Passes">
      <div className="p-5 space-y-6">
        <div className="bg-gradient-to-r from-[#FF1493] to-orange-400 p-6 rounded-3xl text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-black mb-1">Early Bird Now Open!</h2>
            <p className="text-sm font-medium opacity-90">Grab your Kampar Heritage passes before they sell out.</p>
          </div>
          <div className="absolute -right-4 -bottom-4 text-8xl opacity-20 transform -rotate-12">🎪</div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-slate-800 px-2">Available Passes</h3>
          
          {isLoading && (
            <div className="flex justify-center p-10">
              <div className="w-8 h-8 border-4 border-[#FF1493] border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 p-4 rounded-xl text-red-600 text-sm font-medium">
              Failed to load tickets. Please check your connection.
            </div>
          )}

          {data && data.length === 0 && (
            <div className="bg-white border border-slate-200 p-8 rounded-3xl text-center shadow-sm">
              <span className="text-4xl mb-3 block">🎫</span>
              <p className="text-slate-500 font-medium">Tickets will be announced soon.</p>
            </div>
          )}

          {data?.map((ticket) => (
            <div key={ticket.$id} className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex flex-col gap-4">
              <div>
                <span className="bg-[#FFD700] text-slate-900 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest mb-3 inline-block">
                  Festival Pass
                </span>
                <div className="flex justify-between items-start">
                  <h4 className="text-xl font-black text-slate-900 leading-tight">{ticket.name}</h4>
                  <span className="text-lg font-black text-[#FF1493]">RM {ticket.price}</span>
                </div>
                {ticket.description && (
                  <p className="text-xs font-semibold text-slate-500 mt-2">{ticket.description}</p>
                )}
              </div>
              
              <div className="flex items-center justify-between mt-2 pt-4 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  {ticket.remainingQty > 0 ? `${ticket.remainingQty} Left` : 'Sold Out'}
                </div>
                <button 
                  disabled={ticket.remainingQty <= 0}
                  onClick={() => router.push(`/checkout?itemId=${ticket.itemId}`)}
                  className="bg-slate-900 focus:outline-none hover:bg-slate-800 disabled:bg-slate-300 text-white font-bold py-2.5 px-6 rounded-full text-xs uppercase tracking-wider transition-transform active:scale-95"
                >
                  Get Tickets
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

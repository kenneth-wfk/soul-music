"use client";
import React, { useState } from 'react';
import { BottomNavigation, NavTab } from '@soulfest/ui-core';
import { useRouter, usePathname } from 'next/navigation';

const TABS: NavTab[] = [
  { id: '/', label: 'Store', icon: '🎟️', activeColor: 'text-[#FF1493]' },
  { id: '/orders', label: 'My Orders', icon: '🧾', activeColor: 'text-[#008080]' },
  { id: '/profile', label: 'Profile', icon: '👤', activeColor: 'text-slate-900' },
];

export function AppShell({ children, title }: { children: React.ReactNode, title?: string }) {
  const router = useRouter();
  const pathname = usePathname();

  // Highlight the correct tab based on current route
  const activeTabId = pathname.startsWith('/orders') 
    ? '/orders' 
    : pathname.startsWith('/profile') 
      ? '/profile' 
      : '/';

  return (
    <>
      {/* Top Navigation Bar (Material 3 Inspired Header) */}
      <header className="bg-white px-6 pt-10 pb-4 shadow-sm z-10 flex justify-between items-center shrink-0">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            {title || 'Kampar Heritage'}
          </h1>
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
            Soulfest 2026
          </span>
        </div>
        <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
           <span className="text-sm">🎫</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-slate-50 relative pb-[100px]">
        {children}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation
        tabs={TABS}
        activeTabId={activeTabId}
        onTabChange={(id) => router.push(id)}
      />
    </>
  );
}

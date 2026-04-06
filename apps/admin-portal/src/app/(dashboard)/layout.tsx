import React from 'react';
import Link from 'next/link';
import { logoutAction } from '../actions';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-[#0a0a0a] hidden md:flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <h1 className="text-xl font-bold tracking-tight text-white">Soulfest <span className="text-primary">Admin</span></h1>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-md bg-primary/10 text-primary font-medium">
            Dashboard
          </Link>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 text-white/70 hover:text-white transition-colors">
            News & Content
          </a>
          <Link href="/tickets" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 text-white/70 hover:text-white transition-colors">
            Tickets
          </Link>
          <Link href="/orders" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 text-white/70 hover:text-white transition-colors">
            Orders
          </Link>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 text-white/70 hover:text-white transition-colors">
            Bank Slips
          </a>
        </nav>
        <div className="p-4 border-t border-white/10">
          <form action={logoutAction}>
            <button type="submit" className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 text-white/70 cursor-pointer text-left transition-colors">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">A</div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white">Admin User</span>
                <span className="text-xs text-red-400 hover:text-red-300 font-bold group-hover:underline">Secure Logout</span>
              </div>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b border-white/10 bg-[#050505]/80 backdrop-blur-md sticky top-0 flex items-center justify-between px-6 z-10 w-full shrink-0">
          <div className="flex items-center gap-4">
            {/* Mobile menu stub */}
            <button className="md:hidden text-white/70">Menu</button>
            <h2 className="text-lg font-medium">Overview</h2>
          </div>
          <div className="flex items-center gap-4 text-sm text-white/50">
            Environment: Auth Bypass Mode
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

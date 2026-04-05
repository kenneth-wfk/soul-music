"use client";
import React from 'react';

export interface NavTab {
  id: string;
  label: string;
  icon: React.ReactNode;
  activeColor?: string;
}

export interface BottomNavigationProps {
  tabs: NavTab[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  /** Max width of the container (should match the app shell). Defaults to 768px. */
  maxWidth?: string;
  className?: string;
}

export function BottomNavigation({
  tabs,
  activeTabId,
  onTabChange,
  maxWidth = '768px',
  className = '',
}: BottomNavigationProps) {
  return (
    <nav
      className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full bg-slate-50/95 backdrop-blur-md px-6 pt-3 pb-6 md:pb-4 flex justify-around items-center z-50 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] border-t border-slate-200/50 ${className}`}
      style={{ maxWidth }}
    >
      {tabs.map((tab) => {
        const isActive = activeTabId === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="flex flex-col items-center gap-1 group w-20"
          >
            {/* Pill Indicator Wrapping the Icon */}
            <div 
              className={`flex items-center justify-center w-16 h-8 rounded-full transition-all duration-300 ${
                isActive 
                  ? `${tab.activeColor ? tab.activeColor.replace('text-', 'bg-').replace(']', '/20]') : 'bg-slate-200'} ` 
                  : 'bg-transparent group-hover:bg-slate-200/50'
              }`}
            >
              <span className={`text-xl leading-none transition-transform duration-300 ${isActive ? 'scale-110' : 'scale-100'} ${isActive ? tab.activeColor || 'text-slate-900' : 'text-slate-500'}`}>
                {tab.icon}
              </span>
            </div>
            
            {/* Label Below */}
            <span 
              className={`text-[11px] font-bold tracking-wide transition-colors duration-300 ${
                isActive ? (tab.activeColor || 'text-slate-900') : 'text-slate-500'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

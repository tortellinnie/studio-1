
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Target, 
  Activity,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Overview', icon: LayoutDashboard, href: '/overview' },
    { name: 'Competitive Analysis', icon: Target, href: '/competitive' },
    { name: 'Brand Health', icon: Activity, href: '/brand-health' },
  ];

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 shrink-0 bg-[#003da5] flex flex-col text-white">
        <div className="p-8">
          <h1 className="text-xl font-bold tracking-tight">P&G Intelligence Hub</h1>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium",
                pathname === item.href 
                  ? "bg-white/15 text-white" 
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="p-8 border-t border-white/10">
          <div className="text-[11px] text-white/40 font-medium space-y-1">
            <p>GenAI Dashboard v1.0</p>
            <p>Last updated: Mar 15, 2026</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <div className="min-h-full">
          {children}
        </div>
        
        {/* Floating Help Button */}
        <button className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-[#222] text-white flex items-center justify-center shadow-lg hover:bg-black transition-colors z-50">
          <HelpCircle className="h-6 w-6" />
        </button>
      </main>
    </div>
  );
}

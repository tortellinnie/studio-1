"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Target, 
  Users, 
  ChevronRight,
  Zap,
  Star,
  Smile,
  BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Sentiment Analysis', icon: Smile, href: '/sentiment' },
    { name: 'Product Rankings', icon: Star, href: '/rankings' },
    { name: 'Superiority Mapping', icon: BarChart3, href: '/superiority' },
    { name: 'Competitive Intelligence', icon: Target, href: '/competitive' },
    { name: 'Account Recommendations', icon: Users, href: '/accounts' },
  ];

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-[#003da5] flex flex-col text-white">
        <div className="p-6">
          <h1 className="text-sm font-bold uppercase tracking-wider opacity-90">P&G intelligence Hub</h1>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium",
                pathname === item.href 
                  ? "bg-white/15 text-white" 
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="p-6 text-[10px] text-white/40 font-medium">
          GenAI Dashboard v1.0<br />
          Last updated: Mar 15, 2024
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
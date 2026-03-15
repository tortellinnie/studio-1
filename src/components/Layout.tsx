
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Target, 
  Users, 
  BarChart3, 
  Settings, 
  ChevronRight,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Competitive Intel', icon: Target, href: '/competitive' },
    { name: 'Account Recs', icon: Users, href: '/accounts' },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border/50 bg-card/30 backdrop-blur-xl">
        <div className="flex h-16 items-center gap-3 px-6 border-b border-border/50">
          <div className="bg-primary p-1.5 rounded-lg shadow-lg">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold font-headline tracking-tight">P&G Intel</span>
        </div>
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group",
                pathname === item.href 
                  ? "bg-primary/10 text-primary border border-primary/20" 
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-4 w-4", pathname === item.href && "text-primary")} />
              <span className="text-sm font-semibold">{item.name}</span>
              {pathname === item.href && <ChevronRight className="ml-auto h-3 w-3" />}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 border-b border-border/50 bg-background/50 backdrop-blur-xl flex items-center justify-end px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Enterprise Mode</span>
            <div className="h-8 w-8 rounded-full bg-muted border border-border" />
          </div>
        </header>
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

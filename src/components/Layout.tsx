
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
import { Badge } from "@/components/ui/badge";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Product Rankings', icon: Star, href: '/rankings' },
    { name: 'Sentiment Analysis', icon: Smile, href: '/sentiment' },
    { name: 'Superiority Mapping', icon: BarChart3, href: '/superiority' },
    { name: 'Competitive Intel', icon: Target, href: '/competitive' },
    { name: 'Account Recs', icon: Users, href: '/accounts' },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-border/50 bg-card/30 backdrop-blur-xl flex flex-col">
        <div className="flex h-16 items-center gap-3 px-6 border-b border-border/50 shrink-0">
          <div className="bg-primary p-1.5 rounded-lg shadow-lg lavender-glow">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold font-headline tracking-tight">P&G Intel</span>
        </div>
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <div className="px-3 mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
            Intelligence Suite
          </div>
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group",
                pathname === item.href 
                  ? "bg-primary/10 text-primary border border-primary/20 shadow-sm" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-4 w-4 transition-transform group-hover:scale-110", pathname === item.href && "text-primary")} />
              <span className="text-xs font-bold tracking-tight">{item.name}</span>
              {pathname === item.href && <ChevronRight className="ml-auto h-3.5 w-3.5 animate-in slide-in-from-left-2" />}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-border/50">
          <div className="p-4 rounded-xl bg-muted/20 border border-white/5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Status</p>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold">Enterprise Live</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col">
        <header className="h-16 border-b border-border/50 bg-background/50 backdrop-blur-xl flex items-center justify-between px-8 shrink-0 z-10">
          <div className="flex items-center gap-2">
             <Badge variant="outline" className="text-[8px] font-bold tracking-widest border-primary/20 text-primary">VERSION 4.2.0</Badge>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">Taglish Model V2 Active</span>
            <div className="h-8 w-8 rounded-full bg-muted border border-border flex items-center justify-center font-bold text-[10px]">AJ</div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

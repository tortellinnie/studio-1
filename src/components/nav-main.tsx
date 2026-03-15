
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Sparkles, 
  History, 
  Library, 
  BarChart3, 
  Settings,
  LogOut,
  CreditCard,
  Target,
  Users,
  Star,
  Smile,
  BarChart4
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Progress } from "@/components/ui/progress";

const navItems = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Sentiment Analysis",
    url: "/sentiment",
    icon: Smile,
  },
  {
    title: "Product Rankings",
    url: "/rankings",
    icon: Star,
  },
  {
    title: "Superiority Mapping",
    url: "/superiority",
    icon: BarChart4,
  },
  {
    title: "Competitive Intel",
    url: "/competitive",
    icon: Target,
  },
  {
    title: "Account Recs",
    url: "/accounts",
    icon: Users,
  },
];

export function NavMain() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader className="border-b border-white/10 p-6 bg-[#003da5]">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 border border-white/20">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-white font-headline leading-none">P&G Hub</span>
            <span className="text-[10px] text-white/60 font-bold uppercase tracking-widest mt-1">Intelligence</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-[#003da5]">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-3 gap-1.5">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url}
                    className={cn(
                      "transition-all duration-200 h-10 px-4 rounded-md group",
                      pathname === item.url 
                        ? "bg-white/15 text-white shadow-sm" 
                        : "hover:bg-white/5 text-white/70 hover:text-white"
                    )}
                  >
                    <Link href={item.url}>
                      <item.icon className={cn("h-4 w-4 transition-transform group-hover:scale-110", pathname === item.url ? "text-white" : "text-white/60")} />
                      <span className="font-semibold text-xs">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto px-6 py-8">
          <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="h-3 w-3 text-white/60" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">Project Scope</span>
              </div>
              <span className="text-[9px] font-bold text-white bg-white/10 px-1.5 py-0.5 rounded">Lazada PH</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-medium text-white/60">
                <span>Reviews Processed</span>
                <span className="text-white">37.5k</span>
              </div>
              <Progress value={100} className="h-1 bg-white/10" />
            </div>
            <p className="text-[9px] text-white/40 leading-relaxed italic">Dataset: Fabric Care Category</p>
          </div>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t border-white/10 p-4 bg-[#003da5]/50">
        <SidebarMenu className="gap-1.5">
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="h-10 px-4 text-white/70 hover:text-white hover:bg-white/5">
              <Link href="/settings">
                <Settings className="h-4 w-4" />
                <span className="text-xs font-semibold">System Logs</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-10 px-4 text-white/40 hover:text-white hover:bg-white/5">
              <LogOut className="h-4 w-4" />
              <span className="text-xs font-semibold">Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}

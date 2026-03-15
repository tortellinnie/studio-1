
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Settings,
  LogOut,
  Target,
  Activity
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
    url: "/overview",
    icon: LayoutDashboard,
  },
  {
    title: "Competitive Analysis",
    url: "/competitive",
    icon: Target,
  },
  {
    title: "Brand Health",
    url: "/brand-health",
    icon: Activity,
  },
];

export function NavMain() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader className="border-b border-white/10 p-8 bg-[#003da5]">
        <div className="flex flex-col">
          <span className="text-2xl font-black tracking-tight text-white font-headline leading-none">P&G Hub</span>
          <span className="text-xs text-white/50 font-black uppercase tracking-[0.3em] mt-3">Intelligence</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-[#003da5]">
        <SidebarGroup>
          <SidebarGroupLabel className="px-8 py-12 text-xs font-black uppercase tracking-[0.4em] text-white/30">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-6 gap-4">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url}
                    className={cn(
                      "transition-all duration-300 h-14 px-8 rounded-xl group",
                      pathname === item.url 
                        ? "bg-white/15 text-white shadow-lg scale-[1.02]" 
                        : "hover:bg-white/10 text-white/60 hover:text-white"
                    )}
                  >
                    <Link href={item.url}>
                      <item.icon className={cn("h-6 w-6 transition-transform group-hover:scale-110", pathname === item.url ? "text-white" : "text-white/40")} />
                      <span className="font-bold text-base tracking-tight">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto px-8 py-12">
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-8">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-white/60">Project Scope</span>
              <span className="text-[10px] font-black text-white bg-white/10 px-3 py-1.5 rounded-md">Lazada PH</span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between text-sm font-bold text-white/50">
                <span>Reviews Processed</span>
                <span className="text-white text-base">37.5k</span>
              </div>
              <Progress value={100} className="h-2 bg-white/10" />
            </div>
            <p className="text-xs text-white/30 leading-relaxed italic font-medium">Dataset: Fabric Care Category</p>
          </div>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t border-white/10 p-8 bg-[#003da5]/50">
        <SidebarMenu className="gap-4">
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="h-14 px-8 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all">
              <Link href="/settings">
                <Settings className="h-6 w-6" />
                <span className="text-base font-bold tracking-tight">System Logs</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-14 px-8 text-white/30 hover:text-white hover:bg-white/5 rounded-xl transition-all">
              <LogOut className="h-6 w-6" />
              <span className="text-base font-bold tracking-tight">Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}

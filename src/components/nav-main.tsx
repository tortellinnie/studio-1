"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Target,
  Activity,
  LogOut,
  Settings,
  ChevronRight
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
      <SidebarHeader className="p-8 pb-12">
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-black tracking-tighter text-slate-900 uppercase">P&G Hub</span>
          <span className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">Strategic Intelligence</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 pb-4 text-[9px] font-black uppercase tracking-[0.3em] text-slate-300">
            Strategic Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url}
                    className={cn(
                      "transition-all duration-300 h-12 px-4 group",
                      pathname === item.url 
                        ? "bg-slate-900 text-white shadow-xl translate-x-1" 
                        : "hover:bg-slate-100 text-slate-500 hover:text-slate-900"
                    )}
                  >
                    <Link href={item.url}>
                      <item.icon className={cn("h-4 w-4 mr-3", pathname === item.url ? "text-white" : "text-slate-400 group-hover:text-slate-900")} />
                      <span className="font-bold text-xs uppercase tracking-widest">{item.title}</span>
                      {pathname === item.url && <ChevronRight className="ml-auto h-3 w-3 text-white/50" />}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-8 border-t border-slate-100">
        <SidebarMenu className="gap-4">
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="text-slate-400 hover:text-slate-900 transition-colors h-auto p-0">
              <Link href="/settings">
                <Settings className="h-4 w-4 mr-3" />
                <span className="text-[10px] font-black uppercase tracking-widest">System Logs</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-slate-300 hover:text-red-500 transition-colors h-auto p-0 group">
              <LogOut className="h-4 w-4 mr-3 group-hover:rotate-180 transition-transform duration-500" />
              <span className="text-[10px] font-black uppercase tracking-widest">Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
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
      <SidebarHeader className="p-10 pb-12">
        <div className="flex flex-col gap-3">
          <span className="text-3xl font-black text-white tracking-tight">Intelligence</span>
          <span className="text-xs text-white/40 font-bold uppercase tracking-[0.25em]">Strategic Engine</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-6">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 pb-8 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
            Analysis Suite
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-4">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url}
                    className={cn(
                      "transition-all duration-200 h-14 px-6 group rounded-2xl border border-transparent",
                      pathname === item.url 
                        ? "bg-white/10 text-white font-black shadow-lg" 
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <Link href={item.url}>
                      <item.icon className={cn("h-6 w-6 mr-5", pathname === item.url ? "text-white" : "text-white/30 group-hover:text-white")} />
                      <span className="text-lg">{item.title}</span>
                      {pathname === item.url && <ChevronRight className="ml-auto h-5 w-5 text-white/30" />}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-10 border-t border-white/5">
        <SidebarMenu className="gap-6">
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="text-white/30 hover:text-white transition-colors h-auto p-0 group">
              <Link href="/settings">
                <Settings className="h-5 w-5 mr-4" />
                <span className="text-sm font-bold uppercase tracking-widest">System logs</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-white/30 hover:text-red-400 transition-colors h-auto p-0 group">
              <LogOut className="h-5 w-5 mr-4" />
              <span className="text-sm font-bold uppercase tracking-widest">Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}

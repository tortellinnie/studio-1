"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Target,
  Activity,
  LogOut,
  Settings
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
      <SidebarHeader className="border-b border-white/10 p-10 bg-[#003da5]">
        <div className="flex flex-col">
          <span className="text-4xl font-black tracking-tighter text-white font-headline leading-none">P&G HUB</span>
          <span className="text-[10px] text-white/40 font-black uppercase tracking-[0.5em] mt-6">Enterprise Intelligence</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-[#003da5]">
        <SidebarGroup>
          <SidebarGroupLabel className="px-10 py-20 text-[10px] font-black uppercase tracking-[0.6em] text-white/30">
            STRATEGIC TOOLS
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-8 gap-8">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url}
                    className={cn(
                      "transition-all duration-300 h-20 px-10 rounded-3xl group",
                      pathname === item.url 
                        ? "bg-white/15 text-white shadow-2xl scale-[1.05]" 
                        : "hover:bg-white/10 text-white/60 hover:text-white"
                    )}
                  >
                    <Link href={item.url}>
                      <item.icon className={cn("h-8 w-8 transition-transform group-hover:scale-110", pathname === item.url ? "text-white" : "text-white/40")} />
                      <span className="font-black text-xl tracking-tight">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-white/10 p-10 bg-[#003da5]">
        <SidebarMenu className="gap-8">
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="h-20 px-10 text-white/60 hover:text-white hover:bg-white/5 rounded-3xl transition-all">
              <Link href="/settings">
                <Settings className="h-8 w-8" />
                <span className="text-xl font-black tracking-tight">System Logs</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-20 px-10 text-white/30 hover:text-white hover:bg-white/5 rounded-3xl transition-all">
              <LogOut className="h-8 w-8" />
              <span className="text-xl font-black tracking-tight">Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}

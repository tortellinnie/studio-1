
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
      <SidebarHeader className="border-b border-white/10 p-4 bg-[#003da5]">
        <div className="flex flex-col">
          <span className="text-lg font-bold tracking-tight text-white uppercase tracking-tighter">P&G HUB</span>
          <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Market Intelligence</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-[#003da5]">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white/30">
            STRATEGIC TOOLS
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-2">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url}
                    className={cn(
                      "transition-all duration-200 h-11 rounded-lg",
                      pathname === item.url 
                        ? "bg-white/15 text-white shadow-sm" 
                        : "hover:bg-white/10 text-white/60 hover:text-white"
                    )}
                  >
                    <Link href={item.url}>
                      <item.icon className={cn("h-5 w-5", pathname === item.url ? "text-white" : "text-white/40")} />
                      <span className="font-bold text-base tracking-tight">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-white/10 p-4 bg-[#003da5]">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="text-white/60 hover:text-white hover:bg-white/5 transition-colors h-10">
              <Link href="/settings">
                <Settings className="h-4 w-4" />
                <span className="text-sm font-bold tracking-tight">System Logs</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-white/30 hover:text-white hover:bg-white/5 transition-colors h-10">
              <LogOut className="h-4 w-4" />
              <span className="text-sm font-bold tracking-tight">Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}

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
      <SidebarHeader className="p-6 pb-8">
        <div className="flex flex-col gap-1">
          <span className="text-xl font-bold tracking-tight text-white uppercase">P&G Hub</span>
          <span className="text-[10px] text-white/50 font-medium uppercase tracking-wider">Strategic Intelligence</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 pb-4 text-[10px] font-semibold uppercase tracking-widest text-white/30">
            Strategic Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url}
                    className={cn(
                      "transition-all duration-200 h-10 px-4 group rounded-md",
                      pathname === item.url 
                        ? "bg-white/10 text-white font-semibold" 
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <Link href={item.url}>
                      <item.icon className={cn("h-4 w-4 mr-3", pathname === item.url ? "text-white" : "text-white/40 group-hover:text-white")} />
                      <span className="text-sm">{item.title}</span>
                      {pathname === item.url && <ChevronRight className="ml-auto h-3 w-3 text-white/50" />}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6 border-t border-white/5">
        <SidebarMenu className="gap-3">
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="text-white/40 hover:text-white transition-colors h-auto p-0">
              <Link href="/settings">
                <Settings className="h-4 w-4 mr-3" />
                <span className="text-xs font-medium">System Logs</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-white/40 hover:text-red-400 transition-colors h-auto p-0 group">
              <LogOut className="h-4 w-4 mr-3" />
              <span className="text-xs font-medium">Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}

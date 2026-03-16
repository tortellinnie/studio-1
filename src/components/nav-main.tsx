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
      <SidebarHeader className="p-8 pb-10">
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-extrabold text-white">P&G Hub</span>
          <span className="text-xs text-white/50 font-medium">Strategic Intelligence</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 pb-6 text-xs font-bold text-white/30">
            Strategic tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url}
                    className={cn(
                      "transition-all duration-200 h-12 px-5 group rounded-xl",
                      pathname === item.url 
                        ? "bg-white/15 text-white font-bold" 
                        : "text-white/60 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <Link href={item.url}>
                      <item.icon className={cn("h-5 w-5 mr-4", pathname === item.url ? "text-white" : "text-white/40 group-hover:text-white")} />
                      <span className="text-base">{item.title}</span>
                      {pathname === item.url && <ChevronRight className="ml-auto h-4 w-4 text-white/50" />}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-8 border-t border-white/10">
        <SidebarMenu className="gap-4">
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="text-white/40 hover:text-white transition-colors h-auto p-0">
              <Link href="/settings">
                <Settings className="h-5 w-5 mr-4" />
                <span className="text-sm font-semibold">System logs</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-white/40 hover:text-red-400 transition-colors h-auto p-0 group">
              <LogOut className="h-5 w-5 mr-4" />
              <span className="text-sm font-semibold">Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}

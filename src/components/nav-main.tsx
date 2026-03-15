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
  User,
  LogOut,
  Command
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
    title: "Command Center",
    url: "/overview",
    icon: LayoutDashboard,
  },
  {
    title: "AI Playground",
    url: "/playground",
    icon: Sparkles,
  },
  {
    title: "Prompt Library",
    url: "/prompts",
    icon: Library,
  },
  {
    title: "Activity Logs",
    url: "/history",
    icon: History,
  },
  {
    title: "Usage Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
];

export function NavMain() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader className="border-b border-sidebar-border/50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary lavender-glow transform rotate-3">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-foreground font-headline leading-none">GenAI Studio</span>
            <span className="text-[10px] text-primary/70 font-bold uppercase tracking-widest mt-1">Enterprise</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
            Productivity
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-2 gap-1">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url}
                    tooltip={item.title}
                    className={cn(
                      "transition-all duration-300 h-11 px-4 rounded-lg group",
                      pathname === item.url 
                        ? "bg-primary/10 text-primary border border-primary/20 shadow-sm" 
                        : "hover:bg-white/5 hover:text-primary text-muted-foreground"
                    )}
                  >
                    <Link href={item.url}>
                      <item.icon className={cn("h-4 w-4 transition-transform group-hover:scale-110", pathname === item.url && "text-primary")} />
                      <span className="font-semibold text-xs tracking-wide">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto px-6 py-6">
          <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/5 space-y-3">
            <div className="flex items-center gap-2">
              <Command className="h-3 w-3 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Quick Actions</span>
            </div>
            <p className="text-[10px] text-muted-foreground leading-relaxed">Press <kbd className="bg-white/10 px-1 rounded">Cmd+K</kbd> to access the global AI command bar.</p>
          </div>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/50 p-4 bg-sidebar/50">
        <SidebarMenu className="gap-1">
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === '/settings'} className="h-10 px-4">
              <Link href="/settings">
                <Settings className="h-4 w-4" />
                <span className="text-xs font-semibold">General Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-10 px-4 text-destructive hover:bg-destructive/10">
              <LogOut className="h-4 w-4" />
              <span className="text-xs font-semibold">Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}

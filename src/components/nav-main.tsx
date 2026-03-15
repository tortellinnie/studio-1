
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
  Zap
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
    title: "Dashboard",
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
    title: "History",
    url: "/history",
    icon: History,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
];

export function NavMain() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader className="border-b border-sidebar-border/50 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary lavender-glow shadow-xl shadow-primary/20">
            <Zap className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-foreground font-headline leading-none">GenAI Studio</span>
            <span className="text-[10px] text-primary/70 font-bold uppercase tracking-widest mt-1">Enterprise</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
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
                      "transition-all duration-300 h-10 px-4 rounded-lg group",
                      pathname === item.url 
                        ? "bg-primary/10 text-primary border border-primary/20 shadow-sm" 
                        : "hover:bg-white/5 hover:text-primary text-muted-foreground"
                    )}
                  >
                    <Link href={item.url}>
                      <item.icon className={cn("h-4 w-4 transition-transform group-hover:scale-110", pathname === item.url && "text-primary")} />
                      <span className="font-semibold text-xs">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto px-6 py-8">
          <div className="p-5 rounded-2xl bg-muted/20 border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="h-3 w-3 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Plan Usage</span>
              </div>
              <span className="text-[10px] font-bold text-primary">Pro</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-medium">
                <span className="text-muted-foreground">Tokens</span>
                <span>840k / 1.2M</span>
              </div>
              <Progress value={70} className="h-1.5 bg-background" />
            </div>
            <p className="text-[9px] text-muted-foreground leading-relaxed">Your monthly quota resets in <span className="text-foreground font-bold">4 days</span>.</p>
          </div>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/50 p-4 bg-sidebar/30">
        <SidebarMenu className="gap-1.5">
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === '/settings'} className="h-10 px-4">
              <Link href="/settings">
                <Settings className="h-4 w-4" />
                <span className="text-xs font-semibold">Settings</span>
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

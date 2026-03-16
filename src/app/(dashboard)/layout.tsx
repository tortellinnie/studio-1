"use client";

import { Sidebar, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { NavMain } from "@/components/nav-main";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Bell, Settings } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full overflow-hidden bg-slate-50">
        <Sidebar variant="sidebar" className="border-r border-slate-200 bg-[#003da5]">
          <NavMain />
        </Sidebar>
        <SidebarInset className="flex-1 flex flex-col overflow-hidden">
          {/* Global Top Bar */}
          <header className="flex h-14 shrink-0 items-center justify-between px-6 border-b border-slate-200 bg-white z-20">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative w-full max-w-sm group hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                <Input 
                  placeholder="Search intelligence..." 
                  className="pl-9 h-8 bg-slate-50 border-slate-200 focus-visible:ring-1 transition-all text-sm" 
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-900">
                <Bell className="h-4 w-4" />
              </Button>
              
              <div className="h-4 w-px bg-slate-200 mx-1" />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8 border border-slate-200">
                      <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop" />
                      <AvatarFallback>PG</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel className="font-normal text-xs text-slate-500 uppercase tracking-widest">
                    P&G Administrator
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-sm">Profile</DropdownMenuItem>
                  <DropdownMenuItem className="text-sm">System Logs</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive text-sm font-medium">
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-6 md:p-10">
            <div className="max-w-7xl mx-auto w-full">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

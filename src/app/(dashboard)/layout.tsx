"use client";

import { Sidebar, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { NavMain } from "@/components/nav-main";
import { FilterSidebar } from "@/components/filter-sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Bell } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FilterProvider } from "@/context/FilterContext";
import { SecurityHealthHeader } from "@/components/security-health-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FilterProvider>
      <SidebarProvider defaultOpen={true}>
        <div className="flex h-screen w-full overflow-hidden bg-slate-50">
          {/* Primary Blue Navigation Sidebar */}
          <Sidebar variant="sidebar" className="border-r border-slate-200 bg-[#003da5]">
            <NavMain />
          </Sidebar>

          {/* New Secondary Filter Sidebar */}
          <FilterSidebar />

          <SidebarInset className="flex-1 flex flex-col overflow-hidden">
            {/* Global Top Bar */}
            <header className="flex h-16 shrink-0 items-center justify-between px-8 border-b border-slate-200 bg-white z-20">
              <div className="flex items-center gap-6 flex-1">
                <div className="relative w-full max-w-md group hidden md:block">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <Input 
                    placeholder="Search intelligence..." 
                    className="pl-11 h-10 bg-slate-50 border-slate-200 focus-visible:ring-1 transition-all text-base rounded-lg" 
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                {/* Privacy-Safe Audit Trail Header */}
                <SecurityHealthHeader />

                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-500 hover:text-slate-900 rounded-lg">
                    <Bell className="h-5 w-5" />
                  </Button>
                  
                  <div className="h-6 w-px bg-slate-200 mx-2" />
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar className="h-10 w-10 border border-slate-200">
                          <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop" />
                          <AvatarFallback>PG</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-64" align="end">
                      <DropdownMenuLabel className="font-bold text-sm text-slate-500">
                        P&G Administrator
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-base py-3 px-4">Profile</DropdownMenuItem>
                      <DropdownMenuItem className="text-base py-3 px-4">System logs</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive text-base py-3 px-4 font-bold">
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </header>

            <main className="flex-1 overflow-y-auto p-8 md:p-12">
              <div className="max-w-7xl mx-auto w-full">
                {children}
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </FilterProvider>
  );
}

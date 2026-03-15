
import { Sidebar, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { NavMain } from "@/components/nav-main";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <Sidebar variant="sidebar" className="border-r border-sidebar-border/50">
          <NavMain />
        </Sidebar>
        <SidebarInset className="flex-1 overflow-y-auto">
          <header className="sticky top-0 z-10 flex h-14 items-center justify-between px-6 backdrop-blur-md bg-background/80 border-b border-border/50 md:hidden">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold font-headline text-primary">GenAI</span>
            </div>
          </header>
          <main className="p-4 md:p-8 max-w-7xl mx-auto w-full">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

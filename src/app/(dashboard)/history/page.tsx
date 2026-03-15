
"use client";

import { useState } from "react";
import { 
  Search, 
  Filter, 
  Type, 
  Code, 
  Image as ImageIcon, 
  MoreVertical,
  ChevronRight,
  Trash2,
  ExternalLink,
  Copy,
  RefreshCw
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const mockHistory = [
  { id: 1, type: "Code", title: "Authentication Middleware", prompt: "Write an Express middleware to verify JWT tokens.", date: "Oct 24, 2023", tokens: "840", status: "Completed" },
  { id: 2, type: "Text", title: "Newsletter Hook", prompt: "Create a catchy headline for a tech newsletter.", date: "Oct 24, 2023", tokens: "120", status: "Completed" },
  { id: 3, type: "Image", title: "Neon Forest Concept", prompt: "Cyberpunk neon forest with bioluminescent plants, high detail.", date: "Oct 23, 2023", tokens: "2100", status: "Completed" },
  { id: 4, type: "Code", title: "Tailwind Navigation", prompt: "Responsive navbar component using Tailwind CSS and React.", date: "Oct 22, 2023", tokens: "1500", status: "Completed" },
  { id: 5, type: "Text", title: "SaaS Sales Copy", prompt: "Landing page copy for a new project management tool targeting remote teams.", date: "Oct 21, 2023", tokens: "2400", status: "Completed" },
];

export default function HistoryPage() {
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const handleCopy = (id: number) => {
    toast({
      title: "Copied!",
      description: "Item contents copied to clipboard.",
    });
  };

  const filteredHistory = mockHistory.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase()) || 
    item.prompt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Content History</h1>
          <p className="text-muted-foreground">Manage and retrieve your previous generations.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search history..." 
              className="pl-9 lavender-glow" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredHistory.length > 0 ? (
          filteredHistory.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:border-primary/50 transition-colors group">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row items-center p-4 md:p-6 gap-6">
                  <div className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted/50",
                    item.type === "Code" ? "text-secondary" : item.type === "Image" ? "text-primary" : "text-foreground"
                  )}>
                    {item.type === "Code" ? <Code className="h-6 w-6" /> : item.type === "Image" ? <ImageIcon className="h-6 w-6" /> : <Type className="h-6 w-6" />}
                  </div>
                  
                  <div className="flex-1 space-y-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <Badge variant="secondary" className="text-[10px] py-0">{item.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">{item.prompt}</p>
                    <div className="flex items-center justify-center md:justify-start gap-4 text-xs text-muted-foreground/60">
                      <span>{item.date}</span>
                      <span>•</span>
                      <span>{item.tokens} tokens</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleCopy(item.id)}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem className="gap-2">
                          <ExternalLink className="h-4 w-4" /> Open Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <RefreshCw className="h-4 w-4" /> Regenerate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive gap-2">
                          <Trash2 className="h-4 w-4" /> Delete Item
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-muted rounded-xl text-muted-foreground">
            <Search className="h-10 w-10 mb-4 opacity-20" />
            <p>No matching history items found.</p>
          </div>
        )}
      </div>
    </div>
  );
}


"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Star, Folder, Bookmark, Command, Copy, Edit3, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const templates = [
  { id: 1, name: "SEO Blog Post", description: "Standard structure for tech-focused blog articles with SEO keywords.", category: "Writing", tags: ["Marketing", "SEO"], usage: 42, favorite: true },
  { id: 2, name: "REST API Endpoint", description: "Node.js/Express boilerplate for a new CRUD endpoint.", category: "Dev", tags: ["NodeJS", "Backend"], usage: 128, favorite: true },
  { id: 3, name: "E-commerce Product", description: "Persuasive sales copy for consumer hardware products.", category: "Marketing", tags: ["Sales", "B2C"], usage: 15, favorite: false },
  { id: 4, name: "TypeScript Interface", description: "Complex data structures mapped from JSON responses.", category: "Dev", tags: ["TS", "Frontend"], usage: 64, favorite: false },
  { id: 5, name: "Unit Test Gen", description: "Jest/Vitest test suites for functional logic components.", category: "Dev", tags: ["Testing", "QA"], usage: 89, favorite: true },
];

export default function PromptsPage() {
  const [search, setSearch] = useState("");
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleUse = (name: string) => {
    toast({
      title: "Template applied",
      description: `${name} has been loaded into your playground.`,
    });
  };

  const filtered = templates.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase()));

  if (!isClient) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Prompt Library</h1>
          <p className="text-muted-foreground">Save and organize your most effective templates.</p>
        </div>
        <Button className="bg-primary text-primary-foreground lavender-glow">
          <Plus className="mr-2 h-4 w-4" />
          Create Template
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar categories */}
        <div className="space-y-6">
          <Card className="bg-muted/10">
            <CardHeader className="py-4">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Collections</CardTitle>
            </CardHeader>
            <CardContent className="px-2 pb-2">
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start text-primary">
                  <Star className="mr-2 h-4 w-4" />
                  Favorites
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Bookmark className="mr-2 h-4 w-4" />
                  All Templates
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Folder className="mr-2 h-4 w-4" />
                  Development
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Folder className="mr-2 h-4 w-4" />
                  Marketing
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Folder className="mr-2 h-4 w-4" />
                  Personal
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Command className="h-3 w-3" />
                <span>Tip: Press Cmd+K to search quickly</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Template Grid */}
        <div className="md:col-span-3 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search templates by name or category..." 
              className="pl-9 bg-muted/20 border-none lavender-glow"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filtered.map((item) => (
              <Card key={item.id} className="hover:border-primary/50 transition-all group hover:lavender-glow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-[10px] font-mono border-muted text-muted-foreground">
                      {item.category}
                    </Badge>
                    <Star className={cn("h-4 w-4 cursor-pointer transition-colors", item.favorite ? "text-primary fill-primary" : "text-muted-foreground hover:text-primary")} />
                  </div>
                  <CardTitle className="text-lg mt-2 font-headline">{item.name}</CardTitle>
                  <CardDescription className="line-clamp-2 text-xs">{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded-full bg-muted/40 text-muted-foreground">#{tag}</span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-0 flex justify-between items-center border-t border-border/50 py-3 mt-auto bg-muted/5">
                  <span className="text-[10px] text-muted-foreground">{item.usage} uses this month</span>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Edit3 className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="secondary" size="sm" className="h-7 text-[10px]" onClick={() => handleUse(item.name)}>
                      Use Template
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { 
  Zap, 
  Clock, 
  Type, 
  Code, 
  Image as ImageIcon,
  TrendingUp,
  History as HistoryIcon,
  Sparkles,
  ArrowUpRight,
  Plus
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const stats = [
  { name: "Total Requests", value: "24,812", icon: Zap, change: "+18%", color: "text-primary", bg: "bg-primary/10" },
  { name: "Avg. Latency", value: "1.24s", icon: Clock, change: "-120ms", color: "text-secondary", bg: "bg-secondary/10" },
  { name: "Token Economy", value: "2.4M", icon: TrendingUp, change: "+5.2%", color: "text-primary", bg: "bg-primary/10" },
];

const usageData = [
  { name: 'Mon', text: 400, code: 240, image: 100 },
  { name: 'Tue', text: 300, code: 139, image: 200 },
  { name: 'Wed', text: 200, code: 980, image: 150 },
  { name: 'Thu', text: 278, code: 390, image: 120 },
  { name: 'Fri', text: 189, code: 480, image: 170 },
  { name: 'Sat', text: 239, code: 380, image: 300 },
  { name: 'Sun', text: 349, code: 430, image: 250 },
];

const topModels = [
  { name: "Gemini 1.5 Pro", usage: "64%", status: "Active" },
  { name: "Imagen 4 Fast", usage: "22%", status: "Active" },
  { name: "Gemini 1.5 Flash", usage: "14%", status: "Idle" },
];

export default function OverviewPage() {
  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold tracking-tight font-headline">Intelligence Command</h1>
          <p className="text-muted-foreground text-lg">Real-time metrics and orchestration for your AI fleet.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-white/10">Export Report</Button>
          <Button className="lavender-glow gap-2" asChild>
            <Link href="/playground">
              <Plus className="h-4 w-4" />
              New Generation
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.name} className="lavender-glow border-white/5 bg-card/50 backdrop-blur-sm group hover:border-primary/50 transition-all duration-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{stat.name}</CardTitle>
              <div className={cn("p-2 rounded-lg transition-colors group-hover:bg-primary/20", stat.bg)}>
                <stat.icon className={cn("h-4 w-4", stat.color)} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tighter">{stat.value}</div>
              <div className="flex items-center gap-1.5 mt-2">
                <Badge variant="secondary" className="text-[10px] font-bold bg-white/5 hover:bg-white/10">
                  {stat.change}
                </Badge>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">vs last week</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-8 border-white/5 bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-headline text-xl">Operational Velocity</CardTitle>
              <CardDescription>Multi-model request throughput per content type.</CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-[10px] uppercase border-primary/20 text-primary">Live Data</Badge>
            </div>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={usageData}>
                <defs>
                  <linearGradient id="colorText" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSecondary" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(23, 19, 39, 0.95)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(8px)' }}
                  itemStyle={{ color: 'hsl(var(--primary))' }}
                />
                <Area type="monotone" dataKey="text" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorText)" strokeWidth={3} />
                <Area type="monotone" dataKey="code" stroke="hsl(var(--secondary))" fillOpacity={1} fill="url(#colorSecondary)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="lg:col-span-4 space-y-6">
          <Card className="border-white/5 bg-card/50">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Active Model Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {topModels.map((model) => (
                <div key={model.name} className="flex items-center justify-between group cursor-default">
                  <div className="space-y-1">
                    <p className="text-sm font-bold group-hover:text-primary transition-colors">{model.name}</p>
                    <div className="flex items-center gap-2">
                      <div className={cn("h-1.5 w-1.5 rounded-full", model.status === 'Active' ? "bg-primary animate-pulse" : "bg-muted")} />
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{model.status}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold font-mono">{model.usage}</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Load share</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5 lavender-glow overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles className="h-24 w-24 text-primary" />
            </div>
            <CardHeader>
              <CardTitle className="text-lg">AI Assistant Online</CardTitle>
              <CardDescription className="text-primary/70">Alex, I've noticed your token usage for code generation has spiked. Need a cost audit?</CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="sm" className="w-full bg-primary text-primary-foreground font-bold hover:bg-primary/90">
                Review Audit
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

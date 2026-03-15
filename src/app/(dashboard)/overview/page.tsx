
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
  TrendingUp,
  Plus,
  ArrowRight,
  ChevronRight,
  MoreHorizontal,
  LayoutGrid,
  CreditCard,
  LineChart
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import Link from "next/link";
import { cn } from "@/lib/utils";

const stats = [
  { name: "Token Usage", value: "842,012", change: "+12.5%", sub: "Monthly Quota" },
  { name: "Avg. Latency", value: "0.84s", change: "-14%", sub: "Global Average" },
  { name: "Active Models", value: "8", change: "+2", sub: "Currently Enabled" },
];

const recentGenerations = [
  { id: "1", name: "User Auth Hook", type: "Code", model: "Gemini 1.5 Pro", status: "Success", time: "2m ago" },
  { id: "2", name: "Product Vision", type: "Text", model: "Gemini 1.5 Pro", status: "Success", time: "15m ago" },
  { id: "3", name: "City Concept", type: "Image", model: "Imagen 4", status: "Failed", time: "1h ago" },
  { id: "4", name: "Market Analysis", type: "Text", model: "Gemini 1.5 Flash", status: "Success", time: "3h ago" },
];

const usageData = [
  { name: 'Mon', usage: 45000 },
  { name: 'Tue', usage: 52000 },
  { name: 'Wed', usage: 48000 },
  { name: 'Thu', usage: 61000 },
  { name: 'Fri', usage: 55000 },
  { name: 'Sat', usage: 32000 },
  { name: 'Sun', usage: 38000 },
];

export default function OverviewPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight font-headline">Welcome back, Alex</h1>
          <p className="text-muted-foreground text-sm font-medium">Monitoring your P&G Intelligence assets.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-border/50 h-9 px-4 text-xs font-semibold">
            View Reports
          </Button>
          <Button className="h-9 px-4 text-xs font-bold gap-2 bg-primary text-white hover:bg-primary/90" asChild>
            <Link href="/playground">
              <Plus className="h-3.5 w-3.5" />
              New Analysis
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.name} className="border-border/50 bg-card/40 backdrop-blur-sm transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary" className="text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                  {stat.change}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{stat.name}</p>
                  <p className="text-[10px] text-muted-foreground">{stat.sub}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-8 border-border/50 bg-card/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
            <div>
              <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-900">
                Operational Velocity
              </CardTitle>
              <CardDescription>Daily consumption across all active P&G models.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="h-8 text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
              Last 7 Days <ChevronRight className="ml-1 h-3 w-3" />
            </Button>
          </CardHeader>
          <CardContent className="h-[300px] pl-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={usageData}>
                <defs>
                  <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="name" stroke="rgba(0,0,0,0.3)" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="rgba(0,0,0,0.3)" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="usage" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorUsage)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="lg:col-span-4">
          <Card className="border-border/50 bg-card/40 h-full">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground/70 flex items-center justify-between">
                Billing Overview
                <CreditCard className="h-4 w-4" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-tighter">Current Plan</p>
                  <p className="text-sm font-bold">Pro Enterprise</p>
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px] font-bold">ACTIVE</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  <span>Usage Limit</span>
                  <span>70%</span>
                </div>
                <div className="h-2 w-full bg-muted/30 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[70%]" />
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full text-[10px] h-8 font-bold uppercase tracking-widest mt-4">
                Manage Account <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="border-border/50 bg-card/40">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-bold">Recent Activity</CardTitle>
            <CardDescription>Your latest generations and data analysis.</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold uppercase">View History</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead className="text-[10px] uppercase font-bold">Analysis Name</TableHead>
                <TableHead className="text-[10px] uppercase font-bold">Type</TableHead>
                <TableHead className="text-[10px] uppercase font-bold">Model</TableHead>
                <TableHead className="text-[10px] uppercase font-bold">Status</TableHead>
                <TableHead className="text-right text-[10px] uppercase font-bold">Created</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentGenerations.map((gen) => (
                <TableRow key={gen.id} className="border-border/50 group">
                  <TableCell className="font-semibold text-sm">{gen.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px] font-bold h-5">{gen.type}</Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{gen.model}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={cn("h-1.5 w-1.5 rounded-full", gen.status === 'Success' ? "bg-emerald-500" : "bg-destructive")} />
                      <span className="text-xs font-medium">{gen.status}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground font-mono">{gen.time}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}


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
  History as HistoryIcon
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const stats = [
  { name: "Total Generations", value: "1,284", icon: Zap, change: "+12.5%", color: "text-primary" },
  { name: "Avg. Response Time", value: "1.2s", icon: Clock, change: "-0.4s", color: "text-secondary" },
  { name: "Token Usage", value: "428k", icon: TrendingUp, change: "+5.2%", color: "text-primary" },
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

const recentActivity = [
  { id: 1, type: "Code", title: "React Login Component", time: "2 minutes ago", tokens: "1.2k" },
  { id: 2, type: "Text", title: "Product Description: Smart Watch", time: "15 minutes ago", tokens: "450" },
  { id: 3, type: "Image", title: "Cyberpunk Street 4K", time: "1 hour ago", tokens: "2.1k" },
];

export default function OverviewPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Welcome back, Alex</h1>
        <p className="text-muted-foreground">Your AI generation summary for the last 7 days.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.name} className="lavender-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.name}</CardTitle>
              <stat.icon className={cn("h-4 w-4", stat.color)} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className={stat.change.startsWith('+') ? "text-primary" : "text-secondary"}>
                  {stat.change}
                </span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle className="font-headline">Usage Analytics</CardTitle>
            <CardDescription>Generations breakdown by content type.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={usageData}>
                <defs>
                  <linearGradient id="colorText" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  itemStyle={{ color: 'hsl(var(--primary))' }}
                />
                <Area type="monotone" dataKey="text" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorText)" strokeWidth={2} />
                <Area type="monotone" dataKey="code" stroke="hsl(var(--secondary))" fill="transparent" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline">Recent Activity</CardTitle>
            <CardDescription>Latest generated snippets.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4">
                  <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full bg-muted/50",
                    activity.type === "Code" ? "text-secondary" : activity.type === "Image" ? "text-primary" : "text-foreground"
                  )}>
                    {activity.type === "Code" ? <Code className="h-5 w-5" /> : activity.type === "Image" ? <ImageIcon className="h-5 w-5" /> : <Type className="h-5 w-5" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <Badge variant="outline" className="text-[10px] py-0 px-1.5 h-5">{activity.tokens} tokens</Badge>
                </div>
              ))}
              <Button asChild variant="ghost" className="w-full text-xs" size="sm">
                <Link href="/history">
                  <HistoryIcon className="mr-2 h-3 w-3" />
                  View Full History
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lavender-glow border-primary/20">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="bg-primary/20 p-2 rounded-lg">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Quick Generate</CardTitle>
              <CardDescription>Start a new project now</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Leverage our latest LLM models to generate high-quality text or code instantly.</p>
            <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/playground">Open Playground</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

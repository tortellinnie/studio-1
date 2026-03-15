
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
  Smile, 
  Meh, 
  Frown,
  CheckCircle2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { pngProducts } from '@/data/mockData';

const stats = [
  { name: "Token Usage", value: "842,012", change: "+12.5%", sub: "Monthly Quota" },
  { name: "Avg. Latency", value: "0.84s", change: "-14%", sub: "Global Average" },
  { name: "Active Models", value: "8", change: "+2", sub: "Currently Enabled" },
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
          <h1 className="text-3xl font-extrabold tracking-tight font-headline text-slate-900">Executive Overview</h1>
          <p className="text-muted-foreground text-sm font-medium">Lazada PH Fabric Category Intelligence Hub</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.name} className="border-border/50 bg-white transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary" className="text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                  {stat.change}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold tracking-tight text-slate-900">{stat.value}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{stat.name}</p>
                  <p className="text-[10px] text-muted-foreground">{stat.sub}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Operational Velocity Trend */}
      <Card className="border-border/50 bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
          <div>
            <CardTitle className="text-lg font-bold text-slate-900">
              Operational Velocity
            </CardTitle>
            <CardDescription>Daily consumption across all active category models.</CardDescription>
          </div>
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
                contentStyle={{ backgroundColor: 'white', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
              />
              <Area type="monotone" dataKey="usage" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorUsage)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Taglish-Aware Sentiment Analysis Integration */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-900">Taglish-Aware AI Sentiment</h2>
          <p className="text-muted-foreground text-sm">Advanced NLP model trained on Filipino-English code-switching patterns</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            { label: "Positive", value: "68%", sub: "9,876 reviews", icon: Smile, color: "text-green-500", border: "border-l-green-500" },
            { label: "Neutral", value: "22%", sub: "3,198 reviews", icon: Meh, color: "text-orange-500", border: "border-l-orange-500" },
            { label: "Negative", value: "10%", sub: "1,453 reviews", icon: Frown, color: "text-red-500", border: "border-l-red-500" },
          ].map((item, i) => (
            <Card key={i} className={`border-l-4 ${item.border} bg-white shadow-sm`}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <item.icon className={`h-4 w-4 ${item.color}`} />
                  {item.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">{item.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{item.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-border/50 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-900">Product-Level Sentiment Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {pngProducts.slice(0, 4).map((product) => (
              <div key={product.id} className="border-b border-border/50 pb-6 last:border-b-0 last:pb-0">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{product.name}</h3>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground mt-1">{product.reviewCount.toLocaleString()} reviews analyzed</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase">
                      <span className="text-green-500">Positive</span>
                      <span className="font-mono text-slate-700">{product.sentimentDistribution.positive}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full bg-green-500" style={{ width: `${product.sentimentDistribution.positive}%` }} />
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase">
                      <span className="text-orange-500">Neutral</span>
                      <span className="font-mono text-slate-700">{product.sentimentDistribution.neutral}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full bg-orange-500" style={{ width: `${product.sentimentDistribution.neutral}%` }} />
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase">
                      <span className="text-red-500">Negative</span>
                      <span className="font-mono text-slate-700">{product.sentimentDistribution.negative}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full bg-red-500" style={{ width: `${product.sentimentDistribution.negative}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

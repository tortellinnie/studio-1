"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  BarChart,
  Bar,
  Legend
} from "recharts";
import { 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  Info,
  Activity,
  Smile
} from "lucide-react";
import { pngProducts, multiBrandTrends } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const sentimentDist = [
  { name: 'Positive', value: 68, color: '#10b981' },
  { name: 'Neutral', value: 22, color: '#f59e0b' },
  { name: 'Negative', value: 10, color: '#ef4444' },
];

const vectorAvg = [
  { name: 'Product', 'P&G Average': 85, 'Competitor Average': 72 },
  { name: 'Packaging', 'P&G Average': 68, 'Competitor Average': 65 },
  { name: 'Value', 'P&G Average': 78, 'Competitor Average': 70 },
  { name: 'Comm', 'P&G Average': 72, 'Competitor Average': 68 },
  { name: 'Retail Exec', 'P&G Average': 65, 'Competitor Average': 63 },
];

export default function OverviewPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="space-y-16 animate-in fade-in duration-500 max-w-[1800px] mx-auto pb-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-black font-headline text-slate-900 tracking-tighter">Mission Control</h1>
          <p className="text-3xl font-bold text-slate-500 uppercase tracking-widest">Fabric Care: Lazada PH intelligence</p>
        </div>
        <Badge className="bg-[#003da5] text-white px-8 py-3 text-sm font-black tracking-widest uppercase">Live Data: Oct 2023</Badge>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {[
          { title: "Total Reviews", value: "37.5k", sub: "Lazada PH Catalog", color: "text-[#003da5]", icon: Activity },
          { title: "Avg Rating", value: "4.42", sub: "Sentiment Corrected", color: "text-emerald-600", icon: CheckCircle2 },
          { title: "Inflation", value: "96.8%", sub: "Platform Bias", color: "text-rose-600", icon: AlertCircle },
          { title: "Sentiment", value: "72%", sub: "Positive Index", color: "text-emerald-600", icon: Smile },
        ].map((item, i) => (
          <Card key={i} className="border-border/50 shadow-2xl bg-white p-6 rounded-[2.5rem]">
            <CardHeader className="pb-8 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-[0.4em]">{item.title}</CardTitle>
              <item.icon className={cn("h-8 w-8", item.color)} />
            </CardHeader>
            <CardContent>
              <div className={cn("text-7xl font-black tracking-tighter", item.color)}>{item.value}</div>
              <p className="text-xl text-slate-500 font-bold mt-8 flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-slate-200" />
                {item.sub}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <Card className="lg:col-span-2 border-border/50 shadow-2xl bg-white rounded-[3rem]">
          <CardHeader className="p-16">
            <CardTitle className="text-5xl font-black text-slate-900 tracking-tight">Sentiment Trends</CardTitle>
            <CardDescription className="text-2xl font-bold mt-4 text-slate-400">Monthly Performance Benchmark</CardDescription>
          </CardHeader>
          <CardContent className="h-[650px] p-16 pt-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={multiBrandTrends} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={24} tickLine={false} axisLine={false} dy={20} fontWeight={900} />
                <YAxis stroke="#94a3b8" fontSize={24} tickLine={false} axisLine={false} domain={[50, 80]} fontWeight={900} />
                <Tooltip contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 30px 40px -10px rgba(0,0,0,0.1)', fontSize: '24px', fontWeight: 900 }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '60px', fontSize: '24px', fontWeight: 900 }} />
                <Line type="monotone" dataKey="P&G" stroke="#003da5" strokeWidth={10} dot={{ r: 12, fill: '#003da5' }} activeDot={{ r: 16 }} />
                <Line type="monotone" dataKey="Surf" stroke="#94a3b8" strokeWidth={6} strokeDasharray="12 12" />
                <Line type="monotone" dataKey="Breeze" stroke="#cbd5e1" strokeWidth={6} strokeDasharray="12 12" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-2xl bg-white rounded-[3rem]">
          <CardHeader className="p-16">
            <CardTitle className="text-5xl font-black text-slate-900 tracking-tight">Portfolio Health</CardTitle>
          </CardHeader>
          <CardContent className="h-[650px] flex flex-col items-center justify-center p-16">
            <ResponsiveContainer width="100%" height="450">
              <PieChart>
                <Pie data={sentimentDist} cx="50%" cy="50%" innerRadius={130} outerRadius={190} paddingAngle={12} dataKey="value">
                  {sentimentDist.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="w-full mt-16 grid grid-cols-3 gap-12">
              {sentimentDist.map((item) => (
                <div key={item.name} className="flex flex-col items-center">
                  <span className="text-xs font-black text-slate-400 uppercase mb-4 tracking-[0.4em]">{item.name}</span>
                  <span className="text-5xl font-black tracking-tighter" style={{ color: item.color }}>{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vector Row */}
      <Card className="border-border/50 shadow-2xl bg-white rounded-[3rem]">
        <CardHeader className="p-16">
          <CardTitle className="text-5xl font-black text-slate-900 tracking-tight">5 Vectors of Superiority</CardTitle>
          <CardDescription className="text-2xl font-bold mt-4 text-slate-400">P&G Average vs Category Competitors</CardDescription>
        </CardHeader>
        <CardContent className="h-[650px] p-16">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={vectorAvg} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={20} tickLine={false} axisLine={false} dy={25} fontWeight={900} />
              <YAxis stroke="#94a3b8" fontSize={24} tickLine={false} axisLine={false} domain={[0, 100]} fontWeight={900} />
              <Tooltip cursor={{ fill: '#f8fafc' }} />
              <Legend iconType="rect" wrapperStyle={{ paddingTop: '70px', fontSize: '24px', fontWeight: 900 }} />
              <Bar dataKey="P&G Average" fill="#003da5" radius={[12, 12, 0, 0]} />
              <Bar dataKey="Competitor Average" fill="#cbd5e1" radius={[12, 12, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}


"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Legend
} from "recharts";
import { 
  CheckCircle2, 
  TrendingUp, 
  AlertCircle, 
  Smile, 
  Meh, 
  Frown,
  Activity,
  Target,
  Star,
  ShieldAlert,
  Wallet,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { NotificationBanner } from "@/components/NotificationBanner";
import { 
  dynamicGlobalSentiment, 
  totalCacheCount,
  criticalVector,
  globalCorrectedRating,
  revenueAtRisk,
  personaInsights,
  accountSignals,
  sentimentTrends
} from "@/data/mockData";

const distributionData = [
  { name: 'Positive', value: dynamicGlobalSentiment.positive, color: '#22c55e' },
  { name: 'Neutral', value: dynamicGlobalSentiment.neutral, color: '#f59e0b' },
  { name: 'Negative', value: dynamicGlobalSentiment.negative, color: '#ef4444' }
];

export default function OverviewPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-[1400px] mx-auto pb-10 px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tighter text-slate-900 font-headline uppercase">Market Intelligence Hub</h1>
          <p className="text-base text-muted-foreground font-bold uppercase tracking-widest leading-none">Protecting ₱50M Revenue via {totalCacheCount.toLocaleString()} NLP Signals</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-[#003da5] rounded-lg shadow-lg">
          <Activity className="h-4 w-4 text-white" />
          <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">Inference Live-Sync</span>
        </div>
      </div>

      <NotificationBanner />

      {/* Winning Edge Strategic KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-sm border-l-4 border-l-red-500 bg-white hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">Revenue at Risk</CardTitle>
            <Wallet className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-red-600 tracking-tighter">₱{(revenueAtRisk / 1000000).toFixed(1)}M</div>
            <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-tight">Based on {dynamicGlobalSentiment.negative}% negative friction</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-l-4 border-l-[#003da5] bg-white hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">Corrected Rating</CardTitle>
            <Star className="h-4 w-4 text-[#003da5]" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-slate-900 tracking-tighter">{globalCorrectedRating} <span className="text-sm text-slate-300">/ 5.0</span></div>
            <p className="text-[10px] text-emerald-500 font-bold mt-1 uppercase tracking-tight">Sentiment Adjusted</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-l-4 border-l-orange-500 bg-white hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">Execution Risk</CardTitle>
            <ShieldAlert className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-slate-900 tracking-tighter">{accountSignals.severity}<span className="text-sm text-slate-300">/10</span></div>
            <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-tight">{accountSignals.type} Issue</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-l-4 border-l-emerald-500 bg-white hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">Viral Risk Flag</CardTitle>
            <Zap className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className={cn("text-4xl font-black tracking-tighter", personaInsights.socialStrategist.viralRisk === "HIGH" ? "text-red-500" : "text-emerald-500")}>
              {personaInsights.socialStrategist.viralRisk}
            </div>
            <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-tight">Social Defense Status</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Charts Section */}
        <Card className="lg:col-span-8 shadow-sm border-slate-200 bg-white">
          <CardHeader className="p-8 border-b border-slate-50 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-black text-slate-900 uppercase tracking-tight">Market Sentiment Pulse</CardTitle>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tracking positive vs negative trajectories</p>
            </div>
            <Badge className="bg-[#003da5] text-white font-black px-4 py-1 rounded-lg">LIVE FEED</Badge>
          </CardHeader>
          <CardContent className="h-[450px] p-10 pt-12">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sentimentTrends}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tick={{ fontWeight: 900 }} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tick={{ fontWeight: 900 }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 900 }} />
                <Legend verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ paddingTop: '20px', fontWeight: 900, fontSize: '10px', textTransform: 'uppercase' }} />
                <Line type="monotone" dataKey="positive" name="Positive %" stroke="#22c55e" strokeWidth={4} dot={{ r: 6, fill: '#22c55e', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="negative" name="Negative %" stroke="#ef4444" strokeWidth={4} dot={{ r: 6, fill: '#ef4444', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Global Market Health Module */}
        <Card className="lg:col-span-4 shadow-sm border-slate-200 bg-white overflow-hidden">
          <CardHeader className="p-8 border-b border-slate-50 bg-slate-50/20">
            <CardTitle className="text-xl font-black text-slate-900 uppercase tracking-tight text-center">Global Market Health</CardTitle>
          </CardHeader>
          <CardContent className="p-10 flex flex-col items-center justify-center relative min-h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={100}
                  outerRadius={140}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center justify-center pointer-events-none">
              <span className="text-6xl font-black text-slate-900 tabular-nums tracking-tighter">{dynamicGlobalSentiment.positive}%</span>
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Industry Positive</span>
            </div>
            <div className="w-full mt-10 space-y-4">
              {distributionData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.name}</span>
                  </div>
                  <span className="text-sm font-black text-slate-900 tabular-nums">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

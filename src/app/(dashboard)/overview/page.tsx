
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
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { NotificationBanner } from "@/components/NotificationBanner";
import { 
  allIndustryProducts, 
  sentimentTrends, 
  dynamicGlobalSentiment, 
  totalCacheCount,
  positiveCount,
  negativeCount,
  neutralCount,
  criticalVector,
  globalCorrectedRating
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
          <h1 className="text-3xl font-black tracking-tighter text-slate-900 font-headline uppercase">Market Intelligence Dashboard</h1>
          <p className="text-base text-muted-foreground font-bold uppercase tracking-widest leading-none">Industry analysis powered by {totalCacheCount.toLocaleString()} Taglish NLP samples</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-[#003da5] rounded-lg shadow-lg">
          <Activity className="h-4 w-4 text-white" />
          <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">Live Data Feed</span>
        </div>
      </div>

      <NotificationBanner />

      {/* Strategic KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Market Samples", value: totalCacheCount.toLocaleString(), sub: "Inference-Validated", icon: Target, iconColor: "text-[#003da5]" },
          { title: "Corrected Rating", value: globalCorrectedRating, sub: "NLP Sentiment Adjusted", icon: Star, iconColor: "text-orange-400" },
          { title: "Portfolio Health", value: `${dynamicGlobalSentiment.positive}%`, sub: "Positive Consensus", icon: TrendingUp, iconColor: "text-emerald-500" },
          { title: "Worst Vector", value: criticalVector.vector, sub: `${criticalVector.healthScore}% Index Score`, icon: AlertCircle, iconColor: "text-red-500" },
        ].map((item, i) => (
          <Card key={i} className="shadow-sm border-slate-200 bg-white group hover:border-[#003da5]/30 transition-all overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-3 space-y-0">
              <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{item.title}</CardTitle>
              <item.icon className={cn("h-4 w-4", item.iconColor)} />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-slate-900 tabular-nums tracking-tighter">{item.value}</div>
              <p className="text-[10px] text-muted-foreground font-black mt-2 uppercase tracking-widest">{item.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Taglish Sentiment Analysis Module */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight text-slate-900 font-headline uppercase tracking-tighter flex items-center gap-3">
          <Smile className="h-6 w-6 text-[#003da5]" />
          Taglish-Aware AI Sentiment Analysis
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-l-4 border-l-[#22c55e] shadow-sm bg-white overflow-hidden">
            <CardContent className="pt-8 space-y-2">
              <div className="flex items-center gap-2 text-[#22c55e]">
                <Smile className="h-4 w-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Positive</span>
              </div>
              <div className="text-5xl font-black text-slate-900 tabular-nums">{dynamicGlobalSentiment.positive}%</div>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">{positiveCount.toLocaleString()} Validated Signals</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-[#f59e0b] shadow-sm bg-white overflow-hidden">
            <CardContent className="pt-8 space-y-2">
              <div className="flex items-center gap-2 text-[#f59e0b]">
                <Meh className="h-4 w-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Neutral</span>
              </div>
              <div className="text-5xl font-black text-slate-900 tabular-nums">{dynamicGlobalSentiment.neutral}%</div>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">{neutralCount.toLocaleString()} Mixed Signals</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-[#ef4444] shadow-sm bg-white overflow-hidden">
            <CardContent className="pt-8 space-y-2">
              <div className="flex items-center gap-2 text-[#ef4444]">
                <Frown className="h-4 w-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Negative</span>
              </div>
              <div className="text-5xl font-black text-slate-900 tabular-nums">{dynamicGlobalSentiment.negative}%</div>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">{negativeCount.toLocaleString()} Friction Points</p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-sm border-slate-200 bg-white">
          <CardHeader className="border-b border-slate-50 py-6 px-8">
            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">Industry-Wide Product Sentiment Distribution (Top 5)</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-50">
              {allIndustryProducts.slice(0, 5).map((item, i) => (
                <div key={i} className="p-8 space-y-6 hover:bg-slate-50/50 transition-colors group">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h4 className="text-xl font-black text-slate-900 tracking-tighter group-hover:text-[#003da5] transition-colors uppercase">{item.name}</h4>
                        {item.isPNG && <Badge className="bg-[#003da5] text-white text-[8px] font-black h-5 uppercase px-2 rounded-md">P&G CORE</Badge>}
                      </div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{item.brand} • {item.reviewCount.toLocaleString()} reviews processed</p>
                    </div>
                    <Badge variant="outline" className="h-7 px-4 border-slate-200 text-slate-500 font-black text-[10px] uppercase tracking-widest">RANK #{i+1}</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                        <span className="text-emerald-600">Positive</span>
                        <span className="text-slate-900">{item.sentimentDistribution.positive}%</span>
                      </div>
                      <Progress value={item.sentimentDistribution.positive} className="h-2 bg-slate-100" indicatorClassName="bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.2)]" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                        <span className="text-orange-500">Neutral</span>
                        <span className="text-slate-900">{item.sentimentDistribution.neutral}%</span>
                      </div>
                      <Progress value={item.sentimentDistribution.neutral} className="h-2 bg-slate-100" indicatorClassName="bg-orange-400" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                        <span className="text-red-500">Negative</span>
                        <span className="text-slate-900">{item.sentimentDistribution.negative}%</span>
                      </div>
                      <Progress value={item.sentimentDistribution.negative} className="h-2 bg-slate-100" indicatorClassName="bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-sm border-slate-200 bg-white">
          <CardHeader className="p-8 pb-4 border-b border-slate-50 bg-slate-50/20">
            <CardTitle className="text-lg font-black text-slate-900 uppercase tracking-tight">Market Sentiment Pulse</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px] p-8 pt-8">
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

        <Card className="shadow-sm border-slate-200 bg-white">
          <CardHeader className="p-8 pb-4 border-b border-slate-50 bg-slate-50/20">
            <CardTitle className="text-lg font-black text-slate-900 uppercase tracking-tight">Global Market Health</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px] p-8 pt-8 relative flex items-center justify-center">
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
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-6xl font-black text-slate-900 tabular-nums tracking-tighter">{dynamicGlobalSentiment.positive}%</span>
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Industry Positive</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

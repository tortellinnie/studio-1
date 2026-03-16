"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Cell 
} from "recharts";
import { 
  Activity, 
  TrendingUp, 
  AlertCircle, 
  ShieldAlert, 
  Wallet, 
  Zap, 
  ArrowUpRight,
  Clock
} from "lucide-react";
import { getStatsForPeriod, totalCacheCount, personaInsights, allIndustryProducts, sentimentTrends } from "@/data/mockData";
import { cn } from "@/lib/utils";

export default function OverviewPage() {
  const [period, setPeriod] = useState(90);
  const [stats, setStats] = useState(getStatsForPeriod(90));
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setStats(getStatsForPeriod(period));
  }, [period]);

  if (!isClient) return null;

  const distributionData = [
    { name: 'Positive', value: stats.posPct, color: '#10b981' },
    { name: 'Neutral', value: stats.neutralPct, color: '#f59e0b' },
    { name: 'Negative', value: stats.negPct, color: '#ef4444' }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-slate-900 leading-tight">Market Intelligence Hub</h1>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em]">
            Protecting ₱50M Revenue via {totalCacheCount.toLocaleString()} NLP Signals
          </p>
        </div>
        <div className="flex bg-white border border-slate-200 p-1.5 shadow-sm">
          {[7, 30, 90].map((d) => (
            <button 
              key={d}
              onClick={() => setPeriod(d)}
              className={cn(
                "px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all",
                period === d ? "bg-slate-900 text-white" : "text-slate-400 hover:text-slate-900"
              )}
            >
              {d} Days
            </button>
          ))}
        </div>
      </div>

      {/* Sentiment Analysis Feature */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* The Gauge Component */}
        <Card className="lg:col-span-4 glass-card p-10 flex flex-col items-center justify-center relative min-h-[450px]">
          <div className="absolute top-8 left-10 flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Corrected Health</span>
          </div>
          
          <div className="relative w-full flex flex-col items-center">
            {/* SVG Semi-Circle Gauge */}
            <svg className="w-64 h-32" viewBox="0 0 100 50">
              <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#f1f5f9" strokeWidth="10" strokeLinecap="round" />
              <path 
                d="M 10 50 A 40 40 0 0 1 90 50" 
                fill="none" 
                stroke="#003da5" 
                strokeWidth="10" 
                strokeLinecap="round" 
                strokeDasharray={`${(stats.correctedRating / 5) * 126} 126`}
              />
            </svg>
            <div className="text-center mt-[-20px]">
              <span className="text-7xl font-black text-slate-900 tracking-tighter">{stats.correctedRating}</span>
              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Market Superiority</p>
            </div>
          </div>

          <div className="w-full mt-12 grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 border border-slate-100">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Positive Pulse</p>
              <p className="text-2xl font-black text-slate-900 tracking-tighter">{stats.posPct}%</p>
            </div>
            <div className="bg-slate-50 p-4 border border-slate-100">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Negative Friction</p>
              <p className="text-2xl font-black text-red-500 tracking-tighter">{stats.negPct}%</p>
            </div>
          </div>
        </Card>

        {/* Sentiment Trends Graph */}
        <Card className="lg:col-span-8 glass-card">
          <CardHeader className="p-8 border-b border-slate-50 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold uppercase tracking-tight text-slate-900">Analysis Timeline</CardTitle>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sentiment trajectory over period</p>
            </div>
            <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 font-black text-[9px] uppercase tracking-widest px-3">Live Feed</Badge>
          </CardHeader>
          <CardContent className="h-[350px] p-8">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sentimentTrends}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} tick={{ fontWeight: 900, textTransform: 'uppercase' }} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} tick={{ fontWeight: 900 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '0px', border: '1px solid #e2e8f0', boxShadow: 'none', fontWeight: 900, fontSize: '10px' }}
                />
                <Line type="monotone" dataKey="positive" name="Positive %" stroke="#10b981" strokeWidth={4} dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="negative" name="Negative %" stroke="#ef4444" strokeWidth={4} dot={{ r: 4, fill: '#ef4444', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Bento Briefings */}
      <div className="space-y-8">
        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-4">
          <ShieldAlert className="h-8 w-8 text-primary" />
          Strategic Account Briefings
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Supply Chain */}
          <Card className="glass-card overflow-hidden">
            <div className="h-1 bg-orange-500 w-full" />
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-50 text-orange-600 shadow-inner">
                  <Activity className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 uppercase">Supply Chain Manager</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Operational Risk</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black text-slate-400 uppercase">Alert Score</span>
                  <span className="text-4xl font-black text-slate-900 tracking-tighter">{personaInsights.supplyChain.alertScore}/10</span>
                </div>
                <div className="p-5 bg-slate-50 border border-slate-100 leading-relaxed italic text-sm font-medium text-slate-600">
                  "{personaInsights.supplyChain.recommendation}"
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Brand Manager */}
          <Card className="glass-card overflow-hidden">
            <div className="h-1 bg-primary w-full" />
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-primary shadow-inner">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 uppercase">Brand Manager</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Value & Resonance</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black text-slate-400 uppercase">Nuance Flag</span>
                  <Badge variant="outline" className="border-primary text-primary font-black text-[9px] uppercase">{personaInsights.brandManager.taglishNuance}</Badge>
                </div>
                <div className="p-5 bg-slate-50 border border-slate-100 leading-relaxed italic text-sm font-medium text-slate-600">
                  "{personaInsights.brandManager.campaignPivot}"
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Defense */}
          <Card className="glass-card overflow-hidden">
            <div className="h-1 bg-red-500 w-full" />
            <CardContent className="p-8 space-y-6 text-slate-900">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-50 text-red-600 shadow-inner">
                  <AlertCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 uppercase">Social Strategist</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Viral Defense</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase">Viral Status</span>
                  <Badge className={cn(
                    "font-black text-[9px] px-3",
                    personaInsights.socialStrategist.viralRisk === "CRITICAL" ? "bg-red-500" : "bg-emerald-500"
                  )}>{personaInsights.socialStrategist.viralRisk}</Badge>
                </div>
                <div className="bg-slate-900 p-5 space-y-3">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Drafted Response</p>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium italic">"{personaInsights.socialStrategist.suggestedResponse}"</p>
                  <button className="w-full py-2 bg-white/10 hover:bg-white/20 text-white text-[9px] font-black uppercase tracking-widest transition-all">Copy Response</button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Industry Rankings Section */}
      <div className="space-y-8 pt-12 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Market Performance Matrix</h2>
          <Button variant="outline" className="rounded-none border-slate-200 text-[10px] font-black uppercase tracking-widest px-8 h-12 hover:bg-slate-900 hover:text-white transition-all">
            Download Audit
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allIndustryProducts.slice(0, 4).map((item) => (
            <Card key={item.id} className="glass-card p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-lg font-black text-slate-900 leading-tight uppercase tracking-tight">{item.name}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.brand}</p>
                </div>
                <Badge variant="outline" className={cn(
                  "font-black text-[9px]",
                  item.isPNG ? "border-primary text-primary" : "border-slate-300 text-slate-400"
                )}>
                  {item.isPNG ? "P&G" : "COMP"}
                </Badge>
              </div>
              <div className="flex items-end gap-3 pt-2">
                <span className="text-4xl font-black text-slate-900 tracking-tighter">{item.correctedRating}</span>
                <div className="flex flex-col mb-1">
                  <span className="text-[10px] font-black text-emerald-500 uppercase flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> NLP Adjusted
                  </span>
                  <span className="text-[9px] font-bold text-slate-300 uppercase line-through">Orig: {item.originalRating}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
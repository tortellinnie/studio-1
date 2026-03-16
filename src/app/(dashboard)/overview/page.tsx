"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  ThumbsUp, 
  ThumbsDown, 
  Minus,
  Smile,
  Info,
  Activity,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import { getStatsForPeriod, personaInsights } from '@/data/mockData';
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

  const pieData = [
    { name: 'Positive', value: stats.posPct, color: '#10b981' },
    { name: 'Negative', value: stats.negPct, color: '#ef4444' },
    { name: 'Neutral', value: stats.neutralPct, color: '#f59e0b' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-sm text-slate-500 font-medium leading-relaxed">
          GenAI-powered insights for P&G e-commerce performance
        </p>
      </div>

      {/* NEW: KPI ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-sm border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Total Reviews Analyzed</span>
              <CheckCircle2 className="h-4 w-4 text-slate-400" />
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-slate-900">{stats.total.toLocaleString()}</div>
              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-tight">Across all P&G products</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Avg Corrected Rating</span>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-slate-900">{stats.correctedRating}</div>
              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-tight">vs 4.82 original</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Rating Inflation</span>
              <AlertCircle className="h-4 w-4 text-orange-500" />
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-slate-900">{stats.ratingInflation}%</div>
              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-tight">Lazada's 5-star bias</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Positive Sentiment</span>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-slate-900">{stats.posPct}%</div>
              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-tight">+3% from last month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Controls */}
      <div className="flex flex-wrap gap-2 pb-2">
        {[
          { id: 7, label: 'Past 7 days' },
          { id: 30, label: 'Past 30 days' },
          { id: 90, label: 'Past 3 months' }
        ].map((p) => (
          <button
            key={p.id}
            onClick={() => setPeriod(p.id)}
            className={cn(
              "px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition-all border",
              period === p.id 
                ? "bg-slate-900 text-white border-slate-900" 
                : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Primary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sentiment Gauge */}
        <Card className="lg:col-span-4 shadow-sm border-slate-200 flex flex-col items-center justify-center py-10 relative overflow-hidden">
          <Badge className="absolute top-4 bg-slate-100 text-slate-900 font-bold text-[9px] uppercase tracking-widest px-3 py-0.5 border-none">Market Health Index</Badge>
          
          <div className="relative mt-6">
            <svg className="w-64 h-32" viewBox="0 0 100 50">
              <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#f1f5f9" strokeWidth="8" strokeLinecap="round" />
              <path d="M 10 50 A 40 40 0 0 1 36.6 15.4" fill="none" stroke="#ef4444" strokeWidth="8" />
              <path d="M 36.6 15.4 A 40 40 0 0 1 63.4 15.4" fill="none" stroke="#f59e0b" strokeWidth="8" />
              <path d="M 63.4 15.4 A 40 40 0 0 1 90 50" fill="none" stroke="#10b981" strokeWidth="8" />
              <line 
                x1="50" y1="50" 
                x2={50 + 35 * Math.cos((1 - stats.correctedRating/5) * Math.PI)} 
                y2={50 - 35 * Math.sin((1 - stats.correctedRating/5) * Math.PI)} 
                stroke="#334155" strokeWidth="2" strokeLinecap="round" 
              />
              <circle cx="50" cy="50" r="3" fill="#334155" />
            </svg>
            
            <div className="flex flex-col items-center mt-[-10px]">
              <div className="flex items-center gap-2">
                <Smile className="h-6 w-6 text-slate-900" />
                <span className="text-4xl font-bold text-slate-900 tabular-nums">{stats.correctedRating}</span>
              </div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">NLP Score / 5.0</p>
            </div>
          </div>
        </Card>

        {/* Breakdown */}
        <Card className="lg:col-span-5 shadow-sm border-slate-200 flex items-center justify-center p-8 relative overflow-hidden">
          <Badge className="absolute top-4 bg-slate-100 text-slate-900 font-bold text-[9px] uppercase tracking-widest px-3 py-0.5 border-none">Sentiment Distribution</Badge>
          <div className="w-full flex items-center justify-between gap-8 mt-4">
            <div className="w-1/2 h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-4 flex-1">
              {[
                { label: 'Positive', value: stats.posPct, icon: ThumbsUp, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                { label: 'Negative', value: stats.negPct, icon: ThumbsDown, color: 'text-red-500', bg: 'bg-red-50' },
                { label: 'Neutral', value: stats.neutralPct, icon: Minus, color: 'text-amber-500', bg: 'bg-amber-50' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className={cn("p-1.5 rounded-full", item.bg, item.color)}>
                    <item.icon className="h-3 w-3" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className={cn("text-lg font-bold tabular-nums", item.color)}>{item.value}%</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{item.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Persona Insights Sidebar */}
        <div className="lg:col-span-3 space-y-4">
          <Card className="border-l-4 border-l-[#003da5] shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Supply Chain Alert</span>
                <span className="text-lg font-black text-[#003da5]">{personaInsights.supplyChain.alertScore}/10</span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">{personaInsights.supplyChain.recommendation}</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Campaign Resonance</span>
                <Badge className="bg-emerald-500 text-white text-[8px] font-bold">STABLE</Badge>
              </div>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">{personaInsights.brandManager.taglishNuance}</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Viral Risk Flag</span>
                <Badge className="bg-red-500 text-white text-[8px] font-bold uppercase">{personaInsights.socialStrategist.viralRisk}</Badge>
              </div>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed italic">"{personaInsights.socialStrategist.suggestedResponse}"</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* NEW: COMPARATIVE SENTIMENT TRENDS */}
      <Card className="shadow-sm border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900">Sentiment Trends: P&G vs Competitors</h2>
          <Badge variant="outline" className="text-[9px] font-bold text-slate-400 border-slate-200">REAL-TIME NLP COMPARISON</Badge>
        </div>
        <CardContent className="p-8 h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats.timeline}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} tick={{ fontWeight: 600 }} />
              <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} tick={{ fontWeight: 600 }} unit="%" />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '11px' }}
              />
              <Legend verticalAlign="top" align="right" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' }} />
              <Line type="monotone" dataKey="P&G" stroke="#003da5" strokeWidth={3} dot={{ r: 4, fill: '#003da5' }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="Competitors" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3, fill: '#cbd5e1' }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bottom Timeline (Existing) */}
      <Card className="shadow-sm border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900">Analysis Timeline & Sentiment Drift</h2>
        </div>
        <CardContent className="p-8 h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.timeline} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} tick={{ fontWeight: 600 }} />
              <YAxis yAxisId="left" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} tick={{ fontWeight: 600 }} />
              <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} tick={{ fontWeight: 600 }} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="top" align="center" height={40} iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', paddingBottom: '20px' }} />
              
              <Bar yAxisId="left" dataKey="Positive" stackId="a" fill="#10b981" radius={0} />
              <Bar yAxisId="left" dataKey="Neutral" stackId="a" fill="#f59e0b" radius={0} />
              <Bar yAxisId="left" dataKey="Negative" stackId="a" fill="#ef4444" radius={0} />
              
              <Line yAxisId="right" type="monotone" dataKey="Sentiment Score" stroke="#4a90e2" strokeWidth={2} dot={{ r: 3, fill: '#fff', stroke: '#4a90e2', strokeWidth: 2 }} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-center gap-2">
          <Info className="h-3 w-3 text-slate-400" />
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
            Automatic NLP validation via inference_cache.json
          </p>
        </div>
      </Card>
    </div>
  );
}

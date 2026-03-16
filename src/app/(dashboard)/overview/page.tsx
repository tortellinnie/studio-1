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
  Info
} from "lucide-react";
import { getStatsForPeriod, totalCacheCount } from '@/data/mockData';
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
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      {/* Editorial Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Dashboard to track sentiment analysis process</h1>
        <div className="max-w-4xl p-6 bg-white/50 border border-slate-200 text-xs font-medium text-slate-500 leading-relaxed">
          This dashboard showcases sentiment analysis in P&G Fabric Care business processes. 
          The data enables HR and Brand management to determine customer sentiments and opinions regarding 
          business image and products sold through tracking 500+ NLP validated Taglish signals.
        </div>
      </div>

      {/* Top Level Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Overall Sentiment Level (Gauge) */}
        <Card className="lg:col-span-4 glass-card relative overflow-hidden flex flex-col items-center justify-center py-10">
          <Badge className="absolute top-4 bg-white border border-slate-200 text-slate-900 font-black text-[10px] uppercase tracking-widest px-4 py-1">Overall customer sentiment level</Badge>
          
          <div className="relative mt-8">
            <svg className="w-64 h-32" viewBox="0 0 100 50">
              <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#f1f5f9" strokeWidth="8" strokeLinecap="round" />
              {/* Colored Arcs */}
              <path d="M 10 50 A 40 40 0 0 1 36.6 15.4" fill="none" stroke="#ef4444" strokeWidth="8" />
              <path d="M 36.6 15.4 A 40 40 0 0 1 63.4 15.4" fill="none" stroke="#f59e0b" strokeWidth="8" />
              <path d="M 63.4 15.4 A 40 40 0 0 1 90 50" fill="none" stroke="#10b981" strokeWidth="8" />
              {/* Needle */}
              <line 
                x1="50" y1="50" 
                x2={50 + 35 * Math.cos((1 - stats.correctedRating/5) * Math.PI)} 
                y2={50 - 35 * Math.sin((1 - stats.correctedRating/5) * Math.PI)} 
                stroke="#334155" strokeWidth="2" strokeLinecap="round" 
              />
              <circle cx="50" cy="50" r="3" fill="#334155" />
            </svg>
            
            <div className="flex flex-col items-center mt-[-10px]">
              <div className="flex items-center gap-3">
                <Smile className="h-8 w-8 text-slate-900" />
                <span className="text-5xl font-black text-slate-900 tabular-nums">{stats.correctedRating}</span>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Out of 5</p>
              <p className="text-xl font-black text-emerald-500 uppercase tracking-tighter mt-2">{stats.posPct > 60 ? 'Positive' : stats.posPct > 40 ? 'Moderate' : 'Risk'}</p>
            </div>
          </div>
        </Card>

        {/* Sentiment Breakdown (Pie) */}
        <Card className="lg:col-span-5 glass-card relative overflow-hidden pt-12">
          <Badge className="absolute top-4 left-1/2 -translate-x-1/2 bg-white border border-slate-200 text-slate-900 font-black text-[10px] uppercase tracking-widest px-4 py-1">Comments on public posts</Badge>
          <CardContent className="h-full flex items-center justify-between px-10">
            <div className="w-1/2 h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={0}
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
              <div className="absolute top-[55%] left-[28%] -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <p className="text-[8px] font-black text-slate-400 uppercase leading-none">Sentiment</p>
                <p className="text-[8px] font-black text-slate-400 uppercase leading-none">Breakdown</p>
              </div>
            </div>
            
            <div className="space-y-6 flex-1 ml-10">
              {[
                { label: 'Positive', value: stats.posPct, icon: ThumbsUp, color: 'text-emerald-500' },
                { label: 'Negative', value: stats.negPct, icon: ThumbsDown, color: 'text-red-500' },
                { label: 'Neutral', value: stats.neutralPct, icon: Minus, color: 'text-amber-500' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4 group">
                  <div className={cn("p-2 rounded-full bg-slate-50 border border-slate-100", item.color)}>
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className={cn("text-2xl font-black tabular-nums", item.color)}>{item.value}%</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Period Selector & Mini KPIs */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white border border-slate-200 p-1 flex flex-col gap-1 shadow-sm">
            {[
              { id: 7, label: 'Past 7 days' },
              { id: 30, label: 'Past 30 days' },
              { id: 90, label: 'Past 3 months' }
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setPeriod(p.id)}
                className={cn(
                  "w-full py-2.5 px-4 text-[10px] font-black uppercase tracking-widest text-left transition-all",
                  period === p.id ? "bg-slate-900 text-white" : "text-slate-400 hover:bg-slate-50"
                )}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="bg-[#f28c38] p-6 text-white relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl font-black tabular-nums">{stats.total}</div>
                  <div className="h-10 w-10 rounded-full border border-white/30 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Comments</span>
                  <div className="flex flex-col items-end">
                    <span className="text-xl font-black tracking-tighter text-[#ffd700]">43.63%</span>
                    <TrendingUp className="h-4 w-4 text-[#ffd700]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#4a90e2] p-6 text-white relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl font-black tabular-nums">{stats.totalUsers}</div>
                  <div className="h-10 w-10 rounded-full border border-white/30 flex items-center justify-center">
                    <Users className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Users</span>
                  <div className="flex flex-col items-end">
                    <span className="text-xl font-black tracking-tighter text-[#90ee90]">36.88%</span>
                    <TrendingUp className="h-4 w-4 text-[#90ee90]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Timeline Chart */}
      <Card className="glass-card overflow-hidden">
        <div className="py-4 border-b border-slate-100 flex justify-center">
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-900">Analysis timeline</h2>
        </div>
        <CardContent className="p-8 h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.timeline} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                stroke="#94a3b8" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false} 
                tick={{ fontWeight: 900, textTransform: 'uppercase' }} 
              />
              <YAxis 
                yAxisId="left"
                stroke="#94a3b8" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false} 
                tick={{ fontWeight: 900 }} 
                label={{ value: 'No. of Comments', angle: -90, position: 'insideLeft', offset: -10, style: { fontWeight: 900, fontSize: '10px', textTransform: 'uppercase' } }}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                stroke="#94a3b8" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false} 
                tick={{ fontWeight: 900 }} 
                label={{ value: 'Average Sentiment Score', angle: 90, position: 'insideRight', offset: -10, style: { fontWeight: 900, fontSize: '10px', textTransform: 'uppercase' } }}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '0px', border: '1px solid #e2e8f0', boxShadow: 'none', fontWeight: 900, fontSize: '10px' }}
              />
              <Legend verticalAlign="top" align="center" height={40} iconType="rect" wrapperStyle={{ fontWeight: 900, fontSize: '10px', textTransform: 'uppercase', paddingBottom: '20px' }} />
              
              <Bar yAxisId="left" dataKey="Positive" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
              <Bar yAxisId="left" dataKey="Neutral" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
              <Bar yAxisId="left" dataKey="Negative" stackId="a" fill="#ef4444" radius={[0, 0, 0, 0]} />
              
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="Sentiment Score" 
                stroke="#4a90e2" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#fff', stroke: '#4a90e2', strokeWidth: 2 }} 
                activeDot={{ r: 6 }} 
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
        <div className="py-3 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
            <Info className="h-3 w-3" />
            This graph is linked to inference_cache.json and changes automatically based on NLP validation signals
          </p>
        </div>
      </Card>
    </div>
  );
}

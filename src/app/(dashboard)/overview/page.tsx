"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { getStatsForPeriod } from '@/data/mockData';
import { cn } from "@/lib/utils";

const COLORS = {
  positive: "#10b981", // Emerald
  neutral: "#f59e0b",  // Amber
  negative: "#ef4444", // Rose
  primary: "#003da5",  // P&G Blue
};

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
    { name: 'Positive', value: stats.posPct, color: COLORS.positive },
    { name: 'Negative', value: stats.negPct, color: COLORS.negative },
    { name: 'Neutral', value: stats.neutralPct, color: COLORS.neutral },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      {/* Header & Main Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Market Intelligence</h1>
          <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-xl">
            Real-time NLP analysis of P&G Fabric Care performance across Philippines e-commerce platforms. 
            Grounding insights in hundreds of valid consumer signals.
          </p>
        </div>
        
        <div className="flex p-1 bg-slate-100 rounded-lg border border-slate-200">
          {[
            { id: 7, label: '7D' },
            { id: 30, label: '30D' },
            { id: 90, label: '90D' }
          ].map((p) => (
            <button
              key={p.id}
              onClick={() => setPeriod(p.id)}
              className={cn(
                "px-6 py-2 text-[11px] font-bold uppercase tracking-widest transition-all rounded-md",
                period === p.id 
                  ? "bg-white text-slate-900 shadow-sm" 
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Performance Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            title: "Market Positive", 
            value: `${stats.posPct}%`, 
            sub: "Overall sentiment health", 
            icon: ThumbsUp, 
            color: "text-emerald-600", 
            bg: "bg-emerald-50",
            trend: "+2.4%",
            isUp: true
          },
          { 
            title: "Corrected Rating", 
            value: stats.correctedRating, 
            sub: "NLP adjusted vs 4.82", 
            icon: StarIcon, 
            color: "text-[#003da5]", 
            bg: "bg-blue-50",
            trend: "-0.12",
            isUp: false
          },
          { 
            title: "Rating Inflation", 
            value: `${stats.ratingInflation}%`, 
            sub: "Platform bias detected", 
            icon: AlertCircle, 
            color: "text-amber-600", 
            bg: "bg-amber-50",
            trend: "+1.1%",
            isUp: true
          },
          { 
            title: "Negative Friction", 
            value: `${stats.negPct}%`, 
            sub: "Unmet consumer needs", 
            icon: ThumbsDown, 
            color: "text-red-600", 
            bg: "bg-red-50",
            trend: "-0.8%",
            isUp: false
          },
        ].map((item, i) => (
          <Card key={i} className="shadow-sm hover:shadow-md transition-shadow border-slate-200 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={cn("p-2 rounded-lg", item.bg)}>
                  <item.icon className={cn("h-5 w-5", item.color)} />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full",
                  item.isUp ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                )}>
                  {item.isUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {item.trend}
                </div>
              </div>
              <div className="space-y-1">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">{item.title}</h4>
                <div className="text-3xl font-bold text-slate-900 tabular-nums">{item.value}</div>
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-tight">{item.sub}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Primary Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sentiment Engine Gauge */}
        <Card className="lg:col-span-4 shadow-sm border-slate-200 flex flex-col items-center justify-center py-12 relative overflow-hidden bg-white">
          <Badge className="absolute top-6 bg-slate-900 text-white font-bold text-[9px] uppercase tracking-[0.2em] px-4 py-1 border-none rounded-none">Market Health Index</Badge>
          
          <div className="relative mt-8">
            <svg className="w-72 h-36" viewBox="0 0 100 50">
              <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#f1f5f9" strokeWidth="10" strokeLinecap="round" />
              <path d="M 10 50 A 40 40 0 0 1 36.6 15.4" fill="none" stroke={COLORS.negative} strokeWidth="10" />
              <path d="M 36.6 15.4 A 40 40 0 0 1 63.4 15.4" fill="none" stroke={COLORS.neutral} strokeWidth="10" />
              <path d="M 63.4 15.4 A 40 40 0 0 1 90 50" fill="none" stroke={COLORS.positive} strokeWidth="10" />
              <line 
                x1="50" y1="50" 
                x2={50 + 35 * Math.cos((1 - stats.correctedRating/5) * Math.PI)} 
                y2={50 - 35 * Math.sin((1 - stats.correctedRating/5) * Math.PI)} 
                stroke="#1e293b" strokeWidth="3" strokeLinecap="round" 
              />
              <circle cx="50" cy="50" r="4" fill="#1e293b" />
            </svg>
            
            <div className="flex flex-col items-center mt-[-15px]">
              <div className="flex items-center gap-3">
                <Smile className="h-8 w-8 text-slate-900" />
                <span className="text-5xl font-black text-slate-900 tabular-nums tracking-tighter">{stats.correctedRating}</span>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">Sentiment Score / 5.0</p>
            </div>
          </div>
        </Card>

        {/* Volume & Engagement Analysis */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="border-l-4 border-l-[#003da5] shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Reviews Analyzed</span>
                <MessageSquare className="h-4 w-4 text-[#003da5]" />
              </div>
              <div className="text-4xl font-bold text-slate-900 tabular-nums">{stats.total.toLocaleString()}</div>
              <p className="text-[10px] text-slate-400 mt-2 uppercase font-semibold tracking-wider">Valid NLP Samples</p>
              <div className="mt-4 pt-4 border-t border-slate-50">
                <div className="flex items-center gap-2">
                  <Activity className="h-3 w-3 text-emerald-500" />
                  <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">Growth vs Prev Period</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Unique Users</span>
                <Users className="h-4 w-4 text-emerald-500" />
              </div>
              <div className="text-4xl font-bold text-slate-900 tabular-nums">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-[10px] text-slate-400 mt-2 uppercase font-semibold tracking-wider">Inferred Consumer Profiles</p>
              <div className="mt-4 pt-4 border-t border-slate-50">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                  <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">Identity Validated</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Breakdown Distribution */}
        <Card className="lg:col-span-5 shadow-sm border-slate-200 bg-white p-10 relative overflow-hidden">
          <Badge className="absolute top-6 right-6 bg-slate-100 text-slate-900 font-bold text-[9px] uppercase tracking-[0.2em] px-4 py-1 border-none">Sentiment Mix</Badge>
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="w-full md:w-1/2 h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    dataKey="value"
                    stroke="#fff"
                    strokeWidth={4}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-6 flex-1 w-full">
              {[
                { label: 'Positive', value: stats.posPct, icon: ThumbsUp, color: COLORS.positive, bg: "bg-emerald-50" },
                { label: 'Neutral', value: stats.neutralPct, icon: Minus, color: COLORS.neutral, bg: "bg-amber-50" },
                { label: 'Negative', value: stats.negPct, icon: ThumbsDown, color: COLORS.negative, bg: "bg-red-50" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className={cn("p-2 rounded-full transition-transform group-hover:scale-110", item.bg)}>
                      <item.icon className={cn("h-4 w-4", `text-[${item.color}]`)} style={{ color: item.color }} />
                    </div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</span>
                  </div>
                  <span className="text-xl font-black text-slate-900 tabular-nums">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Comparative Sentiment Trend */}
      <Card className="shadow-sm border-slate-200 overflow-hidden bg-white">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="space-y-1">
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-slate-900">Sentiment Velocity: P&G vs Industry</h2>
            <p className="text-[10px] text-slate-400 font-medium uppercase">Relative performance based on positive sentiment share</p>
          </div>
          <Badge variant="outline" className="text-[9px] font-bold text-slate-400 border-slate-200 bg-white">REAL-TIME NLP COMPARISON</Badge>
        </div>
        <CardContent className="p-10 h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats.timeline}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} tick={{ fontWeight: 700 }} />
              <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} tick={{ fontWeight: 700 }} unit="%" domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: '1px solid #f1f5f9', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '11px', fontWeight: 'bold' }}
              />
              <Legend verticalAlign="top" align="right" height={48} iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', tracking: '0.1em' }} />
              <Line type="monotone" dataKey="P&G" stroke={COLORS.positive} strokeWidth={4} dot={{ r: 5, fill: COLORS.positive, strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8, stroke: '#fff', strokeWidth: 2 }} />
              <Line type="monotone" dataKey="Competitors" stroke={COLORS.neutral} strokeWidth={3} strokeDasharray="6 6" dot={{ r: 4, fill: COLORS.neutral, strokeWidth: 2, stroke: '#fff' }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Analysis Timeline & Drift */}
      <Card className="shadow-sm border-slate-200 overflow-hidden bg-white">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-slate-900">Drift Analysis & Volume Distribution</h2>
        </div>
        <CardContent className="p-10 h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.timeline} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} tick={{ fontWeight: 700 }} />
              <YAxis yAxisId="left" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} tick={{ fontWeight: 700 }} />
              <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} tick={{ fontWeight: 700 }} domain={[0, 5]} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)' }}
              />
              <Legend verticalAlign="top" align="center" height={50} iconType="square" wrapperStyle={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', paddingBottom: '30px' }} />
              
              <Bar yAxisId="left" dataKey="Positive" stackId="a" fill={COLORS.positive} radius={[0, 0, 0, 0]} />
              <Bar yAxisId="left" dataKey="Neutral" stackId="a" fill={COLORS.neutral} radius={[0, 0, 0, 0]} />
              <Bar yAxisId="left" dataKey="Negative" stackId="a" fill={COLORS.negative} radius={[0, 0, 0, 0]} />
              
              <Line yAxisId="right" type="stepAfter" dataKey="Sentiment Score" stroke="#1e293b" strokeWidth={3} dot={{ r: 0 }} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-center gap-3">
          <Info className="h-4 w-4 text-slate-400" />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            Statistical drift validation derived from Taglish NLP inference_cache.json
          </p>
        </div>
      </Card>
    </div>
  );
}

function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

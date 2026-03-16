
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
  Star,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Activity
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
    { name: 'Neutral', value: stats.neutralPct, color: COLORS.neutral },
    { name: 'Negative', value: stats.negPct, color: COLORS.negative },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      {/* Header & Main Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Market Intelligence</h1>
          <p className="text-sm text-slate-500 mt-1">Real-time NLP sentiment analysis from Philippines e-commerce platforms.</p>
        </div>
        
        <div className="flex p-1 bg-slate-100 rounded-lg border border-slate-200 shadow-sm">
          {[
            { id: 7, label: '7D' },
            { id: 30, label: '30D' },
            { id: 90, label: '90D' }
          ].map((p) => (
            <button
              key={p.id}
              onClick={() => setPeriod(p.id)}
              className={cn(
                "px-5 py-1.5 text-xs font-semibold transition-all rounded-md",
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

      {/* Primary KPI Row (Mirrored from Reference) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            title: "Market Positive", 
            value: `${stats.posPct}%`, 
            sub: "Overall sentiment health", 
            icon: ThumbsUp, 
            iconColor: "text-emerald-600", 
            iconBg: "bg-emerald-50",
            trend: "+2.4%",
            isUp: true,
            trendColor: "bg-emerald-100 text-emerald-700"
          },
          { 
            title: "Corrected Rating", 
            value: stats.correctedRating.toFixed(2), 
            sub: `NLP Adjusted vs 4.82`, 
            icon: Star, 
            iconColor: "text-blue-600", 
            iconBg: "bg-blue-50",
            trend: "-0.12",
            isUp: false,
            trendColor: "bg-red-100 text-red-700"
          },
          { 
            title: "Rating Inflation", 
            value: `${stats.ratingInflation}%`, 
            sub: "Platform bias detected", 
            icon: AlertCircle, 
            iconColor: "text-amber-600", 
            iconBg: "bg-amber-50",
            trend: "+1.1%",
            isUp: true,
            trendColor: "bg-emerald-100 text-emerald-700"
          },
          { 
            title: "Negative Friction", 
            value: `${stats.negPct}%`, 
            sub: "Unmet consumer needs", 
            icon: ThumbsDown, 
            iconColor: "text-red-600", 
            iconBg: "bg-red-50",
            trend: "-0.8%",
            isUp: false,
            trendColor: "bg-red-100 text-red-700"
          },
        ].map((item, i) => (
          <Card key={i} className="border-slate-200 shadow-sm overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className={cn("p-2 rounded-lg", item.iconBg)}>
                  <item.icon className={cn("h-5 w-5", item.iconColor)} />
                </div>
                <div className={cn("flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full", item.trendColor)}>
                  {item.isUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {item.trend}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.title}</p>
                <h3 className="text-3xl font-bold text-slate-900 tabular-nums">{item.value}</h3>
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-tight">{item.sub}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Insights Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Comparative Line Chart */}
        <Card className="lg:col-span-8 border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
            <div className="space-y-1">
              <CardTitle className="text-sm font-bold text-slate-900 uppercase tracking-widest">Sentiment Velocity</CardTitle>
              <CardDescription className="text-xs">Relative performance share over the last period</CardDescription>
            </div>
            <Badge variant="outline" className="text-[9px] font-bold text-slate-400 uppercase">P&G vs Industry Average</Badge>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.timeline}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} tick={{ fontWeight: 600 }} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} tick={{ fontWeight: 600 }} unit="%" domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #f1f5f9', fontSize: '11px', fontWeight: 'bold' }}
                />
                <Legend verticalAlign="top" align="right" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' }} />
                <Line type="monotone" dataKey="P&G" stroke={COLORS.positive} strokeWidth={3} dot={{ r: 4, fill: COLORS.positive }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="Competitors" stroke={COLORS.neutral} strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sentiment Breakdown */}
        <Card className="lg:col-span-4 border-slate-200 shadow-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-sm font-bold text-slate-900 uppercase tracking-widest">Sentiment Distribution</CardTitle>
            <CardDescription className="text-xs">Total market mix breakdown</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="h-[240px] w-full">
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
                    strokeWidth={2}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full space-y-3 mt-4">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Volume & Timeline Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Engagement Volume Cards */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="border-l-4 border-l-[#003da5] shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total Samples</span>
                <MessageSquare className="h-4 w-4 text-[#003da5]" />
              </div>
              <div className="text-4xl font-bold text-slate-900 tabular-nums">{stats.total.toLocaleString()}</div>
              <p className="text-[10px] text-slate-400 mt-2 font-semibold uppercase tracking-wider">Validated NLP Audits</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Unique Users</span>
                <Users className="h-4 w-4 text-emerald-500" />
              </div>
              <div className="text-4xl font-bold text-slate-900 tabular-nums">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-[10px] text-slate-400 mt-2 font-semibold uppercase tracking-wider">Individual Consumers</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Timeline */}
        <Card className="lg:col-span-9 border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
            <div className="space-y-1">
              <CardTitle className="text-sm font-bold text-slate-900 uppercase tracking-widest">Analysis Timeline & Drift</CardTitle>
              <CardDescription className="text-xs">Stacked sentiment volume vs. average rating trend</CardDescription>
            </div>
            <Activity className="h-4 w-4 text-slate-300" />
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.timeline} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} tick={{ fontWeight: 600 }} />
                <YAxis yAxisId="left" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} tick={{ fontWeight: 600 }} />
                <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} tick={{ fontWeight: 600 }} domain={[0, 5]} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Legend verticalAlign="top" align="center" height={40} iconType="square" wrapperStyle={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', paddingBottom: '20px' }} />
                
                <Bar yAxisId="left" dataKey="Positive" stackId="a" fill={COLORS.positive} />
                <Bar yAxisId="left" dataKey="Neutral" stackId="a" fill={COLORS.neutral} />
                <Bar yAxisId="left" dataKey="Negative" stackId="a" fill={COLORS.negative} />
                
                <Line yAxisId="right" type="monotone" dataKey="Sentiment Score" stroke="#1e293b" strokeWidth={3} dot={false} activeDot={{ r: 4 }} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

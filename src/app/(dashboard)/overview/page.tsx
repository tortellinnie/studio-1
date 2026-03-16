
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
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  PolarRadiusAxis
} from 'recharts';
import { getStatsForPeriod, dynamicVectorScores } from '@/data/mockData';
import { cn } from "@/lib/utils";
import { Download, TrendingUp, TrendingDown, Info, Activity } from "lucide-react";

const COLORS = {
  positive: "#10b981", // Emerald 500
  neutral: "#f59e0b",  // Amber 500
  negative: "#ef4444", // Rose 500
  pg: "#003da5",       // P&G Blue
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

  const radarData = dynamicVectorScores.map(v => ({
    vector: v.vector,
    A: v.healthScore,
    fullMark: 100,
  }));

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      {/* Header Section with integrated Metadata */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-normal">Market Intelligence</h1>
          <p className="text-slate-500 mt-2 text-lg font-medium tracking-normal">Validated NLP sentiment analysis for Philippines Fabric Care.</p>
        </div>
        
        <div className="flex flex-col items-end gap-6">
          {/* Metadata Digits by the side */}
          <div className="flex gap-8 text-slate-400 font-semibold tabular-nums tracking-normal">
            <div className="flex flex-col items-end">
              <span className="text-2xl font-bold text-slate-900">{stats.total.toLocaleString()}</span>
              <span className="text-[11px] uppercase tracking-wider font-bold">Total Samples</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-2xl font-bold text-slate-900">{stats.totalUsers.toLocaleString()}</span>
              <span className="text-[11px] uppercase tracking-wider font-bold">Unique Consumers</span>
            </div>
          </div>

          <div className="flex p-1 bg-slate-100 rounded-lg border border-slate-200">
            {[
              { id: 7, label: '7 Days' },
              { id: 30, label: '30 Days' },
              { id: 90, label: '90 Days' }
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setPeriod(p.id)}
                className={cn(
                  "px-6 py-2 text-sm font-bold transition-all rounded-md tracking-normal",
                  period === p.id 
                    ? "bg-white text-slate-900 shadow-sm border border-slate-200" 
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Primary KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            title: "Market positive", 
            value: `${stats.posPct}%`, 
            sub: "Overall sentiment health", 
            trend: "+2.4%",
            trendColor: "text-emerald-600",
            icon: TrendingUp
          },
          { 
            title: "Corrected rating", 
            value: stats.correctedRating.toFixed(2), 
            sub: "NLP Adjusted vs 4.82", 
            trend: "-0.12",
            trendColor: "text-red-600",
            icon: TrendingDown
          },
          { 
            title: "Rating inflation", 
            value: `${stats.ratingInflation}%`, 
            sub: "Platform bias detected", 
            trend: "+1.1%",
            trendColor: "text-amber-600",
            icon: Info
          },
          { 
            title: "Negative friction", 
            value: `${stats.negPct}%`, 
            sub: "Unmet consumer needs", 
            trend: "-0.8%",
            trendColor: "text-red-600",
            icon: TrendingDown
          },
        ].map((item, i) => (
          <Card key={i} className="border-slate-200 shadow-sm rounded-xl bg-white overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <p className="text-base font-bold text-slate-500 tracking-normal">{item.title}</p>
                <item.icon className={cn("h-5 w-5", item.trendColor)} />
              </div>
              <div className="space-y-2">
                <h3 className="text-5xl font-bold text-slate-900 tabular-nums tracking-normal">{item.value}</h3>
                <div className="flex items-center gap-2 pt-1">
                  <span className={cn("text-xs font-bold px-2 py-1 rounded bg-slate-50", item.trendColor)}>
                    {item.trend}
                  </span>
                  <p className="text-sm text-slate-400 font-semibold tracking-normal">{item.sub}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sentiment Velocity - Expanded */}
        <Card className="lg:col-span-8 border-slate-200 shadow-sm rounded-xl bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-10 pt-8 px-8">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold text-slate-900 tracking-normal">Sentiment velocity</CardTitle>
              <CardDescription className="text-base text-slate-500 font-medium tracking-normal">Comparative market performance (P&G vs Competitors)</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-sm font-bold gap-2 text-slate-500 hover:bg-slate-50">
              <Download className="h-4 w-4" /> Export
            </Button>
          </CardHeader>
          <CardContent className="h-[450px] px-8 pb-8">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.timeline}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontWeight: 600 }} dy={10} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontWeight: 600 }} unit="%" domain={[0, 100]} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #f1f5f9', fontSize: '14px', fontWeight: '600', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="top" align="right" height={40} iconType="circle" iconSize={10} wrapperStyle={{ fontSize: '13px', fontWeight: 700, paddingBottom: '20px' }} />
                <Line type="monotone" name="P&G Portfolio" dataKey="P&G" stroke={COLORS.pg} strokeWidth={4} dot={{ r: 5, fill: COLORS.pg, strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 7, strokeWidth: 0 }} />
                <Line type="monotone" name="Competitors" dataKey="Competitors" stroke="#cbd5e1" strokeWidth={3} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sentiment Mix (Pie) */}
        <Card className="lg:col-span-4 border-slate-200 shadow-sm rounded-xl bg-white">
          <CardHeader className="pt-8 px-8">
            <CardTitle className="text-xl font-bold text-slate-900 tracking-normal">Sentiment mix</CardTitle>
            <CardDescription className="text-base text-slate-500 font-medium tracking-normal">Total market distribution</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center pt-4 px-8 pb-8">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    dataKey="value"
                    stroke="#fff"
                    strokeWidth={2}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 600, fontSize: '14px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full space-y-4 mt-8">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-base font-bold text-slate-600 tracking-normal">{item.name}</span>
                  </div>
                  <span className="text-base font-extrabold text-slate-900 tabular-nums tracking-normal">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Intelligence Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Vectors of Superiority - Expanded Spider Graph */}
        <Card className="lg:col-span-5 border-slate-200 shadow-sm rounded-xl bg-white">
          <CardHeader className="pt-8 px-8 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold text-slate-900 tracking-normal">Vectors of superiority</CardTitle>
              <CardDescription className="text-base text-slate-500 font-medium tracking-normal">NLP distribution across vectors</CardDescription>
            </div>
            <Activity className="h-5 w-5 text-slate-400" />
          </CardHeader>
          <CardContent className="h-[450px] px-8 pb-8 flex flex-col items-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis 
                  dataKey="vector" 
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }} 
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Market Health"
                  dataKey="A"
                  stroke={COLORS.pg}
                  strokeWidth={3}
                  fill={COLORS.pg}
                  fillOpacity={0.15}
                />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #f1f5f9', fontWeight: 700 }} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Analysis Timeline & Sentiment Drift - Expanded */}
        <Card className="lg:col-span-7 border-slate-200 shadow-sm rounded-xl bg-white">
          <CardHeader className="pb-10 pt-8 px-8 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold text-slate-900 tracking-normal">Analysis timeline & Sentiment drift</CardTitle>
              <CardDescription className="text-base text-slate-500 font-medium tracking-normal">Daily sentiment volume vs. rating trend</CardDescription>
            </div>
            <Badge variant="outline" className="text-xs font-bold py-1.5 px-3 text-slate-500 border-slate-200 tracking-normal">NLP Validated</Badge>
          </CardHeader>
          <CardContent className="h-[450px] px-8 pb-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.timeline} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontWeight: 600 }} dy={10} />
                <YAxis yAxisId="left" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontWeight: 600 }} dx={-10} />
                <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontWeight: 600 }} domain={[0, 5]} dx={10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 700, fontSize: '14px' }} 
                />
                <Legend verticalAlign="top" align="center" height={40} iconType="square" iconSize={10} wrapperStyle={{ fontSize: '13px', fontWeight: 700, paddingBottom: '20px' }} />
                
                <Bar yAxisId="left" dataKey="Positive" stackId="a" fill={COLORS.positive} />
                <Bar yAxisId="left" dataKey="Neutral" stackId="a" fill={COLORS.neutral} />
                <Bar yAxisId="left" dataKey="Negative" stackId="a" fill={COLORS.negative} radius={[4, 4, 0, 0]} />
                
                <Line yAxisId="right" type="monotone" name="Sentiment Score" dataKey="Sentiment Score" stroke="#1e293b" strokeWidth={4} dot={{ r: 4, fill: '#1e293b', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6, strokeWidth: 0 }} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { getStatsForPeriod } from '@/data/mockData';
import { cn } from "@/lib/utils";

const COLORS = {
  positive: "#10b981", // Emerald 500
  neutral: "#f59e0b",  // Amber 500
  negative: "#ef4444", // Rose 500
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
      {/* Header & Period Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Market Intelligence</h1>
          <p className="text-base text-slate-500 mt-1">Real-time NLP sentiment analysis from Philippines e-commerce platforms.</p>
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
                "px-5 py-2 text-sm font-semibold transition-all rounded-md",
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

      {/* Primary KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            title: "Market Positive", 
            value: `${stats.posPct}%`, 
            sub: "Overall sentiment health", 
            trend: "+2.4%",
            trendColor: "text-emerald-600"
          },
          { 
            title: "Corrected Rating", 
            value: stats.correctedRating.toFixed(2), 
            sub: `NLP Adjusted vs 4.82`, 
            trend: "-0.12",
            trendColor: "text-red-600"
          },
          { 
            title: "Rating Inflation", 
            value: `${stats.ratingInflation}%`, 
            sub: "Platform bias detected", 
            trend: "+1.1%",
            trendColor: "text-emerald-600"
          },
          { 
            title: "Negative Friction", 
            value: `${stats.negPct}%`, 
            sub: "Unmet consumer needs", 
            trend: "-0.8%",
            trendColor: "text-red-600"
          },
        ].map((item, i) => (
          <Card key={i} className="border-slate-200 shadow-sm rounded-xl bg-white overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-4">
                <p className="text-base font-semibold text-slate-500">{item.title}</p>
                <div className={cn("text-sm font-bold bg-slate-50 px-2 py-0.5 rounded", item.trendColor)}>
                  {item.trend}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-5xl font-extrabold text-slate-900 tracking-tighter tabular-nums">{item.value}</h3>
                <p className="text-sm text-slate-400 font-medium">{item.sub}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Engagement Volume Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-slate-200 shadow-sm rounded-xl bg-white">
          <CardContent className="p-8 flex flex-col justify-center">
            <p className="text-base font-semibold text-slate-500 mb-2">Total Data Samples</p>
            <div className="flex items-baseline gap-4">
              <h3 className="text-5xl font-extrabold text-slate-900 tracking-tighter">{stats.total.toLocaleString()}</h3>
              <span className="text-sm text-slate-400 font-semibold">Validated NLP audits for PH Market</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm rounded-xl bg-white">
          <CardContent className="p-8 flex flex-col justify-center">
            <p className="text-base font-semibold text-slate-500 mb-2">Unique Consumers</p>
            <div className="flex items-baseline gap-4">
              <h3 className="text-5xl font-extrabold text-slate-900 tracking-tighter">{stats.totalUsers.toLocaleString()}</h3>
              <span className="text-sm text-slate-400 font-semibold">Individual engagement profiles matched</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Comparative Line Chart - Sentiment Velocity */}
        <Card className="lg:col-span-8 border-slate-200 shadow-sm rounded-xl bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-10 pt-8 px-8">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold text-slate-900 tracking-tight">Sentiment Velocity</CardTitle>
              <CardDescription className="text-base">Relative performance share over the selected period</CardDescription>
            </div>
            <Badge variant="outline" className="text-xs font-bold text-slate-500 rounded-lg px-3 py-1 bg-slate-50 border-slate-200">P&G vs Industry Average</Badge>
          </CardHeader>
          <CardContent className="h-[400px] px-8 pb-8">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.timeline}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tick={{ fontWeight: 600 }} dy={10} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tick={{ fontWeight: 600 }} unit="%" domain={[0, 100]} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #f1f5f9', fontSize: '14px', fontWeight: '600', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="top" align="right" height={48} iconType="circle" iconSize={10} wrapperStyle={{ fontSize: '13px', fontWeight: 700, paddingBottom: '20px' }} />
                <Line type="monotone" name="P&G Portfolio" dataKey="P&G" stroke={COLORS.positive} strokeWidth={4} dot={{ r: 5, fill: COLORS.positive, strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8, strokeWidth: 0 }} />
                <Line type="monotone" name="Competitors" dataKey="Competitors" stroke="#94a3b8" strokeWidth={3} strokeDasharray="6 6" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sentiment Distribution */}
        <Card className="lg:col-span-4 border-slate-200 shadow-sm rounded-xl bg-white">
          <CardHeader className="space-y-1 pt-8 px-8">
            <CardTitle className="text-xl font-bold text-slate-900 tracking-tight">Sentiment Distribution</CardTitle>
            <CardDescription className="text-base">Total market mix breakdown</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center pt-4 px-8 pb-8">
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={75}
                    outerRadius={105}
                    dataKey="value"
                    stroke="#fff"
                    strokeWidth={3}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 600 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full space-y-4 mt-6">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-base font-bold text-slate-600">{item.name}</span>
                  </div>
                  <span className="text-base font-black text-slate-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analysis Timeline Chart */}
      <Card className="border-slate-200 shadow-sm rounded-xl bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-10 pt-8 px-8">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold text-slate-900 tracking-tight">Analysis Timeline & Sentiment Drift</CardTitle>
            <CardDescription className="text-base">Stacked sentiment volume vs. average rating trend</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="h-[450px] px-8 pb-8">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.timeline} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tick={{ fontWeight: 600 }} dy={10} />
              <YAxis yAxisId="left" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tick={{ fontWeight: 600 }} dx={-10} />
              <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tick={{ fontWeight: 600 }} domain={[0, 5]} dx={10} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 600 }} 
              />
              <Legend verticalAlign="top" align="center" height={48} iconType="square" iconSize={10} wrapperStyle={{ fontSize: '13px', fontWeight: 700, paddingBottom: '20px' }} />
              
              <Bar yAxisId="left" dataKey="Positive" stackId="a" fill={COLORS.positive} radius={[0, 0, 0, 0]} />
              <Bar yAxisId="left" dataKey="Neutral" stackId="a" fill={COLORS.neutral} radius={[0, 0, 0, 0]} />
              <Bar yAxisId="left" dataKey="Negative" stackId="a" fill={COLORS.negative} radius={[4, 4, 0, 0]} />
              
              <Line yAxisId="right" type="monotone" dataKey="Sentiment Score" stroke="#1e293b" strokeWidth={4} dot={{ r: 4, fill: '#1e293b', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

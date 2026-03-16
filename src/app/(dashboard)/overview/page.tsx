
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
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Header & Period Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Market Intelligence</h1>
          <p className="text-sm text-slate-500 mt-1">Real-time NLP sentiment analysis from Philippines e-commerce platforms.</p>
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
                "px-4 py-1.5 text-xs font-semibold transition-all rounded-md",
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

      {/* Primary KPI Row - Clinical Implementation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            title: "Market Positive", 
            value: `${stats.posPct}%`, 
            sub: "Overall sentiment health", 
            trend: "+2.4%",
            isUp: true,
            trendColor: "text-emerald-600"
          },
          { 
            title: "Corrected Rating", 
            value: stats.correctedRating.toFixed(2), 
            sub: `NLP Adjusted vs 4.82`, 
            trend: "-0.12",
            isUp: false,
            trendColor: "text-red-600"
          },
          { 
            title: "Rating Inflation", 
            value: `${stats.ratingInflation}%`, 
            sub: "Platform bias detected", 
            trend: "+1.1%",
            isUp: true,
            trendColor: "text-emerald-600"
          },
          { 
            title: "Negative Friction", 
            value: `${stats.negPct}%`, 
            sub: "Unmet consumer needs", 
            trend: "-0.8%",
            isUp: false,
            trendColor: "text-red-600"
          },
        ].map((item, i) => (
          <Card key={i} className="border-slate-200 shadow-sm rounded-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-slate-500">{item.title}</p>
                <div className={cn("text-xs font-bold", item.trendColor)}>
                  {item.trend}
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-3xl font-bold text-slate-900 tracking-tight tabular-nums">{item.value}</h3>
                <p className="text-xs text-slate-400 font-medium">{item.sub}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Engagement Volume Row - Integrated Styling */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-slate-200 shadow-sm rounded-lg bg-white">
          <CardContent className="p-6 flex flex-col justify-center">
            <p className="text-sm font-medium text-slate-500 mb-1">Total Data Samples</p>
            <div className="flex items-baseline gap-3">
              <h3 className="text-3xl font-bold text-slate-900">{stats.total.toLocaleString()}</h3>
              <span className="text-xs text-slate-400 font-medium">Validated NLP audits for PH Market</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm rounded-lg bg-white">
          <CardContent className="p-6 flex flex-col justify-center">
            <p className="text-sm font-medium text-slate-500 mb-1">Unique Consumers</p>
            <div className="flex items-baseline gap-3">
              <h3 className="text-3xl font-bold text-slate-900">{stats.totalUsers.toLocaleString()}</h3>
              <span className="text-xs text-slate-400 font-medium">Individual engagement profiles matched</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Comparative Line Chart - Sentiment Velocity */}
        <Card className="lg:col-span-8 border-slate-200 shadow-sm rounded-lg bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
            <div className="space-y-1">
              <CardTitle className="text-base font-bold text-slate-900 tracking-tight">Sentiment Velocity</CardTitle>
              <CardDescription className="text-sm">Relative performance share over the selected period</CardDescription>
            </div>
            <Badge variant="outline" className="text-xs font-medium text-slate-500 rounded-md">P&G vs Industry Average</Badge>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.timeline}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tick={{ fontWeight: 500 }} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tick={{ fontWeight: 500 }} unit="%" domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #f1f5f9', fontSize: '12px', fontWeight: '500' }}
                />
                <Legend verticalAlign="top" align="right" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 500, paddingTop: '0px' }} />
                <Line type="monotone" dataKey="P&G" stroke={COLORS.positive} strokeWidth={3} dot={{ r: 4, fill: COLORS.positive }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="Competitors" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sentiment Distribution */}
        <Card className="lg:col-span-4 border-slate-200 shadow-sm rounded-lg bg-white">
          <CardHeader className="space-y-1">
            <CardTitle className="text-base font-bold text-slate-900 tracking-tight">Sentiment Distribution</CardTitle>
            <CardDescription className="text-sm">Total market mix breakdown</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={90}
                    dataKey="value"
                    stroke="#fff"
                    strokeWidth={2}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full space-y-3 mt-4">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm font-medium text-slate-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analysis Timeline Chart */}
      <Card className="border-slate-200 shadow-sm rounded-lg bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
          <div className="space-y-1">
            <CardTitle className="text-base font-bold text-slate-900 tracking-tight">Analysis Timeline & Sentiment Drift</CardTitle>
            <CardDescription className="text-sm">Stacked sentiment volume vs. average rating trend</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.timeline} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tick={{ fontWeight: 500 }} />
              <YAxis yAxisId="left" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tick={{ fontWeight: 500 }} />
              <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tick={{ fontWeight: 500 }} domain={[0, 5]} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
              <Legend verticalAlign="top" align="center" height={40} iconType="square" wrapperStyle={{ fontSize: '12px', fontWeight: 500, paddingBottom: '20px' }} />
              
              <Bar yAxisId="left" dataKey="Positive" stackId="a" fill={COLORS.positive} radius={[0, 0, 0, 0]} />
              <Bar yAxisId="left" dataKey="Neutral" stackId="a" fill={COLORS.neutral} radius={[0, 0, 0, 0]} />
              <Bar yAxisId="left" dataKey="Negative" stackId="a" fill={COLORS.negative} radius={[2, 2, 0, 0]} />
              
              <Line yAxisId="right" type="monotone" dataKey="Sentiment Score" stroke="#1e293b" strokeWidth={3} dot={false} activeDot={{ r: 4 }} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

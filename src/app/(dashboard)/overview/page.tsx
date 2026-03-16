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
import { getStatsForPeriod } from '@/data/mockData';
import { cn } from "@/lib/utils";
import { Download, Info, TrendingUp, TrendingDown } from "lucide-react";
import { NotificationBanner } from "@/components/NotificationBanner";

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
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Strategic Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Market Intelligence</h1>
          <p className="text-slate-500 mt-1">Validated NLP sentiment analysis for Philippines Fabric Care.</p>
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

      {/* Human Element: Proactive Alert */}
      <NotificationBanner />

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            title: "Market Positive", 
            value: `${stats.posPct}%`, 
            sub: "Overall sentiment health", 
            trend: "+2.4%",
            trendColor: "text-emerald-600",
            icon: TrendingUp
          },
          { 
            title: "Corrected Rating", 
            value: stats.correctedRating.toFixed(2), 
            sub: `NLP Adjusted vs 4.82`, 
            trend: "-0.12",
            trendColor: "text-red-600",
            icon: TrendingDown
          },
          { 
            title: "Rating Inflation", 
            value: `${stats.ratingInflation}%`, 
            sub: "Platform bias detected", 
            trend: "+1.1%",
            trendColor: "text-amber-600",
            icon: Info
          },
          { 
            title: "Negative Friction", 
            value: `${stats.negPct}%`, 
            sub: "Unmet consumer needs", 
            trend: "-0.8%",
            trendColor: "text-red-600",
            icon: TrendingDown
          },
        ].map((item, i) => (
          <Card key={i} className="border-slate-200 shadow-sm rounded-xl bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-slate-500">{item.title}</p>
                <item.icon className={cn("h-4 w-4", item.trendColor)} />
              </div>
              <div className="space-y-1">
                <h3 className="text-4xl font-bold text-slate-900 tabular-nums">{item.value}</h3>
                <div className="flex items-center gap-2">
                  <span className={cn("text-xs font-bold px-1.5 py-0.5 rounded bg-slate-50", item.trendColor)}>
                    {item.trend}
                  </span>
                  <p className="text-xs text-slate-400 font-medium">{item.sub}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Volume Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-slate-200 shadow-sm rounded-xl bg-white border-l-4 border-l-[#003da5]">
          <CardContent className="p-6 flex flex-col justify-center">
            <p className="text-sm font-semibold text-slate-500 mb-1">Total Data Samples</p>
            <div className="flex items-baseline gap-3">
              <h3 className="text-4xl font-bold text-slate-900">{stats.total.toLocaleString()}</h3>
              <span className="text-xs text-slate-400 font-medium italic">Validated NLP audits for PH Market</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm rounded-xl bg-white border-l-4 border-l-emerald-500">
          <CardContent className="p-6 flex flex-col justify-center">
            <p className="text-sm font-semibold text-slate-500 mb-1">Unique Consumers</p>
            <div className="flex items-baseline gap-3">
              <h3 className="text-4xl font-bold text-slate-900">{stats.totalUsers.toLocaleString()}</h3>
              <span className="text-xs text-slate-400 font-medium italic">Individual engagement profiles matched</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <Card className="lg:col-span-8 border-slate-200 shadow-sm rounded-xl bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-8 pt-6 px-6">
            <div className="space-y-1">
              <CardTitle className="text-lg font-bold text-slate-900">Sentiment Velocity</CardTitle>
              <CardDescription className="text-sm">Comparative market performance (P&G vs Competitors)</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-xs font-bold gap-2 text-slate-500">
              <Download className="h-3.5 w-3.5" /> Export Data
            </Button>
          </CardHeader>
          <CardContent className="h-[400px] px-6 pb-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.timeline}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tick={{ fontWeight: 500 }} dy={10} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tick={{ fontWeight: 500 }} unit="%" domain={[0, 100]} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #f1f5f9', fontSize: '13px', fontWeight: '600', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="top" align="right" height={40} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px', fontWeight: 600, paddingBottom: '10px' }} />
                <Line type="monotone" name="P&G Portfolio" dataKey="P&G" stroke={COLORS.positive} strokeWidth={4} dot={{ r: 4, fill: COLORS.positive, strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6, strokeWidth: 0 }} />
                <Line type="monotone" name="Competitors" dataKey="Competitors" stroke="#cbd5e1" strokeWidth={3} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-4 border-slate-200 shadow-sm rounded-xl bg-white">
          <CardHeader className="pt-6 px-6">
            <CardTitle className="text-lg font-bold text-slate-900">Sentiment Mix</CardTitle>
            <CardDescription className="text-sm">Total market distribution</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center pt-2 px-6 pb-6">
            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={95}
                    dataKey="value"
                    stroke="#fff"
                    strokeWidth={2}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 600 }} />
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

      {/* Analysis Timeline */}
      <Card className="border-slate-200 shadow-sm rounded-xl bg-white">
        <CardHeader className="pb-8 pt-6 px-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg font-bold text-slate-900">Analysis Timeline & Sentiment Drift</CardTitle>
              <CardDescription className="text-sm">Sentiment volume per day vs. average sentiment score</CardDescription>
            </div>
            <Badge variant="outline" className="text-[10px] font-bold py-1 text-slate-500">REAL-TIME NLP VALIDATED</Badge>
          </div>
        </CardHeader>
        <CardContent className="h-[400px] px-6 pb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.timeline} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tick={{ fontWeight: 500 }} dy={10} />
              <YAxis yAxisId="left" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tick={{ fontWeight: 500 }} dx={-10} />
              <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tick={{ fontWeight: 500 }} domain={[0, 5]} dx={10} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 600 }} 
              />
              <Legend verticalAlign="top" align="center" height={40} iconType="square" iconSize={8} wrapperStyle={{ fontSize: '12px', fontWeight: 600, paddingBottom: '10px' }} />
              
              <Bar yAxisId="left" dataKey="Positive" stackId="a" fill={COLORS.positive} />
              <Bar yAxisId="left" dataKey="Neutral" stackId="a" fill={COLORS.neutral} />
              <Bar yAxisId="left" dataKey="Negative" stackId="a" fill={COLORS.negative} radius={[4, 4, 0, 0]} />
              
              <Line yAxisId="right" type="monotone" name="Sentiment Score" dataKey="Sentiment Score" stroke="#1e293b" strokeWidth={3} dot={{ r: 3, fill: '#1e293b', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 5 }} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
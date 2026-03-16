
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
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  PolarRadiusAxis
} from 'recharts';
import { getStatsForPeriod, dynamicVectorScores } from '@/data/mockData';
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Info, Activity } from "lucide-react";

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
      {/* 1. Header & Context */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-slate-900 tracking-normal">Dashboard to track sentiment analysis process</h1>
        <p className="text-slate-500 text-base font-medium max-w-4xl leading-relaxed">
          This hub highlights the strategic dashboard used to showcase NLP sentiment analysis across Lazada e-commerce channels. 
          The engine determines consumer sentiments regarding product superiority through tracking various validated KPIs.
        </p>
      </div>

      {/* 2. Top Card Summaries (KPIs) */}
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
                <h3 className="text-5xl font-extrabold text-slate-900 tabular-nums tracking-normal">{item.value}</h3>
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

      {/* 3. Lazada Sentiment Breakdown Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <Card className="lg:col-span-9 border-slate-200 shadow-sm rounded-xl bg-white p-8">
          <h3 className="text-xl font-bold text-slate-900 mb-10 text-center w-full">Sentiments breakdown on Lazada e commerce portal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 h-full items-center gap-16">
            {/* Numeric side: p&g products sentiment breakdown */}
            <div className="space-y-8">
              <div className="mb-4">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">P&G products sentiment breakdown</p>
              </div>
              {pieData.map((item) => (
                <div key={item.name} className="flex flex-col border-l-[6px] pl-8 py-1" style={{ borderColor: item.color }}>
                  <span className="text-5xl font-extrabold text-slate-900 tabular-nums leading-none mb-2">{item.value}%</span>
                  <span className="text-lg font-bold text-slate-400 tracking-normal">{item.name}</span>
                </div>
              ))}
            </div>
            {/* Visual side: the breakdown pie graph */}
            <div className="h-80 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={90}
                    outerRadius={125}
                    dataKey="value"
                    stroke="#fff"
                    strokeWidth={4}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 600, fontSize: '14px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        {/* Sidebar: Filters and Volume */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="flex flex-col p-1 bg-slate-100 rounded-lg border border-slate-200">
            {[
              { id: 7, label: 'Past 7 days' },
              { id: 30, label: 'Past 30 days' },
              { id: 90, label: 'Past 3 months' }
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setPeriod(p.id)}
                className={cn(
                  "w-full py-2.5 text-sm font-bold transition-all rounded-md tracking-normal text-left px-4",
                  period === p.id 
                    ? "bg-white text-slate-900 shadow-sm border border-slate-200" 
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
          
          <div className="flex-1 grid grid-rows-2 gap-4">
            <Card className="border-l-[10px] border-l-[#f59e0b] border border-slate-200 bg-white flex flex-col justify-center p-8 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-5xl font-extrabold leading-none tabular-nums text-slate-900">{stats.total.toLocaleString()}</p>
                  <p className="text-sm font-bold text-slate-400 italic mt-3 tracking-normal">Total data samples</p>
                </div>
                <div className="text-right text-emerald-600">
                  <p className="text-lg font-bold leading-none">+43.6%</p>
                  <TrendingUp className="h-4 w-4 ml-auto mt-1" />
                </div>
              </div>
            </Card>
            <Card className="border-l-[10px] border-l-[#003da5] border border-slate-200 bg-white flex flex-col justify-center p-8 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-5xl font-extrabold leading-none tabular-nums text-slate-900">{stats.totalUsers.toLocaleString()}</p>
                  <p className="text-sm font-bold text-slate-400 italic mt-3 tracking-normal">Unique consumers</p>
                </div>
                <div className="text-right text-emerald-600">
                  <p className="text-lg font-bold leading-none">+36.8%</p>
                  <TrendingUp className="h-4 w-4 ml-auto mt-1" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* 4. Analysis Timeline */}
      <Card className="border-slate-200 shadow-sm rounded-xl bg-white overflow-hidden">
        <CardHeader className="pb-10 pt-8 px-8 flex flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold text-slate-900 tracking-normal">Analysis timeline</CardTitle>
            <CardDescription className="text-base text-slate-500 font-medium tracking-normal">Daily sentiment volume vs. rating trend</CardDescription>
          </div>
          <Badge variant="outline" className="text-xs font-bold py-1.5 px-3 text-slate-500 border-slate-200 tracking-normal">Validated NLP inference</Badge>
        </CardHeader>
        <CardContent className="h-[450px] px-8 pb-8">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.timeline} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontWeight: 600 }} dy={10} />
              <YAxis yAxisId="left" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontWeight: 600 }} dx={-10} />
              <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontWeight: 600 }} domain={[0, 5]} dx={10} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 700, fontSize: '14px' }} />
              <Legend verticalAlign="top" align="center" height={40} iconType="square" iconSize={10} wrapperStyle={{ fontSize: '13px', fontWeight: 700, paddingBottom: '20px' }} />
              <Bar yAxisId="left" dataKey="Positive" stackId="a" fill={COLORS.positive} />
              <Bar yAxisId="left" dataKey="Neutral" stackId="a" fill={COLORS.neutral} />
              <Bar yAxisId="left" dataKey="Negative" stackId="a" fill={COLORS.negative} radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" name="Sentiment Score" dataKey="Sentiment Score" stroke="#1e293b" strokeWidth={4} dot={{ r: 4, fill: '#1e293b', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6, strokeWidth: 0 }} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 5. Sentiment Velocity (Comparative) */}
      <Card className="border-slate-200 shadow-sm rounded-xl bg-white overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-10 pt-8 px-8 border-b border-slate-50">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold text-slate-900 tracking-normal">Sentiment velocity</CardTitle>
            <CardDescription className="text-base text-slate-500 font-medium tracking-normal">Comparative brand performance metrics</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="h-[450px] px-8 py-8">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats.timeline}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontWeight: 600 }} dy={10} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontWeight: 600 }} unit="%" domain={[0, 100]} dx={-10} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #f1f5f9', fontSize: '14px', fontWeight: '600', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
              <Legend verticalAlign="top" align="right" height={40} iconType="circle" iconSize={10} wrapperStyle={{ fontSize: '13px', fontWeight: 700, paddingBottom: '20px' }} />
              <Line type="monotone" name="P&G Portfolio" dataKey="P&G" stroke={COLORS.pg} strokeWidth={4} dot={{ r: 5, fill: COLORS.pg, strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 7, strokeWidth: 0 }} />
              <Line type="monotone" name="Industry Competitors" dataKey="Competitors" stroke="#cbd5e1" strokeWidth={3} strokeDasharray="5 5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 6. Drill-down Boxes (Sentiment Mix & Vector Health Report) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-slate-200 shadow-sm rounded-xl bg-white p-8">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-2xl font-bold text-slate-900 tracking-normal">Sentiment mix</CardTitle>
            <CardDescription className="text-base text-slate-500 font-medium tracking-normal">Market distribution benchmark</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center pt-10">
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={90}
                    outerRadius={120}
                    dataKey="value"
                    stroke="#fff"
                    strokeWidth={3}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 600, fontSize: '14px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full space-y-5 mt-10">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-4 w-4 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-base font-bold text-slate-600 tracking-normal">{item.name}</span>
                  </div>
                  <span className="text-xl font-extrabold text-slate-900 tabular-nums">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Vectors of superiority (High-Fidelity Health Report) */}
        <Card className="border-slate-200 shadow-sm rounded-xl bg-white p-8">
          <CardHeader className="px-0 pt-0 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold text-slate-900 tracking-normal">Vectors of superiority</CardTitle>
              <CardDescription className="text-base text-slate-500 font-medium tracking-normal">Structural health distribution</CardDescription>
            </div>
            <Activity className="h-6 w-6 text-slate-400" />
          </CardHeader>
          <CardContent className="mt-8 flex flex-col md:flex-row items-center gap-10">
            <div className="h-[350px] w-full md:w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#e2e8f0" strokeWidth={1} />
                  <PolarAngleAxis dataKey="vector" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Health Score"
                    dataKey="A"
                    stroke={COLORS.pg}
                    strokeWidth={4}
                    fill={COLORS.pg}
                    fillOpacity={0.15}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            {/* The Report Table: No hover needed */}
            <div className="w-full md:w-1/2 space-y-4">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">Vector health report</div>
              {dynamicVectorScores.map((v) => (
                <div key={v.vector} className="flex items-center justify-between group">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">{v.vector}</span>
                    <span className="text-[10px] font-medium text-slate-400">N={v.count} mentions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-xl font-extrabold text-slate-900 tabular-nums">{v.healthScore}%</div>
                    <div className={cn(
                      "h-2 w-2 rounded-full",
                      v.healthScore > 75 ? "bg-emerald-500" : v.healthScore > 50 ? "bg-amber-500" : "bg-red-500"
                    )} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

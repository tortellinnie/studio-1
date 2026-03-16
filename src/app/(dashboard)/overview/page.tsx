
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
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  PolarRadiusAxis
} from 'recharts';
import { getStatsForPeriod, dynamicVectorScores } from '@/data/mockData';
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Info } from "lucide-react";

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

  const radarData = dynamicVectorScores.map(v => ({
    vector: v.vector,
    A: v.healthScore,
    fullMark: 100,
  }));

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      {/* 1. KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Market positive", value: `${stats.posPct}%`, sub: "Overall sentiment health", trend: "+2.4%", trendColor: "text-emerald-600", icon: TrendingUp },
          { title: "Corrected rating", value: stats.correctedRating.toFixed(2), sub: "NLP Adjusted vs 4.82", trend: "-0.12", trendColor: "text-red-600", icon: TrendingDown },
          { title: "Rating inflation", value: `${stats.ratingInflation}%`, sub: "Platform bias detected", trend: "+1.1%", trendColor: "text-amber-600", icon: Info },
          { title: "Negative friction", value: `${stats.negPct}%`, sub: "Unmet consumer needs", trend: "-0.8%", trendColor: "text-red-600", icon: TrendingDown },
        ].map((item, i) => (
          <Card key={i} className="border-slate-200 shadow-sm rounded-xl bg-white overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm font-bold text-slate-500">{item.title}</p>
                <item.icon className={cn("h-4 w-4", item.trendColor)} />
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-extrabold text-slate-900 tabular-nums tracking-normal">{item.value}</h3>
                <div className="flex items-center gap-2 pt-1">
                  <span className={cn("text-xs font-bold px-2 py-0.5 rounded bg-slate-50", item.trendColor)}>{item.trend}</span>
                  <p className="text-xs text-slate-400 font-semibold">{item.sub}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 2. Primary Strategic Visual (Radar + Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <Card className="lg:col-span-9 border-slate-200 shadow-sm rounded-xl bg-white p-10 flex flex-col">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">5 Vectors of superiority analysis</h3>
          
          <div className="flex-1 flex items-center justify-center min-h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis 
                  dataKey="vector" 
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }} 
                />
                <Radar
                  name="Health Score"
                  dataKey="A"
                  stroke={COLORS.pg}
                  strokeWidth={4}
                  fill={COLORS.pg}
                  fillOpacity={0.1}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 w-full gap-6 border-t border-slate-100 pt-10 mt-6">
            {dynamicVectorScores.map((v) => (
              <div key={v.vector} className="flex flex-col border-l-[6px] border-l-[#003da5] pl-5 py-1">
                <span className="text-3xl font-extrabold text-slate-900 tabular-nums leading-none mb-2 tracking-normal">{v.healthScore}%</span>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-500">{v.vector}</p>
                  <p className="text-[10px] font-bold text-slate-300 tracking-normal">N={v.count}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Sidebar Controls & Volume */}
        <div className="lg:col-span-3 flex flex-col gap-6">
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
                  "w-full py-2.5 text-sm font-bold transition-all rounded-md text-left px-4",
                  period === p.id 
                    ? "bg-white text-slate-900 shadow-sm border border-slate-200" 
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
          
          <Card className="border border-slate-200 bg-white p-8 shadow-sm rounded-xl">
            <div className="flex items-baseline gap-3">
              <p className="text-5xl font-extrabold leading-none tabular-nums text-slate-900 tracking-normal">
                {stats.total.toLocaleString()}
              </p>
              <p className="text-lg font-bold text-emerald-600 leading-none">+43.6%</p>
            </div>
            <p className="text-sm font-semibold text-slate-400 italic mt-4">Total data samples</p>
          </Card>

          <Card className="border border-slate-200 bg-white p-8 shadow-sm rounded-xl">
            <div className="flex items-baseline gap-3">
              <p className="text-5xl font-extrabold leading-none tabular-nums text-slate-900 tracking-normal">
                {stats.totalUsers.toLocaleString()}
              </p>
              <p className="text-lg font-bold text-emerald-600 leading-none">+36.8%</p>
            </div>
            <p className="text-sm font-semibold text-slate-400 italic mt-4">Unique consumers</p>
          </Card>
        </div>
      </div>

      {/* 3. Analysis Timeline */}
      <Card className="border-slate-200 shadow-sm rounded-xl bg-white overflow-hidden">
        <CardHeader className="pb-10 pt-8 px-8 flex flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold text-slate-900">Analysis timeline</CardTitle>
            <CardDescription className="text-sm text-slate-500 font-medium">Daily sentiment volume vs. rating trend</CardDescription>
          </div>
          <Badge variant="outline" className="text-[10px] font-bold py-1 px-3 text-slate-500 border-slate-200">Validated NLP inference</Badge>
        </CardHeader>
        <CardContent className="h-[400px] px-8 pb-8">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.timeline} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontWeight: 600 }} dy={10} />
              <YAxis yAxisId="left" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontWeight: 600 }} dx={-10} />
              <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontWeight: 600 }} domain={[0, 5]} dx={10} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 700, fontSize: '13px' }} />
              <Legend verticalAlign="top" align="center" height={40} iconType="square" iconSize={8} wrapperStyle={{ fontSize: '12px', fontWeight: 700, paddingBottom: '20px' }} />
              <Bar yAxisId="left" dataKey="Positive" stackId="a" fill={COLORS.positive} />
              <Bar yAxisId="left" dataKey="Neutral" stackId="a" fill={COLORS.neutral} />
              <Bar yAxisId="left" dataKey="Negative" stackId="a" fill={COLORS.negative} radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" name="Sentiment Score" dataKey="Sentiment Score" stroke="#1e293b" strokeWidth={3} dot={{ r: 3, fill: '#1e293b', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 5, strokeWidth: 0 }} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 4. Sentiment Velocity */}
      <Card className="border-slate-200 shadow-sm rounded-xl bg-white overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-10 pt-8 px-8 border-b border-slate-50">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold text-slate-900">Sentiment velocity</CardTitle>
            <CardDescription className="text-sm text-slate-500 font-medium">Comparative brand performance metrics</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="h-[400px] px-8 py-8">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats.timeline}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontWeight: 600 }} dy={10} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontWeight: 600 }} unit="%" domain={[0, 100]} dx={-10} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #f1f5f9', fontSize: '13px', fontWeight: '600', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
              <Legend verticalAlign="top" align="right" height={40} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px', fontWeight: 700, paddingBottom: '20px' }} />
              <Line type="monotone" name="P&G Portfolio" dataKey="P&G" stroke={COLORS.pg} strokeWidth={3} dot={{ r: 4, fill: COLORS.pg, strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6, strokeWidth: 0 }} />
              <Line type="monotone" name="Industry Competitors" dataKey="Competitors" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="5 5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

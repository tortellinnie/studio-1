
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { getStatsForPeriod, dynamicVectorScores, allIndustryProducts } from '@/data/mockData';
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Info, Star } from "lucide-react";

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
          { title: "Market positive", value: `${stats.posPct}%`, trend: "+2.4%", trendColor: "text-emerald-600", icon: TrendingUp },
          { title: "Corrected rating", value: stats.correctedRating.toFixed(2), trend: "-0.12", trendColor: "text-red-600", icon: TrendingDown },
          { title: "Rating inflation", value: `${stats.ratingInflation}%`, trend: "+1.1%", trendColor: "text-amber-600", icon: Info },
          { title: "Negative friction", value: `${stats.negPct}%`, trend: "-0.8%", trendColor: "text-red-600", icon: TrendingDown },
        ].map((item, i) => (
          <Card key={i} className="border-slate-200 shadow-sm rounded-xl bg-white overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-bold text-slate-500">{item.title}</p>
                <item.icon className={cn("h-4 w-4", item.trendColor)} />
              </div>
              <div className="space-y-1">
                <h3 className="text-3xl font-extrabold text-slate-900 tabular-nums tracking-normal">{item.value}</h3>
                <div className="flex items-center gap-2">
                  <span className={cn("text-xs font-bold", item.trendColor)}>{item.trend}</span>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-normal">vs Previous</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 2. Primary Strategic Visual (Radar + Control Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Vector Card */}
        <Card className="lg:col-span-9 border-slate-200 shadow-sm rounded-xl bg-white p-10 flex flex-col min-h-[600px]">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-10">5 Vectors of superiority analysis</h3>
          
          <div className="flex-1 flex items-center justify-center">
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis 
                  dataKey="vector" 
                  tick={{ fill: '#64748b', fontSize: 13, fontWeight: 700 }} 
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

          <div className="grid grid-cols-5 w-full gap-4 pt-10 mt-6 border-t border-slate-100">
            {dynamicVectorScores.map((v) => (
              <div key={v.vector} className="flex flex-col border-l-4 border-l-[#003da5] pl-4 py-1">
                <span className="text-3xl font-extrabold text-slate-900 tabular-nums leading-none mb-2">{v.healthScore}%</span>
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-500">{v.vector}</p>
                  <p className="text-[10px] font-bold text-slate-300">N={v.count.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Control Sidebar */}
        <div className="lg:col-span-3 space-y-6">
          {/* Period Selectors */}
          <div className="flex flex-col p-1.5 bg-slate-100/50 rounded-xl border border-slate-200">
            {[
              { id: 7, label: 'Past 7 days' },
              { id: 30, label: 'Past 30 days' },
              { id: 90, label: 'Past 3 months' }
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setPeriod(p.id)}
                className={cn(
                  "w-full py-3 text-sm font-bold transition-all rounded-lg text-left px-4",
                  period === p.id 
                    ? "bg-white text-slate-900 shadow-sm border border-slate-200" 
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
          
          {/* Volume Cards */}
          <Card className="border border-slate-200 bg-white p-8 shadow-sm rounded-xl">
            <div className="flex items-baseline gap-2">
              <p className="text-5xl font-extrabold leading-none tabular-nums text-slate-900 tracking-normal">
                {stats.total.toLocaleString()}
              </p>
              <p className="text-sm font-bold text-emerald-600">+43.6%</p>
            </div>
            <p className="text-sm font-semibold text-slate-400 italic mt-4">Total data samples</p>
          </Card>

          <Card className="border border-slate-200 bg-white p-8 shadow-sm rounded-xl">
            <div className="flex items-baseline gap-2">
              <p className="text-5xl font-extrabold leading-none tabular-nums text-slate-900 tracking-normal">
                {stats.totalUsers.toLocaleString()}
              </p>
              <p className="text-sm font-bold text-emerald-600">+36.8%</p>
            </div>
            <p className="text-sm font-semibold text-slate-400 italic mt-4">Unique consumers</p>
          </Card>
        </div>
      </div>

      {/* 3. Analysis Timeline */}
      <Card className="border-slate-200 shadow-sm rounded-xl bg-white overflow-hidden">
        <CardHeader className="pb-10 pt-8 px-8 flex flex-row items-center justify-between border-b border-slate-50">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold text-slate-900">Analysis timeline</CardTitle>
            <CardDescription className="text-sm text-slate-500 font-medium">Daily sentiment volume vs. rating trend</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="h-[450px] p-8">
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
              <Line yAxisId="right" type="monotone" name="Sentiment Score" dataKey="Sentiment Score" stroke="#1e293b" strokeWidth={4} dot={{ r: 4, fill: '#1e293b', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6, strokeWidth: 0 }} />
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
        <CardContent className="h-[400px] p-8">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats.timeline}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontWeight: 600 }} dy={10} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontWeight: 600 }} unit="%" domain={[0, 100]} dx={-10} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #f1f5f9', fontSize: '13px', fontWeight: '600', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
              <Legend verticalAlign="top" align="right" height={40} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px', fontWeight: 700, paddingBottom: '20px' }} />
              <Line type="monotone" name="P&G Portfolio" dataKey="P&G" stroke={COLORS.pg} strokeWidth={4} dot={{ r: 5, fill: COLORS.pg, strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 7, strokeWidth: 0 }} />
              <Line type="monotone" name="Industry Competitors" dataKey="Competitors" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="5 5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 5. Industry SKU Rankings */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Industry SKU rankings</h2>
        <Card className="border-slate-200 shadow-sm rounded-xl bg-white overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="px-8 py-6">Rank</th>
                    <th className="px-8 py-6">Brand SKU</th>
                    <th className="px-8 py-6 text-center">Original rating</th>
                    <th className="px-8 py-6 text-center">Corrected rating</th>
                    <th className="px-8 py-6">Sentiment score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {allIndustryProducts.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-8">
                        <div className={cn(
                          "flex h-10 w-10 items-center justify-center font-bold text-sm rounded-lg",
                          item.isPNG ? "bg-[#ebf2ff] text-[#003da5]" : "bg-slate-100 text-slate-400"
                        )}>
                          {idx + 1}
                        </div>
                      </td>
                      <td className="px-8 py-8">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-lg font-bold text-slate-900">{item.name}</span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{item.brand}</span>
                        </div>
                      </td>
                      <td className="px-8 py-8 text-center">
                        <span className="text-lg font-bold text-slate-300 tabular-nums">
                          {item.originalRating.toFixed(1)}
                        </span>
                      </td>
                      <td className="px-8 py-8 text-center">
                        <div className="flex items-center justify-center gap-2 font-extrabold text-[#003da5] text-4xl tabular-nums">
                          <Star className="h-5 w-5 fill-[#003da5] stroke-none" />
                          {item.correctedRating.toFixed(1)}
                        </div>
                      </td>
                      <td className="px-8 py-8">
                         <div className="flex flex-col gap-2 min-w-[200px]">
                            <div className="flex justify-between items-center text-[11px] font-bold">
                              <span className="text-emerald-600">{item.sentimentScore}% Positive</span>
                              <TrendingUp className="h-3 w-3 text-emerald-500" />
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                               <div 
                                 className="h-full bg-emerald-500 transition-all duration-1000 ease-out" 
                                 style={{ width: `${item.sentimentScore}%` }} 
                               />
                            </div>
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

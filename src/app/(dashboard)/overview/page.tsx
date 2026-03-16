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
  positive: "#003da5",
  neutral: "#64748b",
  negative: "#ef4444",
  mkt_positive: "#003da533",
  mkt_neutral: "#64748b33",
  mkt_negative: "#ef444433",
  mkt_grey: "#94a3b8"
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

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-slate-200 shadow-xl rounded-xl p-5 space-y-4 min-w-[220px]">
          <div className="flex flex-col gap-1 border-b border-slate-100 pb-3">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{data.name}</p>
            <div className={cn(
              "text-white text-[11px] font-black px-2.5 py-1 rounded-md self-start uppercase tracking-tighter",
              data.gap.includes('Lead') ? "bg-emerald-500" : "bg-red-500"
            )}>
              {data.gap}
            </div>
          </div>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-8 text-[11px] font-bold">
              <span className="text-[#003da5]">P&G POSITIVE</span>
              <span className="tabular-nums">{data.pg_pos}</span>
            </div>
            <div className="flex items-center justify-between gap-8 text-[11px] font-bold">
              <span className="text-slate-400 uppercase">Market Average</span>
              <span className="tabular-nums text-slate-400">{data.mkt_pos}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-slate-900 tracking-normal">Executive overview</h1>
        <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Strategic performance audit & market baseline comparative pulse</p>
      </div>

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
                <p className="text-sm font-bold text-slate-500 tracking-normal">{item.title}</p>
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

      {/* 2. Daily Sentiment Pulse (Primary Time-Series Anchor) */}
      <Card className="border-slate-200 shadow-sm rounded-xl bg-white overflow-hidden">
        <CardHeader className="pb-10 pt-8 px-8 border-b border-slate-50">
          <div className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-slate-900 tracking-normal">Daily sentiment pulse</CardTitle>
            <CardDescription className="text-sm text-slate-500 font-bold uppercase tracking-wider">P&G brands vs market baseline comparative audit</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="h-[500px] p-8">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={stats.timeline} 
              margin={{ top: 20, right: 10, left: 0, bottom: 0 }} 
              barGap={12}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontWeight: 700 }} dy={10} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontWeight: 700 }} dx={-10} domain={[0, 15]} ticks={[0, 4, 8, 15]} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
              <Legend verticalAlign="top" align="center" height={60} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '10px', fontWeight: 900, paddingBottom: '40px', textTransform: 'uppercase' }} />
              
              <Bar dataKey="pg_pos" name="P&G Positive" stackId="pg" fill={COLORS.positive} />
              <Bar dataKey="pg_neu" name="P&G Neutral" stackId="pg" fill={COLORS.neutral} />
              <Bar dataKey="pg_neg" name="P&G Negative" stackId="pg" fill={COLORS.negative} radius={[4, 4, 0, 0]} />

              <Bar dataKey="mkt_pos" name="Market Positive" stackId="mkt" fill={COLORS.mkt_positive} stroke={COLORS.positive} strokeWidth={1} strokeDasharray="2 2" />
              <Bar dataKey="mkt_neu" name="Market Neutral" stackId="mkt" fill={COLORS.mkt_neutral} stroke={COLORS.neutral} strokeWidth={1} strokeDasharray="2 2" />
              <Bar dataKey="mkt_neg" name="Market Negative" stackId="mkt" fill={COLORS.mkt_negative} stroke={COLORS.negative} strokeWidth={1} strokeDasharray="2 2" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 3. 5-Vector Superiority centerpiece */}
      <div className="grid grid-cols-1 lg:col-span-12 gap-8">
        <Card className="lg:col-span-9 border-slate-200 shadow-sm rounded-xl bg-white p-10 flex flex-col items-center">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-10 w-full tracking-normal uppercase tracking-tight">5-Vector Superiority Spider Map</h3>
          
          <div className="w-full flex justify-center mb-10">
            <div className="h-[400px] w-full max-w-[600px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="65%" data={dynamicVectorScores}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis 
                    dataKey="vector" 
                    tick={{ fill: '#64748b', fontSize: 13, fontWeight: 700 }} 
                  />
                  <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="P&G Internal"
                    dataKey="pgScore"
                    stroke={COLORS.positive}
                    strokeWidth={3}
                    fill={COLORS.positive}
                    fillOpacity={0.2}
                  />
                  <Radar
                    name="Market Average"
                    dataKey="mktScore"
                    stroke={COLORS.mkt_grey}
                    strokeWidth={2}
                    fill={COLORS.mkt_grey}
                    fillOpacity={0.1}
                    strokeDasharray="4 4"
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ fontWeight: 700, fontSize: '12px', textTransform: 'uppercase' }}
                  />
                  <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', paddingBottom: '20px' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-5 w-full gap-4 pt-10 mt-6 border-t border-slate-100">
            {dynamicVectorScores.map((v) => (
              <div key={v.vector} className="flex flex-col border-l-4 border-l-[#003da5] pl-4 py-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-slate-900 tabular-nums leading-none">{v.pgScore}%</span>
                  <span className="text-[10px] font-bold text-slate-400 tabular-nums">/ {v.mktScore}%</span>
                </div>
                <div className="space-y-0.5 mt-2">
                  <p className="text-[11px] font-bold text-slate-500 tracking-normal uppercase">{v.vector}</p>
                  <p className="text-[9px] font-bold text-slate-300 tracking-normal uppercase">Baseline N={v.mktCount}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Sidebar Controls */}
        <div className="lg:col-span-3 space-y-6">
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
                  "w-full py-3 text-sm font-bold transition-all rounded-lg text-left px-4 tracking-normal",
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
            <div className="flex items-baseline gap-2">
              <p className="text-5xl font-extrabold leading-none tabular-nums text-slate-900 tracking-normal">
                {stats.total.toLocaleString()}
              </p>
              <p className="text-sm font-bold text-emerald-600">+43.6%</p>
            </div>
            <p className="text-sm font-semibold text-slate-400 italic mt-4 uppercase tracking-wider">Total data samples</p>
          </Card>

          <Card className="border border-slate-200 bg-white p-8 shadow-sm rounded-xl">
            <div className="flex items-baseline gap-2">
              <p className="text-5xl font-extrabold leading-none tabular-nums text-slate-900 tracking-normal">
                {stats.totalUsers.toLocaleString()}
              </p>
              <p className="text-sm font-bold text-emerald-600">+36.8%</p>
            </div>
            <p className="text-sm font-semibold text-slate-400 italic mt-4 uppercase tracking-wider">Unique consumers</p>
          </Card>
        </div>
      </div>

      {/* 4. Industry SKU Rankings Podium */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-normal">Industry SKU rankings</h2>
        <Card className="border-slate-200 shadow-sm rounded-xl bg-white overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <th className="px-8 py-6">Rank</th>
                    <th className="px-8 py-6">Brand SKU</th>
                    <th className="px-8 py-6 text-center">Original rating</th>
                    <th className="px-8 py-6 text-center">Corrected rating</th>
                    <th className="px-8 py-6">Pulse Health</th>
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
                          <span className="text-lg font-bold text-slate-900 tracking-normal">{item.name}</span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.brand}</span>
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

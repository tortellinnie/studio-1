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
import { getStatsForPeriod, dynamicVectorScores } from '@/data/mockData';
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Info } from "lucide-react";
import { useFilters } from "@/context/FilterContext";

const COLORS = {
  positive: "#003da5",
  neutral: "#64748b",
  negative: "#ef4444",
  mkt_positive: "#003da533",
  mkt_neutral: "#64748b33",
  mkt_negative: "#ef444433",
  mkt_grey: "#94a3b8",
  mkt_red: "#ef4444"
};

export default function OverviewPage() {
  const { measure, timeline: filterTimeline, sector, period } = useFilters();
  const [stats, setStats] = useState(getStatsForPeriod(period));
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setStats(getStatsForPeriod(period));
  }, [period, measure, filterTimeline, sector]);

  if (!isClient) return null;

  const CustomTimelineTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-slate-200 shadow-xl rounded-xl p-5 space-y-4 min-w-[240px]">
          <div className="flex flex-col gap-1 border-b border-slate-100 pb-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-normal">{data.name}</p>
            <div className={cn(
              "text-white text-[11px] font-bold px-2.5 py-1 rounded-md self-start uppercase tracking-normal",
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
              <span className="text-slate-400 uppercase text-[9px]">Market Average</span>
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
        <h1 className="text-3xl font-bold text-slate-900 tracking-normal">Executive overview ({measure.toUpperCase()})</h1>
        <p className="text-sm text-slate-500 font-bold uppercase tracking-normal">Strategic performance audit & market baseline comparative pulse | Sector: {sector.replace('-', ' ').toUpperCase()}</p>
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
                <h3 className="text-3xl font-bold text-slate-900 tabular-nums tracking-normal">{item.value}</h3>
                <div className="flex items-center gap-2">
                  <span className={cn("text-xs font-bold", item.trendColor)}>{item.trend}</span>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-normal">vs Previous</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 2. Daily Sentiment Pulse */}
      <Card className="border-slate-200 shadow-sm rounded-xl bg-white overflow-hidden">
        <CardHeader className="pb-10 pt-8 px-8 border-b border-slate-50">
          <div className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-slate-900 tracking-normal">Daily sentiment pulse</CardTitle>
            <CardDescription className="text-sm text-slate-500 font-bold uppercase tracking-normal">P&G brands vs market baseline comparative audit</CardDescription>
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
              <Tooltip content={<CustomTimelineTooltip />} cursor={{ fill: 'transparent' }} />
              <Legend verticalAlign="top" align="center" height={60} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '10px', fontWeight: 700, paddingBottom: '40px', textTransform: 'uppercase' }} />
              
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

      {/* 3. 5-Vector Superiority centerpiece - EXPANDED */}
      <Card className="border-slate-200 shadow-sm rounded-xl bg-white p-10 flex flex-col items-center">
        <h3 className="text-2xl font-bold text-slate-900 text-center mb-10 w-full tracking-normal uppercase">5-Vector Superiority Spider Map</h3>
        
        <div className="w-full flex justify-center mb-10">
          <div className="h-[550px] w-full max-w-[800px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={dynamicVectorScores}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis 
                  dataKey="vector" 
                  tick={{ fill: '#64748b', fontSize: 14, fontWeight: 600 }} 
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
                  stroke={COLORS.mkt_red}
                  strokeWidth={2}
                  fill="transparent"
                  strokeDasharray="4 4"
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontWeight: 600, fontSize: '12px', textTransform: 'uppercase' }}
                />
                <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', paddingBottom: '20px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-5 w-full gap-12 pt-10 mt-6 border-t border-slate-100">
          {dynamicVectorScores.map((v) => (
            <div key={v.vector} className="flex flex-col border-l-4 border-l-[#003da5] pl-6 py-1">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-slate-900 tabular-nums leading-none tracking-normal">{v.pgScore}%</span>
                <span className="text-sm font-bold text-slate-300 tabular-nums">/ {v.mktScore}%</span>
              </div>
              <div className="space-y-1 mt-4">
                <p className="text-xs font-bold text-slate-500 tracking-normal uppercase">{v.vector}</p>
                <p className="text-[10px] font-bold text-slate-300 tracking-normal uppercase">Baseline N={v.mktCount}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}


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
  Cell,
  LabelList
} from 'recharts';
import { getStatsForPeriod, dynamicVectorScores, allIndustryProducts } from '@/data/mockData';
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Info, Star } from "lucide-react";

const COLORS = {
  positive: "#10b981", 
  neutral: "#64748b",  
  negative: "#ef4444", 
  pg: "#003da5",       
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

  const CustomGapLabel = (props: any) => {
    const { x, y, width, value } = props;
    if (!value) return null;
    
    return (
      <g>
        <rect 
          x={x + width / 2 - 25} 
          y={y - 25} 
          width={50} 
          height={18} 
          rx={4} 
          fill={value.includes('+') ? '#10b981' : '#ef4444'} 
        />
        <text 
          x={x + width / 2} 
          y={y - 13} 
          fill="#fff" 
          textAnchor="middle" 
          dominantBaseline="middle" 
          fontSize="9" 
          fontWeight="800"
        >
          {value}
        </text>
      </g>
    );
  };

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

      {/* 2. 5 Vectors Analysis centerpiece */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <Card className="lg:col-span-9 border-slate-200 shadow-sm rounded-xl bg-white p-10 flex flex-col items-center">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-10 w-full">5 Vectors of superiority analysis</h3>
          
          <div className="w-full flex justify-center mb-10">
            <div className="h-[350px] w-full max-w-[500px]">
              <ResponsiveContainer width="100%" height="100%">
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

      {/* 3. Daily Sentiment Pulse (Comparative Bar Timeline) */}
      <Card className="border-slate-200 shadow-sm rounded-xl bg-white overflow-hidden">
        <CardHeader className="pb-10 pt-8 px-8 flex flex-row items-center justify-between border-b border-slate-50">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold text-slate-900">Daily sentiment pulse</CardTitle>
            <CardDescription className="text-sm text-slate-500 font-medium uppercase tracking-tight">P&G brands vs market baseline comparative audit</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="h-[500px] p-8">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.timeline} margin={{ top: 40, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontWeight: 600 }} dy={10} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontWeight: 600 }} dx={-10} />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 700, fontSize: '13px' }} 
              />
              <Legend verticalAlign="top" align="center" height={40} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px', fontWeight: 800, paddingBottom: '30px', textTransform: 'uppercase' }} />
              
              {/* P&G Stacked Bars */}
              <Bar dataKey="pg_pos" name="P&G Positive" stackId="pg" fill={COLORS.pg} radius={[0, 0, 0, 0]}>
                <LabelList dataKey="gap" content={<CustomGapLabel />} />
              </Bar>
              <Bar dataKey="pg_neu" name="P&G Neutral" stackId="pg" fill={COLORS.neutral} />
              <Bar dataKey="pg_neg" name="P&G Negative" stackId="pg" fill={COLORS.negative} />

              {/* Market Stacked Bars (Ghosted) */}
              <Bar dataKey="mkt_pos" name="Market Positive" stackId="mkt" fill={COLORS.pg} fillOpacity={0.2} stroke={COLORS.pg} strokeDasharray="2 2" />
              <Bar dataKey="mkt_neu" name="Market Neutral" stackId="mkt" fill={COLORS.neutral} fillOpacity={0.2} stroke={COLORS.neutral} strokeDasharray="2 2" />
              <Bar dataKey="mkt_neg" name="Market Negative" stackId="mkt" fill={COLORS.negative} fillOpacity={0.2} stroke={COLORS.negative} strokeDasharray="2 2" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 4. Industry SKU Rankings Podium */}
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

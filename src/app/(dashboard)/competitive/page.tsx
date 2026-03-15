"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { competitiveBenchmark } from '@/data/mockData';
import { TrendingUp, TrendingDown, Target } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function CompetitiveAnalysisPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const positioningData = competitiveBenchmark.map((item) => ({
    brand: item.brand,
    sentiment: item.sentiment,
    marketShare: item.marketShare,
    growth: item.growth,
    isPNG: item.brand.includes('P&G'),
  }));

  if (!isClient) return null;

  return (
    <div className="space-y-24 animate-in fade-in duration-500 max-w-[1800px] mx-auto pb-40">
      <header className="space-y-6">
        <h1 className="text-7xl font-black font-headline text-slate-900 tracking-tighter">Competitive Analysis</h1>
        <p className="text-3xl font-bold text-slate-500 uppercase tracking-[0.2em]">Superiority Benchmark Tracker</p>
      </header>

      {/* Positioning Scatter Chart */}
      <Card className="shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] border-border/50 bg-white rounded-[4rem] p-16">
        <CardHeader className="pb-20 text-center">
          <CardTitle className="text-6xl font-black text-slate-900 tracking-tight">Market Positioning Index</CardTitle>
          <CardDescription className="text-3xl font-bold mt-6 text-slate-400">Corrected Sentiment % vs. Category Share</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[850px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 40, right: 60, bottom: 60, left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" dataKey="sentiment" name="Sentiment" unit="%" stroke="#94a3b8" fontSize={24} tickLine={false} axisLine={false} fontWeight={900} />
                <YAxis type="number" dataKey="marketShare" name="Share" unit="%" stroke="#94a3b8" fontSize={24} tickLine={false} axisLine={false} fontWeight={900} />
                <ZAxis type="number" dataKey="growth" range={[2000, 10000]} />
                <Tooltip cursor={{ strokeDasharray: '4 4' }} contentStyle={{ borderRadius: '32px', border: 'none', boxShadow: '0 40px 60px -15px rgba(0,0,0,0.3)', fontSize: '28px', fontWeight: 900 }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '80px', fontSize: '28px', fontWeight: 900 }} />
                <Scatter name="P&G Portfolio" data={positioningData.filter((d) => d.isPNG)} fill="#003da5" />
                <Scatter name="Competitors" data={positioningData.filter((d) => !d.isPNG)} fill="#cbd5e1" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-24 p-16 bg-slate-50 rounded-[3rem] border border-slate-100 flex items-center gap-12">
            <Target className="h-16 w-16 text-[#003da5]" />
            <p className="text-2xl font-black uppercase tracking-[0.4em] text-slate-400">
              P&G brands dominate the high-sentiment premium quadrant. Bubble size reflects YOY Growth.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Brand Comparison Table */}
      <Card className="shadow-2xl border-border/50 overflow-hidden bg-white rounded-[4rem]">
        <CardHeader className="p-20 border-b border-slate-50">
          <CardTitle className="text-5xl font-black text-slate-900 tracking-tight">Portfolio Performance Benchmark</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="p-16 text-left text-xs font-black uppercase tracking-[0.5em] text-slate-400">Brand Portfolio</th>
                <th className="p-16 text-left text-xs font-black uppercase tracking-[0.5em] text-slate-400">Sentiment index</th>
                <th className="p-16 text-right text-xs font-black uppercase tracking-[0.5em] text-slate-400">YOY Growth</th>
              </tr>
            </thead>
            <tbody>
              {competitiveBenchmark.map((brand, index) => (
                <tr key={index} className="border-b border-slate-50 hover:bg-slate-50/50 transition-all cursor-default">
                  <td className="p-16">
                    <div className="flex flex-col gap-4">
                      <span className="text-4xl font-black text-slate-900">{brand.brand}</span>
                      {brand.brand.includes('P&G') && <Badge className="w-fit bg-[#003da5] text-white px-8 py-2 text-[10px] font-black uppercase tracking-widest">P&G CORE</Badge>}
                    </div>
                  </td>
                  <td className="p-16">
                    <div className="flex items-center gap-12">
                      <div className="h-10 w-[450px] overflow-hidden rounded-full bg-slate-100">
                        <div className={cn("h-full", brand.brand.includes('P&G') ? 'bg-[#003da5]' : 'bg-slate-300')} style={{ width: `${brand.sentiment}%` }} />
                      </div>
                      <span className="font-black text-4xl text-slate-900 tabular-nums">{brand.sentiment}%</span>
                    </div>
                  </td>
                  <td className="p-16 text-right">
                    <div className={cn("inline-flex items-center gap-6 text-5xl font-black", brand.growth > 0 ? "text-emerald-600" : "text-rose-600")}>
                      {brand.growth > 0 ? <TrendingUp className="h-12 w-12" /> : <TrendingDown className="h-12 w-12" />}
                      {Math.abs(brand.growth).toFixed(1)}%
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

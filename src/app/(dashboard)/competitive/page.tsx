
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
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
} from 'recharts';
import { pngProducts, competitiveBenchmark } from '@/data/mockData';
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
    <div className="space-y-10 animate-in fade-in duration-500 max-w-[1600px] mx-auto pb-16">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold font-headline text-slate-900">Competitive Benchmark</h1>
        <p className="text-lg text-slate-500 font-medium">Monitoring P&G superiority vs. Surf, Breeze, and Champion.</p>
      </header>

      {/* Positioning Scatter Chart */}
      <Card className="shadow-xl border-border/50 bg-white">
        <CardHeader className="p-10 pb-0">
          <CardTitle className="text-2xl font-black text-slate-900">Market Positioning Index</CardTitle>
          <CardDescription className="text-base font-medium">Corrected Sentiment % vs. Estimated Category Share</CardDescription>
        </CardHeader>
        <CardContent className="p-10">
          <div className="h-[550px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" dataKey="sentiment" name="Sentiment" unit="%" stroke="#94a3b8" fontSize={14} tickLine={false} axisLine={false} />
                <YAxis type="number" dataKey="marketShare" name="Share" unit="%" stroke="#94a3b8" fontSize={14} tickLine={false} axisLine={false} />
                <ZAxis type="number" dataKey="growth" range={[300, 2000]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '40px', fontSize: '15px', fontWeight: 600 }} />
                <Scatter name="P&G Portfolio" data={positioningData.filter((d) => d.isPNG)} fill="#003da5" />
                <Scatter name="Competitors" data={positioningData.filter((d) => !d.isPNG)} fill="#cbd5e1" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-10 text-xs font-black text-center uppercase tracking-[0.3em] text-slate-400">
            Bubble size represents YOY growth. P&G brands cluster in high-sentiment, premium-share quadrant.
          </p>
        </CardContent>
      </Card>

      {/* Brand Comparison Table */}
      <Card className="shadow-xl border-border/50 overflow-hidden bg-white">
        <CardHeader className="p-10">
          <CardTitle className="text-2xl font-black text-slate-900">Performance Benchmark</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-xs font-black uppercase tracking-[0.3em] text-slate-400">
                  <th className="p-10 text-left">Brand Portfolio</th>
                  <th className="p-10 text-left">Entity</th>
                  <th className="p-10 text-left">Sentiment</th>
                  <th className="p-10 text-left">Share</th>
                  <th className="p-10 text-right">Growth</th>
                </tr>
              </thead>
              <tbody className="text-base font-bold text-slate-700">
                {competitiveBenchmark.map((brand, index) => {
                  const isPNG = brand.brand.includes('P&G');
                  return (
                    <tr key={index} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="p-10 font-black text-xl text-slate-900">{brand.brand}</td>
                      <td className="p-10">
                        {isPNG ? (
                          <Badge className="bg-[#003da5] text-white px-4 py-1.5 text-xs font-black tracking-widest">P&G</Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs font-black text-slate-400 border-slate-200 uppercase tracking-widest">COMP</Badge>
                        )}
                      </td>
                      <td className="p-10">
                        <div className="flex items-center gap-6">
                          <div className="h-4 w-48 overflow-hidden rounded-full bg-slate-100">
                            <div className={`h-full ${isPNG ? 'bg-[#003da5]' : 'bg-slate-300'}`} style={{ width: `${brand.sentiment}%` }} />
                          </div>
                          <span className="font-mono text-lg text-slate-900">{brand.sentiment}%</span>
                        </div>
                      </td>
                      <td className="p-10 font-mono text-lg text-slate-900">{brand.marketShare}%</td>
                      <td className="p-10 text-right">
                        <div className={cn("inline-flex items-center gap-2 text-lg font-black", brand.growth > 0 ? "text-emerald-600" : "text-rose-600")}>
                          {brand.growth > 0 ? <TrendingUp className="h-6 w-6" /> : <TrendingDown className="h-6 w-6" />}
                          {Math.abs(brand.growth)}%
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Strategic Insights */}
      <div className="grid gap-10 md:grid-cols-2">
        <Card className="border-l-[8px] border-l-emerald-500 shadow-xl bg-white p-10">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="flex items-center gap-4 text-2xl font-black text-emerald-700 uppercase tracking-tight">
              <Target className="h-8 w-8" />
              Core Strengths
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 space-y-8 mt-6">
            <div className="p-8 bg-emerald-50 rounded-3xl border border-emerald-100">
              <p className="text-lg font-black text-slate-900 mb-3">Downy Dominance</p>
              <p className="text-base font-medium text-slate-600 leading-relaxed">78% sentiment vs 55% competitor average. Unmatched loyalty moat and repeat purchase intent.</p>
            </div>
            <div className="p-8 bg-emerald-50 rounded-3xl border border-emerald-100">
              <p className="text-lg font-black text-slate-900 mb-3">Quality Vector Leader</p>
              <p className="text-base font-medium text-slate-600 leading-relaxed">P&G brands score 13pts higher on average across product functionality and efficacy metrics.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-[8px] border-l-rose-500 shadow-xl bg-white p-10">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="flex items-center gap-4 text-2xl font-black text-rose-700 uppercase tracking-tight">
              <Target className="h-8 w-8" />
              Critical Threats
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 space-y-8 mt-6">
            <div className="p-8 bg-rose-50 rounded-3xl border border-rose-100">
              <p className="text-lg font-black text-slate-900 mb-3">Surf Price Pressure</p>
              <p className="text-base font-medium text-slate-600 leading-relaxed">Value vector shows a persistent 8pt gap in Surf's favor on Lazada catalog pricing index.</p>
            </div>
            <div className="p-8 bg-rose-50 rounded-3xl border border-rose-100">
              <p className="text-lg font-black text-slate-900 mb-3">Sachet Penetration</p>
              <p className="text-base font-medium text-slate-600 leading-relaxed">Champion and Breeze showing increased sentiment growth in small-format SKUs targeting lower income segments.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

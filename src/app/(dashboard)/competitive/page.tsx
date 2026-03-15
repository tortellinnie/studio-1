
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
import { TrendingUp, TrendingDown } from 'lucide-react';
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
    <div className="space-y-12 animate-in fade-in duration-500 max-w-[1600px] mx-auto pb-16">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold font-headline text-slate-900">Competitive Benchmark</h1>
        <p className="text-xl text-slate-500 font-medium">Monitoring P&G superiority vs. Surf, Breeze, and Champion.</p>
      </header>

      {/* Positioning Scatter Chart */}
      <Card className="shadow-xl border-border/50 bg-white">
        <CardHeader className="p-12 pb-0">
          <CardTitle className="text-3xl font-black text-slate-900">Market Positioning Index</CardTitle>
          <CardDescription className="text-lg font-medium">Corrected Sentiment % vs. Estimated Category Share</CardDescription>
        </CardHeader>
        <CardContent className="p-12">
          <div className="h-[650px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" dataKey="sentiment" name="Sentiment" unit="%" stroke="#94a3b8" fontSize={16} tickLine={false} axisLine={false} />
                <YAxis type="number" dataKey="marketShare" name="Share" unit="%" stroke="#94a3b8" fontSize={16} tickLine={false} axisLine={false} />
                <ZAxis type="number" dataKey="growth" range={[500, 3000]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontSize: '16px' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '50px', fontSize: '18px', fontWeight: 600 }} />
                <Scatter name="P&G Portfolio" data={positioningData.filter((d) => d.isPNG)} fill="#003da5" />
                <Scatter name="Competitors" data={positioningData.filter((d) => !d.isPNG)} fill="#cbd5e1" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-12 text-base font-black text-center uppercase tracking-[0.3em] text-slate-400">
            Bubble size represents YOY growth. P&G brands cluster in high-sentiment, premium-share quadrant.
          </p>
        </CardContent>
      </Card>

      {/* Brand Comparison Table */}
      <Card className="shadow-xl border-border/50 overflow-hidden bg-white">
        <CardHeader className="p-12">
          <CardTitle className="text-3xl font-black text-slate-900">Performance Benchmark</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-sm font-black uppercase tracking-[0.3em] text-slate-400">
                  <th className="p-12 text-left">Brand Portfolio</th>
                  <th className="p-12 text-left">Entity</th>
                  <th className="p-12 text-left">Sentiment</th>
                  <th className="p-12 text-left">Share</th>
                  <th className="p-12 text-right">Growth</th>
                </tr>
              </thead>
              <tbody className="text-xl font-bold text-slate-700">
                {competitiveBenchmark.map((brand, index) => {
                  const isPNG = brand.brand.includes('P&G');
                  return (
                    <tr key={index} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="p-12 font-black text-2xl text-slate-900">{brand.brand}</td>
                      <td className="p-12">
                        {isPNG ? (
                          <Badge className="bg-[#003da5] text-white px-6 py-2 text-xs font-black tracking-widest">P&G</Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs font-black text-slate-400 border-slate-200 uppercase tracking-widest px-6 py-2">COMP</Badge>
                        )}
                      </td>
                      <td className="p-12">
                        <div className="flex items-center gap-8">
                          <div className="h-6 w-64 overflow-hidden rounded-full bg-slate-100">
                            <div className={`h-full ${isPNG ? 'bg-[#003da5]' : 'bg-slate-300'}`} style={{ width: `${brand.sentiment}%` }} />
                          </div>
                          <span className="font-mono text-2xl text-slate-900">{brand.sentiment}%</span>
                        </div>
                      </td>
                      <td className="p-12 font-mono text-2xl text-slate-900">{brand.marketShare}%</td>
                      <td className="p-12 text-right">
                        <div className={cn("inline-flex items-center gap-3 text-2xl font-black", brand.growth > 0 ? "text-emerald-600" : "text-rose-600")}>
                          {brand.growth > 0 ? <TrendingUp className="h-8 w-8" /> : <TrendingDown className="h-8 w-8" />}
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
    </div>
  );
}

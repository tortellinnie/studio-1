"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { 
  competitiveBenchmark, 
  allIndustryProducts, 
  totalCacheCount, 
  dynamicGlobalSentiment,
  globalCorrectedRating 
} from '@/data/mockData';
import { 
  TrendingUp, 
  Star 
} from 'lucide-react';
import { cn } from "@/lib/utils";

export default function CompetitiveAnalysisPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-200 pb-20">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Industry Benchmark</h1>
        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
          Relative Performance Positioning across {totalCacheCount.toLocaleString()} Samples
        </p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Market Leader", value: "P&G", sub: "Volume Dominance", color: "border-l-[#003da5]" },
          { title: "Avg Market Positive", value: `${dynamicGlobalSentiment.positive}%`, sub: "Industry-wide benchmark", color: "border-l-emerald-500" },
          { title: "Corrected Rating", value: globalCorrectedRating, sub: "NLP Sentiment Adjusted", color: "border-l-violet-500" },
        ].map((item, i) => (
          <Card key={i} className={cn("chart-card border-l-4", item.color)}>
            <CardContent className="pt-6">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">{item.title}</h4>
              <div className="text-4xl font-bold text-slate-900 tabular-nums">{item.value}</div>
              <p className="text-[10px] text-muted-foreground mt-2 font-medium uppercase tracking-tight">{item.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Positioning Chart */}
      <Card className="chart-card overflow-hidden">
        <CardHeader className="py-6 px-8 border-b border-slate-100 bg-slate-50/30">
          <CardTitle className="text-lg font-bold text-slate-900 uppercase tracking-tight">Market Positioning Matrix (Share vs Sentiment)</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="h-[450px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" dataKey="sentiment" name="Sentiment" unit="%" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} tick={{ fontWeight: 600 }} />
                <YAxis type="number" dataKey="marketShare" name="Share" unit="%" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} tick={{ fontWeight: 600 }} />
                <ZAxis type="number" dataKey="growth" range={[100, 1000]} />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontWeight: 600, fontSize: '10px' }}
                />
                <Legend verticalAlign="top" align="right" height={40} iconType="circle" wrapperStyle={{ fontWeight: 600, fontSize: '10px', textTransform: 'uppercase' }} />
                <Scatter name="P&G Portfolio" data={competitiveBenchmark.filter(d => d.brand === 'P&G')} fill="#003da5" />
                <Scatter name="Competitors" data={competitiveBenchmark.filter(d => d.brand !== 'P&G')} fill="#cbd5e1" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Product Table */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Industry SKU Rankings</h2>
        <Card className="chart-card overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                    <th className="p-6">Rank</th>
                    <th className="p-6">Brand SKU</th>
                    <th className="p-6 text-center">Orig. Rating</th>
                    <th className="p-6 text-center">Corrected Rating</th>
                    <th className="p-6">Sentiment Score</th>
                  </tr>
                </thead>
                <tbody>
                  {allIndustryProducts.map((item, idx) => (
                    <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                      <td className="p-6">
                        <div className={cn(
                          "flex h-10 w-10 items-center justify-center font-bold text-sm rounded",
                          item.isPNG ? "bg-[#ebf2ff] text-[#003da5]" : "bg-slate-100 text-slate-400"
                        )}>
                          {idx + 1}
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-md font-bold text-slate-900 group-hover:text-[#003da5] transition-colors uppercase tracking-tight">{item.name}</span>
                          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{item.brand}</span>
                        </div>
                      </td>
                      <td className="p-6 text-center">
                        <span className="text-sm font-bold text-slate-300">
                          {item.originalRating.toFixed(1)}
                        </span>
                      </td>
                      <td className="p-6 text-center">
                        <div className="flex items-center justify-center gap-1.5 font-bold text-[#003da5] text-2xl tabular-nums tracking-tight">
                          <Star className="h-4 w-4 fill-[#003da5] stroke-none" />
                          {item.correctedRating}
                        </div>
                      </td>
                      <td className="p-6">
                         <div className="flex flex-col gap-2 min-w-[180px]">
                            <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-wider">
                              <span className="text-emerald-600">{item.sentimentScore}% Positive</span>
                              <TrendingUp className="h-3 w-3 text-emerald-500" />
                            </div>
                            <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
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

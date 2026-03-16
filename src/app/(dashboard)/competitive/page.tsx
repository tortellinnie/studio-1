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
    <div className="space-y-10 animate-in fade-in duration-200 pb-20">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-900">Industry benchmark</h1>
        <p className="text-sm text-slate-500 font-medium">
          Relative performance positioning across {totalCacheCount.toLocaleString()} samples.
        </p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: "Market leader", value: "P&G", sub: "Volume dominance", color: "border-l-[#003da5]" },
          { title: "Avg market positive", value: `${dynamicGlobalSentiment.positive}%`, sub: "Industry-wide benchmark", color: "border-l-emerald-500" },
          { title: "Corrected rating", value: globalCorrectedRating, sub: "NLP sentiment adjusted", color: "border-l-violet-500" },
        ].map((item, i) => (
          <Card key={i} className={cn("chart-card border-l-4 rounded-xl bg-white shadow-sm", item.color)}>
            <CardContent className="pt-8 p-8">
              <h4 className="text-sm font-bold text-slate-400 mb-4">{item.title}</h4>
              <div className="text-5xl font-extrabold text-slate-900 tabular-nums">{item.value}</div>
              <p className="text-sm text-muted-foreground mt-3 font-medium">{item.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Positioning Chart */}
      <Card className="chart-card overflow-hidden rounded-xl bg-white shadow-sm">
        <CardHeader className="py-8 px-8 border-b border-slate-100 bg-slate-50/30">
          <CardTitle className="text-xl font-bold text-slate-900">Market positioning matrix (Share vs Sentiment)</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="h-[500px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" dataKey="sentiment" name="Sentiment" unit="%" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontWeight: 500 }} />
                <YAxis type="number" dataKey="marketShare" name="Share" unit="%" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontWeight: 500 }} />
                <ZAxis type="number" dataKey="growth" range={[100, 1000]} />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontWeight: 600, fontSize: '14px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="top" align="right" height={40} iconType="circle" wrapperStyle={{ fontWeight: 600, fontSize: '13px', paddingBottom: '20px' }} />
                <Scatter name="P&G Portfolio" data={competitiveBenchmark.filter(d => d.brand === 'P&G')} fill="#003da5" />
                <Scatter name="Competitors" data={competitiveBenchmark.filter(d => d.brand !== 'P&G')} fill="#cbd5e1" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Product Table */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-slate-900">Industry SKU rankings</h2>
        <Card className="chart-card overflow-hidden rounded-xl bg-white shadow-sm border-slate-200">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50 text-xs font-bold text-slate-400">
                    <th className="p-8">Rank</th>
                    <th className="p-8">Brand SKU</th>
                    <th className="p-8 text-center">Original rating</th>
                    <th className="p-8 text-center">Corrected rating</th>
                    <th className="p-8">Sentiment score</th>
                  </tr>
                </thead>
                <tbody>
                  {allIndustryProducts.map((item, idx) => (
                    <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                      <td className="p-8">
                        <div className={cn(
                          "flex h-12 w-12 items-center justify-center font-bold text-base rounded-lg",
                          item.isPNG ? "bg-[#ebf2ff] text-[#003da5]" : "bg-slate-100 text-slate-400"
                        )}>
                          {idx + 1}
                        </div>
                      </td>
                      <td className="p-8">
                        <div className="flex flex-col gap-1">
                          <span className="text-lg font-bold text-slate-900 group-hover:text-[#003da5] transition-colors">{item.name}</span>
                          <span className="text-xs text-slate-400 font-bold uppercase">{item.brand}</span>
                        </div>
                      </td>
                      <td className="p-8 text-center">
                        <span className="text-base font-bold text-slate-300">
                          {item.originalRating.toFixed(1)}
                        </span>
                      </td>
                      <td className="p-8 text-center">
                        <div className="flex items-center justify-center gap-2 font-extrabold text-[#003da5] text-3xl tabular-nums">
                          <Star className="h-5 w-5 fill-[#003da5] stroke-none" />
                          {item.correctedRating}
                        </div>
                      </td>
                      <td className="p-8">
                         <div className="flex flex-col gap-3 min-w-[220px]">
                            <div className="flex justify-between items-center text-xs font-bold">
                              <span className="text-emerald-600">{item.sentimentScore}% Positive</span>
                              <TrendingUp className="h-4 w-4 text-emerald-500" />
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
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

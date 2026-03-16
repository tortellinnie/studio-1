
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
  Target, 
  Star, 
  AlertCircle 
} from 'lucide-react';
import { cn } from "@/lib/utils";

export default function CompetitiveAnalysisPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const positioningData = competitiveBenchmark.map((item) => ({
    ...item,
    isPNG: item.brand.includes('P&G'),
  }));

  return (
    <div className="space-y-12 animate-in fade-in duration-500 max-w-[1400px] mx-auto pb-10 px-4">
      <div className="space-y-1">
        <h1 className="text-3xl font-black tracking-tighter text-slate-900 font-headline uppercase">Industry Competitive Intelligence</h1>
        <p className="text-base text-muted-foreground font-bold uppercase tracking-widest leading-none">Benchmarking market players across {totalCacheCount.toLocaleString()} inference samples</p>
      </div>

      {/* Market Intelligence Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Market Share Leader", value: "P&G", sub: "Volume Dominance", color: "border-l-[#003da5]" },
          { title: "Avg Market Positive", value: `${dynamicGlobalSentiment.positive}%`, sub: "Industry-wide benchmark", color: "border-l-emerald-500" },
          { title: "Corrected category Avg", value: globalCorrectedRating, sub: "NLP Sentiment Adjusted", color: "border-l-violet-500" },
        ].map((item, i) => (
          <Card key={i} className={cn("shadow-sm border-l-4 bg-white overflow-hidden", item.color)}>
            <CardContent className="pt-8">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">{item.title}</h4>
              <div className="text-5xl font-black text-slate-900 tabular-nums tracking-tighter">{item.value}</div>
              <p className="text-[10px] text-muted-foreground mt-3 font-black uppercase tracking-tight">{item.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Industry Positioning Chart */}
      <Card className="shadow-sm border-slate-200 bg-white overflow-hidden">
        <CardHeader className="py-6 px-8 border-b border-slate-100 bg-slate-50/20">
          <CardTitle className="text-lg font-black text-slate-900 uppercase tracking-tight">Industry Positioning Index (Sentiment vs Share)</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="h-[500px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" dataKey="sentiment" name="Sentiment" unit="%" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tick={{ fontWeight: 900 }} label={{ value: 'Consumer Sentiment (%)', position: 'bottom', offset: 0, fontSize: 10, fontWeight: 900 }} />
                <YAxis type="number" dataKey="marketShare" name="Share" unit="%" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tick={{ fontWeight: 900 }} label={{ value: 'Market Share (%)', angle: -90, position: 'left', fontSize: 10, fontWeight: 900 }} />
                <ZAxis type="number" dataKey="growth" range={[200, 1500]} />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 900 }}
                />
                <Legend verticalAlign="top" align="right" height={48} iconType="circle" wrapperStyle={{ fontWeight: 900, fontSize: '10px', textTransform: 'uppercase' }} />
                <Scatter name="P&G Portfolio" data={positioningData.filter((d) => d.isPNG)} fill="#003da5" />
                <Scatter name="Competitors" data={positioningData.filter((d) => !d.isPNG)} fill="#cbd5e1" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Matrix */}
      <div className="space-y-8">
        <h2 className="text-2xl font-black tracking-tight text-slate-900 font-headline uppercase tracking-tighter">Industry SKU Performance Rankings</h2>
        <Card className="shadow-sm border-slate-200 bg-white overflow-hidden">
          <CardHeader className="py-6 px-8 border-b border-slate-50 bg-slate-50/20 flex flex-row items-center justify-between">
            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">Industry-Wide Matrix (NLP Validated)</CardTitle>
            <Badge className="bg-emerald-500 text-white font-black text-[9px] px-3 py-1">GENAI VALIDATED</Badge>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] uppercase font-black text-slate-400 tracking-widest">
                    <th className="p-8">Rank</th>
                    <th className="p-8">Brand SKU</th>
                    <th className="p-8 text-center">Orig. Rating</th>
                    <th className="p-8 text-center">Corrected Rating</th>
                    <th className="p-8">Dynamic Health Index</th>
                  </tr>
                </thead>
                <tbody>
                  {allIndustryProducts.map((item, idx) => (
                    <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                      <td className="p-8">
                        <div className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-2xl font-black text-lg shadow-sm",
                          item.isPNG ? "bg-[#ebf2ff] text-[#003da5]" : "bg-slate-100 text-slate-400"
                        )}>
                          {idx + 1}
                        </div>
                      </td>
                      <td className="p-8">
                        <div className="flex flex-col gap-1">
                          <span className="text-lg font-black text-slate-900 group-hover:text-[#003da5] transition-colors uppercase tracking-tight">{item.name}</span>
                          <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none">{item.brand}</span>
                        </div>
                      </td>
                      <td className="p-8 text-center">
                        <span className="text-base font-bold text-slate-300 group-hover:text-slate-400 transition-colors">
                          {item.originalRating.toFixed(1)}
                        </span>
                      </td>
                      <td className="p-8 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <div className="flex items-center gap-2 font-black text-[#003da5] text-3xl tabular-nums tracking-tighter">
                            <Star className="h-6 w-6 fill-[#003da5] stroke-none" />
                            {item.correctedRating}
                          </div>
                          <span className="text-[9px] font-black text-emerald-500 uppercase tracking-tighter">Adjusted</span>
                        </div>
                      </td>
                      <td className="p-8">
                         <div className="flex flex-col gap-3 min-w-[200px]">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                              <span className="text-emerald-600">{item.sentimentScore.toFixed(0)}% Positive</span>
                              <TrendingUp className="h-3 w-3 text-emerald-500" />
                            </div>
                            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden shadow-inner">
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

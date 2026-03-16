
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
  pngProducts, 
  totalCacheCount, 
  dynamicGlobalSentiment,
  globalCorrectedRating 
} from '@/data/mockData';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Star, 
  AlertTriangle, 
  ArrowDown, 
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
    <div className="space-y-12 animate-in fade-in duration-500 max-w-[1400px] mx-auto pb-10">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-headline">Competitive Intelligence Engine</h1>
        <p className="text-base text-muted-foreground font-medium">Benchmarking P&G Portfolio vs Top E-commerce Competitors</p>
      </div>

      {/* Intelligence Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "P&G Market Position", value: "#1", sub: "Sentiment leader in laundry", color: "border-l-[#003da5]" },
          { title: "Sentiment Advantage", value: `+${dynamicGlobalSentiment.positive - 58}pts`, sub: "vs. Surf (Top Competitor)", color: "border-l-emerald-500" },
          { title: "Growth Momentum", value: "+5.2%", sub: "Year-over-year improvement", color: "border-l-violet-500" },
        ].map((item, i) => (
          <Card key={i} className={cn("shadow-sm border-l-4 bg-white", item.color)}>
            <CardContent className="pt-8">
              <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-4">{item.title}</h4>
              <div className="text-5xl font-black text-slate-900 tabular-nums">{item.value}</div>
              <p className="text-xs text-muted-foreground mt-3 font-bold uppercase tracking-tight">{item.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Scatter Chart - Market Positioning */}
      <Card className="shadow-sm border-slate-200 bg-white overflow-hidden">
        <CardHeader className="py-6 px-8 border-b border-slate-100 bg-slate-50/30">
          <CardTitle className="text-lg font-extrabold text-slate-900">Portfolio Market Positioning Index</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="h-[500px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" dataKey="sentiment" name="Sentiment" unit="%" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tick={{ fontWeight: 700 }} label={{ value: 'Consumer Sentiment (%)', position: 'bottom', offset: 0, fontSize: 10, fontWeight: 800 }} />
                <YAxis type="number" dataKey="marketShare" name="Share" unit="%" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tick={{ fontWeight: 700 }} label={{ value: 'Market Share (%)', angle: -90, position: 'left', fontSize: 10, fontWeight: 800 }} />
                <ZAxis type="number" dataKey="growth" range={[200, 1500]} />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="top" align="right" height={48} iconType="circle" wrapperStyle={{ fontWeight: 700, fontSize: '12px' }} />
                <Scatter name="P&G Portfolio (Live Cache)" data={positioningData.filter((d) => d.isPNG)} fill="#003da5" />
                <Scatter name="Competitors" data={positioningData.filter((d) => !d.isPNG)} fill="#cbd5e1" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 p-8 bg-[#003da5]/5 rounded-2xl border border-[#003da5]/10 flex items-center gap-6">
            <div className="h-14 w-14 shrink-0 flex items-center justify-center rounded-2xl bg-white shadow-sm border border-[#003da5]/10">
              <Target className="h-7 w-7 text-[#003da5]" />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-[#003da5] font-black uppercase tracking-widest">Strategic Insight</p>
              <p className="text-base text-slate-600 font-bold leading-relaxed">
                P&G brands maintain dominance in the high-sentiment premium quadrant. The P&G Portfolio sentiment of <span className="text-[#003da5]">{dynamicGlobalSentiment.positive}%</span> is powered by {totalCacheCount} validated NLP review inferences.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rankings and Alerts Section */}
      <div className="space-y-8 pt-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-black tracking-tight text-slate-900 font-headline">Sentiment-Corrected Product Rankings</h2>
          <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest">Neutralizing 5-star platform inflation across {totalCacheCount} samples</p>
        </div>

        {/* Rating Inflation Alert */}
        <Card className="border-l-4 border-l-orange-500 shadow-sm bg-orange-50/20 overflow-hidden">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              <div className="p-3 rounded-2xl bg-orange-100 shadow-sm">
                <AlertCircle className="h-7 w-7 text-orange-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Rating Inflation Protocol Active</h3>
                <p className="text-lg text-slate-700 font-medium leading-relaxed">
                  While platform metrics show <span className="font-black text-orange-700 underline underline-offset-4 decoration-2">96.8% 5-star ratings</span>, our GenAI correction engine has neutralized this to a <span className="font-black text-orange-700 text-xl">{globalCorrectedRating} normalized average</span> based on raw customer sentiment.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comparison Table */}
        <Card className="shadow-sm border-slate-200 bg-white overflow-hidden">
          <CardHeader className="py-6 px-8 border-b border-slate-50 bg-slate-50/30 flex flex-row items-center justify-between">
            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">Corrected vs. Original Multi-Platform Performance</CardTitle>
            <Badge className="bg-emerald-500 text-white font-black text-[9px] px-3 py-1">GENAI CORRECTED</Badge>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] uppercase font-black text-slate-400 tracking-widest">
                    <th className="p-8">Rank</th>
                    <th className="p-8">Product SKU</th>
                    <th className="p-8 text-center">Orig. Rating</th>
                    <th className="p-8 text-center">Corrected Rating</th>
                    <th className="p-8">Dynamic Health Index</th>
                  </tr>
                </thead>
                <tbody>
                  {pngProducts.map((item, idx) => (
                    <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                      <td className="p-8">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ebf2ff] text-[#003da5] font-black text-lg shadow-sm">
                          {idx + 1}
                        </div>
                      </td>
                      <td className="p-8">
                        <div className="flex flex-col gap-1">
                          <span className="text-lg font-black text-slate-900 group-hover:text-[#003da5] transition-colors">{item.name}</span>
                          <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest leading-none">{item.brand}</span>
                        </div>
                      </td>
                      <td className="p-8 text-center">
                        <span className="text-base font-bold text-slate-300 group-hover:text-slate-400 transition-colors">
                          {item.originalRating.toFixed(1)}
                        </span>
                      </td>
                      <td className="p-8 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <div className="flex items-center gap-2 font-black text-[#003da5] text-3xl tabular-nums">
                            <Star className="h-6 w-6 fill-[#003da5] stroke-none" />
                            {item.correctedRating}
                          </div>
                          <span className="text-[9px] font-black text-emerald-500 uppercase tracking-tighter">Adjusted Result</span>
                        </div>
                      </td>
                      <td className="p-8">
                         <div className="flex flex-col gap-3 min-w-[200px]">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                              <span className="text-emerald-600">{item.sentimentScore}% Positive Sentiment</span>
                              <TrendingUp className="h-3 w-3 text-emerald-500" />
                            </div>
                            <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden shadow-inner">
                               <div 
                                 className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(34,197,94,0.3)] transition-all duration-1000 ease-out" 
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


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
import { competitiveBenchmark } from '@/data/mockData';
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

const rankingsData = [
  { rank: 1, name: "Downy Fabric Conditioner", brand: "Downy", category: "Fabric Care", reviews: "4,521", original: 4.9, corrected: 4.5, diff: "8.9%", sentiment: 78 },
  { rank: 2, name: "Ariel Liquid Detergent", brand: "Ariel", category: "Laundry", reviews: "3,124", original: 4.8, corrected: 4.3, diff: "11.6%", sentiment: 72 },
  { rank: 3, name: "Tide Powder Detergent", brand: "Tide", category: "Laundry", reviews: "2,847", original: 4.9, corrected: 4.2, diff: "16.7%", sentiment: 68 },
  { rank: 4, name: "Joy Dishwashing Liquid", brand: "Joy", category: "Dishwashing", reviews: "2,341", original: 4.8, corrected: 4.1, diff: "17.1%", sentiment: 65 },
  { rank: 5, name: "Safeguard Bar Soap", brand: "Safeguard", category: "Personal Care", reviews: "1,876", original: 4.7, corrected: 3.9, diff: "20.5%", sentiment: 62 },
];

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
    <div className="space-y-12 animate-in fade-in duration-500 max-w-[1400px] mx-auto pb-10">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Competitive Intelligence Engine</h1>
        <p className="text-base text-muted-foreground">Benchmarking P&G brands vs. Surf, Breeze, Champion, and Zonrox</p>
      </div>

      {/* Intelligence Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "P&G Market Position", value: "#1", sub: "Sentiment leader in laundry", color: "border-l-[#003da5]" },
          { title: "Sentiment Advantage", value: "+15pts", sub: "vs. Surf (Top Competitor)", color: "border-l-emerald-500" },
          { title: "Avg Growth Rate", value: "+5.2%", sub: "Year-over-year improvement", color: "border-l-violet-500" },
        ].map((item, i) => (
          <Card key={i} className={cn("shadow-sm border-l-4", item.color)}>
            <CardContent className="pt-8">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">{item.title}</h4>
              <div className="text-4xl font-extrabold text-slate-900">{item.value}</div>
              <p className="text-xs text-muted-foreground mt-2 font-medium">{item.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Scatter Chart - Market Positioning */}
      <Card className="shadow-sm border-slate-200">
        <CardHeader className="pb-4 border-b border-slate-50">
          <CardTitle className="text-base font-bold text-slate-900">Market Positioning Index</CardTitle>
        </CardHeader>
        <CardContent className="pt-8">
          <div className="h-[450px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis type="number" dataKey="sentiment" name="Sentiment" unit="%" stroke="#888" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis type="number" dataKey="marketShare" name="Share" unit="%" stroke="#888" fontSize={11} tickLine={false} axisLine={false} />
                <ZAxis type="number" dataKey="growth" range={[100, 1000]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend verticalAlign="top" align="right" height={36} iconType="circle" />
                <Scatter name="P&G Portfolio" data={positioningData.filter((d) => d.isPNG)} fill="#003da5" />
                <Scatter name="Competitors" data={positioningData.filter((d) => !d.isPNG)} fill="#94a3b8" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#ebf2ff]">
              <Target className="h-5 w-5 text-[#003da5]" />
            </div>
            <p className="text-sm text-slate-500 font-bold">
              P&G brands maintain dominance in the high-sentiment premium quadrant. Bubble size indicates market momentum.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Rankings and Alerts Section */}
      <div className="space-y-8 pt-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Sentiment-Corrected Product Rankings</h2>
          <p className="text-sm text-muted-foreground">True performance metrics neutralizing platform-wide 5-star rating inflation</p>
        </div>

        {/* Rating Inflation Alert */}
        <Card className="border-l-4 border-l-orange-500 shadow-sm bg-orange-50/20">
          <CardContent className="p-8">
            <div className="flex items-start gap-5">
              <div className="p-2.5 rounded-xl bg-orange-100">
                <AlertCircle className="h-6 w-6 text-orange-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 uppercase tracking-tight">Rating Inflation Alert</h3>
                <p className="text-base text-slate-600 font-medium leading-relaxed">
                  Platform analytics show <span className="font-extrabold text-orange-700">96.8% of P&G products</span> with 5-star ratings. Our GenAI NLP analysis corrects this to a <span className="font-extrabold text-orange-700">4.20 average</span> based on true customer sentiment.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comparison Table */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="pb-4 border-b border-slate-50">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-400">Corrected vs. Original Rankings</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  <th className="p-6">Rank</th>
                  <th className="p-6">Product</th>
                  <th className="p-6">Category</th>
                  <th className="p-6">Orig. Rating</th>
                  <th className="p-6">Corrected Rating</th>
                  <th className="p-6">Status</th>
                </tr>
              </thead>
              <tbody>
                {rankingsData.map((item) => (
                  <tr key={item.rank} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="p-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ebf2ff] text-[#003da5] font-extrabold text-sm">
                        {item.rank}
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900">{item.name}</span>
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">{item.brand}</span>
                      </div>
                    </td>
                    <td className="p-6">
                      <Badge variant="outline" className="text-[10px] font-bold uppercase text-slate-500 bg-slate-50 border-slate-200">
                        {item.category}
                      </Badge>
                    </td>
                    <td className="p-6 text-sm font-bold text-slate-400">
                      {item.original.toFixed(1)}
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-1.5 font-extrabold text-[#003da5] text-lg">
                        <Star className="h-4 w-4 fill-[#003da5]" />
                        {item.corrected.toFixed(1)}
                      </div>
                    </td>
                    <td className="p-6">
                       <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-bold uppercase text-emerald-600">{item.sentiment}% Positive</span>
                          <div className="h-1.5 w-32 rounded-full bg-slate-100 overflow-hidden">
                             <div className="h-full bg-emerald-500" style={{ width: `${item.sentiment}%` }} />
                          </div>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

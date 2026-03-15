
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
  CheckCircle2, 
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
    <div className="space-y-10 animate-in fade-in duration-500 max-w-[1400px] mx-auto pb-10">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Competitive Intelligence</h1>
        <p className="text-sm text-muted-foreground">P&G market positioning vs key category competitors</p>
      </div>

      {/* Scatter Chart */}
      <Card className="shadow-sm border-slate-200">
        <CardHeader className="pb-4 border-b border-slate-50">
          <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-600">Market Positioning Index</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis type="number" dataKey="sentiment" name="Sentiment" unit="%" stroke="#888" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis type="number" dataKey="marketShare" name="Share" unit="%" stroke="#888" fontSize={11} tickLine={false} axisLine={false} />
                <ZAxis type="number" dataKey="growth" range={[50, 400]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend verticalAlign="top" align="right" height={36} iconType="circle" />
                <Scatter name="P&G Portfolio" data={positioningData.filter((d) => d.isPNG)} fill="#003da5" />
                <Scatter name="Competitors" data={positioningData.filter((d) => !d.isPNG)} fill="#94a3b8" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-100 flex items-center gap-3">
            <Target className="h-4 w-4 text-[#003da5]" />
            <p className="text-xs text-slate-500 font-medium">
              P&G brands maintain dominance in the high-sentiment premium quadrant. Bubble scale indicates annual growth trends.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* SECTION: Sentiment-Corrected Product Rankings */}
      <div className="space-y-6 pt-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Sentiment-Corrected Product Rankings</h2>
          <p className="text-sm text-muted-foreground">True performance metrics neutralizing Lazada's 96.8% 5-star rating inflation</p>
        </div>

        {/* Rating Inflation Alert */}
        <Card className="border-l-4 border-l-orange-500 shadow-sm bg-white overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <Star className="h-5 w-5 text-orange-500" />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-tight text-slate-900">Rating Inflation Alert</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Lazada shows <span className="font-bold">96.8% of P&G products with 5-star ratings</span>, which doesn't reflect true customer sentiment when analyzed with AI. 
                  Our sentiment-corrected rankings use NLP analysis of review text to provide accurate performance metrics, revealing products that genuinely excel vs. those riding platform inflation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Corrected vs. Original Rankings Table */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="pb-4 border-b border-slate-50">
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-600">Corrected vs. Original Rankings</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  <th className="p-4">Rank</th>
                  <th className="p-4">Product</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Reviews</th>
                  <th className="p-4">Original Rating</th>
                  <th className="p-4">Corrected Rating</th>
                  <th className="p-4">Difference</th>
                  <th className="p-4 text-right">Sentiment</th>
                </tr>
              </thead>
              <tbody>
                {rankingsData.map((item) => (
                  <tr key={item.rank} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ebf2ff] text-[#003da5] font-bold text-xs">
                        {item.rank}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900">{item.name}</span>
                        <span className="text-[10px] text-slate-400 font-medium">{item.brand}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-tighter text-slate-500 bg-slate-50 px-2">
                        {item.category}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm font-medium text-slate-600">{item.reviews}</td>
                    <td className="p-4 text-sm font-bold text-slate-900">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {item.original.toFixed(1)}
                      </div>
                    </td>
                    <td className="p-4 text-sm font-bold text-[#003da5]">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-[#003da5] text-[#003da5]" />
                        {item.corrected.toFixed(1)}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-xs font-bold text-rose-500">
                        <ArrowDown className="h-3 w-3" />
                        {item.diff}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[10px] font-bold uppercase text-slate-400">{item.sentiment}% positive</span>
                        <div className="h-1.5 w-24 rounded-full bg-slate-100 overflow-hidden">
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

        {/* Top Performers and Needs Improvement Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-sm border-l-4 border-l-emerald-500">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-bold uppercase tracking-tight text-slate-900">Top Performers (True Rankings)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {rankingsData.slice(0, 3).map((item) => (
                <div key={item.rank} className="flex items-center gap-4 group">
                  <div className="h-8 w-8 shrink-0 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-600 font-bold text-xs">
                    {item.rank}
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{item.name}</p>
                    <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest">{item.corrected}/5.0 • {item.sentiment}% positive sentiment</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-sm border-l-4 border-l-orange-500">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-bold uppercase tracking-tight text-slate-900">Needs Improvement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 shrink-0 flex items-center justify-center rounded-full bg-orange-50 text-orange-600">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-bold text-slate-900">Safeguard Bar Soap</p>
                  <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest">3.9/5.0 • 13% negative sentiment</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 shrink-0 flex items-center justify-center rounded-full bg-orange-50 text-orange-600">
                  <AlertCircle className="h-4 w-4" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-bold text-slate-900">Joy Dishwashing Liquid</p>
                  <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest">4.1/5.0 • 11% negative sentiment</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Comparison Table (Benchmark) */}
      <div className="pt-6">
        <Card className="shadow-sm border-slate-200 overflow-hidden">
          <CardHeader className="pb-4 border-b border-slate-50">
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-600">Portfolio Performance Benchmark</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  <th className="p-4">Brand Portfolio</th>
                  <th className="p-4">Sentiment Index</th>
                  <th className="p-4 text-right">YoY Growth</th>
                </tr>
              </thead>
              <tbody>
                {competitiveBenchmark.map((brand, index) => (
                  <tr key={index} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-bold text-slate-900">{brand.brand}</span>
                        {brand.brand.includes('P&G') && (
                          <Badge className="w-fit bg-[#003da5] text-white text-[9px] px-1.5 py-0.5">P&G CORE</Badge>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-1.5 w-32 rounded-full bg-slate-100 overflow-hidden">
                          <div className={cn("h-full", brand.brand.includes('P&G') ? 'bg-[#003da5]' : 'bg-slate-300')} style={{ width: `${brand.sentiment}%` }} />
                        </div>
                        <span className="text-sm font-bold">{brand.sentiment}%</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className={cn("inline-flex items-center gap-1.5 text-sm font-bold", brand.growth > 0 ? "text-emerald-600" : "text-rose-600")}>
                        {brand.growth > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
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
    </div>
  );
}

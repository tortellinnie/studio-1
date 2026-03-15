
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
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Competitive Intelligence</h1>
        <p className="text-sm text-muted-foreground">P&G market positioning vs key category competitors</p>
      </div>

      {/* Scatter Chart */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-sm font-semibold">Market Positioning Index</CardTitle>
        </CardHeader>
        <CardContent>
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
          <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-100 flex items-center gap-3">
            <Target className="h-4 w-4 text-[#003da5]" />
            <p className="text-xs text-slate-500 font-medium">
              P&G brands maintain dominance in the high-sentiment premium quadrant. Bubble scale indicates annual growth.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      <Card className="shadow-sm overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="text-sm font-semibold">Portfolio Performance Benchmark</CardTitle>
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
  );
}

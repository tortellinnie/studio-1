"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  totalCacheCount, 
  getSuperiorityMatrix
} from '@/data/mockData';
import { 
  ShieldCheck
} from 'lucide-react';
import { cn } from "@/lib/utils";

export default function CompetitiveAnalysisPage() {
  const [isClient, setIsClient] = useState(false);
  const matrix = getSuperiorityMatrix();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const vectorLabels = ["Product", "Packaging", "Value", "Communication", "Retail Execution"];

  return (
    <div className="space-y-10 animate-in fade-in duration-200 pb-20">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-900 tracking-normal">Industry benchmark</h1>
        <p className="text-sm text-slate-500 font-bold uppercase tracking-normal">
          Relative performance positioning across {totalCacheCount.toLocaleString()} samples.
        </p>
      </div>

      {/* Competitive Index Delta Table (Expanded War Room View) */}
      <Card className="border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
        <CardHeader className="p-8 border-b border-slate-100 flex flex-row items-center justify-between space-y-0">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold text-slate-900 tracking-normal uppercase">Competitive superiority matrix</CardTitle>
            <CardDescription className="text-xs font-bold text-slate-400 uppercase tracking-normal font-sans">Superiority margin per SKU: (Brand Score - Market Baseline %)</CardDescription>
          </div>
          <ShieldCheck className="h-6 w-6 text-[#003da5]" />
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="p-6 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Product SKU</th>
                  {vectorLabels.map(v => (
                    <th key={v} className="p-6 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">{v}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrix.map((row) => (
                  <tr key={row.brand} className="border-b border-slate-50 hover:bg-slate-50/30 transition-colors last:border-0">
                    <td className="p-6">
                      <div className="flex flex-col gap-0.5">
                        <span className={cn(
                          "text-sm font-bold tracking-normal",
                          row.isPNG ? "text-slate-900" : "text-slate-600"
                        )}>{row.brand}</span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase">{row.producer}</span>
                      </div>
                    </td>
                    {row.deltas.map((d, i) => (
                      <td key={i} className="p-2">
                        <div className={cn(
                          "h-14 flex items-center justify-center rounded-lg text-sm font-bold tabular-nums tracking-normal transition-all",
                          d.delta > 0 ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : 
                          d.delta < 0 ? "bg-red-50 text-red-700 border border-red-100" : 
                          "bg-slate-50 text-slate-400 border border-slate-100"
                        )}>
                          {d.delta > 0 ? `+${d.delta}%` : `${d.delta}%`}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Positioning Chart */}
      <Card className="overflow-hidden rounded-xl bg-white shadow-sm border-slate-200">
        <CardHeader className="py-8 px-8 border-b border-slate-100 bg-slate-50/30">
          <CardTitle className="text-xl font-bold text-slate-900 tracking-normal uppercase">Market positioning matrix (Share vs Sentiment)</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="h-[500px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" dataKey="sentiment" name="Sentiment" unit="%" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontWeight: 600 }} />
                <YAxis type="number" dataKey="marketShare" name="Share" unit="%" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontWeight: 600 }} />
                <ZAxis type="number" dataKey="growth" range={[100, 1000]} />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontWeight: 600, fontSize: '14px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', textTransform: 'uppercase' }}
                />
                <Legend verticalAlign="top" align="right" height={40} iconType="circle" wrapperStyle={{ fontWeight: 700, fontSize: '10px', paddingBottom: '20px', textTransform: 'uppercase' }} />
                <Scatter name="P&G Portfolio" data={competitiveBenchmark.filter(d => d.brand === 'P&G')} fill="#003da5" />
                <Scatter name="Competitors" data={competitiveBenchmark.filter(d => d.brand !== 'P&G')} fill="#cbd5e1" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

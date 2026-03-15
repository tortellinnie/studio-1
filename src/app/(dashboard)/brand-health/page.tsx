"use client";

import { useState, useEffect } from "react";
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  Radar, 
  ResponsiveContainer,
} from 'recharts';
import { 
  ShoppingCart, 
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Info
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { pngProducts, accountRecommendations } from '@/data/mockData';
import { cn } from "@/lib/utils";

export default function BrandHealthPage() {
  const [isClient, setIsClient] = useState(false);
  const rankedProducts = [...pngProducts].sort((a, b) => b.correctedRating - a.correctedRating);
  const lazadaAccount = accountRecommendations[0];

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="space-y-24 animate-in fade-in duration-500 max-w-[1800px] mx-auto pb-40">
      <header className="space-y-6">
        <h1 className="text-7xl font-black font-headline text-slate-900 tracking-tighter">Brand Health</h1>
        <p className="text-3xl font-bold text-slate-500 uppercase tracking-[0.2em]">SKU Corrected Performance & Strategic Vectors</p>
      </header>

      {/* Horizontal Lazada Recommendation Card */}
      <Card className="border-l-[24px] border-l-[#003da5] bg-white shadow-[0_50px_80px_-20px_rgba(0,0,0,0.15)] overflow-hidden rounded-[4rem]">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-24">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-12">
              <div className="p-10 bg-[#003da5]/10 rounded-[2.5rem] text-[#003da5]">
                <ShoppingCart className="h-20 w-20" />
              </div>
              <div>
                <CardTitle className="text-7xl font-black text-slate-900">{lazadaAccount.account} Hub</CardTitle>
                <div className="flex items-center gap-6 mt-6">
                  <Badge className="bg-[#003da5] text-white px-10 py-3 text-sm font-black uppercase tracking-[0.4em]">PRIORITY: {lazadaAccount.priorityScore}</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-24">
          <div className="grid lg:grid-cols-2 gap-32">
            <div className="space-y-16">
              <h4 className="text-sm font-black text-slate-400 uppercase tracking-[0.6em] flex items-center gap-6">
                <Info className="h-6 w-6" /> STRATEGIC RATIONALE
              </h4>
              <p className="text-5xl text-slate-700 font-black italic leading-[1.2] border-l-[24px] border-slate-200 pl-20 py-12">
                "{lazadaAccount.rationale}"
              </p>
            </div>
            <div className="space-y-16">
              <h4 className="text-sm font-black text-slate-400 uppercase tracking-[0.6em] flex items-center gap-6">
                <TrendingUp className="h-6 w-6" /> PRIORITY ACTIONS
              </h4>
              <ul className="space-y-12">
                {lazadaAccount.recommendedActions.map((action, i) => (
                  <li key={i} className="flex items-center gap-12 text-4xl font-black text-slate-700 bg-slate-50 p-12 rounded-[3rem] border border-slate-100 group hover:bg-[#003da5]/5 transition-all">
                    <div className="h-8 w-8 rounded-full bg-[#003da5] shrink-0 shadow-[0_0_20px_rgba(0,61,165,0.4)] group-hover:scale-150 transition-transform" />
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rankings Section */}
      <div className="space-y-16">
        <h2 className="text-5xl font-black text-slate-900 tracking-tight uppercase flex items-center gap-8">
          <ShieldCheck className="h-14 w-14 text-emerald-600" /> Corrected SKU Rankings
        </h2>
        <Card className="border-border/50 bg-white overflow-hidden shadow-2xl rounded-[3rem]">
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="p-16 text-left text-xs uppercase font-black text-slate-400 tracking-[0.5em]">Rank</th>
                  <th className="p-16 text-left text-xs uppercase font-black text-slate-400 tracking-[0.5em]">Product SKU</th>
                  <th className="p-16 text-left text-xs uppercase font-black text-slate-400 tracking-[0.5em] text-[#003da5]">Corrected</th>
                  <th className="p-16 text-right text-xs uppercase font-black text-slate-400 tracking-[0.5em]">Sentiment Health</th>
                </tr>
              </thead>
              <tbody>
                {rankedProducts.map((product, index) => (
                  <tr key={product.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-all cursor-default group">
                    <td className="p-16">
                      <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] bg-[#003da5]/10 text-[#003da5] font-black text-4xl group-hover:bg-[#003da5] group-hover:text-white transition-all">
                        {index + 1}
                      </div>
                    </td>
                    <td className="p-16">
                      <div className="space-y-4">
                        <p className="font-black text-slate-900 text-4xl tracking-tight">{product.name}</p>
                        <p className="text-sm font-black text-slate-400 uppercase tracking-[0.3em]">{product.subcategory}</p>
                      </div>
                    </td>
                    <td className="p-16 font-black text-[#003da5] text-6xl tracking-tighter tabular-nums">{product.correctedRating.toFixed(1)}</td>
                    <td className="p-16 text-right">
                      <div className="flex flex-col items-end gap-8">
                        <span className="text-xs font-black uppercase text-slate-500 tracking-[0.4em]">{product.sentimentDistribution.positive}% POSITIVE</span>
                        <div className="h-10 w-[500px] rounded-full bg-slate-100 overflow-hidden">
                          <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${product.sentimentDistribution.positive}%` }} />
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

      {/* Vectors Breakdown */}
      <div className="space-y-16">
        <h2 className="text-5xl font-black text-slate-900 tracking-tight uppercase">5 Vectors of Superiority</h2>
        <div className="grid gap-16 md:grid-cols-2">
          {pngProducts.slice(0, 2).map((product) => (
            <Card key={product.id} className="border-border/50 shadow-2xl bg-white p-24 rounded-[4rem] hover:scale-[1.03] transition-transform">
              <h3 className="text-sm font-black text-slate-400 uppercase text-center tracking-[0.8em] mb-24">{product.name}</h3>
              <div className="h-[750px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                    { vector: 'Product', value: product.vectors.product },
                    { vector: 'Pack', value: product.vectors.packaging },
                    { vector: 'Value', value: product.vectors.value },
                    { vector: 'Comm', value: product.vectors.communication },
                    { vector: 'Retail', value: product.vectors.retailExec },
                  ]}>
                    <PolarGrid stroke="#f1f5f9" strokeWidth={3} />
                    <PolarAngleAxis dataKey="vector" fontSize={28} tick={{ fill: '#94a3b8', fontWeight: 900 }} />
                    <Radar dataKey="value" stroke="#003da5" fill="#003da5" fillOpacity={0.7} strokeWidth={10} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

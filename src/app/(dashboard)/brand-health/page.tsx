
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
  Star
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
    <div className="space-y-12 animate-in fade-in duration-500 max-w-[1600px] mx-auto pb-20">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold font-headline text-slate-900">Brand Health & Superiority</h1>
        <p className="text-lg text-slate-500 font-medium">Deep-dive into SKU-level corrected performance and vector-based superiority.</p>
      </header>

      {/* Full-Width Lazada Recommendation */}
      <Card className="border-l-[8px] border-l-[#003da5] bg-white shadow-2xl overflow-hidden rounded-3xl">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="p-5 bg-[#003da5]/10 rounded-2xl text-[#003da5]">
                <ShoppingCart className="h-10 w-10" />
              </div>
              <div>
                <CardTitle className="text-3xl font-black text-slate-900">{lazadaAccount.account} Hub</CardTitle>
                <CardDescription className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] mt-2">Priority Score: {lazadaAccount.priorityScore}</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-12">
          <div className="grid lg:grid-cols-2 gap-20">
            <div className="space-y-8">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em]">Strategic Demand Rationale</h4>
              <p className="text-2xl text-slate-700 font-bold italic leading-relaxed border-l-8 border-slate-200 pl-10 py-4">
                "{lazadaAccount.rationale}"
              </p>
            </div>
            <div className="space-y-8">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em]">High-Priority Account Actions</h4>
              <ul className="space-y-6">
                {lazadaAccount.recommendedActions.map((action, i) => (
                  <li key={i} className="flex items-center gap-6 text-lg font-black text-slate-700 bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:bg-[#003da5]/5 transition-colors">
                    <div className="h-4 w-4 rounded-full bg-[#003da5] shrink-0" />
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Rankings */}
      <div className="space-y-8">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Sentiment-Corrected SKU Rankings</h2>
        <Card className="border-border/50 bg-white overflow-hidden shadow-xl rounded-3xl">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-lg">
                <thead>
                  <tr className="border-b border-border/50 text-left bg-slate-50">
                    <th className="p-10 text-xs uppercase font-black text-slate-400 tracking-[0.3em]">Rank</th>
                    <th className="p-10 text-xs uppercase font-black text-slate-400 tracking-[0.3em]">Product SKU</th>
                    <th className="p-10 text-xs uppercase font-black text-slate-400 tracking-[0.3em]">Volume</th>
                    <th className="p-10 text-xs uppercase font-black text-slate-400 tracking-[0.3em]">Original</th>
                    <th className="p-10 text-xs uppercase font-black text-slate-400 tracking-[0.3em] text-primary">Corrected</th>
                    <th className="p-10 text-xs uppercase font-black text-slate-400 tracking-[0.3em] text-right">Sentiment</th>
                  </tr>
                </thead>
                <tbody>
                  {rankedProducts.map((product, index) => (
                    <tr key={product.id} className="border-b border-border/50 hover:bg-slate-50 transition-colors">
                      <td className="p-10">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary font-black text-base border border-primary/20">
                          {index + 1}
                        </div>
                      </td>
                      <td className="p-10 font-black text-slate-900 text-xl">{product.name}</td>
                      <td className="p-10 text-slate-500 font-mono font-bold">{product.reviewCount.toLocaleString()}</td>
                      <td className="p-10 text-slate-400 font-mono font-bold">{product.originalRating.toFixed(1)}</td>
                      <td className="p-10 font-black text-primary font-mono text-2xl">{product.correctedRating.toFixed(1)}</td>
                      <td className="p-10 text-right">
                        <div className="flex flex-col items-end gap-3">
                          <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">{product.sentimentDistribution.positive}% Positive</span>
                          <div className="h-3 w-48 rounded-full bg-slate-100 overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: `${product.sentimentDistribution.positive}%` }} />
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

      {/* Vectors Section */}
      <div className="space-y-10">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase tracking-[0.1em]">5 VECTORS OF SUPERIORITY: SKU BREAKDOWN</h2>
        <div className="grid gap-12 md:grid-cols-2">
          {pngProducts.slice(0, 2).map((product) => (
            <Card key={product.id} className="border-border/50 shadow-2xl bg-white p-16 flex flex-col items-center rounded-3xl">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.6em] mb-16">{product.name}</h3>
              <div className="h-[450px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                    { vector: 'Product', value: product.vectors.product },
                    { vector: 'Pack', value: product.vectors.packaging },
                    { vector: 'Value', value: product.vectors.value },
                    { vector: 'Comm', value: product.vectors.communication },
                    { vector: 'Retail', value: product.vectors.retailExec },
                  ]}>
                    <PolarGrid stroke="#f1f5f9" />
                    <PolarAngleAxis dataKey="vector" fontSize={14} tick={{ fill: '#94a3b8', fontWeight: 800 }} />
                    <Radar 
                      name={product.name} 
                      dataKey="value" 
                      stroke="#003da5" 
                      fill="#003da5" 
                      fillOpacity={0.65} 
                      strokeWidth={4}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <button className="mt-16 w-full py-6 flex items-center justify-center gap-4 text-xs font-black uppercase tracking-[0.4em] text-slate-400 hover:text-[#003da5] border-t border-slate-100 transition-all hover:gap-6">
                FULL VECTOR REPORT <ArrowRight className="h-5 w-5" />
              </button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

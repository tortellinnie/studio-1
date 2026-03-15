
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
  Star,
  ArrowRight,
  TrendingUp,
  AlertTriangle
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
    <div className="space-y-8 animate-in fade-in duration-500 max-w-[1400px] mx-auto pb-10">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold font-headline text-slate-900">Brand Health & Superiority</h1>
        <p className="text-slate-500 font-medium text-sm">Detailed deep-dive into corrected rankings and vector-based superiority.</p>
      </header>

      {/* Lazada Strategic Recommendation */}
      <Card className="border-l-4 border-l-[#003da5] bg-white shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#003da5]/10 rounded-lg">
                <ShoppingCart className="h-5 w-5 text-[#003da5]" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-slate-900">{lazadaAccount.account}</CardTitle>
                <CardDescription className="text-xs font-bold text-slate-400 uppercase">Priority Score: {lazadaAccount.priorityScore}</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI Strategic Rationale</h4>
              <p className="text-slate-600 text-sm font-medium italic leading-relaxed border-l-2 border-slate-200 pl-4 py-1">
                "{lazadaAccount.rationale}"
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Priority Actions</h4>
              <ul className="space-y-3">
                {lazadaAccount.recommendedActions.map((action, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs font-semibold text-slate-700">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#003da5] shrink-0" />
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rankings Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Sentiment-Corrected Rankings</h2>
        <Card className="border-border/50 bg-white overflow-hidden shadow-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50 text-left bg-slate-50/50">
                    <th className="p-4 text-[10px] uppercase font-bold text-slate-400">Rank</th>
                    <th className="p-4 text-[10px] uppercase font-bold text-slate-400">Product</th>
                    <th className="p-4 text-[10px] uppercase font-bold text-slate-400">Reviews</th>
                    <th className="p-4 text-[10px] uppercase font-bold text-slate-400">Original</th>
                    <th className="p-4 text-[10px] uppercase font-bold text-slate-400 text-primary">Corrected</th>
                    <th className="p-4 text-[10px] uppercase font-bold text-slate-400 text-right">Sentiment</th>
                  </tr>
                </thead>
                <tbody>
                  {rankedProducts.map((product, index) => (
                    <tr key={product.id} className="border-b border-border/50 hover:bg-slate-50/50 transition-colors">
                      <td className="p-4">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-[10px]">
                          {index + 1}
                        </div>
                      </td>
                      <td className="p-4 font-bold text-slate-900 text-xs">{product.name}</td>
                      <td className="p-4 text-slate-400 font-mono text-[10px]">{product.reviewCount.toLocaleString()}</td>
                      <td className="p-4 text-slate-400 font-mono text-[10px]">{product.originalRating.toFixed(1)}</td>
                      <td className="p-4 font-black text-primary font-mono text-xs">{product.correctedRating.toFixed(1)}</td>
                      <td className="p-4 text-right">
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-[9px] font-bold uppercase text-slate-500">{product.sentimentDistribution.positive}% Positive</span>
                          <div className="h-1 w-20 rounded-full bg-slate-100 overflow-hidden">
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
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900">5 VECTORS OF SUPERIORITY</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {pngProducts.slice(0, 2).map((product) => (
            <Card key={product.id} className="border-border/50 shadow-sm bg-white p-8">
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-8 text-center">{product.name}</h3>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={[
                    { vector: 'Product', value: product.vectors.product },
                    { vector: 'Pack', value: product.vectors.packaging },
                    { vector: 'Value', value: product.vectors.value },
                    { vector: 'Comm', value: product.vectors.communication },
                    { vector: 'Retail', value: product.vectors.retailExec },
                  ]}>
                    <PolarGrid stroke="#f1f5f9" />
                    <PolarAngleAxis dataKey="vector" fontSize={10} tick={{ fill: '#94a3b8', fontWeight: 600 }} />
                    <Radar 
                      name={product.name} 
                      dataKey="value" 
                      stroke="#003da5" 
                      fill="#003da5" 
                      fillOpacity={0.6} 
                      strokeWidth={2}
                    />
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

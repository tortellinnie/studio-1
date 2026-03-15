
"use client";

import { useState, useEffect } from "react";
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  Radar, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { 
  Star, 
  TrendingUp, 
  ShoppingCart, 
  Info, 
  ArrowRight,
  Package,
  Box,
  DollarSign,
  MessageSquare,
  Store,
  AlertTriangle,
  ArrowDown,
  ArrowUp
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

  const subcategories = Array.from(new Set(pngProducts.map(p => p.subcategory)));
  
  const subcategoryRecommendations = subcategories.map(sub => {
    const productsInSub = pngProducts
      .filter(p => p.subcategory === sub)
      .map(p => ({
        ...p,
        weightedScore: (p.sentimentDistribution.positive / 100) * p.reviewCount
      }))
      .sort((a, b) => b.weightedScore - a.weightedScore)
      .slice(0, 3);

    return {
      name: sub,
      products: productsInSub
    };
  });

  if (!isClient) return null;

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-[1400px] mx-auto p-4">
      <header className="space-y-2">
        <h1 className="text-4xl font-extrabold font-headline tracking-tight text-slate-900">Brand Health & Superiority</h1>
        <p className="text-slate-500 font-medium text-lg">Detailed analysis of rankings, superiority vectors, and account recommendations.</p>
      </header>

      {/* Lazada Strategic Recommendation - Horizontal Card */}
      <Card className="border-l-4 border-l-[#003da5] bg-white shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#003da5]/10 rounded-lg">
                <ShoppingCart className="h-5 w-5 text-[#003da5]" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">{lazadaAccount.account}</CardTitle>
                <CardDescription className="font-medium text-slate-500">Channel Priority Hub</CardDescription>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Priority Score</p>
              <div className="text-3xl font-black text-[#003da5] leading-none">{lazadaAccount.priorityScore}</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">AI Strategic Rationale</h4>
              <p className="text-slate-600 font-medium italic leading-relaxed border-l-2 border-slate-200 pl-4 py-1">
                "{lazadaAccount.rationale}"
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Priority Actions</h4>
              <ul className="space-y-3">
                {lazadaAccount.recommendedActions.map((action, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#003da5] shrink-0" />
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Rankings Table */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Sentiment-Corrected Rankings</h2>
        <Card className="border-border/50 bg-white overflow-hidden shadow-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50 text-left bg-slate-50/50">
                    <th className="p-4 text-[10px] uppercase font-bold text-slate-400">Rank</th>
                    <th className="p-4 text-[10px] uppercase font-bold text-slate-400">Product</th>
                    <th className="p-4 text-[10px] uppercase font-bold text-slate-400">Original</th>
                    <th className="p-4 text-[10px] uppercase font-bold text-slate-400 text-primary">Corrected</th>
                    <th className="p-4 text-[10px] uppercase font-bold text-slate-400 text-right">Sentiment</th>
                  </tr>
                </thead>
                <tbody>
                  {rankedProducts.map((product, index) => (
                    <tr key={product.id} className="border-b border-border/50 hover:bg-slate-50/50 transition-colors">
                      <td className="p-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-xs">
                          {index + 1}
                        </div>
                      </td>
                      <td className="p-4 font-bold text-slate-900">{product.name}</td>
                      <td className="p-4 text-slate-400 font-mono">{product.originalRating.toFixed(1)}</td>
                      <td className="p-4 font-bold text-primary font-mono">{product.correctedRating.toFixed(1)}</td>
                      <td className="p-4 text-right">
                        <div className="flex flex-col items-end gap-1.5">
                          <span className="text-[9px] font-bold uppercase text-slate-500">{product.sentimentDistribution.positive}% Positive</span>
                          <div className="h-1 w-24 rounded-full bg-slate-100 overflow-hidden">
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

      {/* Vectors of Superiority - 2 Column Radar Breakdown */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-slate-900">5 Vectors of Superiority</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {pngProducts.slice(0, 2).map((product) => (
            <Card key={product.id} className="border-slate-100 shadow-sm bg-white p-10 flex flex-col items-center">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-[0.3em] mb-12">{product.name}</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={[
                    { vector: 'Product', value: product.vectors.product },
                    { vector: 'Pack', value: product.vectors.packaging },
                    { vector: 'Value', value: product.vectors.value },
                    { vector: 'Comm', value: product.vectors.communication },
                    { vector: 'Retail', value: product.vectors.retailExec },
                  ]}>
                    <PolarGrid stroke="#f1f5f9" />
                    <PolarAngleAxis dataKey="vector" fontSize={11} tick={{ fill: '#94a3b8', fontWeight: 600 }} />
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

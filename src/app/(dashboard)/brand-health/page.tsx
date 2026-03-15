
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  Radar, 
  ResponsiveContainer 
} from 'recharts';
import { 
  CheckCircle2, 
  ShoppingCart,
  TrendingUp,
  Info
} from "lucide-react";
import { pngProducts, accountRecommendations } from '@/data/mockData';

export default function BrandHealthPage() {
  const [isClient, setIsClient] = useState(false);
  const rankedProducts = [...pngProducts].sort((a, b) => b.correctedRating - a.correctedRating);
  const lazadaAccount = accountRecommendations[0];

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Brand Health & Strategy</h1>
        <p className="text-sm text-muted-foreground">Strategic SKU performance and retail execution vectors</p>
      </div>

      {/* Strategic Recommendation */}
      <Card className="border-l-4 border-l-[#003da5] shadow-sm">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingCart className="h-5 w-5 text-[#003da5]" />
              <CardTitle className="text-lg font-bold">{lazadaAccount.account} Strategic Hub</CardTitle>
            </div>
            <Badge className="bg-[#003da5] text-white">Priority: {lazadaAccount.priorityScore}</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Info className="h-3 w-3" /> AI Rationale
              </h4>
              <p className="text-lg text-slate-700 font-medium italic border-l-4 border-slate-200 pl-4 py-2">
                "{lazadaAccount.rationale}"
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <TrendingUp className="h-3 w-3" /> Priority Actions
              </h4>
              <ul className="grid grid-cols-1 gap-2">
                {lazadaAccount.recommendedActions.map((action, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <div className="h-2 w-2 rounded-full bg-[#003da5]" />
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rankings Table */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-sm font-semibold">Corrected SKU Rankings</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                <th className="p-4">Rank</th>
                <th className="p-4">Product SKU</th>
                <th className="p-4">Corrected Rating</th>
                <th className="p-4 text-right">Sentiment Health</th>
              </tr>
            </thead>
            <tbody>
              {rankedProducts.map((product, index) => (
                <tr key={product.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-[#003da5] font-bold text-sm">
                      {index + 1}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-0.5">
                      <p className="font-bold text-slate-900 text-sm">{product.name}</p>
                      <p className="text-[10px] text-muted-foreground">{product.subcategory}</p>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-[#003da5] text-lg">{product.correctedRating.toFixed(1)}</td>
                  <td className="p-4 text-right">
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[10px] font-bold uppercase text-emerald-600">{product.sentimentDistribution.positive}% Positive</span>
                      <div className="h-1.5 w-32 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: `${product.sentimentDistribution.positive}%` }} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Radar Vectors Section */}
      <div className="grid gap-4 md:grid-cols-2">
        {pngProducts.slice(0, 2).map((product) => (
          <Card key={product.id} className="shadow-sm">
            <CardHeader className="pb-2 text-center">
              <CardTitle className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={[
                  { vector: 'Product', value: product.vectors.product },
                  { vector: 'Pack', value: product.vectors.packaging },
                  { vector: 'Value', value: product.vectors.value },
                  { vector: 'Comm', value: product.vectors.communication },
                  { vector: 'Retail', value: product.vectors.retailExec },
                ]}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="vector" fontSize={10} tick={{ fill: '#64748b', fontWeight: 600 }} />
                  <Radar dataKey="value" stroke="#003da5" fill="#003da5" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

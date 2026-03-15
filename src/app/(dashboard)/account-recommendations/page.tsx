
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  TrendingUp, 
  Lightbulb,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

const topProducts = [
  {
    rank: 1,
    name: "Downy Fabric Conditioner",
    sentiment: "78% positive",
    reviews: "4521 reviews",
    isHighest: true
  },
  {
    rank: 2,
    name: "Ariel Liquid Detergent",
    sentiment: "72% positive",
    reviews: "3124 reviews",
    isHighest: false
  },
  {
    rank: 3,
    name: "Tide Powder Detergent",
    sentiment: "68% positive",
    reviews: "2847 reviews",
    isHighest: false
  }
];

const recommendations = [
  "Increase inventory for Downy - sentiment score 0.78 with high demand",
  "Feature Ariel in promotional campaigns - 72% positive sentiment",
  "Monitor Safeguard reviews - declining sentiment detected"
];

export default function AccountRecommendationsPage() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-[1400px] mx-auto pb-10">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Account-Level Recommendations</h1>
        <p className="text-sm text-muted-foreground">AI-powered product prioritization for e-commerce accounts based on sentiment trends</p>
      </div>

      <Card className="shadow-sm border-l-4 border-l-[#003da5] border-slate-200 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between py-6 px-8 border-b border-slate-50">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <ShoppingCart className="h-5 w-5 text-slate-900" />
              <CardTitle className="text-lg font-bold">Lazada</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-3 w-3 text-emerald-500" />
              <Badge className="bg-slate-900 text-[10px] font-bold h-5 px-2">Improving</Badge>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Priority Score</p>
            <p className="text-4xl font-extrabold text-[#003da5]">92</p>
          </div>
        </CardHeader>
        <CardContent className="p-8 space-y-10">
          <div className="space-y-6">
            <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">Top Performing Products</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topProducts.map((product) => (
                <div key={product.rank} className="relative p-6 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ebf2ff] text-[#003da5] font-bold text-xs">
                      {product.rank}
                    </div>
                    {product.isHighest && (
                      <Badge className="bg-[#22c55e] hover:bg-[#22c55e] text-[9px] font-bold h-5 px-2">Highest Priority</Badge>
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-900">{product.name}</p>
                    <p className="text-[11px] text-slate-400 font-medium">
                      {product.sentiment} • {product.reviews}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-slate-50">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="h-4 w-4 text-orange-500" />
              <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">Recommended Actions</h4>
            </div>
            <ul className="space-y-3">
              {recommendations.map((action, i) => (
                <li key={i} className="flex items-start gap-3 group">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#003da5] shrink-0" />
                  <span className="text-sm font-medium text-slate-600 group-hover:text-[#003da5] transition-colors">{action}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

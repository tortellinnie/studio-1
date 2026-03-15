
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  TrendingUp, 
  Lightbulb,
  CheckCircle2,
  TrendingDown,
  Minus
} from "lucide-react";
import { cn } from "@/lib/utils";

const accountsData = [
  {
    account: "Lazada",
    status: "improving",
    priorityScore: 92,
    trendIcon: TrendingUp,
    trendColor: "text-emerald-500",
    topProducts: [
      { rank: 1, name: "Downy Fabric Conditioner", sentiment: "78% positive", reviews: "4521 reviews", isHighest: true },
      { rank: 2, name: "Ariel Liquid Detergent", sentiment: "72% positive", reviews: "3124 reviews", isHighest: false },
      { rank: 3, name: "Tide Powder Detergent", sentiment: "68% positive", reviews: "2847 reviews", isHighest: false }
    ],
    recommendations: [
      "Increase inventory for Downy - sentiment score 0.78 with high demand",
      "Feature Ariel in promotional campaigns - 72% positive sentiment",
      "Monitor Safeguard reviews - declining sentiment detected"
    ]
  },
  {
    account: "Shopee",
    status: "stable",
    priorityScore: 87,
    trendIcon: Minus,
    trendColor: "text-slate-400",
    topProducts: [
      { rank: 1, name: "Joy Dishwashing Liquid", sentiment: "65% positive", reviews: "2341 reviews", isHighest: true },
      { rank: 2, name: "Tide Powder Detergent", sentiment: "68% positive", reviews: "2847 reviews", isHighest: false },
      { rank: 3, name: "Ariel Liquid Detergent", sentiment: "72% positive", reviews: "3124 reviews", isHighest: false }
    ],
    recommendations: [
      "Promote Joy value proposition - high value vector score (0.95)",
      "Address packaging concerns for Tide - below average packaging score",
      "Expand Ariel product line visibility"
    ]
  }
];

export default function AccountRecommendationsPage() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-[1400px] mx-auto pb-10">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Account-Level Recommendations</h1>
        <p className="text-base text-muted-foreground">AI-powered product prioritization for e-commerce accounts based on sentiment trends</p>
      </div>

      <div className="space-y-10">
        {accountsData.map((data) => (
          <Card key={data.account} className="shadow-sm border-slate-200 overflow-hidden bg-white">
            <CardHeader className="flex flex-row items-center justify-between py-8 px-10 border-b border-slate-50">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="h-6 w-6 text-slate-900" />
                  <CardTitle className="text-2xl font-bold text-slate-900">{data.account}</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <data.trendIcon className={cn("h-4 w-4", data.trendColor)} />
                  <Badge className="bg-slate-900 text-[10px] font-bold h-5 px-2 uppercase tracking-widest">{data.status}</Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Priority Score</p>
                <p className="text-6xl font-extrabold text-[#003da5] leading-none">{data.priorityScore}</p>
              </div>
            </CardHeader>
            <CardContent className="p-10 space-y-10">
              <div className="space-y-6">
                <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">Top Performing Products</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {data.topProducts.map((product) => (
                    <div key={product.rank} className="relative p-8 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ebf2ff] text-[#003da5] font-bold text-sm">
                          {product.rank}
                        </div>
                        {product.isHighest && (
                          <Badge className="bg-[#22c55e] hover:bg-[#22c55e] text-[10px] font-bold h-6 px-3">Highest Priority</Badge>
                        )}
                      </div>
                      <div className="space-y-1">
                        <p className="text-lg font-bold text-slate-900 leading-tight">{product.name}</p>
                        <p className="text-sm text-slate-400 font-medium">
                          {product.sentiment} • {product.reviews}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6 pt-8 border-t border-slate-50">
                <div className="flex items-center gap-3 mb-2">
                  <Lightbulb className="h-6 w-6 text-orange-500" />
                  <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">Recommended Actions</h4>
                </div>
                <ul className="space-y-4">
                  {data.recommendations.map((action, i) => (
                    <li key={i} className="flex items-start gap-4 group">
                      <div className="mt-2.5 h-1.5 w-1.5 rounded-full bg-[#003da5] shrink-0" />
                      <span className="text-base font-semibold text-slate-600 group-hover:text-[#003da5] transition-colors leading-relaxed">
                        {action}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

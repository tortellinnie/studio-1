
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  TrendingUp, 
  Lightbulb,
  Table as TableIcon,
  ShieldCheck,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

const matrixData = [
  { product: "Downy Garden Bloom", account: "Lazada", sentiment: 78, rating: 4.6, price: 82, delivery: 95 },
  { product: "Ariel Sunrise Fresh", account: "Shopee", sentiment: 72, rating: 4.3, price: 45, delivery: 88 },
  { product: "Tide Perfect Clean", account: "Lazada", sentiment: 65, rating: 4.2, price: 60, delivery: 70 },
  { product: "Safeguard White", account: "Shopee", sentiment: 62, rating: 3.9, price: 85, delivery: 92 },
];

const accountsData = [
  {
    account: "Lazada Philippines",
    status: "Improving",
    priorityScore: 92,
    topProducts: [
      { rank: 1, name: "Downy Fabric Conditioner", sentiment: "78% positive", reviews: "4521 reviews", isHighest: true },
      { rank: 2, name: "Ariel Liquid Detergent", sentiment: "72% positive", reviews: "3124 reviews", isHighest: false },
      { rank: 3, name: "Tide Powder Detergent", sentiment: "68% positive", reviews: "2847 reviews", isHighest: false }
    ],
    recommendations: [
      "Increase inventory for Downy - high demand vector score detected",
      "Feature Ariel in upcoming promotional campaigns",
      "Monitor Safeguard reviews - potential packaging concern"
    ]
  }
];

export default function AccountRecommendationsPage() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500 max-w-[1400px] mx-auto pb-10">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Account-Level Recommendations</h1>
        <p className="text-base text-muted-foreground">Strategic SKU performance and retail execution matrix</p>
      </div>

      {/* Product-Account Performance Matrix */}
      <Card className="shadow-sm border-slate-200 overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-8">
          <div className="flex items-center gap-3">
            <TableIcon className="h-6 w-6 text-[#003da5]" />
            <CardTitle className="text-lg font-bold">Product-Account Performance Matrix</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  <th className="p-8">Product SKU</th>
                  <th className="p-8 text-center">Account</th>
                  <th className="p-8">Sentiment Index</th>
                  <th className="p-8 text-center">Corrected Rating</th>
                  <th className="p-8">Price Perception</th>
                  <th className="p-8">Retail Execution</th>
                </tr>
              </thead>
              <tbody>
                {matrixData.map((row, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="p-8 font-bold text-slate-900 text-base">{row.product}</td>
                    <td className="p-8 text-center">
                      <Badge variant="outline" className="text-xs font-bold uppercase border-slate-200">{row.account}</Badge>
                    </td>
                    <td className="p-8">
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold text-slate-900">
                          <span>{row.sentiment}%</span>
                        </div>
                        <Progress value={row.sentiment} className="h-2 bg-slate-100" />
                      </div>
                    </td>
                    <td className="p-8 text-center font-extrabold text-[#003da5] text-2xl">{row.rating.toFixed(1)}</td>
                    <td className="p-8">
                       <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold text-slate-900">
                          <span>{row.price}%</span>
                        </div>
                        <Progress value={row.price} className="h-2 bg-slate-100" />
                      </div>
                    </td>
                    <td className="p-8">
                       <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold text-slate-900">
                          <span>{row.delivery}%</span>
                        </div>
                        <Progress value={row.delivery} className="h-2 bg-slate-100" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
          <ShieldCheck className="h-7 w-7 text-[#003da5]" />
          Strategic Priorities
        </h2>
        {accountsData.map((data) => (
          <Card key={data.account} className="shadow-sm border-slate-200 overflow-hidden bg-white">
            <CardHeader className="flex flex-row items-center justify-between py-10 px-12 border-b border-slate-50">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <ShoppingCart className="h-8 w-8 text-slate-900" />
                  <CardTitle className="text-3xl font-extrabold text-slate-900">{data.account}</CardTitle>
                </div>
                <Badge className="bg-emerald-500 text-white font-bold h-7 px-4 uppercase tracking-widest text-[10px]">{data.status}</Badge>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Priority Score</p>
                <p className="text-7xl font-extrabold text-[#003da5] leading-none">{data.priorityScore}</p>
              </div>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
              <div className="space-y-8">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Top Performing Products</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {data.topProducts.map((product) => (
                    <div key={product.rank} className="relative p-10 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-lg transition-all">
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ebf2ff] text-[#003da5] font-extrabold text-base">
                          {product.rank}
                        </div>
                        {product.isHighest && (
                          <Badge className="bg-[#22c55e] text-white text-[10px] font-bold h-7 px-4">HIGHEST PRIORITY</Badge>
                        )}
                      </div>
                      <div className="space-y-2">
                        <p className="text-xl font-extrabold text-slate-900 leading-tight">{product.name}</p>
                        <p className="text-sm text-slate-400 font-bold uppercase tracking-tight">
                          {product.sentiment} • {product.reviews}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8 pt-10 border-t border-slate-100">
                <div className="flex items-center gap-4">
                  <Lightbulb className="h-8 w-8 text-orange-500" />
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Recommended Actions</h4>
                </div>
                <ul className="space-y-6">
                  {data.recommendations.map((action, i) => (
                    <li key={i} className="flex items-start gap-6 group">
                      <div className="mt-3 h-2 w-2 rounded-full bg-[#003da5] shrink-0" />
                      <span className="text-lg font-bold text-slate-600 group-hover:text-[#003da5] transition-colors leading-relaxed">
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

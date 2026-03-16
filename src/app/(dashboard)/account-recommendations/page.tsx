
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  Table as TableIcon,
  ShieldCheck,
  Zap,
  Lightbulb,
  TrendingUp,
  Tag,
  ArrowUpRight,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  allIndustryProducts, 
  accountRecommendations,
  totalCacheCount,
  promoRecommendations,
  criticalVector,
  dynamicGlobalSentiment
} from "@/data/mockData";

export default function AccountRecommendationsPage() {
  const lazada = accountRecommendations[0];

  return (
    <div className="space-y-12 animate-in fade-in duration-500 max-w-[1400px] mx-auto pb-10">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-headline uppercase tracking-tighter">Account Strategy & Promo Optimization</h1>
        <p className="text-base text-muted-foreground font-medium">Data-driven SKU prioritization for {totalCacheCount.toLocaleString()} marketplace samples</p>
      </div>

      {/* Product-Account Performance Matrix */}
      <Card className="shadow-sm border-slate-200 overflow-hidden bg-white">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-8 px-10">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-[#003da5] rounded-xl shadow-lg shadow-[#003da5]/20">
              <TableIcon className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-xl font-black text-slate-900 uppercase tracking-tight">Product-Account Performance Matrix</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] uppercase font-black text-slate-400 tracking-widest">
                  <th className="p-8">Brand SKU</th>
                  <th className="p-8 text-center">Corrected Rating</th>
                  <th className="p-8">Sentiment Health</th>
                  <th className="p-8">Promo Priority</th>
                  <th className="p-8">Key Target Vector</th>
                </tr>
              </thead>
              <tbody>
                {allIndustryProducts.slice(0, 8).map((row, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                    <td className="p-8 min-w-[250px]">
                      <div className="flex flex-col">
                        <span className="font-black text-slate-900 text-lg group-hover:text-[#003da5] transition-colors tracking-tighter">{row.name}</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{row.brand}</span>
                      </div>
                    </td>
                    <td className="p-8 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="font-black text-[#003da5] text-4xl tabular-nums leading-none tracking-tighter">{row.correctedRating}</span>
                        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-tighter">NLP Verified</span>
                      </div>
                    </td>
                    <td className="p-8 min-w-[180px]">
                      <div className="space-y-3">
                        <div className="flex justify-between text-[10px] font-black text-slate-900 uppercase tracking-widest">
                          <span>{row.sentimentScore.toFixed(0)}% Pos</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden shadow-inner">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${row.sentimentScore}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="p-8">
                      <Badge className={cn(
                        "text-[10px] font-black uppercase px-4 py-1 tracking-widest rounded-lg",
                        row.promoPriority === "High" ? "bg-red-500 text-white" : 
                        row.promoPriority === "Medium" ? "bg-orange-400 text-white" : 
                        "bg-slate-100 text-slate-400"
                      )}>
                        {row.promoPriority}
                      </Badge>
                    </td>
                    <td className="p-8">
                       <div className="flex items-center gap-2 text-xs font-black text-slate-600 uppercase tracking-tight">
                         <Zap className="h-3 w-3 text-[#003da5]" />
                         {row.vectors.value < dynamicGlobalSentiment.positive ? "Value Efficiency" : "Conversion"}
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Promo Recommendations - SKU promo prioritization by sentiment trend */}
      <div className="space-y-8">
        <h2 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-4 font-headline uppercase tracking-tighter">
          <Tag className="h-8 w-8 text-[#003da5]" />
          Promo Recommendations & Prioritization
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promoRecommendations.map((promo, idx) => (
            <Card key={idx} className="border-l-4 border-l-[#003da5] bg-white shadow-sm hover:shadow-md transition-all">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge className={cn(
                    "text-[9px] font-black uppercase px-2 rounded-md",
                    promo.priority === 'High' ? 'bg-red-500 text-white' : 'bg-orange-400 text-white'
                  )}>PRIORITY: {promo.priority}</Badge>
                  <span className="text-[10px] font-black text-slate-400 uppercase">Trend: Negative</span>
                </div>
                <CardTitle className="text-xl font-black text-slate-900 tracking-tighter mt-4">{promo.sku}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Target Vector</p>
                  <p className="text-sm font-black text-slate-700 uppercase tracking-tight">{promo.targetVector}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Tag className="h-5 w-5 text-[#003da5]" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Recommended Promo</p>
                    <p className="text-base font-black text-slate-900 tracking-tighter">{promo.recommendedPromo}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Strategic Priority Cards */}
      <div className="space-y-8 pt-6">
        <h2 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-4 font-headline uppercase tracking-tighter">
          <ShieldCheck className="h-8 w-8 text-[#003da5]" />
          Market-Wide Strategic Priorities
        </h2>
        
        <Card className="shadow-sm border-slate-200 overflow-hidden bg-white">
          <CardHeader className="flex flex-row items-center justify-between py-12 px-14 border-b border-slate-50 bg-slate-50/20">
            <div className="space-y-6">
              <div className="flex items-center gap-5">
                <div className="h-14 w-14 rounded-2xl bg-[#003da5] flex items-center justify-center shadow-lg shadow-[#003da5]/20">
                  <ShoppingCart className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-4xl font-black text-slate-900 tracking-tighter">Lazada Marketplace</CardTitle>
              </div>
              <div className="flex gap-3">
                <Badge className="bg-emerald-500 text-white font-black h-8 px-6 uppercase tracking-[0.2em] text-[10px] rounded-lg shadow-sm shadow-emerald-500/20">INDUSTRY STABLE</Badge>
                <Badge variant="outline" className="border-slate-200 text-slate-400 font-black h-8 px-6 uppercase tracking-[0.2em] text-[10px] rounded-lg bg-white">TIER 1 PLATFORM</Badge>
              </div>
            </div>
            <div className="text-right flex flex-col items-end">
              <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-2 leading-none">Priority Score</p>
              <p className="text-9xl font-black text-[#003da5] leading-none tracking-tighter tabular-nums drop-shadow-sm">{lazada.priorityScore}</p>
            </div>
          </CardHeader>
          <CardContent className="p-14 space-y-16">
            <div className="space-y-10 pt-14 border-t border-slate-100">
              <div className="flex items-center gap-5">
                <div className="h-14 w-14 rounded-2xl bg-orange-100 flex items-center justify-center shadow-sm">
                  <Lightbulb className="h-8 w-8 text-orange-500" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em]">Inference-Based Strategic Rationale</h4>
                  <p className="text-sm font-bold text-slate-400">Validated against {totalCacheCount} NLP segments</p>
                </div>
              </div>
              <p className="text-2xl text-slate-700 font-bold italic border-l-4 border-[#003da5] pl-8 py-4 leading-relaxed tracking-tight bg-slate-50/30 rounded-r-3xl">
                "{lazada.rationale}"
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 pl-4">
                {lazada.recommendedActions.map((action, i) => (
                  <li key={i} className="flex items-start gap-8 group bg-slate-50/50 p-8 rounded-3xl border border-transparent hover:border-[#003da5]/10 hover:bg-white transition-all shadow-sm group">
                    <div className="mt-3 h-3 w-3 rounded-full bg-[#003da5] shrink-0 group-hover:scale-150 transition-transform shadow-sm" />
                    <span className="text-xl font-bold text-slate-600 group-hover:text-slate-900 transition-colors leading-relaxed tracking-tight">
                      {action}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

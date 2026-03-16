
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
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  allIndustryProducts, 
  dynamicVectorScores, 
  accountRecommendations,
  totalCacheCount,
  bestVector,
  criticalVector
} from "@/data/mockData";

export default function AccountRecommendationsPage() {
  const lazada = accountRecommendations[0];

  return (
    <div className="space-y-12 animate-in fade-in duration-500 max-w-[1400px] mx-auto pb-10">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-headline uppercase tracking-tighter">Strategic Industry Recommendations</h1>
        <p className="text-base text-muted-foreground font-medium">Market-wide performance matrix powered by {totalCacheCount.toLocaleString()} inference samples</p>
      </div>

      {/* Product-Account Performance Matrix */}
      <Card className="shadow-sm border-slate-200 overflow-hidden bg-white">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-8 px-10">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-[#003da5] rounded-xl shadow-lg shadow-[#003da5]/20">
              <TableIcon className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-xl font-black text-slate-900 uppercase tracking-tight">Market Performance Matrix</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] uppercase font-black text-slate-400 tracking-widest">
                  <th className="p-8">Brand SKU</th>
                  <th className="p-8 text-center">Owner</th>
                  <th className="p-8">Sentiment Index</th>
                  <th className="p-8 text-center">Corrected Rating</th>
                  <th className="p-8">Value Health</th>
                  <th className="p-8">Retail Exec</th>
                </tr>
              </thead>
              <tbody>
                {allIndustryProducts.map((row, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                    <td className="p-8 min-w-[250px]">
                      <div className="flex flex-col">
                        <span className="font-black text-slate-900 text-lg group-hover:text-[#003da5] transition-colors tracking-tight">{row.name}</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{row.brand}</span>
                      </div>
                    </td>
                    <td className="p-8 text-center">
                      <Badge variant="outline" className={cn(
                        "text-[10px] font-black uppercase px-4 py-1 tracking-widest",
                        row.isPNG ? "border-[#003da5]/30 text-[#003da5] bg-[#ebf2ff]" : "border-slate-200 text-slate-500 bg-white"
                      )}>
                        {row.isPNG ? "P&G" : "COMPETITOR"}
                      </Badge>
                    </td>
                    <td className="p-8 min-w-[180px]">
                      <div className="space-y-3">
                        <div className="flex justify-between text-[10px] font-black text-slate-900 uppercase tracking-widest">
                          <span>{row.sentimentScore.toFixed(0)}% Corrected</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden shadow-inner">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${row.sentimentScore}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="p-8 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="font-black text-[#003da5] text-4xl tabular-nums leading-none tracking-tighter">{row.correctedRating}</span>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <div key={s} className={cn("h-1 w-3 rounded-full", s <= Math.round(parseFloat(row.correctedRating)) ? "bg-[#003da5]" : "bg-slate-200")} />
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="p-8 min-w-[180px]">
                       <div className="space-y-3">
                        <div className="flex justify-between text-[10px] font-black text-slate-900 uppercase tracking-widest">
                          <span>{row.vectors.value.toFixed(0)}% Pos</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden shadow-inner">
                          <div className="h-full bg-[#003da5] rounded-full" style={{ width: `${row.vectors.value}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="p-8 min-w-[180px]">
                       <div className="space-y-3">
                        <div className="flex justify-between text-[10px] font-black text-slate-900 uppercase tracking-widest">
                          <span>{row.vectors.retailExec.toFixed(0)}% Pos</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden shadow-inner">
                          <div className="h-full bg-[#003da5] rounded-full" style={{ width: `${row.vectors.retailExec}%` }} />
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

      <div className="space-y-8">
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
            <div className="space-y-10">
              <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em] border-l-4 border-[#003da5] pl-4">Market Leaders (NLP Validated)</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {allIndustryProducts.slice(0, 3).map((product, idx) => (
                  <div key={product.id} className="relative p-12 rounded-[2rem] border border-slate-100 bg-white shadow-sm hover:shadow-xl hover:border-[#003da5]/20 transition-all group overflow-hidden">
                    <div className="absolute top-0 right-0 h-32 w-32 bg-slate-50 rounded-full -mr-16 -mt-16 group-hover:bg-[#ebf2ff] transition-colors" />
                    <div className="relative z-10 flex items-center justify-between mb-10">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ebf2ff] text-[#003da5] font-black text-xl shadow-inner group-hover:scale-110 transition-transform">
                        {idx + 1}
                      </div>
                      {idx === 0 && (
                        <Badge className="bg-[#22c55e] text-white text-[9px] font-black h-8 px-5 uppercase tracking-widest rounded-xl shadow-lg shadow-emerald-500/20">MARKET LEADER</Badge>
                      )}
                    </div>
                    <div className="relative z-10 space-y-3">
                      <p className="text-2xl font-black text-slate-900 leading-none tracking-tight group-hover:text-[#003da5] transition-colors">{product.name}</p>
                      <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest flex items-center gap-2">
                        {product.brand}
                      </p>
                      <p className="text-xs text-emerald-600 font-extrabold uppercase tracking-widest flex items-center gap-2">
                        {product.sentimentScore.toFixed(0)}% Corrected Sentiment
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-10 pt-14 border-t border-slate-100">
              <div className="flex items-center gap-5">
                <div className="h-14 w-14 rounded-2xl bg-orange-100 flex items-center justify-center shadow-sm">
                  <Lightbulb className="h-8 w-8 text-orange-500" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em]">Recommended Strategic Actions</h4>
                  <p className="text-sm font-bold text-slate-400">Industry Inference Rationale: {lazada.rationale}</p>
                </div>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 pl-4">
                {lazada.recommendedActions.map((action, i) => (
                  <li key={i} className="flex items-start gap-8 group bg-slate-50/50 p-8 rounded-3xl border border-transparent hover:border-[#003da5]/10 hover:bg-white transition-all shadow-sm group">
                    <div className="mt-3 h-3 w-3 rounded-full bg-[#003da5] shrink-0 group-hover:scale-150 transition-transform" />
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

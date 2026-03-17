"use client";

import { useState, useEffect } from "react";
import { 
  ChevronUp, 
  ChevronDown
} from "lucide-react";
import { 
  getRankedIndustrySkus,
  getSuperiorityMatrix
} from '@/data/mockData';
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

/**
 * @fileOverview Brand Health page featuring the Industry Leaders Podium and Competitive Superiority Matrix.
 * Rankings are synchronized across both visual modules based on Average Superiority Delta.
 */
export default function BrandHealthPage() {
  const [isClient, setIsClient] = useState(false);
  const rankedSkus = getRankedIndustrySkus();
  const matrixData = getSuperiorityMatrix();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  // Podium data: Rank 2, Rank 1, Rank 3 from the global ranking
  const podium = [rankedSkus[1], rankedSkus[0], rankedSkus[2]];
  const secondaryLeaders = rankedSkus.slice(3, 7);

  // Identify top P&G product for the recommendation subtitle
  const topPgProduct = rankedSkus.find(s => s.isPNG);

  // Ensure Matrix table ranking matches the Podium (Average Delta)
  const rankedMatrix = [...matrixData].sort((a, b) => {
    const avgA = a.deltas.reduce((acc, d) => acc + d.delta, 0) / a.deltas.length;
    const avgB = b.deltas.reduce((acc, d) => acc + d.delta, 0) / b.deltas.length;
    return avgB - avgA;
  });

  return (
    <div className="space-y-24 animate-in fade-in duration-500 pb-32">
      {/* Centered Header with Metric Definition */}
      <div className="text-center space-y-6 max-w-4xl mx-auto pt-16">
        <div className="space-y-3">
          <h1 className="text-6xl font-extrabold text-slate-900 tracking-normal leading-tight">Hero SKU Podium</h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-slate-200" />
            <span className="text-xs font-semibold text-slate-500 tracking-normal italic">
              Ranked by the percentage of reviews with positive consumer sentiment
            </span>
            <div className="h-px w-12 bg-slate-200" />
          </div>
        </div>
        <p className="text-xl text-slate-500 font-medium leading-relaxed tracking-normal max-w-3xl mx-auto">
          {topPgProduct?.name} is our top P&G product based on sentiments in this platform, you can prioritize creating promo for it!
        </p>
      </div>

      <div className="max-w-6xl mx-auto w-full space-y-32 px-8">
        {/* Visual Podium Section */}
        <div className="flex items-end justify-center pt-24 h-[400px] relative max-w-5xl mx-auto">
          {podium.map((sku, index) => (
            <div key={sku.name} className={cn(
              "flex flex-col items-center flex-1 relative group transition-all duration-500",
              index === 1 ? "z-10" : "z-0"
            )}>
              {/* Labeling above the column */}
              <div className="absolute -top-32 flex flex-col items-center gap-1 w-full">
                <span className={cn(
                  "font-black tabular-nums tracking-normal transition-all leading-none",
                  index === 1 
                    ? sku.isPNG ? "text-7xl text-[#003da5]" : "text-7xl text-slate-600"
                    : "text-4xl text-slate-400"
                )}>
                  {Math.round(sku.ratio * 100)}%
                </span>
                <span className={cn(
                  "font-bold text-center px-4 transition-colors tracking-normal leading-tight",
                  index === 1 ? "text-3xl text-slate-900" : "text-xl text-slate-500"
                )}>
                  {sku.name}
                </span>
              </div>

              {/* Podium Column Block */}
              <div className={cn(
                "w-full rounded-t-[3rem] flex flex-col items-center justify-start pt-12 pb-8 transition-all duration-700",
                index === 0 ? "h-48 bg-slate-200" : // Rank 2
                index === 1 
                  ? sku.isPNG 
                    ? "h-80 bg-[#003da5] shadow-2xl shadow-blue-900/20" 
                    : "h-80 bg-slate-400 shadow-2xl shadow-slate-900/20" // Rank 1
                  : "h-36 bg-slate-100" // Rank 3
              )}>
                <span className={cn(
                  "text-7xl font-black tabular-nums tracking-normal",
                  index === 1 ? "text-white" : "text-slate-400"
                )}>
                  {index === 0 ? '2' : index === 1 ? '1' : '3'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Secondary Leaderboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {secondaryLeaders.map((sku, i) => (
            <div key={sku.name} className="flex items-center justify-between p-8 bg-slate-100/50 hover:bg-white hover:shadow-xl hover:border-slate-200 rounded-[2.5rem] transition-all border border-transparent group">
              <div className="flex items-center gap-8">
                <span className="text-4xl font-black text-slate-200 tabular-nums w-12 tracking-normal">0{i + 4}</span>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-slate-900 tracking-normal group-hover:text-[#003da5] transition-colors">{sku.name}</span>
                    <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest text-slate-400 border-slate-200 py-0 h-4">
                      {sku.producer}
                    </Badge>
                  </div>
                  <span className={cn(
                    "text-lg font-black tabular-nums tracking-normal",
                    sku.isPNG ? "text-[#003da5]" : "text-slate-500"
                  )}>
                    {Math.round(sku.ratio * 100)}%
                  </span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm">
                {i % 2 === 0 ? <ChevronUp className="h-6 w-6 text-emerald-500" /> : <ChevronDown className="h-6 w-6 text-red-400" />}
              </div>
            </div>
          ))}
        </div>

        {/* COMPETITIVE SUPERIORITY MATRIX TABLE */}
        <div className="space-y-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900 tracking-normal">Competitive Superiority Matrix</h2>
            <p className="text-slate-400 font-bold text-sm">Performance margins versus category baseline average (Ranked by Market Strength)</p>
          </div>

          <div className="w-full overflow-hidden">
            <table className="w-full border-separate border-spacing-y-4">
              <thead>
                <tr>
                  <th className="text-left px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-[25%]">Product SKU</th>
                  <th className="text-center px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Product</th>
                  <th className="text-center px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Packaging</th>
                  <th className="text-center px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Value</th>
                  <th className="text-center px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Communication</th>
                  <th className="text-center px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Retail Execution</th>
                </tr>
              </thead>
              <tbody>
                {rankedMatrix.map((item) => (
                  <tr key={item.brand} className="group">
                    <td className="py-2">
                      <div className="flex flex-col gap-0.5">
                        <span className={cn(
                          "text-sm font-bold tracking-normal leading-tight transition-colors",
                          item.isPNG ? "text-slate-900 group-hover:text-[#003da5]" : "text-slate-600"
                        )}>{item.brand}</span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-normal">{item.producer}</span>
                      </div>
                    </td>
                    {item.deltas.map((d, idx) => (
                      <td key={idx} className="px-2">
                        <div className={cn(
                          "h-12 flex items-center justify-center rounded-xl font-black text-xs tabular-nums transition-all border border-transparent group-hover:border-opacity-10",
                          d.delta > 0 ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                          d.delta < 0 ? "bg-red-50 text-red-600 border-red-100" :
                          "bg-slate-50 text-slate-400"
                        )}>
                          {d.delta > 0 ? `+${d.delta}%` : d.delta === 0 ? '0%' : `${d.delta}%`}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

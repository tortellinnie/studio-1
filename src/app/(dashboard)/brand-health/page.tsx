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
 * Optimized for high-density enterprise reporting.
 */
export default function BrandHealthPage() {
  const [isClient, setIsClient] = useState(false);
  const rankedSkus = getRankedIndustrySkus();
  const matrixData = getSuperiorityMatrix();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  // Podium data: Rank 2, Rank 1, Rank 3
  const podium = [rankedSkus[1], rankedSkus[0], rankedSkus[2]];
  const secondaryLeaders = rankedSkus.slice(3, 7);

  // Identify top P&G product
  const topPgProduct = rankedSkus.find(s => s.isPNG);

  // Matrix table ranking
  const rankedMatrix = [...matrixData].sort((a, b) => {
    const avgA = a.deltas.reduce((acc, d) => acc + d.delta, 0) / a.deltas.length;
    const avgB = b.deltas.reduce((acc, d) => acc + d.delta, 0) / b.deltas.length;
    return avgB - avgA;
  });

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      {/* Centered Header */}
      <div className="text-center space-y-4 max-w-4xl mx-auto pt-12 px-8">
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">Hero SKU Podium</h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-slate-200" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">
              Percentage of reviews with positive consumer sentiment
            </span>
            <div className="h-px w-12 bg-slate-200" />
          </div>
        </div>
        <p className="text-lg text-slate-500 font-bold leading-relaxed tracking-normal max-w-3xl mx-auto">
          {topPgProduct?.name} is our top P&G product. Prioritize expansion strategies for this SKU.
        </p>
      </div>

      <div className="w-full space-y-12 px-8 lg:px-12">
        {/* Visual Podium Section */}
        <div className="flex items-end justify-center pt-8 h-[320px] relative w-full mx-auto">
          {podium.map((sku, index) => (
            <div key={sku.name} className={cn(
              "flex flex-col items-center flex-1 relative group transition-all duration-500",
              index === 1 ? "z-10" : "z-0"
            )}>
              {/* Labeling above the column */}
              <div className="absolute -top-24 flex flex-col items-center gap-1 w-full">
                <span className={cn(
                  "font-black tabular-nums tracking-tighter transition-all leading-none",
                  index === 1 
                    ? sku.isPNG ? "text-6xl text-[#003da5]" : "text-6xl text-slate-600"
                    : "text-3xl text-slate-400"
                )}>
                  {Math.round(sku.ratio * 100)}%
                </span>
                <span className={cn(
                  "font-black text-center px-4 transition-colors tracking-tight leading-tight",
                  index === 1 ? "text-2xl text-slate-900" : "text-lg text-slate-500"
                )}>
                  {sku.name}
                </span>
              </div>

              {/* Podium Column Block */}
              <div className={cn(
                "w-full rounded-t-[2.5rem] flex flex-col items-center justify-start pt-10 pb-8 transition-all duration-700",
                index === 0 ? "h-40 bg-slate-200" : // Rank 2
                index === 1 
                  ? sku.isPNG 
                    ? "h-64 bg-[#003da5] shadow-xl shadow-blue-900/10" 
                    : "h-64 bg-slate-400 shadow-xl shadow-slate-900/10" // Rank 1
                  : "h-28 bg-slate-100" // Rank 3
              )}>
                <span className={cn(
                  "text-6xl font-black tabular-nums tracking-normal",
                  index === 1 ? "text-white" : "text-slate-400"
                )}>
                  {index === 0 ? '2' : index === 1 ? '1' : '3'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Secondary Leaderboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mx-auto">
          {secondaryLeaders.map((sku, i) => (
            <div key={sku.name} className="flex items-center justify-between p-6 bg-slate-50/50 hover:bg-white hover:shadow-lg hover:border-slate-200 rounded-[2rem] transition-all border border-transparent group">
              <div className="flex items-center gap-6">
                <span className="text-5xl font-black text-slate-200 tabular-nums w-16 tracking-tight">0{i + 4}</span>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-black text-slate-900 tracking-tight group-hover:text-[#003da5] transition-colors">{sku.name}</span>
                    <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest text-slate-400 border-slate-200 py-0 h-3.5 px-1.5">
                      {sku.producer}
                    </Badge>
                  </div>
                  <span className={cn(
                    "text-xl font-black tabular-nums tracking-tight",
                    sku.isPNG ? "text-[#003da5]" : "text-slate-500"
                  )}>
                    {Math.round(sku.ratio * 100)}%
                  </span>
                </div>
              </div>
              <div className="h-10 w-10 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm shrink-0">
                {i % 2 === 0 ? <ChevronUp className="h-5 w-5 text-emerald-500" /> : <ChevronDown className="h-5 w-5 text-red-400" />}
              </div>
            </div>
          ))}
        </div>

        {/* COMPETITIVE SUPERIORITY MATRIX TABLE */}
        <div className="space-y-8 pt-8 w-full">
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Competitive Superiority Matrix</h2>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Performance margins vs category baseline average (N={rankedMatrix.length} Products)</p>
          </div>

          <div className="w-full overflow-hidden">
            <table className="w-full border-separate border-spacing-y-3">
              <thead>
                <tr>
                  <th className="text-left px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] w-[20%]">Product SKU</th>
                  <th className="text-center px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Product</th>
                  <th className="text-center px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Packaging</th>
                  <th className="text-center px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Value</th>
                  <th className="text-center px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Communication</th>
                  <th className="text-center px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Retail Execution</th>
                </tr>
              </thead>
              <tbody>
                {rankedMatrix.map((item) => (
                  <tr key={item.brand} className="group">
                    <td className="py-1 pr-4">
                      <div className="flex flex-col gap-0">
                        <span className={cn(
                          "text-sm font-black tracking-tight leading-none transition-colors",
                          item.isPNG ? "text-slate-900 group-hover:text-[#003da5]" : "text-slate-600"
                        )}>{item.brand}</span>
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-1">{item.producer}</span>
                      </div>
                    </td>
                    {item.deltas.map((d, idx) => (
                      <td key={idx} className="px-1.5">
                        <div className={cn(
                          "h-11 flex items-center justify-center rounded-xl font-black text-[11px] tabular-nums transition-all border border-transparent group-hover:border-opacity-20",
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

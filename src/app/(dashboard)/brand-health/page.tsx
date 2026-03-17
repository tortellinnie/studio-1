
"use client";

import { useState, useEffect } from "react";
import { 
  ChevronUp, 
  ChevronDown
} from "lucide-react";
import { 
  getRankedHeroSkus,
  getSuperiorityMatrix
} from '@/data/mockData';
import { cn } from "@/lib/utils";

/**
 * @fileOverview Brand Health page featuring the Hero SKU Podium and Competitive Superiority Matrix.
 * Ranks P&G products and competitors by sentiment metrics and superiority margins.
 */
export default function BrandHealthPage() {
  const [isClient, setIsClient] = useState(false);
  const heroSkusRaw = getRankedHeroSkus();
  const matrixData = getSuperiorityMatrix();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  // REARRANGE LOGIC: Rank P&G SKUs by Superiority (Average Delta) instead of just raw Ratio
  const pgMatrixItems = matrixData
    .filter(m => m.isPNG)
    .map(m => ({
      name: m.brand, // This is the SKU name in Matrix data
      avgDelta: m.deltas.reduce((acc, d) => acc + d.delta, 0) / m.deltas.length
    }))
    .sort((a, b) => b.avgDelta - a.avgDelta);

  // Map back to heroSkus to get the 'ratio' and other display data for the UI
  const sortedHeroSkus = pgMatrixItems.map(mItem => 
    heroSkusRaw.find(h => h.name === mItem.name)
  ).filter(Boolean) as any[];

  // Podium data: Rank 2, Rank 1, Rank 3
  const podium = [sortedHeroSkus[1], sortedHeroSkus[0], sortedHeroSkus[2]];
  const secondaryLeaders = sortedHeroSkus.slice(3, 7);

  // Rank Matrix for the table by Market Strength (Average Delta)
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
          Downy Antibac is our top P&G product based on sentiments in this platform, you can prioritize creating promo for it!
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
              <div className="absolute -top-24 flex flex-col items-center gap-1 w-full">
                <span className={cn(
                  "font-black tabular-nums tracking-normal transition-all leading-none",
                  index === 1 ? "text-7xl text-[#003da5]" : "text-4xl text-slate-400"
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
                index === 1 ? "h-80 bg-[#003da5] shadow-2xl shadow-blue-900/20" : // Rank 1
                "h-36 bg-slate-100" // Rank 3
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
                  <span className="text-xl font-bold text-slate-900 tracking-normal group-hover:text-[#003da5] transition-colors">{sku.name}</span>
                  <span className="text-lg font-black text-[#003da5] tabular-nums tracking-normal">
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
            <p className="text-slate-400 font-bold text-sm">Performance margins versus category baseline average</p>
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
                        <span className="text-sm font-bold text-slate-900 tracking-normal leading-tight group-hover:text-[#003da5] transition-colors">{item.brand}</span>
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

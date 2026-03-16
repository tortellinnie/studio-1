
"use client";

import { useState, useEffect } from "react";
import { 
  ChevronUp, 
  ChevronDown
} from "lucide-react";
import { 
  getRankedHeroSkus
} from '@/data/mockData';
import { cn } from "@/lib/utils";

export default function BrandHealthPage() {
  const [isClient, setIsClient] = useState(false);
  const heroSkus = getRankedHeroSkus();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  // Leaderboard data
  const podium = [heroSkus[1], heroSkus[0], heroSkus[2]]; // Rank 2, 1, 3
  const secondaryLeaders = heroSkus.slice(3, 7); // Ranks 4, 5, 6, 7

  return (
    <div className="space-y-16 animate-in fade-in duration-500 pb-20">
      {/* Centered Header */}
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <h1 className="text-6xl font-extrabold text-slate-900 tracking-normal leading-tight">Hero SKU Podium</h1>
        <p className="text-xl text-slate-500 font-medium leading-relaxed tracking-normal max-w-3xl mx-auto">
          Downy Antibac is our top P&G product based on sentiments in this platform, you can prioritize creating promo for it!
        </p>
      </div>

      <div className="max-w-6xl mx-auto w-full space-y-24">
        {/* Visual Podium Section - No outer card */}
        <div className="flex items-end justify-center px-4 pt-40 h-[500px] relative max-w-5xl mx-auto">
          {podium.map((sku, index) => (
            <div key={sku.name} className={cn(
              "flex flex-col items-center flex-1 relative group transition-all duration-500",
              index === 1 ? "z-10" : "z-0"
            )}>
              {/* Labeling above the column - Clinical Spacing */}
              <div className="absolute -top-32 flex flex-col items-center gap-1 w-full">
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

        {/* Expanded Secondary Leaderboard Grid - Matching Photo Standard */}
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
      </div>
    </div>
  );
}

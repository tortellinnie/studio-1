
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
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      {/* Centered Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-5xl font-extrabold text-slate-900 tracking-normal leading-tight">Hero SKU Podium</h1>
        <p className="text-lg text-slate-500 font-medium leading-relaxed tracking-normal">
          Strategic promo prioritization based on positive sentiment performance. Top performing P&G products computed from real-time NLP inference.
        </p>
      </div>

      <div className="max-w-5xl mx-auto w-full">
        <div className="bg-white border border-slate-200 rounded-[3rem] p-12 shadow-sm space-y-20">
          
          {/* Visual Podium Section */}
          <div className="flex items-end justify-center px-4 pt-32 h-96 relative max-w-4xl mx-auto">
            {podium.map((sku, index) => (
              <div key={sku.name} className={cn(
                "flex flex-col items-center flex-1 relative group transition-all duration-500",
                index === 1 ? "z-10" : "z-0"
              )}>
                {/* Labeling above the column */}
                <div className="absolute -top-32 flex flex-col items-center gap-4 w-full">
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="flex items-center gap-2 bg-slate-900 text-white shadow-xl px-4 py-1.5 rounded-full text-[12px] font-bold tracking-normal">
                      <span className="tabular-nums">{Math.round(sku.ratio * 100)}%</span>
                    </div>
                  </div>
                  <span className={cn(
                    "font-bold text-center px-4 transition-colors tracking-normal leading-tight",
                    index === 1 ? "text-2xl text-slate-900" : "text-base text-slate-500"
                  )}>
                    {sku.name}
                  </span>
                </div>

                {/* Podium Column Block */}
                <div className={cn(
                  "w-full rounded-t-[2.5rem] flex flex-col items-center justify-start pt-10 pb-8 transition-all duration-700",
                  index === 0 ? "h-40 bg-slate-200" : // Rank 2
                  index === 1 ? "h-64 bg-[#003da5] shadow-lg shadow-blue-900/20" : // Rank 1
                  "h-32 bg-slate-100" // Rank 3
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

          {/* Expanded Secondary Leaderboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {secondaryLeaders.map((sku, i) => (
              <div key={sku.name} className="flex items-center justify-between p-6 bg-slate-50 hover:bg-white hover:shadow-md hover:border-slate-200 rounded-[2rem] transition-all border border-transparent group">
                <div className="flex items-center gap-6">
                  <span className="text-xl font-black text-slate-300 tabular-nums w-8 tracking-normal">0{i + 4}</span>
                  <div className="flex flex-col">
                    <span className="text-base font-bold text-slate-900 tracking-normal group-hover:text-[#003da5] transition-colors">{sku.name}</span>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        {sku.brand}
                      </span>
                      <span className="text-[12px] font-bold text-[#003da5] tabular-nums tracking-normal">
                        {Math.round(sku.ratio * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="h-10 w-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                  {i % 2 === 0 ? <ChevronUp className="h-5 w-5 text-emerald-500" /> : <ChevronDown className="h-5 w-5 text-red-400" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

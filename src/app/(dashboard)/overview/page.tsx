"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { getStatsForPeriod, getDynamicVectorScores } from "@/data/mockData";

/**
 * @fileOverview Strategic Overview page. 
 * Implements a high-utility, large-text enterprise reporting format.
 * Matches the reference image for 'Status Insights' and 'Actionable Intelligence'.
 */
export default function OverviewPage() {
  const [isClient, setIsClient] = useState(false);
  const [activePeriod, setActivePeriod] = useState(90);
  const [expandedPriorities, setExpandedPriorities] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setIsClient(true);
  }, []);

  const togglePriority = (id: string) => {
    setExpandedPriorities(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (!isClient) return null;

  // Derive dynamic stats based on the selected period
  const stats = getStatsForPeriod(activePeriod);
  const vectorScores = getDynamicVectorScores(activePeriod);

  // Map vector scores to the list layout
  const performanceDrivers = vectorScores.map(v => ({
    label: v.vector,
    value: v.pgScore,
    mentions: v.pgCount.toLocaleString(),
    status: v.pgScore >= 90 ? "STRENGTH" : v.pgScore < 85 ? "RISK" : null,
    color: v.pgScore >= 90 ? "bg-emerald-500" : v.pgScore < 85 ? "bg-orange-500" : "bg-slate-200"
  })).sort((a, b) => b.value - a.value);

  // Identify top and bottom performers for dynamic insights
  const topDriver = performanceDrivers[0];
  const bottomDriver = performanceDrivers[performanceDrivers.length - 1];

  const getPulseInsight = (score: number) => {
    if (score >= 85) return "Maintaining dominant market lead. Prioritize high-margin SKU cross-selling over aggressive acquisition.";
    if (score >= 75) return "Steady performance. Monitor local brand growth in sub-tier regions.";
    return "Market pressure detected. Audit value-packs and promotional frequency immediately.";
  };

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-[calc(100vh-4rem)] bg-white animate-in fade-in duration-700">
      
      {/* 1. BRAND HEALTH STATUS (BLUE COLUMN) */}
      <div className="w-full lg:w-[25%] bg-[#003da5] p-12 text-white flex flex-col justify-between border-r border-white/5">
        <div className="space-y-16">
          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Brand Health Status</span>
            <div className="flex gap-3">
              {[7, 30, 90].map((p) => (
                <button 
                  key={p}
                  onClick={() => setActivePeriod(p)}
                  className={cn(
                    "text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg transition-all border border-transparent",
                    activePeriod === p ? "bg-white text-[#003da5]" : "bg-white/10 opacity-60 hover:opacity-100 hover:border-white/20"
                  )}
                >
                  {p}D
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6 pt-12">
            <h2 className="text-[6rem] font-black leading-[0.8] tracking-tighter tabular-nums">{stats.posPct}%</h2>
            <div className="space-y-3">
              <p className="text-2xl font-black uppercase tracking-[0.15em] text-white">
                {stats.posPct >= 85 ? "Strategic Strength" : stats.posPct >= 75 ? "Stable Growth" : "Market Pressure"}
              </p>
              <p className="text-sm font-bold opacity-50 tracking-wider">0.0pp variance vs prior period</p>
            </div>
          </div>
        </div>

        <div className="space-y-10 mt-auto pt-24 border-t border-white/10">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Competitive Benchmark</span>
          <div className="space-y-8">
            {[
              { label: "P&G Portfolio", value: stats.posPct, color: "bg-white" },
              { label: "Unilever", value: 72, color: "bg-white/30" },
              { label: "Local brands", value: 62, color: "bg-white/30" }
            ].map((item) => (
              <div key={item.label} className="space-y-3">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.1em]">
                  <span>{item.label}</span>
                  <span className="tabular-nums">{item.value}%</span>
                </div>
                <Progress value={item.value} className="h-2 bg-white/10" indicatorClassName={item.color} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. PERFORMANCE DRIVERS (CENTER COLUMN) */}
      <div className="w-full lg:w-[40%] p-16 border-r border-slate-100 flex flex-col bg-white">
        <div className="space-y-16 flex-1">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Performance Drivers</span>
          
          <div className="space-y-14">
            {performanceDrivers.map((item) => (
              <div key={item.label} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-black text-slate-900 tracking-normal">{item.label}</span>
                    {item.status && (
                      <Badge variant="ghost" className={cn(
                        "text-[10px] font-black px-3 py-1 rounded-lg",
                        item.status === "STRENGTH" ? "text-emerald-600 bg-emerald-50" : "text-orange-600 bg-orange-50"
                      )}>
                        {item.status}
                      </Badge>
                    )}
                  </div>
                  <span className={cn(
                    "text-xl font-black tabular-nums tracking-normal",
                    item.status === "STRENGTH" ? "text-emerald-600" : item.status === "RISK" ? "text-orange-600" : "text-slate-400"
                  )}>
                    {item.value}%
                  </span>
                </div>
                <Progress value={item.value} className="h-3 bg-slate-100" indicatorClassName={item.color} />
                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">Inference Sample: N={item.mentions}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. STRATEGIC PRIORITIES (RIGHT COLUMN) */}
      <div className="w-full lg:w-[35%] p-10 bg-white overflow-y-auto">
        <div className="space-y-10">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Actionable Intelligence</span>
          
          {/* REFINED STATUS INSIGHTS CARD */}
          <div className="p-8 border border-slate-200 rounded-[2.5rem] shadow-sm space-y-6">
            <div className="space-y-3">
              <div className="text-[#003da5]">
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Status Insights</span>
              </div>
              <p className="text-3xl font-black text-slate-900 leading-[1.15] tracking-normal">
                {getPulseInsight(stats.posPct)}
              </p>
            </div>

            <div className="space-y-6 pt-2">
              <div className="flex items-start gap-4">
                <div className="w-1.5 h-10 bg-emerald-500 rounded-full shrink-0" />
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.15em] leading-none">Core Strength:</span>
                  <span className="text-sm font-bold text-slate-500 tracking-normal leading-tight">Amplify {topDriver.label} in A+ Content.</span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-1.5 h-10 bg-orange-500 rounded-full shrink-0" />
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-orange-600 uppercase tracking-[0.15em] leading-none">Primary Gap:</span>
                  <span className="text-sm font-bold text-slate-500 tracking-normal leading-tight">Calibrate expectations for {bottomDriver.label}.</span>
                </div>
              </div>
            </div>
          </div>

          {/* PRIORITY LIST */}
          <div className="space-y-8 pt-4">
            {/* Priority 01 */}
            <div className="space-y-3">
              <div className="flex items-center gap-6">
                <span className="text-3xl font-black text-slate-200 tabular-nums tracking-normal">01</span>
                <Badge className="bg-orange-50 text-orange-700 border-none font-black text-[9px] uppercase tracking-[0.2em] px-3 py-1">High Priority</Badge>
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-black text-slate-900 tracking-normal">Product Claim Recalibration</h4>
                <p className={cn("text-base font-bold text-slate-400 tracking-normal leading-relaxed", expandedPriorities["01"] ? "block" : "line-clamp-1")}>
                  Over {Math.round(stats.total * 0.02).toLocaleString()} reviews explicitly flag scent intensity gaps in recent batches. Audit active Lazada A+ imagery to better align consumer expectations.
                </p>
                <button 
                  onClick={() => togglePriority("01")} 
                  className="text-[10px] font-black text-[#003da5] uppercase tracking-widest hover:opacity-70 transition-all"
                >
                  {expandedPriorities["01"] ? "Collapse Analysis" : "View Full Analysis"}
                </button>
              </div>
            </div>

            {/* Priority 02 */}
            <div className="space-y-3">
              <div className="flex items-center gap-6">
                <span className="text-3xl font-black text-slate-200 tabular-nums tracking-normal">02</span>
                <Badge className="bg-blue-50 text-[#003da5] border-none font-black text-[9px] uppercase tracking-[0.2em] px-3 py-1">Sustain Lead</Badge>
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-black text-slate-900 tracking-normal">Amplify Fragrance Superiority</h4>
                <p className={cn("text-base font-bold text-slate-400 tracking-normal leading-relaxed", expandedPriorities["02"] ? "block" : "line-clamp-1")}>
                  Market data confirms {Math.round(stats.total * 0.3).toLocaleString()} mentions cite scent as the primary lead loyalty trigger. This is our highest retention signal; maintain creative focus here.
                </p>
                <button 
                  onClick={() => togglePriority("02")} 
                  className="text-[10px] font-black text-[#003da5] uppercase tracking-widest hover:opacity-70 transition-all"
                >
                  {expandedPriorities["02"] ? "Collapse Analysis" : "View Full Analysis"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

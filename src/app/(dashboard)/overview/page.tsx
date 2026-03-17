"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { getStatsForPeriod, getDynamicVectorScores } from "@/data/mockData";

/**
 * @fileOverview Strategic Overview page. 
 * Implements a high-utility, large-text enterprise reporting format.
 * Includes the specific 'Portfolio Pulse' card with clinical strength/gap indicators.
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
            <span className="text-xs font-black uppercase tracking-[0.2em] opacity-60">Brand Health Status</span>
            <div className="flex gap-3">
              {[7, 30, 90].map((p) => (
                <button 
                  key={p}
                  onClick={() => setActivePeriod(p)}
                  className={cn(
                    "text-xs font-black uppercase tracking-widest px-4 py-2 rounded-lg transition-all",
                    activePeriod === p ? "bg-white text-[#003da5]" : "bg-white/10 opacity-60 hover:opacity-100"
                  )}
                >
                  {p}D
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6 pt-12">
            <h2 className="text-[8rem] font-black leading-[0.8] tracking-tighter tabular-nums">{stats.posPct}%</h2>
            <div className="space-y-3">
              <p className="text-2xl font-black uppercase tracking-[0.15em] text-white">
                {stats.posPct >= 85 ? "Strategic Strength" : stats.posPct >= 75 ? "Stable Growth" : "Market Pressure"}
              </p>
              <p className="text-sm font-bold opacity-50 tracking-wider">0.0pp variance vs prior period</p>
            </div>
          </div>
        </div>

        <div className="space-y-10 mt-auto pt-24 border-t border-white/10">
          <span className="text-xs font-black uppercase tracking-[0.2em] opacity-60">Competitive Benchmark</span>
          <div className="space-y-8">
            {[
              { label: "P&G Portfolio", value: stats.posPct, color: "bg-white" },
              { label: "Unilever", value: 72, color: "bg-white/30" },
              { label: "Local brands", value: 62, color: "bg-white/30" }
            ].map((item) => (
              <div key={item.label} className="space-y-3">
                <div className="flex justify-between text-xs font-black uppercase tracking-[0.1em]">
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
          <span className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Performance Drivers</span>
          
          <div className="space-y-14">
            {performanceDrivers.map((item) => (
              <div key={item.label} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-black text-slate-900 tracking-tight">{item.label}</span>
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
                    "text-xl font-black tabular-nums",
                    item.status === "STRENGTH" ? "text-emerald-600" : item.status === "RISK" ? "text-orange-600" : "text-slate-400"
                  )}>
                    {item.value}%
                  </span>
                </div>
                <Progress value={item.value} className="h-3 bg-slate-50" indicatorClassName={item.color} />
                <p className="text-xs font-bold text-slate-300 uppercase tracking-widest italic">Inference Sample: N={item.mentions}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. STRATEGIC PRIORITIES (RIGHT COLUMN) */}
      <div className="w-full lg:w-[35%] p-16 bg-slate-50/25 overflow-y-auto">
        <div className="space-y-16">
          <span className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Actionable Intelligence</span>
          
          {/* HIGH-FIDELITY PORTFOLIO PULSE CARD */}
          <div className="p-10 bg-white border border-slate-200 rounded-[2rem] shadow-sm space-y-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#003da5]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                </svg>
                <span className="text-xs font-black uppercase tracking-[0.2em]">Portfolio Pulse</span>
              </div>
              <p className="text-2xl font-black text-slate-900 leading-tight">
                {getPulseInsight(stats.posPct)}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-emerald-600 uppercase tracking-widest leading-none">Core Strength:</span>
                  <span className="text-sm font-bold text-slate-500 tracking-tight leading-none">Amplify {topDriver.label} in A+ Content.</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-orange-500 rounded-full" />
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-orange-600 uppercase tracking-widest leading-none">Primary Gap:</span>
                  <span className="text-sm font-bold text-slate-500 tracking-tight leading-none">Calibrate expectations for {bottomDriver.label}.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            {/* Priority 01 */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-2xl font-black text-slate-200 tabular-nums">01</span>
                <Badge className="bg-orange-100 text-orange-700 border-none font-black text-[10px] uppercase tracking-[0.2em] px-3">High Priority</Badge>
              </div>
              <div className="space-y-3">
                <h4 className="text-xl font-black text-slate-900 tracking-tight">Product Claim Recalibration</h4>
                <p className={cn("text-base font-medium text-slate-500 leading-relaxed", expandedPriorities["01"] ? "block" : "line-clamp-1")}>
                  Over {Math.round(stats.total * 0.02).toLocaleString()} reviews explicitly flag scent intensity gaps in recent batches. Audit active Lazada A+ imagery to better align consumer expectations.
                </p>
                <button onClick={() => togglePriority("01")} className="text-[10px] font-black text-[#003da5] uppercase tracking-widest flex items-center gap-2 hover:opacity-70 transition-all">
                  {expandedPriorities["01"] ? "Collapse report" : "View full analysis"}
                </button>
              </div>
            </div>

            {/* Priority 02 */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-2xl font-black text-slate-200 tabular-nums">02</span>
                <Badge className="bg-blue-100 text-[#003da5] border-none font-black text-[10px] uppercase tracking-[0.2em] px-3">Sustain Lead</Badge>
              </div>
              <div className="space-y-3">
                <h4 className="text-xl font-black text-slate-900 tracking-tight">Amplify Fragrance Superiority</h4>
                <p className={cn("text-base font-medium text-slate-500 leading-relaxed", expandedPriorities["02"] ? "block" : "line-clamp-1")}>
                  Market data confirms {Math.round(stats.total * 0.3).toLocaleString()} mentions cite scent as the primary lead loyalty trigger. This is our highest retention signal; maintain creative focus here.
                </p>
                <button onClick={() => togglePriority("02")} className="text-[10px] font-black text-[#003da5] uppercase tracking-widest flex items-center gap-2 hover:opacity-70 transition-all">
                  {expandedPriorities["02"] ? "Collapse report" : "View full analysis"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

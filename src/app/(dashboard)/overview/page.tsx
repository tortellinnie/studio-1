"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { getStatsForPeriod, getDynamicVectorScores } from "@/data/mockData";

/**
 * @fileOverview Strategic Overview page matching the 3-column executive report format.
 * Relocates dynamic vector insights to the right sidebar and condenses the action plan.
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

  // Identify top and bottom performers for AI Insights
  const topDriver = performanceDrivers[0];
  const bottomDriver = performanceDrivers[performanceDrivers.length - 1];

  // Logic for Portfolio Pulse insight
  const getPulseInsight = (score: number) => {
    if (score >= 85) return "Maintaining dominant market lead. Prioritize high-margin SKU cross-selling over aggressive acquisition.";
    if (score >= 75) return "Steady performance. Monitor local brand growth in sub-tier regions.";
    return "Market pressure detected. Audit value-packs and promotional frequency immediately.";
  };

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-[calc(100vh-4rem)] bg-white animate-in fade-in duration-700">
      
      {/* 1. BRAND HEALTH STATUS (BLUE COLUMN) */}
      <div className="w-full lg:w-[25%] bg-[#003da5] p-10 text-white flex flex-col justify-between border-r border-white/5">
        <div className="space-y-12">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Brand Health Status</span>
            <div className="flex gap-2">
              {[7, 30, 90].map((p) => (
                <button 
                  key={p}
                  onClick={() => setActivePeriod(p)}
                  className={cn(ActivePeriodButtonStyles, activePeriod === p ? "bg-cyan-400 text-[#003da5]" : "bg-white/5 opacity-40 hover:opacity-100")}
                >
                  {p}D
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-8">
            <h2 className="text-[6rem] font-black leading-[0.8] tracking-tighter tabular-nums">{stats.posPct}%</h2>
            <div className="space-y-2">
              <p className="text-xl font-black uppercase tracking-widest text-cyan-400">
                {stats.posPct >= 85 ? "Strong" : stats.posPct >= 75 ? "Stable" : "Pressure"}
              </p>
              <p className="text-xs font-bold opacity-60">— 0.0pp vs prior period</p>
            </div>
          </div>
        </div>

        <div className="space-y-8 mt-auto pt-16">
          <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Competitive Benchmark</span>
          <div className="space-y-6">
            {[
              { label: "P&G Portfolio", value: stats.posPct, color: "bg-cyan-400" },
              { label: "Unilever", value: 72, color: "bg-white/20" },
              { label: "Local brands", value: 62, color: "bg-white/20" }
            ].map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                  <span>{item.label}</span>
                  <span className="tabular-nums">{item.value}%</span>
                </div>
                <Progress value={item.value} className="h-1.5 bg-white/10" indicatorClassName={item.color} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. PERFORMANCE DRIVERS (CENTER COLUMN) */}
      <div className="w-full lg:w-[40%] p-12 border-r border-slate-100 flex flex-col bg-white">
        <div className="space-y-10 flex-1">
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Performance Drivers</span>
          
          <div className="space-y-10">
            {performanceDrivers.map((item) => (
              <div key={item.label} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-base font-black text-slate-900">{item.label}</span>
                    {item.status && (
                      <Badge variant="ghost" className={cn(
                        "text-[10px] font-black px-2 py-0.5 rounded-md",
                        item.status === "STRENGTH" ? "text-emerald-500 bg-emerald-50" : "text-orange-500 bg-orange-50"
                      )}>
                        {item.status}
                      </Badge>
                    )}
                  </div>
                  <span className={cn("text-base font-black tabular-nums", item.status === "STRENGTH" ? "text-emerald-500" : item.status === "RISK" ? "text-orange-500" : "text-slate-400")}>
                    {item.value}%
                  </span>
                </div>
                <Progress value={item.value} className="h-2.5 bg-slate-100" indicatorClassName={item.color} />
                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">N={item.mentions} mentions</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. STRATEGIC PRIORITIES (RIGHT COLUMN) */}
      <div className="w-full lg:w-[35%] p-12 bg-slate-50/50 overflow-y-auto">
        <div className="space-y-12">
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Strategic Priorities</span>
          
          {/* Condensed Portfolio Insight */}
          <div className="p-6 bg-white border border-slate-200 rounded-[1.5rem] space-y-3">
            <div className="flex items-center gap-2 text-[#003da5]">
              <Sparkles className="h-4 w-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Portfolio Pulse</span>
            </div>
            <p className="text-sm font-bold text-slate-900 leading-snug">
              {getPulseInsight(stats.posPct)}
            </p>
          </div>

          <div className="space-y-10">
            {/* Priority 01 */}
            <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-500">
              <div className="flex items-center gap-4">
                <span className="text-lg font-black text-slate-300 tabular-nums">01</span>
                <Badge className="bg-orange-100 text-orange-600 border-none font-black text-[10px] uppercase tracking-widest">Near-Term</Badge>
              </div>
              <div className="space-y-2">
                <h4 className="text-base font-black text-slate-900 leading-tight">Product Claim Recalibration</h4>
                <p className={cn(PriorityTextStyles, expandedPriorities["01"] ? "block" : "line-clamp-1")}>
                  {Math.round(stats.total * 0.02).toLocaleString()} reviews flag scent intensity gaps. Audit active Lazada A+ content to align expectations.
                </p>
                <button onClick={() => togglePriority("01")} className={ToggleButtonStyles}>
                  {expandedPriorities["01"] ? "COLLAPSE" : "VIEW FULL ANALYSIS"}
                </button>
              </div>
            </div>

            {/* Priority 02 */}
            <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-500 delay-100">
              <div className="flex items-center gap-4">
                <span className="text-lg font-black text-slate-300 tabular-nums">02</span>
                <Badge className="bg-blue-100 text-[#003da5] border-none font-black text-[10px] uppercase tracking-widest">Sustain</Badge>
              </div>
              <div className="space-y-2">
                <h4 className="text-base font-black text-slate-900 leading-tight">Amplify Fragrance Superiority</h4>
                <p className={cn(PriorityTextStyles, expandedPriorities["02"] ? "block" : "line-clamp-1")}>
                  {Math.round(stats.total * 0.3).toLocaleString()} mentions cite scent as lead trigger. Highest loyalty signal; maintain creative focus here.
                </p>
                <button onClick={() => togglePriority("02")} className={ToggleButtonStyles}>
                  {expandedPriorities["02"] ? "COLLAPSE" : "VIEW FULL ANALYSIS"}
                </button>
              </div>
            </div>

            {/* Priority 03 */}
            <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-500 delay-200">
              <div className="flex items-center gap-4">
                <span className="text-lg font-black text-slate-300 tabular-nums">03</span>
                <Badge className="bg-slate-200 text-slate-600 border-none font-black text-[10px] uppercase tracking-widest">High Priority</Badge>
              </div>
              <div className="space-y-2">
                <h4 className="text-base font-black text-slate-900 leading-tight">Value Perception Intervention</h4>
                <p className={cn(PriorityTextStyles, expandedPriorities["03"] ? "block" : "line-clamp-1")}>
                  Offline price comparisons are increasing. Recommend platform-exclusive bundle pricing anchored on cost-per-wash narrative.
                </p>
                <button onClick={() => togglePriority("03")} className={ToggleButtonStyles}>
                  {expandedPriorities["03"] ? "COLLAPSE" : "VIEW FULL ANALYSIS"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ActivePeriodButtonStyles = "text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-md transition-all";
const PriorityTextStyles = "text-[13px] font-medium text-slate-500 leading-relaxed transition-all duration-300";
const ToggleButtonStyles = "text-[9px] font-black text-[#003da5] uppercase tracking-widest flex items-center gap-1.5 hover:opacity-70 transition-opacity mt-1";

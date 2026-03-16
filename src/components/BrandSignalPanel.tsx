"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import {
  dynamicVectorScores, competitiveBenchmark,
  vectorActionMap, vectorInsights, getStatsForPeriod,
} from "@/data/mockData";

const PERIODS = [
  { id: 7,  label: "7d"  },
  { id: 30, label: "30d" },
  { id: 90, label: "90d" },
];

// Dark background changes with health — the whole left panel reacts
function getGrade(p: number) {
  if (p >= 80) return { label: "STRONG",   dark: "#003da5", bar: "#00EFFF" };
  if (p >= 65) return { label: "MODERATE", dark: "#7c3500", bar: "#FFEB25" };
  return             { label: "AT RISK",  dark: "#4D0000", bar: "#FF8E00" };
}

const URGENCY = {
  Immediate:    { color: "#4D0000", label: "High Priority" },
  "Short-term": { color: "#FF8E00", label: "Near-Term"     },
  Monitor:      { color: "#003da5", label: "Sustain"       },
} as const;

const STAT: Record<string, { n: string; caption: string }> = {
  "Value":            { n: "35",    caption: "price-vs-offline complaints"  },
  "Retail Execution": { n: "31",    caption: "fulfilment errors"             },
  "Communication":    { n: "182",   caption: "scent over-promise reviews"   },
  "Packaging":        { n: "376",   caption: "leak & spillage reports"      },
  "Product":          { n: "2,922", caption: "fragrance mentions"           },
};

// ─── Left panel — bold status block ───────────────────────────────────────
function StatusPanel({ period, setPeriod }: {
  period: number;
  setPeriod: (p: number) => void;
}) {
  const stats     = getStatsForPeriod(period);
  const prevStats = getStatsForPeriod(period * 2);
  const delta     = stats.posPct - prevStats.posPct;
  const grade     = getGrade(stats.posPct);

  const pg  = competitiveBenchmark.find(b => b.brand === "P&G");
  const uni = competitiveBenchmark.find(b => b.brand === "Unilever");
  const loc = competitiveBenchmark.find(b => b.brand === "Local");

  const competitors = [
    { label: "P&G Portfolio", value: pg?.sentiment  ?? stats.posPct,      highlight: true  },
    { label: "Unilever",      value: uni?.sentiment ?? stats.posPct - 15, highlight: false },
    { label: "Local brands",  value: loc?.sentiment ?? stats.posPct - 25, highlight: false },
  ];

  return (
    <div
      className="lg:w-[36%] shrink-0 flex flex-col justify-between p-8 gap-10"
      style={{ backgroundColor: grade.dark }}
    >
      {/* Eyebrow + period pills */}
      <div className="flex items-start justify-between gap-4">
        <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.45)" }}>
          Brand Health Status
        </p>
        <div className="flex items-center gap-0.5">
          {PERIODS.map(p => (
            <button
              key={p.id}
              onClick={() => setPeriod(p.id)}
              className={cn(
                "px-2.5 py-1 text-[10px] font-black rounded transition-all",
                period === p.id
                  ? "text-slate-900"
                  : "text-white/40 hover:text-white/70"
              )}
              style={period === p.id ? { backgroundColor: grade.bar } : {}}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hero number */}
      <div>
        <p className="text-[80px] font-black leading-none tabular-nums text-white tracking-tight">
          {stats.posPct}%
        </p>
        <p className="text-sm font-black mt-2 tracking-[0.15em]" style={{ color: grade.bar }}>
          {grade.label}
        </p>
        <div className="flex items-center gap-2 mt-3">
          {delta > 0
            ? <TrendingUp className="w-3.5 h-3.5" style={{ color: grade.bar }} />
            : delta < 0
              ? <TrendingDown className="w-3.5 h-3.5 text-white/50" />
              : <Minus className="w-3.5 h-3.5 text-white/30" />}
          <span className="text-xs font-black" style={{ color: delta > 0 ? grade.bar : "rgba(255,255,255,0.5)" }}>
            {delta > 0 ? "+" : ""}{delta.toFixed(1)}pp vs prior period
          </span>
        </div>
      </div>

      {/* Competitive benchmark — white bars on dark */}
      <div className="space-y-3">
        <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>
          Competitive Benchmark
        </p>
        {competitors.map(b => (
          <div key={b.label} className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className={cn("text-xs font-bold", b.highlight ? "text-white" : "text-white/40")}>{b.label}</span>
              <span className={cn("text-xs font-black tabular-nums", b.highlight ? "text-white" : "text-white/40")}>{b.value}%</span>
            </div>
            <div className="h-1.5 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${b.value}%`,
                  backgroundColor: b.highlight ? grade.bar : "rgba(255,255,255,0.25)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Middle panel — horizontal bars ───────────────────────────────────────
function DriversPanel() {
  const sorted = [...dynamicVectorScores].sort((a, b) => b.healthScore - a.healthScore);
  const max    = sorted[0]?.healthScore ?? 100;
  const top    = sorted[0];
  const risk   = sorted[sorted.length - 1];

  return (
    <div className="flex-1 flex flex-col gap-6 p-8 border-r border-slate-100">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Performance Drivers</p>

      {/* Bar rows */}
      <div className="space-y-4">
        {sorted.map((v, i) => {
          const isTop  = i < 2;
          const isRisk = i >= 3;
          const color  = isTop ? "#10b981" : isRisk ? "#FF8E00" : "#cbd5e1";
          return (
            <div key={v.vector}>
              <div className="flex items-baseline justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-slate-700">{v.vector}</span>
                  {isTop  && <span className="text-[9px] font-black text-emerald-500 uppercase tracking-wide">Strength</span>}
                  {isRisk && <span className="text-[9px] font-black uppercase tracking-wide" style={{ color: "#FF8E00" }}>Risk</span>}
                </div>
                <span className="text-sm font-black tabular-nums" style={{ color }}>{v.healthScore}%</span>
              </div>
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${(v.healthScore / max) * 100}%`, backgroundColor: color }}
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">N={v.count.toLocaleString()} mentions</p>
            </div>
          );
        })}
      </div>

      {/* Two key insights — no inner boxes, just border-left accents */}
      <div className="space-y-4 pt-2 border-t border-slate-100">
        {top && vectorInsights[top.vector] && (
          <div className="pl-3 border-l-2 border-emerald-400">
            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">
              {top.vector}
            </p>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              {vectorInsights[top.vector].strength}
            </p>
          </div>
        )}
        {risk && vectorInsights[risk.vector] && (
          <div className="pl-3 border-l-2" style={{ borderColor: "#FF8E00" }}>
            <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: "#FF8E00" }}>
              {risk.vector}
            </p>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              {vectorInsights[risk.vector].risk}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Right panel — numbered priority list ─────────────────────────────────
function ActionsPanel() {
  const sorted = [...dynamicVectorScores].sort((a, b) => a.healthScore - b.healthScore);
  const actionVectors = [
    sorted[0]?.vector,
    sorted[1]?.vector,
    [...dynamicVectorScores].sort((a, b) => b.healthScore - a.healthScore)[0]?.vector,
  ].filter(Boolean) as string[];

  const actions = actionVectors
    .map(v => ({ ...vectorActionMap[v], vector: v }))
    .filter(a => a.title);

  return (
    <div className="flex-1 flex flex-col gap-6 p-8">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Strategic Priorities</p>

      <div className="space-y-0 divide-y divide-slate-100">
        {actions.map((action, i) => {
          const u    = URGENCY[action.urgency];
          const stat = STAT[action.vector];
          return (
            <div key={i} className="py-5 first:pt-0">
              {/* Rank + urgency label */}
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] font-black tabular-nums text-slate-200">
                  0{i + 1}
                </span>
                <span
                  className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded"
                  style={{ backgroundColor: `${u.color}18`, color: u.color }}
                >
                  {u.label}
                </span>
              </div>

              {/* Shock stat */}
              {stat && (
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-black tabular-nums leading-none" style={{ color: u.color }}>
                    {stat.n}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 leading-tight max-w-[100px]">
                    {stat.caption}
                  </span>
                </div>
              )}

              <p className="text-sm font-black text-slate-900 mb-1">{action.title}</p>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{action.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Root ──────────────────────────────────────────────────────────────────
export function BrandSignalPanel() {
  const [period, setPeriod] = useState(90);

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col lg:flex-row">
      <StatusPanel period={period} setPeriod={setPeriod} />
      <div className="flex flex-col lg:flex-row flex-1 bg-white divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
        <DriversPanel />
        <ActionsPanel />
      </div>
    </div>
  );
}

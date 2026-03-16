"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

// Wilson score lower bound (one-sided, 95% confidence).
// Penalises products with very few reviews even if all are positive,
// rewarding volume + quality over just a high positive rate.
export function wilsonLowerBound(positivePct: number, n: number): number {
  if (n === 0) return 0;
  const z = 1.645; // 95% one-sided
  const p = positivePct / 100;
  const denom = 1 + (z * z) / n;
  const centre = p + (z * z) / (2 * n);
  const adj = z * Math.sqrt((p * (1 - p)) / n + (z * z) / (4 * n * n));
  return Math.round(((centre - adj) / denom) * 1000) / 10; // one decimal
}

export interface RankedProduct {
  id: string;
  name: string;
  brand: string;
  sentimentScore: number;
  reviewCount: number;
  samplesAnalyzed: number;
  isPNG: boolean;
  correctedRating: number;
  rank: number;
  wilson: number;
  rawScore: number;
}

// ─── Visual config per rank ────────────────────────────────────────────────
const RANK_CONFIG = {
  1: { color: "#003da5", textOnColor: "#ffffff", svgSize: 160, radius: 62, sw: 12, baseH: "h-28", topOffset: "mt-0" },
  2: { color: "#00EFFF", textOnColor: "#0f172a", svgSize: 136, radius: 52, sw: 10, baseH: "h-14", topOffset: "mt-10" },
  3: { color: "#FF8E00", textOnColor: "#ffffff", svgSize: 118, radius: 44, sw: 9,  baseH: "h-6",  topOffset: "mt-24" },
} as const;

// ─── Arc helpers ───────────────────────────────────────────────────────────
function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arc(cx: number, cy: number, r: number, from: number, to: number): string {
  const s = polar(cx, cy, r, from);
  const e = polar(cx, cy, r, to);
  const large = to - from > 180 ? 1 : 0;
  return `M ${s.x.toFixed(2)} ${s.y.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${e.x.toFixed(2)} ${e.y.toFixed(2)}`;
}

// ─── Single circular gauge ─────────────────────────────────────────────────
// Arc fills to positive %, center shows positive %, wilson shown as secondary label
function ArcGauge({ positive, wilson, rank }: { positive: number; wilson: number; rank: 1 | 2 | 3 }) {
  const { svgSize: sz, radius: r, sw, color } = RANK_CONFIG[rank];
  const cx = sz / 2, cy = sz / 2;
  const START = 225, SWEEP = 270;
  const fillEnd = START + (positive / 100) * SWEEP;

  return (
    <svg width={sz} height={sz} viewBox={`0 0 ${sz} ${sz}`} style={{ overflow: "visible" }}>
      {/* Track */}
      <path d={arc(cx, cy, r, START, START + SWEEP)} fill="none" stroke="#e2e8f0" strokeWidth={sw} strokeLinecap="round" />
      {/* Fill — driven by positive % */}
      {positive > 0.5 && (
        <path
          d={arc(cx, cy, r, START, Math.min(fillEnd, START + SWEEP - 0.4))}
          fill="none"
          stroke={color}
          strokeWidth={sw}
          strokeLinecap="round"
        />
      )}
      {/* Positive % — primary number */}
      <text x={cx} y={cy - 9} textAnchor="middle" fill="#0f172a" fontSize={rank === 1 ? 22 : 19} fontWeight="800" fontFamily="Inter, system-ui, sans-serif">
        {positive.toFixed(1)}%
      </text>
      <text x={cx} y={cy + 8} textAnchor="middle" fill="#94a3b8" fontSize={8} fontWeight="700" fontFamily="Inter, system-ui, sans-serif" letterSpacing="0.05em">
        POSITIVE
      </text>
      {/* Wilson confidence — small secondary */}
      <text x={cx} y={cy + 20} textAnchor="middle" fill="#cbd5e1" fontSize={8} fontWeight="600" fontFamily="Inter, system-ui, sans-serif">
        {wilson.toFixed(1)}% conf.
      </text>
    </svg>
  );
}

// ─── Podium column ─────────────────────────────────────────────────────────
function PodiumColumn({ product, rank }: { product: RankedProduct; rank: 1 | 2 | 3 }) {
  const cfg = RANK_CONFIG[rank];
  return (
    <div className={cn("flex flex-col items-center", cfg.topOffset)}>
      {/* Gauge + rank badge */}
      <div className="relative">
        <ArcGauge positive={product.sentimentScore} wilson={product.wilson} rank={rank} />
        <div
          className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-xs font-black shadow-md"
          style={{ backgroundColor: cfg.color, color: cfg.textOnColor }}
        >
          {rank}
        </div>
      </div>

      {/* Info */}
      <div className="text-center mt-3" style={{ width: cfg.svgSize }}>
        <p className="text-sm font-black text-slate-900 leading-tight px-2 line-clamp-2">{product.name}</p>
        <p className="text-xs font-bold text-slate-400 mt-1">{product.brand}</p>
        <p className="text-[10px] text-slate-300 font-bold mt-2 uppercase tracking-wide">
          {product.reviewCount.toLocaleString()} platform reviews
        </p>
      </div>

      {/* Base block */}
      <div
        className={cn("mt-4 rounded-t-md flex items-center justify-center", cfg.baseH)}
        style={{ width: cfg.svgSize, backgroundColor: cfg.color }}
      >
        {rank === 1 && <Trophy className="w-5 h-5" style={{ color: cfg.textOnColor }} />}
      </div>
    </div>
  );
}

// ─── List row ──────────────────────────────────────────────────────────────
function ListRow({ product, maxWilson }: { product: RankedProduct; maxWilson: number }) {
  return (
    <div className="flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-slate-50 transition-colors group">
      <span className="text-base font-black text-slate-200 w-6 text-center tabular-nums shrink-0 group-hover:text-slate-300 transition-colors">
        {product.rank}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-slate-800 truncate">{product.name}</p>
        <p className="text-xs text-slate-400 font-medium">
          {product.brand} · {product.reviewCount.toLocaleString()} platform reviews
        </p>
      </div>
      <div className="text-right shrink-0 mr-3">
        <p className="text-sm font-black tabular-nums" style={{ color: "#FF8E00" }}>
          {product.wilson.toFixed(1)}%
        </p>
        <p className="text-[10px] text-slate-300 font-bold uppercase tracking-wide">wilson</p>
      </div>
      <div className="w-20 bg-slate-100 rounded-full h-1.5 shrink-0">
        <div
          className="h-1.5 rounded-full"
          style={{ width: `${(product.wilson / maxWilson) * 100}%`, backgroundColor: "#FF8E00" }}
        />
      </div>
    </div>
  );
}

// ─── Main export ───────────────────────────────────────────────────────────
export function TopProductsPodium({ products }: { products: RankedProduct[] }) {
  const [expanded, setExpanded] = useState(false);
  const top3 = products.slice(0, 3);
  const rest = products.slice(3);
  const maxWilson = products[0]?.wilson ?? 100;

  // Podium visual order: 2nd left, 1st center, 3rd right
  const podium = [
    { p: top3[1], rank: 2 as const },
    { p: top3[0], rank: 1 as const },
    { p: top3[2], rank: 3 as const },
  ].filter((x) => x.p);

  return (
    <Card className="border-slate-200 shadow-sm rounded-xl bg-white overflow-hidden">
      <CardContent className="p-8 pb-0">
        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Top performing SKUs</h3>
            <p className="text-sm text-slate-400 font-medium mt-1">
              Wilson lower bound — penalises small samples, rewards consistent volume
            </p>
          </div>
          <Badge variant="outline" className="text-xs font-bold py-1.5 px-3 text-slate-500 border-slate-200 shrink-0 ml-4">
            95% confidence
          </Badge>
        </div>

        {/* Podium */}
        <div className="flex items-end justify-center gap-4 pb-0">
          {podium.map(({ p, rank }) => (
            <PodiumColumn key={p.id} product={p} rank={rank} />
          ))}
        </div>

        {/* Expandable list */}
        {rest.length > 0 && (
          <div className="mt-2 border-t border-slate-100">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="w-full flex items-center justify-between py-4 px-1 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
            >
              <span>{expanded ? "Hide remaining products" : `${rest.length} more products`}</span>
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {expanded && (
              <div className="pb-6 space-y-1">
                {rest.map((p) => (
                  <ListRow key={p.id} product={p} maxWilson={maxWilson} />
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

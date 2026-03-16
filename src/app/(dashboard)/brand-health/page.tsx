
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  Radar, 
  ResponsiveContainer,
  PolarRadiusAxis
} from 'recharts';
import { 
  Activity,
  Zap,
  Crown,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { 
  dynamicVectorScores, 
  totalCacheCount,
  criticalVector,
  bestVector,
  globalStats,
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

  const radarData = dynamicVectorScores.map(v => ({
    subject: v.vector,
    A: v.pgScore,
    fullMark: 100,
  }));

  // Leaderboard data
  const podium = [heroSkus[1], heroSkus[0], heroSkus[2]]; // Rank 2, 1, 3
  const secondaryLeaders = heroSkus.slice(3, 5);

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-900 tracking-normal">Market Baseline Audit</h1>
        <p className="text-sm text-slate-500 font-bold uppercase tracking-normal">
          Comparative Pulse Analytics from {totalCacheCount.toLocaleString()} Historical Samples
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Market Superiority Spider Graph */}
        <Card className="lg:col-span-7 border-slate-200 shadow-sm rounded-xl bg-white p-8">
          <CardHeader className="px-0 pt-0 pb-8 flex flex-row items-center justify-between border-b border-slate-100">
            <div className="flex items-center gap-4">
              <Activity className="h-6 w-6 text-[#003da5]" />
              <CardTitle className="text-xl font-bold text-slate-900 tracking-normal">Market Health Vectors</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-10 flex flex-col items-center">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#e2e8f0" strokeWidth={1} />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#64748b', fontSize: 13, fontWeight: 600 }} 
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="P&G Internal"
                    dataKey="A"
                    stroke="#003da5"
                    strokeWidth={3}
                    fill="#003da5"
                    fillOpacity={0.1}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 w-full gap-6 mt-10 border-t border-slate-100 pt-10">
              <div className="text-center">
                <p className="text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">Critical Friction</p>
                <p className="text-xl font-extrabold text-red-500 tabular-nums tracking-normal">{criticalVector.vector}</p>
              </div>
              <div className="text-center border-x border-slate-100">
                <p className="text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">Market Lead</p>
                <p className="text-xl font-extrabold text-slate-900 tabular-nums tracking-normal">{globalStats.posPct}%</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest">Core Anchor</p>
                <p className="text-xl font-extrabold text-emerald-500 tabular-nums tracking-normal">{bestVector.vector}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hero SKU Performance Podium */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Crown className="h-8 w-8 text-[#003da5]" />
              Hero SKU Podium
            </h2>
            <p className="text-base text-slate-500 font-medium leading-relaxed max-w-sm tracking-normal">
              Top performing P&G products prioritized by their positive sentiment win-rate.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm space-y-10">
            {/* Visual Podium */}
            <div className="flex items-end justify-between px-2 pt-12 pb-4 h-64 relative">
              {podium.map((sku, index) => (
                <div key={sku.name} className="flex flex-col items-center flex-1 relative group">
                  {/* Avatar & Points Bubble */}
                  <div className="absolute -top-16 flex flex-col items-center gap-2">
                    <div className="flex items-center gap-1.5 bg-white shadow-md border border-slate-100 px-2 py-1 rounded-full text-[10px] font-bold text-slate-600">
                      <div className="h-2 w-2 rounded-full bg-amber-400" />
                      <span className="tabular-nums tracking-normal">{sku.points.toLocaleString()} pts</span>
                    </div>
                    <div className="relative">
                      <Avatar className={cn(
                        "border-4 border-white shadow-xl transition-transform group-hover:scale-110 duration-300",
                        index === 1 ? "h-20 w-20" : "h-16 w-16"
                      )}>
                        <AvatarImage src={sku.avatar} />
                        <AvatarFallback>{sku.name[0]}</AvatarFallback>
                      </Avatar>
                      {index === 1 && (
                        <div className="absolute -top-4 -right-2 rotate-12">
                          <Crown className="h-6 w-6 text-[#ef4444] fill-[#ef4444]" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Podium Column */}
                  <div className={cn(
                    "w-full rounded-t-[2rem] flex flex-col items-center justify-start pt-8 pb-6 transition-all duration-500",
                    index === 0 ? "h-32 bg-[#2988F0]" : // Rank 2
                    index === 1 ? "h-44 bg-[#ef4444]" : // Rank 1
                    "h-28 bg-[#003da5]" // Rank 3
                  )}>
                    <span className="text-4xl font-bold text-white mb-auto tabular-nums">{index === 0 ? '2' : index === 1 ? '1' : '3'}</span>
                    <span className="text-white font-bold text-[11px] uppercase tracking-normal px-2 text-center truncate w-full">
                      {sku.name.split(' ')[0]}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* List View - Ranks 4+ */}
            <div className="space-y-3">
              {secondaryLeaders.map((sku, i) => (
                <div key={sku.name} className="flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100/80 rounded-[1.5rem] transition-all border border-slate-100 group">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-slate-400 tabular-nums w-6">0{i + 4}</span>
                    <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                      <AvatarImage src={sku.avatar} />
                      <AvatarFallback>PG</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900 tracking-normal group-hover:text-[#003da5] transition-colors">{sku.name}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tabular-nums tracking-normal">{sku.points.toLocaleString()} points</span>
                    </div>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                    {i === 0 ? <ChevronUp className="h-4 w-4 text-[#2988F0]" /> : <ChevronDown className="h-4 w-4 text-red-400" />}
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold text-xs uppercase tracking-widest hover:bg-black transition-all shadow-lg active:scale-95">
              Generate Detailed Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

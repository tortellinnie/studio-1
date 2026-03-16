"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Tag
} from "lucide-react";
import { 
  dynamicVectorScores, 
  totalCacheCount,
  globalStats,
  criticalVector,
  bestVector,
  promoRecommendations
} from '@/data/mockData';
import { cn } from "@/lib/utils";

export default function BrandHealthPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const radarData = dynamicVectorScores.map(v => ({
    subject: v.vector,
    A: v.healthScore,
    fullMark: 100,
  }));

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Industry Health Audit</h1>
        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
          Vector Analysis from {totalCacheCount.toLocaleString()} Taglish NLP samples
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Industry Superiority Spider Graph */}
        <Card className="lg:col-span-7 chart-card p-6">
          <CardHeader className="px-0 pt-0 pb-6 flex flex-row items-center justify-between border-b border-slate-100">
            <div className="flex items-center gap-3">
              <Activity className="h-5 w-5 text-[#003da5]" />
              <CardTitle className="text-lg font-bold text-slate-900 uppercase tracking-tight">Vectors of Superiority</CardTitle>
            </div>
            <Badge className="bg-emerald-500 text-white font-bold uppercase tracking-widest px-3 py-0.5 text-[9px] border-none">NLP VALIDATED</Badge>
          </CardHeader>
          <CardContent className="pt-8 flex flex-col items-center">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#e2e8f0" strokeWidth={1} />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} 
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Market Health"
                    dataKey="A"
                    stroke="#003da5"
                    strokeWidth={2}
                    fill="#003da5"
                    fillOpacity={0.1}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 w-full gap-4 mt-8 border-t border-slate-100 pt-8">
              <div className="text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Critical Friction</p>
                <p className="text-lg font-bold text-red-500 uppercase tracking-tight">{criticalVector.vector}</p>
              </div>
              <div className="text-center border-x border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Market Positive</p>
                <p className="text-lg font-bold text-slate-900 uppercase tracking-tight">{globalStats.posPct}%</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Core Anchor</p>
                <p className="text-lg font-bold text-emerald-500 uppercase tracking-tight">{bestVector.vector}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Promo Strategy */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight flex items-center gap-2">
              <Tag className="h-5 w-5 text-[#003da5]" />
              Promo Prioritization
            </h2>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Targeted SKU recommendations based on sentiment friction points.
            </p>
          </div>

          <div className="space-y-4">
            {promoRecommendations.map((promo, idx) => (
              <Card key={idx} className="chart-card overflow-hidden group border-none ring-1 ring-slate-200">
                <div className={cn("h-1 w-full", promo.priority === 'High' ? 'bg-red-500' : 'bg-orange-400')} />
                <CardContent className="p-5 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-md font-bold text-slate-900 uppercase tracking-tight">{promo.sku}</h3>
                      <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest">Strategy: {promo.targetVector}</p>
                    </div>
                    <Badge className={cn(
                      "text-[9px] font-bold uppercase px-2 py-0.5 rounded-sm border-none",
                      promo.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                    )}>
                      {promo.priority}
                    </Badge>
                  </div>
                  <div className="bg-slate-50 p-3 rounded border border-slate-100 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Recommended Promo</p>
                      <p className="text-sm font-semibold text-slate-900">{promo.recommendedPromo}</p>
                    </div>
                    <button className="p-2 bg-white border border-slate-200 rounded-md hover:shadow-sm transition-all">
                      <Zap className="h-3.5 w-3.5 text-[#003da5]" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

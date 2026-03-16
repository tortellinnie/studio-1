"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Tag,
  ShieldAlert,
  ArrowUpRight
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
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="space-y-2">
        <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">Industry Health Audit</h1>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">
          Vector Analysis from {totalCacheCount.toLocaleString()} Taglish NLP samples
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Industry Superiority Spider Graph */}
        <Card className="lg:col-span-7 glass-card p-8">
          <CardHeader className="px-0 pt-0 pb-8 flex flex-row items-center justify-between border-b border-slate-50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary text-white">
                <Activity className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl font-black text-slate-900 uppercase tracking-tight">Vectors of Superiority</CardTitle>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Taglish sentiment distribution across the industry</p>
              </div>
            </div>
            <Badge className="bg-emerald-500 text-white font-black uppercase tracking-widest px-4 py-1 text-[9px] rounded-none">NLP VALIDATED</Badge>
          </CardHeader>
          <CardContent className="pt-10 flex flex-col items-center">
            <div className="h-[450px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#e2e8f0" strokeWidth={2} />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#64748b', fontSize: 10, fontWeight: 900, textAnchor: 'middle' }} 
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Market Health"
                    dataKey="A"
                    stroke="#003da5"
                    strokeWidth={4}
                    fill="#003da5"
                    fillOpacity={0.15}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 w-full gap-8 mt-10 border-t border-slate-50 pt-10">
              <div className="text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Critical Friction</p>
                <p className="text-xl font-black text-red-500 uppercase tracking-tighter">{criticalVector.vector}</p>
              </div>
              <div className="text-center border-x border-slate-50">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Market Positive</p>
                <p className="text-xl font-black text-slate-900 uppercase tracking-tighter">{globalStats.posPct}%</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Core Anchor</p>
                <p className="text-xl font-black text-emerald-500 uppercase tracking-tighter">{bestVector.vector}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Promo Strategy */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-3">
              <Tag className="h-6 w-6 text-primary" />
              Promo Prioritization
            </h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
              SKU recommendations targeted at sentiment friction points.
            </p>
          </div>

          <div className="space-y-6">
            {promoRecommendations.map((promo, idx) => (
              <Card key={idx} className="glass-card overflow-hidden group">
                <div className={cn("h-1 w-full", promo.priority === 'High' ? 'bg-red-500' : 'bg-orange-400')} />
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">{promo.sku}</h3>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Strategy: {promo.targetVector}</p>
                    </div>
                    <Badge className={cn(
                      "text-[9px] font-black uppercase px-3 py-1 rounded-none",
                      promo.priority === 'High' ? 'bg-red-500 text-white' : 'bg-orange-400 text-white'
                    )}>
                      {promo.priority} Priority
                    </Badge>
                  </div>
                  <div className="bg-slate-50 p-4 border border-slate-100 flex items-center justify-between group-hover:bg-slate-100 transition-colors">
                    <div className="space-y-1">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Recommended Promo</p>
                      <p className="text-sm font-bold text-slate-900">{promo.recommendedPromo}</p>
                    </div>
                    <button className="p-2 bg-white border border-slate-200 hover:scale-110 transition-transform">
                      <Zap className="h-4 w-4 text-primary" />
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
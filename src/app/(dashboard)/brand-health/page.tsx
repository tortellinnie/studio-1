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
  allIndustryProducts
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

  const topProduct = allIndustryProducts.find(p => p.isPNG) || allIndustryProducts[0];

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Industry health audit</h1>
        <p className="text-sm text-slate-500 font-semibold tracking-normal">
          Vector analysis from {totalCacheCount.toLocaleString()} Taglish NLP samples
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Industry Superiority Spider Graph */}
        <Card className="lg:col-span-7 border-slate-200 shadow-sm rounded-xl bg-white p-8">
          <CardHeader className="px-0 pt-0 pb-8 flex flex-row items-center justify-between border-b border-slate-100">
            <div className="flex items-center gap-4">
              <Activity className="h-6 w-6 text-[#003da5]" />
              <CardTitle className="text-xl font-bold text-slate-900 tracking-tight">Vectors of superiority</CardTitle>
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
                    name="Market Health"
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
                <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Critical friction</p>
                <p className="text-xl font-extrabold text-red-500 tabular-nums">{criticalVector.vector}</p>
              </div>
              <div className="text-center border-x border-slate-100">
                <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Market positive</p>
                <p className="text-xl font-extrabold text-slate-900 tabular-nums">{globalStats.posPct}%</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Core anchor</p>
                <p className="text-xl font-extrabold text-emerald-500 tabular-nums">{bestVector.vector}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Promo prioritization */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Tag className="h-8 w-8 text-[#003da5]" />
              Promo prioritization
            </h2>
            <p className="text-base text-slate-500 font-medium leading-relaxed max-w-sm">
              Targeted SKU recommendations based on sentiment friction points.
            </p>
          </div>

          <div className="pt-2">
            <Card className="overflow-hidden border-slate-200 rounded-[2.5rem] bg-white shadow-sm border-t-[10px] border-t-[#003da5]">
              <CardContent className="p-10 space-y-8">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="text-3xl font-bold text-slate-900 leading-tight">
                      {topProduct.name}
                    </h3>
                    <p className="text-sm font-bold text-slate-400">
                      Status: Top Performer
                    </p>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-3 py-1.5 rounded-md border-none tracking-widest uppercase">
                    PRIORITY
                  </Badge>
                </div>

                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 flex items-center gap-6 justify-between">
                  <div className="space-y-4">
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.1em]">
                      Recommended action
                    </p>
                    <p className="text-xl font-bold text-slate-900 leading-tight">
                      [{topProduct.name}] your top performing product, consider creating promos!
                    </p>
                  </div>
                  <div className="h-14 w-14 shrink-0 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-center">
                    <Zap className="h-6 w-6 text-[#003da5] fill-[#003da5]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

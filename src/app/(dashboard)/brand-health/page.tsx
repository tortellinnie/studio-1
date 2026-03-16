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
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-900 tracking-normal">Industry health audit</h1>
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
              <CardTitle className="text-xl font-bold text-slate-900 tracking-normal">Vectors of superiority</CardTitle>
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

        {/* Promo Strategy */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3 tracking-normal">
              <Tag className="h-6 w-6 text-[#003da5]" />
              Promo prioritization
            </h2>
            <p className="text-sm text-slate-500 font-medium leading-relaxed tracking-normal">
              Targeted SKU recommendations based on sentiment friction points.
            </p>
          </div>

          <div className="space-y-6">
            <Card className="overflow-hidden border-none ring-1 ring-slate-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-all">
              <div className="h-1.5 w-full bg-[#003da5]" />
              <CardContent className="p-6 space-y-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 tracking-normal">{topProduct.name}</h3>
                    <p className="text-xs font-semibold text-slate-400 pt-1 tracking-normal">Status: Top Performer</p>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-md border-none">
                    PRIORITY
                  </Badge>
                </div>
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recommended action</p>
                    <p className="text-base font-semibold text-slate-900 leading-snug">
                      [{topProduct.name}] your top performing product, consider creating promos!
                    </p>
                  </div>
                  <button className="p-3 bg-white border border-slate-200 rounded-lg hover:shadow-sm transition-all hover:bg-slate-50 group">
                    <Zap className="h-5 w-5 text-[#003da5] group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

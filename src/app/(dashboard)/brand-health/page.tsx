
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  Radar, 
  ResponsiveContainer 
} from 'recharts';
import { 
  ShoppingCart,
  TrendingUp,
  Info,
  Star,
  Activity,
  CheckCircle2
} from "lucide-react";
import { allIndustryProducts, accountRecommendations, dynamicVectorScores, totalCacheCount } from '@/data/mockData';

export default function BrandHealthPage() {
  const [isClient, setIsClient] = useState(false);
  const lazadaAccount = accountRecommendations[0];

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  // Map dynamic metrics to analysis tabs
  const vectorAnalysisData = dynamicVectorScores.map(score => {
    const staticInfo = {
      Product: {
        description: "Core effectiveness, durability, and standard-of-use as validated by localized industry reviews.",
        keywords: ["effective", "gumana", "quality", "maayos"],
        topProduct: allIndustryProducts[0].name
      },
      Packaging: {
        description: "Physical security during last-mile delivery, leak protection, and aesthetic design quality.",
        keywords: ["secure", "bubble wrap", "hindi tumagas", "balot"],
        topProduct: allIndustryProducts.find(p => p.brand.includes('Unilever'))?.name || allIndustryProducts[1].name
      },
      Value: {
        description: "Consumer perception of ROI, comparing volume-to-price ratios and promotional effectiveness.",
        keywords: ["sulit", "tipid", "mura", "discount", "nakamura"],
        topProduct: allIndustryProducts.find(p => p.brand.includes('Surf'))?.name || allIndustryProducts[2].name
      },
      Communication: {
        description: "Alignment between industry marketing claims and the actual consumer user experience.",
        keywords: ["totoo", "advertised", "legit", "authentic"],
        topProduct: allIndustryProducts[0].name
      },
      "Retail Execution": {
        description: "Last-mile efficiency including delivery speed, platform handling, and post-purchase service.",
        keywords: ["mabilis", "ship out agad", "rider", "delivery"],
        topProduct: allIndustryProducts[1].name
      }
    }[score.vector] || { description: "", keywords: [], topProduct: "" };

    return {
      id: score.vector.toLowerCase().replace(' ', ''),
      title: score.vector,
      description: staticInfo.description,
      keywords: staticInfo.keywords,
      topProduct: staticInfo.topProduct,
      score: score.healthScore,
      mentions: score.count
    };
  });

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-[1400px] mx-auto pb-10">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-headline uppercase tracking-tighter">Market Health & Vector Analysis</h1>
        <p className="text-base text-muted-foreground font-medium">Industry SKU performance vectors powered by {totalCacheCount.toLocaleString()} inference points</p>
      </div>

      {/* Strategic Hub */}
      <Card className="border-l-8 border-l-[#003da5] shadow-sm bg-white overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-8 px-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-[#003da5] rounded-xl shadow-lg shadow-[#003da5]/20">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl font-black text-slate-900 uppercase tracking-tight">Industry Strategic Hub</CardTitle>
            </div>
            <Badge className="bg-[#003da5] text-white px-6 py-2 text-[10px] uppercase font-black tracking-[0.2em] rounded-xl shadow-md">Market Priority: {lazadaAccount.priorityScore}</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-10">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-6">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-3">
                <Info className="h-4 w-4 text-[#003da5]" /> Industry AI Rationale
              </h4>
              <p className="text-2xl text-slate-700 font-bold italic border-l-4 border-slate-100 pl-8 py-4 leading-relaxed tracking-tight bg-slate-50/30 rounded-r-3xl">
                "{lazadaAccount.rationale}"
              </p>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-3">
                <TrendingUp className="h-4 w-4 text-emerald-500" /> Market Priority Actions
              </h4>
              <ul className="grid grid-cols-1 gap-4">
                {lazadaAccount.recommendedActions.map((action, i) => (
                  <li key={i} className="flex items-center gap-5 text-base font-bold text-slate-600 bg-slate-50/50 p-6 rounded-[1.5rem] border border-slate-100 hover:border-[#003da5]/20 hover:bg-white transition-all group">
                    <div className="h-3 w-3 rounded-full bg-[#003da5] shrink-0 shadow-sm group-hover:scale-125 transition-transform" />
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vector Analysis Tabs */}
      <Card className="shadow-sm border-slate-200 overflow-hidden bg-white">
        <CardHeader className="p-8 pb-4 border-b border-slate-50 bg-slate-50/30">
          <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Industry Vector Analysis (Live Cache)</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue={vectorAnalysisData[0].id} className="w-full">
            <div className="bg-slate-50/50 p-4">
              <TabsList className="w-full grid grid-cols-5 h-14 bg-slate-200/50 p-1.5 rounded-2xl">
                {vectorAnalysisData.map((v) => (
                  <TabsTrigger 
                    key={v.id} 
                    value={v.id}
                    className="text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-[#003da5] data-[state=active]:shadow-lg rounded-xl transition-all h-full"
                  >
                    {v.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {vectorAnalysisData.map((v) => (
              <TabsContent key={v.id} value={v.id} className="p-14 space-y-12 animate-in fade-in duration-500">
                <div className="grid md:grid-cols-2 gap-20">
                   <div className="space-y-10">
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-3">
                          <Activity className="h-4 w-4 text-[#003da5]" /> Market Metric Definition
                        </h4>
                        <p className="text-xl font-bold text-slate-600 leading-relaxed tracking-tight">
                          {v.description}
                        </p>
                      </div>
                      <div className="space-y-5">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Taglish Inference Context</h4>
                        <div className="flex flex-wrap gap-3">
                          {v.keywords.map((kw) => (
                            <Badge key={kw} variant="outline" className="px-5 py-2 text-[10px] font-black text-slate-500 border-slate-200 bg-white rounded-full uppercase tracking-widest shadow-sm">
                              {kw}
                            </Badge>
                          ))}
                        </div>
                      </div>
                   </div>
                   <div className="bg-[#ebf2ff]/40 p-12 rounded-[2.5rem] border border-[#003da5]/5 flex flex-col justify-center shadow-inner relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-10">
                        <TrendingUp className="h-24 w-24 text-[#003da5]" />
                      </div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8 text-center md:text-left">Vector Performance Metrics</h4>
                      <div className="flex items-center justify-between mb-10">
                        <div>
                          <p className="text-7xl font-black text-[#003da5] tabular-nums tracking-tighter">{v.score}%</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">Industry Health Index</p>
                        </div>
                        <div className="text-right">
                          <p className="text-7xl font-black text-slate-900 tabular-nums tracking-tighter">{v.mentions.toLocaleString()}</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">Verified Industry Mentions</p>
                        </div>
                      </div>
                      <div className="pt-10 border-t border-slate-200/50 flex items-center gap-5">
                        <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                          <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Top Performing Market SKU</p>
                          <p className="text-2xl font-black text-slate-900 tracking-tight">{v.topProduct}</p>
                        </div>
                      </div>
                   </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Radar Comparison Industry Leaders */}
      <div className="grid gap-8 md:grid-cols-2">
        {allIndustryProducts.slice(0, 2).map((product) => (
          <Card key={product.id} className="shadow-sm border-slate-200 bg-white overflow-hidden group">
            <CardHeader className="py-6 px-8 border-b border-slate-50 bg-slate-50/20">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-black text-slate-900 group-hover:text-[#003da5] transition-colors uppercase tracking-tight">{product.name}</CardTitle>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{product.brand}</p>
                </div>
                <Activity className="h-5 w-5 text-[#003da5] opacity-20 group-hover:opacity-100 transition-opacity" />
              </div>
            </CardHeader>
            <CardContent className="h-[400px] p-8 pt-10">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                  { vector: 'Product', value: product.vectors.product },
                  { vector: 'Packaging', value: product.vectors.packaging },
                  { vector: 'Value', value: product.vectors.value },
                  { vector: 'Communication', value: product.vectors.communication },
                  { vector: 'Retail Exec', value: product.vectors.retailExec },
                ]}>
                  <PolarGrid stroke="#e2e8f0" strokeWidth={2} />
                  <PolarAngleAxis dataKey="vector" fontSize={10} tick={{ fill: '#64748b', fontWeight: 900, textAnchor: 'middle' }} />
                  <Radar name={product.name} dataKey="value" stroke="#003da5" strokeWidth={3} fill="#003da5" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

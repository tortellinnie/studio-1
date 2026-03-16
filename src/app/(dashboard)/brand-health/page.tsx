
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
  Activity
} from "lucide-react";
import { pngProducts, accountRecommendations, dynamicVectorScores } from '@/data/mockData';

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
        description: "Product performance, effectiveness, quality, and core functionality.",
        keywords: ["effective", "gumana", "quality", "maayos"],
        topProduct: "Downy Garden Bloom"
      },
      Packaging: {
        description: "Physical container durability, leak protection, and design.",
        keywords: ["secure", "bubble wrap", "hindi tumagas", "balot"],
        topProduct: "Ariel Sunrise Fresh"
      },
      Value: {
        description: "Price-to-quality ratio, promotions, and affordability perception.",
        keywords: ["sulit", "tipid", "mura", "discount", "nakamura"],
        topProduct: "Tide Perfect Clean"
      },
      Communication: {
        description: "Advertising claims, marketing messages, and accuracy.",
        keywords: ["totoo", "advertised", "legit", "authentic"],
        topProduct: "Safeguard Bar Soap"
      },
      "Retail Execution": {
        description: "Delivery speed, customer service, and platform handling.",
        keywords: ["mabilis", "ship out agad", "rider", "delivery"],
        topProduct: "Downy Sunrise Fresh"
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
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Brand Health & Strategy</h1>
        <p className="text-base text-muted-foreground">Strategic SKU performance vectors powered by GenAI inference</p>
      </div>

      {/* Strategic Recommendation */}
      <Card className="border-l-4 border-l-[#003da5] shadow-sm">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingCart className="h-6 w-6 text-[#003da5]" />
              <CardTitle className="text-lg font-bold">{lazadaAccount.account} Strategic Hub</CardTitle>
            </div>
            <Badge className="bg-[#003da5] text-white px-4 py-1 text-xs uppercase font-bold tracking-widest">Priority Score: {lazadaAccount.priorityScore}</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Info className="h-3 w-3" /> AI Rationale
              </h4>
              <p className="text-xl text-slate-700 font-medium italic border-l-4 border-slate-100 pl-6 py-2 leading-relaxed">
                "{lazadaAccount.rationale}"
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <TrendingUp className="h-3 w-3" /> Priority Actions
              </h4>
              <ul className="grid grid-cols-1 gap-3">
                {lazadaAccount.recommendedActions.map((action, i) => (
                  <li key={i} className="flex items-center gap-4 text-sm font-bold text-slate-600 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                    <div className="h-2 w-2 rounded-full bg-[#003da5] shrink-0" />
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vector Analysis Tabs */}
      <Card className="shadow-sm border-slate-200 overflow-hidden">
        <CardHeader className="pb-4 border-b border-slate-50 bg-slate-50/30">
          <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Detailed Vector Analysis</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue={vectorAnalysisData[0].id} className="w-full">
            <div className="bg-slate-50/50 p-3">
              <TabsList className="w-full grid grid-cols-5 h-12 bg-slate-200/50 p-1.5 rounded-xl">
                {vectorAnalysisData.map((v) => (
                  <TabsTrigger 
                    key={v.id} 
                    value={v.id}
                    className="text-[10px] font-bold uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-[#003da5] data-[state=active]:shadow-sm rounded-lg"
                  >
                    {v.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {vectorAnalysisData.map((v) => (
              <TabsContent key={v.id} value={v.id} className="p-10 space-y-8 animate-in fade-in duration-300">
                <div className="grid md:grid-cols-2 gap-12">
                   <div className="space-y-6">
                      <div className="space-y-2">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">What We Measure</h4>
                        <p className="text-base font-semibold text-slate-600 leading-relaxed">
                          {v.description}
                        </p>
                      </div>
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Example Keywords</h4>
                        <div className="flex flex-wrap gap-2">
                          {v.keywords.map((kw) => (
                            <Badge key={kw} variant="outline" className="px-3 py-1 text-[10px] font-bold text-slate-500 border-slate-200 bg-white">
                              {kw}
                            </Badge>
                          ))}
                        </div>
                      </div>
                   </div>
                   <div className="bg-[#ebf2ff]/30 p-8 rounded-2xl border border-[#003da5]/5 flex flex-col justify-center">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 text-center md:text-left">Inference Metrics</h4>
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <p className="text-4xl font-extrabold text-[#003da5]">{v.score}%</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Vector Health</p>
                        </div>
                        <div className="text-right">
                          <p className="text-4xl font-extrabold text-slate-900">{v.mentions}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Mentions Found</p>
                        </div>
                      </div>
                      <div className="pt-6 border-t border-slate-200/50">
                        <p className="text-sm font-bold text-slate-600 mb-1">Top Performing Product</p>
                        <p className="text-lg font-extrabold text-slate-900">{v.topProduct}</p>
                      </div>
                   </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Radar Comparison Table Row */}
      <div className="grid gap-8 md:grid-cols-2">
        {pngProducts.slice(0, 2).map((product) => (
          <Card key={product.id} className="shadow-sm border-slate-200">
            <CardHeader className="pb-2 border-b border-slate-50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold text-slate-900">{product.name}</CardTitle>
                <Activity className="h-5 w-5 text-[#003da5] opacity-20" />
              </div>
            </CardHeader>
            <CardContent className="h-[350px] pt-6">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                  { vector: 'Product', value: product.vectors.product },
                  { vector: 'Pack', value: product.vectors.packaging },
                  { vector: 'Value', value: product.vectors.value },
                  { vector: 'Comm', value: product.vectors.communication },
                  { vector: 'Retail', value: product.vectors.retailExec },
                ]}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="vector" fontSize={11} tick={{ fill: '#64748b', fontWeight: 700 }} />
                  <Radar dataKey="value" stroke="#003da5" fill="#003da5" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

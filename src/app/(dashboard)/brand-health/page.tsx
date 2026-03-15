
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
  CheckCircle2, 
  ShoppingCart,
  TrendingUp,
  Info,
  Star,
  Activity
} from "lucide-react";
import { pngProducts, accountRecommendations } from '@/data/mockData';

const vectorAnalysisData = [
  {
    id: "product",
    title: "Product",
    description: "Product performance, effectiveness, quality, features, and core functionality mentioned in reviews.",
    keywords: ["effective", "gumana", "quality", "natanggal ang mantsa", "mabango", "maayos"],
    topProduct: "Downy Fabric Conditioner",
    score: 98
  },
  {
    id: "packaging",
    title: "Packaging",
    description: "Physical container, durability, leak protection, and design usability.",
    keywords: ["secure", "bubble wrap", "maayos ang balot", "hindi tumagas", "balot na balot"],
    topProduct: "Ariel Liquid Detergent",
    score: 92
  },
  {
    id: "value",
    title: "Value",
    description: "Price-to-quality ratio, promotions, bundles, and affordability perception.",
    keywords: ["sulit", "tipid", "mura", "value for money", "discount", "nakamura"],
    topProduct: "Surf Cherry Blossom",
    score: 88
  },
  {
    id: "communication",
    title: "Communication",
    description: "Advertising claims, marketing messages, and brand promise accuracy.",
    keywords: ["totoo", "advertised", "kasing bango ng nasa tv", "legit", "authentic"],
    topProduct: "Safeguard Bar Soap",
    score: 85
  },
  {
    id: "retailExec",
    title: "Retail Exec",
    description: "Delivery speed, customer service, stock availability, and platform handling.",
    keywords: ["mabilis", "ship out agad", "rider", "delivery", "safe arrival"],
    topProduct: "Downy Garden Bloom",
    score: 95
  }
];

export default function BrandHealthPage() {
  const [isClient, setIsClient] = useState(false);
  const rankedProducts = [...pngProducts].sort((a, b) => b.correctedRating - a.correctedRating);
  const lazadaAccount = accountRecommendations[0];

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-[1400px] mx-auto pb-10">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Brand Health & Strategy</h1>
        <p className="text-sm text-muted-foreground">Strategic SKU performance and retail execution vectors</p>
      </div>

      {/* Strategic Recommendation */}
      <Card className="border-l-4 border-l-[#003da5] shadow-sm">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingCart className="h-5 w-5 text-[#003da5]" />
              <CardTitle className="text-lg font-bold">{lazadaAccount.account} Strategic Hub</CardTitle>
            </div>
            <Badge className="bg-[#003da5] text-white">Priority: {lazadaAccount.priorityScore}</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Info className="h-3 w-3" /> AI Rationale
              </h4>
              <p className="text-xl text-slate-700 font-medium italic border-l-4 border-slate-200 pl-6 py-2">
                "{lazadaAccount.rationale}"
              </p>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <TrendingUp className="h-3 w-3" /> Priority Actions
              </h4>
              <ul className="grid grid-cols-1 gap-3">
                {lazadaAccount.recommendedActions.map((action, i) => (
                  <li key={i} className="flex items-center gap-4 text-sm font-semibold text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="h-2 w-2 rounded-full bg-[#003da5] shrink-0" />
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rankings Table */}
      <Card className="shadow-sm border-slate-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-600">Corrected SKU Rankings</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                <th className="p-4">Rank</th>
                <th className="p-4">Product SKU</th>
                <th className="p-4">Corrected Rating</th>
                <th className="p-4 text-right">Sentiment Health</th>
              </tr>
            </thead>
            <tbody>
              {rankedProducts.map((product, index) => (
                <tr key={product.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-[#003da5] font-bold text-xs">
                      {index + 1}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-0.5">
                      <p className="font-bold text-slate-900 text-sm">{product.name}</p>
                      <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">{product.subcategory}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 font-bold text-[#003da5] text-lg">
                      <Star className="h-4 w-4 fill-[#003da5]" />
                      {product.correctedRating.toFixed(1)}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[10px] font-bold uppercase text-emerald-600">{product.sentimentDistribution.positive}% Positive</span>
                      <div className="h-1.5 w-40 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: `${product.sentimentDistribution.positive}%` }} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* NEW: Detailed Vector Analysis Component */}
      <Card className="shadow-sm border-slate-200 overflow-hidden">
        <CardHeader className="pb-4 border-b border-slate-50">
          <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-600">Detailed Vector Analysis</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="product" className="w-full">
            <div className="bg-slate-50 p-2">
              <TabsList className="w-full grid grid-cols-5 h-auto bg-slate-200/50 p-1 rounded-xl">
                {vectorAnalysisData.map((v) => (
                  <TabsTrigger 
                    key={v.id} 
                    value={v.id}
                    className="text-xs font-bold uppercase tracking-widest py-3 data-[state=active]:bg-white data-[state=active]:text-[#003da5] data-[state=active]:shadow-sm rounded-lg"
                  >
                    {v.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {vectorAnalysisData.map((v) => (
              <TabsContent key={v.id} value={v.id} className="p-8 space-y-8 animate-in fade-in duration-300">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">What We Measure</h4>
                  <p className="text-sm font-medium text-slate-600 leading-relaxed max-w-3xl">
                    {v.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Example Keywords (Taglish)</h4>
                  <div className="flex flex-wrap gap-2">
                    {v.keywords.map((kw) => (
                      <Badge key={kw} variant="outline" className="px-3 py-1.5 text-[11px] font-bold text-slate-500 border-slate-200 bg-white">
                        {kw}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-50">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Top Performing Product</h4>
                  <p className="text-sm font-bold text-slate-900">
                    {v.topProduct} <span className="text-slate-400 font-medium ml-2">— {v.score}/100 {v.id} vector score</span>
                  </p>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Radar Vectors Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {pngProducts.slice(0, 2).map((product) => (
          <Card key={product.id} className="shadow-sm border-slate-200">
            <CardHeader className="pb-2 border-b border-slate-50 bg-slate-50/30">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{product.name}</CardTitle>
                <Activity className="h-4 w-4 text-[#003da5] opacity-20" />
              </div>
            </CardHeader>
            <CardContent className="h-[300px] pt-4">
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

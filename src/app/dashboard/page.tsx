
"use client";

import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar
} from 'recharts';
import { 
  pngProducts, 
  multiBrandTrends, 
  brandComparison, 
  accountRecommendations 
} from '@/data/mockData';
import { NotificationBanner } from '@/components/NotificationBanner';
import { ShoppingCart, TrendingUp, MessageSquare, CheckCircle2, AlertCircle, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Dashboard() {
  const lazadaRec = accountRecommendations[0];

  // Top P&G product per subcategory
  const subcategories = Array.from(new Set(pngProducts.map(p => p.subcategory)));
  const topPerSub = subcategories.map(sub => {
    return pngProducts
      .filter(p => p.subcategory === sub)
      .sort((a, b) => b.sentimentScore - a.sentimentScore)[0];
  });

  return (
    <Layout>
      <div className="p-10 space-y-10 max-w-[1600px] mx-auto animate-in fade-in duration-500">
        <NotificationBanner />
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2 font-headline tracking-tight">Executive Overview</h1>
            <p className="text-slate-500 font-medium text-lg">Lazada PH Fabric Category Intelligence</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-bold px-3 py-1">DATASET: FABRIC CARE</Badge>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 font-bold px-3 py-1">ACCOUNT: LAZADA PH</Badge>
          </div>
        </div>

        {/* Metric Summaries */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total Reviews</CardDescription>
              <CardTitle className="text-2xl font-black text-slate-900">37,520</CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Avg Corrected Rating</CardDescription>
              <CardTitle className="text-2xl font-black text-slate-900">4.42 <span className="text-xs text-emerald-500 ml-1">★</span></CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Sentiment Score</CardDescription>
              <CardTitle className="text-2xl font-black text-slate-900">72% <span className="text-xs text-emerald-500 ml-1">↑ 3%</span></CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Rating Inflation</CardDescription>
              <CardTitle className="text-2xl font-black text-rose-500">96.8%</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Actionable Insights Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-widest">Actionable AI Insights</h2>
            <Badge className="bg-[#003da5] text-[10px] font-bold">LATEST UPDATES</Badge>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-border/50 bg-white">
              <CardContent className="pt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[9px] font-bold text-emerald-600 border-emerald-600/20 bg-emerald-50">PRODUCT</Badge>
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                </div>
                <p className="text-xs font-bold text-slate-800 leading-relaxed">
                  Downy Garden Bloom leads with 78% positive reviews. 
                  Scent longevity is the primary driver for high product vector score (0.88).
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-white">
              <CardContent className="pt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[9px] font-bold text-blue-600 border-blue-600/20 bg-blue-50">VALUE</Badge>
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                </div>
                <p className="text-xs font-bold text-slate-800 leading-relaxed">
                  Ariel Sunrise Fresh sentiment is under pressure due to "Value" vector decline. 
                  Price per wash mentions are rising in recent Taglish feedback.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-white">
              <CardContent className="pt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[9px] font-bold text-purple-600 border-purple-600/20 bg-purple-50">RETAIL EXEC</Badge>
                  <Zap className="h-4 w-4 text-purple-500" />
                </div>
                <p className="text-xs font-bold text-slate-800 leading-relaxed">
                  Retail execution is highest for Ariel Liquid on Lazada (0.85), 
                  driven by consistent bundling and flash sale participation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Lazada Recommendation - Extended Horizontally */}
        <Card className="border-l-[6px] border-l-[#003da5] shadow-md bg-white overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col lg:flex-row min-h-[300px]">
              {/* Left Segment: Summary */}
              <div className="lg:w-1/4 p-8 border-b lg:border-b-0 lg:border-r border-slate-100 flex flex-col justify-center">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-2.5 bg-blue-50 rounded-lg shrink-0">
                    <ShoppingCart className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-none mb-1.5 block">Priority Channel</span>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">Lazada Philippines</h3>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                    <Badge className="bg-emerald-50 text-emerald-700 border-none font-bold text-[9px] uppercase px-2 py-0.5 tracking-tighter">
                      IMPROVING
                    </Badge>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase block">Score</span>
                    <span className="text-xl font-black text-slate-900 leading-none">88</span>
                  </div>
                </div>
              </div>
              
              {/* Right Segment: Detail */}
              <div className="flex-1 p-8 bg-slate-50/20">
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm relative overflow-hidden group hover:border-blue-200 transition-colors">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Focus SKU</p>
                      <p className="text-2xl font-black text-slate-900 tracking-tight">{lazadaRec.topProduct}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                        <MessageSquare className="h-3.5 w-3.5" />
                        AI Rationale
                      </h4>
                      <p className="text-sm text-slate-700 leading-relaxed font-medium italic pr-4">
                        "{lazadaRec.rationale}"
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Strategic Actions</h4>
                    <ul className="space-y-4">
                      {lazadaRec.recommendedActions.map((action, i) => (
                        <li key={i} className="flex items-start gap-4 group">
                          <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#003da5] shrink-0" />
                          <span className="text-xs text-slate-800 font-bold leading-tight">{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SKU Breakdown Section - Exactly as pictured */}
        <div className="space-y-8">
          <h2 className="text-base font-bold text-slate-800 uppercase tracking-[0.05em]">5 VECTORS OF SUPERIORITY: CORE SKU BREAKDOWN</h2>
          <div className="grid gap-10 md:grid-cols-2">
            {pngProducts.slice(0, 2).map((product) => (
              <Card key={product.id} className="border-slate-100 shadow-sm overflow-hidden bg-white p-12 flex flex-col items-center">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-[0.3em] mb-12">{product.name}</h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={[
                      { vector: 'Product', value: product.vectors.product },
                      { vector: 'Pack', value: product.vectors.packaging },
                      { vector: 'Value', value: product.vectors.value },
                      { vector: 'Comm', value: product.vectors.communication },
                      { vector: 'Retail', value: product.vectors.retailExec },
                    ]}>
                      <PolarGrid stroke="#f1f5f9" />
                      <PolarAngleAxis dataKey="vector" fontSize={11} tick={{ fill: '#94a3b8', fontWeight: 600 }} />
                      <Radar 
                        name={product.name} 
                        dataKey="value" 
                        stroke="#003da5" 
                        fill="#003da5" 
                        fillOpacity={0.6} 
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* BOTTOM ROW: Trends & Comparison */}
        <div className="space-y-8">
          <Card className="border-slate-200 shadow-sm bg-white">
            <CardHeader className="pb-2 pt-8">
              <CardTitle className="text-base font-bold text-slate-800">Historical Sentiment Trends</CardTitle>
              <CardDescription className="text-xs">Monthly performance tracking per brand</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px] pb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={multiBrandTrends} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} domain={[50, 85]} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '30px', fontSize: '11px', fontWeight: 700 }} />
                  <Line type="monotone" dataKey="P&G" stroke="#003da5" strokeWidth={3} dot={{ r: 4, fill: '#003da5' }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="Surf" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Breeze" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm bg-white">
            <CardHeader className="pb-2 pt-8">
              <CardTitle className="text-base font-bold text-slate-800">Brand Sentiment Comparison</CardTitle>
              <CardDescription className="text-xs">P&G Portfolio vs Key Competitors on Lazada</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px] pb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={brandComparison} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="brand" stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} domain={[0, 100]} />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="sentiment" fill="#003da5" radius={[4, 4, 0, 0]} barSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}


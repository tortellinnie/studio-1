
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
} from '@/data/mockData';

export default function Dashboard() {
  return (
    <Layout>
      <div className="p-10 space-y-10 max-w-[1600px] mx-auto animate-in fade-in duration-500">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2 font-headline tracking-tight">Executive Overview</h1>
            <p className="text-slate-500 font-medium text-lg">Lazada PH Fabric Category Intelligence</p>
          </div>
          <div className="flex gap-2">
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
              <CardTitle className="text-2xl font-black text-slate-900">72%</CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Rating Inflation</CardDescription>
              <CardTitle className="text-2xl font-black text-rose-500">96.8%</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* SKU Breakdown Section */}
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

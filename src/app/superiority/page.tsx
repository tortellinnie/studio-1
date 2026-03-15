
"use client";

import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { pngProducts } from '@/data/mockData';
import { Package, Box, DollarSign, MessageSquare, Store } from 'lucide-react';
import { NotificationBanner } from '@/components/NotificationBanner';

export default function SuperiorityMapping() {
  const vectors = [
    { name: 'Product', icon: Package, color: 'bg-[#3b82f6]' },
    { name: 'Packaging', icon: Box, color: 'bg-[#22c55e]' },
    { name: 'Value', icon: DollarSign, color: 'bg-[#a855f7]' },
    { name: 'Communication', icon: MessageSquare, color: 'bg-[#f97316]' },
    { name: 'Retail Exec', icon: Store, color: 'bg-[#ec4899]' },
  ];

  const radarData = [
    { vector: 'Product', 'P&G Average': 85, 'Competitor Average': 72 },
    { vector: 'Packaging', 'P&G Average': 68, 'Competitor Average': 65 },
    { vector: 'Value', 'P&G Average': 78, 'Competitor Average': 70 },
    { vector: 'Communication', 'P&G Average': 72, 'Competitor Average': 68 },
    { vector: 'Retail Exec', 'P&G Average': 65, 'Competitor Average': 63 },
  ];

  const productVectorBreakdown = pngProducts.map((p) => ({
    name: p.name.split(' ')[0],
    Product: 85 + Math.random() * 15,
    Packaging: 60 + Math.random() * 20,
    Value: 70 + Math.random() * 30,
    Communication: 65 + Math.random() * 20,
    'Retail Exec': 60 + Math.random() * 15,
  }));

  return (
    <Layout>
      <div className="p-8 space-y-6">
        <NotificationBanner />

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">5 Vectors of Superiority Mapping</h1>
          <p className="text-sm text-slate-500 font-medium">Lazada PH Fabric: Product, Packaging, Value, Communication, and Retail Execution</p>
        </div>

        {/* Vector Overview Cards */}
        <div className="grid gap-4 md:grid-cols-5">
          {vectors.map((vector, index) => {
            const scores = [85, 68, 78, 72, 65];
            const Icon = vector.icon;
            return (
              <Card key={vector.name} className="shadow-sm border-slate-200 bg-white">
                <CardContent className="pt-6">
                  <div className="mb-4 flex items-center justify-between">
                    <Icon className="h-4 w-4 text-slate-400" />
                    <span className="text-xl font-bold text-slate-900">{scores[index]}</span>
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{vector.name}</p>
                  <div className="mt-3 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${vector.color}`} style={{ width: `${scores[index]}%` }} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Radar Chart */}
        <Card className="shadow-sm border-slate-200 bg-white">
          <CardHeader className="pb-0">
            <CardTitle className="text-lg font-bold text-slate-800">P&G vs. Competitor Average Across All Vectors</CardTitle>
          </CardHeader>
          <CardContent className="h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="vector" fontSize={11} tick={{ fill: '#64748b', fontWeight: 600 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} fontSize={10} tick={{ fill: '#94a3b8' }} />
                <Radar
                  name="P&G Average"
                  dataKey="P&G Average"
                  stroke="#003da5"
                  fill="#003da5"
                  fillOpacity={0.4}
                  strokeWidth={2}
                />
                <Radar
                  name="Competitor Average"
                  dataKey="Competitor Average"
                  stroke="#94a3b8"
                  fill="#94a3b8"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Legend 
                  iconType="rect" 
                  wrapperStyle={{ paddingTop: '30px', fontWeight: 600, fontSize: '12px' }} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart Breakdown */}
        <Card className="shadow-sm border-slate-200 bg-white">
          <CardHeader className="pb-0">
            <CardTitle className="text-lg font-bold text-slate-800">Vector Scores by SKU</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productVectorBreakdown} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} dy={10} />
                <YAxis fontSize={10} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip cursor={{ fill: '#f9fafb' }} />
                <Legend verticalAlign="bottom" align="center" iconType="rect" wrapperStyle={{ paddingTop: '30px', fontSize: '11px' }} />
                <Bar dataKey="Product" fill="#3b82f6" barSize={35} radius={[2, 2, 0, 0]} />
                <Bar dataKey="Packaging" fill="#22c55e" barSize={35} radius={[2, 2, 0, 0]} />
                <Bar dataKey="Value" fill="#a855f7" barSize={35} radius={[2, 2, 0, 0]} />
                <Bar dataKey="Communication" fill="#f97316" barSize={35} radius={[2, 2, 0, 0]} />
                <Bar dataKey="Retail Exec" fill="#ec4899" barSize={35} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

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
import { pngProducts, sampleReviews } from '@/data/mockData';
import { Package, Box, DollarSign, MessageSquare, Store } from 'lucide-react';

export default function SuperiorityMapping() {
  const vectors = [
    { name: 'Product', icon: Package, color: 'bg-[#3b82f6]' },
    { name: 'Packaging', icon: Box, color: 'bg-[#22c55e]' },
    { name: 'Value', icon: DollarSign, color: 'bg-[#a855f7]' },
    { name: 'Communication', icon: MessageSquare, color: 'bg-[#f97316]' },
    { name: 'Retail Execution', icon: Store, color: 'bg-[#ec4899]' },
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
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">5 Vectors of Superiority Mapping</h1>
          <p className="text-sm text-gray-500">Auto-tagging reviews across Product, Packaging, Value, Communication, and Retail Execution</p>
        </div>

        {/* Vector Overview Cards */}
        <div className="grid gap-4 md:grid-cols-5">
          {vectors.map((vector, index) => {
            const scores = [85, 68, 78, 72, 65];
            const Icon = vector.icon;
            return (
              <Card key={vector.name} className="shadow-sm border-gray-200">
                <CardContent className="pt-6">
                  <div className="mb-4 flex items-center justify-between">
                    <Icon className="h-4 w-4 text-gray-400" />
                    <span className="text-xl font-bold text-gray-900">{scores[index]}</span>
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{vector.name}</p>
                  <div className="mt-3 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${vector.color}`} style={{ width: `${scores[index]}%` }} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Radar Chart */}
        <Card className="shadow-sm border-gray-200">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm font-semibold text-gray-700">P&G vs. Competitor Average Across All Vectors</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="vector" fontSize={10} tick={{ fill: '#6b7280' }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} fontSize={10} tick={{ fill: '#9ca3af' }} />
                <Radar
                  name="P&G Average"
                  dataKey="P&G Average"
                  stroke="#003da5"
                  fill="#003da5"
                  fillOpacity={0.4}
                />
                <Radar
                  name="Competitor Average"
                  dataKey="Competitor Average"
                  stroke="#94a3b8"
                  fill="#94a3b8"
                  fillOpacity={0.2}
                />
                <Legend iconType="rect" wrapperStyle={{ fontSize: '10px', paddingTop: '20px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart Breakdown */}
        <Card className="shadow-sm border-gray-200">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm font-semibold text-gray-700">Vector Scores by Product</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productVectorBreakdown} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} dy={10} />
                <YAxis fontSize={10} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip cursor={{ fill: '#f9fafb' }} />
                <Legend verticalAlign="bottom" align="center" iconType="rect" wrapperStyle={{ fontSize: '10px', paddingTop: '30px' }} />
                <Bar dataKey="Product" fill="#3b82f6" barSize={30} />
                <Bar dataKey="Packaging" fill="#22c55e" barSize={30} />
                <Bar dataKey="Value" fill="#a855f7" barSize={30} />
                <Bar dataKey="Communication" fill="#f97316" barSize={30} />
                <Bar dataKey="Retail Exec" fill="#ec4899" barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Detailed Vector Analysis */}
        <Card className="shadow-sm border-gray-200 overflow-hidden">
          <CardHeader className="bg-gray-50 py-3">
            <CardTitle className="text-sm font-semibold text-gray-700">Detailed Vector Analysis</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="product" className="w-full">
              <TabsList className="flex w-full bg-gray-50 border-b rounded-none h-10 p-0">
                <TabsTrigger value="product" className="flex-1 rounded-none data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-600 text-[10px] font-bold uppercase">Product</TabsTrigger>
                <TabsTrigger value="packaging" className="flex-1 rounded-none data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-600 text-[10px] font-bold uppercase">Packaging</TabsTrigger>
                <TabsTrigger value="value" className="flex-1 rounded-none data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-600 text-[10px] font-bold uppercase">Value</TabsTrigger>
                <TabsTrigger value="communication" className="flex-1 rounded-none data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-600 text-[10px] font-bold uppercase">Communication</TabsTrigger>
                <TabsTrigger value="retail" className="flex-1 rounded-none data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-600 text-[10px] font-bold uppercase text-nowrap">Retail Exec</TabsTrigger>
              </TabsList>

              <div className="p-6">
                <TabsContent value="product" className="mt-0 space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 mb-1">What We Measure</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">Product performance, effectiveness, quality, features, and core functionality mentioned in reviews.</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 mb-2">Example Keywords (Taglish)</h4>
                    <div className="flex flex-wrap gap-2">
                      {['effective', 'gumana', 'quality', 'natanggal ang mantsa', 'mabango', 'maayos'].map(k => (
                        <Badge key={k} variant="secondary" className="text-[9px] bg-gray-100 text-gray-600 border-none font-mono py-0">{k}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 mb-1">Top Performing Product</h4>
                    <p className="text-xs text-gray-600 font-medium">Downy Fabric Conditioner - 98/100 product vector score</p>
                  </div>
                </TabsContent>
                <TabsContent value="packaging" className="mt-0">
                  <p className="text-xs text-gray-500">Packaging analysis includes durability, aesthetics, and ease of use as reported by customers.</p>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* Auto-Tagging Methodology */}
        <Card className="shadow-sm border-gray-200">
          <CardHeader className="bg-gray-50 py-3">
            <CardTitle className="text-sm font-semibold text-gray-700">Auto-Tagging Methodology</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              {[
                { step: "1", title: "Text Preprocessing", desc: "Reviews are tokenized with Taglish-aware processing" },
                { step: "2", title: "Vector Classification", desc: "Sentences are mapped to vectors using semantic models" },
                { step: "3", title: "Score Calculation", desc: "Sentiment intensity is measured for each vector" },
                { step: "4", title: "Aggregation", desc: "Metrics are weighted by review volume and confidence" }
              ].map(item => (
                <div key={item.step} className="space-y-2">
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-widest">{item.title}</div>
                  <p className="text-[10px] text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
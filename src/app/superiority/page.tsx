
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
import { Package, Box, DollarSign, MessageSquare, Store, Info } from 'lucide-react';

export default function SuperiorityMappingPage() {
  const vectors = [
    { name: 'Product', icon: Package, color: 'bg-blue-500' },
    { name: 'Packaging', icon: Box, color: 'bg-green-500' },
    { name: 'Value', icon: DollarSign, color: 'bg-purple-500' },
    { name: 'Communication', icon: MessageSquare, color: 'bg-orange-500' },
    { name: 'Retail Execution', icon: Store, color: 'bg-pink-500' },
  ];

  const radarData = [
    { vector: 'Product', 'P&G Avg': 85, 'Competitor Avg': 72 },
    { vector: 'Packaging', 'P&G Avg': 68, 'Competitor Avg': 65 },
    { vector: 'Value', 'P&G Avg': 78, 'Competitor Avg': 70 },
    { vector: 'Communication', 'P&G Avg': 72, 'Competitor Avg': 68 },
    { vector: 'Retail Exec', 'P&G Avg': 65, 'Competitor Avg': 63 },
  ];

  const productVectorBreakdown = pngProducts.map((p) => ({
    name: p.name.split(' ')[0],
    Product: 85 + Math.random() * 10,
    Packaging: 60 + Math.random() * 20,
    Value: 70 + Math.random() * 15,
    Communication: 65 + Math.random() * 15,
    'Retail Exec': 60 + Math.random() * 10,
  }));

  return (
    <Layout>
      <div className="p-8 space-y-8 animate-in fade-in duration-500">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold font-headline mb-2">5 Vectors of Superiority</h1>
          <p className="text-muted-foreground font-medium">
            Auto-tagging reviews across Product, Packaging, Value, Communication, and Retail Execution
          </p>
        </div>

        {/* Vector Overview Cards */}
        <div className="grid gap-4 md:grid-cols-5">
          {vectors.map((vector, index) => {
            const scores = [85, 68, 78, 72, 65];
            const Icon = vector.icon;
            return (
              <Card key={vector.name} className="bg-card/40 border-border/50">
                <CardContent className="pt-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-muted/50">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <span className="text-2xl font-bold font-mono">{scores[index]}</span>
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{vector.name}</p>
                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted/30">
                    <div className={`h-full ${vector.color}`} style={{ width: `${scores[index]}%` }} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Radar Chart */}
          <Card className="border-border/50 bg-card/40">
            <CardHeader>
              <CardTitle className="text-lg font-bold">P&G vs. Competitor Benchmark</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.05)" />
                  <PolarAngleAxis dataKey="vector" stroke="rgba(255,255,255,0.3)" fontSize={10} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="rgba(255,255,255,0.1)" />
                  <Radar
                    name="P&G Average"
                    dataKey="P&G Avg"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                  />
                  <Radar
                    name="Competitor Average"
                    dataKey="Competitor Avg"
                    stroke="rgba(255,255,255,0.2)"
                    fill="rgba(255,255,255,0.1)"
                    fillOpacity={0.1}
                  />
                  <Legend />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Bar Chart Breakdown */}
          <Card className="border-border/50 bg-card/40">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Vector Scores by Product</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productVectorBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={10} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
                  <Legend />
                  <Bar dataKey="Product" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="Packaging" fill="#22c55e" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="Value" fill="#a855f7" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Vector Analysis */}
        <Card className="border-border/50 bg-card/40">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Vector Definitions & AI Logic</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="product">
              <TabsList className="grid w-full grid-cols-5 bg-muted/20 h-11 p-1">
                <TabsTrigger value="product" className="text-[10px] uppercase font-bold tracking-widest">Product</TabsTrigger>
                <TabsTrigger value="packaging" className="text-[10px] uppercase font-bold tracking-widest">Packaging</TabsTrigger>
                <TabsTrigger value="value" className="text-[10px] uppercase font-bold tracking-widest">Value</TabsTrigger>
                <TabsTrigger value="communication" className="text-[10px] uppercase font-bold tracking-widest">Comm</TabsTrigger>
                <TabsTrigger value="retail" className="text-[10px] uppercase font-bold tracking-widest">Retail</TabsTrigger>
              </TabsList>

              <TabsContent value="product" className="mt-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-primary flex items-center gap-2 uppercase tracking-widest">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      What We Measure
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Core performance, effectiveness, quality, and functional reliability mentioned in reviews. Our model distinguishes between "mabango" (scent) and "linis" (performance).
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-primary flex items-center gap-2 uppercase tracking-widest">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      Keywords
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['effective', 'gumana', 'quality', 'natanggal ang mantsa', 'mabango'].map(k => (
                        <Badge key={k} variant="secondary" className="text-[9px] font-mono px-2 py-0">{k}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="packaging" className="mt-8">
                <div className="p-4 rounded-xl bg-muted/20 border border-white/5 flex gap-4">
                    <Info className="h-5 w-5 text-primary shrink-0" />
                    <p className="text-sm text-muted-foreground">Packaging analysis identifies leak issues and container usability problems using visual pattern recognition and NLP extraction.</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

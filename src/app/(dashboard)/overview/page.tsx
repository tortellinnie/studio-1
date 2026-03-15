
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  BarChart,
  Bar,
  Legend
} from "recharts";
import { 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  Info
} from "lucide-react";
import { pngProducts, multiBrandTrends } from "@/data/mockData";
import { cn } from "@/lib/utils";

const sentimentDist = [
  { name: 'Positive', value: 68, color: '#10b981' },
  { name: 'Neutral', value: 22, color: '#f59e0b' },
  { name: 'Negative', value: 10, color: '#ef4444' },
];

const vectorAvg = [
  { name: 'Product', 'P&G Average': 85, 'Competitor Average': 72 },
  { name: 'Packaging', 'P&G Average': 68, 'Competitor Average': 65 },
  { name: 'Value', 'P&G Average': 78, 'Competitor Average': 70 },
  { name: 'Communication', 'P&G Average': 72, 'Competitor Average': 68 },
  { name: 'Retail Execution', 'P&G Average': 65, 'Competitor Average': 63 },
];

export default function OverviewPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-[1600px] mx-auto pb-16">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold font-headline text-slate-900">Mission Control</h1>
        <p className="text-xl font-medium text-slate-500">Real-time P&G e-commerce performance analytics</p>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Reviews", value: "14,709", sub: "Lazada PH Catalog", color: "text-blue-600" },
          { title: "Avg Corrected Rating", value: "4.20", sub: "NLP Adjusted Score", color: "text-emerald-600" },
          { title: "Rating Inflation", value: "14.8%", sub: "Platform Bias Offset", color: "text-orange-600" },
          { title: "Positive Sentiment", value: "68%", sub: "+3% vs Last Month", color: "text-emerald-600" },
        ].map((item, i) => (
          <Card key={i} className="border-border/50 shadow-md bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={cn("text-5xl font-black", item.color)}>{item.value}</div>
              <p className="text-base text-slate-500 font-bold mt-4 uppercase tracking-tight">{item.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-border/50 shadow-md bg-white">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-slate-800">Historical Sentiment Trends</CardTitle>
            <CardDescription className="text-lg">Monthly performance tracking vs key competitors</CardDescription>
          </CardHeader>
          <CardContent className="h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={multiBrandTrends}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={16} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#94a3b8" fontSize={16} tickLine={false} axisLine={false} domain={[50, 80]} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 16px rgba(0,0,0,0.1)', fontSize: '16px' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '30px', fontSize: '18px', fontWeight: 600 }} />
                <Line type="monotone" dataKey="P&G" stroke="#003da5" strokeWidth={5} dot={{ r: 6, fill: '#003da5' }} activeDot={{ r: 9 }} />
                <Line type="monotone" dataKey="Surf" stroke="#94a3b8" strokeWidth={3} strokeDasharray="6 6" />
                <Line type="monotone" dataKey="Breeze" stroke="#cbd5e1" strokeWidth={3} strokeDasharray="6 6" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-md bg-white">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-slate-800">Sentiment Distribution</CardTitle>
            <CardDescription className="text-lg">Overall portfolio health</CardDescription>
          </CardHeader>
          <CardContent className="h-[500px] flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="350">
              <PieChart>
                <Pie
                  data={sentimentDist}
                  cx="50%"
                  cy="50%"
                  innerRadius={100}
                  outerRadius={140}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {sentimentDist.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="w-full mt-10 grid grid-cols-3 gap-6">
              {sentimentDist.map((item) => (
                <div key={item.name} className="flex flex-col items-center">
                  <span className="text-xs font-black text-slate-400 uppercase mb-2 tracking-widest">{item.name}</span>
                  <span className="text-3xl font-black" style={{ color: item.color }}>{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vector & Top Product Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-border/50 shadow-md bg-white">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-slate-800">5 Vectors of Superiority</CardTitle>
            <CardDescription className="text-lg">Benchmarking vs competitor average</CardDescription>
          </CardHeader>
          <CardContent className="h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={vectorAvg} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={16} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#94a3b8" fontSize={16} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip cursor={{ fill: '#f8fafc' }} />
                <Legend iconType="rect" wrapperStyle={{ paddingTop: '30px', fontSize: '18px', fontWeight: 600 }} />
                <Bar dataKey="P&G Average" fill="#003da5" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Competitor Average" fill="#cbd5e1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-md bg-white">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-slate-800">Top Performing SKUs</CardTitle>
            <CardDescription className="text-lg">Ranked by corrected rating</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {pngProducts.slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center justify-between p-8 hover:bg-slate-50 transition-colors">
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-slate-900">{product.name}</p>
                    <p className="text-sm font-black text-slate-400 uppercase tracking-widest">{product.reviewCount.toLocaleString()} verified reviews</p>
                  </div>
                  <div className="flex items-center gap-12">
                    <div className="text-right">
                      <p className="text-xs font-black text-slate-300 uppercase tracking-widest">Original</p>
                      <p className="text-xl font-bold text-slate-400 font-mono">{product.originalRating}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Corrected</p>
                      <p className="text-3xl font-black text-emerald-600 font-mono">{product.correctedRating}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Insights Section */}
      <Card className="border-border/50 shadow-lg bg-slate-50/50">
        <CardHeader className="pb-8">
          <CardTitle className="text-sm font-black text-slate-400 uppercase tracking-[0.4em]">Strategic Intelligence Recap</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-10">
          {[
            { text: "Downy leads sentiment: 78% positive reviews with highest product vector score (0.98)", icon: CheckCircle2, color: "text-emerald-500" },
            { text: "Safeguard needs attention: Only 62% positive sentiment, packaging concerns detected in Taglish reviews", icon: AlertCircle, color: "text-orange-500" },
            { text: "Value proposition strong: P&G products score 78/100 on value vector, outperforming competitors by 8 points", icon: TrendingUp, color: "text-blue-500" },
            { text: "Correction reveals: Ariel's true performance is 4.3/5.0, filtering out ~14% rating inflation on Lazada", icon: Info, color: "text-slate-500" },
          ].map((insight, i) => (
            <div key={i} className="flex items-start gap-8 p-10 bg-white rounded-3xl shadow-sm border border-slate-100">
              <insight.icon className={cn("h-10 w-10 shrink-0 mt-1", insight.color)} />
              <div className="space-y-3">
                <p className="text-2xl font-black text-slate-900 leading-tight">
                   {insight.text.split(':')[0]}:
                </p>
                <p className="text-lg font-medium text-slate-600 leading-relaxed">
                  {insight.text.split(':')[1]}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

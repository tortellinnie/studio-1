
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
  Info,
  ArrowUpRight,
  Smile,
  Frown,
  Meh
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
    <div className="space-y-6 animate-in fade-in duration-500 max-w-[1600px] mx-auto pb-10">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold font-headline text-slate-900">Dashboard Overview</h1>
        <p className="text-sm font-medium text-slate-500">GenAI-powered insights for P&G e-commerce performance</p>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Total Reviews Analyzed", value: "14,709", sub: "Across all P&G products", icon: CheckCircle2, color: "text-blue-500" },
          { title: "Avg Corrected Rating", value: "4.20", sub: "vs 4.82 original", icon: TrendingUp, color: "text-emerald-500" },
          { title: "Rating Inflation", value: "14.8%", sub: "Lazada's 5-star bias", icon: AlertCircle, color: "text-orange-500" },
          { title: "Positive Sentiment", value: "68%", sub: "+3% from last month", icon: Smile, color: "text-emerald-500" },
        ].map((item, i) => (
          <Card key={i} className="border-border/50 shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.title}</CardTitle>
              <item.icon className={cn("h-4 w-4", item.color)} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-slate-900">{item.value}</div>
              <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-tight">{item.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold text-slate-800">Sentiment Trends (6 Months)</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={multiBrandTrends}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} domain={[50, 80]} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '10px' }} />
                <Line type="monotone" dataKey="P&G" stroke="#003da5" strokeWidth={3} dot={{ r: 4, fill: '#003da5' }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="Surf" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" />
                <Line type="monotone" dataKey="Breeze" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold text-slate-800">Overall Sentiment Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="200">
              <PieChart>
                <Pie
                  data={sentimentDist}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sentimentDist.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="w-full mt-6 grid grid-cols-3 gap-2">
              {sentimentDist.map((item) => (
                <div key={item.name} className="flex flex-col items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{item.name}</span>
                  <span className="text-sm font-black" style={{ color: item.color }}>{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vector & Top Product Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold text-slate-800">5 Vectors of Superiority</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={vectorAvg} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip cursor={{ fill: '#f8fafc' }} />
                <Legend iconType="rect" wrapperStyle={{ paddingTop: '20px', fontSize: '10px' }} />
                <Bar dataKey="P&G Average" fill="#003da5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Competitor Average" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold text-slate-800">Top Performing Products</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {pngProducts.slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-900">{product.name}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">{product.reviewCount.toLocaleString()} reviews</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-slate-400 font-mono">{product.originalRating}</span>
                    <span className="text-xs font-black text-emerald-600 font-mono">{product.correctedRating}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Insights Section */}
      <Card className="border-border/50 shadow-sm bg-slate-50/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-widest">Key Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { text: "Downy leads sentiment: 78% positive reviews with highest product vector score (0.98)", icon: CheckCircle2, color: "text-emerald-500" },
            { text: "Safeguard needs attention: Only 62% positive sentiment, packaging concerns detected in Taglish reviews", icon: AlertCircle, color: "text-orange-500" },
            { text: "Value proposition strong: P&G products score 78/100 on value vector, outperforming competitors by 8 points", icon: TrendingUp, color: "text-blue-500" },
            { text: "Sentiment-corrected rankings reveal: Ariel's true performance is 4.3/5.0, not the inflated 4.8/5.0 from Lazada", icon: Info, color: "text-slate-500" },
          ].map((insight, i) => (
            <div key={i} className="flex items-start gap-3">
              <insight.icon className={cn("h-4 w-4 shrink-0 mt-0.5", insight.color)} />
              <p className="text-xs font-medium text-slate-700 leading-relaxed">
                {insight.text.split(':').map((part, index) => (
                  index === 0 ? <strong key={index} className="text-slate-900">{part}:</strong> : part
                ))}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

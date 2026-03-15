
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  CheckCircle2, 
  TrendingUp, 
  AlertCircle, 
  Smile,
  Meh,
  Frown,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import { pngProducts } from "@/data/mockData";

const trendData = [
  { month: 'Sep 2025', positive: 62, neutral: 25, negative: 13 },
  { month: 'Oct 2025', positive: 65, neutral: 23, negative: 12 },
  { month: 'Nov 2025', positive: 68, neutral: 21, negative: 11 },
  { month: 'Dec 2025', positive: 70, neutral: 20, negative: 10 },
  { month: 'Jan 2026', positive: 69, neutral: 21, negative: 10 },
  { month: 'Mar 2026', positive: 72, neutral: 18, negative: 10 }
];

const distributionData = [
  { name: 'Positive', value: 68, color: '#22c55e' },
  { name: 'Neutral', value: 22, color: '#f59e0b' },
  { name: 'Negative', value: 10, color: '#ef4444' },
];

const vectorData = [
  { name: 'Product', 'P&G Average': 85, 'Competitor Average': 72 },
  { name: 'Packaging', 'P&G Average': 68, 'Competitor Average': 65 },
  { name: 'Value', 'P&G Average': 78, 'Competitor Average': 70 },
  { name: 'Retail Execution', 'P&G Average': 72, 'Competitor Average': 68 },
];

export default function OverviewPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-[1400px] mx-auto">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-sm text-muted-foreground">GenAI-powered insights for P&G e-commerce performance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Total Reviews Analyzed", value: "14,709", sub: "Across all P&G products", icon: CheckCircle2, iconColor: "text-muted-foreground/50" },
          { title: "Avg Corrected Rating", value: "4.20", sub: "vs 4.82 original", icon: TrendingUp, iconColor: "text-emerald-500" },
          { title: "Rating Inflation", value: "14.8%", sub: "Lazada's 5-star bias", icon: AlertCircle, iconColor: "text-orange-500" },
          { title: "Positive Sentiment", value: "68%", sub: "+3% from last month", icon: Smile, iconColor: "text-emerald-500" },
        ].map((item, i) => (
          <Card key={i} className="shadow-sm border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-semibold">{item.title}</CardTitle>
              <item.icon className={cn("h-4 w-4", item.iconColor)} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-[11px] text-muted-foreground mt-1">{item.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Taglish-Aware AI Sentiment Analysis Section */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight">Taglish-Aware AI Sentiment Analysis</h2>
          <p className="text-sm text-muted-foreground">Advanced NLP model trained on Filipino-English code-switching patterns</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-sm border-l-4 border-l-emerald-500 border-slate-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Smile className="h-4 w-4 text-emerald-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Positive Sentiment</span>
              </div>
              <div className="text-3xl font-bold">68%</div>
              <div className="text-xs text-muted-foreground mt-1">9,876 reviews</div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-l-4 border-l-orange-500 border-slate-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Meh className="h-4 w-4 text-orange-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Neutral Sentiment</span>
              </div>
              <div className="text-3xl font-bold">22%</div>
              <div className="text-xs text-muted-foreground mt-1">3,198 reviews</div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-l-4 border-l-red-500 border-slate-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Frown className="h-4 w-4 text-red-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Negative Sentiment</span>
              </div>
              <div className="text-3xl font-bold">10%</div>
              <div className="text-xs text-muted-foreground mt-1">1,453 reviews</div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-sm border-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-600">Product-Level Sentiment Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {pngProducts.map((product) => (
              <div key={product.id} className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-slate-900">{product.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">{product.reviewCount.toLocaleString()} reviews analyzed</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-6">
                  {/* Positive Column */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase">
                      <span className="text-emerald-600">Positive</span>
                      <span className="text-slate-900">{product.sentimentDistribution.positive}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: `${product.sentimentDistribution.positive}%` }} />
                    </div>
                  </div>

                  {/* Neutral Column */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase">
                      <span className="text-orange-500">Neutral</span>
                      <span className="text-slate-900">{product.sentimentDistribution.neutral}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500" style={{ width: `${product.sentimentDistribution.neutral}%` }} />
                    </div>
                  </div>

                  {/* Negative Column */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase">
                      <span className="text-red-500">Negative</span>
                      <span className="text-slate-900">{product.sentimentDistribution.negative}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500" style={{ width: `${product.sentimentDistribution.negative}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Analytics Visualization Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-600">Sentiment Trends (6 Months)</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#888" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#888" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                <Line type="monotone" dataKey="positive" stroke="#22c55e" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="neutral" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="negative" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-600">5 Vectors of Superiority</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={vectorData} margin={{ bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#888" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#888" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: '#f8fafc' }} />
                <Legend verticalAlign="bottom" height={36} iconType="rect" />
                <Bar dataKey="P&G Average" fill="#003da5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Competitor Average" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

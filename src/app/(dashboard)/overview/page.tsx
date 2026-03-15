
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
  Smile
} from "lucide-react";
import { cn } from "@/lib/utils";

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

const topProducts = [
  { name: 'Downy Fabric Conditioner', reviews: '4521 reviews', original: '4.9', corrected: '4.5' },
  { name: 'Ariel Liquid Detergent', reviews: '3124 reviews', original: '4.8', corrected: '4.3' },
  { name: 'Tide Powder Detergent', reviews: '2847 reviews', original: '4.9', corrected: '4.2' },
  { name: 'Joy Dishwashing Liquid', reviews: '2341 reviews', original: '4.8', corrected: '4.1' },
  { name: 'Safeguard Bar Soap', reviews: '1876 reviews', original: '4.7', corrected: '3.9' },
];

export default function OverviewPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
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
          <Card key={i} className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-semibold">{item.title}</CardTitle>
              <item.icon className={cn("h-4 w-4", item.iconColor)} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{item.value}</div>
              <p className="text-[11px] text-muted-foreground mt-1">{item.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-semibold">Sentiment Trends (6 Months)</CardTitle>
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

        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-semibold">Overall Sentiment Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={distributionData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value">
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="flex flex-col space-y-2 text-[11px] font-bold">
                <span className="text-emerald-600">Positive: 68%</span>
                <span className="text-orange-500">Neutral: 22%</span>
                <span className="text-red-500">Negative: 10%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-semibold">5 Vectors of Superiority</CardTitle>
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

        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-semibold">Top Performing Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, i) => (
                <div key={i} className="flex items-center justify-between border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-slate-900">{product.name}</p>
                    <p className="text-[11px] text-muted-foreground">{product.reviews}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[11px] text-muted-foreground">{product.original}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-emerald-600">{product.corrected}</span>
                      <TrendingUp className="h-3 w-3 text-emerald-500" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

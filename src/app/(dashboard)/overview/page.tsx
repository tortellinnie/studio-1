
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
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  CheckCircle2, 
  TrendingUp, 
  AlertCircle, 
  ArrowUpRight,
  TrendingDown,
  Zap
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
  { name: 'Negative', value: 10, color: '#ef4444' }
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
    <div className="space-y-10 animate-in fade-in duration-500 max-w-[1400px] mx-auto pb-10">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard Overview</h1>
        <p className="text-base text-muted-foreground">GenAI-powered insights for P&G e-commerce performance</p>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Reviews Analyzed", value: "14,709", sub: "Across all P&G products", icon: CheckCircle2, iconColor: "text-slate-400" },
          { title: "Avg Corrected Rating", value: "4.20", sub: "vs 4.82 original", icon: TrendingUp, iconColor: "text-emerald-500" },
          { title: "Rating Inflation", value: "14.8%", sub: "Lazada's 5-star bias", icon: AlertCircle, iconColor: "text-orange-500" },
          { title: "Positive Sentiment", value: "68%", sub: "+3% from last month", icon: TrendingUp, iconColor: "text-emerald-500" },
        ].map((item, i) => (
          <Card key={i} className="shadow-sm border-slate-200 bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-3 space-y-0">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500">{item.title}</CardTitle>
              <item.icon className={cn("h-5 w-5", item.iconColor)} />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-extrabold text-slate-900">{item.value}</div>
              <p className="text-xs text-muted-foreground font-medium mt-2">{item.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-base font-bold text-slate-900">Sentiment Trends (6 Months)</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#888" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#888" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip />
                <Legend verticalAlign="bottom" align="center" iconType="circle" />
                <Line type="monotone" dataKey="positive" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="neutral" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="negative" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-base font-bold text-slate-900">Overall Sentiment Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-extrabold text-slate-900">68%</span>
              <span className="text-xs font-bold text-emerald-500 uppercase">Positive</span>
            </div>
            <div className="flex justify-center gap-6 mt-4">
               {distributionData.map((item) => (
                 <div key={item.name} className="flex items-center gap-2">
                   <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                   <span className="text-xs font-bold text-slate-600">{item.name}: {item.value}%</span>
                 </div>
               ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-base font-bold text-slate-900">5 Vectors of Superiority</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={vectorData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#888" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#888" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip />
                <Legend verticalAlign="bottom" align="center" iconType="rect" />
                <Bar dataKey="P&G Average" fill="#003da5" barSize={32} radius={[2, 2, 0, 0]} />
                <Bar dataKey="Competitor Average" fill="#94a3b8" barSize={32} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-base font-bold text-slate-900">Top Performing Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: "Downy Fabric Conditioner", reviews: "4521 reviews", original: 4.9, corrected: 4.5 },
                { name: "Ariel Liquid Detergent", reviews: "3124 reviews", original: 4.8, corrected: 4.3 },
                { name: "Tide Powder Detergent", reviews: "2847 reviews", original: 4.9, corrected: 4.2 },
                { name: "Joy Dishwashing Liquid", reviews: "2341 reviews", original: 4.8, corrected: 4.1 },
                { name: "Safeguard Bar Soap", reviews: "1876 reviews", original: 4.7, corrected: 3.9 },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-900 group-hover:text-[#003da5] transition-colors">{item.name}</p>
                    <p className="text-xs text-slate-400 font-medium">{item.reviews}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-slate-400">{item.original.toFixed(1)}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-emerald-600">{item.corrected.toFixed(1)}</span>
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


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
  Smile, 
  Meh, 
  Frown,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

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

const productSentiment = [
  { name: "Downy Fabric Conditioner", reviews: "4521 reviews analyzed", pos: 78, neu: 15, neg: 7 },
  { name: "Ariel Liquid Detergent", reviews: "3124 reviews analyzed", pos: 72, neu: 18, neg: 10 },
  { name: "Tide Powder Detergent", reviews: "2847 reviews analyzed", pos: 68, neu: 22, neg: 10 },
  { name: "Joy Dishwashing Liquid", reviews: "2341 reviews analyzed", pos: 65, neu: 24, neg: 11 },
  { name: "Safeguard Bar Soap", reviews: "1876 reviews analyzed", pos: 62, neu: 25, neg: 13 },
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

      {/* Taglish-Aware AI Sentiment Analysis */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Taglish-Aware AI Sentiment Analysis</h2>
          <p className="text-sm text-muted-foreground">Advanced NLP model trained on Filipino-English code-switching patterns</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-l-4 border-l-[#22c55e] shadow-sm">
            <CardContent className="pt-8 space-y-2">
              <div className="flex items-center gap-2 text-[#22c55e]">
                <Smile className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Positive Sentiment</span>
              </div>
              <div className="text-4xl font-extrabold text-slate-900">68%</div>
              <p className="text-xs text-slate-400 font-medium">9,876 reviews</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-[#f59e0b] shadow-sm">
            <CardContent className="pt-8 space-y-2">
              <div className="flex items-center gap-2 text-[#f59e0b]">
                <Meh className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Neutral Sentiment</span>
              </div>
              <div className="text-4xl font-extrabold text-slate-900">22%</div>
              <p className="text-xs text-slate-400 font-medium">3,198 reviews</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-[#ef4444] shadow-sm">
            <CardContent className="pt-8 space-y-2">
              <div className="flex items-center gap-2 text-[#ef4444]">
                <Frown className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Negative Sentiment</span>
              </div>
              <div className="text-4xl font-extrabold text-slate-900">10%</div>
              <p className="text-xs text-slate-400 font-medium">1,453 reviews</p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-sm border-slate-200">
          <CardHeader className="border-b border-slate-50 py-6">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">Product-Level Sentiment Distribution</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-50">
              {productSentiment.map((item, i) => (
                <div key={i} className="p-8 space-y-4 hover:bg-slate-50/50 transition-colors">
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-slate-900">{item.name}</h4>
                    <p className="text-xs text-slate-400 font-medium">{item.reviews}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                        <span className="text-[#22c55e]">Positive</span>
                        <span className="text-slate-900">{item.pos}%</span>
                      </div>
                      <Progress value={item.pos} className="h-1.5 bg-slate-100" indicatorClassName="bg-[#22c55e]" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                        <span className="text-[#f59e0b]">Neutral</span>
                        <span className="text-slate-900">{item.neu}%</span>
                      </div>
                      <Progress value={item.neu} className="h-1.5 bg-slate-100" indicatorClassName="bg-[#f59e0b]" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                        <span className="text-[#ef4444]">Negative</span>
                        <span className="text-slate-900">{item.neg}%</span>
                      </div>
                      <Progress value={item.neg} className="h-1.5 bg-slate-100" indicatorClassName="bg-[#ef4444]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
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


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
  Legend
} from "recharts";
import { 
  CheckCircle2, 
  TrendingUp, 
  AlertCircle, 
  Smile,
  Meh,
  Frown,
  AlertTriangle,
  ArrowUpRight,
  TrendingDown,
  Activity,
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

const vectorData = [
  { name: 'Product', 'P&G Average': 85, 'Competitor Average': 72 },
  { name: 'Packaging', 'P&G Average': 68, 'Competitor Average': 65 },
  { name: 'Value', 'P&G Average': 78, 'Competitor Average': 70 },
  { name: 'Retail Execution', 'P&G Average': 72, 'Competitor Average': 68 },
];

const sentimentAlerts = [
  {
    id: 1,
    product: "Safeguard Bar Soap",
    issue: "Declining sentiment (13% negative)",
    description: "Surge in skin irritation mentions in Taglish reviews.",
    status: "critical",
    icon: AlertTriangle,
    color: "text-red-600",
    bg: "bg-red-50"
  },
  {
    id: 2,
    product: "Tide Perfect Clean",
    issue: "Price perception issues",
    description: "45% of neutral reviews mention 'mahal' vs competitors.",
    status: "warning",
    icon: AlertCircle,
    color: "text-orange-600",
    bg: "bg-orange-50"
  },
  {
    id: 3,
    product: "Downy Sunrise Fresh",
    issue: "Positive Momentum",
    description: "High demand/positive momentum for long-lasting scent.",
    status: "success",
    icon: TrendingUp,
    color: "text-emerald-600",
    bg: "bg-emerald-50"
  }
];

export default function OverviewPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="space-y-12 animate-in fade-in duration-500 max-w-[1400px] mx-auto pb-10">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard Overview</h1>
        <p className="text-base text-muted-foreground">GenAI-powered insights for P&G e-commerce performance</p>
      </div>

      {/* Sentiment Alerts Section */}
      <div className="space-y-6">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
          <Zap className="h-3 w-3" /> Critical Sentiment Alerts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sentimentAlerts.map((alert) => (
            <Card key={alert.id} className={cn("border-l-4 shadow-sm hover:shadow-md transition-shadow", alert.status === 'critical' ? 'border-l-red-500' : alert.status === 'warning' ? 'border-l-orange-500' : 'border-l-emerald-500')}>
              <CardContent className="pt-8">
                <div className="flex items-start justify-between mb-6">
                  <div className={cn("p-2.5 rounded-xl", alert.bg)}>
                    <alert.icon className={cn("h-6 w-6", alert.color)} />
                  </div>
                  <button className="text-[10px] font-bold text-[#003da5] hover:opacity-80 flex items-center gap-1.5 uppercase tracking-widest border border-[#003da5]/10 px-3 py-1.5 rounded-lg bg-[#003da5]/5 transition-colors">
                    Analyze <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-bold text-slate-900">{alert.product}</p>
                  <p className={cn("text-[11px] font-bold uppercase tracking-tight", alert.color)}>{alert.issue}</p>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed pt-2 border-t border-slate-50 mt-4">{alert.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Reviews Analyzed", value: "14,709", sub: "Across all P&G products", icon: CheckCircle2, iconColor: "text-slate-400" },
          { title: "Avg Corrected Rating", value: "4.20", sub: "vs 4.82 original", icon: TrendingUp, iconColor: "text-emerald-500" },
          { title: "Rating Inflation", value: "14.8%", sub: "Lazada's 5-star bias", icon: AlertCircle, iconColor: "text-orange-500" },
          { title: "Positive Sentiment", value: "68%", sub: "+3% from last month", icon: Smile, iconColor: "text-emerald-500" },
        ].map((item, i) => (
          <Card key={i} className="shadow-sm border-slate-200 bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-3 space-y-0">
              <CardTitle className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{item.title}</CardTitle>
              <item.icon className={cn("h-4 w-4", item.iconColor)} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-slate-900">{item.value}</div>
              <p className="text-[11px] text-muted-foreground font-semibold mt-2 uppercase tracking-tight">{item.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Taglish-Aware AI Sentiment Analysis Section */}
      <div className="space-y-8 pt-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Taglish-Aware AI Sentiment Analysis</h2>
          <p className="text-base text-muted-foreground">Advanced NLP model trained on Filipino-English code-switching patterns</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-sm border-l-4 border-l-emerald-500 border-slate-200">
            <CardContent className="pt-8">
              <div className="flex items-center gap-3 mb-6">
                <Smile className="h-5 w-5 text-emerald-500" />
                <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-600">Positive Sentiment</span>
              </div>
              <div className="text-4xl font-extrabold text-slate-900">68%</div>
              <div className="text-xs text-muted-foreground mt-2 font-semibold">9,876 reviews</div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-l-4 border-l-orange-500 border-slate-200">
            <CardContent className="pt-8">
              <div className="flex items-center gap-3 mb-6">
                <Meh className="h-5 w-5 text-orange-500" />
                <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-600">Neutral Sentiment</span>
              </div>
              <div className="text-4xl font-extrabold text-slate-900">22%</div>
              <div className="text-xs text-muted-foreground mt-2 font-semibold">3,198 reviews</div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-l-4 border-l-red-500 border-slate-200">
            <CardContent className="pt-8">
              <div className="flex items-center gap-3 mb-6">
                <Frown className="h-5 w-5 text-red-500" />
                <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-600">Negative Sentiment</span>
              </div>
              <div className="text-4xl font-extrabold text-slate-900">10%</div>
              <div className="text-xs text-muted-foreground mt-2 font-semibold">1,453 reviews</div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-sm border-slate-200">
          <CardHeader className="pb-6 border-b border-slate-50">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-600">Product-Level Sentiment Distribution</CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-10">
            {pngProducts.map((product) => (
              <div key={product.id} className="space-y-4">
                <div className="flex items-baseline justify-between">
                  <div className="space-y-1">
                    <p className="text-base font-bold text-slate-900">{product.name}</p>
                    <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-bold">{product.reviewCount.toLocaleString()} reviews analyzed</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-bold uppercase">
                      <span className="text-emerald-600">Positive</span>
                      <span className="text-slate-900">{product.sentimentDistribution.positive}%</span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: `${product.sentimentDistribution.positive}%` }} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-bold uppercase">
                      <span className="text-orange-500">Neutral</span>
                      <span className="text-slate-900">{product.sentimentDistribution.neutral}%</span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500" style={{ width: `${product.sentimentDistribution.neutral}%` }} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-bold uppercase">
                      <span className="text-red-500">Negative</span>
                      <span className="text-slate-900">{product.sentimentDistribution.negative}%</span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="pb-6 px-8 border-b border-slate-50">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-600">Sentiment Trends (6 Months)</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px] p-8">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#888" fontSize={12} tickLine={false} axisLine={false} tick={{ fontWeight: 600 }} />
                <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} tick={{ fontWeight: 600 }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ paddingTop: '20px', fontWeight: 600 }} />
                <Line type="monotone" dataKey="positive" stroke="#22c55e" strokeWidth={3} dot={{ r: 4, fill: '#22c55e' }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="neutral" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, fill: '#f59e0b' }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="negative" stroke="#ef4444" strokeWidth={3} dot={{ r: 4, fill: '#ef4444' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardHeader className="pb-6 px-8 border-b border-slate-50">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-600">5 Vectors of Superiority</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px] p-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={vectorData} margin={{ bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} tick={{ fontWeight: 600 }} />
                <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} tick={{ fontWeight: 600 }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Legend verticalAlign="bottom" height={36} iconType="rect" wrapperStyle={{ paddingTop: '20px', fontWeight: 600 }} />
                <Bar dataKey="P&G Average" fill="#003da5" radius={[4, 4, 0, 0]} barSize={40} />
                <Bar dataKey="Competitor Average" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

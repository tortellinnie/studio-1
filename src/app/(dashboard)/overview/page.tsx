
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
  Activity,
  ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { 
  pngProducts, 
  sentimentTrends, 
  dynamicGlobalSentiment, 
  totalCacheCount,
  positiveCount,
  negativeCount,
  neutralCount,
  dynamicVectorScores
} from "@/data/mockData";

const distributionData = [
  { name: 'Positive', value: dynamicGlobalSentiment.positive, color: '#22c55e' },
  { name: 'Neutral', value: dynamicGlobalSentiment.neutral, color: '#f59e0b' },
  { name: 'Negative', value: dynamicGlobalSentiment.negative, color: '#ef4444' }
];

export default function OverviewPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-[1400px] mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard Overview</h1>
          <p className="text-base text-muted-foreground">GenAI-powered dynamic insights from real-time review inference</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg">
          <Activity className="h-4 w-4 text-slate-400" />
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Live Cache: {totalCacheCount} Samples</span>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Reviews Analyzed", value: totalCacheCount.toLocaleString(), sub: "Inference cache load", icon: CheckCircle2, iconColor: "text-slate-400" },
          { title: "Avg Corrected Rating", value: "4.20", sub: "NLP Sentiment Correction", icon: TrendingUp, iconColor: "text-emerald-500" },
          { title: "Active AI Vectors", value: "5", sub: "Vectors of Superiority", icon: AlertCircle, iconColor: "text-[#003da5]" },
          { title: "Positive Sentiment", value: `${dynamicGlobalSentiment.positive}%`, sub: "Global aggregate", icon: TrendingUp, iconColor: "text-emerald-500" },
        ].map((item, i) => (
          <Card key={i} className="shadow-sm border-slate-200 bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-3 space-y-0">
              <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{item.title}</CardTitle>
              <item.icon className={cn("h-4 w-4", item.iconColor)} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-slate-900">{item.value}</div>
              <p className="text-[10px] text-muted-foreground font-bold mt-2 uppercase tracking-tight">{item.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sentiment Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-red-500 bg-red-50/20 shadow-sm">
          <CardContent className="pt-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest">Critical Alert</span>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </div>
            <p className="text-sm font-bold text-slate-900 leading-snug">
              Surge in "Packaging Leak" complaints for Ariel Liquid on Lazada.
            </p>
            <button className="text-[10px] font-extrabold text-red-700 flex items-center gap-1 hover:underline">
              VIEW ANALYSIS <ArrowUpRight className="h-3 w-3" />
            </button>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-emerald-500 bg-emerald-50/20 shadow-sm">
          <CardContent className="pt-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Momentum Signal</span>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </div>
            <p className="text-sm font-bold text-slate-900 leading-snug">
              Downy Garden Bloom sentiment increased by 12% in Taglish reviews.
            </p>
            <button className="text-[10px] font-extrabold text-emerald-700 flex items-center gap-1 hover:underline">
              RETAIL PLAN <ArrowUpRight className="h-3 w-3" />
            </button>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500 bg-blue-50/20 shadow-sm">
          <CardContent className="pt-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Market Watch</span>
              <Activity className="h-4 w-4 text-blue-500" />
            </div>
            <p className="text-sm font-bold text-slate-900 leading-snug">
              Safeguard white maintainance index is stable across platforms.
            </p>
            <button className="text-[10px] font-extrabold text-blue-700 flex items-center gap-1 hover:underline">
              BENCHMARKS <ArrowUpRight className="h-3 w-3" />
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Taglish-Aware AI Sentiment Analysis */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Taglish-Aware AI Sentiment Analysis</h2>
          <p className="text-sm text-muted-foreground">Dynamic insights parsed from {totalCacheCount} localized review samples</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-l-4 border-l-[#22c55e] shadow-sm">
            <CardContent className="pt-8 space-y-2">
              <div className="flex items-center gap-2 text-[#22c55e]">
                <Smile className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Positive Sentiment</span>
              </div>
              <div className="text-4xl font-extrabold text-slate-900">{dynamicGlobalSentiment.positive}%</div>
              <p className="text-xs text-slate-400 font-medium">{positiveCount.toLocaleString()} reviews</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-[#f59e0b] shadow-sm">
            <CardContent className="pt-8 space-y-2">
              <div className="flex items-center gap-2 text-[#f59e0b]">
                <Meh className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Neutral Sentiment</span>
              </div>
              <div className="text-4xl font-extrabold text-slate-900">{dynamicGlobalSentiment.neutral}%</div>
              <p className="text-xs text-slate-400 font-medium">{neutralCount.toLocaleString()} reviews</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-[#ef4444] shadow-sm">
            <CardContent className="pt-8 space-y-2">
              <div className="flex items-center gap-2 text-[#ef4444]">
                <Frown className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Negative Sentiment</span>
              </div>
              <div className="text-4xl font-extrabold text-slate-900">{dynamicGlobalSentiment.negative}%</div>
              <p className="text-xs text-slate-400 font-medium">{negativeCount.toLocaleString()} reviews</p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-sm border-slate-200">
          <CardHeader className="border-b border-slate-50 py-6">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">Product-Level Sentiment Distribution</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-50">
              {pngProducts.map((item, i) => (
                <div key={i} className="p-8 space-y-4 hover:bg-slate-50/50 transition-colors">
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-slate-900">{item.name}</h4>
                    <p className="text-xs text-slate-400 font-medium">Segmented analysis for {item.reviewCount.toLocaleString()} reviews</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                        <span className="text-[#22c55e]">Positive</span>
                        <span className="text-slate-900">{item.sentimentDistribution.positive}%</span>
                      </div>
                      <Progress value={item.sentimentDistribution.positive} className="h-1.5 bg-slate-100" indicatorClassName="bg-[#22c55e]" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                        <span className="text-[#f59e0b]">Neutral</span>
                        <span className="text-slate-900">{item.sentimentDistribution.neutral}%</span>
                      </div>
                      <Progress value={item.sentimentDistribution.neutral} className="h-1.5 bg-slate-100" indicatorClassName="bg-[#f59e0b]" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                        <span className="text-[#ef4444]">Negative</span>
                        <span className="text-slate-900">{item.sentimentDistribution.negative}%</span>
                      </div>
                      <Progress value={item.sentimentDistribution.negative} className="h-1.5 bg-slate-100" indicatorClassName="bg-[#ef4444]" />
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
              <LineChart data={sentimentTrends}>
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
              <span className="text-3xl font-extrabold text-slate-900">{dynamicGlobalSentiment.positive}%</span>
              <span className="text-xs font-bold text-emerald-500 uppercase">Positive</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vector Analysis Chart */}
      <Card className="shadow-sm border-slate-200">
        <CardHeader>
          <CardTitle className="text-base font-bold text-slate-900">5 Vectors of Superiority - Dynamic Health Scores</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dynamicVectorScores}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="vector" stroke="#888" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#888" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip />
              <Legend verticalAlign="bottom" align="center" iconType="rect" />
              <Bar dataKey="healthScore" name="Health Score (%)" fill="#003da5" barSize={48} radius={[4, 4, 0, 0]} />
              <Bar dataKey="count" name="Mention Frequency" fill="#94a3b8" barSize={48} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

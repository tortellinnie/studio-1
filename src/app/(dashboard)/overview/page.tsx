
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
  dynamicVectorScores,
  globalCorrectedRating
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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-headline">Dashboard Overview</h1>
          <p className="text-base text-muted-foreground font-medium">GenAI-powered dynamic insights from {totalCacheCount.toLocaleString()} real-time review samples</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg border border-slate-200 shadow-sm">
          <Activity className="h-4 w-4 text-[#003da5]" />
          <span className="text-[10px] font-extrabold text-slate-600 uppercase tracking-widest leading-none">Live Inference Engine</span>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Reviews Analyzed", value: totalCacheCount.toLocaleString(), sub: "Inference cache load", icon: CheckCircle2, iconColor: "text-slate-400" },
          { title: "Avg Corrected Rating", value: globalCorrectedRating, sub: "NLP Sentiment Correction", icon: TrendingUp, iconColor: "text-emerald-500" },
          { title: "Vector Health Score", value: `${dynamicGlobalSentiment.positive}%`, sub: "Weighted Portfolio Avg", icon: AlertCircle, iconColor: "text-[#003da5]" },
          { title: "Growth Advantage", value: "+5.2%", sub: "vs Competitive Mean", icon: TrendingUp, iconColor: "text-emerald-500" },
        ].map((item, i) => (
          <Card key={i} className="shadow-sm border-slate-200 bg-white hover:border-[#003da5]/30 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-3 space-y-0">
              <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{item.title}</CardTitle>
              <item.icon className={cn("h-4 w-4", item.iconColor)} />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-extrabold text-slate-900 tabular-nums">{item.value}</div>
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
              Surge in "{dynamicVectorScores.find(v => v.healthScore < 70)?.vector || "Packaging"}" concerns detected in recent Lazada reviews.
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
              {pngProducts[0].name} sentiment is currently {dynamicGlobalSentiment.positive}% - exceeding baseline.
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
              Taglish NLP sentiment index is stable across {totalCacheCount} data points.
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
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 font-headline">Taglish-Aware AI Sentiment Analysis</h2>
          <p className="text-sm text-muted-foreground font-medium">Dynamic insights parsed from your localized inference cache</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-l-4 border-l-[#22c55e] shadow-sm bg-white overflow-hidden">
            <CardContent className="pt-8 space-y-2">
              <div className="flex items-center gap-2 text-[#22c55e]">
                <Smile className="h-4 w-4" />
                <span className="text-xs font-extrabold uppercase tracking-widest">Positive</span>
              </div>
              <div className="text-5xl font-extrabold text-slate-900 tabular-nums">{dynamicGlobalSentiment.positive}%</div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{positiveCount.toLocaleString()} Verified Signals</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-[#f59e0b] shadow-sm bg-white overflow-hidden">
            <CardContent className="pt-8 space-y-2">
              <div className="flex items-center gap-2 text-[#f59e0b]">
                <Meh className="h-4 w-4" />
                <span className="text-xs font-extrabold uppercase tracking-widest">Neutral</span>
              </div>
              <div className="text-5xl font-extrabold text-slate-900 tabular-nums">{dynamicGlobalSentiment.neutral}%</div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{neutralCount.toLocaleString()} Mixed Signals</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-[#ef4444] shadow-sm bg-white overflow-hidden">
            <CardContent className="pt-8 space-y-2">
              <div className="flex items-center gap-2 text-[#ef4444]">
                <Frown className="h-4 w-4" />
                <span className="text-xs font-extrabold uppercase tracking-widest">Negative</span>
              </div>
              <div className="text-5xl font-extrabold text-slate-900 tabular-nums">{dynamicGlobalSentiment.negative}%</div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{negativeCount.toLocaleString()} Risk Signals</p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-sm border-slate-200 bg-white">
          <CardHeader className="border-b border-slate-50 py-6 px-8">
            <CardTitle className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Product-Level Sentiment Distribution</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-50">
              {pngProducts.map((item, i) => (
                <div key={i} className="p-10 space-y-6 hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="text-xl font-extrabold text-slate-900 tracking-tight">{item.name}</h4>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Analysis for {item.reviewCount.toLocaleString()} reviews</p>
                    </div>
                    <Badge variant="outline" className="h-7 px-4 border-slate-200 text-slate-500 font-bold text-[10px] uppercase">{item.category}</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-[10px] font-extrabold uppercase tracking-widest">
                        <span className="text-emerald-600">Positive</span>
                        <span className="text-slate-900">{item.sentimentDistribution.positive}%</span>
                      </div>
                      <Progress value={item.sentimentDistribution.positive} className="h-2 bg-slate-100" indicatorClassName="bg-emerald-500" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-[10px] font-extrabold uppercase tracking-widest">
                        <span className="text-orange-500">Neutral</span>
                        <span className="text-slate-900">{item.sentimentDistribution.neutral}%</span>
                      </div>
                      <Progress value={item.sentimentDistribution.neutral} className="h-2 bg-slate-100" indicatorClassName="bg-orange-400" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-[10px] font-extrabold uppercase tracking-widest">
                        <span className="text-red-500">Negative</span>
                        <span className="text-slate-900">{item.sentimentDistribution.negative}%</span>
                      </div>
                      <Progress value={item.sentimentDistribution.negative} className="h-2 bg-slate-100" indicatorClassName="bg-red-500" />
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
        <Card className="shadow-sm border-slate-200 bg-white">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="text-lg font-extrabold text-slate-900">Sentiment Trends (Anchored to Cache)</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px] p-8 pt-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sentimentTrends}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tick={{ fontWeight: 700 }} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tick={{ fontWeight: 700 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Line type="monotone" dataKey="positive" name="Positive %" stroke="#22c55e" strokeWidth={4} dot={{ r: 6, fill: '#22c55e', strokeWidth: 2, stroke: '#fff' }} />
                <Line type="monotone" dataKey="neutral" name="Neutral %" stroke="#f59e0b" strokeWidth={4} dot={{ r: 6, fill: '#f59e0b', strokeWidth: 2, stroke: '#fff' }} />
                <Line type="monotone" dataKey="negative" name="Negative %" stroke="#ef4444" strokeWidth={4} dot={{ r: 6, fill: '#ef4444', strokeWidth: 2, stroke: '#fff' }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200 bg-white">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="text-lg font-extrabold text-slate-900">Portfolio Health Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px] p-8 pt-0 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={100}
                  outerRadius={140}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-5xl font-black text-slate-900 tabular-nums">{dynamicGlobalSentiment.positive}%</span>
              <span className="text-xs font-extrabold text-emerald-500 uppercase tracking-widest">Global Positive</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vector Analysis Chart */}
      <Card className="shadow-sm border-slate-200 bg-white">
        <CardHeader className="p-8 pb-4">
          <CardTitle className="text-lg font-extrabold text-slate-900">5 Vectors of Superiority - Real-Time Health Index</CardTitle>
        </CardHeader>
        <CardContent className="h-[450px] p-8 pt-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dynamicVectorScores} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="vector" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tick={{ fontWeight: 700 }} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tick={{ fontWeight: 700 }} />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="bottom" align="center" iconType="rect" wrapperStyle={{ paddingTop: '20px' }} />
              <Bar dataKey="healthScore" name="Health Score (%)" fill="#003da5" barSize={60} radius={[6, 6, 0, 0]} />
              <Bar dataKey="count" name="Mention Frequency" fill="#cbd5e1" barSize={60} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

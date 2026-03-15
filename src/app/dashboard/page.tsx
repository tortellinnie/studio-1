"use client";

import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, CheckCircle2, AlertCircle, ArrowUpRight, ArrowRight } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { pngProducts, sentimentTrends, vectorScores } from '@/data/mockData';
import { NotificationBanner } from '@/components/NotificationBanner';
import { cn } from '@/lib/utils';

export default function Dashboard() {
  const totalReviews = 14709;
  const avgCorrectedRating = 4.20;
  const avgOriginalRating = 4.82;
  const ratingInflation = 14.8;
  const positiveSentiment = 68;

  const insights = [
    {
      vector: "Retail Execution",
      title: "Inventory Optimization",
      desc: "Downy demand is trending +12% above forecast on Lazada. Increase stock levels for upcoming flash sales.",
    },
    {
      vector: "Value",
      title: "Value Perception Alert",
      desc: "Ariel Sunrise Fresh showing sentiment dip in 'Value' vector. Consider a 10% sachet bundle discount.",
    },
    {
      vector: "Product",
      title: "Superiority Win",
      desc: "P&G Fabric Care maintains a 15pt sentiment lead over Surf in Product Quality vector this month.",
    }
  ];

  const sentimentData = [
    { name: 'Positive', value: 68, color: '#22c55e' },
    { name: 'Neutral', value: 22, color: '#f59e0b' },
    { name: 'Negative', value: 10, color: '#ef4444' }
  ];

  return (
    <Layout>
      <div className="p-10 space-y-8">
        <NotificationBanner />
        
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2 font-headline">Dashboard Overview</h1>
          <p className="text-slate-500 font-medium text-lg">GenAI-powered insights for P&G e-commerce performance</p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-semibold text-slate-600">Total Reviews Analyzed</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900 mb-1">14,709</div>
              <p className="text-[11px] text-slate-400 font-medium">Across all P&G products</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-semibold text-slate-600">Avg Corrected Rating</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900 mb-1">4.20</div>
              <p className="text-[11px] text-slate-400 font-medium">vs 4.82 original</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-semibold text-slate-600">Rating Inflation</CardTitle>
              <AlertCircle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900 mb-1">14.8%</div>
              <p className="text-[11px] text-slate-400 font-medium">Lazada's 5-star bias</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-semibold text-slate-600">Positive Sentiment</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900 mb-1">68%</div>
              <p className="text-[11px] text-slate-400 font-medium">+3% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Actionable Insights Section - Minimalist Style */}
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-4">Actionable AI Insights</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {insights.map((insight, i) => (
              <Card key={i} className="border-slate-200 shadow-sm group hover:border-slate-300 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {insight.vector}
                    </span>
                    <ArrowRight className="h-3 w-3 text-slate-300 group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-bold text-base text-slate-800 mb-2">{insight.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    {insight.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-bold text-slate-800">Sentiment Trends (6 Months)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sentimentTrends} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="month" 
                      stroke="#94a3b8" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      dy={10}
                    />
                    <YAxis 
                      stroke="#94a3b8" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      domain={[0, 100]}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      align="center" 
                      iconType="circle"
                      wrapperStyle={{ paddingTop: '20px' }}
                    />
                    <Line type="monotone" dataKey="positive" stroke="#22c55e" strokeWidth={2} dot={{ r: 4, fill: '#22c55e' }} />
                    <Line type="monotone" dataKey="neutral" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4, fill: '#f59e0b' }} />
                    <Line type="monotone" dataKey="negative" stroke="#ef4444" strokeWidth={2} dot={{ r: 4, fill: '#ef4444' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-bold text-slate-800">Overall Sentiment Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sentimentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={0}
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {sentimentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-bold text-slate-800">5 Vectors of Superiority</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={vectorScores} barGap={8} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="vector" 
                      stroke="#94a3b8" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      dy={10}
                    />
                    <YAxis 
                      stroke="#94a3b8" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      domain={[0, 100]} 
                    />
                    <Tooltip cursor={{ fill: '#f8fafc' }} />
                    <Legend verticalAlign="bottom" align="center" iconType="rect" wrapperStyle={{ paddingTop: '20px' }} />
                    <Bar dataKey="pngAvg" fill="#003da5" name="P&G Average" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="competitorAvg" fill="#cbd5e1" name="Competitor Average" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-bold text-slate-800">Top Performing Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { name: "Downy Fabric Conditioner", reviews: 4521, original: 4.9, corrected: 4.5 },
                  { name: "Ariel Liquid Detergent", reviews: 3124, original: 4.8, corrected: 4.3 },
                  { name: "Tide Perfect Clean", reviews: 2840, original: 4.7, corrected: 4.2 },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{item.name}</p>
                      <p className="text-xs text-slate-400 font-medium">{item.reviews} reviews</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-slate-400 font-mono">{item.original.toFixed(1)}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-emerald-600">{item.corrected.toFixed(1)}</span>
                        <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
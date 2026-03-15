
"use client";

import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, ArrowRight, Package, DollarSign, Store } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { pngProducts, sentimentTrends, vectorScores } from '@/data/mockData';
import { NotificationBanner } from '@/components/NotificationBanner';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function Dashboard() {
  const totalReviews = 37520;
  const avgCorrectedRating = 4.37;
  const avgOriginalRating = 4.80;
  const ratingInflation = 9.9;
  const positiveSentiment = 68;

  const insights = [
    {
      vector: "Retail Execution",
      title: "Inventory Optimization",
      desc: "Downy demand is trending +12% above forecast on Lazada. Increase stock levels for upcoming flash sales.",
      icon: Store,
      color: "text-pink-600",
      bg: "bg-pink-50"
    },
    {
      vector: "Value",
      title: "Value Perception Alert",
      desc: "Ariel Sunrise Fresh showing sentiment dip in 'Value' vector. Consider a 10% sachet bundle discount.",
      icon: DollarSign,
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      vector: "Product",
      title: "Superiority Win",
      desc: "P&G Fabric Care maintains a 15pt sentiment lead over Surf in Product Quality vector this month.",
      icon: Package,
      color: "text-blue-600",
      bg: "bg-blue-50"
    }
  ];

  return (
    <Layout>
      <div className="p-8">
        <NotificationBanner />
        
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold font-headline text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500 font-medium italic">Lazada PH Fabric Care Intelligence Hub</p>
        </div>

        {/* Key Metrics - Removed Icons for cleanliness */}
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-sm border-slate-200 bg-white">
            <CardHeader className="pb-2 space-y-0">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total Reviews Analyzed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-slate-900">{totalReviews.toLocaleString()}</div>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Lazada Fabric Portfolio</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200 bg-white">
            <CardHeader className="pb-2 space-y-0">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Avg Corrected Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-slate-900">{avgCorrectedRating.toFixed(2)}</div>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">vs {avgOriginalRating.toFixed(2)} original</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200 bg-white">
            <CardHeader className="pb-2 space-y-0">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Rating Inflation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-slate-900">{ratingInflation}%</div>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Marketplace 5-Star Bias</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200 bg-white">
            <CardHeader className="pb-2 space-y-0">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Positive Sentiment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-slate-900">{positiveSentiment}%</div>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">+3.2% vs Last Month</p>
            </CardContent>
          </Card>
        </div>

        {/* Actionable Insights Section - Removed Sparkles icon */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-bold text-slate-800">Actionable AI Insights</h2>
            <Badge variant="secondary" className="ml-2 bg-blue-100 text-[#003da5] border-none font-bold text-[10px]">VECTOR-ALIGNED</Badge>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {insights.map((insight, i) => (
              <Card key={i} className="border-none shadow-sm bg-white overflow-hidden group cursor-pointer hover:shadow-md transition-all">
                <CardContent className="p-0 flex h-full">
                  <div className={cn("w-1.5", insight.color.replace('text', 'bg'))} />
                  <div className="p-5 flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className={cn("text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded", insight.bg, insight.color)}>
                        {insight.vector}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-slate-800 mb-1">{insight.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium mb-4">
                      {insight.desc}
                    </p>
                    <div className="flex items-center text-[10px] font-bold text-[#003da5] uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                      Execute Recommendation <ArrowRight className="ml-1 h-3 w-3" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Charts Section */}
        <div className="space-y-6">
          <Card className="shadow-sm border-slate-200 bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Sentiment Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sentimentTrends}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Legend iconType="circle" />
                    <Line type="monotone" dataKey="positive" stroke="#22c55e" strokeWidth={3} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="neutral" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="negative" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200 bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold">5 Vectors of Superiority (P&G vs. Competitor)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={vectorScores} barGap={8}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="vector" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Legend iconType="rect" />
                    <Bar dataKey="pngAvg" fill="#003da5" name="P&G Average" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="competitorAvg" fill="#e2e8f0" name="Competitor Average" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

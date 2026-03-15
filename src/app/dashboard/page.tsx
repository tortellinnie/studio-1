
"use client";

import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { pngProducts, sentimentTrends, vectorScores } from '@/data/mockData';
import { NotificationBanner } from '@/components/NotificationBanner';

export default function Dashboard() {
  const totalReviews = pngProducts.reduce((sum, p) => sum + p.reviewCount, 0);
  const avgCorrectedRating = pngProducts.reduce((sum, p) => sum + p.correctedRating, 0) / pngProducts.length;
  const avgOriginalRating = pngProducts.reduce((sum, p) => sum + p.originalRating, 0) / pngProducts.length;
  const ratingInflation = (((avgOriginalRating - avgCorrectedRating) / avgCorrectedRating) * 100).toFixed(1);

  return (
    <Layout>
      <div className="p-8">
        <NotificationBanner />
        
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold font-headline text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500 font-medium italic">Lazada PH Fabric Care Intelligence Hub</p>
        </div>

        {/* Key Metrics */}
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total Reviews Analyzed</CardTitle>
              <CheckCircle className="h-4 w-4 text-slate-300" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-slate-900">{totalReviews.toLocaleString()}</div>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Lazada Fabric Portfolio</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Avg Corrected Rating</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-slate-900">{avgCorrectedRating.toFixed(2)}</div>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">vs {avgOriginalRating.toFixed(2)} original</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Rating Inflation</CardTitle>
              <AlertCircle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-slate-900">{ratingInflation}%</div>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Marketplace 5-Star Bias</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section - Extended Horizontally */}
        <div className="space-y-6">
          <Card className="shadow-sm border-slate-200">
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

          <Card className="shadow-sm border-slate-200">
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

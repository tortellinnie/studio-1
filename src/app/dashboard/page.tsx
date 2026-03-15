"use client";

import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { pngProducts, competitorProducts, sentimentTrends, vectorScores } from '@/data/mockData';

export default function Dashboard() {
  const totalReviews = pngProducts.reduce((sum, p) => sum + p.reviewCount, 0);
  const avgCorrectedRating = pngProducts.reduce((sum, p) => sum + p.correctedRating, 0) / pngProducts.length;
  const avgOriginalRating = pngProducts.reduce((sum, p) => sum + p.originalRating, 0) / pngProducts.length;
  const ratingInflation = ((avgOriginalRating - avgCorrectedRating) / avgCorrectedRating * 100).toFixed(1);

  const sentimentData = [
    { name: 'Positive', value: 68, color: '#22c55e' },
    { name: 'Neutral', value: 22, color: '#f59e0b' },
    { name: 'Negative', value: 10, color: '#ef4444' }
  ];

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold font-headline text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500 font-medium">GenAI-powered insights for P&G e-commerce performance</p>
        </div>

        {/* Key Metrics */}
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total Reviews Analyzed</CardTitle>
              <CheckCircle className="h-4 w-4 text-slate-300" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-slate-900">{totalReviews.toLocaleString()}</div>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Across all P&G products</p>
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
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Lazada's 5-star bias</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Positive Sentiment</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-emerald-600">68%</div>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">+3% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          <Card className="shadow-sm border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Sentiment Trends (6 Months)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={sentimentTrends}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Legend iconType="circle" />
                  <Line type="monotone" dataKey="positive" stroke="#22c55e" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="neutral" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="negative" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Overall Sentiment Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={100}
                    dataKey="value"
                    stroke="none"
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          <Card className="shadow-sm border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg font-bold">5 Vectors of Superiority</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={vectorScores}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="vector" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Legend iconType="rect" />
                  <Bar dataKey="pngAvg" fill="#003da5" name="P&G Average" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="competitorAvg" fill="#e2e8f0" name="Competitor Average" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Top Performing Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {pngProducts
                  .sort((a, b) => b.correctedRating - a.correctedRating)
                  .slice(0, 5)
                  .map((product) => (
                    <div key={product.id} className="flex items-center justify-between group">
                      <div className="flex-1">
                        <p className="font-bold text-sm text-slate-800">{product.name}</p>
                        <p className="text-[10px] font-bold uppercase text-slate-400">{product.reviewCount.toLocaleString()} reviews</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-300 font-mono line-through">
                          {product.originalRating.toFixed(1)}
                        </span>
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-50 border border-emerald-100">
                          <span className="font-black text-emerald-600 text-sm">
                            {product.correctedRating.toFixed(1)}
                          </span>
                          <TrendingUp className="h-3 w-3 text-emerald-500" />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights Panel */}
        <Card className="border-l-4 border-l-[#003da5] bg-[#003da5]/5 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-[#003da5]">Strategic AI Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid md:grid-cols-2 gap-4 text-sm font-medium text-slate-600">
              <li className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                <span>
                  <strong className="text-slate-800">Downy leads sentiment:</strong> 78% positive reviews with highest product
                  vector score (0.98).
                </span>
              </li>
              <li className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-500" />
                <span>
                  <strong className="text-slate-800">Safeguard needs attention:</strong> Only 62% positive sentiment, packaging
                  concerns detected in Taglish reviews.
                </span>
              </li>
              <li className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                <TrendingUp className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#3b82f6]" />
                <span>
                  <strong className="text-slate-800">Value proposition strong:</strong> P&G products score 78/100 on value
                  vector, outperforming competitors by 8 points.
                </span>
              </li>
              <li className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                <span>
                  <strong className="text-slate-800">Corrected Rankings:</strong> Ariel's true performance is 4.3/5.0, not the platform-inflated 4.8/5.0.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

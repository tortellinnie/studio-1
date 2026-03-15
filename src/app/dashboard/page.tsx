"use client";

import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { pngProducts, sentimentTrends } from '@/data/mockData';

export default function Dashboard() {
  const totalReviews = pngProducts.reduce((sum, p) => sum + p.reviewCount, 0);
  const avgCorrectedRating = pngProducts.reduce((sum, p) => sum + p.correctedRating, 0) / pngProducts.length;
  const avgOriginalRating = pngProducts.reduce((sum, p) => sum + p.originalRating, 0) / pngProducts.length;
  const ratingInflation = (((avgOriginalRating - avgCorrectedRating) / avgCorrectedRating) * 100).toFixed(1);

  const sentimentData = [
    { name: 'Positive', value: 68, color: '#22c55e' },
    { name: 'Neutral', value: 22, color: '#f59e0b' },
    { name: 'Negative', value: 10, color: '#ef4444' }
  ];

  return (
    <Layout>
      <div className="p-8 space-y-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-sm text-gray-500 font-medium">GenAI-powered insights for P&G e-commerce performance</p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-sm border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Total Reviews Analyzed</CardTitle>
              <CheckCircle className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalReviews.toLocaleString()}</div>
              <p className="text-[10px] text-gray-400 mt-1">Across all P&G products</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Avg Corrected Rating</CardTitle>
              <AlertCircle className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{avgCorrectedRating.toFixed(2)}</div>
              <p className="text-[10px] text-gray-400 mt-1 font-medium">
                Original: {avgOriginalRating.toFixed(2)} <span className="text-orange-500">({ratingInflation}% Inflation)</span>
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts Section */}
        <div className="grid gap-6 md:grid-cols-2">
           <Card className="shadow-sm border-gray-200">
             <CardHeader>
               <CardTitle className="text-sm font-semibold text-gray-700">Sentiment Breakdown</CardTitle>
             </CardHeader>
             <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={sentimentData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} stroke="none">
                      {sentimentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip wrapperStyle={{ fontSize: '10px' }} />
                    <Legend verticalAlign="bottom" align="center" iconType="rect" wrapperStyle={{ fontSize: '10px' }} />
                  </PieChart>
                </ResponsiveContainer>
             </CardContent>
           </Card>
        </div>
      </div>
    </Layout>
  );
}
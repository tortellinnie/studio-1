
"use client";

import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { accountRecommendations, pngProducts } from '@/data/mockData';
import { TrendingUp, TrendingDown, Minus, ShoppingCart, Lightbulb, AlertTriangle } from 'lucide-react';

export default function AccountRecommendations() {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'declining':
        return <TrendingDown className="h-5 w-5 text-red-500" />;
      default:
        return <Minus className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTrendBadge = (trend: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      improving: 'default',
      stable: 'secondary',
      declining: 'destructive'
    };
    return variants[trend] || 'outline';
  };

  // Generate product insights strictly for Lazada
  const productAccountInsights = pngProducts.map((product) => {
    const lazadaSentiment = 68 + Math.random() * 15;
    return {
      product: product.name,
      lazada: {
        sentiment: lazadaSentiment.toFixed(1),
        share: (15 + Math.random() * 20).toFixed(1),
        recommended: lazadaSentiment > 75,
      }
    };
  });

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold font-headline text-slate-900">Account-Level Recommendations</h1>
          <p className="text-slate-500 font-medium">
            AI-powered product prioritization for Lazada PH Fabric based on sentiment trends
          </p>
        </div>

        {/* Account Overview Cards */}
        {accountRecommendations.map((account) => (
          <Card key={account.account} className="mb-8 border-l-4 border-l-[#003da5] shadow-sm bg-white">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="mb-2 flex items-center gap-2 text-xl font-bold">
                    <ShoppingCart className="h-6 w-6 text-slate-400" />
                    {account.account}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(account.sentimentTrend)}
                    <Badge variant={getTrendBadge(account.sentimentTrend)} className="uppercase text-[10px] font-bold tracking-wider">
                      {account.sentimentTrend}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-500 font-semibold uppercase tracking-tighter">Priority Score</div>
                  <div className="text-4xl font-black text-[#003da5]">{account.priorityScore}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h4 className="mb-3 font-bold text-sm uppercase tracking-widest text-slate-400">Top Performing Products</h4>
                <div className="grid gap-4 md:grid-cols-3">
                  {account.topProducts.map((product, index) => {
                    const productData = pngProducts.find((p) => p.name === product);
                    return (
                      <Card key={index} className="bg-slate-50/50 border-slate-200">
                        <CardContent className="pt-4">
                          <div className="mb-2 flex items-start justify-between">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#003da5]/10">
                              <span className="font-bold text-[#003da5] text-xs">{index + 1}</span>
                            </div>
                            {index === 0 && (
                              <Badge className="bg-emerald-600 text-[10px] font-bold">Highest Priority</Badge>
                            )}
                          </div>
                          <p className="font-bold text-sm text-slate-800">{product}</p>
                          {productData && (
                            <div className="mt-2 text-[11px] font-semibold text-slate-500">
                              {productData.sentimentDistribution.positive}% positive •{' '}
                              {productData.reviewCount.toLocaleString()} reviews
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              <div className="bg-orange-50/50 border border-orange-100 p-4 rounded-lg">
                <h4 className="mb-3 flex items-center gap-2 font-bold text-sm text-orange-700">
                  <Lightbulb className="h-5 w-5 text-orange-500" />
                  Recommended Actions
                </h4>
                <ul className="space-y-3">
                  {account.recommendedActions.map((action, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                      <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3b82f6]" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Product-Account Performance Matrix */}
        <Card className="mb-8 shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Product Performance Matrix (Lazada)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 text-left text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    <th className="pb-3 px-2">Product</th>
                    <th className="pb-3 px-2">Lazada Sentiment</th>
                    <th className="pb-3 px-2">Lazada Share</th>
                    <th className="pb-3 px-2 text-right">Recommendation</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium text-slate-700">
                  {productAccountInsights.map((insight, index) => (
                    <tr key={index} className="border-b border-slate-50 last:border-b-0 hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-2 font-bold">{insight.product}</td>
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full bg-[#003da5]"
                              style={{ width: `${insight.lazada.sentiment}%` }}
                            />
                          </div>
                          <span className="text-[11px] font-mono">{insight.lazada.sentiment}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-2 text-[11px] font-mono">{insight.lazada.share}%</td>
                      <td className="py-4 px-2 text-right">
                        {insight.lazada.recommended ? (
                          <Badge className="bg-emerald-600 text-[10px] font-bold">Prioritize</Badge>
                        ) : (
                          <Badge variant="secondary" className="text-[10px] font-bold opacity-60">Monitor</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Strategic Priorities */}
        <Card className="border-l-4 border-l-emerald-500 shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-800">Strategic Priorities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-700">Inventory Optimization</span>
                  <Badge className="bg-emerald-600 text-[9px] font-bold uppercase">High Priority</Badge>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Increase Downy stock by 30% based on 78% positive sentiment and high demand
                  signals in Lazada reviews
                </p>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-700">Promotional Strategy</span>
                  <Badge className="bg-[#3b82f6] text-[9px] font-bold uppercase">Medium Priority</Badge>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Feature Ariel in flash sales - 72% positive sentiment with strong value
                  perception
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts & Warnings */}
        <Card className="mt-8 border-l-4 border-l-orange-500 bg-orange-50/20 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-bold text-orange-700">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Lazada Sentiment Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4 text-sm font-medium text-slate-600">
              <li className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-500" />
                <span>
                  <strong className="text-slate-800">Tide packaging complaints:</strong> Lazada reviews show increased
                  mentions of leaking bottles. Coordinate with fulfillment team.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <TrendingUp className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                <span>
                  <strong className="text-slate-800">Downy momentum:</strong> Positive sentiment accelerating on Lazada. 
                  Consider increasing ad spend while trend is favorable.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

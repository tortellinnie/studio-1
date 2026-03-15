
"use client";

import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { accountRecommendations, pngProducts } from '@/data/mockData';
import { TrendingUp, TrendingDown, Minus, ShoppingCart, Lightbulb, AlertTriangle } from 'lucide-react';

export default function AccountRecommendationsPage() {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'declining': return <TrendingDown className="h-5 w-5 text-red-500" />;
      default: return <Minus className="h-5 w-5 text-gray-400" />;
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

  const productAccountInsights = pngProducts.map((product) => {
    const lazadaSentiment = 68 + Math.random() * 15;
    const shopeeSentiment = 65 + Math.random() * 12;
    return {
      product: product.name,
      lazada: {
        sentiment: lazadaSentiment.toFixed(1),
        share: (15 + Math.random() * 20).toFixed(1),
        recommended: lazadaSentiment > 75,
      },
      shopee: {
        sentiment: shopeeSentiment.toFixed(1),
        share: (12 + Math.random() * 18).toFixed(1),
        recommended: shopeeSentiment > 72,
      },
    };
  });

  return (
    <Layout>
      <div className="p-8 space-y-8 animate-in fade-in duration-500">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-extrabold font-headline">Account Recommendations</h1>
          <p className="text-muted-foreground font-medium">AI-powered product prioritization for e-commerce accounts based on sentiment trends</p>
        </div>

        {/* Account Overview Cards */}
        <div className="grid gap-8">
          {accountRecommendations.map((account) => (
            <Card key={account.account} className="border-l-4 border-l-primary bg-card/40 hover:bg-card/60 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <CardTitle className="flex items-center gap-3 text-2xl font-bold">
                      <div className="bg-primary/20 p-2 rounded-lg">
                        <ShoppingCart className="h-6 w-6 text-primary" />
                      </div>
                      {account.account}
                    </CardTitle>
                    <div className="flex items-center gap-3">
                      {getTrendIcon(account.sentimentTrend)}
                      <Badge variant={getTrendBadge(account.sentimentTrend)} className="text-[10px] font-bold uppercase tracking-widest">
                        {account.sentimentTrend}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Priority Score</div>
                    <div className="text-5xl font-extrabold text-primary font-mono">{account.priorityScore}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">Top Performing Products</h4>
                  <div className="grid gap-4 md:grid-cols-3">
                    {account.topProducts.map((product, index) => {
                      const productData = pngProducts.find((p) => p.name === product);
                      return (
                        <Card key={index} className="bg-muted/20 border-border/50">
                          <CardContent className="pt-4">
                            <div className="mb-3 flex items-start justify-between">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary font-bold text-xs">
                                {index + 1}
                              </div>
                              {index === 0 && (
                                <Badge className="bg-green-500 text-[8px] font-bold">TOP PICK</Badge>
                              )}
                            </div>
                            <p className="font-bold text-sm mb-1">{product}</p>
                            {productData && (
                              <div className="text-[10px] font-bold text-muted-foreground">
                                {productData.sentimentDistribution.positive}% POSITIVE • {productData.reviewCount.toLocaleString()} REVIEWS
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-muted/10 p-4 rounded-xl border border-white/5">
                  <h4 className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500">
                    <Lightbulb className="h-4 w-4" />
                    Recommended Strategic Actions
                  </h4>
                  <ul className="grid gap-3 md:grid-cols-1">
                    {account.recommendedActions.map((action, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                        <span className="leading-relaxed">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Product-Account Performance Matrix */}
        <Card className="border-border/50 bg-card/40">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Product-Account Performance Matrix</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50 text-left bg-muted/20">
                    <th className="p-4 text-[10px] uppercase font-bold text-muted-foreground">Product</th>
                    <th className="p-4 text-[10px] uppercase font-bold text-muted-foreground">Lazada Sentiment</th>
                    <th className="p-4 text-[10px] uppercase font-bold text-muted-foreground">Lazada Share</th>
                    <th className="p-4 text-[10px] uppercase font-bold text-muted-foreground">Shopee Sentiment</th>
                    <th className="p-4 text-[10px] uppercase font-bold text-muted-foreground">Shopee Share</th>
                    <th className="p-4 text-[10px] uppercase font-bold text-muted-foreground text-right">Recommendation</th>
                  </tr>
                </thead>
                <tbody>
                  {productAccountInsights.map((insight, index) => (
                    <tr key={index} className="border-b border-border/50 hover:bg-white/5 transition-colors">
                      <td className="p-4 font-bold">{insight.product}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
                            <div className="h-full bg-primary" style={{ width: `${insight.lazada.sentiment}%` }} />
                          </div>
                          <span className="font-mono text-xs">{insight.lazada.sentiment}%</span>
                        </div>
                      </td>
                      <td className="p-4 font-mono text-xs text-muted-foreground">{insight.lazada.share}%</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
                            <div className="h-full bg-purple-500" style={{ width: `${insight.shopee.sentiment}%` }} />
                          </div>
                          <span className="font-mono text-xs">{insight.shopee.sentiment}%</span>
                        </div>
                      </td>
                      <td className="p-4 font-mono text-xs text-muted-foreground">{insight.shopee.share}%</td>
                      <td className="p-4 text-right">
                        {insight.lazada.recommended || insight.shopee.recommended ? (
                          <Badge className="bg-green-500/10 text-green-500 border-green-500/20 text-[8px] font-bold">PRIORITIZE</Badge>
                        ) : (
                          <Badge variant="secondary" className="text-[8px] font-bold opacity-50">MONITOR</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Alerts & Warnings */}
        <Card className="border-l-4 border-l-orange-500 bg-orange-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-lg font-bold text-orange-500">
              <AlertTriangle className="h-5 w-5" />
              Real-time Sentiment Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <AlertTriangle className="mt-1 h-4 w-4 flex-shrink-0 text-orange-500" />
                <span className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Safeguard on Shopee:</strong> 3-week declining sentiment trend detected. Review spike in "nakakapula ng balat" (skin redness) mentions.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <TrendingUp className="mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                <span className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Downy momentum building:</strong> Positive sentiment accelerating on both platforms. Consider increasing ad spend while trend is favorable.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

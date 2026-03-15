
"use client";

import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { pngProducts } from '@/data/mockData';
import { ArrowUp, ArrowDown, Star, AlertTriangle } from 'lucide-react';

export default function ProductRankingsPage() {
  const rankedProducts = [...pngProducts].sort((a, b) => b.correctedRating - a.correctedRating);

  return (
    <Layout>
      <div className="p-8 space-y-8 animate-in fade-in duration-500">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold font-headline mb-2">Sentiment-Corrected Rankings</h1>
          <p className="text-muted-foreground font-medium">
            True performance metrics neutralizing Lazada's 96.8% 5-star rating inflation
          </p>
        </div>

        {/* Alert Card */}
        <Card className="border-l-4 border-l-orange-500 bg-orange-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-lg font-bold text-orange-500">
              <AlertTriangle className="h-5 w-5" />
              Rating Inflation Alert
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-bold text-sm">
              Lazada shows <strong>96.8% of P&G products with 5-star ratings</strong>, which doesn't reflect true customer sentiment when analyzed with AI.
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Our sentiment-corrected rankings use NLP analysis of review text to provide accurate performance metrics, revealing SKUs that genuinely excel vs. those riding platform inflation.
            </p>
          </CardContent>
        </Card>

        {/* Rankings Table */}
        <Card className="border-border/50 bg-card/40 overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Corrected vs. Original Benchmark</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50 text-left bg-muted/20">
                    <th className="p-4 text-[10px] uppercase font-bold text-muted-foreground">Rank</th>
                    <th className="p-4 text-[10px] uppercase font-bold text-muted-foreground">Product</th>
                    <th className="p-4 text-[10px] uppercase font-bold text-muted-foreground">Reviews</th>
                    <th className="p-4 text-[10px] uppercase font-bold text-muted-foreground">Original</th>
                    <th className="p-4 text-[10px] uppercase font-bold text-muted-foreground text-primary">Corrected</th>
                    <th className="p-4 text-[10px] uppercase font-bold text-muted-foreground">Impact</th>
                    <th className="p-4 text-[10px] uppercase font-bold text-muted-foreground text-right">Sentiment</th>
                  </tr>
                </thead>
                <tbody>
                  {rankedProducts.map((product, index) => {
                    const difference = product.originalRating - product.correctedRating;
                    const changePercent = ((difference / product.correctedRating) * 100).toFixed(1);

                    return (
                      <tr key={product.id} className="border-b border-border/50 hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-xs border border-primary/20">
                            {index + 1}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1">
                            <p className="font-bold text-sm">{product.name}</p>
                            <Badge variant="outline" className="text-[8px] font-bold uppercase tracking-widest">{product.category}</Badge>
                          </div>
                        </td>
                        <td className="p-4 font-mono text-xs text-muted-foreground">
                          {product.reviewCount.toLocaleString()}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                            <Star className="h-3 w-3 fill-muted-foreground/30 text-muted-foreground/30" />
                            {product.originalRating.toFixed(1)}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1.5 font-bold text-sm text-primary">
                            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                            {product.correctedRating.toFixed(1)}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1 font-mono text-xs">
                            {difference > 0 ? (
                              <div className="flex items-center gap-1 text-red-500">
                                <ArrowDown className="h-3 w-3" />
                                {changePercent}%
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 text-green-500">
                                <ArrowUp className="h-3 w-3" />
                                {Math.abs(parseFloat(changePercent))}%
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex flex-col items-end gap-1.5">
                            <span className="text-[9px] font-bold uppercase text-muted-foreground">{product.sentimentDistribution.positive}% Positive</span>
                            <div className="h-1 w-24 overflow-hidden rounded-full bg-muted/30">
                              <div className="h-full bg-green-500" style={{ width: `${product.sentimentDistribution.positive}%` }} />
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Insights Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-l-4 border-l-green-500 bg-card/40">
            <CardHeader>
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Top Performers (True Rankings)</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {rankedProducts.slice(0, 3).map((product, index) => (
                  <li key={product.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-500 font-bold text-[10px]">
                      {index + 1}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-bold text-sm">{product.name}</p>
                      <p className="text-[10px] font-bold text-muted-foreground">
                        {product.correctedRating.toFixed(1)}/5.0 • {product.sentimentDistribution.positive}% POSITIVE
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500 bg-card/40">
            <CardHeader>
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Opportunity Areas</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {rankedProducts.slice(-2).reverse().map((product) => (
                  <li key={product.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-orange-500 font-bold text-[10px]">
                      !
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-bold text-sm">{product.name}</p>
                      <p className="text-[10px] font-bold text-muted-foreground">
                        {product.correctedRating.toFixed(1)}/5.0 • {product.sentimentDistribution.negative}% NEGATIVE
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Methodology */}
        <Card className="border-primary/20 bg-primary/5 lavender-glow">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Correction Methodology</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase text-primary">1. Sentiment Scoring</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">Each review is analyzed using our Taglish-aware NLP model to generate a score from -1.0 to +1.0.</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase text-primary">2. Rating Normalization</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">Star ratings are weighted against sentiment scores. 5-star reviews with neutral text are downweighted.</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase text-primary">3. Statistical Adjust</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">Bayesian adjustment accounts for review volume, ensuring high-confidence results for all SKUs.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

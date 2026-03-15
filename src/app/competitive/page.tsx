
"use client";

import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
} from 'recharts';
import { pngProducts, competitorProducts, competitiveBenchmark } from '@/data/mockData';
import { TrendingUp, TrendingDown, Target } from 'lucide-react';

export default function CompetitiveIntelligencePage() {
  const positioningData = competitiveBenchmark.map((item) => ({
    brand: item.brand,
    sentiment: item.sentiment,
    marketShare: item.marketShare,
    growth: item.growth,
    isPNG: item.brand.includes('P&G'),
  }));

  const categoryComparison = [
    { category: 'Laundry Detergent', pngShare: 33, competitorShare: 67 },
    { category: 'Fabric Care', pngShare: 68, competitorShare: 32 },
    { category: 'Personal Care', pngShare: 45, competitorShare: 55 },
    { category: 'Dishwashing', pngShare: 52, competitorShare: 48 },
  ];

  return (
    <Layout>
      <div className="p-8 space-y-8 animate-in fade-in duration-500">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-extrabold font-headline">Competitive Intelligence Engine</h1>
          <p className="text-muted-foreground font-medium">Benchmarking P&G brands vs. Surf, Breeze, Champion, and Zonrox</p>
        </div>

        {/* Key Competitive Metrics */}
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "P&G Market Position", value: "#1", sub: "Overall sentiment leader in laundry & fabric care", color: "border-l-primary" },
            { title: "Sentiment Advantage", value: "+15pts", sub: "Average sentiment gap vs. top competitor (Surf)", color: "border-l-green-500" },
            { title: "Growth Rate", value: "+5.2%", sub: "Year-over-year sentiment improvement", color: "border-l-purple-500" },
          ].map((metric, i) => (
            <Card key={i} className={`border-l-4 ${metric.color} bg-card/40`}>
              <CardHeader className="pb-2">
                <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{metric.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{metric.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Competitive Positioning Chart */}
        <Card className="border-border/50 bg-card/40">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Competitive Positioning: Sentiment vs. Market Share</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" dataKey="sentiment" name="Sentiment Score" unit="%" stroke="rgba(255,255,255,0.3)" fontSize={10} />
                <YAxis type="number" dataKey="marketShare" name="Market Share" unit="%" stroke="rgba(255,255,255,0.3)" fontSize={10} />
                <ZAxis type="number" dataKey="growth" range={[100, 1000]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter
                  name="P&G Brands"
                  data={positioningData.filter((d) => d.isPNG)}
                  fill="hsl(var(--primary))"
                />
                <Scatter
                  name="Competitors"
                  data={positioningData.filter((d) => !d.isPNG)}
                  fill="rgba(255,255,255,0.2)"
                />
              </ScatterChart>
            </ResponsiveContainer>
            <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-center">
              Bubble size represents growth rate. P&G brands (blue) cluster in high-sentiment, high-share quadrant.
            </p>
          </CardContent>
        </Card>

        {/* Brand Comparison Table */}
        <Card className="border-border/50 bg-card/40 overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Brand Performance Benchmark</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50 text-left bg-muted/20">
                    <th className="p-4 text-[10px] uppercase font-bold text-muted-foreground">Brand</th>
                    <th className="p-4 text-[10px] uppercase font-bold text-muted-foreground">Company</th>
                    <th className="p-4 text-[10px] uppercase font-bold text-muted-foreground">Sentiment Score</th>
                    <th className="p-4 text-[10px] uppercase font-bold text-muted-foreground">Market Share</th>
                    <th className="p-4 text-[10px] uppercase font-bold text-muted-foreground">Growth Rate</th>
                    <th className="p-4 text-[10px] uppercase font-bold text-muted-foreground text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {competitiveBenchmark.map((brand, index) => {
                    const isPNG = brand.brand.includes('P&G');
                    return (
                      <tr key={index} className="border-b border-border/50 hover:bg-white/5 transition-colors">
                        <td className="p-4 font-bold">{brand.brand}</td>
                        <td className="p-4">
                          {isPNG ? (
                            <Badge className="bg-primary/20 text-primary border-primary/30 text-[9px] font-bold">P&G</Badge>
                          ) : (
                            <Badge variant="outline" className="text-[9px] font-bold text-muted-foreground">Competitor</Badge>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                              <div
                                className={`h-full ${isPNG ? 'bg-primary' : 'bg-muted-foreground'}`}
                                style={{ width: `${brand.sentiment}%` }}
                              />
                            </div>
                            <span className="font-mono text-xs">{brand.sentiment}%</span>
                          </div>
                        </td>
                        <td className="p-4 font-mono text-xs">{brand.marketShare}%</td>
                        <td className="p-4">
                          <div className="flex items-center gap-1 font-mono text-xs">
                            {brand.growth > 0 ? (
                              <>
                                <TrendingUp className="h-3 w-3 text-green-500" />
                                <span className="text-green-500">+{brand.growth}%</span>
                              </>
                            ) : (
                              <>
                                <TrendingDown className="h-3 w-3 text-red-500" />
                                <span className="text-red-500">{brand.growth}%</span>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          {isPNG && brand.sentiment > 70 ? (
                            <Badge className="bg-green-500/10 text-green-500 border-green-500/20 text-[9px] font-bold">LEADING</Badge>
                          ) : isPNG ? (
                            <Badge className="bg-primary/10 text-primary border-primary/20 text-[9px] font-bold">STRONG</Badge>
                          ) : (
                            <Badge variant="secondary" className="text-[9px] font-bold opacity-50">TRAILING</Badge>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Category Share */}
        <Card className="border-border/50 bg-card/40">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Category Market Share (Sentiment-Weighted)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryComparison} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" stroke="rgba(255,255,255,0.3)" fontSize={10} />
                <YAxis dataKey="category" type="category" width={150} stroke="rgba(255,255,255,0.3)" fontSize={10} />
                <Tooltip />
                <Legend />
                <Bar dataKey="pngShare" stackId="a" fill="hsl(var(--primary))" name="P&G Share" />
                <Bar dataKey="competitorShare" stackId="a" fill="rgba(255,255,255,0.1)" name="Competitor Share" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Strategic Recommendations */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-l-4 border-l-green-500 bg-card/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-bold text-green-500">
                <Target className="h-5 w-5" />
                Strategic Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <TrendingUp className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                  <span className="text-muted-foreground"><strong>Downy dominates fabric care:</strong> 78% sentiment vs. 55% competitor average.</span>
                </li>
                <li className="flex items-start gap-3">
                  <TrendingUp className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                  <span className="text-muted-foreground"><strong>Product quality perception:</strong> P&G brands score 13pts higher on product vector.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500 bg-card/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-bold text-orange-500">
                <Target className="h-5 w-5" />
                Competitive Threats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <TrendingDown className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-500" />
                  <span className="text-muted-foreground"><strong>Surf price competitiveness:</strong> Value vector shows 8pt gap favoring Surf.</span>
                </li>
                <li className="flex items-start gap-3">
                  <TrendingDown className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-500" />
                  <span className="text-muted-foreground"><strong>Laundry detergent share:</strong> P&G at 33% vs. 67% competitor combined.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

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

export default function CompetitiveIntelligence() {
  const allProducts = [...pngProducts, ...competitorProducts];

  // Competitive positioning data (Sentiment vs Market Share)
  const positioningData = competitiveBenchmark.map((item) => ({
    brand: item.brand,
    sentiment: item.sentiment,
    marketShare: item.marketShare,
    growth: item.growth,
    isPNG: item.brand.includes('P&G'),
  }));

  // Category comparison
  const categoryComparison = [
    { category: 'Laundry Detergent', pngShare: 33, competitorShare: 67 },
    { category: 'Fabric Care', pngShare: 68, competitorShare: 32 },
    { category: 'Personal Care', pngShare: 45, competitorShare: 55 },
    { category: 'Dishwashing', pngShare: 52, competitorShare: 48 },
  ];

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold font-headline text-slate-900">Competitive Intelligence Engine</h1>
          <p className="text-slate-500 font-medium">
            Benchmarking P&G brands vs. Surf, Breeze, Champion, and Zonrox
          </p>
        </div>

        {/* Key Competitive Metrics */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <Card className="border-l-4 border-l-[#3b82f6] shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-slate-400">P&G Market Position</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-[#003da5]">#1</div>
              <p className="text-xs text-slate-500 font-semibold mt-1">
                Overall sentiment leader in laundry & fabric care
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Sentiment Advantage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-emerald-600">+15pts</div>
              <p className="text-xs text-slate-500 font-semibold mt-1">
                Average sentiment gap vs. top competitor (Surf)
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-[#a855f7] shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Growth Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-[#a855f7]">+5.2%</div>
              <p className="text-xs text-slate-500 font-semibold mt-1">Year-over-year sentiment improvement</p>
            </CardContent>
          </Card>
        </div>

        {/* Competitive Positioning Chart */}
        <Card className="mb-8 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Competitive Positioning: Sentiment vs. Market Share</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" dataKey="sentiment" name="Sentiment Score" unit="%" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis type="number" dataKey="marketShare" name="Market Share" unit="%" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <ZAxis type="number" dataKey="growth" range={[100, 1000]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" />
                <Scatter
                  name="P&G Brands"
                  data={positioningData.filter((d) => d.isPNG)}
                  fill="#003da5"
                />
                <Scatter
                  name="Competitors"
                  data={positioningData.filter((d) => !d.isPNG)}
                  fill="#94a3b8"
                />
              </ScatterChart>
            </ResponsiveContainer>
            <p className="mt-4 text-[10px] font-bold text-center uppercase tracking-widest text-slate-400">
              Bubble size represents growth rate. P&G brands (blue) cluster in high-sentiment,
              high-share quadrant.
            </p>
          </CardContent>
        </Card>

        {/* Brand Comparison Table */}
        <Card className="mb-8 shadow-sm overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Brand Performance Benchmark</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 text-left bg-slate-50/50 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    <th className="p-4">Brand</th>
                    <th className="p-4">Company</th>
                    <th className="p-4">Sentiment Score</th>
                    <th className="p-4">Market Share</th>
                    <th className="p-4">Growth Rate</th>
                    <th className="p-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium text-slate-700">
                  {competitiveBenchmark.map((brand, index) => {
                    const isPNG = brand.brand.includes('P&G');
                    return (
                      <tr key={index} className="border-b border-slate-50 last:border-b-0 hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 font-bold">{brand.brand}</td>
                        <td className="p-4">
                          {isPNG ? (
                            <Badge className="bg-[#003da5]/10 text-[#003da5] border-none text-[10px] font-bold">P&G</Badge>
                          ) : (
                            <Badge variant="outline" className="text-[10px] font-bold text-slate-400">Competitor</Badge>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
                              <div
                                className={`h-full ${isPNG ? 'bg-[#3b82f6]' : 'bg-slate-300'}`}
                                style={{ width: `${brand.sentiment}%` }}
                              />
                            </div>
                            <span className="text-[11px] font-mono">{brand.sentiment}%</span>
                          </div>
                        </td>
                        <td className="p-4 text-[11px] font-mono">{brand.marketShare}%</td>
                        <td className="p-4">
                          <div className="flex items-center gap-1 text-[11px] font-mono font-bold">
                            {brand.growth > 0 ? (
                              <>
                                <TrendingUp className="h-3 w-3 text-emerald-500" />
                                <span className="text-emerald-600">+{brand.growth}%</span>
                              </>
                            ) : (
                              <>
                                <TrendingDown className="h-3 w-3 text-rose-500" />
                                <span className="text-rose-600">{brand.growth}%</span>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          {isPNG && brand.sentiment > 70 ? (
                            <Badge className="bg-emerald-600 text-[10px] font-bold">Leading</Badge>
                          ) : isPNG ? (
                            <Badge className="bg-[#3b82f6] text-[10px] font-bold text-white">Strong</Badge>
                          ) : (
                            <Badge variant="secondary" className="text-[10px] font-bold opacity-60">Trailing</Badge>
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
        <Card className="mb-8 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Category Market Share (Sentiment-Weighted)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryComparison} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis dataKey="category" type="category" width={150} stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: '#f8fafc' }} />
                <Legend iconType="rect" />
                <Bar dataKey="pngShare" stackId="a" fill="#003da5" name="P&G Share" radius={[0, 0, 0, 0]} />
                <Bar dataKey="competitorShare" stackId="a" fill="#e2e8f0" name="Competitor Share" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Competitive Insights */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-l-4 border-l-emerald-500 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-bold text-emerald-700">
                <Target className="h-5 w-5" />
                P&G Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-sm font-medium text-slate-600">
                <li className="flex items-start gap-3">
                  <TrendingUp className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                  <span>
                    <strong className="text-slate-800">Downy dominates fabric care:</strong> 78% sentiment vs. 55% competitor
                    average
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <TrendingUp className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                  <span>
                    <strong className="text-slate-800">Product quality perception:</strong> P&G brands score 13pts higher on
                    product vector
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <TrendingUp className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                  <span>
                    <strong className="text-slate-800">Brand loyalty indicators:</strong> Higher repeat purchase mentions in
                    Taglish reviews
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-bold text-orange-700">
                <Target className="h-5 w-5" />
                Competitive Threats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-sm font-medium text-slate-600">
                <li className="flex items-start gap-3">
                  <TrendingDown className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-500" />
                  <span>
                    <strong className="text-slate-800">Surf price competitiveness:</strong> Value vector shows 8pt gap favoring
                    Surf
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <TrendingDown className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-500" />
                  <span>
                    <strong className="text-slate-800">Laundry detergent share:</strong> P&G at 33% vs. 67% competitor
                    combined
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <TrendingDown className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-500" />
                  <span>
                    <strong className="text-slate-800">Champion sachet growth:</strong> Increased penetration in the small-format segment detected.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Strategic Recommendations */}
        <Card className="mt-8 border-l-4 border-l-[#003da5] bg-[#003da5]/5 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-800">Strategic Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6 text-sm font-medium text-slate-600">
              <div>
                <h4 className="mb-1 font-bold text-slate-800">1. Defend Fabric Care</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Downy's 78% sentiment is a competitive moat. Increase investment and
                  feature prominently on platforms to maintain gap vs. competitors.
                </p>
              </div>
              <div>
                <h4 className="mb-1 font-bold text-slate-800">2. Value Perception</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Tide and Ariel trail Surf on value vector. Consider promotional bundles or
                  sachet/refill options to improve price perception.
                </p>
              </div>
              <div>
                <h4 className="mb-1 font-bold text-slate-800">3. Category Share</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Despite higher sentiment, P&G has only 33% laundry share. Leverage superior
                  product scores to justify premium positioning and grow distribution.
                </p>
              </div>
              <div>
                <h4 className="mb-1 font-bold text-slate-800">4. Sachet Segment</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Monitor Champion's sachet performance. Deploy targeted sachet SKUs
                  to protect the low-income segment from competitive gains.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

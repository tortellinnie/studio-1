
"use client";

import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { pngProducts, sentimentTrends, vectorScores } from '@/data/mockData';

export default function DashboardPage() {
  const totalReviews = pngProducts.reduce((sum, p) => sum + p.reviewCount, 0);
  const avgCorrectedRating = pngProducts.reduce((sum, p) => sum + p.correctedRating, 0) / pngProducts.length;
  const avgOriginalRating = pngProducts.reduce((sum, p) => sum + p.originalRating, 0) / pngProducts.length;
  const ratingInflation = ((avgOriginalRating - avgCorrectedRating) / avgCorrectedRating * 100).toFixed(1);

  const sentimentData = [
    { name: 'Positive', value: 68, color: 'hsl(var(--primary))' },
    { name: 'Neutral', value: 22, color: '#f59e0b' },
    { name: 'Negative', value: 10, color: '#ef4444' }
  ];

  return (
    <Layout>
      <div className="p-8 space-y-8 animate-in fade-in duration-500">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-extrabold font-headline">Dashboard Overview</h1>
          <p className="text-muted-foreground font-medium">GenAI-powered insights for P&G e-commerce performance</p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Total Reviews Analyzed", value: totalReviews.toLocaleString(), sub: "Across all P&G products", icon: CheckCircle, color: "text-muted-foreground" },
            { title: "Avg Corrected Rating", value: avgCorrectedRating.toFixed(2), sub: `vs ${avgOriginalRating.toFixed(2)} original`, icon: TrendingUp, color: "text-green-500" },
            { title: "Rating Inflation", value: `${ratingInflation}%`, sub: "Lazada's 5-star bias", icon: AlertCircle, color: "text-orange-500" },
            { title: "Positive Sentiment", value: "68%", sub: "+3% from last month", icon: TrendingUp, color: "text-primary" },
          ].map((metric, i) => (
            <Card key={i} className="lavender-glow border-border/50 bg-card/40 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{metric.title}</CardTitle>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{metric.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-border/50 bg-card/40">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Sentiment Trends (6 Months)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={sentimentTrends}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
                  <Legend />
                  <Line type="monotone" dataKey="positive" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="neutral" stroke="#f59e0b" strokeWidth={2} />
                  <Line type="monotone" dataKey="negative" stroke="#ef4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/40">
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
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-border/50 bg-card/40">
            <CardHeader>
              <CardTitle className="text-lg font-bold">5 Vectors of Superiority</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={vectorScores}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="vector" stroke="rgba(255,255,255,0.3)" fontSize={10} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pngAvg" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="P&G Average" />
                  <Bar dataKey="competitorAvg" fill="rgba(255,255,255,0.1)" radius={[4, 4, 0, 0]} name="Competitor Average" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/40">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Top Performing Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pngProducts
                  .sort((a, b) => b.correctedRating - a.correctedRating)
                  .slice(0, 5)
                  .map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                      <div className="flex-1">
                        <p className="font-bold text-sm">{product.name}</p>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground">{product.reviewCount.toLocaleString()} reviews</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground line-through">
                          {product.originalRating.toFixed(1)}
                        </span>
                        <div className="bg-primary/10 px-2 py-1 rounded border border-primary/20">
                          <span className="font-bold text-primary text-sm">
                            {product.correctedRating.toFixed(1)}
                          </span>
                        </div>
                        <TrendingUp className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights Panel */}
        <Card className="border-primary/20 bg-primary/5 lavender-glow">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Key Intelligence Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4 text-sm">
              {[
                { icon: CheckCircle, text: "Downy leads sentiment: 78% positive reviews with highest product vector score (0.98)", color: "text-green-500" },
                { icon: AlertCircle, text: "Safeguard needs attention: Only 62% positive sentiment, packaging concerns detected in Taglish reviews", color: "text-orange-500" },
                { icon: TrendingUp, text: "Value proposition strong: P&G products score 78/100 on value vector, outperforming competitors by 8 points", color: "text-primary" },
                { icon: CheckCircle, text: "Sentiment-corrected rankings reveal: Ariel's true performance is 4.3/5.0, not the inflated 4.8/5.0 from Lazada", color: "text-green-500" },
              ].map((insight, i) => (
                <li key={i} className="flex items-start gap-3">
                  <insight.icon className={`mt-0.5 h-4 w-4 flex-shrink-0 ${insight.color}`} />
                  <span className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">{insight.text.split(':')[0]}:</strong>
                    {insight.text.split(':')[1]}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

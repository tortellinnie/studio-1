
"use client";

import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { sampleReviews, pngProducts } from '@/data/mockData';
import { Smile, Meh, Frown, CheckCircle2 } from 'lucide-react';

export default function SentimentAnalysisPage() {
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <Smile className="h-5 w-5 text-green-500" />;
      case 'neutral':
        return <Meh className="h-5 w-5 text-orange-500" />;
      case 'negative':
        return <Frown className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getSentimentBadge = (sentiment: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      positive: 'default',
      neutral: 'secondary',
      negative: 'destructive'
    };
    return variants[sentiment] || 'outline';
  };

  return (
    <Layout>
      <div className="p-8 space-y-8 animate-in fade-in duration-500">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold font-headline mb-2">Taglish-Aware AI Sentiment</h1>
          <p className="text-muted-foreground font-medium">
            Advanced NLP model trained on Filipino-English code-switching patterns
          </p>
        </div>

        {/* Sentiment Overview */}
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { label: "Positive", value: "68%", sub: "9,876 reviews", icon: Smile, color: "text-green-500", border: "border-l-green-500" },
            { label: "Neutral", value: "22%", sub: "3,198 reviews", icon: Meh, color: "text-orange-500", border: "border-l-orange-500" },
            { label: "Negative", value: "10%", sub: "1,453 reviews", icon: Frown, color: "text-red-500", border: "border-l-red-500" },
          ].map((item, i) => (
            <Card key={i} className={`border-l-4 ${item.border} bg-card/40`}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <item.icon className={`h-4 w-4 ${item.color}`} />
                  {item.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{item.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{item.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Product Sentiment Breakdown */}
        <Card className="border-border/50 bg-card/40">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Product-Level Sentiment Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {pngProducts.map((product) => (
              <div key={product.id} className="border-b border-border/50 pb-6 last:border-b-0 last:pb-0">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm">{product.name}</h3>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground mt-1">{product.reviewCount.toLocaleString()} reviews analyzed</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase">
                      <span className="text-green-500">Positive</span>
                      <span className="font-mono">{product.sentimentDistribution.positive}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/30">
                      <div className="h-full bg-green-500" style={{ width: `${product.sentimentDistribution.positive}%` }} />
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase">
                      <span className="text-orange-500">Neutral</span>
                      <span className="font-mono">{product.sentimentDistribution.neutral}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/30">
                      <div className="h-full bg-orange-500" style={{ width: `${product.sentimentDistribution.neutral}%` }} />
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase">
                      <span className="text-red-500">Negative</span>
                      <span className="font-mono">{product.sentimentDistribution.negative}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/30">
                      <div className="h-full bg-red-500" style={{ width: `${product.sentimentDistribution.negative}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Sample Reviews */}
        <Card className="border-border/50 bg-card/40">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Recent Taglish Reviews (AI-Analyzed)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {sampleReviews.map((review) => {
              const product = pngProducts.find((p) => p.id === review.productId);
              return (
                <div key={review.id} className="rounded-xl border border-border/50 bg-muted/10 p-5 hover:bg-muted/20 transition-colors">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-3">
                        <h4 className="font-bold text-sm">{product?.name}</h4>
                        <Badge variant={getSentimentBadge(review.sentiment)} className="text-[8px] font-bold uppercase">
                          {review.sentiment}
                        </Badge>
                      </div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        {review.account} • {new Date(review.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {getSentimentIcon(review.sentiment)}
                      <span className="text-[10px] font-mono font-bold text-primary">
                        Score: {(review.sentimentScore * 100).toFixed(0)}
                      </span>
                    </div>
                  </div>
                  <p className="mb-4 text-sm font-medium leading-relaxed italic opacity-80">"{review.text}"</p>
                  <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-tighter text-muted-foreground">
                    <span>Original Rating: {review.originalRating}/5</span>
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <span>AI Sentiment: {review.sentimentScore.toFixed(2)}</span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* AI Capabilities */}
        <Card className="border-primary/20 bg-primary/5 lavender-glow">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Taglish NLP Capabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid md:grid-cols-2 gap-4 text-xs font-semibold">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                <span className="leading-relaxed"><strong>Code-switching detection:</strong> Identifies Filipino-English mixed language patterns.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                <span className="leading-relaxed"><strong>Contextual sentiment:</strong> "Okay naman pero..." correctly classified as neutral.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                <span className="leading-relaxed"><strong>Colloquial expressions:</strong> Understands "Sulit!", "Worth it talaga!", "Di ko na uulitin".</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                <span className="leading-relaxed"><strong>Intensity modifiers:</strong> Recognizes "Sobrang", "Ang", "Talaga" as amplifiers.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

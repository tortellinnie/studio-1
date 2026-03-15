
"use client";

import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { pngProducts, accountRecommendations } from '@/data/mockData';
import { TrendingUp, ShoppingCart, Info, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AccountRecommendations() {
  const lazadaAccount = accountRecommendations[0];

  // Logic: Rank P&G products by % positive sentiment weighted by review volume
  const subcategories = Array.from(new Set(pngProducts.map(p => p.subcategory)));
  
  const subcategoryRecommendations = subcategories.map(sub => {
    const productsInSub = pngProducts
      .filter(p => p.subcategory === sub)
      .map(p => ({
        ...p,
        weightedScore: (p.sentimentDistribution.positive / 100) * p.reviewCount
      }))
      .sort((a, b) => b.weightedScore - a.weightedScore)
      .slice(0, 3);

    return {
      name: sub,
      products: productsInSub
    };
  });

  return (
    <Layout>
      <div className="p-10 space-y-10 max-w-[1400px] mx-auto animate-in fade-in duration-500">
        <header className="space-y-2">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="secondary" className="bg-blue-50 text-[#003da5] font-bold border-none">ACCOUNT: LAZADA PH</Badge>
          </div>
          <h1 className="text-4xl font-extrabold font-headline tracking-tight text-slate-900">Lazada Product Recommendations</h1>
          <p className="text-slate-500 font-medium text-lg">AI-powered prioritization based on sentiment-weighted demand proxies.</p>
        </header>

        {/* Global Strategy Card */}
        <Card className="border-l-4 border-l-[#003da5] bg-white shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#003da5]/10 rounded-lg">
                  <ShoppingCart className="h-5 w-5 text-[#003da5]" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold">{lazadaAccount.account}</CardTitle>
                  <CardDescription className="font-medium">Channel Priority Hub</CardDescription>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Channel Score</p>
                <div className="text-3xl font-black text-[#003da5] leading-none">{lazadaAccount.priorityScore}</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">AI Strategic Rationale</h4>
                <p className="text-slate-600 font-medium italic leading-relaxed border-l-2 border-slate-200 pl-4 py-1">
                  "{lazadaAccount.rationale}"
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Priority Actions</h4>
                <ul className="space-y-3">
                  {lazadaAccount.recommendedActions.map((action, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#003da5] shrink-0" />
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subcategory Specific Recommendations */}
        <div className="space-y-8">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            <h2 className="text-2xl font-bold text-slate-800">Top Weighted Recommendations by Subcategory</h2>
          </div>

          <div className="grid gap-8">
            {subcategoryRecommendations.map((sub) => (
              <div key={sub.name} className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge className="bg-slate-800 text-white border-none font-bold text-[10px] uppercase tracking-wider py-1 px-3">
                    {sub.name}
                  </Badge>
                  <div className="h-px bg-slate-200 flex-1" />
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  {sub.products.map((product, index) => (
                    <Card key={product.id} className="border-slate-200 hover:border-[#003da5]/30 transition-all group">
                      <CardContent className="p-6 space-y-6">
                        <div className="flex justify-between items-start">
                          <div className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-lg font-bold text-xs",
                            index === 0 ? "bg-[#003da5] text-white" : "bg-slate-100 text-slate-500"
                          )}>
                            #{index + 1}
                          </div>
                          {index === 0 && (
                            <Badge className="bg-emerald-600 border-none text-[9px] font-bold uppercase tracking-tighter">
                              HIGHEST PRIORITY
                            </Badge>
                          )}
                        </div>

                        <div className="space-y-1">
                          <h3 className="font-bold text-lg text-slate-900 group-hover:text-[#003da5] transition-colors">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                            <span>{product.reviewCount.toLocaleString()} REVIEWS</span>
                            <span className="h-1 w-1 rounded-full bg-slate-200" />
                            <span className="text-emerald-600">{product.sentimentDistribution.positive}% POSITIVE</span>
                          </div>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-2 opacity-10">
                            <Info className="h-8 w-8" />
                          </div>
                          <p className="text-xs text-slate-600 font-bold leading-relaxed">
                            <span className="text-[#003da5]">{product.name}</span> has <span className="text-emerald-600">{product.sentimentDistribution.positive}%</span> positive sentiment across <span className="text-slate-900">{product.reviewCount.toLocaleString()}</span> reviews and is trending up in <span className="text-slate-900">Oct 2023</span> — recommend prioritizing stock for Lazada account.
                          </p>
                        </div>

                        <button className="w-full py-2.5 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#003da5] border-t border-slate-100 mt-2 transition-colors">
                          VIEW VECTOR DETAILS <ArrowRight className="h-3 w-3" />
                        </button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Methodology Footer */}
        <Card className="bg-slate-900 text-white border-none shadow-xl">
          <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">Recommendation Algorithm v2.1</h4>
              <p className="text-slate-400 text-xs font-medium max-w-xl">
                Our ranking engine weights positive sentiment percentage against absolute review volume (Demand Proxy). This ensures high-growth SKUs are prioritized for fulfillment allocation.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="text-center px-4 border-r border-white/10">
                <div className="text-2xl font-black">37.5k</div>
                <div className="text-[9px] font-bold text-slate-500 uppercase">Reviews Analyzed</div>
              </div>
              <div className="text-center px-4">
                <div className="text-2xl font-black">94.2%</div>
                <div className="text-[9px] font-bold text-slate-500 uppercase">Model Confidence</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

import inferenceCache from '../../inference_cache.json';

type CacheItem = {
  internalReviewId: string;
  sentimentLabel: string;
  score: number;
  vectors: string;
  timestamp?: Date;
};

const rawEntries = Object.values(inferenceCache) as CacheItem[];

// Simulate 90-day time distribution
const cacheEntries = rawEntries.map((item, index) => {
  const date = new Date();
  date.setDate(date.getDate() - (index % 90));
  return { ...item, timestamp: date };
});

export const totalCacheCount = cacheEntries.length;

// PERIOD-BASED CALCULATIONS
export function getStatsForPeriod(days: number) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  
  const filtered = cacheEntries.filter(e => e.timestamp! >= cutoff);
  const total = filtered.length || 1;
  const positive = filtered.filter(e => e.sentimentLabel === 'positive');
  const negative = filtered.filter(e => e.sentimentLabel === 'negative');
  const neutral = filtered.filter(e => e.sentimentLabel === 'neutral');

  const posPct = Math.round((positive.length / total) * 100);
  const negPct = Math.round((negative.length / total) * 100);
  
  // 0-5 Rating conversion: Weighted by confidence scores
  const weightedSum = positive.reduce((acc, curr) => acc + curr.score, 0);
  const correctedRating = ((weightedSum / total) * 5).toFixed(1);

  return {
    total,
    posPct,
    negPct,
    neutralPct: 100 - posPct - negPct,
    correctedRating: parseFloat(correctedRating),
    revenueAtRisk: Math.round(negative.reduce((acc, e) => acc + (e.score * (50000000 / totalCacheCount)), 0))
  };
}

// Global Static Stats (All Time)
export const globalStats = getStatsForPeriod(90);

// VECTOR ANALYSIS
const vectorLabels = ["Product", "Packaging", "Value", "Communication", "Retail Execution"];
export const dynamicVectorScores = vectorLabels.map(label => {
  const mentioned = cacheEntries.filter(e => e.vectors.includes(label));
  const pos = mentioned.filter(e => e.sentimentLabel === 'positive').length;
  const healthScore = mentioned.length > 0 ? Math.round((pos / mentioned.length) * 100) : 0;
  return { vector: label, healthScore, count: mentioned.length };
});

export const criticalVector = [...dynamicVectorScores].sort((a, b) => a.healthScore - b.healthScore)[0];
export const bestVector = [...dynamicVectorScores].sort((a, b) => b.healthScore - a.healthScore)[0];

// PERSONA BRIEFING ENGINE
const productPos = dynamicVectorScores.find(v => v.vector === "Product")?.healthScore || 0;
const retailPos = dynamicVectorScores.find(v => v.vector === "Retail Execution")?.healthScore || 0;

export const personaInsights = {
  supplyChain: {
    alertScore: 10 - Math.round(retailPos / 10),
    recommendation: `Logistics friction in ${criticalVector.vector === "Retail Execution" ? "Luzon Hubs" : "Packaging"} identified. Priority SKUs flagged for stock buffers.`
  },
  brandManager: {
    resonance: dynamicVectorScores.find(v => v.vector === "Communication")?.healthScore || 0,
    taglishNuance: dynamicVectorScores.find(v => v.vector === "Value")?.healthScore! > 70 ? "'Sulit' outweighs 'Mahal'" : "Price friction peaking",
    campaignPivot: productPos > 80 ? "Leverage Cleanliness Superiority" : "Pivot to 'Bango' hooks"
  },
  socialStrategist: {
    viralRisk: globalStats.negPct > 15 ? "CRITICAL" : "LOW",
    suggestedResponse: "Salamat sa feedback! We hear you sa concerns sa delivery. We're fixing this para mas 'sulit' ang P&G order niyo next time. DM us for help!"
  }
};

// COMPETITIVE LIST
const rawSkus = [
  { name: 'Downy Garden Bloom', brand: 'P&G', isPNG: true },
  { name: 'Ariel Sunrise Fresh', brand: 'P&G', isPNG: true },
  { name: 'Surf Cherry Blossom', brand: 'Unilever', isPNG: false },
  { name: 'Tide Perfect Clean', brand: 'P&G', isPNG: true },
  { name: 'Breeze Power Clean', brand: 'Unilever', isPNG: false },
  { name: 'Champion High Foam', brand: 'Local', isPNG: false },
  { name: 'Zonrox Colorsafe', brand: 'Local', isPNG: false },
];

export const allIndustryProducts = rawSkus.map((sku, i) => {
  const sentimentScore = sku.isPNG ? globalStats.posPct + (i % 3) : globalStats.posPct - (i % 5);
  return {
    id: `p-${i}`,
    ...sku,
    originalRating: 4.8,
    correctedRating: (1 + (sentimentScore / 100) * 4).toFixed(1),
    sentimentScore
  };
}).sort((a, b) => parseFloat(b.correctedRating) - parseFloat(a.correctedRating));

// TREND DATA
export const sentimentTrends = [
  { month: 'Jan', positive: 65, negative: 15 },
  { month: 'Feb', positive: 68, negative: 12 },
  { month: 'Mar', positive: globalStats.posPct, negative: globalStats.negPct }
];

export const promoRecommendations = [
  { sku: "Downy Garden Bloom", priority: "High", targetVector: "Value Perception", recommendedPromo: "Buy 1 Take 1 Flash Sale" },
  { sku: "Ariel Sunrise Fresh", priority: "Medium", targetVector: "Retail Availability", recommendedPromo: "Free Shipping Vouchers" },
  { sku: "Tide Perfect Clean", priority: "High", targetVector: "Quality Reassurance", recommendedPromo: "Sampling Bundle" }
];

export const accountRecommendations = [
  { name: "Lazada", priorityScore: 92, rationale: "Logistics friction in Taglish comments.", recommendedActions: ["Upgrade 3PL tracking"] }
];
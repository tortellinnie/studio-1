import inferenceCache from '../../inference_cache.json';

type CacheItem = {
  internalReviewId: string;
  sentimentLabel: string;
  score: number;
  vectors: string;
  timestamp?: Date;
};

const rawEntries = Object.values(inferenceCache) as CacheItem[];
export const totalCacheCount = rawEntries.length;

// Simulate 90-day time distribution deterministically based on entry index
export const cacheEntries = rawEntries.map((item, index) => {
  const date = new Date('2024-03-15T00:00:00Z');
  const denominator = Math.max(totalCacheCount / 90, 1);
  date.setDate(date.getDate() - Math.floor(index / denominator));
  return { ...item, timestamp: new Date(date) };
});

// PERIOD-BASED CALCULATIONS
export function getStatsForPeriod(days: number) {
  const cutoff = new Date('2024-03-15T00:00:00Z');
  cutoff.setDate(cutoff.getDate() - days);
  
  const filtered = cacheEntries.filter(e => e.timestamp! >= cutoff);
  const total = filtered.length || 1;
  const positive = filtered.filter(e => e.sentimentLabel === 'positive');
  const negative = filtered.filter(e => e.sentimentLabel === 'negative');
  const neutral = filtered.filter(e => e.sentimentLabel === 'neutral');

  const posPct = Math.round((positive.length / total) * 100);
  const negPct = Math.round((negative.length / total) * 100);
  const neutralPct = Math.round((neutral.length / total) * 100);
  
  const weightedSum = positive.reduce((acc, curr) => acc + curr.score, 0);
  const correctedRating = (1 + (weightedSum / total) * 4).toFixed(2);

  // Timeline grouping by day
  const timelineMap = new Map();
  filtered.forEach(e => {
    const dStr = e.timestamp!.toISOString().split('T')[0];
    if (!timelineMap.has(dStr)) {
      timelineMap.set(dStr, { date: dStr, positive: 0, neutral: 0, negative: 0, totalScore: 0, count: 0 });
    }
    const day = timelineMap.get(dStr);
    day[e.sentimentLabel]++;
    day.totalScore += e.score;
    day.count++;
  });

  const timeline = Array.from(timelineMap.values()).sort((a, b) => a.date.localeCompare(b.date)).map(d => ({
    name: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    Positive: d.positive,
    Neutral: d.neutral,
    Negative: d.negative,
    'Sentiment Score': parseFloat((1 + (d.totalScore / d.count) * 4).toFixed(1))
  }));

  return {
    total,
    posPct,
    negPct,
    neutralPct,
    totalUsers: new Set(filtered.map(e => e.internalReviewId)).size,
    correctedRating: parseFloat(correctedRating),
    timeline,
    revenueAtRisk: Math.round(negative.reduce((acc, e) => acc + (e.score * (50000000 / totalCacheCount)), 0))
  };
}

export const globalStats = getStatsForPeriod(90);
export const dynamicGlobalSentiment = {
  positive: globalStats.posPct,
  negative: globalStats.negPct,
  neutral: globalStats.neutralPct
};
export const globalCorrectedRating = globalStats.correctedRating;

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

// PERSONA INTELLIGENCE ENGINE
const retailPos = dynamicVectorScores.find(v => v.vector === "Retail Execution")?.healthScore || 0;
const valuePos = dynamicVectorScores.find(v => v.vector === "Value")?.healthScore || 0;
const productPos = dynamicVectorScores.find(v => v.vector === "Product")?.healthScore || 0;

export const personaInsights = {
  supplyChain: {
    alertScore: Math.min(10, Math.max(1, 10 - Math.floor(retailPos / 10))),
    recommendation: `Logistics friction identified in ${criticalVector.vector} vector. Action: Prioritize multi-pack bundles for high-volume accounts to absorb rising 3PL costs.`
  },
  brandManager: {
    taglishNuance: valuePos > 65 ? "'Sulit' (Value) sentiment is defending price gaps." : "'Mahal' friction is eroding brand equity.",
    campaignPivot: productPos > 75 ? "Double down on 'Linis' superiority." : "Pivot marketing to 'Bango' hooks immediately."
  },
  socialStrategist: {
    viralRisk: dynamicGlobalSentiment.negative > 15 ? "CRITICAL" : "MODERATE",
    suggestedResponse: "Hi! Salamat sa feedback. We hear you sa concerns sa delivery. We're working to make sure next time 'sulit' ang experience. DM us para matulungan namin kayo directly! 💙"
  }
};

export const promoRecommendations = [
  { sku: "Downy Garden Bloom", priority: "High", targetVector: "Value Perception", recommendedPromo: "Buy 1 Take 1 Flash Sale" },
  { sku: "Ariel Sunrise Fresh", priority: "Medium", targetVector: "Retail Availability", recommendedPromo: "Free Shipping Vouchers" },
  { sku: "Tide Perfect Clean", priority: "High", targetVector: "Quality Reassurance", recommendedPromo: "Sampling Bundle" }
];

export const competitiveBenchmark = [
  { brand: 'P&G', sentiment: globalStats.posPct, marketShare: 42, growth: 12 },
  { brand: 'Unilever', sentiment: Math.max(0, globalStats.posPct - 15), marketShare: 35, growth: 8 },
  { brand: 'Local', sentiment: Math.max(0, globalStats.posPct - 25), marketShare: 15, growth: 5 },
];

export const allIndustryProducts = [
  { id: 'pg-1', name: 'Downy Garden Bloom', brand: 'P&G', originalRating: 4.8, correctedRating: 4.2, sentimentScore: 82, isPNG: true },
  { id: 'pg-2', name: 'Ariel Sunrise Fresh', brand: 'P&G', originalRating: 4.9, correctedRating: 4.1, sentimentScore: 78, isPNG: true },
  { id: 'uni-1', name: 'Surf Cherry Blossom', brand: 'Unilever', originalRating: 4.7, correctedRating: 3.5, sentimentScore: 62, isPNG: false },
  { id: 'loc-1', name: 'Champion High Foam', brand: 'Local', originalRating: 4.6, correctedRating: 3.2, sentimentScore: 55, isPNG: false },
];

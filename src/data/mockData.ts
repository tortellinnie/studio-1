
import inferenceCache from '../../inference_cache.json';

// Type definition for the cache
type CacheItem = {
  internalReviewId: string;
  sentimentLabel: string;
  score: number;
  vectors: string;
};

const cacheEntries = Object.values(inferenceCache) as CacheItem[];

// Calculate dynamic global stats
export const totalCacheCount = cacheEntries.length;
export const positiveCount = cacheEntries.filter(e => e.sentimentLabel === 'positive').length;
export const negativeCount = cacheEntries.filter(e => e.sentimentLabel === 'negative').length;
export const neutralCount = cacheEntries.filter(e => e.sentimentLabel === 'neutral').length;

export const dynamicGlobalSentiment = {
  positive: Math.round((positiveCount / totalCacheCount) * 100),
  negative: Math.round((negativeCount / totalCacheCount) * 100),
  neutral: Math.round((neutralCount / totalCacheCount) * 100),
};

// Process Vectors of Superiority
const vectorLabels = ["Product", "Packaging", "Value", "Communication", "Retail Execution"];
export const dynamicVectorScores = vectorLabels.map(label => {
  const mentionedEntries = cacheEntries.filter(e => e.vectors.includes(label));
  const posMentions = mentionedEntries.filter(e => e.sentimentLabel === 'positive').length;
  const healthScore = mentionedEntries.length > 0 
    ? Math.round((posMentions / mentionedEntries.length) * 100) 
    : 0;
    
  return {
    vector: label,
    count: mentionedEntries.length,
    healthScore
  };
});

export const competitiveBenchmark = [
  { brand: 'P&G Portfolio', sentiment: Math.round((positiveCount / totalCacheCount) * 100), marketShare: 42, growth: 5.2 },
  { brand: 'Surf', sentiment: 58, marketShare: 28, growth: -1.2 },
  { brand: 'Breeze', sentiment: 62, marketShare: 15, growth: 2.4 },
  { brand: 'Champion', sentiment: 55, marketShare: 8, growth: 0.8 },
  { brand: 'Zonrox', sentiment: 68, marketShare: 12, growth: 3.1 },
];

export const pngProducts = [
  {
    id: 'p1',
    name: 'Downy Garden Bloom',
    brand: 'Downy (P&G)',
    category: 'Fabric Care',
    subcategory: 'Fabric Conditioner',
    reviewCount: 15420,
    originalRating: 4.9,
    correctedRating: 4.6,
    sentimentScore: 78,
    sentimentDistribution: { positive: 78, neutral: 15, negative: 7 },
    vectors: { product: 88, packaging: 82, value: 78, communication: 72, retailExec: 65 }
  },
  {
    id: 'p1-2',
    name: 'Downy Sunrise Fresh',
    brand: 'Downy (P&G)',
    category: 'Fabric Care',
    subcategory: 'Fabric Conditioner',
    reviewCount: 12100,
    originalRating: 4.8,
    correctedRating: 4.5,
    sentimentScore: 75,
    sentimentDistribution: { positive: 75, neutral: 18, negative: 7 },
    vectors: { product: 86, packaging: 80, value: 75, communication: 70, retailExec: 60 }
  },
  {
    id: 'p2',
    name: 'Ariel Sunrise Fresh Liquid',
    brand: 'Ariel (P&G)',
    category: 'Fabric Care',
    subcategory: 'Liquid Detergent',
    reviewCount: 12300,
    originalRating: 4.8,
    correctedRating: 4.3,
    sentimentScore: 72,
    sentimentDistribution: { positive: 72, neutral: 18, negative: 10 },
    vectors: { product: 85, packaging: 80, value: 45, communication: 70, retailExec: 85 }
  },
  {
    id: 'p3',
    name: 'Tide Perfect Clean Powder',
    brand: 'Tide (P&G)',
    category: 'Fabric Care',
    subcategory: 'Powder Detergent',
    reviewCount: 9800,
    originalRating: 4.7,
    correctedRating: 4.2,
    sentimentScore: 65,
    sentimentDistribution: { positive: 65, neutral: 25, negative: 10 },
    vectors: { product: 82, packaging: 75, value: 60, communication: 68, retailExec: 70 }
  },
  {
    id: 'p4',
    name: 'Safeguard Bar Soap',
    brand: 'Safeguard (P&G)',
    category: 'Personal Care',
    subcategory: 'Bar Soap',
    reviewCount: 8760,
    originalRating: 4.7,
    correctedRating: 3.9,
    sentimentScore: 62,
    sentimentDistribution: { positive: 62, neutral: 25, negative: 13 },
    vectors: { product: 80, packaging: 70, value: 65, communication: 60, retailExec: 75 }
  }
];

export const accountRecommendations = [
  {
    account: 'Lazada Philippines',
    sentimentTrend: 'improving',
    priorityScore: 92,
    topProduct: 'Downy Garden Bloom',
    rationale: `Sentiment is ${dynamicGlobalSentiment.positive - 50}pts above category average. High demand signals in Taglish reviews for "long-lasting scent" justify inventory optimization.`,
    recommendedActions: [
      'Increase ad spend on Downy bundle deals',
      'Optimize keyword bidding for "long-lasting scent"',
      'Monitor competitor "Surf" flash sale activity'
    ]
  }
];

export const sentimentTrends = [
  { month: 'Jan', positive: 62, neutral: 25, negative: 13 },
  { month: 'Feb', positive: 64, neutral: 24, negative: 12 },
  { month: 'Mar', positive: 63, neutral: 26, negative: 11 },
  { month: 'Apr', positive: 66, neutral: 23, negative: 11 },
  { month: 'May', positive: 67, neutral: 23, negative: 10 },
  { month: 'Jun', positive: dynamicGlobalSentiment.positive, neutral: dynamicGlobalSentiment.neutral, negative: dynamicGlobalSentiment.negative }
];

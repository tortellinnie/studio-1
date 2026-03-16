import inferenceCache from '../../inference_cache.json';

type CacheItem = {
  internalReviewId: string;
  sentimentLabel: string;
  score: number;
  vectors: string;
};

const rawEntries = Object.values(inferenceCache) as CacheItem[];
export const totalCacheCount = rawEntries.length;

// Simulate 90-day time distribution deterministically based on entry index
export const cacheEntries = rawEntries.map((item, index) => {
  const date = new Date('2024-03-15T00:00:00Z');
  const stableDenominator = rawEntries.length > 0 ? rawEntries.length / 90 : 1;
  date.setDate(date.getDate() - Math.floor(index / stableDenominator));
  // Deterministically assign to P&G or Market (60/40 split)
  const isPNG = index % 10 < 6; 
  return { ...item, timestamp: new Date(date), isPNG };
});

// PERIOD-BASED CALCULATIONS
export function getStatsForPeriod(days: number) {
  const cutoff = new Date('2024-03-15T00:00:00Z');
  cutoff.setDate(cutoff.getDate() - days);
  
  const filtered = cacheEntries.filter(e => e.timestamp >= cutoff);
  const total = filtered.length || 1;
  const positive = filtered.filter(e => e.sentimentLabel === 'positive');
  const negative = filtered.filter(e => e.sentimentLabel === 'negative');

  const posPct = Math.round((positive.length / total) * 100);
  const negPct = Math.round((negative.length / total) * 100);
  
  const weightedSum = positive.reduce((acc, curr) => acc + curr.score, 0);
  const correctedRating = (1 + (weightedSum / total) * 4).toFixed(2);

  // Timeline grouping by day for Daily Sentiment Pulse
  const timelineMap = new Map();
  filtered.forEach(e => {
    const dStr = e.timestamp.toISOString().split('T')[0];
    if (!timelineMap.has(dStr)) {
      timelineMap.set(dStr, { 
        date: dStr, 
        pg_pos: 0, pg_neu: 0, pg_neg: 0,
        mkt_pos: 0, mkt_neu: 0, mkt_neg: 0,
        pg_total_score: 0, pg_count: 0,
        mkt_total_score: 0, mkt_count: 0
      });
    }
    const day = timelineMap.get(dStr);
    const prefix = e.isPNG ? 'pg' : 'mkt';
    day[`${prefix}_${e.sentimentLabel === 'positive' ? 'pos' : e.sentimentLabel === 'negative' ? 'neg' : 'neu'}`]++;
    day[`${prefix}_total_score`] += e.score;
    day[`${prefix}_count`]++;
  });

  const timeline = Array.from(timelineMap.values()).sort((a, b) => a.date.localeCompare(b.date)).map(d => {
    const pgPosPct = d.pg_count > 0 ? (d.pg_pos / d.pg_count) * 100 : 0;
    const mktPosPct = d.mkt_count > 0 ? (d.mkt_pos / d.mkt_count) * 100 : 0;
    const gap = Math.round(pgPosPct - mktPosPct);
    
    return {
      name: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      pg_pos: d.pg_pos,
      pg_neu: d.pg_neu,
      pg_neg: d.pg_neg,
      mkt_pos: d.mkt_pos,
      mkt_neu: d.mkt_neu,
      mkt_neg: d.mkt_neg,
      gap: gap >= 0 ? `+${gap}% Lead` : `${gap}% Lag`,
      totalCount: d.pg_pos + d.pg_neu + d.pg_neg + d.mkt_pos + d.mkt_neu + d.mkt_neg
    };
  });

  return {
    total,
    posPct,
    negPct,
    totalUsers: new Set(filtered.map(e => e.internalReviewId)).size,
    correctedRating: parseFloat(correctedRating),
    timeline,
    ratingInflation: 14.8
  };
}

export const globalStats = getStatsForPeriod(90);
export const dynamicGlobalSentiment = {
  positive: globalStats.posPct,
  negative: globalStats.negPct
};
export const globalCorrectedRating = globalStats.correctedRating;

// VECTOR ANALYSIS (Spider Map Comparison Logic)
const vectorLabels = ["Product", "Packaging", "Value", "Communication", "Retail Execution"];
export const dynamicVectorScores = vectorLabels.map(label => {
  const pgEntries = cacheEntries.filter(e => e.isPNG && e.vectors.includes(label));
  const mktEntries = cacheEntries.filter(e => !e.isPNG && e.vectors.includes(label));

  const calculateHealth = (entries: typeof cacheEntries) => {
    if (entries.length === 0) return 0;
    const pos = entries.filter(e => e.sentimentLabel === 'positive').length;
    return Math.round((pos / entries.length) * 100);
  };

  const pgHealth = calculateHealth(pgEntries);
  const mktHealth = calculateHealth(mktEntries);

  return { 
    vector: label, 
    pgScore: pgHealth, 
    mktScore: mktHealth,
    pgCount: pgEntries.length,
    mktCount: mktEntries.length
  };
});

// COMPETITIVE INDEX DELTA LOGIC
export const pgBrands = ['Tide', 'Ariel', 'Downy'];

export function getSuperiorityMatrix() {
  const competitorEntries = cacheEntries.filter(e => !e.isPNG);
  
  const getAvgScore = (entries: typeof cacheEntries, vector: string) => {
    const vectorEntries = entries.filter(e => e.vectors.includes(vector));
    if (vectorEntries.length === 0) return 0;
    const pos = vectorEntries.filter(e => e.sentimentLabel === 'positive').length;
    return (pos / vectorEntries.length);
  };

  const marketAverages = vectorLabels.reduce((acc, vector) => {
    acc[vector] = getAvgScore(competitorEntries, vector);
    return acc;
  }, {} as any);

  return pgBrands.map((brand, bIdx) => {
    // Distribute P&G entries across brands for simulation
    const brandEntries = cacheEntries.filter((e, i) => e.isPNG && (i % pgBrands.length === bIdx));
    
    const deltas = vectorLabels.map(vector => {
      const brandScore = getAvgScore(brandEntries, vector);
      const marketScore = marketAverages[vector];
      return {
        vector,
        delta: Math.round((brandScore - marketScore) * 100)
      };
    });

    return { brand, deltas };
  });
}

export const criticalVector = [...dynamicVectorScores].sort((a, b) => a.pgScore - b.pgScore)[0] || { vector: 'None', pgScore: 100 };
export const bestVector = [...dynamicVectorScores].sort((a, b) => b.pgScore - a.pgScore)[0] || { vector: 'None', pgScore: 0 };

export const allIndustryProducts = [
  { id: 'pg-1', name: 'Downy Garden Bloom', brand: 'P&G', originalRating: 4.8, correctedRating: 4.2, sentimentScore: 82, isPNG: true },
  { id: 'pg-2', name: 'Ariel Sunrise Fresh', brand: 'P&G', originalRating: 4.9, correctedRating: 4.1, sentimentScore: 78, isPNG: true },
  { id: 'uni-1', name: 'Surf Cherry Blossom', brand: 'Unilever', originalRating: 4.7, correctedRating: 3.5, sentimentScore: 62, isPNG: false },
  { id: 'loc-1', name: 'Champion High Foam', brand: 'Local', originalRating: 4.6, correctedRating: 3.2, sentimentScore: 55, isPNG: false },
];

export const competitiveBenchmark = [
  { brand: 'P&G', sentiment: 82, marketShare: 45, growth: 12 },
  { brand: 'Unilever', sentiment: 62, marketShare: 30, growth: -5 },
  { brand: 'Local Players', sentiment: 55, marketShare: 25, growth: 2 },
];

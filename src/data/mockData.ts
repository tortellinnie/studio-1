import inferenceCache from '../../inference_cache.json';

type CacheItem = {
  internalReviewId: string;
  sentimentLabel: string;
  score: number;
  vectors: string;
};

const rawEntries = Object.values(inferenceCache) as CacheItem[];
export const totalCacheCount = rawEntries.length;

// Vector labels used for all 5-vector analysis
const vectorLabels = ["Product", "Packaging", "Value", "Communication", "Retail Execution"];

// 1. Tag entries as P&G or Market deterministically for stable simulation
export const cacheEntries = rawEntries.map((item, index) => {
  const date = new Date('2024-03-15T00:00:00Z');
  const stableDenominator = rawEntries.length > 0 ? rawEntries.length / 90 : 1;
  date.setDate(date.getDate() - Math.floor(index / stableDenominator));
  
  // Deterministically assign to P&G or Market (60/40 split)
  const isPNG = index % 10 < 6; 
  return { ...item, timestamp: new Date(date), isPNG };
});

// 2. Define the Industry SKU set
export const industrySkus = [
  { name: 'Tide Original', brand: 'P&G', isPNG: true },
  { name: 'Tide Pods', brand: 'P&G', isPNG: true },
  { name: 'Ariel Sunrise Fresh', brand: 'P&G', isPNG: true },
  { name: 'Ariel Power Gel', brand: 'P&G', isPNG: true },
  { name: 'Downy Garden Bloom', brand: 'P&G', isPNG: true },
  { name: 'Downy Mystique', brand: 'P&G', isPNG: true },
  { name: 'Downy Antibac', brand: 'P&G', isPNG: true },
  { name: 'Surf Cherry Blossom', brand: 'Unilever', isPNG: false },
  { name: 'Breeze Power Clean', brand: 'Unilever', isPNG: false },
  { name: 'Champion High Foam', brand: 'Local', isPNG: false },
  { name: 'Pride Powder', brand: 'Local', isPNG: false }
];

// PERIOD-BASED KPI CALCULATIONS
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

  // Timeline grouping for Bar Charts
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

  return { total, posPct, negPct, correctedRating: parseFloat(correctedRating), timeline, ratingInflation: 14.8 };
}

// VECTOR ANALYSIS (Spider Map Logic)
export const dynamicVectorScores = vectorLabels.map(label => {
  const pgEntries = cacheEntries.filter(e => e.isPNG && e.vectors.includes(label));
  const mktEntries = cacheEntries.filter(e => !e.isPNG && e.vectors.includes(label));

  const calculateHealth = (entries: typeof cacheEntries) => {
    if (entries.length === 0) return 0;
    const pos = entries.filter(e => e.sentimentLabel === 'positive').length;
    return Math.round((pos / entries.length) * 100);
  };

  return { 
    vector: label, 
    pgScore: calculateHealth(pgEntries), 
    mktScore: calculateHealth(mktEntries),
    pgCount: pgEntries.length,
    mktCount: mktEntries.length
  };
});

// COMPETITIVE SUPERIORITY MATRIX LOGIC
export function getSuperiorityMatrix() {
  const competitorEntries = cacheEntries.filter(e => !e.isPNG);
  
  // 1. Calculate Market Baseline Score for each vector (Avg Competitor Score)
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

  // 2. Map each industry SKU to a slice of the cache and calculate Delta vs Market Baseline
  return industrySkus.map((sku, idx) => {
    // Deterministic data slicing for the simulation
    const pool = cacheEntries.filter(e => e.isPNG === sku.isPNG);
    const skuEntries = pool.filter((_, i) => i % (sku.isPNG ? 7 : 4) === (idx % (sku.isPNG ? 7 : 4)));
    
    const deltas = vectorLabels.map(vector => {
      const skuScore = getAvgScore(skuEntries, vector);
      const marketScore = marketAverages[vector];
      // Delta = (Brand Score - Market Baseline)
      return {
        vector,
        delta: Math.round((skuScore - marketScore) * 100)
      };
    });

    return { brand: sku.name, producer: sku.brand, deltas, isPNG: sku.isPNG };
  });
}

// RANKED INDUSTRY SKUS (Unified Ranking for Podium and List)
export function getRankedIndustrySkus() {
  const matrix = getSuperiorityMatrix();
  
  return matrix.map((item, idx) => {
    // Link back to original cache pool for sentiment ratio
    const pool = cacheEntries.filter(e => e.isPNG === item.isPNG);
    const skuEntries = pool.filter((_, i) => i % (item.isPNG ? 7 : 4) === (idx % (item.isPNG ? 7 : 4)));
    const totalCount = skuEntries.length || 1;
    const positiveCount = skuEntries.filter(e => e.sentimentLabel === 'positive').length;
    const ratio = positiveCount / totalCount;
    
    // Market Strength = Average Delta
    const avgDelta = item.deltas.reduce((acc, d) => acc + d.delta, 0) / item.deltas.length;

    return {
      name: item.brand,
      producer: item.producer,
      isPNG: item.isPNG,
      ratio,
      avgDelta,
      positiveCount,
      totalCount
    };
  }).sort((a, b) => b.avgDelta - a.avgDelta); // Primary sort by Superiority
}

export const criticalVector = [...dynamicVectorScores].sort((a, b) => a.pgScore - b.pgScore)[0] || { vector: 'None', pgScore: 100 };
export const competitiveBenchmark = [
  { brand: 'P&G', sentiment: 82, marketShare: 45, growth: 12 },
  { brand: 'Unilever', sentiment: 62, marketShare: 30, growth: -5 },
  { brand: 'Local Players', sentiment: 55, marketShare: 25, growth: 2 },
];


export const pngProducts = [
  {
    id: 'p1',
    name: 'Downy Fabric Conditioner',
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
    id: 'p2',
    name: 'Ariel Sunrise Fresh',
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
  }
];

export const competitorProducts = [
  { id: 'c1', name: 'Surf Cherry Blossom', brand: 'Surf', sentimentScore: 63 },
  { id: 'c2', name: 'Breeze Power Clean', brand: 'Breeze', sentimentScore: 65 }
];

export const multiBrandTrends = [
  { month: 'Jan', 'P&G': 65, 'Surf': 60, 'Breeze': 62 },
  { month: 'Feb', 'P&G': 67, 'Surf': 61, 'Breeze': 61 },
  { month: 'Mar', 'P&G': 66, 'Surf': 62, 'Breeze': 63 },
  { month: 'Apr', 'P&G': 69, 'Surf': 60, 'Breeze': 64 },
  { month: 'May', 'P&G': 70, 'Surf': 63, 'Breeze': 62 },
  { month: 'Jun', 'P&G': 72, 'Surf': 63, 'Breeze': 65 }
];

export const brandComparison = [
  { brand: 'Downy (P&G)', sentiment: 78 },
  { brand: 'Ariel (P&G)', sentiment: 72 },
  { brand: 'Tide (P&G)', sentiment: 65 },
  { brand: 'Surf', sentiment: 63 },
  { brand: 'Breeze', sentiment: 65 }
];

export const competitiveBenchmark = [
  { brand: 'Downy (P&G)', sentiment: 78, marketShare: 42, growth: 5.2 },
  { brand: 'Ariel (P&G)', sentiment: 72, marketShare: 35, growth: 3.1 },
  { brand: 'Tide (P&G)', sentiment: 65, marketShare: 28, growth: -1.2 },
  { brand: 'Surf', sentiment: 63, marketShare: 45, growth: 2.4 },
  { brand: 'Breeze', sentiment: 65, marketShare: 32, growth: 1.8 },
  { brand: 'Champion', sentiment: 58, marketShare: 15, growth: 4.5 },
  { brand: 'Zonrox', sentiment: 61, marketShare: 22, growth: 0.5 }
];

export const accountRecommendations = [
  {
    account: 'Lazada Philippines',
    sentimentTrend: 'improving',
    priorityScore: 88,
    topProduct: 'Downy Fabric Conditioner',
    rationale: 'Sentiment is 15pts above category average. High demand signals in Taglish reviews for "long-lasting scent" justify 30% inventory increase for upcoming 11.11 sale.',
    recommendedActions: [
      'Increase ad spend on Downy bundle deals',
      'Optimize keyword bidding for "long-lasting scent"',
      'Monitor competitor "Surf" flash sale activity'
    ]
  }
];

export const sampleReviews = [
  {
    id: 'r1',
    productId: 'p1',
    account: 'Lazada',
    date: '2023-10-20',
    sentiment: 'positive',
    sentimentScore: 0.92,
    originalRating: 5,
    text: 'Sobrang bango ng Downy! Sulit na sulit ang pagbili ko, mabilis din dumating.',
    vectors: { product: 0.98, packaging: 0.85, value: 0.92, communication: 0.88, retailExecution: 0.95 }
  },
  {
    id: 'r2',
    productId: 'p2',
    account: 'Lazada',
    date: '2023-10-21',
    sentiment: 'negative',
    sentimentScore: 0.35,
    originalRating: 5,
    text: 'Bakit parang ang mahal na? Okay naman yung labada pero di na kasing sulit dati.',
    vectors: { product: 0.80, packaging: 0.75, value: 0.40, communication: 0.70, retailExecution: 0.80 }
  }
];

// For backward compatibility with some components
export const sentimentTrends = [
  { month: 'Jan', positive: 62, neutral: 25, negative: 13 },
  { month: 'Feb', positive: 64, neutral: 24, negative: 12 },
  { month: 'Mar', positive: 63, neutral: 26, negative: 11 },
  { month: 'Apr', positive: 66, neutral: 23, negative: 11 },
  { month: 'May', positive: 67, neutral: 23, negative: 10 },
  { month: 'Jun', positive: 68, neutral: 22, negative: 10 }
];

export const vectorScores = [
  { vector: 'Product', pngAvg: 85, competitorAvg: 72 },
  { vector: 'Packaging', pngAvg: 68, competitorAvg: 65 },
  { vector: 'Value', pngAvg: 78, competitorAvg: 70 },
  { vector: 'Comm', pngAvg: 72, competitorAvg: 68 },
  { vector: 'Retail', pngAvg: 65, competitorAvg: 63 }
];

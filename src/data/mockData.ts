
export const pngProducts = [
  {
    id: 'p1',
    name: 'Downy Fabric Conditioner',
    brand: 'Downy',
    category: 'Fabric Care',
    reviewCount: 15420,
    originalRating: 4.9,
    correctedRating: 4.6,
    sentimentDistribution: { positive: 78, neutral: 15, negative: 7 }
  },
  {
    id: 'p2',
    name: 'Ariel Sunrise Fresh',
    brand: 'Ariel',
    category: 'Laundry Detergent',
    reviewCount: 12300,
    originalRating: 4.8,
    correctedRating: 4.3,
    sentimentDistribution: { positive: 72, neutral: 18, negative: 10 }
  },
  {
    id: 'p3',
    name: 'Tide Perfect Clean',
    brand: 'Tide',
    category: 'Laundry Detergent',
    reviewCount: 9800,
    originalRating: 4.7,
    correctedRating: 4.2,
    sentimentDistribution: { positive: 65, neutral: 25, negative: 10 }
  },
  {
    id: 'p4',
    name: 'Safeguard Pure White',
    brand: 'Safeguard',
    category: 'Personal Care',
    reviewCount: 18200,
    originalRating: 4.9,
    correctedRating: 4.1,
    sentimentDistribution: { positive: 62, neutral: 28, negative: 10 }
  },
  {
    id: 'p5',
    name: 'Joy Dishwashing Liquid',
    brand: 'Joy',
    category: 'Dishwashing',
    reviewCount: 14500,
    originalRating: 4.8,
    correctedRating: 4.5,
    sentimentDistribution: { positive: 75, neutral: 20, negative: 5 }
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
    productId: 'p4',
    account: 'Shopee',
    date: '2023-10-18',
    sentiment: 'negative',
    sentimentScore: -0.45,
    originalRating: 5,
    text: 'Bakit ganun, parang nakakapula ng balat yung Safeguard ngayon? Di ko na uulitin.',
    vectors: { product: 0.35, packaging: 0.70, value: 0.50, communication: 0.40, retailExecution: 0.80 }
  },
  {
    id: 'r3',
    productId: 'p2',
    account: 'Lazada',
    date: '2023-10-15',
    sentiment: 'neutral',
    sentimentScore: 0.12,
    originalRating: 5,
    text: 'Okay naman yung Ariel, natanggal mantsa pero parang ang mahal na masyado.',
    vectors: { product: 0.85, packaging: 0.80, value: 0.45, communication: 0.70, retailExecution: 0.85 }
  },
  {
    id: 'r4',
    productId: 'p5',
    account: 'Shopee',
    date: '2023-10-12',
    sentiment: 'positive',
    sentimentScore: 0.88,
    originalRating: 5,
    text: 'Joy is the best! Konti lang gamitin, dami na nahuhugasan. Worth it talaga.',
    vectors: { product: 0.95, packaging: 0.85, value: 0.98, communication: 0.90, retailExecution: 0.90 }
  }
];

export const competitorProducts = [
  { id: 'c1', name: 'Surf Cherry Blossom', brand: 'Surf' },
  { id: 'c2', name: 'Breeze Power Clean', brand: 'Breeze' },
  { id: 'c3', name: 'Champion Infinity', brand: 'Champion' },
  { id: 'c4', name: 'Zonrox Bleach', brand: 'Zonrox' }
];

export const sentimentTrends = [
  { month: 'Jan', positive: 62, neutral: 25, negative: 13 },
  { month: 'Feb', positive: 64, neutral: 24, negative: 12 },
  { month: 'Mar', positive: 63, neutral: 26, negative: 11 },
  { month: 'Apr', positive: 66, neutral: 23, negative: 11 },
  { month: 'May', positive: 67, neutral: 23, negative: 10 },
  { month: 'Jun', positive: 68, neutral: 22, negative: 10 }
];

export const vectorScores = [
  { vector: 'Product', pngAvg: 88, competitorAvg: 75 },
  { vector: 'Value', pngAvg: 78, competitorAvg: 70 },
  { vector: 'Packaging', pngAvg: 82, competitorAvg: 85 },
  { vector: 'Delivery', pngAvg: 90, competitorAvg: 88 },
  { vector: 'Experience', pngAvg: 85, competitorAvg: 72 }
];

export const competitiveBenchmark = [
  { brand: 'P&G Downy', sentiment: 78, marketShare: 42, growth: 5.2 },
  { brand: 'P&G Ariel', sentiment: 72, marketShare: 33, growth: 3.1 },
  { brand: 'Surf', sentiment: 63, marketShare: 35, growth: 1.2 },
  { brand: 'Breeze', sentiment: 65, marketShare: 28, growth: -0.5 },
  { brand: 'Champion', sentiment: 60, marketShare: 15, growth: -2.1 },
  { brand: 'Zonrox', sentiment: 68, marketShare: 22, growth: 0.8 }
];

export const accountRecommendations = [
  {
    account: 'Lazada Philippines',
    sentimentTrend: 'improving',
    priorityScore: 88,
    topProducts: ['Downy Fabric Conditioner', 'Joy Dishwashing Liquid', 'Ariel Sunrise Fresh'],
    recommendedActions: [
      'Increase ad spend on Downy bundle deals',
      'Optimize keyword bidding for "long-lasting scent"',
      'Monitor competitor "Surf" flash sale activity'
    ]
  },
  {
    account: 'Shopee Philippines',
    sentimentTrend: 'stable',
    priorityScore: 74,
    topProducts: ['Safeguard Pure White', 'Tide Perfect Clean', 'Downy Fabric Conditioner'],
    recommendedActions: [
      'Review packaging feedback for Safeguard refills',
      'Launch voucher campaign for Tide bulk buys',
      'Update product images for Downy variants'
    ]
  }
];

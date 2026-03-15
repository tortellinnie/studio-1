
export const pngProducts = [
  {
    id: 'p1',
    name: 'Downy Fabric Conditioner',
    brand: 'Downy',
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
    brand: 'Ariel',
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
    brand: 'Tide',
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
  }
];

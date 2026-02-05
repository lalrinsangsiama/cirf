// Pricing - Cultural Product Pricing Assessment
// 15 questions across 4 sections: Cost Analysis, Value Proposition, Market Positioning, Price Optimization

export type PricingSection =
  | 'costAnalysis'
  | 'valueProposition'
  | 'marketPositioning'
  | 'priceOptimization'

export interface PricingLikertQuestion {
  id: string
  section: PricingSection
  construct: string
  question: string
  helpText?: string
  weight: number
  reverse?: boolean
}

export const PRICING_SECTION_META: Record<PricingSection, {
  label: string
  shortLabel: string
  description: string
  estimatedMinutes: number
}> = {
  costAnalysis: {
    label: 'Cost Analysis',
    shortLabel: 'Costs',
    description: 'Do you know what it really costs to make your products? Let\'s find out.',
    estimatedMinutes: 2,
  },
  valueProposition: {
    label: 'Value Proposition',
    shortLabel: 'Value',
    description: 'What makes your work worth more than the alternatives? Let\'s capture it.',
    estimatedMinutes: 2,
  },
  marketPositioning: {
    label: 'Market Positioning',
    shortLabel: 'Position',
    description: 'Are you reaching the customers who will pay what you\'re worth? Let\'s see.',
    estimatedMinutes: 1,
  },
  priceOptimization: {
    label: 'Price Optimization',
    shortLabel: 'Pricing',
    description: 'Are you leaving money on the table? Let\'s check your strategy.',
    estimatedMinutes: 1,
  },
}

// Cost Analysis questions (4 questions)
export const costAnalysisQuestions: PricingLikertQuestion[] = [
  {
    id: 'price-ca-1',
    section: 'costAnalysis',
    construct: 'costClarity',
    question: 'We have clear visibility into all direct costs of producing our cultural products',
    helpText: 'Examples: know exactly what materials cost per item, track labor hours, calculate shipping',
    weight: 1.4,
  },
  {
    id: 'price-ca-2',
    section: 'costAnalysis',
    construct: 'overheadAllocation',
    question: 'We accurately allocate overhead and indirect costs to products',
    helpText: 'Examples: workshop rent split across products, marketing budget allocated',
    weight: 1.2,
  },
  {
    id: 'price-ca-3',
    section: 'costAnalysis',
    construct: 'laborValuation',
    question: 'Our pricing accounts for fair wages including time for mastering traditional skills',
    helpText: 'Examples: artisans paid living wages, training time factored into costs',
    weight: 1.5,
  },
  {
    id: 'price-ca-4',
    section: 'costAnalysis',
    construct: 'culturalCostInclusion',
    question: 'We include costs of cultural preservation and knowledge transfer in pricing',
    helpText: 'Examples: apprenticeship costs built into prices, documentation time included',
    weight: 1.3,
  },
]

// Value Proposition questions (4 questions)
export const valuePropositionQuestions: PricingLikertQuestion[] = [
  {
    id: 'price-vp-1',
    section: 'valueProposition',
    construct: 'uniquenessRecognition',
    question: 'Customers recognize and value the uniqueness of our cultural products',
    helpText: 'Examples: "I can\'t find this anywhere else" comments, customers collect your work',
    weight: 1.4,
  },
  {
    id: 'price-vp-2',
    section: 'valueProposition',
    construct: 'storyValue',
    question: 'We effectively communicate the cultural story and provenance of our products',
    helpText: 'Examples: product cards tell the story, website explains traditions, videos show artisans',
    weight: 1.3,
  },
  {
    id: 'price-vp-3',
    section: 'valueProposition',
    construct: 'qualityPerception',
    question: 'Our products are perceived as high quality and artisanally crafted',
    helpText: 'Examples: 5-star reviews mention quality, customers say products last for years',
    weight: 1.4,
  },
  {
    id: 'price-vp-4',
    section: 'valueProposition',
    construct: 'impactValue',
    question: 'Customers value knowing their purchase supports cultural preservation',
    helpText: 'Examples: customers mention supporting tradition, impact story increases sales',
    weight: 1.2,
  },
]

// Market Positioning questions (4 questions)
export const marketPositioningQuestions: PricingLikertQuestion[] = [
  {
    id: 'price-mp-1',
    section: 'marketPositioning',
    construct: 'targetSegment',
    question: 'We have identified and focus on customer segments willing to pay for cultural value',
    helpText: 'Examples: target ethical consumers, design-conscious buyers, collectors',
    weight: 1.4,
  },
  {
    id: 'price-mp-2',
    section: 'marketPositioning',
    construct: 'competitiveDifferentiation',
    question: 'Our products are clearly differentiated from mass-produced alternatives',
    helpText: 'Examples: handmade vs factory, unique designs, authentic materials',
    weight: 1.3,
  },
  {
    id: 'price-mp-3',
    section: 'marketPositioning',
    construct: 'pricePerception',
    question: 'Our prices are perceived as fair relative to the value provided',
    helpText: 'Examples: customers say "worth every penny", rarely get price complaints',
    weight: 1.2,
  },
  {
    id: 'price-mp-4',
    section: 'marketPositioning',
    construct: 'premiumJustification',
    question: 'We can justify premium prices through demonstrable quality and authenticity',
    helpText: 'Examples: certifications, meet-the-maker stories, quality guarantees',
    weight: 1.4,
  },
]

// Price Optimization questions (3 questions)
export const priceOptimizationQuestions: PricingLikertQuestion[] = [
  {
    id: 'price-po-1',
    section: 'priceOptimization',
    construct: 'pricingStrategy',
    question: 'We have a deliberate pricing strategy rather than reactive or cost-plus pricing',
    helpText: 'Examples: value-based pricing, competitive analysis, tested price points',
    weight: 1.5,
  },
  {
    id: 'price-po-2',
    section: 'priceOptimization',
    construct: 'priceVariation',
    question: 'We use different price points for different markets or product tiers',
    helpText: 'Examples: premium line and everyday line, higher prices for export, volume discounts',
    weight: 1.2,
  },
  {
    id: 'price-po-3',
    section: 'priceOptimization',
    construct: 'priceReview',
    question: 'We regularly review and adjust prices based on costs, competition, and demand',
    helpText: 'Examples: annual price review, adjust when costs rise, test price changes',
    weight: 1.3,
  },
]

// Combined Pricing questions
export const pricingQuestions: PricingLikertQuestion[] = [
  ...costAnalysisQuestions,
  ...valuePropositionQuestions,
  ...marketPositioningQuestions,
  ...priceOptimizationQuestions,
]

// Helper to get questions by section
export const getPricingQuestionsBySection = (section: PricingSection): PricingLikertQuestion[] => {
  return pricingQuestions.filter(q => q.section === section)
}

// Question config for scoring
export const pricingQuestionConfig = {
  sectionQuestions: {
    costAnalysis: costAnalysisQuestions.map(q => q.id),
    valueProposition: valuePropositionQuestions.map(q => q.id),
    marketPositioning: marketPositioningQuestions.map(q => q.id),
    priceOptimization: priceOptimizationQuestions.map(q => q.id),
  } as Record<PricingSection, string[]>,
  questionConstructs: Object.fromEntries(
    pricingQuestions.map(q => [q.id, q.construct])
  ) as Record<string, string>,
}

// Stats
export const PRICING_STATS = {
  totalQuestions: 15,
  sections: 4,
  estimatedMinutes: 6,
}

// Pricing specific scoring weights
export const PRICING_SECTION_WEIGHTS: Record<PricingSection, number> = {
  costAnalysis: 0.25,
  valueProposition: 0.30,
  marketPositioning: 0.25,
  priceOptimization: 0.20,
}

// Pricing recommendations based on scores
export function getPricingRecommendations(sectionScores: Record<PricingSection, number>): string[] {
  const recommendations: string[] = []

  if (sectionScores.costAnalysis < 60) {
    recommendations.push('Conduct a comprehensive cost analysis to ensure all expenses are captured')
  }
  if (sectionScores.valueProposition < 60) {
    recommendations.push('Strengthen your value story and communicate cultural significance more effectively')
  }
  if (sectionScores.marketPositioning < 60) {
    recommendations.push('Better define your target market and competitive differentiation')
  }
  if (sectionScores.priceOptimization < 60) {
    recommendations.push('Develop a more deliberate pricing strategy with regular reviews')
  }

  // Specific recommendations
  if (sectionScores.costAnalysis > 70 && sectionScores.valueProposition > 70 && sectionScores.marketPositioning < 50) {
    recommendations.push('Your costs and value are well understood - focus on reaching the right customers')
  }

  if (sectionScores.valueProposition > 80 && sectionScores.priceOptimization < 50) {
    recommendations.push('Your value proposition is strong - consider premium pricing strategies')
  }

  return recommendations
}

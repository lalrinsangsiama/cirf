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
    description: 'Understand your true costs of production and operation',
    estimatedMinutes: 2,
  },
  valueProposition: {
    label: 'Value Proposition',
    shortLabel: 'Value',
    description: 'Assess the unique value your products provide',
    estimatedMinutes: 2,
  },
  marketPositioning: {
    label: 'Market Positioning',
    shortLabel: 'Position',
    description: 'Evaluate your competitive position and target market',
    estimatedMinutes: 1,
  },
  priceOptimization: {
    label: 'Price Optimization',
    shortLabel: 'Pricing',
    description: 'Optimize pricing strategies for maximum value capture',
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
    helpText: 'Consider materials, labor, packaging, and direct expenses',
    weight: 1.4,
  },
  {
    id: 'price-ca-2',
    section: 'costAnalysis',
    construct: 'overheadAllocation',
    question: 'We accurately allocate overhead and indirect costs to products',
    helpText: 'Think about rent, utilities, administration, marketing costs',
    weight: 1.2,
  },
  {
    id: 'price-ca-3',
    section: 'costAnalysis',
    construct: 'laborValuation',
    question: 'Our pricing accounts for fair wages including time for mastering traditional skills',
    helpText: 'Consider whether skilled labor is adequately compensated',
    weight: 1.5,
  },
  {
    id: 'price-ca-4',
    section: 'costAnalysis',
    construct: 'culturalCostInclusion',
    question: 'We include costs of cultural preservation and knowledge transfer in pricing',
    helpText: 'Think about training, documentation, and community obligations',
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
    helpText: 'Consider customer feedback about distinctiveness',
    weight: 1.4,
  },
  {
    id: 'price-vp-2',
    section: 'valueProposition',
    construct: 'storyValue',
    question: 'We effectively communicate the cultural story and provenance of our products',
    helpText: 'Think about storytelling in marketing and product presentation',
    weight: 1.3,
  },
  {
    id: 'price-vp-3',
    section: 'valueProposition',
    construct: 'qualityPerception',
    question: 'Our products are perceived as high quality and artisanally crafted',
    helpText: 'Consider customer reviews, feedback, and market reputation',
    weight: 1.4,
  },
  {
    id: 'price-vp-4',
    section: 'valueProposition',
    construct: 'impactValue',
    question: 'Customers value knowing their purchase supports cultural preservation',
    helpText: 'Think about whether social/cultural impact influences buying decisions',
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
    helpText: 'Consider whether you target value-conscious customers',
    weight: 1.4,
  },
  {
    id: 'price-mp-2',
    section: 'marketPositioning',
    construct: 'competitiveDifferentiation',
    question: 'Our products are clearly differentiated from mass-produced alternatives',
    helpText: 'Think about what makes you different from industrial competitors',
    weight: 1.3,
  },
  {
    id: 'price-mp-3',
    section: 'marketPositioning',
    construct: 'pricePerception',
    question: 'Our prices are perceived as fair relative to the value provided',
    helpText: 'Consider customer feedback on price-value relationship',
    weight: 1.2,
  },
  {
    id: 'price-mp-4',
    section: 'marketPositioning',
    construct: 'premiumJustification',
    question: 'We can justify premium prices through demonstrable quality and authenticity',
    helpText: 'Think about certifications, testimonials, or quality markers',
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
    helpText: 'Consider whether pricing is strategic or ad-hoc',
    weight: 1.5,
  },
  {
    id: 'price-po-2',
    section: 'priceOptimization',
    construct: 'priceVariation',
    question: 'We use different price points for different markets or product tiers',
    helpText: 'Think about tiered pricing, market-specific pricing, or product lines',
    weight: 1.2,
  },
  {
    id: 'price-po-3',
    section: 'priceOptimization',
    construct: 'priceReview',
    question: 'We regularly review and adjust prices based on costs, competition, and demand',
    helpText: 'Consider how often you evaluate pricing effectiveness',
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

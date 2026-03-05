// Pricing - Cultural Product Pricing Assessment
// 16 questions across 4 sections: Cost Analysis, Value Proposition, Market Positioning, Price Optimization
// Measures pricing capability — can you capture the full value of your cultural innovation?
// Research alignment: pricing power is a key mechanism through which cultural authenticity creates economic resilience

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
    description: 'Are you leaving money on the table? Let\'s check your pricing strategy.',
    estimatedMinutes: 1,
  },
}

// Cost Analysis questions (4 questions)
export const costAnalysisQuestions: PricingLikertQuestion[] = [
  {
    id: 'price-ca-1',
    section: 'costAnalysis',
    construct: 'costClarity',
    question: 'We know exactly what it costs to produce each of our cultural products or services',
    helpText: 'For example: A Peruvian alpaca scarf maker tracks every cost per scarf: $8 in fibre, $12 in weaver labour (4 hours at $3/hr), $2 in dyeing, $1.50 in packaging, $3 in shipping materials — total $26.50 per unit. Do you know the exact cost breakdown for each product?',
    weight: 1.4,
  },
  {
    id: 'price-ca-2',
    section: 'costAnalysis',
    construct: 'overheadAllocation',
    question: 'We accurately account for overhead costs like rent, marketing, and equipment in our pricing',
    helpText: 'For example: A Japanese calligraphy studio calculates that workshop rent, electricity, ink inventory, website hosting, and insurance add $4.50 to the cost of each artwork produced — many cultural enterprises forget these "invisible" costs. Do you include overhead when calculating what each product really costs you?',
    weight: 1.2,
  },
  {
    id: 'price-ca-3',
    section: 'costAnalysis',
    construct: 'laborValuation',
    question: 'Our pricing pays practitioners a fair wage that reflects the years of skill development required',
    helpText: 'For example: A Kashmiri pashmina shawl takes 200+ hours of hand-embroidery by artisans who trained for 10 years. The cooperative prices to pay $5/hour — not the $0.50/hour that "cost-based" pricing would suggest, because the pricing honours the decade of unpaid training. Does your pricing reflect the true value of practitioners\' skill and training time?',
    weight: 1.5,
  },
  {
    id: 'price-ca-4',
    section: 'costAnalysis',
    construct: 'culturalCostInclusion',
    question: 'Our pricing includes the cost of cultural preservation activities like training and documentation',
    helpText: 'For example: A Ghanaian kente weaving enterprise adds a 10% "cultural continuity" margin to every product — this funds apprenticeship stipends, elder recording sessions, and dye-recipe documentation. Do your prices account for the cost of keeping the tradition alive, not just producing today\'s products?',
    weight: 1.3,
  },
]

// Value Proposition questions (4 questions)
export const valuePropositionQuestions: PricingLikertQuestion[] = [
  {
    id: 'price-vp-1',
    section: 'valueProposition',
    construct: 'uniquenessRecognition',
    question: 'Customers recognise and are willing to pay for the uniqueness of our cultural products',
    helpText: 'For example: Buyers of Oaxacan black pottery happily pay $200 for a piece they know comes from one of only 12 families who still master the ancient firing technique — comments like "I can\'t find this anywhere else" and "this is a real piece of history" are common. Do your customers acknowledge the uniqueness of what you offer?',
    weight: 1.4,
  },
  {
    id: 'price-vp-2',
    section: 'valueProposition',
    construct: 'storyValue',
    question: 'We effectively communicate the cultural story behind our products, and this increases what customers will pay',
    helpText: 'For example: When a Moroccan rug seller started including a card with the weaver\'s name, photo, village, and the meaning of the pattern, average sale price increased 35% — the same rug, but the story made it worth more. Does telling the cultural story behind your products measurably increase what customers pay?',
    weight: 1.3,
  },
  {
    id: 'price-vp-3',
    section: 'valueProposition',
    construct: 'qualityPerception',
    question: 'Our products are perceived as high quality and artisanally crafted',
    helpText: 'For example: A Thai celadon ceramics maker receives 5-star reviews consistently mentioning "museum quality," "heirloom piece," and "clearly handmade with love" — customers see the products as art, not commodity. Do reviews, customer comments, or repeat purchases indicate that people perceive your work as genuinely high quality?',
    weight: 1.4,
  },
  {
    id: 'price-vp-4',
    section: 'valueProposition',
    construct: 'impactValue',
    question: 'Customers value knowing their purchase supports cultural preservation and community livelihoods',
    helpText: 'For example: An Ethiopian coffee brand saw a 20% sales increase after adding "Your purchase funds youth apprenticeships in traditional roasting" to their packaging — customers were willing to pay more when they understood the social impact. Do your customers care about the community impact of their purchase? Does communicating this increase sales?',
    weight: 1.2,
  },
]

// Market Positioning questions (4 questions — includes 1 reverse-scored)
export const marketPositioningQuestions: PricingLikertQuestion[] = [
  {
    id: 'price-mp-1',
    section: 'marketPositioning',
    construct: 'targetSegment',
    question: 'We have identified and focus on customer segments who specifically seek culturally authentic products',
    helpText: 'For example: A Navajo silversmith sells primarily through three channels: the Indian Arts & Crafts Association market, a curated ethical fashion platform, and museum gift shops — each channel attracts buyers who specifically seek authentic indigenous craft. Do you target customers who value cultural authenticity, or do you compete in general markets where cultural value is not recognised?',
    weight: 1.4,
  },
  {
    id: 'price-mp-2',
    section: 'marketPositioning',
    construct: 'competitiveDifferentiation',
    question: 'Our products are clearly differentiated from mass-produced alternatives in ways customers can see',
    helpText: 'For example: A Balinese batik maker includes a close-up photo of the hand-drawn wax lines alongside a factory-printed comparison — the visual difference is immediately obvious and justifies the 5x price premium. Can customers easily see and understand why your product is different from cheaper alternatives?',
    weight: 1.3,
  },
  {
    id: 'price-mp-3',
    section: 'marketPositioning',
    construct: 'underpricing',
    question: 'We suspect our products are priced lower than what customers would actually pay',
    helpText: 'For example: A Mexican ceramics artist was shocked when a gallery owner repriced her $40 bowls at $120 and they sold faster — she had been undervaluing her work for years based on local market prices rather than the value international buyers perceived. Do you sense that customers would pay more than you currently charge?',
    weight: 1.3,
    reverse: true,
  },
  {
    id: 'price-mp-4',
    section: 'marketPositioning',
    construct: 'premiumJustification',
    question: 'We can clearly justify our premium prices through certifications, provenance, or demonstrable quality',
    helpText: 'For example: A Darjeeling tea estate justifies its premium with GI certification, third-party organic verification, named-garden origin, and a QR code linking to a video of the specific plucking session. Every claim is verifiable. Can you back up your prices with proof — certifications, test results, documented provenance, or quality guarantees?',
    weight: 1.4,
  },
]

// Price Optimization questions (4 questions)
export const priceOptimizationQuestions: PricingLikertQuestion[] = [
  {
    id: 'price-po-1',
    section: 'priceOptimization',
    construct: 'pricingStrategy',
    question: 'We set prices based on the value we provide, not just our costs plus a margin',
    helpText: 'For example: A Vietnamese lacquerware artist prices a $50-cost bowl at $300 because she researched that similar gallery pieces sell for $250-$500 — her pricing is based on market value, not "cost plus 30%." Do you price based on what your products are worth to customers, or do you simply add a markup to your costs?',
    weight: 1.5,
  },
  {
    id: 'price-po-2',
    section: 'priceOptimization',
    construct: 'priceVariation',
    question: 'We use different price points for different markets, channels, or product tiers',
    helpText: 'For example: A Colombian hammock maker has three tiers: a basic weave for local markets ($30), a premium heritage weave for craft fairs ($80), and a custom luxury weave for international interior designers ($200) — same workshop, three price points. Do you offer different price levels for different customer segments, markets, or quality tiers?',
    weight: 1.2,
  },
  {
    id: 'price-po-3',
    section: 'priceOptimization',
    construct: 'priceReview',
    question: 'We review and adjust our prices at least once a year based on costs, competition, and demand',
    helpText: 'For example: Every January, a Kenyan beadwork cooperative reviews material costs, checks competitor prices online, analyses which products had waiting lists (price too low) or slow sales (price too high), and adjusts — last year they raised prices 12% on bestsellers and cut 2 slow movers. Do you formally review your pricing at least annually?',
    weight: 1.3,
  },
  {
    id: 'price-po-4',
    section: 'priceOptimization',
    construct: 'culturalPricingResilience',
    question: 'Our cultural pricing premium has helped us remain financially stable during difficult economic periods',
    helpText: 'For example: During a recession, a Scottish tweed mill maintained sales while synthetic fabric competitors slashed prices — buyers of genuine Harris Tweed are less price-sensitive because they are buying heritage, not just fabric. Has your ability to charge cultural premiums specifically helped you weather economic difficulty?',
    weight: 1.4,
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
  totalQuestions: 16,
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

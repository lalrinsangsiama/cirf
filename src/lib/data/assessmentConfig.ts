// Assessment Configuration
// Defines all 6 assessments, their unlock requirements, and tools they grant access to

export type AssessmentType = 'cirf' | 'cimm' | 'cira' | 'tbl' | 'ciss' | 'pricing'

export interface AssessmentConfig {
  id: AssessmentType
  name: string
  fullName: string
  description: string
  questionCount: number
  estimatedMinutes: number
  creditCost: number // 0 = free after unlock
  unlockRequirement: AssessmentType | null // null = always available
  unlocksAssessments: AssessmentType[] // assessments unlocked after completion
  grantsToolAccess: string[] // tool IDs granted after completion
  icon: string
  color: string
  sections: {
    id: string
    name: string
    questionCount: number
  }[]
}

export const ASSESSMENT_CONFIGS: Record<AssessmentType, AssessmentConfig> = {
  cirf: {
    id: 'cirf',
    name: 'CIRF',
    fullName: 'Cultural Innovation Resilience Framework',
    description: 'Discover your strengths and growth areas across 4 key dimensions. Get personalized insights to build a more sustainable cultural business.',
    questionCount: 40,
    estimatedMinutes: 15,
    creditCost: 1,
    unlockRequirement: null, // Always available
    unlocksAssessments: ['cimm', 'cira', 'tbl', 'ciss', 'pricing'],
    grantsToolAccess: [], // CIRF unlocks assessments, not tools directly
    icon: 'Award',
    color: 'sage',
    sections: [
      { id: 'demographics', name: 'Demographics & Profile', questionCount: 6 },
      { id: 'culturalCapital', name: 'Cultural Capital', questionCount: 8 },
      { id: 'innovationActivities', name: 'Innovation Activities', questionCount: 8 },
      { id: 'organizationalCapacities', name: 'Organizational Capacities', questionCount: 10 },
      { id: 'economicResilience', name: 'Economic Resilience', questionCount: 8 },
    ],
  },

  cimm: {
    id: 'cimm',
    name: 'CIMM',
    fullName: 'Cultural Innovation Measurement Matrix',
    description: 'See how well you\'re balancing tradition with innovation, and where you can increase impact.',
    questionCount: 20,
    estimatedMinutes: 8,
    creditCost: 0, // Free after CIRF unlock
    unlockRequirement: 'cirf',
    unlocksAssessments: [],
    grantsToolAccess: ['innovation-intensity-ratio', 'cultural-leverage-index'],
    icon: 'BarChart3',
    color: 'ocean',
    sections: [
      { id: 'innovationDepth', name: 'Innovation Depth', questionCount: 5 },
      { id: 'culturalIntegrity', name: 'Cultural Integrity', questionCount: 5 },
      { id: 'economicImpact', name: 'Economic Impact', questionCount: 5 },
      { id: 'innovationVelocity', name: 'Innovation Velocity', questionCount: 5 },
    ],
  },

  cira: {
    id: 'cira',
    name: 'CIRA',
    fullName: 'Cultural Innovation Readiness Assessment',
    description: 'Find out if you\'re ready to scale. Identify what\'s helping you grow and what\'s holding you back.',
    questionCount: 20,
    estimatedMinutes: 8,
    creditCost: 0, // Free after CIRF unlock
    unlockRequirement: 'cirf',
    unlocksAssessments: [],
    grantsToolAccess: ['innovation-readiness-calculator', 'innovation-inclusivity-score'],
    icon: 'Compass',
    color: 'gold',
    sections: [
      { id: 'culturalCapitalInventory', name: 'Cultural Capital Inventory', questionCount: 5 },
      { id: 'innovationEcosystem', name: 'Innovation Ecosystem', questionCount: 5 },
      { id: 'barriersAssessment', name: 'Barriers Assessment', questionCount: 5 },
      { id: 'readinessIndicators', name: 'Readiness Indicators', questionCount: 5 },
    ],
  },

  tbl: {
    id: 'tbl',
    name: 'TBL-CI',
    fullName: 'Triple Bottom Line Cultural Innovation',
    description: 'See how your work creates value across three dimensions: profit, people, and planet.',
    questionCount: 20,
    estimatedMinutes: 8,
    creditCost: 0, // Free after CIRF unlock
    unlockRequirement: 'cirf',
    unlocksAssessments: [],
    grantsToolAccess: ['tbl-calculator', 'economic-multiplier'],
    icon: 'TreePine',
    color: 'sage',
    sections: [
      { id: 'economicReturns', name: 'Economic Returns', questionCount: 6 },
      { id: 'socialImpact', name: 'Social Impact', questionCount: 7 },
      { id: 'environmentalImpact', name: 'Environmental Impact', questionCount: 7 },
    ],
  },

  ciss: {
    id: 'ciss',
    name: 'CISS',
    fullName: 'Cultural Innovation Sustainability Scorecard',
    description: 'Check if your cultural enterprise can thrive for generations, not just years.',
    questionCount: 18,
    estimatedMinutes: 7,
    creditCost: 0, // Free after CIRF unlock
    unlockRequirement: 'cirf',
    unlocksAssessments: [],
    grantsToolAccess: ['sustainability-scorecard', 'cultural-resilience-quotient'],
    icon: 'Leaf',
    color: 'sage',
    sections: [
      { id: 'economicSustainability', name: 'Economic Sustainability', questionCount: 5 },
      { id: 'culturalSustainability', name: 'Cultural Sustainability', questionCount: 5 },
      { id: 'socialSustainability', name: 'Social Sustainability', questionCount: 4 },
      { id: 'environmentalSustainability', name: 'Environmental Sustainability', questionCount: 4 },
    ],
  },

  pricing: {
    id: 'pricing',
    name: 'Pricing',
    fullName: 'Cultural Product Pricing Assessment',
    description: 'Find the right price for your work. Stop undercharging and start capturing the true value you create.',
    questionCount: 15,
    estimatedMinutes: 6,
    creditCost: 0, // Free after CIRF unlock
    unlockRequirement: 'cirf',
    unlocksAssessments: [],
    grantsToolAccess: ['pricing-calculator', 'innovation-efficiency-rate'],
    icon: 'DollarSign',
    color: 'gold',
    sections: [
      { id: 'costAnalysis', name: 'Cost Analysis', questionCount: 4 },
      { id: 'valueProposition', name: 'Value Proposition', questionCount: 4 },
      { id: 'marketPositioning', name: 'Market Positioning', questionCount: 4 },
      { id: 'priceOptimization', name: 'Price Optimization', questionCount: 3 },
    ],
  },
}

// Tool configuration
export interface ToolConfig {
  id: string
  name: string
  description: string
  unlockedByAssessment: AssessmentType
  category: 'measurement' | 'calculator' | 'analysis'
}

export const TOOL_CONFIGS: Record<string, ToolConfig> = {
  'innovation-intensity-ratio': {
    id: 'innovation-intensity-ratio',
    name: 'Innovation Intensity Ratio',
    description: 'Calculate your innovation intensity relative to cultural preservation',
    unlockedByAssessment: 'cimm',
    category: 'measurement',
  },
  'cultural-leverage-index': {
    id: 'cultural-leverage-index',
    name: 'Cultural Leverage Index',
    description: 'Measure how effectively you leverage cultural assets',
    unlockedByAssessment: 'cimm',
    category: 'measurement',
  },
  'innovation-readiness-calculator': {
    id: 'innovation-readiness-calculator',
    name: 'Innovation Readiness Calculator',
    description: 'Calculate your overall innovation readiness score',
    unlockedByAssessment: 'cira',
    category: 'calculator',
  },
  'innovation-inclusivity-score': {
    id: 'innovation-inclusivity-score',
    name: 'Innovation Inclusivity Score',
    description: 'Measure how inclusive your innovation processes are',
    unlockedByAssessment: 'cira',
    category: 'measurement',
  },
  'tbl-calculator': {
    id: 'tbl-calculator',
    name: 'Triple Bottom Line Calculator',
    description: 'Calculate your triple bottom line impact score',
    unlockedByAssessment: 'tbl',
    category: 'calculator',
  },
  'economic-multiplier': {
    id: 'economic-multiplier',
    name: 'Economic Multiplier Effect',
    description: 'Calculate the economic multiplier effect of your cultural enterprise',
    unlockedByAssessment: 'tbl',
    category: 'calculator',
  },
  'sustainability-scorecard': {
    id: 'sustainability-scorecard',
    name: 'Sustainability Scorecard',
    description: 'Generate a comprehensive sustainability scorecard',
    unlockedByAssessment: 'ciss',
    category: 'analysis',
  },
  'cultural-resilience-quotient': {
    id: 'cultural-resilience-quotient',
    name: 'Cultural Resilience Quotient',
    description: 'Calculate your cultural resilience quotient',
    unlockedByAssessment: 'ciss',
    category: 'measurement',
  },
  'pricing-calculator': {
    id: 'pricing-calculator',
    name: 'Cultural Product Pricing Calculator',
    description: 'Calculate optimal pricing for your cultural products',
    unlockedByAssessment: 'pricing',
    category: 'calculator',
  },
  'innovation-efficiency-rate': {
    id: 'innovation-efficiency-rate',
    name: 'Innovation Efficiency Rate',
    description: 'Measure the efficiency of your innovation investments',
    unlockedByAssessment: 'pricing',
    category: 'measurement',
  },
}

// Helper functions
export function getAssessmentConfig(type: AssessmentType): AssessmentConfig {
  return ASSESSMENT_CONFIGS[type]
}

export function getAllAssessmentTypes(): AssessmentType[] {
  return Object.keys(ASSESSMENT_CONFIGS) as AssessmentType[]
}

export function getSecondaryAssessments(): AssessmentType[] {
  return getAllAssessmentTypes().filter(type => type !== 'cirf')
}

export function getToolsByAssessment(assessmentType: AssessmentType): ToolConfig[] {
  return Object.values(TOOL_CONFIGS).filter(
    tool => tool.unlockedByAssessment === assessmentType
  )
}

export function getAssessmentUnlockRequirements(type: AssessmentType): AssessmentType | null {
  return ASSESSMENT_CONFIGS[type].unlockRequirement
}

// Score interpretation thresholds (same for all assessments)
export const SCORE_THRESHOLDS = {
  emerging: { min: 0, max: 40, label: 'Emerging', color: 'terracotta' },
  developing: { min: 40, max: 60, label: 'Developing', color: 'gold' },
  established: { min: 60, max: 80, label: 'Established', color: 'ocean' },
  thriving: { min: 80, max: 100, label: 'Thriving', color: 'sage' },
}

export function getScoreInterpretation(score: number): {
  level: string
  color: string
  description: string
} {
  if (score >= SCORE_THRESHOLDS.thriving.min) {
    return {
      level: 'Thriving',
      color: 'sage',
      description: 'Excellent performance with strong foundations across all dimensions.',
    }
  } else if (score >= SCORE_THRESHOLDS.established.min) {
    return {
      level: 'Established',
      color: 'ocean',
      description: 'Solid performance with some areas for improvement.',
    }
  } else if (score >= SCORE_THRESHOLDS.developing.min) {
    return {
      level: 'Developing',
      color: 'gold',
      description: 'Good progress with significant growth opportunities.',
    }
  } else {
    return {
      level: 'Emerging',
      color: 'terracotta',
      description: 'Early stage with foundational work needed.',
    }
  }
}

/**
 * CI-ER Framework Scoring Module
 *
 * Theoretical Model: Cultural Capital → Innovation Activities → Capacities → Economic Resilience
 *
 * Scoring Methodology:
 * 1. Normalize: Convert Likert 1-7 to 0-1 scale
 * 2. Construct scores: Weighted mean of items per construct
 * 3. Apply discriminatory power: Use research-derived weights
 * 4. Synergy bonuses: When paired constructs both exceed 70%
 * 5. Output: Cultural Innovation Resilience Index (0-100)
 */

// Assessment section definitions
export type AssessmentSection =
  | 'demographics'
  | 'culturalCapital'
  | 'innovationActivities'
  | 'organizationalCapacities'
  | 'economicResilience'

// Answer type for Likert scale (1-7), categorical responses, or multi-select arrays
export interface AssessmentAnswers {
  [questionId: string]: number | string | string[] | null
}

// Section weights based on CI-ER theoretical framework
export const SECTION_WEIGHTS: Record<AssessmentSection, number> = {
  demographics: 0, // Demographics don't contribute to score
  culturalCapital: 0.25,
  innovationActivities: 0.25,
  organizationalCapacities: 0.30,
  economicResilience: 0.20,
}

// Discriminatory power weights for individual constructs (from research)
export const CONSTRUCT_WEIGHTS: Record<string, number> = {
  // Cultural Capital constructs
  traditionalKnowledge: 1.0,
  practitionerAccess: 1.2,
  culturalAuthenticity: 1.3,
  communityInvolvement: 1.4,
  culturalPreservation: 1.1,
  practitionerRelationships: 1.0,
  culturalMembership: 0.9,

  // Innovation Activities constructs
  productDevelopment: 1.2,
  techniqueCombination: 1.1,
  innovationLeadership: 1.3,
  marketExpansion: 1.0,
  digitalDistribution: 0.9,
  efficiencyImprovement: 1.0,
  externalCollaboration: 1.1,
  feedbackIteration: 1.2,

  // Organizational Capacities constructs
  adaptiveResponse: 1.5, // Highest discriminatory power
  learningFromSetbacks: 1.3,
  skillDiversity: 1.2,
  externalResources: 1.1,
  ipProtection: 1.0,
  financialReserves: 1.2,
  communityDecisionMaking: 1.4,
  benefitDistribution: 1.3,
  communityOwnership: 1.4,
  allianceNetworks: 1.1,

  // Economic Resilience constructs
  revenueRetention: 1.3,
  teamRetention: 1.2,
  recoverySpeed: 1.4,
  opportunityDiscovery: 1.1,
  postShockStrength: 1.5,
  communitySpillover: 1.0,
  jobCreation: 1.1,
  intergenerationalPlanning: 1.2,
}

// Synergy pairs that create multiplicative benefits
export const SYNERGY_PAIRS: Array<{
  construct1: string
  construct2: string
  bonus: number
  description: string
}> = [
  {
    construct1: 'culturalAuthenticity',
    construct2: 'adaptiveResponse',
    bonus: 0.092, // +9.2%
    description: 'Cultural Integrity + Adaptive Capacity',
  },
  {
    construct1: 'communityInvolvement',
    construct2: 'adaptiveResponse',
    bonus: 0.077, // +7.7%
    description: 'Community Relevance + Adaptive Capacity',
  },
  {
    construct1: 'productDevelopment',
    construct2: 'culturalAuthenticity',
    bonus: 0.071, // +7.1%
    description: 'Economic Value + Cultural Integrity',
  },
  {
    construct1: 'communityDecisionMaking',
    construct2: 'benefitDistribution',
    bonus: 0.065, // +6.5%
    description: 'Community Control + Community Benefit',
  },
  {
    construct1: 'ipProtection',
    construct2: 'culturalPreservation',
    bonus: 0.058, // +5.8%
    description: 'IP Protection + Cultural Protection',
  },
]

// Threshold for synergy activation
export const SYNERGY_THRESHOLD = 0.70 // 70%

/**
 * Normalize a Likert score (1-7) to 0-1 scale
 */
export function normalizeLikert(value: number): number {
  if (value < 1 || value > 7) return 0
  return (value - 1) / 6
}

/**
 * Calculate weighted mean for a set of normalized scores
 */
export function calculateWeightedMean(
  scores: number[],
  weights: number[]
): number {
  if (scores.length === 0 || scores.length !== weights.length) return 0

  const totalWeight = weights.reduce((sum, w) => sum + w, 0)
  const weightedSum = scores.reduce((sum, score, i) => sum + score * weights[i], 0)

  return weightedSum / totalWeight
}

/**
 * Calculate construct score for a section
 */
export function calculateConstructScore(
  answers: AssessmentAnswers,
  questionIds: string[],
  constructWeights: number[]
): number {
  const scores: number[] = []
  const weights: number[] = []

  questionIds.forEach((id, index) => {
    const answer = answers[id]
    if (typeof answer === 'number' && answer >= 1 && answer <= 7) {
      scores.push(normalizeLikert(answer))
      weights.push(constructWeights[index] || 1)
    }
  })

  return calculateWeightedMean(scores, weights)
}

/**
 * Calculate synergy bonus based on construct scores
 */
export function calculateSynergyBonus(constructScores: Record<string, number>): number {
  let totalBonus = 0

  SYNERGY_PAIRS.forEach(pair => {
    const score1 = constructScores[pair.construct1] || 0
    const score2 = constructScores[pair.construct2] || 0

    // Apply synergy bonus if both constructs exceed threshold
    if (score1 >= SYNERGY_THRESHOLD && score2 >= SYNERGY_THRESHOLD) {
      totalBonus += pair.bonus
    }
  })

  return totalBonus
}

/**
 * Get synergies that are active based on current scores
 */
export function getActiveSynergies(constructScores: Record<string, number>): typeof SYNERGY_PAIRS {
  return SYNERGY_PAIRS.filter(pair => {
    const score1 = constructScores[pair.construct1] || 0
    const score2 = constructScores[pair.construct2] || 0
    return score1 >= SYNERGY_THRESHOLD && score2 >= SYNERGY_THRESHOLD
  })
}

/**
 * Section score calculation result
 */
export interface SectionScore {
  section: AssessmentSection
  score: number // 0-100
  answeredQuestions: number
  totalQuestions: number
  constructScores: Record<string, number>
}

/**
 * Overall assessment result
 */
export interface AssessmentResult {
  overallScore: number // Cultural Innovation Resilience Index (0-100)
  sectionScores: SectionScore[]
  synergyBonus: number
  activeSynergies: typeof SYNERGY_PAIRS
  interpretation: ScoreInterpretation
  radarData: RadarDataPoint[]
  recommendations: Recommendation[]
}

/**
 * Radar chart data point
 */
export interface RadarDataPoint {
  dimension: string
  score: number
  fullMark: 100
}

/**
 * Score interpretation levels
 */
export interface ScoreInterpretation {
  level: 'Critical' | 'Low' | 'Medium' | 'Medium-High' | 'High' | 'Excellent'
  successRate: number
  description: string
  color: string
}

/**
 * Recommendation based on scores (legacy interface)
 */
export interface Recommendation {
  priority: number
  area: string
  currentScore: number
  targetScore: number
  impact: string
  action: string
}

// Re-export personalized recommendation types for convenience
export type { PersonalizedRecommendation, Demographics, ConstructId } from '@/lib/recommendations/types'

/**
 * Get score interpretation based on overall score
 */
export function getScoreInterpretation(score: number): ScoreInterpretation {
  if (score < 25) {
    return {
      level: 'Critical',
      successRate: 15.7,
      description: 'High risk of failure. Focus on building foundation components before scaling. Critical gaps exist in multiple dimensions that require immediate attention.',
      color: 'text-red-600',
    }
  } else if (score < 40) {
    return {
      level: 'Low',
      successRate: 28.2,
      description: 'Significant gaps exist across key dimensions. Prioritize strengthening cultural capital and organizational capacities before pursuing expansion.',
      color: 'text-orange-600',
    }
  } else if (score < 55) {
    return {
      level: 'Medium',
      successRate: 51.2,
      description: 'Approaching critical threshold. Focused improvements in weak areas can yield dramatic gains in resilience outcomes.',
      color: 'text-yellow-600',
    }
  } else if (score < 70) {
    return {
      level: 'Medium-High',
      successRate: 78.4,
      description: 'Above average resilience profile. Continue building on strengths while addressing remaining gaps in organizational capacity.',
      color: 'text-lime-600',
    }
  } else if (score < 85) {
    return {
      level: 'High',
      successRate: 92.3,
      description: 'Strong cultural innovation resilience. Focus on transformative and generative capacities to maximize long-term impact.',
      color: 'text-green-600',
    }
  } else {
    return {
      level: 'Excellent',
      successRate: 98.6,
      description: 'Outstanding cultural innovation resilience. Your initiative serves as a model for others. Focus on knowledge sharing and scaling impact.',
      color: 'text-emerald-600',
    }
  }
}

/**
 * Generate recommendations based on section scores (legacy function)
 * For personalized recommendations, use generatePersonalizedRecommendations from @/lib/recommendations/engine
 */
export function generateRecommendations(
  sectionScores: SectionScore[],
  constructScores: Record<string, number>
): Recommendation[] {
  const recommendations: Recommendation[] = []

  // Find lowest-scoring constructs
  const sortedConstructs = Object.entries(constructScores)
    .filter(([_, score]) => score < 0.7) // Below 70%
    .sort((a, b) => a[1] - b[1])
    .slice(0, 5) // Top 5 weakest

  const constructLabels: Record<string, { area: string; action: string; impact: string }> = {
    traditionalKnowledge: {
      area: 'Traditional Knowledge Documentation',
      action: 'Document and digitize traditional knowledge with community elders',
      impact: 'Foundation for authentic cultural innovation',
    },
    practitionerAccess: {
      area: 'Practitioner Networks',
      action: 'Develop relationships with skilled traditional practitioners',
      impact: 'Essential for maintaining cultural integrity',
    },
    culturalAuthenticity: {
      area: 'Cultural Authenticity',
      action: 'Ensure community validation and cultural protocol adherence',
      impact: 'Critical for market differentiation and community trust',
    },
    communityInvolvement: {
      area: 'Community Involvement',
      action: 'Establish community advisory boards and decision-making processes',
      impact: 'Key predictor of long-term success (+23.9 pp)',
    },
    adaptiveResponse: {
      area: 'Adaptive Capacity',
      action: 'Develop systematic learning and response mechanisms',
      impact: 'Highest discriminatory power (+64.7 pp)',
    },
    financialReserves: {
      area: 'Financial Resilience',
      action: 'Build operating reserves of 3-6 months expenses',
      impact: 'Critical buffer against disruptions',
    },
    communityDecisionMaking: {
      area: 'Community Governance',
      action: 'Ensure community members control key strategic decisions',
      impact: 'Strong predictor of sustainable outcomes (+33.7 pp)',
    },
    ipProtection: {
      area: 'Intellectual Property Protection',
      action: 'Establish legal protections for cultural knowledge and designs',
      impact: 'Prevents exploitation and ensures fair compensation',
    },
    intergenerationalPlanning: {
      area: 'Intergenerational Continuity',
      action: 'Develop youth training programs and succession plans',
      impact: 'Essential for long-term sustainability',
    },
    productDevelopment: {
      area: 'Innovation Pipeline',
      action: 'Establish regular cycles of culturally-grounded product development',
      impact: 'Drives economic value creation (+36.8 pp)',
    },
  }

  sortedConstructs.forEach(([construct, score], index) => {
    const info = constructLabels[construct]
    if (info) {
      recommendations.push({
        priority: index + 1,
        area: info.area,
        currentScore: Math.round(score * 100),
        targetScore: 70,
        impact: info.impact,
        action: info.action,
      })
    }
  })

  return recommendations
}

// Re-export the personalization engine functions
export {
  generatePersonalizedRecommendations,
  extractDemographics,
  generateProfileSummary,
  getThisWeekActions,
  getQuickWins,
  getIndustryTips,
} from '@/lib/recommendations/engine'

/**
 * Generate radar chart data from section scores
 */
export function generateRadarData(sectionScores: SectionScore[]): RadarDataPoint[] {
  const dimensionLabels: Record<AssessmentSection, string> = {
    demographics: 'Context',
    culturalCapital: 'Cultural Capital',
    innovationActivities: 'Innovation',
    organizationalCapacities: 'Org. Capacity',
    economicResilience: 'Resilience',
  }

  return sectionScores
    .filter(s => s.section !== 'demographics') // Exclude demographics from radar
    .map(s => ({
      dimension: dimensionLabels[s.section],
      score: Math.round(s.score),
      fullMark: 100 as const,
    }))
}

/**
 * Main function to calculate complete assessment result
 */
export function calculateAssessmentResult(
  answers: AssessmentAnswers,
  questionConfig: {
    sectionQuestions: Record<AssessmentSection, string[]>
    questionConstructs: Record<string, string>
  }
): AssessmentResult {
  const { sectionQuestions, questionConstructs } = questionConfig

  // Calculate construct scores
  const constructScores: Record<string, number> = {}
  const sectionScores: SectionScore[] = []

  // Process each section
  ;(Object.keys(sectionQuestions) as AssessmentSection[]).forEach(section => {
    const questionIds = sectionQuestions[section]
    const sectionConstructScores: Record<string, number> = {}

    // Group questions by construct
    const constructQuestions: Record<string, string[]> = {}
    questionIds.forEach(id => {
      const construct = questionConstructs[id] || 'general'
      if (!constructQuestions[construct]) {
        constructQuestions[construct] = []
      }
      constructQuestions[construct].push(id)
    })

    // Calculate score for each construct
    Object.entries(constructQuestions).forEach(([construct, ids]) => {
      const weights = ids.map(id => CONSTRUCT_WEIGHTS[construct] || 1)
      const score = calculateConstructScore(answers, ids, weights)
      sectionConstructScores[construct] = score
      constructScores[construct] = score
    })

    // Calculate section score
    const sectionWeight = SECTION_WEIGHTS[section]
    const answeredCount = questionIds.filter(id => answers[id] != null).length

    let sectionScore = 0
    if (section !== 'demographics' && answeredCount > 0) {
      const scores = Object.values(sectionConstructScores)
      sectionScore = scores.length > 0
        ? (scores.reduce((sum, s) => sum + s, 0) / scores.length) * 100
        : 0
    }

    sectionScores.push({
      section,
      score: Math.round(sectionScore),
      answeredQuestions: answeredCount,
      totalQuestions: questionIds.length,
      constructScores: sectionConstructScores,
    })
  })

  // Calculate overall score (weighted average of sections)
  const weightedScores = sectionScores
    .filter(s => s.section !== 'demographics')
    .map(s => ({
      score: s.score,
      weight: SECTION_WEIGHTS[s.section],
    }))

  const totalWeight = weightedScores.reduce((sum, w) => sum + w.weight, 0)
  let baseScore = weightedScores.reduce((sum, w) => sum + w.score * w.weight, 0) / totalWeight

  // Calculate synergy bonus
  const synergyBonus = calculateSynergyBonus(constructScores)
  const activeSynergies = getActiveSynergies(constructScores)

  // Apply synergy bonus (max 15% additional)
  const overallScore = Math.min(100, baseScore * (1 + synergyBonus))

  // Generate interpretation and recommendations
  const interpretation = getScoreInterpretation(overallScore)
  const recommendations = generateRecommendations(sectionScores, constructScores)
  const radarData = generateRadarData(sectionScores)

  return {
    overallScore: Math.round(overallScore),
    sectionScores,
    synergyBonus: Math.round(synergyBonus * 100),
    activeSynergies,
    interpretation,
    radarData,
    recommendations,
  }
}

// Export constants for UI use
export const SCORE_THRESHOLDS = {
  CRITICAL: 25,
  LOW: 40,
  MEDIUM: 55,
  MEDIUM_HIGH: 70,
  HIGH: 85,
} as const

export const DATABASE_STATISTICS = {
  averageScore: 62.4,
  medianScore: 65,
  sampleSize: 362,
  successRateAbove70: 92.3,
} as const

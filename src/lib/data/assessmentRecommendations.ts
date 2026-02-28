/**
 * Assessment Recommendations Engine
 *
 * Maps CIL construct scores to secondary assessment relevance,
 * enabling personalized "what to do next" guidance after CIL completion.
 */

import { AssessmentType, ASSESSMENT_CONFIGS } from './assessmentConfig'

export type RecommendationLevel = 'strongly-recommended' | 'recommended' | 'optional'

export interface AssessmentRecommendation {
  assessmentType: AssessmentType
  relevanceScore: number // 0-1, lower construct avg = higher relevance
  level: RecommendationLevel
  forYouIf: string
  notForYouIf: string
  benefit: string
  relevantConstructs: string[]
  constructAverageScore: number // 0-1 average of relevant constructs
}

interface AssessmentMapping {
  assessmentType: AssessmentType
  relevantConstructs: string[]
  forYouIf: string
  notForYouIf: string
  benefit: string
}

const ASSESSMENT_CONSTRUCT_MAPPINGS: AssessmentMapping[] = [
  {
    assessmentType: 'cimm',
    relevantConstructs: [
      'productDevelopment',
      'techniqueCombination',
      'innovationLeadership',
      'marketExpansion',
      'digitalDistribution',
    ],
    forYouIf: 'Your innovation activities scored below 60% — this assessment will help you measure and improve innovation depth, integrity, and velocity.',
    notForYouIf: 'Your innovation activities are already strong. Consider this later to track progress.',
    benefit: 'Unlocks Innovation Intensity Ratio and Cultural Leverage Index calculators',
  },
  {
    assessmentType: 'cira',
    relevantConstructs: [
      'adaptiveResponse',
      'learningFromSetbacks',
      'skillDiversity',
      'innovationLeadership',
    ],
    forYouIf: 'Your organizational capacities need strengthening — this assessment evaluates your readiness to scale and identifies barriers.',
    notForYouIf: 'Your organizational capacities are solid. Use this to benchmark readiness periodically.',
    benefit: 'Unlocks Innovation Readiness Calculator and Innovation Inclusivity Score',
  },
  {
    assessmentType: 'tbl',
    relevantConstructs: [
      'benefitDistribution',
      'communitySpillover',
      'jobCreation',
      'communityDecisionMaking',
    ],
    forYouIf: 'Your community benefit and impact scores are low — measure your triple bottom line to find where value is leaking.',
    notForYouIf: 'Your community impact is strong. Use this to document and communicate your impact.',
    benefit: 'Unlocks Triple Bottom Line Calculator and Economic Multiplier Effect',
  },
  {
    assessmentType: 'ciss',
    relevantConstructs: [
      'culturalPreservation',
      'intergenerationalPlanning',
      'financialReserves',
      'culturalAuthenticity',
    ],
    forYouIf: 'Your cultural preservation and sustainability scores need attention — assess whether your initiative can thrive for generations.',
    notForYouIf: 'Your cultural sustainability foundations are strong. Revisit annually.',
    benefit: 'Unlocks Sustainability Scorecard and Cultural Resilience Quotient',
  },
  {
    assessmentType: 'pricing',
    relevantConstructs: [
      'culturalBrandPremium',
      'revenueDiversification',
      'marketExpansion',
      'efficiencyImprovement',
    ],
    forYouIf: 'Your revenue and pricing scores are below 60% — find the right price point that captures the true value you create.',
    notForYouIf: 'Your revenue strategy is working well. Use this to fine-tune pricing.',
    benefit: 'Unlocks Cultural Product Pricing Calculator and Innovation Efficiency Rate',
  },
]

/**
 * Calculate assessment recommendations based on CIL construct scores.
 * Returns all 5 secondary assessments sorted by relevance (most needed first).
 */
export function getAssessmentRecommendations(
  constructScores: Record<string, number>
): AssessmentRecommendation[] {
  const recommendations = ASSESSMENT_CONSTRUCT_MAPPINGS.map((mapping) => {
    // Average the relevant construct scores (0-1 scale)
    const scores = mapping.relevantConstructs
      .map((c) => constructScores[c] ?? 0)
      .filter((s) => s !== undefined)

    const avgScore = scores.length > 0
      ? scores.reduce((sum, s) => sum + s, 0) / scores.length
      : 0

    // Lower average = more relevant (bigger gap to fill)
    const relevanceScore = 1 - avgScore

    // Determine recommendation level based on construct average
    let level: RecommendationLevel
    if (avgScore < 0.5) {
      level = 'strongly-recommended'
    } else if (avgScore < 0.7) {
      level = 'recommended'
    } else {
      level = 'optional'
    }

    return {
      assessmentType: mapping.assessmentType,
      relevanceScore,
      level,
      forYouIf: mapping.forYouIf,
      notForYouIf: mapping.notForYouIf,
      benefit: mapping.benefit,
      relevantConstructs: mapping.relevantConstructs,
      constructAverageScore: avgScore,
    }
  })

  // Sort by relevance (highest relevance = lowest construct avg = first)
  return recommendations.sort((a, b) => b.relevanceScore - a.relevanceScore)
}

/**
 * Get the display label and color for a recommendation level.
 */
export function getRecommendationBadge(level: RecommendationLevel): {
  label: string
  className: string
} {
  switch (level) {
    case 'strongly-recommended':
      return {
        label: 'Recommended for you',
        className: 'bg-gold/20 text-gold border-gold/30',
      }
    case 'recommended':
      return {
        label: 'Good next step',
        className: 'bg-ocean/20 text-ocean border-ocean/30',
      }
    case 'optional':
      return {
        label: 'Optional',
        className: 'bg-sand text-stone border-stone/20',
      }
  }
}

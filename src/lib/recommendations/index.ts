/**
 * Personalized Recommendations Module
 *
 * This module provides context-specific recommendations for cultural innovation
 * resilience based on user demographics and assessment scores.
 *
 * Usage:
 * ```typescript
 * import {
 *   generatePersonalizedRecommendations,
 *   extractDemographics,
 *   generateProfileSummary
 * } from '@/lib/recommendations'
 *
 * const demographics = extractDemographics(answers)
 * const recommendations = generatePersonalizedRecommendations(constructScores, demographics)
 * ```
 */

// Types
export type {
  Demographics,
  OrganizationType,
  Industry,
  BusinessStage,
  TeamSize,
  Region,
  ConstructId,
  RecommendationContext,
  ActionStep,
  RecommendationVariant,
  PersonalizedRecommendation,
  CaseStudyMatchingCriteria,
  MatchedCaseStudy,
  CaseStudyMatchResult,
} from './types'

export {
  CONSTRUCT_LABELS,
  CASE_STUDY_MATCH_WEIGHTS,
  getConstructLabel,
  generateContextLabel,
} from './types'

// Engine functions
export {
  extractDemographics,
  generatePersonalizedRecommendations,
  generateProfileSummary,
  getThisWeekActions,
  getQuickWins,
  hasIndustrySpecificGuidance,
  getIndustryTips,
} from './engine'

// Content library
export {
  RECOMMENDATION_LIBRARY,
  getDefaultRecommendation,
} from './content'

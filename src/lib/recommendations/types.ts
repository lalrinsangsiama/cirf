/**
 * Personalized Recommendations Type Definitions
 *
 * These types support the personalization engine that generates
 * context-specific recommendations based on user demographics and assessment scores.
 */

// Organization type values from demographicQuestions
export type OrganizationType =
  | 'cooperative'
  | 'community-org'
  | 'indigenous-enterprise'
  | 'cultural-institution'
  | 'craft-guild'
  | 'for-profit'
  | 'government'
  | 'individual'
  | 'other'

// Industry/sector values from demographicQuestions
export type Industry =
  | 'crafts'
  | 'performing-arts'
  | 'visual-arts'
  | 'music'
  | 'food-beverage'
  | 'fashion-textiles'
  | 'heritage-tourism'
  | 'publishing-media'
  | 'design'
  | 'education'
  | 'wellness'
  | 'agriculture'
  | 'multi-sector'

// Business stage values from demographicQuestions
export type BusinessStage =
  | 'idea'
  | 'startup'
  | 'growth'
  | 'scaling'
  | 'established'

// Team size values from demographicQuestions
export type TeamSize =
  | 'solo'
  | '2-5'
  | '6-10'
  | '11-25'
  | '26-50'
  | '51+'

// Region values from demographicQuestions
export type Region =
  | 'africa'
  | 'asia-pacific'
  | 'europe'
  | 'latin-america'
  | 'middle-east'
  | 'north-america'
  | 'oceania'
  | 'global'

/**
 * User demographics extracted from assessment answers
 */
export interface Demographics {
  orgType: OrganizationType
  industry: Industry
  businessStage: BusinessStage
  teamSize: TeamSize
  region: Region
  revenueRange?: string
}

/**
 * Construct identifiers used in the assessment
 */
export type ConstructId =
  // Cultural Capital
  | 'traditionalKnowledge'
  | 'practitionerAccess'
  | 'culturalAuthenticity'
  | 'communityInvolvement'
  | 'culturalPreservation'
  | 'practitionerRelationships'
  | 'culturalMembership'
  | 'culturalMeaning'
  // Innovation Activities
  | 'productDevelopment'
  | 'techniqueCombination'
  | 'innovationLeadership'
  | 'marketExpansion'
  | 'digitalDistribution'
  | 'efficiencyImprovement'
  | 'externalCollaboration'
  | 'feedbackIteration'
  // Organizational Capacities
  | 'adaptiveResponse'
  | 'learningFromSetbacks'
  | 'skillDiversity'
  | 'externalResources'
  | 'ipProtection'
  | 'financialReserves'
  | 'communityDecisionMaking'
  | 'benefitDistribution'
  | 'communityOwnership'
  | 'allianceNetworks'
  // Economic Resilience
  | 'revenueRetention'
  | 'teamRetention'
  | 'recoverySpeed'
  | 'opportunityDiscovery'
  | 'postShockStrength'
  | 'communitySpillover'
  | 'jobCreation'
  | 'intergenerationalPlanning'

/**
 * Context used for matching recommendations
 */
export interface RecommendationContext {
  construct: ConstructId
  orgTypes?: OrganizationType[]
  industries?: Industry[]
  businessStages?: BusinessStage[]
  teamSizes?: TeamSize[]
  regions?: Region[]
}

/**
 * A single actionable step in a recommendation
 */
export interface ActionStep {
  action: string
  timeframe?: 'this-week' | 'this-month' | 'this-quarter' | 'ongoing'
}

/**
 * A recommendation variant with specific context
 */
export interface RecommendationVariant {
  id: string
  context: RecommendationContext
  title: string
  description: string
  actionSteps: ActionStep[]
  relatedCaseStudyIds?: string[]
  impact: string
  priority?: 'critical' | 'high' | 'medium' | 'low'
}

/**
 * A personalized recommendation returned to the user
 */
export interface PersonalizedRecommendation {
  priority: number
  construct: ConstructId
  area: string
  currentScore: number
  targetScore: number
  title: string
  description: string
  actionSteps: ActionStep[]
  impact: string
  contextLabel: string // e.g., "For solo artisans in crafts at the startup stage"
  relatedCaseStudies: MatchedCaseStudy[]
}

/**
 * Case study matching criteria
 */
export interface CaseStudyMatchingCriteria {
  industries: Industry[]
  orgTypes: OrganizationType[]
  challengesOvercome: ConstructId[]
  regions?: Region[]
  businessStages?: BusinessStage[]
}

/**
 * A matched case study with relevance score and match reasons
 */
export interface MatchedCaseStudy {
  id: string
  title: string
  country: string
  category: string
  cilScore: number
  matchScore: number
  matchReasons: string[]
}

/**
 * Result of the enhanced case study matching
 */
export interface CaseStudyMatchResult {
  caseStudy: MatchedCaseStudy
  relevanceScore: number
  matchDetails: {
    industryMatch: boolean
    orgTypeMatch: boolean
    regionMatch: boolean
    challengeMatch: boolean
    scoreProximity: number
  }
}

/**
 * Scoring weights for case study matching
 */
export const CASE_STUDY_MATCH_WEIGHTS = {
  SAME_INDUSTRY: 30,
  SIMILAR_ORG_TYPE: 25,
  SAME_REGION: 20,
  OVERCAME_SIMILAR_CHALLENGES: 25,
  SIMILAR_SCORE: 15,
} as const

/**
 * Labels for constructs used in the UI
 */
export const CONSTRUCT_LABELS: Record<ConstructId, string> = {
  // Cultural Capital
  traditionalKnowledge: 'Traditional Knowledge Documentation',
  practitionerAccess: 'Practitioner Networks',
  culturalAuthenticity: 'Cultural Authenticity',
  communityInvolvement: 'Community Involvement',
  culturalPreservation: 'Cultural Preservation',
  practitionerRelationships: 'Practitioner Relationships',
  culturalMembership: 'Cultural Membership',
  culturalMeaning: 'Cultural Meaning Preservation',
  // Innovation Activities
  productDevelopment: 'Innovation Pipeline',
  techniqueCombination: 'Technique Innovation',
  innovationLeadership: 'Innovation Leadership',
  marketExpansion: 'Market Expansion',
  digitalDistribution: 'Digital Distribution',
  efficiencyImprovement: 'Efficiency Improvement',
  externalCollaboration: 'External Collaboration',
  feedbackIteration: 'Feedback & Iteration',
  // Organizational Capacities
  adaptiveResponse: 'Adaptive Capacity',
  learningFromSetbacks: 'Learning Systems',
  skillDiversity: 'Skill Diversity',
  externalResources: 'External Resources',
  ipProtection: 'IP Protection',
  financialReserves: 'Financial Resilience',
  communityDecisionMaking: 'Community Governance',
  benefitDistribution: 'Benefit Distribution',
  communityOwnership: 'Community Ownership',
  allianceNetworks: 'Alliance Networks',
  // Economic Resilience
  revenueRetention: 'Revenue Retention',
  teamRetention: 'Team Retention',
  recoverySpeed: 'Recovery Speed',
  opportunityDiscovery: 'Opportunity Discovery',
  postShockStrength: 'Post-Shock Strength',
  communitySpillover: 'Community Spillover',
  jobCreation: 'Job Creation',
  intergenerationalPlanning: 'Intergenerational Planning',
}

/**
 * Helper to get a human-readable label for a construct
 */
export function getConstructLabel(construct: ConstructId): string {
  return CONSTRUCT_LABELS[construct] || construct
}

/**
 * Generate a context label for personalized recommendations
 */
export function generateContextLabel(demographics: Demographics): string {
  const orgTypeLabels: Record<OrganizationType, string> = {
    cooperative: 'cooperatives',
    'community-org': 'community organizations',
    'indigenous-enterprise': 'indigenous enterprises',
    'cultural-institution': 'cultural institutions',
    'craft-guild': 'craft guilds',
    'for-profit': 'cultural businesses',
    government: 'public agencies',
    individual: 'individual practitioners',
    other: 'cultural initiatives',
  }

  const industryLabels: Record<Industry, string> = {
    crafts: 'crafts',
    'performing-arts': 'performing arts',
    'visual-arts': 'visual arts',
    music: 'music',
    'food-beverage': 'food & beverage',
    'fashion-textiles': 'fashion & textiles',
    'heritage-tourism': 'heritage tourism',
    'publishing-media': 'publishing & media',
    design: 'design',
    education: 'cultural education',
    wellness: 'traditional wellness',
    agriculture: 'cultural agriculture',
    'multi-sector': 'multi-sector initiatives',
  }

  const stageLabels: Record<BusinessStage, string> = {
    idea: 'the idea stage',
    startup: 'the startup stage',
    growth: 'the growth stage',
    scaling: 'the scaling stage',
    established: 'an established stage',
  }

  const orgLabel = orgTypeLabels[demographics.orgType] || 'cultural initiatives'
  const industryLabel = industryLabels[demographics.industry] || 'the cultural sector'
  const stageLabel = stageLabels[demographics.businessStage] || 'your current stage'

  return `For ${orgLabel} in ${industryLabel} at ${stageLabel}`
}

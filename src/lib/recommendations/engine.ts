/**
 * Personalized Recommendations Engine
 *
 * This module generates context-specific recommendations based on user demographics
 * and assessment scores. It matches users to appropriate recommendation variants
 * from the content library.
 */

import type {
  Demographics,
  ConstructId,
  PersonalizedRecommendation,
  RecommendationVariant,
  RecommendationContext,
  MatchedCaseStudy,
  OrganizationType,
  Industry,
  BusinessStage,
  Region,
} from './types'
import {
  CONSTRUCT_LABELS,
  generateContextLabel,
} from './types'
import { RECOMMENDATION_LIBRARY, getDefaultRecommendation } from './content'

/**
 * Map ISO country codes to region values
 */
function countryToRegion(countryCode: string): Region {
  const regionMap: Record<string, Region> = {
    // Africa
    DZ: 'africa', EG: 'africa', ET: 'africa', GH: 'africa', KE: 'africa',
    MA: 'africa', NG: 'africa', ZA: 'africa', TZ: 'africa', UG: 'africa', ZW: 'africa',
    // Asia-Pacific
    BD: 'asia-pacific', CN: 'asia-pacific', HK: 'asia-pacific', IN: 'asia-pacific',
    ID: 'asia-pacific', JP: 'asia-pacific', KR: 'asia-pacific', MY: 'asia-pacific',
    PK: 'asia-pacific', PH: 'asia-pacific', SG: 'asia-pacific', LK: 'asia-pacific',
    TW: 'asia-pacific', TH: 'asia-pacific', VN: 'asia-pacific',
    // Europe
    AL: 'europe', AT: 'europe', BE: 'europe', HR: 'europe', CZ: 'europe',
    DK: 'europe', FI: 'europe', FR: 'europe', DE: 'europe', GR: 'europe',
    HU: 'europe', IE: 'europe', IT: 'europe', NL: 'europe', NO: 'europe',
    PL: 'europe', PT: 'europe', RO: 'europe', RU: 'europe', ES: 'europe',
    SE: 'europe', CH: 'europe', UA: 'europe', GB: 'europe',
    // Latin America
    AR: 'latin-america', BR: 'latin-america', CL: 'latin-america',
    CO: 'latin-america', CR: 'latin-america', EC: 'latin-america',
    GT: 'latin-america', MX: 'latin-america', PE: 'latin-america',
    // Middle East
    IL: 'middle-east', SA: 'middle-east', TR: 'middle-east', AE: 'middle-east',
    // North America
    CA: 'north-america', US: 'north-america',
    // Oceania
    AU: 'oceania', NZ: 'oceania',
  }
  return regionMap[countryCode] || 'global'
}

/**
 * Extract demographics from assessment answers
 */
export function extractDemographics(
  answers: Record<string, number | string | string[] | null>
): Demographics {
  // demo-sector is multiselect — use first selection as primary industry
  const sectorAnswer = answers['demo-sector']
  const primaryIndustry: Industry = Array.isArray(sectorAnswer)
    ? (sectorAnswer[0] as Industry) || 'multi-sector'
    : (sectorAnswer as Industry) || 'multi-sector'

  return {
    orgType: (answers['demo-org-type'] as OrganizationType) || 'other',
    industry: primaryIndustry,
    businessStage: (answers['demo-stage'] as BusinessStage) || 'startup',
    teamSize: (answers['demo-team-size'] as Demographics['teamSize']) || '2-5',
    region: countryToRegion(answers['demo-country'] as string) || 'global',
    revenueRange: (answers['demo-revenue'] as string) || undefined,
  }
}

/**
 * Calculate how well a recommendation variant matches user demographics
 * Higher score = better match
 */
function calculateContextMatchScore(
  context: RecommendationContext,
  demographics: Demographics
): number {
  let score = 0
  let matchableFields = 0

  // Check org type match
  if (context.orgTypes && context.orgTypes.length > 0) {
    matchableFields++
    if (context.orgTypes.includes(demographics.orgType)) {
      score += 30
    }
  }

  // Check industry match
  if (context.industries && context.industries.length > 0) {
    matchableFields++
    if (context.industries.includes(demographics.industry)) {
      score += 25
    }
  }

  // Check business stage match
  if (context.businessStages && context.businessStages.length > 0) {
    matchableFields++
    if (context.businessStages.includes(demographics.businessStage)) {
      score += 25
    }
  }

  // Check team size match
  if (context.teamSizes && context.teamSizes.length > 0) {
    matchableFields++
    if (context.teamSizes.includes(demographics.teamSize)) {
      score += 10
    }
  }

  // Check region match
  if (context.regions && context.regions.length > 0) {
    matchableFields++
    if (context.regions.includes(demographics.region)) {
      score += 10
    }
  }

  // If no specific context requirements, give base score
  // (default recommendations should still be usable)
  if (matchableFields === 0) {
    return 10 // Base score for generic recommendations
  }

  return score
}

/**
 * Find the best matching recommendation variant for a construct
 */
function findBestVariant(
  construct: ConstructId,
  demographics: Demographics
): RecommendationVariant | null {
  const variants = RECOMMENDATION_LIBRARY[construct]

  if (!variants || variants.length === 0) {
    return getDefaultRecommendation(construct)
  }

  // Score each variant
  const scoredVariants = variants.map(variant => ({
    variant,
    score: calculateContextMatchScore(variant.context, demographics),
  }))

  // Sort by score (highest first)
  scoredVariants.sort((a, b) => b.score - a.score)

  // Return the best match, or the default if no good match
  const bestMatch = scoredVariants[0]

  // If best match has a very low score, prefer a generic default
  if (bestMatch.score < 10) {
    const defaultVariant = variants.find(
      v =>
        !v.context.orgTypes &&
        !v.context.industries &&
        !v.context.businessStages
    )
    if (defaultVariant) {
      return defaultVariant
    }
  }

  return bestMatch.variant
}

/**
 * Generate personalized recommendations based on construct scores and demographics
 */
export function generatePersonalizedRecommendations(
  constructScores: Record<string, number>,
  demographics: Demographics,
  options: {
    maxRecommendations?: number
    scoreThreshold?: number
    includeMatchedCaseStudies?: boolean
  } = {}
): PersonalizedRecommendation[] {
  const {
    maxRecommendations = 5,
    scoreThreshold = 0.7,
    includeMatchedCaseStudies = true,
  } = options

  // Find lowest-scoring constructs below threshold
  const weakConstructs = Object.entries(constructScores)
    .filter(([_, score]) => score < scoreThreshold)
    .sort((a, b) => a[1] - b[1])
    .slice(0, maxRecommendations)
    .map(([construct]) => construct as ConstructId)

  const contextLabel = generateContextLabel(demographics)
  const recommendations: PersonalizedRecommendation[] = []

  weakConstructs.forEach((construct, index) => {
    const variant = findBestVariant(construct, demographics)

    if (!variant) {
      // Fallback to generic recommendation
      recommendations.push({
        priority: index + 1,
        construct,
        area: CONSTRUCT_LABELS[construct] || construct,
        currentScore: Math.round((constructScores[construct] || 0) * 100),
        targetScore: 70,
        title: `Improve ${CONSTRUCT_LABELS[construct] || construct}`,
        description: 'Focus on strengthening this area to improve your overall performance.',
        actionSteps: [
          { action: 'Assess your current situation in this area', timeframe: 'this-week' },
          { action: 'Identify specific improvement opportunities', timeframe: 'this-month' },
          { action: 'Implement changes and track progress', timeframe: 'ongoing' },
        ],
        impact: 'Will contribute to overall performance improvement',
        contextLabel,
        relatedCaseStudies: [],
      })
      return
    }

    // Build the recommendation from the variant
    const recommendation: PersonalizedRecommendation = {
      priority: index + 1,
      construct,
      area: CONSTRUCT_LABELS[construct] || construct,
      currentScore: Math.round((constructScores[construct] || 0) * 100),
      targetScore: 70,
      title: variant.title,
      description: variant.description,
      actionSteps: variant.actionSteps,
      impact: variant.impact,
      contextLabel,
      relatedCaseStudies: [],
    }

    // Add related case studies if requested
    if (includeMatchedCaseStudies && variant.relatedCaseStudyIds) {
      // This will be populated by the enhanced case study matching in the UI
      recommendation.relatedCaseStudies = variant.relatedCaseStudyIds.map(id => ({
        id,
        title: '', // Will be populated from case studies data
        country: '',
        category: '',
        cilScore: 0,
        matchScore: 0,
        matchReasons: [],
      }))
    }

    recommendations.push(recommendation)
  })

  return recommendations
}

/**
 * Generate a summary of the user's profile context
 */
export function generateProfileSummary(demographics: Demographics): string {
  const orgTypeLabels: Record<OrganizationType, string> = {
    cooperative: 'a cooperative',
    'community-org': 'a community organization',
    'indigenous-enterprise': 'an indigenous enterprise',
    'cultural-institution': 'a cultural institution',
    'craft-guild': 'a craft guild',
    'for-profit': 'a cultural business',
    government: 'a public agency',
    individual: 'an individual practitioner',
    other: 'a cultural initiative',
  }

  const industryLabels: Record<Industry, string> = {
    crafts: 'the crafts sector',
    'performing-arts': 'performing arts',
    'visual-arts': 'visual arts',
    'food-beverage': 'food & culinary traditions',
    'fashion-textiles': 'fashion & textiles',
    'heritage-tourism': 'heritage tourism',
    'digital-film-media': 'digital content & media',
    'ar-vr-xr': 'AR/VR/XR & immersive experiences',
    'gaming-interactive': 'gaming & interactive media',
    mobility: 'mobility & cultural transport',
    'language-literature': 'language & storytelling',
    'festivals-ceremonies': 'festivals & events',
    'traditional-medicine': 'traditional medicine & wellness',
    design: 'design',
    education: 'cultural education',
    'community-development': 'community cultural development',
    agriculture: 'cultural agriculture',
    other: 'the cultural sector',
    'multi-sector': 'multiple cultural sectors',
  }

  const stageLabels: Record<BusinessStage, string> = {
    idea: 'at the idea stage',
    startup: 'in the startup phase',
    growth: 'in a growth phase',
    scaling: 'scaling up',
    established: 'well-established',
  }

  const org = orgTypeLabels[demographics.orgType] || 'a cultural initiative'
  const industry = industryLabels[demographics.industry] || 'the cultural sector'
  const stage = stageLabels[demographics.businessStage] || 'at your current stage'

  return `Based on your profile as ${org} in ${industry}, ${stage}, here are personalized recommendations for strengthening your cultural innovation:`
}

/**
 * Get this week's action items from recommendations
 */
export function getThisWeekActions(
  recommendations: PersonalizedRecommendation[]
): Array<{ area: string; action: string }> {
  const actions: Array<{ area: string; action: string }> = []

  recommendations.forEach(rec => {
    rec.actionSteps
      .filter(step => step.timeframe === 'this-week')
      .forEach(step => {
        actions.push({
          area: rec.area,
          action: step.action,
        })
      })
  })

  return actions.slice(0, 5) // Limit to top 5 actions
}

/**
 * Get quick wins - high-impact, this-week actions from top recommendations
 */
export function getQuickWins(
  recommendations: PersonalizedRecommendation[]
): Array<{ area: string; action: string; impact: string }> {
  const quickWins: Array<{ area: string; action: string; impact: string }> = []

  // Get first action from each of the top 3 recommendations
  recommendations.slice(0, 3).forEach(rec => {
    const firstAction = rec.actionSteps.find(s => s.timeframe === 'this-week')
    if (firstAction) {
      quickWins.push({
        area: rec.area,
        action: firstAction.action,
        impact: rec.impact,
      })
    }
  })

  return quickWins
}

/**
 * Check if a user profile qualifies for specific industry-focused guidance
 */
export function hasIndustrySpecificGuidance(industry: Industry): boolean {
  // Industries with rich content library
  const supportedIndustries: Industry[] = [
    'crafts',
    'performing-arts',
    'food-beverage',
    'fashion-textiles',
    'heritage-tourism',
  ]
  return supportedIndustries.includes(industry)
}

/**
 * Get industry-specific tips based on user's sector
 */
export function getIndustryTips(industry: Industry): string[] {
  const tips: Partial<Record<Industry, string[]>> = {
    crafts: [
      'Document your techniques with video - customers love seeing the process',
      'Consider seasonal product lines to create buying urgency',
      'Build relationships with interior designers and galleries',
    ],
    'performing-arts': [
      'Develop hybrid in-person/digital performance offerings',
      'Create educational workshops as a revenue stream',
      'Build a patron/subscriber base for sustainable income',
    ],
    'visual-arts': [
      'Build a strong online portfolio with professional photography',
      'Consider limited editions and prints for broader market access',
      'Partner with cultural institutions for exhibitions',
    ],
    'food-beverage': [
      'Document traditional recipes with cultural context',
      'Consider packaged products for retail alongside food service',
      'Build food tourism experiences around your traditions',
    ],
    'fashion-textiles': [
      'Tell the story of your materials and techniques',
      'Consider both ready-to-wear and custom/bespoke offerings',
      'Build relationships with fashion media and influencers',
    ],
    'heritage-tourism': [
      'Develop experiences at multiple price points',
      'Partner with travel platforms while building direct booking',
      'Train community members as guides and storytellers',
    ],
    'digital-film-media': [
      'Build audience through consistent content creation',
      'Diversify across formats (print, digital, audio, video)',
      'Consider community-supported models for niche content',
    ],
    'ar-vr-xr': [
      'Start with low-cost 360° content before investing in full XR',
      'Partner with cultural institutions for immersive heritage experiences',
      'Document traditional spaces and practices for virtual preservation',
    ],
    'gaming-interactive': [
      'Collaborate with cultural elders to ensure authentic representation',
      'Consider educational gaming as a gateway to cultural engagement',
      'Build community-driven content that players help shape',
    ],
    mobility: [
      'Map cultural routes and heritage trails with digital guides',
      'Partner with tourism boards for cultural transport experiences',
      'Develop multi-modal cultural journey packages',
    ],
    'language-literature': [
      'Create digital language learning tools alongside traditional teaching',
      'Build an audience through serialized storytelling on social media',
      'Partner with schools and libraries for cultural literacy programs',
    ],
    'festivals-ceremonies': [
      'Develop hybrid in-person and virtual event experiences',
      'Build year-round engagement beyond the event dates',
      'Create tiered sponsorship and participation packages',
    ],
    'traditional-medicine': [
      'Ensure proper credentialing and cultural authorization',
      'Develop both in-person and remote service options',
      'Build trust through transparency about your training',
    ],
    design: [
      'Build a portfolio showcasing cultural design principles',
      'Develop both custom and productized service offerings',
      'Partner with cultural organizations for visibility',
    ],
    education: [
      'Develop curriculum that can scale across multiple formats',
      'Build credentialing or certification programs',
      'Partner with schools and cultural institutions',
    ],
    'community-development': [
      'Document outcomes and impact stories for funding applications',
      'Build coalitions with other community organizations',
      'Develop sustainable revenue models beyond grant dependency',
    ],
    agriculture: [
      'Tell the story of your traditional growing practices',
      'Consider CSA or subscription models for direct sales',
      'Partner with restaurants and specialty retailers',
    ],
    'multi-sector': [
      'Identify synergies between your different cultural activities',
      'Consider which sector should be your primary focus',
      'Build cross-promotional opportunities between sectors',
    ],
  }

  return tips[industry] || []
}

/**
 * Personalized Recommendation Content Library
 *
 * This file contains context-specific recommendation variants for each construct.
 * Recommendations are selected based on user demographics (org type, industry, business stage).
 *
 * Each construct has:
 * - A default recommendation (fallback)
 * - Context-specific variants for different user profiles
 */

import type {
  RecommendationVariant,
  ConstructId,
  OrganizationType,
  Industry,
  BusinessStage,
} from './types'

/**
 * Financial Reserves recommendations by context
 */
export const financialReservesRecommendations: RecommendationVariant[] = [
  // Solo artisans at startup
  {
    id: 'fin-solo-startup',
    context: {
      construct: 'financialReserves',
      orgTypes: ['individual'],
      businessStages: ['idea', 'startup'],
    },
    title: 'Build Your Craft Emergency Fund',
    description:
      'Start with a "craft emergency fund" - set aside 10% of each sale into a separate account until you reach 2 months of essential expenses.',
    actionSteps: [
      { action: 'Open a separate savings account labeled "Business Reserve"', timeframe: 'this-week' },
      { action: 'Calculate your monthly essential expenses (materials, tools, studio rent)', timeframe: 'this-week' },
      { action: 'Set up automatic transfer of 10% from each sale to your reserve', timeframe: 'this-week' },
      { action: 'Track progress toward 2-month reserve goal', timeframe: 'ongoing' },
    ],
    relatedCaseStudyIds: ['palestinian-tatreez', 'bangladeshi-nakshi-kantha'],
    impact: 'Provides crucial buffer against slow seasons and unexpected expenses',
    priority: 'critical',
  },
  // Cooperatives
  {
    id: 'fin-coop-growth',
    context: {
      construct: 'financialReserves',
      orgTypes: ['cooperative', 'craft-guild'],
      businessStages: ['growth', 'scaling', 'established'],
    },
    title: 'Establish Cooperative Reserve Fund',
    description:
      'Create a formal reserve fund policy with member buy-in. Aim for 3-6 months operating expenses with clear governance for accessing funds.',
    actionSteps: [
      { action: 'Propose reserve fund policy at next member meeting', timeframe: 'this-month' },
      { action: 'Set contribution rate (5-10% of revenues) and target amount', timeframe: 'this-month' },
      { action: 'Establish clear criteria for when reserves can be accessed', timeframe: 'this-month' },
      { action: 'Create separate interest-bearing account for reserves', timeframe: 'this-quarter' },
    ],
    relatedCaseStudyIds: ['moroccan-fes-pottery', 'vietnamese-craft-villages'],
    impact: 'Protects all members during market disruptions',
    priority: 'high',
  },
  // NGOs/Community organizations
  {
    id: 'fin-ngo',
    context: {
      construct: 'financialReserves',
      orgTypes: ['community-org'],
    },
    title: 'Diversify Funding & Build Reserves',
    description:
      'Reduce grant dependency by building unrestricted reserves. Aim for 6 months operating costs through diversified revenue streams.',
    actionSteps: [
      { action: 'Audit current funding sources and identify concentration risk', timeframe: 'this-week' },
      { action: 'Develop one earned revenue stream (workshops, products, services)', timeframe: 'this-quarter' },
      { action: 'Negotiate unrestricted funding in next grant applications', timeframe: 'ongoing' },
      { action: 'Set board policy for minimum reserve level', timeframe: 'this-month' },
    ],
    relatedCaseStudyIds: ['nunavut-indigenous-enterprises'],
    impact: 'Ensures program continuity regardless of grant cycles',
    priority: 'high',
  },
  // For-profit businesses at scale
  {
    id: 'fin-business-scale',
    context: {
      construct: 'financialReserves',
      orgTypes: ['for-profit'],
      businessStages: ['scaling', 'established'],
    },
    title: 'Strategic Cash Reserve Management',
    description:
      'Maintain 6-month operating reserve plus additional strategic investment fund. Consider tiered reserves for different scenarios.',
    actionSteps: [
      { action: 'Review current cash position and burn rate', timeframe: 'this-week' },
      { action: 'Set up tiered reserve structure (emergency, opportunity, growth)', timeframe: 'this-month' },
      { action: 'Establish credit line for additional flexibility', timeframe: 'this-quarter' },
      { action: 'Create quarterly reserve review process', timeframe: 'ongoing' },
    ],
    relatedCaseStudyIds: ['jamaican-cultural-industries'],
    impact: 'Enables opportunistic growth while protecting against downturns',
    priority: 'medium',
  },
  // Default fallback
  {
    id: 'fin-default',
    context: {
      construct: 'financialReserves',
    },
    title: 'Build Operating Reserves',
    description:
      'Build financial reserves of 3-6 months operating expenses to weather disruptions and seize opportunities.',
    actionSteps: [
      { action: 'Calculate your monthly operating expenses', timeframe: 'this-week' },
      { action: 'Open a separate reserve account', timeframe: 'this-week' },
      { action: 'Set up regular contributions (5-10% of revenue)', timeframe: 'this-month' },
      { action: 'Set milestone targets and celebrate progress', timeframe: 'ongoing' },
    ],
    impact: 'Critical buffer against disruptions',
    priority: 'critical',
  },
]

/**
 * Traditional Knowledge Documentation recommendations
 */
export const traditionalKnowledgeRecommendations: RecommendationVariant[] = [
  // Solo/individual practitioners
  {
    id: 'tk-solo',
    context: {
      construct: 'traditionalKnowledge',
      orgTypes: ['individual'],
    },
    title: 'Document Your Craft Journey',
    description:
      'Create a personal knowledge archive combining your techniques with stories from mentors and elders who taught you.',
    actionSteps: [
      { action: 'Start a craft journal documenting techniques you use daily', timeframe: 'this-week' },
      { action: 'Record video of yourself demonstrating key techniques', timeframe: 'this-month' },
      { action: 'Interview one elder or mentor about traditional methods', timeframe: 'this-month' },
      { action: 'Organize files with clear naming and backup system', timeframe: 'this-quarter' },
    ],
    relatedCaseStudyIds: ['palestinian-tatreez', 'korean-hanji'],
    impact: 'Preserves your unique knowledge for future generations',
    priority: 'high',
  },
  // Cooperatives and guilds
  {
    id: 'tk-coop',
    context: {
      construct: 'traditionalKnowledge',
      orgTypes: ['cooperative', 'craft-guild', 'community-org'],
    },
    title: 'Community Knowledge Archive',
    description:
      'Establish a systematic community documentation program with elder involvement and clear protocols for sensitive knowledge.',
    actionSteps: [
      { action: 'Form documentation committee with elder representation', timeframe: 'this-month' },
      { action: 'Create protocol for sensitive vs. shareable knowledge', timeframe: 'this-month' },
      { action: 'Train 2-3 community members in documentation methods', timeframe: 'this-quarter' },
      { action: 'Launch monthly "knowledge keeper" recording sessions', timeframe: 'this-quarter' },
    ],
    relatedCaseStudyIds: ['vietnamese-craft-villages', 'nunavut-indigenous-enterprises'],
    impact: 'Ensures authentic practices survive even as elders age',
    priority: 'critical',
  },
  // Indigenous enterprises
  {
    id: 'tk-indigenous',
    context: {
      construct: 'traditionalKnowledge',
      orgTypes: ['indigenous-enterprise'],
    },
    title: 'Culturally-Safe Knowledge Documentation',
    description:
      'Develop documentation that respects Indigenous protocols, with clear community ownership and control over access.',
    actionSteps: [
      { action: 'Consult elders on appropriate documentation protocols', timeframe: 'this-week' },
      { action: 'Establish knowledge governance framework', timeframe: 'this-month' },
      { action: 'Choose secure storage with community-controlled access', timeframe: 'this-month' },
      { action: 'Begin priority documentation with proper permissions', timeframe: 'this-quarter' },
    ],
    relatedCaseStudyIds: ['nunavut-indigenous-enterprises', 'mikmaq-clearwater'],
    impact: 'Protects sacred knowledge while preserving practical techniques',
    priority: 'critical',
  },
  // Cultural institutions
  {
    id: 'tk-institution',
    context: {
      construct: 'traditionalKnowledge',
      orgTypes: ['cultural-institution'],
    },
    title: 'Professional Heritage Documentation',
    description:
      'Implement museum-standard documentation practices while maintaining relationships with source communities.',
    actionSteps: [
      { action: 'Audit existing collection for documentation gaps', timeframe: 'this-month' },
      { action: 'Develop community partnership agreements for new documentation', timeframe: 'this-quarter' },
      { action: 'Train staff in ethical documentation practices', timeframe: 'this-quarter' },
      { action: 'Create digital archive with appropriate access controls', timeframe: 'ongoing' },
    ],
    relatedCaseStudyIds: ['korean-hanji'],
    impact: 'Creates authoritative record while respecting cultural protocols',
    priority: 'high',
  },
  // Default
  {
    id: 'tk-default',
    context: {
      construct: 'traditionalKnowledge',
    },
    title: 'Document Traditional Knowledge',
    description:
      'Create systematic documentation of traditional practices, techniques, and stories with community elders.',
    actionSteps: [
      { action: 'Identify priority knowledge to document first', timeframe: 'this-week' },
      { action: 'Choose documentation format (video, written, audio)', timeframe: 'this-week' },
      { action: 'Schedule first documentation session', timeframe: 'this-month' },
      { action: 'Create secure backup and storage system', timeframe: 'this-month' },
    ],
    impact: 'Foundation for authentic cultural innovation',
    priority: 'high',
  },
]

/**
 * Adaptive Response recommendations
 */
export const adaptiveResponseRecommendations: RecommendationVariant[] = [
  // Startups
  {
    id: 'adapt-startup',
    context: {
      construct: 'adaptiveResponse',
      businessStages: ['idea', 'startup'],
    },
    title: 'Build Agility Into Your Foundation',
    description:
      'Startups have a natural advantage in adaptability. Formalize it with simple systems that help you pivot quickly while staying true to your cultural mission.',
    actionSteps: [
      { action: 'Create a one-page "pivot protocol" for responding to changes', timeframe: 'this-week' },
      { action: 'Set up monthly check-in to assess what\'s working', timeframe: 'this-week' },
      { action: 'Identify 2-3 alternative revenue streams you could activate', timeframe: 'this-month' },
      { action: 'Build relationships with 3 potential partners before you need them', timeframe: 'this-quarter' },
    ],
    relatedCaseStudyIds: ['palestinian-tatreez'],
    impact: 'Highest discriminatory power - increases success rate by 64.7%',
    priority: 'critical',
  },
  // Established organizations
  {
    id: 'adapt-established',
    context: {
      construct: 'adaptiveResponse',
      businessStages: ['scaling', 'established'],
    },
    title: 'Institutionalize Adaptive Capacity',
    description:
      'Transform your organization\'s hard-won experience into repeatable systems that help you respond faster to future disruptions.',
    actionSteps: [
      { action: 'Document how you responded to past crises', timeframe: 'this-month' },
      { action: 'Create crisis response playbook with clear roles', timeframe: 'this-quarter' },
      { action: 'Run annual "disruption drill" scenario planning', timeframe: 'this-quarter' },
      { action: 'Build cross-training so multiple people can fill key roles', timeframe: 'ongoing' },
    ],
    relatedCaseStudyIds: ['vietnamese-craft-villages', 'nunavut-indigenous-enterprises'],
    impact: 'Ensures organizational stability as you scale',
    priority: 'high',
  },
  // Cooperatives
  {
    id: 'adapt-coop',
    context: {
      construct: 'adaptiveResponse',
      orgTypes: ['cooperative', 'craft-guild'],
    },
    title: 'Collective Adaptive Capacity',
    description:
      'Leverage your collective strength by creating shared response systems that help all members weather disruptions together.',
    actionSteps: [
      { action: 'Create member communication tree for rapid information sharing', timeframe: 'this-week' },
      { action: 'Establish mutual aid protocols between members', timeframe: 'this-month' },
      { action: 'Pool resources for shared equipment or facilities', timeframe: 'this-quarter' },
      { action: 'Develop group purchasing and selling agreements', timeframe: 'this-quarter' },
    ],
    relatedCaseStudyIds: ['moroccan-fes-pottery', 'bangladeshi-nakshi-kantha'],
    impact: 'Multiplies individual strength through collective action',
    priority: 'high',
  },
  // Default
  {
    id: 'adapt-default',
    context: {
      construct: 'adaptiveResponse',
    },
    title: 'Develop Systematic Adaptive Capacity',
    description:
      'Build learning and response mechanisms that help you adjust to disruptions while maintaining cultural values.',
    actionSteps: [
      { action: 'Reflect on past disruptions and what worked', timeframe: 'this-week' },
      { action: 'Create simple decision framework for responding to change', timeframe: 'this-month' },
      { action: 'Identify early warning signs to monitor', timeframe: 'this-month' },
      { action: 'Build relationships with others who can help in crisis', timeframe: 'ongoing' },
    ],
    impact: 'Highest discriminatory power for long-term success (+64.7%)',
    priority: 'critical',
  },
]

/**
 * Community Involvement recommendations
 */
export const communityInvolvementRecommendations: RecommendationVariant[] = [
  // Individual practitioners
  {
    id: 'comm-individual',
    context: {
      construct: 'communityInvolvement',
      orgTypes: ['individual'],
    },
    title: 'Build Your Community Advisory Circle',
    description:
      'Even as a solo practitioner, you can create a small advisory circle of community members who guide your cultural decisions.',
    actionSteps: [
      { action: 'Identify 3-5 community members whose opinion you value', timeframe: 'this-week' },
      { action: 'Invite them to an informal advisory lunch or call', timeframe: 'this-month' },
      { action: 'Share your current work and ask for honest feedback', timeframe: 'this-month' },
      { action: 'Schedule quarterly check-ins to maintain relationships', timeframe: 'ongoing' },
    ],
    relatedCaseStudyIds: ['palestinian-tatreez'],
    impact: 'Ensures your work stays connected to community values',
    priority: 'high',
  },
  // Organizations not yet involving community
  {
    id: 'comm-org-new',
    context: {
      construct: 'communityInvolvement',
      orgTypes: ['for-profit', 'cultural-institution'],
    },
    title: 'Establish Community Advisory Board',
    description:
      'Create formal mechanisms for community input into your cultural work, moving beyond consultation to true co-creation.',
    actionSteps: [
      { action: 'Map stakeholder communities and their interests', timeframe: 'this-week' },
      { action: 'Identify potential advisory board members from key communities', timeframe: 'this-month' },
      { action: 'Draft advisory board charter with clear decision rights', timeframe: 'this-month' },
      { action: 'Launch board with clear expectations and compensation', timeframe: 'this-quarter' },
    ],
    relatedCaseStudyIds: ['nunavut-indigenous-enterprises', 'mikmaq-clearwater'],
    impact: 'Key predictor of long-term success (+23.9%)',
    priority: 'high',
  },
  // Cooperatives strengthening involvement
  {
    id: 'comm-coop-deepen',
    context: {
      construct: 'communityInvolvement',
      orgTypes: ['cooperative', 'community-org', 'indigenous-enterprise'],
    },
    title: 'Deepen Community Decision-Making',
    description:
      'Move beyond basic consultation to meaningful shared decision-making where community voices shape strategic direction.',
    actionSteps: [
      { action: 'Audit current community involvement mechanisms', timeframe: 'this-week' },
      { action: 'Identify decisions that should involve more community input', timeframe: 'this-month' },
      { action: 'Create accessible participation options (meetings, online, written)', timeframe: 'this-month' },
      { action: 'Report back on how community input influenced decisions', timeframe: 'ongoing' },
    ],
    relatedCaseStudyIds: ['vietnamese-craft-villages', 'moroccan-fes-pottery'],
    impact: 'Strengthens legitimacy and long-term sustainability',
    priority: 'medium',
  },
  // Default
  {
    id: 'comm-default',
    context: {
      construct: 'communityInvolvement',
    },
    title: 'Establish Community Advisory Processes',
    description:
      'Create mechanisms for cultural practitioners from source communities to be involved in development decisions.',
    actionSteps: [
      { action: 'Identify key community stakeholders', timeframe: 'this-week' },
      { action: 'Reach out to potential advisors', timeframe: 'this-month' },
      { action: 'Create regular consultation schedule', timeframe: 'this-month' },
      { action: 'Document and act on community feedback', timeframe: 'ongoing' },
    ],
    impact: 'Key predictor of long-term success (+23.9 pp)',
    priority: 'high',
  },
]

/**
 * Cultural Authenticity recommendations
 */
export const culturalAuthenticityRecommendations: RecommendationVariant[] = [
  // For-profit needing authenticity validation
  {
    id: 'auth-forprofit',
    context: {
      construct: 'culturalAuthenticity',
      orgTypes: ['for-profit'],
    },
    title: 'Earn Community Validation',
    description:
      'Build genuine relationships with source communities and create formal processes for cultural validation of your products.',
    actionSteps: [
      { action: 'Identify the source communities for your cultural elements', timeframe: 'this-week' },
      { action: 'Reach out to community leaders to discuss partnership', timeframe: 'this-month' },
      { action: 'Create product review process involving community members', timeframe: 'this-quarter' },
      { action: 'Develop benefit-sharing arrangement with source community', timeframe: 'this-quarter' },
    ],
    relatedCaseStudyIds: ['palestinian-tatreez', 'bangladeshi-nakshi-kantha'],
    impact: 'Critical for market differentiation and avoiding appropriation claims',
    priority: 'critical',
  },
  // Community-based organizations
  {
    id: 'auth-community',
    context: {
      construct: 'culturalAuthenticity',
      orgTypes: ['cooperative', 'community-org', 'indigenous-enterprise', 'craft-guild'],
    },
    title: 'Formalize Cultural Protocols',
    description:
      'Document and institutionalize your existing cultural practices to ensure authenticity is maintained as you grow.',
    actionSteps: [
      { action: 'Work with elders to document cultural protocols', timeframe: 'this-month' },
      { action: 'Create written guidelines for cultural elements in products', timeframe: 'this-month' },
      { action: 'Train all team members on cultural protocols', timeframe: 'this-quarter' },
      { action: 'Establish review process for new product lines', timeframe: 'this-quarter' },
    ],
    relatedCaseStudyIds: ['vietnamese-craft-villages', 'nunavut-indigenous-enterprises'],
    impact: 'Protects authenticity as you scale',
    priority: 'high',
  },
  // Default
  {
    id: 'auth-default',
    context: {
      construct: 'culturalAuthenticity',
    },
    title: 'Ensure Community Validation',
    description:
      'Establish processes to ensure your cultural practices have recognized authenticity within source communities.',
    actionSteps: [
      { action: 'Document the cultural origins of your practices', timeframe: 'this-week' },
      { action: 'Connect with cultural authorities in source community', timeframe: 'this-month' },
      { action: 'Create validation process for cultural elements', timeframe: 'this-quarter' },
      { action: 'Build ongoing relationship with cultural advisors', timeframe: 'ongoing' },
    ],
    impact: 'Critical for market differentiation and community trust',
    priority: 'high',
  },
]

/**
 * IP Protection recommendations
 */
export const ipProtectionRecommendations: RecommendationVariant[] = [
  // Individual artisans
  {
    id: 'ip-individual',
    context: {
      construct: 'ipProtection',
      orgTypes: ['individual'],
    },
    title: 'Protect Your Creative Work',
    description:
      'Start with basic protections for your designs and brand, even before you can afford comprehensive legal help.',
    actionSteps: [
      { action: 'Document all original designs with dates and photos', timeframe: 'this-week' },
      { action: 'Register your business name as a trademark (if unique)', timeframe: 'this-month' },
      { action: 'Add copyright notices to your website and products', timeframe: 'this-week' },
      { action: 'Consult with IP attorney when budget allows', timeframe: 'this-quarter' },
    ],
    relatedCaseStudyIds: ['palestinian-tatreez'],
    impact: 'Prevents others from copying your work without credit',
    priority: 'medium',
  },
  // Cooperatives/community
  {
    id: 'ip-community',
    context: {
      construct: 'ipProtection',
      orgTypes: ['cooperative', 'community-org', 'indigenous-enterprise', 'craft-guild'],
    },
    title: 'Collective IP Protection Strategy',
    description:
      'Develop community-wide IP protections including collective marks, geographical indications, and cultural protocols.',
    actionSteps: [
      { action: 'Research collective mark or GI certification options', timeframe: 'this-month' },
      { action: 'Document traditional designs with community ownership', timeframe: 'this-quarter' },
      { action: 'Create licensing framework for commercial use', timeframe: 'this-quarter' },
      { action: 'Establish monitoring for unauthorized use', timeframe: 'ongoing' },
    ],
    relatedCaseStudyIds: ['moroccan-fes-pottery', 'korean-hanji'],
    impact: 'Protects entire community from exploitation',
    priority: 'high',
  },
  // For-profit
  {
    id: 'ip-forprofit',
    context: {
      construct: 'ipProtection',
      orgTypes: ['for-profit'],
    },
    title: 'Comprehensive IP Portfolio',
    description:
      'Build a strategic IP portfolio that protects your business while respecting community rights to traditional knowledge.',
    actionSteps: [
      { action: 'Audit current IP assets and protection gaps', timeframe: 'this-month' },
      { action: 'Register trademarks in key markets', timeframe: 'this-quarter' },
      { action: 'Create clear agreements for any community-sourced elements', timeframe: 'this-quarter' },
      { action: 'Develop monitoring and enforcement plan', timeframe: 'ongoing' },
    ],
    relatedCaseStudyIds: ['jamaican-cultural-industries'],
    impact: 'Protects brand value and ensures fair compensation',
    priority: 'high',
  },
  // Default
  {
    id: 'ip-default',
    context: {
      construct: 'ipProtection',
    },
    title: 'Establish IP Protections',
    description:
      'Create legal protections for your cultural intellectual property including designs, techniques, and brand.',
    actionSteps: [
      { action: 'Document all original creative work with dates', timeframe: 'this-week' },
      { action: 'Research applicable IP protections (trademark, GI, copyright)', timeframe: 'this-month' },
      { action: 'Consult with IP professional', timeframe: 'this-quarter' },
      { action: 'Register priority protections', timeframe: 'this-quarter' },
    ],
    impact: 'Prevents exploitation and ensures fair compensation',
    priority: 'medium',
  },
]

/**
 * Community Decision Making recommendations
 */
export const communityDecisionMakingRecommendations: RecommendationVariant[] = [
  // For-profit transitioning
  {
    id: 'cdm-forprofit',
    context: {
      construct: 'communityDecisionMaking',
      orgTypes: ['for-profit'],
    },
    title: 'Share Decision Power with Community',
    description:
      'Create formal mechanisms for community input on key decisions, moving toward genuine shared governance.',
    actionSteps: [
      { action: 'Identify which decisions should involve community voice', timeframe: 'this-week' },
      { action: 'Create community advisory board with real decision rights', timeframe: 'this-quarter' },
      { action: 'Establish transparent decision-making processes', timeframe: 'this-quarter' },
      { action: 'Report back on how community input shaped decisions', timeframe: 'ongoing' },
    ],
    relatedCaseStudyIds: ['mikmaq-clearwater'],
    impact: 'Builds trust and long-term community support',
    priority: 'high',
  },
  // Cooperatives strengthening
  {
    id: 'cdm-coop',
    context: {
      construct: 'communityDecisionMaking',
      orgTypes: ['cooperative', 'craft-guild'],
    },
    title: 'Strengthen Democratic Governance',
    description:
      'Deepen member participation in governance to ensure all voices are heard in strategic decisions.',
    actionSteps: [
      { action: 'Review current governance structures for inclusivity', timeframe: 'this-month' },
      { action: 'Create multiple participation channels (meetings, online, written)', timeframe: 'this-month' },
      { action: 'Establish term limits and rotation for leadership', timeframe: 'this-quarter' },
      { action: 'Provide governance training for new members', timeframe: 'ongoing' },
    ],
    relatedCaseStudyIds: ['vietnamese-craft-villages', 'moroccan-fes-pottery'],
    impact: 'Strong predictor of sustainable outcomes (+33.7 pp)',
    priority: 'high',
  },
  // Indigenous enterprises
  {
    id: 'cdm-indigenous',
    context: {
      construct: 'communityDecisionMaking',
      orgTypes: ['indigenous-enterprise'],
    },
    title: 'Integrate Traditional Governance',
    description:
      'Align business governance with traditional decision-making structures and cultural protocols.',
    actionSteps: [
      { action: 'Map traditional governance structures and roles', timeframe: 'this-month' },
      { action: 'Integrate elder councils into business decisions', timeframe: 'this-quarter' },
      { action: 'Create protocols honoring traditional processes', timeframe: 'this-quarter' },
      { action: 'Balance traditional and business governance needs', timeframe: 'ongoing' },
    ],
    relatedCaseStudyIds: ['nunavut-indigenous-enterprises'],
    impact: 'Ensures cultural continuity in economic development',
    priority: 'critical',
  },
  // Default
  {
    id: 'cdm-default',
    context: {
      construct: 'communityDecisionMaking',
    },
    title: 'Enable Community Strategic Decisions',
    description:
      'Ensure community members control key strategic decisions through formal governance mechanisms.',
    actionSteps: [
      { action: 'Identify key decisions that should involve community', timeframe: 'this-week' },
      { action: 'Create decision-making forum (board, council, assembly)', timeframe: 'this-month' },
      { action: 'Establish clear decision rights and processes', timeframe: 'this-month' },
      { action: 'Document and communicate decisions transparently', timeframe: 'ongoing' },
    ],
    impact: 'Strong predictor of sustainable outcomes (+33.7 pp)',
    priority: 'high',
  },
]

/**
 * Product Development / Innovation Pipeline recommendations
 */
export const productDevelopmentRecommendations: RecommendationVariant[] = [
  // Solo artisans
  {
    id: 'pd-solo',
    context: {
      construct: 'productDevelopment',
      orgTypes: ['individual'],
    },
    title: 'Create Your Innovation Rhythm',
    description:
      'Establish a regular cycle of developing new pieces that balance tradition with fresh interpretation.',
    actionSteps: [
      { action: 'Set aside 4 hours weekly for experimentation', timeframe: 'this-week' },
      { action: 'Create "experiment journal" to track new ideas', timeframe: 'this-week' },
      { action: 'Test one new product variation each month', timeframe: 'ongoing' },
      { action: 'Get customer feedback before scaling production', timeframe: 'ongoing' },
    ],
    relatedCaseStudyIds: ['palestinian-tatreez', 'korean-hanji'],
    impact: 'Keeps your work fresh and marketable',
    priority: 'high',
  },
  // Cooperatives
  {
    id: 'pd-coop',
    context: {
      construct: 'productDevelopment',
      orgTypes: ['cooperative', 'craft-guild'],
    },
    title: 'Collective Innovation Process',
    description:
      'Create structured processes for developing new products that involve member input while maintaining quality.',
    actionSteps: [
      { action: 'Establish product development committee', timeframe: 'this-month' },
      { action: 'Create seasonal product development calendar', timeframe: 'this-month' },
      { action: 'Build prototype testing process with customer feedback', timeframe: 'this-quarter' },
      { action: 'Develop member training for new product lines', timeframe: 'ongoing' },
    ],
    relatedCaseStudyIds: ['moroccan-fes-pottery', 'bangladeshi-nakshi-kantha'],
    impact: 'Enables collective innovation while maintaining authenticity',
    priority: 'high',
  },
  // Established businesses
  {
    id: 'pd-established',
    context: {
      construct: 'productDevelopment',
      businessStages: ['scaling', 'established'],
    },
    title: 'Formalize Innovation Pipeline',
    description:
      'Create structured R&D processes that generate continuous innovation grounded in cultural authenticity.',
    actionSteps: [
      { action: 'Audit current product development process', timeframe: 'this-week' },
      { action: 'Create stage-gate process for new product development', timeframe: 'this-month' },
      { action: 'Allocate budget specifically for R&D (5-10% of revenue)', timeframe: 'this-quarter' },
      { action: 'Build partnerships with designers or researchers', timeframe: 'this-quarter' },
    ],
    relatedCaseStudyIds: ['korean-hanji', 'jamaican-cultural-industries'],
    impact: 'Drives economic value creation (+36.8 pp)',
    priority: 'high',
  },
  // Default
  {
    id: 'pd-default',
    context: {
      construct: 'productDevelopment',
    },
    title: 'Establish Regular Innovation Cycles',
    description:
      'Create regular cycles of culturally-grounded product development to maintain relevance and growth.',
    actionSteps: [
      { action: 'Assess current product portfolio and gaps', timeframe: 'this-week' },
      { action: 'Schedule regular innovation time', timeframe: 'this-week' },
      { action: 'Create customer feedback mechanism', timeframe: 'this-month' },
      { action: 'Launch one new product or variation quarterly', timeframe: 'ongoing' },
    ],
    impact: 'Drives economic value creation (+36.8 pp)',
    priority: 'high',
  },
]

/**
 * Intergenerational Planning recommendations
 */
export const intergenerationalPlanningRecommendations: RecommendationVariant[] = [
  // Solo practitioners
  {
    id: 'ig-solo',
    context: {
      construct: 'intergenerationalPlanning',
      orgTypes: ['individual'],
    },
    title: 'Find and Nurture Your Successor',
    description:
      'Even as a solo practitioner, start identifying and training the next generation to carry on your craft.',
    actionSteps: [
      { action: 'Identify 1-2 potential apprentices or mentees', timeframe: 'this-month' },
      { action: 'Create simple teaching curriculum for key skills', timeframe: 'this-quarter' },
      { action: 'Offer workshop or apprenticeship opportunity', timeframe: 'this-quarter' },
      { action: 'Document techniques in teachable format', timeframe: 'ongoing' },
    ],
    relatedCaseStudyIds: ['palestinian-tatreez', 'korean-hanji'],
    impact: 'Ensures your knowledge and business can continue',
    priority: 'high',
  },
  // Organizations
  {
    id: 'ig-org',
    context: {
      construct: 'intergenerationalPlanning',
      orgTypes: ['cooperative', 'community-org', 'craft-guild', 'cultural-institution'],
    },
    title: 'Youth Training & Succession Program',
    description:
      'Create formal programs to train young people and identify next-generation leaders.',
    actionSteps: [
      { action: 'Assess current age distribution and succession risks', timeframe: 'this-week' },
      { action: 'Create youth apprenticeship or internship program', timeframe: 'this-quarter' },
      { action: 'Identify and develop next-generation leaders', timeframe: 'this-quarter' },
      { action: 'Partner with schools or community youth programs', timeframe: 'ongoing' },
    ],
    relatedCaseStudyIds: ['vietnamese-craft-villages', 'nunavut-indigenous-enterprises'],
    impact: 'Critical for long-term cultural and business continuity',
    priority: 'critical',
  },
  // Indigenous enterprises
  {
    id: 'ig-indigenous',
    context: {
      construct: 'intergenerationalPlanning',
      orgTypes: ['indigenous-enterprise'],
    },
    title: 'Cultural Transmission Program',
    description:
      'Design programs that transmit both cultural knowledge and business skills to the next generation.',
    actionSteps: [
      { action: 'Partner with elders on youth cultural education', timeframe: 'this-month' },
      { action: 'Create mentorship pairing between elders and youth', timeframe: 'this-quarter' },
      { action: 'Develop youth leadership pathway within organization', timeframe: 'this-quarter' },
      { action: 'Integrate cultural learning with business training', timeframe: 'ongoing' },
    ],
    relatedCaseStudyIds: ['nunavut-indigenous-enterprises', 'mikmaq-clearwater'],
    impact: 'Ensures cultural and economic sovereignty for future generations',
    priority: 'critical',
  },
  // Default
  {
    id: 'ig-default',
    context: {
      construct: 'intergenerationalPlanning',
    },
    title: 'Develop Youth Training and Succession Plans',
    description:
      'Create programs to train young people and ensure viable plans for intergenerational continuity.',
    actionSteps: [
      { action: 'Assess current succession situation', timeframe: 'this-week' },
      { action: 'Identify potential successors or apprentices', timeframe: 'this-month' },
      { action: 'Create training program for key skills', timeframe: 'this-quarter' },
      { action: 'Document and transfer critical knowledge', timeframe: 'ongoing' },
    ],
    impact: 'Essential for long-term sustainability',
    priority: 'high',
  },
]

/**
 * Digital Distribution recommendations
 */
export const digitalDistributionRecommendations: RecommendationVariant[] = [
  // Pre-digital
  {
    id: 'dd-new',
    context: {
      construct: 'digitalDistribution',
      businessStages: ['idea', 'startup'],
    },
    title: 'Start Your Digital Presence',
    description:
      'Begin with simple, low-cost digital channels to reach customers beyond your local market.',
    actionSteps: [
      { action: 'Set up Instagram or Facebook business page', timeframe: 'this-week' },
      { action: 'Take quality photos of your products', timeframe: 'this-week' },
      { action: 'Post consistently (3x/week minimum)', timeframe: 'ongoing' },
      { action: 'Add simple e-commerce (Etsy, Instagram Shop)', timeframe: 'this-month' },
    ],
    relatedCaseStudyIds: ['bangladeshi-nakshi-kantha'],
    impact: 'Opens access to global markets at low cost',
    priority: 'high',
  },
  // Growing digital presence
  {
    id: 'dd-growth',
    context: {
      construct: 'digitalDistribution',
      businessStages: ['growth', 'scaling'],
    },
    title: 'Scale Your Digital Channels',
    description:
      'Expand from basic social media to integrated e-commerce and content marketing.',
    actionSteps: [
      { action: 'Audit current digital channel performance', timeframe: 'this-week' },
      { action: 'Create own website with e-commerce capability', timeframe: 'this-quarter' },
      { action: 'Develop email marketing for customer retention', timeframe: 'this-month' },
      { action: 'Create content strategy (storytelling, behind-the-scenes)', timeframe: 'ongoing' },
    ],
    relatedCaseStudyIds: ['korean-hanji', 'jamaican-cultural-industries'],
    impact: 'Reduces dependence on intermediaries and marketplaces',
    priority: 'medium',
  },
  // Cooperatives
  {
    id: 'dd-coop',
    context: {
      construct: 'digitalDistribution',
      orgTypes: ['cooperative', 'craft-guild'],
    },
    title: 'Collective Digital Platform',
    description:
      'Build shared digital infrastructure that benefits all members while maintaining individual identities.',
    actionSteps: [
      { action: 'Assess member digital capabilities and needs', timeframe: 'this-month' },
      { action: 'Create collective website showcasing all members', timeframe: 'this-quarter' },
      { action: 'Train members in digital marketing basics', timeframe: 'this-quarter' },
      { action: 'Pool resources for shared digital services', timeframe: 'ongoing' },
    ],
    relatedCaseStudyIds: ['moroccan-fes-pottery', 'bangladeshi-nakshi-kantha'],
    impact: 'Enables digital access for members who couldn\'t do it alone',
    priority: 'high',
  },
  // Default
  {
    id: 'dd-default',
    context: {
      construct: 'digitalDistribution',
    },
    title: 'Develop Digital Distribution Channels',
    description:
      'Use digital channels effectively to distribute cultural products to broader markets.',
    actionSteps: [
      { action: 'Choose primary digital platform for your audience', timeframe: 'this-week' },
      { action: 'Create compelling product photos and descriptions', timeframe: 'this-week' },
      { action: 'Set up e-commerce capability', timeframe: 'this-month' },
      { action: 'Build consistent content posting schedule', timeframe: 'ongoing' },
    ],
    impact: 'Expands market reach while telling your cultural story',
    priority: 'medium',
  },
]

/**
 * Practitioner Access recommendations
 */
export const practitionerAccessRecommendations: RecommendationVariant[] = [
  // Organizations needing practitioners
  {
    id: 'pa-seeking',
    context: {
      construct: 'practitionerAccess',
      orgTypes: ['for-profit', 'cultural-institution'],
    },
    title: 'Build Practitioner Relationships',
    description:
      'Develop genuine relationships with skilled traditional practitioners, not just transactional arrangements.',
    actionSteps: [
      { action: 'Map traditional practitioners in your field', timeframe: 'this-month' },
      { action: 'Visit practitioners to understand their work and values', timeframe: 'this-month' },
      { action: 'Create fair compensation and partnership frameworks', timeframe: 'this-quarter' },
      { action: 'Build long-term relationships, not just contracts', timeframe: 'ongoing' },
    ],
    relatedCaseStudyIds: ['korean-hanji', 'moroccan-fes-pottery'],
    impact: 'Essential for maintaining cultural integrity',
    priority: 'high',
  },
  // Community-based maintaining access
  {
    id: 'pa-community',
    context: {
      construct: 'practitionerAccess',
      orgTypes: ['cooperative', 'community-org', 'indigenous-enterprise', 'craft-guild'],
    },
    title: 'Support Master Practitioners',
    description:
      'Create systems to support, honor, and learn from your master practitioners while they can still teach.',
    actionSteps: [
      { action: 'Identify master practitioners and their unique skills', timeframe: 'this-week' },
      { action: 'Create knowledge documentation program', timeframe: 'this-month' },
      { action: 'Pair masters with apprentices for skill transfer', timeframe: 'this-quarter' },
      { action: 'Honor and compensate masters fairly', timeframe: 'ongoing' },
    ],
    relatedCaseStudyIds: ['vietnamese-craft-villages', 'palestinian-tatreez'],
    impact: 'Preserves irreplaceable traditional knowledge',
    priority: 'critical',
  },
  // Default
  {
    id: 'pa-default',
    context: {
      construct: 'practitionerAccess',
    },
    title: 'Develop Relationships with Traditional Practitioners',
    description:
      'Build genuine relationships with skilled practitioners of traditional techniques.',
    actionSteps: [
      { action: 'Identify key practitioners in your tradition', timeframe: 'this-week' },
      { action: 'Reach out respectfully to establish connection', timeframe: 'this-month' },
      { action: 'Create fair partnership or employment arrangements', timeframe: 'this-quarter' },
      { action: 'Maintain relationships through regular engagement', timeframe: 'ongoing' },
    ],
    impact: 'Essential for maintaining cultural integrity',
    priority: 'high',
  },
]

/**
 * Master map of all recommendation variants by construct
 */
export const RECOMMENDATION_LIBRARY: Record<ConstructId, RecommendationVariant[]> = {
  // Cultural Capital
  traditionalKnowledge: traditionalKnowledgeRecommendations,
  practitionerAccess: practitionerAccessRecommendations,
  culturalAuthenticity: culturalAuthenticityRecommendations,
  communityInvolvement: communityInvolvementRecommendations,
  culturalPreservation: [
    {
      id: 'culpres-default',
      context: { construct: 'culturalPreservation' },
      title: 'Protect Cultural Practices for the Future',
      description:
        'Systematically identify and safeguard at-risk cultural practices before knowledge is lost, ensuring traditions survive and thrive for future generations.',
      actionSteps: [
        { action: 'Identify and prioritize 3-5 at-risk cultural practices or knowledge areas', timeframe: 'this-week' },
        { action: 'Create a preservation protocol (recording, documentation, archiving standards)', timeframe: 'this-month' },
        { action: 'Establish a community archive — digital or physical — for storing preserved materials', timeframe: 'this-quarter' },
        { action: 'Schedule regular review sessions with knowledge holders to update and expand the archive', timeframe: 'ongoing' },
      ],
      impact: 'Prevents irreversible loss of cultural knowledge and creates a foundation for authentic innovation',
      priority: 'critical',
    },
  ],
  practitionerRelationships: practitionerAccessRecommendations, // Shares with practitioner access
  culturalMembership: [
    {
      id: 'culmem-default',
      context: { construct: 'culturalMembership' },
      title: 'Strengthen Community Cultural Connections',
      description:
        'Deepen engagement between your cultural enterprise and community members so that cultural participation grows and sustains your mission.',
      actionSteps: [
        { action: 'Attend or host at least one cultural gathering or community event this month', timeframe: 'this-month' },
        { action: 'Create a membership or participation program that welcomes new community members', timeframe: 'this-quarter' },
        { action: 'Track engagement metrics (attendance, participation, repeat involvement)', timeframe: 'ongoing' },
        { action: 'Gather feedback from participants to improve cultural programming', timeframe: 'ongoing' },
      ],
      impact: 'Stronger cultural connections increase community support and long-term enterprise sustainability',
      priority: 'high',
    },
  ],
  culturalMeaning: [
    {
      id: 'culmean-default',
      context: { construct: 'culturalMeaning' },
      title: 'Ensure Cultural Meaning Carries Through to Market',
      description:
        'Bridge the gap between deep cultural significance and commercial presentation so customers understand and value the authentic meaning behind your products.',
      actionSteps: [
        { action: 'Audit your product descriptions and marketing for cultural accuracy and depth', timeframe: 'this-week' },
        { action: 'Add origin stories and cultural meaning labels to your key products', timeframe: 'this-month' },
        { action: 'Train sales staff or partners on the cultural context behind each offering', timeframe: 'this-quarter' },
        { action: 'Collect customer feedback on whether cultural meaning resonates in their experience', timeframe: 'ongoing' },
      ],
      impact: 'Products that communicate authentic cultural meaning command higher prices and build deeper customer loyalty',
      priority: 'high',
    },
  ],

  // Innovation Activities
  productDevelopment: productDevelopmentRecommendations,
  techniqueCombination: [
    {
      id: 'techcomb-default',
      context: { construct: 'techniqueCombination' },
      title: 'Blend Traditional and Modern Techniques',
      description:
        'Find the intersection of time-tested traditional methods and contemporary tools to create products that honor heritage while meeting modern market expectations.',
      actionSteps: [
        { action: 'Identify one traditional technique that could be enhanced with a modern method or tool', timeframe: 'this-week' },
        { action: 'Prototype a hybrid product combining both approaches', timeframe: 'this-month' },
        { action: 'Test the hybrid product with customers and gather feedback on quality and appeal', timeframe: 'this-quarter' },
        { action: 'Document successful combinations as repeatable processes for your team', timeframe: 'ongoing' },
      ],
      impact: 'Hybrid techniques can reduce production costs while maintaining cultural authenticity and opening new markets',
      priority: 'medium',
    },
  ],
  innovationLeadership: [
    {
      id: 'innlead-default',
      context: { construct: 'innovationLeadership' },
      title: 'Lead Innovation Within Your Cultural Enterprise',
      description:
        'Create a culture of experimentation and creative problem-solving that drives continuous improvement without compromising cultural values.',
      actionSteps: [
        { action: 'Dedicate regular time (e.g., 2 hours/week) for experimentation and creative exploration', timeframe: 'this-week' },
        { action: 'Establish an innovation review process — monthly meetings to evaluate new ideas', timeframe: 'this-month' },
        { action: 'Celebrate and share successful innovations with your team and community', timeframe: 'this-quarter' },
        { action: 'Track the pipeline of ideas from concept to implementation', timeframe: 'ongoing' },
      ],
      impact: 'Organizations with structured innovation leadership are more resilient and adapt faster to market changes',
      priority: 'high',
    },
  ],
  marketExpansion: [
    {
      id: 'mktexp-default',
      context: { construct: 'marketExpansion' },
      title: 'Reach New Audiences for Your Cultural Products',
      description:
        'Identify and connect with untapped customer segments that value cultural authenticity, expanding your reach without diluting your offering.',
      actionSteps: [
        { action: 'Research one untapped market segment (e.g., diaspora communities, ethical consumers, tourism)', timeframe: 'this-week' },
        { action: 'Create marketing materials tailored to that segment\'s values and language', timeframe: 'this-month' },
        { action: 'Test with a small campaign (social media, pop-up, or partnership) and measure response', timeframe: 'this-quarter' },
        { action: 'Refine your approach based on results and scale what works', timeframe: 'ongoing' },
      ],
      impact: 'New market segments reduce revenue concentration risk and increase cultural visibility',
      priority: 'medium',
    },
  ],
  digitalDistribution: digitalDistributionRecommendations,
  efficiencyImprovement: [
    {
      id: 'effimp-default',
      context: { construct: 'efficiencyImprovement' },
      title: 'Streamline Operations Without Losing Cultural Quality',
      description:
        'Optimize your production and operational workflows to reduce waste and cost while maintaining the cultural integrity that makes your products special.',
      actionSteps: [
        { action: 'Map your current production workflow from start to finish', timeframe: 'this-week' },
        { action: 'Identify one bottleneck or inefficiency to optimize (without compromising quality)', timeframe: 'this-month' },
        { action: 'Implement the improvement and measure time and cost savings', timeframe: 'this-quarter' },
        { action: 'Review workflows quarterly to find further optimization opportunities', timeframe: 'ongoing' },
      ],
      impact: 'Operational efficiency frees resources for innovation and cultural investment',
      priority: 'medium',
    },
  ],
  externalCollaboration: [
    {
      id: 'extcol-default',
      context: { construct: 'externalCollaboration' },
      title: 'Build Partnerships Beyond Your Organization',
      description:
        'Develop strategic partnerships with organizations outside your immediate network to access new skills, markets, and resources.',
      actionSteps: [
        { action: 'List 5 potential partners (universities, NGOs, businesses, cultural orgs) with complementary strengths', timeframe: 'this-week' },
        { action: 'Reach out to at least 2 potential partners this month to explore shared interests', timeframe: 'this-month' },
        { action: 'Structure one pilot collaboration with clear goals, roles, and timelines', timeframe: 'this-quarter' },
        { action: 'Evaluate partnerships regularly and expand successful ones', timeframe: 'ongoing' },
      ],
      impact: 'External collaborations bring fresh perspectives, resources, and market access that strengthen your enterprise',
      priority: 'medium',
    },
  ],
  feedbackIteration: [
    {
      id: 'fdbkit-default',
      context: { construct: 'feedbackIteration' },
      title: 'Use Customer Feedback to Improve Your Offerings',
      description:
        'Build a simple, consistent feedback loop that captures customer and community input and turns it into actionable improvements.',
      actionSteps: [
        { action: 'Set up a simple feedback collection method (survey, comment card, or follow-up email)', timeframe: 'this-week' },
        { action: 'Review all collected feedback monthly and identify the top recurring theme', timeframe: 'this-month' },
        { action: 'Implement the single most impactful improvement suggested by feedback', timeframe: 'this-quarter' },
        { action: 'Close the loop — tell customers what you changed based on their input', timeframe: 'ongoing' },
      ],
      impact: 'Systematic feedback iteration reduces guesswork and ensures products evolve with customer needs',
      priority: 'high',
    },
  ],
  narrativeInnovation: [
    {
      id: 'narr-default',
      context: { construct: 'narrativeInnovation' },
      title: 'Develop Your Cultural Storytelling Strategy',
      description:
        'Build compelling narratives that communicate the cultural significance of your products to broader audiences, enabling premium positioning and new market access.',
      actionSteps: [
        { action: 'Document the origin story and cultural significance of your key products', timeframe: 'this-week' },
        { action: 'Create a brand storytelling guide with key cultural narratives', timeframe: 'this-month' },
        { action: 'Develop content (video, social media, packaging) that shares your cultural story', timeframe: 'this-quarter' },
        { action: 'Test storytelling approaches and measure audience engagement', timeframe: 'ongoing' },
      ],
      impact: 'Cultural narratives enable premium pricing, attract grant funding, and open new audience segments',
      priority: 'high',
    },
  ],

  // Organizational Capacities
  adaptiveResponse: adaptiveResponseRecommendations,
  learningFromSetbacks: adaptiveResponseRecommendations, // Related to adaptive
  skillDiversity: [
    {
      id: 'skldiv-default',
      context: { construct: 'skillDiversity' },
      title: 'Broaden the Skills Within Your Team',
      description:
        'Ensure your team has a diverse mix of traditional, creative, and business skills so you can adapt to new challenges and opportunities.',
      actionSteps: [
        { action: 'Audit current team skills against what your enterprise needs to grow', timeframe: 'this-week' },
        { action: 'Identify the single most critical skill gap holding you back', timeframe: 'this-month' },
        { action: 'Create a plan to close that gap — cross-training, mentorship, or targeted hiring', timeframe: 'this-quarter' },
        { action: 'Reassess skill needs annually as your enterprise evolves', timeframe: 'ongoing' },
      ],
      impact: 'Diverse skill sets enable faster adaptation and reduce dependency on any single person',
      priority: 'high',
    },
  ],
  externalResources: [
    {
      id: 'extres-default',
      context: { construct: 'externalResources' },
      title: 'Access Outside Funding and Support',
      description:
        'Proactively identify and pursue external funding, grants, and support programs that align with your cultural mission and growth goals.',
      actionSteps: [
        { action: 'Research 3 relevant grants, funds, or support programs for cultural enterprises', timeframe: 'this-week' },
        { action: 'Prepare and submit one grant application or program enrollment', timeframe: 'this-month' },
        { action: 'Build relationships with funders through updates, reports, and in-person meetings', timeframe: 'this-quarter' },
        { action: 'Maintain a calendar of funding deadlines and diversify funding sources', timeframe: 'ongoing' },
      ],
      impact: 'External resources provide growth capital and validation without compromising cultural control',
      priority: 'high',
    },
  ],
  ipProtection: ipProtectionRecommendations,
  financialReserves: financialReservesRecommendations,
  communityDecisionMaking: communityDecisionMakingRecommendations,
  benefitDistribution: [
    {
      id: 'bendist-default',
      context: { construct: 'benefitDistribution' },
      title: 'Ensure Fair Distribution of Benefits',
      description:
        'Map and adjust how revenue and other benefits flow through your enterprise to ensure community members — especially knowledge holders and artisans — are fairly compensated.',
      actionSteps: [
        { action: 'Map who currently benefits from your revenue (wages, profit-sharing, community reinvestment)', timeframe: 'this-week' },
        { action: 'Identify underserved community members or contributors who should benefit more', timeframe: 'this-month' },
        { action: 'Adjust your benefit-sharing model and communicate changes transparently', timeframe: 'this-quarter' },
        { action: 'Review distribution fairness annually with community input', timeframe: 'ongoing' },
      ],
      impact: 'Fair benefit distribution builds trust, reduces conflict, and strengthens community commitment',
      priority: 'high',
    },
  ],
  allianceNetworks: [
    {
      id: 'allnet-default',
      context: { construct: 'allianceNetworks' },
      title: 'Build a Network of Allied Organizations',
      description:
        'Develop a network of organizations that share your goals, creating mutual support structures that amplify impact and provide stability during difficult times.',
      actionSteps: [
        { action: 'Identify 5 organizations with shared cultural, social, or economic goals', timeframe: 'this-week' },
        { action: 'Attend one industry event, conference, or network gathering to build connections', timeframe: 'this-month' },
        { action: 'Propose one joint initiative (shared marketing, co-production, advocacy) with a potential ally', timeframe: 'this-quarter' },
        { action: 'Nurture alliance relationships through regular communication and mutual support', timeframe: 'ongoing' },
      ],
      impact: 'Alliance networks provide collective bargaining power, shared resources, and rapid support during crises',
      priority: 'medium',
    },
  ],

  // Economic Resilience
  revenueRetention: financialReservesRecommendations, // Related
  teamRetention: [
    {
      id: 'teamret-default',
      context: { construct: 'teamRetention' },
      title: 'Keep Your Key People Engaged and Growing',
      description:
        'Retain the skilled practitioners and team members who carry your cultural knowledge by investing in their growth, well-being, and sense of purpose.',
      actionSteps: [
        { action: 'Conduct stay interviews with your key team members to learn what keeps them (and what might drive them away)', timeframe: 'this-week' },
        { action: 'Address the top concern raised and communicate the changes you\'re making', timeframe: 'this-month' },
        { action: 'Create development pathways — apprenticeships, leadership roles, or skill-building opportunities', timeframe: 'this-quarter' },
        { action: 'Check in regularly and adjust retention strategies as needs evolve', timeframe: 'ongoing' },
      ],
      impact: 'Retaining key people preserves institutional knowledge and reduces costly turnover',
      priority: 'high',
    },
  ],
  recoverySpeed: adaptiveResponseRecommendations, // Related
  opportunityDiscovery: [
    {
      id: 'oppdis-default',
      context: { construct: 'opportunityDiscovery' },
      title: 'Turn Disruptions Into New Opportunities',
      description:
        'Develop the habit of finding silver linings in setbacks — every challenge contains insights that can lead to new products, markets, or processes.',
      actionSteps: [
        { action: 'After each challenge or setback, hold a brief "what did we learn?" session with your team', timeframe: 'this-week' },
        { action: 'Maintain an opportunity log where you record insights and potential pivots', timeframe: 'this-month' },
        { action: 'Act on at least one opportunity from your log this quarter', timeframe: 'this-quarter' },
        { action: 'Review your opportunity log quarterly and prioritize the most promising ideas', timeframe: 'ongoing' },
      ],
      impact: 'Organizations that find opportunities in disruptions recover faster and emerge stronger',
      priority: 'medium',
    },
  ],
  postShockStrength: adaptiveResponseRecommendations, // Related
  communitySpillover: [
    {
      id: 'comspill-default',
      context: { construct: 'communitySpillover' },
      title: 'Amplify Your Impact on the Wider Community',
      description:
        'Extend the positive effects of your cultural enterprise beyond direct participants by tracking and growing your indirect community benefits.',
      actionSteps: [
        { action: 'Track indirect community benefits (local spending, tourism, cultural pride, skill-building)', timeframe: 'this-week' },
        { action: 'Partner with at least one local business to create mutual economic benefit', timeframe: 'this-month' },
        { action: 'Share success stories publicly to inspire others and attract support', timeframe: 'this-quarter' },
        { action: 'Measure and report community impact annually to stakeholders and funders', timeframe: 'ongoing' },
      ],
      impact: 'Demonstrating community spillover effects strengthens funding applications and community support',
      priority: 'medium',
    },
  ],
  jobCreation: [
    {
      id: 'jobcre-default',
      context: { construct: 'jobCreation' },
      title: 'Create Sustainable Cultural Employment',
      description:
        'Turn your cultural enterprise into a source of meaningful, sustainable employment that keeps cultural skills alive while providing livelihoods.',
      actionSteps: [
        { action: 'Identify roles that could be filled by local community members', timeframe: 'this-week' },
        { action: 'Create one apprenticeship, internship, or part-time position focused on cultural skills', timeframe: 'this-month' },
        { action: 'Track jobs created and their impact on participants and the community', timeframe: 'this-quarter' },
        { action: 'Develop a hiring pipeline that prioritizes cultural knowledge holders and local talent', timeframe: 'ongoing' },
      ],
      impact: 'Cultural employment preserves traditions while providing economic stability for community members',
      priority: 'high',
    },
  ],
  intergenerationalPlanning: intergenerationalPlanningRecommendations,
  revenueDiversification: [
    {
      id: 'revdiv-default',
      context: { construct: 'revenueDiversification' },
      title: 'Diversify Your Cultural Revenue Streams',
      description:
        'Develop multiple independent revenue sources from your cultural assets to reduce dependency on any single income stream and build protection against market disruptions.',
      actionSteps: [
        { action: 'Map all your current revenue streams and identify concentration risks', timeframe: 'this-week' },
        { action: 'Identify 2-3 new revenue opportunities from existing cultural assets (e.g., workshops, licensing, digital content)', timeframe: 'this-month' },
        { action: 'Launch a pilot for your most promising new revenue stream', timeframe: 'this-quarter' },
        { action: 'Track and balance revenue across streams to maintain diversification', timeframe: 'ongoing' },
      ],
      impact: 'Multiple revenue streams reduce vulnerability to market shocks and seasonal fluctuations',
      priority: 'high',
    },
  ],
  culturalBrandPremium: [
    {
      id: 'brand-premium-default',
      context: { construct: 'culturalBrandPremium' },
      title: 'Build Your Cultural Authenticity Premium',
      description:
        'Leverage your cultural authenticity to create pricing power that protects against competitive pressure and economic downturns.',
      actionSteps: [
        { action: 'Identify what makes your cultural offering uniquely authentic and document it', timeframe: 'this-week' },
        { action: 'Develop authenticity markers (certifications, origin labels, maker stories) for your products', timeframe: 'this-month' },
        { action: 'Test premium pricing on products with strongest cultural authenticity positioning', timeframe: 'this-quarter' },
        { action: 'Build customer education around why cultural authenticity commands higher value', timeframe: 'ongoing' },
      ],
      impact: 'Cultural brand premium provides a buffer against price competition and economic shocks',
      priority: 'high',
    },
  ],
}

/**
 * Get default recommendation for a construct (fallback when no context match)
 */
export function getDefaultRecommendation(construct: ConstructId): RecommendationVariant | null {
  const variants = RECOMMENDATION_LIBRARY[construct]
  if (!variants || variants.length === 0) return null

  // Return the variant with the broadest context (or last one which is typically the default)
  return variants[variants.length - 1]
}

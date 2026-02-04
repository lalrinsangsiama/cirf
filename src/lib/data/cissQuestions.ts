// CISS - Cultural Innovation Sustainability Scorecard
// 18 questions across 4 sections: Economic, Cultural, Social, Environmental Sustainability

export type CISSSection =
  | 'economicSustainability'
  | 'culturalSustainability'
  | 'socialSustainability'
  | 'environmentalSustainability'

export interface CISSLikertQuestion {
  id: string
  section: CISSSection
  construct: string
  question: string
  helpText?: string
  weight: number
  reverse?: boolean
}

export const CISS_SECTION_META: Record<CISSSection, {
  label: string
  shortLabel: string
  description: string
  estimatedMinutes: number
}> = {
  economicSustainability: {
    label: 'Economic Sustainability',
    shortLabel: 'Economic',
    description: 'Assess long-term financial viability and stability',
    estimatedMinutes: 2,
  },
  culturalSustainability: {
    label: 'Cultural Sustainability',
    shortLabel: 'Cultural',
    description: 'Evaluate cultural preservation and continuity',
    estimatedMinutes: 2,
  },
  socialSustainability: {
    label: 'Social Sustainability',
    shortLabel: 'Social',
    description: 'Measure community and social system health',
    estimatedMinutes: 2,
  },
  environmentalSustainability: {
    label: 'Environmental Sustainability',
    shortLabel: 'Environment',
    description: 'Assess ecological impact and resource management',
    estimatedMinutes: 1,
  },
}

// Economic Sustainability questions (5 questions)
export const economicSustainabilityQuestions: CISSLikertQuestion[] = [
  {
    id: 'ciss-es-1',
    section: 'economicSustainability',
    construct: 'financialViability',
    question: 'Our business model generates sufficient revenue to cover all costs',
    helpText: 'Consider whether you can sustain operations without external funding',
    weight: 1.5,
  },
  {
    id: 'ciss-es-2',
    section: 'economicSustainability',
    construct: 'diversification',
    question: 'We have diversified revenue streams that reduce dependency risk',
    helpText: 'Think about multiple products, markets, or income sources',
    weight: 1.3,
  },
  {
    id: 'ciss-es-3',
    section: 'economicSustainability',
    construct: 'pricingPower',
    question: 'We can maintain or increase prices over time without losing customers',
    helpText: 'Consider your pricing flexibility and customer loyalty',
    weight: 1.2,
  },
  {
    id: 'ciss-es-4',
    section: 'economicSustainability',
    construct: 'investmentCapacity',
    question: 'We can invest in growth and improvement from our own earnings',
    helpText: 'Think about capacity for R&D, equipment, or expansion',
    weight: 1.3,
  },
  {
    id: 'ciss-es-5',
    section: 'economicSustainability',
    construct: 'economicResilience',
    question: 'We could survive a significant economic downturn or market disruption',
    helpText: 'Consider reserves, adaptability, and essential demand',
    weight: 1.4,
  },
]

// Cultural Sustainability questions (5 questions)
export const culturalSustainabilityQuestions: CISSLikertQuestion[] = [
  {
    id: 'ciss-cs-1',
    section: 'culturalSustainability',
    construct: 'knowledgeTransmission',
    question: 'Traditional knowledge is being actively passed to younger generations',
    helpText: 'Consider apprenticeships, training programs, or educational initiatives',
    weight: 1.5,
  },
  {
    id: 'ciss-cs-2',
    section: 'culturalSustainability',
    construct: 'practitionerPipeline',
    question: 'We have a pipeline of new practitioners to replace retiring masters',
    helpText: 'Think about succession planning and talent development',
    weight: 1.4,
  },
  {
    id: 'ciss-cs-3',
    section: 'culturalSustainability',
    construct: 'authenticityMaintenance',
    question: 'We maintain cultural authenticity even as we scale or commercialize',
    helpText: 'Consider whether growth has compromised cultural integrity',
    weight: 1.5,
  },
  {
    id: 'ciss-cs-4',
    section: 'culturalSustainability',
    construct: 'documentationPractice',
    question: 'We systematically document techniques and knowledge for preservation',
    helpText: 'Think about written, video, or digital documentation practices',
    weight: 1.2,
  },
  {
    id: 'ciss-cs-5',
    section: 'culturalSustainability',
    construct: 'communityRelevance',
    question: 'Our cultural practices remain relevant and valued by the community',
    helpText: 'Consider whether community members actively engage with traditions',
    weight: 1.3,
  },
]

// Social Sustainability questions (4 questions)
export const socialSustainabilityQuestions: CISSLikertQuestion[] = [
  {
    id: 'ciss-ss-1',
    section: 'socialSustainability',
    construct: 'communityHealth',
    question: 'Our activities contribute to overall community well-being',
    helpText: 'Consider health, education, social cohesion impacts',
    weight: 1.4,
  },
  {
    id: 'ciss-ss-2',
    section: 'socialSustainability',
    construct: 'equitableDistribution',
    question: 'Benefits from our work are distributed equitably across the community',
    helpText: 'Think about who benefits and whether distribution is fair',
    weight: 1.5,
  },
  {
    id: 'ciss-ss-3',
    section: 'socialSustainability',
    construct: 'socialCohesion',
    question: 'Our work strengthens social bonds and community relationships',
    helpText: 'Consider how activities bring people together',
    weight: 1.2,
  },
  {
    id: 'ciss-ss-4',
    section: 'socialSustainability',
    construct: 'youthEngagement',
    question: 'Young people are actively engaged in and excited about our cultural work',
    helpText: 'Think about youth participation and interest levels',
    weight: 1.4,
  },
]

// Environmental Sustainability questions (4 questions)
export const environmentalSustainabilityQuestions: CISSLikertQuestion[] = [
  {
    id: 'ciss-env-1',
    section: 'environmentalSustainability',
    construct: 'resourceStewardship',
    question: 'We manage natural resources in ways that ensure long-term availability',
    helpText: 'Consider sustainable harvesting, regenerative practices',
    weight: 1.5,
  },
  {
    id: 'ciss-env-2',
    section: 'environmentalSustainability',
    construct: 'ecologicalBalance',
    question: 'Our activities maintain or improve local ecological balance',
    helpText: 'Think about impact on ecosystems, soil, water, air',
    weight: 1.3,
  },
  {
    id: 'ciss-env-3',
    section: 'environmentalSustainability',
    construct: 'climateAdaptation',
    question: 'We have strategies to adapt to changing environmental conditions',
    helpText: 'Consider climate adaptation plans and resilience measures',
    weight: 1.2,
  },
  {
    id: 'ciss-env-4',
    section: 'environmentalSustainability',
    construct: 'traditionalEcology',
    question: 'We incorporate traditional ecological knowledge in our practices',
    helpText: 'Think about indigenous or traditional environmental wisdom',
    weight: 1.4,
  },
]

// Combined CISS questions
export const cissQuestions: CISSLikertQuestion[] = [
  ...economicSustainabilityQuestions,
  ...culturalSustainabilityQuestions,
  ...socialSustainabilityQuestions,
  ...environmentalSustainabilityQuestions,
]

// Helper to get questions by section
export const getCISSQuestionsBySection = (section: CISSSection): CISSLikertQuestion[] => {
  return cissQuestions.filter(q => q.section === section)
}

// Question config for scoring
export const cissQuestionConfig = {
  sectionQuestions: {
    economicSustainability: economicSustainabilityQuestions.map(q => q.id),
    culturalSustainability: culturalSustainabilityQuestions.map(q => q.id),
    socialSustainability: socialSustainabilityQuestions.map(q => q.id),
    environmentalSustainability: environmentalSustainabilityQuestions.map(q => q.id),
  } as Record<CISSSection, string[]>,
  questionConstructs: Object.fromEntries(
    cissQuestions.map(q => [q.id, q.construct])
  ) as Record<string, string>,
}

// Stats
export const CISS_STATS = {
  totalQuestions: 18,
  sections: 4,
  estimatedMinutes: 7,
}

// CISS specific scoring weights
export const CISS_SECTION_WEIGHTS: Record<CISSSection, number> = {
  economicSustainability: 0.25,
  culturalSustainability: 0.30, // Cultural slightly higher for cultural enterprise context
  socialSustainability: 0.25,
  environmentalSustainability: 0.20,
}

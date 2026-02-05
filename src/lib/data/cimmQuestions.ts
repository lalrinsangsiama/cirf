// CIMM - Cultural Innovation Measurement Matrix
// 20 questions across 4 sections: Innovation Depth, Cultural Integrity, Economic Impact, Innovation Velocity

export type CIMMSection =
  | 'innovationDepth'
  | 'culturalIntegrity'
  | 'economicImpact'
  | 'innovationVelocity'

export interface CIMMLikertQuestion {
  id: string
  section: CIMMSection
  construct: string
  question: string
  helpText?: string
  weight: number
  reverse?: boolean
}

export const CIMM_SECTION_META: Record<CIMMSection, {
  label: string
  shortLabel: string
  description: string
  estimatedMinutes: number
}> = {
  innovationDepth: {
    label: 'Innovation Depth',
    shortLabel: 'Depth',
    description: 'Are you scratching the surface or going deep? Let\'s measure.',
    estimatedMinutes: 2,
  },
  culturalIntegrity: {
    label: 'Cultural Integrity',
    shortLabel: 'Integrity',
    description: 'Is your community proud of what you\'re creating? Let\'s check.',
    estimatedMinutes: 2,
  },
  economicImpact: {
    label: 'Economic Impact',
    shortLabel: 'Economic',
    description: 'Is your innovation paying off financially? Let\'s see the numbers.',
    estimatedMinutes: 2,
  },
  innovationVelocity: {
    label: 'Innovation Velocity',
    shortLabel: 'Velocity',
    description: 'How fast can you bring new ideas to market? Let\'s find out.',
    estimatedMinutes: 2,
  },
}

// Innovation Depth questions (5 questions)
export const innovationDepthQuestions: CIMMLikertQuestion[] = [
  {
    id: 'cimm-id-1',
    section: 'innovationDepth',
    construct: 'knowledgeIntegration',
    question: 'Our innovations incorporate deep traditional knowledge, not just surface aesthetics',
    helpText: 'Examples: using ancestral fermentation methods vs. just putting a traditional pattern on packaging',
    weight: 1.4,
  },
  {
    id: 'cimm-id-2',
    section: 'innovationDepth',
    construct: 'techniqueTransformation',
    question: 'We have developed new applications for traditional techniques',
    helpText: 'Examples: traditional weaving techniques used for modern furniture, ancestral dyes for fashion',
    weight: 1.3,
  },
  {
    id: 'cimm-id-3',
    section: 'innovationDepth',
    construct: 'crossCulturalSynthesis',
    question: 'Our innovations meaningfully bridge cultural traditions with contemporary needs',
    helpText: 'Examples: traditional medicine for modern wellness, heritage cooking for meal delivery',
    weight: 1.2,
  },
  {
    id: 'cimm-id-4',
    section: 'innovationDepth',
    construct: 'materialInnovation',
    question: 'We have innovated with traditional materials in new ways',
    helpText: 'Examples: bamboo for tech accessories, natural dyes for sustainable fashion',
    weight: 1.1,
  },
  {
    id: 'cimm-id-5',
    section: 'innovationDepth',
    construct: 'processInnovation',
    question: 'We have improved traditional processes while maintaining their essence',
    helpText: 'Examples: better tools that speed up handwork, improved workspace without mechanizing',
    weight: 1.2,
  },
]

// Cultural Integrity questions (5 questions)
export const culturalIntegrityQuestions: CIMMLikertQuestion[] = [
  {
    id: 'cimm-ci-1',
    section: 'culturalIntegrity',
    construct: 'sourceAuthenticity',
    question: 'Our innovations are recognized as authentic by source communities',
    helpText: 'Examples: elders approve our work, community members buy our products proudly',
    weight: 1.5,
  },
  {
    id: 'cimm-ci-2',
    section: 'culturalIntegrity',
    construct: 'meaningPreservation',
    question: 'Cultural meanings and symbolism are preserved in our innovations',
    helpText: 'Examples: sacred symbols not used commercially, ceremonial items kept separate',
    weight: 1.4,
  },
  {
    id: 'cimm-ci-3',
    section: 'culturalIntegrity',
    construct: 'storyTelling',
    question: 'We communicate the cultural stories behind our innovations',
    helpText: 'Examples: product cards explain origins, website tells the tradition\'s story',
    weight: 1.1,
  },
  {
    id: 'cimm-ci-4',
    section: 'culturalIntegrity',
    construct: 'communityConsent',
    question: 'We have explicit consent from communities for our use of cultural knowledge',
    helpText: 'Examples: signed agreements, community council approval, documented permissions',
    weight: 1.5,
  },
  {
    id: 'cimm-ci-5',
    section: 'culturalIntegrity',
    construct: 'culturalRespect',
    question: 'We actively avoid cultural misrepresentation or exploitation',
    helpText: 'Examples: review board checks new designs, refuse requests that feel wrong',
    weight: 1.3,
  },
]

// Economic Impact questions (5 questions)
export const economicImpactQuestions: CIMMLikertQuestion[] = [
  {
    id: 'cimm-ei-1',
    section: 'economicImpact',
    construct: 'revenueGrowth',
    question: 'Our cultural innovations have driven significant revenue growth',
    helpText: 'Examples: sales up 20%+ after launching new products, growing faster than before',
    weight: 1.3,
  },
  {
    id: 'cimm-ei-2',
    section: 'economicImpact',
    construct: 'marketPremium',
    question: 'Our products command a premium price due to cultural value',
    helpText: 'Examples: charge 2-3x more than factory-made alternatives, customers pay for authenticity',
    weight: 1.4,
  },
  {
    id: 'cimm-ei-3',
    section: 'economicImpact',
    construct: 'communityIncome',
    question: 'Our innovations have increased income for community members',
    helpText: 'Examples: artisan wages up 30%, more families can send kids to school',
    weight: 1.5,
  },
  {
    id: 'cimm-ei-4',
    section: 'economicImpact',
    construct: 'marketExpansion',
    question: 'We have successfully accessed new markets through cultural innovations',
    helpText: 'Examples: now selling to Europe, reached urban millennials, got into retail stores',
    weight: 1.2,
  },
  {
    id: 'cimm-ei-5',
    section: 'economicImpact',
    construct: 'investmentReturn',
    question: 'Our innovation investments have generated positive returns',
    helpText: 'Examples: new product line paid for itself, training investment led to better sales',
    weight: 1.1,
  },
]

// Innovation Velocity questions (5 questions)
export const innovationVelocityQuestions: CIMMLikertQuestion[] = [
  {
    id: 'cimm-iv-1',
    section: 'innovationVelocity',
    construct: 'developmentSpeed',
    question: 'We can develop new cultural products faster than 12 months ago',
    helpText: 'Examples: used to take 6 months to launch, now takes 3 months',
    weight: 1.2,
  },
  {
    id: 'cimm-iv-2',
    section: 'innovationVelocity',
    construct: 'ideaPipeline',
    question: 'We have a pipeline of innovation ideas waiting for development',
    helpText: 'Examples: list of 10+ product ideas, sketches waiting to be made',
    weight: 1.1,
  },
  {
    id: 'cimm-iv-3',
    section: 'innovationVelocity',
    construct: 'iterationCycles',
    question: 'We iterate and improve products based on market feedback quickly',
    helpText: 'Examples: fixed sizing issues within a month, updated designs after customer complaints',
    weight: 1.3,
  },
  {
    id: 'cimm-iv-4',
    section: 'innovationVelocity',
    construct: 'launchFrequency',
    question: 'We launch new products or services at least quarterly',
    helpText: 'Examples: seasonal collections, monthly limited editions, regular new offerings',
    weight: 1.0,
  },
  {
    id: 'cimm-iv-5',
    section: 'innovationVelocity',
    construct: 'scalingEfficiency',
    question: 'We can scale successful innovations efficiently',
    helpText: 'Examples: when a product sells well, can quickly make more without quality dropping',
    weight: 1.2,
  },
]

// Combined CIMM questions
export const cimmQuestions: CIMMLikertQuestion[] = [
  ...innovationDepthQuestions,
  ...culturalIntegrityQuestions,
  ...economicImpactQuestions,
  ...innovationVelocityQuestions,
]

// Helper to get questions by section
export const getCIMMQuestionsBySection = (section: CIMMSection): CIMMLikertQuestion[] => {
  return cimmQuestions.filter(q => q.section === section)
}

// Question config for scoring
export const cimmQuestionConfig = {
  sectionQuestions: {
    innovationDepth: innovationDepthQuestions.map(q => q.id),
    culturalIntegrity: culturalIntegrityQuestions.map(q => q.id),
    economicImpact: economicImpactQuestions.map(q => q.id),
    innovationVelocity: innovationVelocityQuestions.map(q => q.id),
  } as Record<CIMMSection, string[]>,
  questionConstructs: Object.fromEntries(
    cimmQuestions.map(q => [q.id, q.construct])
  ) as Record<string, string>,
}

// Stats
export const CIMM_STATS = {
  totalQuestions: 20,
  sections: 4,
  estimatedMinutes: 8,
}

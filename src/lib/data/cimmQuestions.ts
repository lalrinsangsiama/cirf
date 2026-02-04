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
    description: 'Measure how deeply your innovations integrate cultural knowledge',
    estimatedMinutes: 2,
  },
  culturalIntegrity: {
    label: 'Cultural Integrity',
    shortLabel: 'Integrity',
    description: 'Assess the authenticity and respect for cultural sources',
    estimatedMinutes: 2,
  },
  economicImpact: {
    label: 'Economic Impact',
    shortLabel: 'Economic',
    description: 'Evaluate the economic outcomes of your cultural innovations',
    estimatedMinutes: 2,
  },
  innovationVelocity: {
    label: 'Innovation Velocity',
    shortLabel: 'Velocity',
    description: 'Measure the speed and efficiency of your innovation processes',
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
    helpText: 'Consider whether innovations use underlying principles, techniques, or philosophies',
    weight: 1.4,
  },
  {
    id: 'cimm-id-2',
    section: 'innovationDepth',
    construct: 'techniqueTransformation',
    question: 'We have developed new applications for traditional techniques',
    helpText: 'Think about traditional methods applied to new products or contexts',
    weight: 1.3,
  },
  {
    id: 'cimm-id-3',
    section: 'innovationDepth',
    construct: 'crossCulturalSynthesis',
    question: 'Our innovations meaningfully bridge cultural traditions with contemporary needs',
    helpText: 'Consider how traditional knowledge solves modern problems',
    weight: 1.2,
  },
  {
    id: 'cimm-id-4',
    section: 'innovationDepth',
    construct: 'materialInnovation',
    question: 'We have innovated with traditional materials in new ways',
    helpText: 'Think about new uses, combinations, or treatments of traditional materials',
    weight: 1.1,
  },
  {
    id: 'cimm-id-5',
    section: 'innovationDepth',
    construct: 'processInnovation',
    question: 'We have improved traditional processes while maintaining their essence',
    helpText: 'Consider efficiency improvements that preserve cultural integrity',
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
    helpText: 'Consider validation from cultural knowledge holders',
    weight: 1.5,
  },
  {
    id: 'cimm-ci-2',
    section: 'culturalIntegrity',
    construct: 'meaningPreservation',
    question: 'Cultural meanings and symbolism are preserved in our innovations',
    helpText: 'Think about whether spiritual or cultural significance is maintained',
    weight: 1.4,
  },
  {
    id: 'cimm-ci-3',
    section: 'culturalIntegrity',
    construct: 'storyTelling',
    question: 'We communicate the cultural stories behind our innovations',
    helpText: 'Consider how cultural context is shared with customers',
    weight: 1.1,
  },
  {
    id: 'cimm-ci-4',
    section: 'culturalIntegrity',
    construct: 'communityConsent',
    question: 'We have explicit consent from communities for our use of cultural knowledge',
    helpText: 'Think about formal agreements or community endorsements',
    weight: 1.5,
  },
  {
    id: 'cimm-ci-5',
    section: 'culturalIntegrity',
    construct: 'culturalRespect',
    question: 'We actively avoid cultural misrepresentation or exploitation',
    helpText: 'Consider safeguards against inappropriate use',
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
    helpText: 'Consider year-over-year revenue changes from cultural products',
    weight: 1.3,
  },
  {
    id: 'cimm-ei-2',
    section: 'economicImpact',
    construct: 'marketPremium',
    question: 'Our products command a premium price due to cultural value',
    helpText: 'Think about pricing compared to non-cultural alternatives',
    weight: 1.4,
  },
  {
    id: 'cimm-ei-3',
    section: 'economicImpact',
    construct: 'communityIncome',
    question: 'Our innovations have increased income for community members',
    helpText: 'Consider wages, profit sharing, or indirect economic benefits',
    weight: 1.5,
  },
  {
    id: 'cimm-ei-4',
    section: 'economicImpact',
    construct: 'marketExpansion',
    question: 'We have successfully accessed new markets through cultural innovations',
    helpText: 'Think about new geographic or demographic markets reached',
    weight: 1.2,
  },
  {
    id: 'cimm-ei-5',
    section: 'economicImpact',
    construct: 'investmentReturn',
    question: 'Our innovation investments have generated positive returns',
    helpText: 'Consider ROI on R&D, training, or development costs',
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
    helpText: 'Consider improvements in time-to-market',
    weight: 1.2,
  },
  {
    id: 'cimm-iv-2',
    section: 'innovationVelocity',
    construct: 'ideaPipeline',
    question: 'We have a pipeline of innovation ideas waiting for development',
    helpText: 'Think about your backlog of potential innovations',
    weight: 1.1,
  },
  {
    id: 'cimm-iv-3',
    section: 'innovationVelocity',
    construct: 'iterationCycles',
    question: 'We iterate and improve products based on market feedback quickly',
    helpText: 'Consider how fast you incorporate feedback into improvements',
    weight: 1.3,
  },
  {
    id: 'cimm-iv-4',
    section: 'innovationVelocity',
    construct: 'launchFrequency',
    question: 'We launch new products or services at least quarterly',
    helpText: 'Think about your release cadence',
    weight: 1.0,
  },
  {
    id: 'cimm-iv-5',
    section: 'innovationVelocity',
    construct: 'scalingEfficiency',
    question: 'We can scale successful innovations efficiently',
    helpText: 'Consider how quickly you can increase production of hits',
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

// CIRA - Cultural Innovation Readiness Assessment
// 20 questions across 4 sections: Cultural Capital Inventory, Innovation Ecosystem, Barriers Assessment, Readiness Indicators

export type CIRASection =
  | 'culturalCapitalInventory'
  | 'innovationEcosystem'
  | 'barriersAssessment'
  | 'readinessIndicators'

export interface CIRALikertQuestion {
  id: string
  section: CIRASection
  construct: string
  question: string
  helpText?: string
  weight: number
  reverse?: boolean
}

export const CIRA_SECTION_META: Record<CIRASection, {
  label: string
  shortLabel: string
  description: string
  estimatedMinutes: number
}> = {
  culturalCapitalInventory: {
    label: 'Cultural Capital Inventory',
    shortLabel: 'Capital',
    description: 'Assess your cultural assets and knowledge resources',
    estimatedMinutes: 2,
  },
  innovationEcosystem: {
    label: 'Innovation Ecosystem',
    shortLabel: 'Ecosystem',
    description: 'Evaluate your support network for innovation',
    estimatedMinutes: 2,
  },
  barriersAssessment: {
    label: 'Barriers Assessment',
    shortLabel: 'Barriers',
    description: 'Identify obstacles to cultural innovation',
    estimatedMinutes: 2,
  },
  readinessIndicators: {
    label: 'Readiness Indicators',
    shortLabel: 'Readiness',
    description: 'Measure your preparedness for innovation initiatives',
    estimatedMinutes: 2,
  },
}

// Cultural Capital Inventory questions (5 questions)
export const culturalCapitalInventoryQuestions: CIRALikertQuestion[] = [
  {
    id: 'cira-cci-1',
    section: 'culturalCapitalInventory',
    construct: 'knowledgeDocumentation',
    question: 'We have documented our traditional knowledge and practices comprehensively',
    helpText: 'Consider written, recorded, or digitized documentation',
    weight: 1.3,
  },
  {
    id: 'cira-cci-2',
    section: 'culturalCapitalInventory',
    construct: 'practitionerNetwork',
    question: 'We have access to a network of skilled traditional practitioners',
    helpText: 'Think about master artisans, knowledge keepers, and trained practitioners',
    weight: 1.4,
  },
  {
    id: 'cira-cci-3',
    section: 'culturalCapitalInventory',
    construct: 'materialAccess',
    question: 'We have reliable access to traditional materials and resources',
    helpText: 'Consider supply chains for authentic materials',
    weight: 1.2,
  },
  {
    id: 'cira-cci-4',
    section: 'culturalCapitalInventory',
    construct: 'storyArchive',
    question: 'We maintain archives of cultural stories, histories, and meanings',
    helpText: 'Think about oral histories, written records, or digital archives',
    weight: 1.1,
  },
  {
    id: 'cira-cci-5',
    section: 'culturalCapitalInventory',
    construct: 'uniqueAssets',
    question: 'We possess unique cultural assets not easily replicated',
    helpText: 'Consider distinctive techniques, designs, or knowledge',
    weight: 1.5,
  },
]

// Innovation Ecosystem questions (5 questions)
export const innovationEcosystemQuestions: CIRALikertQuestion[] = [
  {
    id: 'cira-ie-1',
    section: 'innovationEcosystem',
    construct: 'mentorAccess',
    question: 'We have access to mentors experienced in cultural innovation',
    helpText: 'Consider advisors who have successfully innovated with cultural products',
    weight: 1.3,
  },
  {
    id: 'cira-ie-2',
    section: 'innovationEcosystem',
    construct: 'fundingAccess',
    question: 'We can access funding appropriate for cultural innovation projects',
    helpText: 'Think about grants, investors, or lenders who understand cultural enterprises',
    weight: 1.4,
  },
  {
    id: 'cira-ie-3',
    section: 'innovationEcosystem',
    construct: 'partnerNetwork',
    question: 'We have partners who can contribute complementary skills',
    helpText: 'Consider designers, technologists, marketers who respect cultural values',
    weight: 1.2,
  },
  {
    id: 'cira-ie-4',
    section: 'innovationEcosystem',
    construct: 'marketAccess',
    question: 'We have pathways to reach customers who value cultural products',
    helpText: 'Think about distribution channels, platforms, or market connections',
    weight: 1.3,
  },
  {
    id: 'cira-ie-5',
    section: 'innovationEcosystem',
    construct: 'policySupport',
    question: 'We benefit from supportive policies or programs for cultural enterprises',
    helpText: 'Consider government programs, tax incentives, or institutional support',
    weight: 1.0,
  },
]

// Barriers Assessment questions (5 questions - reverse scored)
export const barriersAssessmentQuestions: CIRALikertQuestion[] = [
  {
    id: 'cira-ba-1',
    section: 'barriersAssessment',
    construct: 'skillGaps',
    question: 'We lack key skills needed for cultural innovation',
    helpText: 'Consider gaps in technical, business, or creative capabilities',
    weight: 1.3,
    reverse: true,
  },
  {
    id: 'cira-ba-2',
    section: 'barriersAssessment',
    construct: 'resourceConstraints',
    question: 'Limited resources significantly constrain our innovation capacity',
    helpText: 'Think about financial, material, or human resource limitations',
    weight: 1.4,
    reverse: true,
  },
  {
    id: 'cira-ba-3',
    section: 'barriersAssessment',
    construct: 'marketBarriers',
    question: 'Market access barriers prevent us from reaching potential customers',
    helpText: 'Consider distribution, visibility, or competition challenges',
    weight: 1.2,
    reverse: true,
  },
  {
    id: 'cira-ba-4',
    section: 'barriersAssessment',
    construct: 'culturalResistance',
    question: 'Community resistance to change limits our innovation options',
    helpText: 'Think about cultural conservatism or fear of commercialization',
    weight: 1.3,
    reverse: true,
  },
  {
    id: 'cira-ba-5',
    section: 'barriersAssessment',
    construct: 'regulatoryBarriers',
    question: 'Regulatory or legal barriers impede our cultural innovations',
    helpText: 'Consider IP issues, export restrictions, or compliance burdens',
    weight: 1.1,
    reverse: true,
  },
]

// Readiness Indicators questions (5 questions)
export const readinessIndicatorsQuestions: CIRALikertQuestion[] = [
  {
    id: 'cira-ri-1',
    section: 'readinessIndicators',
    construct: 'leadershipCommitment',
    question: 'Our leadership is committed to cultural innovation',
    helpText: 'Consider visible support and resource allocation from leaders',
    weight: 1.5,
  },
  {
    id: 'cira-ri-2',
    section: 'readinessIndicators',
    construct: 'teamCapability',
    question: 'Our team has the skills and motivation to execute innovations',
    helpText: 'Think about technical abilities and enthusiasm for innovation',
    weight: 1.4,
  },
  {
    id: 'cira-ri-3',
    section: 'readinessIndicators',
    construct: 'processReadiness',
    question: 'We have processes in place to develop and test innovations',
    helpText: 'Consider R&D workflows, prototyping capabilities, and testing methods',
    weight: 1.2,
  },
  {
    id: 'cira-ri-4',
    section: 'readinessIndicators',
    construct: 'marketInsight',
    question: 'We understand our target market and customer needs well',
    helpText: 'Think about market research, customer feedback, and trend awareness',
    weight: 1.3,
  },
  {
    id: 'cira-ri-5',
    section: 'readinessIndicators',
    construct: 'riskTolerance',
    question: 'We can tolerate the risks associated with innovation attempts',
    helpText: 'Consider financial cushion and organizational flexibility',
    weight: 1.1,
  },
]

// Combined CIRA questions
export const ciraQuestions: CIRALikertQuestion[] = [
  ...culturalCapitalInventoryQuestions,
  ...innovationEcosystemQuestions,
  ...barriersAssessmentQuestions,
  ...readinessIndicatorsQuestions,
]

// Helper to get questions by section
export const getCIRAQuestionsBySection = (section: CIRASection): CIRALikertQuestion[] => {
  return ciraQuestions.filter(q => q.section === section)
}

// Question config for scoring
export const ciraQuestionConfig = {
  sectionQuestions: {
    culturalCapitalInventory: culturalCapitalInventoryQuestions.map(q => q.id),
    innovationEcosystem: innovationEcosystemQuestions.map(q => q.id),
    barriersAssessment: barriersAssessmentQuestions.map(q => q.id),
    readinessIndicators: readinessIndicatorsQuestions.map(q => q.id),
  } as Record<CIRASection, string[]>,
  questionConstructs: Object.fromEntries(
    ciraQuestions.map(q => [q.id, q.construct])
  ) as Record<string, string>,
}

// Stats
export const CIRA_STATS = {
  totalQuestions: 20,
  sections: 4,
  estimatedMinutes: 8,
}

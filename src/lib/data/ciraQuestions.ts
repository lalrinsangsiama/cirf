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
    description: 'What cultural treasures do you have to work with? Let\'s take stock.',
    estimatedMinutes: 2,
  },
  innovationEcosystem: {
    label: 'Innovation Ecosystem',
    shortLabel: 'Ecosystem',
    description: 'Who can help you grow? Let\'s map your support network.',
    estimatedMinutes: 2,
  },
  barriersAssessment: {
    label: 'Barriers Assessment',
    shortLabel: 'Barriers',
    description: 'What\'s standing in your way? Let\'s identify the roadblocks.',
    estimatedMinutes: 2,
  },
  readinessIndicators: {
    label: 'Readiness Indicators',
    shortLabel: 'Readiness',
    description: 'Are you ready to take the leap? Let\'s find out.',
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
    helpText: 'Examples: recipe books, technique videos, written guides, photo archives',
    weight: 1.3,
  },
  {
    id: 'cira-cci-2',
    section: 'culturalCapitalInventory',
    construct: 'practitionerNetwork',
    question: 'We have access to a network of skilled traditional practitioners',
    helpText: 'Examples: 3+ master craftspeople you can call on, trained apprentices ready to work',
    weight: 1.4,
  },
  {
    id: 'cira-cci-3',
    section: 'culturalCapitalInventory',
    construct: 'materialAccess',
    question: 'We have reliable access to traditional materials and resources',
    helpText: 'Examples: trusted suppliers, local sourcing agreements, stockpiled materials',
    weight: 1.2,
  },
  {
    id: 'cira-cci-4',
    section: 'culturalCapitalInventory',
    construct: 'storyArchive',
    question: 'We maintain archives of cultural stories, histories, and meanings',
    helpText: 'Examples: recorded elder interviews, written histories, photo/video collections',
    weight: 1.1,
  },
  {
    id: 'cira-cci-5',
    section: 'culturalCapitalInventory',
    construct: 'uniqueAssets',
    question: 'We possess unique cultural assets not easily replicated',
    helpText: 'Examples: secret family recipes, rare techniques only your community knows',
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
    helpText: 'Examples: successful cultural entrepreneurs you can call, formal mentorship programs',
    weight: 1.3,
  },
  {
    id: 'cira-ie-2',
    section: 'innovationEcosystem',
    construct: 'fundingAccess',
    question: 'We can access funding appropriate for cultural innovation projects',
    helpText: 'Examples: cultural grants, impact investors, microfinance, crowdfunding platforms',
    weight: 1.4,
  },
  {
    id: 'cira-ie-3',
    section: 'innovationEcosystem',
    construct: 'partnerNetwork',
    question: 'We have partners who can contribute complementary skills',
    helpText: 'Examples: a designer who helps with packaging, a tech person who built your website',
    weight: 1.2,
  },
  {
    id: 'cira-ie-4',
    section: 'innovationEcosystem',
    construct: 'marketAccess',
    question: 'We have pathways to reach customers who value cultural products',
    helpText: 'Examples: fair trade retailers, craft markets, online platforms, export contacts',
    weight: 1.3,
  },
  {
    id: 'cira-ie-5',
    section: 'innovationEcosystem',
    construct: 'policySupport',
    question: 'We benefit from supportive policies or programs for cultural enterprises',
    helpText: 'Examples: export subsidies, craft promotion schemes, GI certification support',
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
    helpText: 'Examples: no one knows digital marketing, missing financial management skills',
    weight: 1.3,
    reverse: true,
  },
  {
    id: 'cira-ba-2',
    section: 'barriersAssessment',
    construct: 'resourceConstraints',
    question: 'Limited resources significantly constrain our innovation capacity',
    helpText: 'Examples: can\'t afford new equipment, not enough workers, tight cash flow',
    weight: 1.4,
    reverse: true,
  },
  {
    id: 'cira-ba-3',
    section: 'barriersAssessment',
    construct: 'marketBarriers',
    question: 'Market access barriers prevent us from reaching potential customers',
    helpText: 'Examples: too far from markets, can\'t afford trade shows, don\'t know buyers',
    weight: 1.2,
    reverse: true,
  },
  {
    id: 'cira-ba-4',
    section: 'barriersAssessment',
    construct: 'culturalResistance',
    question: 'Community resistance to change limits our innovation options',
    helpText: 'Examples: elders oppose new designs, fear of "selling out" our culture',
    weight: 1.3,
    reverse: true,
  },
  {
    id: 'cira-ba-5',
    section: 'barriersAssessment',
    construct: 'regulatoryBarriers',
    question: 'Regulatory or legal barriers impede our cultural innovations',
    helpText: 'Examples: export licenses, food safety certifications, trademark disputes',
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
    helpText: 'Examples: leaders champion new ideas, budget allocated for experiments',
    weight: 1.5,
  },
  {
    id: 'cira-ri-2',
    section: 'readinessIndicators',
    construct: 'teamCapability',
    question: 'Our team has the skills and motivation to execute innovations',
    helpText: 'Examples: staff excited about new projects, have the right mix of skills',
    weight: 1.4,
  },
  {
    id: 'cira-ri-3',
    section: 'readinessIndicators',
    construct: 'processReadiness',
    question: 'We have processes in place to develop and test innovations',
    helpText: 'Examples: can make prototypes, have ways to test with customers before launch',
    weight: 1.2,
  },
  {
    id: 'cira-ri-4',
    section: 'readinessIndicators',
    construct: 'marketInsight',
    question: 'We understand our target market and customer needs well',
    helpText: 'Examples: talked to customers recently, know what competitors charge',
    weight: 1.3,
  },
  {
    id: 'cira-ri-5',
    section: 'readinessIndicators',
    construct: 'riskTolerance',
    question: 'We can tolerate the risks associated with innovation attempts',
    helpText: 'Examples: can afford a failed experiment, team won\'t panic if something doesn\'t work',
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

// TBL-CI - Triple Bottom Line Cultural Innovation Assessment
// 20 questions across 3 sections: Economic Returns, Social Impact, Environmental Impact

export type TBLSection =
  | 'economicReturns'
  | 'socialImpact'
  | 'environmentalImpact'

export interface TBLLikertQuestion {
  id: string
  section: TBLSection
  construct: string
  question: string
  helpText?: string
  weight: number
  reverse?: boolean
}

export const TBL_SECTION_META: Record<TBLSection, {
  label: string
  shortLabel: string
  description: string
  estimatedMinutes: number
}> = {
  economicReturns: {
    label: 'Economic Returns',
    shortLabel: 'Economic',
    description: 'Measure the financial sustainability and economic impact',
    estimatedMinutes: 3,
  },
  socialImpact: {
    label: 'Social Impact',
    shortLabel: 'Social',
    description: 'Assess community and social well-being outcomes',
    estimatedMinutes: 3,
  },
  environmentalImpact: {
    label: 'Environmental Impact',
    shortLabel: 'Environment',
    description: 'Evaluate environmental sustainability practices',
    estimatedMinutes: 2,
  },
}

// Economic Returns questions (6 questions)
export const economicReturnsQuestions: TBLLikertQuestion[] = [
  {
    id: 'tbl-er-1',
    section: 'economicReturns',
    construct: 'profitability',
    question: 'Our cultural enterprise is financially profitable or on track to profitability',
    helpText: 'Consider net income, profit margins, or break-even timeline',
    weight: 1.3,
  },
  {
    id: 'tbl-er-2',
    section: 'economicReturns',
    construct: 'revenueGrowth',
    question: 'Our revenue has grown consistently over the past year',
    helpText: 'Think about year-over-year revenue trends',
    weight: 1.2,
  },
  {
    id: 'tbl-er-3',
    section: 'economicReturns',
    construct: 'localEconomicImpact',
    question: 'We contribute significantly to the local economy through purchases and payments',
    helpText: 'Consider local suppliers, wages paid, and local spending',
    weight: 1.4,
  },
  {
    id: 'tbl-er-4',
    section: 'economicReturns',
    construct: 'livelihoodSupport',
    question: 'We provide sustainable livelihoods for practitioners and team members',
    helpText: 'Think about fair wages, job security, and income stability',
    weight: 1.5,
  },
  {
    id: 'tbl-er-5',
    section: 'economicReturns',
    construct: 'economicMultiplier',
    question: 'Our activities create indirect economic benefits beyond direct employment',
    helpText: 'Consider supply chain jobs, tourism, or related business growth',
    weight: 1.2,
  },
  {
    id: 'tbl-er-6',
    section: 'economicReturns',
    construct: 'financialResilience',
    question: 'We have financial reserves and diverse revenue streams',
    helpText: 'Think about cash reserves, multiple products, or varied markets',
    weight: 1.3,
  },
]

// Social Impact questions (7 questions)
export const socialImpactQuestions: TBLLikertQuestion[] = [
  {
    id: 'tbl-si-1',
    section: 'socialImpact',
    construct: 'culturalPreservation',
    question: 'Our work actively preserves and transmits cultural traditions',
    helpText: 'Consider apprenticeship programs, documentation, or cultural events',
    weight: 1.5,
  },
  {
    id: 'tbl-si-2',
    section: 'socialImpact',
    construct: 'communityEmpowerment',
    question: 'Community members have meaningful decision-making power in our organization',
    helpText: 'Think about governance structures and community voice',
    weight: 1.4,
  },
  {
    id: 'tbl-si-3',
    section: 'socialImpact',
    construct: 'skillDevelopment',
    question: 'We invest in developing skills and capabilities of community members',
    helpText: 'Consider training programs, mentorship, or education support',
    weight: 1.3,
  },
  {
    id: 'tbl-si-4',
    section: 'socialImpact',
    construct: 'inclusiveEmployment',
    question: 'We provide employment opportunities to marginalized or vulnerable groups',
    helpText: 'Think about women, youth, disabled, or economically disadvantaged',
    weight: 1.4,
  },
  {
    id: 'tbl-si-5',
    section: 'socialImpact',
    construct: 'communityBenefits',
    question: 'We share benefits with the broader community beyond direct participants',
    helpText: 'Consider community programs, infrastructure, or public goods',
    weight: 1.2,
  },
  {
    id: 'tbl-si-6',
    section: 'socialImpact',
    construct: 'culturalPride',
    question: 'Our work increases community pride in cultural heritage',
    helpText: 'Think about recognition, celebration, and cultural identity',
    weight: 1.3,
  },
  {
    id: 'tbl-si-7',
    section: 'socialImpact',
    construct: 'intergenerationalTransfer',
    question: 'We actively facilitate knowledge transfer between generations',
    helpText: 'Consider elder-youth connections and succession planning',
    weight: 1.5,
  },
]

// Environmental Impact questions (7 questions)
export const environmentalImpactQuestions: TBLLikertQuestion[] = [
  {
    id: 'tbl-ei-1',
    section: 'environmentalImpact',
    construct: 'sustainableMaterials',
    question: 'We source materials sustainably and responsibly',
    helpText: 'Consider renewable, recycled, or ethically sourced materials',
    weight: 1.4,
  },
  {
    id: 'tbl-ei-2',
    section: 'environmentalImpact',
    construct: 'wasteReduction',
    question: 'We minimize waste in our production processes',
    helpText: 'Think about material efficiency, recycling, and upcycling',
    weight: 1.2,
  },
  {
    id: 'tbl-ei-3',
    section: 'environmentalImpact',
    construct: 'energyEfficiency',
    question: 'We use energy efficiently and seek renewable sources',
    helpText: 'Consider energy consumption patterns and clean energy use',
    weight: 1.1,
  },
  {
    id: 'tbl-ei-4',
    section: 'environmentalImpact',
    construct: 'traditionalEcoPractices',
    question: 'We employ traditional practices that are inherently sustainable',
    helpText: 'Think about traditional methods that respect natural cycles',
    weight: 1.5,
  },
  {
    id: 'tbl-ei-5',
    section: 'environmentalImpact',
    construct: 'biodiversityProtection',
    question: 'Our activities support or protect local biodiversity',
    helpText: 'Consider impact on local species, habitats, or ecosystems',
    weight: 1.3,
  },
  {
    id: 'tbl-ei-6',
    section: 'environmentalImpact',
    construct: 'carbonFootprint',
    question: 'We actively work to minimize our carbon footprint',
    helpText: 'Think about transportation, production, and offset efforts',
    weight: 1.2,
  },
  {
    id: 'tbl-ei-7',
    section: 'environmentalImpact',
    construct: 'environmentalEducation',
    question: 'We educate customers and community about environmental sustainability',
    helpText: 'Consider awareness campaigns, product information, or programs',
    weight: 1.0,
  },
]

// Combined TBL questions
export const tblQuestions: TBLLikertQuestion[] = [
  ...economicReturnsQuestions,
  ...socialImpactQuestions,
  ...environmentalImpactQuestions,
]

// Helper to get questions by section
export const getTBLQuestionsBySection = (section: TBLSection): TBLLikertQuestion[] => {
  return tblQuestions.filter(q => q.section === section)
}

// Question config for scoring
export const tblQuestionConfig = {
  sectionQuestions: {
    economicReturns: economicReturnsQuestions.map(q => q.id),
    socialImpact: socialImpactQuestions.map(q => q.id),
    environmentalImpact: environmentalImpactQuestions.map(q => q.id),
  } as Record<TBLSection, string[]>,
  questionConstructs: Object.fromEntries(
    tblQuestions.map(q => [q.id, q.construct])
  ) as Record<string, string>,
}

// Stats
export const TBL_STATS = {
  totalQuestions: 20,
  sections: 3,
  estimatedMinutes: 8,
}

// TBL specific scoring weights (equal weight for true triple bottom line)
export const TBL_SECTION_WEIGHTS: Record<TBLSection, number> = {
  economicReturns: 0.333,
  socialImpact: 0.333,
  environmentalImpact: 0.334,
}

// CIMM - Cultural Innovation Measurement Matrix
// 19 questions across 4 sections: Innovation Depth, Cultural Integrity, Economic Impact, Innovation Velocity
// Measures HOW cultural innovation operates — depth, integrity, economic return, and speed
// Research alignment: operationalizes "cultural innovation" as a multi-dimensional construct

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
    description: 'Are you scratching the surface or going deep? Let\'s measure how deeply tradition informs your innovation.',
    estimatedMinutes: 2,
  },
  culturalIntegrity: {
    label: 'Cultural Integrity',
    shortLabel: 'Integrity',
    description: 'Is your community proud of what you\'re creating? Let\'s check how well you protect cultural meaning.',
    estimatedMinutes: 2,
  },
  economicImpact: {
    label: 'Economic Impact',
    shortLabel: 'Economic',
    description: 'Is your cultural innovation paying off financially — for you and your community?',
    estimatedMinutes: 2,
  },
  innovationVelocity: {
    label: 'Innovation Velocity',
    shortLabel: 'Velocity',
    description: 'How fast can you bring culturally-grounded ideas to market? Let\'s find out.',
    estimatedMinutes: 2,
  },
}

// Innovation Depth questions (5 questions)
export const innovationDepthQuestions: CIMMLikertQuestion[] = [
  {
    id: 'cimm-id-1',
    section: 'innovationDepth',
    construct: 'knowledgeIntegration',
    question: 'Our innovations incorporate deep traditional knowledge, not just visual aesthetics',
    helpText: 'For example: A Korean gochujang maker uses ancestral fermentation methods handed down for generations to create new hot sauce products — the innovation is in the application, not in replacing the fermentation. Does your innovation draw on deep traditional processes, techniques, or knowledge systems, rather than just surface-level cultural patterns or motifs?',
    weight: 1.4,
  },
  {
    id: 'cimm-id-2',
    section: 'innovationDepth',
    construct: 'techniqueTransformation',
    question: 'We have developed new applications for traditional techniques',
    helpText: 'For example: A Guatemalan backstrap weaving collective adapted their textile techniques to produce laptop sleeves and phone cases — the weaving method is centuries old, but the product is entirely new. Have you found new uses or markets for traditional techniques beyond their original application?',
    weight: 1.3,
  },
  {
    id: 'cimm-id-3',
    section: 'innovationDepth',
    construct: 'crossCulturalSynthesis',
    question: 'Our innovations meaningfully bridge cultural traditions with contemporary needs',
    helpText: 'For example: A Ghanaian traditional medicine practitioner partnered with a pharmacist to create standardised herbal wellness supplements, making ancestral remedies accessible to urban health-conscious consumers. Do your products or services connect traditional practices to modern-day needs or lifestyles?',
    weight: 1.2,
  },
  {
    id: 'cimm-id-4',
    section: 'innovationDepth',
    construct: 'materialInnovation',
    question: 'We have innovated with traditional materials in new ways',
    helpText: 'For example: A Filipino abaca fibre producer developed high-end fashion textiles from the same plant traditionally used for rope — the material is ancient, but the application commanded 10x the price. Have you found new ways to use traditional materials that create higher value or reach new markets?',
    weight: 1.1,
  },
  {
    id: 'cimm-id-5',
    section: 'innovationDepth',
    construct: 'processInnovation',
    question: 'We have improved traditional processes to increase quality or consistency',
    helpText: 'For example: A Oaxacan mezcal distillery introduced temperature-controlled fermentation monitoring alongside their traditional pit-roasting method, achieving more consistent flavour without changing the ancestral process. Have you improved the reliability or quality of traditional processes while keeping the core method intact?',
    weight: 1.2,
  },
]

// Cultural Integrity questions (4 questions — includes 1 reverse-scored)
export const culturalIntegrityQuestions: CIMMLikertQuestion[] = [
  {
    id: 'cimm-ci-1',
    section: 'culturalIntegrity',
    construct: 'meaningPreservation',
    question: 'Cultural meanings and symbolism are preserved in our innovations',
    helpText: 'For example: A Maori tattoo artist who expanded into contemporary jewellery ensures each piece references specific tribal patterns with their correct spiritual meanings — nothing is used purely as decoration. When you innovate, do the cultural meanings behind symbols, patterns, or practices stay intact?',
    weight: 1.4,
  },
  {
    id: 'cimm-ci-2',
    section: 'culturalIntegrity',
    construct: 'communityConsent',
    question: 'We have explicit consent from communities for our use of cultural knowledge',
    helpText: 'For example: A cosmetics company using Amazonian plant knowledge obtained formal consent agreements from the indigenous community, including benefit-sharing terms reviewed by community elders. Do you have signed agreements, community council approvals, or documented permissions for the cultural knowledge you use?',
    weight: 1.5,
  },
  {
    id: 'cimm-ci-3',
    section: 'culturalIntegrity',
    construct: 'culturalDilution',
    question: 'We have sometimes simplified or diluted cultural elements to make products easier to sell',
    helpText: 'For example: A textile company removed complex traditional symbolic patterns from their designs because foreign buyers found them "too busy," replacing them with simpler geometric prints. Have you ever simplified, removed, or altered cultural elements primarily to appeal to a wider market?',
    weight: 1.3,
    reverse: true,
  },
  {
    id: 'cimm-ci-4',
    section: 'culturalIntegrity',
    construct: 'culturalRespect',
    question: 'We have clear guidelines for what cultural elements can and cannot be commercialised',
    helpText: 'For example: A Native American pottery collective has a written policy that sacred ceremonial designs are never used on commercial products, even when buyers specifically request them. Do you have rules — written or understood — about which cultural elements are off-limits for commercial use?',
    weight: 1.3,
  },
]

// Economic Impact questions (5 questions)
export const economicImpactQuestions: CIMMLikertQuestion[] = [
  {
    id: 'cimm-ei-1',
    section: 'economicImpact',
    construct: 'revenueGrowth',
    question: 'Our cultural innovations have driven measurable revenue growth',
    helpText: 'For example: After a Senegalese indigo dyer launched a contemporary fashion line alongside traditional cloth, total revenue grew 40% in one year — the new line brought in customers who then also bought traditional pieces. Have your innovation efforts led to a noticeable increase in sales or revenue?',
    weight: 1.3,
  },
  {
    id: 'cimm-ei-2',
    section: 'economicImpact',
    construct: 'marketPremium',
    question: 'Our products command a premium price due to their cultural value',
    helpText: 'For example: Hand-thrown Mashiko pottery from Japan sells for 5-10x the price of mass-produced ceramics because buyers pay for the 400-year tradition, the named artisan, and the wood-fired kiln marks. Do your products or services command higher prices than non-cultural alternatives because of their cultural authenticity?',
    weight: 1.4,
  },
  {
    id: 'cimm-ei-3',
    section: 'economicImpact',
    construct: 'communityIncome',
    question: 'Our innovations have increased income for community members beyond our direct team',
    helpText: 'For example: When a Rajasthani block-printing enterprise grew, it increased orders from local dye suppliers and cotton farmers, raising incomes for 30+ families who were not direct employees. Has your growth created income for suppliers, neighbouring businesses, or community members who are not on your team?',
    weight: 1.5,
  },
  {
    id: 'cimm-ei-4',
    section: 'economicImpact',
    construct: 'investmentReturn',
    question: 'Our innovation investments have generated positive returns',
    helpText: 'For example: A Mexican cooperative invested $5,000 in a new kiln design that paid for itself within 8 months through increased production and lower fuel costs. Have your investments in innovation (equipment, training, product development) generated measurable financial returns?',
    weight: 1.1,
  },
  {
    id: 'cimm-ei-5',
    section: 'economicImpact',
    construct: 'resilienceContribution',
    question: 'Our cultural innovation activities have made our enterprise more financially stable during difficult periods',
    helpText: 'For example: A Peruvian alpaca textile producer found that their culturally innovative product lines (contemporary designs using traditional techniques) maintained demand during the pandemic, while their basic commodity wool sales collapsed. Have your innovation efforts specifically helped you weather economic difficulty better?',
    weight: 1.4,
  },
]

// Innovation Velocity questions (5 questions)
export const innovationVelocityQuestions: CIMMLikertQuestion[] = [
  {
    id: 'cimm-iv-1',
    section: 'innovationVelocity',
    construct: 'developmentSpeed',
    question: 'We can develop new cultural products or services faster than we could 12 months ago',
    helpText: 'For example: A Mizo bamboo craft workshop that used to take 6 months from idea to market now does it in 3 months — they built templates, standardised quality checks, and streamlined their design process. Can you bring new ideas to life faster than before?',
    weight: 1.2,
  },
  {
    id: 'cimm-iv-2',
    section: 'innovationVelocity',
    construct: 'ideaPipeline',
    question: 'We have a pipeline of innovation ideas waiting for development',
    helpText: 'For example: A Colombian coffee cooperative keeps a "big ideas notebook" with 15+ product concepts contributed by farmers, baristas, and customers — they pick the best one each quarter to develop. Do you have a backlog of ideas, sketches, or concepts ready to pursue when you have capacity?',
    weight: 1.1,
  },
  {
    id: 'cimm-iv-3',
    section: 'innovationVelocity',
    construct: 'iterationCycles',
    question: 'We improve products quickly based on market feedback',
    helpText: 'For example: A Moroccan leather goods maker noticed online reviews mentioning a zipper issue and redesigned the closure within one month, fixing the problem before the next production run. When you get feedback, how quickly can you make changes — weeks, months, or does it take longer?',
    weight: 1.3,
  },
  {
    id: 'cimm-iv-4',
    section: 'innovationVelocity',
    construct: 'launchFrequency',
    question: 'We introduce new or updated offerings at least every few months',
    helpText: 'For example: A Thai ceramics studio releases a new limited-edition collection each season, timed to tourist peaks and local festivals — four distinct launches per year. Do you regularly introduce new products, updated designs, or seasonal offerings?',
    weight: 1.0,
  },
  {
    id: 'cimm-iv-5',
    section: 'innovationVelocity',
    construct: 'scalingEfficiency',
    question: 'When a product succeeds, we can scale production without losing quality',
    helpText: 'For example: When a Kenyan beadwork design went viral on Instagram, the collective scaled from 50 to 500 pieces per month by training more community beaders using standardised colour guides — each piece still handmade to the same standard. Can you increase output when demand surges without compromising craftsmanship?',
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
  totalQuestions: 19,
  sections: 4,
  estimatedMinutes: 8,
}

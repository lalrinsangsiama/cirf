// CIRA - Cultural Innovation Readiness Assessment
// 20 questions across 4 sections: Cultural Capital Inventory, Innovation Ecosystem, Barriers Assessment, Readiness Indicators
// Measures readiness to innovate — what assets you have, what support exists, what blocks you, and whether you're prepared
// Research alignment: captures preconditions for cultural innovation, helping explain WHERE and WHEN innovation succeeds

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
    description: 'What cultural treasures do you have to work with? Let\'s take stock of your assets.',
    estimatedMinutes: 2,
  },
  innovationEcosystem: {
    label: 'Innovation Ecosystem',
    shortLabel: 'Ecosystem',
    description: 'Who can help you grow? Let\'s map your support network and environment.',
    estimatedMinutes: 2,
  },
  barriersAssessment: {
    label: 'Barriers Assessment',
    shortLabel: 'Barriers',
    description: 'What\'s standing in your way? Let\'s honestly identify the roadblocks.',
    estimatedMinutes: 2,
  },
  readinessIndicators: {
    label: 'Readiness Indicators',
    shortLabel: 'Readiness',
    description: 'Are you ready to take the leap? Let\'s assess your capacity to act.',
    estimatedMinutes: 2,
  },
}

// Cultural Capital Inventory questions (4 questions)
// Note: designed to capture DIFFERENT assets from CIL's Cultural Capital section
// CIL asks about relationships, community involvement, authenticity
// CIRA asks about tangible assets, archives, material access, uniqueness
export const culturalCapitalInventoryQuestions: CIRALikertQuestion[] = [
  {
    id: 'cira-cci-1',
    section: 'culturalCapitalInventory',
    construct: 'materialAccess',
    question: 'We have reliable access to the traditional materials and resources we need',
    helpText: 'For example: A Balinese mask carver has long-term agreements with three sustainable wood suppliers and stockpiles rare pigments during the dry season — they are never forced to compromise on materials. Do you have trusted suppliers, local sourcing agreements, or stockpiled materials that ensure you can always produce?',
    weight: 1.2,
  },
  {
    id: 'cira-cci-2',
    section: 'culturalCapitalInventory',
    construct: 'storyArchive',
    question: 'We maintain archives of cultural stories, histories, and meanings behind our practices',
    helpText: 'For example: A Sami reindeer herding family recorded 40 hours of elder interviews about traditional migration routes, seasonal knowledge, and herding songs — creating a permanent archive for future generations and product storytelling. Do you have recorded interviews, written histories, photo/video collections, or documented oral traditions?',
    weight: 1.1,
  },
  {
    id: 'cira-cci-3',
    section: 'culturalCapitalInventory',
    construct: 'uniqueAssets',
    question: 'We possess cultural knowledge or techniques that competitors cannot easily replicate',
    helpText: 'For example: A family of Murano glass blowers in Italy holds techniques for a specific gold-leaf infusion method that has been passed down for 7 generations and exists nowhere else. Do you have secret recipes, rare techniques, unique raw material access, or knowledge that only your community possesses?',
    weight: 1.5,
  },
  {
    id: 'cira-cci-4',
    section: 'culturalCapitalInventory',
    construct: 'culturalDepthBreadth',
    question: 'Our cultural tradition offers many different elements we could potentially innovate with',
    helpText: 'For example: Japanese washi paper culture encompasses dozens of techniques (dyeing, embossing, layering, waterproofing) across applications (writing, wrapping, building, art) — there are always new combinations to explore. Does your cultural tradition have a wide range of techniques, materials, stories, or practices you could draw on for innovation?',
    weight: 1.0,
  },
]

// Innovation Ecosystem questions (5 questions)
export const innovationEcosystemQuestions: CIRALikertQuestion[] = [
  {
    id: 'cira-ie-1',
    section: 'innovationEcosystem',
    construct: 'mentorAccess',
    question: 'We have access to mentors who have successfully innovated in a cultural context',
    helpText: 'For example: A young Ghanaian kente weaver is mentored by a senior artisan who successfully launched an e-commerce brand — she meets with him monthly to discuss strategy and mistakes to avoid. Do you have experienced cultural entrepreneurs you can learn from, whether through formal programs or informal relationships?',
    weight: 1.3,
  },
  {
    id: 'cira-ie-2',
    section: 'innovationEcosystem',
    construct: 'fundingAccess',
    question: 'We can access funding that is appropriate for cultural innovation projects',
    helpText: 'For example: A Colombian artisan cooperative received a $15,000 grant from a cultural preservation fund that specifically supports enterprises blending tradition with innovation — general business loans had rejected them. Can you access cultural grants, impact investors, microfinance, crowdfunding, or other funding that understands cultural enterprises?',
    weight: 1.4,
  },
  {
    id: 'cira-ie-3',
    section: 'innovationEcosystem',
    construct: 'partnerNetwork',
    question: 'We have partners who contribute skills our team lacks',
    helpText: 'For example: An Aboriginal Australian art centre partners with a Melbourne design studio for packaging, a university for colour-fastness testing, and an e-commerce agency for their online store — each partner fills a gap the artists cannot. Do you have collaborators who bring complementary skills like design, technology, marketing, or logistics?',
    weight: 1.2,
  },
  {
    id: 'cira-ie-4',
    section: 'innovationEcosystem',
    construct: 'marketAccess',
    question: 'We have clear pathways to reach customers who value culturally authentic products',
    helpText: 'For example: A Peruvian textile cooperative sells through three channels: a fair-trade retailer in Europe, a high-end craft marketplace online, and a tourist shop at Machu Picchu — each channel reaches customers who specifically seek authentic cultural products. Do you have established routes to customers who care about cultural authenticity and will pay accordingly?',
    weight: 1.3,
  },
  {
    id: 'cira-ie-5',
    section: 'innovationEcosystem',
    construct: 'policySupport',
    question: 'Government policies or programs actively support our type of cultural enterprise',
    helpText: 'For example: The Indian government\'s One District One Product scheme provides marketing support, quality testing, and export facilitation for traditional craft producers in each district. Do you benefit from export subsidies, craft promotion schemes, GI certification support, cultural enterprise zones, or similar programs?',
    weight: 1.0,
  },
]

// Barriers Assessment questions (6 questions - all reverse scored)
// Research alignment: identifies WHY cultural innovation fails or stalls in certain contexts
export const barriersAssessmentQuestions: CIRALikertQuestion[] = [
  {
    id: 'cira-ba-1',
    section: 'barriersAssessment',
    construct: 'skillGaps',
    question: 'We lack key skills needed to innovate effectively',
    helpText: 'For example: A talented Mizo bamboo craftsman has innovative product ideas but cannot create a website, manage social media, or do financial projections — these skill gaps prevent him from reaching customers beyond the local market. Are there important skills (digital marketing, financial management, design, export logistics) that your team lacks?',
    weight: 1.3,
    reverse: true,
  },
  {
    id: 'cira-ba-2',
    section: 'barriersAssessment',
    construct: 'resourceConstraints',
    question: 'Limited financial resources significantly constrain our ability to innovate',
    helpText: 'For example: A Moroccan pottery workshop has designed a new product line but cannot afford the $3,000 needed for a better kiln and packaging materials — the innovation sits on paper indefinitely. Do tight finances prevent you from buying equipment, hiring help, attending markets, or developing new products?',
    weight: 1.4,
    reverse: true,
  },
  {
    id: 'cira-ba-3',
    section: 'barriersAssessment',
    construct: 'marketBarriers',
    question: 'We struggle to reach potential customers who would value our products',
    helpText: 'For example: A rural Indonesian batik maker produces exceptional work but lives 6 hours from the nearest tourist area, cannot afford trade show booths, and has unreliable internet for online sales — her products never reach the people who would buy them. Do distance, cost, technology, or lack of connections prevent you from reaching your ideal customers?',
    weight: 1.2,
    reverse: true,
  },
  {
    id: 'cira-ba-4',
    section: 'barriersAssessment',
    construct: 'culturalResistance',
    question: 'Community members resist changes to traditional practices, even beneficial ones',
    helpText: 'For example: When a young Navajo silversmith proposed adding contemporary designs to attract younger buyers, several elder smiths strongly opposed it as disrespectful to tradition — even though declining sales threatened the workshop\'s survival. Have community elders, cultural authorities, or peers pushed back against your innovation ideas?',
    weight: 1.3,
    reverse: true,
  },
  {
    id: 'cira-ba-5',
    section: 'barriersAssessment',
    construct: 'regulatoryBarriers',
    question: 'Regulatory or legal requirements make it difficult for us to innovate or export',
    helpText: 'For example: A Thai herbal medicine producer spent 18 months and $8,000 on food safety certifications required to sell internationally — a barrier that larger competitors clear easily but nearly bankrupted her small enterprise. Do export licenses, food safety rules, trademark disputes, or other regulations slow you down?',
    weight: 1.1,
    reverse: true,
  },
  {
    id: 'cira-ba-6',
    section: 'barriersAssessment',
    construct: 'appropriationFear',
    question: 'We worry that innovating or sharing our cultural knowledge publicly will lead to copying or misuse',
    helpText: 'For example: A Brazilian indigenous beadwork collective hesitates to sell online because fast-fashion brands have previously copied their patterns without credit or compensation — the fear of cultural theft limits their market reach. Do concerns about appropriation, copying, or misuse hold you back from innovating or expanding?',
    weight: 1.2,
    reverse: true,
  },
]

// Readiness Indicators questions (5 questions)
export const readinessIndicatorsQuestions: CIRALikertQuestion[] = [
  {
    id: 'cira-ri-1',
    section: 'readinessIndicators',
    construct: 'leadershipCommitment',
    question: 'Our leadership actively champions and invests in cultural innovation',
    helpText: 'For example: The director of a South African craft collective personally allocates 15% of the annual budget to experimentation and publicly celebrates both successful innovations and instructive failures. Do your leaders talk about innovation, allocate budget for it, and lead by example?',
    weight: 1.5,
  },
  {
    id: 'cira-ri-2',
    section: 'readinessIndicators',
    construct: 'teamCapability',
    question: 'Our team has both the skills and motivation to execute new ideas',
    helpText: 'For example: A Vietnamese lacquerware studio cross-trained their artisans so each person can handle at least three production steps and contribute design ideas — the team is excited to try new techniques because they understand the whole process. Does your team have the right mix of skills AND the enthusiasm to try new things?',
    weight: 1.4,
  },
  {
    id: 'cira-ri-3',
    section: 'readinessIndicators',
    construct: 'processReadiness',
    question: 'We have a way to test new ideas before committing significant resources',
    helpText: 'For example: Before launching a full collection, a Kenyan beadwork collective makes 10 sample pieces, tests them at a local market, collects customer reactions on a simple feedback form, and only produces in bulk if the response is positive. Can you prototype, pilot, or small-batch test innovations before going all-in?',
    weight: 1.2,
  },
  {
    id: 'cira-ri-4',
    section: 'readinessIndicators',
    construct: 'marketInsight',
    question: 'We have a good understanding of what our target customers want and will pay for',
    helpText: 'For example: A Bhutanese textile weaver surveys tourists at the national museum gift shop every quarter, tracking which colours, sizes, and price points sell best — this data directly shapes her next collection. Do you actively gather customer insights through surveys, sales data analysis, conversations, or market observation?',
    weight: 1.3,
  },
  {
    id: 'cira-ri-5',
    section: 'readinessIndicators',
    construct: 'riskTolerance',
    question: 'We can afford for an innovation attempt to fail without threatening our survival',
    helpText: 'For example: A Turkish rug cooperative sets aside a small "experiment fund" each year — if a new design flops, they lose the fund but the core business continues unaffected. The team views failure as learning, not catastrophe. Can you absorb the cost of a failed experiment? Would your team recover quickly from a setback?',
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

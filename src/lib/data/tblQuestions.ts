// TBL-CI - Triple Bottom Line Cultural Innovation Assessment
// 18 questions across 3 sections: Economic Returns, Social Impact, Environmental Impact
// Measures value creation across profit, people, and planet — specifically through cultural innovation
// Research alignment: demonstrates that cultural innovation creates MULTI-DIMENSIONAL economic resilience

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
    description: 'Is your cultural enterprise financially healthy? Let\'s check the profit side of the triple bottom line.',
    estimatedMinutes: 3,
  },
  socialImpact: {
    label: 'Social Impact',
    shortLabel: 'Social',
    description: 'Are you making life better for people? Let\'s measure the human impact of your cultural work.',
    estimatedMinutes: 3,
  },
  environmentalImpact: {
    label: 'Environmental Impact',
    shortLabel: 'Environment',
    description: 'Are you being kind to the planet? Let\'s assess your environmental footprint.',
    estimatedMinutes: 2,
  },
}

// Economic Returns questions (6 questions)
export const economicReturnsQuestions: TBLLikertQuestion[] = [
  {
    id: 'tbl-er-1',
    section: 'economicReturns',
    construct: 'profitability',
    question: 'Our cultural enterprise is financially profitable or on a clear path to profitability',
    helpText: 'For example: A Rwandan basket-weaving cooperative became profitable in year two and now generates a 20% margin — enough to reinvest in growth without relying on grants. Are you making a profit each month, or do you have a realistic timeline to break even?',
    weight: 1.3,
  },
  {
    id: 'tbl-er-2',
    section: 'economicReturns',
    construct: 'revenueGrowth',
    question: 'Our revenue has grown over the past year',
    helpText: 'For example: A Vietnamese lacquerware studio saw sales increase 25% after launching an online storefront alongside their physical workshop — each quarter brought more customers than the last. Have your sales increased compared to the previous year? Are you seeing more customers or larger orders?',
    weight: 1.2,
  },
  {
    id: 'tbl-er-3',
    section: 'economicReturns',
    construct: 'localEconomicImpact',
    question: 'We contribute significantly to the local economy through our purchases and payments',
    helpText: 'For example: A Oaxacan pottery workshop buys clay locally, hires village transport, uses the town printer, and pays local women to pack shipments — roughly 70% of their spending stays within a 20km radius. How much of your spending goes to local suppliers, services, and workers?',
    weight: 1.4,
  },
  {
    id: 'tbl-er-4',
    section: 'economicReturns',
    construct: 'livelihoodSupport',
    question: 'We provide sustainable, year-round livelihoods for our practitioners and team',
    helpText: 'For example: A Kashmiri shawl cooperative guarantees its 25 weavers a minimum monthly income even during the off-season by building inventory and diversifying into home textiles — no weaver faces seasonal unemployment. Can your team members support their families year-round from their work with you?',
    weight: 1.5,
  },
  {
    id: 'tbl-er-5',
    section: 'economicReturns',
    construct: 'economicMultiplier',
    question: 'Our activities create indirect economic benefits beyond our direct operations',
    helpText: 'For example: A heritage tourism enterprise in Rajasthan attracts 5,000 visitors per year — the nearby restaurant, guesthouse, and auto-rickshaw drivers all report significant income from these visitors. Has your enterprise created economic activity for businesses or workers beyond your own team?',
    weight: 1.2,
  },
  {
    id: 'tbl-er-6',
    section: 'economicReturns',
    construct: 'culturalEconomicLink',
    question: 'Our economic success is directly tied to the cultural authenticity of what we produce',
    helpText: 'For example: A Scotch whisky distillery\'s premium pricing depends entirely on its 200-year heritage, specific water source, and traditional copper-pot distillation — remove the cultural story and it becomes just another spirit at half the price. Would your business lose significant revenue if you removed the cultural dimension from your products?',
    weight: 1.4,
  },
]

// Social Impact questions (6 questions)
export const socialImpactQuestions: TBLLikertQuestion[] = [
  {
    id: 'tbl-si-1',
    section: 'socialImpact',
    construct: 'culturalPreservation',
    question: 'Our work actively preserves and transmits cultural traditions to new practitioners',
    helpText: 'For example: A Balinese gamelan orchestra school teaches 60 young musicians per year, ensuring the complex musical tradition continues — several graduates have started their own ensembles. Does your enterprise actively teach, document, or pass on cultural traditions to others?',
    weight: 1.5,
  },
  {
    id: 'tbl-si-2',
    section: 'socialImpact',
    construct: 'skillDevelopment',
    question: 'We invest in developing skills and capabilities of community members',
    helpText: 'For example: A Mexican embroidery cooperative offers free weekly workshops to village women, teaching both traditional stitching and business basics like pricing and photography — 12 participants have started selling their own work. Do you provide training, mentorship, or skill-building beyond just employing people?',
    weight: 1.3,
  },
  {
    id: 'tbl-si-3',
    section: 'socialImpact',
    construct: 'inclusiveEmployment',
    question: 'We provide employment or income opportunities to people who might otherwise be excluded',
    helpText: 'For example: A Kenyan beadwork enterprise specifically recruits single mothers and young women from informal settlements, providing flexible hours so they can care for children while earning steady income. Do you intentionally create opportunities for marginalized groups, youth, women, disabled people, or other underserved populations?',
    weight: 1.4,
  },
  {
    id: 'tbl-si-4',
    section: 'socialImpact',
    construct: 'communityBenefits',
    question: 'We share benefits with the broader community beyond our direct team',
    helpText: 'For example: A Thai silk weaving village allocates 5% of all sales to a community fund that has built a playground, repaired the school roof, and funded a clean water project. Do you contribute to community development through funds, free events, shared infrastructure, or other collective benefits?',
    weight: 1.2,
  },
  {
    id: 'tbl-si-5',
    section: 'socialImpact',
    construct: 'culturalPride',
    question: 'Our work has increased community pride in cultural heritage',
    helpText: 'For example: After a Nigerian Adire textile collective won an international design award, local teenagers who previously saw traditional fabric as "old-fashioned" started asking to learn the indigo-dyeing technique — cultural pride visibly shifted. Has your success changed how your community feels about their own cultural traditions?',
    weight: 1.3,
  },
  {
    id: 'tbl-si-6',
    section: 'socialImpact',
    construct: 'socialCohesion',
    question: 'Our cultural activities bring people together and strengthen community bonds',
    helpText: 'For example: A Brazilian capoeira school serves as an informal community centre — parents chat while children train, holiday events draw hundreds, and the group organises neighbourhood clean-ups. Does your enterprise create social connections, gatherings, or shared experiences that strengthen community ties?',
    weight: 1.1,
  },
]

// Environmental Impact questions (6 questions — includes 1 reverse-scored)
export const environmentalImpactQuestions: TBLLikertQuestion[] = [
  {
    id: 'tbl-ei-1',
    section: 'environmentalImpact',
    construct: 'sustainableMaterials',
    question: 'We source materials sustainably and can verify their origin',
    helpText: 'For example: A Peruvian alpaca textile producer only buys fibre from herders who practise rotational grazing and can trace each batch to a specific herd — they refused a large order rather than source from an unsustainable supplier. Do you know where your materials come from, and are those sources sustainable?',
    weight: 1.4,
  },
  {
    id: 'tbl-ei-2',
    section: 'environmentalImpact',
    construct: 'wasteReduction',
    question: 'We actively minimise waste in our production processes',
    helpText: 'For example: A Japanese kimono fabric workshop turns fabric offcuts into accessories (pouches, bookmarks, coasters), saves dye baths for reuse, and composts natural fibre scraps — less than 5% of material goes to landfill. Do you have specific practices to reduce, reuse, or recycle waste from your production?',
    weight: 1.2,
  },
  {
    id: 'tbl-ei-3',
    section: 'environmentalImpact',
    construct: 'traditionalEcoPractices',
    question: 'Our traditional practices are inherently more sustainable than modern industrial alternatives',
    helpText: 'For example: A Moroccan argan oil cooperative uses traditional hand-pressing methods that require no electricity and produce no chemical waste — industrial extraction uses hexane solvents and heavy machinery. Are your traditional methods naturally lower-impact than the industrial alternatives?',
    weight: 1.5,
  },
  {
    id: 'tbl-ei-4',
    section: 'environmentalImpact',
    construct: 'biodiversityProtection',
    question: 'Our activities support or protect local biodiversity',
    helpText: 'For example: A Sri Lankan spice garden that grows traditional Ayurvedic herbs maintains a diverse forest ecosystem with 40+ plant species, providing habitat for birds and pollinators — compared to monoculture farms nearby. Do your activities help maintain diverse ecosystems, protect natural habitats, or preserve plant/animal species?',
    weight: 1.3,
  },
  {
    id: 'tbl-ei-5',
    section: 'environmentalImpact',
    construct: 'environmentalHarm',
    question: 'Some of our production processes have negative environmental impacts we have not yet addressed',
    helpText: 'For example: A leather tanning workshop in Fez uses traditional chrome-based methods that discharge chemicals into local waterways — they know it is a problem but have not yet found an affordable alternative. Are there environmental impacts from your work (chemical use, water consumption, emissions, deforestation) that you are aware of but have not resolved?',
    weight: 1.2,
    reverse: true,
  },
  {
    id: 'tbl-ei-6',
    section: 'environmentalImpact',
    construct: 'traditionalEcology',
    question: 'We incorporate traditional ecological knowledge in our resource management',
    helpText: 'For example: An Alaskan salmon fishery follows indigenous seasonal harvest calendars and spawning-ground rest periods passed down for centuries — this traditional knowledge has kept salmon populations stable where modern fisheries have depleted them. Do you use ancestral knowledge about seasons, land management, or resource limits to guide how you source and produce?',
    weight: 1.4,
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
  totalQuestions: 18,
  sections: 3,
  estimatedMinutes: 8,
}

// TBL specific scoring weights (equal weight for true triple bottom line)
export const TBL_SECTION_WEIGHTS: Record<TBLSection, number> = {
  economicReturns: 0.333,
  socialImpact: 0.333,
  environmentalImpact: 0.334,
}

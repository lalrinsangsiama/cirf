// CISS - Cultural Innovation Sustainability Scorecard
// 17 questions across 4 sections: Economic, Cultural, Social, Environmental Sustainability
// Measures long-term viability — can your cultural enterprise survive and thrive for generations?
// Research alignment: captures WHEN cultural innovation creates LASTING resilience vs. short-term gains

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
    description: 'Will you still be in business in 10 years? Let\'s check the financial foundations.',
    estimatedMinutes: 2,
  },
  culturalSustainability: {
    label: 'Cultural Sustainability',
    shortLabel: 'Cultural',
    description: 'Will your traditions survive another generation? Let\'s see how well knowledge is being passed on.',
    estimatedMinutes: 2,
  },
  socialSustainability: {
    label: 'Social Sustainability',
    shortLabel: 'Social',
    description: 'Is your community stronger because of your work? Let\'s measure lasting social impact.',
    estimatedMinutes: 2,
  },
  environmentalSustainability: {
    label: 'Environmental Sustainability',
    shortLabel: 'Environment',
    description: 'Are you leaving the earth better than you found it? Let\'s check your long-term environmental path.',
    estimatedMinutes: 2,
  },
}

// Economic Sustainability questions (4 questions)
export const economicSustainabilityQuestions: CISSLikertQuestion[] = [
  {
    id: 'ciss-es-1',
    section: 'economicSustainability',
    construct: 'financialViability',
    question: 'Our business model generates sufficient revenue to cover all costs without relying on grants or donations',
    helpText: 'For example: A Ghanaian shea butter cooperative covers all operating costs — materials, wages, transport, marketing — from sales alone. Grants fund special projects but the core business runs independently. Can your enterprise pay all its bills from earned revenue?',
    weight: 1.5,
  },
  {
    id: 'ciss-es-2',
    section: 'economicSustainability',
    construct: 'pricingPower',
    question: 'We can maintain or increase our prices over time without losing customers',
    helpText: 'For example: A Japanese tea ceremony school raised lesson fees by 15% over three years and actually saw enrolment increase — their reputation for quality meant students valued the experience more, not less. When you raise prices, do customers stay? Is there a waiting list for your products or services?',
    weight: 1.2,
  },
  {
    id: 'ciss-es-3',
    section: 'economicSustainability',
    construct: 'investmentCapacity',
    question: 'We can invest in growth and improvement from our own earnings',
    helpText: 'For example: A Colombian coffee brand saved enough from profits over 18 months to fund a new roasting facility — no loans or grants needed. Can you fund equipment upgrades, staff training, product development, or market expansion from your own earnings?',
    weight: 1.3,
  },
  {
    id: 'ciss-es-4',
    section: 'economicSustainability',
    construct: 'economicResilience',
    question: 'We could survive at least 6 months of significantly reduced revenue',
    helpText: 'For example: A Balinese silver jewellery workshop survived 18 months of near-zero tourist sales during COVID because they had built up a reserve fund and could switch to online sales. If your revenue dropped by 50% tomorrow, how long could you keep operating?',
    weight: 1.4,
  },
]

// Cultural Sustainability questions (5 questions — includes 1 reverse-scored)
export const culturalSustainabilityQuestions: CISSLikertQuestion[] = [
  {
    id: 'ciss-cs-1',
    section: 'culturalSustainability',
    construct: 'knowledgeTransmission',
    question: 'Traditional knowledge is being actively passed to younger generations through structured programs',
    helpText: 'For example: A Navajo weaving family runs a formal 3-year apprenticeship where young weavers learn 12 traditional patterns, the cultural stories behind each one, and natural dyeing techniques — with a written curriculum and progress milestones. Do you have structured apprenticeships, youth workshops, school partnerships, or documented training programs?',
    weight: 1.5,
  },
  {
    id: 'ciss-cs-2',
    section: 'culturalSustainability',
    construct: 'practitionerPipeline',
    question: 'We have enough emerging practitioners to replace retiring masters',
    helpText: 'For example: A Rajasthani miniature painting school has 8 students aged 16-25 in various stages of training under 3 master painters — when the eldest master retires next year, two senior students are ready to lead workshops independently. Do you have young people in the pipeline who could carry on if experienced practitioners step back?',
    weight: 1.4,
  },
  {
    id: 'ciss-cs-3',
    section: 'culturalSustainability',
    construct: 'authenticityMaintenance',
    question: 'We maintain cultural authenticity even as we grow or reach new markets',
    helpText: 'For example: As a Thai silk brand expanded from local markets to international export, they kept every piece hand-woven on traditional looms — growth came from training more weavers, not mechanising. They declined a large hotel chain contract that required machine production. Have you maintained your core cultural methods and values despite commercial pressure to simplify or industrialise?',
    weight: 1.5,
  },
  {
    id: 'ciss-cs-4',
    section: 'culturalSustainability',
    construct: 'commercialPressure',
    question: 'Commercial demands have led us to produce items that feel less culturally authentic than we would like',
    helpText: 'For example: A Turkish ceramics workshop started mass-producing simplified designs for a hotel chain — the money was good, but the artisans felt the work no longer represented their tradition. The master potter worried they were becoming "a factory with a cultural label." Have business pressures pushed you toward products that feel less authentic or meaningful?',
    weight: 1.3,
    reverse: true,
  },
  {
    id: 'ciss-cs-5',
    section: 'culturalSustainability',
    construct: 'communityRelevance',
    question: 'Our cultural practices remain valued and relevant to the local community, not just outside buyers',
    helpText: 'For example: A Mizo bamboo craft enterprise sells 60% of its products to international buyers, but local families still commission special pieces for weddings and festivals — the craft remains a living part of community life, not just an export commodity. Do local people still value, use, and care about the cultural practices your enterprise is built on?',
    weight: 1.3,
  },
]

// Social Sustainability questions (4 questions)
export const socialSustainabilityQuestions: CISSLikertQuestion[] = [
  {
    id: 'ciss-ss-1',
    section: 'socialSustainability',
    construct: 'communityHealth',
    question: 'Our activities contribute measurably to community well-being',
    helpText: 'For example: Since a fair-trade coffee cooperative established itself in a Guatemalan village, child malnutrition rates have dropped 30%, school attendance has risen, and families report feeling more hopeful about the future — measurable improvements attributable to the steady income the cooperative provides. Can you point to specific ways your community is healthier, more educated, or more secure because of your enterprise?',
    weight: 1.4,
  },
  {
    id: 'ciss-ss-2',
    section: 'socialSustainability',
    construct: 'socialCohesion',
    question: 'Our work strengthens social bonds and reduces isolation in the community',
    helpText: 'For example: A Scottish Gaelic singing group that began as a cultural preservation project now functions as the main social gathering for elderly residents in remote Highland villages — participants report feeling less lonely and more connected. Does your work bring people together, create social connections, or reduce isolation?',
    weight: 1.2,
  },
  {
    id: 'ciss-ss-3',
    section: 'socialSustainability',
    construct: 'youthEngagement',
    question: 'Young people in our community are actively interested in and excited about cultural work',
    helpText: 'For example: After an Ethiopian coffee ceremony enterprise gained social media attention, local teenagers started posting about traditional coffee culture on TikTok — three have asked to become apprentice roasters. A decade ago, youth saw the tradition as outdated. Are young people in your community showing genuine interest in learning and participating in your cultural practices?',
    weight: 1.4,
  },
  {
    id: 'ciss-ss-4',
    section: 'socialSustainability',
    construct: 'equitableParticipation',
    question: 'Decision-making power and economic benefits are shared equitably among participants',
    helpText: 'For example: An Indian handloom cooperative ensures every weaver has one vote in general meetings, profit-sharing is proportional to contribution, and leadership roles rotate every two years — no single person or family dominates. Are benefits and decision-making power distributed fairly in your enterprise, or does a small group control most of the value?',
    weight: 1.3,
  },
]

// Environmental Sustainability questions (4 questions)
export const environmentalSustainabilityQuestions: CISSLikertQuestion[] = [
  {
    id: 'ciss-env-1',
    section: 'environmentalSustainability',
    construct: 'resourceStewardship',
    question: 'We manage natural resources in ways that ensure they will be available for future generations',
    helpText: 'For example: A Polynesian fishing cooperative follows ancestral rahui (seasonal closures) on specific reef areas, allowing fish stocks to recover — the practice has kept their fishery productive for centuries while neighbouring areas are depleted. Do you actively manage your resource use to ensure long-term availability?',
    weight: 1.5,
  },
  {
    id: 'ciss-env-2',
    section: 'environmentalSustainability',
    construct: 'ecologicalBalance',
    question: 'Our activities maintain or improve the health of local ecosystems',
    helpText: 'For example: A Rwandan bee-keeping cooperative that produces traditional honey wine has planted 10,000 indigenous flowering trees over 5 years — their apiaries are now surrounded by thriving pollinator habitat that benefits all farmers in the area. Are local ecosystems (water, soil, wildlife, plants) as healthy or healthier than before your enterprise began operating?',
    weight: 1.3,
  },
  {
    id: 'ciss-env-3',
    section: 'environmentalSustainability',
    construct: 'climateAdaptation',
    question: 'We have strategies to adapt our enterprise to changing environmental conditions',
    helpText: 'For example: A Bangladeshi jute craft producer, anticipating more frequent flooding, moved their storage facility to higher ground, developed waterproof packaging, and diversified their raw material sources to three different regions. Have you planned for climate-related risks like drought, flooding, extreme heat, or supply disruptions?',
    weight: 1.2,
  },
  {
    id: 'ciss-env-4',
    section: 'environmentalSustainability',
    construct: 'traditionalEcology',
    question: 'We use traditional ecological knowledge to guide sustainable resource management',
    helpText: 'For example: An Australian Aboriginal bush food enterprise follows indigenous seasonal harvest calendars that have sustained the land for 60,000 years — they only pick when elder knowledge says the plants are ready, ensuring regeneration. Do you draw on ancestral knowledge about seasons, land care, harvest timing, or resource limits?',
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
  totalQuestions: 17,
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

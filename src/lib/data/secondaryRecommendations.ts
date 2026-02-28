/**
 * Section-level recommendations for secondary assessments.
 *
 * Each section has tiered guidance based on score thresholds (0-40, 40-60, 60-80, 80-100).
 * These provide actionable feedback that makes secondary assessment results more valuable.
 */

interface SectionRecommendation {
  level: 'emerging' | 'developing' | 'established' | 'thriving'
  summary: string
  actions: string[]
}

interface SectionGuidance {
  [score: string]: SectionRecommendation // keyed by level
}

type AssessmentSectionRecommendations = Record<string, SectionGuidance>

function getRecommendation(score: number, guidance: SectionGuidance): SectionRecommendation {
  if (score >= 80) return guidance.thriving
  if (score >= 60) return guidance.established
  if (score >= 40) return guidance.developing
  return guidance.emerging
}

// CIMM - Cultural Innovation Measurement Matrix
const cimmGuidance: AssessmentSectionRecommendations = {
  innovationDepth: {
    emerging: {
      level: 'emerging',
      summary: 'Your innovations may be surface-level. Dig deeper into traditional knowledge.',
      actions: [
        'Interview elders about the deeper meaning behind techniques you use',
        'Map which traditional methods could solve modern problems',
      ],
    },
    developing: {
      level: 'developing',
      summary: 'You\'re beginning to integrate tradition and innovation. Keep building depth.',
      actions: [
        'Document the traditional knowledge embedded in each product',
        'Experiment with applying one ancestral technique to a new context',
      ],
    },
    established: {
      level: 'established',
      summary: 'Good integration of traditional knowledge with modern applications.',
      actions: [
        'Create a formal innovation process that always starts with cultural roots',
        'Mentor others on deep cultural innovation approaches',
      ],
    },
    thriving: {
      level: 'thriving',
      summary: 'Your innovations are deeply rooted in traditional knowledge. Excellent.',
      actions: [
        'Document your methodology as a model for others',
        'Explore even more ambitious cross-cultural innovation projects',
      ],
    },
  },
  culturalIntegrity: {
    emerging: {
      level: 'emerging',
      summary: 'Cultural meaning may be getting lost in your innovations. Time to reconnect.',
      actions: [
        'Establish a cultural review process for all new products',
        'Create guidelines for what elements are sacred vs. adaptable',
      ],
    },
    developing: {
      level: 'developing',
      summary: 'Some cultural integrity practices are in place. Strengthen the guardrails.',
      actions: [
        'Get formal community consent for commercial uses of cultural knowledge',
        'Train team members on cultural sensitivity in product development',
      ],
    },
    established: {
      level: 'established',
      summary: 'Strong cultural integrity practices. Community trusts your approach.',
      actions: [
        'Share your cultural integrity framework with peer organizations',
        'Conduct periodic audits to ensure standards are maintained at scale',
      ],
    },
    thriving: {
      level: 'thriving',
      summary: 'Outstanding cultural integrity. Your community is proud of your work.',
      actions: [
        'Advocate for cultural integrity standards in your industry',
        'Help establish certification or quality marks for culturally authentic products',
      ],
    },
  },
  economicImpact: {
    emerging: {
      level: 'emerging',
      summary: 'Innovation isn\'t translating to economic returns yet. Focus on value capture.',
      actions: [
        'Identify which innovations have the highest revenue potential',
        'Test pricing that reflects the cultural value you create',
      ],
    },
    developing: {
      level: 'developing',
      summary: 'Some economic returns emerging. Build on what\'s working.',
      actions: [
        'Double down on your most profitable innovation',
        'Track how innovation spending connects to revenue growth',
      ],
    },
    established: {
      level: 'established',
      summary: 'Innovations are generating solid economic returns.',
      actions: [
        'Ensure economic benefits are shared equitably with community',
        'Invest a portion of innovation profits into R&D for the next cycle',
      ],
    },
    thriving: {
      level: 'thriving',
      summary: 'Strong economic impact from cultural innovation. Well done.',
      actions: [
        'Create an impact report showing economic benefits to community',
        'Explore licensing or franchising successful innovation models',
      ],
    },
  },
  innovationVelocity: {
    emerging: {
      level: 'emerging',
      summary: 'Innovation cycles are slow. Build systems to speed up without losing quality.',
      actions: [
        'Create a simple idea-to-launch pipeline with clear stages',
        'Start a running list of innovation ideas to draw from',
      ],
    },
    developing: {
      level: 'developing',
      summary: 'Innovation pace is picking up. Systematize what works.',
      actions: [
        'Set a goal of testing one new idea per quarter',
        'Build a rapid prototyping capability for quick market testing',
      ],
    },
    established: {
      level: 'established',
      summary: 'Good innovation velocity with consistent output.',
      actions: [
        'Balance speed with quality — ensure fast iterations still meet cultural standards',
        'Build customer feedback loops to guide rapid iteration',
      ],
    },
    thriving: {
      level: 'thriving',
      summary: 'Excellent innovation velocity. You\'re consistently bringing ideas to market.',
      actions: [
        'Consider whether some experiments should be bolder and higher-risk',
        'Share your innovation process as a competitive advantage',
      ],
    },
  },
}

// CIRA - Cultural Innovation Readiness Assessment
const ciraGuidance: AssessmentSectionRecommendations = {
  culturalCapitalInventory: {
    emerging: {
      level: 'emerging',
      summary: 'Your cultural assets need documentation and protection.',
      actions: [
        'Create an inventory of all cultural assets (stories, techniques, materials, symbols)',
        'Prioritize preserving the most at-risk knowledge first',
      ],
    },
    developing: {
      level: 'developing',
      summary: 'Some cultural assets are documented. Keep building your inventory.',
      actions: [
        'Identify unique assets that competitors can\'t replicate',
        'Secure access to key materials and traditional resources',
      ],
    },
    established: {
      level: 'established',
      summary: 'Good cultural capital awareness. Your assets are well-documented.',
      actions: [
        'Develop strategies to monetize underutilized cultural assets',
        'Create backup and preservation systems for digital archives',
      ],
    },
    thriving: {
      level: 'thriving',
      summary: 'Rich cultural capital inventory with strong preservation.',
      actions: [
        'Explore which assets could be shared as educational content',
        'Consider formal IP protection for your most valuable assets',
      ],
    },
  },
  innovationEcosystem: {
    emerging: {
      level: 'emerging',
      summary: 'You\'re isolated. Build connections to unlock growth.',
      actions: [
        'Identify 3 potential mentors or advisors in cultural innovation',
        'Research available grants and funding for cultural enterprises',
      ],
    },
    developing: {
      level: 'developing',
      summary: 'Some support network exists. Fill the gaps.',
      actions: [
        'Seek partners with complementary skills (design, marketing, tech)',
        'Join or create a peer network of cultural innovators in your sector',
      ],
    },
    established: {
      level: 'established',
      summary: 'Good ecosystem support. Leverage it for growth.',
      actions: [
        'Deepen your most productive partnerships into strategic alliances',
        'Help connect newer cultural enterprises to the ecosystem',
      ],
    },
    thriving: {
      level: 'thriving',
      summary: 'Strong ecosystem. You\'re well-connected and well-supported.',
      actions: [
        'Consider becoming a mentor to emerging cultural innovators',
        'Advocate for better policy support for cultural enterprises',
      ],
    },
  },
  barriersAssessment: {
    emerging: {
      level: 'emerging',
      summary: 'Significant barriers are blocking your innovation. Address the biggest ones first.',
      actions: [
        'Identify your single biggest barrier and create a plan to address it',
        'Seek help — many barriers can be reduced through partnerships or training',
      ],
    },
    developing: {
      level: 'developing',
      summary: 'Some barriers remain but progress is possible.',
      actions: [
        'Prioritize overcoming skill gaps through targeted training',
        'Explore creative workarounds for resource constraints',
      ],
    },
    established: {
      level: 'established',
      summary: 'Most barriers are manageable. Keep reducing friction.',
      actions: [
        'Anticipate and prepare for barriers before they become problems',
        'Share barrier-reduction strategies with peers in similar situations',
      ],
    },
    thriving: {
      level: 'thriving',
      summary: 'Few barriers remain. Great foundation for ambitious innovation.',
      actions: [
        'Monitor for emerging barriers that could arise at scale',
        'Help others in your community navigate their barriers',
      ],
    },
  },
  readinessIndicators: {
    emerging: {
      level: 'emerging',
      summary: 'Not yet ready for ambitious innovation. Build the foundation first.',
      actions: [
        'Develop leadership capacity — identify and empower bridge leaders',
        'Start with small, low-risk innovation experiments to build confidence',
      ],
    },
    developing: {
      level: 'developing',
      summary: 'Getting ready. Some conditions are in place.',
      actions: [
        'Strengthen the weakest dimension of your readiness',
        'Create a clear innovation strategy with realistic milestones',
      ],
    },
    established: {
      level: 'established',
      summary: 'Good readiness for cultural innovation.',
      actions: [
        'Launch more ambitious innovation projects',
        'Build systems to track and learn from innovation outcomes',
      ],
    },
    thriving: {
      level: 'thriving',
      summary: 'Highly ready. You can pursue transformative cultural innovation.',
      actions: [
        'Set bold innovation goals that match your readiness level',
        'Share your readiness model as a template for peer communities',
      ],
    },
  },
}

// TBL - Triple Bottom Line Cultural Innovation
const tblGuidance: AssessmentSectionRecommendations = {
  economicReturns: {
    emerging: {
      level: 'emerging',
      summary: 'Economic returns are weak. Focus on building a viable business model.',
      actions: [
        'Review your pricing — many cultural enterprises undercharge',
        'Identify your most profitable activities and prioritize them',
      ],
    },
    developing: {
      level: 'developing',
      summary: 'Some economic traction. Build on what\'s generating revenue.',
      actions: [
        'Increase local sourcing to boost your economic multiplier effect',
        'Develop sustainable livelihood pathways for team members',
      ],
    },
    established: {
      level: 'established',
      summary: 'Solid economic performance. Ensure it\'s sustainable.',
      actions: [
        'Diversify revenue streams to reduce risk',
        'Measure and communicate your local economic impact',
      ],
    },
    thriving: {
      level: 'thriving',
      summary: 'Strong economic returns with broad community benefit.',
      actions: [
        'Create an annual economic impact report',
        'Explore how your model could be replicated in other communities',
      ],
    },
  },
  socialImpact: {
    emerging: {
      level: 'emerging',
      summary: 'Social impact is limited. Find ways to benefit the broader community.',
      actions: [
        'Identify one way your work could directly improve community wellbeing',
        'Create opportunities for marginalized groups to participate',
      ],
    },
    developing: {
      level: 'developing',
      summary: 'Growing social impact. Deepen your community engagement.',
      actions: [
        'Invest in skill development programs for community members',
        'Find ways to share benefits beyond your direct team',
      ],
    },
    established: {
      level: 'established',
      summary: 'Good social impact across multiple dimensions.',
      actions: [
        'Track and document social outcomes with simple metrics',
        'Engage young people to ensure intergenerational cultural transfer',
      ],
    },
    thriving: {
      level: 'thriving',
      summary: 'Excellent social impact. Your community is stronger because of your work.',
      actions: [
        'Share your social impact story to attract values-aligned partners',
        'Advocate for policies that support cultural enterprises with social missions',
      ],
    },
  },
  environmentalImpact: {
    emerging: {
      level: 'emerging',
      summary: 'Environmental practices need attention. Start with quick wins.',
      actions: [
        'Audit your materials and production for environmental hotspots',
        'Replace one unsustainable input with a sustainable alternative',
      ],
    },
    developing: {
      level: 'developing',
      summary: 'Some environmental awareness. Formalize your practices.',
      actions: [
        'Incorporate traditional ecological knowledge into your operations',
        'Set measurable environmental targets (waste reduction, energy use)',
      ],
    },
    established: {
      level: 'established',
      summary: 'Good environmental practices with room to lead.',
      actions: [
        'Communicate your environmental practices to customers — it\'s a selling point',
        'Explore regenerative practices that go beyond "doing no harm"',
      ],
    },
    thriving: {
      level: 'thriving',
      summary: 'Outstanding environmental stewardship. Tradition and sustainability align.',
      actions: [
        'Position your environmental practices as a competitive advantage',
        'Educate customers and peers about sustainable cultural production',
      ],
    },
  },
}

// CISS - Cultural Innovation Sustainability Scorecard
const cissGuidance: AssessmentSectionRecommendations = {
  economicSustainability: {
    emerging: {
      level: 'emerging',
      summary: 'Financial foundations are shaky. Prioritize business model viability.',
      actions: [
        'Ensure your pricing covers all costs including your own time',
        'Build a 3-month financial runway before investing in growth',
      ],
    },
    developing: {
      level: 'developing',
      summary: 'Business is surviving but not yet self-sustaining. Keep building.',
      actions: [
        'Test pricing increases — cultural products often have more pricing power than expected',
        'Reinvest a portion of profits into the business each quarter',
      ],
    },
    established: {
      level: 'established',
      summary: 'Financially healthy with capacity for investment.',
      actions: [
        'Build a 6-month financial buffer for resilience against downturns',
        'Plan strategic investments in growth from your own earnings',
      ],
    },
    thriving: {
      level: 'thriving',
      summary: 'Strong financial sustainability. Well-positioned for the long term.',
      actions: [
        'Consider creating an endowment or reserve fund for generational continuity',
        'Share your financial sustainability model with peer enterprises',
      ],
    },
  },
  culturalSustainability: {
    emerging: {
      level: 'emerging',
      summary: 'Cultural continuity is at risk. Act now to preserve and transmit knowledge.',
      actions: [
        'Start an apprenticeship or mentorship program immediately',
        'Document key cultural knowledge before it\'s lost',
      ],
    },
    developing: {
      level: 'developing',
      summary: 'Some cultural transmission happening. Build a stronger pipeline.',
      actions: [
        'Engage young people through creative, accessible entry points',
        'Create systems to maintain authenticity as you grow',
      ],
    },
    established: {
      level: 'established',
      summary: 'Cultural practices are being sustained and transmitted.',
      actions: [
        'Ensure your pipeline of new practitioners is robust enough',
        'Document your cultural sustainability practices as a model',
      ],
    },
    thriving: {
      level: 'thriving',
      summary: 'Excellent cultural sustainability. Traditions are alive and evolving.',
      actions: [
        'Support other communities facing cultural sustainability challenges',
        'Explore partnerships with academic institutions for research and documentation',
      ],
    },
  },
  socialSustainability: {
    emerging: {
      level: 'emerging',
      summary: 'Your work isn\'t yet creating broad social benefit. Find the connection.',
      actions: [
        'Identify how your cultural work can address a community need',
        'Engage young people — they\'re key to social sustainability',
      ],
    },
    developing: {
      level: 'developing',
      summary: 'Some social benefit emerging. Deepen your community roots.',
      actions: [
        'Strengthen community bonds through collaborative cultural activities',
        'Create pathways for young people to get meaningfully involved',
      ],
    },
    established: {
      level: 'established',
      summary: 'Your work is a positive force in the community.',
      actions: [
        'Measure and celebrate your social impact',
        'Ensure social benefits are distributed equitably',
      ],
    },
    thriving: {
      level: 'thriving',
      summary: 'Outstanding social sustainability. Community is thriving.',
      actions: [
        'Help neighboring communities build similar social sustainability',
        'Create a social impact report to attract values-aligned support',
      ],
    },
  },
  environmentalSustainability: {
    emerging: {
      level: 'emerging',
      summary: 'Environmental practices need improvement. Traditional wisdom can help.',
      actions: [
        'Consult elders about traditional ecological practices you could adopt',
        'Identify your biggest environmental impact and address it first',
      ],
    },
    developing: {
      level: 'developing',
      summary: 'Some environmental awareness. Integrate traditional ecological knowledge.',
      actions: [
        'Develop strategies to adapt to changing environmental conditions',
        'Ensure your resource use is sustainable for the next generation',
      ],
    },
    established: {
      level: 'established',
      summary: 'Good environmental practices grounded in tradition.',
      actions: [
        'Share your traditional ecological practices as an educational resource',
        'Plan for long-term environmental changes that could affect your materials',
      ],
    },
    thriving: {
      level: 'thriving',
      summary: 'Excellent integration of traditional ecology and modern sustainability.',
      actions: [
        'Advocate for policy recognition of traditional ecological knowledge',
        'Partner with environmental organizations to amplify your impact',
      ],
    },
  },
}

// Pricing Assessment
const pricingGuidance: AssessmentSectionRecommendations = {
  costAnalysis: {
    emerging: {
      level: 'emerging',
      summary: 'You may not fully understand your costs. This is critical to fix.',
      actions: [
        'Track every cost for one full production cycle — materials, time, overhead',
        'Include your own labor at a fair market rate, not free',
      ],
    },
    developing: {
      level: 'developing',
      summary: 'Basic cost awareness but gaps remain.',
      actions: [
        'Identify hidden costs you might be absorbing (packaging, shipping, admin)',
        'Calculate your true hourly rate including all overhead',
      ],
    },
    established: {
      level: 'established',
      summary: 'Good understanding of your cost structure.',
      actions: [
        'Look for cost efficiencies that don\'t compromise quality',
        'Regularly update your cost calculations as prices change',
      ],
    },
    thriving: {
      level: 'thriving',
      summary: 'Excellent cost awareness. Your pricing decisions are well-informed.',
      actions: [
        'Use your cost clarity to optimize profit margins strategically',
        'Help other cultural producers understand their true costs',
      ],
    },
  },
  valueProposition: {
    emerging: {
      level: 'emerging',
      summary: 'Your cultural value story isn\'t translating to pricing power.',
      actions: [
        'Articulate what makes your work unique — the story, the skill, the heritage',
        'Study how premium cultural brands communicate their value',
      ],
    },
    developing: {
      level: 'developing',
      summary: 'Some value communication in place. Strengthen the narrative.',
      actions: [
        'Create compelling origin and process stories for each product',
        'Test whether customers will pay more when they understand the cultural value',
      ],
    },
    established: {
      level: 'established',
      summary: 'Good value communication that supports pricing.',
      actions: [
        'Build certificates of authenticity or provenance documentation',
        'Develop tiered offerings that capture different value segments',
      ],
    },
    thriving: {
      level: 'thriving',
      summary: 'Exceptional value proposition. Customers understand and pay for cultural value.',
      actions: [
        'Explore premium channels (galleries, high-end retail, direct to collector)',
        'Consider limited editions or exclusive experiences at even higher price points',
      ],
    },
  },
  marketPositioning: {
    emerging: {
      level: 'emerging',
      summary: 'You may be competing on price when you should compete on value.',
      actions: [
        'Research your competitive landscape — where do you sit?',
        'Identify the customer segment that values cultural authenticity most',
      ],
    },
    developing: {
      level: 'developing',
      summary: 'Starting to find your market position. Keep refining.',
      actions: [
        'Test different price points with different customer segments',
        'Develop a clear positioning statement for your brand',
      ],
    },
    established: {
      level: 'established',
      summary: 'Good market positioning with clear differentiation.',
      actions: [
        'Monitor competitors and ensure your positioning stays distinctive',
        'Expand into new channels that match your positioning',
      ],
    },
    thriving: {
      level: 'thriving',
      summary: 'Excellent market positioning. Strong brand with pricing power.',
      actions: [
        'Use your position to set industry pricing standards',
        'Mentor others on effective cultural product positioning',
      ],
    },
  },
  priceOptimization: {
    emerging: {
      level: 'emerging',
      summary: 'You\'re likely underpricing. Most cultural producers do.',
      actions: [
        'Raise your prices by 10-20% and measure the impact on sales',
        'Ask customers what they think your products are worth — you may be surprised',
      ],
    },
    developing: {
      level: 'developing',
      summary: 'Pricing is getting closer to optimal. Fine-tune it.',
      actions: [
        'Experiment with bundling, seasonal pricing, or tiered options',
        'Track how price changes affect both volume and total revenue',
      ],
    },
    established: {
      level: 'established',
      summary: 'Pricing is well-calibrated for your market.',
      actions: [
        'Plan annual price increases that match or exceed inflation',
        'Develop premium product lines that capture additional value',
      ],
    },
    thriving: {
      level: 'thriving',
      summary: 'Optimal pricing that captures the full value you create.',
      actions: [
        'Share your pricing strategy insights with the cultural enterprise community',
        'Explore new pricing models (subscriptions, experiences, licensing)',
      ],
    },
  },
}

// Main export: get recommendations for a section
export function getSectionRecommendation(
  assessmentType: string,
  sectionId: string,
  score: number
): SectionRecommendation | null {
  const guidanceMap: Record<string, AssessmentSectionRecommendations> = {
    cimm: cimmGuidance,
    cira: ciraGuidance,
    tbl: tblGuidance,
    ciss: cissGuidance,
    pricing: pricingGuidance,
  }

  const assessmentGuidance = guidanceMap[assessmentType]
  if (!assessmentGuidance) return null

  const sectionGuidance = assessmentGuidance[sectionId]
  if (!sectionGuidance) return null

  return getRecommendation(score, sectionGuidance)
}

export type { SectionRecommendation }

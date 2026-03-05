// Resources Configuration
// Defines downloadable PDF resources and their unlock requirements
// Each assessment completion grants access to specific resources

export interface ResourceConfig {
  id: string
  title: string
  fullTitle: string
  description: string
  format: 'PDF' | 'Excel' | 'Word' | 'ZIP'
  size: string
  storagePath: string // Path in Supabase storage
  unlockRequirement: 'cil' | 'cimm' | 'cira' | 'tbl' | 'ciss' | 'pricing' | 'auth' | 'public'
  toolAccessId: string // Used in tool_access table with 'resource-' prefix
  category: 'guides' | 'frameworks' | 'templates' | 'workbooks' | 'research' | 'data'
  features: string[] // Key features/contents of the resource
  isPremiumUpsell?: boolean // True if this is a teaser for a paid product
}

// ============================================
// CIL COMPLETION RESOURCES (2 resources)
// These are the first rewards — high-value, broadly useful
// ============================================
const cilResources: ResourceConfig[] = [
  {
    id: 'funding-guide-2026',
    title: 'Global Funding Guide 2026',
    fullTitle: 'CIL Global Funding Guide for Cultural Entrepreneurs 2026',
    description: 'Comprehensive guide to funding opportunities for cultural innovation ventures worldwide, including grants, impact investors, and alternative financing.',
    format: 'PDF',
    size: '789 KB',
    storagePath: 'CIL-Global-Funding-Guide-2026.pdf',
    unlockRequirement: 'cil',
    toolAccessId: 'resource-funding-guide-2026',
    category: 'guides',
    features: [
      '200+ funding sources across 6 continents',
      'Application templates and tips',
      'Cultural sector-specific eligibility criteria',
      'Quarterly update schedule',
    ],
  },
  {
    id: 'creative-reconstruction',
    title: 'Creative Reconstruction Framework',
    fullTitle: 'CIL Creative Reconstruction Framework',
    description: 'Our foundational framework for building sustainable cultural enterprises that preserve heritage while creating economic value.',
    format: 'PDF',
    size: '159 KB',
    storagePath: 'CIL-Creative-Reconstruction-Framework.pdf',
    unlockRequirement: 'cil',
    toolAccessId: 'resource-creative-reconstruction',
    category: 'frameworks',
    features: [
      'Step-by-step implementation guide',
      'Case study examples from 12 countries',
      'Worksheets and planning templates',
      'Assessment rubrics for self-evaluation',
    ],
  },
]

// ============================================
// CIMM COMPLETION RESOURCE
// For innovators who want to go deeper on tradition + modernity
// ============================================
const cimmResources: ResourceConfig[] = [
  {
    id: 'cultural-innovation-playbook',
    title: 'Cultural Innovation Playbook',
    fullTitle: 'The Cultural Innovation Playbook: 20 Strategies for Blending Tradition with Modern Markets',
    description: 'Practical strategies and real-world case studies showing how cultural enterprises have successfully innovated without losing authenticity. Includes templates for ideation, testing, and launch.',
    format: 'PDF',
    size: '184 KB',
    storagePath: 'CIL-Cultural-Innovation-Playbook.pdf',
    unlockRequirement: 'cimm',
    toolAccessId: 'resource-cultural-innovation-playbook',
    category: 'guides',
    features: [
      '20 proven innovation strategies with cultural examples',
      'Innovation canvas template for cultural products',
      'Case studies from 15 countries and 10 sectors',
      'Cultural integrity checklist for new product development',
      'Go-to-market timeline template',
    ],
  },
]

// ============================================
// CIRA COMPLETION RESOURCE
// For enterprises assessing what's blocking them
// ============================================
const ciraResources: ResourceConfig[] = [
  {
    id: 'readiness-action-plan',
    title: 'Innovation Readiness Action Plan',
    fullTitle: 'Innovation Readiness Action Plan: From Assessment to Action',
    description: 'Turn your CIRA barrier scores into a concrete 90-day action plan. Includes prioritisation frameworks, resource mapping worksheets, and milestone trackers.',
    format: 'PDF',
    size: '400 KB',
    storagePath: 'CIL-Innovation-Readiness-Action-Plan.pdf',
    unlockRequirement: 'cira',
    toolAccessId: 'resource-readiness-action-plan',
    category: 'templates',
    features: [
      '90-day action plan template with milestones',
      'Barrier prioritisation matrix',
      'Resource mapping worksheet (skills, funding, partners)',
      'Skill gap analysis and training planner',
      'Cultural appropriation risk assessment checklist',
    ],
  },
]

// ============================================
// TBL COMPLETION RESOURCE
// For enterprises that need to prove impact to funders
// ============================================
const tblResources: ResourceConfig[] = [
  {
    id: 'impact-report-template',
    title: 'Impact Report Template',
    fullTitle: 'Cultural Enterprise Impact Report Template: Tell Your Story to Funders and Stakeholders',
    description: 'A professional, customisable impact report template designed specifically for cultural enterprises. Pre-built sections for economic, social, and environmental impact with data visualisation guides.',
    format: 'PDF',
    size: '408 KB',
    storagePath: 'CIL-Impact-Report-Template.pdf',
    unlockRequirement: 'tbl',
    toolAccessId: 'resource-impact-report-template',
    category: 'templates',
    features: [
      'Editable Word template with professional layout',
      'Pre-written sections for economic, social, and environmental impact',
      'Data visualisation suggestions for each metric',
      'Grant application language bank (50+ phrases)',
      'Real example from a funded cultural enterprise',
    ],
  },
]

// ============================================
// CISS COMPLETION RESOURCE
// For enterprises thinking about long-term survival
// ============================================
const cissResources: ResourceConfig[] = [
  {
    id: 'sustainability-succession-guide',
    title: 'Sustainability & Succession Guide',
    fullTitle: 'Building to Last: Sustainability & Succession Planning for Cultural Enterprises',
    description: 'A step-by-step guide for ensuring your cultural enterprise thrives across generations. Covers knowledge transfer, leadership transition, financial planning, and cultural continuity.',
    format: 'PDF',
    size: '875 KB',
    storagePath: 'CIL-Sustainability-Succession-Guide.pdf',
    unlockRequirement: 'ciss',
    toolAccessId: 'resource-sustainability-succession-guide',
    category: 'guides',
    features: [
      'Succession planning timeline and checklist',
      'Knowledge transfer documentation templates',
      'Apprenticeship program design guide',
      'Financial sustainability stress-test worksheet',
      'Case studies of multi-generational cultural enterprises',
    ],
  },
]

// ============================================
// PRICING COMPLETION RESOURCE
// For enterprises that need to stop undercharging
// ============================================
const pricingResources: ResourceConfig[] = [
  {
    id: 'pricing-strategy-workbook',
    title: 'Cultural Pricing Strategy Workbook',
    fullTitle: 'Price What You\'re Worth: The Cultural Entrepreneur\'s Pricing Workbook',
    description: 'Interactive workbook with exercises to calculate your true costs, quantify your cultural premium, research your market, and set prices that honour your craft and sustain your business.',
    format: 'PDF',
    size: '150 KB',
    storagePath: 'CIL-Pricing-Strategy-Workbook.pdf',
    unlockRequirement: 'pricing',
    toolAccessId: 'resource-pricing-strategy-workbook',
    category: 'workbooks',
    features: [
      'Full cost calculation worksheet (direct + hidden costs)',
      'Cultural premium calculator with industry benchmarks',
      'Competitive analysis template',
      'Price testing experiment guide',
      'Tiered pricing strategy builder',
      'Scripts for communicating price increases to customers',
    ],
  },
]

// ============================================
// PREMIUM UPSELL RESOURCES (teasers for paid products)
// Shown as "locked" after all free assessments are complete
// ============================================
const premiumResources: ResourceConfig[] = [
  {
    id: 'market-entry-masterclass',
    title: 'Global Market Entry Masterclass',
    fullTitle: 'From Local to Global: Market Entry Masterclass for Cultural Products',
    description: 'Video course + workbook covering export logistics, international marketing, cultural positioning for global audiences, and e-commerce setup for cultural products.',
    format: 'PDF',
    size: '1.1 MB',
    storagePath: 'premium/CIL-Market-Entry-Masterclass.pdf',
    unlockRequirement: 'pricing', // Shown after pricing completion as upsell
    toolAccessId: 'resource-market-entry-masterclass',
    category: 'guides',
    isPremiumUpsell: true,
    features: [
      '6-module video course (4 hours total)',
      'Export logistics checklist by country',
      'International marketplace comparison (Etsy, Amazon Handmade, Novica, etc.)',
      'Cultural storytelling for global audiences workbook',
      'Shipping and customs guide for handmade goods',
    ],
  },
  {
    id: 'cultural-brand-toolkit',
    title: 'Cultural Brand Building Toolkit',
    fullTitle: 'Heritage to Brand: The Complete Cultural Brand Building Toolkit',
    description: 'Everything you need to build a compelling brand around your cultural enterprise — logo guidance, storytelling frameworks, social media templates, and photography direction.',
    format: 'PDF',
    size: '376 KB',
    storagePath: 'premium/CIL-Cultural-Brand-Toolkit.pdf',
    unlockRequirement: 'cimm', // Shown after CIMM completion as upsell
    toolAccessId: 'resource-cultural-brand-toolkit',
    category: 'workbooks',
    isPremiumUpsell: true,
    features: [
      'Brand story canvas and writing templates',
      '50 Instagram post templates (Canva-editable)',
      'Product photography shot list and lighting guide',
      'Cultural storytelling framework for social media',
      'Packaging design inspiration gallery',
    ],
  },
  {
    id: 'grant-writing-toolkit',
    title: 'Grant Writing Toolkit for Cultural Projects',
    fullTitle: 'Funded: The Cultural Entrepreneur\'s Grant Writing Toolkit',
    description: 'Proven templates and frameworks for writing successful grant applications, including real winning proposals from cultural enterprises.',
    format: 'PDF',
    size: '737 KB',
    storagePath: 'premium/CIL-Grant-Writing-Toolkit.pdf',
    unlockRequirement: 'tbl', // Shown after TBL as upsell (impact metrics help grant writing)
    toolAccessId: 'resource-grant-writing-toolkit',
    category: 'templates',
    isPremiumUpsell: true,
    features: [
      '5 real winning grant proposals (anonymised) with annotations',
      'Logic model template for cultural projects',
      'Budget template with cultural cost categories',
      'Impact measurement framework for grant reporting',
      'List of 50 cultural-specific grant opportunities',
    ],
  },
]

// All resources combined
export const UNLOCKABLE_RESOURCES: ResourceConfig[] = [
  ...cilResources,
  ...cimmResources,
  ...ciraResources,
  ...tblResources,
  ...cissResources,
  ...pricingResources,
  ...premiumResources,
]

// Helper functions
export function getUnlockableResources(): ResourceConfig[] {
  return UNLOCKABLE_RESOURCES.filter(r => !r.isPremiumUpsell)
}

export function getPremiumResources(): ResourceConfig[] {
  return UNLOCKABLE_RESOURCES.filter(r => r.isPremiumUpsell)
}

export function getResourceById(id: string): ResourceConfig | undefined {
  return UNLOCKABLE_RESOURCES.find(r => r.id === id)
}

export function getResourceByToolAccessId(toolAccessId: string): ResourceConfig | undefined {
  return UNLOCKABLE_RESOURCES.find(r => r.toolAccessId === toolAccessId)
}

export function getResourcesByAssessment(assessmentType: string): ResourceConfig[] {
  return UNLOCKABLE_RESOURCES.filter(
    r => r.unlockRequirement === assessmentType && !r.isPremiumUpsell
  )
}

export function getResourcesUnlockedByCIL(): ResourceConfig[] {
  return UNLOCKABLE_RESOURCES.filter(r => r.unlockRequirement === 'cil')
}

// Get all resource tool access IDs for a given assessment
export function getResourceToolAccessIds(assessmentType: string): string[] {
  return UNLOCKABLE_RESOURCES
    .filter(r => r.unlockRequirement === assessmentType && !r.isPremiumUpsell)
    .map(r => r.toolAccessId)
}

// Legacy alias
export function getCILResourceToolAccessIds(): string[] {
  return getResourceToolAccessIds('cil')
}

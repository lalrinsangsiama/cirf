// Resources Configuration
// Defines downloadable PDF resources and their unlock requirements

export interface ResourceConfig {
  id: string
  title: string
  fullTitle: string
  description: string
  format: 'PDF' | 'Excel' | 'Word' | 'ZIP'
  size: string
  storagePath: string // Path in Supabase storage
  unlockRequirement: 'cirf' | 'auth' | 'public' // cirf = requires CIRF completion, auth = requires login, public = no requirement
  toolAccessId: string // Used in tool_access table with 'resource-' prefix
  category: 'guides' | 'frameworks' | 'research' | 'data'
  features: string[] // Key features/contents of the resource
}

export const UNLOCKABLE_RESOURCES: ResourceConfig[] = [
  {
    id: 'funding-guide-2026',
    title: 'Global Funding Guide 2026',
    fullTitle: 'CIL Global Funding Guide for Cultural Entrepreneurs 2026',
    description: 'Comprehensive guide to funding opportunities for cultural innovation ventures worldwide, including grants, impact investors, and alternative financing.',
    format: 'PDF',
    size: '4.2 MB',
    storagePath: 'CIL-Global-Funding-Guide-2026.pdf',
    unlockRequirement: 'cirf',
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
    size: '3.8 MB',
    storagePath: 'CIL-Creative-Reconstruction-Framework.pdf',
    unlockRequirement: 'cirf',
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

// Helper functions
export function getUnlockableResources(): ResourceConfig[] {
  return UNLOCKABLE_RESOURCES
}

export function getResourceById(id: string): ResourceConfig | undefined {
  return UNLOCKABLE_RESOURCES.find(r => r.id === id)
}

export function getResourceByToolAccessId(toolAccessId: string): ResourceConfig | undefined {
  return UNLOCKABLE_RESOURCES.find(r => r.toolAccessId === toolAccessId)
}

export function getResourcesUnlockedByCIRF(): ResourceConfig[] {
  return UNLOCKABLE_RESOURCES.filter(r => r.unlockRequirement === 'cirf')
}

// Get all resource tool access IDs (for granting on CIRF completion)
export function getCIRFResourceToolAccessIds(): string[] {
  return UNLOCKABLE_RESOURCES
    .filter(r => r.unlockRequirement === 'cirf')
    .map(r => r.toolAccessId)
}

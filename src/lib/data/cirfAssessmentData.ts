// ── CIRF Self-Assessment: 16 questions across 4 pillars ──

export interface CIRFQuestion {
  id: string
  text: string
  pillar: number
}

export interface CIRFPillar {
  id: number
  title: string
  shortTitle: string
  color: string
  icon: string
  questions: CIRFQuestion[]
}

export const SCALE_LABELS = [
  { value: 1, label: 'Not Present' },
  { value: 2, label: 'Emerging' },
  { value: 3, label: 'Developing' },
  { value: 4, label: 'Established' },
  { value: 5, label: 'Leading' },
]

export const CIRF_PILLARS: CIRFPillar[] = [
  {
    id: 1,
    title: 'Economic Value Creation',
    shortTitle: 'Economic Value',
    color: '#1A8A7D',
    icon: '📈',
    questions: [
      { id: 'q1', text: 'A clear revenue model exists and is generating income from cultural assets', pillar: 1 },
      { id: 'q2', text: 'The initiative creates measurable employment or livelihood opportunities', pillar: 1 },
      { id: 'q3', text: 'There are multiplier effects in related sectors (tourism, agriculture, retail, etc.)', pillar: 1 },
      { id: 'q4', text: 'Revenue sources are diversified beyond a single market or channel', pillar: 1 },
    ],
  },
  {
    id: 2,
    title: 'Cultural Integrity & Authenticity',
    shortTitle: 'Cultural Integrity',
    color: '#D4A843',
    icon: '🛡️',
    questions: [
      { id: 'q5', text: 'Intellectual property protections are in place for the cultural assets involved', pillar: 2 },
      { id: 'q6', text: 'The originating community retains governance control over how heritage is used', pillar: 2 },
      { id: 'q7', text: 'An authenticity certification or verification system exists', pillar: 2 },
      { id: 'q8', text: 'Cultural appropriation risks have been assessed and mitigation measures are active', pillar: 2 },
    ],
  },
  {
    id: 3,
    title: 'Adaptability & Sustainability',
    shortTitle: 'Adaptability',
    color: '#E07A5F',
    icon: '🔄',
    questions: [
      { id: 'q9', text: 'Digital platforms are actively used for distribution, sales, or audience engagement', pillar: 3 },
      { id: 'q10', text: 'The business model blends traditional practices with modern commercial approaches', pillar: 3 },
      { id: 'q11', text: 'Knowledge and skills are being actively transferred to the next generation', pillar: 3 },
      { id: 'q12', text: 'The initiative can withstand and adapt to external shocks (economic, environmental, technological)', pillar: 3 },
    ],
  },
  {
    id: 4,
    title: 'Social Empowerment & Inclusion',
    shortTitle: 'Social Empowerment',
    color: '#0D1B2A',
    icon: '🤝',
    questions: [
      { id: 'q13', text: 'Marginalised, rural, or indigenous communities meaningfully participate and benefit', pillar: 4 },
      { id: 'q14', text: 'Women and youth are actively included as participants and decision-makers', pillar: 4 },
      { id: 'q15', text: 'Participants report expanded agency, capability, and cultural expression', pillar: 4 },
      { id: 'q16', text: 'Economic benefits are distributed equitably rather than captured by elites or intermediaries', pillar: 4 },
    ],
  },
]

// ── Interpretation ──

export function getOverallLabel(total: number): { label: string; color: string } {
  if (total >= 64) return { label: 'Strong', color: '#1A8A7D' }
  if (total >= 48) return { label: 'Good Progress', color: '#D4A843' }
  if (total >= 32) return { label: 'Emerging', color: '#E07A5F' }
  return { label: 'Early Stage', color: '#c0392b' }
}

export function getPillarInterpretation(score: number): { level: string; description: string } {
  if (score >= 17) return { level: 'Leading', description: 'This pillar is a strength. Focus on maintaining and sharing your model.' }
  if (score >= 13) return { level: 'Established', description: 'Solid foundation with room for optimisation.' }
  if (score >= 9) return { level: 'Developing', description: 'Core elements exist but need strengthening.' }
  if (score >= 5) return { level: 'Emerging', description: 'Significant gaps. Prioritise building institutional infrastructure.' }
  return { level: 'Critical', description: 'This pillar needs foundational work before scaling.' }
}

// ── Recommendations based on weakest pillar ──

// NOTE (cil-cleanup-pass): Specific case-study figures were softened to general
// principles while the underlying case studies are being re-verified. Restore
// concrete examples here once the cases are confirmed.
export const RECOMMENDATIONS: Record<number, string[]> = {
  1: [
    'Map your full value chain — cultural innovation often generates hidden economic value through tourism multipliers, supply chain effects, and brand premiums that aren\'t being tracked.',
    'Targeted public or institutional investment in cultural-enterprise infrastructure — distribution, training, and market access — can produce outsized economic returns relative to its cost.',
    'Explore Geographic Indication (GI) or quality-certification systems that command premium pricing — institutional authenticity verification tends to increase the market value of cultural products.',
  ],
  2: [
    'IP protection is foundational. Systematic documentation of traditional knowledge, combined with coordinated patent-office agreements, can protect cultural assets at scale.',
    'Establish community governance protocols before scaling commercially. Community-owned enterprise structures are among the strongest safeguards against exploitation.',
    'Consider GI registration with provenance traceability (for example, QR-code verification) — a replicable model for any cultural product with geographic specificity.',
  ],
  3: [
    'Digital presence is no longer optional. Even grassroots and indigenous communities can leverage digital tools for cultural preservation and market access.',
    'Intergenerational knowledge transfer is the most critical sustainability risk — craft sectors can lose much of their market value when apprenticeship pipelines are not maintained.',
    'Build hybrid business models that blend traditional production with modern distribution, connecting rural producers to wider markets through e-commerce.',
  ],
  4: [
    'Design for inclusion from day one, not as an afterthought — revenue mechanisms can be structured so that tourism and cultural income fund shared public benefit.',
    'Examine who captures economic value in your initiative. Commercial success can concentrate among elites unless empowerment mechanisms are deliberately embedded.',
    'Women-led and youth-led cultural enterprises show strong empowerment outcomes — sectors with high female participation can become powerful vehicles for gender economic empowerment.',
  ],
}

// ── Role options ──

export const ROLE_OPTIONS = [
  'Cultural Entrepreneur',
  'Policymaker',
  'Academic',
  'NGO Professional',
  'Investor',
  'Consultant',
  'Other',
]

export const SECTOR_OPTIONS = [
  'Textiles & Fashion',
  'Food & Gastronomy',
  'Performing Arts & Music',
  'Visual Arts & Crafts',
  'Heritage Tourism',
  'Traditional Knowledge',
  'Digital Heritage',
  'Cultural Policy',
  'Other',
]

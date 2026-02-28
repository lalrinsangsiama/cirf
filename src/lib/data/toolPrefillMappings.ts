/**
 * Mappings from assessment section scores to tool calculator inputs.
 *
 * Only tools with slider inputs that correspond to assessment sections are mapped.
 * Assessment section scores (0-100) are scaled to the tool's input range (typically 1-10).
 */

export interface PrefillMapping {
  assessmentType: string
  inputMappings: Record<string, string> // toolInputId → assessmentSectionId
}

/**
 * Maps tool IDs to their assessment section score prefill mappings.
 * Only includes tools where assessment scores meaningfully correspond to calculator inputs.
 */
export const TOOL_PREFILL_MAPPINGS: Record<string, PrefillMapping> = {
  'innovation-readiness-calculator': {
    assessmentType: 'cira',
    inputMappings: {
      leadership: 'readinessIndicators',
      identity: 'culturalCapitalInventory',
      flexibility: 'innovationEcosystem',
      safety: 'barriersAssessment',
    },
  },
  'sustainability-scorecard': {
    assessmentType: 'ciss',
    inputMappings: {
      economic: 'economicSustainability',
      cultural: 'culturalSustainability',
      social: 'socialSustainability',
      environmental: 'environmentalSustainability',
    },
  },
  'tbl-calculator': {
    assessmentType: 'tbl',
    inputMappings: {
      socialImpact: 'socialImpact',
      environmentalImpact: 'environmentalImpact',
      // economicReturn is currency — can't prefill from Likert scores
    },
  },
}

/**
 * Convert assessment section score (0-100) to tool input value.
 * Tool sliders are 1-10, so we scale proportionally.
 */
export function scaleScoreToInput(score: number, min: number, max: number): number {
  const scaled = min + (score / 100) * (max - min)
  return Math.round(Math.min(max, Math.max(min, scaled)))
}

import type {
  SurveyScreen,
  SurveySection,
  SectionInfo,
} from '@/lib/survey/types'

// ── Section metadata ──

export const SURVEY_SECTIONS: SectionInfo[] = [
  { id: 'consent', title: 'Welcome', estimatedMinutes: 1 },
  { id: 'profile', title: 'Section A: Respondent Profile', subtitle: 'Your professional context', estimatedMinutes: 2 },
  { id: 'definition', title: 'Section B: Definition & Scope', subtitle: 'Evaluating the proposed definition of cultural innovation', estimatedMinutes: 3 },
  { id: 'pillars', title: 'Section C: Framework Pillars', subtitle: 'Evaluating the four CIRF pillars', estimatedMinutes: 10 },
  { id: 'barriers', title: 'Section D: Barriers & Enablers', subtitle: 'Obstacles and success factors', estimatedMinutes: 4 },
  { id: 'metrics', title: 'Section E: Metrics & Implementation', subtitle: 'Measuring cultural innovation', estimatedMinutes: 3 },
  { id: 'reflections', title: 'Final Reflections', estimatedMinutes: 2 },
]

// ── Likert 1-5 scale (reused across all matrix questions) ──

const LIKERT_5_SCALE = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' },
]

const USEFULNESS_5_SCALE = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
]

// ── All screens ──

export const SURVEY_SCREENS: SurveyScreen[] = [
  // ═══════════════════════════════════════════
  // SCREEN 0: Informed Consent
  // ════════════════════��══════════════════════
  {
    id: 0,
    section: 'consent',
    introContent: {
      title: 'Expert Validation Questionnaire',
      body: `Thank you for agreeing to participate in this expert validation study. Your professional expertise is invaluable to this research, which seeks to develop the Cultural Innovation Resilience Framework (CIRF) — the first integrated, scalable framework for positioning cultural innovation as a strategic driver of economic resilience.

Cultural innovation — the strategic transformation of cultural heritage, traditions, and community knowledge into viable economic opportunities — is a growing global phenomenon. Yet it lacks formal definition, a unified framework, and standardised metrics. This study addresses these gaps.

You have been selected as an expert based on your professional experience in cultural innovation, cultural entrepreneurship, creative economy policy, heritage management, or a related field. This questionnaire asks you to evaluate the proposed framework — its definition, pillars, indicators, and practical applicability. Your candid feedback will directly shape the final CIRF.

Your participation is entirely voluntary. You may skip any question or withdraw at any time. All responses are anonymised; your name will not appear in the thesis unless you provide explicit written permission. Data is stored securely and used solely for this academic research.`,
      highlight: 'Estimated Completion Time: 20–25 minutes',
    },
    questions: [
      {
        id: 'consent',
        section: 'consent',
        type: 'consent',
        label: 'Informed Consent',
        required: true,
        consentText: 'I confirm that I have read the above information and consent to participate in this study.',
      },
    ],
  },

  // ══════════════════════��════════════════════
  // SCREEN 1: Q1 + Q2 (Profile)
  // ═══════════════════════��═══════════════════
  {
    id: 1,
    section: 'profile',
    sectionLabel: 'Section A: Respondent Profile',
    questions: [
      {
        id: 'q1',
        section: 'profile',
        type: 'single-select',
        label: 'What is your primary professional role?',
        helpText: 'Please select the option that best describes your current position.',
        required: true,
        hasOther: true,
        conditionalTextOn: 'other',
        options: [
          { value: 'cultural_entrepreneur', label: 'Cultural entrepreneur / creative business owner' },
          { value: 'government_policymaker', label: 'Government policymaker or public sector official (culture, economy, or trade)' },
          { value: 'academic_researcher', label: 'Academic researcher or university faculty' },
          { value: 'ngo_professional', label: 'NGO / development organisation professional' },
          { value: 'investor_funder', label: 'Investor, funder, or financial institution professional' },
          { value: 'consultant_advisor', label: 'Consultant or advisor (cultural strategy, creative economy)' },
          { value: 'other', label: 'Other' },
        ],
      },
      {
        id: 'q2',
        section: 'profile',
        type: 'single-select',
        label: 'How many years of professional experience do you have in the cultural innovation, creative economy, or heritage management space?',
        required: true,
        hasOther: false,
        options: [
          { value: 'less_than_3', label: 'Less than 3 years' },
          { value: '3_5', label: '3–5 years' },
          { value: '6_10', label: '6–10 years' },
          { value: '11_20', label: '11–20 years' },
          { value: 'more_than_20', label: 'More than 20 years' },
        ],
      },
    ],
  },

  // ═══════��═══════════════════════════════════
  // SCREEN 2: Q3 + Q4 (Profile continued)
  // ═══════════════════════════════════════════
  {
    id: 2,
    section: 'profile',
    questions: [
      {
        id: 'q3',
        section: 'profile',
        type: 'multi-select',
        label: 'Which geographic region(s) does your work primarily focus on?',
        helpText: 'Select all that apply.',
        required: true,
        hasOther: false,
        options: [
          { value: 'south_asia', label: 'South Asia' },
          { value: 'east_asia', label: 'East Asia' },
          { value: 'southeast_asia', label: 'Southeast Asia' },
          { value: 'sub_saharan_africa', label: 'Sub-Saharan Africa' },
          { value: 'north_africa_middle_east', label: 'North Africa / Middle East' },
          { value: 'europe', label: 'Europe' },
          { value: 'north_america', label: 'North America' },
          { value: 'latin_america_caribbean', label: 'Latin America / Caribbean' },
          { value: 'oceania_pacific', label: 'Oceania / Pacific Islands' },
          { value: 'global', label: 'Global / cross-regional' },
        ],
      },
      {
        id: 'q4',
        section: 'profile',
        type: 'multi-select',
        label: 'Which sector(s) of cultural innovation are you most experienced in?',
        helpText: 'Select all that apply.',
        required: true,
        hasOther: true,
        options: [
          { value: 'textiles', label: 'Textiles, handloom, and fashion' },
          { value: 'food', label: 'Food, gastronomy, and culinary heritage' },
          { value: 'performing_arts', label: 'Performing arts, music, and entertainment' },
          { value: 'visual_arts', label: 'Visual arts, crafts, and artisan production' },
          { value: 'heritage_tourism', label: 'Heritage tourism and cultural tourism' },
          { value: 'traditional_knowledge', label: 'Traditional knowledge, indigenous medicine, or ecological practices' },
          { value: 'digital_heritage', label: 'Digital heritage, digital storytelling, or creative technology' },
          { value: 'cultural_policy', label: 'Cultural policy, governance, or institutional development' },
          { value: 'other', label: 'Other' },
        ],
      },
    ],
  },

  // ═════════════════════════��═════════════════
  // SCREEN 3: Section B intro + definition
  // ═��═════════════════════════════════════════
  {
    id: 3,
    section: 'definition',
    sectionLabel: 'Section B: Definition and Scope of Cultural Innovation',
    introContent: {
      title: 'Definition and Scope of Cultural Innovation',
      body: 'This section evaluates the proposed definition of cultural innovation. It addresses Research Question 1: What are the defining characteristics of cultural innovation?',
      highlight: 'Proposed Definition: Cultural innovation is the strategic transformation of cultural heritage, traditions, and community-embedded knowledge into viable economic opportunities that generate measurable value while preserving cultural integrity, fostering adaptability, and empowering the communities from which they originate.',
    },
    questions: [
      {
        id: 'q5',
        section: 'definition',
        type: 'likert-matrix',
        label: 'Please rate your agreement with the following statements about the proposed definition:',
        required: true,
        scale: LIKERT_5_SCALE,
        statements: [
          { id: 'q5_s1', text: 'The definition accurately captures what cultural innovation means in practice.' },
          { id: 'q5_s2', text: 'The definition is comprehensive enough to cover the full scope of cultural innovation activities.' },
          { id: 'q5_s3', text: "The definition clearly distinguishes cultural innovation from broader concepts like 'creative economy' or 'cultural entrepreneurship.'" },
          { id: 'q5_s4', text: 'The emphasis on community empowerment is appropriate and necessary.' },
          { id: 'q5_s5', text: 'The emphasis on preserving cultural integrity is appropriate and necessary.' },
          { id: 'q5_s6', text: 'The definition is applicable across different geographic and cultural contexts.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════
  // SCREEN 4: Q6 + Q7
  // ═════════════════════════��═════════════════
  {
    id: 4,
    section: 'definition',
    questions: [
      {
        id: 'q6',
        section: 'definition',
        type: 'open-text',
        label: 'Are there any elements missing from this definition that you consider essential?',
        placeholder: 'Please describe any missing elements or suggest refinements...',
        required: false,
        rows: 4,
      },
      {
        id: 'q7',
        section: 'definition',
        type: 'open-text',
        label: 'In your professional experience, what are the 2–3 most important characteristics that distinguish cultural innovation from other forms of economic innovation?',
        placeholder: 'Your response...',
        required: false,
        rows: 4,
      },
    ],
  },

  // ═���═════════════════════════════════════════
  // SCREEN 5: Pillar 1 intro + Q8
  // ═════════════════════════��═════════════════
  {
    id: 5,
    section: 'pillars',
    sectionLabel: 'Section C: Evaluation of the CIRF Framework Pillars',
    introContent: {
      title: 'Pillar 1: Economic Value Creation',
      body: 'This section evaluates each of the four pillars of the Cultural Innovation Resilience Framework. It addresses Research Questions 2 and 5.',
      highlight: 'Definition: The transformation of cultural assets into measurable economic outputs including revenue generation, employment creation, GDP contribution, export value, and tourism multiplier effects.',
    },
    questions: [
      {
        id: 'q8',
        section: 'pillars',
        type: 'likert-matrix',
        label: 'Please rate the following statements about Pillar 1:',
        required: true,
        scale: LIKERT_5_SCALE,
        statements: [
          { id: 'q8_s1', text: 'This pillar is essential for cultural innovation to achieve economic resilience.' },
          { id: 'q8_s2', text: 'The proposed indicators (cultural GDP share, creative employment rates, export values, tourism multipliers) are relevant and measurable.' },
          { id: 'q8_s3', text: 'This pillar adequately captures how cultural innovation creates economic value.' },
          { id: 'q8_s4', text: 'Governments and investors would find these indicators useful for decision-making.' },
        ],
      },
    ],
  },

  // ══════════════════════════════════���════════
  // SCREEN 6: Q9
  // ════════��══════════════════════════════════
  {
    id: 6,
    section: 'pillars',
    questions: [
      {
        id: 'q9',
        section: 'pillars',
        type: 'open-text',
        label: 'Are there any economic indicators or dimensions missing from this pillar?',
        placeholder: 'Your response...',
        required: false,
        rows: 4,
      },
    ],
  },

  // ═��═══════════════���═════════════════════════
  // SCREEN 7: Pillar 2 intro + Q10
  // ═════════════════��═════════════════════════
  {
    id: 7,
    section: 'pillars',
    introContent: {
      title: 'Pillar 2: Cultural Integrity and Authenticity',
      body: '',
      highlight: 'Definition: The preservation of heritage meaning, community ownership, and symbolic value during commercialisation, measured through IP protections enacted, community governance models, authenticity certification schemes, and indigenous consent frameworks.',
    },
    questions: [
      {
        id: 'q10',
        section: 'pillars',
        type: 'likert-matrix',
        label: 'Please rate the following statements about Pillar 2:',
        required: true,
        scale: LIKERT_5_SCALE,
        statements: [
          { id: 'q10_s1', text: 'Preserving cultural integrity is essential when commercialising cultural assets.' },
          { id: 'q10_s2', text: 'The proposed indicators (IP protections, community governance, authenticity certification, consent frameworks) are relevant.' },
          { id: 'q10_s3', text: 'This pillar adequately addresses the risk of cultural appropriation and commodification.' },
          { id: 'q10_s4', text: 'Balancing commercial viability with cultural authenticity is achievable in practice.' },
        ],
      },
    ],
  },

  // ══════════��═════════════��══════════════════
  // SCREEN 8: Q11
  // ═══════════════════════════════════════════
  {
    id: 8,
    section: 'pillars',
    questions: [
      {
        id: 'q11',
        section: 'pillars',
        type: 'open-text',
        label: 'From your experience, what is the single greatest threat to cultural integrity during commercialisation?',
        placeholder: 'Your response...',
        required: false,
        rows: 4,
      },
    ],
  },

  // ════════════════��══════════════════���═══════
  // SCREEN 9: Pillar 3 intro + Q12
  // ═══════════════════════════════════════════
  {
    id: 9,
    section: 'pillars',
    introContent: {
      title: 'Pillar 3: Adaptability and Sustainability',
      body: '',
      highlight: 'Definition: The capacity of cultural enterprises to evolve with market conditions, technology, and environmental change, measured through digital adoption rates, hybrid business model prevalence, intergenerational knowledge transfer, and climate-resilient practices.',
    },
    questions: [
      {
        id: 'q12',
        section: 'pillars',
        type: 'likert-matrix',
        label: 'Please rate the following statements about Pillar 3:',
        required: true,
        scale: LIKERT_5_SCALE,
        statements: [
          { id: 'q12_s1', text: 'Adaptability is essential for the long-term survival of cultural enterprises.' },
          { id: 'q12_s2', text: 'Digital technology is a critical enabler of cultural innovation in the current era.' },
          { id: 'q12_s3', text: 'Intergenerational knowledge transfer is adequately captured in this pillar.' },
          { id: 'q12_s4', text: 'The proposed indicators are practical and measurable.' },
        ],
      },
    ],
  },

  // ═══════════════════════════���═══════════════
  // SCREEN 10: Q13
  // ══════════════════��════════════════════════
  {
    id: 10,
    section: 'pillars',
    questions: [
      {
        id: 'q13',
        section: 'pillars',
        type: 'open-text',
        label: 'What role do you see digital technology and AI playing in cultural innovation over the next decade?',
        placeholder: 'Your response...',
        required: false,
        rows: 4,
      },
    ],
  },

  // ═���══════════════���═════════════════════════��
  // SCREEN 11: Pillar 4 intro + Q14
  // ═════════════════���═════════════════════════
  {
    id: 11,
    section: 'pillars',
    introContent: {
      title: 'Pillar 4: Social Empowerment and Inclusion',
      body: '',
      highlight: 'Definition: The degree to which cultural innovation distributes opportunity across marginalised, rural, and indigenous communities, measured through participation demographics, income distribution shifts, women/youth entrepreneurship rates, and social mobility indicators.',
    },
    questions: [
      {
        id: 'q14',
        section: 'pillars',
        type: 'likert-matrix',
        label: 'Please rate the following statements about Pillar 4:',
        required: true,
        scale: LIKERT_5_SCALE,
        statements: [
          { id: 'q14_s1', text: 'Social empowerment and inclusion should be a core component of any cultural innovation framework.' },
          { id: 'q14_s2', text: 'Cultural innovation has the potential to reduce economic inequality in marginalised communities.' },
          { id: 'q14_s3', text: 'The proposed indicators (participation demographics, income shifts, women/youth entrepreneurship, social mobility) are relevant.' },
          { id: 'q14_s4', text: 'Current policies adequately support social inclusion in cultural entrepreneurship.' },
        ],
      },
    ],
  },

  // ════════════��══════════════════════════════
  // SCREEN 12: Q15
  // ══════��════════��═══════════════════════════
  {
    id: 12,
    section: 'pillars',
    questions: [
      {
        id: 'q15',
        section: 'pillars',
        type: 'open-text',
        label: 'Which marginalised groups do you believe benefit most from cultural innovation, and which are most overlooked?',
        placeholder: 'Your response...',
        required: false,
        rows: 4,
      },
    ],
  },

  // ═══════════���═══════════════════════════��═══
  // SCREEN 13: Overall Framework Q16
  // ═════════════════��═════════════════════════
  {
    id: 13,
    section: 'pillars',
    introContent: {
      title: 'Overall Framework Assessment',
      body: 'Considering all four pillars together, please evaluate the CIRF as a whole.',
    },
    questions: [
      {
        id: 'q16',
        section: 'pillars',
        type: 'likert-matrix',
        label: 'Considering all four pillars together, please rate:',
        required: true,
        scale: LIKERT_5_SCALE,
        statements: [
          { id: 'q16_s1', text: 'The four pillars collectively provide a comprehensive framework for cultural innovation.' },
          { id: 'q16_s2', text: 'The framework is applicable across different countries and cultural contexts.' },
          { id: 'q16_s3', text: 'The framework would be useful for policymakers designing cultural innovation strategies.' },
          { id: 'q16_s4', text: 'The framework would be useful for cultural entrepreneurs structuring their enterprises.' },
          { id: 'q16_s5', text: 'The framework would be useful for investors evaluating cultural innovation opportunities.' },
          { id: 'q16_s6', text: 'No existing framework adequately addresses what the CIRF proposes to cover.' },
        ],
      },
    ],
  },

  // ══════════��════════════════════════════════
  // SCREEN 14: Q17 + Q18 (ranking)
  // ════════════════════���══════════════════════
  {
    id: 14,
    section: 'pillars',
    questions: [
      {
        id: 'q17',
        section: 'pillars',
        type: 'open-text',
        label: 'Are there any additional pillars or dimensions that should be included in the CIRF?',
        placeholder: 'Your response...',
        required: false,
        rows: 3,
      },
      {
        id: 'q18',
        section: 'pillars',
        type: 'ranking',
        label: 'Please rank the four pillars in order of importance for achieving economic resilience through cultural innovation (1 = most important, 4 = least important):',
        required: true,
        items: [
          { id: 'economic_value', label: 'Economic Value Creation' },
          { id: 'cultural_integrity', label: 'Cultural Integrity and Authenticity' },
          { id: 'adaptability', label: 'Adaptability and Sustainability' },
          { id: 'social_empowerment', label: 'Social Empowerment and Inclusion' },
        ],
      },
    ],
  },

  // ═��═══��═════════════════════════════════════
  // SCREEN 15: Q19 (barriers multi-select, pick 5)
  // ═══════════════════���═══════════════════════
  {
    id: 15,
    section: 'barriers',
    sectionLabel: 'Section D: Barriers and Enablers',
    introContent: {
      title: 'Barriers and Enablers',
      body: 'This section identifies the most significant obstacles and success factors for cultural innovation. It addresses Research Question 4.',
    },
    questions: [
      {
        id: 'q19',
        section: 'barriers',
        type: 'multi-select',
        label: 'From the following list, please select the FIVE most significant barriers to cultural innovation in your experience:',
        required: true,
        hasOther: true,
        maxSelections: 5,
        minSelections: 5,
        options: [
          { value: 'lack_funding', label: 'Lack of dedicated funding and investment for cultural enterprises' },
          { value: 'inadequate_ip', label: 'Inadequate intellectual property protection for traditional knowledge' },
          { value: 'limited_market', label: 'Limited market access for cultural entrepreneurs (domestic and international)' },
          { value: 'generic_policy', label: 'Generic government entrepreneurship policies that do not address cultural enterprises specifically' },
          { value: 'cultural_appropriation', label: 'Risk of cultural appropriation by external corporations' },
          { value: 'lack_metrics', label: 'Lack of standardised metrics to demonstrate economic impact' },
          { value: 'limited_digital', label: 'Limited digital infrastructure in rural and indigenous communities' },
          { value: 'perception_niche', label: 'Perception that cultural industries are niche, unprofitable, or non-essential' },
          { value: 'erosion_authenticity', label: 'Erosion of cultural authenticity through commercialisation' },
          { value: 'insufficient_research', label: 'Insufficient academic research and data on cultural innovation' },
          { value: 'difficulty_education', label: 'Difficulty accessing formal education and business training for cultural entrepreneurs' },
          { value: 'lack_recognition', label: 'Lack of institutional recognition of cultural innovation as an economic strategy' },
          { value: 'political_instability', label: 'Political instability or weak governance in culturally rich regions' },
          { value: 'intergenerational_loss', label: 'Loss of intergenerational knowledge as younger generations migrate to cities' },
          { value: 'other', label: 'Other' },
        ],
      },
    ],
  },

  // ═════════════════���═════════════════════════
  // SCREEN 16: Q20 + Q21
  // ════════════════════════════��══════════════
  {
    id: 16,
    section: 'barriers',
    questions: [
      {
        id: 'q20',
        section: 'barriers',
        type: 'open-text',
        label: 'From your experience, what are the THREE most important enablers or success factors that allow cultural innovation to thrive?',
        placeholder: 'Please describe the conditions, policies, or practices you have seen work best...',
        required: false,
        rows: 5,
      },
      {
        id: 'q21',
        section: 'barriers',
        type: 'open-text',
        label: 'What is the single most important policy change that governments could make to support cultural innovation?',
        placeholder: 'Your response...',
        required: false,
        rows: 4,
      },
    ],
  },

  // ���══════════��═══════════════════════════════
  // SCREEN 17: Q22 (triple-rating matrix)
  // ══════════════���════════════════════════════
  {
    id: 17,
    section: 'metrics',
    sectionLabel: 'Section E: Metrics and Implementation',
    introContent: {
      title: 'Metrics and Implementation',
      body: 'This section evaluates how cultural innovation should be measured and implemented. It addresses Research Question 6.',
    },
    questions: [
      {
        id: 'q22',
        section: 'metrics',
        type: 'triple-rating-matrix',
        label: 'Please rate the measurability and usefulness of the following proposed indicators:',
        helpText: 'Rate each indicator on three dimensions using a 1–5 scale (1 = lowest, 5 = highest).',
        required: true,
        dimensions: [
          { id: 'measure', label: 'Easy to Measure?' },
          { id: 'policy', label: 'Useful for Policy?' },
          { id: 'business', label: 'Useful for Business?' },
        ],
        scale: USEFULNESS_5_SCALE,
        indicators: [
          { id: 'q22_i1', text: 'Cultural GDP contribution (% of regional/national GDP)' },
          { id: 'q22_i2', text: 'Number of cultural enterprises / entrepreneurs registered' },
          { id: 'q22_i3', text: 'Employment generated in cultural industries' },
          { id: 'q22_i4', text: 'Cultural export value ($)' },
          { id: 'q22_i5', text: 'IP registrations for traditional knowledge' },
          { id: 'q22_i6', text: 'Community governance models in operation' },
          { id: 'q22_i7', text: 'Digital platform adoption rate among cultural entrepreneurs' },
          { id: 'q22_i8', text: 'Women and youth participation rates in cultural enterprises' },
          { id: 'q22_i9', text: 'Intergenerational knowledge transfer programmes active' },
          { id: 'q22_i10', text: 'Cultural tourism revenue and visitor numbers' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════
  // SCREEN 18: Q23 + Q24
  // ═════════���═══════════════════════��═════════
  {
    id: 18,
    section: 'metrics',
    questions: [
      {
        id: 'q23',
        section: 'metrics',
        type: 'open-text',
        label: "Are there any additional metrics you would recommend for measuring cultural innovation's impact on economic resilience?",
        placeholder: 'Your response...',
        required: false,
        rows: 4,
      },
      {
        id: 'q24',
        section: 'metrics',
        type: 'single-select',
        label: 'In your view, who should be primarily responsible for measuring and tracking cultural innovation metrics?',
        required: true,
        hasOther: false,
        conditionalTextOn: 'combination',
        options: [
          { value: 'government_stats', label: 'National government statistical offices' },
          { value: 'cultural_agencies', label: 'Dedicated cultural innovation agencies or ministries' },
          { value: 'international_orgs', label: 'International organisations (UNCTAD, UNESCO, WIPO)' },
          { value: 'academic_institutions', label: 'Academic and research institutions' },
          { value: 'industry_associations', label: 'Industry associations and cultural entrepreneur networks' },
          { value: 'combination', label: 'A combination of the above' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════
  // SCREEN 19: Q25 (final reflections)
  // ════════════════��══════════════════════════
  {
    id: 19,
    section: 'reflections',
    sectionLabel: 'Final Reflections',
    questions: [
      {
        id: 'q25',
        section: 'reflections',
        type: 'open-text',
        label: 'Is there anything else you would like to share about cultural innovation, its role in economic resilience, or this framework that has not been covered in the questions above?',
        placeholder: 'This is an open space for any additional insights, observations, examples, or recommendations...',
        required: false,
        rows: 6,
      },
    ],
  },

  // ═════════════════��═══════════════════════���═
  // SCREEN 20: Q26 + Q27 + Q28 (follow-up)
  // ═══════════════════════════════════════════
  {
    id: 20,
    section: 'reflections',
    questions: [
      {
        id: 'q26',
        section: 'reflections',
        type: 'single-select',
        label: 'Would you be willing to be contacted for a brief follow-up conversation (15–20 minutes) if the researcher has clarifying questions about your responses?',
        required: true,
        hasOther: false,
        conditionalTextOn: 'yes',
        options: [
          { value: 'yes', label: 'Yes — please contact me' },
          { value: 'no', label: 'No, I prefer not to be contacted further' },
        ],
      },
      {
        id: 'q27',
        section: 'reflections',
        type: 'single-select',
        label: 'Would you like to receive a summary of the research findings when the study is completed?',
        required: true,
        hasOther: false,
        conditionalTextOn: 'yes',
        options: [
          { value: 'yes', label: 'Yes — please send to me' },
          { value: 'no', label: 'No, thank you' },
        ],
      },
      {
        id: 'q28',
        section: 'reflections',
        type: 'single-select',
        label: 'May the researcher acknowledge your contribution by name in the thesis acknowledgements section?',
        required: true,
        hasOther: false,
        options: [
          { value: 'yes', label: 'Yes, you may use my name' },
          { value: 'no', label: 'No, I prefer to remain anonymous' },
        ],
      },
    ],
  },
]

export const TOTAL_SCREENS = SURVEY_SCREENS.length // 21 (0-20), plus thank you screen = 22 total steps

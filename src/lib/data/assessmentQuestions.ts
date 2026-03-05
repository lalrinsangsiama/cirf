// Legacy binary question interface (for backward compatibility)
export interface AssessmentQuestion {
  id: string
  component: string
  category: 'foundation' | 'capacity' | 'outcome'
  question: string
  description: string
  yesIndicators: string[]
  noIndicators: string[]
  successRate: number // Rate in successful cases
  discriminatoryPower: number // Percentage points advantage
}

// Likert-scale question interface for CIL assessment
export type LikertSection =
  | 'demographics'
  | 'culturalCapital'
  | 'innovationActivities'
  | 'organizationalCapacities'
  | 'economicResilience'

export interface LikertQuestion {
  id: string
  section: LikertSection
  construct: string
  question: string
  helpText?: string
  weight: number // Discriminatory power weight (0.5-2.0)
  reverse?: boolean // True if scoring should be reversed
  allowNA?: boolean // True if "Not Applicable" is a valid response (e.g., no disruption experienced)
}

export interface DemographicQuestion {
  id: string
  section: 'demographics'
  question: string
  helpText?: string
  type: 'select' | 'text' | 'number' | 'multiselect' | 'textarea' | 'checkbox'
  options?: { value: string; label: string }[]
  required?: boolean
}

export type AssessmentQuestionV2 = LikertQuestion | DemographicQuestion

// Section metadata
export const SECTION_META: Record<LikertSection, {
  label: string
  shortLabel: string
  description: string
  estimatedMinutes: number
}> = {
  demographics: {
    label: 'Context & Demographics',
    shortLabel: 'Context',
    description: 'Tell us about your organization and initiative',
    estimatedMinutes: 2,
  },
  culturalCapital: {
    label: 'Cultural Capital',
    shortLabel: 'Cultural',
    description: 'How deep are your cultural roots? Let\'s explore your connection to tradition and community.',
    estimatedMinutes: 3,
  },
  innovationActivities: {
    label: 'Innovation Activities',
    shortLabel: 'Innovation',
    description: 'How are you adapting tradition for today\'s world? Let\'s see what\'s working.',
    estimatedMinutes: 3,
  },
  organizationalCapacities: {
    label: 'Organizational Capacities',
    shortLabel: 'Capacity',
    description: 'Can your team weather storms and bounce back? Let\'s check your support systems.',
    estimatedMinutes: 4,
  },
  economicResilience: {
    label: 'Economic Resilience Outcomes',
    shortLabel: 'Resilience',
    description: 'How did you handle tough times? Let\'s see how your finances held up.',
    estimatedMinutes: 3,
  },
}

// Profile question interface (for storing in user profile)
export interface ProfileQuestion extends Omit<DemographicQuestion, 'section'> {
  section: 'demographics'
  profileField?: string // Maps to profile table field
}

// Country list for dropdown
export const COUNTRIES = [
  { value: 'AF', label: 'Afghanistan' },
  { value: 'AL', label: 'Albania' },
  { value: 'DZ', label: 'Algeria' },
  { value: 'AR', label: 'Argentina' },
  { value: 'AU', label: 'Australia' },
  { value: 'AT', label: 'Austria' },
  { value: 'BD', label: 'Bangladesh' },
  { value: 'BE', label: 'Belgium' },
  { value: 'BR', label: 'Brazil' },
  { value: 'CA', label: 'Canada' },
  { value: 'CL', label: 'Chile' },
  { value: 'CN', label: 'China' },
  { value: 'CO', label: 'Colombia' },
  { value: 'CR', label: 'Costa Rica' },
  { value: 'HR', label: 'Croatia' },
  { value: 'CZ', label: 'Czech Republic' },
  { value: 'DK', label: 'Denmark' },
  { value: 'EC', label: 'Ecuador' },
  { value: 'EG', label: 'Egypt' },
  { value: 'ET', label: 'Ethiopia' },
  { value: 'FI', label: 'Finland' },
  { value: 'FR', label: 'France' },
  { value: 'DE', label: 'Germany' },
  { value: 'GH', label: 'Ghana' },
  { value: 'GR', label: 'Greece' },
  { value: 'GT', label: 'Guatemala' },
  { value: 'HK', label: 'Hong Kong' },
  { value: 'HU', label: 'Hungary' },
  { value: 'IN', label: 'India' },
  { value: 'ID', label: 'Indonesia' },
  { value: 'IE', label: 'Ireland' },
  { value: 'IL', label: 'Israel' },
  { value: 'IT', label: 'Italy' },
  { value: 'JP', label: 'Japan' },
  { value: 'KE', label: 'Kenya' },
  { value: 'KR', label: 'South Korea' },
  { value: 'MY', label: 'Malaysia' },
  { value: 'MX', label: 'Mexico' },
  { value: 'MA', label: 'Morocco' },
  { value: 'NL', label: 'Netherlands' },
  { value: 'NZ', label: 'New Zealand' },
  { value: 'NG', label: 'Nigeria' },
  { value: 'NO', label: 'Norway' },
  { value: 'PK', label: 'Pakistan' },
  { value: 'PE', label: 'Peru' },
  { value: 'PH', label: 'Philippines' },
  { value: 'PL', label: 'Poland' },
  { value: 'PT', label: 'Portugal' },
  { value: 'RO', label: 'Romania' },
  { value: 'RU', label: 'Russia' },
  { value: 'SA', label: 'Saudi Arabia' },
  { value: 'SG', label: 'Singapore' },
  { value: 'ZA', label: 'South Africa' },
  { value: 'ES', label: 'Spain' },
  { value: 'LK', label: 'Sri Lanka' },
  { value: 'SE', label: 'Sweden' },
  { value: 'CH', label: 'Switzerland' },
  { value: 'TW', label: 'Taiwan' },
  { value: 'TZ', label: 'Tanzania' },
  { value: 'TH', label: 'Thailand' },
  { value: 'TR', label: 'Turkey' },
  { value: 'UG', label: 'Uganda' },
  { value: 'UA', label: 'Ukraine' },
  { value: 'AE', label: 'United Arab Emirates' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'US', label: 'United States' },
  { value: 'VN', label: 'Vietnam' },
  { value: 'ZW', label: 'Zimbabwe' },
  { value: 'other', label: 'Other' },
]

// Industry/sector options
export const INDUSTRIES = [
  { value: 'crafts', label: 'Crafts & Artisanal Products' },
  { value: 'performing-arts', label: 'Performing Arts (music, dance, theater)' },
  { value: 'visual-arts', label: 'Visual Arts & Photography' },
  { value: 'food-beverage', label: 'Food & Culinary Traditions' },
  { value: 'fashion-textiles', label: 'Fashion & Textiles' },
  { value: 'heritage-tourism', label: 'Cultural & Heritage Tourism' },
  { value: 'digital-film-media', label: 'Digital Content, Film & Media' },
  { value: 'ar-vr-xr', label: 'AR/VR/XR & Immersive Experiences' },
  { value: 'gaming-interactive', label: 'Gaming & Interactive Media' },
  { value: 'mobility', label: 'Mobility & Cultural Transport' },
  { value: 'language-literature', label: 'Language, Literature & Storytelling' },
  { value: 'festivals-ceremonies', label: 'Festivals, Ceremonies & Events' },
  { value: 'traditional-medicine', label: 'Traditional Medicine & Wellness' },
  { value: 'design', label: 'Design & Creative Services' },
  { value: 'education', label: 'Cultural Education' },
  { value: 'community-development', label: 'Community Cultural Development' },
  { value: 'agriculture', label: 'Cultural Agriculture & Farming' },
  { value: 'other', label: 'Other' },
]

// Years operating options
export const YEARS_OPERATING = [
  { value: 'not-started', label: 'Not yet started' },
  { value: '<1', label: 'Less than 1 year' },
  { value: '1-2', label: '1-2 years' },
  { value: '3-5', label: '3-5 years' },
  { value: '6-10', label: '6-10 years' },
  { value: '11-20', label: '11-20 years' },
  { value: '20+', label: '20+ years' },
]

// Business stage options
export const BUSINESS_STAGES = [
  { value: 'idea', label: 'Idea / Concept Stage' },
  { value: 'startup', label: 'Startup (0-2 years)' },
  { value: 'growth', label: 'Growth Stage (2-5 years)' },
  { value: 'scaling', label: 'Scaling (5-10 years)' },
  { value: 'established', label: 'Established (10+ years)' },
]

// Total employee count options
export const EMPLOYEE_COUNTS = [
  { value: '0', label: 'None (just me)' },
  { value: '1-5', label: '1-5 employees' },
  { value: '6-15', label: '6-15 employees' },
  { value: '16-30', label: '16-30 employees' },
  { value: '31-50', label: '31-50 employees' },
  { value: '51-100', label: '51-100 employees' },
  { value: '100+', label: '100+ employees' },
]

// Team size options
export const TEAM_SIZES = [
  { value: 'solo', label: 'Solo / Individual' },
  { value: '2-5', label: '2-5 people' },
  { value: '6-10', label: '6-10 people' },
  { value: '11-25', label: '11-25 people' },
  { value: '26-50', label: '26-50 people' },
  { value: '51+', label: '51+ people' },
]

// Revenue range options
export const REVENUE_RANGES = [
  { value: 'pre-revenue', label: 'Pre-revenue / No income yet' },
  { value: '<1k', label: 'Less than $1,000 USD' },
  { value: '1k-5k', label: '$1,000 - $5,000 USD' },
  { value: '5k-10k', label: '$5,000 - $10,000 USD' },
  { value: '10k-25k', label: '$10,000 - $25,000 USD' },
  { value: '25k-50k', label: '$25,000 - $50,000 USD' },
  { value: '50k-100k', label: '$50,000 - $100,000 USD' },
  { value: '100k-500k', label: '$100,000 - $500,000 USD' },
  { value: '500k+', label: '$500,000+ USD' },
]

// Age group options
export const AGE_GROUPS = [
  { value: '18-25', label: '18-25' },
  { value: '26-35', label: '26-35' },
  { value: '36-45', label: '36-45' },
  { value: '46-55', label: '46-55' },
  { value: '56+', label: '56+' },
]

// Gender options
export const GENDERS = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'non-binary', label: 'Non-binary' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' },
]

// Types of cultural innovation
export const CULTURAL_INNOVATION_TYPES = [
  { value: 'traditional-crafts', label: 'Traditional crafts & textiles' },
  { value: 'performing-arts', label: 'Performing arts (music, dance, theater)' },
  { value: 'visual-arts', label: 'Visual arts & photography' },
  { value: 'food-culinary', label: 'Food & culinary traditions' },
  { value: 'digital-film-media', label: 'Digital content, film & media' },
  { value: 'cultural-tourism', label: 'Cultural & heritage tourism' },
  { value: 'traditional-medicine', label: 'Traditional medicine & wellness' },
  { value: 'language-literature', label: 'Language, literature & storytelling' },
  { value: 'festivals-ceremonies', label: 'Festivals, ceremonies & events' },
  { value: 'community-development', label: 'Community cultural development' },
  { value: 'fashion-design', label: 'Fashion & design' },
  { value: 'other', label: 'Other' },
]

// Revenue sources for cultural entrepreneurs
export const REVENUE_SOURCES = [
  { value: 'direct-sales', label: 'Direct sales of cultural products' },
  { value: 'services', label: 'Services (performances, workshops, etc.)' },
  { value: 'tourism', label: 'Tourism-related activities' },
  { value: 'digital-monetization', label: 'Digital content monetization' },
  { value: 'licensing-royalties', label: 'Licensing/royalties' },
  { value: 'grants-donations', label: 'Grants/donations' },
  { value: 'teaching-training', label: 'Teaching/training' },
  { value: 'other', label: 'Other' },
]

// Indian states/regions
export const INDIAN_STATES = [
  { value: 'andhra-pradesh', label: 'Andhra Pradesh' },
  { value: 'arunachal-pradesh', label: 'Arunachal Pradesh' },
  { value: 'assam', label: 'Assam' },
  { value: 'bihar', label: 'Bihar' },
  { value: 'chhattisgarh', label: 'Chhattisgarh' },
  { value: 'goa', label: 'Goa' },
  { value: 'gujarat', label: 'Gujarat' },
  { value: 'haryana', label: 'Haryana' },
  { value: 'himachal-pradesh', label: 'Himachal Pradesh' },
  { value: 'jharkhand', label: 'Jharkhand' },
  { value: 'karnataka', label: 'Karnataka' },
  { value: 'kerala', label: 'Kerala' },
  { value: 'madhya-pradesh', label: 'Madhya Pradesh' },
  { value: 'maharashtra', label: 'Maharashtra' },
  { value: 'manipur', label: 'Manipur' },
  { value: 'meghalaya', label: 'Meghalaya' },
  { value: 'mizoram', label: 'Mizoram' },
  { value: 'nagaland', label: 'Nagaland' },
  { value: 'odisha', label: 'Odisha' },
  { value: 'punjab', label: 'Punjab' },
  { value: 'rajasthan', label: 'Rajasthan' },
  { value: 'sikkim', label: 'Sikkim' },
  { value: 'tamil-nadu', label: 'Tamil Nadu' },
  { value: 'telangana', label: 'Telangana' },
  { value: 'tripura', label: 'Tripura' },
  { value: 'uttar-pradesh', label: 'Uttar Pradesh' },
  { value: 'uttarakhand', label: 'Uttarakhand' },
  { value: 'west-bengal', label: 'West Bengal' },
  { value: 'andaman-nicobar', label: 'Andaman and Nicobar Islands' },
  { value: 'chandigarh', label: 'Chandigarh' },
  { value: 'dadra-nagar-haveli', label: 'Dadra and Nagar Haveli and Daman and Diu' },
  { value: 'delhi', label: 'Delhi' },
  { value: 'jammu-kashmir', label: 'Jammu and Kashmir' },
  { value: 'ladakh', label: 'Ladakh' },
  { value: 'lakshadweep', label: 'Lakshadweep' },
  { value: 'puducherry', label: 'Puducherry' },
  { value: 'other', label: 'Other' },
]

// Demographic questions (Section A: Background Information for Cultural Entrepreneurs)
export const demographicQuestions: DemographicQuestion[] = [
  // Personal Information
  {
    id: 'demo-name',
    section: 'demographics',
    question: 'Name (Optional)',
    helpText: 'Your name will help us personalize your results',
    type: 'text',
    required: false,
  },
  {
    id: 'demo-business-name',
    section: 'demographics',
    question: 'Business or initiative name (optional)',
    helpText: 'The name of your cultural enterprise, collective, or project',
    type: 'text',
    required: false,
  },
  {
    id: 'demo-website',
    section: 'demographics',
    question: 'Website (optional)',
    helpText: 'Your business or project website URL',
    type: 'text',
    required: false,
  },
  {
    id: 'demo-instagram',
    section: 'demographics',
    question: 'Instagram username (optional)',
    helpText: 'Your Instagram handle (without @)',
    type: 'text',
    required: false,
  },
  {
    id: 'demo-age-group',
    section: 'demographics',
    question: 'Age Group',
    type: 'select',
    options: AGE_GROUPS,
    required: true,
  },
  {
    id: 'demo-gender',
    section: 'demographics',
    question: 'Gender',
    type: 'select',
    options: GENDERS,
    required: true,
  },
  {
    id: 'demo-country',
    section: 'demographics',
    question: 'Country',
    helpText: 'Select your country',
    type: 'select',
    options: COUNTRIES,
    required: true,
  },
  {
    id: 'demo-state-region',
    section: 'demographics',
    question: 'State/Province/Region',
    helpText: 'Enter your state, province, or region name',
    type: 'text',
    required: true,
  },
  {
    id: 'demo-community-identity',
    section: 'demographics',
    question: 'Community or cultural heritage (optional)',
    helpText: 'The cultural community you identify with. Examples: Mizo, Maori, Yoruba, Navajo Nation, Tamil, Sami, Igbo, Quechua, Basque, Balinese, Okinawan, or any community you belong to.',
    type: 'text',
    required: false,
  },
  // Organization type (kept from original)
  {
    id: 'demo-org-type',
    section: 'demographics',
    question: 'What type of organization are you assessing?',
    type: 'select',
    options: [
      { value: 'cooperative', label: 'Cooperative / Social Enterprise' },
      { value: 'community-org', label: 'Community Organization / NGO' },
      { value: 'indigenous-enterprise', label: 'Indigenous Enterprise' },
      { value: 'cultural-institution', label: 'Cultural Institution / Museum' },
      { value: 'craft-guild', label: 'Craft Guild / Artisan Collective' },
      { value: 'for-profit', label: 'For-Profit Cultural Business' },
      { value: 'government', label: 'Government / Public Agency' },
      { value: 'individual', label: 'Individual Cultural Entrepreneur' },
      { value: 'other', label: 'Other' },
    ],
    required: true,
  },
  {
    id: 'demo-sector',
    section: 'demographics',
    question: 'Which cultural sectors are you active in? (Select all that apply)',
    helpText: 'Select all sectors where you are innovating culturally',
    type: 'multiselect',
    options: INDUSTRIES,
    required: true,
  },
  {
    id: 'demo-stage',
    section: 'demographics',
    question: 'What stage is your initiative at?',
    type: 'select',
    options: BUSINESS_STAGES,
    required: true,
  },
  {
    id: 'demo-team-size',
    section: 'demographics',
    question: 'How many people are directly involved in the initiative?',
    type: 'select',
    options: TEAM_SIZES,
    required: true,
  },
  {
    id: 'demo-total-employees',
    section: 'demographics',
    question: 'How many total employees does your organization have?',
    helpText: 'Include full-time, part-time, and regular contract workers',
    type: 'select',
    options: EMPLOYEE_COUNTS,
    required: true,
  },
  {
    id: 'demo-revenue',
    section: 'demographics',
    question: 'What is your approximate annual revenue/budget?',
    type: 'select',
    options: REVENUE_RANGES,
    required: true,
  },
  // Economic Value Creation section
  {
    id: 'demo-revenue-sources',
    section: 'demographics',
    question: 'What are your main sources of revenue? (Select all that apply)',
    helpText: 'Select all revenue sources that apply to your cultural enterprise',
    type: 'multiselect',
    options: REVENUE_SOURCES,
    required: true,
  },
  // Disruption context — critical for interpreting resilience scores
  {
    id: 'demo-disruption-type',
    section: 'demographics',
    question: 'What type of economic disruption has your enterprise experienced? (Select all that apply)',
    helpText: 'Understanding the disruptions you have faced helps us interpret your resilience scores accurately',
    type: 'multiselect',
    options: [
      { value: 'pandemic', label: 'Pandemic (e.g., COVID-19)' },
      { value: 'recession', label: 'Economic recession/downturn' },
      { value: 'natural-disaster', label: 'Natural disaster (flood, earthquake, cyclone)' },
      { value: 'political', label: 'Political instability or conflict' },
      { value: 'market-shift', label: 'Major market shift or new competition' },
      { value: 'supply-chain', label: 'Supply chain disruption' },
      { value: 'climate', label: 'Climate-related disruption (drought, extreme weather)' },
      { value: 'none', label: 'No significant disruption experienced' },
    ],
    required: true,
  },
]

// Extended profile questions (optional, collected to enhance user profile)
export const profileQuestions: ProfileQuestion[] = [
  // Contact Information
  {
    id: 'profile-phone',
    section: 'demographics',
    question: 'Phone number (optional)',
    helpText: 'For direct contact regarding opportunities',
    type: 'text',
    profileField: 'phone',
    required: false,
  },
  {
    id: 'profile-website',
    section: 'demographics',
    question: 'Website URL (optional)',
    helpText: 'Your organization or personal website',
    type: 'text',
    profileField: 'website',
    required: false,
  },
  {
    id: 'profile-linkedin',
    section: 'demographics',
    question: 'LinkedIn profile URL (optional)',
    helpText: 'Your LinkedIn profile for professional networking',
    type: 'text',
    profileField: 'linkedin_url',
    required: false,
  },
  {
    id: 'profile-twitter',
    section: 'demographics',
    question: 'Twitter/X handle (optional)',
    helpText: 'Your Twitter/X username (without @)',
    type: 'text',
    profileField: 'twitter_handle',
    required: false,
  },
  // Location
  {
    id: 'profile-country',
    section: 'demographics',
    question: 'Country',
    helpText: 'Where your initiative is primarily based',
    type: 'select',
    options: COUNTRIES,
    profileField: 'country',
    required: false,
  },
  {
    id: 'profile-city',
    section: 'demographics',
    question: 'City/Region (optional)',
    helpText: 'Your city or region',
    type: 'text',
    profileField: 'city',
    required: false,
  },
  // Cultural Context
  {
    id: 'profile-cultural-tradition',
    section: 'demographics',
    question: 'Cultural tradition/heritage (optional)',
    helpText: 'The cultural tradition your work is based in or draws from',
    type: 'text',
    profileField: 'cultural_tradition',
    required: false,
  },
  {
    id: 'profile-community',
    section: 'demographics',
    question: 'Community affiliation (optional)',
    helpText: 'Community, tribe, or cultural group you are affiliated with',
    type: 'text',
    profileField: 'community_affiliation',
    required: false,
  },
]

// All demographic and profile questions combined
export const allDemographicQuestions: DemographicQuestion[] = [
  ...demographicQuestions,
  ...profileQuestions as DemographicQuestion[],
]

// Helper to extract profile data from answers
export function extractProfileDataFromAnswers(answers: Record<string, unknown>): Record<string, unknown> {
  const profileData: Record<string, unknown> = {}

  // Map demographic questions to profile fields
  const demoToProfileMap: Record<string, string> = {
    'demo-business-name': 'business_name',
    'demo-website': 'website',
    'demo-instagram': 'instagram_handle',
    'demo-sector': 'industry',
    'demo-stage': 'business_stage',
    'demo-team-size': 'team_size',
    'demo-total-employees': 'total_employees',
    'demo-revenue': 'revenue_range',
    'demo-age-group': 'age_group',
    'demo-gender': 'gender',
    'demo-country': 'country',
    'demo-state-region': 'state_region',
    'demo-community-identity': 'community_affiliation',
    'demo-revenue-sources': 'revenue_sources',
    'demo-disruption-type': 'disruption_types',
  }

  // Extract from demographic questions
  for (const [questionId, profileField] of Object.entries(demoToProfileMap)) {
    if (answers[questionId]) {
      profileData[profileField] = answers[questionId]
    }
  }

  // Extract from profile questions
  for (const question of profileQuestions) {
    if (question.profileField && answers[question.id]) {
      profileData[question.profileField] = answers[question.id]
    }
  }

  return profileData
}

// Cultural Capital questions (Section B: 10 questions)
export const culturalCapitalQuestions: LikertQuestion[] = [
  {
    id: 'cc-1',
    section: 'culturalCapital',
    construct: 'traditionalKnowledge',
    question: 'Our organization has documented traditional knowledge relevant to our activities',
    helpText: 'Think of it this way: A Mizo weaving cooperative created video archives of elderly weavers demonstrating traditional puan patterns, ensuring techniques survive even if the masters cannot teach in person. Has your organization done something similar — recipe books, technique guides, recorded interviews with elders, or digital archives?',
    weight: 1.0,
  },
  {
    id: 'cc-2',
    section: 'culturalCapital',
    construct: 'practitionerAccess',
    question: 'We have access to skilled practitioners of traditional techniques',
    helpText: 'For example: A Rajasthani block-printing enterprise employs three master printers who trained for 15+ years under their fathers. Do you have access to master weavers, traditional chefs, elder craftspeople, or trained apprentices who carry deep expertise?',
    weight: 1.2,
  },
  {
    id: 'cc-3',
    section: 'culturalCapital',
    construct: 'culturalAuthenticity',
    question: 'Our cultural practices have recognized authenticity within source communities',
    helpText: 'For example: A Maori tourism venture received formal endorsement from local iwi (tribal council) before launching. Does your work have community endorsements, cultural council approval, or elder recognition that validates its authenticity?',
    weight: 1.3,
  },
  {
    id: 'cc-4',
    section: 'culturalCapital',
    construct: 'communityInvolvement',
    question: 'Cultural practitioners from source communities are involved in development decisions',
    helpText: 'For example: A fair-trade coffee brand in Guatemala has indigenous farmers on its product development board, giving them veto power over how their cultural story is marketed. Do community members hold advisory seats, join design reviews, or participate in regular consultations?',
    weight: 1.4,
  },
  {
    id: 'cc-5',
    section: 'culturalCapital',
    construct: 'culturalPreservation',
    question: 'Our core traditional practices remain intact even as we introduce new products or services',
    helpText: 'For example: A Japanese indigo dyer added contemporary garment silhouettes but kept the traditional shibori hand-dyeing process intact — the innovation happened around the tradition, not in place of it. Are your fundamental traditional methods still being practised in their original form alongside any new offerings?',
    weight: 1.1,
  },
  {
    id: 'cc-6',
    section: 'culturalCapital',
    construct: 'culturalMeaning',
    question: 'Cultural meanings are accurately represented in how we present and sell our products',
    helpText: 'For example: A Navajo jewelry brand includes cards explaining the spiritual significance of turquoise in their tradition, rather than just labeling it "handmade." Do your product descriptions, packaging, or marketing explain the cultural significance behind what you create?',
    weight: 1.0,
  },
  {
    id: 'cc-7',
    section: 'culturalCapital',
    construct: 'practitionerRelationships',
    question: 'We have strong relationships with cultural knowledge holders',
    helpText: 'For example: A Balinese dance troupe pays monthly honorariums to elder choreographers regardless of performance season, maintaining the relationship year-round. Do you have regular contact, fair compensation, profit-sharing, or co-creation arrangements with knowledge holders?',
    weight: 1.0,
  },
  {
    id: 'cc-8',
    section: 'culturalCapital',
    construct: 'culturalMembership',
    question: 'Our team includes members from the source culture community',
    helpText: 'For example: A West African textile brand was co-founded by a Kente weaver from the Ashanti community and ensures 60% of staff are from weaving families. Are founders, cultural advisors, or team members from the source community?',
    weight: 0.9,
  },
  {
    id: 'cc-9',
    section: 'culturalCapital',
    construct: 'culturalMechanisms',
    question: 'Our community has traditional customs or agreements that govern economic relationships between stakeholders',
    helpText: 'For example: In Bali, the catur dresta system provides customary agreements between landowners and farmers that stabilize economic relationships during uncertain times. Does your community have traditional profit-sharing norms, customary trade agreements, cultural protocols for economic exchange, or reciprocal obligations that structure how people work together?',
    weight: 1.3,
  },
  {
    id: 'cc-10',
    section: 'culturalCapital',
    construct: 'culturalConsumption',
    question: 'Members of our team and community regularly attend or participate in cultural activities beyond our own enterprise',
    helpText: 'For example: Staff at an Italian ceramics workshop regularly attend local opera, visit museums, and participate in the town\'s annual historical pageant — this broader cultural engagement feeds creative ideas back into their work. Does your team attend festivals, visit cultural sites, consume cultural media, or support other cultural enterprises?',
    weight: 0.8,
  },
]

// Innovation Activities questions (Section C: 10 questions)
export const innovationActivitiesQuestions: LikertQuestion[] = [
  {
    id: 'ia-1',
    section: 'innovationActivities',
    construct: 'productDevelopment',
    question: 'We regularly develop new products/services based on cultural assets',
    helpText: 'For example: A Oaxacan mezcal producer launches a limited-edition spirit each year infused with a different ancestral herb, keeping the product line fresh while rooted in tradition. Do you create new product lines each season, limited editions, or custom offerings drawn from cultural assets?',
    weight: 1.2,
  },
  {
    id: 'ia-2',
    section: 'innovationActivities',
    construct: 'techniqueCombination',
    question: 'We experiment with combining traditional and modern techniques',
    helpText: 'For example: A Korean hanbok designer uses traditional silk-dyeing methods but cuts patterns with laser precision for a contemporary fit. Do you blend hand-dyed fabric with modern cuts, traditional recipes with new presentations, or ancestral methods with current technology?',
    weight: 1.1,
  },
  {
    id: 'ia-3',
    section: 'innovationActivities',
    construct: 'innovationLeadership',
    question: 'We have introduced innovations that others in our sector have adopted',
    helpText: 'For example: A Ghanaian chocolate maker pioneered "bean-to-bar" branding in West Africa, and now several competitors use the same approach. Has your packaging style been copied, have you pioneered a new product category, or set a trend others followed?',
    weight: 1.3,
  },
  {
    id: 'ia-4',
    section: 'innovationActivities',
    construct: 'marketExpansion',
    question: 'We have successfully entered new geographic markets',
    helpText: 'For example: A Moroccan argan oil cooperative that once sold only at local souks now ships to 12 countries through online retail. Have you started selling abroad, opened in new cities, or reached customers in new regions?',
    weight: 1.0,
  },
  {
    id: 'ia-5',
    section: 'innovationActivities',
    construct: 'digitalDistribution',
    question: 'We use digital channels effectively for cultural product distribution',
    helpText: 'For example: A Peruvian textile collective generates 40% of revenue through their Instagram shop and Etsy store, with each listing telling the weaver\'s story. Do you use platforms like Etsy, Amazon, Instagram Shopping, or your own website with checkout?',
    weight: 0.9,
  },
  {
    id: 'ia-6',
    section: 'innovationActivities',
    construct: 'efficiencyImprovement',
    question: 'We have found ways to produce more or work faster without changing the traditional techniques themselves',
    helpText: 'For example: A Thai silk weaver introduced an ergonomic loom frame that reduced back strain and sped up weaving by 20% — the hand-weaving technique stayed exactly the same, but the working conditions improved. Have you adopted better tools, streamlined ordering, or improved workspace layout to increase output?',
    weight: 1.0,
  },
  {
    id: 'ia-7',
    section: 'innovationActivities',
    construct: 'externalCollaboration',
    question: 'We collaborate with external partners on innovation projects',
    helpText: 'For example: An Indigenous Australian art centre partnered with a university design lab to develop UV-resistant pigments that preserve traditional dot-painting colours outdoors. Do you work with designers, universities, NGOs, or other artisan groups on joint innovation?',
    weight: 1.1,
  },
  {
    id: 'ia-8',
    section: 'innovationActivities',
    construct: 'feedbackIteration',
    question: 'We actively seek feedback and iterate on our offerings',
    helpText: 'For example: A Mizo bamboo craft enterprise runs quarterly "tasting sessions" where customers handle prototypes and suggest improvements before production. Do you conduct customer surveys, test prototypes, or adjust your offerings based on reviews and feedback?',
    weight: 1.2,
  },
  {
    id: 'ia-9',
    section: 'innovationActivities',
    construct: 'narrativeInnovation',
    question: 'We have developed new ways to communicate the cultural story behind our products to broader audiences',
    helpText: 'For example: A Sami reindeer herding family created a short documentary series on YouTube showing the seasonal migration, which tripled demand for their traditional dried meat products. Have you used brand storytelling on social media, documentary content, cultural experience packaging, or heritage labels?',
    weight: 1.2,
  },
  {
    id: 'ia-10',
    section: 'innovationActivities',
    construct: 'businessModelAdaptation',
    question: 'We have fundamentally changed our business model or delivery method in response to a major disruption',
    helpText: 'For example: During COVID-19, Montreal music festivals pivoted from in-person events to hybrid digital experiences, creating new subscription-based content that now generates year-round revenue. Have you shifted from in-person to digital, changed from B2C to B2B, added a subscription model, or reinvented how you deliver value?',
    weight: 1.4,
    allowNA: true,
  },
  {
    id: 'ia-11',
    section: 'innovationActivities',
    construct: 'knowledgeDiversity',
    question: 'Our cultural innovation draws on multiple types of knowledge — artistic, technical, scientific, or business',
    helpText: 'For example: An Italian ceramics studio combines centuries-old glazing techniques (artistic), 3D-printed mould prototyping (technical), university material science research on glaze durability (scientific), and data-driven pricing strategies (business). Does your work blend at least two or three different knowledge types?',
    weight: 1.1,
  },
]

// Organizational Capacities questions (Section D: 10 questions)
export const organizationalCapacitiesQuestions: LikertQuestion[] = [
  {
    id: 'oc-1',
    section: 'organizationalCapacities',
    construct: 'adaptiveResponse',
    question: 'We have successfully adjusted operations in response to past disruptions',
    helpText: 'For example: A Kenyan beadwork collective lost its tourist market overnight during COVID and within two weeks pivoted to online sales through WhatsApp Business, retaining 60% of revenue. Have you pivoted to online sales, found new suppliers when old ones closed, or restructured operations during a crisis?',
    weight: 1.5,
    allowNA: true,
  },
  {
    id: 'oc-2',
    section: 'organizationalCapacities',
    construct: 'learningFromSetbacks',
    question: 'We have systematic processes for learning from setbacks',
    helpText: 'For example: After a failed product launch, a Vietnamese lacquerware studio now holds monthly "reflection circles" where the team reviews what went wrong and documents lessons in a shared notebook. Do you hold team debriefs after failed projects, document lessons learned, or have formal review processes?',
    weight: 1.3,
  },
  {
    id: 'oc-3',
    section: 'organizationalCapacities',
    construct: 'skillDiversity',
    question: 'Our team has diverse skills that allow flexibility',
    helpText: 'For example: In a small Bhutanese textile enterprise, the lead weaver also manages the Instagram account, while the accountant can step in to handle customer visits during festivals. Can your artisans also do sales? Are staff trained on multiple crafts or business functions?',
    weight: 1.2,
  },
  {
    id: 'oc-4',
    section: 'organizationalCapacities',
    construct: 'externalResources',
    question: 'We can access external resources and expertise when needed',
    helpText: 'For example: A Colombian coffee cooperative taps into a university agricultural extension program for soil testing and receives free business coaching through an NGO partnership. Can you access business mentors, NGO support, government programs, or university partnerships when you need help?',
    weight: 1.1,
  },
  {
    id: 'oc-5',
    section: 'organizationalCapacities',
    construct: 'ipProtection',
    question: 'We have legal protections for our cultural intellectual property',
    helpText: 'For example: Darjeeling tea producers secured a Geographical Indication (GI) tag that prevents other regions from using the name, protecting both cultural identity and price premiums. Do you have registered trademarks, GI certification, copyright on designs, or community protocols?',
    weight: 1.0,
  },
  {
    id: 'oc-6',
    section: 'organizationalCapacities',
    construct: 'financialReserves',
    question: 'We maintain financial reserves for unexpected challenges',
    helpText: 'For example: A Balinese silver jewellery workshop keeps a "rainy season fund" equal to 4 months of operating costs, built up gradually during peak tourist seasons. Do you have 3+ months of operating expenses saved, or access to emergency loans or credit lines?',
    weight: 1.2,
  },
  {
    id: 'oc-7',
    section: 'organizationalCapacities',
    construct: 'communityDecisionMaking',
    question: 'Community members make key strategic decisions',
    helpText: 'For example: A Mexican cooperative of indigenous potters holds a quarterly assembly where every member votes on pricing, new product lines, and how profits are reinvested. Do you have an elected board, community voting on major decisions, or regular community meetings that shape strategy?',
    weight: 1.4,
  },
  {
    id: 'oc-8',
    section: 'organizationalCapacities',
    construct: 'benefitDistribution',
    question: 'Benefits flow primarily to community members',
    helpText: 'For example: A Rwandan basket-weaving cooperative distributes 70% of profits directly to weavers and invests the remaining 30% in community health insurance. Do you have profit-sharing with artisans, above-market wages, or a community development fund?',
    weight: 1.3,
  },
  {
    id: 'oc-9',
    section: 'organizationalCapacities',
    construct: 'purposeClarity',
    question: 'Our organization has a clearly articulated cultural mission that guides decisions during difficult times',
    helpText: 'For example: When a Montreal festival faced budget cuts during COVID, their clearly defined mission — "to be the living bridge between Haitian heritage and Québécois culture" — helped them decide which programs to keep and which to pause, rather than cutting randomly. Can your team articulate "why we exist" beyond making money? Does your mission guide trade-off decisions during crises?',
    weight: 1.3,
  },
  {
    id: 'oc-10',
    section: 'organizationalCapacities',
    construct: 'allianceNetworks',
    question: 'We have alliance networks we can call on for support',
    helpText: 'For example: During a supply shortage, a Turkish carpet cooperative reached out to its fair-trade network and within days secured alternative wool from a partner cooperative in neighbouring Georgia. Are you part of craft associations, fair trade networks, cooperative alliances, or industry groups you can call on?',
    weight: 1.1,
  },
  {
    id: 'oc-11',
    section: 'organizationalCapacities',
    construct: 'dependencyRisk',
    question: 'Our organization depends heavily on one or two key people, and would struggle if they left',
    helpText: 'For example: A Kashmiri pashmina workshop relied entirely on one master weaver for quality control — when he fell ill for three months, production halted completely because no one else could judge the final product. Is your enterprise heavily dependent on specific individuals whose absence would cause serious problems?',
    weight: 1.2,
    reverse: true,
  },
]

// Economic Resilience Outcomes questions (Section E: 12 questions)
export const economicResilienceQuestions: LikertQuestion[] = [
  {
    id: 'er-1',
    section: 'economicResilience',
    construct: 'revenueRetention',
    question: 'During the most recent economic shock, we maintained at least 70% of revenue',
    helpText: 'For example: A Tuscan olive oil producer kept 75% of revenue during COVID by rapidly shifting from restaurant supply to direct-to-consumer gift boxes. Did you keep most sales during a major disruption, or weather a significant competitive threat without major revenue loss?',
    weight: 1.3,
    allowNA: true,
  },
  {
    id: 'er-2',
    section: 'economicResilience',
    construct: 'teamRetention',
    question: 'We retained at least 80% of our team during the last disruption',
    helpText: 'For example: A Rajasthani puppet-making collective kept all 15 artisans employed during the pandemic by temporarily shifting to making decorative masks, ensuring no one lost their livelihood. Did you keep artisans employed during slow seasons or avoid layoffs during a crisis?',
    weight: 1.2,
    allowNA: true,
  },
  {
    id: 'er-3',
    section: 'economicResilience',
    construct: 'recoverySpeed',
    question: 'We recovered to pre-shock performance levels within 12 months',
    helpText: 'For example: After a devastating flood, a Thai silk village rebuilt its workshop and regained pre-flood sales within 9 months — partly because loyal international buyers pre-ordered to support recovery. Were you back to normal sales within a year, or did you regain lost customers relatively quickly?',
    weight: 1.4,
    allowNA: true,
  },
  {
    id: 'er-4',
    section: 'economicResilience',
    construct: 'opportunityDiscovery',
    question: 'Disruptions have led us to discover new market opportunities',
    helpText: 'For example: When border closures killed tourist sales, a Nepali singing bowl maker started hosting virtual "sound healing" sessions on Zoom, discovering an entirely new wellness-focused customer base. Have disruptions led you to start online sales, find new customer segments, or discover unexpected demand?',
    weight: 1.1,
    allowNA: true,
  },
  {
    id: 'er-5',
    section: 'economicResilience',
    construct: 'postShockStrength',
    question: 'After the most recent disruption, our organization gained new capabilities or resources it did not have before',
    helpText: 'For example: A Brazilian capoeira school that went virtual during lockdown emerged with professional video production skills, a global online membership, and partnerships with three international cultural centres — none of which existed before the crisis. Did you gain new skills, markets, systems, networks, or brand recognition because of a disruption?',
    weight: 1.5,
    allowNA: true,
  },
  {
    id: 'er-6',
    section: 'economicResilience',
    construct: 'communitySpillover',
    question: 'Our success has spawned new initiatives in the community',
    helpText: 'For example: After one Oaxacan mezcal producer gained international recognition, five neighbouring families started their own labels, and a local glass-blowing workshop opened to supply artisanal bottles — creating a cultural enterprise cluster. Has your success inspired others to start businesses or helped create a local creative economy?',
    weight: 1.0,
    allowNA: true,
  },
  {
    id: 'er-7',
    section: 'economicResilience',
    construct: 'jobCreation',
    question: 'We have created new jobs beyond our core team',
    helpText: 'For example: A Ghanaian kente weaving enterprise now employs 12 weavers directly, but has also created work for 30+ people in thread-dyeing, packaging, transport, and local retail. Have your suppliers hired more people, has a packaging business grown around you, or have transport and service jobs been created?',
    weight: 1.1,
    allowNA: true,
  },
  {
    id: 'er-8',
    section: 'economicResilience',
    construct: 'intergenerationalPlanning',
    question: 'We have viable plans for intergenerational continuity',
    helpText: 'For example: A Japanese wagashi (traditional confectionery) shop has a formal 5-year apprenticeship program where the master\'s grandchildren are already learning, and recipes are documented in a family archive. Are you training young apprentices, documenting succession plans, or developing next-generation leaders?',
    weight: 1.2,
  },
  {
    id: 'er-9',
    section: 'economicResilience',
    construct: 'revenueDiversification',
    question: 'Our cultural innovation activities have helped us develop multiple independent revenue streams',
    helpText: 'For example: A Balinese dance troupe earns from live performances, YouTube ad revenue, dance workshop fees, costume rental, and cultural tourism packages — five distinct streams so that a drop in one doesn\'t threaten survival. Do you have at least 3 distinct revenue streams such as product sales, workshops, licensing, tourism, or digital content?',
    weight: 1.3,
  },
  {
    id: 'er-10',
    section: 'economicResilience',
    construct: 'culturalBrandPremium',
    question: 'Our cultural authenticity allows us to maintain prices even when competitors lower theirs',
    helpText: 'For example: When mass-produced imitations flooded the market, a Navajo silversmith collective maintained its premium pricing because buyers trust the "Navajo Made" hallmark — sales barely dipped while imitators competed on price. Does your cultural certification, handmade quality, or authentic origin story protect you from price wars?',
    weight: 1.2,
  },
  {
    id: 'er-11',
    section: 'economicResilience',
    construct: 'culturalInnovationPathway',
    question: 'Our cultural knowledge and traditions were directly responsible for helping us survive or recover from economic hardship',
    helpText: 'For example: When tourism collapsed during COVID, a Balinese silversmith collective fell back on traditional community resource-sharing customs (banjar) to keep artisans fed, then used their deep craft knowledge to pivot to online luxury markets faster than non-cultural competitors. Was it specifically your cultural knowledge, traditions, or community bonds — rather than generic business skills — that got you through?',
    weight: 1.4,
    allowNA: true,
  },
  {
    id: 'er-12',
    section: 'economicResilience',
    construct: 'employmentProtection',
    question: 'Our enterprise maintained or created jobs during the last downturn specifically because of our cultural products or services',
    helpText: 'For example: During the 2008 recession, an Italian ceramics workshop kept all staff employed because demand for authentic handmade goods held steady even as factory-made alternatives collapsed — their cultural authenticity insulated them. Did your cultural products or services specifically help you keep people employed when other businesses around you were cutting staff?',
    weight: 1.0,
    allowNA: true,
  },
]

// Combined Likert questions for easy access
export const likertQuestions: LikertQuestion[] = [
  ...culturalCapitalQuestions,
  ...innovationActivitiesQuestions,
  ...organizationalCapacitiesQuestions,
  ...economicResilienceQuestions,
]

// All V2 questions combined
export const allQuestionsV2: AssessmentQuestionV2[] = [
  ...demographicQuestions,
  ...likertQuestions,
]

// Helper to get questions by section
export const getQuestionsBySection = (section: LikertSection): AssessmentQuestionV2[] => {
  if (section === 'demographics') {
    return demographicQuestions
  }
  return likertQuestions.filter(q => q.section === section)
}

// Question config for scoring module
export const questionConfig = {
  sectionQuestions: {
    demographics: demographicQuestions.map(q => q.id),
    culturalCapital: culturalCapitalQuestions.map(q => q.id),
    innovationActivities: innovationActivitiesQuestions.map(q => q.id),
    organizationalCapacities: organizationalCapacitiesQuestions.map(q => q.id),
    economicResilience: economicResilienceQuestions.map(q => q.id),
  } as Record<LikertSection, string[]>,
  questionConstructs: Object.fromEntries(
    likertQuestions.map(q => [q.id, q.construct])
  ) as Record<string, string>,
}

// Total question counts
export const ASSESSMENT_V2_STATS = {
  totalQuestions: 61,
  demographicQuestions: 17,
  likertQuestions: 44,
  estimatedMinutes: 20,
  sections: 5,
}

// ============================================
// LEGACY BINARY QUESTIONS (preserved for backward compatibility)
// ============================================

export const assessmentQuestions: AssessmentQuestion[] = [
  // Foundation Components
  {
    id: 'cultural-integrity',
    component: 'Cultural Integrity',
    category: 'foundation',
    question: 'Does your initiative preserve authentic cultural elements within innovation?',
    description: 'Cultural integrity means maintaining genuine traditional knowledge, practices, and values while adapting to new contexts. This is about authenticity within innovation, not resistance to change.',
    yesIndicators: [
      'Traditional knowledge is accurately represented',
      'Cultural practitioners are involved in development',
      'Innovation builds on (rather than replaces) traditional practices',
      'Cultural meanings and values are preserved',
    ],
    noIndicators: [
      'Cultural elements are superficial or decorative',
      'Traditional practitioners are excluded',
      'Innovation disconnects from cultural roots',
      'Cultural meanings are lost or distorted',
    ],
    successRate: 90.3,
    discriminatoryPower: 13.8,
  },
  {
    id: 'community-relevance',
    component: 'Community Relevance',
    category: 'foundation',
    question: 'Are the benefits clearly relevant and meaningful to local community needs?',
    description: 'Community relevance ensures the initiative addresses genuine local needs and priorities, not just external market demands or donor requirements.',
    yesIndicators: [
      'Initiative addresses locally-identified priorities',
      'Community members see direct benefits',
      'Outcomes align with community values',
      'Local participation in goal-setting',
    ],
    noIndicators: [
      'Priorities set by external actors',
      'Benefits primarily flow outward',
      'Misalignment with community values',
      'Token or minimal local input',
    ],
    successRate: 90.6,
    discriminatoryPower: 23.9,
  },
  {
    id: 'economic-value',
    component: 'Economic Value Creation',
    category: 'foundation',
    question: 'Does the initiative have a sustainable revenue model or clear economic benefits?',
    description: 'Economic value creation means the initiative generates tangible economic benefits that can sustain operations over time without perpetual external funding.',
    yesIndicators: [
      'Clear revenue streams identified',
      'Market demand demonstrated',
      'Economic benefits to participants',
      'Path to financial sustainability',
    ],
    noIndicators: [
      'Entirely dependent on grants/donations',
      'No market validation',
      'Economic benefits unclear or minimal',
      'No sustainability plan',
    ],
    successRate: 91.7,
    discriminatoryPower: 36.8,
  },
  {
    id: 'adaptability',
    component: 'Adaptability',
    category: 'foundation',
    question: 'Can the initiative adjust to changing conditions while maintaining its core purpose?',
    description: 'Adaptability is the flexibility to modify approaches, products, or operations in response to external changes without losing essential identity or purpose.',
    yesIndicators: [
      'History of successful pivots',
      'Multiple product/service options',
      'Responsive to market feedback',
      'Flexible operational structure',
    ],
    noIndicators: [
      'Rigid, unchanging approaches',
      'Single product/market dependency',
      'Resistance to feedback',
      'Inflexible structures',
    ],
    successRate: 85.2,
    discriminatoryPower: 59.7,
  },

  // Capacity Components
  {
    id: 'adaptive-capacity',
    component: 'Adaptive Capacity',
    category: 'capacity',
    question: 'Can the initiative make meaningful adjustments in response to disruption?',
    description: 'Adaptive capacity is the ability to adjust configurations and processes when faced with disruption while maintaining core cultural values and identity.',
    yesIndicators: [
      'Successfully weathered past disruptions',
      'Learning systems in place',
      'Diverse skill sets available',
      'Access to external resources when needed',
    ],
    noIndicators: [
      'Past disruptions caused major failures',
      'No systematic learning process',
      'Limited skill diversity',
      'Isolated from external support',
    ],
    successRate: 86.3,
    discriminatoryPower: 64.7,
  },
  {
    id: 'social-empowerment',
    component: 'Social Empowerment',
    category: 'capacity',
    question: 'Does the initiative increase community agency and self-determination?',
    description: 'Social empowerment means building community capacity to make decisions, control resources, and shape their own development trajectory.',
    yesIndicators: [
      'Community makes key decisions',
      'Local capacity building prioritized',
      'Increased political voice',
      'Self-determination enhanced',
    ],
    noIndicators: [
      'Decisions made by outsiders',
      'Dependency created',
      'Community voice diminished',
      'External control increased',
    ],
    successRate: 82.4,
    discriminatoryPower: 31.2,
  },
  {
    id: 'community-benefit',
    component: 'Community Benefit',
    category: 'capacity',
    question: 'Do benefits flow directly to community members rather than external actors?',
    description: 'Community benefit ensures that economic and social gains primarily accrue to local community members rather than being extracted by external parties.',
    yesIndicators: [
      'Local employment prioritized',
      'Profits stay in community',
      'Benefit-sharing mechanisms exist',
      'Community infrastructure improved',
    ],
    noIndicators: [
      'External employment dominates',
      'Profits extracted externally',
      'No benefit-sharing',
      'Community neglected',
    ],
    successRate: 84.1,
    discriminatoryPower: 28.5,
  },
  {
    id: 'cultural-protection',
    component: 'Cultural Protection',
    category: 'capacity',
    question: 'Are there active measures to safeguard cultural heritage and prevent exploitation?',
    description: 'Cultural protection involves active mechanisms to prevent misappropriation, ensure proper attribution, and maintain control over cultural representations.',
    yesIndicators: [
      'IP protection in place',
      'Attribution requirements enforced',
      'Misappropriation prevented',
      'Cultural protocols respected',
    ],
    noIndicators: [
      'No IP consideration',
      'Attribution lacking',
      'Exploitation occurring',
      'Protocols violated',
    ],
    successRate: 78.0,
    discriminatoryPower: 25.3,
  },
  {
    id: 'community-control',
    component: 'Community Control',
    category: 'capacity',
    question: 'Does the community maintain ownership and decision-making authority?',
    description: 'Community control means the community retains ownership of assets, makes strategic decisions, and can determine the direction of the initiative.',
    yesIndicators: [
      'Community ownership structures',
      'Local governance boards',
      'Veto power on key decisions',
      'Asset ownership retained',
    ],
    noIndicators: [
      'External ownership dominant',
      'Governance externally controlled',
      'No community veto',
      'Assets owned by outsiders',
    ],
    successRate: 81.9,
    discriminatoryPower: 33.7,
  },
  {
    id: 'protective-capacity',
    component: 'Protective Capacity',
    category: 'capacity',
    question: 'Can the initiative defend against threats and external pressures?',
    description: 'Protective capacity is the ability to defend cultural and economic assets against external threats, market pressures, or hostile actors.',
    yesIndicators: [
      'Legal protections established',
      'Political advocacy capacity',
      'Resource reserves for defense',
      'Alliance networks for support',
    ],
    noIndicators: [
      'No legal protection',
      'Limited advocacy capacity',
      'No reserves for challenges',
      'Isolated from support networks',
    ],
    successRate: 78.0,
    discriminatoryPower: 22.4,
  },

  // Outcome Components
  {
    id: 'transformative-capacity',
    component: 'Transformative Capacity',
    category: 'outcome',
    question: 'Can the initiative create fundamentally new configurations and opportunities?',
    description: 'Transformative capacity is the ability to create entirely new products, markets, or organizational forms that leverage cultural assets in novel ways.',
    yesIndicators: [
      'New markets created',
      'Innovative products developed',
      'New organizational forms',
      'Paradigm-shifting approaches',
    ],
    noIndicators: [
      'Existing markets only',
      'Traditional products unchanged',
      'Conventional organization',
      'Incremental changes only',
    ],
    successRate: 71.0,
    discriminatoryPower: 41.8,
  },
  {
    id: 'generative-capacity',
    component: 'Generative Capacity',
    category: 'outcome',
    question: 'Does the initiative generate new opportunities and spillover benefits?',
    description: 'Generative capacity is the ability to create new opportunities, inspire others, and generate positive spillover effects beyond the immediate initiative.',
    yesIndicators: [
      'Spawned new initiatives',
      'Created new jobs/enterprises',
      'Influenced other communities',
      'Generated knowledge spillovers',
    ],
    noIndicators: [
      'Isolated impact only',
      'No job creation beyond initiative',
      'No external influence',
      'Knowledge kept internal',
    ],
    successRate: 69.0,
    discriminatoryPower: 38.9,
  },
  {
    id: 'sustainable-development',
    component: 'Sustainable Development',
    category: 'outcome',
    question: 'Is the initiative designed for long-term viability across generations?',
    description: 'Sustainable development ensures the initiative can continue across generations, balancing current benefits with preservation of resources and knowledge for the future.',
    yesIndicators: [
      'Intergenerational planning',
      'Environmental sustainability',
      'Knowledge transfer systems',
      'Long-term financial planning',
    ],
    noIndicators: [
      'Short-term focus only',
      'Environmental degradation',
      'No knowledge transfer',
      'No financial sustainability plan',
    ],
    successRate: 77.8,
    discriminatoryPower: 29.6,
  },
]

export const getQuestionsByCategory = (category: AssessmentQuestion['category']): AssessmentQuestion[] => {
  return assessmentQuestions.filter(q => q.category === category)
}

export const calculateScoreInterpretation = (score: number): {
  level: string
  successRate: number
  description: string
  color: string
} => {
  if (score <= 3) {
    return {
      level: 'Critical',
      successRate: 15.7,
      description: 'High risk of failure. Focus on building foundation components before scaling.',
      color: 'text-red-600',
    }
  } else if (score <= 5) {
    return {
      level: 'Low',
      successRate: 28.2,
      description: 'Significant gaps exist. Prioritize missing foundation and capacity elements.',
      color: 'text-orange-600',
    }
  } else if (score <= 7) {
    return {
      level: 'Medium',
      successRate: 51.2,
      description: 'Approaching critical threshold. Small improvements can yield dramatic gains.',
      color: 'text-yellow-600',
    }
  } else if (score <= 9) {
    return {
      level: 'Medium-High',
      successRate: 98.6,
      description: 'Above critical threshold. Strong foundation with high success probability.',
      color: 'text-green-600',
    }
  } else if (score <= 11) {
    return {
      level: 'High',
      successRate: 98.5,
      description: 'Excellent performance. Focus on transformative and generative capacities.',
      color: 'text-emerald-600',
    }
  } else {
    return {
      level: 'Excellent',
      successRate: 96.7,
      description: 'Outstanding cultural innovation profile. Model for others to follow.',
      color: 'text-teal-600',
    }
  }
}

export const DATABASE_AVERAGE_SCORE = 8.38
export const CRITICAL_THRESHOLD = 7
export const SUCCESS_RATE_AT_THRESHOLD = 64.7
export const SUCCESS_RATE_ABOVE_THRESHOLD = 100

// Five necessary conditions with highest discriminatory power
export const necessaryConditions = [
  { component: 'Economic Value Creation', successRate: 91.7, discriminatoryPower: 36.8 },
  { component: 'Community Relevance', successRate: 90.6, discriminatoryPower: 23.9 },
  { component: 'Cultural Integrity', successRate: 90.3, discriminatoryPower: 13.8 },
  { component: 'Adaptive Capacity', successRate: 86.3, discriminatoryPower: 64.7 },
  { component: 'Adaptability', successRate: 85.2, discriminatoryPower: 59.7 },
]

// Synergy effects between components
export const synergyEffects = [
  { combination: 'Cultural Integrity + Adaptive Capacity', bonus: 9.2 },
  { combination: 'Community Relevance + Adaptive Capacity', bonus: 7.7 },
  { combination: 'Economic Value + Cultural Integrity', bonus: 7.1 },
]

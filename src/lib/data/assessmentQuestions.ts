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

// New Likert-scale question interface for 40-question assessment
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
}

export interface DemographicQuestion {
  id: string
  section: 'demographics'
  question: string
  helpText?: string
  type: 'select' | 'text' | 'number' | 'multiselect' | 'textarea'
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
  { value: 'performing-arts', label: 'Performing Arts' },
  { value: 'visual-arts', label: 'Visual Arts' },
  { value: 'music', label: 'Music & Audio' },
  { value: 'food-beverage', label: 'Food & Beverage' },
  { value: 'fashion-textiles', label: 'Fashion & Textiles' },
  { value: 'heritage-tourism', label: 'Heritage Tourism' },
  { value: 'publishing-media', label: 'Publishing & Media' },
  { value: 'design', label: 'Design & Creative Services' },
  { value: 'education', label: 'Cultural Education' },
  { value: 'wellness', label: 'Traditional Wellness & Medicine' },
  { value: 'agriculture', label: 'Cultural Agriculture & Farming' },
  { value: 'multi-sector', label: 'Multiple Sectors' },
]

// Business stage options
export const BUSINESS_STAGES = [
  { value: 'idea', label: 'Idea / Concept Stage' },
  { value: 'startup', label: 'Startup (0-2 years)' },
  { value: 'growth', label: 'Growth Stage (2-5 years)' },
  { value: 'scaling', label: 'Scaling (5-10 years)' },
  { value: 'established', label: 'Established (10+ years)' },
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
  { value: '<10k', label: 'Less than $10,000 USD' },
  { value: '10k-50k', label: '$10,000 - $50,000 USD' },
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
  { value: 'traditional-crafts', label: 'Traditional crafts/textiles' },
  { value: 'music-performing-arts', label: 'Music/performing arts' },
  { value: 'food-culinary', label: 'Food/culinary traditions' },
  { value: 'digital-content', label: 'Digital content creation' },
  { value: 'cultural-tourism', label: 'Cultural tourism' },
  { value: 'traditional-medicine', label: 'Traditional medicine/wellness' },
  { value: 'language-literature', label: 'Language/literature' },
  { value: 'visual-arts', label: 'Visual arts' },
  { value: 'fashion-design', label: 'Fashion/design' },
  { value: 'mobility', label: 'Mobility' },
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
    id: 'demo-state-region',
    section: 'demographics',
    question: 'State/Region',
    helpText: 'Select your state or region',
    type: 'select',
    options: INDIAN_STATES,
    required: true,
  },
  {
    id: 'demo-cultural-innovation-type',
    section: 'demographics',
    question: 'Type of Cultural Innovation (Select all that apply)',
    helpText: 'Select all the areas where you are innovating culturally',
    type: 'multiselect',
    options: CULTURAL_INNOVATION_TYPES,
    required: true,
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
    question: 'Which cultural sector best describes your primary focus?',
    type: 'select',
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
    id: 'demo-revenue',
    section: 'demographics',
    question: 'What is your approximate annual revenue/budget?',
    type: 'select',
    options: REVENUE_RANGES,
    required: true,
  },
  {
    id: 'demo-region',
    section: 'demographics',
    question: 'In which region is your initiative primarily based?',
    type: 'select',
    options: [
      { value: 'africa', label: 'Africa' },
      { value: 'asia-pacific', label: 'Asia Pacific' },
      { value: 'europe', label: 'Europe' },
      { value: 'latin-america', label: 'Latin America & Caribbean' },
      { value: 'middle-east', label: 'Middle East & North Africa' },
      { value: 'north-america', label: 'North America' },
      { value: 'oceania', label: 'Oceania' },
      { value: 'global', label: 'Global / Multiple Regions' },
    ],
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
  {
    id: 'demo-income-challenges',
    section: 'demographics',
    question: 'What are your biggest challenges in generating income?',
    helpText: 'Describe the main obstacles you face in creating sustainable income from your cultural work',
    type: 'textarea',
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
    'demo-sector': 'industry',
    'demo-stage': 'business_stage',
    'demo-team-size': 'team_size',
    'demo-revenue': 'revenue_range',
    'demo-age-group': 'age_group',
    'demo-gender': 'gender',
    'demo-state-region': 'state_region',
    'demo-cultural-innovation-type': 'cultural_innovation_types',
    'demo-revenue-sources': 'revenue_sources',
    'demo-income-challenges': 'income_challenges',
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

// Cultural Capital questions (Section B: 8 questions)
export const culturalCapitalQuestions: LikertQuestion[] = [
  {
    id: 'cc-1',
    section: 'culturalCapital',
    construct: 'traditionalKnowledge',
    question: 'Our organization has documented traditional knowledge relevant to our activities',
    helpText: 'Examples: recipe books, technique guides, video tutorials, recorded interviews with elders',
    weight: 1.0,
  },
  {
    id: 'cc-2',
    section: 'culturalCapital',
    construct: 'practitionerAccess',
    question: 'We have access to skilled practitioners of traditional techniques',
    helpText: 'Examples: master weavers, traditional chefs, elder craftspeople, trained apprentices',
    weight: 1.2,
  },
  {
    id: 'cc-3',
    section: 'culturalCapital',
    construct: 'culturalAuthenticity',
    question: 'Our cultural practices have recognized authenticity within source communities',
    helpText: 'Examples: community endorsements, cultural council approval, elder recognition',
    weight: 1.3,
  },
  {
    id: 'cc-4',
    section: 'culturalCapital',
    construct: 'communityInvolvement',
    question: 'Cultural practitioners from source communities are involved in development decisions',
    helpText: 'Examples: advisory board seats, design review panels, regular community consultations',
    weight: 1.4,
  },
  {
    id: 'cc-5',
    section: 'culturalCapital',
    construct: 'culturalPreservation',
    question: 'Our innovations build upon (rather than replace) traditional practices',
    helpText: 'Examples: adding new colorways to traditional patterns vs. replacing handwork with machines',
    weight: 1.1,
  },
  {
    id: 'cc-6',
    section: 'culturalCapital',
    construct: 'culturalMeaning',
    question: 'Cultural meanings and values are preserved in our commercial activities',
    helpText: 'Examples: keeping ceremonial items separate from commercial, explaining symbolism to buyers',
    weight: 1.0,
  },
  {
    id: 'cc-7',
    section: 'culturalCapital',
    construct: 'practitionerRelationships',
    question: 'We have strong relationships with cultural knowledge holders',
    helpText: 'Examples: regular visits, fair compensation, sharing profits, co-authoring work',
    weight: 1.0,
  },
  {
    id: 'cc-8',
    section: 'culturalCapital',
    construct: 'culturalMembership',
    question: 'Our team includes members from the source culture community',
    helpText: 'Examples: founders from the community, cultural advisors, community members on staff',
    weight: 0.9,
  },
]

// Innovation Activities questions (Section C: 8 questions)
export const innovationActivitiesQuestions: LikertQuestion[] = [
  {
    id: 'ia-1',
    section: 'innovationActivities',
    construct: 'productDevelopment',
    question: 'We regularly develop new products/services based on cultural assets',
    helpText: 'Examples: new product lines each season, limited editions, custom offerings',
    weight: 1.2,
  },
  {
    id: 'ia-2',
    section: 'innovationActivities',
    construct: 'techniqueCombination',
    question: 'We experiment with combining traditional and modern techniques',
    helpText: 'Examples: hand-dyed fabric with modern cuts, traditional recipes with new presentations',
    weight: 1.1,
  },
  {
    id: 'ia-3',
    section: 'innovationActivities',
    construct: 'innovationLeadership',
    question: 'We have introduced innovations that others in our sector have adopted',
    helpText: 'Examples: your packaging style got copied, you pioneered a new product category',
    weight: 1.3,
  },
  {
    id: 'ia-4',
    section: 'innovationActivities',
    construct: 'marketExpansion',
    question: 'We have successfully entered new geographic markets',
    helpText: 'Examples: selling abroad, opening in new cities, reaching customers in new regions',
    weight: 1.0,
  },
  {
    id: 'ia-5',
    section: 'innovationActivities',
    construct: 'digitalDistribution',
    question: 'We use digital channels effectively for cultural product distribution',
    helpText: 'Examples: Etsy/Amazon store, Instagram shopping, your own website with checkout',
    weight: 0.9,
  },
  {
    id: 'ia-6',
    section: 'innovationActivities',
    construct: 'efficiencyImprovement',
    question: 'We have improved efficiency while maintaining cultural authenticity',
    helpText: 'Examples: better tools that speed up work, streamlined ordering, improved workspace layout',
    weight: 1.0,
  },
  {
    id: 'ia-7',
    section: 'innovationActivities',
    construct: 'externalCollaboration',
    question: 'We collaborate with external partners on innovation projects',
    helpText: 'Examples: working with designers, universities, NGOs, or other artisan groups',
    weight: 1.1,
  },
  {
    id: 'ia-8',
    section: 'innovationActivities',
    construct: 'feedbackIteration',
    question: 'We actively seek feedback and iterate on our offerings',
    helpText: 'Examples: customer surveys, testing prototypes, adjusting based on reviews',
    weight: 1.2,
  },
]

// Organizational Capacities questions (Section D: 10 questions)
export const organizationalCapacitiesQuestions: LikertQuestion[] = [
  {
    id: 'oc-1',
    section: 'organizationalCapacities',
    construct: 'adaptiveResponse',
    question: 'We have successfully adjusted operations in response to past disruptions',
    helpText: 'Examples: pivoted to online sales during COVID, found new suppliers when old ones closed',
    weight: 1.5,
  },
  {
    id: 'oc-2',
    section: 'organizationalCapacities',
    construct: 'learningFromSetbacks',
    question: 'We have systematic processes for learning from setbacks',
    helpText: 'Examples: team debriefs after failed projects, documenting lessons learned',
    weight: 1.3,
  },
  {
    id: 'oc-3',
    section: 'organizationalCapacities',
    construct: 'skillDiversity',
    question: 'Our team has diverse skills that allow flexibility',
    helpText: 'Examples: artisans who can also do sales, staff trained on multiple crafts',
    weight: 1.2,
  },
  {
    id: 'oc-4',
    section: 'organizationalCapacities',
    construct: 'externalResources',
    question: 'We can access external resources and expertise when needed',
    helpText: 'Examples: business mentors, NGO support, government programs, university partnerships',
    weight: 1.1,
  },
  {
    id: 'oc-5',
    section: 'organizationalCapacities',
    construct: 'ipProtection',
    question: 'We have legal protections for our cultural intellectual property',
    helpText: 'Examples: registered trademark, GI certification, copyright on designs, community protocols',
    weight: 1.0,
  },
  {
    id: 'oc-6',
    section: 'organizationalCapacities',
    construct: 'financialReserves',
    question: 'We maintain financial reserves for unexpected challenges',
    helpText: 'Examples: 3+ months operating expenses saved, access to emergency loans or credit',
    weight: 1.2,
  },
  {
    id: 'oc-7',
    section: 'organizationalCapacities',
    construct: 'communityDecisionMaking',
    question: 'Community members make key strategic decisions',
    helpText: 'Examples: elected board, community voting on major decisions, regular community meetings',
    weight: 1.4,
  },
  {
    id: 'oc-8',
    section: 'organizationalCapacities',
    construct: 'benefitDistribution',
    question: 'Benefits flow primarily to community members',
    helpText: 'Examples: profit-sharing with artisans, above-market wages, community development fund',
    weight: 1.3,
  },
  {
    id: 'oc-9',
    section: 'organizationalCapacities',
    construct: 'communityOwnership',
    question: 'Community members have ownership stakes in our enterprise',
    helpText: 'Examples: cooperative membership, community trust ownership, artisan equity shares',
    weight: 1.4,
  },
  {
    id: 'oc-10',
    section: 'organizationalCapacities',
    construct: 'allianceNetworks',
    question: 'We have alliance networks we can call on for support',
    helpText: 'Examples: craft associations, fair trade networks, other cooperatives, industry groups',
    weight: 1.1,
  },
]

// Economic Resilience Outcomes questions (Section E: 8 questions)
export const economicResilienceQuestions: LikertQuestion[] = [
  {
    id: 'er-1',
    section: 'economicResilience',
    construct: 'revenueRetention',
    question: 'During the most recent economic shock, we maintained at least 70% of revenue',
    helpText: 'Examples: kept most sales during COVID, weathered a major competitor entering your market',
    weight: 1.3,
  },
  {
    id: 'er-2',
    section: 'economicResilience',
    construct: 'teamRetention',
    question: 'We retained at least 80% of our team during the last disruption',
    helpText: 'Examples: kept artisans employed during slow seasons, no layoffs during the pandemic',
    weight: 1.2,
  },
  {
    id: 'er-3',
    section: 'economicResilience',
    construct: 'recoverySpeed',
    question: 'We recovered to pre-shock performance levels within 12 months',
    helpText: 'Examples: back to normal sales within a year, regained lost customers quickly',
    weight: 1.4,
  },
  {
    id: 'er-4',
    section: 'economicResilience',
    construct: 'opportunityDiscovery',
    question: 'Disruptions have led us to discover new market opportunities',
    helpText: 'Examples: started online sales during lockdown, found new customer segments',
    weight: 1.1,
  },
  {
    id: 'er-5',
    section: 'economicResilience',
    construct: 'postShockStrength',
    question: 'Our organization is stronger now than before the last major shock',
    helpText: 'Examples: better systems, stronger team, more diverse customers than before the crisis',
    weight: 1.5,
  },
  {
    id: 'er-6',
    section: 'economicResilience',
    construct: 'communitySpillover',
    question: 'Our success has spawned new initiatives in the community',
    helpText: 'Examples: inspired others to start businesses, created a local craft cluster',
    weight: 1.0,
  },
  {
    id: 'er-7',
    section: 'economicResilience',
    construct: 'jobCreation',
    question: 'We have created new jobs beyond our core team',
    helpText: 'Examples: suppliers hired more people, packaging business grew, transport jobs created',
    weight: 1.1,
  },
  {
    id: 'er-8',
    section: 'economicResilience',
    construct: 'intergenerationalPlanning',
    question: 'We have viable plans for intergenerational continuity',
    helpText: 'Examples: training young apprentices, documented succession plan, next-gen leaders identified',
    weight: 1.2,
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
  totalQuestions: 48,
  demographicQuestions: 14,
  likertQuestions: 34,
  estimatedMinutes: 15,
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
      description: 'Excellent resilience profile. Focus on transformative and generative capacities.',
      color: 'text-emerald-600',
    }
  } else {
    return {
      level: 'Excellent',
      successRate: 96.7,
      description: 'Outstanding cultural innovation resilience. Model for others to follow.',
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

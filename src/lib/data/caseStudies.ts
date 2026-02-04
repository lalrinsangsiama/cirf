export interface Citation {
  author: string
  year: number | string
  title: string
  journal?: string
  doi?: string
  url?: string
  accessDate?: string
}

export interface CaseStudy {
  id: string
  region: string
  country: string
  continent: string
  category: string
  title: string
  stats: { value: string; label: string }[]
  description: string
  color: string
  location: { lat: number; lng: number }
  period: string
  cilScore: number
  outcome: 'success' | 'failure' | 'mixed'
  fullDescription: string
  innovations: string[]
  lessons: string[]
  source: string
  citations: Citation[]
  verifiedDate: string
  confidenceLevel: 'high' | 'medium' | 'low'
  unescoRecognition?: string
}

export const verifiedCaseStudies: CaseStudy[] = [
  {
    id: 'vietnamese-craft-villages',
    region: 'Vietnam',
    country: 'Vietnam',
    continent: 'Asia Pacific',
    category: 'Crafts & Heritage',
    title: 'Vietnamese Traditional Craft Villages',
    stats: [
      { value: '13/13', label: 'CIL Score' },
      { value: '1000+', label: 'Years of Tradition' },
      { value: '2,000+', label: 'Craft Villages' },
    ],
    description: 'Historic craft villages like Bat Trang (ceramics) and Hoi An (silk, lanterns) demonstrate perfect cultural innovation resilience through community-controlled, sustainable development models.',
    color: 'from-terracotta to-gold',
    location: { lat: 21.0, lng: 105.8 },
    period: '2017-2024',
    cilScore: 13,
    outcome: 'success',
    fullDescription: 'Vietnamese traditional craft villages represent the gold standard for cultural innovation resilience. These communities have maintained authentic practices for over a millennium while successfully adapting to modern markets. Bat Trang ceramics village near Hanoi and the artisan communities of Hoi An exemplify how cultural integrity, community control, and economic value creation can coexist and reinforce each other.',
    innovations: [
      'Community-controlled tourism and export models',
      'Intergenerational knowledge transfer systems',
      'UNESCO heritage integration with economic development',
      'Sustainable material sourcing and traditional techniques',
      'Digital marketplace adoption while maintaining authenticity',
    ],
    lessons: [
      'Perfect CIL scores are achievable through holistic community development',
      'Long-term cultural continuity strengthens rather than limits economic potential',
      'Community ownership ensures benefits stay local',
    ],
    source: 'UNESCO, multiple studies 2017-2024',
    citations: [
      {
        author: 'UNESCO',
        year: 2019,
        title: 'Traditional Craftsmanship in Vietnam: Safeguarding Living Heritage',
        journal: 'UNESCO Intangible Cultural Heritage Section',
        url: 'https://ich.unesco.org/en/lists',
        accessDate: '2024-12-01',
      },
      {
        author: 'Nguyen, T. H. & Tran, V. T.',
        year: 2021,
        title: 'Sustainable Development of Traditional Craft Villages in Vietnam',
        journal: 'Journal of Asian Rural Studies',
        doi: '10.20956/jars.v5i1.2815',
      },
      {
        author: 'Vietnam National Administration of Tourism',
        year: 2023,
        title: 'Traditional Craft Village Tourism Development Report',
        url: 'https://vietnamtourism.gov.vn',
        accessDate: '2024-12-01',
      },
    ],
    verifiedDate: '2024-12-01',
    confidenceLevel: 'high',
  },
  {
    id: 'nunavut-indigenous-enterprises',
    region: 'Nunavut',
    country: 'Canada',
    continent: 'Americas',
    category: 'Indigenous Enterprise',
    title: 'Canadian Nunavut Indigenous Enterprises',
    stats: [
      { value: '13/13', label: 'CIL Score' },
      { value: '85%', label: 'Inuit Owned' },
      { value: 'C$1B+', label: 'Annual Revenue' },
    ],
    description: 'Inuit-owned corporations demonstrate how indigenous governance structures and traditional knowledge can drive large-scale economic success while preserving cultural identity.',
    color: 'from-ocean to-lavender',
    location: { lat: 63.7, lng: -68.5 },
    period: '2009-2024',
    cilScore: 13,
    outcome: 'success',
    fullDescription: 'Nunavut\'s Indigenous Development Corporations represent a remarkable model of indigenous economic self-determination. Companies like Qikiqtaaluk Corporation and Nunavut Tunngavik Incorporated have built billion-dollar enterprises while maintaining Inuit governance principles, language preservation, and benefit-sharing across communities.',
    innovations: [
      'Indigenous governance integrated into corporate structure',
      'Benefit-sharing agreements across communities',
      'Traditional ecological knowledge in business operations',
      'Inuit language preservation in workplace',
      'Youth employment and training programs',
    ],
    lessons: [
      'Indigenous governance can scale to major enterprises',
      'Community benefit-sharing ensures broad-based support',
      'Traditional knowledge remains relevant in modern business',
    ],
    source: 'Mason et al. 2009; Dana & Anderson 2011',
    citations: [
      {
        author: 'Mason, A. M., Dana, L.-P., & Anderson, R. B.',
        year: 2009,
        title: 'A Study of the Impact of COPE on Economic Development in Nunavut',
        journal: 'International Journal of Entrepreneurship and Small Business',
        doi: '10.1504/IJESB.2009.024384',
      },
      {
        author: 'Dana, L.-P. & Anderson, R. B.',
        year: 2011,
        title: 'International Handbook of Research on Indigenous Entrepreneurship',
        journal: 'Edward Elgar Publishing',
        doi: '10.4337/9781849803052',
      },
      {
        author: 'Qikiqtaaluk Corporation',
        year: 2023,
        title: 'Annual Report 2023',
        url: 'https://www.qcorp.ca',
        accessDate: '2024-12-01',
      },
    ],
    verifiedDate: '2024-12-01',
    confidenceLevel: 'high',
  },
  {
    id: 'palestinian-tatreez',
    region: 'Palestine',
    country: 'Palestine',
    continent: 'Middle East',
    category: 'Crafts & Heritage',
    title: 'Palestinian Tatreez Embroidery',
    stats: [
      { value: '13/13', label: 'CIL Score' },
      { value: 'Active', label: 'Women\'s Cooperatives' },
      { value: '2021', label: 'UNESCO Recognition' },
    ],
    description: 'Traditional cross-stitch embroidery has become a symbol of cultural resistance and women\'s economic empowerment, recognized by UNESCO as intangible cultural heritage.',
    color: 'from-terracotta to-sage',
    location: { lat: 31.9, lng: 35.2 },
    period: '2015-2024',
    cilScore: 13,
    outcome: 'success',
    fullDescription: 'Palestinian Tatreez embroidery demonstrates how cultural practices can serve as vehicles for both economic empowerment and cultural preservation under challenging circumstances. The craft has been revitalized through women\'s cooperatives, fashion collaborations, and UNESCO recognition, creating sustainable livelihoods while preserving traditional patterns that encode regional and family identities.',
    innovations: [
      'Women\'s cooperative ownership models',
      'Fashion industry collaborations maintaining authenticity',
      'Digital archiving of traditional patterns',
      'Cultural tourism integration',
      'Youth education programs',
    ],
    lessons: [
      'Cultural practices can strengthen community resilience in adversity',
      'Women\'s economic empowerment multiplies cultural preservation',
      'UNESCO recognition amplifies market access',
    ],
    source: 'UNESCO 2021',
    citations: [
      {
        author: 'UNESCO',
        year: 2021,
        title: 'The art of embroidery in Palestine, practices, skills, knowledge and rituals',
        journal: 'Representative List of the Intangible Cultural Heritage of Humanity',
        url: 'https://ich.unesco.org/en/RL/the-art-of-embroidery-in-palestine-practices-skills-knowledge-and-rituals-01614',
        accessDate: '2024-12-01',
      },
      {
        author: 'Saca, I.',
        year: 2006,
        title: 'Embroidering Identities: A Century of Palestinian Clothing',
        journal: 'Oriental Institute Museum Publications, University of Chicago',
      },
      {
        author: 'Kawar, W.',
        year: 2011,
        title: 'Threads of Identity: Preserving Palestinian Costume and Heritage',
        journal: 'Rimal Publications',
      },
    ],
    verifiedDate: '2024-12-01',
    confidenceLevel: 'high',
    unescoRecognition: 'Inscribed 2021 - Intangible Cultural Heritage',
  },
  {
    id: 'korean-hanji',
    region: 'South Korea',
    country: 'South Korea',
    continent: 'Asia Pacific',
    category: 'Crafts & Heritage',
    title: 'South Korean Hanji Paper Craft',
    stats: [
      { value: '13/13', label: 'CIL Score' },
      { value: '1000+', label: 'Years of Tradition' },
      { value: 'Growing', label: 'Global Market' },
    ],
    description: 'Traditional Korean paper-making has been transformed into a high-value heritage industry through government support, design innovation, and luxury market positioning.',
    color: 'from-sand to-pearl',
    location: { lat: 35.9, lng: 127.8 },
    period: '2019-2024',
    cilScore: 13,
    outcome: 'success',
    fullDescription: 'Hanji, traditional Korean paper made from mulberry bark, has experienced a renaissance through strategic cultural innovation. The Korea Craft & Design Foundation has supported master artisans, developed new applications in architecture, fashion, and art conservation, and positioned Hanji as a premium sustainable material in global markets.',
    innovations: [
      'New applications in architecture and interior design',
      'Art conservation market development',
      'Sustainable fashion material positioning',
      'Master artisan certification system',
      'International design collaborations',
    ],
    lessons: [
      'Government support can catalyze cultural innovation',
      'Traditional materials can enter premium global markets',
      'Design innovation expands market applications',
    ],
    source: 'Korea Craft & Design Foundation 2019-2024',
    citations: [
      {
        author: 'Korea Craft & Design Foundation',
        year: 2023,
        title: 'Hanji: The Soul of Korean Paper',
        url: 'https://www.kcdf.or.kr',
        accessDate: '2024-12-01',
      },
      {
        author: 'Kim, H. J.',
        year: 2020,
        title: 'The Revival of Traditional Korean Papermaking: Innovation and Preservation',
        journal: 'Journal of Material Culture Studies',
      },
      {
        author: 'Cultural Heritage Administration of Korea',
        year: 2022,
        title: 'Traditional Hanji Craftsmanship: National Intangible Cultural Heritage',
        url: 'https://www.cha.go.kr',
        accessDate: '2024-12-01',
      },
    ],
    verifiedDate: '2024-12-01',
    confidenceLevel: 'medium',
  },
  {
    id: 'mikmaq-clearwater',
    region: 'Nova Scotia',
    country: 'Canada',
    continent: 'Americas',
    category: 'Indigenous Enterprise',
    title: 'Mi\'kmaq Clearwater Seafoods Partnership',
    stats: [
      { value: '12/13', label: 'CIL Score' },
      { value: '50%', label: 'Indigenous Ownership' },
      { value: 'C$1B+', label: 'Company Value' },
    ],
    description: 'A coalition of Mi\'kmaq First Nations acquired 50% ownership of Canada\'s largest shellfish company, creating the largest Indigenous-owned business in Canadian history.',
    color: 'from-ocean to-sage',
    location: { lat: 44.6, lng: -63.6 },
    period: '2020-2024',
    cilScore: 12,
    outcome: 'success',
    fullDescription: 'In 2020, a coalition of seven Mi\'kmaq First Nations acquired 50% ownership of Clearwater Seafoods, creating the largest Indigenous-owned business in Canadian history. This landmark deal demonstrated how indigenous communities can achieve major economic participation while maintaining cultural values and traditional relationships with natural resources.',
    innovations: [
      'Coalition governance across seven First Nations',
      'Traditional stewardship integrated with commercial fishing',
      'Community benefit-sharing framework',
      'Indigenous employment and training programs',
      'Sustainable harvesting practices',
    ],
    lessons: [
      'Large-scale acquisition can achieve community ownership',
      'Coalition models enable major transactions',
      'Traditional values compatible with commercial success',
    ],
    source: 'CBC News, Globe and Mail, 2020-2024',
    citations: [
      {
        author: 'Fagan, D.',
        year: 2021,
        title: 'The Mi\'kmaq Clearwater Deal: A Watershed Moment for Indigenous Business',
        journal: 'The Globe and Mail',
        url: 'https://www.theglobeandmail.com/business/article-mikmaq-coalition-completes-deal-to-buy-50-per-cent-of-clearwater/',
        accessDate: '2024-12-01',
      },
      {
        author: 'Palmater, P.',
        year: 2021,
        title: 'Beyond the Clearwater Deal: Indigenous Economic Sovereignty',
        journal: 'Canadian Journal of Native Studies',
      },
      {
        author: 'Clearwater Seafoods & Premium Brands',
        year: 2023,
        title: 'Annual Report: Partnership with Mi\'kmaq Coalition',
        url: 'https://www.clearwater.ca',
        accessDate: '2024-12-01',
      },
    ],
    verifiedDate: '2024-12-01',
    confidenceLevel: 'high',
  },
  {
    id: 'bangladeshi-nakshi-kantha',
    region: 'Bangladesh',
    country: 'Bangladesh',
    continent: 'Asia Pacific',
    category: 'Crafts & Heritage',
    title: 'Bangladeshi Nakshi Kantha Embroidery',
    stats: [
      { value: '12/13', label: 'CIL Score' },
      { value: 'Millions', label: 'USD Revenue' },
      { value: '99%', label: 'Women Participants' },
    ],
    description: 'Traditional quilted embroidery has become a major women\'s livelihood program, with predominantly female participation creating sustainable income across rural Bangladesh.',
    color: 'from-gold to-terracotta',
    location: { lat: 23.8, lng: 90.4 },
    period: '2013-2024',
    cilScore: 12,
    outcome: 'success',
    fullDescription: 'Nakshi Kantha, the traditional Bengali art of quilting and embroidery, has been transformed into a major economic empowerment vehicle for rural women. Organizations like BRAC and local cooperatives have scaled the craft while maintaining authentic techniques, creating sustainable livelihoods for hundreds of thousands of women who make up 99% of participants.',
    innovations: [
      'Microfinance integration for artisan working capital',
      'Quality certification and fair trade positioning',
      'Design adaptation for international markets',
      'Training and skill development programs',
      'E-commerce and export facilitation',
    ],
    lessons: [
      'Women\'s crafts can scale significantly with proper support',
      'Traditional techniques maintain value in global markets',
      'Cooperative models enable broad participation',
    ],
    source: 'UNESCO, BRAC studies 2013-2024',
    citations: [
      {
        author: 'UNESCO',
        year: 2016,
        title: 'Nakshi Kantha: Documentation of Traditional Knowledge and Skills',
        journal: 'UNESCO Dhaka Office',
        url: 'https://bangkok.unesco.org',
        accessDate: '2024-12-01',
      },
      {
        author: 'BRAC',
        year: 2022,
        title: 'Aarong: Empowering Rural Artisans Through Fair Trade',
        url: 'https://www.brac.net/aarong',
        accessDate: '2024-12-01',
      },
      {
        author: 'Zaman, N.',
        year: 2014,
        title: 'The Art of Kantha Embroidery',
        journal: 'University Press Limited, Dhaka',
      },
    ],
    verifiedDate: '2024-12-01',
    confidenceLevel: 'medium',
  },
  {
    id: 'moroccan-fes-pottery',
    region: 'Fes',
    country: 'Morocco',
    continent: 'Africa',
    category: 'Crafts & Heritage',
    title: 'Moroccan Fes Pottery Cooperatives',
    stats: [
      { value: '12/13', label: 'CIL Score' },
      { value: '1000+', label: 'Years of Tradition' },
      { value: '30%', label: 'Income Increase' },
    ],
    description: 'The pottery cooperatives of Fes demonstrate how traditional guild structures can evolve into modern cooperative enterprises while preserving UNESCO-recognized craftsmanship.',
    color: 'from-ocean to-gold',
    location: { lat: 34.0, lng: -5.0 },
    period: '2021-2024',
    cilScore: 12,
    outcome: 'success',
    fullDescription: 'The pottery workshops of Fes, operating from the UNESCO-listed medina, have transformed traditional guild structures into modern cooperatives. These enterprises maintain centuries-old techniques for blue-and-white ceramics while developing export markets and tourism experiences, achieving 30% income increases for participating artisans.',
    innovations: [
      'Guild-to-cooperative organizational transformation',
      'Tourism experience integration',
      'Export market development',
      'Apprenticeship modernization',
      'Quality standards and authentication systems',
    ],
    lessons: [
      'Traditional guild structures can modernize successfully',
      'UNESCO heritage status supports market positioning',
      'Cooperative models improve artisan incomes',
    ],
    source: 'Ibourk & Raoui 2021, Emerald Insight',
    citations: [
      {
        author: 'Ibourk, A. & Raoui, M.',
        year: 2021,
        title: 'Traditional Crafts and Sustainable Development in Moroccan Medinas',
        journal: 'Emerald Insight - Journal of Cultural Heritage Management and Sustainable Development',
        doi: '10.1108/JCHMSD-01-2021-0008',
      },
      {
        author: 'UNESCO',
        year: 1981,
        title: 'Medina of Fez - World Heritage List',
        url: 'https://whc.unesco.org/en/list/170/',
        accessDate: '2024-12-01',
      },
      {
        author: 'Morocco Ministry of Handicrafts',
        year: 2023,
        title: 'Traditional Pottery Sector Report',
        url: 'https://www.artisanat.gov.ma',
        accessDate: '2024-12-01',
      },
    ],
    verifiedDate: '2024-12-01',
    confidenceLevel: 'high',
  },
  {
    id: 'jamaican-cultural-industries',
    region: 'Jamaica',
    country: 'Jamaica',
    continent: 'Americas',
    category: 'Creative Industries',
    title: 'Jamaican Cultural Creative Industries',
    stats: [
      { value: '11/13', label: 'CIL Score' },
      { value: '5.2%', label: 'of GDP' },
      { value: 'Significant', label: 'Export Value' },
    ],
    description: 'Jamaica\'s music, fashion, and visual arts sectors demonstrate how cultural authenticity drives global export success, contributing significantly to national GDP.',
    color: 'from-sage to-gold',
    location: { lat: 18.1, lng: -77.3 },
    period: '2020-2024',
    cilScore: 11,
    outcome: 'success',
    fullDescription: 'Jamaica\'s cultural and creative industries have achieved remarkable scale, contributing approximately 5.2% of GDP. From reggae and dancehall music to fashion and visual arts, Jamaican cultural production demonstrates how authenticity and innovation combine to create sustainable economic impact.',
    innovations: [
      'Music streaming and digital distribution',
      'Fashion brand development',
      'Cultural tourism integration',
      'IP protection and royalty systems',
      'Creative entrepreneurship education',
    ],
    lessons: [
      'Cultural authenticity can drive export success',
      'Music and fashion create multiplier effects',
      'National cultural identity supports premium positioning',
    ],
    source: 'JBDC-British Council 2020-2024',
    citations: [
      {
        author: 'Jamaica Business Development Corporation & British Council',
        year: 2020,
        title: 'Mapping Jamaica\'s Creative Industries',
        url: 'https://www.jbdc.net',
        accessDate: '2024-12-01',
      },
      {
        author: 'UNESCO',
        year: 2021,
        title: 'Jamaica\'s Reggae Music Inscription - Intangible Cultural Heritage',
        url: 'https://ich.unesco.org/en/RL/reggae-music-of-jamaica-01398',
        accessDate: '2024-12-01',
      },
      {
        author: 'Planning Institute of Jamaica',
        year: 2023,
        title: 'Economic and Social Survey Jamaica: Creative Industries Contribution',
        url: 'https://www.pioj.gov.jm',
        accessDate: '2024-12-01',
      },
    ],
    verifiedDate: '2024-12-01',
    confidenceLevel: 'medium',
  },
]

// Statistics note for transparency
export const CASE_STUDY_STATS = {
  totalFeatured: 8,
  databaseSize: 362,
  disclaimer: 'Research based on 362 case studies analyzed. 8 featured cases with full documentation and verified sources.',
} as const

export const getCaseStudiesByScore = (minScore: number): CaseStudy[] => {
  return verifiedCaseStudies.filter(cs => cs.cilScore >= minScore)
}

export const getCaseStudyById = (id: string): CaseStudy | undefined => {
  return verifiedCaseStudies.find(cs => cs.id === id)
}

export const getMatchingCaseStudies = (userScore: number): CaseStudy[] => {
  // Return cases within 2 points of user's score
  return verifiedCaseStudies.filter(cs =>
    Math.abs(cs.cilScore - userScore) <= 2
  ).slice(0, 3)
}

export const getCaseStudiesByConfidence = (level: 'high' | 'medium' | 'low'): CaseStudy[] => {
  return verifiedCaseStudies.filter(cs => cs.confidenceLevel === level)
}

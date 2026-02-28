/**
 * Tool Page Configurations
 *
 * Defines inputs, formula, and interpretation for each of the 10 interactive tools
 * unlocked by completing secondary assessments.
 */

export interface ToolInput {
  id: string
  label: string
  type: 'number' | 'currency' | 'percentage' | 'slider'
  min: number
  max: number
  step: number
  defaultValue: number
  unit?: string
  helpText?: string
}

export interface InterpretationRange {
  min: number
  max: number
  label: string
  color: string // tailwind color class
  description: string
  actions: string[]
}

export interface ToolPageConfig {
  id: string
  name: string
  description: string
  formula: string
  formulaExplanation: string
  inputs: ToolInput[]
  calculate: (values: Record<string, number>) => number
  formatResult: (result: number) => string
  interpretations: InterpretationRange[]
  relatedTools: string[]
}

export const TOOL_PAGE_CONFIGS: Record<string, ToolPageConfig> = {
  'innovation-intensity-ratio': {
    id: 'innovation-intensity-ratio',
    name: 'Innovation Intensity Ratio',
    description: 'Measures the rate of cultural innovation generation relative to your community size.',
    formula: 'IIR = Innovations / (Population / 1000) / Years',
    formulaExplanation: 'Higher values indicate more active innovation ecosystems. Research shows communities above 2.0 demonstrate sustained economic resilience.',
    inputs: [
      { id: 'innovations', label: 'Number of Cultural Innovations', type: 'number', min: 0, max: 1000, step: 1, defaultValue: 5, helpText: 'Count distinct new products, processes, or services introduced' },
      { id: 'population', label: 'Community Population', type: 'number', min: 1, max: 10000000, step: 100, defaultValue: 5000 },
      { id: 'years', label: 'Time Period (Years)', type: 'number', min: 1, max: 10, step: 1, defaultValue: 1 },
    ],
    calculate: (v) => v.innovations / (v.population / 1000) / v.years,
    formatResult: (r) => r.toFixed(2),
    interpretations: [
      { min: 0, max: 0.5, label: 'Low', color: 'terracotta', description: 'Innovation activity is below expected levels for your community size.', actions: ['Establish innovation incubator programs', 'Create community innovation challenges', 'Connect with external innovation networks'] },
      { min: 0.5, max: 1.5, label: 'Developing', color: 'gold', description: 'Innovation activity is growing but has room for improvement.', actions: ['Document and share successful innovations', 'Create mentorship programs for innovators', 'Seek partnerships with adjacent communities'] },
      { min: 1.5, max: 3.0, label: 'Strong', color: 'ocean', description: 'Good innovation intensity. Your community actively generates innovations.', actions: ['Focus on quality and impact of innovations', 'Build systems to support scaling', 'Track innovation success rates'] },
      { min: 3.0, max: Infinity, label: 'Excellent', color: 'sage', description: 'Outstanding innovation intensity. Your community is a leader in cultural innovation.', actions: ['Share best practices with other communities', 'Develop innovation leadership programs', 'Create innovation documentation and IP protection'] },
    ],
    relatedTools: ['cultural-leverage-index', 'innovation-efficiency-rate'],
  },

  'cultural-leverage-index': {
    id: 'cultural-leverage-index',
    name: 'Cultural Leverage Index',
    description: 'Assesses economic value generated per unit of cultural assets employed.',
    formula: 'CLI = Economic Value ($) / Cultural Assets Count',
    formulaExplanation: 'Higher values mean your cultural assets are generating more economic value. Benchmark against your industry to set targets.',
    inputs: [
      { id: 'economicValue', label: 'Total Economic Value Generated', type: 'currency', min: 0, max: 100000000, step: 100, defaultValue: 50000, unit: '$' },
      { id: 'culturalAssets', label: 'Number of Cultural Assets Employed', type: 'number', min: 1, max: 10000, step: 1, defaultValue: 10, helpText: 'Count traditions, techniques, stories, symbols, and artifacts used' },
    ],
    calculate: (v) => v.economicValue / v.culturalAssets,
    formatResult: (r) => `$${r.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
    interpretations: [
      { min: 0, max: 1000, label: 'Low Leverage', color: 'terracotta', description: 'Cultural assets are underutilized economically.', actions: ['Identify highest-value cultural assets', 'Develop products/services around key assets', 'Explore new market channels'] },
      { min: 1000, max: 5000, label: 'Moderate', color: 'gold', description: 'Cultural assets are generating meaningful value.', actions: ['Deepen engagement with top-performing assets', 'Diversify revenue streams per asset', 'Build cultural brand storytelling'] },
      { min: 5000, max: 15000, label: 'Strong', color: 'ocean', description: 'Strong economic leverage from cultural assets.', actions: ['Protect and document high-value assets', 'Scale successful asset-to-product pathways', 'Invest in cultural asset preservation'] },
      { min: 15000, max: Infinity, label: 'Excellent', color: 'sage', description: 'Outstanding cultural leverage. Your assets generate significant economic value.', actions: ['Create licensing and franchise models', 'Develop cultural IP protection strategies', 'Share models with peer communities'] },
    ],
    relatedTools: ['innovation-intensity-ratio', 'economic-multiplier'],
  },

  'innovation-readiness-calculator': {
    id: 'innovation-readiness-calculator',
    name: 'Innovation Readiness Calculator',
    description: 'Calculate your overall innovation readiness score based on four key enabling conditions.',
    formula: 'Score = (Leadership × 0.30) + (Identity × 0.30) + (Flexibility × 0.20) + (Safety × 0.20)',
    formulaExplanation: 'Leadership and Identity Security carry more weight as research shows they are strongest predictors of successful cultural innovation.',
    inputs: [
      { id: 'leadership', label: 'Bridge Leadership', type: 'slider', min: 0, max: 10, step: 1, defaultValue: 5, helpText: 'Leaders who bridge traditional and modern approaches' },
      { id: 'identity', label: 'Identity Security', type: 'slider', min: 0, max: 10, step: 1, defaultValue: 5, helpText: 'Community confidence in cultural identity' },
      { id: 'flexibility', label: 'Institutional Flexibility', type: 'slider', min: 0, max: 10, step: 1, defaultValue: 5, helpText: 'Ability to adapt governance and processes' },
      { id: 'safety', label: 'Economic Safety Nets', type: 'slider', min: 0, max: 10, step: 1, defaultValue: 5, helpText: 'Financial buffers that allow risk-taking' },
    ],
    calculate: (v) => (v.leadership * 0.30 + v.identity * 0.30 + v.flexibility * 0.20 + v.safety * 0.20) * 10,
    formatResult: (r) => Math.round(r).toString(),
    interpretations: [
      { min: 0, max: 30, label: 'Not Ready', color: 'terracotta', description: 'Significant foundational work needed before pursuing innovation.', actions: ['Identify and develop bridge leaders', 'Strengthen cultural identity programs', 'Build basic economic safety nets'] },
      { min: 30, max: 55, label: 'Building', color: 'gold', description: 'Some conditions in place, but gaps remain.', actions: ['Focus on lowest-scoring dimension', 'Create pilot innovation projects', 'Develop institutional flexibility'] },
      { min: 55, max: 75, label: 'Ready', color: 'ocean', description: 'Good conditions for cultural innovation.', actions: ['Launch innovation programs', 'Build monitoring systems', 'Scale successful pilots'] },
      { min: 75, max: 100, label: 'Highly Ready', color: 'sage', description: 'Excellent conditions. Your community can pursue ambitious innovation.', actions: ['Pursue transformative innovations', 'Mentor other communities', 'Document and share your readiness model'] },
    ],
    relatedTools: ['innovation-inclusivity-score', 'innovation-intensity-ratio'],
  },

  'innovation-inclusivity-score': {
    id: 'innovation-inclusivity-score',
    name: 'Innovation Inclusivity Score',
    description: 'Evaluates participation and benefit distribution across marginalized groups.',
    formula: 'IIS = (Marginalized Participants / Total Participants) × Benefit Share %',
    formulaExplanation: 'Measures both participation and benefit equity. A score above 50% indicates inclusive innovation practices.',
    inputs: [
      { id: 'margParticipants', label: 'Marginalized Group Participants', type: 'number', min: 0, max: 100000, step: 1, defaultValue: 30 },
      { id: 'totalParticipants', label: 'Total Participants', type: 'number', min: 1, max: 100000, step: 1, defaultValue: 100 },
      { id: 'benefitShare', label: 'Benefit Share to Marginalized Groups', type: 'percentage', min: 0, max: 100, step: 1, defaultValue: 40, unit: '%' },
    ],
    calculate: (v) => (v.margParticipants / v.totalParticipants) * v.benefitShare,
    formatResult: (r) => `${r.toFixed(1)}%`,
    interpretations: [
      { min: 0, max: 15, label: 'Exclusive', color: 'terracotta', description: 'Innovation benefits are not reaching marginalized groups.', actions: ['Conduct inclusivity audit', 'Create targeted outreach programs', 'Establish benefit-sharing agreements'] },
      { min: 15, max: 35, label: 'Developing', color: 'gold', description: 'Some inclusion but significant gaps remain.', actions: ['Increase representation in decision-making', 'Track participation data by group', 'Create mentorship bridges'] },
      { min: 35, max: 55, label: 'Inclusive', color: 'ocean', description: 'Good inclusivity with fair benefit distribution.', actions: ['Maintain and monitor inclusivity', 'Create feedback mechanisms', 'Share best practices'] },
      { min: 55, max: 100, label: 'Highly Inclusive', color: 'sage', description: 'Outstanding inclusivity. Benefits are broadly distributed.', actions: ['Document your inclusivity model', 'Advocate for inclusive innovation policies', 'Support peer communities'] },
    ],
    relatedTools: ['innovation-readiness-calculator', 'tbl-calculator'],
  },

  'tbl-calculator': {
    id: 'tbl-calculator',
    name: 'Triple Bottom Line Calculator',
    description: 'Calculate your triple bottom line impact across economic, social, and environmental dimensions.',
    formula: 'TBL = (Economic Score × 0.4) + (Social Score × 0.35) + (Environmental Score × 0.25)',
    formulaExplanation: 'Balanced scoring across three impact dimensions. Economic carries slightly more weight as it enables the other dimensions.',
    inputs: [
      { id: 'economicReturn', label: 'Annual Economic Return', type: 'currency', min: 0, max: 10000000, step: 100, defaultValue: 100000, unit: '$' },
      { id: 'socialImpact', label: 'Social Impact Score', type: 'slider', min: 1, max: 10, step: 1, defaultValue: 5, helpText: 'Community benefit, wellbeing, cultural preservation' },
      { id: 'environmentalImpact', label: 'Environmental Impact Score', type: 'slider', min: 1, max: 10, step: 1, defaultValue: 5, helpText: 'Sustainability, regenerative practices, resource use' },
    ],
    calculate: (v) => {
      const economicNorm = Math.min(v.economicReturn / 10000, 10)
      return (economicNorm * 0.4 + v.socialImpact * 0.35 + v.environmentalImpact * 0.25) * 10
    },
    formatResult: (r) => Math.round(r).toString(),
    interpretations: [
      { min: 0, max: 30, label: 'Below Baseline', color: 'terracotta', description: 'Significant gaps across impact dimensions.', actions: ['Identify quick wins in each dimension', 'Set baseline metrics', 'Create an improvement roadmap'] },
      { min: 30, max: 55, label: 'Developing', color: 'gold', description: 'Growing impact but not yet balanced across dimensions.', actions: ['Focus on lowest-scoring dimension', 'Set quarterly improvement targets', 'Benchmark against peers'] },
      { min: 55, max: 75, label: 'Balanced', color: 'ocean', description: 'Good balance across all three dimensions.', actions: ['Maintain balance while growing impact', 'Document impact stories', 'Seek certification or recognition'] },
      { min: 75, max: 100, label: 'Thriving', color: 'sage', description: 'Outstanding triple bottom line performance.', actions: ['Create an impact report', 'Mentor other organizations', 'Explore scaled impact models'] },
    ],
    relatedTools: ['economic-multiplier', 'sustainability-scorecard'],
  },

  'economic-multiplier': {
    id: 'economic-multiplier',
    name: 'Economic Multiplier Effect',
    description: 'Calculates the broader economic impact of cultural innovations beyond direct investment.',
    formula: 'Multiplier = Total Economic Activity / Direct Investment',
    formulaExplanation: 'A multiplier above 2.0 means each dollar invested generates more than $2 in total economic activity. Cultural enterprises often achieve 2.5-4.0x.',
    inputs: [
      { id: 'totalActivity', label: 'Total Economic Activity Generated', type: 'currency', min: 0, max: 100000000, step: 1000, defaultValue: 250000, unit: '$' },
      { id: 'directInvestment', label: 'Direct Investment', type: 'currency', min: 1, max: 100000000, step: 1000, defaultValue: 100000, unit: '$' },
    ],
    calculate: (v) => v.totalActivity / v.directInvestment,
    formatResult: (r) => `${r.toFixed(2)}x`,
    interpretations: [
      { min: 0, max: 1.5, label: 'Low Multiplier', color: 'terracotta', description: 'Economic impact is not significantly exceeding direct investment.', actions: ['Analyze value chain for leakages', 'Increase local sourcing', 'Build partnerships with complementary enterprises'] },
      { min: 1.5, max: 2.5, label: 'Moderate', color: 'gold', description: 'Investment is generating good returns to the broader economy.', actions: ['Map and strengthen supply chains', 'Invest in workforce development', 'Explore tourism and experience economy'] },
      { min: 2.5, max: 4.0, label: 'Strong', color: 'ocean', description: 'Strong economic multiplier effect typical of successful cultural enterprises.', actions: ['Document multiplier pathways', 'Advocate for continued investment', 'Scale successful models'] },
      { min: 4.0, max: Infinity, label: 'Excellent', color: 'sage', description: 'Outstanding economic multiplier. Your cultural enterprise is a powerful economic engine.', actions: ['Create economic impact reports', 'Share data with policymakers', 'Mentor emerging enterprises'] },
    ],
    relatedTools: ['tbl-calculator', 'cultural-leverage-index'],
  },

  'sustainability-scorecard': {
    id: 'sustainability-scorecard',
    name: 'Sustainability Scorecard',
    description: 'Generate a comprehensive sustainability scorecard across four dimensions.',
    formula: 'Score = (Economic × 0.30) + (Cultural × 0.30) + (Social × 0.20) + (Environmental × 0.20)',
    formulaExplanation: 'Economic and Cultural dimensions are weighted equally as both are essential for long-term viability of cultural enterprises.',
    inputs: [
      { id: 'economic', label: 'Economic Sustainability', type: 'slider', min: 1, max: 10, step: 1, defaultValue: 5, helpText: 'Financial health, revenue stability, market position' },
      { id: 'cultural', label: 'Cultural Sustainability', type: 'slider', min: 1, max: 10, step: 1, defaultValue: 5, helpText: 'Cultural preservation, knowledge transfer, authenticity' },
      { id: 'social', label: 'Social Sustainability', type: 'slider', min: 1, max: 10, step: 1, defaultValue: 5, helpText: 'Community benefit, equity, wellbeing' },
      { id: 'environmental', label: 'Environmental Sustainability', type: 'slider', min: 1, max: 10, step: 1, defaultValue: 5, helpText: 'Resource use, waste reduction, regeneration' },
    ],
    calculate: (v) => (v.economic * 0.30 + v.cultural * 0.30 + v.social * 0.20 + v.environmental * 0.20) * 10,
    formatResult: (r) => Math.round(r).toString(),
    interpretations: [
      { min: 0, max: 30, label: 'At Risk', color: 'terracotta', description: 'Sustainability is at risk across multiple dimensions.', actions: ['Prioritize the most critical dimension', 'Create emergency sustainability plan', 'Seek advisory support'] },
      { min: 30, max: 55, label: 'Developing', color: 'gold', description: 'Some sustainability foundations but gaps exist.', actions: ['Address lowest-scoring dimension', 'Set 12-month sustainability targets', 'Build monitoring systems'] },
      { min: 55, max: 75, label: 'Sustainable', color: 'ocean', description: 'Good sustainability across dimensions.', actions: ['Maintain momentum and monitoring', 'Create sustainability reports', 'Plan for long-term resilience'] },
      { min: 75, max: 100, label: 'Highly Sustainable', color: 'sage', description: 'Excellent sustainability. Your enterprise can thrive for generations.', actions: ['Document your sustainability model', 'Create intergenerational transition plans', 'Share knowledge with peers'] },
    ],
    relatedTools: ['cultural-resilience-quotient', 'tbl-calculator'],
  },

  'cultural-resilience-quotient': {
    id: 'cultural-resilience-quotient',
    name: 'Cultural Resilience Quotient',
    description: 'Measures the balance between innovation and cultural preservation.',
    formula: 'CRQ = (Maintaining + Enhancing) / Total Innovations × 100',
    formulaExplanation: 'A CRQ above 60% indicates innovations are predominantly preserving or enhancing culture. Below 40% may signal cultural erosion risk.',
    inputs: [
      { id: 'maintaining', label: 'Culture-Maintaining Innovations', type: 'number', min: 0, max: 1000, step: 1, defaultValue: 10, helpText: 'Innovations that preserve traditional practices' },
      { id: 'enhancing', label: 'Culture-Enhancing Innovations', type: 'number', min: 0, max: 1000, step: 1, defaultValue: 5, helpText: 'Innovations that extend/enrich cultural practices' },
      { id: 'total', label: 'Total Innovation Count', type: 'number', min: 1, max: 1000, step: 1, defaultValue: 20, helpText: 'All innovations including purely commercial ones' },
    ],
    calculate: (v) => ((v.maintaining + v.enhancing) / v.total) * 100,
    formatResult: (r) => `${Math.round(r)}%`,
    interpretations: [
      { min: 0, max: 30, label: 'Erosion Risk', color: 'terracotta', description: 'Most innovations are not connected to cultural preservation.', actions: ['Conduct cultural impact assessment', 'Create cultural preservation requirements', 'Engage cultural elders in innovation process'] },
      { min: 30, max: 55, label: 'Balanced', color: 'gold', description: 'Mix of cultural and non-cultural innovation.', actions: ['Increase culture-linked innovations', 'Document cultural connections', 'Create innovation-culture guidelines'] },
      { min: 55, max: 80, label: 'Culturally Rooted', color: 'ocean', description: 'Strong cultural grounding in innovation activities.', actions: ['Maintain cultural review processes', 'Celebrate culture-enhancing innovations', 'Build cultural innovation pipelines'] },
      { min: 80, max: 100, label: 'Deeply Cultural', color: 'sage', description: 'Innovation is deeply rooted in cultural preservation and enhancement.', actions: ['Share your cultural innovation model', 'Create apprenticeship programs', 'Document cultural innovation methodologies'] },
    ],
    relatedTools: ['sustainability-scorecard', 'innovation-intensity-ratio'],
  },

  'pricing-calculator': {
    id: 'pricing-calculator',
    name: 'Cultural Product Pricing Calculator',
    description: 'Calculate optimal pricing for cultural products that captures true value.',
    formula: 'Price = (Materials + Labor) × (1 + Overhead%) × (1 + Cultural Premium%)',
    formulaExplanation: 'The cultural premium reflects the unique value of cultural authenticity, heritage, and storytelling. Research shows cultural products command 15-40% premiums.',
    inputs: [
      { id: 'materials', label: 'Material Costs', type: 'currency', min: 0, max: 100000, step: 1, defaultValue: 20, unit: '$' },
      { id: 'labor', label: 'Labor Costs', type: 'currency', min: 0, max: 100000, step: 1, defaultValue: 30, unit: '$', helpText: 'Include your own time at fair market rate' },
      { id: 'overhead', label: 'Overhead Percentage', type: 'percentage', min: 0, max: 200, step: 5, defaultValue: 30, unit: '%', helpText: 'Rent, utilities, marketing, admin (typically 20-50%)' },
      { id: 'premium', label: 'Cultural Premium', type: 'percentage', min: 0, max: 200, step: 5, defaultValue: 25, unit: '%', helpText: 'Value of cultural authenticity and heritage (typically 15-40%)' },
    ],
    calculate: (v) => (v.materials + v.labor) * (1 + v.overhead / 100) * (1 + v.premium / 100),
    formatResult: (r) => `$${r.toFixed(2)}`,
    interpretations: [
      { min: 0, max: 50, label: 'Budget', color: 'terracotta', description: 'Low price point — ensure you are covering all costs including your time.', actions: ['Verify all costs are accounted for', 'Consider if premium is high enough', 'Test higher price points'] },
      { min: 50, max: 200, label: 'Mid-Range', color: 'gold', description: 'Moderate pricing with room for premium positioning.', actions: ['Strengthen cultural story and branding', 'Explore premium market channels', 'Consider product line tiers'] },
      { min: 200, max: 500, label: 'Premium', color: 'ocean', description: 'Premium pricing that captures cultural value.', actions: ['Invest in presentation and packaging', 'Build direct-to-consumer channels', 'Create certificates of authenticity'] },
      { min: 500, max: Infinity, label: 'Luxury', color: 'sage', description: 'Luxury positioning — ensure market channel supports this price.', actions: ['Partner with high-end retailers or galleries', 'Create limited editions', 'Develop collector relationships'] },
    ],
    relatedTools: ['cultural-leverage-index', 'innovation-efficiency-rate'],
  },

  'innovation-efficiency-rate': {
    id: 'innovation-efficiency-rate',
    name: 'Innovation Efficiency Rate',
    description: 'Tracks the success rate of cultural innovation attempts.',
    formula: 'IER = (Successful Innovations / Total Attempts) × 100',
    formulaExplanation: 'Industry benchmarks suggest 30-40% efficiency rates. Cultural innovations with community input often achieve higher rates (40-60%).',
    inputs: [
      { id: 'successful', label: 'Successful Innovations', type: 'number', min: 0, max: 10000, step: 1, defaultValue: 8, helpText: 'Innovations that achieved stated goals' },
      { id: 'total', label: 'Total Innovation Attempts', type: 'number', min: 1, max: 10000, step: 1, defaultValue: 20, helpText: 'All innovation attempts, successful or not' },
    ],
    calculate: (v) => (v.successful / v.total) * 100,
    formatResult: (r) => `${Math.round(r)}%`,
    interpretations: [
      { min: 0, max: 20, label: 'Low', color: 'terracotta', description: 'Innovation success rate is below industry benchmarks.', actions: ['Analyze failure patterns', 'Implement pre-launch testing', 'Gather community feedback earlier in process'] },
      { min: 20, max: 40, label: 'Average', color: 'gold', description: 'Typical innovation success rate.', actions: ['Identify common success factors', 'Create innovation stage-gates', 'Build a learning culture around failures'] },
      { min: 40, max: 65, label: 'Good', color: 'ocean', description: 'Above average efficiency, suggesting strong innovation processes.', actions: ['Document successful methodologies', 'Scale successful innovation approaches', 'Invest in higher-risk innovations'] },
      { min: 65, max: 100, label: 'Excellent', color: 'sage', description: 'Outstanding efficiency. Your innovation processes are highly effective.', actions: ['Share your methodology', 'Consider if you are being bold enough', 'Balance efficiency with experimentation'] },
    ],
    relatedTools: ['innovation-intensity-ratio', 'pricing-calculator'],
  },
}

export function getToolPageConfig(id: string): ToolPageConfig | undefined {
  return TOOL_PAGE_CONFIGS[id]
}

export function getAllToolIds(): string[] {
  return Object.keys(TOOL_PAGE_CONFIGS)
}

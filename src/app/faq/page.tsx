'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ArrowRight, Search, HelpCircle } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
  category: string
}

const FAQ_ITEMS: FAQItem[] = [
  // Framework
  {
    category: 'Framework',
    question: 'What is the CIL framework?',
    answer: 'The Cultural Innovation Lab (CIL) is a research-based assessment tool that measures the sustainability and success potential of cultural innovation initiatives. It evaluates 13 key components across three categories: Foundation (cultural integrity, community relevance, economic value, adaptability), Capacity (adaptive, protective, social empowerment, community benefit, community control), and Outcomes (transformative, generative, sustainable development).',
  },
  {
    category: 'Framework',
    question: 'How was the CIL framework developed?',
    answer: 'CIL was developed through rigorous academic research analyzing 362 case studies of cultural innovation initiatives worldwide. The framework emerged from studying patterns in successful heritage enterprises, indigenous businesses, and cultural entrepreneurship projects. It has been validated with 78.1% predictive accuracy for initiative outcomes.',
  },
  {
    category: 'Framework',
    question: 'What is the critical threshold of 7-8?',
    answer: 'Our research discovered that scoring 7-8 out of 13 represents a critical threshold. Initiatives below this threshold have significantly lower success rates, while those at or above it show dramatically improved outcomes. This "tipping point" indicates the minimum conditions needed for sustainable cultural innovation.',
  },
  // Assessment
  {
    category: 'Assessment',
    question: 'How does the CIL assessment work?',
    answer: 'The assessment consists of 13 questions covering the three main categories. For each question, you evaluate whether your initiative meets the criteria. Your total score (0-13) determines your resilience level: scores of 11-13 indicate High Resilience with 85%+ success rates, 7-10 indicate Moderate Resilience with 65% success rates, and below 7 indicate At Risk status requiring intervention.',
  },
  {
    category: 'Assessment',
    question: 'How many credits do I need for an assessment?',
    answer: 'Each full CIL assessment requires 1 credit. New users receive 1 free credit upon signup. Additional credits can be purchased in packs of 5, 15, or 50 credits at discounted rates.',
  },
  {
    category: 'Assessment',
    question: 'Can I retake the assessment?',
    answer: 'Yes, you can retake the assessment as many times as you like (each attempt uses 1 credit). This is useful for tracking progress over time or reassessing after implementing changes. All your assessment results are saved in your dashboard history.',
  },
  // Credits & Pricing
  {
    category: 'Credits & Pricing',
    question: 'Do my credits expire?',
    answer: 'No, your credits never expire. Use them whenever you\'re ready to assess an initiative.',
  },
  {
    category: 'Credits & Pricing',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, debit cards, and UPI through our secure Razorpay payment processing. International cards (Visa, Mastercard, American Express) and Indian payment methods are supported.',
  },
  {
    category: 'Credits & Pricing',
    question: 'Can I get a refund?',
    answer: 'Unused credits can be refunded within 30 days of purchase. Contact support@cirf-framework.org for refund requests.',
  },
  {
    category: 'Credits & Pricing',
    question: 'Are there team or enterprise plans?',
    answer: 'Yes! For organizations needing more than 50 assessments, we offer custom enterprise plans with volume discounts, team dashboards, and additional features. Contact us to discuss your needs.',
  },
  // Research & Data
  {
    category: 'Research & Data',
    question: 'Where do the case studies come from?',
    answer: 'Our database includes 362 case studies analyzed from academic literature, UNESCO documentation, World Bank reports, regional development agencies, and direct field research. The 8 featured case studies on our site have been fully documented with verified sources and citations.',
  },
  {
    category: 'Research & Data',
    question: 'How accurate is the framework?',
    answer: 'The CIL framework has demonstrated 78.1% predictive accuracy in determining initiative outcomes. This was validated through retrospective analysis of case studies with known outcomes and prospective tracking of assessed initiatives.',
  },
  {
    category: 'Research & Data',
    question: 'Can I access the underlying research?',
    answer: 'Yes, we\'re committed to research transparency. Academic papers, methodology documentation, and data sources are available in our Research section. We also publish regular insights on our blog.',
  },
  // Account & Technical
  {
    category: 'Account & Technical',
    question: 'Is my data secure?',
    answer: 'Yes, we take data security seriously. All data is encrypted in transit and at rest. Assessment results are private to your account. We use Supabase for secure authentication and database storage, and Razorpay for payment processing.',
  },
  {
    category: 'Account & Technical',
    question: 'Can I delete my account and data?',
    answer: 'Yes, you can delete your account directly from your dashboard settings, or by contacting support@cirf-framework.org. We will permanently delete all your personal data and assessment history immediately.',
  },
]

const CATEGORIES = ['All', 'Framework', 'Assessment', 'Credits & Pricing', 'Research & Data', 'Account & Technical']

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const filteredFAQs = FAQ_ITEMS.filter(faq => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <main className="min-h-screen bg-pearl pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8 text-gold" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-ink mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-stone max-w-2xl mx-auto">
            Find answers to common questions about the CIL framework,
            assessments, and how to get started.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border border-stone/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 bg-white"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-ink text-pearl'
                  : 'bg-white border border-stone/20 text-stone hover:border-ink/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-stone/10 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="font-medium text-ink pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-stone flex-shrink-0 transition-transform ${
                    openItems.includes(index) ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openItems.includes(index) && (
                <div className="px-6 pb-4">
                  <p className="text-stone leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-stone mb-4">No questions found matching your search.</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('All')
              }}
              className="text-gold font-medium hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-12 bg-gradient-to-r from-sand to-pearl rounded-2xl p-8 text-center">
          <h3 className="text-xl font-semibold text-ink mb-2">
            Still have questions?
          </h3>
          <p className="text-stone mb-6">
            Can&apos;t find what you&apos;re looking for? We&apos;re here to help.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 bg-ink text-pearl px-6 py-3 rounded-full font-medium hover:bg-ink/90 transition-colors"
          >
            Contact Us
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  )
}

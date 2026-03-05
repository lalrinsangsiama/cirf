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
    answer: 'The Cultural Innovation Lab (CIL) is a research-based assessment platform that measures the sustainability and success potential of cultural innovation initiatives. The main CIL assessment has 61 questions across 5 sections: Demographics & Profile, Cultural Capital, Innovation Activities, Organizational Capacities, and Economic Resilience. You receive a score from 0-100 categorized into four levels: Emerging (0-40), Developing (40-60), Established (60-80), and Thriving (80-100).',
  },
  {
    category: 'Framework',
    question: 'How was the CIL framework developed?',
    answer: 'CIL was developed through academic research analyzing cultural innovation initiatives worldwide. The framework emerged from studying patterns in successful heritage enterprises, indigenous businesses, and cultural entrepreneurship projects.',
  },
  {
    category: 'Framework',
    question: 'What do the score levels mean?',
    answer: 'The CIL assessment uses a 0-100 scoring system with four levels: Emerging (0-40) indicates early stage with foundational work needed; Developing (40-60) shows good progress with significant growth opportunities; Established (60-80) reflects solid performance with some areas for improvement; Thriving (80-100) indicates excellent performance with strong foundations across all dimensions.',
  },
  // Assessment
  {
    category: 'Assessment',
    question: 'How does the CIL assessment work?',
    answer: 'The assessment consists of 61 questions covering demographics, cultural capital, innovation activities, organizational capacities, and economic resilience. Your responses generate a CIL Score from 0-100 that determines your resilience level.',
  },
  {
    category: 'Assessment',
    question: 'How long does each assessment take?',
    answer: 'The main CIL Assessment takes approximately 20 minutes. Each of the 5 secondary assessments (CIMM, CIRA, TBL-CI, CISS, Pricing) takes 6-8 minutes.',
  },
  {
    category: 'Assessment',
    question: 'Who can take the assessments?',
    answer: 'The assessments are designed for cultural entrepreneurs, artisans, heritage practitioners, community leaders, and researchers working in cultural innovation and economic resilience.',
  },
  {
    category: 'Assessment',
    question: 'Can I change my answers after submitting?',
    answer: 'No, answers cannot be edited after submission. Each assessment can only be taken once per person. Please review your responses carefully before submitting.',
  },
  {
    category: 'Assessment',
    question: 'What happens if I don\'t finish?',
    answer: 'Your progress is automatically saved if you\'re signed in. You can close the browser and return anytime to continue where you left off.',
  },
  // Credits & Access
  {
    category: 'Credits & Access',
    question: 'Is the platform free?',
    answer: 'Yes, CIL is completely free. The main CIL Assessment is free and grants you 1 credit. Each secondary assessment costs 1 credit but grants 1 credit back on completion, so the net cost is always zero. You can complete all 6 assessments for free.',
  },
  {
    category: 'Credits & Access',
    question: 'How many credits do I need?',
    answer: 'The CIL Assessment is free and grants 1 credit. Each secondary assessment costs 1 credit but returns 1 credit on completion. This means you can complete all assessments sequentially at no cost — just do them one at a time.',
  },
  {
    category: 'Credits & Access',
    question: 'How do credits work?',
    answer: 'Credits fuel the assessment loop. The CIL Assessment is free and grants 1 credit on completion. Each of the 5 secondary assessments costs 1 credit but grants 1 credit back when you finish. This means the net cost is always zero — you can complete all 6 assessments for free, just one at a time.',
  },
  {
    category: 'Credits & Access',
    question: 'Can I retake an assessment?',
    answer: 'No, each assessment can only be taken once per person. This ensures data integrity for our research. Your results are permanently saved and accessible from your dashboard.',
  },
  {
    category: 'Credits & Access',
    question: 'Do my credits expire?',
    answer: 'No, your credits never expire. Use them whenever you\'re ready to take the next assessment.',
  },
  // Privacy & Data
  {
    category: 'Privacy & Data',
    question: 'How is my data used?',
    answer: 'Your responses are kept confidential — only you can see your individual results. For research purposes, data is anonymized before analysis or publication. Individual responses are never shared or published. Only aggregated, de-identified data is used in research findings. We also collect basic usage data such as browser type, pages visited, and IP address (anonymized for analytics).',
  },
  {
    category: 'Privacy & Data',
    question: 'Who can see my responses?',
    answer: 'Only you can see your individual assessment results on your dashboard. Researchers only have access to aggregated, anonymized data. Your personal information (name, email) is never linked to your responses in any published research. For concerns about data handling, contact hello@culturalinnovationlab.org.',
  },
  {
    category: 'Privacy & Data',
    question: 'Can I withdraw my data?',
    answer: 'Yes, you can withdraw at any time by deleting your account from your dashboard settings, or by contacting hello@culturalinnovationlab.org. This will permanently remove all your personal data and assessment responses.',
  },
  // Account & Technical
  {
    category: 'Account & Technical',
    question: 'Is my data secure?',
    answer: 'Yes, we take data security seriously. All data is encrypted in transit and at rest. Assessment results are private to your account. We use Supabase for secure authentication and database storage.',
  },
  {
    category: 'Account & Technical',
    question: 'Can I delete my account and data?',
    answer: 'Yes, you can delete your account directly from your dashboard settings, or by contacting hello@culturalinnovationlab.org. We will permanently delete all your personal data and assessment history immediately.',
  },
]

const CATEGORIES = ['All', 'Framework', 'Assessment', 'Credits & Access', 'Privacy & Data', 'Account & Technical']

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
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
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
          <p className="text-ink/70 mb-6">
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

'use client'

import { useEffect, useState, Fragment } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/AuthProvider'
import { createClient } from '@/lib/supabase/client'
import {
  ArrowLeft,
  Search,
  Calendar,
  ChevronDown,
  ChevronUp,
  Download,
  Filter,
  ClipboardCheck,
  User,
} from 'lucide-react'

interface AssessmentAnswer {
  answer: boolean
  notes?: string
}

interface AssessmentInterpretation {
  level: string
  successRate: string
  description: string
}

interface Assessment {
  id: string
  user_id: string
  score: number
  answers: Record<string, AssessmentAnswer>
  interpretation: AssessmentInterpretation | null
  matched_case_studies: string[] | null
  created_at: string
  profiles: {
    email: string
    full_name: string
    organization: string
  } | null
}

const SCORE_COLORS: Record<string, string> = {
  high: 'bg-sage/10 text-sage',
  medium: 'bg-gold/10 text-gold',
  low: 'bg-terracotta/10 text-terracotta',
}

export default function AdminAssessmentsPage() {
  const router = useRouter()
  const { user, profile, loading: authLoading } = useAuth()
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [scoreFilter, setScoreFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    if (!authLoading && (!user || profile?.role !== 'admin')) {
      router.push('/dashboard')
      return
    }

    if (user && profile?.role === 'admin') {
      fetchAssessments()
    }
  }, [user, profile, authLoading])

  const fetchAssessments = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('assessments')
      .select(`
        id,
        user_id,
        score,
        answers,
        interpretation,
        matched_case_studies,
        created_at,
        profiles (
          email,
          full_name,
          organization
        )
      `)
      .order('created_at', { ascending: false })

    if (data) {
      // Transform the data to match our interface (profiles comes as single object from join)
      const transformed = data.map(item => ({
        ...item,
        profiles: Array.isArray(item.profiles) ? item.profiles[0] || null : item.profiles,
      })) as Assessment[]
      setAssessments(transformed)
    }
    setLoading(false)
  }

  const getScoreLevel = (score: number): string => {
    if (score >= 11) return 'high'
    if (score >= 7) return 'medium'
    return 'low'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const isWithinDateRange = (dateString: string): boolean => {
    if (dateFilter === 'all') return true

    const date = new Date(dateString)
    const now = new Date()

    switch (dateFilter) {
      case 'today':
        return date.toDateString() === now.toDateString()
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        return date >= weekAgo
      case 'month':
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        return date >= monthAgo
      default:
        return true
    }
  }

  const filteredAssessments = assessments.filter(assessment => {
    const email = assessment.profiles?.email || ''
    const name = assessment.profiles?.full_name || ''
    const matchesSearch =
      email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      name.toLowerCase().includes(searchQuery.toLowerCase())

    const scoreLevel = getScoreLevel(assessment.score)
    const matchesScore = scoreFilter === 'all' || scoreLevel === scoreFilter

    const matchesDate = isWithinDateRange(assessment.created_at)

    return matchesSearch && matchesScore && matchesDate
  })

  const exportToCSV = () => {
    const headers = ['Date', 'User Email', 'User Name', 'Organization', 'Score', 'Level', 'Success Rate']
    const rows = filteredAssessments.map(a => [
      formatDate(a.created_at),
      a.profiles?.email || 'N/A',
      a.profiles?.full_name || 'N/A',
      a.profiles?.organization || 'N/A',
      `${a.score}/13`,
      a.interpretation?.level || getScoreLevel(a.score),
      a.interpretation?.successRate || 'N/A',
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `cirf-assessments-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  if (authLoading || loading) {
    return (
      <main className="min-h-screen bg-sand pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-stone/20 rounded w-48" />
            <div className="h-64 bg-stone/20 rounded-2xl" />
          </div>
        </div>
      </main>
    )
  }

  if (!user || profile?.role !== 'admin') {
    return null
  }

  return (
    <main className="min-h-screen bg-sand pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-stone hover:text-ink transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Admin Dashboard
            </Link>
            <h1 className="text-3xl font-serif font-bold text-ink">Assessment Results</h1>
            <p className="text-stone mt-1">
              {filteredAssessments.length} assessment{filteredAssessments.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <button
            onClick={exportToCSV}
            className="inline-flex items-center gap-2 bg-ink text-pearl px-4 py-2 rounded-lg font-medium hover:bg-ink/90 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone" />
            <input
              type="text"
              placeholder="Search by email or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 bg-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-stone" />
            <select
              value={scoreFilter}
              onChange={(e) => setScoreFilter(e.target.value)}
              className="px-4 py-2 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 bg-white"
            >
              <option value="all">All Scores</option>
              <option value="high">High (11-13)</option>
              <option value="medium">Medium (7-10)</option>
              <option value="low">Low (0-6)</option>
            </select>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 bg-white"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Past Week</option>
              <option value="month">Past Month</option>
            </select>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone/10 overflow-hidden">
          {filteredAssessments.length === 0 ? (
            <div className="p-12 text-center">
              <ClipboardCheck className="w-12 h-12 text-stone/40 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-ink mb-2">No assessments found</h3>
              <p className="text-stone">
                {searchQuery || scoreFilter !== 'all' || dateFilter !== 'all'
                  ? 'Try adjusting your filters'
                  : 'No assessments have been completed yet'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-sand/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-ink">User</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-ink">Score</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-ink">Level</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-ink">Date</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-ink">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone/10">
                  {filteredAssessments.map((assessment) => {
                    const scoreLevel = getScoreLevel(assessment.score)
                    const isExpanded = expandedId === assessment.id

                    return (
                      <Fragment key={assessment.id}>
                        <tr className={`hover:bg-sand/30 transition-colors ${isExpanded ? 'border-b-0' : ''}`}>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-stone/10 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-stone" />
                              </div>
                              <div>
                                <p className="font-medium text-ink">
                                  {assessment.profiles?.full_name || 'Anonymous'}
                                </p>
                                <p className="text-sm text-stone">
                                  {assessment.profiles?.email || 'No email'}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-lg font-bold text-ink">
                              {assessment.score}/13
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium capitalize ${SCORE_COLORS[scoreLevel]}`}>
                              {assessment.interpretation?.level || scoreLevel}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1 text-sm text-stone">
                              <Calendar className="w-4 h-4" />
                              {formatDate(assessment.created_at)}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => setExpandedId(isExpanded ? null : assessment.id)}
                              className="inline-flex items-center gap-1 text-gold hover:underline"
                            >
                              {isExpanded ? (
                                <>
                                  <ChevronUp className="w-4 h-4" />
                                  Hide
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="w-4 h-4" />
                                  View
                                </>
                              )}
                            </button>
                          </td>
                        </tr>
                        {isExpanded && (
                          <tr className="bg-sand/30">
                            <td colSpan={5} className="px-6 py-4">
                              <div className="space-y-4">
                                {/* Interpretation */}
                                {assessment.interpretation && (
                                  <div className="bg-white rounded-lg p-4 border border-stone/10">
                                    <h4 className="font-semibold text-ink mb-2">Interpretation</h4>
                                    <p className="text-stone text-sm mb-2">
                                      {assessment.interpretation.description}
                                    </p>
                                    <p className="text-sm">
                                      <span className="text-stone">Success Rate:</span>{' '}
                                      <span className="font-medium text-ink">
                                        {assessment.interpretation.successRate}
                                      </span>
                                    </p>
                                  </div>
                                )}

                                {/* Answers */}
                                <div className="bg-white rounded-lg p-4 border border-stone/10">
                                  <h4 className="font-semibold text-ink mb-3">Answers</h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {Object.entries(assessment.answers || {}).map(([questionId, answer]) => (
                                      <div key={questionId} className="flex items-start gap-2 text-sm">
                                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium ${answer.answer ? 'bg-sage/20 text-sage' : 'bg-terracotta/20 text-terracotta'}`}>
                                          {answer.answer ? '✓' : '✗'}
                                        </span>
                                        <div>
                                          <span className="text-stone">{questionId}</span>
                                          {answer.notes && (
                                            <p className="text-xs text-stone/70 mt-0.5">{answer.notes}</p>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Organization */}
                                {assessment.profiles?.organization && (
                                  <div className="text-sm">
                                    <span className="text-stone">Organization:</span>{' '}
                                    <span className="font-medium text-ink">
                                      {assessment.profiles.organization}
                                    </span>
                                  </div>
                                )}

                                {/* Matched Case Studies */}
                                {assessment.matched_case_studies && assessment.matched_case_studies.length > 0 && (
                                  <div className="text-sm">
                                    <span className="text-stone">Matched Case Studies:</span>{' '}
                                    <span className="font-medium text-ink">
                                      {assessment.matched_case_studies.join(', ')}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

'use client'

import { useEffect, useState, Fragment } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/AuthProvider'
import { createClient } from '@/lib/supabase/client'
import { ASSESSMENT_CONFIGS, AssessmentType } from '@/lib/data/assessmentConfig'
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
  Clock,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProfileInfo {
  email: string
  full_name: string
  organization: string
}

interface CompletedAssessment {
  id: string
  user_id: string
  assessment_type: string | null
  score: number
  answers: Record<string, unknown>
  interpretation: {
    level: string
    successRate: string
    description: string
  } | null
  matched_case_studies: string[] | null
  created_at: string
  profiles: ProfileInfo | null
}

interface AssessmentDraft {
  id: string
  user_id: string
  assessment_type: string
  answers: Record<string, unknown>
  current_section: string | null
  created_at: string
  updated_at: string
  profiles: ProfileInfo | null
}

interface UnifiedRow {
  id: string
  user_id: string
  status: 'completed' | 'in_progress'
  assessment_type: string
  activityDate: string
  profiles: ProfileInfo | null
  // Completed fields
  score?: number
  interpretation?: { level: string; successRate: string; description: string } | null
  matched_case_studies?: string[] | null
  answers: Record<string, unknown>
  // Draft fields
  current_section?: string | null
}

const TYPE_LABELS: Record<string, string> = {
  cil: 'CIL',
  cimm: 'CIMM',
  cira: 'CIRA',
  tbl: 'TBL',
  ciss: 'CISS',
  pricing: 'Pricing',
}

const TYPE_COLORS: Record<string, string> = {
  cil: 'bg-sage/10 text-sage',
  cimm: 'bg-ocean/10 text-ocean',
  cira: 'bg-gold/10 text-gold',
  tbl: 'bg-terracotta/10 text-terracotta',
  ciss: 'bg-ink/10 text-ink',
  pricing: 'bg-stone/10 text-stone',
}

export default function AdminAssessmentsPage() {
  const router = useRouter()
  const { user, profile, loading: authLoading } = useAuth()
  const [rows, setRows] = useState<UnifiedRow[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    if (!authLoading && (!user || profile?.role !== 'admin')) {
      router.push('/dashboard')
      return
    }

    if (user && profile?.role === 'admin') {
      fetchAll()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, profile, authLoading, router])

  const fetchAll = async () => {
    setLoading(true)

    const [completedRes, draftsRes] = await Promise.all([
      supabase
        .from('assessments')
        .select(`
          id,
          user_id,
          assessment_type,
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
        .order('created_at', { ascending: false }),
      supabase
        .from('assessment_drafts')
        .select(`
          id,
          user_id,
          assessment_type,
          answers,
          current_section,
          created_at,
          updated_at,
          profiles (
            email,
            full_name,
            organization
          )
        `)
        .order('updated_at', { ascending: false }),
    ])

    const unified: UnifiedRow[] = []

    if (completedRes.data) {
      for (const item of completedRes.data) {
        const p = Array.isArray(item.profiles) ? item.profiles[0] || null : item.profiles
        unified.push({
          id: item.id,
          user_id: item.user_id,
          status: 'completed',
          assessment_type: item.assessment_type || 'cil',
          activityDate: item.created_at,
          profiles: p as ProfileInfo | null,
          score: item.score,
          interpretation: item.interpretation as UnifiedRow['interpretation'],
          matched_case_studies: item.matched_case_studies,
          answers: (item.answers || {}) as Record<string, unknown>,
        })
      }
    }

    if (draftsRes.data) {
      for (const item of draftsRes.data) {
        const p = Array.isArray(item.profiles) ? item.profiles[0] || null : item.profiles
        unified.push({
          id: `draft-${item.id}`,
          user_id: item.user_id,
          status: 'in_progress',
          assessment_type: item.assessment_type || 'cil',
          activityDate: item.updated_at,
          profiles: p as ProfileInfo | null,
          answers: (item.answers || {}) as Record<string, unknown>,
          current_section: item.current_section,
        })
      }
    }

    // Sort by most recent activity
    unified.sort((a, b) => new Date(b.activityDate).getTime() - new Date(a.activityDate).getTime())

    setRows(unified)
    setLoading(false)
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
      case 'week': {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        return date >= weekAgo
      }
      case 'month': {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        return date >= monthAgo
      }
      default:
        return true
    }
  }

  const getScoreDisplay = (row: UnifiedRow): string => {
    if (row.status === 'in_progress') {
      const answerCount = Object.keys(row.answers).length
      const config = ASSESSMENT_CONFIGS[row.assessment_type as AssessmentType]
      const totalQuestions = config?.questionCount || '?'
      return `${answerCount}/${totalQuestions} answered`
    }

    // Completed
    if (row.assessment_type === 'cil' || !row.assessment_type) {
      return `${row.score}/13`
    }

    // Secondary assessments use 0-100 scale
    return `${row.score}%`
  }

  const getLevelDisplay = (row: UnifiedRow): { label: string; className: string } => {
    if (row.status === 'in_progress') {
      const answerCount = Object.keys(row.answers).length
      const config = ASSESSMENT_CONFIGS[row.assessment_type as AssessmentType]
      const total = config?.questionCount || 1
      const pct = Math.round((answerCount / total) * 100)
      return { label: `${pct}% done`, className: 'bg-gold/10 text-gold' }
    }

    if (row.interpretation?.level) {
      const level = row.interpretation.level.toLowerCase()
      if (level.includes('high') || level.includes('strong') || level.includes('excellent') || level.includes('advanced')) {
        return { label: row.interpretation.level, className: 'bg-sage/10 text-sage' }
      }
      if (level.includes('low') || level.includes('emerging') || level.includes('basic') || level.includes('limited')) {
        return { label: row.interpretation.level, className: 'bg-terracotta/10 text-terracotta' }
      }
      return { label: row.interpretation.level, className: 'bg-gold/10 text-gold' }
    }

    // CIL fallback scoring
    if (row.assessment_type === 'cil' || !row.assessment_type) {
      const score = row.score || 0
      if (score >= 11) return { label: 'High', className: 'bg-sage/10 text-sage' }
      if (score >= 7) return { label: 'Medium', className: 'bg-gold/10 text-gold' }
      return { label: 'Low', className: 'bg-terracotta/10 text-terracotta' }
    }

    return { label: 'N/A', className: 'bg-stone/10 text-stone' }
  }

  const filteredRows = rows.filter(row => {
    const email = row.profiles?.email || ''
    const name = row.profiles?.full_name || ''
    const matchesSearch =
      email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'all' || row.status === statusFilter
    const matchesType = typeFilter === 'all' || row.assessment_type === typeFilter
    const matchesDate = isWithinDateRange(row.activityDate)

    return matchesSearch && matchesStatus && matchesType && matchesDate
  })

  const completedCount = rows.filter(r => r.status === 'completed').length
  const draftCount = rows.filter(r => r.status === 'in_progress').length

  const exportToCSV = () => {
    const headers = ['Date', 'User Email', 'User Name', 'Organization', 'Assessment', 'Status', 'Score', 'Level']
    const csvRows = filteredRows.map(row => {
      const level = getLevelDisplay(row)
      return [
        formatDate(row.activityDate),
        row.profiles?.email || 'N/A',
        row.profiles?.full_name || 'N/A',
        row.profiles?.organization || 'N/A',
        TYPE_LABELS[row.assessment_type] || row.assessment_type,
        row.status === 'completed' ? 'Completed' : 'In Progress',
        row.status === 'completed' ? getScoreDisplay(row) : 'In Progress',
        level.label,
      ]
    })

    const csvContent = [
      headers.join(','),
      ...csvRows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `assessments-${new Date().toISOString().split('T')[0]}.csv`
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
              {completedCount} completed, {draftCount} in progress
              {filteredRows.length !== rows.length && ` (showing ${filteredRows.length})`}
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
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-stone" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 bg-white"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="in_progress">In Progress</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 bg-white"
            >
              <option value="all">All Types</option>
              <option value="cil">CIL</option>
              <option value="cimm">CIMM</option>
              <option value="cira">CIRA</option>
              <option value="tbl">TBL</option>
              <option value="ciss">CISS</option>
              <option value="pricing">Pricing</option>
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
          {filteredRows.length === 0 ? (
            <div className="p-12 text-center">
              <ClipboardCheck className="w-12 h-12 text-stone/40 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-ink mb-2">No assessments found</h3>
              <p className="text-stone">
                {searchQuery || statusFilter !== 'all' || typeFilter !== 'all' || dateFilter !== 'all'
                  ? 'Try adjusting your filters'
                  : 'No assessments have been started yet'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-sand/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-ink">User</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-ink">Assessment</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-ink">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-ink">Score</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-ink">Level</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-ink">Date</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-ink">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone/10">
                  {filteredRows.map((row) => {
                    const isExpanded = expandedId === row.id
                    const level = getLevelDisplay(row)
                    const typeColor = TYPE_COLORS[row.assessment_type] || 'bg-stone/10 text-stone'

                    return (
                      <Fragment key={row.id}>
                        <tr className={`hover:bg-sand/30 transition-colors ${isExpanded ? 'border-b-0' : ''}`}>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-stone/10 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-stone" />
                              </div>
                              <div>
                                <p className="font-medium text-ink">
                                  {row.profiles?.full_name || 'Anonymous'}
                                </p>
                                <p className="text-sm text-stone">
                                  {row.profiles?.email || 'No email'}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={cn('inline-block px-3 py-1 rounded-full text-xs font-semibold', typeColor)}>
                              {TYPE_LABELS[row.assessment_type] || row.assessment_type}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {row.status === 'completed' ? (
                              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-sage/10 text-sage">
                                <ClipboardCheck className="w-3 h-3" />
                                Completed
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gold/10 text-gold">
                                <Clock className="w-3 h-3" />
                                In Progress
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <span className={cn(
                              'text-sm font-medium',
                              row.status === 'completed' ? 'text-ink' : 'text-stone'
                            )}>
                              {getScoreDisplay(row)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={cn('inline-block px-3 py-1 rounded-full text-sm font-medium', level.className)}>
                              {level.label}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1 text-sm text-stone">
                              <Calendar className="w-4 h-4" />
                              {formatDate(row.activityDate)}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => setExpandedId(isExpanded ? null : row.id)}
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
                            <td colSpan={7} className="px-6 py-4">
                              <div className="space-y-4">
                                {/* Interpretation (completed only) */}
                                {row.status === 'completed' && row.interpretation && (
                                  <div className="bg-white rounded-lg p-4 border border-stone/10">
                                    <h4 className="font-semibold text-ink mb-2">Interpretation</h4>
                                    <p className="text-stone text-sm mb-2">
                                      {row.interpretation.description}
                                    </p>
                                    <p className="text-sm">
                                      <span className="text-stone">Success Rate:</span>{' '}
                                      <span className="font-medium text-ink">
                                        {row.interpretation.successRate}
                                      </span>
                                    </p>
                                  </div>
                                )}

                                {/* Current section (draft only) */}
                                {row.status === 'in_progress' && row.current_section && (
                                  <div className="bg-white rounded-lg p-4 border border-stone/10">
                                    <h4 className="font-semibold text-ink mb-2">Progress</h4>
                                    <p className="text-stone text-sm">
                                      Currently on section: <span className="font-medium text-ink">{row.current_section}</span>
                                    </p>
                                    <p className="text-stone text-sm mt-1">
                                      {Object.keys(row.answers).length} question{Object.keys(row.answers).length !== 1 ? 's' : ''} answered
                                    </p>
                                  </div>
                                )}

                                {/* Answers */}
                                <div className="bg-white rounded-lg p-4 border border-stone/10">
                                  <h4 className="font-semibold text-ink mb-3">
                                    Answers ({Object.keys(row.answers).length})
                                  </h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                                    {Object.entries(row.answers).map(([questionId, answer]) => {
                                      // Handle different answer formats
                                      const answerObj = answer as Record<string, unknown> | number | string
                                      if (typeof answerObj === 'object' && answerObj !== null && 'answer' in answerObj) {
                                        // CIL format: { answer: boolean, notes?: string }
                                        const boolAnswer = answerObj.answer as boolean
                                        return (
                                          <div key={questionId} className="flex items-start gap-2 text-sm">
                                            <span className={cn(
                                              'w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0',
                                              boolAnswer ? 'bg-sage/20 text-sage' : 'bg-terracotta/20 text-terracotta'
                                            )}>
                                              {boolAnswer ? '\u2713' : '\u2717'}
                                            </span>
                                            <div>
                                              <span className="text-stone">{questionId}</span>
                                              {typeof answerObj.notes === 'string' && answerObj.notes && (
                                                <p className="text-xs text-stone/70 mt-0.5">{answerObj.notes}</p>
                                              )}
                                            </div>
                                          </div>
                                        )
                                      }
                                      // Secondary assessment format: number (Likert 1-7) or string
                                      return (
                                        <div key={questionId} className="flex items-start gap-2 text-sm">
                                          <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium bg-ocean/20 text-ocean flex-shrink-0">
                                            {typeof answerObj === 'number' ? answerObj : '-'}
                                          </span>
                                          <span className="text-stone">{questionId}</span>
                                        </div>
                                      )
                                    })}
                                  </div>
                                </div>

                                {/* Organization */}
                                {row.profiles?.organization && (
                                  <div className="text-sm">
                                    <span className="text-stone">Organization:</span>{' '}
                                    <span className="font-medium text-ink">
                                      {row.profiles.organization}
                                    </span>
                                  </div>
                                )}

                                {/* Matched Case Studies (completed only) */}
                                {row.status === 'completed' && row.matched_case_studies && row.matched_case_studies.length > 0 && (
                                  <div className="text-sm">
                                    <span className="text-stone">Matched Case Studies:</span>{' '}
                                    <span className="font-medium text-ink">
                                      {row.matched_case_studies.join(', ')}
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

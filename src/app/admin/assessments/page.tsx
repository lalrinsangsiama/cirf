'use client'

import { useEffect, useState, Fragment, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/AuthProvider'
import { createClient } from '@/lib/supabase/client'
import { ASSESSMENT_CONFIGS, AssessmentType } from '@/lib/data/assessmentConfig'
import { likertQuestions, demographicQuestions } from '@/lib/data/assessmentQuestions'
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
  BarChart3,
  Users,
  TrendingUp,
  AlertCircle,
  FileSpreadsheet,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ============================================
// TYPES
// ============================================

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
    successRate?: string
    description: string
    color?: string
    sectionScores?: Record<string, number>
    constructScores?: Record<string, number>
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
  score?: number
  interpretation?: CompletedAssessment['interpretation']
  matched_case_studies?: string[] | null
  answers: Record<string, unknown>
  current_section?: string | null
}

// ============================================
// CONSTANTS
// ============================================

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

// Build a lookup from question ID to question text
const QUESTION_TEXT_MAP: Record<string, string> = {}
for (const q of likertQuestions) {
  QUESTION_TEXT_MAP[q.id] = q.question
}
for (const q of demographicQuestions) {
  QUESTION_TEXT_MAP[q.id] = q.question
}

// ============================================
// COMPONENT
// ============================================

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
  const [activeTab, setActiveTab] = useState<'table' | 'analytics'>('analytics')

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

    unified.sort((a, b) => new Date(b.activityDate).getTime() - new Date(a.activityDate).getTime())
    setRows(unified)
    setLoading(false)
  }

  // ============================================
  // COMPUTED ANALYTICS
  // ============================================

  const analytics = useMemo(() => {
    const completed = rows.filter(r => r.status === 'completed')
    const drafts = rows.filter(r => r.status === 'in_progress')

    // Unique users
    const uniqueUsers = new Set(rows.map(r => r.user_id)).size
    const uniqueCompletedUsers = new Set(completed.map(r => r.user_id)).size

    // By assessment type
    const byType: Record<string, { completed: number; drafts: number; scores: number[]; totalAnswered: number }> = {}
    for (const type of Object.keys(TYPE_LABELS)) {
      byType[type] = { completed: 0, drafts: 0, scores: [], totalAnswered: 0 }
    }
    for (const r of completed) {
      const t = r.assessment_type
      if (byType[t]) {
        byType[t].completed++
        if (r.score !== undefined) byType[t].scores.push(r.score)
        byType[t].totalAnswered += Object.keys(r.answers).length
      }
    }
    for (const r of drafts) {
      const t = r.assessment_type
      if (byType[t]) {
        byType[t].drafts++
        byType[t].totalAnswered += Object.keys(r.answers).length
      }
    }

    // Completion funnel (CIL specific)
    const cilCompleted = byType['cil']?.completed || 0
    const cilDrafts = byType['cil']?.drafts || 0
    const cilStarted = cilCompleted + cilDrafts
    const completionRate = cilStarted > 0 ? Math.round((cilCompleted / cilStarted) * 100) : 0

    // Secondary completion rate (of CIL completers, how many did at least one secondary?)
    const cilCompleterIds = new Set(completed.filter(r => r.assessment_type === 'cil').map(r => r.user_id))
    const secondaryCompleterIds = new Set(
      completed.filter(r => r.assessment_type !== 'cil' && cilCompleterIds.has(r.user_id)).map(r => r.user_id)
    )
    const secondaryConversion = cilCompleterIds.size > 0
      ? Math.round((secondaryCompleterIds.size / cilCompleterIds.size) * 100)
      : 0

    // Score distribution for CIL
    const cilScores = byType['cil']?.scores || []
    const avgCilScore = cilScores.length > 0
      ? Math.round((cilScores.reduce((a, b) => a + b, 0) / cilScores.length) * 10) / 10
      : 0

    // Score distribution buckets
    const scoreBuckets = { emerging: 0, developing: 0, established: 0, thriving: 0 }
    for (const s of cilScores) {
      if (s >= 80) scoreBuckets.thriving++
      else if (s >= 60) scoreBuckets.established++
      else if (s >= 40) scoreBuckets.developing++
      else scoreBuckets.emerging++
    }

    // Recent activity (last 7 days)
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const recentCompleted = completed.filter(r => new Date(r.activityDate) >= weekAgo).length
    const recentDrafts = drafts.filter(r => new Date(r.activityDate) >= weekAgo).length

    // Demographics summary from CIL answers
    const industryCounts: Record<string, number> = {}
    const countryCounts: Record<string, number> = {}
    const stageCounts: Record<string, number> = {}
    for (const r of completed.filter(r => r.assessment_type === 'cil')) {
      const answers = r.answers
      // Industry/sector
      const sectors = answers['demo-sector']
      if (Array.isArray(sectors)) {
        for (const s of sectors) {
          industryCounts[String(s)] = (industryCounts[String(s)] || 0) + 1
        }
      }
      // Country
      const country = answers['demo-country']
      if (country) {
        countryCounts[String(country)] = (countryCounts[String(country)] || 0) + 1
      }
      // Stage
      const stage = answers['demo-stage']
      if (stage) {
        stageCounts[String(stage)] = (stageCounts[String(stage)] || 0) + 1
      }
    }

    return {
      totalResponses: completed.length,
      totalDrafts: drafts.length,
      uniqueUsers,
      uniqueCompletedUsers,
      byType,
      cilStarted,
      cilCompleted,
      completionRate,
      secondaryConversion,
      avgCilScore,
      scoreBuckets,
      recentCompleted,
      recentDrafts,
      industryCounts,
      countryCounts,
      stageCounts,
    }
  }, [rows])

  // ============================================
  // HELPERS
  // ============================================

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
        return date >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      case 'month':
        return date >= new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
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
      if (level.includes('high') || level.includes('strong') || level.includes('excellent') || level.includes('thriving')) {
        return { label: row.interpretation.level, className: 'bg-sage/10 text-sage' }
      }
      if (level.includes('low') || level.includes('emerging') || level.includes('basic') || level.includes('critical')) {
        return { label: row.interpretation.level, className: 'bg-terracotta/10 text-terracotta' }
      }
      return { label: row.interpretation.level, className: 'bg-gold/10 text-gold' }
    }

    return { label: 'N/A', className: 'bg-stone/10 text-stone' }
  }

  const getQuestionText = (questionId: string): string => {
    return QUESTION_TEXT_MAP[questionId] || questionId
  }

  // ============================================
  // FILTERS
  // ============================================

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

  // ============================================
  // EXPORTS
  // ============================================

  // Basic summary CSV
  const exportSummaryCSV = () => {
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
      ...csvRows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')),
    ].join('\n')

    downloadFile(csvContent, `assessments-summary-${new Date().toISOString().split('T')[0]}.csv`, 'text/csv')
  }

  // Full research export — every answer as its own column
  const exportResearchCSV = () => {
    const completedOnly = filteredRows.filter(r => r.status === 'completed')
    if (completedOnly.length === 0) return

    // Collect all unique question IDs across all responses
    const allQuestionIds = new Set<string>()
    for (const row of completedOnly) {
      for (const key of Object.keys(row.answers)) {
        allQuestionIds.add(key)
      }
    }

    // Sort question IDs for consistent column order
    const sortedIds = Array.from(allQuestionIds).sort((a, b) => {
      // Demographics first, then by section prefix
      const order = ['demo-', 'cc-', 'ia-', 'oc-', 'er-', 'cimm-', 'cira-', 'tbl-', 'ciss-', 'price-']
      const aIdx = order.findIndex(p => a.startsWith(p))
      const bIdx = order.findIndex(p => b.startsWith(p))
      if (aIdx !== bIdx) return aIdx - bIdx
      return a.localeCompare(b)
    })

    // Build headers
    const metaHeaders = [
      'response_id',
      'user_id',
      'email',
      'name',
      'organization',
      'assessment_type',
      'overall_score',
      'interpretation_level',
      'completed_date',
    ]

    // Add section score headers
    const sectionScoreHeaders: string[] = []
    const sampleInterpretation = completedOnly.find(r => r.interpretation?.sectionScores)?.interpretation
    if (sampleInterpretation?.sectionScores) {
      for (const section of Object.keys(sampleInterpretation.sectionScores)) {
        sectionScoreHeaders.push(`section_score_${section}`)
      }
    }

    const headers = [...metaHeaders, ...sectionScoreHeaders, ...sortedIds]

    // Build rows
    const csvRows = completedOnly.map(row => {
      const meta = [
        row.id,
        row.user_id,
        row.profiles?.email || '',
        row.profiles?.full_name || '',
        row.profiles?.organization || '',
        row.assessment_type,
        row.score ?? '',
        row.interpretation?.level || '',
        row.activityDate,
      ]

      const sectionScores = sectionScoreHeaders.map(h => {
        const section = h.replace('section_score_', '')
        return row.interpretation?.sectionScores?.[section] ?? ''
      })

      const answers = sortedIds.map(qId => {
        const answer = row.answers[qId]
        if (answer === undefined || answer === null) return ''
        if (typeof answer === 'object' && answer !== null) {
          // CIL boolean format
          if ('answer' in (answer as Record<string, unknown>)) {
            return (answer as Record<string, unknown>).answer ? '1' : '0'
          }
          // Array (multiselect)
          if (Array.isArray(answer)) {
            return answer.join('; ')
          }
          return JSON.stringify(answer)
        }
        return String(answer)
      })

      return [...meta, ...sectionScores, ...answers]
    })

    const csvContent = [
      headers.join(','),
      ...csvRows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')),
    ].join('\n')

    downloadFile(
      csvContent,
      `research-data-${new Date().toISOString().split('T')[0]}.csv`,
      'text/csv'
    )
  }

  // Export with question text as column headers (for readability)
  const exportReadableCSV = () => {
    const completedOnly = filteredRows.filter(r => r.status === 'completed')
    if (completedOnly.length === 0) return

    const allQuestionIds = new Set<string>()
    for (const row of completedOnly) {
      for (const key of Object.keys(row.answers)) {
        allQuestionIds.add(key)
      }
    }

    const sortedIds = Array.from(allQuestionIds).sort()

    // Use question text as headers (truncated)
    const metaHeaders = ['Email', 'Name', 'Assessment', 'Score', 'Level', 'Date']
    const questionHeaders = sortedIds.map(id => {
      const text = getQuestionText(id)
      return text.length > 80 ? text.substring(0, 77) + '...' : text
    })

    const headers = [...metaHeaders, ...questionHeaders]

    const csvRows = completedOnly.map(row => {
      const meta = [
        row.profiles?.email || '',
        row.profiles?.full_name || '',
        TYPE_LABELS[row.assessment_type] || row.assessment_type,
        row.score ?? '',
        row.interpretation?.level || '',
        formatDate(row.activityDate),
      ]

      const answers = sortedIds.map(qId => {
        const answer = row.answers[qId]
        if (answer === undefined || answer === null) return ''
        if (Array.isArray(answer)) return answer.join('; ')
        if (typeof answer === 'object' && answer !== null) {
          if ('answer' in (answer as Record<string, unknown>)) {
            return (answer as Record<string, unknown>).answer ? 'Yes' : 'No'
          }
          return JSON.stringify(answer)
        }
        return String(answer)
      })

      return [...meta, ...answers]
    })

    const csvContent = [
      headers.join(','),
      ...csvRows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')),
    ].join('\n')

    downloadFile(
      csvContent,
      `research-readable-${new Date().toISOString().split('T')[0]}.csv`,
      'text/csv'
    )
  }

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: `${mimeType};charset=utf-8;` })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = filename
    link.click()
  }

  // ============================================
  // RENDER
  // ============================================

  if (authLoading || loading) {
    return (
      <main className="min-h-screen bg-sand pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
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

  const topIndustries = Object.entries(analytics.industryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  const topCountries = Object.entries(analytics.countryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  return (
    <main className="min-h-screen bg-sand pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-stone hover:text-ink transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Admin
            </Link>
            <h1 className="text-3xl font-serif font-bold text-ink">Research Dashboard</h1>
            <p className="text-stone mt-1">
              {analytics.totalResponses} completed responses from {analytics.uniqueCompletedUsers} unique participants
            </p>
          </div>
          <div className="flex gap-2">
            <div className="relative group">
              <button className="inline-flex items-center gap-2 bg-ink text-pearl px-4 py-2 rounded-lg font-medium hover:bg-ink/90 transition-colors">
                <Download className="w-4 h-4" />
                Export
                <ChevronDown className="w-3 h-3" />
              </button>
              <div className="absolute right-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-stone/10 py-1 hidden group-hover:block z-10">
                <button
                  onClick={exportSummaryCSV}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-sand/50 flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-stone" />
                  Summary CSV (scores only)
                </button>
                <button
                  onClick={exportResearchCSV}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-sand/50 flex items-center gap-2"
                >
                  <FileSpreadsheet className="w-4 h-4 text-ocean" />
                  Research Data (all answers)
                </button>
                <button
                  onClick={exportReadableCSV}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-sand/50 flex items-center gap-2"
                >
                  <FileSpreadsheet className="w-4 h-4 text-sage" />
                  Readable Export (question text headers)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="flex gap-1 bg-white rounded-lg p-1 mb-6 w-fit border border-stone/10">
          <button
            onClick={() => setActiveTab('analytics')}
            className={cn(
              'px-4 py-2 rounded-md text-sm font-medium transition-colors',
              activeTab === 'analytics' ? 'bg-ink text-pearl' : 'text-stone hover:text-ink'
            )}
          >
            <BarChart3 className="w-4 h-4 inline mr-2" />
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('table')}
            className={cn(
              'px-4 py-2 rounded-md text-sm font-medium transition-colors',
              activeTab === 'table' ? 'bg-ink text-pearl' : 'text-stone hover:text-ink'
            )}
          >
            <ClipboardCheck className="w-4 h-4 inline mr-2" />
            Responses ({rows.length})
          </button>
        </div>

        {/* ============================================ */}
        {/* ANALYTICS TAB */}
        {/* ============================================ */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-5 border border-stone/10">
                <div className="flex items-center gap-2 text-stone text-sm mb-1">
                  <ClipboardCheck className="w-4 h-4" />
                  Completed Responses
                </div>
                <p className="text-3xl font-bold text-ink">{analytics.totalResponses}</p>
                <p className="text-xs text-sage mt-1">+{analytics.recentCompleted} this week</p>
              </div>
              <div className="bg-white rounded-xl p-5 border border-stone/10">
                <div className="flex items-center gap-2 text-stone text-sm mb-1">
                  <Users className="w-4 h-4" />
                  Unique Participants
                </div>
                <p className="text-3xl font-bold text-ink">{analytics.uniqueCompletedUsers}</p>
                <p className="text-xs text-stone mt-1">{analytics.uniqueUsers} total (incl. drafts)</p>
              </div>
              <div className="bg-white rounded-xl p-5 border border-stone/10">
                <div className="flex items-center gap-2 text-stone text-sm mb-1">
                  <TrendingUp className="w-4 h-4" />
                  CIL Completion Rate
                </div>
                <p className="text-3xl font-bold text-ink">{analytics.completionRate}%</p>
                <p className="text-xs text-stone mt-1">
                  {analytics.cilCompleted} of {analytics.cilStarted} started
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 border border-stone/10">
                <div className="flex items-center gap-2 text-stone text-sm mb-1">
                  <AlertCircle className="w-4 h-4" />
                  In-Progress Drafts
                </div>
                <p className="text-3xl font-bold text-gold">{analytics.totalDrafts}</p>
                <p className="text-xs text-stone mt-1">+{analytics.recentDrafts} this week</p>
              </div>
            </div>

            {/* Second Row: Score + Funnel */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Score Distribution */}
              <div className="bg-white rounded-xl p-6 border border-stone/10">
                <h3 className="font-semibold text-ink mb-4">CIL Score Distribution</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Thriving (80-100)', count: analytics.scoreBuckets.thriving, color: 'bg-sage', total: analytics.cilCompleted },
                    { label: 'Established (60-79)', count: analytics.scoreBuckets.established, color: 'bg-ocean', total: analytics.cilCompleted },
                    { label: 'Developing (40-59)', count: analytics.scoreBuckets.developing, color: 'bg-gold', total: analytics.cilCompleted },
                    { label: 'Emerging (0-39)', count: analytics.scoreBuckets.emerging, color: 'bg-terracotta', total: analytics.cilCompleted },
                  ].map(bucket => (
                    <div key={bucket.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-stone">{bucket.label}</span>
                        <span className="font-medium text-ink">
                          {bucket.count} ({bucket.total > 0 ? Math.round((bucket.count / bucket.total) * 100) : 0}%)
                        </span>
                      </div>
                      <div className="w-full bg-stone/10 rounded-full h-2">
                        <div
                          className={cn('h-2 rounded-full transition-all', bucket.color)}
                          style={{ width: `${bucket.total > 0 ? (bucket.count / bucket.total) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-stone mt-4">
                  Average CIL Score: <span className="font-bold text-ink">{analytics.avgCilScore}%</span>
                </p>
              </div>

              {/* Assessment Funnel */}
              <div className="bg-white rounded-xl p-6 border border-stone/10">
                <h3 className="font-semibold text-ink mb-4">Assessment Funnel</h3>
                <div className="space-y-3">
                  {Object.entries(analytics.byType).map(([type, data]) => (
                    <div key={type} className="flex items-center gap-3">
                      <span className={cn('inline-block px-2 py-0.5 rounded text-xs font-semibold w-16 text-center', TYPE_COLORS[type])}>
                        {TYPE_LABELS[type]}
                      </span>
                      <div className="flex-1 flex items-center gap-2">
                        <div className="flex-1 bg-stone/10 rounded-full h-3">
                          <div
                            className="h-3 rounded-full bg-sage transition-all"
                            style={{ width: `${analytics.cilStarted > 0 ? (data.completed / analytics.cilStarted) * 100 : 0}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-ink w-8 text-right">{data.completed}</span>
                      </div>
                      {data.drafts > 0 && (
                        <span className="text-xs text-gold">+{data.drafts} drafts</span>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-stone mt-4">
                  Secondary conversion: <span className="font-bold text-ink">{analytics.secondaryConversion}%</span> of CIL completers took a secondary
                </p>
              </div>
            </div>

            {/* Third Row: Demographics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Top Industries */}
              <div className="bg-white rounded-xl p-6 border border-stone/10">
                <h3 className="font-semibold text-ink mb-4">Top Sectors</h3>
                {topIndustries.length === 0 ? (
                  <p className="text-sm text-stone">No data yet</p>
                ) : (
                  <div className="space-y-2">
                    {topIndustries.map(([industry, count]) => (
                      <div key={industry} className="flex justify-between text-sm">
                        <span className="text-stone truncate mr-2">{industry}</span>
                        <span className="font-medium text-ink flex-shrink-0">{count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Top Countries */}
              <div className="bg-white rounded-xl p-6 border border-stone/10">
                <h3 className="font-semibold text-ink mb-4">Top Countries</h3>
                {topCountries.length === 0 ? (
                  <p className="text-sm text-stone">No data yet</p>
                ) : (
                  <div className="space-y-2">
                    {topCountries.map(([country, count]) => (
                      <div key={country} className="flex justify-between text-sm">
                        <span className="text-stone">{country}</span>
                        <span className="font-medium text-ink">{count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Business Stages */}
              <div className="bg-white rounded-xl p-6 border border-stone/10">
                <h3 className="font-semibold text-ink mb-4">Business Stages</h3>
                {Object.keys(analytics.stageCounts).length === 0 ? (
                  <p className="text-sm text-stone">No data yet</p>
                ) : (
                  <div className="space-y-2">
                    {Object.entries(analytics.stageCounts)
                      .sort((a, b) => b[1] - a[1])
                      .map(([stage, count]) => (
                        <div key={stage} className="flex justify-between text-sm">
                          <span className="text-stone">{stage}</span>
                          <span className="font-medium text-ink">{count}</span>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ============================================ */}
        {/* TABLE TAB */}
        {/* ============================================ */}
        {activeTab === 'table' && (
          <>
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
                                    {/* Section Scores (completed only) */}
                                    {row.status === 'completed' && row.interpretation?.sectionScores && (
                                      <div className="bg-white rounded-lg p-4 border border-stone/10">
                                        <h4 className="font-semibold text-ink mb-3">Section Scores</h4>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                          {Object.entries(row.interpretation.sectionScores).map(([section, score]) => (
                                            <div key={section} className="text-center">
                                              <p className="text-2xl font-bold text-ink">{Math.round(score as number)}%</p>
                                              <p className="text-xs text-stone capitalize">{section.replace(/([A-Z])/g, ' $1').trim()}</p>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {/* Interpretation (completed only) */}
                                    {row.status === 'completed' && row.interpretation && (
                                      <div className="bg-white rounded-lg p-4 border border-stone/10">
                                        <h4 className="font-semibold text-ink mb-2">Interpretation</h4>
                                        <p className="text-stone text-sm">{row.interpretation.description}</p>
                                      </div>
                                    )}

                                    {/* Current section (draft only) */}
                                    {row.status === 'in_progress' && row.current_section && (
                                      <div className="bg-white rounded-lg p-4 border border-stone/10">
                                        <h4 className="font-semibold text-ink mb-2">Progress</h4>
                                        <p className="text-stone text-sm">
                                          Currently on: <span className="font-medium text-ink">{row.current_section}</span>
                                          {' '}&middot;{' '}
                                          {Object.keys(row.answers).length} answers recorded
                                        </p>
                                      </div>
                                    )}

                                    {/* Answers with question text */}
                                    <div className="bg-white rounded-lg p-4 border border-stone/10">
                                      <h4 className="font-semibold text-ink mb-3">
                                        Answers ({Object.keys(row.answers).length})
                                      </h4>
                                      <div className="space-y-2 max-h-96 overflow-y-auto">
                                        {Object.entries(row.answers).map(([questionId, answer]) => {
                                          const questionText = getQuestionText(questionId)
                                          const displayAnswer = (() => {
                                            if (answer === null || answer === undefined) return 'N/A'
                                            if (Array.isArray(answer)) return answer.join(', ')
                                            if (typeof answer === 'object' && 'answer' in (answer as Record<string, unknown>)) {
                                              return (answer as Record<string, unknown>).answer ? 'Yes' : 'No'
                                            }
                                            return String(answer)
                                          })()

                                          // Color code Likert answers
                                          const numAnswer = typeof answer === 'number' ? answer : null
                                          const answerColor = numAnswer !== null
                                            ? numAnswer >= 6 ? 'text-sage font-bold'
                                              : numAnswer >= 4 ? 'text-gold font-bold'
                                                : 'text-terracotta font-bold'
                                            : 'text-ink'

                                          return (
                                            <div key={questionId} className="flex items-start gap-3 text-sm py-1 border-b border-stone/5 last:border-0">
                                              <span className="text-xs text-stone/50 font-mono w-12 flex-shrink-0 pt-0.5">{questionId}</span>
                                              <span className="text-stone flex-1">{questionText}</span>
                                              <span className={cn('flex-shrink-0 w-20 text-right', answerColor)}>
                                                {displayAnswer}
                                              </span>
                                            </div>
                                          )
                                        })}
                                      </div>
                                    </div>

                                    {/* Organization */}
                                    {row.profiles?.organization && (
                                      <div className="text-sm">
                                        <span className="text-stone">Organization:</span>{' '}
                                        <span className="font-medium text-ink">{row.profiles.organization}</span>
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
          </>
        )}
      </div>
    </main>
  )
}

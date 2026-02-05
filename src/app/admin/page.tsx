'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/AuthProvider'
import { createClient } from '@/lib/supabase/client'
import {
  FileText,
  ClipboardCheck,
  Mail,
  Users,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  Eye,
  Plus,
} from 'lucide-react'

interface DashboardStats {
  totalPosts: number
  publishedPosts: number
  draftPosts: number
  totalAssessments: number
  newsletterSubscribers: number
  contactSubmissions: number
  newContactSubmissions: number
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const { user, profile, loading: authLoading } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalAssessments: 0,
    newsletterSubscribers: 0,
    contactSubmissions: 0,
    newContactSubmissions: 0,
  })
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    if (!authLoading && (!user || profile?.role !== 'admin')) {
      router.push('/dashboard')
      return
    }

    if (user && profile?.role === 'admin') {
      fetchStats()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, profile, authLoading, router])

  const fetchStats = async () => {
    setLoading(true)

    // Fetch all stats in parallel
    const [
      postsResult,
      assessmentsResult,
      subscribersResult,
      contactsResult,
    ] = await Promise.all([
      supabase.from('blog_posts').select('id, status'),
      supabase.from('assessments').select('id', { count: 'exact', head: true }),
      supabase.from('newsletter_subscribers').select('id', { count: 'exact', head: true }).eq('subscribed', true),
      supabase.from('contact_submissions').select('id, status'),
    ])

    const posts = postsResult.data || []
    const publishedPosts = posts.filter(p => p.status === 'published').length
    const draftPosts = posts.filter(p => p.status === 'draft').length

    const contacts = contactsResult.data || []
    const newContacts = contacts.filter(c => c.status === 'new').length

    setStats({
      totalPosts: posts.length,
      publishedPosts,
      draftPosts,
      totalAssessments: assessmentsResult.count || 0,
      newsletterSubscribers: subscribersResult.count || 0,
      contactSubmissions: contacts.length,
      newContactSubmissions: newContacts,
    })

    setLoading(false)
  }

  if (authLoading || loading) {
    return (
      <main className="min-h-screen bg-sand pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-stone/20 rounded w-48" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="h-32 bg-stone/20 rounded-2xl" />
              <div className="h-32 bg-stone/20 rounded-2xl" />
              <div className="h-32 bg-stone/20 rounded-2xl" />
              <div className="h-32 bg-stone/20 rounded-2xl" />
            </div>
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
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-ink mb-2">
            Admin Dashboard
          </h1>
          <p className="text-stone">
            Manage content, view analytics, and monitor user activity
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Blog Posts */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone/10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-gold" />
              </div>
              <Link
                href="/admin/blog"
                className="text-sm text-gold font-medium hover:underline"
              >
                View all
              </Link>
            </div>
            <p className="text-3xl font-bold text-ink mb-1">{stats.totalPosts}</p>
            <p className="text-sm text-stone">Blog Posts</p>
            <div className="mt-2 flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-sage">
                <Eye className="w-3 h-3" />
                {stats.publishedPosts} published
              </span>
              <span className="text-stone">{stats.draftPosts} drafts</span>
            </div>
          </div>

          {/* Assessments */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone/10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-sage/10 rounded-xl flex items-center justify-center">
                <ClipboardCheck className="w-6 h-6 text-sage" />
              </div>
              <Link
                href="/admin/assessments"
                className="text-sm text-gold font-medium hover:underline"
              >
                View all
              </Link>
            </div>
            <p className="text-3xl font-bold text-ink mb-1">{stats.totalAssessments}</p>
            <p className="text-sm text-stone">Assessments Completed</p>
            <div className="mt-2 flex items-center gap-1 text-xs text-sage">
              <TrendingUp className="w-3 h-3" />
              View detailed results
            </div>
          </div>

          {/* Newsletter */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone/10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-ocean/10 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-ocean" />
              </div>
            </div>
            <p className="text-3xl font-bold text-ink mb-1">{stats.newsletterSubscribers}</p>
            <p className="text-sm text-stone">Newsletter Subscribers</p>
            <div className="mt-2 flex items-center gap-1 text-xs text-ocean">
              <Users className="w-3 h-3" />
              Active subscribers
            </div>
          </div>

          {/* Contact Submissions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone/10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-terracotta/10 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-terracotta" />
              </div>
            </div>
            <p className="text-3xl font-bold text-ink mb-1">{stats.contactSubmissions}</p>
            <p className="text-sm text-stone">Contact Submissions</p>
            {stats.newContactSubmissions > 0 && (
              <div className="mt-2 flex items-center gap-1 text-xs text-terracotta font-medium">
                <span className="w-2 h-2 bg-terracotta rounded-full animate-pulse" />
                {stats.newContactSubmissions} new
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Blog Management */}
          <div className="bg-white rounded-2xl shadow-sm border border-stone/10 overflow-hidden">
            <div className="p-6 border-b border-stone/10">
              <h2 className="text-lg font-semibold text-ink flex items-center gap-2">
                <FileText className="w-5 h-5 text-gold" />
                Blog Management
              </h2>
            </div>
            <div className="p-6 space-y-3">
              <Link
                href="/admin/blog/new"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-sand/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Plus className="w-5 h-5 text-stone group-hover:text-gold transition-colors" />
                  <span className="text-ink">Create New Post</span>
                </div>
                <ArrowRight className="w-4 h-4 text-stone group-hover:text-gold transition-colors" />
              </Link>
              <Link
                href="/admin/blog/new?ai=true"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-sand/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">✨</span>
                  <span className="text-ink">AI Generate Post</span>
                </div>
                <ArrowRight className="w-4 h-4 text-stone group-hover:text-gold transition-colors" />
              </Link>
              <Link
                href="/admin/blog"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-sand/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-stone group-hover:text-gold transition-colors" />
                  <span className="text-ink">Manage All Posts</span>
                </div>
                <ArrowRight className="w-4 h-4 text-stone group-hover:text-gold transition-colors" />
              </Link>
            </div>
          </div>

          {/* Assessment Results */}
          <div className="bg-white rounded-2xl shadow-sm border border-stone/10 overflow-hidden">
            <div className="p-6 border-b border-stone/10">
              <h2 className="text-lg font-semibold text-ink flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5 text-sage" />
                Assessment Results
              </h2>
            </div>
            <div className="p-6 space-y-3">
              <Link
                href="/admin/assessments"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-sand/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-stone group-hover:text-sage transition-colors" />
                  <span className="text-ink">View All Results</span>
                </div>
                <ArrowRight className="w-4 h-4 text-stone group-hover:text-sage transition-colors" />
              </Link>
              <div className="p-3 bg-sand/30 rounded-lg">
                <p className="text-sm text-stone">
                  View detailed assessment responses, scores, and user analytics.
                </p>
              </div>
            </div>
          </div>

          {/* Content Tips */}
          <div className="bg-white rounded-2xl shadow-sm border border-stone/10 overflow-hidden">
            <div className="p-6 border-b border-stone/10">
              <h2 className="text-lg font-semibold text-ink flex items-center gap-2">
                <span className="text-lg">💡</span>
                Content Tips
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="text-sm text-stone space-y-3">
                <p>
                  <strong className="text-ink">Research Papers:</strong> Use category &quot;Research Insights&quot; and add full citations.
                </p>
                <p>
                  <strong className="text-ink">Tools:</strong> Use category &quot;Framework Updates&quot; with tool-related tags.
                </p>
                <p>
                  <strong className="text-ink">Case Studies:</strong> Use the &quot;Case Studies&quot; category for success stories.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

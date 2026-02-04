'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/AuthProvider'
import { createClient } from '@/lib/supabase/client'
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Calendar,
  ArrowLeft,
  Search,
  FileText,
  Sparkles,
} from 'lucide-react'

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  status: string
  published_at: string | null
  created_at: string
  view_count: number
}

const STATUS_COLORS: Record<string, string> = {
  draft: 'bg-stone/10 text-stone',
  review: 'bg-gold/10 text-gold',
  published: 'bg-sage/10 text-sage',
  archived: 'bg-terracotta/10 text-terracotta',
}

export default function AdminBlogPage() {
  const router = useRouter()
  const { user, profile, loading: authLoading } = useAuth()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [deleting, setDeleting] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    if (!authLoading && (!user || profile?.role !== 'admin')) {
      router.push('/dashboard')
      return
    }

    if (user && profile?.role === 'admin') {
      fetchPosts()
    }
  }, [user, profile, authLoading])

  const fetchPosts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, slug, title, excerpt, category, status, published_at, created_at, view_count')
      .order('created_at', { ascending: false })

    if (data) {
      setPosts(data)
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    setDeleting(id)
    const { error } = await supabase.from('blog_posts').delete().eq('id', id)

    if (!error) {
      setPosts(posts.filter(p => p.id !== id))
    }
    setDeleting(null)
  }

  const handlePublish = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published'
    const updates: Record<string, unknown> = { status: newStatus }

    if (newStatus === 'published') {
      updates.published_at = new Date().toISOString()
    }

    const { error } = await supabase.from('blog_posts').update(updates).eq('id', id)

    if (!error) {
      setPosts(posts.map(p =>
        p.id === id
          ? { ...p, status: newStatus, published_at: newStatus === 'published' ? new Date().toISOString() : p.published_at }
          : p
      ))
    }
  }

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
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
            <h1 className="text-3xl font-serif font-bold text-ink">Blog Management</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/blog/new?ai=true"
              className="inline-flex items-center gap-2 bg-gold text-white px-4 py-2 rounded-lg font-medium hover:bg-gold/90 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              AI Generate
            </Link>
            <Link
              href="/admin/blog/new"
              className="inline-flex items-center gap-2 bg-ink text-pearl px-4 py-2 rounded-lg font-medium hover:bg-ink/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Post
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 bg-white"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 bg-white"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="review">Review</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Posts Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone/10 overflow-hidden">
          {filteredPosts.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 text-stone/40 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-ink mb-2">No posts found</h3>
              <p className="text-stone mb-6">
                {searchQuery || statusFilter !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Create your first blog post to get started'}
              </p>
              <Link
                href="/admin/blog/new"
                className="inline-flex items-center gap-2 bg-ink text-pearl px-4 py-2 rounded-lg font-medium hover:bg-ink/90 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Create Post
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-sand/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-ink">Title</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-ink">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-ink">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-ink">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-ink">Views</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-ink">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone/10">
                  {filteredPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-sand/30 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-ink line-clamp-1">{post.title}</p>
                          <p className="text-sm text-stone line-clamp-1">{post.excerpt}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-stone capitalize">
                          {post.category?.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium capitalize ${STATUS_COLORS[post.status] || STATUS_COLORS.draft}`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-sm text-stone">
                          <Calendar className="w-4 h-4" />
                          {formatDate(post.published_at || post.created_at)}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-stone">
                        {post.view_count || 0}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handlePublish(post.id, post.status)}
                            className="p-2 text-stone hover:text-ink transition-colors"
                            title={post.status === 'published' ? 'Unpublish' : 'Publish'}
                          >
                            {post.status === 'published' ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                          <Link
                            href={`/admin/blog/${post.id}`}
                            className="p-2 text-stone hover:text-ink transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(post.id)}
                            disabled={deleting === post.id}
                            className="p-2 text-stone hover:text-terracotta transition-colors disabled:opacity-50"
                            title="Delete"
                          >
                            {deleting === post.id ? (
                              <div className="w-4 h-4 border-2 border-stone/30 border-t-stone rounded-full animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

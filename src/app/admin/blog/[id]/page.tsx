'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
import { createClient } from '@/lib/supabase/client'
import {
  ArrowLeft,
  Save,
  Eye,
  Loader2,
  Plus,
  X,
  AlertCircle,
  Trash2,
} from 'lucide-react'

interface Citation {
  author: string
  year: string
  title: string
  journal?: string
  doi?: string
  url?: string
}

const CATEGORIES = [
  { id: 'research', name: 'Research Insights' },
  { id: 'case-study', name: 'Case Studies' },
  { id: 'practitioner-tips', name: 'Practitioner Tips' },
  { id: 'news', name: 'News' },
  { id: 'framework-updates', name: 'Framework Updates' },
]

export default function EditBlogPostPage() {
  const router = useRouter()
  const params = useParams()
  const postId = params.id as string
  const { user, profile, loading: authLoading } = useAuth()
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'research',
    tags: [] as string[],
    featured_image: '',
    citations: [] as Citation[],
    status: 'draft',
  })

  const [newTag, setNewTag] = useState('')

  const supabase = createClient()

  const fetchPost = useCallback(async () => {
    setLoading(true)
    const { data, error: fetchError } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', postId)
      .single()

    if (fetchError || !data) {
      setNotFound(true)
      setLoading(false)
      return
    }

    setFormData({
      title: data.title || '',
      slug: data.slug || '',
      excerpt: data.excerpt || '',
      content: data.content || '',
      category: data.category || 'research',
      tags: data.tags || [],
      featured_image: data.featured_image || '',
      citations: data.citations || [],
      status: data.status || 'draft',
    })

    setLoading(false)
  }, [postId, supabase])

  useEffect(() => {
    if (!authLoading && (!user || profile?.role !== 'admin')) {
      router.push('/dashboard')
      return
    }

    if (user && profile?.role === 'admin' && postId) {
      fetchPost()
    }
  }, [user, profile, authLoading, postId, fetchPost, router])

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }))
  }

  const handleAddTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag],
      }))
      setNewTag('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag),
    }))
  }

  const handleAddCitation = () => {
    setFormData(prev => ({
      ...prev,
      citations: [...prev.citations, { author: '', year: '', title: '' }],
    }))
  }

  const handleUpdateCitation = (index: number, field: keyof Citation, value: string) => {
    setFormData(prev => ({
      ...prev,
      citations: prev.citations.map((c, i) =>
        i === index ? { ...c, [field]: value } : c
      ),
    }))
  }

  const handleRemoveCitation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      citations: prev.citations.filter((_, i) => i !== index),
    }))
  }

  const handleSave = async (publish = false) => {
    if (!formData.title || !formData.content) {
      setError('Title and content are required')
      return
    }

    setSaving(true)
    setError(null)

    const postData = {
      ...formData,
      status: publish ? 'published' : formData.status,
      published_at: publish ? new Date().toISOString() : undefined,
      updated_at: new Date().toISOString(),
    }

    const { error: saveError } = await supabase
      .from('blog_posts')
      .update(postData)
      .eq('id', postId)

    if (saveError) {
      setError(saveError.message)
      setSaving(false)
      return
    }

    router.push('/admin/blog')
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return
    }

    setDeleting(true)
    setError(null)

    const { error: deleteError } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', postId)

    if (deleteError) {
      setError(deleteError.message)
      setDeleting(false)
      return
    }

    router.push('/admin/blog')
  }

  if (authLoading || loading) {
    return (
      <main className="min-h-screen bg-sand pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4">
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

  if (notFound) {
    return (
      <main className="min-h-screen bg-sand pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-serif font-bold text-ink mb-4">Post Not Found</h1>
          <p className="text-stone mb-6">The blog post you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/admin/blog"
            className="inline-flex items-center gap-2 bg-ink text-pearl px-4 py-2 rounded-lg font-medium hover:bg-ink/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog Management
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-sand pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/admin/blog"
              className="inline-flex items-center gap-2 text-stone hover:text-ink transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog Management
            </Link>
            <h1 className="text-3xl font-serif font-bold text-ink">Edit Post</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="inline-flex items-center gap-2 border border-terracotta/20 text-terracotta px-4 py-2 rounded-lg font-medium hover:bg-terracotta/10 transition-colors disabled:opacity-50"
            >
              {deleting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
              Delete
            </button>
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="inline-flex items-center gap-2 border border-stone/20 bg-white px-4 py-2 rounded-lg font-medium hover:bg-sand transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              Save Draft
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="inline-flex items-center gap-2 bg-ink text-pearl px-4 py-2 rounded-lg font-medium hover:bg-ink/90 transition-colors disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
              Publish
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-terracotta/10 border border-terracotta/20 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
            <p className="text-sm text-terracotta">{error}</p>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone/10 p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter post title"
              className="w-full px-4 py-3 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Slug</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              placeholder="url-friendly-slug"
              className="w-full px-4 py-3 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-4 py-3 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 bg-white"
            >
              {CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Excerpt</label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              placeholder="Brief summary of the post..."
              rows={2}
              className="w-full px-4 py-3 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Content</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Write your post content here... (Markdown supported)"
              rows={16}
              className="w-full px-4 py-3 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 font-mono text-sm"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 bg-stone/10 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="text-stone hover:text-ink"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                placeholder="Add a tag"
                className="flex-1 px-4 py-2 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
              <button
                onClick={handleAddTag}
                className="px-4 py-2 border border-stone/20 rounded-lg hover:bg-sand transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Featured Image URL</label>
            <input
              type="url"
              value={formData.featured_image}
              onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
            />
          </div>

          {/* Citations */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-ink">Citations</label>
              <button
                onClick={handleAddCitation}
                className="inline-flex items-center gap-1 text-sm text-gold hover:underline"
              >
                <Plus className="w-4 h-4" />
                Add Citation
              </button>
            </div>
            <div className="space-y-4">
              {formData.citations.map((citation, index) => (
                <div key={index} className="bg-sand/50 rounded-lg p-4 relative">
                  <button
                    onClick={() => handleRemoveCitation(index)}
                    className="absolute top-2 right-2 text-stone hover:text-terracotta"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={citation.author}
                      onChange={(e) => handleUpdateCitation(index, 'author', e.target.value)}
                      placeholder="Author(s)"
                      className="px-3 py-2 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 bg-white text-sm"
                    />
                    <input
                      type="text"
                      value={citation.year}
                      onChange={(e) => handleUpdateCitation(index, 'year', e.target.value)}
                      placeholder="Year"
                      className="px-3 py-2 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 bg-white text-sm"
                    />
                    <input
                      type="text"
                      value={citation.title}
                      onChange={(e) => handleUpdateCitation(index, 'title', e.target.value)}
                      placeholder="Title"
                      className="px-3 py-2 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 bg-white text-sm md:col-span-2"
                    />
                    <input
                      type="text"
                      value={citation.journal || ''}
                      onChange={(e) => handleUpdateCitation(index, 'journal', e.target.value)}
                      placeholder="Journal (optional)"
                      className="px-3 py-2 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 bg-white text-sm"
                    />
                    <input
                      type="text"
                      value={citation.doi || ''}
                      onChange={(e) => handleUpdateCitation(index, 'doi', e.target.value)}
                      placeholder="DOI (optional)"
                      className="px-3 py-2 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 bg-white text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

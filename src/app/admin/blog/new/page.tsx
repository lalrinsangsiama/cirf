'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
import { createClient } from '@/lib/supabase/client'
import {
  ArrowLeft,
  Save,
  Eye,
  Sparkles,
  Loader2,
  Plus,
  X,
  AlertCircle,
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

function NewBlogPostContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, profile, loading: authLoading } = useAuth()
  const [saving, setSaving] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
  const [aiTopic, setAiTopic] = useState('')
  const showAiPanel = searchParams.get('ai') === 'true'

  const supabase = createClient()

  useEffect(() => {
    if (!authLoading && (!user || profile?.role !== 'admin')) {
      router.push('/dashboard')
    }
  }, [user, profile, authLoading])

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

  const handleAiGenerate = async () => {
    if (!aiTopic.trim()) {
      setError('Please enter a topic for AI generation')
      return
    }

    setGenerating(true)
    setError(null)

    try {
      const response = await fetch('/api/ai/generate-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic: aiTopic }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate content')
      }

      setFormData(prev => ({
        ...prev,
        title: data.title || prev.title,
        excerpt: data.excerpt || prev.excerpt,
        content: data.content || prev.content,
        citations: data.citations || prev.citations,
        slug: generateSlug(data.title || prev.title),
      }))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate content')
    } finally {
      setGenerating(false)
    }
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
      author_id: user?.id,
      author_name: profile?.full_name || 'CIL Team',
      status: publish ? 'published' : formData.status,
      published_at: publish ? new Date().toISOString() : null,
    }

    const { data, error: saveError } = await supabase
      .from('blog_posts')
      .insert([postData])
      .select()
      .single()

    if (saveError) {
      setError(saveError.message)
      setSaving(false)
      return
    }

    router.push('/admin/blog')
  }

  if (authLoading) {
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
            <h1 className="text-3xl font-serif font-bold text-ink">New Post</h1>
          </div>
          <div className="flex items-center gap-3">
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

        {/* AI Generation Panel */}
        {showAiPanel && (
          <div className="mb-6 bg-gradient-to-r from-gold/10 to-sage/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-gold" />
              <h3 className="font-semibold text-ink">AI Content Generation</h3>
            </div>
            <p className="text-sm text-stone mb-4">
              Enter a topic and we&apos;ll generate a draft blog post with research and citations.
            </p>
            <div className="flex gap-3">
              <input
                type="text"
                value={aiTopic}
                onChange={(e) => setAiTopic(e.target.value)}
                placeholder="e.g., Traditional textile innovations in Southeast Asia"
                className="flex-1 px-4 py-2 border border-stone/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 bg-white"
              />
              <button
                onClick={handleAiGenerate}
                disabled={generating}
                className="inline-flex items-center gap-2 bg-gold text-white px-4 py-2 rounded-lg font-medium hover:bg-gold/90 transition-colors disabled:opacity-50"
              >
                {generating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                Generate
              </button>
            </div>
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

export default function NewBlogPostPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-sand pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-stone/20 rounded w-48" />
            <div className="h-64 bg-stone/20 rounded-2xl" />
          </div>
        </div>
      </main>
    }>
      <NewBlogPostContent />
    </Suspense>
  )
}

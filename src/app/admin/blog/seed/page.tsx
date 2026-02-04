'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
import { createClient } from '@/lib/supabase/client'
import { BLOG_POSTS } from '@/lib/data/blogContent'
import { ArrowLeft, Loader2, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

export default function SeedBlogPage() {
  const { user, profile, loading: authLoading } = useAuth()
  const [seeding, setSeeding] = useState(false)
  const [results, setResults] = useState<{
    created: string[]
    updated: string[]
    errors: { slug: string; error: string }[]
  } | null>(null)

  const supabase = createClient()

  // Check if user is admin
  const isAdmin = profile?.role === 'admin'

  const handleSeed = async () => {
    if (!user || !isAdmin) return

    setSeeding(true)
    setResults(null)

    const newResults = {
      created: [] as string[],
      updated: [] as string[],
      errors: [] as { slug: string; error: string }[],
    }

    for (const post of BLOG_POSTS) {
      try {
        // Check if post already exists
        const { data: existing } = await supabase
          .from('blog_posts')
          .select('id, slug')
          .eq('slug', post.slug)
          .single()

        const postData = {
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          author_name: post.author_name,
          category: post.category,
          tags: post.tags,
          featured_image: post.featured_image || null,
          status: post.status,
          published_at: new Date().toISOString(),
          view_count: 0,
        }

        if (existing) {
          // Update existing post
          const { error } = await supabase
            .from('blog_posts')
            .update({
              ...postData,
              updated_at: new Date().toISOString(),
            })
            .eq('id', existing.id)

          if (error) {
            newResults.errors.push({ slug: post.slug, error: error.message })
          } else {
            newResults.updated.push(post.slug)
          }
        } else {
          // Create new post
          const { error } = await supabase
            .from('blog_posts')
            .insert(postData)

          if (error) {
            newResults.errors.push({ slug: post.slug, error: error.message })
          } else {
            newResults.created.push(post.slug)
          }
        }
      } catch (err) {
        newResults.errors.push({
          slug: post.slug,
          error: err instanceof Error ? err.message : 'Unknown error',
        })
      }
    }

    setResults(newResults)
    setSeeding(false)
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-pearl flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    )
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-pearl pt-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <AlertCircle className="w-16 h-16 text-terracotta mx-auto mb-4" />
          <h1 className="text-2xl font-serif mb-4">Admin Access Required</h1>
          <p className="text-stone mb-8">
            You need to be logged in as an admin to seed blog posts.
          </p>
          <Link href="/auth/login" className="btn-primary">
            Log In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-pearl pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/admin/blog"
          className="inline-flex items-center gap-2 text-stone hover:text-ink mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog Admin
        </Link>

        <h1 className="text-3xl font-serif mb-4">Seed Blog Posts</h1>
        <p className="text-stone mb-8">
          This will seed {BLOG_POSTS.length} pre-written blog posts to your database.
          Existing posts with the same slug will be updated.
        </p>

        {/* Posts Preview */}
        <div className="bg-white rounded-xl p-6 mb-8 border border-stone/10">
          <h2 className="font-medium mb-4">Posts to Seed ({BLOG_POSTS.length})</h2>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {BLOG_POSTS.map((post) => (
              <div
                key={post.slug}
                className="flex items-center justify-between p-3 bg-sand/50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-sm">{post.title}</p>
                  <p className="text-xs text-stone">{post.category}</p>
                </div>
                {results && (
                  <>
                    {results.created.includes(post.slug) && (
                      <span className="text-sage text-xs flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Created
                      </span>
                    )}
                    {results.updated.includes(post.slug) && (
                      <span className="text-ocean text-xs flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Updated
                      </span>
                    )}
                    {results.errors.find(e => e.slug === post.slug) && (
                      <span className="text-terracotta text-xs flex items-center gap-1">
                        <XCircle className="w-3 h-3" /> Error
                      </span>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        {results && (
          <div className="bg-white rounded-xl p-6 mb-8 border border-stone/10">
            <h2 className="font-medium mb-4">Results</h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-sage/10 rounded-lg">
                <p className="text-2xl font-serif text-sage">{results.created.length}</p>
                <p className="text-xs text-stone">Created</p>
              </div>
              <div className="p-4 bg-ocean/10 rounded-lg">
                <p className="text-2xl font-serif text-ocean">{results.updated.length}</p>
                <p className="text-xs text-stone">Updated</p>
              </div>
              <div className="p-4 bg-terracotta/10 rounded-lg">
                <p className="text-2xl font-serif text-terracotta">{results.errors.length}</p>
                <p className="text-xs text-stone">Errors</p>
              </div>
            </div>

            {results.errors.length > 0 && (
              <div className="mt-4 p-4 bg-terracotta/10 rounded-lg">
                <p className="text-sm font-medium text-terracotta mb-2">Errors:</p>
                <ul className="text-xs text-terracotta space-y-1">
                  {results.errors.map((e, i) => (
                    <li key={i}>
                      <strong>{e.slug}:</strong> {e.error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleSeed}
            disabled={seeding}
            className="btn-primary flex items-center gap-2"
          >
            {seeding ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Seeding...
              </>
            ) : (
              'Seed Blog Posts'
            )}
          </button>

          {results && results.created.length + results.updated.length > 0 && (
            <Link href="/blog" className="btn-secondary">
              View Blog
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

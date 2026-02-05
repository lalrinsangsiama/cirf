import { NextResponse } from 'next/server'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { createClient } from '@supabase/supabase-js'
import { BLOG_POSTS } from '@/lib/data/blogContent'

// Create admin client with service role key to bypass RLS
function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Missing Supabase admin credentials')
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// POST /api/blog/seed - Seed blog posts from blogContent.ts
// This should only be run by admins/developers
export async function POST(request: Request) {
  try {
    // Check for admin secret in header for basic protection
    const authHeader = request.headers.get('Authorization')
    const adminSecret = process.env.ADMIN_SECRET_KEY

    if (!adminSecret) {
      return NextResponse.json(
        { error: 'Admin secret key not configured' },
        { status: 500 }
      )
    }

    if (authHeader !== `Bearer ${adminSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Use admin client to bypass RLS
    const supabase = createAdminClient()

    const results = {
      created: [] as string[],
      updated: [] as string[],
      errors: [] as { slug: string; error: string }[],
    }

    for (const post of BLOG_POSTS) {
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
          results.errors.push({ slug: post.slug, error: error.message })
        } else {
          results.updated.push(post.slug)
        }
      } else {
        // Create new post
        const { error } = await supabase
          .from('blog_posts')
          .insert(postData)

        if (error) {
          results.errors.push({ slug: post.slug, error: error.message })
        } else {
          results.created.push(post.slug)
        }
      }
    }

    return NextResponse.json({
      success: true,
      results,
      message: `Created ${results.created.length} posts, updated ${results.updated.length} posts, ${results.errors.length} errors`,
    })
  } catch (error) {
    console.error('Blog seed error:', error)
    return NextResponse.json(
      { error: 'Failed to seed blog posts' },
      { status: 500 }
    )
  }
}

// GET /api/blog/seed - Check seed status
export async function GET() {
  try {
    const supabase = createAdminClient()

    // Get count of posts in database
    const { count, error } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })

    if (error) {
      return NextResponse.json(
        { error: 'Failed to check blog posts' },
        { status: 500 }
      )
    }

    // Check which posts from BLOG_POSTS already exist
    const existingPosts: string[] = []
    const missingPosts: string[] = []

    for (const post of BLOG_POSTS) {
      const { data } = await supabase
        .from('blog_posts')
        .select('slug')
        .eq('slug', post.slug)
        .single()

      if (data) {
        existingPosts.push(post.slug)
      } else {
        missingPosts.push(post.slug)
      }
    }

    return NextResponse.json({
      totalPostsInDb: count,
      seedPostsCount: BLOG_POSTS.length,
      existingPosts,
      missingPosts,
      needsSeeding: missingPosts.length > 0,
    })
  } catch (error) {
    console.error('Blog seed check error:', error)
    return NextResponse.json(
      { error: 'Failed to check seed status' },
      { status: 500 }
    )
  }
}

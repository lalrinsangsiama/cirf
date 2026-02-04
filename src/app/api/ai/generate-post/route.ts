import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateBlogPost } from '@/lib/ai/contentGenerator'
import { generatePostSchema, validateInput } from '@/lib/validation'
import { checkRateLimit, aiRateLimit } from '@/lib/rateLimit'
import { successResponse, errorResponse, validationErrorResponse, rateLimitErrorResponse } from '@/lib/api/response'
import { Errors } from '@/lib/api/errors'
import { logger } from '@/lib/logger'

export async function POST(request: NextRequest) {
  const startTime = Date.now()

  try {
    // Check rate limit
    const rateLimitResult = checkRateLimit(request, aiRateLimit)
    if (!rateLimitResult.allowed) {
      logger.warn('AI generation rate limit exceeded', {
        path: '/api/ai/generate-post',
        resetTime: rateLimitResult.resetTime,
      })
      return rateLimitErrorResponse(
        rateLimitResult.resetTime,
        aiRateLimit.message
      )
    }

    // Check authentication
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return errorResponse(Errors.unauthorized())
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      logger.warn('Non-admin attempted AI generation', {
        userId: user.id,
        role: profile?.role,
      })
      return errorResponse(Errors.forbidden('Admin access required'))
    }

    // Parse and validate input
    const body = await request.json()
    const validation = validateInput(generatePostSchema, body)

    if (!validation.success) {
      return validationErrorResponse(validation.error, validation.errors)
    }

    const { topic } = validation.data

    // Check if ANTHROPIC_API_KEY is configured
    if (!process.env.ANTHROPIC_API_KEY) {
      logger.error('ANTHROPIC_API_KEY not configured')
      return errorResponse(
        Errors.serviceUnavailable('AI service')
      )
    }

    logger.info('AI generation started', {
      userId: user.id,
      topicLength: topic.length,
    })

    // Generate the blog post
    const generatedPost = await generateBlogPost(topic)

    logger.info('AI generation completed', {
      userId: user.id,
      titleLength: generatedPost.title?.length || 0,
      contentLength: generatedPost.content?.length || 0,
      durationMs: Date.now() - startTime,
    })

    return successResponse(generatedPost)
  } catch (error) {
    logger.error('AI generation error', {
      path: '/api/ai/generate-post',
      durationMs: Date.now() - startTime,
    }, error instanceof Error ? error : undefined)

    return errorResponse(
      error instanceof Error
        ? Errors.aiGenerationFailed(error.message)
        : Errors.aiGenerationFailed()
    )
  }
}

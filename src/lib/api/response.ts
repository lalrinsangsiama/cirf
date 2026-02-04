import { NextResponse } from 'next/server'
import { ApiError, ErrorCode, ErrorStatusCodes } from './errors'
import { logger } from '../logger'

/**
 * Standard success response format
 */
export interface SuccessResponse<T = unknown> {
  success: true
  data?: T
  message?: string
}

/**
 * Standard error response format
 */
export interface ErrorResponse {
  success: false
  error: {
    code: ErrorCode
    message: string
    details?: Record<string, unknown>
  }
}

export type ApiResponse<T = unknown> = SuccessResponse<T> | ErrorResponse

/**
 * Create a success response
 */
export function successResponse<T>(
  data?: T,
  message?: string,
  status = 200
): NextResponse<SuccessResponse<T>> {
  const response: SuccessResponse<T> = {
    success: true,
    ...(data !== undefined && { data }),
    ...(message && { message }),
  }

  return NextResponse.json(response, { status })
}

/**
 * Create an error response
 */
export function errorResponse(
  error: ApiError | Error | unknown,
  context?: Record<string, unknown>
): NextResponse<ErrorResponse> {
  // Handle ApiError
  if (error instanceof ApiError) {
    if (error.statusCode >= 500) {
      logger.error('API Error', {
        code: error.code,
        message: error.message,
        details: error.details,
        ...context,
      })
    }

    return NextResponse.json(
      {
        success: false as const,
        error: {
          code: error.code,
          message: error.message,
          ...(error.details && { details: error.details }),
        },
      },
      { status: error.statusCode }
    )
  }

  // Handle standard Error
  if (error instanceof Error) {
    logger.error('Unhandled Error', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      ...context,
    })

    return NextResponse.json(
      {
        success: false as const,
        error: {
          code: ErrorCode.INTERNAL_ERROR,
          message: 'An unexpected error occurred',
        },
      },
      { status: 500 }
    )
  }

  // Handle unknown error type
  logger.error('Unknown Error', { error, ...context })

  return NextResponse.json(
    {
      success: false as const,
      error: {
        code: ErrorCode.INTERNAL_ERROR,
        message: 'An unexpected error occurred',
      },
    },
    { status: 500 }
  )
}

/**
 * Create a validation error response
 */
export function validationErrorResponse(
  message: string,
  errors?: unknown[]
): NextResponse<ErrorResponse> {
  return NextResponse.json(
    {
      success: false as const,
      error: {
        code: ErrorCode.VALIDATION_ERROR,
        message,
        ...(errors && { details: { errors } }),
      },
    },
    { status: ErrorStatusCodes[ErrorCode.VALIDATION_ERROR] }
  )
}

/**
 * Create a rate limit error response
 */
export function rateLimitErrorResponse(
  resetTime: number,
  message = 'Too many requests. Please try again later.'
): NextResponse<ErrorResponse> {
  const retryAfter = Math.ceil((resetTime - Date.now()) / 1000)

  return NextResponse.json(
    {
      success: false as const,
      error: {
        code: ErrorCode.RATE_LIMITED,
        message,
        details: { retryAfter },
      },
    },
    {
      status: 429,
      headers: {
        'Retry-After': retryAfter.toString(),
        'X-RateLimit-Reset': new Date(resetTime).toISOString(),
      },
    }
  )
}

/**
 * Higher-order function to wrap API handlers with error handling
 */
export function withErrorHandling<T>(
  handler: () => Promise<NextResponse<SuccessResponse<T>>>
): Promise<NextResponse<ApiResponse<T>>> {
  return handler().catch((error) => errorResponse(error))
}

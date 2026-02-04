/**
 * Standard error codes for API responses
 */
export enum ErrorCode {
  // Client errors (400-499)
  BAD_REQUEST = 'BAD_REQUEST',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  METHOD_NOT_ALLOWED = 'METHOD_NOT_ALLOWED',
  RATE_LIMITED = 'RATE_LIMITED',
  CONFLICT = 'CONFLICT',

  // Server errors (500-599)
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  DATABASE_ERROR = 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR = 'EXTERNAL_SERVICE_ERROR',

  // Domain-specific errors
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  PAYMENT_VERIFICATION_FAILED = 'PAYMENT_VERIFICATION_FAILED',
  INSUFFICIENT_CREDITS = 'INSUFFICIENT_CREDITS',
  INVALID_PACK = 'INVALID_PACK',
  EMAIL_SEND_FAILED = 'EMAIL_SEND_FAILED',
  AI_GENERATION_FAILED = 'AI_GENERATION_FAILED',
}

/**
 * HTTP status codes for error types
 */
export const ErrorStatusCodes: Record<ErrorCode, number> = {
  [ErrorCode.BAD_REQUEST]: 400,
  [ErrorCode.VALIDATION_ERROR]: 400,
  [ErrorCode.UNAUTHORIZED]: 401,
  [ErrorCode.FORBIDDEN]: 403,
  [ErrorCode.NOT_FOUND]: 404,
  [ErrorCode.METHOD_NOT_ALLOWED]: 405,
  [ErrorCode.RATE_LIMITED]: 429,
  [ErrorCode.CONFLICT]: 409,
  [ErrorCode.INTERNAL_ERROR]: 500,
  [ErrorCode.SERVICE_UNAVAILABLE]: 503,
  [ErrorCode.DATABASE_ERROR]: 500,
  [ErrorCode.EXTERNAL_SERVICE_ERROR]: 502,
  [ErrorCode.PAYMENT_FAILED]: 400,
  [ErrorCode.PAYMENT_VERIFICATION_FAILED]: 400,
  [ErrorCode.INSUFFICIENT_CREDITS]: 402,
  [ErrorCode.INVALID_PACK]: 400,
  [ErrorCode.EMAIL_SEND_FAILED]: 500,
  [ErrorCode.AI_GENERATION_FAILED]: 500,
}

/**
 * API Error class for structured error handling
 */
export class ApiError extends Error {
  public readonly code: ErrorCode
  public readonly statusCode: number
  public readonly details?: Record<string, unknown>

  constructor(
    code: ErrorCode,
    message: string,
    details?: Record<string, unknown>
  ) {
    super(message)
    this.name = 'ApiError'
    this.code = code
    this.statusCode = ErrorStatusCodes[code]
    this.details = details
  }

  toJSON() {
    return {
      error: {
        code: this.code,
        message: this.message,
        ...(this.details && { details: this.details }),
      },
    }
  }
}

/**
 * Create common API errors
 */
export const Errors = {
  badRequest: (message = 'Bad request') =>
    new ApiError(ErrorCode.BAD_REQUEST, message),

  validation: (message: string, errors?: unknown[]) =>
    new ApiError(ErrorCode.VALIDATION_ERROR, message, { errors }),

  unauthorized: (message = 'Authentication required') =>
    new ApiError(ErrorCode.UNAUTHORIZED, message),

  forbidden: (message = 'Access denied') =>
    new ApiError(ErrorCode.FORBIDDEN, message),

  notFound: (resource = 'Resource') =>
    new ApiError(ErrorCode.NOT_FOUND, `${resource} not found`),

  rateLimited: (retryAfter?: number) =>
    new ApiError(ErrorCode.RATE_LIMITED, 'Too many requests', { retryAfter }),

  conflict: (message = 'Resource already exists') =>
    new ApiError(ErrorCode.CONFLICT, message),

  internal: (message = 'An unexpected error occurred') =>
    new ApiError(ErrorCode.INTERNAL_ERROR, message),

  database: (message = 'Database error') =>
    new ApiError(ErrorCode.DATABASE_ERROR, message),

  paymentFailed: (message = 'Payment failed') =>
    new ApiError(ErrorCode.PAYMENT_FAILED, message),

  paymentVerificationFailed: () =>
    new ApiError(
      ErrorCode.PAYMENT_VERIFICATION_FAILED,
      'Payment verification failed'
    ),

  insufficientCredits: () =>
    new ApiError(ErrorCode.INSUFFICIENT_CREDITS, 'Insufficient credits'),

  invalidPack: () =>
    new ApiError(ErrorCode.INVALID_PACK, 'Invalid credit pack'),

  emailFailed: (message = 'Failed to send email') =>
    new ApiError(ErrorCode.EMAIL_SEND_FAILED, message),

  aiGenerationFailed: (message = 'AI generation failed') =>
    new ApiError(ErrorCode.AI_GENERATION_FAILED, message),

  serviceUnavailable: (service: string) =>
    new ApiError(
      ErrorCode.SERVICE_UNAVAILABLE,
      `${service} is temporarily unavailable`
    ),
}

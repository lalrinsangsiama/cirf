type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogContext {
  [key: string]: unknown
}

interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  context?: LogContext
  error?: {
    name: string
    message: string
    stack?: string
  }
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
}

/**
 * Get minimum log level from environment
 */
function getMinLogLevel(): number {
  const level = (process.env.LOG_LEVEL || 'info').toLowerCase() as LogLevel
  return LOG_LEVELS[level] ?? LOG_LEVELS.info
}

/**
 * Check if we're in production
 */
function isProduction(): boolean {
  return process.env.NODE_ENV === 'production'
}

/**
 * Format log entry for output
 */
function formatLog(entry: LogEntry): string {
  if (isProduction()) {
    // JSON format for production (easier to parse by log aggregators)
    return JSON.stringify(entry)
  }

  // Human-readable format for development
  const { timestamp, level, message, context, error } = entry
  let output = `[${timestamp}] ${level.toUpperCase()}: ${message}`

  if (context && Object.keys(context).length > 0) {
    output += `\n  Context: ${JSON.stringify(context, null, 2)}`
  }

  if (error) {
    output += `\n  Error: ${error.name}: ${error.message}`
    if (error.stack) {
      output += `\n  Stack: ${error.stack}`
    }
  }

  return output
}

/**
 * Create a log entry
 */
function createLogEntry(
  level: LogLevel,
  message: string,
  context?: LogContext,
  error?: Error
): LogEntry {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...(context && { context }),
  }

  if (error) {
    entry.error = {
      name: error.name,
      message: error.message,
      stack: error.stack,
    }
  }

  return entry
}

/**
 * Write log to console
 */
function writeLog(level: LogLevel, entry: LogEntry): void {
  const minLevel = getMinLogLevel()
  if (LOG_LEVELS[level] < minLevel) return

  const output = formatLog(entry)

  switch (level) {
    case 'debug':
      console.debug(output)
      break
    case 'info':
      console.info(output)
      break
    case 'warn':
      console.warn(output)
      break
    case 'error':
      console.error(output)
      break
  }

  // External error tracking integration
  // To enable Sentry: npm install @sentry/nextjs, configure sentry.client/server.config.ts,
  // then uncomment the following code and add NEXT_PUBLIC_SENTRY_DSN to environment
  if (isProduction() && level === 'error') {
    // import * as Sentry from '@sentry/nextjs'
    // Sentry.captureMessage(message, { level: 'error', extra: context })
  }
}

/**
 * Logger instance with structured logging
 */
export const logger = {
  /**
   * Debug level logging (development only by default)
   */
  debug(message: string, context?: LogContext): void {
    const entry = createLogEntry('debug', message, context)
    writeLog('debug', entry)
  },

  /**
   * Info level logging
   */
  info(message: string, context?: LogContext): void {
    const entry = createLogEntry('info', message, context)
    writeLog('info', entry)
  },

  /**
   * Warning level logging
   */
  warn(message: string, context?: LogContext): void {
    const entry = createLogEntry('warn', message, context)
    writeLog('warn', entry)
  },

  /**
   * Error level logging
   */
  error(message: string, context?: LogContext, error?: Error): void {
    const entry = createLogEntry('error', message, context, error)
    writeLog('error', entry)
  },

  /**
   * Log API request (for tracing)
   */
  apiRequest(
    method: string,
    path: string,
    context?: LogContext
  ): void {
    this.info(`API ${method} ${path}`, {
      type: 'api_request',
      method,
      path,
      ...context,
    })
  },

  /**
   * Log API response
   */
  apiResponse(
    method: string,
    path: string,
    statusCode: number,
    durationMs: number,
    context?: LogContext
  ): void {
    const level = statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'info'
    const entry = createLogEntry(level, `API ${method} ${path} -> ${statusCode}`, {
      type: 'api_response',
      method,
      path,
      statusCode,
      durationMs,
      ...context,
    })
    writeLog(level, entry)
  },

  /**
   * Log payment event
   */
  payment(
    event: string,
    context: LogContext
  ): void {
    this.info(`Payment: ${event}`, {
      type: 'payment',
      event,
      ...context,
    })
  },

  /**
   * Log authentication event
   */
  auth(
    event: string,
    context?: LogContext
  ): void {
    this.info(`Auth: ${event}`, {
      type: 'auth',
      event,
      ...context,
    })
  },

  /**
   * Log email event
   */
  email(
    event: string,
    context?: LogContext
  ): void {
    this.info(`Email: ${event}`, {
      type: 'email',
      event,
      ...context,
    })
  },

  /**
   * Create a child logger with preset context
   */
  child(defaultContext: LogContext) {
    return {
      debug: (message: string, context?: LogContext) =>
        logger.debug(message, { ...defaultContext, ...context }),
      info: (message: string, context?: LogContext) =>
        logger.info(message, { ...defaultContext, ...context }),
      warn: (message: string, context?: LogContext) =>
        logger.warn(message, { ...defaultContext, ...context }),
      error: (message: string, context?: LogContext, error?: Error) =>
        logger.error(message, { ...defaultContext, ...context }, error),
    }
  },
}

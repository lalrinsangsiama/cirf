import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { validateEnv, features } from '@/lib/env'

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy'
  timestamp: string
  version: string
  checks: {
    database: CheckResult
    environment: CheckResult
    features: Record<string, boolean>
  }
}

interface CheckResult {
  status: 'pass' | 'fail'
  message?: string
  latencyMs?: number
}

export async function GET(): Promise<NextResponse<HealthStatus>> {
  const startTime = Date.now()
  const checks: HealthStatus['checks'] = {
    database: { status: 'fail' },
    environment: { status: 'fail' },
    features: {
      ai: features.ai,
      analytics: features.analytics,
      payments: features.payments,
      email: features.email,
    },
  }

  // Check environment variables
  const envResult = validateEnv()
  checks.environment = {
    status: envResult.valid ? 'pass' : 'fail',
    message: envResult.valid
      ? 'All required environment variables are set'
      : `Missing: ${envResult.errors.length} required variables`,
  }

  // Check database connectivity
  try {
    const dbStart = Date.now()
    const supabase = await createServiceClient()

    // Simple query to check connectivity
    const { error } = await supabase
      .from('profiles')
      .select('id')
      .limit(1)

    checks.database = {
      status: error ? 'fail' : 'pass',
      message: error ? error.message : 'Connected',
      latencyMs: Date.now() - dbStart,
    }
  } catch (error) {
    checks.database = {
      status: 'fail',
      message: error instanceof Error ? error.message : 'Connection failed',
    }
  }

  // Determine overall status
  const allPassing = checks.database.status === 'pass' && checks.environment.status === 'pass'
  const anyFailing = checks.database.status === 'fail' || checks.environment.status === 'fail'

  let overallStatus: HealthStatus['status'] = 'healthy'
  if (anyFailing) {
    overallStatus = checks.database.status === 'fail' ? 'unhealthy' : 'degraded'
  }

  const response: HealthStatus = {
    status: overallStatus,
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '0.1.0',
    checks,
  }

  const statusCode = allPassing ? 200 : anyFailing ? 503 : 200

  return NextResponse.json(response, { status: statusCode })
}

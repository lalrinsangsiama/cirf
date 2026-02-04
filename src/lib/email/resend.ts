import { Resend } from 'resend'
import { AssessmentType, ASSESSMENT_CONFIGS } from '@/lib/data/assessmentConfig'
import { getWelcomeEmailHtml, getWelcomeEmailText } from './templates/welcome'
import { getPasswordResetEmailHtml, getPasswordResetEmailText } from './templates/password-reset'

const resend = new Resend(process.env.RESEND_API_KEY)

const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@cirf-framework.org'
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://cirf-framework.org'

interface SendEmailOptions {
  to: string | string[]
  subject: string
  html: string
  text?: string
}

/**
 * Send email with exponential backoff retry logic
 */
async function sendEmailWithRetry(
  options: SendEmailOptions,
  maxRetries = 3,
  baseDelayMs = 1000
): Promise<{ success: boolean; data?: unknown; error?: string }> {
  let lastError: string | null = null

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const { data, error } = await resend.emails.send({
        from: `CIL <${fromEmail}>`,
        to: Array.isArray(options.to) ? options.to : [options.to],
        subject: options.subject,
        html: options.html,
        text: options.text,
      })

      if (error) {
        lastError = error.message
        // Only retry on rate limits or server errors
        if (error.message?.includes('rate') || error.message?.includes('500')) {
          if (attempt < maxRetries - 1) {
            const delay = baseDelayMs * Math.pow(2, attempt)
            console.warn(`Email send failed, retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries}):`, error.message)
            await new Promise(resolve => setTimeout(resolve, delay))
            continue
          }
        }
        console.error('Email send error:', error)
        return { success: false, error: error.message }
      }

      return { success: true, data }
    } catch (error) {
      lastError = error instanceof Error ? error.message : 'Unknown error'
      // Retry on network errors
      if (attempt < maxRetries - 1) {
        const delay = baseDelayMs * Math.pow(2, attempt)
        console.warn(`Email send failed, retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries}):`, lastError)
        await new Promise(resolve => setTimeout(resolve, delay))
        continue
      }
      console.error('Email send error:', error)
    }
  }

  return { success: false, error: lastError || 'Failed to send email after retries' }
}

export async function sendEmail({ to, subject, html, text }: SendEmailOptions) {
  return sendEmailWithRetry({ to, subject, html, text })
}

export async function sendContactNotification({
  name,
  email,
  subject,
  message,
}: {
  name: string
  email: string
  subject?: string
  message: string
}) {
  const adminEmail = process.env.ADMIN_EMAIL || 'contact@cirf-framework.org'

  return sendEmail({
    to: adminEmail,
    subject: `New Contact Form Submission: ${subject || 'General Inquiry'}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a1a;">New Contact Form Submission</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
          <p><strong>Message:</strong></p>
          <div style="background: white; padding: 15px; border-radius: 4px; white-space: pre-wrap;">${message}</div>
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          This message was sent from the CIL website contact form.
        </p>
      </div>
    `,
    text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${subject ? `Subject: ${subject}` : ''}

Message:
${message}

---
This message was sent from the CIL website contact form.
    `,
  })
}

export async function sendNewsletterWelcome({
  email,
  name,
}: {
  email: string
  name?: string
}) {
  return sendEmail({
    to: email,
    subject: 'Welcome to the CIL Newsletter',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a1a;">Welcome to CIL${name ? `, ${name}` : ''}!</h2>
        <p style="color: #444; line-height: 1.6;">
          Thank you for subscribing to the Cultural Innovation Lab newsletter.
        </p>
        <p style="color: #444; line-height: 1.6;">
          You'll receive updates on:
        </p>
        <ul style="color: #444; line-height: 1.8;">
          <li>New research findings and publications</li>
          <li>Case study highlights from around the world</li>
          <li>Tool updates and new features</li>
          <li>Upcoming events and workshops</li>
        </ul>
        <p style="color: #444; line-height: 1.6;">
          In the meantime, explore our resources:
        </p>
        <p>
          <a href="https://cirf-framework.org/framework" style="color: #D4A574;">
            Learn about the CIL Framework →
          </a>
        </p>
        <p>
          <a href="https://cirf-framework.org/tools" style="color: #D4A574;">
            Try our Assessment Tool →
          </a>
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
        <p style="color: #999; font-size: 12px;">
          You're receiving this email because you subscribed to the CIL newsletter.
          <br />
          <a href="https://cirf-framework.org/unsubscribe?email=${encodeURIComponent(email)}" style="color: #999;">
            Unsubscribe
          </a>
        </p>
      </div>
    `,
    text: `
Welcome to CIL${name ? `, ${name}` : ''}!

Thank you for subscribing to the Cultural Innovation Lab newsletter.

You'll receive updates on:
- New research findings and publications
- Case study highlights from around the world
- Tool updates and new features
- Upcoming events and workshops

Explore our resources:
- Learn about the CIL Framework: https://cirf-framework.org/framework
- Try our Assessment Tool: https://cirf-framework.org/tools

---
You're receiving this email because you subscribed to the CIL newsletter.
To unsubscribe, visit: https://cirf-framework.org/unsubscribe?email=${encodeURIComponent(email)}
    `,
  })
}

export async function sendContactConfirmation({
  email,
  name,
}: {
  email: string
  name: string
}) {
  return sendEmail({
    to: email,
    subject: 'We received your message - CIL',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a1a;">Thank you for contacting us, ${name}!</h2>
        <p style="color: #444; line-height: 1.6;">
          We've received your message and will get back to you within 2-3 business days.
        </p>
        <p style="color: #444; line-height: 1.6;">
          In the meantime, you might find these resources helpful:
        </p>
        <ul style="color: #444; line-height: 1.8;">
          <li><a href="https://cirf-framework.org/faq" style="color: #D4A574;">Frequently Asked Questions</a></li>
          <li><a href="https://cirf-framework.org/getting-started" style="color: #D4A574;">Getting Started Guide</a></li>
          <li><a href="https://cirf-framework.org/resources" style="color: #D4A574;">Resources & Downloads</a></li>
        </ul>
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
        <p style="color: #999; font-size: 12px;">
          This is an automated response from the CIL website.
        </p>
      </div>
    `,
    text: `
Thank you for contacting us, ${name}!

We've received your message and will get back to you within 2-3 business days.

In the meantime, you might find these resources helpful:
- FAQ: https://cirf-framework.org/faq
- Getting Started: https://cirf-framework.org/getting-started
- Resources: https://cirf-framework.org/resources

---
This is an automated response from the CIL website.
    `,
  })
}

export async function sendPurchaseConfirmation({
  email,
  name,
  credits,
  amount,
  currency,
  orderId,
  paymentId,
}: {
  email: string
  name?: string
  credits: number
  amount: number
  currency: string
  orderId: string
  paymentId: string
}) {
  const formattedAmount = currency === 'INR'
    ? `₹${(amount / 100).toFixed(2)}`
    : `$${(amount / 100).toFixed(2)}`

  const greeting = name ? `Hi ${name},` : 'Hello,'

  return sendEmail({
    to: email,
    subject: `Payment Confirmed - ${credits} CIL Credits`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a1a;">Payment Confirmed</h2>
        <p style="color: #444; line-height: 1.6;">
          ${greeting}
        </p>
        <p style="color: #444; line-height: 1.6;">
          Thank you for your purchase! Your payment has been successfully processed.
        </p>

        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1a1a1a; margin-top: 0;">Order Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666;">Credits Added:</td>
              <td style="padding: 8px 0; text-align: right; font-weight: bold;">${credits} credits</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Amount Paid:</td>
              <td style="padding: 8px 0; text-align: right; font-weight: bold;">${formattedAmount}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Order ID:</td>
              <td style="padding: 8px 0; text-align: right; font-family: monospace; font-size: 12px;">${orderId}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Payment ID:</td>
              <td style="padding: 8px 0; text-align: right; font-family: monospace; font-size: 12px;">${paymentId}</td>
            </tr>
          </table>
        </div>

        <p style="color: #444; line-height: 1.6;">
          Your credits are now available in your account. You can use them to:
        </p>
        <ul style="color: #444; line-height: 1.8;">
          <li>Complete CIL assessments</li>
          <li>Access detailed analysis reports</li>
          <li>Compare with similar case studies</li>
        </ul>

        <p style="text-align: center; margin: 30px 0;">
          <a href="https://cirf-framework.org/dashboard"
             style="display: inline-block; background: #1a1a1a; color: #fff; padding: 12px 24px; border-radius: 24px; text-decoration: none;">
            Go to Dashboard
          </a>
        </p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />

        <p style="color: #999; font-size: 12px;">
          If you have any questions about your purchase, please
          <a href="https://cirf-framework.org/about#contact" style="color: #999;">contact us</a>.
          <br /><br />
          This is a receipt for your records. Please save this email for your reference.
        </p>
      </div>
    `,
    text: `
Payment Confirmed

${greeting}

Thank you for your purchase! Your payment has been successfully processed.

Order Details
-------------
Credits Added: ${credits} credits
Amount Paid: ${formattedAmount}
Order ID: ${orderId}
Payment ID: ${paymentId}

Your credits are now available in your account. You can use them to:
- Complete CIL assessments
- Access detailed analysis reports
- Compare with similar case studies

Go to Dashboard: https://cirf-framework.org/dashboard

---
If you have any questions about your purchase, please contact us at https://cirf-framework.org/about#contact.
This is a receipt for your records.
    `,
  })
}

// Assessment Results Email
export interface AssessmentResultsEmailOptions {
  email: string
  name?: string
  assessmentType: AssessmentType
  score: number
  interpretation: {
    level: string
    description: string
    color: string
  }
  sectionScores: Record<string, { score: number; label: string }>
  recommendations: string[]
  unlockedAssessments?: AssessmentType[]
  assessmentId: string
}

export async function sendAssessmentResults({
  email,
  name,
  assessmentType,
  score,
  interpretation,
  sectionScores,
  recommendations,
  unlockedAssessments,
  assessmentId,
}: AssessmentResultsEmailOptions) {
  const assessmentConfig = ASSESSMENT_CONFIGS[assessmentType]
  const greeting = name ? `Hi ${name},` : 'Hello,'

  // Generate score bar color
  const getScoreColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'thriving':
        return '#6B8E6B' // sage
      case 'established':
        return '#5B8FA8' // ocean
      case 'developing':
        return '#D4A574' // gold
      default:
        return '#C17C5E' // terracotta
    }
  }

  const scoreColor = getScoreColor(interpretation.level)

  // Generate section scores HTML
  const sectionScoresHtml = Object.entries(sectionScores)
    .map(
      ([sectionId, data]) => `
      <tr>
        <td style="padding: 8px 0; color: #666;">${data.label}</td>
        <td style="padding: 8px 0; text-align: right;">
          <div style="display: inline-block; width: 100px; height: 8px; background: #eee; border-radius: 4px; overflow: hidden;">
            <div style="width: ${data.score}%; height: 100%; background: ${scoreColor}; border-radius: 4px;"></div>
          </div>
          <span style="font-weight: bold; margin-left: 10px;">${Math.round(data.score)}%</span>
        </td>
      </tr>
    `
    )
    .join('')

  // Generate recommendations HTML
  const topRecommendations = recommendations.slice(0, 3)
  const recommendationsHtml = topRecommendations
    .map(
      (rec, i) => `
      <li style="margin-bottom: 10px; color: #444;">${rec}</li>
    `
    )
    .join('')

  // Generate unlocked assessments HTML
  let unlockedHtml = ''
  if (unlockedAssessments && unlockedAssessments.length > 0) {
    const unlockedItems = unlockedAssessments
      .map(type => {
        const config = ASSESSMENT_CONFIGS[type]
        return `<li style="margin-bottom: 8px;"><strong>${config.name}</strong> - ${config.fullName}</li>`
      })
      .join('')

    unlockedHtml = `
      <div style="background: #E8F5E9; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4CAF50;">
        <h3 style="color: #2E7D32; margin-top: 0;">New Assessments Unlocked!</h3>
        <p style="color: #444;">Congratulations! You've unlocked ${unlockedAssessments.length} new assessment${unlockedAssessments.length > 1 ? 's' : ''}:</p>
        <ul style="color: #444; line-height: 1.8;">
          ${unlockedItems}
        </ul>
        <p style="color: #666; font-size: 14px;">
          These assessments are now free for you to take and will unlock additional tools.
        </p>
      </div>
    `
  }

  return sendEmail({
    to: email,
    subject: `Your ${assessmentConfig.name} Assessment Results - ${Math.round(score)}% (${interpretation.level})`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1a1a1a 0%, #333 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: #fff; margin: 0; font-size: 24px;">Cultural Innovation Lab</h1>
          <p style="color: #D4A574; margin: 10px 0 0 0;">${assessmentConfig.fullName}</p>
        </div>

        <div style="padding: 30px; background: #fff;">
          <p style="color: #444; line-height: 1.6;">
            ${greeting}
          </p>
          <p style="color: #444; line-height: 1.6;">
            Thank you for completing the ${assessmentConfig.name} assessment. Here are your results:
          </p>

          <!-- Overall Score -->
          <div style="background: #f9f9f9; padding: 25px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <div style="font-size: 48px; font-weight: bold; color: ${scoreColor};">${Math.round(score)}</div>
            <div style="font-size: 14px; color: #666; margin-top: 5px;">out of 100</div>
            <div style="display: inline-block; background: ${scoreColor}; color: #fff; padding: 6px 16px; border-radius: 20px; margin-top: 15px; font-weight: bold;">
              ${interpretation.level}
            </div>
            <p style="color: #666; margin-top: 15px; font-size: 14px;">
              ${interpretation.description}
            </p>
          </div>

          <!-- Section Breakdown -->
          <h3 style="color: #1a1a1a; margin-top: 30px;">Section Breakdown</h3>
          <table style="width: 100%; border-collapse: collapse;">
            ${sectionScoresHtml}
          </table>

          <!-- Recommendations -->
          <h3 style="color: #1a1a1a; margin-top: 30px;">Priority Recommendations</h3>
          <ol style="color: #444; line-height: 1.8; padding-left: 20px;">
            ${recommendationsHtml}
          </ol>

          <!-- Unlocked Assessments -->
          ${unlockedHtml}

          <!-- CTA -->
          <div style="text-align: center; margin: 30px 0;">
            <a href="${baseUrl}/dashboard"
               style="display: inline-block; background: #1a1a1a; color: #fff; padding: 14px 28px; border-radius: 24px; text-decoration: none; font-weight: bold;">
              View Full Results in Dashboard
            </a>
          </div>

          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />

          <p style="color: #999; font-size: 12px; text-align: center;">
            Assessment ID: ${assessmentId}<br /><br />
            You're receiving this email because you completed an assessment on the CIL website.
            <br />
            <a href="${baseUrl}/dashboard" style="color: #999;">
              Manage your account
            </a>
          </p>
        </div>
      </div>
    `,
    text: `
Your ${assessmentConfig.name} Assessment Results
======================================

${greeting}

Thank you for completing the ${assessmentConfig.name} assessment. Here are your results:

OVERALL SCORE: ${Math.round(score)}/100 - ${interpretation.level}
${interpretation.description}

SECTION BREAKDOWN:
${Object.entries(sectionScores)
  .map(([_, data]) => `- ${data.label}: ${Math.round(data.score)}%`)
  .join('\n')}

PRIORITY RECOMMENDATIONS:
${topRecommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

${
  unlockedAssessments && unlockedAssessments.length > 0
    ? `
NEW ASSESSMENTS UNLOCKED!
Congratulations! You've unlocked ${unlockedAssessments.length} new assessment(s):
${unlockedAssessments.map(type => `- ${ASSESSMENT_CONFIGS[type].name} (${ASSESSMENT_CONFIGS[type].fullName})`).join('\n')}

These assessments are now free for you to take.
`
    : ''
}

View your full results: ${baseUrl}/dashboard

---
Assessment ID: ${assessmentId}
You're receiving this email because you completed an assessment on the CIL website.
    `,
  })
}

/**
 * Send welcome email to new users
 */
export async function sendWelcomeEmail({
  email,
  name,
}: {
  email: string
  name?: string
}) {
  const loginUrl = `${baseUrl}/dashboard`

  return sendEmail({
    to: email,
    subject: 'Welcome to the Cultural Innovation Lab',
    html: getWelcomeEmailHtml({ email, name, loginUrl }),
    text: getWelcomeEmailText({ email, name, loginUrl }),
  })
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail({
  email,
  name,
  resetUrl,
}: {
  email: string
  name?: string
  resetUrl: string
}) {
  return sendEmail({
    to: email,
    subject: 'Reset Your Password - CIL',
    html: getPasswordResetEmailHtml({ email, name, resetUrl }),
    text: getPasswordResetEmailText({ email, name, resetUrl }),
  })
}

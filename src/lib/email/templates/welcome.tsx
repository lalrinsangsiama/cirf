/**
 * Welcome Email Template
 * Sent to users upon successful account creation
 */

export interface WelcomeEmailProps {
  name?: string
  email: string
  loginUrl: string
}

export function getWelcomeEmailHtml({ name, email, loginUrl }: WelcomeEmailProps): string {
  const greeting = name ? `Welcome to CIL, ${name}!` : 'Welcome to the Cultural Innovation Lab!'

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to CIL</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #fdfdfb;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a1a 0%, #333 100%); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; color: #fff; font-size: 28px; font-weight: 300; letter-spacing: 0.5px;">
                Cultural Innovation Lab
              </h1>
              <p style="margin: 10px 0 0 0; color: #D4A574; font-size: 14px;">
                Research-Based Cultural Innovation Assessment
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="background: #fff; padding: 40px 30px; border-left: 1px solid #e5e5e5; border-right: 1px solid #e5e5e5;">
              <h2 style="margin: 0 0 20px 0; color: #1a1a1a; font-size: 24px; font-weight: 400;">
                ${greeting}
              </h2>

              <p style="margin: 0 0 20px 0; color: #555; font-size: 16px; line-height: 1.6;">
                Thank you for joining the Cultural Innovation Lab community. Your account has been created and you're ready to start exploring our research-validated assessment tools.
              </p>

              <div style="background: #f8f6f3; padding: 25px; border-radius: 8px; margin: 25px 0;">
                <h3 style="margin: 0 0 15px 0; color: #1a1a1a; font-size: 16px; font-weight: 600;">
                  Your Free Credit
                </h3>
                <p style="margin: 0; color: #555; font-size: 14px; line-height: 1.6;">
                  We've added <strong>1 free assessment credit</strong> to your account. Use it to take the CIRF (Cultural Innovation Resilience Framework) assessment and discover your initiative's resilience score.
                </p>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${loginUrl}" style="display: inline-block; background: #1a1a1a; color: #fff; padding: 14px 32px; border-radius: 25px; text-decoration: none; font-weight: 500; font-size: 14px;">
                  Go to Your Dashboard
                </a>
              </div>

              <h3 style="margin: 30px 0 15px 0; color: #1a1a1a; font-size: 16px; font-weight: 600;">
                What You Can Do
              </h3>

              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; vertical-align: top; width: 30px;">
                    <span style="color: #D4A574;">1.</span>
                  </td>
                  <td style="padding: 10px 0; color: #555; font-size: 14px; line-height: 1.5;">
                    <strong>Complete Your Profile</strong><br>
                    Add your organization details and cultural context for personalized insights.
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; vertical-align: top; width: 30px;">
                    <span style="color: #D4A574;">2.</span>
                  </td>
                  <td style="padding: 10px 0; color: #555; font-size: 14px; line-height: 1.5;">
                    <strong>Take the CIRF Assessment</strong><br>
                    Evaluate your cultural innovation initiative across 13 research-validated dimensions.
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; vertical-align: top; width: 30px;">
                    <span style="color: #D4A574;">3.</span>
                  </td>
                  <td style="padding: 10px 0; color: #555; font-size: 14px; line-height: 1.5;">
                    <strong>Unlock More Assessments</strong><br>
                    Completing CIRF unlocks 5 specialized assessments for free.
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; vertical-align: top; width: 30px;">
                    <span style="color: #D4A574;">4.</span>
                  </td>
                  <td style="padding: 10px 0; color: #555; font-size: 14px; line-height: 1.5;">
                    <strong>Explore Case Studies</strong><br>
                    Learn from 362 verified cultural innovation initiatives worldwide.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: #f8f6f3; padding: 30px; text-align: center; border-radius: 0 0 12px 12px; border-left: 1px solid #e5e5e5; border-right: 1px solid #e5e5e5; border-bottom: 1px solid #e5e5e5;">
              <p style="margin: 0 0 10px 0; color: #888; font-size: 12px;">
                You're receiving this email because you created an account at cirf-framework.org.
              </p>
              <p style="margin: 0; color: #888; font-size: 12px;">
                Cultural Innovation Lab | <a href="https://cirf-framework.org" style="color: #D4A574;">cirf-framework.org</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

export function getWelcomeEmailText({ name, loginUrl }: WelcomeEmailProps): string {
  const greeting = name ? `Welcome to CIL, ${name}!` : 'Welcome to the Cultural Innovation Lab!'

  return `
${greeting}

Thank you for joining the Cultural Innovation Lab community. Your account has been created and you're ready to start exploring our research-validated assessment tools.

YOUR FREE CREDIT
----------------
We've added 1 free assessment credit to your account. Use it to take the CIRF (Cultural Innovation Resilience Framework) assessment and discover your initiative's resilience score.

Go to your dashboard: ${loginUrl}

WHAT YOU CAN DO
---------------
1. Complete Your Profile - Add your organization details and cultural context for personalized insights.

2. Take the CIRF Assessment - Evaluate your cultural innovation initiative across 13 research-validated dimensions.

3. Unlock More Assessments - Completing CIRF unlocks 5 specialized assessments for free.

4. Explore Case Studies - Learn from 362 verified cultural innovation initiatives worldwide.

---
You're receiving this email because you created an account at cirf-framework.org.
Cultural Innovation Lab | https://cirf-framework.org
  `.trim()
}

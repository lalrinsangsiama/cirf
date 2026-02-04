/**
 * Password Reset Email Template
 * Sent when a user requests to reset their password
 */

export interface PasswordResetEmailProps {
  name?: string
  email: string
  resetUrl: string
  expiresIn?: string
}

export function getPasswordResetEmailHtml({
  name,
  email,
  resetUrl,
  expiresIn = '1 hour',
}: PasswordResetEmailProps): string {
  const greeting = name ? `Hi ${name},` : 'Hello,'

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password - CIL</title>
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
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="background: #fff; padding: 40px 30px; border-left: 1px solid #e5e5e5; border-right: 1px solid #e5e5e5;">
              <h2 style="margin: 0 0 20px 0; color: #1a1a1a; font-size: 24px; font-weight: 400;">
                Reset Your Password
              </h2>

              <p style="margin: 0 0 20px 0; color: #555; font-size: 16px; line-height: 1.6;">
                ${greeting}
              </p>

              <p style="margin: 0 0 20px 0; color: #555; font-size: 16px; line-height: 1.6;">
                We received a request to reset the password for the account associated with <strong>${email}</strong>. Click the button below to create a new password.
              </p>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" style="display: inline-block; background: #1a1a1a; color: #fff; padding: 14px 32px; border-radius: 25px; text-decoration: none; font-weight: 500; font-size: 14px;">
                  Reset Password
                </a>
              </div>

              <div style="background: #FEF3E6; padding: 20px; border-radius: 8px; border-left: 4px solid #D4A574; margin: 25px 0;">
                <p style="margin: 0; color: #555; font-size: 14px; line-height: 1.6;">
                  <strong>Important:</strong> This link will expire in ${expiresIn}. If you didn't request a password reset, you can safely ignore this email.
                </p>
              </div>

              <p style="margin: 20px 0 0 0; color: #555; font-size: 14px; line-height: 1.6;">
                If the button above doesn't work, copy and paste this link into your browser:
              </p>
              <p style="margin: 10px 0 0 0; color: #D4A574; font-size: 12px; word-break: break-all;">
                ${resetUrl}
              </p>
            </td>
          </tr>

          <!-- Security Notice -->
          <tr>
            <td style="background: #f8f6f3; padding: 25px 30px; border-left: 1px solid #e5e5e5; border-right: 1px solid #e5e5e5;">
              <h3 style="margin: 0 0 10px 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">
                Security Tips
              </h3>
              <ul style="margin: 0; padding: 0 0 0 20px; color: #666; font-size: 13px; line-height: 1.6;">
                <li>Never share your password with anyone</li>
                <li>Use a unique password you don't use elsewhere</li>
                <li>Consider using a password manager</li>
                <li>Enable two-factor authentication when available</li>
              </ul>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: #f8f6f3; padding: 20px 30px; text-align: center; border-radius: 0 0 12px 12px; border-left: 1px solid #e5e5e5; border-right: 1px solid #e5e5e5; border-bottom: 1px solid #e5e5e5;">
              <p style="margin: 0 0 10px 0; color: #888; font-size: 12px;">
                If you didn't request this password reset, please contact us at
                <a href="mailto:support@cirf-framework.org" style="color: #D4A574;">support@cirf-framework.org</a>
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

export function getPasswordResetEmailText({
  name,
  email,
  resetUrl,
  expiresIn = '1 hour',
}: PasswordResetEmailProps): string {
  const greeting = name ? `Hi ${name},` : 'Hello,'

  return `
Reset Your Password
===================

${greeting}

We received a request to reset the password for the account associated with ${email}.

Click the link below to create a new password:
${resetUrl}

IMPORTANT: This link will expire in ${expiresIn}. If you didn't request a password reset, you can safely ignore this email.

SECURITY TIPS
-------------
- Never share your password with anyone
- Use a unique password you don't use elsewhere
- Consider using a password manager
- Enable two-factor authentication when available

---
If you didn't request this password reset, please contact us at support@cirf-framework.org

Cultural Innovation Lab | https://cirf-framework.org
  `.trim()
}

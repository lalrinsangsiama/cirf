# Cultural Innovation Lab (CIL) Platform

## Project
Next.js 16 app hosted on Netlify. Supabase for auth/DB. PostHog for analytics. Resend for transactional email.

## Domain & Contact
- **Production URL**: https://culturalinnovationlab.org
- **Email**: hello@culturalinnovationlab.org
- **Domain registrar**: Hostinger
- **Hosting**: Netlify

## Key Environment Variables (production)
- `NEXT_PUBLIC_SITE_URL=https://culturalinnovationlab.org`
- `NEXT_PUBLIC_APP_URL=https://culturalinnovationlab.org`
- `RESEND_FROM_EMAIL=noreply@culturalinnovationlab.org`
- `ADMIN_EMAIL=hello@culturalinnovationlab.org`

## Architecture
- `src/app/` — Next.js App Router pages
- `src/components/` — React components (assessment, auth, payment, seo, ui)
- `src/lib/` — Business logic (analytics, assessment scoring, email, validation, Supabase clients)
- `src/lib/config/contact.ts` — Centralized contact info (single source of truth for emails/URLs)
- `supabase/` — Migrations and seed data

## Conventions
- Tailwind CSS with custom design tokens (ink, pearl, gold, sage, ocean, terracotta, sand)
- All email sending goes through `src/lib/email/resend.ts`
- Contact info centralized in `src/lib/config/contact.ts`
- Analytics via PostHog (`src/lib/analytics/posthog.ts`) — track events with `trackEvent()`
- Fallback URLs in code should use `https://culturalinnovationlab.org` (never localhost)

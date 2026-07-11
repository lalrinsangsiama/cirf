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

## CI (`.github/workflows/ci.yml`)
- On every PR and push to `main`: lint, type-check, unit tests, build, e2e (Playwright,
  chromium only), and a non-blocking `npm audit --omit=dev` security scan.
- Deployment is **not** handled by GitHub Actions — Netlify's own GitHub integration
  builds and deploys (preview per PR, production on push to `main`) outside Actions
  billing. Don't re-add deploy jobs to this workflow; if that ever changes, use real
  `netlify deploy` steps with `NETLIFY_AUTH_TOKEN`/`NETLIFY_SITE_ID`, not placeholders.
- `paths-ignore: ['**/*.md', 'docs/**']` skips CI on docs-only changes; a `concurrency`
  group cancels superseded runs on the same branch/PR automatically — don't add more
  triggers or matrices without checking those still make sense.
- `security-audit` is intentionally non-blocking (`continue-on-error: true`) — 3 known
  dependency chains (`axios`/`form-data` via `razorpay`, `lodash` via `recharts`,
  `js-cookie`/`minimatch` via `resend`'s email-rendering toolchain) need breaking
  major-version upgrades to clear. Revisit making it blocking once those are done — see
  `GITHUB_check.md` item 6 for full history.
- Full audit trail and rationale for the current CI setup: `GITHUB_check.md`.

# CIL Platform Pre-Launch Checklist

**Platform:** Cultural Innovation Lab (culturalinnovationlab.org)
**Stack:** Next.js 16 + Supabase + Resend + PostHog
**Hosting:** Netlify

---

## 1. Infrastructure & Environment Setup

### Environment Variables (Netlify Dashboard)

| Variable | Required | Format | Description |
|----------|----------|--------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | `https://xxx.supabase.co` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | `eyJ...` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | `eyJ...` | Supabase service role key |
| `RESEND_API_KEY` | Yes | `re_...` | Resend email API key |
| `RESEND_FROM_EMAIL` | Yes | Email | `noreply@culturalinnovationlab.org` |
| `ADMIN_EMAIL` | Yes | Email | `hello@culturalinnovationlab.org` |
| `CSRF_SECRET` | Yes (prod) | Any string | CSRF token signing secret |
| `NEXT_PUBLIC_SITE_URL` | Yes | URL | `https://culturalinnovationlab.org` |
| `NEXT_PUBLIC_APP_URL` | Yes | URL | `https://culturalinnovationlab.org` |
| `NEXT_PUBLIC_POSTHOG_KEY` | Optional | `phc_...` | PostHog project key |
| `NEXT_PUBLIC_POSTHOG_HOST` | Optional | URL | `https://app.posthog.com` |
| `ANTHROPIC_API_KEY` | Optional | `sk-ant-...` | AI blog generation |
| `LOG_LEVEL` | Optional | `info`/`debug` | Logging level |

### DNS & Hosting

- [ ] Domain `culturalinnovationlab.org` configured in Netlify
- [ ] DNS records (A/CNAME) pointing to Netlify
- [ ] SSL/HTTPS active and auto-renewing
- [ ] `www` subdomain redirects to apex (or vice versa)
- [ ] All env vars set in Netlify dashboard (not just `.env.local`)
- [ ] `CSRF_SECRET` is a strong random value (not using dev fallback)
- [ ] Build succeeds on Netlify (check deploy logs)

### Quick Validation

```
Claude Code prompt:
Read src/lib/env.ts and then check that every required env var listed
in ENV_VARS is set in the Netlify dashboard. List any that are missing
or have invalid formats.
```

---

## 2. Supabase Verification

### Migrations (10 total)

- [ ] `001_initial_schema.sql` — Users, profiles, assessments tables
- [ ] `002_payment_orders.sql` — Payment/credit system
- [ ] `003_tiered_assessments.sql` — Assessment tiers and unlock flow
- [ ] `004_security_fixes.sql` — RLS policies
- [ ] `005_draft_assessments.sql` — Draft saving
- [ ] `006_blog_categories.sql` — Blog and categories
- [ ] `007_admin_draft_access.sql` — Admin access to drafts
- [ ] `008_one_response_per_assessment.sql` — Prevents duplicate submissions
- [ ] `009_increment_credits_and_storage.sql` — Credit system + storage buckets
- [ ] `010_fix_constraints_and_policies.sql` — Fix CHECK constraints, missing columns, policies

### Database Objects

- [ ] RLS (Row Level Security) enabled on all tables
- [ ] `use_credit_atomic()` function exists and works
- [ ] Trigger: new auth user creates profile row with 1 credit
- [ ] `tool_access` table exists for tracking unlocked resources/tools

### Storage

- [ ] `resources` bucket created in Supabase Storage
- [ ] `avatars` bucket created in Supabase Storage
- [ ] 7 PDF resources uploaded to `resources` bucket:
  - [ ] `CIL-Global-Funding-Guide-2026.pdf`
  - [ ] `CIL-Creative-Reconstruction-Framework.pdf`
  - [ ] `CIL-Cultural-Innovation-Playbook.pdf`
  - [ ] `CIL-Innovation-Readiness-Action-Plan.pdf`
  - [ ] `CIL-Impact-Report-Template.pdf`
  - [ ] `CIL-Sustainability-Succession-Guide.pdf`
  - [ ] `CIL-Pricing-Strategy-Workbook.pdf`
- [ ] Storage RLS policies allow authenticated users to download their unlocked resources

### Auth Configuration

- [ ] Email templates configured in Supabase Auth > Email Templates
- [ ] Site URL set to `https://culturalinnovationlab.org` in Supabase Auth settings
- [ ] Redirect URLs include `https://culturalinnovationlab.org/**`
- [ ] Email confirmation enabled
- [ ] Admin user has `role: 'admin'` in `app_metadata`

### Claude Code Prompt

```
Connect to the Supabase project and verify:
1. All 9 migrations have been applied (check supabase/migrations/ folder names
   against the migration history)
2. RLS is enabled on all tables
3. The use_credit_atomic() function exists
4. Storage buckets 'resources' and 'avatars' exist
5. List any missing PDF files from the resources bucket
```

---

## 3. Authentication Flows

### Manual Testing Checklist

- [ ] **Signup**: Create account with email + password
- [ ] **Email confirmation**: Click confirmation link in email, lands on site
- [ ] **Login**: Sign in with confirmed account
- [ ] **Logout**: Sign out clears session, redirects to home
- [ ] **Forgot password**: Submit email, receive reset link
- [ ] **Password reset**: Click link, enter new password, can log in with new password
- [ ] **Protected routes**: Visiting `/dashboard` unauthenticated redirects to `/auth/login`
- [ ] **Admin routes**: Non-admin visiting `/admin/*` redirects to `/dashboard`
- [ ] **Rate limiting**: 6th login attempt within 15 min returns 429
- [ ] **Redirect validation**: Login with `?redirect=/dashboard` works; `?redirect=https://evil.com` is blocked

### API Routes

| Route | Method | Auth Required | Rate Limit |
|-------|--------|---------------|------------|
| `/api/auth/signup` | POST | No | 5/15min |
| `/api/auth/login` | POST | No | 5/15min |
| `/api/auth/forgot-password` | POST | No | 5/15min |

### Claude Code Prompt

```
Check all auth API routes in src/app/api/auth/ for:
1. Rate limiting is applied (checkRateLimit with authRateLimit)
2. Input validation via Zod
3. CSRF protection is active (middleware handles this)
4. Redirect URL validation uses validateRedirect()
5. No secrets or tokens leaked in responses
```

---

## 4. Assessment System

### Assessment Matrix

| Assessment | Cost | Questions | Credit Reward | Unlocked By | Resources Granted | Tools Granted |
|-----------|------|-----------|---------------|-------------|-------------------|---------------|
| CIL | Free | 61 | 1 credit | Always available | Funding Guide, Creative Reconstruction | (none) |
| CIMM | 1 credit | 19 | 1 credit | CIL completion | Cultural Innovation Playbook | Innovation Intensity Ratio, Cultural Leverage Index |
| CIRA | 1 credit | 20 | 1 credit | CIL completion | Innovation Readiness Action Plan | Readiness Calculator, Inclusivity Score |
| TBL-CI | 1 credit | 18 | 1 credit | CIL completion | Impact Report Template | TBL Calculator, Economic Multiplier |
| CISS | 1 credit | 17 | 1 credit | CIL completion | Sustainability & Succession Guide | Sustainability Scorecard, Resilience Quotient |
| Pricing | 1 credit | 16 | 1 credit | CIL completion | Pricing Strategy Workbook | Pricing Calculator, Innovation Efficiency Rate |

### Functional Tests (for each assessment)

- [ ] Intro screen shows with consent checkbox
- [ ] Cannot start without checking consent
- [ ] Questions display correctly in sections
- [ ] Progress indicator updates
- [ ] Draft auto-saves (check `assessment_drafts` table)
- [ ] Can resume a saved draft
- [ ] One response per assessment enforced (second attempt blocked)
- [ ] Score calculated server-side on submission
- [ ] Results page shows: overall score, section scores, charts, recommendations
- [ ] Correct score interpretation (Emerging/Developing/Established/Thriving)
- [ ] Credits deducted atomically (secondary assessments)
- [ ] Credits granted on completion
- [ ] Resource access granted in `tool_access` table
- [ ] Tool access granted in `tool_access` table
- [ ] Unlock celebration modal appears
- [ ] Thank-you banner shown
- [ ] Share button works (Web Share API on mobile, clipboard on desktop)
- [ ] Results email sent via Resend

### Progressive Unlock Flow (end-to-end)

1. [ ] New user signs up (profile created with 1 credit)
2. [ ] Completes CIL (free) -> earns 1 credit (now has 2)
3. [ ] Secondary assessments become visible/unlocked
4. [ ] Starts CIMM -> 1 credit deducted (now has 1)
5. [ ] Completes CIMM -> 1 credit earned (now has 2 again)
6. [ ] Repeat for all 5 secondary assessments

### Claude Code Prompt

```
Audit the assessment submission flow:
1. Read src/app/api/assessments/submit/route.ts
2. Verify credits are deducted BEFORE processing (atomic)
3. Verify credits are granted AFTER successful submission
4. Verify tool_access records are created for all grantsToolAccess
   and grantsResourceAccess items from assessmentConfig.ts
5. Verify one-response-per-assessment is enforced
6. Check that results email is sent
7. Flag any race conditions or error paths that could leave credits
   in an inconsistent state
```

---

## 5. Resource & Download System

### Resources (7 unlockable PDFs)

| Resource | Unlocked By | Storage Path |
|----------|-------------|--------------|
| Global Funding Guide 2026 | CIL | `CIL-Global-Funding-Guide-2026.pdf` |
| Creative Reconstruction Framework | CIL | `CIL-Creative-Reconstruction-Framework.pdf` |
| Cultural Innovation Playbook | CIMM | `CIL-Cultural-Innovation-Playbook.pdf` |
| Innovation Readiness Action Plan | CIRA | `CIL-Innovation-Readiness-Action-Plan.pdf` |
| Impact Report Template | TBL | `CIL-Impact-Report-Template.pdf` |
| Sustainability & Succession Guide | CISS | `CIL-Sustainability-Succession-Guide.pdf` |
| Pricing Strategy Workbook | Pricing | `CIL-Pricing-Strategy-Workbook.pdf` |

### Tests

- [ ] Resources page shows all resources with lock/unlock status
- [ ] Locked resources display which assessment unlocks them
- [ ] Completed assessment correctly unlocks the right resources
- [ ] Download links generate signed URLs from Supabase Storage
- [ ] Downloaded files are the correct PDFs (not corrupted/empty)
- [ ] Unauthorized users cannot access download endpoints

### Interactive Tools (10 total)

| Tool | Unlocked By |
|------|-------------|
| Innovation Intensity Ratio | CIMM |
| Cultural Leverage Index | CIMM |
| Innovation Readiness Calculator | CIRA |
| Innovation Inclusivity Score | CIRA |
| Triple Bottom Line Calculator | TBL |
| Economic Multiplier Effect | TBL |
| Sustainability Scorecard | CISS |
| Cultural Resilience Quotient | CISS |
| Cultural Product Pricing Calculator | Pricing |
| Innovation Efficiency Rate | Pricing |

- [ ] Each tool is accessible only after completing its assessment
- [ ] Tool access checked via `tool_access` table
- [ ] Tools render and function correctly

---

## 6. Email System (Resend)

### Email Templates

| Email | Trigger | Template Location |
|-------|---------|-------------------|
| Welcome | User signup | `src/lib/email/templates/welcome.tsx` |
| Password Reset | Forgot password | `src/lib/email/templates/password-reset.tsx` |
| Assessment Results | Assessment completion | (API route) |
| Contact Admin Notification | Contact form | (API route) |
| Contact User Confirmation | Contact form | (API route) |
| Newsletter Welcome | Newsletter signup | (API route) |

### Tests

- [ ] From address `noreply@culturalinnovationlab.org` verified in Resend dashboard
- [ ] Domain `culturalinnovationlab.org` verified in Resend (DNS records)
- [ ] Welcome email sends on signup with correct content
- [ ] Password reset email contains valid reset link
- [ ] Assessment results email includes score, sections, recommendations
- [ ] Contact form sends notification to `hello@culturalinnovationlab.org`
- [ ] Contact form sends confirmation to user
- [ ] Newsletter signup sends welcome email
- [ ] All emails render correctly in Gmail, Outlook, Apple Mail
- [ ] Emails don't land in spam folder

### Claude Code Prompt

```
Audit the email system:
1. Read src/lib/email/resend.ts
2. Read all email templates in src/lib/email/templates/
3. Check every API route that sends email
4. Verify all emails use RESEND_FROM_EMAIL (not hardcoded addresses)
5. Verify error handling if Resend API fails
6. Check that all emails have both HTML and plain text content
```

---

## 7. Blog & CMS

### Tests

- [ ] `/blog` page lists published posts
- [ ] Individual post pages render markdown correctly
- [ ] Draft posts are NOT visible on public blog listing
- [ ] Admin can create new blog post at `/admin/blog/new`
- [ ] Admin can edit existing post at `/admin/blog/[id]`
- [ ] Admin can toggle publish/draft status
- [ ] Blog seed endpoint works: `/api/blog/seed`
- [ ] AI generation works (if `ANTHROPIC_API_KEY` set)
- [ ] Blog posts appear in sitemap.xml
- [ ] Blog post URLs are SEO-friendly

---

## 8. Admin Panel

### Access Control

- [ ] `/admin/*` routes require authenticated user with `role: 'admin'` in `app_metadata`
- [ ] Non-admin users redirected to `/dashboard`
- [ ] Unauthenticated users redirected to `/auth/login`

### Features

- [ ] Dashboard shows platform statistics
- [ ] Blog management: create, edit, publish, delete posts
- [ ] Assessment data viewable (submissions, scores)
- [ ] Admin-specific data queries use service role key (bypass RLS)

---

## 9. User Dashboard

### Features

- [ ] Shows all 6 assessments with completion status
- [ ] Shows assessment scores and results for completed assessments
- [ ] Shows unlocked tools with links
- [ ] Shows credit balance
- [ ] Shows credit transaction history
- [ ] Profile editing works (name, etc.)
- [ ] Data export downloads all user data as JSON
- [ ] Account deletion requires typing "DELETE"
- [ ] Account deletion removes: profile, assessment responses, drafts, tool_access, credits

### Claude Code Prompt

```
Audit the user dashboard and data management:
1. Read src/app/dashboard/page.tsx and src/app/dashboard/settings/page.tsx
2. Read src/app/api/user/data-export/route.ts
3. Read src/app/api/user/delete-account/route.ts
4. Verify data export includes ALL user data
5. Verify account deletion removes ALL user data (no orphaned records)
6. Verify profile update validates input
```

---

## 10. Contact & Newsletter

### Contact Form

- [ ] Form submits successfully from `/about#contact`
- [ ] Rate limited: 5 submissions per hour per IP
- [ ] Admin notification sent to `hello@culturalinnovationlab.org`
- [ ] User confirmation email sent
- [ ] Form validation: name, email, message required
- [ ] Success/error feedback shown in UI

### Newsletter

- [ ] Subscription form works (footer or dedicated section)
- [ ] Rate limited: 3 subscriptions per hour per IP
- [ ] Subscription stored in database
- [ ] Duplicate email handled gracefully (no error, friendly message)
- [ ] Welcome email sent on new subscription

---

## 11. Security Checklist

### CSRF Protection

- [ ] Middleware generates CSRF token cookie on all requests
- [ ] All POST/PUT/PATCH/DELETE API routes require matching `x-csrf-token` header
- [ ] Exempt routes: `/auth/callback`, `/api/health`
- [ ] Token expires after 24 hours
- [ ] Token uses HMAC-SHA256 with `CSRF_SECRET`
- [ ] `CSRF_SECRET` is set (not using `dev-only-csrf-secret` fallback)

### Rate Limiting

| Endpoint | Limit |
|----------|-------|
| Auth (login/signup/forgot) | 5 per 15 minutes |
| Contact form | 5 per hour |
| Newsletter | 3 per hour |
| AI generation | 3 per minute |
| General API | 60 per minute |

### Input Validation

- [ ] All API routes validate input with Zod schemas
- [ ] Validation errors return structured error responses
- [ ] No raw user input used in database queries (parameterized)

### Access Control

- [ ] RLS policies active on all Supabase tables
- [ ] Users can only read/write their own data
- [ ] Admin routes checked server-side (not just client-side)
- [ ] Service role key only used in server-side API routes

### Headers & Cookies

- [ ] CSRF cookie: `secure: true`, `sameSite: strict` in production
- [ ] No secrets exposed in client-side code
- [ ] Redirect URL validation prevents open redirects (see `validateRedirect.ts`)

### Compliance

- [ ] Cookie consent banner present
- [ ] Privacy policy page (`/privacy`) is accurate and complete
- [ ] Terms of service page (`/terms`) is accurate and complete

### Claude Code Prompt

```
Run a security audit:
1. Check middleware.ts for CSRF implementation correctness
2. Grep for any hardcoded secrets or API keys in src/ (exclude .env files)
3. Check all API routes have rate limiting applied
4. Verify validateRedirect() is used wherever redirect URLs are accepted
5. Check for any console.log that might leak sensitive data
6. Verify RLS is referenced/expected in all Supabase queries
7. Check for any SQL injection vectors (should be none with Supabase client)
```

---

## 12. SEO & Meta

### Tests

- [ ] `https://culturalinnovationlab.org/sitemap.xml` generates correctly
- [ ] Sitemap includes: home, about, assessments, blog posts, resources, FAQ, privacy, terms
- [ ] `https://culturalinnovationlab.org/robots.txt` allows indexing
- [ ] JSON-LD structured data on About page (`Organization`)
- [ ] JSON-LD structured data on Blog posts (`Article`)
- [ ] Every page has unique `<title>` and `<meta name="description">`
- [ ] Open Graph tags (`og:title`, `og:description`, `og:image`) on all pages
- [ ] Twitter card tags present
- [ ] `opengraph-image.tsx` and `twitter-image.tsx` generate valid images
- [ ] Favicon (`favicon.ico`) loads correctly
- [ ] Apple touch icon configured

### Claude Code Prompt

```
Audit SEO setup:
1. Read src/app/sitemap.ts and verify all public pages are included
2. Read src/app/robots.ts and verify it allows indexing
3. Read src/components/seo/JsonLd.tsx and verify structured data
4. Check src/app/layout.tsx for global meta tags
5. Grep for pages missing metadata exports
6. Check that opengraph-image.tsx generates a valid image
```

---

## 13. Performance

### Metrics

- [ ] Lighthouse Performance score > 90
- [ ] Lighthouse Accessibility score > 90
- [ ] Lighthouse Best Practices score > 90
- [ ] Lighthouse SEO score > 90

### Checks

- [ ] No console errors or warnings in production build
- [ ] Images use Next.js `<Image>` component (not raw `<img>`)
- [ ] Static assets cached with immutable headers (Netlify handles this)
- [ ] Loading states/skeletons shown during data fetches
- [ ] Error pages display correctly: `/404`, `/500`
- [ ] No unnecessary client-side JavaScript (check bundle size)

### Claude Code Prompt

```
Performance check:
1. Run: npx next build and check for any warnings or errors
2. Grep for raw <img> tags that should use next/image
3. Grep for console.log statements that should be removed in production
4. Check that loading.tsx or Suspense boundaries exist for data-fetching pages
5. Check bundle size output for any unexpectedly large chunks
```

---

## 14. Mobile & Cross-Browser

### Responsive Design

- [ ] All pages render correctly at 320px width (iPhone SE)
- [ ] All pages render correctly at 375px width (iPhone)
- [ ] All pages render correctly at 768px width (iPad)
- [ ] All pages render correctly at 1024px+ (desktop)
- [ ] Touch targets >= 44px on all interactive elements
- [ ] Assessment forms usable on mobile (questions, radio buttons, submit)
- [ ] Navigation hamburger menu opens/closes correctly on mobile
- [ ] Category filter pills wrap or scroll on small screens
- [ ] No horizontal overflow on any page

### Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] iOS Safari (iPhone)
- [ ] Android Chrome

---

## 15. Claude Code Prompts for Finalization

Copy-paste these prompts into Claude Code to automate pre-launch checks.

### Full TypeScript Check

```
Run `npx tsc --noEmit` and fix any TypeScript errors. Show me a summary
of what was found and fixed.
```

### Run Unit Tests

```
Run `npx vitest run` and report results. Fix any failing tests.
```

### Audit Environment Variables

```
Read .env.example and src/lib/env.ts. Cross-reference every variable
against what's documented. List any env vars that are:
1. Used in code but not in .env.example
2. In .env.example but not validated in env.ts
3. Required in production but not marked as required
```

### Check for Console.log Statements

```
Search for console.log, console.warn, and console.error in src/ (excluding
test files). For each one found, determine if it should be:
- Kept (legitimate error logging)
- Removed (debug statement left behind)
- Replaced with proper logging
List findings but don't auto-fix — let me review first.
```

### Verify All API Routes Have Rate Limiting

```
List every API route in src/app/api/ and check if each one applies rate
limiting via checkRateLimit or withRateLimit. Flag any route that handles
POST/PUT/PATCH/DELETE without rate limiting.
```

### Check All Pages Render Without Errors

```
Run `npx next build` and check for:
1. Build errors
2. Pages that fail static generation
3. Missing page metadata
4. Any TypeScript or ESLint warnings
Report a summary of issues found.
```

### Verify Email Templates

```
Read all files in src/lib/email/templates/ and src/lib/email/resend.ts.
Check that:
1. All templates use RESEND_FROM_EMAIL from env
2. Templates include both HTML content
3. Links in emails use NEXT_PUBLIC_APP_URL (not localhost)
4. No hardcoded email addresses (should use contact.ts config)
```

### Broken Link Check

```
Read src/app/sitemap.ts and extract all page URLs. Then check each
corresponding page file exists in src/app/. Also grep for any hardcoded
internal links (href="/...) and verify those pages exist. Flag any
broken internal links.
```

### Security Scan

```
Run a security-focused code review:
1. Grep for any hardcoded secrets, API keys, or passwords in src/
2. Check that no env vars starting with SUPABASE_SERVICE_ROLE are
   exposed to client components
3. Verify all user input is validated before use
4. Check for any dangerouslySetInnerHTML usage and verify it's safe
5. Verify redirect URLs are validated with validateRedirect()
6. Check that CSRF_SECRET is not the dev fallback in production
```

### Accessibility Check

```
Grep for common accessibility issues:
1. Images without alt text
2. Buttons without accessible labels
3. Form inputs without associated labels
4. Missing aria attributes on interactive elements
5. Color contrast issues in Tailwind classes (check design tokens)
6. Missing skip-to-content link
7. Focus management on modals and route changes
```

### Database Consistency Check

```
Read all 9 migration files in supabase/migrations/ in order. Verify:
1. No migration references a table/column that doesn't exist yet
2. RLS policies are created for every table
3. The use_credit_atomic() function handles edge cases (negative balance)
4. The one-response-per-assessment constraint is enforced
5. The new-user trigger creates a profile with correct defaults
Flag any issues or missing constraints.
```

### Full Pre-Launch Sweep

```
Do a comprehensive pre-launch review:
1. Run TypeScript check (npx tsc --noEmit)
2. Run tests (npx vitest run)
3. Check for console.log statements in production code
4. Verify all API routes have rate limiting and CSRF protection
5. Check all email templates use correct URLs and from addresses
6. Verify sitemap includes all public pages
7. Check for any TODO/FIXME/HACK comments that need resolution
8. Verify no localhost references in production code paths
Give me a prioritized list of issues to fix before launch.
```

---

## Launch Day Sequence

1. **Final build**: Push to `main`, verify Netlify deploy succeeds
2. **DNS check**: Confirm `culturalinnovationlab.org` resolves correctly
3. **SSL check**: Visit `https://culturalinnovationlab.org`, verify padlock
4. **Smoke test**: Run through signup -> CIL assessment -> results flow
5. **Email test**: Verify welcome email, results email arrive
6. **Resource test**: Download one PDF resource
7. **Mobile test**: Complete the smoke test on a phone
8. **Analytics check**: Verify PostHog receives events
9. **Sitemap check**: Visit `/sitemap.xml`, submit to Google Search Console
10. **Monitor**: Watch Netlify logs and Supabase logs for errors for 24 hours

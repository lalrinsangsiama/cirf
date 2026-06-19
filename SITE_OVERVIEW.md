# Cultural Innovation Lab — Site Overview

A complete, plain-English picture of this website for someone who can't read the code. Generated from the current working tree (read-only documentation — no files were changed).

> **One-line summary:** Cultural Innovation Lab (CIL) is the public research platform for a doctoral thesis on "cultural innovation as a strategic driver of economic resilience." It hosts an expert-validation survey, a free self-assessment tool (the **CIRF** framework), an evidence library of global case studies, and a logged-in suite of scored assessments with a credit/unlock system.

> **Naming note:** The project uses **two brand names interchangeably** because it is mid-rename. The organisation is now **"Cultural Innovation Lab" (CIL)**, but the framework, survey, and many internal identifiers are still called **"CIRF" (Cultural Innovation Resilience Framework)**. Both appear throughout the live site (e.g. page title says "CIRF", footer says "CIL"). The git history confirms an ongoing "CIRF → CIL" migration.

---

## 1. Stack & Setup

### Framework & language
- **Next.js 16** (App Router, with Turbopack) — `next ^16.1.6`
- **React 18** (`react ^18.2.0`, `react-dom ^18.2.0`)
- **TypeScript 5** (`typescript ^5.3.3`)
- **Tailwind CSS 3** (`tailwindcss ^3.4.1`) with PostCSS + Autoprefixer

### Major libraries / dependencies
| Library | Purpose |
|---|---|
| `@supabase/supabase-js`, `@supabase/ssr` | Database, authentication, session handling |
| `@anthropic-ai/sdk` | AI blog-post generation (admin only), model `claude-sonnet-4-20250514` |
| `resend` | Transactional email |
| `posthog-js` | Product analytics |
| `razorpay` | **Installed but NOT used** in app code — payment scaffolding only (see §5) |
| `recharts` | Charting (radar/score charts) |
| `react-markdown`, `remark-gfm`, `rehype-sanitize` | Render Markdown (blog/AI content) safely |
| `zod` | Input validation on API routes |
| `lucide-react` | Icon set |
| `clsx`, `tailwind-merge` | CSS class utilities |

**Testing/tooling:** Vitest + Testing Library (unit), Playwright (e2e), MSW (request mocking), ESLint (`eslint-config-next`), `@next/bundle-analyzer`.

### Build & deployment
- **Hosting:** **Netlify** (`netlify.toml`, `@netlify/plugin-nextjs`). Build command `npm run build`, publish dir `.next`.
- **Production URL:** `https://culturalinnovationlab.org` (previously `cil-framework.org` / `cirf.org`; domain registrar Hostinger).
- **Static assets** under `/_next/static/*` are cached for a year (immutable).
- **Security headers** are set in both `next.config.mjs` and Netlify: HSTS, `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, Referrer-Policy, a restrictive **Content-Security-Policy** (allows PostHog, Supabase, Anthropic, Resend, Google Fonts), and a Permissions-Policy disabling camera/mic/geolocation.
- **Middleware** (`middleware.ts`) refreshes Supabase sessions and gates `/dashboard` (login required) and `/admin` (admin role required, read from the JWT `app_metadata.role`, not the database, to prevent privilege escalation).

### Third-party integrations
| Service | Role | Where wired |
|---|---|---|
| **Supabase** | Postgres database + auth (email/password) | `src/lib/supabase/*` |
| **Resend** | All transactional email, from `CIL <noreply@culturalinnovationlab.org>` | `src/lib/email/resend.ts` |
| **PostHog** | Analytics (page views + custom events); opted out in dev; gated on env keys | `src/lib/analytics/posthog.ts`, `src/components/analytics/PostHogProvider.tsx` |
| **Anthropic (Claude)** | AI-generated blog drafts in the admin panel | `src/lib/ai/contentGenerator.ts` |
| **Google Fonts** | Inter + Playfair Display | imported in `globals.css` and root layout |
| **Unsplash** | Allowed remote image host (config) — not obviously used on current pages | `next.config.mjs` |

**Forms/surveys are all built in-app (custom React).** There is **no** Google Forms, Typeform, Substack, or external CMS. Survey/assessment responses go into Supabase Postgres tables (details in §3).

---

## 2. Site Structure

### Important architectural facts
1. **The homepage *is* the survey.** `src/app/page.tsx` renders the `SurveyShell` (the expert-validation questionnaire) directly, on a soft pastel gradient background. There is no traditional marketing landing page at `/`.
2. **The marketing pages live in a `(site)` route group and are survey-gated.** Pages under `src/app/(site)/` are wrapped in a `SurveyGate` that checks `localStorage` (`cirf-survey-state`). If the survey isn't marked complete, the visitor is redirected to `/survey`. The `(site)` folder name does **not** appear in the URL — these pages serve at `/about`, `/framework`, `/evidence`, `/assessment`.
3. **A large set of old pages was archived, not deleted.** `src/_archived_pages/` contains the previous versions of `about`, `blog`, `faq`, `for/communities`, `for/practitioners`, `framework`, `getting-started`, `platform`, `resources`, `tools`, and the old homepage. These are **not routed** (the folder is outside `app/`), so they are effectively offline.

### Live routes (current working tree)

| URL | File | Purpose |
|---|---|---|
| `/` | `src/app/page.tsx` | Homepage — renders the **CIRF Expert Validation Survey** (`SurveyShell`) |
| `/survey` | `src/app/survey/page.tsx` (+ `layout.tsx`) | Same expert survey, with its own metadata; **not indexed** by search engines |
| `/about` | `src/app/(site)/about/page.tsx` | About the lab, researcher, and research |
| `/framework` | `src/app/(site)/framework/page.tsx` | Deep dive into the four CIRF pillars |
| `/evidence` | `src/app/(site)/evidence/page.tsx` | 12 global case studies |
| `/assessment` | `src/app/(site)/assessment/page.tsx` | Free 16-question CIRF self-assessment (`CIRFAssessment`) |
| `/assessments/[type]` | `src/app/assessments/[type]/page.tsx` | Logged-in scored assessments (6 types: `cil`, `cimm`, `cira`, `tbl`, `ciss`, `pricing`) |
| `/auth/login` | `src/app/auth/login/page.tsx` | Sign in |
| `/auth/signup` | `src/app/auth/signup/page.tsx` | Create account |
| `/auth/forgot-password` | `src/app/auth/forgot-password/page.tsx` | Request reset email |
| `/auth/reset-password` | `src/app/auth/reset-password/page.tsx` | Set new password |
| `/auth/callback` | `src/app/auth/callback/route.ts` | Supabase OAuth/email callback handler |
| `/dashboard` | `src/app/dashboard/page.tsx` | Logged-in home: credits, assessments, tools, profile |
| `/dashboard/profile` | `src/app/dashboard/profile/page.tsx` | Edit profile |
| `/dashboard/settings` | `src/app/dashboard/settings/page.tsx` | Data export, account deletion |
| `/admin` | `src/app/admin/page.tsx` | Admin dashboard (admin role only) |
| `/admin/assessments` | `src/app/admin/assessments/page.tsx` | Research dashboard — analytics + responses |
| `/admin/blog` | `src/app/admin/blog/page.tsx` | Blog CRUD |
| `/admin/blog/new` | `src/app/admin/blog/new/page.tsx` | Create/AI-generate a post |
| `/admin/blog/[id]` | `src/app/admin/blog/[id]/page.tsx` | Edit a post |
| `/admin/blog/seed` | `src/app/admin/blog/seed/page.tsx` | Seed blog posts into DB |
| `/privacy` | `src/app/privacy/page.tsx` | Privacy Policy |
| `/terms` | `src/app/terms/page.tsx` | Terms of Service |
| `/unsubscribe` | `src/app/unsubscribe/page.tsx` | Newsletter unsubscribe |

Plus API routes under `/api/*` (see §5) and loading skeletons (`loading.tsx`) on several routes.

### Navigation structure

**Top nav** (`SiteHeader`, shown on `(site)` pages): logo "Cultural Innovation Lab" → `/`; links **Framework** → `/framework`, **Evidence** → `/evidence`, **About** → `/about`; CTA button **Take Assessment** → `/assessment`. Mobile shows the same items behind a hamburger.

**Footer** (`SiteFooter`):
- Brand blurb: *"A research initiative by Lalrinngheti Sangsiama — DBA, Swiss School of Business and Management Geneva."*
- **Explore** column: CIRF Assessment → `/assessment`, The Framework → `/framework`, Global Evidence → `/evidence`, Expert Survey → `/survey`, About → `/about`.
- **Contact** column: `hello@culturalinnovationlab.org`, plus *"Your data is stored securely and used only for academic research. We never sell or share your information."*
- Bottom: `© {year} Cultural Innovation Lab. All rights reserved.`

**Internal funnel:** land on `/` → complete the expert survey → survey completion unlocks the `(site)` pages and shows links to Assessment / Framework / Evidence / About. Separately, the **logged-in** flow (`/auth/signup` → `/dashboard` → `/assessments/[type]`) is a credit-based assessment suite.

---

## 3. Content Inventory

### Homepage `/` & `/survey` — CIRF Expert Validation Survey
An embedded, anonymous, multi-screen questionnaire (`SurveyShell`). No login; a random session UUID is stored in `localStorage` and progress auto-saves (debounced) both locally and to the server (`POST /api/survey/draft`). **21 screens** across **7 sections**, ~20–25 min. Footer on every screen: *"Cultural Innovation Resilience Framework · Doctoral Research Study · All responses are confidential."*

- **Sections:** Welcome/Consent · A: Respondent Profile · B: Definition & Scope · C: Framework Pillars · D: Barriers & Enablers · E: Metrics & Implementation · Final Reflections.
- **Consent screen** ("Expert Validation Questionnaire") opens: *"Thank you for agreeing to participate in this expert validation study. Your professional expertise is invaluable to this research, which seeks to develop the Cultural Innovation Resilience Framework (CIRF) — the first integrated, scalable framework for positioning cultural innovation as a strategic driver of economic resilience…"* Highlight: *"Estimated Completion Time: 20–25 minutes."* Required checkbox: *"I confirm that I have read the above information and consent to participate in this study."*
- **Proposed definition (shown to experts):** *"Cultural innovation is the strategic transformation of cultural heritage, traditions, and community-embedded knowledge into viable economic opportunities that generate measurable value while preserving cultural integrity, fostering adaptability, and empowering the communities from which they originate."*
- **28 questions** (q1–q28) using consent, single-select (+ "Other"), multi-select (with min/max), Likert matrix (*Strongly Disagree → Strongly Agree*, 1–5), triple-rating matrix (rate each indicator on "Easy to Measure?", "Useful for Policy?", "Useful for Business?"), open-text, and ranking. Example: q19 asks experts to *"select the FIVE most significant barriers to cultural innovation"* (exactly 5); q18 ranks the four pillars by importance.
- **Buttons:** Back / Continue / **Submit Survey** ("Submitting…" in flight).
- **Thank-you screen:** heading *"Thank You for Your Invaluable Contribution,"* body *"Your expertise is helping to build the first unified framework for cultural innovation as a driver of economic resilience. Your responses have been securely recorded."* Then *"🎉 You've unlocked the full platform"* with links to the Assessment, Framework, Evidence, and About pages, plus researcher block (Lalrinngheti Sangsiama · Doctor of Business Administration · Swiss School of Business and Management Geneva · hello@culturalinnovationlab.org).
- **Where responses go:** `POST /api/survey/submit` → Supabase table **`survey_responses`** (JSONB `answers`). Anonymous; IP is **SHA-256 hashed** for duplicate detection (raw IP not stored); consent required; rate-limited 3/hour/IP; one completed submission per session. **No email sent.** Admin can export via `GET /api/survey/export` (JSON or CSV, admin-only).

### `/about`
- Hero: eyebrow "About", H1 **"Cultural Innovation Lab"**, subhead *"Research-driven tools for measuring, protecting, and scaling cultural innovation globally."*
- Researcher (👩‍🔬 emoji, no photo) — H2 **"Lalrinngheti Sangsiama"**: *"Lalrinngheti is a DBA candidate at the Swiss School of Business and Management Geneva, researching cultural innovation as a strategic driver of economic resilience. Her doctoral thesis, 'Cultural Innovation as a Strategic Asset: Building Scalable Frameworks for Economic Resilience in a Globalised Economy', develops the Cultural Innovation Resilience Framework (CIRF)…"* and *"Her research spans 12 countries across 6 continents, examining models from South Korea's Hallyu Wave to Ghana's newly protected Kente cloth, from Bhutan's GNH tourism to Aboriginal Australian art centres."*
- **The Research** — three functions: an **Assessment tool** (CIRF Self-Assessment), an **Evidence base** (12 case studies), and a **Research instrument** (anonymised assessment data feeds research).
- **Our Vision** — *"Cultural innovation … is one of the world's most powerful but least measured economic forces. The Cultural Innovation Lab exists to change that…"*
- **Get in Touch** — `hello@culturalinnovationlab.org`; button **"🎓 Participate in Expert Validation Survey"** → `/survey`.

### `/framework`
- Hero: H1 **"Cultural Innovation Resilience Framework"**, subhead *"The CIRF is the first integrated, scalable framework for positioning cultural innovation as a strategic driver of economic resilience. Built from research across 12 countries and 6 continents."*
- **The Four Pillars** (expandable `PillarCards`):
  1. **Economic Value Creation** (📈) — *"Transform cultural assets into measurable economic outputs."* Indicators: Cultural GDP share, Creative employment rates, Export values, Tourism multipliers.
  2. **Cultural Integrity & Authenticity** (🛡️) — *"Preserve heritage meaning during commercialisation."* Indicators: IP protections, Community governance, Authenticity certification, Indigenous consent frameworks.
  3. **Adaptability & Sustainability** (🔄) — *"Evolve with market, technology, and environmental change."* Indicators: Digital adoption, Hybrid business models, Knowledge transfer, Climate resilience.
  4. **Social Empowerment & Inclusion** (🤝) — *"Distribute opportunity across marginalised communities."* Indicators: Participation demographics, Income distribution, Women/youth entrepreneurship, Social mobility.
- **Why All Four Pillars Are Essential** — four "Without {pillar}" failure cards, e.g. *"Without Cultural Integrity — Economic exploitation of cultural assets… Fast-fashion appropriation of indigenous textile designs without attribution, compensation, or consent."*
- CTA (dark): *"Assess Your Initiative — Take the free 16-question CIRF assessment and get personalised insights."* → **"Start the Assessment →"**.

### `/evidence`
- Hero: H1 **"12 Countries. 6 Continents. Real Impact."** with 12 case-study cards (flag emoji + stat + description). Examples:
  - 🇰🇷 **Hallyu Wave** (South Korea) — *"US$12.3B economic contribution (2019)… government investment of US$5.5B through the Cultural Content Office produced outsized returns."*
  - 🇮🇳 **Traditional Knowledge Digital Library** (India) — *"500,000+ formulations documented… preventing 200+ biopiracy patents."*
  - 🇧🇹 **GNH Tourism** (Bhutan), 🇵🇪 **Culinary Innovation** (Peru), 🇯🇵 **Traditional Craft Innovation** (Japan), 🇮🇹 **Artisan Clusters & GI** (Italy), 🇿🇦 **San Digital Storytelling**, 🇩🇪 **Berlin Creative Industries** (€18B, 210,000 jobs), 🇦🇺 **Indigenous Art Centres** (AU$250–500M), 🇬🇭 **Kente Cloth GI (2025)** (first African textile with WIPO GI), plus Shanghai Creative Clusters and NE India Handloom.
- CTA: **"Assess Your Initiative with the CIRF →"** → `/assessment`.

### `/assessment` — Free CIRF Self-Assessment (`CIRFAssessment`)
A 5-step interactive form (no login). **16 questions, 4 pillars × 4, scored 1–5** (Not Present → Leading), max 80.
- **Step 1 — Your Information:** *"Your results and a free copy of the Cultural Innovation Strategy Toolkit will be sent to your email."* Fields: Name (optional), Email (required), Role (Cultural Entrepreneur / Policymaker / Academic / NGO Professional / Investor / Consultant / Other), Country, Sector(s) (Textiles & Fashion, Food & Gastronomy, Performing Arts & Music, Visual Arts & Crafts, Heritage Tourism, Traditional Knowledge, Digital Heritage, Cultural Policy, Other).
- **Steps 2–5 — one per pillar:** rate each statement 1–5. Sample statements: *"A clear revenue model exists and is generating income from cultural assets"* (P1); *"The originating community retains governance control over how heritage is used"* (P2); *"Knowledge and skills are being actively transferred to the next generation"* (P3); *"Economic benefits are distributed equitably rather than captured by elites or intermediaries"* (P4).
- **Results (`CIRFResults`):** overall score "out of 80" with a band (Strong ≥64 / Good Progress ≥48 / Emerging ≥32 / Early Stage <32), a hand-drawn **SVG radar chart**, per-pillar breakdown (Leading/Established/Developing/Emerging/Critical), and **Personalised Recommendations** targeting the weakest pillar (e.g. *"IP protection is foundational. India's TKDL model … shows how traditional knowledge can be systematically protected."*). Share buttons for LinkedIn and X, plus a CTA **"🎓 Participate in Expert Research Survey"** → `/survey`.
- **Where responses go:** posts to `/api/survey/draft` on submit; results computed client-side. (This free tool is distinct from the logged-in scored assessments below.)

### `/assessments/[type]` — Logged-in scored assessments
**Requires login.** One dynamic page serves six assessment types, all Likert (1–7), server-scored 0–100, **one submission per user per type**:

| Slug | Name | Questions | Time | Credits | Unlock |
|---|---|---|---|---|---|
| `cil` | Cultural Innovation Lab | 61 | ~20 min | **Free** | always available |
| `cimm` | Cultural Innovation Measurement Matrix | 19 | ~8 min | 1 | requires `cil` |
| `cira` | Cultural Innovation Readiness Assessment | 20 | ~8 min | 1 | requires `cil` |
| `tbl` | Triple Bottom Line — Cultural Innovation | 18 | ~8 min | 1 | requires `cil` |
| `ciss` | Cultural Innovation Sustainability Scorecard | 17 | ~7 min | 1 | requires `cil` |
| `pricing` | Cultural Product Pricing Assessment | 16 | ~6 min | 1 | requires `cil` |

- **Credit economy:** completing the free **CIL** grants 2 PDF resources + 1 credit and unlocks the five secondary assessments. Each secondary costs 1 credit but grants 1 credit back (+ tools/resources), so a user can complete everything for free, one at a time.
- **Score tiers:** Emerging (0–40) · Developing (40–60) · Established (60–80) · Thriving (80–100). Results show score, radar "Section Profile", section bars, recommendations, and "What you just unlocked", with buttons **Email My Results** (60s cooldown), **Take Again**, **Back to Tools**.
- **Locked state:** *"Assessment Locked — Complete the {requirement} assessment first to unlock it."*
- **Where results go:** `POST /api/assessments/submit` → Supabase **`assessments`** table via the `save_assessment_with_credit` Postgres RPC (writes the row and deducts a credit atomically). Drafts auto-save to `/api/assessments/draft`. Email is **opt-in** afterwards via `/api/email/assessment-results` (Resend).

### Auth pages (`/auth/*`)
- **Login:** H1 *"Welcome back"*, *"Sign in to access your assessments and credits"*; email + password (show/hide); "Forgot password?"; "Don't have an account? **Sign up free**"; footer *"Start your free CIL assessment today."*
- **Signup:** H1 *"Create your account"*, *"Start with a free assessment — no credit card needed"*; Full name, Email, Password (≥6, with strength meter "Too weak → Strong"), Organization (optional), "I am a" role (Researcher / Practitioner / Community Leader / Policymaker / Other); terms note linking `/terms` + `/privacy`; success screen *"Check your email — We've sent a confirmation link to {email}."*
- **Forgot/Reset password:** request-link form (*"Reset your password"*) and new-password form (*"Set new password"*), with success/expired states.

### Dashboard (`/dashboard`, `/profile`, `/settings`)
- **Dashboard:** *"Welcome back{, name}"*, *"Manage your assessments, tools, and credits."* Stat cards (credits available, assessments completed `X/6`, tools unlocked), a **Your Journey** pipeline (*"Complete CIL (free) → earn 1 credit → take any assessment → earn it back → repeat"*), Recommended Next, Recent Assessments (empty state: *"Welcome to CIL! Start your journey by taking the CIL Assessment…"*), Profile summary, Credit History, and Quick Actions (Take Assessment, Calculators, Framework, Resources).
- **Profile:** edit Basic Info, Contact, Location, Business Info (Industry, Business Stage, Years Operating, Team Size, Annual Revenue Range), and **Cultural Context** (*"Cultural Tradition"* e.g. "Indigenous Weaving"; *"Community Affiliation"* e.g. "Navajo Nation, Maori Community"). Submits `PATCH /api/user/profile`.
- **Settings:** Edit Profile link; **"Notification preferences coming soon"** (stub); **Export Your Data** (*"…provided in JSON format"* → `GET /api/user/data-export`); **Danger Zone → Delete Account** (type `DELETE` to confirm → `POST /api/user/delete-account`).

### Admin (`/admin/*`) — admin role required
- **`/admin`** — "Admin Dashboard", *"Manage content, view analytics, and monitor user activity."* Live stat cards (Blog Posts, Assessments Completed, Newsletter Subscribers, Contact Submissions) and quick actions (Create New Post, ✨ AI Generate Post, Manage All Posts, View All Results).
- **`/admin/assessments`** — "Research Dashboard". **Analytics** tab (completed responses, unique participants, CIL completion rate, in-progress drafts, score distribution, assessment funnel, top sectors/countries/stages) and **Responses** tab (searchable, expandable per-answer view). Three CSV exports: "Summary CSV (scores only)", "Research Data (all answers)", "Readable Export (question text headers)".
- **`/admin/blog`** — blog CRUD over the `blog_posts` table (create, AI-generate, search, filter by status, publish/unpublish, edit, delete).

### Legal & utility
- **`/privacy`** — "Privacy Policy", last updated 5 March 2026. Sections: Introduction (with research-disclaimer box), Data Controller, Information We Collect, How We Use Your Data, **Data Sharing & Third Parties** (Supabase, Resend, PostHog; *"We do not sell your personal information"*), Cookies, Your Rights, Data Retention (*"…delete or anonymize your personal data within 30 days"*), Security, Children's Privacy (*"not intended for individuals under 18"*), Changes, Contact.
- **`/terms`** — "Terms of Service", last updated 5 March 2026, 16 numbered sections including AI-Assisted Features (*"…inputs may be sent to third-party AI providers… assessment responses and personal data are not used to train AI models"*), Limitation of Liability (*"our total liability is limited to zero"*), and **Governing Law: India** (binding arbitration, courts in India).
- **`/unsubscribe`** — "Unsubscribe from Newsletter" → `POST /api/newsletter/unsubscribe`.

### Forms & where responses go (summary)
| Form | Location | Embedded? | Destination |
|---|---|---|---|
| Expert survey | `/`, `/survey` | Embedded (custom React) | Supabase `survey_responses` (no email) |
| Free CIRF assessment | `/assessment` | Embedded | `/api/survey/draft` (client-scored) |
| Scored assessments | `/assessments/[type]` | Embedded | Supabase `assessments` (login req.), optional Resend email |
| Contact | (component / `/api/contact`) | Embedded | Admin notification + user confirmation email (Resend) |
| Newsletter | `NewsletterForm`, `BlogNewsletterForm` | Embedded | Supabase `newsletter_subscribers` + welcome email |
| Auth (login/signup/reset) | `/auth/*` | Embedded | Supabase Auth |
| Profile / account | `/dashboard/*` | Embedded | Supabase `profiles` |
| Waitlist | `/api/waitlist` | API | Supabase `waitlist` |

### Images & media
- **No photographs anywhere.** Visual content is **emoji** (👩‍🔬 researcher, country flags on evidence/case cards, pillar icons 📈🛡️🔄🤝, 💡 recommendations) and **inline/hand-drawn SVG** (the logo "stacked layers" mark, the radar/spider charts).
- `public/`: `logo.svg`, `favicon.svg`, `apple-touch-icon.svg`, `og-image.png` + `og-image.svg` (Open Graph share image, 1200×630), plus a `downloads/` folder, an `images/` folder, and an `instagram-posts/` folder (~90 files) that are not referenced by current pages.
- Root metadata points to `/og-image.png` for social sharing.

---

## 4. Design System

**Defined in:** `tailwind.config.ts` (color tokens, fonts, animations), `src/app/globals.css` (font import, base styles, component classes). Some pages also use inline hex values.

### Colour palette (Tailwind tokens)
| Token | Hex | Use |
|---|---|---|
| `ink` | `#0a0a0a` | Primary text / dark buttons |
| `pearl` | `#fdfdfb` | Page background (off-white) |
| `gold` | `#d4af37` | Accent (stats, Pillar 2) — also `#D4A843` used inline |
| `stone` | `#7c7c7c` | Muted grey |
| `sand` | `#f5f0e8` | Warm neutral |
| `sage` | `#a8b5a0` | Muted green (top score tier) |
| `terracotta` | `#c67557` | Warm accent (Pillar 3) — also `#E07A5F` inline |
| `ocean` | `#5b8c9e` | Blue accent |
| `lavender` | `#e8e0f5` | Soft purple |

Additional brand hexes appear inline in components: teal **`#1A8A7D`** (primary CTA / Pillar 1), navy **`#0D1B2A`** (footer/dark sections, Pillar 4), warm page background **`#FAF7F2`**, and the homepage's pastel gradient (`#f0f7ff → #f8fdf5 → #fffef8 → #fdf8f0`).

### Typography
- **Serif (display/headings):** **Playfair Display** (`font-serif`).
- **Sans (body/UI):** **Inter** (`font-sans`), default body weight is light (`font-light`).
- Loaded via Google Fonts (import in `globals.css` + `next/font` in the root layout).

### Motion
Custom keyframe animations in Tailwind: `reveal-text` (hero lines rise into view), `fade-in-up`, `fade-in`, `marquee`, `pulse-gold`, and slide-in/out transitions — all using an `ease-custom` curve `cubic-bezier(0.19, 1, 0.22, 1)`. Scroll-triggered reveals via an `animate-on-scroll`/`visible` class pattern (gated on a `js-ready` class so content stays visible if JS fails). Selection highlight is inverted (`bg-ink text-pearl`).

### Overall visual style
An editorial, academic-but-warm aesthetic: off-white/sand backgrounds, deep-navy and teal anchors, gold accents, large Playfair serif headlines over light Inter body text, generous whitespace, emoji + minimalist SVG instead of photography, and subtle reveal-on-scroll motion.

---

## 5. What's Incomplete / Notable Gaps

### Mid-rename inconsistency (CIRF ↔ CIL)
The site uses both names. The browser title is *"Cultural Innovation Lab — CIRF Framework & Assessment Tool"*; the footer links say "CIRF Assessment"; data files and scoring call it "CIL Score". This is a partial rebrand, not a bug per se, but it reads inconsistently to a visitor.

### Archived / offline sections
`src/_archived_pages/` holds fully-built but **unrouted** (offline) pages: the old homepage, **blog** (`/blog`, `/blog/[slug]`), **FAQ**, **for/communities** & **for/practitioners**, an old **framework**, **getting-started**, **platform**, **resources**, and **tools** (`/tools`, `/tools/[id]`, `/tools/calculators`). None of these are reachable.

### Blog content with no public page
- `src/lib/data/blogContent.ts` contains **10 fully-written blog posts** (markdown + citations) and `blogCategories.ts` defines 10 categories — but **there is no live blog route** (the public blog pages are in `_archived_pages`). The blog content is only reachable through the **admin** tooling, which can seed it into the `blog_posts` table. The `BlogNewsletterForm` component (*"Stay updated on cultural innovation research"*) and the PostHog `blog_post_viewed` event are therefore effectively orphaned.

### Dead / broken links
- The **Privacy** and **Terms** pages link "Contact" to `/about#contact`. The `/about` route does exist (via `(site)/about`), but the page has a "Get in Touch" section without a verified `#contact` anchor, so the fragment may not scroll to anything.
- The **dashboard** Quick Actions / Journey link to `/tools`, `/tools/calculators`, and `/resources` — these routes are **archived (offline)**, so those links are dead. (`/framework` from the dashboard does resolve.)

### Stubs & "coming soon"
- **Settings → Notification Preferences:** literally *"Notification preferences coming soon."* (not implemented).

### Dormant payment system
- **Razorpay** is installed (`package.json`) and the database has payment scaffolding (`payment_orders`, `credit_transactions` with `razorpay_*` columns; PostHog has `payment_successful`/`payment_failed`/`credit_purchase_started` helpers) — but **no payment flow exists in application code** (`grep` for `razorpay` in `src/` returns nothing). Credits are currently only earned through the assessment unlock loop, never purchased. The infrastructure is built but inactive.

### Minor data-handling notes
- `NewsletterForm` collects a "role" field in the UI but **does not send it** in the POST body (only `email` and `name`).
- Two different case-study sets coexist: the `CaseStudyCarousel` component lists 12 countries, while the `caseStudies.ts` data file documents a **different** set of 8 fully-cited cases (Vietnam, Nunavut, Palestine, Korean Hanji, Mi'kmaq, Bangladesh, Morocco, Jamaica). The `/evidence` page renders its own inline 12-card grid and **imports `CaseStudyCarousel` but never displays it** (dead import).
- Root metadata references `/og-image.png`; the repo also has `og-image.svg`.

### Otherwise
No lorem-ipsum, TODO comments, or obviously broken pages were found in the **live** routes. The user-facing copy on active pages is complete and polished. The main "incompleteness" is structural: a large refactor is mid-flight (pages archived, brand half-renamed, payment/blog features built but not wired up).

---

*Generated as read-only documentation. Source of truth: the current working tree under `src/`, `tailwind.config.ts`, `next.config.mjs`, `netlify.toml`, and `package.json`.*

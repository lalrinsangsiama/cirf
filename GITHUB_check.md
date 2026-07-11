# GitHub Actions Cost & Efficiency Audit — CIL Platform

Verified against the repo on 2026-07-11. This replaces the generic audit prompt with
findings specific to this project, ordered so items can be implemented one at a time.

## Current state (verified, not assumed)

- **1 workflow file**: `.github/workflows/ci.yml`. No reusable workflows, no composite
  actions, no `.github/actions/`.
- **8 jobs**: lint, type-check, test, build, e2e, security-audit, deploy-preview,
  deploy-production. All `ubuntu-latest`, no matrix.
- **Triggers**: `push` to `main` + `pull_request` to `main`. No `paths`/`paths-ignore`,
  no `concurrency` block, no top-level `permissions:`.
- **No scheduled (`cron`) workflows exist anywhere in this repo.**
- **No Dependabot config** (`.github/dependabot.yml` absent).
- **Not a monorepo** — single Next.js 16 app.
- **Hosting is Netlify**, confirmed by `netlify.toml`, the linked `.netlify/` folder, and
  `CLAUDE.md`. Netlify has its own git-integration build/deploy pipeline that runs
  outside GitHub Actions billing.
- **GitHub repo settings** (checked via `gh api`): vulnerability alerts (Dependabot
  alerts) are **disabled**; `main` has **no branch protection** and no required status
  checks — the CI jobs above don't currently block a bad merge.

## Findings, ranked by priority

1. **[Broken, wastes minutes] `e2e` job likely fails every run.**
   `playwright.config.ts:41-48` sets `webServer: undefined` whenever `CI` is set, but
   `ci.yml`'s `e2e` job (`ci.yml:112-155`) downloads the `.next` build artifact and runs
   `npm run e2e` without ever starting a server. Playwright has nothing to hit at
   `localhost:3000`. Combined with `retries: 2` in `playwright.config.ts:7`, this job
   burns up to 3x runner time on a run that structurally cannot pass.
   **Fix**: add a step that runs `npm run start &` (or `next start`) and waits for
   `localhost:3000` to respond before the `Run E2E tests` step, or give `webServer` a
   CI-safe branch in `playwright.config.ts` that reuses the pre-built `.next` output.

2. **[Redundant, remove] `deploy-preview` and `deploy-production` are dead placeholders.**
   `ci.yml:176-193` — both jobs just `echo "Add Vercel/Netlify ... deployment here"` and
   do nothing. Netlify already deploys previews and production automatically via its own
   GitHub integration, for free, outside Actions minutes. These jobs add wait time
   (`needs: [build, e2e]`) and confuse anyone reading the workflow into thinking
   deployment happens here. **Do not remove until the manual check below is confirmed.**

3. **[Cost] No concurrency control.** Every new push to a PR branch lets the previous
   in-flight run keep consuming minutes instead of being cancelled. Add:
   ```yaml
   concurrency:
     group: ci-${{ github.workflow }}-${{ github.ref }}
     cancel-in-progress: true
   ```
   Do **not** apply `cancel-in-progress` to the (currently placeholder) production
   deploy path if it's ever made real.

4. **[Cost] No path filtering.** Every job — including `build` and `e2e` — reruns on
   documentation-only changes (`SITE_OVERVIEW.md`, `CIL-Assessment-Instruments.md`,
   `docs/*.pdf`, root `*.md` files). Add a `paths-ignore` for those, while explicitly
   keeping anything that can affect a build: `supabase/**` (migrations), `package.json`,
   `package-lock.json`, config files, and the workflow file itself.

5. **[Security hygiene] No least-privilege `permissions:` block.** The workflow relies
   on the default (broader) `GITHUB_TOKEN` scope. None of the current jobs need write
   access. Add at the workflow level:
   ```yaml
   permissions:
     contents: read
   ```

6. **[Decide deliberately] `security-audit` currently can't fail the build.**
   `ci.yml:172-174` runs `npm audit --audit-level=high` with `continue-on-error: true` —
   it's informational only. That may be intentional, but it should be a decision, not a
   default: either keep it non-blocking (fine, it's cheap — one `npm ci` + `npm audit`),
   or drop `continue-on-error` so high-severity vulnerabilities actually gate merges.

7. **[Not in Actions at all — repo settings] Branch protection is off.** `main` has no
   required status checks, so even a fully optimized `ci.yml` isn't enforced today. This
   isn't a cost issue, but it undercuts the point of having CI. See manual steps below.

8. **[Not in Actions at all — repo settings] Dependabot alerts are disabled.** This is a
   free, GitHub-native feature that doesn't consume Actions minutes for the alerts
   themselves (only if you also add `.github/dependabot.yml` for automated version-bump
   PRs, which then run through the normal `ci.yml` checks). Recommended to enable
   regardless of anything else in this document.

## Item 4 verification notes (2026-07-11)

Fixed in `playwright.config.ts`: `webServer` was previously `undefined` whenever `CI`
was set, so Playwright never started anything and the `e2e` job's tests could only fail
on connection refused. Changed to always define `webServer`, running `npm run start`
(against the already-built `.next` output) in CI and `npm run dev` locally:
```ts
webServer: {
  command: process.env.CI ? 'npm run start' : 'npm run dev',
  url: 'http://localhost:3000',
  reuseExistingServer: !process.env.CI,
  timeout: 120000,
},
```
No changes needed to `ci.yml` — the e2e job already downloads the `.next` artifact and
already sets the runtime placeholder env vars on the `Run E2E tests` step, which
Playwright's spawned server process inherits.

**Verified locally** by running a production build (`npm run build`) and then
`CI=1 npx playwright test --project=chromium e2e/navigation.spec.ts` to simulate the CI
path end to end: the server started successfully and 5 of 11 tests ran real assertions
against it (12.2 minutes, mostly retry overhead — see finding below).

**New finding surfaced by the fix, since triaged and fixed (2026-07-11):** 6 of 11 tests
in `e2e/navigation.spec.ts` failed the first time the job ever actually ran. Root cause
was **not** the cookie consent dialog (initial hypothesis, disproven — it's a fixed
bottom banner, not a full-screen overlay, and only appeared in the failure snapshot
because Playwright captures diagnostics after the ~5s assertion timeout, by which point
its 1s mount delay had already elapsed). The real cause: `e2e/navigation.spec.ts` was
written against an older header/nav implementation that no longer matches
`src/components/site/SiteHeader.tsx` — a stale-test problem, not a broken app:
- Title/logo assertions expected literal `"CIL"` text; the real brand text is spelled
  out as `"Cultural Innovation Lab"` everywhere. Fixed the test assertions.
- The nav-links test clicked a `"Tools"` link that was never in the header nav.
  **Decision: update the test only** (drop the Tools assertion), no product change.
- Mobile menu tests expected `button[aria-label="Open menu"]` and a `#mobile-menu`
  element with `translate-x-full`/`translate-x-0` classes and Escape-to-close. The real
  button is `aria-label="Toggle menu"`, the real menu mounts/unmounts (no transform
  classes, no Escape handling). Added a stable `id="mobile-menu"` to the existing
  conditional div in `SiteHeader.tsx` (markup-only, no behavior change) and rewrote the
  test to match actual behavior (toggle button closes it, not Escape).
- The skip-to-main-content link didn't exist at all — a real accessibility gap (WCAG
  2.4.1), not a test bug. **Decision: implement it.** Added a skip link in
  `src/app/layout.tsx` (applies site-wide) and `id="main-content"` / `tabIndex={-1}` on
  `<main>` in `src/app/page.tsx` and `src/app/(site)/layout.tsx` (covers the homepage
  plus every page reachable from the header nav: framework, evidence, about, contact,
  blog, assessment).

Verified: production build, `npm run lint` (0 errors), `tsc --noEmit` (clean),
`npm run test:run` (65 passed), and `CI=1 npx playwright test --project=chromium
e2e/navigation.spec.ts` — all 11 tests pass in 23.8s (down from 12.2 minutes of mostly
retry overhead on the failing run). `E2E Tests` can now be safely included as a required
branch-protection check in step 8.

## Item 6 verification notes (2026-07-11)

Started as "decide the boolean," turned into an actual vulnerability remediation once
`npm audit --omit=dev --audit-level=high` showed production-impacting issues, not just
dev-tooling noise:

**Fixed, safe non-breaking updates (all within existing `^` ranges in `package.json`,
no package.json changes needed, only `package-lock.json`):**
- `next` 16.1.6 → 16.2.10 — resolved **16 separate CVEs** in Next.js itself: Server
  Actions CSRF bypass, dev HMR CSRF bypass, multiple DoS (Server Components, Image
  Optimization, Cache Components connection exhaustion), middleware/proxy bypasses
  (segment-prefetch, dynamic route params, Pages Router i18n), cache poisoning (redirect,
  RSC response, RSC cache-busting collision), CSP-nonce XSS, `beforeInteractive` script
  XSS, WebSocket-upgrade SSRF.
- `posthog-js` 1.336.4 → 1.399.2 — newer version dropped the OpenTelemetry
  logs-exporter dependency chain entirely, eliminating a **critical** `protobufjs`
  arbitrary-code-execution advisory (GHSA-xq3m-2v4x-88gg) plus 7 related protobufjs
  DoS/prototype-pollution advisories.
- `@supabase/supabase-js` 2.93.3 → 2.110.2 — newer `@supabase/realtime-js` dropped the
  `ws` dependency entirely, eliminating a **high** uninitialized-memory-disclosure and
  memory-exhaustion-DoS pair (GHSA-58qx-3vcg-4xpx, GHSA-96hv-2xvq-fx4p).

Verified after each update: production build, `npm run lint` (0 errors),
`tsc --noEmit` (clean), `npm run test:run` (65 passed), and the **full** e2e suite
(all 4 spec files, not just navigation) — `CI=1 npx playwright test --project=chromium`,
31/31 passed. This also caught 4 more stale-test failures unrelated to the dependency
updates (same root cause as item 4's findings — tests written against an older site
structure): `contact.spec.ts` navigated to `/about#contact` (a static email blurb with
no `<form>`) instead of the real `/contact` page, and referenced a nonexistent
`input[name="name"]` (the real field has no `name` attr, only `id="contact-name"`);
`blog.spec.ts` navigated to `/case-studies`, a route that no longer exists (renamed to
`/evidence` — the 404 page's own `<h1>` was making one of the two tests pass for the
wrong reason). Fixed both spec files to match the current site.

**Not fixed — needs breaking major-version upgrades, out of scope for this pass:**
- `axios`/`form-data` (high, incl. SSRF/prototype-pollution/credential-hijack
  advisories) via `razorpay@2.9.6` — already latest within `^2.9.0`; razorpay itself
  would need to bump its bundled axios.
- `lodash` (high, code-injection/prototype-pollution) via `recharts@2.15.4` — latest
  within `^2.12.0`; fix requires recharts 2 → 3 (major, chart API changes).
- `js-cookie`/`editorconfig`/`minimatch` (high/moderate ReDoS) via
  `resend@2.1.0 → @react-email/render → pretty → js-beautify`'s email HTML
  pretty-printer — latest within `^2.0.0`; fix requires resend 2 → 6 (major).

**Decision (user, 2026-07-11):** keep `security-audit` non-blocking
(`continue-on-error: true`) rather than gating merges on the 3 remaining chains right
now. Changed the audit command from `npm audit --audit-level=high` to
`npm audit --omit=dev --audit-level=high` so it reflects actual production risk instead
of mixing in dev-tooling-only vulnerabilities (vite/vitest/webpack-bundle-analyzer's
`ws`, not shipped to users). **Follow-up recommended:** track the razorpay/resend/recharts
major-version migrations as their own task, then revisit flipping this to blocking.

## Explicitly out of scope (removed from the generic checklist — doesn't apply here)

- Mobile/iOS/Android builds, app-store packaging, Docker image publishing — none exist
  in this repo.
- Monorepo path-to-job mapping — this is a single Next.js app.
- Test matrix / multi-OS reduction — already a single job per check, single OS
  (`ubuntu-latest`), no matrix to trim.
- Scheduled workflow review and cron-job.org / Supabase Cron / Cloudflare Cron
  migration — **there are no scheduled GitHub Actions workflows in this repo to
  migrate.** Revisit this section only if a cron workflow is added later.
- Self-hosted runners — not warranted at this project's size.

## Implementation checklist (implement and verify one at a time)

- [x] 1. Add `concurrency` block to `ci.yml` (finding 3)
- [x] 2. Add `permissions: contents: read` to `ci.yml` (finding 5)
- [x] 3. Add `paths-ignore` for docs-only files (finding 4)
- [x] 4. Fix the `e2e` job's missing server start, or disable the job until fixed rather
      than let it keep silently burning minutes on every push (finding 1)
- [x] 5. Remove `deploy-preview` / `deploy-production` placeholder jobs — **only after**
      confirming Netlify's GitHub integration is actually connected (see manual check
      below) (finding 2)
- [x] 6. Decide and set `security-audit`'s `continue-on-error` behavior deliberately
      (finding 6)
- [ ] 7. Enable Dependabot vulnerability alerts in repo settings (finding 8, free, no
      Actions cost)
- [ ] 8. Add branch protection with required status checks on `main` (finding 7)
- [x] 9. (Optional, once the above settle) Note the resulting CI policy briefly in
      `AGENTS.md` so future changes don't reintroduce the same waste

## Manual checks/actions only you can do

**Step 5 verification (2026-07-11):** confirmed programmatically via
`netlify api getSite` rather than the dashboard — `build_settings.provider: "github"`,
`repo_url: "https://github.com/lalrinsangsiama/cirf"` (this exact repo),
`repo_branch: "main"`, `stop_builds: false`, `skip_automatic_builds: null`. Cross-checked
with `netlify api listSiteDeploys`, which shows real `production` deploys on `main`
triggered by the GitHub integration. Netlify's own git integration is confirmed live and
connected, so the placeholder jobs were pure dead weight — removed from `ci.yml`.
One caveat: no pull request has been opened against this repo yet, so a `deploy-preview`
context deploy hasn't been observed directly; `skip_prs` is `null` (not disabled), which
is Netlify's default enabled state for GitHub-connected sites. Recommend confirming a
preview deploy actually appears the first time a real PR is opened.

**Step 7** — GitHub → repo → Settings → Code security → enable "Dependabot alerts" and
"Dependabot security updates." No cost, no Actions minutes for the alerts themselves.

**Step 8** — GitHub → repo → Settings → Branches → Add branch protection rule for
`main` → require status checks to pass before merging → select `Lint`, `Type Check`,
`Unit Tests`, `Build` (skip `E2E Tests` as required until finding 1 is fixed, skip the
deploy jobs since they're being removed/replaced).

# Cultural Innovation Lab (CIL)

Web platform for the Cultural Innovation Lab — assessment tools, framework content,
and resources for cultural innovation practitioners, hosted at
[culturalinnovationlab.org](https://culturalinnovationlab.org).

## Tech stack

- **Framework**: Next.js 16 (App Router)
- **Database / Auth**: Supabase (Postgres)
- **Email**: Resend
- **Analytics**: PostHog
- **Styling**: Tailwind CSS
- **Hosting**: Netlify

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in your values
npm run dev
```

The app runs at `http://localhost:3000`.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve a production build |
| `npm run lint` | Lint with ESLint |
| `npm run test` | Run unit tests (watch mode, Vitest) |
| `npm run test:run` | Run unit tests once |
| `npm run test:coverage` | Run unit tests with coverage |
| `npm run e2e` | Run end-to-end tests (Playwright) |

## Project structure

- `src/app/` — Next.js App Router pages and API routes
- `src/components/` — React components (assessment, survey, auth, forms, site, ui)
- `src/lib/` — Business logic (analytics, assessment scoring, email, validation, Supabase clients)
- `src/lib/config/contact.ts` — Centralized contact info (single source of truth for emails/URLs)
- `supabase/migrations/` — Database migrations

See `CLAUDE.md` / `AGENTS.md` for detailed project conventions and architecture notes.

## Environment variables

See `.env.example` for the full list of required and optional variables (Supabase,
Resend, PostHog, CSRF/admin secrets). Never commit `.env.local` or any file containing
real credentials.

## Deployment

Deployed on Netlify via its GitHub integration — pushes to `main` trigger a production
deploy automatically. CI (lint, type-check, tests, build, e2e) runs via GitHub Actions
on push/PR to `main`; see `.github/workflows/ci.yml`.

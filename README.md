# Halim Quran — Website 2.0

Rebuild of halimquran.com as headless commerce: Next.js frontend + Scalev as
the commerce backend (replacing Plugo). This repository currently contains
only the **initial foundation** — design system, global layout, routing
skeleton, and mock data. See the internal "Website 2.0 HQ" plan for full
scope and phase gating.

## Requirements

- Node.js and npm

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run lint     # lint
```

## Project structure

```
app/          routes (App Router)
components/   ui/ (shadcn), layout/, product/, cart/, checkout/, tracking/, sections/
lib/          scalev/, analytics/, seo/ (all stubs — deferred), utils/, mock-data/
types/        shared TypeScript types
config/       site + nav config
```

## Notes

- **`lib/mock-data/` is placeholder data, not production data.** Product
  names/prices come from a verified live-crawl audit; category assignment
  is inferred, not confirmed.
- `lib/scalev/`, `lib/analytics/`, `lib/seo/`, and the `components/checkout/`,
  `components/tracking/`, `components/sections/` folders are intentional
  stubs — Scalev integration, real analytics/tracking, and CMS/content are
  out of scope for this phase.
- No production credentials belong in this repo. Copy `.env.example` to
  `.env.local` for local development.

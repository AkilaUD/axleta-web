# Axleta website

Marketing site for [Axleta](https://www.axleta.com) — React Router 8, TypeScript, Tailwind CSS v4, SAP Horizon design tokens, prerendered HTML, MDX-style Insights (Markdown + gray-matter).

## Requirements

- Node.js **22+** (see `.nvmrc`)
- npm

## Setup

```bash
npm install
cp .env.example .env
```

Set `VITE_FORMSPREE_FORM_ID` in `.env` (local) and in Vercel project settings (production). Without it, the contact page shows `mailto:info@axleta.com` only.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Route check, production build, prerender, sitemap |
| `npm run start` | Serve production SSR build |
| `npm run typecheck` | React Router typegen + `tsc` |
| `npm run check:routes` | Validate nav hrefs |
| `npm run sitemap` | Write `public/sitemap.xml` |

## Insights content

Add Markdown under `content/insights/` with frontmatter:

```yaml
title:
publishedAt: YYYY-MM-DD
category: ERP | SAP Business One | ...
excerpt:
originalUrl:
```

Re-run `npm run build` so prerender picks up new slugs (also listed in `react-router.config.ts` via `getInsightSlugs()`).

## Deploy (Vercel)

- Framework: Vite / React Router
- Output: React Router server + prerendered `build/client`
- Canonical host: `https://www.axleta.com`
- Redirects: see `vercel.json` (`/about-axleta`, `/contact-axleta`)

## Blogger cutover

After launch, configure **blog.axleta.com** redirects to matching `/insights/:slug` URLs in Blogger settings (not in this repo).

## Images

See [IMAGE_BRIEF.md](./IMAGE_BRIEF.md). Hero uses inline SVG; optional page photos are generated on demand.

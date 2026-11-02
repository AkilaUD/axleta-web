# Implementation summary

## Completed pages

- `/` — Home (photo hero + ProductShell ERP mock, process timeline)
- `/about`, `/contact`, `/privacy`, `/terms`
- `/solutions` hub + 7 solution routes
- `/services` (six anchored sections, sticky in-page nav on large screens)
- `/insights` + 4 articles (Markdown)
- Catch-all 404 with `noindex`

## Stack

- React Router 8 (SSR + **prerender** for marketing routes and Insights slugs)
- Tailwind CSS v4, Inter / Inter Tight, SAP Morning Horizon tokens
- GSAP + ScrollTrigger (`@gsap/react`): hero timeline, scroll reveals, process scrub
- Motion: header shrink, nav drawer, button press feedback
- Formspree contact form (`VITE_FORMSPREE_FORM_ID`)
- JSON-LD: Organization, WebSite, BreadcrumbList, Article

## Integrations

| Item | Status |
|------|--------|
| Formspree | Requires env var |
| Google/SAP partner logos | Text-only until assets supplied |
| Analytics | Not included (v1) |

## Assets

- `public/brand/favicon.svg`, `apple-touch-icon.svg`
- `public/og/default.jpg`
- Photographic heroes in `public/images/` (operations, ERP, cloud, consulting, productivity, automation)
- ProductShell / SystemDiagram for Fiori-style ERP UI mock on home

## QA notes

- `npm run build` succeeds; 19 URLs in sitemap
- Navigation validated via `scripts/check-routes.ts`
- Contrast: primary buttons use ink fill + white label; shell band uses light text on `#354A5F` — spot-check with WebAIM before launch

## Launch checks

- [ ] Vercel env: `VITE_FORMSPREE_FORM_ID`
- [ ] DNS → Vercel, apex → www
- [ ] Blogger 301s for migrated posts
- [ ] Complete [CONTENT_REVIEW.md](./CONTENT_REVIEW.md)

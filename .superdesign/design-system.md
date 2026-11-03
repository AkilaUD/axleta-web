# Axleta Design System

Industrial-editorial marketing site for Axleta — SAP / Google Cloud technology partner. Award-level craft, truthful B2B voice, cool SAP Horizon blue — never generic purple SaaS or cream-serif clichés.

## Brand

- **Name:** Axleta
- **Positioning:** Technology Advancement Partner for SMEs (ERP, cloud, productivity, automation)
- **Tone:** Precise, confident, engineering-honest. No fluff hype.
- **Logo:** Cyan geometric mark + “axleta” wordmark (dark / light variants). Always use the real brand asset — never initials, emoji, or invented marks.

## Color

| Token | Value | Role |
|-------|-------|------|
| `ink` | `#0a1628` | Primary dark surfaces, hero, footer |
| `graphite` | `#12253d` | Elevated dark panels |
| `paper` | `#eef2f6` | Light page ground |
| `paper-2` | `#e2e8f0` | Subtle light secondary |
| `steel` | `#7b8ba0` | Muted labels / meta |
| `oxide` | `#0070F2` | SAP blue — primary CTA / brand accent |
| `oxide-dim` | `#0057d2` | Hover / pressed oxide |
| `signal` | `#c8f542` | Lime highlight — hero accent / status only |

Rules: ink↔paper contrast is structural. Oxide for actions and brand, not large fills. Signal sparingly (one accent per composition).

## Typography

- **Display / UI sans:** Inter Tight — tight tracking (−0.03 to −0.045em), heavy weights for headlines
- **Serif accent:** Instrument Serif — italic pull-quotes / footer positioning only
- **Mono / labels:** JetBrains Mono — uppercase micro-labels, CTAs, nav (`tracking ~0.12em`)
- Scale: display clamp ~2.5–4.75rem; h1/h2 stepped; body ~1.0625–1.125rem

## Layout & shape

- Max content width: `90rem`; horizontal padding `clamp(1.25rem, 4vw, 2.5rem)`
- Buttons: full pill (`rounded-full`); cards default **no** radius / no soft card chrome unless interactive
- Fixed header over content; optional left spine section index on home
- Grain overlays on ink/paper stages; subtle engineering texture — not noise for its own sake

## Motion

- GSAP + ScrollTrigger + Lenis smooth scroll; Motion for micro-interactions
- Magnetic primary CTAs; custom cursor states (VIEW / OPEN / DRAG)
- Prefer intentional 2–3 hero motions over constant animation
- Respect `prefers-reduced-motion`

## Composition (marketing)

- Brand-first hero: product name / brand is hero-level; one headline, one support line, one CTA group, one dominant visual (globe)
- Full-bleed / edge-dominant hero visual — no inset media cards in hero
- One job per section; avoid pill clusters, stat strips, and purple-gradient AI defaults
- Partner marks (Google Cloud / SAP) as quiet trust, not logo walls in the first viewport

## Components (patterns)

- `MagneticButton` / `Button` — mono uppercase pills, oxide primary
- `PageHero` — ink or paper tone, optional full-bleed image + gradient
- `SiteHeader` — logo + mix-blend nav + oxide “Let’s talk” CTA; mega menus for Solutions/Services
- `SiteFooter` — ink, serif positioning line, column links, legal disclaimer
- Home sections: Hero (globe), Ledger, SpecSheet, ExplodedView, Dial, Principles, Partners, Insights, CtaBlock

# Theme

## Part 1 — Compact token summary

**Brand:** industrial-editorial; SAP Horizon oxide `#0070F2`; paper/ink/signal lime palette.

### Colors (@theme in `app/app.css`)
- paper `#eef2f6`, paper-2 `#e2e8f0`
- ink `#0a1628`, graphite `#12253d`, steel `#7b8ba0`
- oxide `#0070f2`, oxide-dim `#0057d2`, signal `#c8f542`
- Legacy aliases: text, text-muted, surface, background, border, brand, brand-hover, brand-soft, accent-warm, shell, shell-deep, negative

### Typography
- sans/display/heading: Inter Tight
- serif: Instrument Serif
- mono: JetBrains Mono
- Utilities: text-display, text-h1–h3, text-body-lg, text-small, text-label, text-eyebrow, font-display, font-serif, font-mono

### Radius
- button: 9999px (pill); card/none: 0

### Layout / motion notes
- Max content width ~90rem; horizontal padding `clamp(1.25rem,4vw,2.5rem)`
- Lenis smooth scroll; grain overlays; hero/product-window utility classes
- No separate tailwind.config — Tailwind v4 `@theme` + `@utility` in app.css

## Part 2 — Raw CSS source

### `app/app.css` (full)

```css
@import "tailwindcss";
@import "lenis/dist/lenis.css";
@import "@fontsource/inter-tight/400.css";
@import "@fontsource/inter-tight/500.css";
@import "@fontsource/inter-tight/600.css";
@import "@fontsource/inter-tight/700.css";
@import "@fontsource/inter-tight/800.css";
@import "@fontsource/instrument-serif/400.css";
@import "@fontsource/instrument-serif/400-italic.css";
@import "@fontsource/jetbrains-mono/400.css";
@import "@fontsource/jetbrains-mono/500.css";

@theme {
  /* SAP Horizon–inspired cool industrial palette */
  --color-paper: #eef2f6;
  --color-paper-2: #e2e8f0;
  --color-ink: #0a1628;
  --color-graphite: #12253d;
  --color-steel: #7b8ba0;
  --color-oxide: #0070f2; /* SAP blue accent */
  --color-oxide-dim: #0057d2;
  --color-signal: #c8f542; /* lime highlight (hero accent / status) */

  /* Legacy aliases — keep intermediate pages readable during redesign */
  --color-text: var(--color-ink);
  --color-text-muted: color-mix(in srgb, var(--color-ink) 70%, transparent);
  --color-surface: var(--color-paper);
  --color-background: var(--color-paper);
  --color-border: color-mix(in srgb, var(--color-steel) 35%, transparent);
  --color-brand: var(--color-oxide);
  --color-brand-hover: var(--color-oxide-dim);
  --color-brand-soft: color-mix(in srgb, var(--color-oxide) 12%, var(--color-paper));
  --color-accent-warm: var(--color-oxide);
  --color-shell: var(--color-graphite);
  --color-shell-deep: var(--color-ink);
  --color-negative: var(--color-oxide-dim);

  --font-sans: "Inter Tight", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Inter Tight", ui-sans-serif, system-ui, sans-serif;
  --font-heading: "Inter Tight", ui-sans-serif, system-ui, sans-serif;
  --font-serif: "Instrument Serif", ui-serif, Georgia, serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  --radius-button: 9999px;
  --radius-card: 0;
  --radius-none: 0;
}

@layer base {
  html {
    scroll-padding-top: 5rem;
  }

  html.lenis,
  html.lenis body {
    height: auto;
  }

  .lenis.lenis-smooth {
    scroll-behavior: auto !important;
  }

  .lenis.lenis-smooth [data-lenis-prevent] {
    overscroll-behavior: contain;
  }

  .lenis.lenis-stopped {
    overflow: hidden;
  }

  body {
    @apply bg-paper text-ink font-sans antialiased;
    font-size: 1.0625rem;
    line-height: 1.55;
  }

  :focus-visible {
    outline: 2px solid var(--color-oxide);
    outline-offset: 3px;
  }

  ::selection {
    background: color-mix(in srgb, var(--color-oxide) 28%, var(--color-paper));
    color: var(--color-ink);
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
  }
}

@utility bg-paper {
  background-color: var(--color-paper);
}

@utility bg-paper-2 {
  background-color: var(--color-paper-2);
}

@utility bg-ink {
  background-color: var(--color-ink);
}

@utility bg-graphite {
  background-color: var(--color-graphite);
}

@utility bg-oxide {
  background-color: var(--color-oxide);
}

@utility bg-background {
  background-color: var(--color-background);
}

@utility bg-surface {
  background-color: var(--color-surface);
}

@utility text-ink {
  color: var(--color-ink);
}

@utility text-paper {
  color: var(--color-paper);
}

@utility text-steel {
  color: var(--color-steel);
}

@utility text-oxide {
  color: var(--color-oxide);
}

@utility text-text {
  color: var(--color-text);
}

@utility text-muted {
  color: var(--color-text-muted);
}

@utility font-display {
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 0.88;
}

@utility font-serif {
  font-family: var(--font-serif);
}

@utility font-mono {
  font-family: var(--font-mono);
}

@utility text-display {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5.5vw + 0.4rem, 4.75rem);
  font-weight: 700;
  line-height: 0.92;
  letter-spacing: -0.04em;
}

@utility text-h1 {
  font-family: var(--font-display);
  font-size: clamp(1.95rem, 2.9vw + 0.55rem, 3rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.032em;
}

@utility text-h2 {
  font-family: var(--font-display);
  font-size: clamp(1.45rem, 1.7vw + 0.65rem, 1.95rem);
  font-weight: 700;
  line-height: 1.12;
  letter-spacing: -0.022em;
}

@utility text-h3 {
  font-family: var(--font-display);
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.35;
}

@utility text-body-lg {
  font-size: 1.125rem;
  line-height: 1.55;
}

@utility text-small {
  font-size: 0.875rem;
  line-height: 1.5;
}

@utility text-label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

@utility text-eyebrow {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-oxide);
}

@utility border-hairline {
  border-color: color-mix(in srgb, var(--color-steel) 30%, transparent);
}

@utility border-subtle {
  border-color: color-mix(in srgb, var(--color-steel) 30%, transparent);
}

/* Engineering grain overlay */
.grain {
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 1;
  opacity: 0.06;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 180px 180px;
}

.grain--paper {
  mix-blend-mode: multiply;
}

.grain--ink {
  mix-blend-mode: screen;
}

/* Legacy class used by current home hero */
.noise {
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E");
  background-size: 180px 180px;
  mix-blend-mode: soft-light;
}

/* 12-column engineering grid — toggle with G */
.site-grid {
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 60;
  display: none;
  grid-template-columns: repeat(12, 1fr);
  gap: 0;
  padding-inline: clamp(1rem, 4vw, 2.5rem);
  max-width: 90rem;
  margin-inline: auto;
  left: 0;
  right: 0;
}

.site-grid.is-visible {
  display: grid;
}

.site-grid span {
  border-left: 1px solid color-mix(in srgb, var(--color-oxide) 22%, transparent);
  height: 100%;
}

.site-grid span:last-child {
  border-right: 1px solid color-mix(in srgb, var(--color-oxide) 22%, transparent);
}

.hairline {
  border-color: color-mix(in srgb, var(--color-steel) 30%, transparent);
}

.link-draw {
  background-image: linear-gradient(var(--color-oxide), var(--color-oxide));
  background-position: 0 100%;
  background-repeat: no-repeat;
  background-size: 0% 1px;
  transition: background-size 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.link-draw:hover {
  background-size: 100% 1px;
}

.photo-scrim {
  background: linear-gradient(
    108deg,
    color-mix(in srgb, var(--color-ink) 90%, transparent) 0%,
    color-mix(in srgb, var(--color-graphite) 74%, transparent) 42%,
    color-mix(in srgb, var(--color-graphite) 28%, transparent) 100%
  );
}

.hero-scrim {
  background:
    linear-gradient(
      180deg,
      color-mix(in srgb, var(--color-ink) 45%, transparent) 0%,
      transparent 28%,
      color-mix(in srgb, var(--color-ink) 55%, transparent) 62%,
      color-mix(in srgb, var(--color-ink) 88%, transparent) 100%
    ),
    linear-gradient(
      90deg,
      color-mix(in srgb, var(--color-ink) 70%, transparent) 0%,
      transparent 55%
    );
}

.hero-stage {
  min-height: 100svh;
}

.mesh-soft {
  pointer-events: none;
  background:
    radial-gradient(
      900px 420px at 8% -10%,
      color-mix(in srgb, var(--color-oxide) 8%, transparent),
      transparent 60%
    ),
    radial-gradient(
      700px 360px at 92% 110%,
      color-mix(in srgb, var(--color-oxide) 6%, transparent),
      transparent 55%
    );
}

.capability-row::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  background: var(--color-oxide);
  transition: width 280ms cubic-bezier(0.22, 1, 0.36, 1);
}

.capability-row:hover::before {
  width: 3px;
}

.product-window {
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--color-paper) 18%, transparent);
  background: var(--color-graphite);
  will-change: transform;
}

.product-window__chrome {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 0.85rem;
  background: color-mix(in srgb, var(--color-ink) 92%, var(--color-oxide));
  border-bottom: 1px solid color-mix(in srgb, var(--color-paper) 8%, transparent);
}

.product-window__dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--color-paper) 25%, transparent);
}

.prose-axleta {
  color: var(--color-ink);
  max-width: 62ch;
}

.prose-axleta h2 {
  font-family: var(--font-display);
  font-size: clamp(1.3rem, 1.3vw + 0.9rem, 1.55rem);
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  letter-spacing: -0.02em;
}

.prose-axleta h3 {
  font-family: var(--font-display);
  font-size: 1.125rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

.prose-axleta p {
  margin-bottom: 1rem;
}

.prose-axleta ul,
.prose-axleta ol {
  margin-bottom: 1rem;
  padding-left: 1.25rem;
}

.prose-axleta li {
  margin-bottom: 0.35rem;
}

.prose-axleta a {
  color: var(--color-oxide-dim);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.prose-axleta blockquote {
  border-left: 1px solid var(--color-oxide);
  padding-left: 1rem;
  font-family: var(--font-serif);
  font-style: italic;
  color: color-mix(in srgb, var(--color-ink) 70%, transparent);
  margin: 1.5rem 0;
}

.prose-axleta code {
  font-family: var(--font-mono);
  font-size: 0.85em;
  background: var(--color-paper-2);
  padding: 0.1em 0.35em;
}

.prose-axleta pre {
  background: var(--color-paper-2);
  border: 1px solid color-mix(in srgb, var(--color-steel) 30%, transparent);
  padding: 1rem;
  overflow-x: auto;
  margin-bottom: 1rem;
}
```

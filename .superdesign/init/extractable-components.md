# Extractable components catalog

Menu of reusable DraftComponent candidates. Full source for UI primitives is in `components.md`; layout shell in `layouts.md`.

## Layout components

### SiteLayout
- Source: `app/components/layout/SiteLayout.tsx`
- Category: layout
- Description: App shell: Preloader, PageTransition, Cursor, header, Outlet, footer, grid.
- Extractable props: (none — composes children via Outlet)
- Hardcoded: brand logo SVG, nav labels, CSS classes, GSAP/motion timings

### SiteHeader
- Source: `app/components/layout/SiteHeader.tsx`
- Category: layout
- Description: Fixed header, logo, desktop/mobile nav, mega menu state.
- Extractable props: megaKind, activeId (internal state); uses primaryNav from data
- Hardcoded: brand logo SVG, nav labels, CSS classes, GSAP/motion timings

### SiteFooter
- Source: `app/components/layout/SiteFooter.tsx`
- Category: layout
- Description: Ink footer with link columns, contact, legal.
- Extractable props: (none — content from ~/data/navigation and ~/lib/content)
- Hardcoded: brand logo SVG, nav labels, CSS classes, GSAP/motion timings

### DesktopNav
- Source: `app/components/layout/DesktopNav.tsx`
- Category: layout
- Description: Desktop nav links + mega toggles + CTA.
- Extractable props: items, megaOpen, megaKind, onToggleMega, onCloseMega, linksOnly?, ctaOnly?
- Hardcoded: brand logo SVG, nav labels, CSS classes, GSAP/motion timings

### MobileNav
- Source: `app/components/layout/MobileNav.tsx`
- Category: layout
- Description: Full-screen animated mobile menu.
- Extractable props: items (NavItem[])
- Hardcoded: brand logo SVG, nav labels, CSS classes, GSAP/motion timings

### MegaMenu
- Source: `app/components/layout/MegaMenu.tsx`
- Category: layout
- Description: Solutions/services mega overlay with schematic preview.
- Extractable props: open, kind, activeId, onActiveId, onClose
- Hardcoded: brand logo SVG, nav labels, CSS classes, GSAP/motion timings

### SkipLink
- Source: `app/components/layout/SkipLink.tsx`
- Category: layout
- Description: Accessibility skip link to #main.
- Extractable props: (none)
- Hardcoded: brand logo SVG, nav labels, CSS classes, GSAP/motion timings

### Spine
- Source: `app/components/layout/Spine.tsx`
- Category: layout
- Description: Fixed section spine / scroll progress for long pages.
- Extractable props: nodes?: SpineNode[]
- Hardcoded: brand logo SVG, nav labels, CSS classes, GSAP/motion timings

### CtaBlock
- Source: `app/components/sections/CtaBlock.tsx`
- Category: layout
- Description: Full-bleed oxide CTA band used on most marketing pages.
- Extractable props: (none — copy from site content)
- Hardcoded: brand logo SVG, nav labels, CSS classes, GSAP/motion timings

### PageHero
- Source: `app/components/ui/PageHero.tsx`
- Category: layout
- Description: Interior page hero with breadcrumbs and optional image.
- Extractable props: crumbs, eyebrow?, title, description?, tone?, imageSrc?, imageAlt?, children?
- Hardcoded: brand logo SVG, nav labels, CSS classes, GSAP/motion timings

## Basic components

### Button
- Source: `app/components/ui/Button.tsx`
- Category: basic
- Description: Primary/secondary/ghost/link button + LinkButton.
- Extractable props: variant?, className?, type?, disabled?, loading?, onClick? / to for LinkButton
- Hardcoded: field labels, validation copy, Formspree env id, styling tokens

### MagneticButton
- Source: `app/components/ui/MagneticButton.tsx`
- Category: basic
- Description: Oxide pill CTA with magnetic hover.
- Extractable props: to?, href?, type?, onClick?, strength?, cursor?, className?, children
- Hardcoded: field labels, validation copy, Formspree env id, styling tokens

### LinkArrow
- Source: `app/components/ui/LinkArrow.tsx`
- Category: basic
- Description: Mono link with draw underline and arrow.
- Extractable props: to, children, className?, external?
- Hardcoded: field labels, validation copy, Formspree env id, styling tokens

### Container
- Source: `app/components/ui/Container.tsx`
- Category: basic
- Description: Max-width page gutter wrapper.
- Extractable props: children, className?, as?, narrow?
- Hardcoded: field labels, validation copy, Formspree env id, styling tokens

### SectionHeading
- Source: `app/components/ui/SectionHeading.tsx`
- Category: basic
- Description: Eyebrow + title + description block.
- Extractable props: eyebrow?, title, description?, as?, align?
- Hardcoded: field labels, validation copy, Formspree env id, styling tokens

### Eyebrow
- Source: `app/components/ui/Eyebrow.tsx`
- Category: basic
- Description: Mono oxide eyebrow with rule.
- Extractable props: children, className?
- Hardcoded: field labels, validation copy, Formspree env id, styling tokens

### AccordionItem
- Source: `app/components/ui/Accordion.tsx`
- Category: basic
- Description: Single accordion row with motion panel.
- Extractable props: title, children, defaultOpen?
- Hardcoded: field labels, validation copy, Formspree env id, styling tokens

### Breadcrumbs
- Source: `app/components/ui/Breadcrumbs.tsx`
- Category: basic
- Description: Breadcrumb trail.
- Extractable props: items: Crumb[]
- Hardcoded: field labels, validation copy, Formspree env id, styling tokens

### Prose
- Source: `app/components/ui/Prose.tsx`
- Category: basic
- Description: Typography wrapper using prose-axleta.
- Extractable props: children, className?, large?
- Hardcoded: field labels, validation copy, Formspree env id, styling tokens

### ResponsiveImage
- Source: `app/components/ui/ResponsiveImage.tsx`
- Category: basic
- Description: Lazy/eager responsive img.
- Extractable props: src, alt, width, height, sizes?, priority?, className?
- Hardcoded: field labels, validation copy, Formspree env id, styling tokens

### Marquee
- Source: `app/components/ui/Marquee.tsx`
- Category: basic
- Description: GSAP horizontal ticker.
- Extractable props: items, className?, duration?
- Hardcoded: field labels, validation copy, Formspree env id, styling tokens

### BrandMark
- Source: `app/components/ui/BrandMark.tsx`
- Category: basic
- Description: Compact logo mark.
- Extractable props: className?
- Hardcoded: field labels, validation copy, Formspree env id, styling tokens

### ContactForm
- Source: `app/components/contact/ContactForm.tsx`
- Category: basic
- Description: Formspree enquiry form with interest select.
- Extractable props: initialInterest?: ContactInterest
- Hardcoded: field labels, validation copy, Formspree env id, styling tokens


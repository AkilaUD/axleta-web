# Page dependency trees

Traced local `~/` imports recursively (node_modules skipped). Layout shell (`SiteLayout`, header/footer) comes from parent route `app/routes/site-layout.tsx`.

## / (Home)
Entry: `app/routes/home.tsx`
Dependencies:
- app/components/seo/JsonLd.tsx
- app/components/layout/Spine.tsx
  - app/lib/gsap-setup.ts
  - app/lib/lenis.tsx
    - app/hooks/usePrefersReducedMotion.ts
- app/components/sections/Hero.tsx
  - app/lib/preloader.tsx
  - app/lib/content.ts
  - app/components/ui/MagneticButton.tsx
  - app/components/sections/HeroGlobe.tsx
    - app/data/globe-hubs.ts
    - app/components/sections/HeroGlobeScene.tsx
      - app/lib/globe-math.ts
- app/components/sections/Ledger.tsx
- app/components/sections/SpecSheet.tsx
  - app/data/images.ts
- app/components/sections/ExplodedView.tsx
- app/components/sections/Dial.tsx
  - app/components/svg/Bearing.tsx
- app/components/sections/Principles.tsx
- app/components/sections/Partners.tsx
  - app/components/sections/PartnerBadges.tsx
- app/components/sections/InsightsIndex.tsx
  - app/components/ui/LinkArrow.tsx
- app/components/sections/CtaBlock.tsx
- app/lib/insights.server.ts
- app/lib/meta.ts
  - app/data/site.ts
- app/lib/seo.ts

## /about (About)
Entry: `app/routes/about.tsx`
Dependencies:
- app/components/ui/PageHero.tsx
  - app/components/ui/Breadcrumbs.tsx
- app/components/ui/Button.tsx
- app/components/sections/CtaBlock.tsx
  - app/lib/gsap-setup.ts
  - app/lib/content.ts
  - app/components/ui/MagneticButton.tsx
    - app/hooks/usePrefersReducedMotion.ts
  - app/components/ui/LinkArrow.tsx
- app/data/images.ts
- app/data/site.ts
- app/lib/meta.ts
- app/lib/seo.ts
- app/components/seo/JsonLd.tsx

## /solutions (Solutions hub)
Entry: `app/routes/solutions._index.tsx`
Dependencies:
- app/components/ui/PageHero.tsx
  - app/components/ui/Breadcrumbs.tsx
- app/components/sections/CtaBlock.tsx
  - app/lib/gsap-setup.ts
  - app/lib/content.ts
  - app/components/ui/MagneticButton.tsx
    - app/hooks/usePrefersReducedMotion.ts
  - app/components/ui/LinkArrow.tsx
- app/data/solutions.ts
- app/lib/meta.ts
  - app/data/site.ts

## /services (Services)
Entry: `app/routes/services.tsx`
Dependencies:
- app/components/ui/Button.tsx
- app/components/ui/PageHero.tsx
  - app/components/ui/Breadcrumbs.tsx
- app/components/sections/CtaBlock.tsx
  - app/lib/gsap-setup.ts
  - app/lib/content.ts
  - app/components/ui/MagneticButton.tsx
    - app/hooks/usePrefersReducedMotion.ts
  - app/components/ui/LinkArrow.tsx
- app/data/services.ts
- app/lib/meta.ts
  - app/data/site.ts

## /contact (Contact)
Entry: `app/routes/contact.tsx`
Dependencies:
- app/components/contact/ContactForm.tsx
  - app/components/ui/Button.tsx
- app/data/site.ts
- app/lib/meta.ts
- app/components/ui/LinkArrow.tsx

## /insights (Insights index)
Entry: `app/routes/insights._index.tsx`
Dependencies:
- app/components/ui/PageHero.tsx
  - app/components/ui/Breadcrumbs.tsx
- app/components/ui/Button.tsx
- app/components/sections/CtaBlock.tsx
  - app/lib/gsap-setup.ts
  - app/lib/content.ts
  - app/components/ui/MagneticButton.tsx
    - app/hooks/usePrefersReducedMotion.ts
  - app/components/ui/LinkArrow.tsx
- app/lib/meta.ts
  - app/data/site.ts

## Shared layout (all routes above)
Entry: `app/routes/site-layout.tsx`
Dependencies:
- app/components/layout/SiteLayout.tsx
  - app/components/layout/SkipLink.tsx
  - app/components/layout/SiteFooter.tsx
    - app/lib/content.ts
    - app/components/svg/Logo.tsx
    - app/components/ui/LinkArrow.tsx
  - app/components/layout/SiteHeader.tsx
    - app/data/navigation.ts
    - app/components/layout/DesktopNav.tsx
      - app/components/ui/MagneticButton.tsx
        - app/hooks/usePrefersReducedMotion.ts
    - app/components/layout/MobileNav.tsx
      - app/hooks/useLockBodyScroll.ts
    - app/components/layout/MegaMenu.tsx
    - app/components/svg/schematics/MegaPreviews.tsx
  - app/components/layout/GridOverlay.tsx
  - app/components/layout/Preloader.tsx
    - app/lib/gsap-setup.ts
  - app/components/layout/Cursor.tsx
  - app/components/layout/PageTransition.tsx
  - app/lib/lenis.tsx
  - app/lib/preloader.tsx

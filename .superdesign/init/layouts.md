# Layout components

Industrial-editorial shell: fixed header with mega menu, ink footer, Lenis scroll, optional spine on home.

## SiteLayout
- Path: `app/components/layout/SiteLayout.tsx`

```tsx
import { Outlet } from "react-router";
import { SkipLink } from "~/components/layout/SkipLink";
import { SiteFooter } from "~/components/layout/SiteFooter";
import { SiteHeader } from "~/components/layout/SiteHeader";
import { GridOverlay } from "~/components/layout/GridOverlay";
import { Preloader } from "~/components/layout/Preloader";
import { Cursor } from "~/components/layout/Cursor";
import { PageTransition } from "~/components/layout/PageTransition";
import { LenisProvider } from "~/lib/lenis";
import { PreloaderProvider } from "~/lib/preloader";

export function SiteLayout() {
  return (
    <PreloaderProvider>
      <LenisProvider>
        <SkipLink />
        <Preloader />
        <PageTransition />
        <Cursor />
        <SiteHeader />
        <Outlet />
        <SiteFooter />
        <GridOverlay />
      </LenisProvider>
    </PreloaderProvider>
  );
}
```

## SiteHeader
- Path: `app/components/layout/SiteHeader.tsx`

```tsx
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { primaryNav } from "~/data/navigation";
import { Logo } from "~/components/svg/Logo";
import { DesktopNav } from "~/components/layout/DesktopNav";
import { MobileNav } from "~/components/layout/MobileNav";
import { MegaMenu } from "~/components/layout/MegaMenu";
import { useLockBodyScroll } from "~/hooks/useLockBodyScroll";
import type { MegaSchematicId } from "~/components/svg/schematics/MegaPreviews";

export function SiteHeader() {
  const [megaKind, setMegaKind] = useState<"solutions" | "services" | null>(
    null,
  );
  const [activeId, setActiveId] = useState<MegaSchematicId>("erp");
  const megaOpen = megaKind !== null;
  useLockBodyScroll(megaOpen);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMegaKind(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function toggleMega(kind: "solutions" | "services") {
    setMegaKind((current) => (current === kind ? null : kind));
  }

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        {/* Keeps logo clear of pinned section titles underneath */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-ink)_92%,transparent)_0%,color-mix(in_srgb,var(--color-ink)_55%,transparent)_55%,transparent_100%)]"
          aria-hidden
        />
        <div className="relative mx-auto flex min-h-[4.5rem] max-w-[90rem] items-center justify-between gap-4 px-[clamp(1.25rem,4vw,2.5rem)]">
          {/* Logo stays outside mix-blend so cyan artwork is preserved */}
          <Link
            to="/"
            onClick={() => setMegaKind(null)}
            aria-label="Axleta home"
            className="pointer-events-auto relative z-[1] shrink-0 rounded-sm bg-ink/80 px-1.5 py-1 backdrop-blur-sm"
          >
            <Logo variant="nav" />
          </Link>

          <div className="pointer-events-auto flex items-center gap-2">
            <div className="mix-blend-difference text-paper">
              <DesktopNav
                items={primaryNav}
                megaOpen={megaOpen}
                megaKind={megaKind}
                onToggleMega={toggleMega}
                onCloseMega={() => setMegaKind(null)}
                linksOnly
              />
            </div>
            <div className="hidden lg:block">
              <DesktopNav
                items={primaryNav}
                megaOpen={megaOpen}
                megaKind={megaKind}
                onToggleMega={toggleMega}
                onCloseMega={() => setMegaKind(null)}
                ctaOnly
              />
            </div>
            <div className="mix-blend-difference text-paper lg:hidden">
              <MobileNav items={primaryNav} />
            </div>
          </div>
        </div>
      </header>

      <MegaMenu
        open={megaOpen}
        kind={megaKind}
        activeId={activeId}
        onActiveId={setActiveId}
        onClose={() => setMegaKind(null)}
      />
    </>
  );
}
```

## SiteFooter
- Path: `app/components/layout/SiteFooter.tsx`

```tsx
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { site, legalDisclaimer } from "~/lib/content";
import {
  footerCompany,
  footerServices,
  footerSolutions,
} from "~/data/navigation";
import { Logo } from "~/components/svg/Logo";
import { LinkArrow } from "~/components/ui/LinkArrow";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink pb-[env(safe-area-inset-bottom)] text-paper">
      <div className="grain grain--ink" aria-hidden />
      <div className="relative z-[1] mx-auto max-w-[90rem] px-[clamp(1.25rem,4vw,2.5rem)] pt-20">
        <div className="mb-16 flex flex-col gap-8 border-b border-[color-mix(in_srgb,var(--color-steel)_30%,transparent)] pb-10 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <Link to="/" aria-label="Axleta home">
              <Logo variant="footer" />
            </Link>
            <p className="max-w-md font-serif text-xl italic text-paper/75">
              {site.positioning}
            </p>
          </div>
          <BramptonClock />
        </div>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <FooterColumn title="Solutions" items={footerSolutions} />
          <FooterColumn title="Services" items={footerServices} />
          <FooterColumn title="Company" items={footerCompany} />
          <div>
            <p className="text-label mb-4 text-steel">Contact</p>
            <ul className="space-y-3 text-sm text-paper/70">
              <li>
                {site.address.label} — {site.address.line1}, {site.address.city}
                , {site.address.region} {site.address.postal}
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="link-draw text-paper"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <LinkArrow
                  to={site.linkedIn}
                  external
                  className="text-paper/80"
                >
                  LinkedIn
                </LinkArrow>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 space-y-3 border-t border-[color-mix(in_srgb,var(--color-steel)_30%,transparent)] py-8 text-sm text-paper/55">
          <p className="max-w-3xl leading-relaxed">{legalDisclaimer}</p>
          <div className="flex flex-wrap gap-4 text-label">
            <Link to="/privacy" className="link-draw">
              Privacy
            </Link>
            <Link to="/terms" className="link-draw">
              Terms
            </Link>
            <span>
              © {year} {site.name}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="text-label mb-4 text-steel">{title}</p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              to={item.href}
              className="text-sm text-paper/65 transition-colors hover:text-paper link-draw"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BramptonClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const format = () => {
      const formatted = new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Toronto",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date());
      setTime(formatted);
    };
    format();
    const id = window.setInterval(format, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p className="text-label text-steel" suppressHydrationWarning>
      Brampton, ON — local time{time ? ` ${time}` : ""}
    </p>
  );
}
```

## DesktopNav
- Path: `app/components/layout/DesktopNav.tsx`

```tsx
import { Link, useLocation } from "react-router";
import type { NavItem } from "~/data/navigation";
import { MagneticButton } from "~/components/ui/MagneticButton";

type DesktopNavProps = {
  items: NavItem[];
  megaOpen: boolean;
  megaKind: "solutions" | "services" | null;
  onToggleMega: (kind: "solutions" | "services") => void;
  onCloseMega: () => void;
  /** Render only links (for mix-blend shell) */
  linksOnly?: boolean;
  /** Render only the CTA (outside mix-blend) */
  ctaOnly?: boolean;
};

export function DesktopNav({
  items,
  megaOpen,
  megaKind,
  onToggleMega,
  onCloseMega,
  linksOnly = false,
  ctaOnly = false,
}: DesktopNavProps) {
  const location = useLocation();

  if (ctaOnly) {
    return (
      <MagneticButton to="/contact?interest=general">
        Let’s Talk →
      </MagneticButton>
    );
  }

  return (
    <ul className="hidden items-center gap-1 lg:flex">
      {items.map((item) => {
        if (item.label === "Solutions" || item.label === "Services") {
          const kind = item.label.toLowerCase() as "solutions" | "services";
          const expanded = megaOpen && megaKind === kind;
          return (
            <li key={item.label}>
              <button
                type="button"
                aria-expanded={expanded}
                aria-haspopup="dialog"
                onClick={() => onToggleMega(kind)}
                className={`text-label px-3 py-2 transition-opacity ${
                  expanded ? "opacity-100 underline" : "opacity-70 hover:opacity-100"
                }`}
              >
                {item.label}
              </button>
            </li>
          );
        }

        const active =
          location.pathname === item.href ||
          (item.href !== "/" && location.pathname.startsWith(item.href));

        return (
          <li key={item.href}>
            <Link
              to={item.href}
              aria-current={active ? "page" : undefined}
              onClick={onCloseMega}
              className={`text-label px-3 py-2 transition-opacity ${
                active ? "opacity-100" : "opacity-70 hover:opacity-100"
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
      {linksOnly ? null : (
        <li className="ml-4">
          <MagneticButton to="/contact?interest=general">
            Talk to Axleta
          </MagneticButton>
        </li>
      )}
    </ul>
  );
}
```

## MobileNav
- Path: `app/components/layout/MobileNav.tsx`

```tsx
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import type { NavItem } from "~/data/navigation";
import { useLockBodyScroll } from "~/hooks/useLockBodyScroll";
import { MagneticButton } from "~/components/ui/MagneticButton";

type MobileNavProps = {
  items: NavItem[];
};

export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  useLockBodyScroll(open);
  const location = useLocation();

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="text-label inline-flex min-h-11 min-w-11 items-center justify-center border border-current/30 px-3"
        onClick={() => setOpen(true)}
      >
        Menu
      </button>
      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-nav"
            className="fixed inset-0 z-50 flex flex-col bg-ink text-paper"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center justify-between px-5 pt-6">
              <span className="text-label text-steel">Navigation</span>
              <button
                type="button"
                className="text-label min-h-11 px-2"
                onClick={() => setOpen(false)}
              >
                Close ✕
              </button>
            </div>
            <ul className="flex flex-1 flex-col justify-center px-5">
              {items.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.4 }}
                  className="border-b border-[color-mix(in_srgb,var(--color-steel)_25%,transparent)]"
                >
                  <Link
                    to={item.href}
                    className="font-display block py-3 text-[12vw] leading-[0.9] font-semibold tracking-[-0.04em]"
                    onClick={() => setOpen(false)}
                    aria-current={
                      location.pathname === item.href ? "page" : undefined
                    }
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              <MagneticButton
                to="/contact?interest=general"
                className="w-full"
              >
                Talk to Axleta
              </MagneticButton>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
```

## SkipLink
- Path: `app/components/layout/SkipLink.tsx`

```tsx
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-paper focus:px-4 focus:py-2 focus:font-mono focus:text-[0.7rem] focus:tracking-[0.12em] focus:text-ink focus:uppercase"
    >
      Skip to main content
    </a>
  );
}
```

## Spine
- Path: `app/components/layout/Spine.tsx`

```tsx
import { useRef, useState } from "react";
import { ensureGsap } from "~/lib/gsap-setup";
import { useLenis } from "~/lib/lenis";
import { usePrefersReducedMotion } from "~/hooks/usePrefersReducedMotion";

export type SpineNode = {
  id: string;
  label: string;
  /** Visual theme for the track while this section is active. */
  theme?: "ink" | "paper" | "oxide";
};

type SpineProps = {
  nodes?: SpineNode[];
};

const DEFAULT_NODES: SpineNode[] = [
  { id: "hero", label: "01 — HERO", theme: "ink" },
  { id: "ledger", label: "02 — LEDGER", theme: "paper" },
  { id: "spec", label: "03 — SPEC", theme: "ink" },
  { id: "exploded", label: "04 — ERP", theme: "paper" },
  { id: "dial", label: "05 — DIAL", theme: "ink" },
  { id: "principles", label: "06 — WHY", theme: "paper" },
  { id: "partners", label: "07 — PARTNERS", theme: "ink" },
  { id: "insights-index", label: "08 — INDEX", theme: "paper" },
  { id: "cta", label: "09 — CTA", theme: "oxide" },
];

/** Fixed axle spine — dots only, theme-aware so they never read as page artifacts. */
export function Spine({ nodes = DEFAULT_NODES }: SpineProps) {
  const fillDesktop = useRef<HTMLDivElement>(null);
  const fillMobile = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(nodes[0]?.id ?? null);
  const { scrollTo } = useLenis();
  const reduced = usePrefersReducedMotion();
  const { gsap, useGSAP, ScrollTrigger } = ensureGsap();

  const activeNode = nodes.find((n) => n.id === active) ?? nodes[0];
  const theme = activeNode?.theme ?? "ink";
  /** On oxide CTA use ink-colored dots so they don't read as white glitches. */
  const onOxide = theme === "oxide";

  useGSAP(
    () => {
      if (reduced) return;

      if (fillDesktop.current) {
        gsap.fromTo(
          fillDesktop.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: document.documentElement,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.4,
            },
          },
        );
      }

      if (fillMobile.current) {
        gsap.fromTo(
          fillMobile.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: document.documentElement,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.4,
            },
          },
        );
      }

      const triggers = nodes
        .map((node) => {
          const el = document.getElementById(node.id);
          if (!el) return null;
          return ScrollTrigger.create({
            trigger: el,
            start: "top center",
            end: "bottom center",
            onToggle: (self) => {
              if (self.isActive) setActive(node.id);
            },
          });
        })
        .filter(Boolean);

      return () => {
        triggers.forEach((t) => t?.kill());
      };
    },
    { dependencies: [reduced, nodes] },
  );

  const trackTone = onOxide
    ? "bg-ink/25"
    : theme === "paper"
      ? "bg-[color-mix(in_srgb,var(--color-ink)_18%,transparent)]"
      : "bg-[color-mix(in_srgb,var(--color-steel)_35%,transparent)]";

  return (
    <>
      <div
        className="pointer-events-none fixed top-0 right-0 left-0 z-40 h-[2px] bg-[color-mix(in_srgb,var(--color-steel)_25%,transparent)] md:hidden"
        aria-hidden
      >
        <div
          ref={fillMobile}
          className="h-full origin-left bg-oxide"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <nav
        className="pointer-events-none fixed top-0 bottom-0 left-5 z-30 hidden w-px md:block"
        aria-label="Page sections"
      >
        <div className={`absolute inset-0 ${trackTone}`} />
        <div
          ref={fillDesktop}
          className={`absolute inset-x-0 top-0 h-full origin-top ${
            onOxide ? "bg-ink" : "bg-oxide"
          }`}
          style={{ transform: "scaleY(0)" }}
          aria-hidden
        />
        <ul className="absolute top-0 left-1/2 flex h-full -translate-x-1/2 flex-col justify-evenly py-[12vh]">
          {nodes.map((node) => {
            const isActive = active === node.id;
            const idleBorder = onOxide
              ? "border-ink/45 bg-transparent group-hover:border-ink"
              : theme === "paper"
                ? "border-ink/35 bg-transparent group-hover:border-oxide"
                : "border-steel/70 bg-transparent group-hover:border-oxide";
            const activeDot = onOxide
              ? "border-ink bg-ink"
              : "border-oxide bg-oxide";
            return (
              <li key={node.id} className="relative h-2 w-2">
                <button
                  type="button"
                  className="pointer-events-auto group absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  onClick={() => scrollTo(`#${node.id}`, { offset: -20 })}
                  aria-label={`Go to ${node.label}`}
                  aria-current={isActive ? "true" : undefined}
                  title={node.label}
                >
                  <span
                    className={`block size-1.5 shrink-0 rounded-full border transition-colors ${
                      isActive ? activeDot : idleBorder
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
```

## Global chrome (brief)

### Cursor
- Path: `app/components/layout/Cursor.tsx`
- Custom fine-pointer cursor; reads `data-cursor` (VIEW/DRAG/OPEN); disabled on coarse pointers and reduced motion.

### Preloader
- Path: `app/components/layout/Preloader.tsx`
- ~1.6s ink intro with GSAP; sessionStorage skip; calls `markReady()` from PreloaderProvider.

### PageTransition
- Path: `app/components/layout/PageTransition.tsx`
- Route navigation wipe (ink panel + ring, ~560ms); tied to React Router navigation state.

### GridOverlay
- Path: `app/components/layout/GridOverlay.tsx`
- 12-column engineering grid overlay; toggle with G key (see `.site-grid` in app.css).


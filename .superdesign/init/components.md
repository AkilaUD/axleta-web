# Shared UI primitives

Stack: React Router v8 Framework Mode, custom UI (no shadcn), Tailwind v4 tokens from `app/app.css`.

## Button
- Path: `app/components/ui/Button.tsx`
- Description: Shared UI primitive.

```tsx
import { Link } from "react-router";
import { motion } from "motion/react";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "link";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 font-mono text-[0.7rem] font-medium tracking-[0.12em] uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-oxide text-paper hover:bg-[var(--color-oxide-dim)]",
  secondary:
    "border border-paper/40 bg-transparent text-paper hover:bg-paper/10",
  ghost:
    "border border-[color-mix(in_srgb,var(--color-steel)_40%,transparent)] bg-transparent text-ink hover:border-oxide hover:text-oxide",
  link: "min-h-0 rounded-none px-0 font-mono text-[0.7rem] tracking-[0.12em] text-oxide uppercase link-draw",
};

type ButtonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
};

type LinkButtonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  to: string;
};

const tap = { scale: 0.97 };

export function LinkButton({
  variant = "primary",
  children,
  className = "",
  to,
}: LinkButtonProps) {
  if (variant === "link") {
    return (
      <Link to={to} className={`${variants.link} ${className}`}>
        {children}
      </Link>
    );
  }
  return (
    <motion.div className="inline-flex" whileTap={tap}>
      <Link to={to} className={`${base} ${variants[variant]} ${className}`}>
        {children}
      </Link>
    </motion.div>
  );
}

export function Button({
  variant = "primary",
  children,
  className = "",
  type = "button",
  disabled,
  loading,
  onClick,
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      whileTap={disabled || loading ? undefined : tap}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {loading ? "Sending…" : children}
    </motion.button>
  );
}
```

## MagneticButton
- Path: `app/components/ui/MagneticButton.tsx`
- Description: Shared UI primitive.

```tsx
import {
  useRef,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { Link } from "react-router";
import { motion, useMotionValue, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "~/hooks/usePrefersReducedMotion";

const spring = { stiffness: 260, damping: 28, mass: 0.6 };
const STRENGTH = 0.25;

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  to?: string;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  strength?: number;
  cursor?: "VIEW" | "DRAG" | "OPEN";
};

export function MagneticButton({
  children,
  className = "",
  to,
  href,
  type = "button",
  onClick,
  strength = STRENGTH,
  cursor,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  function onMove(e: ReactMouseEvent) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const shellClass =
    `inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-oxide px-6 font-mono text-[0.7rem] font-medium tracking-[0.12em] text-paper uppercase transition-colors hover:bg-[var(--color-oxide-dim)] ${className}`;

  const inner = (
    <motion.div style={{ x: sx, y: sy }} className="inline-flex items-center gap-2">
      {children}
    </motion.div>
  );

  return (
    <div
      ref={ref}
      className="inline-flex"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor={cursor}
    >
      {to ? (
        <Link to={to} className={shellClass}>
          {inner}
        </Link>
      ) : href ? (
        <a href={href} className={shellClass}>
          {inner}
        </a>
      ) : (
        <button type={type} onClick={onClick} className={shellClass}>
          {inner}
        </button>
      )}
    </div>
  );
}
```

## Container
- Path: `app/components/ui/Container.tsx`
- Description: Shared UI primitive.

```tsx
import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "main";
  narrow?: boolean;
};

export function Container({
  children,
  className = "",
  as: Tag = "div",
  narrow = false,
}: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full px-[clamp(1.25rem,4vw,2.5rem)] ${
        narrow ? "max-w-[48rem]" : "max-w-[90rem]"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
```

## PageHero
- Path: `app/components/ui/PageHero.tsx`
- Description: Shared UI primitive.

```tsx
import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "~/components/ui/Breadcrumbs";

type PageHeroProps = {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  tone?: "ink" | "paper";
};

export function PageHero({
  crumbs,
  eyebrow,
  title,
  description,
  children,
  imageSrc,
  imageAlt = "",
  tone = "ink",
}: PageHeroProps) {
  const ink = tone === "ink";

  return (
    <header
      className={`relative isolate overflow-hidden pt-28 ${
        imageSrc ? "pb-0 md:min-h-[min(72vh,40rem)]" : "pb-16 md:pb-24"
      } ${ink ? "bg-ink text-paper" : "bg-paper text-ink"}`}
    >
      {imageSrc ? (
        <>
          <img
            src={imageSrc}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="eager"
            decoding="async"
          />
          <div
            className={`absolute inset-0 ${
              ink
                ? "bg-[linear-gradient(105deg,color-mix(in_srgb,var(--color-ink)_92%,transparent)_0%,color-mix(in_srgb,var(--color-ink)_72%,transparent)_42%,color-mix(in_srgb,var(--color-ink)_45%,transparent)_100%)]"
                : "bg-[linear-gradient(105deg,color-mix(in_srgb,var(--color-paper)_92%,transparent)_0%,color-mix(in_srgb,var(--color-paper)_70%,transparent)_55%,transparent)]"
            }`}
            aria-hidden
          />
        </>
      ) : (
        <div
          className={`grain ${ink ? "grain--ink" : "grain--paper"}`}
          aria-hidden
        />
      )}

      <div
        className={`relative z-[1] mx-auto max-w-[90rem] px-[clamp(1.25rem,4vw,2.5rem)] ${
          imageSrc ? "flex min-h-[min(56vh,32rem)] flex-col justify-end pb-16 md:pb-20" : ""
        }`}
      >
        <div
          className={
            ink
              ? "[&_a]:text-paper/70 [&_nav]:text-paper/60 [&_span]:text-paper/80"
              : ""
          }
        >
          <Breadcrumbs items={crumbs} />
        </div>
        {eyebrow ? (
          <p className="text-label mt-8 text-oxide">{eyebrow}</p>
        ) : null}
        <h1 className="mt-4 max-w-[18ch] font-display text-[clamp(2.5rem,7vw,5.5rem)] font-semibold tracking-[-0.045em] text-balance">
          {title}
        </h1>
        {description ? (
          <p
            className={`mt-6 max-w-2xl text-lg ${
              ink ? "text-paper/75" : "text-ink/70"
            }`}
          >
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </header>
  );
}
```

## Eyebrow
- Path: `app/components/ui/Eyebrow.tsx`
- Description: Shared UI primitive.

```tsx
type EyebrowProps = {
  children: string;
  className?: string;
};

export function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <p className={`text-eyebrow ${className}`}>
      <span className="mr-2 inline-block h-[2px] w-5 translate-y-[-3px] bg-oxide align-middle" />
      {children}
    </p>
  );
}
```

## SectionHeading
- Path: `app/components/ui/SectionHeading.tsx`
- Description: Shared UI primitive.

```tsx
import { Eyebrow } from "~/components/ui/Eyebrow";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  as?: "h1" | "h2";
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Tag = "h2",
  align = "left",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl";
  return (
    <header className={`mb-10 space-y-3 ${alignClass}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Tag className={`${Tag === "h1" ? "text-h1" : "text-h2"} text-text`}>
        {title}
      </Tag>
      {description ? (
        <p className="text-body-lg text-muted">{description}</p>
      ) : null}
    </header>
  );
}
```

## Accordion
- Path: `app/components/ui/Accordion.tsx`
- Description: Shared UI primitive.

```tsx
import { ChevronDown } from "lucide-react";
import { useId, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";

type AccordionItemProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  const buttonId = useId();

  return (
    <div className="border-b border-subtle">
      <button
        id={buttonId}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-11 w-full items-center justify-between gap-4 py-4 text-left text-h3"
      >
        {title}
        <ChevronDown
          className={`size-5 shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-muted">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
```

## Breadcrumbs
- Path: `app/components/ui/Breadcrumbs.tsx`
- Description: Shared UI primitive.

```tsx
import { Link } from "react-router";

export type Crumb = { label: string; href: string };

type BreadcrumbsProps = {
  items: Crumb[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-small text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {isLast ? (
                <span aria-current="page" className="text-text">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="text-[var(--color-brand-hover)] hover:underline"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
```

## LinkArrow
- Path: `app/components/ui/LinkArrow.tsx`
- Description: Shared UI primitive.

```tsx
import { Link } from "react-router";
import type { ReactNode } from "react";

type LinkArrowProps = {
  to: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
};

/** Mono link with oxide underline draw + nudging arrow. */
export function LinkArrow({
  to,
  children,
  className = "",
  external,
}: LinkArrowProps) {
  const classes = `group inline-flex items-center gap-2 font-mono text-[0.7rem] font-medium tracking-[0.12em] uppercase link-draw ${className}`;

  const content = (
    <>
      <span>{children}</span>
      <span
        aria-hidden
        className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      >
        ↗
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={to}
        rel="noopener noreferrer"
        target="_blank"
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <Link to={to} className={classes}>
      {content}
    </Link>
  );
}
```

## Marquee
- Path: `app/components/ui/Marquee.tsx`
- Description: Shared UI primitive.

```tsx
import { useRef } from "react";
import { ensureGsap } from "~/lib/gsap-setup";
import { usePrefersReducedMotion } from "~/hooks/usePrefersReducedMotion";

type MarqueeProps = {
  items: readonly string[];
  className?: string;
  duration?: number;
};

/** Horizontal mono marquee — 40s linear loop, pauses on hover. */
export function Marquee({
  items,
  className = "",
  duration = 40,
}: MarqueeProps) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { gsap, useGSAP } = ensureGsap();

  useGSAP(
    () => {
      if (!root.current || reduced) return;
      const track = root.current.querySelector<HTMLElement>(".marquee-track");
      if (!track) return;

      const tween = gsap.to(track, {
        xPercent: -50,
        duration,
        ease: "none",
        repeat: -1,
      });

      const pause = () => tween.pause();
      const play = () => tween.play();
      root.current.addEventListener("mouseenter", pause);
      root.current.addEventListener("mouseleave", play);
      root.current.addEventListener("focusin", pause);
      root.current.addEventListener("focusout", play);

      return () => {
        root.current?.removeEventListener("mouseenter", pause);
        root.current?.removeEventListener("mouseleave", play);
        root.current?.removeEventListener("focusin", pause);
        root.current?.removeEventListener("focusout", play);
      };
    },
    { scope: root, dependencies: [reduced, duration] },
  );

  const sequence = [...items, ...items];

  return (
    <div
      ref={root}
      className={`overflow-hidden border-t border-[color-mix(in_srgb,var(--color-steel)_30%,transparent)] ${className}`}
      role="presentation"
    >
      <div className="marquee-track flex w-max will-change-transform">
        {sequence.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="text-label shrink-0 px-6 py-3 text-steel"
          >
            {item}
            <span className="ml-6 text-oxide" aria-hidden>
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
```

## BrandMark
- Path: `app/components/ui/BrandMark.tsx`
- Description: Shared UI primitive.

```tsx
import { LogoMark } from "~/components/svg/Logo";

/** Compact Axleta mark for tight UI slots. */
export function BrandMark({ className = "h-8 w-8" }: { className?: string }) {
  return <LogoMark className={className} />;
}
```

## Prose
- Path: `app/components/ui/Prose.tsx`
- Description: Shared UI primitive.

```tsx
import type { ReactNode } from "react";

type ProseProps = {
  children: ReactNode;
  className?: string;
  large?: boolean;
};

export function Prose({ children, className = "", large = false }: ProseProps) {
  return (
    <div
      className={`prose-axleta max-w-prose ${large ? "text-body-lg" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
```

## ResponsiveImage
- Path: `app/components/ui/ResponsiveImage.tsx`
- Description: Shared UI primitive.

```tsx
type ResponsiveImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

export function ResponsiveImage({
  src,
  alt,
  width,
  height,
  sizes = "100vw",
  priority = false,
  className = "",
}: ResponsiveImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={`h-auto w-full object-cover ${className}`}
    />
  );
}
```


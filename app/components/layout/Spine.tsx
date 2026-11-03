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

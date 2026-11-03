import { useRef } from "react";
import { ensureGsap } from "~/lib/gsap-setup";
import { usePrefersReducedMotion } from "~/hooks/usePrefersReducedMotion";

/** Left axle reading-progress line for article pages. */
export function ReadingProgress() {
  const fill = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { gsap, useGSAP } = ensureGsap();

  useGSAP(
    () => {
      if (reduced || !fill.current) return;
      gsap.fromTo(
        fill.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
          },
        },
      );
    },
    { dependencies: [reduced] },
  );

  return (
    <div
      className="pointer-events-none fixed top-0 bottom-0 left-3 z-30 hidden w-px bg-[color-mix(in_srgb,var(--color-steel)_30%,transparent)] md:block"
      aria-hidden
    >
      <div
        ref={fill}
        className="absolute inset-x-0 top-0 h-full origin-top bg-oxide"
        style={{ transform: "scaleY(0)" }}
      />
    </div>
  );
}

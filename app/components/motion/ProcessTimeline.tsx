import { useRef } from "react";
import { processSteps } from "~/data/capabilities";
import { ensureGsap } from "~/lib/gsap";
import { usePrefersReducedMotion } from "~/hooks/usePrefersReducedMotion";

export function ProcessTimeline() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { gsap, useGSAP } = ensureGsap();

  useGSAP(
    () => {
      const el = root.current;
      if (!el || reduced) {
        return;
      }

      gsap.from(".process-step", {
        opacity: 0,
        y: 32,
        duration: 0.55,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          once: true,
        },
      });

      gsap.fromTo(
        ".process-progress",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            end: "bottom 55%",
            scrub: 0.6,
          },
        },
      );
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <div ref={root} className="process-rail relative">
      <div
        aria-hidden
        className="pointer-events-none absolute top-[1.35rem] right-0 left-0 hidden h-px bg-[var(--color-border)] md:block"
      />
      <div
        aria-hidden
        className="process-progress pointer-events-none absolute top-[1.35rem] left-0 hidden h-0.5 origin-left bg-[var(--color-brand)] md:block"
        style={{ width: "100%" }}
      />
      <ol className="grid gap-8 md:grid-cols-5 md:gap-4">
        {processSteps.map((step, index) => (
          <li key={step.title} className="process-step relative">
            <span className="relative z-[1] mb-4 flex size-11 items-center justify-center rounded-full border border-[var(--color-brand)]/30 bg-[var(--color-brand-soft)] font-[family-name:var(--font-heading)] text-sm font-bold text-[var(--color-brand-hover)] shadow-[0_0_0_6px_var(--color-background)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-h3 text-text">{step.title}</h3>
            <p className="mt-2 text-small text-muted">{step.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

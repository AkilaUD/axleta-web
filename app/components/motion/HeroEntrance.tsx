import { useRef, type ReactNode } from "react";
import { ensureGsap } from "~/lib/gsap";
import { usePrefersReducedMotion } from "~/hooks/usePrefersReducedMotion";

type HeroEntranceProps = {
  children: ReactNode;
  className?: string;
};

/** Cinematic home-hero timeline + scroll parallax (GSAP only). */
export function HeroEntrance({ children, className = "" }: HeroEntranceProps) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { gsap, useGSAP } = ensureGsap();

  useGSAP(
    () => {
      if (!root.current) {
        return;
      }

      const stage = root.current.closest(".hero-stage") ?? root.current;

      if (!reduced) {
        gsap.fromTo(
          ".hero-photo",
          { scale: 1.12 },
          { scale: 1, duration: 2.4, ease: "power2.out" },
        );

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(".hero-brand-line", {
          yPercent: 120,
          duration: 1,
          stagger: 0.08,
        })
          .from(
            ".hero-lede",
            { y: 28, opacity: 0, duration: 0.65 },
            "-=0.45",
          )
          .from(
            ".hero-actions > *",
            { y: 18, opacity: 0, duration: 0.5, stagger: 0.1 },
            "-=0.35",
          )
          .from(
            ".hero-meta",
            { opacity: 0, duration: 0.45 },
            "-=0.25",
          )
          .from(
            ".hero-console",
            { yPercent: 100, duration: 0.95, ease: "power4.out" },
            "-=0.7",
          )
          .from(
            ".pd-tile",
            { opacity: 0, x: 16, duration: 0.4, stagger: 0.05 },
            "-=0.45",
          );

        gsap.to(".hero-photo", {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(".hero-copy", {
          yPercent: -8,
          opacity: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}

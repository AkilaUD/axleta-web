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

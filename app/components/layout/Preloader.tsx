import { useRef, useState } from "react";
import { ensureGsap } from "~/lib/gsap-setup";
import {
  PRELOADER_SESSION_KEY,
  usePreloader,
} from "~/lib/preloader";
import { usePrefersReducedMotion } from "~/hooks/usePrefersReducedMotion";
import { Logo } from "~/components/svg/Logo";

/**
 * Ink intro overlay (~1.6s). Renders above content so LCP/DOM stay intact.
 * Skipped on prefers-reduced-motion or if already seen this session.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const { markReady } = usePreloader();
  const reduced = usePrefersReducedMotion();
  const [gone, setGone] = useState(false);
  const { gsap, useGSAP } = ensureGsap();

  useGSAP(
    () => {
      if (!root.current) return;

      const finish = () => {
        try {
          sessionStorage.setItem(PRELOADER_SESSION_KEY, "1");
        } catch {
          /* private mode */
        }
        setGone(true);
        markReady();
      };

      let seen = false;
      try {
        seen = sessionStorage.getItem(PRELOADER_SESSION_KEY) === "1";
      } catch {
        seen = false;
      }

      if (reduced || seen) {
        root.current.style.visibility = "hidden";
        root.current.style.pointerEvents = "none";
        finish();
        return;
      }

      const ring = root.current.querySelector(".preloader-ring");
      const ringSpin = root.current.querySelector(".preloader-ring-spin");
      const logo = root.current.querySelector(".preloader-logo");
      if (!ring || !logo) {
        finish();
        return;
      }

      gsap.set(logo, { autoAlpha: 0, y: 16 });
      gsap.set(ring, { drawSVG: "0%" });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: finish,
      });

      tl.to(ring, { drawSVG: "100%", duration: 0.7 })
        .to(
          ringSpin,
          {
            rotation: 360,
            duration: 0.55,
            ease: "none",
            transformOrigin: "40px 40px",
          },
          "-=0.15",
        )
        .to(
          logo,
          { autoAlpha: 1, y: 0, duration: 0.55, ease: "expo.out" },
          "-=0.25",
        )
        .to(
          root.current,
          {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.55,
            ease: "expo.inOut",
          },
          "+=0.18",
        );
    },
    { scope: root, dependencies: [reduced, markReady] },
  );

  if (gone) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink text-paper"
      style={{ clipPath: "inset(0 0 0% 0)" }}
      aria-hidden={gone}
      aria-busy={!gone}
    >
      <div className="grain grain--ink" aria-hidden />
      <div className="relative z-[1] flex flex-col items-center gap-10">
        <svg
          viewBox="0 0 80 80"
          className="h-14 w-14 text-paper"
          fill="none"
          aria-hidden
        >
          <g
            className="preloader-ring-spin"
            style={{ transformOrigin: "40px 40px" }}
          >
            <circle
              className="preloader-ring"
              cx="40"
              cy="40"
              r="34"
              stroke="currentColor"
              strokeWidth="1.25"
            />
          </g>
          <circle cx="40" cy="40" r="3" fill="var(--color-oxide)" />
        </svg>
        <div className="preloader-logo">
          <Logo variant="preloader" />
        </div>
      </div>
    </div>
  );
}

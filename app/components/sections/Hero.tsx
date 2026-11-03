import { useRef } from "react";
import { Link } from "react-router";
import { ensureGsap } from "~/lib/gsap-setup";
import { usePreloader } from "~/lib/preloader";
import { usePrefersReducedMotion } from "~/hooks/usePrefersReducedMotion";
import { heroCopy, site } from "~/lib/content";
import { MagneticButton } from "~/components/ui/MagneticButton";
import { HeroGlobe } from "~/components/sections/HeroGlobe";

/**
 * Hero: brand + one CTA group + globe. Trust/partners live further down.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const { ready } = usePreloader();
  const reduced = usePrefersReducedMotion();
  const { gsap, useGSAP } = ensureGsap();

  useGSAP(
    () => {
      if (!root.current || !ready) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            ".hero-kicker",
            ".hero-headline",
            ".hero-sub",
            ".hero-actions",
            ".hero-globe-stage",
          ],
          { autoAlpha: 1, clearProps: "transform" },
        );
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(
          [
            ".hero-kicker",
            ".hero-headline .hero-line",
            ".hero-sub",
            ".hero-actions",
          ],
          { autoAlpha: 0, y: 22 },
        );
        gsap.set(".hero-globe-stage", { autoAlpha: 0, scale: 0.96 });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.to(".hero-globe-stage", { autoAlpha: 1, scale: 1, duration: 1.1 }, 0)
          .to(".hero-kicker", { autoAlpha: 1, y: 0, duration: 0.45 }, 0.2)
          .to(
            ".hero-headline .hero-line",
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.1,
              ease: "expo.out",
            },
            0.3,
          )
          .to(".hero-sub", { autoAlpha: 1, y: 0, duration: 0.55 }, "-=0.3")
          .to(".hero-actions", { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.28");
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [ready, reduced] },
  );

  return (
    <section
      ref={root}
      id="hero"
      className="hero-stage relative isolate flex min-h-svh flex-col overflow-hidden bg-ink text-paper"
      data-spine="01 — HERO"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_72%_42%,color-mix(in_srgb,var(--color-oxide)_22%,transparent),transparent_58%),radial-gradient(ellipse_50%_40%_at_20%_80%,color-mix(in_srgb,var(--color-graphite)_80%,transparent),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,color-mix(in_srgb,var(--color-ink)_94%,transparent)_0%,color-mix(in_srgb,var(--color-ink)_55%,transparent)_42%,transparent_68%)]"
        aria-hidden
      />
      <div className="grain grain--ink opacity-[0.22]" aria-hidden />

      <div className="relative z-[2] flex min-h-svh flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-[90rem] flex-1 flex-col px-[clamp(1.25rem,4vw,2.5rem)] pt-28 pb-10 lg:pb-14">
          <div className="grid flex-1 items-center gap-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-8">
            <div className="relative z-[2] max-w-[34rem] pt-2 lg:pt-0">
              <p className="hero-kicker text-label text-signal">
                {heroCopy.kicker}
              </p>

              <h1 className="hero-headline mt-5 font-display text-[clamp(2.5rem,5.8vw,4.75rem)] font-semibold tracking-[-0.045em]">
                <span className="hero-line block overflow-hidden">
                  <span className="block">{heroCopy.headlineLine1}</span>
                </span>
                <span className="hero-line block overflow-hidden">
                  <span className="block">{heroCopy.headlineLine2}</span>
                </span>
                <span className="hero-line block overflow-hidden">
                  <span className="block text-signal">
                    {heroCopy.headlineAccent}
                  </span>
                </span>
              </h1>

              <p className="hero-sub mt-6 max-w-[30rem] text-[1.05rem] leading-relaxed text-paper/80 md:text-lg">
                {heroCopy.sub}
              </p>

              <div className="hero-actions mt-9 flex flex-wrap items-center gap-4">
                <MagneticButton
                  to="/solutions"
                  className="!bg-paper !text-ink hover:!bg-paper-2"
                  cursor="OPEN"
                >
                  {heroCopy.primaryCta} →
                </MagneticButton>
                <Link
                  to="/contact?interest=general"
                  className="text-label inline-flex min-h-11 items-center gap-2 rounded-full border border-paper/40 px-5 text-paper transition-colors hover:border-paper hover:bg-paper/10"
                  data-cursor="OPEN"
                >
                  {heroCopy.secondaryCta}
                </Link>
              </div>

              <p className="text-label mt-10 max-w-sm text-steel">
                {site.partners.google.split(" to ")[0]} · SAP® PartnerEdge®
              </p>
            </div>

            <div className="hero-globe-stage relative mx-auto aspect-square w-full max-w-[min(100%,36rem)] min-h-[20rem] sm:max-w-[min(100%,40rem)] lg:mx-0 lg:aspect-square lg:w-full lg:max-w-[min(100%,40rem)] lg:justify-self-end">
              <HeroGlobe className="h-full w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useRef, useState } from "react";
import { ensureGsap } from "~/lib/gsap-setup";
import { processSteps } from "~/lib/content";
import { usePrefersReducedMotion } from "~/hooks/usePrefersReducedMotion";
import { Bearing } from "~/components/svg/Bearing";

/** S5 — How Axleta works: horizontal dial. */
export function Dial() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const reduced = usePrefersReducedMotion();
  const { gsap, useGSAP } = ensureGsap();

  useGSAP(
    () => {
      if (reduced || !root.current) return;
      const mm = gsap.matchMedia();
      const total = processSteps.length;

      mm.add("(min-width: 768px)", () => {
        const track = root.current?.querySelector(".dial-track");
        const ring = root.current?.querySelector(".dial-ring");
        if (!track || !root.current) return;

        gsap.to(track, {
          xPercent: -((total - 1) * (100 / total)),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=400%",
            pin: true,
            scrub: 0.6,
            onUpdate: (self) => {
              const idx = Math.min(
                total - 1,
                Math.round(self.progress * (total - 1)),
              );
              setActive(idx);
            },
          },
        });

        if (ring) {
          gsap.to(ring, {
            rotation: 360,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "+=400%",
              scrub: 0.6,
            },
          });
        }
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section
      ref={root}
      id="dial"
      className="relative bg-ink text-paper"
      data-spine="05 — DIAL"
    >
      {/* Mobile stacked */}
      <div className="px-[clamp(1.25rem,4vw,2.5rem)] py-20 md:hidden">
        <p className="text-label text-oxide">Fig. 04 — Process</p>
        <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.04em]">
          How Axleta works
        </h2>
        <p className="mt-3 font-serif text-lg italic text-paper/65">
          A practical sequence adapted to your context and agreed scope.
        </p>
        <ol className="mt-10 space-y-8">
          {processSteps.map((step, i) => (
            <li key={step.title} className="border-t border-[color-mix(in_srgb,var(--color-steel)_30%,transparent)] pt-6">
              <p className="text-label text-oxide">
                Stage {i + 1}/{processSteps.length}
              </p>
              <h3 className="mt-2 font-display text-4xl font-semibold tracking-[-0.04em]">
                {step.title}
              </h3>
              <p className="mt-3 text-paper/70">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Desktop pin + horizontal */}
      <div className="relative hidden min-h-svh overflow-hidden md:block">
        <div className="grain grain--ink" aria-hidden />
        <div className="dial-ring pointer-events-none absolute top-[58%] right-[-8%] h-[min(70vh,520px)] w-[min(70vh,520px)] -translate-y-1/2 text-paper opacity-20 lg:right-[2%]">
          <Bearing className="h-full w-full" id="dial-bearing" />
        </div>

        <div className="relative z-[1] flex h-svh flex-col pt-28 pb-8">
          <div className="shrink-0 px-[clamp(1.25rem,4vw,2.5rem)]">
            <p className="text-label text-oxide">Fig. 04 — Process</p>
            <h2 className="mt-3 max-w-[18ch] font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-[-0.04em]">
              How Axleta works
            </h2>
            <p className="mt-2 max-w-xl font-serif text-lg italic text-paper/65">
              A practical sequence adapted to your context and agreed scope.
            </p>
          </div>

          <div className="flex min-h-0 flex-1 flex-col justify-center">
            <div
              className="dial-track flex will-change-transform"
              style={{ width: `${processSteps.length * 100}%` }}
            >
              {processSteps.map((step, i) => {
                const on = i === active;
                return (
                  <article
                    key={step.title}
                    className="flex flex-col justify-center px-[clamp(1.25rem,4vw,2.5rem)]"
                    style={{ width: `${100 / processSteps.length}%` }}
                  >
                    <p className="text-label text-oxide">
                      Stage {i + 1}/{processSteps.length}
                    </p>
                    <h3
                      className="mt-4 font-display text-[clamp(3.5rem,10vw,8rem)] font-semibold tracking-[-0.05em] uppercase"
                      style={
                        on
                          ? undefined
                          : {
                              WebkitTextStroke: "1px var(--color-paper)",
                              color: "transparent",
                            }
                      }
                    >
                      {step.title}
                    </h3>
                    <p className="mt-6 max-w-md text-lg text-paper/70">
                      {step.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="flex shrink-0 gap-2 px-[clamp(1.25rem,4vw,2.5rem)]">
            {processSteps.map((step, i) => (
              <span
                key={step.title}
                className={`h-px flex-1 transition-colors ${
                  i === active ? "bg-oxide" : "bg-steel/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

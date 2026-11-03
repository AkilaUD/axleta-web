import { useRef } from "react";
import { motion } from "motion/react";
import { ensureGsap } from "~/lib/gsap-setup";
import { businessChallenges } from "~/lib/content";
import { usePrefersReducedMotion } from "~/hooks/usePrefersReducedMotion";

/** S2 — The Ledger: challenge rows with scrubbed strikethrough. */
export function Ledger() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { gsap, useGSAP, ScrollTrigger } = ensureGsap();

  useGSAP(
    () => {
      if (reduced || !root.current) return;

      const rows = root.current.querySelectorAll<HTMLElement>(".ledger-row");
      rows.forEach((row) => {
        const strike = row.querySelector(".ledger-strike");
        const tag = row.querySelector(".ledger-tag");
        if (!strike) return;

        gsap.fromTo(
          strike,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top 58%",
              end: "top 42%",
              scrub: 0.6,
            },
          },
        );

        if (tag) {
          gsap.fromTo(
            tag,
            { autoAlpha: 0, x: 8 },
            {
              autoAlpha: 1,
              x: 0,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top 55%",
                end: "top 45%",
                scrub: 0.6,
              },
            },
          );
        }
      });

      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger && root.current?.contains(st.trigger as Node)) {
            st.kill();
          }
        });
      };
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section
      ref={root}
      id="ledger"
      className="relative bg-paper py-[18vh] text-ink"
      data-spine="02 — LEDGER"
    >
      <div className="grain grain--paper" aria-hidden />
      <div className="relative z-[1] mx-auto grid max-w-[90rem] gap-12 px-[clamp(1.25rem,4vw,2.5rem)] lg:grid-cols-[0.9fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-label text-oxide">Fig. 01 — Situations</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-semibold tracking-[-0.04em] text-balance">
            Technology should simplify the way your business works.
          </h2>
          <p className="mt-5 max-w-[34ch] font-serif text-xl italic text-ink/65">
            Common situations we help assess. They will not all apply to every
            visitor.
          </p>
        </div>

        <ul className="border-t border-[color-mix(in_srgb,var(--color-steel)_30%,transparent)]">
          {businessChallenges.map((item, i) => (
            <motion.li
              key={item}
              className="ledger-row group relative border-b border-[color-mix(in_srgb,var(--color-steel)_30%,transparent)] py-6 transition-colors md:py-7"
              whileHover={{ x: 12 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              data-cursor="VIEW"
            >
              <div className="pointer-events-none absolute inset-0 bg-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative z-[1] grid grid-cols-[4.5rem_1fr_auto] items-baseline gap-4 group-hover:text-paper md:grid-cols-[5.5rem_1fr_auto]">
                <span className="text-label text-oxide group-hover:text-signal">
                  S-{String(i + 1).padStart(2, "0")}
                </span>
                <p className="relative font-display text-[clamp(1.15rem,2.2vw,1.85rem)] font-medium tracking-[-0.02em]">
                  {item}
                  <span
                    className="ledger-strike pointer-events-none absolute top-1/2 left-0 h-px w-full origin-left bg-oxide"
                    style={{ transform: "scaleX(0)" }}
                    aria-hidden
                  />
                </p>
                <span className="ledger-tag text-label hidden text-oxide opacity-0 md:inline">
                  → Assessed
                </span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

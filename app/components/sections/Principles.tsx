import { useRef } from "react";
import { motion } from "motion/react";
import { ensureGsap } from "~/lib/gsap-setup";
import { whyAxleta } from "~/lib/content";
import { usePrefersReducedMotion } from "~/hooks/usePrefersReducedMotion";

/** S6 — Why Axleta as a typographic manifesto. */
export function Principles() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { gsap, useGSAP, SplitText } = ensureGsap();

  useGSAP(
    () => {
      if (reduced || !root.current) return;

      const titles = root.current.querySelectorAll(".principle-title");
      titles.forEach((el) => {
        const split = SplitText.create(el, {
          type: "chars",
          charsClass: "principle-char",
          aria: "auto",
        });
        gsap.from(split.chars, {
          yPercent: 110,
          duration: 0.7,
          stagger: 0.02,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          },
        });
      });

      gsap.from(".principle-support", {
        autoAlpha: 0,
        y: 12,
        duration: 0.5,
        stagger: 0.08,
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
        },
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section
      ref={root}
      id="principles"
      className="relative bg-paper py-[18vh] text-ink"
      data-spine="06 — WHY"
    >
      <div className="relative z-[1] mx-auto max-w-[90rem] px-[clamp(1.25rem,4vw,2.5rem)]">
        <p className="text-label text-oxide">Fig. 05 — Principles</p>
        <h2 className="mt-4 font-display text-[clamp(2.5rem,9vw,7rem)] font-semibold tracking-[-0.05em] text-balance">
          Business-first technology decisions.
        </h2>
        <p className="mt-6 max-w-xl font-serif text-xl italic text-ink/65">
          Understand the business. Connect the right technology. Advance the way
          it works.
        </p>

        <ul className="mt-16 border-t border-[color-mix(in_srgb,var(--color-steel)_30%,transparent)]">
          {whyAxleta.map((item) => (
            <li
              key={item.title}
              className="group grid gap-4 border-b border-[color-mix(in_srgb,var(--color-steel)_30%,transparent)] py-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_auto] md:items-baseline"
            >
              <h3 className="principle-title overflow-hidden font-display text-[clamp(1.5rem,3vw,2.5rem)] font-semibold tracking-[-0.03em]">
                {item.title}
              </h3>
              <p className="principle-support font-serif text-lg italic text-ink/65">
                {item.description}
              </p>
              <motion.span
                className="text-oxide hidden text-2xl md:inline"
                aria-hidden
                whileHover={{ rotate: 45 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                +
              </motion.span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

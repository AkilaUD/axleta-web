import { useRef, useState, type ComponentType } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router";
import { ensureGsap } from "~/lib/gsap-setup";
import { capabilities } from "~/lib/content";
import { getImage } from "~/data/images";
import { usePrefersReducedMotion } from "~/hooks/usePrefersReducedMotion";
import {
  megaSchematics,
  type MegaSchematicId,
} from "~/components/svg/schematics/MegaPreviews";

const INCLUDED: Record<string, string[]> = {
  erp: [
    "SAP Business One",
    "SAP S/4HANA Public Cloud",
    "Selection & implementation",
    "Fit for operating model",
  ],
  connected: [
    "Materials & assets",
    "Analytics",
    "Inventory movement",
    "Barcodes",
    "Payments",
  ],
  infrastructure: [
    "Private cloud",
    "Dedicated servers",
    "Networks",
    "Security",
    "Virtualization",
  ],
  productivity: [
    "Google Workspace",
    "Licensing assistance",
    "Adoption support",
    "Shared information",
  ],
  automation: [
    "Process automation",
    "Practical generative AI",
    "Governance",
    "Privacy controls",
  ],
  advisory: [
    "ERP selection",
    "Consultancy",
    "Requirements analysis",
    "Project coordination",
    "Support",
  ],
};

const ID_MAP: Record<string, MegaSchematicId> = {
  erp: "erp",
  connected: "connected",
  infrastructure: "cloud",
  productivity: "productivity",
  automation: "automation",
  advisory: "advisory",
};

/** S3 — Merged capabilities + solution families as a scroll-pinned spec index. */
export function SpecSheet() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const reduced = usePrefersReducedMotion();
  const { gsap, useGSAP, ScrollTrigger } = ensureGsap();

  useGSAP(
    () => {
      if (reduced || !root.current) return;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const pin = root.current?.querySelector(".spec-pin");
        if (!pin) return;

        const st = ScrollTrigger.create({
          trigger: pin,
          start: "top top",
          end: `+=${capabilities.length * 60}vh`,
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => {
            const idx = Math.min(
              capabilities.length - 1,
              Math.floor(self.progress * capabilities.length),
            );
            setActive(idx);
          },
        });

        return () => st.kill();
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [reduced] },
  );

  const current = capabilities[active] ?? capabilities[0];
  const schematicId = ID_MAP[current.id] ?? "erp";
  const Schematic = megaSchematics[schematicId];
  const included = INCLUDED[current.id] ?? [];

  return (
    <section
      ref={root}
      id="spec"
      className="relative bg-ink text-paper"
      data-spine="03 — SPEC"
    >
      {/* Mobile accordion */}
      <div className="px-[clamp(1.25rem,4vw,2.5rem)] py-20 lg:hidden">
        <p className="text-label text-oxide">Fig. 02 — Spec sheet</p>
        <h2 className="mt-4 font-display text-[clamp(2rem,8vw,3rem)] font-semibold tracking-[-0.04em]">
          What we help you connect and improve
        </h2>
        <ul className="mt-10 space-y-2">
          {capabilities.map((cap, i) => (
            <li key={cap.id} className="border border-[color-mix(in_srgb,var(--color-steel)_30%,transparent)]">
              <button
                type="button"
                className="flex w-full items-baseline gap-3 px-4 py-4 text-left"
                onClick={() => setActive(i)}
                aria-expanded={active === i}
              >
                <span className="text-label text-oxide">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-xl font-semibold">
                  {cap.title}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {active === i ? (
                  <motion.div
                    layout
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden px-4 pb-5"
                  >
                    <SchematicPreview
                      Schematic={megaSchematics[ID_MAP[cap.id] ?? "erp"]}
                      imageId={cap.id === "erp" ? "schematic-erp" : undefined}
                      description={cap.description}
                      included={INCLUDED[cap.id] ?? []}
                      href={cap.href}
                    />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop pin */}
      <div className="spec-pin relative hidden min-h-svh lg:block">
        <div className="grain grain--ink" aria-hidden />
        <div className="relative z-[1] mx-auto grid h-svh max-w-[90rem] grid-cols-2 gap-12 px-[clamp(1.25rem,4vw,2.5rem)] pt-28 pb-16">
          <div className="flex flex-col justify-center">
            <p className="text-label mb-8 text-oxide">Fig. 02 — Spec sheet</p>
            <ul>
              {capabilities.map((cap, i) => {
                const on = i === active;
                return (
                  <li key={cap.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      className={`flex w-full items-baseline gap-4 border-b border-[color-mix(in_srgb,var(--color-steel)_25%,transparent)] py-4 text-left transition-colors ${
                        on ? "text-paper" : "text-paper/25 hover:text-paper/55"
                      }`}
                      data-cursor="VIEW"
                    >
                      <span className="text-label shrink-0 text-oxide">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-[clamp(1.75rem,3.2vw,3.5rem)] font-semibold tracking-[-0.04em]">
                        {cap.title}
                      </span>
                      {on ? (
                        <span className="ml-auto size-2 rounded-full bg-oxide" />
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="sticky top-24 flex h-[calc(100svh-8rem)] flex-col justify-center border border-[color-mix(in_srgb,var(--color-steel)_30%,transparent)] p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
              >
                <SchematicPreview
                  Schematic={Schematic}
                  imageId={current.id === "erp" ? "schematic-erp" : undefined}
                  description={current.description}
                  included={included}
                  href={current.href}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function SchematicPreview({
  Schematic,
  imageId,
  description,
  included,
  href,
}: {
  Schematic: ComponentType<{ className?: string }>;
  imageId?: string;
  description: string;
  included: string[];
  href: string;
}) {
  const art = imageId ? getImage(imageId) : undefined;

  return (
    <div>
      <p className="text-label mb-4 text-steel">Rev. 2026.11</p>
      {art ? (
        <div className="mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-sm border border-[color-mix(in_srgb,var(--color-steel)_25%,transparent)] bg-graphite">
          <img
            src={art.path}
            alt=""
            aria-hidden
            width={art.width}
            height={art.height}
            className="h-full w-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : (
        <div className="mx-auto flex h-40 w-full max-w-sm items-center justify-center overflow-hidden">
          <Schematic className="h-36 w-full text-paper" />
        </div>
      )}
      <p className="mt-6 max-w-md text-paper/80">{description}</p>
      <ul className="mt-5 space-y-1">
        {included.map((line) => (
          <li key={line} className="text-label text-steel">
            · {line}
          </li>
        ))}
      </ul>
      <Link
        to={href}
        className="text-label mt-6 inline-flex text-oxide link-draw"
        data-cursor="OPEN"
      >
        Explore →
      </Link>
    </div>
  );
}

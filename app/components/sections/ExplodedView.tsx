import { useRef, useState } from "react";
import { Link } from "react-router";
import { ensureGsap } from "~/lib/gsap-setup";
import { erpModules } from "~/lib/content";
import { getImage } from "~/data/images";
import { usePrefersReducedMotion } from "~/hooks/usePrefersReducedMotion";

const LAYERS = [
  {
    id: "infra",
    label: "Layer 01 / Infrastructure",
    items: "Private cloud · Network · Storage · Virtualization",
  },
  {
    id: "core",
    label: "Layer 02 / Core ERP",
    items: "SAP Business One · SAP S/4HANA Public Cloud",
  },
  {
    id: "addons",
    label: "Layer 03 / Add-ons & integrations",
    items: "Analytics · Payments · Barcodes · Materials",
  },
  {
    id: "users",
    label: "Layer 04 / Users & reporting",
    items: "Sales · Finance · Inventory · Manufacturing",
  },
] as const;

/** S4 — Production isometric ERP exploded assembly with generated art. */
export function ExplodedView() {
  const root = useRef<HTMLElement>(null);
  const [activeLayer, setActiveLayer] = useState(3);
  const [hoverModule, setHoverModule] = useState<string | null>(null);
  const reduced = usePrefersReducedMotion();
  const { gsap, useGSAP } = ensureGsap();
  const art = getImage("erp-exploded");

  useGSAP(
    () => {
      if (reduced || !root.current) return;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const stage = root.current?.querySelector(".explode-stage");
        const figure = root.current?.querySelector(".explode-figure");
        const callout = root.current?.querySelector(".explode-callout");
        const markers = root.current?.querySelectorAll(".explode-marker");
        if (!stage || !root.current) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=220%",
            pin: true,
            scrub: 0.55,
            onUpdate: (self) => {
              const idx = Math.min(
                LAYERS.length - 1,
                Math.floor(self.progress * LAYERS.length * 0.9),
              );
              setActiveLayer(idx);
            },
          },
        });

        if (figure) {
          tl.fromTo(
            figure,
            { autoAlpha: 0.55, scale: 0.96, y: 28 },
            { autoAlpha: 1, scale: 1, y: 0, duration: 0.45, ease: "none" },
            0,
          );
        }

        if (markers?.length) {
          tl.fromTo(
            markers,
            { autoAlpha: 0, scale: 0.6 },
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.35,
              stagger: 0.08,
              ease: "none",
            },
            0.12,
          );
        }

        if (callout) {
          tl.fromTo(
            callout,
            { autoAlpha: 0, x: 20 },
            { autoAlpha: 1, x: 0, duration: 0.35, ease: "none" },
            0.18,
          );
        }
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [reduced] },
  );

  const callout = LAYERS[activeLayer] ?? LAYERS[0];

  return (
    <section
      ref={root}
      id="exploded"
      className="relative overflow-hidden bg-paper text-ink"
      data-spine="04 — ERP"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 50% at 70% 45%, color-mix(in srgb, var(--color-oxide) 8%, transparent), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="explode-stage relative mx-auto flex min-h-svh max-w-[90rem] flex-col justify-center px-[clamp(1.25rem,4vw,2.5rem)] pt-28 pb-16 lg:grid lg:grid-cols-[0.95fr_1.15fr] lg:gap-14">
        <div>
          <p className="text-label text-oxide">Fig. 03 — Exploded view</p>
          <h2 className="mt-4 max-w-[16ch] font-display text-[clamp(2rem,4.5vw,3.75rem)] font-semibold tracking-[-0.04em]">
            One operational core. A{" "}
            <em className="font-serif font-normal text-oxide italic">
              more connected
            </em>{" "}
            business.
          </h2>
          <ul className="mt-10 max-w-sm divide-y divide-[color-mix(in_srgb,var(--color-steel)_30%,transparent)] border-y border-[color-mix(in_srgb,var(--color-steel)_30%,transparent)]">
            {erpModules.map((m) => (
              <li key={m}>
                <button
                  type="button"
                  className={`text-label w-full py-3 text-left transition-colors ${
                    hoverModule === m
                      ? "text-oxide"
                      : "text-steel hover:text-ink"
                  }`}
                  onMouseEnter={() => setHoverModule(m)}
                  onMouseLeave={() => setHoverModule(null)}
                >
                  {m}
                </button>
              </li>
            ))}
          </ul>
          <ol className="mt-8 flex flex-wrap gap-2">
            {LAYERS.map((layer, i) => (
              <li key={layer.id}>
                <button
                  type="button"
                  onClick={() => setActiveLayer(i)}
                  className={`text-label rounded-full border px-3 py-1.5 transition-colors ${
                    activeLayer === i
                      ? "border-oxide bg-oxide text-paper"
                      : "border-[color-mix(in_srgb,var(--color-steel)_40%,transparent)] text-steel hover:border-oxide hover:text-ink"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </button>
              </li>
            ))}
          </ol>
          <p className="text-label mt-6 text-steel">
            SAP Business One and SAP S/4HANA Public Cloud are distinct products.
          </p>
          <Link
            to="/solutions/erp"
            className="text-label mt-8 inline-flex text-oxide link-draw"
            data-cursor="OPEN"
          >
            Explore ERP solutions →
          </Link>
        </div>

        <div className="relative mt-14 flex items-center justify-center lg:mt-0">
          <figure className="explode-figure relative w-full max-w-xl">
            {art ? (
              <img
                src={art.path}
                alt={art.alt}
                width={art.width}
                height={art.height}
                className="h-auto w-full object-contain"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="aspect-[4/3] w-full border border-ink/20 bg-paper-2" />
            )}

            {/* Layer hotspots — positions map to stack bands in the art */}
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              {[
                { top: "72%", left: "18%" },
                { top: "54%", left: "22%" },
                { top: "36%", left: "28%" },
                { top: "18%", left: "34%" },
              ].map((pos, i) => (
                <span
                  key={LAYERS[i].id}
                  className={`explode-marker absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-colors ${
                    activeLayer === i
                      ? "border-oxide bg-oxide"
                      : "border-oxide/50 bg-paper"
                  }`}
                  style={{ top: pos.top, left: pos.left }}
                />
              ))}
            </div>

            <aside className="explode-callout absolute right-0 bottom-2 max-w-[16rem] border border-[color-mix(in_srgb,var(--color-steel)_35%,transparent)] bg-paper/95 p-4 shadow-[0_12px_40px_color-mix(in_srgb,var(--color-ink)_8%,transparent)] backdrop-blur-sm sm:right-2 lg:right-[-0.5rem] lg:bottom-auto lg:top-[28%]">
              <p className="text-label text-oxide">{callout.label}</p>
              <p className="mt-2 text-sm leading-snug text-ink/75">
                {callout.items}
              </p>
            </aside>
          </figure>
        </div>
      </div>
    </section>
  );
}

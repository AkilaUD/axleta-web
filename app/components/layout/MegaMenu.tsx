import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router";
import { megaPreviewFamilies } from "~/lib/content";
import {
  megaSchematics,
  type MegaSchematicId,
} from "~/components/svg/schematics/MegaPreviews";

type MegaMenuProps = {
  open: boolean;
  kind: "solutions" | "services" | null;
  activeId: MegaSchematicId;
  onActiveId: (id: MegaSchematicId) => void;
  onClose: () => void;
};

const serviceLinks = [
  { label: "Consultancy", href: "/services#consultancy" },
  { label: "Requirements analysis", href: "/services#requirements" },
  { label: "Project management", href: "/services#project-management" },
  { label: "Resource allocation", href: "/services#resources" },
  { label: "Custom development", href: "/services#custom-development" },
  { label: "Support & optimization", href: "/services#support" },
] as const;

export function MegaMenu({
  open,
  kind,
  activeId,
  onActiveId,
  onClose,
}: MegaMenuProps) {
  const Schematic = megaSchematics[activeId];
  const activeFamily =
    megaPreviewFamilies.find((f) => f.id === activeId) ?? megaPreviewFamilies[0];

  return (
    <AnimatePresence>
      {open && kind ? (
        <motion.div
          key={kind}
          role="dialog"
          aria-label={kind === "solutions" ? "Solutions" : "Services"}
          className="fixed inset-0 z-40 flex flex-col bg-ink text-paper"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="grain grain--ink opacity-[0.05]" aria-hidden />
          <div className="relative z-[1] flex flex-1 flex-col px-[clamp(1.25rem,4vw,2.5rem)] pt-24 pb-10 lg:pt-28">
            <div className="mb-8 flex items-center justify-between border-b border-[color-mix(in_srgb,var(--color-steel)_30%,transparent)] pb-4">
              <p className="text-label text-steel">
                Fig. {kind === "solutions" ? "01" : "02"} —{" "}
                {kind === "solutions" ? "Solution families" : "Service sequence"}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="text-label text-paper link-draw"
              >
                Close ✕
              </button>
            </div>

            {kind === "solutions" ? (
              <div className="grid flex-1 gap-10 lg:grid-cols-2 lg:gap-16">
                <ul className="flex flex-col justify-center">
                  {megaPreviewFamilies.map((family, i) => (
                    <li key={family.id}>
                      <Link
                        to={family.href}
                        onClick={onClose}
                        onMouseEnter={() => onActiveId(family.id)}
                        onFocus={() => onActiveId(family.id)}
                        className={`group flex items-baseline gap-4 border-b border-[color-mix(in_srgb,var(--color-steel)_25%,transparent)] py-4 transition-colors ${
                          activeId === family.id
                            ? "text-paper"
                            : "text-paper/30 hover:text-paper/70"
                        }`}
                      >
                        <span className="text-label shrink-0 text-oxide">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-[clamp(1.6rem,3.5vw,3.25rem)] font-semibold tracking-[-0.04em]">
                          {family.label}
                        </span>
                        {activeId === family.id ? (
                          <span
                            className="ml-auto size-2 shrink-0 rounded-full bg-oxide"
                            aria-hidden
                          />
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="relative hidden flex-col justify-center border border-[color-mix(in_srgb,var(--color-steel)_30%,transparent)] p-8 lg:flex">
                  <p className="text-label mb-6 text-steel">
                    Rev. 2026.11 — Preview
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeId}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.28 }}
                      className="flex flex-1 flex-col"
                    >
                      <Schematic className="mx-auto h-44 w-full max-w-sm text-paper" />
                      <p className="mt-8 font-serif text-xl italic text-paper/80">
                        {activeFamily.blurb}
                      </p>
                      <Link
                        to={activeFamily.href}
                        onClick={onClose}
                        className="text-label mt-6 inline-flex items-center gap-2 self-start text-oxide link-draw"
                      >
                        Explore →
                      </Link>
                    </motion.div>
                  </AnimatePresence>
                  <span
                    className="pointer-events-none absolute top-3 left-3 text-steel/60"
                    aria-hidden
                  >
                    +
                  </span>
                  <span
                    className="pointer-events-none absolute top-3 right-3 text-steel/60"
                    aria-hidden
                  >
                    +
                  </span>
                  <span
                    className="pointer-events-none absolute bottom-3 left-3 text-steel/60"
                    aria-hidden
                  >
                    +
                  </span>
                  <span
                    className="pointer-events-none absolute right-3 bottom-3 text-steel/60"
                    aria-hidden
                  >
                    +
                  </span>
                </div>
              </div>
            ) : (
              <div className="grid flex-1 gap-10 lg:grid-cols-2">
                <ul className="flex flex-col justify-center">
                  {serviceLinks.map((item, i) => (
                    <li key={item.href}>
                      <Link
                        to={item.href}
                        onClick={onClose}
                        className="group flex items-baseline gap-4 border-b border-[color-mix(in_srgb,var(--color-steel)_25%,transparent)] py-5 text-paper/40 transition-colors hover:text-paper"
                      >
                        <span className="text-label shrink-0 text-oxide">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-[clamp(1.75rem,4vw,3.5rem)] font-semibold tracking-[-0.04em]">
                          {item.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="hidden flex-col justify-end border-l border-[color-mix(in_srgb,var(--color-steel)_30%,transparent)] pl-12 lg:flex">
                  <p className="font-serif text-2xl italic text-paper/75">
                    A practical sequence adapted to your context and agreed
                    scope.
                  </p>
                  <Link
                    to="/services"
                    onClick={onClose}
                    className="text-label mt-8 inline-flex self-start text-oxide link-draw"
                  >
                    All services →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

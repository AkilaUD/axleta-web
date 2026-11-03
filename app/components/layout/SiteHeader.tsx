import { useEffect, useState } from "react";
import { Link } from "react-router";
import { primaryNav } from "~/data/navigation";
import { Logo } from "~/components/svg/Logo";
import { DesktopNav } from "~/components/layout/DesktopNav";
import { MobileNav } from "~/components/layout/MobileNav";
import { MegaMenu } from "~/components/layout/MegaMenu";
import { useLockBodyScroll } from "~/hooks/useLockBodyScroll";
import type { MegaSchematicId } from "~/components/svg/schematics/MegaPreviews";

export function SiteHeader() {
  const [megaKind, setMegaKind] = useState<"solutions" | "services" | null>(
    null,
  );
  const [activeId, setActiveId] = useState<MegaSchematicId>("erp");
  const megaOpen = megaKind !== null;
  useLockBodyScroll(megaOpen);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMegaKind(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function toggleMega(kind: "solutions" | "services") {
    setMegaKind((current) => (current === kind ? null : kind));
  }

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        {/* Keeps logo clear of pinned section titles underneath */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-ink)_92%,transparent)_0%,color-mix(in_srgb,var(--color-ink)_55%,transparent)_55%,transparent_100%)]"
          aria-hidden
        />
        <div className="relative mx-auto flex min-h-[4.5rem] max-w-[90rem] items-center justify-between gap-4 px-[clamp(1.25rem,4vw,2.5rem)]">
          {/* Logo stays outside mix-blend so cyan artwork is preserved */}
          <Link
            to="/"
            onClick={() => setMegaKind(null)}
            aria-label="Axleta home"
            className="pointer-events-auto relative z-[1] shrink-0 rounded-sm bg-ink/80 px-1.5 py-1 backdrop-blur-sm"
          >
            <Logo variant="nav" />
          </Link>

          <div className="pointer-events-auto flex items-center gap-2">
            <div className="mix-blend-difference text-paper">
              <DesktopNav
                items={primaryNav}
                megaOpen={megaOpen}
                megaKind={megaKind}
                onToggleMega={toggleMega}
                onCloseMega={() => setMegaKind(null)}
                linksOnly
              />
            </div>
            <div className="hidden lg:block">
              <DesktopNav
                items={primaryNav}
                megaOpen={megaOpen}
                megaKind={megaKind}
                onToggleMega={toggleMega}
                onCloseMega={() => setMegaKind(null)}
                ctaOnly
              />
            </div>
            <div className="mix-blend-difference text-paper lg:hidden">
              <MobileNav items={primaryNav} />
            </div>
          </div>
        </div>
      </header>

      <MegaMenu
        open={megaOpen}
        kind={megaKind}
        activeId={activeId}
        onActiveId={setActiveId}
        onClose={() => setMegaKind(null)}
      />
    </>
  );
}

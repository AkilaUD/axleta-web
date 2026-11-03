import { PartnerBadges } from "~/components/sections/PartnerBadges";
import { legalDisclaimer, site } from "~/lib/content";

/** Partnerships strip — single home placement for badges + disclaimer. */
export function Partners() {
  return (
    <section
      id="partners"
      className="border-y border-[color-mix(in_srgb,var(--color-steel)_30%,transparent)] bg-ink py-14 text-paper"
      data-spine="07 — PARTNERS"
    >
      <div className="mx-auto flex max-w-[90rem] flex-col gap-8 px-[clamp(1.25rem,4vw,2.5rem)] lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="max-w-lg space-y-3">
          <p className="text-label text-oxide">Partnerships that support delivery</p>
          <p className="text-sm leading-relaxed text-paper/75">
            {site.partners.google} {site.partners.sap}
          </p>
        </div>
        <PartnerBadges tone="dark" className="lg:justify-end" />
      </div>
      <p className="mx-auto mt-8 max-w-[90rem] px-[clamp(1.25rem,4vw,2.5rem)] text-[0.65rem] leading-relaxed text-paper/35">
        {legalDisclaimer}
      </p>
    </section>
  );
}

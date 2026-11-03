import type { Route } from "./+types/solutions.add-ons-integrations";
import { SolutionDetail } from "~/components/sections/SolutionDetail";
import { addons } from "~/data/solutions";
import { pageMeta } from "~/lib/meta";

export function meta(): Route.MetaDescriptors {
  return pageMeta({
    title: "ERP add-ons & integrations",
    description:
      "Companion applications for SAP Business One—materials, assets, analytics, barcodes, inventory transfer, and bank payments.",
    pathname: "/solutions/add-ons-integrations",
  });
}

export default function AddonsPage() {
  return (
    <SolutionDetail
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Solutions", href: "/solutions" },
        {
          label: "Add-ons & integrations",
          href: "/solutions/add-ons-integrations",
        },
      ]}
      eyebrow="Fig. — Integrations"
      title="ERP add-ons & integrations"
      description="Companion applications that extend and connect your ERP core. Availability and scope are confirmed for each engagement."
      intro={[
        "These offerings match Axleta’s published materials. Each connects a specific operational situation back to the ERP instead of living as a side system.",
      ]}
      ctaLabel="Discuss add-ons"
      ctaTo="/contact?interest=add-ons"
    >
      <ul className="divide-y divide-[color-mix(in_srgb,var(--color-steel)_30%,transparent)] border-y border-[color-mix(in_srgb,var(--color-steel)_30%,transparent)]">
        {addons.map((addon, i) => (
          <li key={addon.id} className="py-8">
            <div className="grid gap-3 md:grid-cols-[4rem_1fr]">
              <span className="text-label text-oxide">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="font-display text-xl font-semibold tracking-[-0.03em]">
                  {addon.name}
                </h2>
                <dl className="mt-5 grid gap-5 text-sm md:grid-cols-2">
                  <div>
                    <dt className="text-label mb-1.5 text-oxide">Situation</dt>
                    <dd className="text-ink/70">{addon.situation}</dd>
                  </div>
                  <div>
                    <dt className="text-label mb-1.5 text-oxide">What it does</dt>
                    <dd className="text-ink/70">{addon.solution}</dd>
                  </div>
                  <div>
                    <dt className="text-label mb-1.5 text-oxide">ERP connection</dt>
                    <dd className="text-ink/70">{addon.connection}</dd>
                  </div>
                  <div>
                    <dt className="text-label mb-1.5 text-oxide">Benefit</dt>
                    <dd className="text-ink/70">{addon.benefit}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </SolutionDetail>
  );
}

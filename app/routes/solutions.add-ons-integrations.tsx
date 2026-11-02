import type { Route } from "./+types/solutions.add-ons-integrations";
import { LinkButton } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { PageHero } from "~/components/ui/PageHero";
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
    <main id="main">
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          {
            label: "Add-ons & integrations",
            href: "/solutions/add-ons-integrations",
          },
        ]}
        eyebrow="Integrations"
        title="ERP add-ons & integrations"
        description="These offerings match Axleta's published materials. Availability and scope are confirmed for each engagement."
      />
      <Container className="py-12 md:py-16">
        <div className="space-y-0">
          {addons.map((addon, i) => (
            <article
              key={addon.id}
              className="grid gap-4 border-t border-subtle py-10 last:border-b lg:grid-cols-[4rem_1fr]"
            >
              <span className="text-2xl font-bold text-[var(--color-brand)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="text-h2">{addon.name}</h2>
                <dl className="mt-6 grid gap-6 text-sm md:grid-cols-2">
                  <div>
                    <dt className="text-eyebrow mb-2">Situation</dt>
                    <dd className="text-muted">{addon.situation}</dd>
                  </div>
                  <div>
                    <dt className="text-eyebrow mb-2">What it does</dt>
                    <dd className="text-muted">{addon.solution}</dd>
                  </div>
                  <div>
                    <dt className="text-eyebrow mb-2">ERP connection</dt>
                    <dd className="text-muted">{addon.connection}</dd>
                  </div>
                  <div>
                    <dt className="text-eyebrow mb-2">Benefit</dt>
                    <dd className="text-muted">{addon.benefit}</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
        <LinkButton to="/contact?interest=add-ons" variant="primary" className="my-12">
          Discuss add-ons
        </LinkButton>
      </Container>
    </main>
  );
}

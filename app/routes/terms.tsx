import type { Route } from "./+types/terms";
import { Container } from "~/components/ui/Container";
import { PageHero } from "~/components/ui/PageHero";
import { site } from "~/data/site";
import { pageMeta } from "~/lib/meta";

export function meta(): Route.MetaDescriptors {
  return pageMeta({
    title: "Terms",
    description: "Informational terms for use of the Axleta website.",
    pathname: "/terms",
  });
}

export default function Terms() {
  return (
    <main id="main">
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Terms", href: "/terms" },
        ]}
        title="Website terms"
      />
      <Container narrow className="py-16 md:py-20">
        <div className="prose-axleta text-muted">
          <p>
            Content on this website is provided for general information about{" "}
            {site.name} services. It is not a quote, contract, or guarantee of
            outcomes. Engagements are defined in separate agreements.
          </p>
          <p>
            SAP, PartnerEdge, Google, Google Cloud, and Google Workspace are
            trademarks of their respective owners. {site.name} is an independent
            consultancy and is not SAP SE or Google LLC.
          </p>
          <p>
            Contacting us through this site starts a conversation; it does not
            obligate either party. Ask your counsel to review terms that govern
            paid services.
          </p>
        </div>
      </Container>
    </main>
  );
}

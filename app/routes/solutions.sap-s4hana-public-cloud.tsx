import type { Route } from "./+types/solutions.sap-s4hana-public-cloud";
import { LinkButton } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { PageHero } from "~/components/ui/PageHero";
import { pageMeta } from "~/lib/meta";

export function meta(): Route.MetaDescriptors {
  return pageMeta({
    title: "SAP S/4HANA Public Cloud",
    description:
      "Advisory and planning for SAP S/4HANA Public Cloud—public cloud ERP fit, readiness, and connected business processes.",
    pathname: "/solutions/sap-s4hana-public-cloud",
  });
}

export default function SapS4Hana() {
  return (
    <main id="main">
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          {
            label: "SAP S/4HANA Public Cloud",
            href: "/solutions/sap-s4hana-public-cloud",
          },
        ]}
        eyebrow="ERP"
        title="SAP S/4HANA Public Cloud"
        description="Public cloud ERP for organizations evaluating standardized processes, extensibility, and cloud operations."
      />
      <Container narrow className="py-16 md:py-20">
        <div className="prose-axleta text-muted">
          <p>
            SAP S/4HANA Public Cloud is distinct from SAP Business One in scale,
            deployment model, and process scope. Axleta helps you evaluate fit,
            readiness, and a realistic path—without implying either product is
            always preferable.
          </p>
          <p>
            Conversations typically cover connected business processes, cloud
            responsibilities, and how extensions and integrations would align
            with your operations.
          </p>
        </div>
        <LinkButton to="/contact?interest=s4hana" variant="primary" className="mt-10">
          Discuss S/4HANA Public Cloud
        </LinkButton>
      </Container>
    </main>
  );
}

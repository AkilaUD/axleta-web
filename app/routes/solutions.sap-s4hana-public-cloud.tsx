import type { Route } from "./+types/solutions.sap-s4hana-public-cloud";
import { SolutionDetail } from "~/components/sections/SolutionDetail";
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
    <SolutionDetail
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Solutions", href: "/solutions" },
        {
          label: "SAP S/4HANA Public Cloud",
          href: "/solutions/sap-s4hana-public-cloud",
        },
      ]}
      eyebrow="Fig. — ERP"
      title="SAP S/4HANA Public Cloud"
      description="Public cloud ERP for organizations evaluating standardized processes, extensibility, and cloud operations."
      intro={[
        "SAP S/4HANA Public Cloud is distinct from SAP Business One in scale, deployment model, and process scope. Axleta helps you evaluate fit, readiness, and a realistic path—without implying either product is always preferable.",
        "Conversations typically cover connected business processes, cloud responsibilities, and how extensions and integrations would align with your operations.",
      ]}
      points={[
        {
          title: "Readiness first",
          body: "We assess process standardization, data quality, and change capacity before recommending a public cloud path.",
        },
        {
          title: "Clear responsibilities",
          body: "Cloud operations, extensibility, and integration boundaries are discussed in plain business language.",
        },
        {
          title: "Connected processes",
          body: "Finance, supply chain, and reporting needs are mapped to how teams will actually run day to day.",
        },
      ]}
      ctaLabel="Discuss S/4HANA Public Cloud"
      ctaTo="/contact?interest=s4hana"
    />
  );
}

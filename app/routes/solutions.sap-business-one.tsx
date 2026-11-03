import type { Route } from "./+types/solutions.sap-business-one";
import { SolutionDetail } from "~/components/sections/SolutionDetail";
import { erpModules } from "~/data/capabilities";
import { pageMeta } from "~/lib/meta";

export function meta(): Route.MetaDescriptors {
  return pageMeta({
    title: "SAP Business One",
    description:
      "SAP Business One for SME operations—finance, sales, purchasing, inventory, manufacturing, and MRP with Axleta implementation support.",
    pathname: "/solutions/sap-business-one",
  });
}

export default function SapBusinessOne() {
  return (
    <SolutionDetail
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Solutions", href: "/solutions" },
        { label: "SAP Business One", href: "/solutions/sap-business-one" },
      ]}
      eyebrow="Fig. — ERP"
      title="SAP Business One"
      description="An ERP designed for small and midsize businesses—operational modules connected in one system."
      intro={[
        "Axleta assists with selection, implementation, companion applications, and support where included in your engagement.",
        "We map modules to how your teams actually buy, sell, stock, and report—so the system fits the operating model, not the other way around.",
      ]}
      points={[
        {
          title: "Fit before features",
          body: "We start with workflows and constraints, then confirm whether Business One is the right operational core.",
        },
        {
          title: "Implementation with clarity",
          body: "Configuration, data, integrations, and training are scoped to agreed outcomes—not a generic checklist.",
        },
        {
          title: "Room to extend",
          body: "Add-ons and integrations can connect materials, analytics, barcodes, and payments when the core is stable.",
        },
      ]}
      listTitle="Core modules"
      listItems={[...erpModules]}
      ctaLabel="Discuss SAP Business One"
      ctaTo="/contact?interest=sap-b1"
    />
  );
}

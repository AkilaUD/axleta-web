import type { Route } from "./+types/solutions.erp";
import { ArchitectureDiagram } from "~/components/diagrams/ArchitectureDiagram";
import { LinkButton } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { PageHero } from "~/components/ui/PageHero";
import { erpModules } from "~/data/capabilities";
import { getImage } from "~/data/images";
import { erpComparisonRows } from "~/data/solutions";
import { pageMeta } from "~/lib/meta";
import { breadcrumbJsonLd } from "~/lib/seo";
import { JsonLd } from "~/components/seo/JsonLd";

export function meta(): Route.MetaDescriptors {
  return pageMeta({
    title: "ERP solutions",
    description:
      "ERP selection and implementation for SMEs—SAP Business One and SAP S/4HANA Public Cloud with Axleta consultancy.",
    pathname: "/solutions/erp",
  });
}

export default function ErpSolutions() {
  const image = getImage("erp");
  return (
    <main id="main">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Solutions", href: "/solutions" },
          { name: "ERP", href: "/solutions/erp" },
        ])}
      />
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: "ERP solutions", href: "/solutions/erp" },
        ]}
        eyebrow="ERP"
        title="ERP as the operational core"
        description="Enterprise resource planning connects sales, finance, inventory, and manufacturing. Neither platform is always the better choice—selection follows assessment."
        imageSrc={image?.path}
        imageAlt={image?.alt}
      >
        <LinkButton to="/contact?interest=erp" variant="primary">
          Discuss your ERP requirements
        </LinkButton>
      </PageHero>
      <Container className="grid gap-16 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <h2 className="text-h2">What ERP connects</h2>
          <ul className="mt-6 space-y-3">
            {erpModules.map((m) => (
              <li key={m} className="border-l-2 border-[var(--color-brand)] pl-4 text-muted">
                {m}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-[var(--color-shell)] p-6 text-white">
          <ArchitectureDiagram />
        </div>
      </Container>
      <Container className="pb-20">
        <h2 className="mb-6 text-h2">Comparison framework</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
            <caption className="sr-only">
              Comparison framework for SAP Business One and SAP S/4HANA Public Cloud
            </caption>
            <thead>
              <tr className="border-y border-subtle bg-surface">
                <th scope="col" className="p-4 font-semibold">
                  Aspect
                </th>
                <th scope="col" className="p-4 font-semibold">
                  SAP Business One
                </th>
                <th scope="col" className="p-4 font-semibold">
                  SAP S/4HANA Public Cloud
                </th>
              </tr>
            </thead>
            <tbody>
              {erpComparisonRows.map((row) => (
                <tr key={row.aspect} className="border-b border-subtle">
                  <th scope="row" className="p-4 font-medium">
                    {row.aspect}
                  </th>
                  <td className="p-4 text-muted">{row.b1}</td>
                  <td className="p-4 text-muted">{row.s4}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-8 max-w-prose text-muted">
          When a business may need ERP: growing transaction volume, duplicated
          spreadsheets, inventory and finance out of sync, or planning that
          requires integrated data. Implementation scope is agreed per engagement.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <LinkButton to="/solutions/sap-business-one" variant="ghost">
            SAP Business One
          </LinkButton>
          <LinkButton to="/solutions/sap-s4hana-public-cloud" variant="ghost">
            SAP S/4HANA Public Cloud
          </LinkButton>
        </div>
      </Container>
    </main>
  );
}

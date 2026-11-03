import { Link } from "react-router";
import type { Route } from "./+types/solutions.erp";
import { LinkButton } from "~/components/ui/Button";
import { PageHero } from "~/components/ui/PageHero";
import { CtaBlock } from "~/components/sections/CtaBlock";
import { erpModules } from "~/data/capabilities";
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
        eyebrow="Fig. — ERP"
        title="ERP as the operational core"
        description="Enterprise resource planning connects sales, finance, inventory, and manufacturing. Neither platform is always the better choice—selection follows assessment."
      >
        <LinkButton to="/contact?interest=erp" variant="primary">
          Discuss your ERP requirements
        </LinkButton>
      </PageHero>

      <section className="bg-paper py-[12vh] text-ink">
        <div className="mx-auto grid max-w-[90rem] gap-14 px-[clamp(1.25rem,4vw,2.5rem)] lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-label text-oxide">What ERP connects</p>
            <ol className="mt-6 divide-y divide-[color-mix(in_srgb,var(--color-steel)_30%,transparent)] border-y border-[color-mix(in_srgb,var(--color-steel)_30%,transparent)]">
              {erpModules.map((m, i) => (
                <li
                  key={m}
                  className="grid grid-cols-[3.5rem_1fr] items-baseline py-4"
                >
                  <span className="text-label text-oxide">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-lg font-semibold tracking-[-0.02em]">
                    {m}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="border border-[color-mix(in_srgb,var(--color-steel)_35%,transparent)] bg-ink p-8 text-paper md:p-10">
            <p className="text-label text-oxide">Platform paths</p>
            <ul className="mt-8 space-y-8">
              <li>
                <Link
                  to="/solutions/sap-business-one"
                  className="group block"
                  data-cursor="OPEN"
                >
                  <span className="font-display text-2xl font-semibold tracking-[-0.03em] group-hover:text-oxide">
                    SAP Business One
                  </span>
                  <span className="mt-2 block text-sm text-paper/65">
                    Integrated operational ERP for small and midsize businesses.
                  </span>
                </Link>
              </li>
              <li className="border-t border-paper/15 pt-8">
                <Link
                  to="/solutions/sap-s4hana-public-cloud"
                  className="group block"
                  data-cursor="OPEN"
                >
                  <span className="font-display text-2xl font-semibold tracking-[-0.03em] group-hover:text-oxide">
                    SAP S/4HANA Public Cloud
                  </span>
                  <span className="mt-2 block text-sm text-paper/65">
                    Public cloud ERP when standardized processes and cloud
                    operations fit.
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-[color-mix(in_srgb,var(--color-steel)_30%,transparent)] bg-paper pb-[12vh] text-ink">
        <div className="mx-auto max-w-[90rem] px-[clamp(1.25rem,4vw,2.5rem)] pt-16">
          <p className="text-label text-oxide">Comparison framework</p>
          <h2 className="mt-3 max-w-[18ch] font-display text-[clamp(1.75rem,3vw,2.75rem)] font-semibold tracking-[-0.03em]">
            Choose by fit, not by feature list.
          </h2>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
              <caption className="sr-only">
                Comparison framework for SAP Business One and SAP S/4HANA Public
                Cloud
              </caption>
              <thead>
                <tr className="border-y border-[color-mix(in_srgb,var(--color-steel)_35%,transparent)]">
                  <th scope="col" className="text-label py-4 pr-6 text-oxide">
                    Aspect
                  </th>
                  <th scope="col" className="text-label py-4 pr-6 text-oxide">
                    SAP Business One
                  </th>
                  <th scope="col" className="text-label py-4 text-oxide">
                    SAP S/4HANA Public Cloud
                  </th>
                </tr>
              </thead>
              <tbody>
                {erpComparisonRows.map((row) => (
                  <tr
                    key={row.aspect}
                    className="border-b border-[color-mix(in_srgb,var(--color-steel)_25%,transparent)] align-top"
                  >
                    <th
                      scope="row"
                      className="py-5 pr-6 font-display text-base font-semibold tracking-[-0.02em]"
                    >
                      {row.aspect}
                    </th>
                    <td className="py-5 pr-6 text-ink/70">{row.b1}</td>
                    <td className="py-5 text-ink/70">{row.s4}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-8 max-w-2xl text-ink/65">
            When a business may need ERP: growing transaction volume, duplicated
            spreadsheets, inventory and finance out of sync, or planning that
            requires integrated data. Implementation scope is agreed per
            engagement.
          </p>
        </div>
      </section>

      <CtaBlock />
    </main>
  );
}

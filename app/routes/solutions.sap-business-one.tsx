import type { Route } from "./+types/solutions.sap-business-one";
import { LinkButton } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { PageHero } from "~/components/ui/PageHero";
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
    <main id="main">
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: "SAP Business One", href: "/solutions/sap-business-one" },
        ]}
        eyebrow="ERP"
        title="SAP Business One"
        description="An ERP designed for small and midsize businesses—operational modules connected in one system."
      />
      <Container narrow className="py-16 md:py-20">
        <ol className="mb-10">
          {erpModules.map((m, i) => (
            <li
              key={m}
              className="grid grid-cols-[3rem_1fr] border-t border-subtle py-4 last:border-b"
            >
              <span className="font-bold text-[var(--color-brand)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{m}</span>
            </li>
          ))}
        </ol>
        <p className="text-muted">
          Axleta assists with selection, implementation, companion applications,
          and support where included in your engagement.
        </p>
        <LinkButton to="/contact?interest=sap-b1" variant="primary" className="mt-10">
          Discuss SAP Business One
        </LinkButton>
      </Container>
    </main>
  );
}

import { Link } from "react-router";
import type { Route } from "./+types/solutions._index";
import { PageHero } from "~/components/ui/PageHero";
import { Container } from "~/components/ui/Container";
import { solutionFamilies } from "~/data/solutions";
import { pageMeta } from "~/lib/meta";

export function meta(): Route.MetaDescriptors {
  return pageMeta({
    title: "Solutions",
    description:
      "ERP, cloud infrastructure, Google Workspace, automation, and integrations for SMEs—explore Axleta solution families.",
    pathname: "/solutions",
  });
}

export default function SolutionsHub() {
  return (
    <main id="main">
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
        ]}
        eyebrow="Solutions"
        title="Solutions that connect operations to technology"
        description="Explore areas where we help SMEs select, implement, and extend business systems."
      />
      <Container className="py-8 md:py-12">
        <ul>
          {solutionFamilies.map((fam, i) => (
            <li key={fam.href} className="border-t border-subtle last:border-b">
              <Link
                to={fam.href}
                className="group grid gap-3 py-8 md:grid-cols-[4rem_minmax(0,0.9fr)_minmax(0,1.4fr)] md:items-baseline"
              >
                <span className="text-2xl font-bold text-[var(--color-brand)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="text-h3 group-hover:text-[var(--color-brand-hover)]">
                  {fam.title}
                </h2>
                <p className="text-muted">{fam.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </main>
  );
}

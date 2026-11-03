import { Link } from "react-router";
import type { Route } from "./+types/solutions._index";
import { PageHero } from "~/components/ui/PageHero";
import { CtaBlock } from "~/components/sections/CtaBlock";
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
        eyebrow="Fig. — Solutions"
        title="Solutions that connect operations to technology"
        description="Explore areas where we help SMEs select, implement, and extend business systems."
      />
      <section className="bg-paper py-8 text-ink md:py-12">
        <ul className="mx-auto max-w-[90rem] px-[clamp(1.25rem,4vw,2.5rem)]">
          {solutionFamilies.map((fam, i) => (
            <li
              key={fam.href}
              className="border-t border-[color-mix(in_srgb,var(--color-steel)_30%,transparent)] last:border-b"
            >
              <Link
                to={fam.href}
                className="group grid gap-3 py-8 md:grid-cols-[5rem_minmax(0,0.9fr)_minmax(0,1.4fr)_auto] md:items-baseline"
                data-cursor="OPEN"
              >
                <span className="text-label text-oxide">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display text-[clamp(1.5rem,2.5vw,2.25rem)] font-semibold tracking-[-0.03em] group-hover:text-oxide">
                  {fam.title}
                </h2>
                <p className="text-ink/65">{fam.description}</p>
                <span className="text-label hidden text-steel transition group-hover:text-oxide md:inline">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <CtaBlock />
    </main>
  );
}

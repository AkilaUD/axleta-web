import { useMemo, useState } from "react";
import { Link } from "react-router";
import { LayoutGroup, motion } from "motion/react";
import type { Route } from "./+types/insights._index";
import { PageHero } from "~/components/ui/PageHero";
import { LinkButton } from "~/components/ui/Button";
import { CtaBlock } from "~/components/sections/CtaBlock";
import {
  getAllInsights,
  type InsightCategory,
} from "~/lib/insights.server";
import { pageMeta } from "~/lib/meta";

const categories: Array<InsightCategory | "All"> = [
  "All",
  "ERP",
  "SAP Business One",
  "Cloud & Infrastructure",
  "Business Productivity",
  "Automation",
  "Technology Strategy",
];

export function meta(): Route.MetaDescriptors {
  return pageMeta({
    title: "Insights",
    description:
      "Articles on ERP architecture, SAP Business One, cloud infrastructure, and practical technology guidance from Axleta.",
    pathname: "/insights",
  });
}

export function loader() {
  return { posts: getAllInsights() };
}

export default function InsightsIndexPage({
  loaderData,
}: Route.ComponentProps) {
  const { posts } = loaderData;
  const [category, setCategory] = useState<InsightCategory | "All">("All");

  const filtered = useMemo(() => {
    return posts.filter(
      (post) => category === "All" || post.category === category,
    );
  }, [posts, category]);

  return (
    <main id="main">
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/insights" },
        ]}
        eyebrow="Fig. — Editorial"
        title="Insights"
        description="Practical guidance on ERP, infrastructure, and technology decisions."
      />

      <section className="bg-paper py-12 text-ink md:py-16">
        <div className="mx-auto max-w-[90rem] px-[clamp(1.25rem,4vw,2.5rem)]">
          <LayoutGroup>
            <div className="mb-10 flex flex-wrap gap-2">
              {categories.map((c) => {
                const on = category === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    className={`text-label relative px-3 py-2 ${
                      on ? "text-oxide" : "text-steel hover:text-ink"
                    }`}
                  >
                    {on ? (
                      <motion.span
                        layoutId="insight-filter"
                        className="absolute inset-0 border border-oxide"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    <span className="relative z-[1]">{c}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>

          <p className="text-label mb-6 text-steel">
            {filtered.length} article{filtered.length === 1 ? "" : "s"}
          </p>

          {filtered.length === 0 ? (
            <div className="border border-[color-mix(in_srgb,var(--color-steel)_35%,transparent)] p-10 text-center">
              <p className="text-ink/65">No articles match your filters.</p>
              <LinkButton to="/contact" variant="ghost" className="mt-4">
                Ask Axleta a question
              </LinkButton>
            </div>
          ) : (
            <ul className="border-t border-[color-mix(in_srgb,var(--color-steel)_30%,transparent)]">
              {filtered.map((post) => (
                <li key={post.slug}>
                  <Link
                    to={`/insights/${post.slug}`}
                    className="group grid grid-cols-1 items-baseline gap-2 border-b border-[color-mix(in_srgb,var(--color-steel)_30%,transparent)] py-7 md:grid-cols-[7rem_10rem_1fr_auto] md:gap-6"
                    data-cursor="VIEW"
                  >
                    <span className="text-label text-steel">
                      {post.publishedAt}
                    </span>
                    <span className="text-label text-oxide">{post.category}</span>
                    <span className="font-display text-[clamp(1.25rem,2.4vw,2rem)] font-semibold tracking-[-0.03em] group-hover:text-oxide">
                      {post.title}
                    </span>
                    <span className="text-label hidden text-steel md:inline">
                      {post.readingMinutes} min ↗
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <CtaBlock />
    </main>
  );
}

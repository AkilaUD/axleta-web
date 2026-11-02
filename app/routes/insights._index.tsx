import { useMemo, useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/insights._index";
import { Container } from "~/components/ui/Container";
import { PageHero } from "~/components/ui/PageHero";
import { LinkButton } from "~/components/ui/Button";
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

export default function InsightsIndex({ loaderData }: Route.ComponentProps) {
  const { posts } = loaderData;
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<InsightCategory | "All">("All");

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchCat = category === "All" || post.category === category;
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [posts, query, category]);

  const featured = posts[0];

  return (
    <main id="main">
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/insights" },
        ]}
        eyebrow="Editorial"
        title="Insights"
        description="Practical guidance on ERP, infrastructure, and technology decisions."
      />
      <Container className="py-12 md:py-16">
        {featured ? (
          <article className="mb-12 border-y border-subtle py-10">
            <p className="text-eyebrow">Featured</p>
            <h2 className="mt-2 text-h2">
              <Link to={`/insights/${featured.slug}`}>{featured.title}</Link>
            </h2>
            <p className="mt-2 text-muted">{featured.excerpt}</p>
            <Link
              to={`/insights/${featured.slug}`}
              className="mt-4 inline-block text-sm font-semibold text-[var(--color-brand-hover)] hover:underline"
            >
              Read article
            </Link>
          </article>
        ) : null}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <label className="block flex-1 text-sm">
            <span className="mb-1 block font-medium">Search</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-h-11 w-full max-w-md rounded-[var(--radius-button)] border border-subtle px-3"
              placeholder="Search insights"
            />
          </label>
          <div>
            <span className="mb-1 block text-sm font-medium">Category</span>
            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as InsightCategory | "All")
              }
              className="min-h-11 rounded-[var(--radius-button)] border border-subtle px-3"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="mb-6 text-small text-muted">
          {filtered.length} article{filtered.length === 1 ? "" : "s"}
        </p>
        {filtered.length === 0 ? (
          <div className="rounded-[var(--radius-card)] border border-subtle p-8 text-center">
            <p className="text-muted">No articles match your filters.</p>
            <LinkButton to="/contact" variant="ghost" className="mt-4">
              Ask Axleta a question
            </LinkButton>
          </div>
        ) : (
          <ul>
            {filtered.map((post) => (
              <li key={post.slug} className="border-t border-subtle last:border-b">
                <article className="grid gap-3 py-8 md:grid-cols-[8rem_1fr_10rem]">
                  <p className="text-eyebrow">{post.category}</p>
                  <div>
                    <h2 className="text-h3">
                      <Link to={`/insights/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="mt-2 text-small text-muted">{post.excerpt}</p>
                  </div>
                  <p className="text-small text-muted md:text-right">
                    {post.publishedAt} · {post.readingMinutes} min
                  </p>
                </article>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </main>
  );
}

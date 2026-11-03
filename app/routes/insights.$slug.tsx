import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "react-router";
import type { Route } from "./+types/insights.$slug";
import { PageHero } from "~/components/ui/PageHero";
import { Container } from "~/components/ui/Container";
import { Prose } from "~/components/ui/Prose";
import { CtaBlock } from "~/components/sections/CtaBlock";
import { ReadingProgress } from "~/components/layout/ReadingProgress";
import { JsonLd } from "~/components/seo/JsonLd";
import {
  getAllInsights,
  getInsightBySlug,
} from "~/lib/insights.server";
import { getInsightMeta } from "~/data/insightIndex";
import { pageMeta } from "~/lib/meta";
import { articleJsonLd, breadcrumbJsonLd } from "~/lib/seo";

export function meta({ params }: Route.MetaArgs) {
  const post = getInsightMeta(params.slug ?? "");
  if (!post) {
    return pageMeta({
      title: "Article not found",
      description: "Insights article",
      pathname: "/insights",
      noIndex: true,
    });
  }
  return pageMeta({
    title: post.title,
    description: post.excerpt,
    pathname: `/insights/${post.slug}`,
    type: "article",
  });
}

export function loader({ params }: Route.LoaderArgs) {
  const post = getInsightBySlug(params.slug ?? "");
  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }
  const related = getAllInsights()
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);
  return { post, related };
}

export default function InsightArticle({ loaderData }: Route.ComponentProps) {
  const { post, related } = loaderData;
  const shareUrl = `https://www.axleta.com/insights/${post.slug}`;

  return (
    <main id="main">
      <ReadingProgress />
      <JsonLd
        data={[
          articleJsonLd({
            headline: post.title,
            datePublished: post.publishedAt,
            pathname: `/insights/${post.slug}`,
          }),
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Insights", href: "/insights" },
            { name: post.title, href: `/insights/${post.slug}` },
          ]),
        ]}
      />
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/insights" },
          { label: post.title, href: `/insights/${post.slug}` },
        ]}
        eyebrow={post.category}
        title={post.title}
        description={`${post.publishedAt} · ${post.readingMinutes} min read`}
        tone="paper"
      />
      <Container narrow className="py-16">
        <Prose large>
          <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
        </Prose>
        <div className="mt-10 flex flex-wrap gap-5 border-t border-[color-mix(in_srgb,var(--color-steel)_30%,transparent)] pt-8">
          <button
            type="button"
            className="text-label text-oxide link-draw"
            onClick={() => navigator.clipboard?.writeText(shareUrl)}
          >
            Copy link
          </button>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            rel="noopener noreferrer"
            target="_blank"
            className="text-label text-oxide link-draw"
          >
            Share on LinkedIn
          </a>
          <a
            href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(shareUrl)}`}
            className="text-label text-oxide link-draw"
          >
            Email
          </a>
        </div>
        {related.length > 0 ? (
          <section className="mt-16">
            <p className="text-label text-oxide">Related</p>
            <ul className="mt-4 divide-y divide-[color-mix(in_srgb,var(--color-steel)_30%,transparent)] border-y border-[color-mix(in_srgb,var(--color-steel)_30%,transparent)]">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    to={`/insights/${r.slug}`}
                    className="group flex items-baseline justify-between gap-4 py-5"
                    data-cursor="OPEN"
                  >
                    <span className="font-display text-lg font-semibold tracking-[-0.02em] group-hover:text-oxide">
                      {r.title}
                    </span>
                    <span className="text-label shrink-0 text-steel group-hover:text-oxide">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </Container>
      <CtaBlock />
    </main>
  );
}

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "react-router";
import type { Route } from "./+types/insights.$slug";
import { PageHero } from "~/components/ui/PageHero";
import { Container } from "~/components/ui/Container";
import { Prose } from "~/components/ui/Prose";
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
      />
      <Container narrow className="py-16">
        <Prose large>
          <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
        </Prose>
        <div className="mt-10 flex flex-wrap gap-4 border-t border-subtle pt-8 text-sm">
          <button
            type="button"
            className="text-[var(--color-brand-hover)] hover:underline"
            onClick={() => navigator.clipboard?.writeText(shareUrl)}
          >
            Copy link
          </button>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            rel="noopener noreferrer"
            target="_blank"
            className="text-[var(--color-brand-hover)] hover:underline"
          >
            Share on LinkedIn
          </a>
          <a
            href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(shareUrl)}`}
            className="text-[var(--color-brand-hover)] hover:underline"
          >
            Email
          </a>
        </div>
        {related.length > 0 ? (
          <section className="mt-12">
            <h2 className="text-h2">Related</h2>
            <ul className="mt-4 space-y-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    to={`/insights/${r.slug}`}
                    className="text-[var(--color-brand-hover)] hover:underline"
                  >
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </Container>
    </main>
  );
}

import { site } from "~/data/site";

export function pageMeta(input: {
  title: string;
  description: string;
  pathname: string;
  type?: "website" | "article";
  noIndex?: boolean;
}) {
  const fullTitle = `${input.title} | ${site.name} — ${site.tagline}`;
  const url = `${site.origin}${input.pathname}`;
  const image = `${site.origin}/og/default.jpg`;

  const tags: Array<
    | { title: string }
    | { name: string; content: string }
    | { property: string; content: string }
    | { tagName: "link"; rel: string; href: string }
  > = [
    { title: fullTitle },
    { name: "description", content: input.description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: input.description },
    { property: "og:url", content: url },
    { property: "og:type", content: input.type ?? "website" },
    { property: "og:image", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: input.description },
    { name: "twitter:image", content: image },
  ];

  if (input.noIndex) {
    tags.push({ name: "robots", content: "noindex" });
  }

  return tags;
}

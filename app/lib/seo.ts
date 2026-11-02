import { site } from "~/data/site";

const ORIGIN = site.origin;

export type PageMetaInput = {
  title: string;
  description: string;
  pathname: string;
  type?: "website" | "article";
  image?: string;
  noIndex?: boolean;
};

export function buildMeta({
  title,
  description,
  pathname,
  type = "website",
  image = "/og/default.jpg",
  noIndex = false,
}: PageMetaInput) {
  const fullTitle = `${title} | ${site.name} — ${site.tagline}`;
  const url = `${ORIGIN}${pathname}`;
  const imageUrl = image.startsWith("http") ? image : `${ORIGIN}${image}`;

  const tags: { title?: string; name?: string; property?: string; content?: string; charSet?: string; tagName?: string }[] =
    [
      { title: fullTitle },
      { name: "description", content: description },
      { tagName: "link", rel: "canonical", href: url } as unknown as {
        title: string;
      },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: type },
      { property: "og:image", content: imageUrl },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: imageUrl },
    ];

  if (noIndex) {
    tags.push({ name: "robots", content: "noindex" });
  }

  return tags;
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.origin,
    email: site.email,
    sameAs: [site.linkedIn],
    contactPoint: {
      "@type": "ContactPoint",
      email: site.email,
      contactType: "customer service",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postal,
      addressCountry: site.address.country,
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.origin,
  };
}

export function breadcrumbJsonLd(
  items: { name: string; href: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${ORIGIN}${item.href}`,
    })),
  };
}

export function articleJsonLd(input: {
  headline: string;
  datePublished: string;
  pathname: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    datePublished: input.datePublished,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${ORIGIN}${input.pathname}`,
    image: input.image ? `${ORIGIN}${input.image}` : `${ORIGIN}/og/default.jpg`,
  };
}

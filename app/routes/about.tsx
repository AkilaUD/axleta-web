import type { Route } from "./+types/about";
import { PageHero } from "~/components/ui/PageHero";
import { LinkButton } from "~/components/ui/Button";
import { CtaBlock } from "~/components/sections/CtaBlock";
import { getImage } from "~/data/images";
import { site } from "~/data/site";
import { pageMeta } from "~/lib/meta";
import { breadcrumbJsonLd, organizationJsonLd } from "~/lib/seo";
import { JsonLd } from "~/components/seo/JsonLd";

export function meta(): Route.MetaDescriptors {
  return pageMeta({
    title: "About",
    description:
      "Axleta is an IT services firm launched in 2018 to help SMEs advance business operations through the right technology.",
    pathname: "/about",
  });
}

export default function About() {
  const photo = getImage("consulting");

  return (
    <main id="main">
      <JsonLd
        data={[
          organizationJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "About", href: "/about" },
          ]),
        ]}
      />
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
        eyebrow="Fig. — Company"
        title="A technology partner grounded in business understanding."
        description={`${site.name} was launched in ${site.foundedYear} as an IT service firm supplying technology-driven systems and solutions for SMEs.`}
        imageSrc={photo?.path}
        imageAlt={photo?.alt}
      >
        <LinkButton to="/contact?interest=consulting" variant="primary">
          Discuss a requirement
        </LinkButton>
      </PageHero>

      <section className="bg-paper py-[14vh] text-ink">
        <div className="mx-auto grid max-w-[90rem] gap-16 px-[clamp(1.25rem,4vw,2.5rem)] lg:grid-cols-[0.85fr_1.15fr]">
          <blockquote className="font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.15] italic text-ink">
            “{site.vision}”
          </blockquote>
          <div className="max-w-prose space-y-5 text-lg leading-relaxed text-ink/75">
            <p>
              We help businesses choose technology that fits how they operate—
              then connect systems, people, and processes so day-to-day work
              gets clearer and more reliable.
            </p>
            <p>
              We value simplicity, respect your context, and work through SMART
              objectives: specific, measurable, achievable, realistic, and
              time-bound outcomes.
            </p>
            <h2 className="mt-10 font-display text-2xl font-semibold tracking-[-0.03em] text-ink">
              Mission
            </h2>
            <p>{site.mission}</p>
          </div>
        </div>
      </section>

      <section className="border-y border-[color-mix(in_srgb,var(--color-steel)_30%,transparent)] bg-ink py-16 text-paper">
        <div className="mx-auto grid max-w-[90rem] gap-10 px-[clamp(1.25rem,4vw,2.5rem)] md:grid-cols-3">
          {[
            {
              k: "Founded",
              v: String(site.foundedYear),
            },
            {
              k: "Focus",
              v: "SME technology & operations",
            },
            {
              k: "Base",
              v: `${site.address.city}, ${site.address.region}`,
            },
          ].map((row) => (
            <div key={row.k}>
              <p className="text-label text-oxide">{row.k}</p>
              <p className="mt-2 font-display text-2xl font-semibold tracking-[-0.03em]">
                {row.v}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-paper py-20 text-ink">
        <div className="mx-auto grid max-w-[90rem] gap-10 px-[clamp(1.25rem,4vw,2.5rem)] md:grid-cols-[1fr_1.2fr] md:items-end">
          <div>
            <p className="text-label text-oxide">Location</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em]">
              Brampton, Ontario
            </h2>
            <p className="mt-4 max-w-md text-ink/70">
              {site.address.label} — {site.address.line1}, {site.address.city},{" "}
              {site.address.region} {site.address.postal}
            </p>
          </div>
          <div className="border border-[color-mix(in_srgb,var(--color-steel)_35%,transparent)] bg-paper-2 p-8 md:p-10">
            <p className="text-label text-oxide">Coordinates</p>
            <p className="mt-3 font-mono text-sm tracking-wide text-ink/80">
              43.68° N · 79.76° W
            </p>
            <p className="mt-6 text-sm leading-relaxed text-ink/65">
              Serving SMEs with ERP, cloud, productivity, and automation
              engagements—from advisory through implementation and support.
            </p>
          </div>
        </div>
      </section>

      <CtaBlock />
    </main>
  );
}

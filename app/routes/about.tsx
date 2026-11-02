import type { Route } from "./+types/about";
import { PageHero } from "~/components/ui/PageHero";
import { Container } from "~/components/ui/Container";
import { LinkButton } from "~/components/ui/Button";
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
  const image = getImage("consulting");

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
        eyebrow="Company"
        title="A technology partner grounded in business understanding."
        description={`${site.name} was launched in ${site.foundedYear} as an IT service firm supplying technology-driven systems and solutions for SMEs.`}
        imageSrc={image?.path}
        imageAlt={image?.alt}
      >
        <LinkButton to="/contact?interest=consulting" variant="primary">
          Discuss a requirement
        </LinkButton>
      </PageHero>
      <Container className="grid gap-16 py-16 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] md:py-24">
        <div>
          <p className="text-h1 leading-snug text-text">{site.vision}</p>
        </div>
        <div className="prose-axleta max-w-prose text-muted">
          <p>
            The firm was founded to give technological solutions for businesses
            to enable business process advancement. We work with you to build a
            successful business with the right technology to suit your scenarios
            and make a partnership to update your business context through the
            right technology.
          </p>
          <p>
            We value simplicity, respect your values, and work through SMART
            objectives—specific, measurable, achievable, realistic, and
            time-bound tasks.
          </p>
          <h2>Mission</h2>
          <p>{site.mission}</p>
          <h2>Partnerships</h2>
          <p>{site.partners.google}</p>
          <p>{site.partners.sap}</p>
        </div>
      </Container>
    </main>
  );
}

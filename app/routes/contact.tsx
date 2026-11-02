import { useSearchParams } from "react-router";
import type { Route } from "./+types/contact";
import { ContactForm } from "~/components/contact/ContactForm";
import { PageHero } from "~/components/ui/PageHero";
import { Container } from "~/components/ui/Container";
import { parseContactInterest, site } from "~/data/site";
import { pageMeta } from "~/lib/meta";

export function meta(): Route.MetaDescriptors {
  return pageMeta({
    title: "Contact",
    description:
      "Tell Axleta about your business challenge—ERP, infrastructure, productivity, or automation. Brampton, Ontario and info@axleta.com.",
    pathname: "/contact",
  });
}

export default function Contact() {
  const [params] = useSearchParams();
  const interest = parseContactInterest(params.get("interest"));

  return (
    <main id="main">
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
        eyebrow="Contact"
        title="Start with the business challenge."
        description="Explain what you are trying to improve—we will follow up to understand context and next steps."
      />
      <Container className="grid gap-16 py-16 lg:grid-cols-2 lg:py-20">
        <address className="not-italic text-muted">
          <p className="text-h2 text-text">{site.address.label}</p>
          <p className="mt-4">{site.address.line1}</p>
          <p>
            {site.address.city}, {site.address.region} {site.address.postal}
          </p>
          <p className="mt-6">
            <a
              href={`mailto:${site.email}`}
              className="font-semibold text-[var(--color-brand-hover)] hover:underline"
            >
              {site.email}
            </a>
          </p>
        </address>
        <div className="border border-subtle bg-surface p-6 md:p-10">
          <ContactForm initialInterest={interest} />
        </div>
      </Container>
    </main>
  );
}

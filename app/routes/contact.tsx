import { useSearchParams } from "react-router";
import type { Route } from "./+types/contact";
import { ContactForm } from "~/components/contact/ContactForm";
import { parseContactInterest, site } from "~/data/site";
import { pageMeta } from "~/lib/meta";
import { LinkArrow } from "~/components/ui/LinkArrow";

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
    <main id="main" className="min-h-svh lg:grid lg:grid-cols-2">
      <section className="relative flex flex-col justify-end bg-ink px-[clamp(1.25rem,4vw,2.5rem)] pt-28 pb-16 text-paper lg:pb-20">
        <div className="grain grain--ink" aria-hidden />
        <div className="relative z-[1] max-w-xl">
          <p className="text-label text-oxide">Contact</p>
          <h1 className="mt-4 font-display text-[clamp(2.75rem,6vw,4.75rem)] font-semibold tracking-[-0.045em]">
            Start with the business challenge.
          </h1>
          <p className="mt-6 text-lg text-paper/70">
            Explain what you are trying to improve—we will follow up to
            understand context and next steps.
          </p>
          <address className="mt-12 not-italic">
            <p className="text-label text-steel">{site.address.label}</p>
            <p className="mt-2 text-paper/80">
              {site.address.line1}
              <br />
              {site.address.city}, {site.address.region} {site.address.postal}
            </p>
            <p className="mt-6">
              <LinkArrow
                to={`mailto:${site.email}`}
                external
                className="text-paper"
              >
                {site.email}
              </LinkArrow>
            </p>
          </address>
        </div>
      </section>

      <section className="bg-paper px-[clamp(1.25rem,4vw,2.5rem)] pt-16 pb-20 text-ink lg:pt-32">
        <p className="text-label text-oxide">Enquiry form</p>
        <div className="mt-8 max-w-lg">
          <ContactForm initialInterest={interest} />
        </div>
      </section>
    </main>
  );
}

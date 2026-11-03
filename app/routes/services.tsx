import { useEffect, useState } from "react";
import type { Route } from "./+types/services";
import { LinkButton } from "~/components/ui/Button";
import { PageHero } from "~/components/ui/PageHero";
import { CtaBlock } from "~/components/sections/CtaBlock";
import { serviceSections } from "~/data/services";
import { pageMeta } from "~/lib/meta";

export function meta(): Route.MetaDescriptors {
  return pageMeta({
    title: "Services",
    description:
      "ERP consultancy, requirements analysis, project management, resource allocation, custom development, and support for SMEs.",
    pathname: "/services",
  });
}

export default function ServicesPage() {
  const [active, setActive] = useState(serviceSections[0]?.id ?? "");

  useEffect(() => {
    const sections = serviceSections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActive(visible.target.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main id="main">
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
        ]}
        eyebrow="Fig. — Services"
        title="Services scoped to how you operate"
        description="Interactive services scoped to your requirements—we analyze needs before recommending solutions."
      />

      <section className="bg-paper py-16 text-ink md:py-24">
        <div className="mx-auto grid max-w-[90rem] gap-12 px-[clamp(1.25rem,4vw,2.5rem)] lg:grid-cols-[14rem_1fr]">
          <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-label mb-4 text-steel">On this page</p>
            <ul className="space-y-3">
              {serviceSections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={`text-label block transition-colors ${
                      active === s.id
                        ? "text-oxide"
                        : "text-steel hover:text-ink"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")} — {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-0">
            {serviceSections.map((section, i) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 border-t border-[color-mix(in_srgb,var(--color-steel)_30%,transparent)] py-12 first:border-t-0 first:pt-0"
              >
                <p className="text-label text-oxide">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-3 font-display text-[clamp(1.75rem,3vw,2.75rem)] font-semibold tracking-[-0.03em]">
                  {section.title}
                </h2>
                <p className="mt-4 max-w-2xl text-lg text-ink/70">
                  {section.summary}
                </p>
                <ul className="mt-6 max-w-xl space-y-3">
                  {section.bullets.map((b) => (
                    <li
                      key={b}
                      className="border-l border-oxide pl-4 text-ink/75"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
            <div className="pt-8">
              <LinkButton to="/contact?interest=consulting" variant="primary">
                Talk through a service need
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      <CtaBlock />
    </main>
  );
}

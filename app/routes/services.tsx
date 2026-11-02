import { useEffect, useState } from "react";
import type { Route } from "./+types/services";
import { LinkButton } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { PageHero } from "~/components/ui/PageHero";
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
        eyebrow="Services"
        title="Services"
        description="Interactive services scoped to your requirements—we analyze needs before recommending solutions."
      />
      <Container className="grid gap-12 py-12 lg:grid-cols-[14rem_1fr] lg:py-16">
        <div>
          <nav
            aria-label="On this page"
            className="sticky top-24 hidden lg:block"
          >
            <p className="text-eyebrow mb-3">On this page</p>
            <ul className="space-y-2 text-sm">
              {serviceSections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={
                      active === s.id
                        ? "font-semibold text-[var(--color-brand-hover)]"
                        : "text-muted hover:text-text"
                    }
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="mt-6 space-y-2 text-sm lg:hidden">
            {serviceSections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-[var(--color-brand-hover)] underline"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="space-y-16">
            {serviceSections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-24 border-t border-subtle pt-10 first:border-0 first:pt-0"
              >
                <h2 className="text-h2">{section.title}</h2>
                <p className="mt-3 text-body-lg text-muted">{section.summary}</p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
                  {section.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <LinkButton
            to="/contact?interest=consulting"
            variant="primary"
            className="mt-12"
          >
            Discuss services
          </LinkButton>
        </div>
      </Container>
    </main>
  );
}

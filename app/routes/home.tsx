import { Link } from "react-router";
import type { Route } from "./+types/home";
import { ArchitectureDiagram } from "~/components/diagrams/ArchitectureDiagram";
import { OperationsDock } from "~/components/diagrams/OperationsDock";
import { HeroEntrance } from "~/components/motion/HeroEntrance";
import { ProcessTimeline } from "~/components/motion/ProcessTimeline";
import { Reveal, RevealStagger } from "~/components/motion/Reveal";
import { JsonLd } from "~/components/seo/JsonLd";
import { Container } from "~/components/ui/Container";
import { Eyebrow } from "~/components/ui/Eyebrow";
import { LinkButton } from "~/components/ui/Button";
import { SectionHeading } from "~/components/ui/SectionHeading";
import {
  businessChallenges,
  capabilities,
  erpModules,
  whyAxleta,
} from "~/data/capabilities";
import { getImage } from "~/data/images";
import { solutionFamilies } from "~/data/solutions";
import { site } from "~/data/site";
import { getAllInsights } from "~/lib/insights.server";
import { pageMeta } from "~/lib/meta";
import { organizationJsonLd, websiteJsonLd } from "~/lib/seo";

export function meta(): Route.MetaDescriptors {
  return pageMeta({
    title: "Home",
    description:
      "Axleta helps SMEs choose, connect, and improve ERP, cloud infrastructure, productivity, and automation—from SAP Business One to Google Workspace.",
    pathname: "/",
  });
}

export function loader() {
  const insights = getAllInsights().slice(0, 3);
  return { insights };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { insights } = loaderData;
  const hero = getImage("hero");
  const erpImage = getImage("erp");
  const [featured, ...restInsights] = insights;

  return (
    <>
      <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      <main id="main" className="overflow-x-clip">
        <section className="hero-stage relative isolate flex min-h-svh flex-col overflow-hidden">
          {hero ? (
            <img
              src={hero.path}
              alt=""
              aria-hidden
              width={hero.width}
              height={hero.height}
              className="hero-photo absolute inset-0 h-[120%] w-full object-cover"
              fetchPriority="high"
            />
          ) : (
            <div className="absolute inset-0 bg-[var(--color-shell)]" />
          )}
          <div className="hero-scrim absolute inset-0" />
          <div className="noise absolute inset-0 opacity-[0.4]" aria-hidden />

          <HeroEntrance className="relative flex min-h-svh flex-1 flex-col">
            <div className="hero-copy flex flex-1 flex-col justify-end px-[clamp(1.25rem,4vw,2.5rem)] pt-28 pb-10 text-white md:pb-12">
              <div className="mx-auto w-full max-w-[90rem]">
                <p className="hero-meta mb-6 hidden text-[0.7rem] font-semibold tracking-[0.22em] text-white/55 uppercase md:block">
                  {site.tagline}
                </p>
                <h1 className="max-w-[12ch] font-[family-name:var(--font-heading)] text-[clamp(3.5rem,11vw,8.5rem)] leading-[0.9] font-bold tracking-[-0.05em]">
                  <span className="block overflow-hidden">
                    <span className="hero-brand-line block">{site.name}</span>
                  </span>
                </h1>
                <p className="hero-lede mt-6 max-w-[28rem] text-lg text-white/82 md:text-xl">
                  Make technology work harder for your business—ERP, cloud,
                  productivity, and automation chosen for how you operate.
                </p>
                <div className="hero-actions mt-8 flex flex-wrap items-center gap-4">
                  <LinkButton to="/contact?interest=general" variant="primary">
                    Discuss your business needs
                  </LinkButton>
                  <Link
                    to="/solutions"
                    className="text-sm font-semibold text-white underline-offset-4 hover:underline"
                  >
                    Explore solutions
                  </Link>
                </div>
                <p className="hero-meta mt-8 text-small tracking-wide text-white/55">
                  SAP Business One · SAP S/4HANA Public Cloud · Google Workspace
                </p>
              </div>
            </div>
            <OperationsDock />
          </HeroEntrance>
        </section>

        <section className="relative border-b border-subtle bg-surface py-16 md:py-24">
          <div className="mesh-soft absolute inset-0" aria-hidden />
          <Container className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <Reveal>
              <SectionHeading
                title="Technology should simplify the way your business works."
                description="Common situations we help assess. They will not all apply to every visitor."
              />
            </Reveal>
            <RevealStagger className="divide-y divide-[color-mix(in_srgb,var(--color-border)_70%,transparent)] border-y border-[color-mix(in_srgb,var(--color-border)_70%,transparent)]">
              {businessChallenges.map((item, i) => (
                <div
                  key={item}
                  data-reveal-item
                  className="group grid grid-cols-[4.5rem_1fr] items-baseline gap-4 py-5 md:grid-cols-[5.5rem_1fr]"
                >
                  <span className="font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-[var(--color-brand)] transition-transform duration-300 group-hover:translate-x-1 md:text-3xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-lg text-text md:text-xl">{item}</p>
                </div>
              ))}
            </RevealStagger>
          </Container>
        </section>

        <section className="border-b border-subtle py-16 md:py-24">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="Capabilities"
                title="What we help you connect and improve"
              />
            </Reveal>
            <RevealStagger className="space-y-0">
              {capabilities.map((cap, i) => (
                <Link
                  key={cap.id}
                  to={cap.href}
                  data-reveal-item
                  className="capability-row group relative flex flex-col gap-3 border-t border-subtle py-8 last:border-b md:grid md:grid-cols-[5rem_minmax(0,1.1fr)_minmax(0,1.4fr)_auto] md:items-center md:gap-8"
                >
                  <span className="font-[family-name:var(--font-heading)] text-sm font-bold tracking-[0.14em] text-muted uppercase">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-h2 transition-colors group-hover:text-[var(--color-brand-hover)]">
                    {cap.title}
                  </h3>
                  <div>
                    <p className="font-semibold text-[var(--color-brand-hover)]">
                      {cap.outcome}
                    </p>
                    <p className="mt-2 text-muted">{cap.description}</p>
                  </div>
                  <span className="text-sm font-semibold text-[var(--color-brand)] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 md:justify-self-end">
                    Explore →
                  </span>
                </Link>
              ))}
            </RevealStagger>
          </Container>
        </section>

        <section className="relative isolate overflow-hidden bg-[var(--color-shell)] py-16 text-white md:py-28">
          {erpImage ? (
            <img
              src={erpImage.path}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover opacity-30"
            />
          ) : null}
          <div className="absolute inset-0 bg-[linear-gradient(115deg,#0a141d_18%,color-mix(in_srgb,#1d2d3e_70%,transparent)_100%)]" />
          <div className="noise absolute inset-0 opacity-40" aria-hidden />
          <Container className="relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal>
              <Eyebrow className="text-[#89d1ff] [&_span]:bg-[#89d1ff]">
                ERP products
              </Eyebrow>
              <h2 className="mt-4 text-h1 text-white">
                One operational core.
                <span className="mt-1 block text-[#89d1ff]">
                  A more connected business.
                </span>
              </h2>
              <p className="mt-5 max-w-xl text-body-lg text-white/75">
                Axleta helps you evaluate, implement and extend SAP Business One
                and SAP S/4HANA Public Cloud as distinct products for your
                operating model.
              </p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {erpModules.map((m) => (
                  <li
                    key={m}
                    className="rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white/88 backdrop-blur-sm"
                  >
                    {m}
                  </li>
                ))}
              </ul>
              <LinkButton to="/solutions/erp" variant="primary" className="mt-10">
                Explore ERP solutions
              </LinkButton>
            </Reveal>
            <Reveal delay={0.12} y={48}>
              <ArchitectureDiagram />
            </Reveal>
          </Container>
        </section>

        <section className="border-b border-subtle bg-surface py-16 md:py-24">
          <Container>
            <Reveal>
              <SectionHeading title="Solution families" />
            </Reveal>
            <RevealStagger className="grid gap-x-10 gap-y-0 md:grid-cols-2">
              {solutionFamilies.map((fam, i) => (
                <Link
                  key={fam.href}
                  to={fam.href}
                  data-reveal-item
                  className="group border-t border-subtle py-7 last:border-b md:odd:pr-6 md:even:pl-6 md:[&:nth-last-child(-n+2)]:border-b"
                >
                  <p className="text-eyebrow text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-h2 transition-colors group-hover:text-[var(--color-brand-hover)]">
                    {fam.title}
                  </h3>
                  <p className="mt-2 max-w-md text-muted">{fam.description}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-[var(--color-brand)] transition-transform group-hover:translate-x-1">
                    View solution →
                  </span>
                </Link>
              ))}
            </RevealStagger>
          </Container>
        </section>

        <section className="relative border-b border-subtle py-16 md:py-24">
          <div className="mesh-soft absolute inset-0 opacity-70" aria-hidden />
          <Container className="relative">
            <Reveal>
              <SectionHeading
                title="How Axleta works"
                description="A practical sequence adapted to your context and agreed scope."
              />
            </Reveal>
            <ProcessTimeline />
          </Container>
        </section>

        <section className="border-b border-subtle bg-[var(--color-brand-soft)] py-16 md:py-24">
          <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <Reveal className="lg:sticky lg:top-28">
              <Eyebrow>Why Axleta</Eyebrow>
              <h2 className="mt-4 text-h1">
                Business-first technology decisions.
              </h2>
              <p className="mt-4 text-body-lg text-muted">
                Understand the business. Connect the right technology. Advance
                the way it works.
              </p>
            </Reveal>
            <RevealStagger className="space-y-4">
              {whyAxleta.map((item, i) => (
                <article
                  key={item.title}
                  data-reveal-item
                  className="relative overflow-hidden rounded-[var(--radius-card)] border border-white/80 bg-surface p-6 shadow-[0_12px_40px_color-mix(in_srgb,#0070f2_6%,transparent)]"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-3 -right-1 font-[family-name:var(--font-heading)] text-6xl font-bold text-[var(--color-brand)]/10"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="relative text-h3">{item.title}</h3>
                  <p className="relative mt-2 text-small text-muted">
                    {item.description}
                  </p>
                </article>
              ))}
            </RevealStagger>
          </Container>
        </section>

        <section className="border-b border-subtle bg-surface py-10">
          <Container className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-10">
            <Eyebrow>Partnerships</Eyebrow>
            <p className="max-w-3xl text-muted">
              {site.partners.google} {site.partners.sap}
            </p>
          </Container>
        </section>

        {insights.length > 0 ? (
          <section className="border-b border-subtle py-16 md:py-24">
            <Container>
              <div className="mb-10 flex items-end justify-between gap-6">
                <Reveal>
                  <SectionHeading title="Insights" />
                </Reveal>
                <LinkButton to="/insights" variant="link">
                  All articles
                </LinkButton>
              </div>
              <div className="grid gap-8 lg:grid-cols-[1.35fr_0.9fr]">
                {featured ? (
                  <Reveal>
                    <article className="relative overflow-hidden rounded-[var(--radius-card)] border border-subtle bg-[linear-gradient(160deg,var(--color-brand-soft),var(--color-surface)_55%)] p-8 md:p-10">
                      <p className="text-eyebrow">{featured.category}</p>
                      <h3 className="mt-4 max-w-[18ch] text-h1">
                        <Link
                          to={`/insights/${featured.slug}`}
                          className="hover:text-[var(--color-brand-hover)]"
                        >
                          {featured.title}
                        </Link>
                      </h3>
                      <p className="mt-4 max-w-prose text-muted">
                        {featured.excerpt}
                      </p>
                      <p className="mt-8 text-small text-muted">
                        {featured.publishedAt}
                      </p>
                    </article>
                  </Reveal>
                ) : null}
                <RevealStagger className="flex flex-col divide-y divide-[color-mix(in_srgb,var(--color-border)_75%,transparent)] border-y border-[color-mix(in_srgb,var(--color-border)_75%,transparent)]">
                  {restInsights.map((post) => (
                    <article key={post.slug} data-reveal-item className="py-6">
                      <p className="text-eyebrow">{post.category}</p>
                      <h3 className="mt-2 text-h3">
                        <Link
                          to={`/insights/${post.slug}`}
                          className="hover:text-[var(--color-brand-hover)]"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-2 text-small text-muted">{post.excerpt}</p>
                    </article>
                  ))}
                </RevealStagger>
              </div>
            </Container>
          </section>
        ) : null}

        <section className="relative isolate overflow-hidden py-24 md:py-32">
          {hero ? (
            <img
              src={hero.path}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full scale-105 object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-[var(--color-shell-deep)]/90" />
          <div className="noise absolute inset-0 opacity-30" aria-hidden />
          <Container className="relative text-white">
            <Reveal>
              <p className="text-eyebrow text-[#89d1ff]">Next step</p>
              <h2 className="mt-4 max-w-[14ch] text-display">
                Start with the business challenge.
              </h2>
              <p className="mt-6 max-w-xl text-body-lg text-white/75">
                Whether you are reviewing ERP, improving a process or planning
                infrastructure, begin with a conversation about what your
                business needs.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <LinkButton to="/contact?interest=general" variant="primary">
                  Talk to Axleta
                </LinkButton>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-11 items-center rounded-[var(--radius-button)] border border-white/35 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Email the team
                </a>
              </div>
            </Reveal>
          </Container>
        </section>
      </main>
    </>
  );
}

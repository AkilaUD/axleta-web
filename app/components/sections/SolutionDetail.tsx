import type { ReactNode } from "react";
import { LinkButton } from "~/components/ui/Button";
import { PageHero } from "~/components/ui/PageHero";
import { CtaBlock } from "~/components/sections/CtaBlock";
import type { Crumb } from "~/components/ui/Breadcrumbs";

export type SolutionPoint = {
  title: string;
  body: string;
};

type SolutionDetailProps = {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  intro?: string[];
  points?: SolutionPoint[];
  listTitle?: string;
  listItems?: string[];
  children?: ReactNode;
  ctaLabel: string;
  ctaTo: string;
};

/** Shared industrial layout for solution leaf pages. */
export function SolutionDetail({
  crumbs,
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  intro = [],
  points = [],
  listTitle,
  listItems = [],
  children,
  ctaLabel,
  ctaTo,
}: SolutionDetailProps) {
  return (
    <main id="main">
      <PageHero
        crumbs={crumbs}
        eyebrow={eyebrow}
        title={title}
        description={description}
        imageSrc={imageSrc}
        imageAlt={imageAlt}
      >
        <LinkButton to={ctaTo} variant="primary">
          {ctaLabel}
        </LinkButton>
      </PageHero>

      {(intro.length > 0 || points.length > 0 || listItems.length > 0 || children) && (
        <section className="bg-paper py-[12vh] text-ink">
          <div className="mx-auto grid max-w-[90rem] gap-14 px-[clamp(1.25rem,4vw,2.5rem)] lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <p className="text-label text-oxide">Overview</p>
              <div className="mt-5 space-y-5 text-lg leading-relaxed text-ink/75">
                {intro.map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}
              </div>
              <LinkButton to={ctaTo} variant="secondary" className="mt-10">
                {ctaLabel} →
              </LinkButton>
            </div>

            <div className="space-y-10">
              {points.length > 0 ? (
                <ul className="divide-y divide-[color-mix(in_srgb,var(--color-steel)_30%,transparent)] border-y border-[color-mix(in_srgb,var(--color-steel)_30%,transparent)]">
                  {points.map((point, i) => (
                    <li key={point.title} className="grid gap-3 py-6 md:grid-cols-[4rem_1fr]">
                      <span className="text-label text-oxide">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h2 className="font-display text-xl font-semibold tracking-[-0.03em]">
                          {point.title}
                        </h2>
                        <p className="mt-2 text-ink/70">{point.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : null}

              {listItems.length > 0 ? (
                <div>
                  {listTitle ? (
                    <p className="text-label mb-4 text-oxide">{listTitle}</p>
                  ) : null}
                  <ol className="divide-y divide-[color-mix(in_srgb,var(--color-steel)_30%,transparent)] border-y border-[color-mix(in_srgb,var(--color-steel)_30%,transparent)]">
                    {listItems.map((item, i) => (
                      <li
                        key={item}
                        className="grid grid-cols-[3.5rem_1fr] items-baseline py-4"
                      >
                        <span className="text-label text-oxide">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-lg font-semibold tracking-[-0.02em]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              ) : null}

              {children}
            </div>
          </div>
        </section>
      )}

      <CtaBlock />
    </main>
  );
}

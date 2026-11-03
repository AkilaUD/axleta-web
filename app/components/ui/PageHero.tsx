import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "~/components/ui/Breadcrumbs";

type PageHeroProps = {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  tone?: "ink" | "paper";
};

export function PageHero({
  crumbs,
  eyebrow,
  title,
  description,
  children,
  imageSrc,
  imageAlt = "",
  tone = "ink",
}: PageHeroProps) {
  const ink = tone === "ink";

  return (
    <header
      className={`relative isolate overflow-hidden pt-28 ${
        imageSrc ? "pb-0 md:min-h-[min(72vh,40rem)]" : "pb-16 md:pb-24"
      } ${ink ? "bg-ink text-paper" : "bg-paper text-ink"}`}
    >
      {imageSrc ? (
        <>
          <img
            src={imageSrc}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <div
            className={`absolute inset-0 ${
              ink
                ? "bg-[linear-gradient(105deg,color-mix(in_srgb,var(--color-ink)_92%,transparent)_0%,color-mix(in_srgb,var(--color-ink)_72%,transparent)_42%,color-mix(in_srgb,var(--color-ink)_45%,transparent)_100%)]"
                : "bg-[linear-gradient(105deg,color-mix(in_srgb,var(--color-paper)_92%,transparent)_0%,color-mix(in_srgb,var(--color-paper)_70%,transparent)_55%,transparent)]"
            }`}
            aria-hidden
          />
        </>
      ) : (
        <div
          className={`grain ${ink ? "grain--ink" : "grain--paper"}`}
          aria-hidden
        />
      )}

      <div
        className={`relative z-[1] mx-auto max-w-[90rem] px-[clamp(1.25rem,4vw,2.5rem)] ${
          imageSrc ? "flex min-h-[min(56vh,32rem)] flex-col justify-end pb-16 md:pb-20" : ""
        }`}
      >
        <div
          className={
            ink
              ? "[&_a]:text-paper/70 [&_nav]:text-paper/60 [&_span]:text-paper/80"
              : ""
          }
        >
          <Breadcrumbs items={crumbs} />
        </div>
        {eyebrow ? (
          <p className="text-label mt-8 text-oxide">{eyebrow}</p>
        ) : null}
        <h1 className="mt-4 max-w-[18ch] font-display text-[clamp(2.5rem,7vw,5.5rem)] font-semibold tracking-[-0.045em] text-balance">
          {title}
        </h1>
        {description ? (
          <p
            className={`mt-6 max-w-2xl text-lg ${
              ink ? "text-paper/75" : "text-ink/70"
            }`}
          >
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </header>
  );
}

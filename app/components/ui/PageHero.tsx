import type { ReactNode } from "react";
import { Reveal } from "~/components/motion/Reveal";
import { Breadcrumbs, type Crumb } from "~/components/ui/Breadcrumbs";
import { Container } from "~/components/ui/Container";
import { Eyebrow } from "~/components/ui/Eyebrow";

type PageHeroProps = {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
};

export function PageHero({
  crumbs,
  eyebrow,
  title,
  description,
  children,
  imageSrc,
  imageAlt = "",
}: PageHeroProps) {
  if (imageSrc) {
    return (
      <header className="relative isolate min-h-[22rem] overflow-hidden md:min-h-[26rem]">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="photo-scrim absolute inset-0" />
        <div className="noise absolute inset-0 opacity-30" aria-hidden />
        <Container className="relative py-14 md:py-20">
          <Reveal y={28}>
            <div className="[&_a]:text-white/80 [&_nav]:text-white/70 [&_span]:text-white">
              <Breadcrumbs items={crumbs} />
            </div>
            {eyebrow ? (
              <Eyebrow className="mb-4 text-[#89d1ff] [&_span]:bg-[#89d1ff]">
                {eyebrow}
              </Eyebrow>
            ) : null}
            <h1 className="max-w-4xl text-h1 text-white">{title}</h1>
            {description ? (
              <p className="mt-5 max-w-2xl text-body-lg text-white/80">
                {description}
              </p>
            ) : null}
            {children ? <div className="mt-8">{children}</div> : null}
          </Reveal>
        </Container>
      </header>
    );
  }

  return (
    <header className="border-b border-subtle bg-surface">
      <Container className="py-12 md:py-16">
        <Breadcrumbs items={crumbs} />
        {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}
        <h1 className="max-w-4xl text-h1 text-text">{title}</h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-body-lg text-muted">{description}</p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </Container>
    </header>
  );
}

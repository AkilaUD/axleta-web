import { useRef } from "react";
import { ensureGsap } from "~/lib/gsap-setup";
import { site } from "~/lib/content";
import { MagneticButton } from "~/components/ui/MagneticButton";
import { LinkArrow } from "~/components/ui/LinkArrow";
import { usePrefersReducedMotion } from "~/hooks/usePrefersReducedMotion";

/**
 * Full-bleed oxide exit — one job: invite a conversation.
 * Clean composition: figure label, headline, support, primary + email.
 */
export function CtaBlock() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { gsap, useGSAP } = ensureGsap();

  useGSAP(
    () => {
      if (reduced || !root.current) return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: root.current,
          start: "top 78%",
          once: true,
        },
      });

      tl.from(
        ".cta-field",
        { autoAlpha: 0, scale: 0.97, duration: 0.9 },
        0,
      )
        .from(".cta-kicker", { autoAlpha: 0, y: 20, duration: 0.45 }, 0.1)
        .from(
          ".cta-line",
          {
            autoAlpha: 0,
            y: 28,
            duration: 0.65,
            stagger: 0.08,
            ease: "expo.out",
          },
          0.16,
        )
        .from(".cta-sub", { autoAlpha: 0, y: 18, duration: 0.5 }, "-=0.35")
        .from(".cta-actions", { autoAlpha: 0, y: 18, duration: 0.5 }, "-=0.3");
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section
      ref={root}
      id="cta"
      className="relative isolate overflow-hidden bg-oxide py-[min(20vh,10rem)] text-ink"
      data-spine="09 — CTA"
    >
      {/* Soft field depth — no competing disks over the type */}
      <div
        className="cta-field pointer-events-none absolute inset-0"
        aria-hidden
      >
        <div className="absolute -top-[20%] -right-[10%] h-[70vmin] w-[70vmin] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-ink)_18%,transparent),transparent_68%)]" />
        <div className="absolute -bottom-[30%] -left-[15%] h-[55vmin] w-[55vmin] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-paper)_22%,transparent),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_40%,color-mix(in_srgb,var(--color-ink)_8%,transparent)_100%)]" />
      </div>

      <div className="relative z-[1] mx-auto grid max-w-[90rem] gap-10 px-[clamp(1.25rem,4vw,2.5rem)] md:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.75fr)] md:items-end md:gap-14">
        <div className="max-w-[42rem]">
          <p className="cta-kicker text-label text-ink/70">Fig. 09 — Next</p>

          <h2 className="mt-5 font-display text-[clamp(2.75rem,7.5vw,5.75rem)] font-semibold tracking-[-0.05em]">
            <span className="cta-line block overflow-hidden">
              <span className="block">Start with the</span>
            </span>
            <span className="cta-line block overflow-hidden">
              <span className="block">
                business{" "}
                <em className="font-serif font-normal italic">challenge.</em>
              </span>
            </span>
          </h2>

          <p className="cta-sub mt-6 max-w-[32rem] text-[1.05rem] leading-relaxed text-ink/80 md:text-lg">
            Whether you are reviewing ERP, improving a process, or planning
            infrastructure — begin with what your business needs.
          </p>
        </div>

        <div className="cta-actions flex flex-col items-start gap-6 border-t border-ink/20 pt-8 md:border-t-0 md:border-l md:pt-2 md:pl-10">
          <MagneticButton
            to="/contact?interest=general"
            className="!bg-ink !px-8 !py-4 !text-paper hover:!bg-graphite"
            cursor="OPEN"
          >
            Talk to Axleta →
          </MagneticButton>

          <LinkArrow
            to={`mailto:${site.email}`}
            external
            className="text-ink"
          >
            {site.email}
          </LinkArrow>

          <p className="max-w-[18rem] text-sm leading-relaxed text-ink/65">
            {site.address.city}, {site.address.region}
            <br />
            Response within one business day.
          </p>
        </div>
      </div>
    </section>
  );
}

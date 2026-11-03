import { useEffect, useState } from "react";
import { Link } from "react-router";
import { site, legalDisclaimer } from "~/lib/content";
import {
  footerCompany,
  footerServices,
  footerSolutions,
} from "~/data/navigation";
import { Logo } from "~/components/svg/Logo";
import { LinkArrow } from "~/components/ui/LinkArrow";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink pb-[env(safe-area-inset-bottom)] text-paper">
      <div className="grain grain--ink" aria-hidden />
      <div className="relative z-[1] mx-auto max-w-[90rem] px-[clamp(1.25rem,4vw,2.5rem)] pt-20">
        <div className="mb-16 flex flex-col gap-8 border-b border-[color-mix(in_srgb,var(--color-steel)_30%,transparent)] pb-10 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <Link to="/" aria-label="Axleta home">
              <Logo variant="footer" />
            </Link>
            <p className="max-w-md font-serif text-xl italic text-paper/75">
              {site.positioning}
            </p>
          </div>
          <BramptonClock />
        </div>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <FooterColumn title="Solutions" items={footerSolutions} />
          <FooterColumn title="Services" items={footerServices} />
          <FooterColumn title="Company" items={footerCompany} />
          <div>
            <p className="text-label mb-4 text-steel">Contact</p>
            <ul className="space-y-3 text-sm text-paper/70">
              <li>
                {site.address.label} — {site.address.line1}, {site.address.city}
                , {site.address.region} {site.address.postal}
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="link-draw text-paper"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <LinkArrow
                  to={site.linkedIn}
                  external
                  className="text-paper/80"
                >
                  LinkedIn
                </LinkArrow>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 space-y-3 border-t border-[color-mix(in_srgb,var(--color-steel)_30%,transparent)] py-8 text-sm text-paper/55">
          <p className="max-w-3xl leading-relaxed">{legalDisclaimer}</p>
          <div className="flex flex-wrap gap-4 text-label">
            <Link to="/privacy" className="link-draw">
              Privacy
            </Link>
            <Link to="/terms" className="link-draw">
              Terms
            </Link>
            <span>
              © {year} {site.name}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="text-label mb-4 text-steel">{title}</p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              to={item.href}
              className="text-sm text-paper/65 transition-colors hover:text-paper link-draw"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BramptonClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const format = () => {
      const formatted = new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Toronto",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date());
      setTime(formatted);
    };
    format();
    const id = window.setInterval(format, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p className="text-label text-steel" suppressHydrationWarning>
      Brampton, ON — local time{time ? ` ${time}` : ""}
    </p>
  );
}

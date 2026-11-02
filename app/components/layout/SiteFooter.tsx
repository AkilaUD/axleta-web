import { Link } from "react-router";
import { site } from "~/data/site";
import {
  footerCompany,
  footerServices,
  footerSolutions,
} from "~/data/navigation";
import { BrandMark } from "~/components/ui/BrandMark";
import { Container } from "~/components/ui/Container";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-subtle bg-surface pb-[env(safe-area-inset-bottom)] pt-16">
      <Container className="grid gap-12 lg:grid-cols-4">
        <div className="space-y-4 lg:col-span-1">
          <Link to="/" className="flex items-center gap-2 text-text">
            <BrandMark className="h-7 w-7" />
            <span className="font-[family-name:var(--font-heading)] text-lg font-semibold">
              {site.name}
            </span>
          </Link>
          <p className="max-w-xs text-body-lg leading-snug text-muted">
            {site.positioning}
          </p>
        </div>
        <FooterColumn title="Solutions" items={footerSolutions} />
        <FooterColumn title="Services" items={footerServices} />
        <FooterColumn title="Company" items={footerCompany} />
      </Container>
      <Container className="mt-14 space-y-3 border-t border-subtle py-8 text-small text-muted">
        <p>
          {site.address.label} — {site.address.line1}, {site.address.city},{" "}
          {site.address.region} {site.address.postal}
        </p>
        <p>
          <a
            href={`mailto:${site.email}`}
            className="text-[var(--color-brand-hover)] hover:underline"
          >
            {site.email}
          </a>
          {" · "}
          <a
            href={site.linkedIn}
            rel="noopener noreferrer"
            target="_blank"
            className="text-[var(--color-brand-hover)] hover:underline"
          >
            LinkedIn
          </a>
        </p>
        <p className="max-w-3xl leading-relaxed">
          SAP and PartnerEdge are trademarks of SAP SE. Google, Google Cloud, and
          Google Workspace are trademarks of Google LLC. {site.name} is not SAP or
          Google.
        </p>
        <p>© {year} {site.name}</p>
      </Container>
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
      <p className="mb-4 text-eyebrow">{title}</p>
      <ul className="space-y-2 text-small">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              to={item.href}
              className="text-muted hover:text-[var(--color-brand-hover)] hover:underline"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

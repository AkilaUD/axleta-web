import { Link, useLocation } from "react-router";
import type { NavItem } from "~/data/navigation";
import { MagneticButton } from "~/components/ui/MagneticButton";

type DesktopNavProps = {
  items: NavItem[];
  megaOpen: boolean;
  megaKind: "solutions" | "services" | null;
  onToggleMega: (kind: "solutions" | "services") => void;
  onCloseMega: () => void;
  /** Render only links (for mix-blend shell) */
  linksOnly?: boolean;
  /** Render only the CTA (outside mix-blend) */
  ctaOnly?: boolean;
};

export function DesktopNav({
  items,
  megaOpen,
  megaKind,
  onToggleMega,
  onCloseMega,
  linksOnly = false,
  ctaOnly = false,
}: DesktopNavProps) {
  const location = useLocation();

  if (ctaOnly) {
    return (
      <MagneticButton to="/contact?interest=general">
        Let’s Talk →
      </MagneticButton>
    );
  }

  return (
    <ul className="hidden items-center gap-1 lg:flex">
      {items.map((item) => {
        if (item.label === "Solutions" || item.label === "Services") {
          const kind = item.label.toLowerCase() as "solutions" | "services";
          const expanded = megaOpen && megaKind === kind;
          return (
            <li key={item.label}>
              <button
                type="button"
                aria-expanded={expanded}
                aria-haspopup="dialog"
                onClick={() => onToggleMega(kind)}
                className={`text-label px-3 py-2 transition-opacity ${
                  expanded ? "opacity-100 underline" : "opacity-70 hover:opacity-100"
                }`}
              >
                {item.label}
              </button>
            </li>
          );
        }

        const active =
          location.pathname === item.href ||
          (item.href !== "/" && location.pathname.startsWith(item.href));

        return (
          <li key={item.href}>
            <Link
              to={item.href}
              aria-current={active ? "page" : undefined}
              onClick={onCloseMega}
              className={`text-label px-3 py-2 transition-opacity ${
                active ? "opacity-100" : "opacity-70 hover:opacity-100"
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
      {linksOnly ? null : (
        <li className="ml-4">
          <MagneticButton to="/contact?interest=general">
            Talk to Axleta
          </MagneticButton>
        </li>
      )}
    </ul>
  );
}

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import type { NavItem } from "~/data/navigation";
import { LinkButton } from "~/components/ui/Button";

type Tone = "light" | "dark";

type DesktopNavProps = {
  items: NavItem[];
  tone?: Tone;
};

export function DesktopNav({ items, tone = "dark" }: DesktopNavProps) {
  const location = useLocation();
  const light = tone === "light";

  return (
    <ul className="hidden items-center gap-0.5 lg:flex">
      {items.map((item) =>
        item.children ? (
          <NavDropdown
            key={item.label}
            item={item}
            pathname={location.pathname}
            light={light}
          />
        ) : (
          <li key={item.href}>
            <NavLink
              href={item.href}
              label={item.label}
              pathname={location.pathname}
              light={light}
            />
          </li>
        ),
      )}
      <li className="ml-3">
        <LinkButton
          to="/contact?interest=general"
          variant="primary"
          className="shadow-none"
        >
          Talk to Axleta
        </LinkButton>
      </li>
    </ul>
  );
}

function NavLink({
  href,
  label,
  pathname,
  light,
}: {
  href: string;
  label: string;
  pathname: string;
  light: boolean;
}) {
  const active = pathname === href || (href !== "/" && pathname.startsWith(href));
  return (
    <Link
      to={href}
      aria-current={active ? "page" : undefined}
      className={`rounded-[var(--radius-button)] px-3 py-2 text-sm font-medium transition-colors ${
        light
          ? active
            ? "bg-white/10 text-white"
            : "text-white/80 hover:bg-white/10 hover:text-white"
          : active
            ? "bg-[var(--color-brand-soft)] text-[var(--color-brand-hover)]"
            : "text-text hover:bg-[var(--color-brand-soft)]"
      }`}
    >
      {label}
    </Link>
  );
}

function NavDropdown({
  item,
  pathname,
  light,
}: {
  item: NavItem;
  pathname: string;
  light: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const active =
    pathname === item.href || pathname.startsWith(`${item.href}/`);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <li ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setOpen(false);
          }
        }}
        className={`inline-flex min-h-11 items-center gap-1 rounded-[var(--radius-button)] px-3 py-2 text-sm font-medium ${
          light
            ? active
              ? "bg-white/10 text-white"
              : "text-white/80 hover:bg-white/10 hover:text-white"
            : active
              ? "bg-[var(--color-brand-soft)] text-[var(--color-brand-hover)]"
              : "text-text hover:bg-[var(--color-brand-soft)]"
        }`}
      >
        {item.label}
        <ChevronDown className="size-4" aria-hidden />
      </button>
      {open ? (
        <ul
          role="menu"
          className="absolute left-0 top-full z-50 mt-2 min-w-[16rem] rounded-[var(--radius-card)] border border-subtle bg-surface py-2 shadow-lg"
        >
          {item.children?.map((child) => (
            <li key={child.href} role="none">
              <Link
                role="menuitem"
                to={child.href}
                className="block px-4 py-2.5 text-sm text-text hover:bg-[var(--color-brand-soft)]"
                onClick={() => setOpen(false)}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}

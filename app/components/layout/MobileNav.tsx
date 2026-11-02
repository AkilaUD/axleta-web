import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import type { NavItem } from "~/data/navigation";
import { useLockBodyScroll } from "~/hooks/useLockBodyScroll";
import { LinkButton } from "~/components/ui/Button";

type MobileNavProps = {
  items: NavItem[];
  tone?: "light" | "dark";
};

export function MobileNav({ items, tone = "dark" }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  useLockBodyScroll(open);
  const location = useLocation();
  const light = tone === "light";

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-[var(--radius-button)] border ${
          light
            ? "border-white/30 bg-white/10 text-white"
            : "border-subtle bg-surface text-text"
        }`}
        onClick={() => setOpen(true)}
      >
        <Menu className="size-5" aria-hidden />
        <span className="sr-only">Open menu</span>
      </button>
      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-40 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.nav
              id="mobile-nav"
              className="fixed inset-y-0 right-0 z-50 flex w-[min(100%,20rem)] flex-col bg-surface shadow-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center justify-between border-b border-subtle p-4">
                <span className="text-h3">Menu</span>
                <button
                  type="button"
                  className="inline-flex min-h-11 min-w-11 items-center justify-center"
                  onClick={() => setOpen(false)}
                >
                  <X className="size-5" aria-hidden />
                  <span className="sr-only">Close</span>
                </button>
              </div>
              <ul className="flex-1 overflow-y-auto p-4">
                {items.map((item) => (
                  <li key={item.label} className="border-b border-subtle py-2">
                    <Link
                      to={item.href}
                      className="block py-2 font-medium text-text"
                      onClick={() => setOpen(false)}
                      aria-current={
                        location.pathname === item.href ? "page" : undefined
                      }
                    >
                      {item.label}
                    </Link>
                    {item.children ? (
                      <ul className="mb-2 ml-3 border-l border-subtle pl-3">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              to={child.href}
                              className="block py-2 text-sm text-muted"
                              onClick={() => setOpen(false)}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>
              <div className="border-t border-subtle p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                <LinkButton
                  to="/contact?interest=general"
                  variant="primary"
                  className="w-full"
                >
                  Discuss a requirement
                </LinkButton>
              </div>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

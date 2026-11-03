import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import type { NavItem } from "~/data/navigation";
import { useLockBodyScroll } from "~/hooks/useLockBodyScroll";
import { MagneticButton } from "~/components/ui/MagneticButton";

type MobileNavProps = {
  items: NavItem[];
};

export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  useLockBodyScroll(open);
  const location = useLocation();

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="text-label inline-flex min-h-11 min-w-11 items-center justify-center border border-current/30 px-3"
        onClick={() => setOpen(true)}
      >
        Menu
      </button>
      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-nav"
            className="fixed inset-0 z-50 flex flex-col bg-ink text-paper"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center justify-between px-5 pt-6">
              <span className="text-label text-steel">Navigation</span>
              <button
                type="button"
                className="text-label min-h-11 px-2"
                onClick={() => setOpen(false)}
              >
                Close ✕
              </button>
            </div>
            <ul className="flex flex-1 flex-col justify-center px-5">
              {items.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.4 }}
                  className="border-b border-[color-mix(in_srgb,var(--color-steel)_25%,transparent)]"
                >
                  <Link
                    to={item.href}
                    className="font-display block py-3 text-[12vw] leading-[0.9] font-semibold tracking-[-0.04em]"
                    onClick={() => setOpen(false)}
                    aria-current={
                      location.pathname === item.href ? "page" : undefined
                    }
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              <MagneticButton
                to="/contact?interest=general"
                className="w-full"
              >
                Talk to Axleta
              </MagneticButton>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

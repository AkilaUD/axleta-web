import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { motion } from "motion/react";
import { primaryNav } from "~/data/navigation";
import { site } from "~/data/site";
import { BrandMark } from "~/components/ui/BrandMark";
import { Container } from "~/components/ui/Container";
import { DesktopNav } from "~/components/layout/DesktopNav";
import { MobileNav } from "~/components/layout/MobileNav";
import { usePrefersReducedMotion } from "~/hooks/usePrefersReducedMotion";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const reduced = usePrefersReducedMotion();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const overHero = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={`z-30 border-b backdrop-blur transition-[background-color,box-shadow,color] ${
        isHome ? "fixed inset-x-0 top-0" : "sticky top-0"
      } ${
        overHero
          ? "border-transparent bg-transparent text-white"
          : "border-subtle bg-surface/94 text-text shadow-[0_8px_30px_color-mix(in_srgb,#131e29_8%,transparent)]"
      }`}
      animate={
        reduced
          ? undefined
          : {
              paddingTop: scrolled ? 0 : 2,
              paddingBottom: scrolled ? 0 : 2,
            }
      }
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <Container className="flex min-h-[4.25rem] items-center justify-between gap-4">
        <Link
          to="/"
          className={`flex items-center gap-3 ${overHero ? "text-white" : "text-text"}`}
        >
          <BrandMark
            className={`h-8 w-8 shrink-0 ${overHero ? "text-white" : "text-[var(--color-brand)]"}`}
          />
          <span className="font-[family-name:var(--font-heading)] text-[1.05rem] font-bold tracking-tight">
            {site.name}
          </span>
        </Link>
        <DesktopNav items={primaryNav} tone={overHero ? "light" : "dark"} />
        <MobileNav items={primaryNav} tone={overHero ? "light" : "dark"} />
      </Container>
    </motion.header>
  );
}

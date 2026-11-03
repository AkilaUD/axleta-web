import { Link } from "react-router";
import { motion } from "motion/react";
import type { Route } from "./+types/$";
import { LinkButton } from "~/components/ui/Button";
import { pageMeta } from "~/lib/meta";

export function meta(): Route.MetaDescriptors {
  return pageMeta({
    title: "Page not found",
    description: "The page you requested could not be found.",
    pathname: "/404",
    noIndex: true,
  });
}

export default function NotFound() {
  return (
    <main
      id="main"
      className="relative flex min-h-[70svh] flex-col items-center justify-center overflow-hidden bg-ink px-6 py-28 text-paper"
    >
      <div className="grain grain--ink" aria-hidden />
      <motion.svg
        viewBox="0 0 120 120"
        className="relative z-[1] h-28 w-28 text-paper"
        animate={{ rotate: [0, -8, 6, -4, 0], x: [0, 4, -3, 2, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        fill="none"
        aria-hidden
      >
        <circle cx="60" cy="60" r="48" stroke="currentColor" strokeWidth="1.25" />
        <circle
          cx="60"
          cy="60"
          r="28"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.4"
        />
        <circle cx="72" cy="48" r="5" fill="var(--color-oxide)" />
      </motion.svg>
      <p className="text-label relative z-[1] mt-10 text-oxide">
        404 — Off its axle
      </p>
      <h1 className="relative z-[1] mt-3 text-center font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.04em]">
        This page is not available
      </h1>
      <p className="relative z-[1] mt-4 max-w-md text-center text-paper/65">
        The link may be outdated or mistyped. Head back home or browse solutions.
      </p>
      <div className="relative z-[1] mt-8 flex flex-wrap justify-center gap-3">
        <LinkButton to="/" variant="primary">
          Home
        </LinkButton>
        <LinkButton to="/solutions" variant="secondary">
          Solutions
        </LinkButton>
        <Link
          to="/contact"
          className="text-label inline-flex min-h-11 items-center px-3 text-paper link-draw"
        >
          Contact
        </Link>
      </div>
    </main>
  );
}

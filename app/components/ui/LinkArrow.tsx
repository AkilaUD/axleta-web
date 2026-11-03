import { Link } from "react-router";
import type { ReactNode } from "react";

type LinkArrowProps = {
  to: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
};

/** Mono link with oxide underline draw + nudging arrow. */
export function LinkArrow({
  to,
  children,
  className = "",
  external,
}: LinkArrowProps) {
  const classes = `group inline-flex items-center gap-2 font-mono text-[0.7rem] font-medium tracking-[0.12em] uppercase link-draw ${className}`;

  const content = (
    <>
      <span>{children}</span>
      <span
        aria-hidden
        className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      >
        ↗
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={to}
        rel="noopener noreferrer"
        target="_blank"
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <Link to={to} className={classes}>
      {content}
    </Link>
  );
}

import { Link } from "react-router";
import { motion } from "motion/react";

type IconKind = "erp" | "cloud" | "automation" | "people" | "server" | "code";

type HeroOrbitCardProps = {
  title: string;
  subtitle: string;
  href: string;
  icon: IconKind;
  className?: string;
  delay?: number;
};

export function HeroOrbitCard({
  title,
  subtitle,
  href,
  icon,
  className = "",
  delay = 0,
}: HeroOrbitCardProps) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: [0, -6, 0] }}
      transition={{
        opacity: { duration: 0.5, delay },
        y: {
          duration: 4.5 + delay,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
      }}
    >
      <Link
        to={href}
        data-cursor="VIEW"
        className="group flex min-w-[11.5rem] items-center gap-3 rounded-xl border border-[color-mix(in_srgb,#7dd3fc_35%,transparent)] bg-[color-mix(in_srgb,var(--color-ink)_55%,transparent)] px-3.5 py-2.5 shadow-[0_0_24px_color-mix(in_srgb,#0070f2_25%,transparent)] backdrop-blur-md transition hover:border-[color-mix(in_srgb,#7dd3fc_70%,transparent)] hover:bg-[color-mix(in_srgb,var(--color-ink)_70%,transparent)]"
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[color-mix(in_srgb,#7dd3fc_30%,transparent)] bg-[color-mix(in_srgb,#0070f2_18%,transparent)] text-[#7dd3fc]">
          <OrbitIcon kind={icon} />
        </span>
        <span className="min-w-0">
          <span className="block text-[0.72rem] font-semibold tracking-wide text-paper">
            {title}
          </span>
          <span className="text-label mt-0.5 block text-[0.58rem] text-steel normal-case tracking-[0.06em]">
            {subtitle}
          </span>
        </span>
      </Link>
    </motion.div>
  );
}

function OrbitIcon({ kind }: { kind: IconKind }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    "aria-hidden": true as const,
  };

  switch (kind) {
    case "erp":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
        </svg>
      );
    case "cloud":
      return (
        <svg {...common}>
          <path d="M7 18h10a4 4 0 0 0 .3-8 5.5 5.5 0 0 0-10.6 1.5A3.5 3.5 0 0 0 7 18z" />
        </svg>
      );
    case "automation":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
        </svg>
      );
    case "people":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="2.5" />
          <circle cx="16" cy="9" r="2" />
          <path d="M3.5 18c.8-2.5 2.8-4 5.5-4s4.7 1.5 5.5 4" />
          <path d="M13 18c.4-1.6 1.6-2.8 3.5-2.8 1.5 0 2.7.8 3.3 2" />
        </svg>
      );
    case "server":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="5" rx="1" />
          <rect x="4" y="10.5" width="16" height="5" rx="1" />
          <rect x="4" y="17" width="16" height="3" rx="1" />
          <circle cx="7" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
          <circle cx="7" cy="13" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      );
    case "code":
      return (
        <svg {...common}>
          <path d="M9 7 4 12l5 5M15 7l5 5-5 5" />
        </svg>
      );
    default: {
      const _exhaustive: never = kind;
      return _exhaustive;
    }
  }
}

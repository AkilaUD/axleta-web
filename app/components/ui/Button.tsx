import { Link } from "react-router";
import { motion } from "motion/react";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "link";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-button)] px-5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-brand)] text-white shadow-[0_10px_28px_color-mix(in_srgb,var(--color-brand)_38%,transparent)] hover:bg-[var(--color-brand-hover)]",
  secondary:
    "border border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20",
  ghost:
    "border border-[var(--color-border)] bg-surface text-text hover:border-[var(--color-brand)] hover:bg-[var(--color-brand-soft)]",
  link: "min-h-0 px-0 text-[var(--color-brand-hover)] underline-offset-4 hover:underline",
};

type ButtonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
};

type LinkButtonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  to: string;
};

const tap = { scale: 0.97 };
const hover = { y: -1 };

export function LinkButton({
  variant = "primary",
  children,
  className = "",
  to,
}: LinkButtonProps) {
  if (variant === "link") {
    return (
      <Link to={to} className={`${variants.link} ${className}`}>
        {children}
      </Link>
    );
  }
  return (
    <motion.div className="inline-flex" whileHover={hover} whileTap={tap}>
      <Link to={to} className={`${base} ${variants[variant]} ${className}`}>
        {children}
      </Link>
    </motion.div>
  );
}

export function Button({
  variant = "primary",
  children,
  className = "",
  type = "button",
  disabled,
  loading,
  onClick,
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      whileHover={disabled || loading ? undefined : hover}
      whileTap={disabled || loading ? undefined : tap}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {loading ? "Sending…" : children}
    </motion.button>
  );
}

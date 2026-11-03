import { Link } from "react-router";
import { motion } from "motion/react";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "link";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 font-mono text-[0.7rem] font-medium tracking-[0.12em] uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-oxide text-paper hover:bg-[var(--color-oxide-dim)]",
  secondary:
    "border border-paper/40 bg-transparent text-paper hover:bg-paper/10",
  ghost:
    "border border-[color-mix(in_srgb,var(--color-steel)_40%,transparent)] bg-transparent text-ink hover:border-oxide hover:text-oxide",
  link: "min-h-0 rounded-none px-0 font-mono text-[0.7rem] tracking-[0.12em] text-oxide uppercase link-draw",
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
    <motion.div className="inline-flex" whileTap={tap}>
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
      whileTap={disabled || loading ? undefined : tap}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {loading ? "Sending…" : children}
    </motion.button>
  );
}

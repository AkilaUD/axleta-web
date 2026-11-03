import {
  useRef,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { Link } from "react-router";
import { motion, useMotionValue, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "~/hooks/usePrefersReducedMotion";

const spring = { stiffness: 260, damping: 28, mass: 0.6 };
const STRENGTH = 0.25;

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  to?: string;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  strength?: number;
  cursor?: "VIEW" | "DRAG" | "OPEN";
};

export function MagneticButton({
  children,
  className = "",
  to,
  href,
  type = "button",
  onClick,
  strength = STRENGTH,
  cursor,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  function onMove(e: ReactMouseEvent) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const shellClass =
    `inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-oxide px-6 font-mono text-[0.7rem] font-medium tracking-[0.12em] text-paper uppercase transition-colors hover:bg-[var(--color-oxide-dim)] ${className}`;

  const inner = (
    <motion.div style={{ x: sx, y: sy }} className="inline-flex items-center gap-2">
      {children}
    </motion.div>
  );

  return (
    <div
      ref={ref}
      className="inline-flex"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor={cursor}
    >
      {to ? (
        <Link to={to} className={shellClass}>
          {inner}
        </Link>
      ) : href ? (
        <a href={href} className={shellClass}>
          {inner}
        </a>
      ) : (
        <button type={type} onClick={onClick} className={shellClass}>
          {inner}
        </button>
      )}
    </div>
  );
}

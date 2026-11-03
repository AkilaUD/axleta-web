import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "~/hooks/usePrefersReducedMotion";

type CursorMode = "default" | "VIEW" | "DRAG" | "OPEN";

const spring = { stiffness: 420, damping: 32, mass: 0.35 };

/** Custom cursor — hidden on touch / coarse pointers. */
export function Cursor() {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);
  const modeRef = useRef<CursorMode>("default");
  const visibleRef = useRef(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(fine && !reduced);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };
    const onLeave = () => {
      if (!visibleRef.current) return;
      visibleRef.current = false;
      setVisible(false);
    };

    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement | null)?.closest?.(
        "[data-cursor]",
      ) as HTMLElement | null;
      const next = (t?.dataset.cursor as CursorMode | undefined) ?? "default";
      if (next === modeRef.current) return;
      modeRef.current = next;
      setMode(next);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const expanded = mode !== "default";

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[90] mix-blend-difference"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full border border-paper bg-paper/10"
        animate={{
          width: expanded ? 72 : 10,
          height: expanded ? 72 : 10,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
      >
        {expanded ? (
          <span className="text-label text-paper">{mode}</span>
        ) : null}
      </motion.div>
    </motion.div>
  );
}

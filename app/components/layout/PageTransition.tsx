import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigation } from "react-router";
import { usePrefersReducedMotion } from "~/hooks/usePrefersReducedMotion";

const WIPE_MS = 560;

/** Route wipe: ink panel + spinning ring. Always lifts after the next page lands. */
export function PageTransition() {
  const location = useLocation();
  const navigation = useNavigation();
  const reduced = usePrefersReducedMotion();
  const [show, setShow] = useState(false);
  const pathRef = useRef(location.pathname);
  const hideTimer = useRef<number | null>(null);
  const visibleRef = useRef(false);

  useEffect(() => {
    if (reduced) {
      visibleRef.current = false;
      setShow(false);
      return;
    }

    const clearHide = () => {
      if (hideTimer.current !== null) {
        window.clearTimeout(hideTimer.current);
        hideTimer.current = null;
      }
    };

    const reveal = () => {
      if (!visibleRef.current) {
        visibleRef.current = true;
        setShow(true);
      }
    };

    const scheduleHide = () => {
      clearHide();
      hideTimer.current = window.setTimeout(() => {
        visibleRef.current = false;
        setShow(false);
        hideTimer.current = null;
      }, WIPE_MS);
    };

    if (navigation.state === "loading") {
      clearHide();
      reveal();
      return clearHide;
    }

    const pathChanged = location.pathname !== pathRef.current;
    if (pathChanged) pathRef.current = location.pathname;

    // Destination is idle — dismiss any active wipe shortly after it lands.
    if (visibleRef.current || pathChanged) {
      reveal();
      scheduleHide();
    }

    return clearHide;
  }, [location.pathname, navigation.state, reduced]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key={location.pathname}
          className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center bg-ink"
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0 0 0 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.svg
            viewBox="0 0 64 64"
            className="h-12 w-12 text-paper"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.55, ease: "linear" }}
            fill="none"
            aria-hidden
          >
            <circle
              cx="32"
              cy="32"
              r="26"
              stroke="currentColor"
              strokeWidth="1.25"
            />
            <circle cx="32" cy="32" r="3" fill="var(--color-oxide)" />
          </motion.svg>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

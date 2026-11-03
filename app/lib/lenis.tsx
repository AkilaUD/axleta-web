import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "~/hooks/usePrefersReducedMotion";
import { ensureGsap, refreshScrollTriggerAfterFonts } from "~/lib/gsap-setup";

type LenisContextValue = {
  lenis: Lenis | null;
  scrollTo: (
    target: string | number | HTMLElement,
    options?: Record<string, unknown>,
  ) => void;
};

const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  scrollTo: () => undefined,
});

export function useLenis() {
  return useContext(LenisContext);
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (reduced || typeof window === "undefined") {
      setLenis(null);
      return;
    }

    const { gsap, ScrollTrigger } = ensureGsap();

    const instance = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });
    setLenis(instance);

    instance.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    void refreshScrollTriggerAfterFonts();

    return () => {
      gsap.ticker.remove(ticker);
      instance.destroy();
      setLenis(null);
      ScrollTrigger.refresh();
    };
  }, [reduced]);

  const scrollTo = useCallback(
    (
      target: string | number | HTMLElement,
      options?: Record<string, unknown>,
    ) => {
      if (lenis) {
        lenis.scrollTo(target, options);
        return;
      }
      const behavior: ScrollBehavior = reduced ? "auto" : "smooth";
      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior });
        return;
      }
      if (typeof target === "string") {
        document.querySelector(target)?.scrollIntoView({ behavior });
        return;
      }
      target.scrollIntoView({ behavior });
    },
    [lenis, reduced],
  );

  const value = useMemo(
    () => ({ lenis, scrollTo }),
    [lenis, scrollTo],
  );

  return (
    <LenisContext.Provider value={value}>{children}</LenisContext.Provider>
  );
}

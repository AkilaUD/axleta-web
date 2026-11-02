import { useRef, type ReactNode } from "react";
import { ensureGsap } from "~/lib/gsap";
import { usePrefersReducedMotion } from "~/hooks/usePrefersReducedMotion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "article" | "section";
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 40,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const { gsap, useGSAP } = ensureGsap();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) {
        return;
      }
      gsap.from(el, {
        opacity: 0,
        y,
        duration: 0.85,
        delay,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
        },
      });
    },
    { dependencies: [reduced, delay, y], scope: ref },
  );

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}

type RevealStaggerProps = {
  children: ReactNode;
  className?: string;
  selector?: string;
  y?: number;
};

/** Stagger children matching `selector` when the group enters view. */
export function RevealStagger({
  children,
  className = "",
  selector = "[data-reveal-item]",
  y = 28,
}: RevealStaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { gsap, useGSAP } = ensureGsap();

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || reduced) {
        return;
      }
      const items = root.querySelectorAll(selector);
      if (!items.length) {
        return;
      }
      gsap.from(items, {
        opacity: 0,
        y,
        duration: 0.65,
        stagger: 0.07,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: root,
          start: "top 88%",
          once: true,
        },
      });
    },
    { dependencies: [reduced, selector, y], scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

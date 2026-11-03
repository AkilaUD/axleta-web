import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

let registered = false;

/**
 * Register GSAP plugins once (client-only). Call from any client component
 * before creating timelines.
 */
export function ensureGsap() {
  if (registered || typeof window === "undefined") {
    return { gsap, ScrollTrigger, DrawSVGPlugin, SplitText, useGSAP };
  }

  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, SplitText, useGSAP);
  gsap.defaults({ ease: "power3.out", duration: 0.7 });
  registered = true;

  return { gsap, ScrollTrigger, DrawSVGPlugin, SplitText, useGSAP };
}

/** Refresh ScrollTrigger after fonts (and optionally images) settle. */
export async function refreshScrollTriggerAfterFonts() {
  if (typeof document === "undefined") return;
  try {
    await document.fonts.ready;
  } catch {
    /* ignore */
  }
  ensureGsap().ScrollTrigger.refresh();
}

export { gsap, ScrollTrigger, DrawSVGPlugin, SplitText, useGSAP };

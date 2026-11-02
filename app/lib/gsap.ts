import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

let registered = false;

export function ensureGsap() {
  if (registered || typeof window === "undefined") {
    return { gsap, ScrollTrigger, useGSAP };
  }
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  gsap.defaults({ ease: "power3.out", duration: 0.7 });
  registered = true;
  return { gsap, ScrollTrigger, useGSAP };
}

export { gsap, ScrollTrigger, useGSAP };

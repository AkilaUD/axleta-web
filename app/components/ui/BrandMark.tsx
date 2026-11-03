import { LogoMark } from "~/components/svg/Logo";

/** Compact Axleta mark for tight UI slots. */
export function BrandMark({ className = "h-8 w-8" }: { className?: string }) {
  return <LogoMark className={className} />;
}

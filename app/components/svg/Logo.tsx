type LogoProps = {
  className?: string;
  /** Accessible name; decorative when empty and parent has aria-label */
  alt?: string;
  /** Compact height for nav; full lockup for footer */
  variant?: "nav" | "footer" | "preloader";
};

const SRC = "/images/logo.png";

/**
 * Official Axleta lockup (wordmark + tagline + mark).
 * Artwork includes a black plate — best on ink / dark surfaces.
 */
export function Logo({
  className = "",
  alt = "Axleta — An Axle to the Technology and Advancement",
  variant = "nav",
}: LogoProps) {
  const size =
    variant === "footer"
      ? "h-16 w-auto max-w-[min(100%,22rem)] md:h-20"
      : variant === "preloader"
        ? "h-14 w-auto max-w-[16rem] sm:h-16"
        : "h-9 w-auto max-w-[11.5rem] sm:h-10 sm:max-w-[13rem]";

  return (
    <img
      src={SRC}
      alt={alt}
      width={814}
      height={306}
      className={`${size} object-contain object-left ${className}`}
      decoding="async"
    />
  );
}

/** Icon-only crop of the geometric mark (right side of lockup) for tight UI. */
export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <span
      className={`inline-block overflow-hidden ${className}`}
      aria-hidden
      style={{
        backgroundImage: `url(${SRC})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "270% auto",
        backgroundPosition: "100% 50%",
      }}
    />
  );
}

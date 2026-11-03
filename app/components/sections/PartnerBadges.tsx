import { getImage } from "~/data/images";

type PartnerBadgesProps = {
  className?: string;
  tone?: "dark" | "light";
};

/**
 * Partner program marks.
 * Cropped PNGs on paper so color marks stay readable on ink sections.
 */
export function PartnerBadges({
  className = "",
  tone = "dark",
}: PartnerBadgesProps) {
  const sap = getImage("badge-sap");
  const google = getImage("badge-google");
  const plate =
    tone === "dark"
      ? "bg-paper"
      : "border border-[color-mix(in_srgb,var(--color-steel)_35%,transparent)] bg-paper";

  return (
    <div
      className={`flex flex-wrap items-center gap-3 sm:gap-4 ${className}`}
      role="list"
      aria-label="Partner programs"
    >
      {google ? (
        <div
          role="listitem"
          className={`flex h-14 items-center justify-center overflow-hidden rounded-md px-3 py-2 sm:h-[4.25rem] sm:px-4 ${plate}`}
        >
          <img
            src={google.path}
            alt="Google Cloud Partner"
            width={google.width}
            height={google.height}
            className="h-10 w-auto max-w-[min(100%,16rem)] object-contain object-center sm:h-12"
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : null}
      {sap ? (
        <div
          role="listitem"
          className={`flex h-14 items-center justify-center overflow-hidden rounded-md px-4 py-2 sm:h-[4.25rem] sm:px-5 ${plate}`}
        >
          <img
            src={sap.path}
            alt="SAP PartnerEdge Open Ecosystem"
            width={sap.width}
            height={sap.height}
            className="h-9 w-auto max-w-[min(100%,17rem)] object-contain object-center sm:h-11"
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : null}
    </div>
  );
}

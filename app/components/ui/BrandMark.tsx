export function BrandMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden
      fill="none"
    >
      <rect x="1" y="1" width="30" height="30" stroke="currentColor" strokeWidth="1.25" />
      <path d="M8 24 L16 8 L24 24" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11.5 17h9" stroke="var(--color-brand)" strokeWidth="1.5" />
    </svg>
  );
}

export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[var(--radius-button)] focus:bg-surface focus:px-4 focus:py-2 focus:shadow-md"
    >
      Skip to main content
    </a>
  );
}

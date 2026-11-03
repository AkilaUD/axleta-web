export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-paper focus:px-4 focus:py-2 focus:font-mono focus:text-[0.7rem] focus:tracking-[0.12em] focus:text-ink focus:uppercase"
    >
      Skip to main content
    </a>
  );
}

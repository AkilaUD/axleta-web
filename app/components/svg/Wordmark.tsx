import { Logo, LogoMark } from "~/components/svg/Logo";

type WordmarkProps = {
  className?: string;
  withMark?: boolean;
};

/** @deprecated Prefer `Logo` — kept as a thin alias for existing imports. */
export function Wordmark({ className = "" }: WordmarkProps) {
  return <Logo className={className} variant="nav" />;
}

/** @deprecated Prefer `LogoMark`. */
export function AxleMark({ className = "h-8 w-8" }: { className?: string }) {
  return <LogoMark className={className} />;
}

/** Large footer treatment using the official lockup. */
export function DisplayWordmark({
  className = "",
}: {
  className?: string;
  lettersClassName?: string;
}) {
  return (
    <Logo
      className={className}
      variant="footer"
      alt="Axleta"
    />
  );
}

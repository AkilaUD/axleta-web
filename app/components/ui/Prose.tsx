import type { ReactNode } from "react";

type ProseProps = {
  children: ReactNode;
  className?: string;
  large?: boolean;
};

export function Prose({ children, className = "", large = false }: ProseProps) {
  return (
    <div
      className={`prose-axleta max-w-prose ${large ? "text-body-lg" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

import type { ReactNode } from "react";

type ProductShellProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

export function ProductShell({
  title = "Axleta · Connected operations",
  children,
  className = "",
}: ProductShellProps) {
  return (
    <div className={`product-window ${className}`}>
      <div className="product-window__chrome">
        <span className="product-window__dot" />
        <span className="product-window__dot" />
        <span className="product-window__dot" />
        <p className="ml-2 truncate text-[0.7rem] font-medium tracking-wide text-white/70">
          {title}
        </p>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "main";
  narrow?: boolean;
};

export function Container({
  children,
  className = "",
  as: Tag = "div",
  narrow = false,
}: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full px-[clamp(1.25rem,4vw,2.5rem)] ${
        narrow ? "max-w-[48rem]" : "max-w-[90rem]"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}

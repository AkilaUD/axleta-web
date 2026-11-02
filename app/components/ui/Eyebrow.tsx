type EyebrowProps = {
  children: string;
  className?: string;
};

export function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <p className={`text-eyebrow ${className}`}>
      <span className="mr-2 inline-block h-[2px] w-5 translate-y-[-3px] bg-[var(--color-brand)] align-middle" />
      {children}
    </p>
  );
}

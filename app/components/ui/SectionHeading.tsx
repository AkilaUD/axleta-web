import { Eyebrow } from "~/components/ui/Eyebrow";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  as?: "h1" | "h2";
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Tag = "h2",
  align = "left",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl";
  return (
    <header className={`mb-10 space-y-3 ${alignClass}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Tag className={`${Tag === "h1" ? "text-h1" : "text-h2"} text-text`}>
        {title}
      </Tag>
      {description ? (
        <p className="text-body-lg text-muted">{description}</p>
      ) : null}
    </header>
  );
}

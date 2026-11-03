import { useEffect, useState } from "react";

/** Press G to toggle the 12-column engineering grid (desktop easter egg). */
export function GridOverlay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.key === "g" || e.key === "G") {
        setVisible((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      className={`site-grid ${visible ? "is-visible" : ""}`}
      aria-hidden
    >
      {Array.from({ length: 12 }, (_, i) => (
        <span key={i} />
      ))}
    </div>
  );
}

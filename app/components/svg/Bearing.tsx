type BearingProps = {
  className?: string;
  /** Unique id prefix so multiple instances don't clash clip/filter ids */
  id?: string;
};

const LABELS = [
  { text: "ERP", angle: -18 },
  { text: "CLOUD", angle: 55 },
  { text: "WORK", angle: 140 },
  { text: "AUTO", angle: 230 },
] as const;

/** Concentric bearing / ring motif — 5 rings, ticks every 6°. */
export function Bearing({ className = "", id = "bearing" }: BearingProps) {
  const ticks = Array.from({ length: 60 }, (_, i) => i * 6);

  return (
    <svg
      viewBox="0 0 600 600"
      className={className}
      fill="none"
      aria-hidden
    >
      <g className="bearing-rings" style={{ transformOrigin: "300px 300px" }}>
        {[280, 230, 175, 120, 70].map((r, i) => (
          <circle
            key={r}
            className="bearing-ring"
            cx="300"
            cy="300"
            r={r}
            stroke="currentColor"
            strokeWidth={i === 0 || i === 2 ? 1.5 : 1}
            opacity={i === 0 ? 0.55 : 0.28 + i * 0.06}
          />
        ))}

        {ticks.map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const major = deg % 30 === 0;
          const inner = major ? 255 : 268;
          const outer = 280;
          return (
            <line
              key={deg}
              className="bearing-tick"
              x1={300 + Math.cos(rad) * inner}
              y1={300 + Math.sin(rad) * inner}
              x2={300 + Math.cos(rad) * outer}
              y2={300 + Math.sin(rad) * outer}
              stroke="currentColor"
              strokeWidth={major ? 1.25 : 0.75}
              opacity={major ? 0.55 : 0.25}
            />
          );
        })}

        {/* Oxide accent node */}
        <circle
          cx="300"
          cy="20"
          r="4"
          className="bearing-node"
          fill="var(--color-oxide)"
        />

        {LABELS.map(({ text, angle }) => {
          const rad = (angle * Math.PI) / 180;
          const x = 300 + Math.cos(rad) * 205;
          const y = 300 + Math.sin(rad) * 205;
          return (
            <text
              key={text}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="bearing-label"
              fill="currentColor"
              opacity="0.55"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.14em",
              }}
            >
              {text}
            </text>
          );
        })}

        {/* Hub */}
        <circle
          cx="300"
          cy="300"
          r="18"
          stroke="var(--color-oxide)"
          strokeWidth="1.5"
          className="bearing-hub"
        />
        <circle cx="300" cy="300" r="4" fill="var(--color-oxide)" />

        {/* Crosshair */}
        <line
          x1="300"
          y1="250"
          x2="300"
          y2="350"
          stroke="currentColor"
          strokeWidth="0.75"
          opacity="0.25"
        />
        <line
          x1="250"
          y1="300"
          x2="350"
          y2="300"
          stroke="currentColor"
          strokeWidth="0.75"
          opacity="0.25"
        />
      </g>
      <title id={`${id}-title`}>Bearing diagram</title>
    </svg>
  );
}

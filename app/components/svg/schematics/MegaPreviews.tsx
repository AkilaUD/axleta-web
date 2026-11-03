/** Lightweight line-art previews for the mega menu (full schematics come in S3). */

type SchematicProps = { className?: string; active?: boolean };

const stroke = "currentColor";
const accent = "var(--color-oxide)";

export function SchematicErp({ className = "" }: SchematicProps) {
  /** 6 nodes — even spacing, padded viewBox so nothing clips as an orphan edge circle. */
  const spokes = [0, 60, 120, 180, 240, 300];
  return (
    <svg viewBox="0 0 200 160" className={className} fill="none" aria-hidden>
      <circle cx="100" cy="80" r="16" stroke={accent} strokeWidth="1.5" />
      <circle cx="100" cy="80" r="4" fill={accent} />
      {spokes.map((deg) => {
        const r = (deg * Math.PI) / 180;
        const x2 = 100 + Math.cos(r) * 52;
        const y2 = 80 + Math.sin(r) * 48;
        return (
          <g key={deg}>
            <line
              x1={100 + Math.cos(r) * 20}
              y1={80 + Math.sin(r) * 20}
              x2={x2}
              y2={y2}
              stroke={stroke}
              strokeWidth="1.25"
              opacity="0.7"
            />
            <circle cx={x2} cy={y2} r="4.5" stroke={stroke} strokeWidth="1.25" />
          </g>
        );
      })}
    </svg>
  );
}

export function SchematicConnected({ className = "" }: SchematicProps) {
  return (
    <svg viewBox="0 0 200 160" className={className} fill="none" aria-hidden>
      <rect x="78" y="58" width="44" height="44" stroke={accent} strokeWidth="1.5" />
      <circle cx="100" cy="80" r="6" fill={accent} />
      {[
        [30, 40],
        [170, 40],
        [30, 120],
        [170, 120],
        [100, 22],
        [100, 138],
      ].map(([x, y], i) => (
        <g key={i}>
          <line
            x1="100"
            y1="80"
            x2={x}
            y2={y}
            stroke={stroke}
            strokeWidth="1.25"
            strokeDasharray="3 3"
            opacity="0.65"
          />
          <rect
            x={x - 8}
            y={y - 8}
            width="16"
            height="16"
            stroke={stroke}
            strokeWidth="1.25"
          />
        </g>
      ))}
    </svg>
  );
}

export function SchematicCloud({ className = "" }: SchematicProps) {
  return (
    <svg viewBox="0 0 200 160" className={className} fill="none" aria-hidden>
      <rect x="48" y="36" width="104" height="28" stroke={stroke} strokeWidth="1.25" />
      <rect x="48" y="68" width="104" height="28" stroke={stroke} strokeWidth="1.25" />
      <rect x="48" y="100" width="104" height="28" stroke={accent} strokeWidth="1.5" />
      <rect
        x="40"
        y="28"
        width="120"
        height="108"
        stroke={stroke}
        strokeWidth="1"
        strokeDasharray="4 4"
        opacity="0.5"
      />
      {[56, 72, 88].map((y) => (
        <circle key={y} cx="60" cy={y} r="2.5" fill={accent} />
      ))}
    </svg>
  );
}

export function SchematicProductivity({ className = "" }: SchematicProps) {
  return (
    <svg viewBox="0 0 200 160" className={className} fill="none" aria-hidden>
      <rect x="46" y="34" width="70" height="90" stroke={stroke} strokeWidth="1.25" />
      <rect x="78" y="48" width="70" height="90" stroke={accent} strokeWidth="1.5" />
      <path
        d="M118 88 L132 102 L148 74"
        stroke={accent}
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <line x1="58" y1="52" x2="100" y2="52" stroke={stroke} strokeWidth="1" opacity="0.5" />
      <line x1="58" y1="64" x2="100" y2="64" stroke={stroke} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

export function SchematicAutomation({ className = "" }: SchematicProps) {
  return (
    <svg viewBox="0 0 200 160" className={className} fill="none" aria-hidden>
      <circle cx="40" cy="80" r="10" stroke={stroke} strokeWidth="1.25" />
      <line x1="50" y1="80" x2="84" y2="80" stroke={stroke} strokeWidth="1.25" />
      <rect x="84" y="66" width="28" height="28" stroke={stroke} strokeWidth="1.25" />
      <line x1="112" y1="80" x2="132" y2="80" stroke={stroke} strokeWidth="1.25" />
      <path
        d="M132 80 L148 64 L164 80 L148 96 Z"
        stroke={accent}
        strokeWidth="1.5"
      />
      <line x1="164" y1="80" x2="186" y2="80" stroke={stroke} strokeWidth="1.25" />
      <circle cx="186" cy="80" r="6" fill={accent} />
    </svg>
  );
}

export function SchematicAdvisory({ className = "" }: SchematicProps) {
  return (
    <svg viewBox="0 0 200 160" className={className} fill="none" aria-hidden>
      <circle cx="100" cy="78" r="42" stroke={stroke} strokeWidth="1.25" />
      <circle cx="100" cy="78" r="28" stroke={stroke} strokeWidth="1" opacity="0.5" />
      <line x1="100" y1="36" x2="100" y2="120" stroke={stroke} strokeWidth="1" />
      <line x1="58" y1="78" x2="142" y2="78" stroke={stroke} strokeWidth="1" />
      <path
        d="M70 110 L100 48 L118 96"
        stroke={accent}
        strokeWidth="1.5"
        strokeLinejoin="miter"
      />
      <circle cx="100" cy="78" r="3" fill={accent} />
    </svg>
  );
}

export const megaSchematics = {
  erp: SchematicErp,
  connected: SchematicConnected,
  cloud: SchematicCloud,
  productivity: SchematicProductivity,
  automation: SchematicAutomation,
  advisory: SchematicAdvisory,
} as const;

export type MegaSchematicId = keyof typeof megaSchematics;

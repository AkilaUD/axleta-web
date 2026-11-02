import { ProductShell } from "~/components/diagrams/ProductShell";

const modules = [
  { label: "Sales", value: "Orders · pipeline" },
  { label: "Purchasing", value: "Vendors · PO" },
  { label: "Finance", value: "GL · banking" },
  { label: "Inventory", value: "Stock · transfer" },
  { label: "Manufacturing", value: "BOM · MRP" },
  { label: "Analytics", value: "Dashboards" },
];

/** Static structure; hero GSAP timeline animates `.pd-tile` / `.product-window`. */
export function SystemDiagram() {
  return (
    <ProductShell className="hero-shell">
      <div className="bg-[linear-gradient(165deg,#152536_0%,#0b1622_55%,#09131d_100%)] p-4 text-white md:p-5">
        <div className="mb-4 flex items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[var(--color-brand)]">
              ERP workspace
            </p>
            <p className="mt-1 text-sm font-semibold">Operational core</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-brand)]/20 px-3 py-1 text-[0.65rem] font-semibold text-[#89d1ff]">
            <span className="size-1.5 animate-pulse rounded-full bg-[#89d1ff]" />
            Live landscape
          </span>
        </div>

        <div className="pd-tile mb-4 rounded-[var(--radius-button)] border border-[var(--color-brand)]/45 bg-[linear-gradient(135deg,color-mix(in_srgb,var(--color-brand)_22%,transparent),transparent)] p-4">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#89d1ff]">
            Core layer
          </p>
          <p className="mt-1 text-lg font-semibold">
            SAP Business One · S/4HANA Public Cloud
          </p>
          <p className="mt-1 text-xs text-white/65">
            Sales · Purchasing · Finance · Banking · Inventory · Manufacturing ·
            MRP
          </p>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          {modules.map((item) => (
            <div
              key={item.label}
              className="pd-tile rounded-[var(--radius-button)] border border-white/10 bg-white/[0.04] p-3 transition-colors hover:border-[var(--color-brand)]/50 hover:bg-white/[0.07]"
            >
              <p className="text-sm font-semibold">{item.label}</p>
              <p className="mt-0.5 text-xs text-white/60">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="pd-tile mt-3 grid gap-2 rounded-[var(--radius-button)] border border-white/10 bg-white/[0.03] p-3 sm:grid-cols-3">
          <Layer label="Add-ons" detail="Integrations" />
          <Layer label="Cloud" detail="Private · hybrid" />
          <Layer label="Automation" detail="Process · Gen AI" />
        </div>
      </div>
    </ProductShell>
  );
}

function Layer({ label, detail }: { label: string; detail: string }) {
  return (
    <div>
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-white/45">
        {label}
      </p>
      <p className="mt-1 text-sm text-white/85">{detail}</p>
    </div>
  );
}

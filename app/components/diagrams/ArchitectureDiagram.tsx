const layers = [
  {
    title: "Users & reporting",
    items: ["Sales", "Finance", "Inventory", "Manufacturing"],
    tone: "soft",
  },
  {
    title: "Add-ons & integrations",
    items: ["Analytics", "Payments", "Barcodes", "Materials"],
    tone: "mid",
  },
  {
    title: "Core ERP",
    items: ["SAP Business One", "SAP S/4HANA Public Cloud"],
    tone: "core",
  },
  {
    title: "Infrastructure",
    items: ["Private cloud", "Network", "Storage", "Virtualization"],
    tone: "base",
  },
];

export function ArchitectureDiagram() {
  return (
    <figure aria-label="Four-layer ERP architecture">
      <div className="space-y-2">
        {layers.map((layer, index) => (
          <div
            key={layer.title}
            className={`rounded-[var(--radius-button)] px-4 py-3 ${
              layer.tone === "core"
                ? "bg-[var(--color-brand)] text-white shadow-[0_10px_30px_color-mix(in_srgb,var(--color-brand)_45%,transparent)]"
                : layer.tone === "mid"
                  ? "border border-white/15 bg-white/10 text-white"
                  : "border border-white/10 bg-white/5 text-white"
            }`}
          >
            <p
              className={`mb-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] ${
                layer.tone === "core" ? "text-white/80" : "text-[#89d1ff]"
              }`}
            >
              {String(index + 1).padStart(2, "0")} · {layer.title}
            </p>
            <p className="text-sm tracking-wide">{layer.items.join("  ·  ")}</p>
          </div>
        ))}
      </div>
    </figure>
  );
}

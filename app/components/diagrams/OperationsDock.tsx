const modules = [
  { label: "Sales", value: "Orders" },
  { label: "Purchasing", value: "Vendors" },
  { label: "Finance", value: "GL" },
  { label: "Inventory", value: "Stock" },
  { label: "Manufacturing", value: "MRP" },
  { label: "Analytics", value: "Views" },
];

/** Full-bleed operations strip — not a floating SaaS card. */
export function OperationsDock() {
  return (
    <div className="hero-console border-t border-white/15 bg-[color-mix(in_srgb,#0a141d_78%,transparent)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-[90rem] items-stretch gap-0 overflow-x-auto px-[clamp(1.25rem,4vw,2.5rem)] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="pd-tile flex shrink-0 flex-col justify-center border-r border-white/10 py-5 pr-6 md:pr-10">
          <p className="text-[0.65rem] font-bold tracking-[0.16em] text-[#89d1ff] uppercase">
            Operational core
          </p>
          <p className="mt-1 whitespace-nowrap text-sm font-semibold text-white md:text-base">
            SAP Business One · S/4HANA Public Cloud
          </p>
        </div>
        {modules.map((item) => (
          <div
            key={item.label}
            className="pd-tile group flex shrink-0 flex-col justify-center border-r border-white/10 px-5 py-5 last:border-r-0 md:px-7"
          >
            <p className="text-[0.65rem] font-bold tracking-[0.12em] text-white/45 uppercase transition-colors group-hover:text-[#89d1ff]">
              {item.label}
            </p>
            <p className="mt-1 text-sm font-medium text-white/90">{item.value}</p>
          </div>
        ))}
        <div className="pd-tile ml-auto hidden shrink-0 items-center gap-6 border-l border-white/10 py-5 pl-8 lg:flex">
          <Meta label="Add-ons" value="Integrations" />
          <Meta label="Cloud" value="Private · hybrid" />
          <Meta label="Automation" value="Process · Gen AI" />
        </div>
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[0.6rem] font-bold tracking-[0.14em] text-white/40 uppercase">
        {label}
      </p>
      <p className="mt-0.5 text-xs text-white/80">{value}</p>
    </div>
  );
}

export type Addon = {
  id: string;
  name: string;
  situation: string;
  solution: string;
  connection: string;
  benefit: string;
};

export const addons: Addon[] = [
  {
    id: "plm",
    name: "Product lifecycle management (PLM) for SAP Business One",
    situation: "Product data lives outside the ERP or is hard to trace.",
    solution: "PLM aligned with SAP Business One for product-related workflows.",
    connection: "Extends master data and processes tied to the ERP core.",
    benefit: "Clearer product information flowing into operations and reporting.",
  },
  {
    id: "materials",
    name: "Material management & SAP Business One integration",
    situation: "Material master and shop-floor data need tighter control.",
    solution: "Material management connected to SAP Business One.",
    connection: "Synchronizes material data with ERP transactions.",
    benefit: "More consistent purchasing, inventory, and production planning.",
  },
  {
    id: "development",
    name: "Technical & product development system",
    situation: "Development activity is tracked separately from ERP.",
    solution: "Development workflows integrated with business systems.",
    connection: "Links engineering or development records to ERP where appropriate.",
    benefit: "Better handoff from development into operational data.",
  },
  {
    id: "assets",
    name: "Fixed assets management",
    situation: "Asset registers and depreciation need structured control.",
    solution: "Fixed asset processes connected to financial operations.",
    connection: "Feeds asset and depreciation context into ERP finance.",
    benefit: "Improved visibility of asset value and lifecycle.",
  },
  {
    id: "analytics",
    name: "Sales analytics web application for SAP Business One",
    situation: "Sales insight requires views beyond standard reports.",
    solution: "Web-based analytics layered on SAP Business One data.",
    connection: "Reads operational sales data from the ERP environment.",
    benefit: "Clearer sales performance views for decision-makers.",
  },
  {
    id: "transfer",
    name: "Inventory transfer automation",
    situation: "Stock movements between locations are manual or error-prone.",
    solution: "Automated inventory transfer workflows for SAP Business One.",
    connection: "Posts or orchestrates transfers within ERP inventory processes.",
    benefit: "Fewer manual steps and more reliable stock positions.",
  },
  {
    id: "barcode",
    name: "Barcode generation & management",
    situation: "Warehouse and shop-floor scanning needs consistent labels.",
    solution: "Barcode workflows integrated with inventory operations.",
    connection: "Supports ERP inventory and logistics processes.",
    benefit: "Faster, more accurate scanning and traceability.",
  },
  {
    id: "payments",
    name: "Online payments with bank integration",
    situation: "Customer or supplier payments need to align with finance.",
    solution: "Payment flows connected to banking and ERP finance.",
    connection: "Bridges payment channels with ERP financial records.",
    benefit: "Smoother reconciliation and cash visibility.",
  },
];

export const solutionFamilies = [
  {
    title: "SAP Business One",
    href: "/solutions/sap-business-one",
    description:
      "ERP for small and midsize businesses covering core operational modules.",
  },
  {
    title: "SAP S/4HANA Public Cloud",
    href: "/solutions/sap-s4hana-public-cloud",
    description:
      "Cloud ERP for organizations evaluating standardized processes and public cloud delivery.",
  },
  {
    title: "ERP add-ons & integrations",
    href: "/solutions/add-ons-integrations",
    description:
      "Companion applications that extend and connect your ERP core.",
  },
  {
    title: "Cloud & infrastructure",
    href: "/solutions/cloud-infrastructure",
    description:
      "Private cloud, servers, networks, storage, security, and virtualization.",
  },
  {
    title: "Business productivity",
    href: "/solutions/business-productivity",
    description: "Google Workspace and collaboration for distributed teams.",
  },
  {
    title: "Automation & AI",
    href: "/solutions/automation-ai",
    description:
      "Practical process automation and generative AI introductions.",
  },
] as const;

export const erpComparisonRows = [
  {
    aspect: "Typical fit",
    b1: "Small and midsize businesses needing an integrated operational ERP.",
    s4: "Organizations evaluating public cloud ERP with standardized processes.",
  },
  {
    aspect: "Deployment",
    b1: "On-premise or hosted environments familiar to SME IT teams.",
    s4: "SAP-managed public cloud model with cloud operations considerations.",
  },
  {
    aspect: "How Axleta helps",
    b1: "Selection, implementation, extensions, and support for SAP Business One.",
    s4: "Advisory conversations on readiness, fit, and implementation planning.",
  },
] as const;

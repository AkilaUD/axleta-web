export type Capability = {
  id: string;
  title: string;
  outcome: string;
  description: string;
  href: string;
};

export const capabilities: Capability[] = [
  {
    id: "erp",
    title: "ERP & business systems",
    outcome: "One operational core for sales, finance, inventory, and more.",
    description:
      "SAP Business One and SAP S/4HANA Public Cloud, selected and implemented to fit how your business actually runs.",
    href: "/solutions/erp",
  },
  {
    id: "connected",
    title: "Connected operations",
    outcome: "Extensions that talk to your ERP instead of sitting in silos.",
    description:
      "Add-ons and integrations for materials, assets, analytics, inventory movement, barcodes, and payments.",
    href: "/solutions/add-ons-integrations",
  },
  {
    id: "infrastructure",
    title: "Cloud & infrastructure",
    outcome: "Stable environments for transactions, storage, and access.",
    description:
      "Private cloud, dedicated servers, networks, security, and virtualization aligned to SME scale.",
    href: "/solutions/cloud-infrastructure",
  },
  {
    id: "productivity",
    title: "Workplace productivity",
    outcome: "Teams working from shared, accessible information.",
    description:
      "Google Workspace and cloud collaboration setup, licensing assistance, and practical adoption.",
    href: "/solutions/business-productivity",
  },
  {
    id: "automation",
    title: "Automation & applied AI",
    outcome: "Less repetitive work with appropriate human oversight.",
    description:
      "Process automation and practical generative AI introductions grounded in governance and privacy.",
    href: "/solutions/automation-ai",
  },
  {
    id: "advisory",
    title: "Business & technology advisory",
    outcome: "Clear requirements before technology spend.",
    description:
      "ERP selection, strategic consultancy, analysis, project coordination, and support.",
    href: "/services",
  },
];

export const erpModules = [
  "Sales",
  "Purchasing",
  "Finance",
  "Banking",
  "Inventory",
  "Manufacturing",
  "Material requirements planning (MRP)",
] as const;

export const processSteps = [
  {
    title: "Understand",
    description:
      "Discover business context, workflows, constraints, and goals.",
  },
  {
    title: "Assess",
    description:
      "Analyze requirements, existing systems, risks, and opportunities.",
  },
  {
    title: "Recommend",
    description:
      "Identify a fit-for-purpose solution and a realistic implementation path.",
  },
  {
    title: "Implement",
    description:
      "Coordinate configuration, development, integration, and delivery.",
  },
  {
    title: "Improve",
    description:
      "Support adoption, maintenance, and ongoing optimization where agreed.",
  },
] as const;

export const whyAxleta = [
  {
    title: "Business-first analysis",
    description:
      "We start with how your business operates, not with a product catalogue.",
  },
  {
    title: "Technology that fits",
    description:
      "Solutions are selected for fitness for purpose and cost-effectiveness.",
  },
  {
    title: "Simplicity & SMART objectives",
    description:
      "We respect your context and work toward specific, measurable outcomes.",
  },
  {
    title: "ERP & IT project experience",
    description:
      "Exposure across ERP implementations and broader IT-related projects.",
  },
  {
    title: "Partnership approach",
    description:
      "We aim to be a long-term technological companion, not a one-off vendor.",
  },
] as const;

export const businessChallenges = [
  "Disconnected applications and duplicated data entry",
  "Manual processes that do not scale with growth",
  "Systems that no longer match operational needs",
  "Infrastructure that is hard to maintain or secure",
  "ERP investment without sufficient adoption or optimization",
  "Unclear technology decisions and implementation risk",
] as const;

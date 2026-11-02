export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      { label: "ERP solutions", href: "/solutions/erp" },
      { label: "SAP Business One", href: "/solutions/sap-business-one" },
      {
        label: "SAP S/4HANA Public Cloud",
        href: "/solutions/sap-s4hana-public-cloud",
      },
      {
        label: "ERP add-ons & integrations",
        href: "/solutions/add-ons-integrations",
      },
      {
        label: "Cloud & infrastructure",
        href: "/solutions/cloud-infrastructure",
      },
      {
        label: "Business productivity",
        href: "/solutions/business-productivity",
      },
      { label: "Automation & AI", href: "/solutions/automation-ai" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Consultancy", href: "/services#consultancy" },
      { label: "Requirements analysis", href: "/services#requirements" },
      { label: "Project management", href: "/services#project-management" },
      { label: "Resource allocation", href: "/services#resources" },
      { label: "Custom development", href: "/services#custom-development" },
      { label: "Support & optimization", href: "/services#support" },
    ],
  },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export const footerSolutions: NavItem[] = [
  { label: "ERP solutions", href: "/solutions/erp" },
  { label: "SAP Business One", href: "/solutions/sap-business-one" },
  { label: "Cloud & infrastructure", href: "/solutions/cloud-infrastructure" },
  { label: "Business productivity", href: "/solutions/business-productivity" },
];

export const footerServices: NavItem[] = [
  { label: "Consultancy", href: "/services#consultancy" },
  { label: "Requirements analysis", href: "/services#requirements" },
  { label: "Project management", href: "/services#project-management" },
  { label: "Support & optimization", href: "/services#support" },
];

export const footerCompany: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

/** Paths that must exist as routes (hash links validated separately). */
export const routablePaths = [
  "/",
  "/about",
  "/solutions",
  "/solutions/erp",
  "/solutions/sap-business-one",
  "/solutions/sap-s4hana-public-cloud",
  "/solutions/add-ons-integrations",
  "/solutions/cloud-infrastructure",
  "/solutions/business-productivity",
  "/solutions/automation-ai",
  "/services",
  "/insights",
  "/contact",
  "/privacy",
  "/terms",
];

export const serviceAnchorIds = [
  "consultancy",
  "requirements",
  "project-management",
  "resources",
  "custom-development",
  "support",
] as const;

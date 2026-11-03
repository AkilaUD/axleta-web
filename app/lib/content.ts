/**
 * Central copy surface for the redesign.
 * Prefer importing from here in new section components; existing
 * `~/data/*` modules remain the source of truth and are re-exported.
 */
export { site, contactInterestOptions, parseContactInterest } from "~/data/site";
export type { ContactInterest } from "~/data/site";

export {
  capabilities,
  businessChallenges,
  erpModules,
  whyAxleta,
  processSteps,
} from "~/data/capabilities";
export type { Capability } from "~/data/capabilities";

export { solutionFamilies, addons } from "~/data/solutions";
export type { Addon } from "~/data/solutions";

export {
  primaryNav,
  footerSolutions,
  footerServices,
  footerCompany,
} from "~/data/navigation";
export type { NavItem } from "~/data/navigation";

export const legalDisclaimer =
  "SAP and PartnerEdge are trademarks of SAP SE. Google, Google Cloud, and Google Workspace are trademarks of Google LLC. Axleta is not SAP or Google.";

export const heroCopy = {
  kicker: "Technology · Strategy · Growth",
  headlineLine1: "Your Technology",
  headlineLine2: "Advancement",
  headlineAccent: "Partner",
  sub: "We help businesses harness the power of modern technology — from ERP and cloud to automation and applied AI — to work smarter, operate efficiently, and achieve more.",
  primaryCta: "Explore Our Solutions",
  secondaryCta: "Discuss your needs",
  trustLabel: "Partnerships that support delivery",
  trustItems: [
    "Drive business efficiency",
    "Scale with confidence",
    "Innovate together",
  ],
  orbitCards: [
    {
      id: "erp",
      title: "SAP ERP Solutions",
      subtitle: "Business One · S/4HANA",
      href: "/solutions/erp",
      icon: "erp" as const,
    },
    {
      id: "cloud",
      title: "Google Cloud Solutions",
      subtitle: "Platform · Workspace",
      href: "/solutions/cloud-infrastructure",
      icon: "cloud" as const,
    },
    {
      id: "automation",
      title: "Automation (RPA & AI)",
      subtitle: "Process · Applied AI",
      href: "/solutions/automation-ai",
      icon: "automation" as const,
    },
    {
      id: "consulting",
      title: "Business Consulting",
      subtitle: "Advisory · Selection",
      href: "/services",
      icon: "people" as const,
    },
    {
      id: "infra",
      title: "IT Infrastructure",
      subtitle: "Secure & Scalable",
      href: "/solutions/cloud-infrastructure",
      icon: "server" as const,
    },
    {
      id: "custom",
      title: "Custom Solutions",
      subtitle: "Integrations · Build",
      href: "/services#custom-development",
      icon: "code" as const,
    },
  ],
} as const;

export const megaPreviewFamilies = [
  {
    id: "erp",
    label: "ERP & business systems",
    href: "/solutions/erp",
    blurb:
      "SAP Business One and SAP S/4HANA Public Cloud, selected for how you operate.",
  },
  {
    id: "connected",
    label: "Connected operations",
    href: "/solutions/add-ons-integrations",
    blurb: "Add-ons and integrations that talk to your ERP instead of sitting in silos.",
  },
  {
    id: "cloud",
    label: "Cloud & infrastructure",
    href: "/solutions/cloud-infrastructure",
    blurb: "Private cloud, servers, networks, security, and virtualization.",
  },
  {
    id: "productivity",
    label: "Workplace productivity",
    href: "/solutions/business-productivity",
    blurb: "Google Workspace, licensing assistance, and practical adoption.",
  },
  {
    id: "automation",
    label: "Automation & applied AI",
    href: "/solutions/automation-ai",
    blurb: "Process automation and practical gen-AI with governance and privacy.",
  },
  {
    id: "advisory",
    label: "Business & technology advisory",
    href: "/services",
    blurb: "Selection, consultancy, analysis, project coordination, and support.",
  },
] as const;

export type ServiceSection = {
  id: string;
  title: string;
  summary: string;
  bullets: string[];
};

export const serviceSections: ServiceSection[] = [
  {
    id: "consultancy",
    title: "ERP & strategic consultancy",
    summary:
      "Guidance across finance, marketing, supply chain, and operations—for ERP selection and broader business strategy.",
    bullets: [
      "ERP consultancy including evaluation of options beyond a single product",
      "Strategic support aligned to how your business operates",
      "SAP Business One support for organizations already running the platform",
    ],
  },
  {
    id: "requirements",
    title: "Business & technical requirements analysis",
    summary:
      "Structured analysis before solutions are chosen or built.",
    bullets: [
      "Requirement elicitation mapped to fit-for-purpose outcomes",
      "Alignment with customer context and operational priorities",
      "Foundation for implementation scope and delivery planning",
    ],
  },
  {
    id: "project-management",
    title: "Project management & implementation coordination",
    summary:
      "Flexible implementation coordination within agreed budget and timelines.",
    bullets: [
      "Planning for configuration, integration, and delivery milestones",
      "Coordination across technical and business stakeholders",
      "Practical responses to challenges that arise during delivery",
    ],
  },
  {
    id: "resources",
    title: "Resource allocation",
    summary:
      "Access to experienced project resources with flexible engagement models.",
    bullets: [
      "Support for ERP and IT-related project workloads",
      "Experience across implementation and related technology initiatives",
      "Engagement structured to match internal capacity needs",
    ],
  },
  {
    id: "custom-development",
    title: "Customized add-on development",
    summary:
      "Extensions tailored to requirements that standard products do not cover alone.",
    bullets: [
      "Development aligned to documented business needs",
      "Integration with SAP Business One and related systems",
      "Feasible scope agreed before build begins",
    ],
  },
  {
    id: "support",
    title: "Support & optimization",
    summary:
      "Ongoing assistance where included in the agreed engagement.",
    bullets: [
      "Help with adoption, maintenance, and incremental improvements",
      "Optimization focused on operational value, not unnecessary change",
      "Scope defined per support arrangement",
    ],
  },
];

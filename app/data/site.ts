export const site = {
  name: "Axleta",
  tagline: "An Axle to the Technology and Advancement",
  positioning:
    "The right technology. Better-connected operations. Meaningful business progress.",
  foundedYear: 2018,
  origin: "https://www.axleta.com",
  email: "info@axleta.com",
  linkedIn: "https://www.linkedin.com/company/axleta",
  address: {
    label: "axleta Canada",
    line1: "79 Beaconsfield Avenue",
    city: "Brampton",
    region: "Ontario",
    postal: "L6Y 4S1",
    country: "Canada",
  },
  vision: "Be the technological companion in your business.",
  mission:
    "Find the right technology to suit business requirements and advance business functions to enable the success of your business. Our technological solutions help achieve cost-effectiveness and fitness for purpose.",
  partners: {
    google:
      "Google Cloud Partner to introduce and sell products based on Google Cloud Platform and Google Productivity Suite.",
    sap: "Official member of the SAP® PartnerEdge® open ecosystem.",
  },
} as const;

export type ContactInterest =
  | "erp"
  | "sap-b1"
  | "s4hana"
  | "add-ons"
  | "infrastructure"
  | "productivity"
  | "automation"
  | "consulting"
  | "general";

export const contactInterestOptions: { value: ContactInterest; label: string }[] =
  [
    { value: "general", label: "General enquiry" },
    { value: "erp", label: "ERP requirements" },
    { value: "sap-b1", label: "SAP Business One" },
    { value: "s4hana", label: "SAP S/4HANA Public Cloud" },
    { value: "add-ons", label: "ERP add-ons & integrations" },
    { value: "infrastructure", label: "Cloud & infrastructure" },
    { value: "productivity", label: "Business productivity" },
    { value: "automation", label: "Automation & applied AI" },
    { value: "consulting", label: "Consultancy & services" },
  ];

export function parseContactInterest(
  raw: string | null | undefined,
): ContactInterest {
  const allowed = new Set(contactInterestOptions.map((o) => o.value));
  if (raw && allowed.has(raw as ContactInterest)) {
    return raw as ContactInterest;
  }
  return "general";
}

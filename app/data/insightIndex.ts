export const insightIndex = [
  {
    slug: "building-blocks-erp-success",
    title: "Building Blocks for Scalable Business Success via ERP system",
    excerpt:
      "Visualize the ERP ecosystem as three layers—infrastructure, core ERP, and extensions—and why each layer matters for ROI.",
  },
  {
    slug: "mail-subdomains-benefits",
    title: "Why subdomains are used for mails?",
    excerpt:
      "How mail.axleta.com separates email infrastructure from the public website and supports authentication and deliverability.",
  },
  {
    slug: "context-packer-github-copilot",
    title:
      "Successful Application Development by combining GitHub, GitHub Copilot, and Axleta Context Packer",
    excerpt:
      "Repository-wide context helps Copilot handle refactors and cross-module work—Context Packer is one approach to structured context.",
  },
  {
    slug: "sap-b1-cancellation-documents",
    title: "How to clearly identify the \"Cancellation\" document in SAP Business One",
    excerpt:
      "Use separate number series and document setup so cancellation documents are easy to find in SAP Business One queries and reports.",
  },
] as const;

export function getInsightMeta(slug: string) {
  return insightIndex.find((p) => p.slug === slug);
}

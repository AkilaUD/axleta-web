import type { Route } from "./+types/solutions.business-productivity";
import { SolutionDetail } from "~/components/sections/SolutionDetail";
import { getImage } from "~/data/images";
import { pageMeta } from "~/lib/meta";

export function meta(): Route.MetaDescriptors {
  return pageMeta({
    title: "Business productivity",
    description:
      "Google Workspace and Google Cloud collaboration—communication, documents, and team workflows for SMEs.",
    pathname: "/solutions/business-productivity",
  });
}

export default function ProductivityPage() {
  const image = getImage("productivity");
  return (
    <SolutionDetail
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Solutions", href: "/solutions" },
        {
          label: "Business productivity",
          href: "/solutions/business-productivity",
        },
      ]}
      eyebrow="Fig. — Productivity"
      title="Business productivity"
      description="Google Workspace and cloud collaboration so teams share information and coordinate work."
      imageSrc={image?.path}
      imageAlt={image?.alt}
      intro={[
        "As a Google Cloud Partner, Axleta introduces and sells products based on Google Cloud Platform and the Google productivity suite—including assistance with Google Workspace licensing and setup where offered.",
        "Typical outcomes include clearer communication, shared documents, coordinated calendars, and workflows that reduce scattered files across PCs and servers.",
      ]}
      points={[
        {
          title: "Licensing & setup",
          body: "Practical help adopting Google Workspace without disrupting how teams already work.",
        },
        {
          title: "Shared information",
          body: "Documents, mail, and calendars that stay connected instead of siloed on devices.",
        },
        {
          title: "Adoption support",
          body: "Guidance so the tools are used—not just provisioned.",
        },
      ]}
      ctaLabel="Discuss Google Workspace"
      ctaTo="/contact?interest=productivity"
    />
  );
}

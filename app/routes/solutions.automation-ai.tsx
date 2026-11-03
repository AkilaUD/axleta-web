import type { Route } from "./+types/solutions.automation-ai";
import { SolutionDetail } from "~/components/sections/SolutionDetail";
import { getImage } from "~/data/images";
import { pageMeta } from "~/lib/meta";

export function meta(): Route.MetaDescriptors {
  return pageMeta({
    title: "Automation & applied AI",
    description:
      "Practical process automation and generative AI introductions for SMEs—with governance and human review.",
    pathname: "/solutions/automation-ai",
  });
}

export default function AutomationPage() {
  const image = getImage("automation");
  return (
    <SolutionDetail
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Solutions", href: "/solutions" },
        { label: "Automation & AI", href: "/solutions/automation-ai" },
      ]}
      eyebrow="Fig. — Automation"
      title="Automation & applied AI"
      description="Identify repetitive work, automate handoffs where appropriate, and introduce generative AI with clear governance."
      imageSrc={image?.path}
      imageAlt={image?.alt}
      intro={[
        "Axleta helps businesses introduce process automation and generative artificial intelligence where they improve efficiency without replacing necessary human review and exception handling.",
        "Engagements consider data movement, integration points, privacy, and who approves outputs before automation touches production processes. We do not promise autonomous transformation or unnamed AI products.",
      ]}
      points={[
        {
          title: "Process first",
          body: "We find repetitive handoffs worth automating—then choose the lightest reliable approach.",
        },
        {
          title: "Applied AI with guardrails",
          body: "Generative AI is introduced with privacy, review, and ownership clearly defined.",
        },
        {
          title: "Governed delivery",
          body: "Integrations and exception paths stay visible so operations stay in control.",
        },
      ]}
      ctaLabel="Discuss automation"
      ctaTo="/contact?interest=automation"
    />
  );
}

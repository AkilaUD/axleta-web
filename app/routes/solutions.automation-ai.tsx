import type { Route } from "./+types/solutions.automation-ai";
import { LinkButton } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { PageHero } from "~/components/ui/PageHero";
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
    <main id="main">
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: "Automation & AI", href: "/solutions/automation-ai" },
        ]}
        eyebrow="Automation"
        title="Automation & applied AI"
        description="Identify repetitive work, automate handoffs where appropriate, and introduce generative AI with clear governance."
        imageSrc={image?.path}
        imageAlt={image?.alt}
      />
      <Container narrow className="py-16 md:py-20">
        <div className="prose-axleta text-muted">
          <p>
            Axleta helps businesses introduce process automation and generative
            artificial intelligence where they improve efficiency without
            replacing necessary human review and exception handling.
          </p>
          <p>
            Engagements consider data movement, integration points, privacy, and
            who approves outputs before automation touches production processes.
            We do not promise autonomous transformation or unnamed AI products.
          </p>
        </div>
        <LinkButton
          to="/contact?interest=automation"
          variant="primary"
          className="mt-10"
        >
          Discuss automation
        </LinkButton>
      </Container>
    </main>
  );
}

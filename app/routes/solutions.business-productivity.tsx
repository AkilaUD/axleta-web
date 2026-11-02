import type { Route } from "./+types/solutions.business-productivity";
import { LinkButton } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { PageHero } from "~/components/ui/PageHero";
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
    <main id="main">
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          {
            label: "Business productivity",
            href: "/solutions/business-productivity",
          },
        ]}
        eyebrow="Productivity"
        title="Business productivity"
        description="Google Workspace and cloud collaboration so teams share information and coordinate work."
        imageSrc={image?.path}
        imageAlt={image?.alt}
      />
      <Container narrow className="py-16 md:py-20">
        <div className="prose-axleta text-muted">
          <p>
            As a Google Cloud Partner, Axleta introduces and sells products based
            on Google Cloud Platform and the Google productivity suite—including
            assistance with Google Workspace licensing and setup where offered.
          </p>
          <p>
            Typical outcomes include clearer communication, shared documents,
            coordinated calendars, and workflows that reduce scattered files across
            PCs and servers.
          </p>
        </div>
        <LinkButton
          to="/contact?interest=productivity"
          variant="primary"
          className="mt-10"
        >
          Discuss Google Workspace
        </LinkButton>
      </Container>
    </main>
  );
}

import type { Route } from "./+types/solutions.cloud-infrastructure";
import { LinkButton } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { PageHero } from "~/components/ui/PageHero";
import { getImage } from "~/data/images";
import { pageMeta } from "~/lib/meta";

export function meta(): Route.MetaDescriptors {
  return pageMeta({
    title: "Cloud & infrastructure",
    description:
      "Private cloud, dedicated servers, LAN/WAN, storage, security, Proxmox virtualization, and remote access for SME IT environments.",
    pathname: "/solutions/cloud-infrastructure",
  });
}

export default function InfrastructurePage() {
  const image = getImage("infrastructure");
  return (
    <main id="main">
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          {
            label: "Cloud & infrastructure",
            href: "/solutions/cloud-infrastructure",
          },
        ]}
        eyebrow="Infrastructure"
        title="Cloud & infrastructure"
        description="Environments that keep business systems available, manageable, and aligned to how you operate."
        imageSrc={image?.path}
        imageAlt={image?.alt}
      />
      <Container narrow className="py-16 md:py-20">
        <div className="prose-axleta text-muted">
          <p>
            Implementing business systems requires reliable processing, storage,
            and network paths. Axleta helps SMEs plan private cloud and dedicated
            server setups, hybrid infrastructure, LAN/WAN redesign, secure storage,
            and IT security measures appropriate to your landscape.
          </p>
          <p>
            Virtualization is delivered using Proxmox to use hardware resources
            flexibly. Remote access can be enabled through Microsoft Remote Desktop
            Web Access where it fits your security model.
          </p>
          <p>
            We describe outcomes in business terms—availability, performance,
            data integrity, manageability, scalability, and continuity—without
            publishing uptime percentages or certification claims unless agreed in
            writing for your project.
          </p>
        </div>
        <LinkButton
          to="/contact?interest=infrastructure"
          variant="primary"
          className="mt-10"
        >
          Discuss infrastructure
        </LinkButton>
      </Container>
    </main>
  );
}

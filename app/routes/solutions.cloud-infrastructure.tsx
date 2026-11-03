import type { Route } from "./+types/solutions.cloud-infrastructure";
import { SolutionDetail } from "~/components/sections/SolutionDetail";
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
    <SolutionDetail
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Solutions", href: "/solutions" },
        {
          label: "Cloud & infrastructure",
          href: "/solutions/cloud-infrastructure",
        },
      ]}
      eyebrow="Fig. — Infrastructure"
      title="Cloud & infrastructure"
      description="Environments that keep business systems available, manageable, and aligned to how you operate."
      imageSrc={image?.path}
      imageAlt={image?.alt}
      intro={[
        "Implementing business systems requires reliable processing, storage, and network paths. Axleta helps SMEs plan private cloud and dedicated server setups, hybrid infrastructure, LAN/WAN redesign, secure storage, and IT security measures appropriate to your landscape.",
        "We describe outcomes in business terms—availability, performance, data integrity, manageability, scalability, and continuity—without publishing uptime percentages or certification claims unless agreed in writing for your project.",
      ]}
      points={[
        {
          title: "Private cloud & servers",
          body: "Right-sized compute and storage for ERP and line-of-business systems.",
        },
        {
          title: "Networks & security",
          body: "LAN/WAN design and controls matched to how people and systems connect.",
        },
        {
          title: "Virtualization & access",
          body: "Proxmox virtualization and remote access options that fit your security model.",
        },
      ]}
      listTitle="Typical coverage"
      listItems={[
        "Private cloud",
        "Dedicated servers",
        "LAN / WAN",
        "Storage",
        "Security",
        "Proxmox virtualization",
        "Remote access",
      ]}
      ctaLabel="Discuss infrastructure"
      ctaTo="/contact?interest=infrastructure"
    />
  );
}

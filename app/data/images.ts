export type SiteImage = {
  id: string;
  path: string;
  alt: string;
  width: number;
  height: number;
  generated: boolean;
  page?: string;
};

export const siteImages: SiteImage[] = [
  {
    id: "hero",
    path: "/images/hero.jfif",
    alt: "Axleta technology advisory session with a holographic globe of connected business systems",
    width: 1280,
    height: 720,
    generated: true,
    page: "home",
  },
  {
    id: "consulting",
    path: "/images/consulting-partnership.jpg",
    alt: "Teams collaborating in a modern operations office",
    width: 1920,
    height: 1080,
    generated: true,
    page: "about",
  },
  {
    id: "infrastructure",
    path: "/images/cloud-infrastructure.jpg",
    alt: "Organized server and network infrastructure",
    width: 1920,
    height: 1080,
    generated: true,
    page: "infrastructure",
  },
  {
    id: "erp",
    path: "/images/erp-connected-workspace.jpg",
    alt: "Warehouse and operations connected through ERP systems",
    width: 1600,
    height: 1200,
    generated: true,
    page: "erp",
  },
  {
    id: "productivity",
    path: "/images/productivity-workspace.jpg",
    alt: "Collaborative workplace using cloud productivity tools",
    width: 1920,
    height: 1080,
    generated: true,
    page: "productivity",
  },
  {
    id: "automation",
    path: "/images/automation-operations.jpg",
    alt: "Operations team reviewing process automation workflows",
    width: 1920,
    height: 1080,
    generated: true,
    page: "automation",
  },
  {
    id: "erp-exploded",
    path: "/images/erp-exploded-stack.jpg",
    alt: "Isometric exploded view of a four-layer ERP stack from infrastructure through users and reporting",
    width: 1376,
    height: 768,
    generated: true,
    page: "home",
  },
  {
    id: "schematic-erp",
    path: "/images/schematic-erp.jpg",
    alt: "Technical hub-and-spoke schematic of connected ERP systems",
    width: 1024,
    height: 1024,
    generated: true,
    page: "home",
  },
  {
    id: "badge-sap",
    path: "/images/badge-sap-partner.png",
    alt: "SAP PartnerEdge Open Ecosystem",
    width: 640,
    height: 136,
    generated: true,
    page: "home",
  },
  {
    id: "badge-google",
    path: "/images/badge-google-cloud-partner.png",
    alt: "Google Cloud Partner",
    width: 640,
    height: 235,
    generated: true,
    page: "home",
  },
];

export function getImage(id: string): SiteImage | undefined {
  return siteImages.find((img) => img.id === id);
}

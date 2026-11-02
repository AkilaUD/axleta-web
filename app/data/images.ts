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
    path: "/images/hero-operations.jpg",
    alt: "Modern operations workspace supporting connected business systems",
    width: 1920,
    height: 1080,
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
];

export function getImage(id: string): SiteImage | undefined {
  return siteImages.find((img) => img.id === id);
}

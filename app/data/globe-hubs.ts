/**
 * Capability hubs plotted on the hero globe.
 * Coordinates are real places used as visual anchors — not claimed offices
 * (except Brampton HQ).
 */
export type GlobeHub = {
  id: string;
  label: string;
  sub: string;
  href: string;
  lat: number;
  lng: number;
  accent: "oxide" | "signal";
};

export const globeHubs: GlobeHub[] = [
  {
    id: "hq",
    label: "Axleta Canada",
    sub: "Brampton · HQ",
    href: "/about",
    lat: 43.68,
    lng: -79.76,
    accent: "signal",
  },
  {
    id: "erp",
    label: "SAP ERP",
    sub: "Business One · S/4HANA",
    href: "/solutions/erp",
    lat: 49.45,
    lng: 8.5,
    accent: "oxide",
  },
  {
    id: "cloud",
    label: "Google Cloud",
    sub: "Platform · Workspace",
    href: "/solutions/cloud-infrastructure",
    lat: 37.4,
    lng: -122.1,
    accent: "oxide",
  },
  {
    id: "ops",
    label: "Connected ops",
    sub: "Integrations · Add-ons",
    href: "/solutions/add-ons-integrations",
    lat: 1.35,
    lng: 103.82,
    accent: "oxide",
  },
];

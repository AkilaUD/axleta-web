import type { Config } from "@react-router/dev/config";
import { getInsightSlugs } from "./app/lib/insights.server";

export default {
  ssr: true,
  async prerender() {
    const staticRoutes = [
      "/",
      "/about",
      "/solutions",
      "/solutions/erp",
      "/solutions/sap-business-one",
      "/solutions/sap-s4hana-public-cloud",
      "/solutions/add-ons-integrations",
      "/solutions/cloud-infrastructure",
      "/solutions/business-productivity",
      "/solutions/automation-ai",
      "/services",
      "/insights",
      "/contact",
      "/privacy",
      "/terms",
    ];
    const insightRoutes = getInsightSlugs().map((slug) => `/insights/${slug}`);
    return [...staticRoutes, ...insightRoutes];
  },
} satisfies Config;

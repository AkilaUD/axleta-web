import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getAllInsights } from "../app/lib/insights.server";

const origin = "https://www.axleta.com";
const staticPaths = [
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

const insightPaths = getAllInsights().map((p) => `/insights/${p.slug}`);
const urls = [...staticPaths, ...insightPaths];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (loc) => `  <url><loc>${origin}${loc}</loc></url>`,
  )
  .join("\n")}
</urlset>
`;

const root = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(root, "..", "public", "sitemap.xml");
fs.writeFileSync(out, xml);
console.log(`Wrote ${urls.length} URLs to public/sitemap.xml`);

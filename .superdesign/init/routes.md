# Routes

All routes are wrapped by `routes/site-layout.tsx` → `SiteLayout` (see `app/routes.ts`).

## Router config

```ts
import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/site-layout.tsx", [
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
    route("solutions", "routes/solutions._index.tsx"),
    route("solutions/erp", "routes/solutions.erp.tsx"),
    route("solutions/sap-business-one", "routes/solutions.sap-business-one.tsx"),
    route(
      "solutions/sap-s4hana-public-cloud",
      "routes/solutions.sap-s4hana-public-cloud.tsx",
    ),
    route(
      "solutions/add-ons-integrations",
      "routes/solutions.add-ons-integrations.tsx",
    ),
    route(
      "solutions/cloud-infrastructure",
      "routes/solutions.cloud-infrastructure.tsx",
    ),
    route(
      "solutions/business-productivity",
      "routes/solutions.business-productivity.tsx",
    ),
    route("solutions/automation-ai", "routes/solutions.automation-ai.tsx"),
    route("services", "routes/services.tsx"),
    route("insights", "routes/insights._index.tsx"),
    route("insights/:slug", "routes/insights.$slug.tsx"),
    route("contact", "routes/contact.tsx"),
    route("privacy", "routes/privacy.tsx"),
    route("terms", "routes/terms.tsx"),
    route("*", "routes/$.tsx"),
  ]),
] satisfies RouteConfig;
```

## Route map

| URL | Route module | Layout | Summary |
|-----|--------------|--------|---------|
| `/` | `app/routes/home.tsx` | `SiteLayout` | Home: Spine + stacked sections (Hero→CtaBlock), insights teaser. |
| `/about` | `app/routes/about.tsx` | `SiteLayout` | About: PageHero, vision/mission, stats, location, CtaBlock. |
| `/solutions` | `app/routes/solutions._index.tsx` | `SiteLayout` | Solutions hub listing solutionFamilies. |
| `/solutions/erp` | `app/routes/solutions.erp.tsx` | `SiteLayout` | ERP solution detail. |
| `/solutions/sap-business-one` | `app/routes/solutions.sap-business-one.tsx` | `SiteLayout` | SAP B1 detail. |
| `/solutions/sap-s4hana-public-cloud` | `app/routes/solutions.sap-s4hana-public-cloud.tsx` | `SiteLayout` | S/4HANA public cloud detail. |
| `/solutions/add-ons-integrations` | `app/routes/solutions.add-ons-integrations.tsx` | `SiteLayout` | Add-ons & integrations detail. |
| `/solutions/cloud-infrastructure` | `app/routes/solutions.cloud-infrastructure.tsx` | `SiteLayout` | Cloud infrastructure detail. |
| `/solutions/business-productivity` | `app/routes/solutions.business-productivity.tsx` | `SiteLayout` | Business productivity detail. |
| `/solutions/automation-ai` | `app/routes/solutions.automation-ai.tsx` | `SiteLayout` | Automation & AI detail. |
| `/services` | `app/routes/services.tsx` | `SiteLayout` | Services: sticky in-page nav + sections from data. |
| `/insights` | `app/routes/insights._index.tsx` | `SiteLayout` | Insights index with category filters. |
| `/insights/:slug` | `app/routes/insights.$slug.tsx` | `SiteLayout` | Single insight article. |
| `/contact` | `app/routes/contact.tsx` | `SiteLayout` | Split contact hero + ContactForm. |
| `/privacy` | `app/routes/privacy.tsx` | `SiteLayout` | Privacy policy prose page. |
| `/terms` | `app/routes/terms.tsx` | `SiteLayout` | Terms prose page. |
| `* (404)` | `app/routes/$.tsx` | `SiteLayout` | Catch-all not found. |

## Layout route

- Path: `app/routes/site-layout.tsx`
- Exports default layout rendering `<SiteLayout />` from `app/components/layout/SiteLayout.tsx`.

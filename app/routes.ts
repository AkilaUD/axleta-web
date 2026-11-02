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
  ]),
  route("*", "routes/$.tsx"),
] satisfies RouteConfig;

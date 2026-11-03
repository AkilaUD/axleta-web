import type { Route } from "./+types/home";
import { JsonLd } from "~/components/seo/JsonLd";
import { Spine } from "~/components/layout/Spine";
import { Hero } from "~/components/sections/Hero";
import { Ledger } from "~/components/sections/Ledger";
import { SpecSheet } from "~/components/sections/SpecSheet";
import { ExplodedView } from "~/components/sections/ExplodedView";
import { Dial } from "~/components/sections/Dial";
import { Principles } from "~/components/sections/Principles";
import { Partners } from "~/components/sections/Partners";
import { InsightsIndex } from "~/components/sections/InsightsIndex";
import { CtaBlock } from "~/components/sections/CtaBlock";
import { getAllInsights } from "~/lib/insights.server";
import { pageMeta } from "~/lib/meta";
import { organizationJsonLd, websiteJsonLd } from "~/lib/seo";

export function meta(): Route.MetaDescriptors {
  return pageMeta({
    title: "Home",
    description:
      "Axleta helps SMEs choose, connect, and improve ERP, cloud infrastructure, productivity, and automation—from SAP Business One to Google Workspace.",
    pathname: "/",
  });
}

export function loader() {
  const insights = getAllInsights().slice(0, 3);
  return { insights };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { insights } = loaderData;

  return (
    <>
      <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      <Spine />
      <main id="main" className="overflow-x-clip">
        <Hero />
        <Ledger />
        <SpecSheet />
        <ExplodedView />
        <Dial />
        <Principles />
        <Partners />
        {insights.length > 0 ? <InsightsIndex insights={insights} /> : null}
        <CtaBlock />
      </main>
    </>
  );
}

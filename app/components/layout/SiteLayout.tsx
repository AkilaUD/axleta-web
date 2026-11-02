import { Outlet } from "react-router";
import { SkipLink } from "~/components/layout/SkipLink";
import { SiteFooter } from "~/components/layout/SiteFooter";
import { SiteHeader } from "~/components/layout/SiteHeader";

export function SiteLayout() {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </>
  );
}

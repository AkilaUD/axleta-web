import { Outlet } from "react-router";
import { SkipLink } from "~/components/layout/SkipLink";
import { SiteFooter } from "~/components/layout/SiteFooter";
import { SiteHeader } from "~/components/layout/SiteHeader";
import { GridOverlay } from "~/components/layout/GridOverlay";
import { Preloader } from "~/components/layout/Preloader";
import { Cursor } from "~/components/layout/Cursor";
import { PageTransition } from "~/components/layout/PageTransition";
import { LenisProvider } from "~/lib/lenis";
import { PreloaderProvider } from "~/lib/preloader";

export function SiteLayout() {
  return (
    <PreloaderProvider>
      <LenisProvider>
        <SkipLink />
        <Preloader />
        <PageTransition />
        <Cursor />
        <SiteHeader />
        <Outlet />
        <SiteFooter />
        <GridOverlay />
      </LenisProvider>
    </PreloaderProvider>
  );
}

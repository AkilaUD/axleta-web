import { Link } from "react-router";
import type { Route } from "./+types/$";
import { Container } from "~/components/ui/Container";
import { LinkButton } from "~/components/ui/Button";
import { pageMeta } from "~/lib/meta";

export function meta(): Route.MetaDescriptors {
  return pageMeta({
    title: "Page not found",
    description: "The page you requested could not be found.",
    pathname: "/404",
    noIndex: true,
  });
}

export default function NotFound() {
  return (
    <main id="main" className="py-24 md:py-32">
      <Container className="max-w-xl text-center">
        <p className="text-eyebrow">404</p>
        <h1 className="mt-2 text-h1">This page is not available</h1>
        <p className="mt-4 text-muted">
          The link may be outdated or mistyped. Try one of these next steps.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <LinkButton to="/" variant="primary">
            Home
          </LinkButton>
          <LinkButton to="/solutions" variant="ghost">
            Solutions
          </LinkButton>
          <Link to="/contact" className="text-sm font-semibold text-[var(--color-brand-hover)] underline">
            Contact
          </Link>
        </div>
      </Container>
    </main>
  );
}

import type { Route } from "./+types/privacy";
import { Container } from "~/components/ui/Container";
import { PageHero } from "~/components/ui/PageHero";
import { site } from "~/data/site";
import { pageMeta } from "~/lib/meta";

export function meta(): Route.MetaDescriptors {
  return pageMeta({
    title: "Privacy",
    description: "How Axleta handles personal data submitted through the website contact form.",
    pathname: "/privacy",
  });
}

export default function Privacy() {
  return (
    <main id="main">
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy", href: "/privacy" },
        ]}
        title="Privacy policy"
      />
      <Container narrow className="py-16 md:py-20">
        <div className="prose-axleta text-muted">
          <p>
            This policy describes how {site.name} handles personal information
            collected through this website. It replaces earlier policy text that
            referred to online courses. This draft should be reviewed by legal
            counsel before relying on it for compliance purposes.
          </p>
          <h2>What we collect</h2>
          <p>
            When you use the contact form, we collect the details you provide:
            name, email, company (optional), area of interest, and message. We
            do not use analytics or advertising cookies in this version of the
            site.
          </p>
          <h2>How we use information</h2>
          <p>
            We use your enquiry to respond and to follow up on services you
            request. Form submissions are processed through Formspree, our form
            provider, which delivers messages to {site.email}.
          </p>
          <h2>Hosting</h2>
          <p>
            The website is hosted on a cloud platform that may process server
            logs (such as IP address and browser type) for security and
            reliability.
          </p>
          <h2>Sharing</h2>
          <p>
            We do not sell personal data. Information is shared only with service
            providers that help us operate the website and respond to enquiries,
            or when required by law.
          </p>
          <h2>Your rights</h2>
          <p>
            You may request access, correction, or deletion of personal data by
            contacting{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      </Container>
    </main>
  );
}

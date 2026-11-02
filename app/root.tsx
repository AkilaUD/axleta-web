import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/brand/favicon.svg", type: "image/svg+xml" },
  { rel: "apple-touch-icon", href: "/brand/apple-touch-icon.svg" },
  { rel: "manifest", href: "/site.webmanifest" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <main id="main" className="py-24">
        <div className="mx-auto max-w-xl px-4 text-center">
          <h1 className="text-h1">Page not found</h1>
          <p className="mt-4 text-muted">
            The page you requested is not available.
          </p>
          <a href="/" className="mt-6 inline-block text-[var(--color-brand-hover)] underline">
            Return home
          </a>
        </div>
      </main>
    );
  }

  let message = "Something went wrong";
  let details = "An unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    message = `Error ${error.status}`;
    details = error.statusText || details;
  } else if (import.meta.env.DEV && error instanceof Error) {
    details = error.message;
  }

  return (
    <main id="main" className="p-8">
      <h1 className="text-h1">{message}</h1>
      <p className="mt-2 text-muted">{details}</p>
    </main>
  );
}

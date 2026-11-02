import {
  primaryNav,
  routablePaths,
  serviceAnchorIds,
} from "../app/data/navigation";

const routeSet = new Set(routablePaths);
let failed = false;

function checkHref(href: string) {
  const [pathPart, hash] = href.split("#");
  if (!routeSet.has(pathPart)) {
    console.error(`Missing route for nav href: ${href}`);
    failed = true;
  }
  if (hash && pathPart === "/services") {
    if (!serviceAnchorIds.includes(hash as (typeof serviceAnchorIds)[number])) {
      console.error(`Unknown services anchor: #${hash}`);
      failed = true;
    }
  }
}

function walk(items: typeof primaryNav) {
  for (const item of items) {
    checkHref(item.href);
    item.children?.forEach((c) => checkHref(c.href));
  }
}

walk(primaryNav);

if (failed) {
  process.exit(1);
}
console.log("All navigation hrefs resolve to known routes/anchors.");

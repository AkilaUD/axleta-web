import { useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { Link } from "react-router";
import { motion, useMotionValue, useSpring } from "motion/react";
import { LinkArrow } from "~/components/ui/LinkArrow";
import { usePrefersReducedMotion } from "~/hooks/usePrefersReducedMotion";

export type InsightListItem = {
  slug: string;
  title: string;
  publishedAt: string;
  category: string;
  excerpt: string;
};

type InsightsIndexProps = {
  insights: InsightListItem[];
};

const spring = { stiffness: 260, damping: 28 };

/** S8 — Insights as huge table rows + floating preview on desktop. */
export function InsightsIndex({ insights }: InsightsIndexProps) {
  const root = useRef<HTMLElement>(null);
  const [hover, setHover] = useState<InsightListItem | null>(null);
  const reduced = usePrefersReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  function onMove(e: ReactMouseEvent) {
    if (reduced) return;
    x.set(e.clientX + 18);
    y.set(e.clientY + 18);
  }

  return (
    <section
      ref={root}
      id="insights-index"
      className="relative bg-paper py-[14vh] text-ink"
      data-spine="07 — INDEX"
      onMouseMove={onMove}
    >
      <div className="mx-auto max-w-[90rem] px-[clamp(1.25rem,4vw,2.5rem)]">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-label text-oxide">Fig. 06 — Index</p>
            <h2 className="mt-3 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-semibold tracking-[-0.04em]">
              Insights
            </h2>
          </div>
          <LinkArrow to="/insights">All articles</LinkArrow>
        </div>

        <ul className="border-t border-[color-mix(in_srgb,var(--color-steel)_30%,transparent)]">
          {insights.map((post) => {
            const dim = hover && hover.slug !== post.slug;
            return (
              <li key={post.slug}>
                <Link
                  to={`/insights/${post.slug}`}
                  className={`group grid grid-cols-1 items-baseline gap-2 border-b border-[color-mix(in_srgb,var(--color-steel)_30%,transparent)] py-7 transition-opacity md:grid-cols-[7rem_10rem_1fr_auto] md:gap-6 ${
                    dim ? "opacity-30" : "opacity-100"
                  }`}
                  data-cursor="VIEW"
                  onMouseEnter={() => setHover(post)}
                  onMouseLeave={() => setHover(null)}
                >
                  <span className="text-label text-steel">
                    {post.publishedAt}
                  </span>
                  <span className="text-label text-oxide">{post.category}</span>
                  <span className="font-display text-[clamp(1.35rem,2.8vw,2.35rem)] font-semibold tracking-[-0.03em] group-hover:text-oxide">
                    {post.title}
                  </span>
                  <span className="text-label hidden text-steel md:inline">↗</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {!reduced && hover ? (
        <motion.aside
          className="pointer-events-none fixed z-40 hidden max-w-xs border border-ink bg-paper p-5 shadow-none md:block"
          style={{ left: 0, top: 0, x: sx, y: sy }}
        >
          <p className="font-serif text-lg italic text-ink/75">{hover.excerpt}</p>
        </motion.aside>
      ) : null}
    </section>
  );
}

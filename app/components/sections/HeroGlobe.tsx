import {
  lazy,
  memo,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentType,
} from "react";
import { Link } from "react-router";
import { globeHubs, type GlobeHub } from "~/data/globe-hubs";
import { usePrefersReducedMotion } from "~/hooks/usePrefersReducedMotion";
import type { HubScreenLabel } from "~/components/sections/HeroGlobeScene";

type HeroGlobeProps = {
  className?: string;
  hubs?: GlobeHub[];
};

type FiberCanvasProps = {
  hubs: GlobeHub[];
  reducedMotion: boolean;
  activeHubId: string;
  playing: boolean;
  detail: "low" | "high";
  onLabels: (labels: HubScreenLabel[]) => void;
  onReady: () => void;
};

const DESKTOP_DPR: [number, number] = [1, 1.75];
const MOBILE_DPR: [number, number] = [1, 1.35];

function globeQuality(): { dpr: [number, number]; detail: "low" | "high" } {
  if (typeof window === "undefined") {
    return { dpr: DESKTOP_DPR, detail: "high" };
  }
  const narrow = window.innerWidth < 768;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  if (narrow || coarse) return { dpr: MOBILE_DPR, detail: "low" };
  return { dpr: DESKTOP_DPR, detail: "high" };
}

const FiberCanvas = lazy(async () => {
  const [{ Canvas }, { HeroGlobeScene }] = await Promise.all([
    import("@react-three/fiber"),
    import("~/components/sections/HeroGlobeScene"),
  ]);

  function GlobeCanvas({
    hubs,
    reducedMotion,
    activeHubId,
    playing,
    detail,
    onLabels,
    onReady,
  }: FiberCanvasProps) {
    const quality = globeQuality();
    return (
      <Canvas
        className="hero-globe-canvas absolute inset-0 h-full w-full touch-none"
        camera={{ fov: 42, near: 0.05, far: 40, position: [0, 0, 6.4] }}
        dpr={quality.dpr}
        frameloop={playing ? "always" : "never"}
        gl={{
          antialias: true,
          alpha: true,
          premultipliedAlpha: true,
          powerPreference: "high-performance",
          stencil: false,
          toneMappingExposure: 1.0,
        }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(0x000000, 0);
          gl.setClearAlpha(0);
          scene.background = null;
        }}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "transparent",
        }}
      >
        <Suspense fallback={null}>
          <HeroGlobeScene
            hubs={hubs}
            reducedMotion={reducedMotion}
            activeHubId={activeHubId}
            detail={detail}
            onLabels={onLabels}
            onReady={onReady}
          />
        </Suspense>
      </Canvas>
    );
  }

  return { default: GlobeCanvas as ComponentType<FiberCanvasProps> };
});

const GlobeStage = memo(function GlobeStage(props: FiberCanvasProps) {
  return (
    <Suspense fallback={null}>
      <FiberCanvas {...props} />
    </Suspense>
  );
});

/**
 * Framer Globe Pins–style hero world (Fiber + bloom).
 */
export function HeroGlobe({ className = "", hubs = globeHubs }: HeroGlobeProps) {
  const reduced = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [detail, setDetail] = useState<"low" | "high">("high");
  const [activeHub, setActiveHub] = useState<string>(hubs[0]?.id ?? "hq");
  const [labels, setLabels] = useState<HubScreenLabel[]>([]);
  const stageRef = useRef<HTMLDivElement>(null);
  const onReady = useCallback(() => setReady(true), []);
  const active = hubs.find((h) => h.id === activeHub) ?? hubs[0];

  useEffect(() => {
    setDetail(globeQuality().detail);
    setMounted(true);
  }, []);

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setPlaying(entry?.isIntersecting ?? false),
      { rootMargin: "160px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [mounted]);

  return (
    <div
      ref={stageRef}
      className={`hero-globe relative isolate min-h-[16rem] overflow-visible ${className}`}
      aria-label="Interactive globe with Axleta network pins"
    >
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      >
        {mounted ? (
          <GlobeStage
            hubs={hubs}
            reducedMotion={reduced}
            activeHubId={activeHub}
            playing={playing}
            detail={detail}
            onLabels={setLabels}
            onReady={onReady}
          />
        ) : null}
      </div>

      {!ready ? (
        <div
          className="absolute inset-0 z-[1] flex items-center justify-center"
          aria-hidden
        >
          <div className="size-[min(68%,20rem)] rounded-full bg-[radial-gradient(circle_at_35%_30%,color-mix(in_srgb,var(--color-oxide)_28%,transparent),transparent_60%)]" />
        </div>
      ) : null}

      {/* Framer-style floating pin labels */}
      {labels.map((lab) => {
        const hub = hubs.find((h) => h.id === lab.id);
        if (!hub || !lab.visible) return null;
        const on = activeHub === hub.id;
        return (
          <button
            key={hub.id}
            type="button"
            className={`absolute z-[2] -translate-x-1/2 -translate-y-[120%] rounded-full border px-3 py-1.5 text-left backdrop-blur-md transition ${
              on
                ? "border-white/40 bg-white/10 text-paper"
                : "border-white/15 bg-ink/60 text-paper/80 hover:border-white/35"
            }`}
            style={{ left: lab.x, top: lab.y }}
            onClick={() => setActiveHub(hub.id)}
          >
            <span className="block font-mono text-[0.62rem] tracking-[0.08em] whitespace-nowrap">
              {hub.label}
            </span>
          </button>
        );
      })}

      {active ? (
        <div className="absolute bottom-3 left-1/2 z-[3] w-[min(100%-1.5rem,15rem)] -translate-x-1/2 rounded-2xl border border-white/20 bg-ink/75 px-4 py-3 text-center backdrop-blur-md sm:bottom-4">
          <p className="font-display text-base font-semibold tracking-[-0.02em] text-paper">
            {active.label}
          </p>
          <p className="mt-0.5 font-mono text-[0.65rem] tracking-[0.06em] text-paper/55">
            {active.sub}
          </p>
          <Link
            to={active.href}
            className="text-label mt-2 inline-flex text-[#7dd3fc] link-draw"
            data-cursor="OPEN"
          >
            Explore →
          </Link>
        </div>
      ) : null}

      <p className="pointer-events-none absolute top-3 left-1/2 z-[3] -translate-x-1/2 font-mono text-[0.58rem] tracking-[0.16em] text-white/45 uppercase">
        Drag to orbit
      </p>
    </div>
  );
}

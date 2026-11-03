import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import {
  AdditiveBlending,
  BackSide,
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  Line,
  LineBasicMaterial,
  NoColorSpace,
  QuadraticBezierCurve3,
  ShaderMaterial,
  TextureLoader,
  Vector3,
} from "three";
import { globeHubs, type GlobeHub } from "~/data/globe-hubs";
import { GLOBE_RADIUS, latLngToVec } from "~/lib/globe-math";

export type HubScreenLabel = {
  id: string;
  x: number;
  y: number;
  visible: boolean;
};

type HeroGlobeSceneProps = {
  hubs?: GlobeHub[];
  reducedMotion?: boolean;
  activeHubId?: string;
  detail?: "low" | "high";
  onLabels?: (labels: HubScreenLabel[]) => void;
  onReady?: () => void;
};

/** Day/night Earth — Framer Globe Pins style. */
function EarthSphere({
  onReady,
  detail,
}: {
  onReady?: () => void;
  detail: "low" | "high";
}) {
  const dayMap = useLoader(TextureLoader, "/images/globe/earth-day.webp");
  const nightMap = useLoader(TextureLoader, "/images/globe/earth-night.webp");
  const matRef = useRef<ShaderMaterial>(null);
  const gl = useThree((state) => state.gl);

  useEffect(() => {
    // Sample as display-referred in the custom shader (toneMapped: false).
    // Marking these sRGB made the globe read almost black under R3F output.
    const aniso = Math.min(8, gl.capabilities.getMaxAnisotropy());
    dayMap.colorSpace = NoColorSpace;
    nightMap.colorSpace = NoColorSpace;
    dayMap.anisotropy = aniso;
    nightMap.anisotropy = aniso;
    dayMap.needsUpdate = true;
    nightMap.needsUpdate = true;
    onReady?.();
  }, [dayMap, nightMap, gl, onReady]);

  const uniforms = useMemo(
    () => ({
      uDay: { value: dayMap },
      uNight: { value: nightMap },
      uTint: { value: new Color("#0070f2") },
    }),
    [dayMap, nightMap],
  );

  return (
    <mesh>
      <sphereGeometry
        args={[
          GLOBE_RADIUS,
          detail === "low" ? 72 : 96,
          detail === "low" ? 56 : 80,
        ]}
      />
      <shaderMaterial
        ref={matRef}
        toneMapped={false}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          varying vec3 vNormal;
          void main() {
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform sampler2D uDay;
          uniform sampler2D uNight;
          uniform vec3 uTint;
          varying vec2 vUv;
          varying vec3 vNormal;
          void main() {
            vec3 day = texture2D(uDay, vUv).rgb;
            vec3 night = texture2D(uNight, vUv).rgb;
            // Camera-facing hemisphere stays mostly daylight
            float facing = clamp(vNormal.z * 0.5 + 0.5, 0.0, 1.0);
            float mixF = smoothstep(0.15, 0.8, facing);
            vec3 nightLit = night * 1.7 + day * 0.32;
            vec3 dayLit = day * 1.22;
            vec3 color = mix(nightLit, dayLit, mixF);
            // Soft ocean lift — readable on ink, not neon
            float luma = dot(color, vec3(0.299, 0.587, 0.114));
            color += vec3(0.02, 0.05, 0.11) * (1.0 - smoothstep(0.03, 0.38, luma));
            color += uTint * 0.025;
            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  );
}

function Atmosphere({ detail }: { detail: "low" | "high" }) {
  const segments = detail === "low" ? 48 : 64;
  return (
    <mesh scale={1.045}>
      <sphereGeometry args={[GLOBE_RADIUS, segments, segments]} />
      <shaderMaterial
        side={BackSide}
        transparent
        depthWrite={false}
        toneMapped={false}
        blending={AdditiveBlending}
        vertexShader={`
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.6);
            gl_FragColor = vec4(0.08, 0.42, 0.92, 1.0) * intensity * 1.2;
          }
        `}
      />
    </mesh>
  );
}

function GlowPin({
  hub,
  active,
}: {
  hub: GlobeHub;
  active: boolean;
}) {
  const p = latLngToVec(hub.lat, hub.lng, GLOBE_RADIUS * 1.012);
  const color = hub.accent === "signal" ? "#c8f542" : "#7dd3fc";
  const core = active ? 0.05 : 0.036;

  return (
    <group position={[p.x, p.y, p.z]}>
      <mesh>
        <sphereGeometry args={[core, 16, 16]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      {/* Additive bloom substitute — keeps canvas transparent */}
      <mesh scale={2.8}>
        <sphereGeometry args={[core, 12, 12]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.28}
          depthWrite={false}
          toneMapped={false}
          blending={AdditiveBlending}
        />
      </mesh>
      <mesh scale={4.6}>
        <sphereGeometry args={[core, 10, 10]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.12}
          depthWrite={false}
          toneMapped={false}
          blending={AdditiveBlending}
        />
      </mesh>
      <mesh lookAt={[0, 0, 0]}>
        <ringGeometry args={[core * 2.1, core * 2.7, 40]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.9}
          toneMapped={false}
          side={BackSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function HubArcs({ hubs }: { hubs: GlobeHub[] }) {
  const hq = hubs.find((h) => h.id === "hq") ?? hubs[0];
  const hqPos = latLngToVec(hq.lat, hq.lng, GLOBE_RADIUS * 1.01);

  const arcs = useMemo(() => {
    return hubs
      .filter((h) => h.id !== hq.id)
      .map((hub) => {
        const p = latLngToVec(hub.lat, hub.lng, GLOBE_RADIUS * 1.01);
        const curve = new QuadraticBezierCurve3(
          new Vector3(hqPos.x, hqPos.y, hqPos.z),
          new Vector3(
            (hqPos.x + p.x) * 0.65,
            (hqPos.y + p.y) * 0.65 + 0.7,
            (hqPos.z + p.z) * 0.65,
          ),
          new Vector3(p.x, p.y, p.z),
        );
        const pts = curve.getPoints(48);
        const arr = new Float32Array(pts.length * 3);
        pts.forEach((v, i) => {
          arr[i * 3] = v.x;
          arr[i * 3 + 1] = v.y;
          arr[i * 3 + 2] = v.z;
        });
        const geo = new BufferGeometry();
        geo.setAttribute("position", new BufferAttribute(arr, 3));
        return new Line(
          geo,
          new LineBasicMaterial({
            color: 0x7dd3fc,
            transparent: true,
            opacity: 0.45,
            toneMapped: false,
          }),
        );
      });
  }, [hubs, hq.id, hqPos.x, hqPos.y, hqPos.z]);

  useEffect(() => {
    return () => {
      arcs.forEach((line) => {
        line.geometry.dispose();
        (line.material as LineBasicMaterial).dispose();
      });
    };
  }, [arcs]);

  return (
    <group>
      {arcs.map((line, i) => (
        <primitive key={i} object={line} />
      ))}
    </group>
  );
}

/**
 * Framer Globe Pins–style world: textured Earth, day/night, bloom pins.
 */
export function HeroGlobeScene({
  hubs = globeHubs,
  reducedMotion = false,
  onLabels,
  onReady,
  activeHubId,
  detail = "high",
}: HeroGlobeSceneProps) {
  const root = useRef<Group>(null);
  const { camera, size, gl } = useThree();
  const world = useRef(new Vector3());
  const camPos = useRef(new Vector3());
  const toCam = useRef(new Vector3());
  const ndc = useRef(new Vector3());
  const lastLabels = useRef<HubScreenLabel[]>([]);
  const hubLocals = useMemo(
    () =>
      hubs.map((hub) => {
        const p = latLngToVec(hub.lat, hub.lng, GLOBE_RADIUS * 1.06);
        return { id: hub.id, x: p.x, y: p.y, z: p.z };
      }),
    [hubs],
  );
  const drag = useRef({
    on: false,
    lastX: 0,
    lastY: 0,
    // Americas / HQ facing camera
    yaw: 0.95,
    pitch: -0.18,
    yawTarget: 0.95,
    pitchTarget: -0.18,
    yawVel: 0,
  });
  const labelAcc = useRef(0);
  const [earthReady, setEarthReady] = useState(false);

  useEffect(() => {
    // Frame full sphere + atmosphere with margin inside the stage
    camera.position.set(0, 0, 6.4);
    camera.lookAt(0, 0, 0);
    gl.setClearColor(0x000000, 0);
    gl.setClearAlpha(0);
  }, [camera, gl]);

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.style.cursor = "grab";
    canvas.style.touchAction = "none";

    const onDown = (e: PointerEvent) => {
      drag.current.on = true;
      drag.current.lastX = e.clientX;
      drag.current.lastY = e.clientY;
      drag.current.yawVel = 0;
      canvas.style.cursor = "grabbing";
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    };
    const onMove = (e: PointerEvent) => {
      if (!drag.current.on) return;
      const dx = e.clientX - drag.current.lastX;
      const dy = e.clientY - drag.current.lastY;
      drag.current.lastX = e.clientX;
      drag.current.lastY = e.clientY;
      drag.current.yawTarget += dx * 0.0045;
      drag.current.pitchTarget += dy * 0.0035;
      drag.current.yawVel = dx * 0.0012;
    };
    const onUp = () => {
      drag.current.on = false;
      canvas.style.cursor = "grab";
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("pointerleave", onUp);
    return () => {
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("pointerleave", onUp);
    };
  }, [gl]);

  useEffect(() => {
    if (earthReady) onReady?.();
  }, [earthReady, onReady]);

  useFrame((_, dt) => {
    const d = drag.current;
    const step = Math.min(0.05, dt);
    const follow = 1 - Math.exp(-step * 5.2);
    if (!d.on && !reducedMotion) d.yawTarget += step * 0.08;
    d.yawVel *= Math.exp(-step * 4.53);
    if (!d.on) d.yawTarget += d.yawVel;
    d.yaw += (d.yawTarget - d.yaw) * follow;
    d.pitch += (d.pitchTarget - d.pitch) * follow;
    d.pitch = Math.max(-0.7, Math.min(0.7, d.pitch));
    if (root.current) root.current.rotation.set(d.pitch, d.yaw, 0, "XYZ");

    labelAcc.current += step;
    if (labelAcc.current < 0.05 || !onLabels || !root.current) return;
    labelAcc.current = 0;

    root.current.updateMatrixWorld(true);
    camPos.current.copy(camera.position);
    const matrix = root.current.matrixWorld;
    const prev = lastLabels.current;
    const next: HubScreenLabel[] = [];
    let changed = prev.length !== hubLocals.length;

    for (let i = 0; i < hubLocals.length; i++) {
      const hub = hubLocals[i];
      world.current.set(hub.x, hub.y, hub.z).applyMatrix4(matrix);
      const wlen = Math.hypot(world.current.x, world.current.y, world.current.z) || 1;
      toCam.current.copy(camPos.current).sub(world.current);
      const tlen = Math.hypot(toCam.current.x, toCam.current.y, toCam.current.z) || 1;
      const facing =
        (world.current.x / wlen) * (toCam.current.x / tlen) +
          (world.current.y / wlen) * (toCam.current.y / tlen) +
          (world.current.z / wlen) * (toCam.current.z / tlen) >
        0.02;
      ndc.current.copy(world.current).project(camera);
      const x = (ndc.current.x * 0.5 + 0.5) * size.width;
      const y = (-ndc.current.y * 0.5 + 0.5) * size.height;
      const visible =
        facing &&
        ndc.current.z < 1 &&
        ndc.current.x > -1.15 &&
        ndc.current.x < 1.15 &&
        ndc.current.y > -1.15 &&
        ndc.current.y < 1.15;
      const old = prev[i];
      if (
        !old ||
        old.id !== hub.id ||
        old.visible !== visible ||
        Math.abs(old.x - x) > 0.5 ||
        Math.abs(old.y - y) > 0.5
      ) {
        changed = true;
      }
      next.push({ id: hub.id, x, y, visible });
    }

    if (changed) {
      lastLabels.current = next;
      onLabels(next);
    }
  });

  return (
    <>
      <ambientLight intensity={0.15} />
      <group ref={root}>
        <EarthSphere detail={detail} onReady={() => setEarthReady(true)} />
        <Atmosphere detail={detail} />
        <HubArcs hubs={hubs} />
        {hubs.map((hub) => (
          <GlowPin
            key={hub.id}
            hub={hub}
            active={activeHubId ? activeHubId === hub.id : hub.id === "hq"}
          />
        ))}
      </group>
    </>
  );
}

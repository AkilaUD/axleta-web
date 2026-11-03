export const GLOBE_RADIUS = 1.6;
const DEG = Math.PI / 180;

export function latLngToVec(lat: number, lng: number, r = GLOBE_RADIUS) {
  const a = (90 - lat) * DEG;
  const o = (lng + 180) * DEG;
  return {
    x: -r * Math.sin(a) * Math.cos(o),
    y: r * Math.cos(a),
    z: r * Math.sin(a) * Math.sin(o),
  } as const;
}

export function thinLandCoords(coords: number[], maxDots: number): number[] {
  if (coords.length / 2 <= maxDots) return coords;
  const step = Math.ceil(coords.length / 2 / maxDots);
  const thinned: number[] = [];
  for (let i = 0; i < coords.length / 2; i += step) {
    thinned.push(coords[i * 2], coords[i * 2 + 1]);
  }
  return thinned;
}

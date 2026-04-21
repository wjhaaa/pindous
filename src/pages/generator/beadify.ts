import type { MardColor } from "./mardPalette";

export interface BeadifyResult {
  width: number; // beads
  height: number; // beads
  // grid[y][x] -> palette index
  grid: number[][];
  // counts[index] -> bead count
  counts: number[];
}

export function nearestPaletteIndex(
  rgb: [number, number, number],
  palette: MardColor[]
): number {
  const [r, g, b] = rgb;
  let bestIdx = 0;
  let bestDist = Number.POSITIVE_INFINITY;
  for (let i = 0; i < palette.length; i++) {
    const pr = palette[i].rgb[0];
    const pg = palette[i].rgb[1];
    const pb = palette[i].rgb[2];
    const dr = r - pr;
    const dg = g - pg;
    const db = b - pb;
    const dist = dr * dr + dg * dg + db * db;
    if (dist < bestDist) {
      bestDist = dist;
      bestIdx = i;
    }
  }
  return bestIdx;
}

export function beadifyPixels(
  rgba: Uint8ClampedArray,
  width: number,
  height: number,
  palette: MardColor[],
  options?: { transparentAs?: "closest" | "white" }
): BeadifyResult {
  const counts = new Array(palette.length).fill(0);
  const grid: number[][] = new Array(height);
  const transparentAs = options?.transparentAs ?? "white";

  // Pre-compute pure white index if needed.
  const whiteIdx =
    transparentAs === "white"
      ? nearestPaletteIndex([255, 255, 255], palette)
      : 0;

  for (let y = 0; y < height; y++) {
    const row = new Array<number>(width);
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const a = rgba[idx + 3] / 255;
      let prgb: [number, number, number] = [
        rgba[idx],
        rgba[idx + 1],
        rgba[idx + 2],
      ];

      // Basic alpha handling: if transparent, treat as white by default.
      if (a < 0.05) {
        if (transparentAs === "white") {
          row[x] = whiteIdx;
          counts[whiteIdx]++;
          continue;
        }
        prgb = [255, 255, 255];
      } else if (a < 1) {
        // Premultiply on white background for semi-transparent pixels.
        prgb = [
          Math.round(prgb[0] * a + 255 * (1 - a)),
          Math.round(prgb[1] * a + 255 * (1 - a)),
          Math.round(prgb[2] * a + 255 * (1 - a)),
        ];
      }

      const pIdx = nearestPaletteIndex(prgb, palette);
      row[x] = pIdx;
      counts[pIdx]++;
    }
    grid[y] = row;
  }

  return { width, height, grid, counts };
}


// A small forget-me-not sprig, tucked into the corner of the postcard.
import { createSketch, COLORS, deg } from "./brush.mjs";

export const width = 260;
export const height = 160;

export function draw() {
  const sk = createSketch({ seed: 905, width, height });
  sk.leaf([52, 146], deg(-172), 46, 15, { bend: -0.12, pencil: false });
  sk.cyme([58, 150], deg(-44), 214, 1, {
    arc: 0.004,
    coil: 0.12,
    pow: 4,
    flowers: [
      { s: 0.14, ped: 17, R: 19, tilt: 0.92, side: -1 },
      { s: 0.28, ped: 16, R: 17.5, tilt: 0.7, side: 1 },
      { s: 0.42, ped: 14, R: 16, tilt: 0.88, side: -1 },
      { s: 0.54, ped: 12, R: 13, tilt: 0.55, side: 1 },
    ],
    buds: [
      { s: 0.65, size: 11.5, color: COLORS.lilac, side: -1 },
      { s: 0.73, size: 10.5, color: COLORS.pink[0], side: 1 },
      { s: 0.81, size: 9, color: COLORS.pink[1] },
      { s: 0.88, size: 7.5, color: COLORS.pink[2] },
      { s: 0.94, size: 6, color: COLORS.pink[0] },
    ],
  });
  return sk.toSVG();
}

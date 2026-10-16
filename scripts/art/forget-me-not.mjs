// The botanical plate on the About spread: a forget-me-not sprig, a detail of
// one flower three times larger, and the three colours as swatches.
import {
  createSketch,
  COLORS,
  add,
  sub,
  mul,
  norm,
  perp,
  lerp,
  polar,
  deg,
  spline,
  resample,
} from "./brush.mjs";

export const width = 560;
export const height = 780;

export function draw() {
  const sk = createSketch({ seed: 1610, width, height });
  const {
    begin,
    rnd,
    inkStroke,
    pencilLine,
    greenStem,
    hairs,
    leaf,
    cyme,
    flower,
    wash,
  } = sk;

  // main stem: from a clean cut near the bottom, a slow S up to the fork
  const stemCtrl = [
    [176, 734],
    [167, 664],
    [170, 596],
    [182, 526],
    [190, 458],
    [187, 404],
    [196, 352],
  ];
  const stem = resample(spline(stemCtrl), 1);

  leaf([168, 670], deg(-152), 114, 31, { bend: -0.1 });
  leaf([171, 594], deg(-33), 104, 27, {
    bend: 0.13,
    color: COLORS.green[2],
    twist: 0.35,
  });
  leaf([186, 506], deg(-18), 80, 21, { bend: 0.08, color: COLORS.green[1] });
  leaf([189, 430], deg(-162), 60, 16, { bend: -0.14 });

  // a side shoot from the third leaf's axil
  cyme([184, 514], deg(-146), 150, -1, {
    coil: 0.11,
    flowers: [
      { s: 0.4, ped: 14, R: 16, tilt: 0.8, side: 1 },
      { s: 0.55, ped: 12, R: 14, tilt: 0.55, side: -1 },
    ],
    buds: [
      { s: 0.69, size: 11.5, color: COLORS.lilac, side: 1 },
      { s: 0.78, size: 10, color: COLORS.pink[0], side: -1 },
      { s: 0.86, size: 8.5, color: COLORS.pink[1] },
      { s: 0.93, size: 7, color: COLORS.pink[2] },
      { s: 0.98, size: 5.5, color: COLORS.pink[0] },
    ],
  });

  // stem as two thin lines with green between, cut at the base
  begin("stem");
  pencilLine(
    stemCtrl.map((p, i) => add(p, [5 - i * 0.3, -8])),
    { opacity: 0.32, passes: 2 },
  );
  greenStem(stem, 5.6);
  const sl = stem.map((p, i) => {
    const a = stem[Math.max(0, i - 1)];
    const b = stem[Math.min(stem.length - 1, i + 1)];
    return { p, n: perp(norm(sub(b, a))) };
  });
  const taper = (i) => 2.6 - (i / sl.length) * 1.0;
  inkStroke(
    sl
      .filter((_, i) => i % 3 === 0)
      .map(({ p, n }, i) => add(p, mul(n, taper(i * 3)))),
    { w: 1.15, tin: 2, tout: 10 },
  );
  inkStroke(
    sl
      .filter((_, i) => i % 3 === 0 && i > 14 && i < sl.length - 30)
      .map(({ p, n }, i) => sub(p, mul(n, taper(i * 3 + 14)))),
    { w: 1.05, tin: 6, tout: 12 },
  );
  inkStroke([add(stem[0], [-3.8, 2.2]), add(stem[0], [3.4, -2.4])], {
    w: 1,
    tin: 1,
    tout: 1,
  });
  hairs(stem, { every: 11, lenR: [2.2, 3.6], offset: 2.6 });

  // two cymes from the fork: long, gently arched, coiled only at the tip
  const top = stem[stem.length - 1];
  const right = cyme(top, deg(-74), 236, 1, {
    arc: 0.0022,
    coil: 0.125,
    pow: 4.2,
    flowers: [
      { s: 0.08, ped: 21, R: 23, tilt: 0.95, side: 1 },
      { s: 0.2, ped: 19, R: 21, tilt: 0.72, side: -1 },
      { s: 0.32, ped: 18, R: 20, tilt: 0.9, side: 1 },
      { s: 0.43, ped: 16, R: 17.5, tilt: 0.45, side: -1 },
      { s: 0.53, ped: 14, R: 15, tilt: 0.85, side: 1 },
    ],
    buds: [
      { s: 0.63, size: 13, color: COLORS.lilac, side: -1 },
      { s: 0.7, size: 12, color: COLORS.pink[1], side: 1 },
      { s: 0.77, size: 10.5, color: COLORS.pink[0] },
      { s: 0.83, size: 9, color: COLORS.pink[2] },
      { s: 0.88, size: 7.8, color: COLORS.pink[1] },
      { s: 0.93, size: 6.5, color: COLORS.pink[0] },
      { s: 0.97, size: 5.2, color: COLORS.pink[2] },
    ],
  });
  cyme(top, deg(-106), 268, -1, {
    arc: 0.0018,
    coil: 0.115,
    pow: 4.2,
    flowers: [
      { s: 0.07, ped: 21, R: 24, tilt: 0.93, side: -1 },
      { s: 0.17, ped: 20, R: 22, tilt: 0.66, side: 1 },
      { s: 0.27, ped: 19, R: 21, tilt: 0.88, side: -1 },
      { s: 0.37, ped: 17, R: 19, tilt: 0.42, side: 1 },
      { s: 0.47, ped: 16, R: 17.5, tilt: 0.82, side: -1 },
      { s: 0.56, ped: 14, R: 15, tilt: 0.7, side: 1 },
    ],
    buds: [
      { s: 0.65, size: 13.5, color: COLORS.lilac, side: -1 },
      { s: 0.72, size: 12.5, color: COLORS.pink[0], side: 1 },
      { s: 0.78, size: 11, color: COLORS.pink[1] },
      { s: 0.84, size: 9.5, color: COLORS.pink[2] },
      { s: 0.89, size: 8, color: COLORS.pink[0] },
      { s: 0.93, size: 6.6, color: COLORS.pink[1] },
      { s: 0.97, size: 5.2, color: COLORS.pink[2] },
    ],
  });

  // fig. 2: one flower, three times larger, in a pencil circle
  begin("fig2-circle");
  const figC = [436, 184];
  const figR = 86;
  for (let k = 0; k < 2; k++) {
    const r = figR + k * 2.4 + rnd(-1, 1);
    const a0 = rnd(0, 6.28);
    const ring = Array.from({ length: 28 }, (_, i) =>
      polar(
        figC,
        r * rnd(0.993, 1.007),
        a0 + (i / 27) * Math.PI * 2 * (k ? 0.78 : 1.05),
      ),
    );
    pencilLine(ring, { opacity: k ? 0.3 : 0.5, w: 0.85, jitter: 0.25 });
  }
  const figRot = deg(-14);
  for (let k = 0; k < 5; k++) {
    const a = figRot + (k * 2 * Math.PI) / 5;
    pencilLine([polar(figC, 12, a), polar(figC, figR * 0.84, a)], {
      opacity: 0.2,
      w: 0.7,
      jitter: 0.2,
    });
  }
  flower(figC, 54, {
    rotation: figRot,
    detail: true,
    color: COLORS.blue[1],
    inkW: 1.3,
  });
  begin("leader");
  const src = right.flowers[0];
  const dirTo = norm(sub(src.center, figC));
  const leadA = add(figC, mul(dirTo, figR + 4));
  const leadB = add(src.center, mul(dirTo, -(src.R + 8)));
  pencilLine([leadA, lerp(leadA, leadB, 0.5), leadB], {
    opacity: 0.45,
    w: 0.8,
    jitter: 0.3,
  });
  pencilLine(
    Array.from({ length: 16 }, (_, i) =>
      polar(src.center, src.R + 6 + rnd(-0.6, 0.6), (i / 15) * Math.PI * 2.1),
    ),
    { opacity: 0.4, w: 0.8, jitter: 0.2 },
  );

  // colour swatches: a loaded brush, lighter where it ran out
  const swatch = (x, y, w, h, color, dark) => {
    const c = begin("swatch");
    const box = (reach) => [
      [x, y + 1],
      [x + w * reach * 0.5, y - 0.4],
      [x + w * reach, y + 0.6],
      [x + w * reach + 0.8, y + h * 0.5],
      [x + w * reach, y + h - 0.4],
      [x + w * reach * 0.5, y + h + 0.4],
      [x, y + h - 0.6],
      [x - 0.8, y + h * 0.5],
    ];
    for (let k = 0; k < 6; k++) {
      const reach = 1 - k * 0.12 + rnd(-0.03, 0.03);
      wash(sk.deform(box(reach), 4, 0.045), color, "wash", {
        smooth: false,
        opacity: 0.32,
      });
    }
    wash(sk.deform(box(0.32), 4, 0.05), dark, "glaze", {
      smooth: false,
      opacity: 0.3,
    });
    return c;
  };
  swatch(334, 346, 42, 28, COLORS.blue[0], COLORS.blueDark);
  swatch(400, 348, 42, 28, COLORS.pink[0], COLORS.pinkDark);
  swatch(466, 345, 42, 28, COLORS.green[0], COLORS.greenDark);

  // a few flecks from a flicked brush
  begin("flecks");
  [
    [262, 118, 1.6, COLORS.blue[0]],
    [271, 128, 0.9, COLORS.blue[0]],
    [92, 300, 1.3, COLORS.pink[0]],
    [318, 392, 1.1, COLORS.blue[2]],
    [228, 612, 1.4, COLORS.green[0]],
    [236, 604, 0.8, COLORS.green[0]],
  ].forEach(([x, y, r, col]) =>
    wash(
      Array.from({ length: 7 }, (_, k) =>
        polar([x, y], r * rnd(0.8, 1.25), (k / 7) * Math.PI * 2),
      ),
      col,
      "wash",
      { opacity: 0.8 },
    ),
  );

  sk.arrow([58, 132], [76, 188], -0.32); // "buds start pink" → the left coil
  sk.arrow([250, 178], [236, 224], 0.28); // "…and open blue" → an open flower
  return sk.toSVG();
}

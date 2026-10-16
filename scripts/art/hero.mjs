// The home title page: an iPhone drawn like a working sketch. Above the
// ragged line its screen is still a pencil wireframe, below it the same
// interface is inked and painted. A pencil is still at it; forget-me-nots
// climb past the frame.
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
  rot,
  deg,
  roundedRect,
  polyPath,
  spline,
  resample,
} from "./brush.mjs";

export const width = 620;
export const height = 640;

export function draw() {
  const sk = createSketch({ seed: 2604, width, height });
  const {
    begin,
    rnd,
    gauss,
    inkStroke,
    inkLine,
    pencilLine,
    wash,
    knockout,
    contourStrokes,
    hatch,
  } = sk;

  // phone geometry, in its own coordinates around the centre
  const C = [292, 300];
  const ANG = deg(-7);
  const T = (p) => add(C, rot(p, ANG));
  const TT = (pts) => pts.map(T);
  const PW = 222;
  const PH = 480;
  const body = roundedRect(-PW / 2, -PH / 2, PW, PH, 38, 10);
  const screen = roundedRect(
    -PW / 2 + 9,
    -PH / 2 + 9,
    PW - 18,
    PH - 18,
    30,
    10,
  );

  // where the pencil stops and the ink begins: a ragged diagonal across the screen
  const splitAt = (x) => -80 - x * 0.75;
  const ragged = [];
  for (let x = -130; x <= 130; x += 7)
    ragged.push([x, splitAt(x) + gauss() * 2.2]);
  const sketchHalf = [[-140, -260], [140, -260], ...ragged.slice().reverse()];
  const inkHalf = [...ragged, [140, 260], [-140, 260]];
  const defs = `<clipPath id="sketch-half"><path d="${polyPath(TT(sketchHalf))}"/></clipPath><clipPath id="ink-half"><path d="${polyPath(TT(inkHalf))}"/></clipPath>`;

  // ---------- cast shadow, hatched in pencil toward the lower right
  begin("shadow");
  const shadow = TT(body.map((p) => add(p, [15, 13])));
  hatch(
    shadow.filter((_, i) => i % 3 === 0),
    deg(-58),
    4.2,
    { pencil: true, w: 0.75, opacity: 0.32, jitter: 0.5 },
  );

  // ---------- the sprig behind the phone: stem and lower leaves
  const sprigBase = [500, 628];
  const sprigCtrl = [
    sprigBase,
    [494, 560],
    [480, 480],
    [472, 400],
    [470, 330],
    [462, 262],
  ];
  const sprig = resample(spline(sprigCtrl), 1);
  sk.leaf([492, 560], deg(-28), 92, 26, {
    bend: 0.12,
    color: COLORS.green[2],
    pencil: false,
  });
  sk.leaf([482, 486], deg(-150), 78, 22, {
    bend: -0.12,
    color: COLORS.green[1],
    pencil: false,
  });
  begin("sprig-stem");
  sk.greenStem(sprig, 4.6);
  inkStroke(
    sprig.filter((_, i) => i % 2 === 0),
    { w: 1.2, tin: 3, tout: 14, raw: true },
  );
  sk.hairs(sprig, { every: 12 });

  // ---------- the phone body
  begin("phone");
  knockout(TT(body), false);
  // a soft grey-blue frame, darker on the shaded edge
  const frameRing = [
    ...TT(body),
    TT(body)[0],
    ...TT(screen).slice().reverse(),
    TT(screen).slice().reverse()[0],
  ];
  wash(frameRing, "#dce0e6", "wash", { smooth: false, opacity: 0.6 });
  hatch(
    TT([
      [PW / 2 - 8, -PH / 2 + 40],
      [PW / 2, -PH / 2 + 60],
      [PW / 2, PH / 2 - 40],
      [PW / 2 - 8, PH / 2 - 20],
    ]),
    deg(-60),
    3.2,
    {
      pencil: true,
      w: 0.7,
      opacity: 0.45,
    },
  );
  // construction first: the straight edges run on past the corners
  const edge = (a, b) => {
    const u = norm(sub(b, a));
    pencilLine(
      [
        sub(T(a), mul(rot(u, ANG), rnd(8, 16))),
        add(T(b), mul(rot(u, ANG), rnd(8, 16))),
      ],
      { w: 0.8, opacity: 0.38, jitter: 0.4, raw: true },
    );
  };
  edge([-PW / 2 - 1.5, -PH / 2 + 30], [-PW / 2 - 1.5, PH / 2 - 30]);
  edge([PW / 2 + 1, -PH / 2 + 30], [PW / 2 + 1, PH / 2 - 30]);
  edge([-PW / 2 + 30, -PH / 2 - 1.5], [PW / 2 - 30, -PH / 2 - 1.5]);
  edge([-PW / 2 + 30, PH / 2 + 1], [PW / 2 - 30, PH / 2 + 1]);
  contourStrokes(TT(body), C, { w: 1.9, pieces: 3, gap: deg(14) });
  contourStrokes(TT(screen), C, { w: 1.05, pieces: 2, gap: deg(22) });
  // side buttons
  const button = (x0, y0, y1, side) => {
    const out = side * 3.2;
    inkStroke(
      TT([
        [x0, y0],
        [x0 + out, y0 + 2],
        [x0 + out, y1 - 2],
        [x0, y1],
      ]),
      { w: 1.1, tin: 1, tout: 1, raw: false },
    );
  };
  button(-PW / 2, -172, -150, -1);
  button(-PW / 2, -128, -92, -1);
  button(-PW / 2, -80, -44, -1);
  button(PW / 2, -142, -84, 1);

  // ---------- the screen, first as a pencil wireframe…
  const ui = {
    title: [-84, -176],
    card: [-86, -158, 172, 104, 14],
    lines: [
      [-86, -36, 166],
      [-86, -22, 150],
      [-86, -8, 104],
    ],
    tiles: [
      [-86, 12, 82, 70, 12],
      [4, 12, 82, 70, 12],
    ],
    button: [-86, 100, 172, 34, 17],
    tabs: [-60, -20, 20, 60],
  };
  const squiggle = (x, y, w, amp = 2.2, period = 7) => {
    const pts = [];
    for (let t = 0; t <= w; t += period / 2)
      pts.push([
        x + t,
        y + (Math.round(t / (period / 2)) % 2 ? -amp : amp) * rnd(0.6, 1.1),
      ]);
    return pts;
  };
  begin("wireframe", { clip: "sketch-half" });
  const pRect = (r, o = {}) =>
    pencilLine(TT(roundedRect(...r, 6).concat([roundedRect(...r, 6)[0]])), {
      w: 0.95,
      opacity: 0.72,
      jitter: 0.5,
      ...o,
    });
  pencilLine(TT(squiggle(-84, -213, 22, 1.4, 5)), {
    w: 0.8,
    opacity: 0.6,
    jitter: 0.2,
    raw: true,
  });
  pencilLine(
    TT([
      [52, -216],
      [58, -216],
      [58, -211],
      [52, -211],
      [52, -216],
    ]),
    { w: 0.8, opacity: 0.6, jitter: 0.2, raw: true },
  );
  pencilLine(TT(squiggle(ui.title[0], ui.title[1], 96, 3.4, 11)), {
    w: 1,
    opacity: 0.65,
    jitter: 0.4,
    raw: true,
  });
  pRect(ui.card, { passes: 2 });
  const [cx, cy, cw, ch] = ui.card;
  pencilLine(
    TT([
      [cx + 6, cy + 6],
      [cx + cw - 6, cy + ch - 6],
    ]),
    { w: 0.8, opacity: 0.45, jitter: 0.3 },
  );
  pencilLine(
    TT([
      [cx + cw - 6, cy + 6],
      [cx + 6, cy + ch - 6],
    ]),
    { w: 0.8, opacity: 0.45, jitter: 0.3 },
  );
  ui.lines.forEach(([x, y, w]) =>
    pencilLine(TT(squiggle(x, y, w, 1.6, 6)), {
      w: 0.8,
      opacity: 0.55,
      jitter: 0.3,
      raw: true,
    }),
  );
  ui.tiles.forEach((r) => {
    pRect(r);
    pencilLine(
      TT(
        Array.from({ length: 13 }, (_, i) =>
          polar([r[0] + 20, r[1] + 22], 9, (i / 12) * Math.PI * 2),
        ),
      ),
      { w: 0.8, opacity: 0.5, jitter: 0.2 },
    );
    pencilLine(TT(squiggle(r[0] + 10, r[1] + 50, 52, 1.3, 6)), {
      w: 0.7,
      opacity: 0.5,
      jitter: 0.2,
      raw: true,
    });
  });
  pRect(ui.button);
  ui.tabs.forEach((x) =>
    pencilLine(
      TT(
        Array.from({ length: 11 }, (_, i) =>
          polar([x, 186], 7, (i / 10) * Math.PI * 2),
        ),
      ),
      { w: 0.8, opacity: 0.5, jitter: 0.2 },
    ),
  );
  // a designer's margin marks: spacing ticks on the card
  pencilLine(
    TT([
      [cx - 2, cy - 7],
      [cx + cw + 2, cy - 7],
    ]),
    { w: 0.6, opacity: 0.4, jitter: 0.1 },
  );
  pencilLine(
    TT([
      [cx, cy - 10],
      [cx, cy - 4],
    ]),
    { w: 0.6, opacity: 0.4, jitter: 0.1 },
  );
  pencilLine(
    TT([
      [cx + cw, cy - 10],
      [cx + cw, cy - 4],
    ]),
    { w: 0.6, opacity: 0.4, jitter: 0.1 },
  );

  // ---------- …then inked and painted below the line
  begin("built", { clip: "ink-half" });
  const iRect = (r, w = 1) =>
    contourStrokes(
      TT(roundedRect(...r)),
      T([r[0] + r[2] / 2, r[1] + r[3] / 2]),
      { w, pieces: 2, gap: deg(12) },
    );
  // status bar and title
  inkStroke(TT(squiggle(-84, -213, 22, 1.4, 5)), {
    w: 0.9,
    tin: 1,
    tout: 2,
    raw: true,
  });
  inkStroke(TT(squiggle(ui.title[0], ui.title[1], 96, 3.4, 11)), {
    w: 1.6,
    tin: 2,
    tout: 4,
    raw: true,
  });
  // the card: a painted picture of sky and a hill
  wash(
    TT(roundedRect(cx + 2, cy + 2, cw - 4, ch * 0.62, 12)),
    COLORS.blue[3],
    "wash",
    { smooth: false, opacity: 0.7 },
  );
  wash(
    TT([
      [cx + 2, cy + ch * 0.55],
      [cx + cw * 0.35, cy + ch * 0.38],
      [cx + cw * 0.7, cy + ch * 0.5],
      [cx + cw - 2, cy + ch * 0.42],
      [cx + cw - 2, cy + ch - 2],
      [cx + 2, cy + ch - 2],
    ]),
    COLORS.sage,
    "wash",
    { opacity: 0.85 },
  );
  wash(
    TT(
      Array.from({ length: 8 }, (_, i) =>
        polar([cx + cw * 0.74, cy + ch * 0.26], 9, (i / 8) * Math.PI * 2),
      ),
    ),
    COLORS.butter,
    "yellow",
    { opacity: 0.9 },
  );
  iRect(ui.card, 1.15);
  ui.lines.forEach(([x, y, w]) =>
    inkLine(T([x, y]), T([x + w * rnd(0.92, 1), y + rnd(-0.6, 0.6)]), {
      w: 1.3,
      bow: 0.004,
    }),
  );
  // tiles: a pink one with a heart, a butter one with the asterisk
  const [t1, t2] = ui.tiles;
  wash(
    TT(roundedRect(t1[0] + 2, t1[1] + 2, t1[2] - 4, t1[3] - 4, 10)),
    COLORS.pink[1],
    "wash",
    { smooth: false, opacity: 0.75 },
  );
  wash(
    TT(roundedRect(t2[0] + 2, t2[1] + 2, t2[2] - 4, t2[3] - 4, 10)),
    COLORS.butter,
    "wash",
    { smooth: false, opacity: 0.85 },
  );
  iRect(t1);
  iRect(t2);
  const heart = (c, s) => {
    const pts = [];
    for (let i = 0; i <= 40; i++) {
      const t = (i / 40) * Math.PI * 2;
      pts.push(
        add(c, [
          s * 0.06 * 16 * Math.sin(t) ** 3,
          -s *
            0.06 *
            (13 * Math.cos(t) -
              5 * Math.cos(2 * t) -
              2 * Math.cos(3 * t) -
              Math.cos(4 * t)),
        ]),
      );
    }
    return pts;
  };
  const hc = [t1[0] + 22, t1[1] + 24];
  wash(TT(heart(hc, 11)), COLORS.pinkDark, "glaze", { opacity: 0.6 });
  inkStroke(TT(heart(hc, 11)), { w: 1, tin: 1, tout: 2, raw: false });
  const ac = [t2[0] + 22, t2[1] + 24];
  for (let k = 0; k < 4; k++) {
    const a = deg(k * 45 + rnd(-6, 6));
    inkStroke(
      [
        T(polar(ac, 9 * rnd(0.85, 1.1), a)),
        T(polar(ac, 9 * rnd(0.85, 1.1), a + Math.PI)),
      ],
      { w: 1.2, tin: 1, tout: 1.5 },
    );
  }
  [t1, t2].forEach((r) =>
    inkLine(
      T([r[0] + 10, r[1] + 50]),
      T([r[0] + 10 + 50 * rnd(0.7, 1), r[1] + 50]),
      { w: 1, bow: 0.004 },
    ),
  );
  // the button and the tab bar
  wash(
    TT(
      roundedRect(
        ui.button[0] + 1,
        ui.button[1] + 1,
        ui.button[2] - 2,
        ui.button[3] - 2,
        16,
      ),
    ),
    COLORS.blue[0],
    "wash",
    { smooth: false, opacity: 0.8 },
  );
  iRect(ui.button, 1.15);
  inkStroke(TT(squiggle(-30, 117, 60, 2.4, 9)), {
    w: 1.3,
    tin: 1,
    tout: 2,
    raw: true,
    color: "#f6f3ec",
  });
  ui.tabs.forEach((x, i) => {
    const ring = Array.from({ length: 12 }, (_, k) =>
      polar([x, 186], 7, (k / 11) * Math.PI * 2.05),
    );
    if (i === 1) wash(TT(ring), COLORS.blue[0], "wash", { opacity: 0.8 });
    inkStroke(TT(ring), { w: 0.95, tin: 1, tout: 2 });
  });
  inkLine(T([-34, 218]), T([34, 218]), { w: 2.2, bow: 0.002 });

  // ---------- the dynamic island over everything on the screen
  begin("island");
  wash(TT(roundedRect(-30, -222, 60, 17, 8.5)), COLORS.ink, "dots", {
    smooth: false,
  });

  // ---------- forget-me-nots in front of the frame
  sk.cyme([464, 270], deg(-104), 200, -1, {
    arc: 0.002,
    coil: 0.12,
    pow: 4,
    flowers: [
      { s: 0.1, ped: 18, R: 21, tilt: 0.92, side: -1 },
      { s: 0.24, ped: 17, R: 19.5, tilt: 0.7, side: 1 },
      { s: 0.38, ped: 15, R: 18, tilt: 0.86, side: -1 },
      { s: 0.5, ped: 13, R: 15, tilt: 0.5, side: 1 },
    ],
    buds: [
      { s: 0.62, size: 12, color: COLORS.lilac, side: -1 },
      { s: 0.7, size: 11, color: COLORS.pink[0], side: 1 },
      { s: 0.78, size: 9.5, color: COLORS.pink[1] },
      { s: 0.85, size: 8, color: COLORS.pink[2] },
      { s: 0.91, size: 6.5, color: COLORS.pink[0] },
      { s: 0.96, size: 5.2, color: COLORS.pink[1] },
    ],
  });
  sk.cyme([466, 300], deg(-48), 120, 1, {
    coil: 0.13,
    pow: 3.4,
    flowers: [
      { s: 0.2, ped: 15, R: 17, tilt: 0.88, side: 1 },
      { s: 0.42, ped: 13, R: 14.5, tilt: 0.6, side: -1 },
    ],
    buds: [
      { s: 0.6, size: 10.5, color: COLORS.lilac, side: 1 },
      { s: 0.72, size: 9, color: COLORS.pink[1], side: -1 },
      { s: 0.84, size: 7.5, color: COLORS.pink[0] },
      { s: 0.94, size: 5.8, color: COLORS.pink[2] },
    ],
  });

  // ---------- the pencil, still drawing at the edge of the sketch
  begin("pencil");
  const tip = T([-90, splitAt(-90) + 10]);
  const pdir = norm([-0.62, 0.79]);
  const pside = perp(pdir);
  const P = (along, across) =>
    add(tip, add(mul(pdir, along), mul(pside, across)));
  const hw = 10;
  const coneEnd = 34;
  const bodyEnd = 228;
  const ferrule = 22;
  const eraser = 20;
  // knock out the paper under it, then paint: wood, lacquer, metal, rubber
  knockout(
    [
      P(0, 0),
      P(coneEnd, -hw),
      P(bodyEnd + ferrule + eraser, -hw),
      P(bodyEnd + ferrule + eraser + 3, 0),
      P(bodyEnd + ferrule + eraser, hw),
      P(coneEnd, hw),
    ],
    false,
  );
  wash(
    [P(6, -1.6), P(coneEnd, -hw + 0.5), P(coneEnd, hw - 0.5), P(6, 1.6)],
    "#ecd2ad",
    "wash",
    { smooth: false, opacity: 0.9 },
  );
  wash([P(0, 0), P(8, -2.4), P(8, 2.4)], "#4a4540", "dots", { smooth: false });
  wash(
    [P(coneEnd, -hw), P(bodyEnd, -hw), P(bodyEnd, hw), P(coneEnd, hw)],
    COLORS.butter,
    "wash",
    { smooth: false, opacity: 0.95 },
  );
  wash(
    [
      P(coneEnd + 2, hw * 0.3),
      P(bodyEnd, hw * 0.3),
      P(bodyEnd, hw),
      P(coneEnd + 2, hw),
    ],
    "#d9b56a",
    "glaze",
    { smooth: false, opacity: 0.55 },
  );
  wash(
    [
      P(bodyEnd, -hw),
      P(bodyEnd + ferrule, -hw),
      P(bodyEnd + ferrule, hw),
      P(bodyEnd, hw),
    ],
    "#c9c6bf",
    "wash",
    { smooth: false, opacity: 0.9 },
  );
  wash(
    [
      P(bodyEnd + ferrule, -hw),
      P(bodyEnd + ferrule + eraser, -hw + 0.6),
      P(bodyEnd + ferrule + eraser + 3, 0),
      P(bodyEnd + ferrule + eraser, hw - 0.6),
      P(bodyEnd + ferrule, hw),
    ],
    COLORS.pink[0],
    "wash",
    { smooth: false, opacity: 0.95 },
  );
  // ink: the outline, the facets, the scalloped edge where the lacquer was cut
  inkStroke([P(1, -0.4), P(coneEnd, -hw)], { w: 1.1, tin: 1, tout: 1 });
  inkStroke([P(1, 0.4), P(coneEnd, hw)], { w: 1.2, tin: 1, tout: 1 });
  const scallop = [];
  for (let k = 0; k <= 6; k++)
    scallop.push(P(coneEnd + (k % 2 ? 3.2 : 0), -hw + (k / 6) * hw * 2));
  inkStroke(scallop, { w: 0.9, tin: 1, tout: 1 });
  inkLine(P(coneEnd, -hw), P(bodyEnd + ferrule + eraser, -hw), {
    w: 1.25,
    overshoot: 2,
  });
  inkLine(P(coneEnd + 1, hw), P(bodyEnd + ferrule + eraser, hw), {
    w: 1.6,
    overshoot: 2,
  });
  inkLine(P(coneEnd + 4, -hw * 0.3), P(bodyEnd - 2, -hw * 0.3), {
    w: 0.6,
    layer: "fine",
  });
  inkLine(P(coneEnd + 4, hw * 0.3), P(bodyEnd - 2, hw * 0.3), {
    w: 0.6,
    layer: "fine",
  });
  inkLine(P(bodyEnd, -hw), P(bodyEnd, hw), { w: 1 });
  inkLine(P(bodyEnd + ferrule, -hw), P(bodyEnd + ferrule, hw), { w: 1 });
  for (let k = 1; k < 4; k++)
    inkLine(
      P(bodyEnd + (k * ferrule) / 4, -hw + 1),
      P(bodyEnd + (k * ferrule) / 4, hw - 1),
      { w: 0.5, layer: "fine" },
    );
  inkStroke(
    [
      P(bodyEnd + ferrule + eraser, -hw + 0.4),
      P(bodyEnd + ferrule + eraser + 3.4, 0),
      P(bodyEnd + ferrule + eraser, hw - 0.4),
    ],
    { w: 1.2, tin: 1, tout: 1 },
  );
  // the line it has just drawn, running back along the split
  begin("pencil-mark");
  pencilLine([tip, T([-80, splitAt(-80) + 14]), T([-52, splitAt(-52) + 6])], {
    w: 1.2,
    opacity: 0.7,
    jitter: 0.3,
  });

  // ---------- a few flecks, and the asterisk twice in the margins
  begin("flecks");
  [
    [118, 96, 1.5, COLORS.pink[0]],
    [128, 108, 0.9, COLORS.pink[0]],
    [548, 214, 1.3, COLORS.blue[0]],
    [96, 420, 1.2, COLORS.green[0]],
    [416, 604, 1.4, COLORS.blue[2]],
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
  const asterisk = (c, r, w) => {
    begin("asterisk");
    for (let k = 0; k < 4; k++) {
      const a = deg(k * 45 + rnd(-8, 8));
      inkStroke(
        [
          polar(c, r * rnd(0.8, 1.1), a),
          polar(c, r * rnd(0.8, 1.1), a + Math.PI),
        ],
        { w, tin: 1.5, tout: 2.5, color: "#5d78a8" },
      );
    }
  };
  asterisk([84, 120], 11, 1.6);
  asterisk([560, 470], 8, 1.3);

  return sk.toSVG(defs);
}

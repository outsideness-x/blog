// A small drawing kit for the artbook pages: pressure-shaped ink, graphite,
// watercolour washes and paper knockouts, written out as SVG. Every element is
// its own group, so a flower in front hides the line of the one behind it.

// ---------- vectors and curves (pure)
export const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
export const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
export const mul = (a, s) => [a[0] * s, a[1] * s];
export const len = (a) => Math.hypot(a[0], a[1]);
export const norm = (a) => {
  const l = Math.hypot(a[0], a[1]) || 1;
  return [a[0] / l, a[1] / l];
};
export const perp = (a) => [-a[1], a[0]];
export const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
export const lerp = (a, b, t) => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
];
export const polar = (c, r, ang) => [
  c[0] + r * Math.cos(ang),
  c[1] + r * Math.sin(ang),
];
export const rot = (p, ang, c = [0, 0]) => {
  const s = Math.sin(ang);
  const co = Math.cos(ang);
  const x = p[0] - c[0];
  const y = p[1] - c[1];
  return [c[0] + x * co - y * s, c[1] + x * s + y * co];
};
export const deg = (d) => (d * Math.PI) / 180;

export function spline(pts, closed = false, per = 10) {
  const n = pts.length;
  if (n < 2) return pts.slice();
  const get = (i) =>
    closed ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
  const out = [];
  const segs = closed ? n : n - 1;
  for (let i = 0; i < segs; i++) {
    const p0 = get(i - 1);
    const p1 = get(i);
    const p2 = get(i + 1);
    const p3 = get(i + 2);
    for (let j = 0; j < per; j++) {
      const t = j / per;
      const t2 = t * t;
      const t3 = t2 * t;
      out.push(
        [0, 1].map(
          (k) =>
            0.5 *
            (2 * p1[k] +
              (-p0[k] + p2[k]) * t +
              (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t2 +
              (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t3),
        ),
      );
    }
  }
  out.push(closed ? pts[0] : pts[n - 1]);
  return out;
}
export function resample(poly, step) {
  const out = [poly[0]];
  let carry = 0;
  for (let i = 1; i < poly.length; i++) {
    let a = poly[i - 1];
    const b = poly[i];
    let d = len(sub(b, a));
    while (carry + d >= step) {
      const t = (step - carry) / d;
      a = lerp(a, b, t);
      out.push(a);
      d = len(sub(b, a));
      carry = 0;
    }
    carry += d;
  }
  const last = poly[poly.length - 1];
  if (len(sub(out[out.length - 1], last)) > step * 0.25) out.push(last);
  return out;
}
export function arcLength(poly) {
  let s = 0;
  for (let i = 1; i < poly.length; i++) s += len(sub(poly[i], poly[i - 1]));
  return s;
}
const f1 = (v) => Math.round(v * 10) / 10;
export function polyPath(pts, close = true) {
  let d = `M${f1(pts[0][0])} ${f1(pts[0][1])}`;
  for (let i = 1; i < pts.length; i++)
    d += `L${f1(pts[i][0])} ${f1(pts[i][1])}`;
  return close ? d + "Z" : d;
}
// a rounded rectangle as a closed list of points, clockwise from the top left
export function roundedRect(x, y, w, h, r, per = 8) {
  const pts = [];
  const corner = (cx, cy, a0) => {
    for (let i = 0; i <= per; i++)
      pts.push(polar([cx, cy], r, a0 + (i / per) * (Math.PI / 2)));
  };
  corner(x + w - r, y + r, -Math.PI / 2);
  corner(x + w - r, y + h - r, 0);
  corner(x + r, y + h - r, Math.PI / 2);
  corner(x + r, y + r, Math.PI);
  return pts;
}

// ---------- the soft palette shared by every page
export const COLORS = {
  ink: "#2e2722",
  graphite: "#7a766f",
  blue: ["#93add6", "#9cb4da", "#8ca8d2", "#a2badd"],
  blueDark: "#6d89ba",
  pink: ["#e2a8b8", "#e7b0bf", "#dba2b3"],
  pinkDark: "#c48799",
  lilac: "#b3aad6",
  green: ["#a5b889", "#9bb183", "#afc093"],
  greenDark: "#6f8a5b",
  yellow: "#e9cd84",
  orange: "#d9a465",
  butter: "#eed9a0",
  sage: "#a9c0a2",
};

// ---------- a sketch: its own randomness, light and layers
export function createSketch({ seed = 1, width, height, light = -130 }) {
  let a = seed >>> 0;
  const rand = () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const rnd = (lo, hi) => lo + (hi - lo) * rand();
  const gauss = () => {
    let u = 0;
    let v = 0;
    while (!u) u = rand();
    while (!v) v = rand();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
  const LIGHT = deg(light);
  const SHADE = [Math.cos(LIGHT + Math.PI), Math.sin(LIGHT + Math.PI)];
  const objects = [];
  let cur = null;
  const begin = (name, { clip = null } = {}) => {
    cur = {
      name,
      clip,
      knock: [],
      pencil: [],
      wash: [],
      glaze: [],
      yellow: [],
      ink: [],
      fine: [],
      dots: [],
    };
    objects.push(cur);
    return cur;
  };
  begin("base");

  function noise1D(n, knotsCount) {
    const knots = Array.from({ length: knotsCount + 2 }, () => rnd(-1, 1));
    return Array.from({ length: n }, (_, i) => {
      const x = (i / Math.max(1, n - 1)) * knotsCount;
      const i0 = Math.min(knotsCount, Math.floor(x));
      const f = x - i0;
      const s = f * f * (3 - 2 * f);
      return knots[i0] * (1 - s) + knots[i0 + 1] * s;
    });
  }
  function deform(poly, depth, v) {
    let p = poly;
    for (let d = 0; d < depth; d++) {
      const out = [];
      for (let i = 0; i < p.length; i++) {
        const pa = p[i];
        const pb = p[(i + 1) % p.length];
        out.push(pa);
        const m = lerp(pa, pb, 0.5);
        const l = len(sub(pb, pa));
        const ang = rnd(0, Math.PI * 2);
        const r = gauss() * v * l;
        out.push([m[0] + Math.cos(ang) * r, m[1] + Math.sin(ang) * r]);
      }
      p = out;
    }
    return p;
  }

  // Pressure-shaped ink stroke through control points, returned as a filled outline.
  // With `center`, the line is heavier on the side turned from the light.
  function inkStroke(ctrl, o = {}) {
    const {
      w = 1.2,
      tin = 5,
      tout = 9,
      vary = 0.32,
      minW = 0.25,
      step = 0.7,
      layer = "ink",
      color = COLORS.ink,
      opacity = 1,
      raw = false,
      center = null,
      light: lw = 0.55,
    } = o;
    const line = resample(raw ? ctrl : spline(ctrl), step);
    const n = line.length;
    if (n < 3) return;
    const total = arcLength(line);
    const nz = noise1D(n, Math.max(2, Math.round(total / 26)));
    const left = [];
    const right = [];
    let s = 0;
    for (let i = 0; i < n; i++) {
      if (i) s += len(sub(line[i], line[i - 1]));
      let p = 1;
      if (s < tin) p *= Math.sin((s / tin) * (Math.PI / 2)) * 0.8 + 0.2;
      if (total - s < tout)
        p *= Math.sin(((total - s) / tout) * (Math.PI / 2)) * 0.85 + 0.15;
      p *= 1 + vary * nz[i];
      if (center) {
        const out = norm(sub(line[i], center));
        p *= 1 - lw / 2 + lw * Math.max(0, dot(out, SHADE));
      }
      const half = Math.max(minW, w * p) / 2;
      const pa = line[Math.max(0, i - 1)];
      const pb = line[Math.min(n - 1, i + 1)];
      const nr = perp(norm(sub(pb, pa)));
      left.push(add(line[i], mul(nr, half)));
      right.push(sub(line[i], mul(nr, half)));
    }
    cur[layer].push(
      `<path d="${polyPath([...left, ...right.reverse()])}" fill="${color}"${opacity < 1 ? ` opacity="${opacity}"` : ""}/>`,
    );
  }
  function pencilLine(ctrl, o = {}) {
    const {
      w = 0.9,
      opacity = 0.55,
      passes = 1,
      jitter = 0.6,
      raw = false,
    } = o;
    for (let k = 0; k < passes; k++) {
      const pts = ctrl.map((p) => add(p, [gauss() * jitter, gauss() * jitter]));
      const line = raw ? pts : resample(spline(pts), 1.2);
      cur.pencil.push(
        `<path d="${polyPath(line, false)}" fill="none" stroke="${COLORS.graphite}" stroke-width="${f1(w * rnd(0.8, 1.1))}" stroke-linecap="round" stroke-linejoin="round" opacity="${f1(opacity * rnd(0.75, 1))}"/>`,
      );
    }
  }
  function wash(pts, color, layer = "wash", o = {}) {
    const { smooth = true, opacity = 1 } = o;
    const shape = smooth ? resample(spline(pts, true), 1.1) : pts;
    cur[layer].push(
      `<path d="${polyPath(shape)}" fill="${color}"${opacity < 1 ? ` opacity="${opacity}"` : ""}/>`,
    );
  }
  function knockout(pts, smooth = true) {
    cur.knock.push(
      `<path d="${polyPath(smooth ? resample(spline(pts, true), 1.2) : pts)}"/>`,
    );
  }
  // A closed outline in ink, split into strokes with a gap where the light falls.
  function contourStrokes(closedPts, center, o = {}) {
    const { w = 1.3, gapAt = LIGHT, gap = deg(26), pieces = 2 } = o;
    const line = resample(closedPts, 0.7);
    const n = line.length;
    const angOf = (p) => Math.atan2(p[1] - center[1], p[0] - center[0]);
    const dist = (x, y) =>
      Math.abs(Math.atan2(Math.sin(x - y), Math.cos(x - y)));
    let start = 0;
    let best = 9;
    for (let i = 0; i < n; i++) {
      const d = dist(angOf(line[i]), gapAt + gap / 2);
      if (d < best) {
        best = d;
        start = i;
      }
    }
    const ordered = [...line.slice(start), ...line.slice(0, start)];
    const keep =
      gap > 0
        ? ordered.filter((p) => dist(angOf(p), gapAt) > gap / 2)
        : ordered;
    if (pieces === 1 || keep.length < 30) {
      inkStroke(keep, { w, raw: true, center });
      return;
    }
    const cuts = [0];
    for (let k = 1; k < pieces; k++)
      cuts.push(
        Math.floor((keep.length * k) / pieces + rnd(-0.08, 0.08) * keep.length),
      );
    cuts.push(keep.length);
    for (let k = 0; k < pieces; k++) {
      const s0 = Math.max(0, cuts[k] - (k ? 2 : 0));
      const s1 = Math.min(keep.length, cuts[k + 1] + 3);
      inkStroke(keep.slice(s0, s1), {
        w: w * rnd(0.88, 1.06),
        raw: true,
        center,
        tin: 3,
        tout: 5,
      });
    }
  }
  // Hand-drawn straight-ish line: a slight bow, sometimes overshooting the corner.
  function inkLine(p0, p1, o = {}) {
    const { bow = 0.006, overshoot = 0, ...rest } = o;
    const d = sub(p1, p0);
    const L = len(d);
    const u = norm(d);
    const a0 = sub(p0, mul(u, overshoot * rnd(0.2, 1)));
    const a1 = add(p1, mul(u, overshoot * rnd(0.2, 1)));
    const mid = add(lerp(a0, a1, 0.5), mul(perp(u), L * bow * gauss()));
    inkStroke([a0, mid, a1], { tin: 2, tout: 3, ...rest });
  }
  // Parallel hatching clipped to a convex polygon, in ink or graphite.
  function hatch(poly, angle, spacing, o = {}) {
    const {
      w = 0.5,
      pencil = false,
      opacity = 0.7,
      jitter = 0.3,
      lengthJitter = 0.1,
    } = o;
    const dir = [Math.cos(angle), Math.sin(angle)];
    const nrm = perp(dir);
    const ds = poly.map((p) => dot(p, nrm));
    const lo = Math.min(...ds);
    const hi = Math.max(...ds);
    for (
      let t = lo + spacing * rnd(0.3, 0.7);
      t < hi;
      t += spacing * rnd(0.85, 1.15)
    ) {
      const hits = [];
      for (let i = 0; i < poly.length; i++) {
        const pa = poly[i];
        const pb = poly[(i + 1) % poly.length];
        const da = dot(pa, nrm) - t;
        const db = dot(pb, nrm) - t;
        if (da < 0 !== db < 0) hits.push(lerp(pa, pb, da / (da - db)));
      }
      if (hits.length < 2) continue;
      hits.sort((x, y) => dot(x, dir) - dot(y, dir));
      const span = len(sub(hits[hits.length - 1], hits[0]));
      const s0 = add(hits[0], mul(dir, span * rnd(0, lengthJitter)));
      const s1 = sub(
        hits[hits.length - 1],
        mul(dir, span * rnd(0, lengthJitter)),
      );
      if (pencil) pencilLine([s0, s1], { w, opacity, jitter, raw: true });
      else
        inkStroke([add(s0, [gauss() * jitter, gauss() * jitter]), s1], {
          w,
          tin: 1,
          tout: 2,
          vary: 0.2,
          opacity,
          layer: "fine",
        });
    }
  }

  // ---------- forget-me-nots
  function petalEdge(R, ang, h, dipR, n = 14, round = 4) {
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const u = -1 + (2 * i) / n;
      const r =
        dipR + (R - dipR) * Math.pow(1 - Math.pow(Math.abs(u), round), 0.5);
      pts.push([r, ang + u * h]);
    }
    return pts;
  }
  function flower(c, R, o = {}) {
    const {
      rotation = rnd(0, Math.PI * 2),
      tilt = 1,
      tiltDir = 0,
      detail = false,
      color = COLORS.blue[Math.floor(rand() * COLORS.blue.length)],
      inkW = 0.8 + R * 0.022,
      stalkDir = null,
    } = o;
    begin("flower");
    const M = (p) => {
      let q = rot(p, -tiltDir);
      q = [q[0], q[1] * tilt];
      q = rot(q, tiltDir);
      return add(c, q);
    };
    const P = (rr, aa) => M(polar([0, 0], rr, aa));
    const n = 5;
    const axes = Array.from(
      { length: n },
      (_, k) => rotation + (k * 2 * Math.PI) / n + deg(rnd(-4, 4)),
    );
    const sizes = axes.map(() => R * rnd(0.9, 1.06));
    const dipsR = axes.map(() => R * rnd(0.5, 0.6));
    const span = (k) => {
      const ax = axes[k];
      const prev = axes[(k + n - 1) % n] - (k === 0 ? 2 * Math.PI : 0);
      const next = axes[(k + 1) % n] + (k === n - 1 ? 2 * Math.PI : 0);
      const a0 = (ax + prev) / 2;
      const a1 = (ax + next) / 2;
      return { mid: (a0 + a1) / 2, h: (a1 - a0) / 2, a1 };
    };
    if (stalkDir && tilt < 0.85) {
      const d = norm(stalkDir);
      const s = perp(d);
      const base = add(c, mul(d, R * 0.55));
      const at = (al, ac) => add(base, add(mul(d, al * R), mul(s, ac * R)));
      const cal = [
        at(0.42, 0),
        at(0.1, 0.36),
        at(-0.3, 0.52),
        at(-0.12, 0.22),
        at(-0.36, 0.02),
        at(-0.12, -0.2),
        at(-0.3, -0.5),
        at(0.1, -0.34),
      ];
      wash(cal, COLORS.green[1], "wash", { opacity: 0.9 });
      inkStroke([at(0.38, 0.06), at(0.08, 0.38), at(-0.3, 0.52)], {
        w: 0.75,
        tin: 1,
        tout: 3,
      });
      inkStroke([at(0.38, -0.06), at(0.08, -0.36), at(-0.3, -0.5)], {
        w: 0.75,
        tin: 1,
        tout: 3,
      });
    }
    const contour = [];
    const dips = [];
    for (let k = 0; k < n; k++) {
      const { mid, h, a1 } = span(k);
      const edge = petalEdge(
        sizes[k],
        mid,
        h,
        dipsR[k],
        detail ? 22 : 14,
        rnd(3, 5),
      );
      edge.slice(0, -1).forEach(([rr, aa]) => contour.push(P(rr, aa)));
      dips.push(P(dipsR[k], a1));
    }
    knockout(
      contour.filter((_, i) => i % 2 === 0).map((p) => lerp(p, c, 0.04)),
    );
    const off = [rnd(-1, 1) * R * 0.07, rnd(-1, 1) * R * 0.07];
    for (let k = 0; k < n; k++) {
      const { mid } = span(k);
      const h = span(k).h * 0.93;
      const outer = petalEdge(
        sizes[k] * rnd(0.9, 0.98),
        mid,
        h,
        dipsR[k] * 0.95,
        10,
        4,
      ).slice(1, -1);
      const petal = [
        P(R * 0.31, mid - h * 0.55),
        ...outer.map(([rr, aa]) => P(rr, aa)),
        P(R * 0.31, mid + h * 0.55),
      ].map((p) => add(p, off));
      wash(petal, color, "wash", { opacity: 0.85 });
      const rim = petalEdge(
        sizes[k] * 0.93,
        mid,
        h * 0.86,
        dipsR[k] * 0.9,
        10,
        4,
      ).slice(2, -2);
      const tint = [
        ...rim.map(([rr, aa]) => P(rr, aa)),
        ...rim
          .slice()
          .reverse()
          .map(([rr, aa]) => P(rr * rnd(0.6, 0.7), aa)),
      ].map((p) => add(p, off));
      wash(tint, color, "wash", { opacity: 0.5 });
      const facing = Math.cos(mid - LIGHT);
      if (facing < -0.2 || (detail && facing < 0.3)) {
        const side = Math.sin(mid - LIGHT) > 0 ? 1 : -1;
        const glaze = [
          [R * 0.36, mid + side * h * 0.1],
          [R * 0.62, mid + side * h * 0.72],
          [R * 0.84, mid + side * h * 0.55],
          [R * 0.78, mid + side * h * 0.08],
          [R * 0.5, mid - side * h * 0.12],
        ].map(([rr, aa]) => add(P(rr, aa), off));
        wash(glaze, COLORS.blueDark, "glaze", {
          opacity: detail ? 0.45 : 0.38,
        });
      }
    }
    const eyeR = R * 0.25;
    wash(
      Array.from({ length: 9 }, (_, k) =>
        P(eyeR * rnd(0.88, 1.08), (k / 9) * Math.PI * 2),
      ),
      COLORS.yellow,
      "yellow",
    );
    if (detail || R > 14) {
      wash(
        Array.from({ length: 7 }, (_, k) =>
          P(eyeR * 0.5 * rnd(0.85, 1.1), (k / 7) * Math.PI * 2),
        ),
        COLORS.orange,
        "yellow",
        { opacity: 0.75 },
      );
    }
    contourStrokes(contour, c, {
      w: inkW,
      pieces: detail ? 3 : R > 12 ? 2 : 1,
      gap: deg(detail ? 18 : 30),
    });
    dips.forEach((d) => {
      if (!detail && rand() < 0.35) return;
      const toC = sub(c, d);
      const end = add(d, mul(toC, rnd(0.38, 0.52)));
      const mid = add(
        lerp(d, end, 0.5),
        mul(perp(norm(toC)), rnd(-0.5, 0.5) * R * 0.05),
      );
      inkStroke([add(d, mul(toC, 0.04)), mid, end], {
        w: inkW * 0.7,
        tin: 1.2,
        tout: R * 0.22,
      });
    });
    const ringN = detail ? 15 : 9;
    const ring = Array.from({ length: ringN }, (_, k) =>
      P(
        R *
          0.14 *
          (detail
            ? 1 + 0.16 * Math.cos((k / (ringN - 1)) * Math.PI * 2 * 5)
            : rnd(0.92, 1.08)),
        rotation + (k / (ringN - 1)) * Math.PI * 2 * (detail ? 1.02 : 0.8),
      ),
    );
    inkStroke(ring, { w: inkW * 0.55, tin: 1, tout: 2, layer: "fine" });
    wash(
      Array.from({ length: 6 }, (_, k) =>
        P(R * 0.05 * rnd(0.8, 1.2), (k / 6) * Math.PI * 2),
      ),
      COLORS.ink,
      "dots",
    );
    if (detail) {
      axes.forEach((ax, k) => {
        const r = sizes[k];
        [-0.34, 0, 0.34].forEach((da) => {
          const s0 = P(r * 0.34, ax + da * 0.32);
          const m = P(r * (da ? 0.52 : 0.58), ax + da * 0.7);
          const e = P(r * (da ? 0.64 : 0.74), ax + da * 0.9);
          inkStroke([s0, m, e], {
            w: 0.7,
            tin: 1,
            tout: 9,
            layer: "fine",
            color: "#4d6a9c",
            opacity: 0.5,
          });
        });
      });
    }
    return { center: c, R };
  }
  function bud(base, dir, size, color) {
    begin("bud");
    const d = norm(dir);
    const s = perp(d);
    const w = size * 0.5;
    const at = (along, across) =>
      add(base, add(mul(d, along * size), mul(s, across * w)));
    const body = [
      at(0.2, 0.62),
      at(0.45, 0.74),
      at(0.72, 0.56),
      at(0.92, 0.22),
      at(1, 0),
      at(0.92, -0.22),
      at(0.72, -0.56),
      at(0.45, -0.74),
      at(0.2, -0.6),
    ];
    knockout(body);
    wash(
      body.map((p) => add(p, [rnd(-0.5, 0.5), rnd(-0.5, 0.5)])),
      color,
      "wash",
      { opacity: 0.9 },
    );
    const away = Math.cos(Math.atan2(s[1], s[0]) - LIGHT) > 0 ? -1 : 1;
    if (size > 6)
      wash(
        [
          at(0.32, -0.1 * away),
          at(0.5, 0.66 * away),
          at(0.78, 0.48 * away),
          at(0.9, 0.1 * away),
          at(0.66, 0.02 * away),
        ],
        COLORS.pinkDark,
        "glaze",
        { opacity: 0.45 },
      );
    inkStroke(
      [
        at(0.24, away * 0.66),
        at(0.46, away * 0.76),
        at(0.74, away * 0.56),
        at(0.94, away * 0.2),
        at(1.02, -away * 0.04),
        at(0.93, -away * 0.24),
      ],
      {
        w: Math.max(0.75, size * 0.085),
        tin: 2,
        tout: 3,
      },
    );
    const cal = [
      at(-0.1, 0.2),
      at(0.12, 0.55),
      at(0.46, 0.68),
      at(0.3, 0.3),
      at(0.52, 0.04),
      at(0.3, -0.26),
      at(0.46, -0.66),
      at(0.12, -0.55),
      at(-0.1, -0.2),
    ];
    wash(cal, COLORS.green[1], "wash", { opacity: 0.95 });
    inkStroke([at(-0.06, 0.22), at(0.14, 0.55), at(0.46, 0.68)], {
      w: 0.7,
      tin: 1,
      tout: 3,
    });
    inkStroke([at(-0.06, -0.22), at(0.14, -0.55), at(0.46, -0.66)], {
      w: 0.7,
      tin: 1,
      tout: 3,
    });
    inkStroke([at(0.14, 0.05), at(0.52, 0.04)], {
      w: 0.55,
      tin: 1,
      tout: 3,
      layer: "fine",
    });
    for (let k = 0; k < 3; k++) {
      const sgn = rand() < 0.5 ? -1 : 1;
      const p = at(rnd(0, 0.38), sgn * 0.6);
      const q = add(
        p,
        mul(norm(add(d, mul(s, sgn * rnd(0.4, 1.4)))), rnd(1.4, 2.4)),
      );
      inkStroke([p, q], {
        w: 0.36,
        tin: 0.4,
        tout: 1.2,
        layer: "fine",
        minW: 0.12,
      });
    }
  }
  function hairs(
    line,
    { every = 7, lenR = [2, 3.6], spread = deg(38), offset = 1.1 } = {},
  ) {
    for (
      let i = 3;
      i < line.length - 3;
      i += Math.round(every * rnd(0.7, 1.3))
    ) {
      const p = line[i];
      const t = norm(sub(line[i + 1], line[i - 1]));
      const sideSign = rand() < 0.5 ? -1 : 1;
      const dir = rot(t, -sideSign * spread * rnd(0.7, 1.2));
      const start = add(p, mul(perp(t), sideSign * -offset));
      const q = add(start, mul(dir, rnd(...lenR)));
      inkStroke([start, q], {
        w: 0.42,
        tin: 0.4,
        tout: 1.5,
        minW: 0.12,
        layer: "fine",
      });
    }
  }
  function greenStem(line, width, color = COLORS.green[0]) {
    const left = [];
    const right = [];
    for (let i = 0; i < line.length; i++) {
      const pa = line[Math.max(0, i - 1)];
      const pb = line[Math.min(line.length - 1, i + 1)];
      const nr = perp(norm(sub(pb, pa)));
      const t = i / (line.length - 1);
      const hw =
        (width / 2) * (0.75 + 0.25 * Math.sin(t * Math.PI)) * rnd(0.9, 1.1);
      left.push(add(add(line[i], mul(nr, hw)), [0.5, 0.4]));
      right.push(add(sub(line[i], mul(nr, hw)), [0.5, 0.4]));
    }
    wash([...left, ...right.reverse()], color, "wash", { smooth: false });
  }
  // scorpioid cyme: a stalk whose curvature tightens into a coil of buds
  function cyme(start, heading, length, curl, plan) {
    const steps = 90;
    const ds = length / steps;
    const pts = [];
    let p = start;
    let h = heading;
    for (let i = 0; i <= steps; i++) {
      pts.push(p);
      const s = i / steps;
      h +=
        curl *
        ((plan.arc ?? 0.0015) +
          (plan.coil ?? 0.1) * Math.pow(s, plan.pow ?? 2.6)) *
        ds;
      p = add(p, [Math.cos(h) * ds, Math.sin(h) * ds]);
    }
    const line = resample(pts, 1);
    begin("cyme");
    greenStem(line, plan.stemW ?? 2.6, COLORS.green[2]);
    inkStroke(line, { w: plan.inkW ?? 1.1, tin: 2, tout: 12, raw: true });
    hairs(line, { every: 9 });
    const at = (s) => {
      const i = Math.min(
        line.length - 2,
        Math.max(1, Math.round(s * (line.length - 1))),
      );
      return { p: line[i], t: norm(sub(line[i + 1], line[i - 1])) };
    };
    plan.buds
      .slice()
      .reverse()
      .forEach((b, k) => {
        const { p: bp, t } = at(b.s);
        const side = b.side ?? (k % 2 ? 1 : -1);
        const dir = rot(t, side * deg(b.angle ?? 70));
        bud(add(bp, mul(dir, 0.8)), dir, b.size, b.color);
      });
    const flowersOut = [];
    plan.flowers
      .slice()
      .reverse()
      .forEach((f, k) => {
        const { p: fp, t } = at(f.s);
        const side = f.side ?? (k % 2 ? 1 : -1);
        const dir = rot(t, side * deg(f.angle ?? 62));
        const fc = add(fp, mul(dir, f.ped));
        const pedMid = add(lerp(fp, fc, 0.5), mul(perp(dir), side * 1.5));
        begin("pedicel");
        greenStem(resample(spline([fp, pedMid, fc]), 1), 1.8, COLORS.green[1]);
        inkStroke([fp, pedMid, lerp(fp, fc, 0.72)], {
          w: 0.85,
          tin: 1,
          tout: 3,
        });
        flowersOut.unshift(
          flower(fc, f.R, {
            tilt: f.tilt ?? 1,
            tiltDir: Math.atan2(dir[1], dir[0]) + Math.PI / 2,
            rotation: f.rot ?? rnd(0, 6.28),
            stalkDir: mul(dir, -1),
          }),
        );
      });
    return { line, flowers: flowersOut };
  }
  function leaf(base, angle, length, width, o = {}) {
    const {
      bend = 0.12,
      color = COLORS.green[0],
      twist = 0,
      pencil = true,
    } = o;
    begin("leaf");
    const tip = polar(base, length, angle);
    const dir = norm(sub(tip, base));
    const ctrl = add(lerp(base, tip, 0.5), mul(perp(dir), bend * length));
    const N = 48;
    const rib = [];
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      rib.push(lerp(lerp(base, ctrl, t), lerp(ctrl, tip, t), t));
    }
    const prof = (t) =>
      width *
      Math.pow(Math.sin(Math.PI * Math.pow(t, 0.78)), 0.8) *
      (0.55 + 0.45 * Math.min(1, t / 0.12));
    const asym = rnd(0.88, 1.08);
    const left = [];
    const right = [];
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      const pa = rib[Math.max(0, i - 1)];
      const pb = rib[Math.min(N, i + 1)];
      const nr = perp(norm(sub(pb, pa)));
      const tw = twist ? 1 - twist * Math.max(0, (t - 0.45) / 0.55) : 1;
      left.push(add(rib[i], mul(nr, (prof(t) / 2) * asym * tw)));
      right.push(sub(rib[i], mul(nr, prof(t) / 2 / asym)));
    }
    const centerPt = lerp(base, tip, 0.5);
    const leftOut = norm(sub(left[N >> 1], rib[N >> 1]));
    const shadeLeft = dot(leftOut, SHADE) > 0;
    const off = [rnd(-1, 1.5), rnd(-1, 1.5)];
    const outline = [...left, ...right.slice().reverse()];
    knockout(outline.filter((_, i) => i % 3 === 0));
    wash(
      deform(
        outline.filter((_, i) => i % 3 === 0).map((p) => add(p, off)),
        1,
        0.04,
      ),
      color,
      "wash",
      { opacity: 0.88 },
    );
    const half = shadeLeft ? left : right;
    const shade = [
      ...rib.slice(4, N - 3),
      ...half.slice(6, N - 4).reverse(),
    ].map((p) => add(p, off));
    wash(
      shade.filter((_, i) => i % 3 === 0),
      COLORS.greenDark,
      "glaze",
      { opacity: 0.45 },
    );
    const litHalf = shadeLeft ? right : left;
    const pool = [
      ...rib.slice(10, N - 12),
      ...litHalf
        .slice(12, N - 14)
        .reverse()
        .map((p, i) => lerp(p, rib[Math.min(N, N - 14 - i)], 0.45)),
    ];
    wash(
      pool.filter((_, i) => i % 3 === 0),
      "#cbd39a",
      "wash",
      { opacity: 0.35 },
    );
    const lwid = Math.max(0.9, width * 0.04);
    inkStroke(
      left.filter((_, i) => i % 2 === 0),
      { w: lwid, tin: 3, tout: 10, center: centerPt },
    );
    const over = add(tip, mul(dir, rnd(1.5, 3)));
    inkStroke([...right.filter((_, i) => i % 2 === 0 && i < N - 1), over], {
      w: lwid * 0.92,
      tin: 3,
      tout: 8,
      center: centerPt,
    });
    inkStroke(rib.slice(2, Math.round(N * 0.82)), {
      w: lwid * 0.55,
      tin: 2,
      tout: 14,
      raw: true,
      layer: "fine",
    });
    for (let k = 0; k < 4; k++) {
      const t = 0.25 + k * 0.15;
      const i = Math.round(t * N);
      const sideArr = k % 2 ? left : right;
      const p0 = rib[i];
      const p1 = lerp(
        rib[Math.min(N, i + 5)],
        sideArr[Math.min(N, i + 5)],
        0.75,
      );
      inkStroke([p0, lerp(p0, p1, 0.5), p1], {
        w: 0.45,
        tin: 1,
        tout: 4,
        layer: "fine",
        opacity: 0.5,
      });
    }
    [left, right].forEach((edge, e) => {
      for (let i = 4; i < N - 3; i += Math.round(rnd(3, 5))) {
        const p = edge[i];
        const tng = norm(sub(edge[i + 1], edge[i - 1]));
        const outward = e === 0 ? perp(tng) : mul(perp(tng), -1);
        const dirH = norm(add(mul(tng, 1.4), outward));
        inkStroke([add(p, mul(outward, 0.3)), add(p, mul(dirH, rnd(1.6, 3)))], {
          w: 0.38,
          tin: 0.4,
          tout: 1.2,
          minW: 0.12,
          layer: "fine",
        });
      }
    });
    if (pencil)
      pencilLine(
        left
          .filter((_, i) => i % 8 === 0)
          .map((p) => add(p, [rnd(-2, 2), rnd(-2.5, 1)])),
        { opacity: 0.28, w: 0.8, jitter: 0.8 },
      );
    return { tip, base };
  }
  // a pencil arrow for a note
  function arrow(from, to, bendAmt = 0.18, o = {}) {
    const { opacity = 0.6, head = 7 } = o;
    begin("arrow");
    const d = sub(to, from);
    const mid = add(lerp(from, to, 0.5), mul(perp(norm(d)), len(d) * bendAmt));
    pencilLine([from, mid, to], { opacity, w: 0.95, jitter: 0.25 });
    const back = norm(sub(mid, to));
    pencilLine([add(to, mul(rot(back, deg(28)), head)), to], {
      opacity,
      w: 0.95,
      jitter: 0.1,
    });
    pencilLine([to, add(to, mul(rot(back, deg(-30)), head))], {
      opacity,
      w: 0.95,
      jitter: 0.1,
    });
  }

  function toSVG(defs = "") {
    const group = (items, attrs) =>
      items.length ? `<g ${attrs}>${items.join("")}</g>` : "";
    const body = objects
      .map(
        (o) =>
          `<g${o.clip ? ` clip-path="url(#${o.clip})"` : ""}>${group(o.knock, 'fill="#fff"')}${group(o.pencil, 'filter="url(#graphite)"')}${group(o.wash, 'filter="url(#wash)"')}${group(o.glaze, 'filter="url(#wash)" style="mix-blend-mode:multiply"')}${group(o.yellow, 'filter="url(#wash)"')}${group([...o.ink, ...o.fine, ...o.dots], 'filter="url(#ink)" opacity="0.93"')}</g>`,
      )
      .join("\n");
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
<defs>
  <filter id="graphite" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="1.3" numOctaves="2" seed="4" result="g"/>
    <feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  2.4 0 0 0 -0.55" result="ga"/>
    <feComposite in="SourceGraphic" in2="ga" operator="in"/>
  </filter>
  <filter id="wash" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="3" seed="11" result="warp"/>
    <feDisplacementMap in="SourceGraphic" in2="warp" scale="5" xChannelSelector="R" yChannelSelector="G" result="shape"/>
    <feGaussianBlur in="shape" stdDeviation="0.45" result="soft"/>
    <feMorphology in="soft" operator="erode" radius="1.3" result="inner"/>
    <feGaussianBlur in="inner" stdDeviation="1.8" result="innerSoft"/>
    <feComposite in="soft" in2="innerSoft" operator="out" result="rim"/>
    <feColorMatrix in="soft" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.5 0" result="body"/>
    <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="7" result="mot"/>
    <feColorMatrix in="mot" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.6 0 0 0 -0.35" result="motA"/>
    <feComposite in="body" in2="motA" operator="in" result="mottled"/>
    <feColorMatrix in="rim" type="matrix" values="0.85 0 0 0 0  0 0.85 0 0 0  0 0 0.9 0 0  0 0 0 0.62 0" result="rimDark"/>
    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" seed="9" result="gr"/>
    <feColorMatrix in="gr" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  4 0 0 0 -2.3" result="grA"/>
    <feComposite in="soft" in2="grA" operator="in" result="grain"/>
    <feColorMatrix in="grain" type="matrix" values="0.7 0 0 0 0  0 0.7 0 0 0  0 0 0.75 0 0  0 0 0 0.35 0" result="grainDark"/>
    <feMerge><feMergeNode in="body"/><feMergeNode in="mottled"/><feMergeNode in="rimDark"/><feMergeNode in="grainDark"/></feMerge>
  </filter>
  <filter id="ink" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="0.9" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
  ${defs}
</defs>
${body}
</svg>`;
  }

  return {
    rand,
    rnd,
    gauss,
    begin,
    get cur() {
      return cur;
    },
    LIGHT,
    SHADE,
    deform,
    inkStroke,
    inkLine,
    pencilLine,
    wash,
    knockout,
    contourStrokes,
    hatch,
    flower,
    bud,
    hairs,
    greenStem,
    cyme,
    leaf,
    arrow,
    toSVG,
  };
}

/**
// 1st animation:

import type paper from "paper";

type MotionPreferences = {
  coarsePointer: boolean;
  reducedMotion: boolean;
};

type HeroPhaseFieldController = {
  destroy: () => void;
  resize: (width: number, height: number) => void;
  setMotionPreferences: (preferences: MotionPreferences) => void;
};

type RingPoint = paper.Point & {
  origAngle: number;
  origDist: number;
};

const DESKTOP_RING_COUNT = 12;
const COMPACT_RING_COUNT = 10;
const DESKTOP_SEGMENT_COUNT = 72;
const COMPACT_SEGMENT_COUNT = 60;
const INNER_RADIUS_RATIO = 0.17;
const OUTER_RADIUS_RATIO = 0.46;
const NOISE_AMPLITUDE = 18;
const OPTIMIZER_RADIUS = 2.5;
const CENTER_RESET_RADIUS = 10;

function createRingColor(scope: paper.PaperScope) {
  return new scope.Color(0, 1, 100 / 255, 0.25);
}

function createOptimizer(scope: paper.PaperScope) {
  return new scope.Path.Circle({
    center: scope.view.center,
    radius: OPTIMIZER_RADIUS,
    fillColor: "#00ff66",
    strokeColor: null,
    shadowColor: new scope.Color("#00ff66"),
    shadowBlur: 10,
  });
}

function computeNoise(angle: number, dist: number, time: number) {
  return Math.sin(angle * 4 + time * 0.4) * Math.cos(dist * 0.02 - time * 0.2);
}

export function createHeroPhaseField(
  scope: paper.PaperScope,
  canvas: HTMLCanvasElement,
  initialPreferences: MotionPreferences
): HeroPhaseFieldController {
  scope.setup(canvas);

  const view = scope.view;
  view.autoUpdate = false;

  const rings: paper.Path[] = [];

  let preferences = { ...initialPreferences };
  let optimizer = createOptimizer(scope);
  let optimizerProgress = 0;
  let outermostRadius = 0;
  let compact = false;

  const clearScene = () => {
    while (rings.length > 0) {
      rings.pop()?.remove();
    }

    optimizer.remove();
  };

  const buildRings = () => {
    clearScene();

    compact = preferences.coarsePointer || view.bounds.width < 320 || view.bounds.height < 320;

    const ringCount = compact ? COMPACT_RING_COUNT : DESKTOP_RING_COUNT;
    const segmentCount = compact ? COMPACT_SEGMENT_COUNT : DESKTOP_SEGMENT_COUNT;
    const minDimension = Math.min(view.bounds.width, view.bounds.height);
    const innerRadius = minDimension * INNER_RADIUS_RATIO;
    const outerRadius = minDimension * OUTER_RADIUS_RATIO;
    const radiusStep = (outerRadius - innerRadius) / Math.max(ringCount - 1, 1);
    const ringColor = createRingColor(scope);
    const center = view.center;

    outermostRadius = outerRadius;
    optimizerProgress = 0;

    for (let ringIndex = 0; ringIndex < ringCount; ringIndex += 1) {
      const radius = innerRadius + radiusStep * ringIndex;
      const path = new scope.Path.Circle({
        center,
        radius,
        strokeColor: ringColor.clone(),
        strokeWidth: 1,
        fillColor: null,
      });
      const pathLength = path.length;
      const sampledPoints: paper.Point[] = [];

      for (let segmentIndex = 0; segmentIndex < segmentCount; segmentIndex += 1) {
        const point = path.getPointAt((pathLength * segmentIndex) / segmentCount);

        if (point) {
          sampledPoints.push(point.clone());
        }
      }

      path.removeSegments();
      sampledPoints.forEach((point) => path.add(point));
      path.closed = true;
      path.strokeCap = "round";
      path.strokeJoin = "round";
      path.smooth({ type: "continuous" });

      path.segments.forEach((segment) => {
        const point = segment.point as RingPoint;
        const dx = point.x - center.x;
        const dy = point.y - center.y;

        point.origAngle = Math.atan2(dy, dx);
        point.origDist = Math.hypot(dx, dy);
      });

      rings.push(path);
    }

    optimizer = createOptimizer(scope);
  };

  const renderFrame = (time: number, progress: number) => {
    const center = view.center;

    rings.forEach((path) => {
      path.segments.forEach((segment) => {
        const point = segment.point as RingPoint;
        const noise = computeNoise(point.origAngle, point.origDist, time);
        const offset = noise * NOISE_AMPLITUDE;
        const currentRadius = point.origDist + offset;

        segment.point.x = center.x + Math.cos(point.origAngle) * currentRadius;
        segment.point.y = center.y + Math.sin(point.origAngle) * currentRadius;
      });

      path.smooth({ type: "continuous" });
    });

    const spiralTurns = compact ? 1.75 : 2.2;
    const particleAngle = -Math.PI / 2 + progress * Math.PI * 2 * spiralTurns;
    const particleRadius = outermostRadius - progress * (outermostRadius - CENTER_RESET_RADIUS);
    const particleNoise = computeNoise(particleAngle, particleRadius, time);
    const particleOffset = particleNoise * NOISE_AMPLITUDE;
    const currentRadius = particleRadius + particleOffset;

    optimizer.position.set(
      center.x + Math.cos(particleAngle) * currentRadius,
      center.y + Math.sin(particleAngle) * currentRadius
    );

    view.update();
  };

  const renderStaticFrame = () => {
    renderFrame(0, 0.34);
  };

  const animateFrame = (event: { time: number }) => {
    optimizerProgress += compact ? 0.0016 : 0.002;

    const particleRadius = outermostRadius - optimizerProgress * (outermostRadius - CENTER_RESET_RADIUS);

    if (particleRadius <= CENTER_RESET_RADIUS) {
      optimizerProgress = 0;
    }

    renderFrame(event.time, optimizerProgress);
  };

  const refreshAnimation = () => {
    buildRings();

    if (preferences.reducedMotion) {
      view.onFrame = null;
      view.pause();
      renderStaticFrame();
    } else {
      view.onFrame = animateFrame;
      view.play();
      renderFrame(0, optimizerProgress);
    }
  };

  refreshAnimation();

  return {
    destroy() {
      view.onFrame = null;
      view.pause();
      clearScene();
      view.remove();
    },
    resize(nextWidth, nextHeight) {
      const width = Math.max(0, Math.floor(nextWidth));
      const height = Math.max(0, Math.floor(nextHeight));

      if (width === 0 || height === 0) {
        return;
      }

      view.viewSize = new scope.Size(width, height);
      refreshAnimation();
    },
    setMotionPreferences(nextPreferences) {
      preferences = { ...nextPreferences };
      refreshAnimation();
    },
  };
}

export type { HeroPhaseFieldController, MotionPreferences };
*/

import type paper from "paper";

type MotionPreferences = {
  coarsePointer: boolean;
  reducedMotion: boolean;
};

type HeroPhaseFieldController = {
  destroy: () => void;
  resize: (width: number, height: number) => void;
  setMotionPreferences: (preferences: MotionPreferences) => void;
};

type GridLineState = {
  fixedCoord: number;
  path: paper.Path;
};

type TrailPoint = {
  x: number;
  y: number;
  z: number;
};

type Projection = {
  point: paper.Point;
};

const DESKTOP_GRID_SIZE = 28;
const COMPACT_GRID_SIZE = 22;
const EXTENT = 20;
const LEARNING_RATE = 0.08;
const MOMENTUM = 0.85;
const MAX_TRAIL_POINTS = 40;
const RESET_SPEED_THRESHOLD = 0.01;
const RESET_FRAME_THRESHOLD = 150;

function landscape(x: number, y: number) {
  const bowl = (x * x + y * y) * 0.15;
  const waves = Math.sin(x * 0.5) * Math.cos(y * 0.5) * 25;
  const bump = Math.sin(x * 1.2 + y * 0.8) * 5;

  return bowl + waves + bump;
}

export function createHeroPhaseField(
  scope: paper.PaperScope,
  canvas: HTMLCanvasElement,
  initialPreferences: MotionPreferences
): HeroPhaseFieldController {
  scope.setup(canvas);

  const view = scope.view;
  view.autoUpdate = false;

  const xLines: GridLineState[] = [];
  const yLines: GridLineState[] = [];
  const particleHistory: TrailPoint[] = [];

  let preferences = { ...initialPreferences };
  let compact = false;
  let gridSize = DESKTOP_GRID_SIZE;
  let step = (EXTENT * 2) / gridSize;
  let center = new scope.Point(view.bounds.width * 0.7, view.bounds.height * 0.5);
  let rotAngle = 0;
  let pX = 18;
  let pY = -18;
  let vX = 0;
  let vY = 0;
  let trail: paper.Path | null = null;
  let dot: paper.Path | null = null;

  const project3D = (x: number, y: number, z: number, angle: number): Projection => {
    const rx = x * Math.cos(angle) - y * Math.sin(angle);
    const ry = x * Math.sin(angle) + y * Math.cos(angle);
    const minDimension = Math.min(view.bounds.width, view.bounds.height);
    const scaleX = compact ? minDimension * 0.042 : minDimension * 0.048;
    const scaleY = compact ? minDimension * 0.018 : minDimension * 0.021;
    const scaleZ = compact ? minDimension * 0.0054 : minDimension * 0.0059;
    const verticalOffset = compact ? minDimension * 0.18 : minDimension * 0.22;
    const screenX = center.x + rx * scaleX;
    const screenY = center.y + ry * scaleY - z * scaleZ + verticalOffset;

    return {
      point: new scope.Point(screenX, screenY),
    };
  };

  const clearScene = () => {
    while (xLines.length > 0) {
      xLines.pop()?.path.remove();
    }

    while (yLines.length > 0) {
      yLines.pop()?.path.remove();
    }

    trail?.remove();
    trail = null;

    dot?.remove();
    dot = null;

    particleHistory.length = 0;
  };

  const resetParticle = () => {
    pX = (Math.random() > 0.5 ? 1 : -1) * (12 + Math.random() * 8);
    pY = (Math.random() > 0.5 ? 1 : -1) * (12 + Math.random() * 8);
    vX = 0;
    vY = 0;
    particleHistory.length = 0;
  };

  const buildGrid = () => {
    clearScene();

    compact = preferences.coarsePointer || view.bounds.width < 320 || view.bounds.height < 320;
    gridSize = compact ? COMPACT_GRID_SIZE : DESKTOP_GRID_SIZE;
    step = (EXTENT * 2) / gridSize;
    center = new scope.Point(view.bounds.width * 0.7, view.bounds.height * 0.5);
    rotAngle = 0;
    pX = 18;
    pY = -18;
    vX = 0;
    vY = 0;

    const lineColor = new scope.Color(0, 1, 100 / 255, 0.25);
    const pointCount = gridSize + 1;

    for (let yIndex = 0; yIndex <= gridSize; yIndex += 1) {
      const yCoord = -EXTENT + yIndex * step;
      const path = new scope.Path({
        strokeColor: lineColor.clone(),
        strokeWidth: 1,
        strokeCap: "round",
        strokeJoin: "round",
        fillColor: null,
      });

      for (let xIndex = 0; xIndex < pointCount; xIndex += 1) {
        path.add(new scope.Point(0, 0));
      }

      xLines.push({ path, fixedCoord: yCoord });
      path.sendToBack();
    }

    for (let xIndex = 0; xIndex <= gridSize; xIndex += 1) {
      const xCoord = -EXTENT + xIndex * step;
      const path = new scope.Path({
        strokeColor: lineColor.clone(),
        strokeWidth: 1,
        strokeCap: "round",
        strokeJoin: "round",
        fillColor: null,
      });

      for (let yIndex = 0; yIndex < pointCount; yIndex += 1) {
        path.add(new scope.Point(0, 0));
      }

      yLines.push({ path, fixedCoord: xCoord });
      path.sendToBack();
    }

    trail = new scope.Path({
      strokeColor: new scope.Color(0, 1, 100 / 255, 0.9),
      strokeWidth: compact ? 1.75 : 2,
      strokeCap: "round",
      strokeJoin: "round",
      shadowColor: new scope.Color("#00ff66"),
      shadowBlur: compact ? 4 : 5,
      fillColor: null,
    });

    dot = new scope.Path.Circle({
      radius: compact ? 3.5 : 4,
      fillColor: "#00ff66",
      strokeColor: null,
      shadowColor: new scope.Color("#00ff66"),
      shadowBlur: compact ? 12 : 15,
    });
  };

  const renderWireframe = () => {
    for (const line of xLines) {
      let pointIndex = 0;

      for (let xIndex = 0; xIndex <= gridSize; xIndex += 1) {
        const xCoord = -EXTENT + xIndex * step;
        const z = landscape(xCoord, line.fixedCoord);
        const projection = project3D(xCoord, line.fixedCoord, z, rotAngle);

        line.path.segments[pointIndex].point = projection.point;
        pointIndex += 1;
      }

      line.path.smooth({ type: "continuous" });
    }

    for (const line of yLines) {
      let pointIndex = 0;

      for (let yIndex = 0; yIndex <= gridSize; yIndex += 1) {
        const yCoord = -EXTENT + yIndex * step;
        const z = landscape(line.fixedCoord, yCoord);
        const projection = project3D(line.fixedCoord, yCoord, z, rotAngle);

        line.path.segments[pointIndex].point = projection.point;
        pointIndex += 1;
      }

      line.path.smooth({ type: "continuous" });
    }
  };

  const updateOptimizer = (frameCount: number) => {
    if (!trail || !dot) {
      return;
    }

    const h = 0.01;
    const dx = (landscape(pX + h, pY) - landscape(pX - h, pY)) / (2 * h);
    const dy = (landscape(pX, pY + h) - landscape(pX, pY - h)) / (2 * h);

    vX = vX * MOMENTUM - dx * LEARNING_RATE;
    vY = vY * MOMENTUM - dy * LEARNING_RATE;
    pX += vX;
    pY += vY;

    if (Math.abs(vX) < RESET_SPEED_THRESHOLD && Math.abs(vY) < RESET_SPEED_THRESHOLD && frameCount > RESET_FRAME_THRESHOLD) {
      resetParticle();
    }

    const pZ = landscape(pX, pY);
    const dotProjection = project3D(pX, pY, pZ, rotAngle);

    dot.position = dotProjection.point;

    particleHistory.push({ x: pX, y: pY, z: pZ });

    if (particleHistory.length > MAX_TRAIL_POINTS) {
      particleHistory.shift();
    }

    trail.removeSegments();

    for (const historyPoint of particleHistory) {
      const historyProjection = project3D(historyPoint.x, historyPoint.y, historyPoint.z, rotAngle);
      trail.add(historyProjection.point);
    }
  };

  const renderFrame = (frameCount: number, animate: boolean) => {
    if (animate) {
      rotAngle += compact ? 0.0024 : 0.003;
      updateOptimizer(frameCount);
    } else if (dot) {
      const pZ = landscape(pX, pY);
      dot.position = project3D(pX, pY, pZ, rotAngle).point;
    }

    renderWireframe();
    view.update();
  };

  const refreshAnimation = () => {
    buildGrid();

    if (preferences.reducedMotion) {
      view.onFrame = null;
      view.pause();
      renderFrame(0, false);
      return;
    }

    view.onFrame = (event: { count: number }) => {
      renderFrame(event.count, true);
    };

    view.play();
    renderFrame(0, true);
  };

  refreshAnimation();

  return {
    destroy() {
      view.onFrame = null;
      view.pause();
      clearScene();
      view.remove();
    },
    resize(nextWidth, nextHeight) {
      const width = Math.max(0, Math.floor(nextWidth));
      const height = Math.max(0, Math.floor(nextHeight));

      if (width === 0 || height === 0) {
        return;
      }

      view.viewSize = new scope.Size(width, height);
      refreshAnimation();
    },
    setMotionPreferences(nextPreferences) {
      preferences = { ...nextPreferences };
      refreshAnimation();
    },
  };
}

export type { HeroPhaseFieldController, MotionPreferences };

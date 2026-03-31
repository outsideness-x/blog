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
  baseAngle: number;
  baseDist: number;
  origX: number;
  origY: number;
};

const DESKTOP_RING_COUNT = 12;
const COMPACT_RING_COUNT = 10;
const DESKTOP_SEGMENT_COUNT = 72;
const COMPACT_SEGMENT_COUNT = 64;

function createStrokeColor(scope: paper.PaperScope) {
  return new scope.Color(0, 1, 100 / 255, 0.4);
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
  let compact = false;

  const clearRings = () => {
    while (rings.length > 0) {
      rings.pop()?.remove();
    }
  };

  const buildRings = () => {
    clearRings();

    const ringCount = compact ? COMPACT_RING_COUNT : DESKTOP_RING_COUNT;
    const segmentCount = compact ? COMPACT_SEGMENT_COUNT : DESKTOP_SEGMENT_COUNT;
    const minDimension = Math.min(view.bounds.width, view.bounds.height);
    const baseRadius = minDimension * (compact ? 0.085 : 0.09);
    const maxRadius = minDimension * (compact ? 0.43 : 0.46);
    const radiusStep = (maxRadius - baseRadius) / Math.max(1, ringCount - 1);

    for (let ringIndex = 0; ringIndex < ringCount; ringIndex += 1) {
      const radius = baseRadius + radiusStep * ringIndex;
      const path = new scope.Path.Circle({
        center: view.center,
        radius,
        strokeColor: createStrokeColor(scope),
        strokeWidth: 1,
        fillColor: null,
      });
      const originalLength = path.length;
      const sampledPoints: paper.Point[] = [];

      for (let segmentIndex = 0; segmentIndex < segmentCount; segmentIndex += 1) {
        const sampledPoint = path.getPointAt((originalLength * segmentIndex) / segmentCount);

        if (sampledPoint) {
          sampledPoints.push(sampledPoint.clone());
        }
      }

      path.removeSegments();

      sampledPoints.forEach((point) => {
        path.add(point);
      });

      path.closed = true;
      path.strokeCap = "round";
      path.strokeJoin = "round";
      path.smooth({ type: "continuous" });
      path.data = { ringIndex };

      path.segments.forEach((segment) => {
        const point = segment.point as RingPoint;
        const dx = point.x - view.center.x;
        const dy = point.y - view.center.y;

        point.origX = point.x;
        point.origY = point.y;
        point.baseAngle = Math.atan2(dy, dx);
        point.baseDist = Math.hypot(dx, dy);
      });

      rings.push(path);
    }
  };

  const renderFrame = (time: number) => {
    const centerX = view.center.x;
    const centerY = view.center.y;

    rings.forEach((path, ringIndex) => {
      const ringPhase = ringIndex * 0.22;
      const ringBreath = Math.sin(time * 0.16 + ringPhase) * 2.6;
      const amplitude = (compact ? 7.5 : 10.5) + ringBreath;

      path.segments.forEach((segment) => {
        const point = segment.point as RingPoint;
        const angle = point.baseAngle;
        const dist = point.baseDist;
        const offset =
          Math.sin(angle * 3 + time * 0.5 + ringPhase) *
            Math.cos(dist * 0.05 - time * 0.2) *
            amplitude +
          Math.sin(angle * 1.5 - time * 0.24 + ringPhase * 0.6) * amplitude * 0.22;
        const radialX = Math.cos(angle);
        const radialY = Math.sin(angle);

        segment.point.x = point.origX + radialX * offset;
        segment.point.y = point.origY + radialY * offset;
      });

      path.smooth({ type: "continuous" });
    });

    view.update();
  };

  const refreshAnimation = () => {
    compact = preferences.coarsePointer || view.bounds.width < 320 || view.bounds.height < 320;

    buildRings();

    if (preferences.reducedMotion) {
      view.onFrame = null;
      view.pause();
      renderFrame(0);
    } else {
      view.onFrame = (event: { time: number }) => {
        renderFrame(event.time);
      };
      view.play();
      renderFrame(0);
    }
  };

  refreshAnimation();

  return {
    destroy() {
      view.onFrame = null;
      view.pause();
      clearRings();
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

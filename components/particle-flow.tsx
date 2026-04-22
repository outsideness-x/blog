"use client";

import { useEffect, useRef } from "react";

// ---------------------------------------------------------------------------
// 3D Gradient Noise (Perlin-style, from scratch)
// ---------------------------------------------------------------------------

const PERM = new Uint8Array(512);
const GRAD3 = [
  [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
  [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
  [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1],
];

// Seed permutation table once on module load
(function initPerm() {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  // Fisher-Yates shuffle with deterministic seed for reproducibility
  let seed = 42;
  for (let i = 255; i > 0; i--) {
    seed = (seed * 16807 + 0) % 2147483647;
    const j = seed % (i + 1);
    const tmp = p[i];
    p[i] = p[j];
    p[j] = tmp;
  }
  for (let i = 0; i < 512; i++) PERM[i] = p[i & 255];
})();

function fade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(a: number, b: number, t: number): number {
  return a + t * (b - a);
}

function dot3(g: number[], x: number, y: number, z: number): number {
  return g[0] * x + g[1] * y + g[2] * z;
}

function noise3d(x: number, y: number, z: number): number {
  const X = Math.floor(x) & 255;
  const Y = Math.floor(y) & 255;
  const Z = Math.floor(z) & 255;
  const xf = x - Math.floor(x);
  const yf = y - Math.floor(y);
  const zf = z - Math.floor(z);
  const u = fade(xf);
  const v = fade(yf);
  const w = fade(zf);

  const A  = PERM[X] + Y;
  const AA = PERM[A] + Z;
  const AB = PERM[A + 1] + Z;
  const B  = PERM[X + 1] + Y;
  const BA = PERM[B] + Z;
  const BB = PERM[B + 1] + Z;

  const g = GRAD3;
  return lerp(
    lerp(
      lerp(dot3(g[PERM[AA] % 12], xf, yf, zf),
           dot3(g[PERM[BA] % 12], xf - 1, yf, zf), u),
      lerp(dot3(g[PERM[AB] % 12], xf, yf - 1, zf),
           dot3(g[PERM[BB] % 12], xf - 1, yf - 1, zf), u), v),
    lerp(
      lerp(dot3(g[PERM[AA + 1] % 12], xf, yf, zf - 1),
           dot3(g[PERM[BA + 1] % 12], xf - 1, yf, zf - 1), u),
      lerp(dot3(g[PERM[AB + 1] % 12], xf, yf - 1, zf - 1),
           dot3(g[PERM[BB + 1] % 12], xf - 1, yf - 1, zf - 1), u), v),
    w,
  );
}

// 2-octave noise for smooth large-scale swirls
function noise(x: number, y: number, z: number): number {
  return noise3d(x, y, z) * 0.7 + noise3d(x * 2, y * 2, z * 2) * 0.3;
}

// ---------------------------------------------------------------------------
// Curl noise (2D curl of a 3D noise field)
// ---------------------------------------------------------------------------

function curl(x: number, y: number, z: number): { x: number; y: number } {
  const eps = 0.0001;
  const n1 = noise(x, y + eps, z) - noise(x, y - eps, z);
  const n2 = noise(x + eps, y, z) - noise(x - eps, y, z);
  return {
    x: n1 / (2 * eps),
    y: -n2 / (2 * eps),
  };
}

// ---------------------------------------------------------------------------
// Particle type
// ---------------------------------------------------------------------------

interface Particle {
  x: number;
  y: number;
  age: number;
  maxAge: number;
  size: number;
  color: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const PARTICLE_COUNT = 280;
const SPEED = 0.4;
const NOISE_SCALE = 0.0012;
const NOISE_Z_SPEED = 0.00008;
const BOUNDARY_MARGIN = 50;

function randomMaxAge(): number {
  return 280 + Math.floor(Math.random() * 41); // 280–320
}

function randomAlpha(): number {
  return 0.35 + Math.random() * 0.3; // 0.35–0.65
}

function randomColor(): string {
  const alpha = randomAlpha();
  if (Math.random() < 0.75) {
    // Terminal green #39FF14
    return `rgba(57, 255, 20, ${alpha})`;
  }
  // Neon pink #FF2D78
  return `rgba(255, 45, 120, ${alpha})`;
}

function randomSize(): number {
  return 0.8 + Math.random() * 0.8; // 0.8–1.6
}

function createParticle(w: number, h: number, stagger: boolean): Particle {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    age: stagger ? Math.floor(Math.random() * 320) : 0,
    maxAge: randomMaxAge(),
    size: randomSize(),
    color: randomColor(),
  };
}

function resetParticle(p: Particle, w: number, h: number): void {
  p.x = Math.random() * w;
  p.y = Math.random() * h;
  p.age = 0;
  p.maxAge = randomMaxAge();
  p.size = randomSize();
  // Keep same color — no flash on reset
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

type ParticleFlowProps = {
  className?: string;
};

export function ParticleFlow({ className }: ParticleFlowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let destroyed = false;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      canvas.style.background = "transparent";
      return;
    }

    // ---- Sizing ----
    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (w > 0 && h > 0) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    resize();

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    // ---- Initial background setup ----
    canvas.style.background = 'transparent';

    // ---- Particles ----
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle(canvas.width, canvas.height, true));
    }

    // ---- Animation state ----
    let zOffset = 0;
    let rafId = 0;

    function frame() {
      if (destroyed) return;
      if (!canvas || !ctx) return;

      const w = canvas.width;
      const h = canvas.height;

      // 1. Fade rect — ghostly trail mechanism (using destination-out for transparent canvas)
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(13, 13, 13, 0.022)";
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";

      // 2. Update and draw particles
      zOffset += NOISE_Z_SPEED;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Sample curl noise
        const c = curl(p.x * NOISE_SCALE, p.y * NOISE_SCALE, zOffset);
        p.x += c.x * SPEED;
        p.y += c.y * SPEED;
        p.age++;

        // Reset if aged out or out of bounds
        if (
          p.age > p.maxAge ||
          p.x < -BOUNDARY_MARGIN ||
          p.x > w + BOUNDARY_MARGIN ||
          p.y < -BOUNDARY_MARGIN ||
          p.y > h + BOUNDARY_MARGIN
        ) {
          resetParticle(p, w, h);
          continue; // Don't draw on reset frame
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      rafId = requestAnimationFrame(frame);
    }

    rafId = requestAnimationFrame(frame);

    // ---- Cleanup ----
    return () => {
      destroyed = true;
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        background: "transparent",
        border: "none",
        boxShadow: "none",
        borderRadius: 0,
        maskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, black 25%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, black 25%, transparent 75%)"
      }}
    />
  );
}

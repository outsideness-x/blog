"use client";

import { useEffect, useRef } from "react";

// ---------------------------------------------------------------------------
// Shader sources
// ---------------------------------------------------------------------------

const VERTEX_SHADER = `#version 300 es
in vec2 a_position;
out vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const SIMULATION_FRAGMENT = `#version 300 es
precision highp float;
uniform sampler2D u_state;
uniform vec2 u_resolution;
uniform float u_f;
uniform float u_k;
uniform float u_du;
uniform float u_dv;
uniform float u_dt;
in vec2 v_uv;
out vec4 fragColor;

void main() {
  vec2 texel = 1.0 / u_resolution;
  vec2 uv = v_uv;

  vec4 center = texture(u_state, uv);
  vec4 n  = texture(u_state, uv + vec2(0, texel.y));
  vec4 s  = texture(u_state, uv - vec2(0, texel.y));
  vec4 e  = texture(u_state, uv + vec2(texel.x, 0));
  vec4 w  = texture(u_state, uv - vec2(texel.x, 0));
  vec4 ne = texture(u_state, uv + texel);
  vec4 nw = texture(u_state, uv + vec2(-texel.x, texel.y));
  vec4 se = texture(u_state, uv + vec2(texel.x, -texel.y));
  vec4 sw = texture(u_state, uv - texel);

  vec2 laplacian = (
    -1.0 * center.xy
    + 0.2 * (n.xy + s.xy + e.xy + w.xy)
    + 0.05 * (ne.xy + nw.xy + se.xy + sw.xy)
  );

  float u = center.x;
  float v = center.y;
  float uvv = u * v * v;

  float du = u_du * laplacian.x - uvv + u_f * (1.0 - u);
  float dv = u_dv * laplacian.y + uvv - (u_f + u_k) * v;

  fragColor = vec4(
    clamp(u + du * u_dt, 0.0, 1.0),
    clamp(v + dv * u_dt, 0.0, 1.0),
    0.0,
    1.0
  );
}
`;

const DISPLAY_FRAGMENT = `#version 300 es
precision highp float;
uniform sampler2D u_state;
in vec2 v_uv;
out vec4 fragColor;

void main() {
  float v = texture(u_state, v_uv).y;

  // Background: near-black #0D0D0D
  vec3 bg = vec3(0.051, 0.051, 0.051);

  // Foreground: terminal green #39FF14 (neon green)
  vec3 fg = vec3(0.224, 1.0, 0.078);

  // Smooth mapping: low V = background, high V = glowing green
  float t = smoothstep(0.1, 0.45, v);
  vec3 color = mix(bg, fg, t);

  // Subtle bloom: boost brightness at peak V
  color += fg * max(0.0, v - 0.4) * 1.4;

  fragColor = vec4(color, 1.0);
}
`;

// WebGL1 fallback shaders (no #version, use attribute/varying/texture2D)
const VERTEX_SHADER_V1 = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const SIMULATION_FRAGMENT_V1 = `
precision highp float;
uniform sampler2D u_state;
uniform vec2 u_resolution;
uniform float u_f;
uniform float u_k;
uniform float u_du;
uniform float u_dv;
uniform float u_dt;
varying vec2 v_uv;

void main() {
  vec2 texel = 1.0 / u_resolution;
  vec2 uv = v_uv;

  vec4 center = texture2D(u_state, uv);
  vec4 n  = texture2D(u_state, uv + vec2(0, texel.y));
  vec4 s  = texture2D(u_state, uv - vec2(0, texel.y));
  vec4 e  = texture2D(u_state, uv + vec2(texel.x, 0));
  vec4 w  = texture2D(u_state, uv - vec2(texel.x, 0));
  vec4 ne = texture2D(u_state, uv + texel);
  vec4 nw = texture2D(u_state, uv + vec2(-texel.x, texel.y));
  vec4 se = texture2D(u_state, uv + vec2(texel.x, -texel.y));
  vec4 sw = texture2D(u_state, uv - texel);

  vec2 laplacian = (
    -1.0 * center.xy
    + 0.2 * (n.xy + s.xy + e.xy + w.xy)
    + 0.05 * (ne.xy + nw.xy + se.xy + sw.xy)
  );

  float u = center.x;
  float v = center.y;
  float uvv = u * v * v;

  float du = u_du * laplacian.x - uvv + u_f * (1.0 - u);
  float dv = u_dv * laplacian.y + uvv - (u_f + u_k) * v;

  gl_FragColor = vec4(
    clamp(u + du * u_dt, 0.0, 1.0),
    clamp(v + dv * u_dt, 0.0, 1.0),
    0.0,
    1.0
  );
}
`;

const DISPLAY_FRAGMENT_V1 = `
precision highp float;
uniform sampler2D u_state;
varying vec2 v_uv;

void main() {
  float v = texture2D(u_state, v_uv).y;

  vec3 bg = vec3(0.051, 0.051, 0.051);
  vec3 fg = vec3(0.224, 1.0, 0.078);

  float t = smoothstep(0.1, 0.45, v);
  vec3 color = mix(bg, fg, t);
  color += fg * max(0.0, v - 0.4) * 1.4;

  gl_FragColor = vec4(color, 1.0);
}
`;

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SIM_SIZE = 512;
const STEPS_PER_FRAME = 8;
const PARAMS = {
  Du: 0.2097,
  Dv: 0.105,
  F: 0.054,
  K: 0.062,
  dt: 1.0,
} as const;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function compileShader(
  gl: WebGL2RenderingContext | WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("[RD] shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(
  gl: WebGL2RenderingContext | WebGLRenderingContext,
  vertSrc: string,
  fragSrc: string,
): WebGLProgram | null {
  const vs = compileShader(gl, gl.VERTEX_SHADER, vertSrc);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, fragSrc);
  if (!vs || !fs) return null;
  const prog = gl.createProgram();
  if (!prog) return null;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.bindAttribLocation(prog, 0, "a_position");
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error("[RD] program link error:", gl.getProgramInfoLog(prog));
    gl.deleteProgram(prog);
    return null;
  }
  // Shaders attached — safe to flag for deletion; they'll be freed when program is deleted
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  return prog;
}

function buildInitialData(): Float32Array {
  const data = new Float32Array(SIM_SIZE * SIM_SIZE * 4);
  // Fill with U=1, V=0
  for (let i = 0; i < SIM_SIZE * SIM_SIZE; i++) {
    data[i * 4] = 1.0; // U
    data[i * 4 + 1] = 0.0; // V
    data[i * 4 + 2] = 0.0;
    data[i * 4 + 3] = 1.0;
  }

  // Seed 12–18 small random square patches near center
  const seedCount = 12 + Math.floor(Math.random() * 7);
  const centerX = SIM_SIZE / 2;
  const centerY = SIM_SIZE / 2;
  const spreadRadius = SIM_SIZE * 0.15;

  for (let s = 0; s < seedCount; s++) {
    const patchSize = 4 + Math.floor(Math.random() * 5); // 4–8
    const ox = Math.floor(centerX + (Math.random() - 0.5) * 2 * spreadRadius);
    const oy = Math.floor(centerY + (Math.random() - 0.5) * 2 * spreadRadius);

    for (let dy = 0; dy < patchSize; dy++) {
      for (let dx = 0; dx < patchSize; dx++) {
        const px = ox + dx;
        const py = oy + dy;
        if (px >= 0 && px < SIM_SIZE && py >= 0 && py < SIM_SIZE) {
          const idx = (py * SIM_SIZE + px) * 4;
          data[idx] = 0.5; // U
          data[idx + 1] = 0.25; // V
        }
      }
    }
  }

  return data;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

type ReactionDiffusionProps = {
  className?: string;
};

export function ReactionDiffusion({ className }: ReactionDiffusionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;


    // Guard for StrictMode double-invoke: if a previous effect already created
    // a context on this canvas, we can reclaim it (getContext returns the same
    // context if the type matches). We do NOT call loseContext() in cleanup
    // precisely to make this work.
    let destroyed = false;

    // ---- Context ----
    const contextOptions: WebGLContextAttributes = {
      preserveDrawingBuffer: false,
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
    };

    let gl: WebGL2RenderingContext | WebGLRenderingContext | null = null;
    let isWebGL2 = false;

    gl = canvas.getContext("webgl2", contextOptions) as WebGL2RenderingContext | null;
    if (gl) {
      isWebGL2 = true;
    } else {
      gl = canvas.getContext("webgl", contextOptions) as WebGLRenderingContext | null;
    }


    if (!gl) {
      console.error("[RD] WebGL not available — falling back to static bg");
      canvas.style.backgroundColor = "#0D0D0D";
      return;
    }

    // ---- Float texture support ----
    if (isWebGL2) {
      // Required for rendering to RGBA32F framebuffers in WebGL2
      const cbFloat = gl.getExtension("EXT_color_buffer_float");
      if (!cbFloat) {
        // Fallback: try WebGL1 path — note: cannot call getContext("webgl")
        // on a canvas that already has a webgl2 context. Instead just bail.
        console.error("[RD] EXT_color_buffer_float not available, cannot render to float FBO");
        canvas.style.backgroundColor = "#0D0D0D";
        return;
      }
    }

    if (!isWebGL2) {
      const floatExt = gl.getExtension("OES_texture_float");
      if (!floatExt) {
        console.error("[RD] OES_texture_float not available");
        canvas.style.backgroundColor = "#0D0D0D";
        return;
      }
      gl.getExtension("OES_texture_float_linear");
    }

    // ---- Choose shader sources ----
    const vertSrc = isWebGL2 ? VERTEX_SHADER : VERTEX_SHADER_V1;
    const simFragSrc = isWebGL2 ? SIMULATION_FRAGMENT : SIMULATION_FRAGMENT_V1;
    const dispFragSrc = isWebGL2 ? DISPLAY_FRAGMENT : DISPLAY_FRAGMENT_V1;

    // ---- Programs ----
    const simProgram = createProgram(gl, vertSrc, simFragSrc);
    const dispProgram = createProgram(gl, vertSrc, dispFragSrc);


    if (!simProgram || !dispProgram) {
      console.error("[RD] Failed to create shader programs");
      canvas.style.backgroundColor = "#0D0D0D";
      return;
    }

    // ---- Fullscreen quad ----
    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );

    // ---- Create simulation textures and framebuffers ----
    const internalFormat = isWebGL2
      ? (gl as WebGL2RenderingContext).RGBA32F
      : gl.RGBA;
    const texType = gl.FLOAT;

    function createSimTexture(data: Float32Array | null): WebGLTexture | null {
      const tex = gl!.createTexture();
      gl!.bindTexture(gl!.TEXTURE_2D, tex);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.NEAREST);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.NEAREST);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.REPEAT);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.REPEAT);
      if (isWebGL2) {
        (gl as WebGL2RenderingContext).texImage2D(
          gl!.TEXTURE_2D,
          0,
          internalFormat as number,
          SIM_SIZE,
          SIM_SIZE,
          0,
          gl!.RGBA,
          texType,
          data,
        );
      } else {
        gl!.texImage2D(
          gl!.TEXTURE_2D,
          0,
          gl!.RGBA,
          SIM_SIZE,
          SIM_SIZE,
          0,
          gl!.RGBA,
          texType,
          data,
        );
      }
      return tex;
    }

    const initialData = buildInitialData();
    const texA = createSimTexture(initialData);
    const texB = createSimTexture(null);


    if (!texA || !texB) {
      console.error("[RD] Failed to create simulation textures");
      canvas.style.backgroundColor = "#0D0D0D";
      return;
    }

    const fbA = gl.createFramebuffer();
    const fbB = gl.createFramebuffer();

    gl.bindFramebuffer(gl.FRAMEBUFFER, fbA);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texA, 0);
    const fbAStatus = gl.checkFramebufferStatus(gl.FRAMEBUFFER);

    gl.bindFramebuffer(gl.FRAMEBUFFER, fbB);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texB, 0);
    const fbBStatus = gl.checkFramebufferStatus(gl.FRAMEBUFFER);

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    if (fbAStatus !== gl.FRAMEBUFFER_COMPLETE || fbBStatus !== gl.FRAMEBUFFER_COMPLETE) {
      console.error("[RD] Framebuffer incomplete — cannot run simulation");
      canvas.style.backgroundColor = "#0D0D0D";
      return;
    }

    // ---- Uniform locations ----
    const simUniforms = {
      u_state: gl.getUniformLocation(simProgram, "u_state"),
      u_resolution: gl.getUniformLocation(simProgram, "u_resolution"),
      u_f: gl.getUniformLocation(simProgram, "u_f"),
      u_k: gl.getUniformLocation(simProgram, "u_k"),
      u_du: gl.getUniformLocation(simProgram, "u_du"),
      u_dv: gl.getUniformLocation(simProgram, "u_dv"),
      u_dt: gl.getUniformLocation(simProgram, "u_dt"),
    };

    const dispUniforms = {
      u_state: gl.getUniformLocation(dispProgram, "u_state"),
    };

    // ---- State ----
    // pingpong: false → read A, write B; true → read B, write A
    let pingpong = false;
    let rafId = 0;

    // ---- Bind vertex attrib (same buffer for both programs) ----
    function setupAttrib() {
      gl!.bindBuffer(gl!.ARRAY_BUFFER, quadBuffer);
      gl!.enableVertexAttribArray(0);
      gl!.vertexAttribPointer(0, 2, gl!.FLOAT, false, 0, 0);
    }

    // ---- Simulation step ----
    function simulationStep() {
      const readTex = pingpong ? texB : texA;
      const writeFB = pingpong ? fbA : fbB;

      gl!.bindFramebuffer(gl!.FRAMEBUFFER, writeFB);
      gl!.viewport(0, 0, SIM_SIZE, SIM_SIZE);

      gl!.useProgram(simProgram);
      setupAttrib();

      gl!.activeTexture(gl!.TEXTURE0);
      gl!.bindTexture(gl!.TEXTURE_2D, readTex);
      gl!.uniform1i(simUniforms.u_state, 0);
      gl!.uniform2f(simUniforms.u_resolution, SIM_SIZE, SIM_SIZE);
      gl!.uniform1f(simUniforms.u_f, PARAMS.F);
      gl!.uniform1f(simUniforms.u_k, PARAMS.K);
      gl!.uniform1f(simUniforms.u_du, PARAMS.Du);
      gl!.uniform1f(simUniforms.u_dv, PARAMS.Dv);
      gl!.uniform1f(simUniforms.u_dt, PARAMS.dt);

      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);

      pingpong = !pingpong;
    }

    // ---- Display pass ----
    function displayPass() {
      const readTex = pingpong ? texB : texA;

      gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
      gl!.viewport(0, 0, canvas!.width, canvas!.height);

      gl!.useProgram(dispProgram);
      setupAttrib();

      gl!.activeTexture(gl!.TEXTURE0);
      gl!.bindTexture(gl!.TEXTURE_2D, readTex);
      gl!.uniform1i(dispUniforms.u_state, 0);

      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
    }

    // ---- Resize handler ----
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const dpr = window.devicePixelRatio || 1;
      const w = Math.floor(entry.contentRect.width * dpr);
      const h = Math.floor(entry.contentRect.height * dpr);
      if (w > 0 && h > 0 && canvas) {
        canvas.width = w;
        canvas.height = h;
      }
    });

    ro.observe(canvas);

    // ---- Animation loop with destroyed guard ----
    function frame() {
      if (destroyed) return; // StrictMode cleanup already ran — bail out
      if (!gl || gl.isContextLost()) {
        rafId = requestAnimationFrame(frame);
        return;
      }

      for (let i = 0; i < STEPS_PER_FRAME; i++) {
        simulationStep();
      }

      displayPass();
      rafId = requestAnimationFrame(frame);
    }

    // Initial canvas size — use fallback if clientWidth/Height are 0
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor((canvas.clientWidth || 512) * dpr);
    canvas.height = Math.floor((canvas.clientHeight || 512) * dpr);

    rafId = requestAnimationFrame(frame);

    // ---- Cleanup ----
    // IMPORTANT: Do NOT call WEBGL_lose_context.loseContext() here.
    // In React StrictMode (dev), useEffect runs twice on the same DOM node.
    // If we lose the context in the first cleanup, the second useEffect
    // invocation cannot re-acquire a context on the same canvas — getContext
    // returns null on a lost canvas. Instead, just delete GPU resources and
    // cancel the animation frame. The browser will GC the context when the
    // canvas element itself is removed from the DOM.
    return () => {
      destroyed = true;
      cancelAnimationFrame(rafId);
      ro.disconnect();

      if (gl && !gl.isContextLost()) {
        gl.deleteTexture(texA);
        gl.deleteTexture(texB);
        gl.deleteFramebuffer(fbA);
        gl.deleteFramebuffer(fbB);
        gl.deleteProgram(simProgram);
        gl.deleteProgram(dispProgram);
        gl.deleteBuffer(quadBuffer);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}

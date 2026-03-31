"use client";

import { useEffect, useRef } from "react";
import type paper from "paper";
import { createHeroPhaseField } from "@/lib/hero-phase-field";

type PaperModule = {
  PaperScope: new () => paper.PaperScope;
};

type PaperWindow = Window & {
  __paperCorePromise?: Promise<PaperModule>;
  paper?: PaperModule;
};

function bindMediaListener(query: MediaQueryList, listener: () => void) {
  if ("addEventListener" in query) {
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }

  const legacyQuery = query as MediaQueryList & {
    addListener: (callback: () => void) => void;
    removeListener: (callback: () => void) => void;
  };

  legacyQuery.addListener(listener);
  return () => legacyQuery.removeListener(listener);
}

function loadPaperCore() {
  const paperWindow = window as unknown as PaperWindow;

  if (paperWindow.paper) {
    return Promise.resolve(paperWindow.paper);
  }

  if (paperWindow.__paperCorePromise) {
    return paperWindow.__paperCorePromise;
  }

  paperWindow.__paperCorePromise = new Promise<PaperModule>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>('script[data-paper-core="true"]');

    const handleReady = () => {
      if (paperWindow.paper) {
        resolve(paperWindow.paper);
      } else {
        reject(new Error("Paper.js loaded without exposing window.paper"));
      }
    };

    if (existingScript) {
      if (existingScript.dataset.loaded === "true") {
        handleReady();
        return;
      }

      existingScript.addEventListener("load", handleReady, { once: true });
      existingScript.addEventListener("error", () => reject(new Error("Failed to load Paper.js")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");

    script.src = "/animations/paper-core.min.js";
    script.async = true;
    script.dataset.paperCore = "true";
    script.addEventListener(
      "load",
      () => {
        script.dataset.loaded = "true";
        handleReady();
      },
      { once: true }
    );
    script.addEventListener("error", () => reject(new Error("Failed to load Paper.js")), {
      once: true,
    });

    document.head.appendChild(script);
  });

  return paperWindow.__paperCorePromise;
}

export function HeroPhaseField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) {
      return;
    }

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");

    canvas.setAttribute("hidpi", coarsePointerQuery.matches ? "off" : "true");

    let isCancelled = false;
    let controller: ReturnType<typeof createHeroPhaseField> | null = null;

    const syncPreferences = () => {
      controller?.setMotionPreferences({
        coarsePointer: coarsePointerQuery.matches,
        reducedMotion: reducedMotionQuery.matches,
      });
    };

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];

      if (!entry) {
        return;
      }

      controller?.resize(entry.contentRect.width, entry.contentRect.height);
    });

    resizeObserver.observe(container);

    const removeReducedMotionListener = bindMediaListener(reducedMotionQuery, syncPreferences);
    const removeCoarsePointerListener = bindMediaListener(coarsePointerQuery, syncPreferences);

    void (async () => {
      const paper = await loadPaperCore();

      if (isCancelled) {
        return;
      }

      const scope = new paper.PaperScope();

      controller = createHeroPhaseField(scope, canvas, {
        coarsePointer: coarsePointerQuery.matches,
        reducedMotion: reducedMotionQuery.matches,
      });

      const rect = container.getBoundingClientRect();

      controller.resize(rect.width, rect.height);
    })();

    return () => {
      isCancelled = true;
      resizeObserver.disconnect();
      removeReducedMotionListener();
      removeCoarsePointerListener();
      controller?.destroy();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="relative aspect-square w-full"
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="block h-full w-full"
      />
    </div>
  );
}

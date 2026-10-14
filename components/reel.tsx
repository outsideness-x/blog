"use client";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { T, type Bilingual } from "./text";

export type ReelItem = {
  id: string;
  poster: string;
  /** A muted clip. Without one the poster is shown as a still. */
  video?: string;
  /** Seconds a still stays on screen. */
  duration?: number;
  title: Bilingual;
  text?: Bilingual;
};

function usePrefersStill() {
  const [still, setStill] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean };
    }).connection;
    const update = () => setStill(media.matches || Boolean(connection?.saveData));
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return still;
}

/**
 * Plays a list of clips one after another while the reel is on screen. It
 * starts paused for people who ask for reduced motion or less data, and any
 * click on an item or the toggle is an explicit request to play.
 */
export function useReel(items: ReelItem[], root: RefObject<HTMLElement>) {
  const still = usePrefersStill();
  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(true);
  const [visible, setVisible] = useState(false);
  const [seen, setSeen] = useState(false);
  const [started, setStarted] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const item = items[index];
  const active = running && visible;

  useEffect(() => {
    if (still) setRunning(false);
  }, [still]);

  // Clips are only fetched once the reel has actually played on screen.
  useEffect(() => {
    if (running && visible) setStarted(true);
  }, [running, visible]);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const shown = entry.isIntersecting && !document.hidden;
        setVisible(shown);
        if (shown) setSeen(true);
      },
      { threshold: 0.3 },
    );
    observer.observe(element);
    const onVisibility = () => {
      if (document.hidden) setVisible(false);
      else {
        const box = element.getBoundingClientRect();
        setVisible(box.bottom > 0 && box.top < window.innerHeight);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [root]);

  const next = useCallback(
    () => setIndex((current) => (current + 1) % items.length),
    [items.length],
  );

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    if (active) element.play().catch(() => {});
    else element.pause();
  }, [active, index, started]);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      let ratio = 0;
      if (item.video) {
        const element = video.current;
        if (element?.duration) ratio = element.currentTime / element.duration;
      } else {
        ratio = (now - start) / ((item.duration ?? 4) * 1000);
        if (ratio >= 1) {
          next();
          return;
        }
      }
      if (progress.current)
        progress.current.style.transform = `scaleX(${Math.min(ratio, 1)})`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, index, item, next]);

  return {
    index,
    item,
    running,
    seen: seen && started,
    video,
    progress,
    select: (i: number) => {
      setIndex(i);
      setRunning(true);
    },
    toggle: () => setRunning((current) => !current),
    onEnded: next,
  };
}

export function ReelScreen({
  item,
  seen,
  video,
  onEnded,
  sizes,
  priority = false,
}: {
  item: ReelItem;
  seen: boolean;
  video: RefObject<HTMLVideoElement>;
  onEnded: () => void;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <>
      <Image
        key={`poster-${item.id}`}
        className="reel-poster"
        src={item.poster}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
      />
      {seen && item.video && (
        <video
          key={item.id}
          ref={video}
          className="reel-video"
          src={item.video}
          poster={item.poster}
          muted
          playsInline
          preload="auto"
          onEnded={onEnded}
          aria-hidden="true"
        />
      )}
    </>
  );
}

export function Device({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`device ${className}`}>
      <div className="device-screen">{children}</div>
    </div>
  );
}

export function ReelToggle({
  running,
  onClick,
}: {
  running: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="reel-toggle"
      onClick={onClick}
      aria-label={running ? "Pause motion / Пауза" : "Play motion / Воспроизвести"}
    >
      {running ? (
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="M5 3v10M11 3v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="M5 3.5v9l7.5-4.5z" fill="currentColor" />
        </svg>
      )}
    </button>
  );
}

export function CaseReel({
  items,
  tone = "dark",
  label,
}: {
  items: ReelItem[];
  tone?: "dark" | "light";
  label: Bilingual;
}) {
  const root = useRef<HTMLDivElement>(null);
  const reel = useReel(items, root);
  return (
    <div className={`reel reel-${tone}`} ref={root}>
      <div className="reel-stage">
        <Device>
          <ReelScreen
            item={reel.item}
            seen={reel.seen}
            video={reel.video}
            onEnded={reel.onEnded}
            sizes="(max-width: 760px) 60vw, 320px"
          />
        </Device>
        <div className="reel-stage-bar">
          <span className="reel-label">
            <T {...label} />
          </span>
          <ReelToggle running={reel.running} onClick={reel.toggle} />
        </div>
      </div>
      <ol className="reel-list">
        {items.map((item, i) => (
          <li key={item.id}>
            <button
              type="button"
              aria-pressed={i === reel.index}
              onClick={() => reel.select(i)}
            >
              <span className="reel-index">0{i + 1}</span>
              <span className="reel-copy">
                <span className="reel-title">
                  <T {...item.title} />
                </span>
                {item.text && (
                  <span className="reel-text">
                    <span>
                      <T {...item.text} />
                    </span>
                  </span>
                )}
              </span>
              <span className="reel-progress" aria-hidden="true">
                <span
                  ref={i === reel.index ? reel.progress : undefined}
                  style={i === reel.index ? undefined : { transform: "scaleX(0)" }}
                />
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

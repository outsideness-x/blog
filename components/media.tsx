"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { T } from "./text";

/**
 * A muted loop that loads and plays only while it is on screen and starts
 * paused for reduced motion. Tapping it pauses or resumes.
 */
export function LoopVideo({
  src,
  poster,
  width,
  height,
  className = "",
  label,
}: {
  src: string;
  poster: string;
  width: number;
  height: number;
  className?: string;
  label?: string;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [running, setRunning] = useState(true);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      setRunning(false);
    const element = video.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (running && visible) setLoaded(true);
  }, [running, visible]);

  useEffect(() => {
    const element = video.current;
    if (!element || !loaded) return;
    if (running && visible) element.play().catch(() => {});
    else element.pause();
  }, [running, visible, loaded]);

  return (
    <button
      type="button"
      className={`loop-video ${running ? "" : "is-paused"} ${className}`}
      onClick={() => setRunning((on) => !on)}
      aria-pressed={!running}
      aria-label={`${label ? `${label}: ` : ""}${running ? "pause / пауза" : "play / воспроизвести"}`}
    >
      <video
        ref={video}
        src={loaded ? src : undefined}
        poster={poster}
        width={width}
        height={height}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
      />
      <span className="loop-video-state" aria-hidden="true">
        {running ? (
          <svg viewBox="0 0 16 16">
            <path d="M5 3v10M11 3v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16">
            <path d="M5 3.5v9l7.5-4.5z" fill="currentColor" />
          </svg>
        )}
      </span>
    </button>
  );
}

/** A short film with sound: nothing loads or plays until it is asked for. */
export function FilmPlayer({
  src,
  poster,
  width,
  height,
  title,
}: {
  src: string;
  poster: string;
  width: number;
  height: number;
  title: string;
}) {
  const [on, setOn] = useState(false);
  if (on)
    return (
      <video
        className="film-video"
        src={src}
        poster={poster}
        width={width}
        height={height}
        controls
        autoPlay
        playsInline
        aria-label={title}
      />
    );
  return (
    <button type="button" className="film-poster" onClick={() => setOn(true)}>
      <Image
        src={poster}
        alt={title}
        width={width}
        height={height}
        sizes="(max-width: 760px) 70vw, 300px"
      />
      <span className="film-play">
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="M5 3.5v9l7.5-4.5z" fill="currentColor" />
        </svg>
        <T en="Play with sound" ru="Смотреть со звуком" />
      </span>
    </button>
  );
}

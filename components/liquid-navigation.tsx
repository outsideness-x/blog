"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { LiquidGlass, type LiquidGlassHandle } from "liquid-glass-web-react";
import { T } from "./text";

const links = [
  { href: "/", en: "Home", ru: "Главная" },
  { href: "/projects", en: "Projects", ru: "Проекты" },
  { href: "/contacts", en: "Contact", ru: "Контакты" },
];

// Like system glass, the bar adapts to what is behind it: on paper and pale
// artwork the labels are dark, over a dark screen they turn light, instead of
// relying on a heavier tint.
const imageTones = new WeakMap<HTMLImageElement, number>();
function luminance(r: number, g: number, b: number) {
  const linear = (c: number) => {
    const v = c / 255;
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
}
function imageLuminance(image: HTMLImageElement) {
  if (imageTones.has(image)) return imageTones.get(image);
  if (!image.complete || !image.naturalWidth) return undefined;
  try {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 12;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return undefined;
    context.drawImage(image, 0, 0, 12, 12);
    const data = context.getImageData(0, 0, 12, 12).data;
    let total = 0;
    let weight = 0;
    for (let i = 0; i < data.length; i += 4) {
      const alpha = data[i + 3] / 255;
      total += luminance(data[i], data[i + 1], data[i + 2]) * alpha;
      weight += alpha;
    }
    if (weight < 20) return undefined;
    const value = total / weight;
    imageTones.set(image, value);
    return value;
  } catch {
    return undefined;
  }
}
function luminanceBehind(start: Element) {
  if (start instanceof HTMLVideoElement) return 0;
  if (start instanceof HTMLImageElement) {
    const value = imageLuminance(start);
    if (value !== undefined) return value;
  }
  for (let el: Element | null = start; el; el = el.parentElement) {
    const channels = getComputedStyle(el).backgroundColor.match(/[\d.]+/g);
    if (!channels) continue;
    const [r, g, b, a = 1] = channels.map(Number);
    if (a >= 0.5) return luminance(r, g, b);
  }
  return 0;
}

export function LiquidNavigation({
  language,
  scrolled,
}: {
  language: string;
  scrolled: boolean;
}) {
  const pathname = usePathname();
  const selected =
    pathname.startsWith("/projects") || pathname.startsWith("/playground")
      ? 1
      : pathname.startsWith("/contacts")
        ? 2
        : 0;
  const [target, setTarget] = useState(selected);
  const [lensWidth, setLensWidth] = useState(94);
  const [lensHeight, setLensHeight] = useState(40);
  const [map, setMap] = useState("");
  const [backdropSupported, setBackdropSupported] = useState(false);
  const [tone, setTone] = useState<"dark" | "light">("light");
  const nav = useRef<HTMLElement>(null);
  const glass = useRef<LiquidGlassHandle>(null);
  const options = useRef<HTMLDivElement>(null);
  const backdrop = useRef<HTMLSpanElement>(null);
  const position = useRef((selected + 0.5) / 3);
  const velocity = useRef(0);
  const filterId = `nav-lens-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    setTarget(selected);
  }, [selected, pathname]);
  useEffect(() => {
    // SVG backdrop filters are an additional enhancement in Chromium. The
    // actual DOM lens below also works in Safari and Firefox (Aave technique).
    setBackdropSupported(/Chrome|Chromium|Edg\//.test(navigator.userAgent));
    const initialMap = glass.current?.engine?.getMapUrl();
    if (initialMap) setMap(initialMap);
    const element = options.current;
    if (!element) return;
    const measure = () => {
      const first = element.firstElementChild as HTMLElement;
      setLensWidth(first.offsetWidth);
      setLensHeight(first.offsetHeight);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // The translated labels have different widths. Remeasure after switching
  // language even when the bar itself stays the same size.
  useEffect(() => {
    const first = options.current?.firstElementChild as HTMLElement | null;
    if (first) setLensWidth(first.offsetWidth);
  }, [language]);

  useEffect(() => {
    const element = nav.current;
    if (!element) return;
    let frame = 0;
    const sample = () => {
      frame = 0;
      const box = element.getBoundingClientRect();
      const y = box.top + box.height / 2;
      const points = 5;
      let light = 0;
      for (let i = 0; i < points; i++) {
        const x = box.left + (box.width * (i + 0.5)) / points;
        const below = document
          .elementsFromPoint(x, y)
          .find((el) => !element.contains(el));
        if (below && luminanceBehind(below) > 0.3) light++;
      }
      setTone(light > points / 2 ? "light" : "dark");
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(sample);
    };
    schedule();
    const settle = window.setTimeout(schedule, 600);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("load", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settle);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("load", schedule);
    };
  }, [pathname]);

  useEffect(() => {
    const destination = (target + 0.5) / 3;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let frame = 0;
    let previous = 0;
    const render = () => {
      glass.current?.setPosition(position.current, 0.5);
      const width = options.current?.offsetWidth ?? 286;
      if (backdrop.current)
        backdrop.current.style.transform = `translateX(${position.current * width - lensWidth / 2}px)`;
    };
    const tick = (now: number) => {
      const dt = Math.min(previous ? (now - previous) / 1000 : 1 / 60, 1 / 30);
      previous = now;
      velocity.current +=
        ((destination - position.current) * 230 - velocity.current * 27) * dt;
      position.current += velocity.current * dt;
      if (
        reduced ||
        (Math.abs(destination - position.current) < 0.0002 &&
          Math.abs(velocity.current) < 0.002)
      ) {
        position.current = destination;
        velocity.current = 0;
        render();
        return;
      }
      render();
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, lensWidth]);

  return (
    <nav
      ref={nav}
      data-scrolled={scrolled}
      data-tone={tone}
      className="glass main-nav liquid-nav"
      aria-label={language === "en" ? "Main navigation" : "Главная навигация"}
    >
      {map && (
        <svg className="lens-defs" aria-hidden="true">
          <defs>
            <filter
              id={filterId}
              x="0"
              y="0"
              width="100%"
              height="100%"
              colorInterpolationFilters="sRGB"
            >
              <feImage
                href={map}
                x="0"
                y="0"
                width={lensWidth}
                height={lensHeight}
                preserveAspectRatio="none"
                result="lens-map"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="lens-map"
                scale="16"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      )}
      <span
        ref={backdrop}
        aria-hidden="true"
        className="nav-backdrop-lens"
        style={{
          width: lensWidth,
          height: lensHeight,
          backdropFilter:
            backdropSupported && map
              ? `url(#${filterId}) blur(.4px) saturate(1.2)`
              : "blur(1px) saturate(1.2)",
        }}
      />
      {/* The lens refracts what it wraps, so it wraps an empty plate under the
          labels: bent through three colour channels, the words came out
          doubled and smeared. They sit above it and stay crisp. */}
      <LiquidGlass
        ref={glass}
        className="nav-optics"
        style={{ position: "absolute", inset: 5 }}
        width={lensWidth}
        height={lensHeight}
        radius={lensHeight / 2}
        strength={0.035}
        depth={9}
        curvature={0.85}
        glow={0.07}
        edgeHighlight={0.45}
        specular={0.7}
        chromaticAberration={0.025}
        blur={0}
        quality={256}
        shadow="inset 0 1px 1px #ffffff55, inset 0 -1px 1px #ffffff12, 0 3px 12px #00000022"
        onMapGenerated={setMap}
      >
        <span className="nav-lens-plate" />
      </LiquidGlass>
      <div className="nav-options" ref={options}>
        {links.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={selected === index ? "page" : undefined}
            onClick={(event) => {
              if (
                !event.metaKey &&
                !event.ctrlKey &&
                !event.shiftKey &&
                !event.altKey
              )
                setTarget(index);
            }}
          >
            <T en={item.en} ru={item.ru} />
            {index === 1 && <sup>04</sup>}
          </Link>
        ))}
      </div>
    </nav>
  );
}

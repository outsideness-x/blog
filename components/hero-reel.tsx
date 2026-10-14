"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { heroMotion } from "@/lib/motion";
import { Device, ReelScreen, ReelToggle, useReel } from "./reel";
import { Flower } from "./project-art";
import { T } from "./text";

const apps = [
  { id: "orot", name: "OROT", icon: "/projects/orot/icon.webp" },
  { id: "diple", name: "diple.", icon: "/projects/diple/icon.webp" },
  { id: "inkept", name: "inkept", icon: null },
] as const;

// The hero shows the work itself: real interactions from the three apps,
// with a handwritten note that follows along.
export function HeroReel() {
  const root = useRef<HTMLDivElement>(null);
  const reel = useReel(heroMotion, root);
  const current = heroMotion[reel.index];
  return (
    <div className="hero-stage" ref={root}>
      <div className="orbit orbit-one" aria-hidden="true" />
      <div className="orbit orbit-two" aria-hidden="true" />
      <Flower className="hero-flower" size={310} />
      <Device className="hero-device">
        <ReelScreen
          item={current}
          seen={reel.seen}
          video={reel.video}
          onEnded={reel.onEnded}
          sizes="(max-width: 760px) 60vw, 300px"
          priority={reel.index === 0}
        />
      </Device>
      <div className="hero-paper">
        <span className="paper-pin" />
        <span className="hero-paper-app">{current.title.en}</span>
        <span className="hand" key={current.id}>
          {current.text && <T {...current.text} />}
        </span>
        <Link className="hero-paper-link" href={`/projects/${current.app}`}>
          <T en="see the case" ru="смотреть кейс" /> ↗
        </Link>
        <span className="paper-star" aria-hidden="true">
          ✳
        </span>
      </div>
      <div className="hero-switcher glass">
        {apps.map((app) => {
          const active = current.app === app.id;
          return (
            <button
              key={app.id}
              type="button"
              aria-pressed={active}
              aria-label={`${app.name}`}
              title={app.name}
              onClick={() =>
                reel.select(heroMotion.findIndex((item) => item.app === app.id))
              }
            >
              {app.icon ? (
                <Image src={app.icon} alt="" width={92} height={92} />
              ) : (
                <span className="hero-switcher-inkept">
                  <Flower size={64} />
                </span>
              )}
              <span className="hero-switcher-progress" aria-hidden="true">
                <span
                  ref={active ? reel.progress : undefined}
                  style={active ? undefined : { transform: "scaleX(0)" }}
                />
              </span>
            </button>
          );
        })}
        <ReelToggle running={reel.running} onClick={reel.toggle} />
      </div>
    </div>
  );
}

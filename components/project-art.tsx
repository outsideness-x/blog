import Image from "next/image";
import { T } from "./text";
import { Device } from "./reel";
export function Flower({
  className = "",
  size = 160,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <Image
      className={`flower ${className}`}
      src="/projects/inkept/flower.webp"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
    />
  );
}
export function ProjectArt({
  slug,
  hero = false,
}: {
  slug: string;
  hero?: boolean;
}) {
  return (
    <div
      className={`project-art art-${slug} ${hero ? "art-hero" : ""}`}
      aria-hidden="true"
    >
      {slug === "orot" && (
        <>
          <span className="art-korean">오롯</span>
          <span className="art-margin">STORIES THAT STAY WITH YOU</span>
          <Image
            className="orot-cover"
            src="/projects/orot/cover-1.webp"
            alt=""
            width={420}
            height={743}
            sizes="(max-width: 760px) 36vw, 320px"
          />
          <Device className="orot-phone" island>
            <Image
              className="device-shot"
              src="/projects/orot/reading-hd.webp"
              alt=""
              fill
              sizes="(max-width: 760px) 45vw, 320px"
              priority={hero}
            />
          </Device>
          <span className="art-hand orot-hand">
            <T en="one more chapter…" ru="ещё одну главу…" />
          </span>
        </>
      )}
      {slug === "diple" && (
        <>
          <span className="art-diple-title">
            Aa<span>↗</span>
          </span>
          <div className="diple-window">
            <div className="window-bar">
              <i />
              <i />
              <i />
              <span>diple.</span>
            </div>
            <Image
              src="/projects/diple/mac-library.webp"
              alt=""
              width={1200}
              height={750}
              sizes="(max-width: 760px) 80vw, 640px"
              priority={hero}
            />
          </div>
          <div className="diple-phone">
            <Image
              src="/projects/diple/reader.webp"
              alt=""
              width={400}
              height={870}
              sizes="(max-width: 760px) 26vw, 220px"
            />
          </div>
          <span className="art-hand diple-hand">
            <T en="a little room to think." ru="место для мыслей." />
          </span>
        </>
      )}
      {slug === "inkept" && (
        <>
          <div className="notebook-lines" />
          <span className="art-hand inkept-hand">
            <T
              en={
                <>
                  write it down.
                  <br />
                  let it grow.
                </>
              }
              ru={
                <>
                  запиши.
                  <br />
                  дай мысли вырасти.
                </>
              }
            />
          </span>
          <div className="inkept-screen">
            <Image
              src="/projects/inkept/mac-4-board-detail.webp"
              alt=""
              width={1600}
              height={994}
              sizes="(max-width: 760px) 92vw, 760px"
              priority={hero}
            />
          </div>
          <Flower className="inkept-art-flower" size={240} />
          <span className="pencil-loop" />
        </>
      )}
    </div>
  );
}

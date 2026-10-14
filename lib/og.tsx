import { readFile } from "node:fs/promises";
import path from "node:path";
import type { ReactElement, ReactNode } from "react";
import { ImageResponse } from "next/og";
import { CONTACT } from "./site";

// Link previews (Telegram, iMessage, LinkedIn, X) are rendered at build time
// from the same fonts and screens as the site.
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const root = path.join(process.cwd(), "lib/og");
const BLUE = "#9ebcdf";
const INK = "#eeeae2";
const MUTED = "#a3a39d";

async function image(name: string) {
  const buffer = await readFile(path.join(root, "img", name));
  const type = name.endsWith(".png") ? "image/png" : "image/jpeg";
  return `data:${type};base64,${buffer.toString("base64")}`;
}

async function fonts() {
  const [regular, semibold, chemical, literata] = await Promise.all(
    [
      "Geist-Regular.ttf",
      "Geist-SemiBold.ttf",
      "chemical.ttf",
      "Literata-Display.ttf",
    ].map((file) => readFile(path.join(root, file))),
  );
  return [
    { name: "Geist", data: regular, weight: 400 as const },
    { name: "Geist", data: semibold, weight: 600 as const },
    { name: "chemical", data: chemical, weight: 400 as const },
    { name: "Literata", data: literata, weight: 400 as const },
  ];
}

async function render(element: ReactElement) {
  return new ImageResponse(element, {
    ...ogSize,
    fonts: await fonts(),
  });
}

function Wordmark({ color = INK }: { color?: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        fontFamily: "chemical",
        fontSize: 30,
        color,
      }}
    >
      <svg width="34" height="34" viewBox="0 0 64 64" fill="none">
        <path
          d="M29 5L34 58M7 19L56 46M9 47L54 16M13 8L51 56M5 34L58 29"
          stroke={BLUE}
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
      <span>chemical pink</span>
    </div>
  );
}

function Phone({
  src,
  width,
  style,
  frame = "#1c1f1e",
}: {
  src: string;
  width: number;
  style?: Record<string, string | number>;
  frame?: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        width,
        padding: 7,
        borderRadius: width * 0.16,
        background: frame,
        boxShadow: "0 30px 50px rgba(0,0,0,0.45)",
        ...style,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
      <img
        src={src}
        width={width - 14}
        style={{ borderRadius: width * 0.14, width: width - 14 }}
      />
    </div>
  );
}

export async function homeOg() {
  const [orot, diple, inkept, flower] = await Promise.all([
    image("orot-phone.png"),
    image("diple-reader.jpg"),
    image("inkept-phone.jpg"),
    image("flower.png"),
  ]);
  return render(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: "#0c0d0d",
        color: INK,
        fontFamily: "Geist",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "70px 0 0 72px",
          width: 640,
        }}
      >
        <div style={{ fontSize: 17, letterSpacing: 3.5, color: MUTED }}>
          UI/UX DESIGNER &amp; iOS DEVELOPER
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 46,
            fontSize: 104,
            lineHeight: 1.04,
            letterSpacing: -5,
          }}
        >
          <span>I design it.</span>
          <div style={{ display: "flex", alignItems: "baseline", gap: 26 }}>
            <span>I</span>
            <span
              style={{
                fontFamily: "chemical",
                color: BLUE,
                fontSize: 116,
                letterSpacing: -4,
              }}
            >
              build
            </span>
            <span>it.</span>
          </div>
        </div>
        <div
          style={{ marginTop: 40, fontSize: 27, color: MUTED, lineHeight: 1.4 }}
        >
          Native apps for iPhone, iPad and Mac, from the first idea to the App
          Store.
        </div>
      </div>
      <Phone
        src={orot}
        width={250}
        frame="transparent"
        style={{
          left: 700,
          top: 150,
          transform: "rotate(-10deg)",
          padding: 0,
          boxShadow: "none",
        }}
      />
      <Phone
        src={diple}
        width={238}
        frame="#dfe4e6"
        style={{ left: 846, top: 92, transform: "rotate(5deg)" }}
      />
      <Phone
        src={inkept}
        width={232}
        frame="#2c3530"
        style={{ left: 1000, top: 190, transform: "rotate(12deg)" }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
      <img
        src={flower}
        width={170}
        style={{
          position: "absolute",
          left: 640,
          top: 438,
          transform: "rotate(-14deg)",
        }}
      />
      <div style={{ position: "absolute", left: 72, bottom: 52, display: "flex" }}>
        <Wordmark />
      </div>
    </div>,
  );
}

export async function projectsOg() {
  const [orot, diple, flower] = await Promise.all([
    image("orot-icon.png"),
    image("diple-icon.png"),
    image("flower.png"),
  ]);
  const apps = [
    { name: "OROT", line: "Korean through stories", src: orot, bg: "#000" },
    { name: "diple.", line: "A reader and a notebook", src: diple, bg: "#000" },
    { name: "inkept", line: "Notes that come back", src: flower, bg: "#eeeadf" },
  ];
  return render(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "72px",
        background: "#0c0d0d",
        color: INK,
        fontFamily: "Geist",
      }}
    >
      <div style={{ fontSize: 17, letterSpacing: 3.5, color: MUTED }}>
        INDEPENDENT PRODUCTS / SELECTED WORK
      </div>
      <div style={{ marginTop: 30, fontSize: 96, letterSpacing: -5 }}>
        Made with intent.
      </div>
      <div style={{ display: "flex", gap: 34, marginTop: 64 }}>
        {apps.map((app) => (
          <div
            key={app.name}
            style={{ display: "flex", alignItems: "center", gap: 20, width: 330 }}
          >
            <div
              style={{
                display: "flex",
                width: 104,
                height: 104,
                borderRadius: 26,
                background: app.bg,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.18)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
              <img
                src={app.src}
                width={app.name === "inkept" ? 86 : 104}
                height={app.name === "inkept" ? 86 : 104}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontSize: 34, letterSpacing: -1 }}>{app.name}</span>
              <span style={{ fontSize: 19, color: MUTED }}>{app.line}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", marginTop: "auto", justifyContent: "space-between", alignItems: "center" }}>
        <Wordmark />
        <span style={{ fontFamily: "chemical", fontSize: 30, color: BLUE }}>
          designed. built. out in the world.
        </span>
      </div>
    </div>,
  );
}

type Case = {
  background: string;
  color: string;
  muted: string;
  title: ReactNode;
  line: string;
  platform: string;
  art: ReactNode;
};

async function caseArt(slug: string): Promise<Omit<Case, "line" | "platform">> {
  if (slug === "orot") {
    const [phone, grammar, cover] = await Promise.all([
      image("orot-phone.png"),
      image("orot-grammar.png"),
      image("orot-cover.jpg"),
    ]);
    return {
      background: "#151917",
      color: "#dddcca",
      muted: "#a5b099",
      title: (
        <span style={{ fontWeight: 600, fontSize: 250, letterSpacing: -20 }}>
          OROT
        </span>
      ),
      art: (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img
            src={cover}
            width={220}
            style={{
              position: "absolute",
              left: 640,
              top: 220,
              transform: "rotate(-12deg)",
              boxShadow: "0 25px 40px rgba(0,0,0,0.5)",
            }}
          />
          <Phone
            src={phone}
            width={262}
            frame="transparent"
            style={{ left: 790, top: 120, transform: "rotate(-6deg)", padding: 0, boxShadow: "none" }}
          />
          <Phone
            src={grammar}
            width={250}
            frame="transparent"
            style={{ left: 960, top: 210, transform: "rotate(9deg)", padding: 0, boxShadow: "none" }}
          />
        </>
      ),
    };
  }
  if (slug === "diple") {
    const [mac, reader] = await Promise.all([
      image("diple-mac.jpg"),
      image("diple-reader.jpg"),
    ]);
    return {
      background: "#bdc8ce",
      color: "#253b49",
      muted: "#3d5665",
      title: (
        <span style={{ fontFamily: "Literata", fontSize: 260, letterSpacing: -18 }}>
          diple.
        </span>
      ),
      art: (
        <>
          <div
            style={{
              position: "absolute",
              left: 600,
              top: 250,
              display: "flex",
              width: 560,
              borderRadius: 12,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.4)",
              boxShadow: "20px 35px 50px rgba(38,59,78,0.4)",
              transform: "rotate(-5deg)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
            <img src={mac} width={560} />
          </div>
          <Phone
            src={reader}
            width={210}
            frame="#dbe1e3"
            style={{ left: 960, top: 150, transform: "rotate(8deg)" }}
          />
        </>
      ),
    };
  }
  const [mac, phone, flower] = await Promise.all([
    image("inkept-mac.jpg"),
    image("inkept-phone.jpg"),
    image("flower.png"),
  ]);
  return {
    background: "#18231f",
    color: "#c3d5c1",
    muted: "#a6bca7",
    title: (
      <span style={{ fontFamily: "chemical", fontSize: 230, letterSpacing: -6 }}>
        inkept
      </span>
    ),
    art: (
      <>
        <div
          style={{
            position: "absolute",
            left: 590,
            top: 250,
            display: "flex",
            width: 540,
            borderRadius: 14,
            overflow: "hidden",
            border: "1px solid #8a9179",
            boxShadow: "15px 35px 45px rgba(0,0,0,0.4)",
            transform: "rotate(-6deg)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img src={mac} width={540} />
        </div>
        <Phone
          src={phone}
          width={200}
          frame="#3a453d"
          style={{ left: 975, top: 170, transform: "rotate(10deg)" }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img
          src={flower}
          width={190}
          style={{ position: "absolute", left: 830, top: 40, transform: "rotate(14deg)" }}
        />
      </>
    ),
  };
}

export async function caseOg(slug: string, line: string, platform: string) {
  const look = await caseArt(slug);
  return render(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: look.background,
        color: look.color,
        fontFamily: "Geist",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", left: 56, top: -40, display: "flex" }}>
        {look.title}
      </div>
      {look.art}
      <div
        style={{
          position: "absolute",
          left: 72,
          bottom: 56,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          width: 480,
        }}
      >
        <span style={{ fontSize: 18, letterSpacing: 3, color: look.muted }}>
          {platform.toUpperCase()} / DESIGN &amp; DEVELOPMENT
        </span>
        <span style={{ fontSize: 40, lineHeight: 1.15, letterSpacing: -1.5 }}>
          {line}
        </span>
        <div style={{ display: "flex", marginTop: 10 }}>
          <Wordmark color={look.color} />
        </div>
      </div>
    </div>,
  );
}

export async function contactOg() {
  const flower = await image("flower.png");
  return render(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "72px",
        background: "#0c0d0d",
        color: INK,
        fontFamily: "Geist",
        position: "relative",
      }}
    >
      <div style={{ fontSize: 17, letterSpacing: 3.5, color: MUTED }}>
        GOOD THINGS START WITH A CONVERSATION
      </div>
      <div style={{ display: "flex", flexDirection: "column", marginTop: 40 }}>
        <span style={{ fontSize: 104, letterSpacing: -5, lineHeight: 1.05 }}>
          Let’s make
        </span>
        <span
          style={{
            fontFamily: "chemical",
            fontSize: 118,
            color: BLUE,
            lineHeight: 1.1,
            transform: "rotate(-3deg)",
          }}
        >
          something good.
        </span>
      </div>
      <div
        style={{
          display: "flex",
          gap: 40,
          marginTop: "auto",
          fontSize: 28,
          color: INK,
        }}
      >
        <span>{CONTACT.email}</span>
        <span style={{ color: MUTED }}>Telegram @{CONTACT.telegram}</span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
      <img
        src={flower}
        width={250}
        style={{ position: "absolute", right: 90, top: 150, transform: "rotate(15deg)" }}
      />
    </div>,
  );
}

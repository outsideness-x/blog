export type InkSymbol = "✳" | "↗" | "↘" | "↙" | "↖";

// Draw decorative symbols ourselves: iOS can render Unicode arrows as emoji,
// even when a font or text-presentation selector asks for a monochrome glyph.
export function InkMark({ symbol }: { symbol: InkSymbol }) {
  const rotation = { "↗": 0, "↘": 90, "↙": 180, "↖": 270 };
  return (
    <svg
      className="ink-mark"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d={
          symbol === "✳"
            ? "M12 2v20M2 12h20M5 5l14 14M5 19 19 5"
            : "M5 19 19 5M5 5h14v14"
        }
        transform={symbol === "✳" ? undefined : `rotate(${rotation[symbol]} 12 12)`}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Arrow({
  diagonal = false,
  className = "",
}: {
  diagonal?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function Asterisk({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="48"
      height="48"
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m29 5 5 53M7 19l49 27M9 47 54 16M13 8l38 48M5 34l53-5"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
export function Scribble({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 340 28"
      fill="none"
      aria-hidden="true"
    >
      <path
        pathLength={1}
        d="M4 17C85 1 198 6 332 11M28 23C111 12 238 13 310 18"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

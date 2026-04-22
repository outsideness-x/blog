import type { Metadata } from "next";
import { CopyInlineText } from "@/components/copy-inline-text";
import { ParticleFlow } from "@/components/particle-flow";

export const metadata: Metadata = {
  title: "Home",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="min-h-[80vh] flex items-center">
      <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,35fr)_minmax(0,65fr)] lg:items-center lg:gap-14">
        <div className="space-y-6 max-w-2xl">
          <h1 className="text-3xl font-bold font-mono text-brand">
            <span aria-hidden="true">{">"}</span>{" "}
            hello there<span className="cursor-blink" aria-hidden="true">█</span>
          </h1>

          <p className="text-zinc-400 leading-relaxed">
            My name is Alex. I am a full-stack web and Swift dev and free ML researcher. Here, I
            will share my projects and research in the fields of machine learning and math. For questions and
            collaboration, please contact me at{" "}
            <CopyInlineText text="colddme@proton.me" />{" "}
            or Telegram{" "}
            <CopyInlineText text="@coldd_me" />
            .
          </p>

          {/* local CSS for blinking cursor */}
          <style>{`
            .cursor-blink {
              display: inline-block;
              margin-left: 0.15em;
              transform: translateY(-0.02em);
              animation: cursorBlink 1s steps(1, end) infinite;
            }
            @keyframes cursorBlink {
              0%, 49% { opacity: 1; }
              50%, 100% { opacity: 0; }
            }
            @media (prefers-reduced-motion: reduce) {
              .cursor-blink { animation: none; opacity: 1; }
            }
          `}</style>
        </div>

        <figure
          aria-hidden="true"
          className="order-last w-full lg:order-none lg:justify-self-end"
        >
          <div className="relative aspect-square w-full bg-transparent scale-[1.15] lg:scale-[1.25] lg:translate-x-6">
            <ParticleFlow className="block h-full w-full bg-transparent" />
          </div>
        </figure>
      </div>
    </div>
  );
}


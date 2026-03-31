import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CopyInlineText } from "@/components/copy-inline-text";
import { HeroPhaseField } from "@/components/hero-phase-field";

export const metadata: Metadata = {
  title: "Home",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="min-h-[80vh] flex items-center">
      <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,360px)] lg:items-center lg:gap-14">
        <div className="space-y-6 max-w-2xl">
          <h1 className="text-3xl font-bold font-mono text-primary">
            <span aria-hidden="true">{">"}</span>{" "}
            hello there<span className="cursor-blink" aria-hidden="true">█</span>
          </h1>

          <p className="text-zinc-400 leading-relaxed">
            My name is Alex. I am a full-stack/Swift dev and free ML researcher. Here, I
            will share my projects and research in the fields of machine learning and math. For questions and
            collaboration, please contact me at{" "}
            <CopyInlineText text="colddme@proton.me" />{" "}
            or Telegram{" "}
            <CopyInlineText text="@coldd_me" />
            .
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <Link
              href="/articles"
              className="group border border-border p-4 rounded hover:border-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
            >
              <h3 className="font-mono text-zinc-100 flex items-center gap-2">
                /articles{" "}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </h3>
              <p className="text-sm text-zinc-500 mt-2">Deep dives into tech &amp; math.</p>
            </Link>

            <Link
              href="/projects"
              className="group border border-border p-4 rounded hover:border-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
            >
              <h3 className="font-mono text-zinc-100 flex items-center gap-2">
                /projects{" "}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </h3>
              <p className="text-sm text-zinc-500 mt-2">Open source contributions.</p>
            </Link>
          </div>

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
          className="order-last mx-auto w-full max-w-[240px] sm:max-w-[280px] md:max-w-[320px] lg:order-none lg:max-w-[360px] lg:justify-self-end"
        >
          <HeroPhaseField />
        </figure>
      </div>
    </div>
  );
}

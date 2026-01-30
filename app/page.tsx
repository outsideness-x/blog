import Link from "next/link";
import { AsciiHero } from "@/components/ascii-hero";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col justify-center min-h-[80vh]">
      <AsciiHero />

      <div className="space-y-6 max-w-2xl">
        <h1 className="text-3xl font-bold font-mono text-primary">
          <span aria-hidden="true">{">"}</span>{" "}
          hi<span className="cursor-blink" aria-hidden="true">█</span>
        </h1>

        <p className="text-zinc-400 leading-relaxed">
          Welcome to my digital garden. I explore the intersection of cryptography,
          distributed systems, and visual mathematics. This repository serves as a
          proof-of-work for my experiments and thoughts.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <Link
            href="/articles"
            className="group border border-border p-4 rounded hover:border-primary transition-colors"
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
            className="group border border-border p-4 rounded hover:border-primary transition-colors"
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
    </div>
  );
}

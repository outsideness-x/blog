import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CopyInlineText } from "@/components/copy-inline-text";

export const metadata: Metadata = {
  title: "Home",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="min-h-[80vh] flex items-center">
      <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(240px,320px)] lg:items-center lg:gap-12">
        <div className="space-y-6 max-w-2xl">
          <h1 className="text-3xl font-bold font-mono text-primary">
            <span aria-hidden="true">{">"}</span>{" "}
            hello there<span className="cursor-blink" aria-hidden="true">█</span>
          </h1>

          <p className="text-zinc-400 leading-relaxed">
            My name is Alex. I am a full-stack Web3 dev and researcher. Here, I
            will share my projects and research in the fields of cryptography,
            algorithmic trading, math and machine learning. For questions and
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
          className="order-last mx-auto w-full max-w-[220px] sm:max-w-[250px] md:max-w-[290px] lg:order-none lg:max-w-[320px] lg:justify-self-end"
        >
          <div className="relative aspect-square">
            <Image
              src="/pictures/main.png"
              alt=""
              fill
              sizes="(min-width: 1280px) 320px, (min-width: 1024px) 280px, (min-width: 768px) 250px, 220px"
              className="object-cover object-center opacity-50 md:opacity-45 lg:opacity-55 contrast-80 brightness-85 saturate-0"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-background/24 via-background/38 to-background/56" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(9,9,11,0.64)_100%)]" />
          </div>
        </figure>
      </div>
    </div>
  );
}

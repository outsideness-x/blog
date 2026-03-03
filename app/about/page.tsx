import type { Metadata } from "next";
import { Github } from "lucide-react";

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-6 w-6 fill-current"
    >
      <path d="M18.901 2H22l-6.77 7.74L23 22h-6.098l-4.776-6.244L6.66 22H3.56l7.24-8.273L1 2h6.253l4.316 5.695L18.901 2Zm-1.087 18.148h1.717L6.32 3.757H4.479l13.335 16.391Z" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: "About",
  description: "About the author and social profiles.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-mono text-primary mb-8">/about</h1>
      
      <div className="prose prose-invert prose-zinc max-w-none">
        <p>
          I am a Full Stack Engineer passionate about decentralized technologies and
          mathematical visualization. This blog is a collection of my research notes.
        </p>
        <p>
          Currently working on ZK-rollups and experimenting with Manim for educational content.
        </p>
      </div>

      <div className="flex gap-6 mt-8">
        <a
          href="https://github.com/outsideness-x"
          className="text-zinc-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 rounded"
          aria-label="GitHub"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
        </a>
        <a
          href="https://x.com/AlexxEth76177"
          className="text-zinc-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 rounded"
          aria-label="X"
          target="_blank"
          rel="noopener noreferrer"
        >
          <XIcon />
        </a>
      </div>
    </div>
  );
}

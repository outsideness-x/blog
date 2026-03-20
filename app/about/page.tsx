import type { Metadata } from "next";
import Image from "next/image";
import { Github } from "lucide-react";

const skillStack = [
  { name: "JavaScript", icon: "javascript.svg" },
  { name: "TypeScript", icon: "typescript.svg" },
  { name: "React", icon: "react.svg" },
  { name: "Next.js", icon: "nextdotjs.svg" },
  { name: "Node.js", icon: "nodedotjs.svg" },
  { name: "Express", icon: "express.svg" },
  { name: "Python", icon: "python.svg" },
  { name: "Rust", icon: "rust.svg" },
  { name: "Swift", icon: "swift.svg" },
  { name: "Solidity", icon: "solidity.svg" },
  { name: "Ethereum", icon: "ethereum.svg" },
  { name: "Solana", icon: "solana.svg" },
  { name: "PyTorch", icon: "pytorch.svg" },
  { name: "Docker", icon: "docker.svg" },
  { name: "Linux", icon: "linux.svg" },
  { name: "Git", icon: "git.svg" },
  { name: "Figma", icon: "figma.svg" },
];

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

      <section className="space-y-4">
        <h2 className="text-xl font-bold font-mono text-zinc-100">My stack</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {skillStack.map((skill) => (
            <div
              key={skill.name}
              className="group flex items-center gap-3 rounded border border-border bg-zinc-900/40 p-3 transition-colors hover:border-primary/60"
            >
              <Image
                src={`/skills-icons/${skill.icon}`}
                alt={skill.name}
                width={22}
                height={22}
                className="h-[22px] w-[22px] shrink-0 brightness-0 invert"
              />
              <span className="text-sm text-zinc-300 transition-colors group-hover:text-zinc-100">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </section>

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

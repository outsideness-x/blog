import { Github, Twitter, Linkedin } from "lucide-react";

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
        <a href="#" className="text-zinc-400 hover:text-white transition-colors"><Github /></a>
        <a href="#" className="text-zinc-400 hover:text-white transition-colors"><Twitter /></a>
        <a href="#" className="text-zinc-400 hover:text-white transition-colors"><Linkedin /></a>
      </div>
    </div>
  );
}
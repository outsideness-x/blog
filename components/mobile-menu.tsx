"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur border-b border-border p-4 flex justify-between items-center">
      <Link href="/" className="font-mono text-primary font-bold">mini_blog_v1</Link>
      <button onClick={toggle} className="text-zinc-400 hover:text-white">
        {isOpen ? <X /> : <Menu />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-border p-4 flex flex-col gap-4 shadow-2xl">
          <Link href="/articles" onClick={toggle} className="text-zinc-300 font-mono">/articles</Link>
          <Link href="/projects" onClick={toggle} className="text-zinc-300 font-mono">/projects</Link>
          <Link href="/analytics" onClick={toggle} className="text-zinc-300 font-mono">/analytics</Link>
          <Link href="/about" onClick={toggle} className="text-zinc-300 font-mono">/about</Link>
          <Link href="/donate" onClick={toggle} className="text-zinc-300 font-mono">/donate</Link>
        </div>
      )}
    </div>
  );
}
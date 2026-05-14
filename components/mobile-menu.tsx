"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { LocalizedText } from "@/components/localized-text";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur border-b border-border p-4 flex justify-between items-center">
      <Link href="/" className="font-mono text-brand font-bold">chemical_pink_v0.1</Link>
      <div className="flex items-center gap-3">
        <LanguageSwitcher />
        <button
          type="button"
          onClick={toggle}
          className="text-zinc-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 rounded"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <div
          id="mobile-navigation"
          className="absolute top-full left-0 right-0 bg-background border-b border-border p-4 flex flex-col gap-4 shadow-2xl"
        >
          <Link href="/articles" onClick={toggle} className="text-zinc-300 font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 rounded">
            /<LocalizedText ru="статьи" en="articles" />
          </Link>
          {/* <Link href="/projects" onClick={toggle} className="text-zinc-300 font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 rounded">/projects</Link> */}
          {/* <Link href="/analytics" onClick={toggle} className="text-zinc-300 font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 rounded">/analytics</Link> */}
          <Link href="/about" onClick={toggle} className="text-zinc-300 font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 rounded">
            /<LocalizedText ru="обо мне" en="about" />
          </Link>
          <Link href="/donate" onClick={toggle} className="text-zinc-300 font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 rounded">
            /<LocalizedText ru="поддержать" en="donate" />
          </Link>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="p-2 hover:bg-zinc-800 rounded-md transition-colors text-zinc-400 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
      title={copied ? "Copied" : "Copy address"}
      aria-label={copied ? "Address copied" : "Copy address"}
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );
}

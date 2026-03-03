"use client";

import { useState } from "react";

export function CopyInlineText({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={copied ? "Copied" : "Click to copy"}
      aria-label={`Copy ${text}`}
      className="inline cursor-copy font-mono text-zinc-300/85 underline decoration-zinc-700/80 decoration-dotted underline-offset-4 transition-colors hover:text-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 rounded-sm focus-visible:text-zinc-200"
    >
      {text}
    </button>
  );
}

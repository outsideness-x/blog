"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-2 hover:bg-zinc-800 rounded-md transition-colors text-zinc-400 hover:text-primary"
      title="Copy address"
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );
}
import type { Metadata } from "next";
import { CopyButton } from "@/components/copy-button";

const wallets = [
  { name: "Bitcoin (BTC)", address: "bc1qcg22w09z2d9phdstsg3lsyswu8k7zm9ek28fng" },
  { name: "Ethereum (ETH)", address: "0x5DCb0D14126f1A30a6c4cAC9F2647173aF4131f9" },
  { name: "Solana (SOL)", address: "4jechBmGFiFWhEJ1x1o6zSfiw7v7WANhmR8MkxiQvh4d" },
];

export const metadata: Metadata = {
  title: "Donate",
  description: "Support this blog using crypto wallets.",
  alternates: { canonical: "/donate" },
};

export default function DonatePage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-mono text-white mb-8">/donate</h1>
      <p className="text-zinc-400">
      if you find my work valuable, you can support it:
      </p>

      <div className="space-y-4">
        {wallets.map((wallet) => (
          <div key={wallet.name} className="p-4 border border-border rounded bg-zinc-900/50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="w-full overflow-hidden">
              <div className="text-xs text-zinc-500 font-mono mb-1">{wallet.name}</div>
              <div className="font-mono text-sm text-zinc-200 truncate">{wallet.address}</div>
            </div>
            <CopyButton text={wallet.address} />
          </div>
        ))}
      </div>
    </div>
  );
}
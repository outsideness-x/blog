import { CopyButton } from "@/components/copy-button";

const wallets = [
  { name: "Bitcoin (BTC)", address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh" },
  { name: "Ethereum (ETH)", address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F" },
  { name: "Solana (SOL)", address: "HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH" },
];

export default function DonatePage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-mono text-primary mb-8">/donate</h1>
      <p className="text-zinc-400">
        If you find my work valuable, consider supporting the lab.
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
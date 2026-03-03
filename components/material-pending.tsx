type MaterialPendingProps = {
  section: string;
};

export function MaterialPending({ section }: MaterialPendingProps) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-zinc-800/90 bg-zinc-900/35 p-6 md:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(34,197,94,0.08),transparent_45%)]" />

      <div className="relative">
        <p className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-500">
          {section}
        </p>
        <h2 className="mt-3 text-xl font-bold font-mono text-zinc-200">
          Material is being prepared
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
          We are assembling the content and polishing details. Published materials
          will appear here automatically.
        </p>
      </div>
    </div>
  );
}

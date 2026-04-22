import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[65vh] flex items-center justify-center">
      <div className="max-w-lg text-center space-y-4">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">404</p>
        <h1 className="text-3xl font-bold font-mono text-white">Page Not Found</h1>
        <p className="text-zinc-400">
          This route does not exist or the content is no longer published.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link href="/" className="border border-border rounded px-4 py-2 hover:border-primary transition-colors">
            Home
          </Link>
          <Link href="/articles" className="border border-border rounded px-4 py-2 hover:border-primary transition-colors">
            Articles
          </Link>
          <Link href="/projects" className="border border-border rounded px-4 py-2 hover:border-primary transition-colors">
            Projects
          </Link>
        </div>
      </div>
    </div>
  );
}

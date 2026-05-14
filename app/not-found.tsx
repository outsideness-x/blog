import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[65vh] flex items-center justify-center">
      <div className="max-w-lg text-center space-y-4">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">404</p>
        <h1 className="text-3xl font-bold font-mono text-white">
          <span className="lang-ru" lang="ru">Страница не найдена</span>
          <span className="lang-en" lang="en">Page Not Found</span>
        </h1>
        <p className="text-zinc-400">
          <span className="lang-ru" lang="ru">
            Этот маршрут не существует или материал больше не опубликован.
          </span>
          <span className="lang-en" lang="en">
            This route does not exist or the content is no longer published.
          </span>
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link href="/" className="border border-border rounded px-4 py-2 hover:border-primary transition-colors">
            <span className="lang-ru" lang="ru">Главная</span>
            <span className="lang-en" lang="en">Home</span>
          </Link>
          <Link href="/articles" className="border border-border rounded px-4 py-2 hover:border-primary transition-colors">
            <span className="lang-ru" lang="ru">Статьи</span>
            <span className="lang-en" lang="en">Articles</span>
          </Link>
          <Link href="/projects" className="border border-border rounded px-4 py-2 hover:border-primary transition-colors">
            <span className="lang-ru" lang="ru">Проекты</span>
            <span className="lang-en" lang="en">Projects</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

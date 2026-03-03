import type { Metadata } from "next";
import Link from "next/link";
import { getAllItems } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { MaterialPending } from "@/components/material-pending";

export const metadata: Metadata = {
  title: "Articles",
  description: "Technical articles on cryptography, math, and engineering.",
  alternates: { canonical: "/articles" },
};

export default function ArticlesPage() {
  const articles = getAllItems("articles").filter((article) => article.published === true);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-mono text-primary mb-8">/articles</h1>
      
      {articles.length === 0 ? (
        <MaterialPending section="/articles" />
      ) : (
        <div className="space-y-6">
          {articles.map((article) => (
            <article key={article.slug} className="group relative border-l-2 border-zinc-800 pl-6 hover:border-primary transition-colors">
              <span className="text-xs font-mono text-zinc-500 mb-1 block">
                {formatDate(article.date)}
              </span>
              <Link href={`/articles/${article.slug}`} className="block">
                <h2 className="text-xl font-bold text-zinc-100 group-hover:text-primary transition-colors">
                  {article.title}
                </h2>
              </Link>
              <p className="text-zinc-400 mt-2 text-sm line-clamp-2">
                {article.summary}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

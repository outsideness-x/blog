import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { readMDXFile, getMDXFiles } from "@/lib/mdx";
import { components } from "@/components/mdx-components";
import { formatDate } from "@/lib/utils";
import { Frontmatter } from "@/lib/types";
import rehypePrettyCode from "rehype-pretty-code";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export const dynamicParams = false;

export async function generateStaticParams() {
  const files = getMDXFiles("articles");
  return files
    .map((file) => {
      const slug = file.replace(".mdx", "");
      const { data } = readMDXFile("articles", slug);
      return { slug, published: (data as Frontmatter).published === true };
    })
    .filter((entry) => entry.published)
    .map(({ slug }) => ({ slug }));
}

type ArticlePageProps = {
  params: { slug: string };
};

function getArticle(slug: string) {
  const article = readMDXFile("articles", slug);
  if ((article.data as Frontmatter).published !== true) return null;
  return article;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  try {
    const article = getArticle(params.slug);
    if (!article) return {};

    const data = article.data as Frontmatter;
    return {
      title: data.title,
      description: data.summary,
      keywords: data.tags,
      alternates: {
        canonical: `/articles/${params.slug}`,
      },
      openGraph: {
        type: "article",
        title: data.title,
        description: data.summary,
      },
      twitter: {
        card: "summary",
        title: data.title,
        description: data.summary,
      },
    };
  } catch {
    return {};
  }
}

export default function ArticleLayout({ params }: ArticlePageProps) {
  try {
    const article = getArticle(params.slug);
    if (!article) {
      notFound();
    }

    const { content, data } = article;

    return (
      <article className="prose prose-invert prose-zinc max-w-none">
        <header className="mb-8 pb-8 border-b border-border">
          <h1 className="text-3xl font-bold font-mono text-primary mb-2">{data.title}</h1>
          <div className="flex items-center gap-4 text-sm text-zinc-500 font-mono">
            <time>{formatDate(data.date)}</time>
            {data.tags && <span>[{data.tags.join(", ")}]</span>}
          </div>
        </header>
        
        <MDXRemote
          source={content}
          components={components}
          options={{
            mdxOptions: {
              // cast plugins to 'any' to fix typescript mismatch between unified versions
              remarkPlugins: [remarkMath as any],
              rehypePlugins: [
                rehypeKatex as any,
                [rehypePrettyCode, { theme: "github-dark-dimmed" }] as any
              ],
            },
          }}
        />
      </article>
    );
  } catch {
    notFound();
  }
}

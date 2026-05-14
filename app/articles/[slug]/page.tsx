import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { readMDXFile, readLocalizedMDXFile, getMDXFiles } from "@/lib/mdx";
import { components } from "@/components/mdx-components";
import { formatDate } from "@/lib/utils";
import { Frontmatter } from "@/lib/types";
import type { Language } from "@/lib/i18n";
import rehypePrettyCode from "rehype-pretty-code";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";

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

function getArticle(slug: string, language: Language = "ru") {
  const article = readLocalizedMDXFile("articles", slug, language);
  if ((article.data as Frontmatter).published !== true) return null;
  return article;
}

const mdxOptions = {
  mdxOptions: {
    // cast plugins to 'any' to fix typescript mismatch between unified versions
    remarkPlugins: [remarkMath as any, remarkGfm as any],
    rehypePlugins: [
      rehypeKatex as any,
      [rehypePrettyCode, { theme: "github-dark-dimmed" }] as any
    ],
  },
};

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
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("File not found:")) {
      return {};
    }

    throw error;
  }
}

export default function ArticleLayout({ params }: ArticlePageProps) {
  const russianArticle = getArticle(params.slug, "ru");
  const englishArticle = getArticle(params.slug, "en");
  if (!russianArticle || !englishArticle) {
    notFound();
  }

  const { content: russianContent, data: russianData } = russianArticle;
  const { content: englishContent, data: englishData } = englishArticle;

  return (
    <article className="prose prose-invert prose-zinc max-w-none">
      <header className="mb-8 pb-8 border-b border-border">
        <h1 className="lang-ru text-[2.5rem] font-bold font-sans text-zinc-50 mb-2 leading-[1.2]" lang="ru">
          {russianData.title}
        </h1>
        <h1 className="lang-en text-[2.5rem] font-bold font-sans text-zinc-50 mb-2 leading-[1.2]" lang="en">
          {englishData.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-zinc-500 font-mono">
          <time>{formatDate(russianData.date)}</time>
          {russianData.tags && <span>[{russianData.tags.join(", ")}]</span>}
        </div>
      </header>
      
      <div className="lang-ru" lang="ru">
        <MDXRemote
          source={russianContent}
          components={components}
          options={mdxOptions}
        />
      </div>
      <div className="lang-en" lang="en">
        <MDXRemote
          source={englishContent}
          components={components}
          options={mdxOptions}
        />
      </div>
    </article>
  );
}

import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { readMDXFile, getMDXFiles } from "@/lib/mdx";
import { components } from "@/components/mdx-components";
import { formatDate } from "@/lib/utils";
import rehypePrettyCode from "rehype-pretty-code";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export async function generateStaticParams() {
  const files = getMDXFiles("articles");
  return files.map((file) => ({
    slug: file.replace(".mdx", ""),
  }));
}

export default function ArticleLayout({ params }: { params: { slug: string } }) {
  try {
    const { content, data } = readMDXFile("articles", params.slug);

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
  } catch (e) {
    notFound();
  }
}
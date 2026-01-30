import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { readMDXFile, getMDXFiles } from "@/lib/mdx";
import { components } from "@/components/mdx-components";
import rehypePrettyCode from "rehype-pretty-code";

export async function generateStaticParams() {
  const files = getMDXFiles("projects");
  return files.map((file) => ({
    slug: file.replace(".mdx", ""),
  }));
}

export default function ProjectLayout({ params }: { params: { slug: string } }) {
  try {
    const { content, data } = readMDXFile("projects", params.slug);

    return (
      <article className="prose prose-invert prose-zinc max-w-none">
        <header className="mb-8">
          <h1 className="text-3xl font-bold font-mono text-primary mb-4">{data.title}</h1>
          <p className="text-xl text-zinc-400">{data.summary}</p>
        </header>
        
        <MDXRemote
          source={content}
          components={components}
          options={{
            mdxOptions: {
              // cast plugins to 'any' to fix typescript mismatch
              rehypePlugins: [[rehypePrettyCode, { theme: "github-dark-dimmed" }] as any],
            },
          }}
        />
      </article>
    );
  } catch (e) {
    notFound();
  }
}
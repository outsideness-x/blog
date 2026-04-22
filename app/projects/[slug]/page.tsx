import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { readMDXFile, getMDXFiles } from "@/lib/mdx";
import { components } from "@/components/mdx-components";
import { Frontmatter } from "@/lib/types";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

export const dynamicParams = false;

export async function generateStaticParams() {
  const files = getMDXFiles("projects");
  return files
    .map((file) => {
      const slug = file.replace(".mdx", "");
      const { data } = readMDXFile("projects", slug);
      return { slug, published: (data as Frontmatter).published === true };
    })
    .filter((entry) => entry.published)
    .map(({ slug }) => ({ slug }));
}

type ProjectPageProps = {
  params: { slug: string };
};

function getProject(slug: string) {
  const project = readMDXFile("projects", slug);
  if ((project.data as Frontmatter).published !== true) return null;
  return project;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  try {
    const project = getProject(params.slug);
    if (!project) return {};

    const data = project.data as Frontmatter;
    return {
      title: data.title,
      description: data.summary,
      keywords: data.tags,
      alternates: {
        canonical: `/projects/${params.slug}`,
      },
    };
  } catch {
    return {};
  }
}

export default function ProjectLayout({ params }: ProjectPageProps) {
  try {
    const project = getProject(params.slug);
    if (!project) {
      notFound();
    }

    const { content, data } = project;

    return (
      <article className="prose prose-invert prose-zinc max-w-none">
        <header className="mb-8">
          <h1 className="text-[2.5rem] font-bold font-sans text-zinc-50 mb-4 leading-[1.2]">{data.title}</h1>
          <p className="text-xl text-zinc-400">{data.summary}</p>
        </header>
        
        <MDXRemote
          source={content}
          components={components}
          options={{
            mdxOptions: {
              // cast plugins to 'any' to fix typescript mismatch
              remarkPlugins: [remarkGfm as any],
              rehypePlugins: [[rehypePrettyCode, { theme: "github-dark-dimmed" }] as any],
            },
          }}
        />
      </article>
    );
  } catch {
    notFound();
  }
}

import { caseOg, ogContentType, ogSize } from "@/lib/og";
import { projects } from "@/lib/projects";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "A case study by Alex";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export default function Image({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug) ?? projects[0];
  return caseOg(project.slug, project.line.en, project.platform);
}

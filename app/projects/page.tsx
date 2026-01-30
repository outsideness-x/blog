import Link from "next/link";
import { getAllItems } from "@/lib/mdx";

export default function ProjectsPage() {
  const projects = getAllItems("projects");

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-mono text-primary mb-8">/projects</h1>
      
      <div className="grid grid-cols-1 gap-6">
        {projects.map((project) => (
          <Link 
            key={project.slug} 
            href={`/projects/${project.slug}`}
            className="block border border-border bg-zinc-900/50 p-6 rounded-lg hover:border-primary transition-all hover:shadow-[0_0_15px_rgba(34,197,94,0.1)]"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold font-mono text-zinc-100">{project.title}</h2>
              {project.tags && (
                <div className="flex gap-2">
                  {project.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-xs bg-zinc-800 text-zinc-400 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <p className="text-zinc-400 text-sm">{project.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
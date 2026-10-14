import Link from "next/link";
import type { Project } from "@/lib/projects";
import { ProjectArt } from "./project-art";
import { Arrow } from "./marks";
import { T } from "./text";
export function ProjectCard({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`project-card ${large ? "project-card-large" : ""}`}
    >
      <div className="project-card-image">
        <ProjectArt slug={project.slug} />
        <span className="project-open glass">
          <Arrow diagonal />
        </span>
        <span className="project-number">/{project.number}</span>
      </div>
      <div className="project-card-info">
        <div>
          <h3>{project.name}</h3>
          <p>
            <T {...project.category} />
          </p>
        </div>
        <span className="platform">{project.platform}</span>
      </div>
      {large && (
        <p className="project-card-description">
          <T {...project.description} />
        </p>
      )}
    </Link>
  );
}

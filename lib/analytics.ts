import fs from "fs";
import path from "path";
import { ProjectData } from "@/lib/types";

const analyticsFilePath = path.join(process.cwd(), "content/analytics/projects.json");
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function getAnalyticsProjects() {
  if (!fs.existsSync(analyticsFilePath)) return [];

  try {
    const raw = fs.readFileSync(analyticsFilePath, "utf-8");
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) return [];
    return (parsed as ProjectData[]).filter((project) => slugPattern.test(project.slug));
  } catch {
    return [];
  }
}

export function getPublishedAnalyticsProjects() {
  return getAnalyticsProjects().filter((project) => project.published === true);
}

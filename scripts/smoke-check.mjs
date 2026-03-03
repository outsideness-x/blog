import fs from "fs";
import path from "path";
import matter from "gray-matter";

const root = process.cwd();
const errors = [];

const articleDir = path.join(root, "content", "articles");
const analyticsPath = path.join(root, "content", "analytics", "projects.json");

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const allowedProtocols = new Set(["https:", "http:"]);

function fileExistsInPublic(publicPath) {
  return fs.existsSync(path.join(root, "public", publicPath.replace(/^\//, "")));
}

function validateArticles() {
  if (!fs.existsSync(articleDir)) return;

  const files = fs.readdirSync(articleDir).filter((file) => file.endsWith(".mdx"));
  const seenSlugs = new Set();

  for (const file of files) {
    const absolutePath = path.join(articleDir, file);
    const raw = fs.readFileSync(absolutePath, "utf-8");
    const { data } = matter(raw);
    const slug = String(data.slug ?? file.replace(".mdx", ""));

    if (!data.title) errors.push(`${file}: missing frontmatter "title"`);
    if (!data.summary) errors.push(`${file}: missing frontmatter "summary"`);
    if (!data.date) errors.push(`${file}: missing frontmatter "date"`);
    if (!slugPattern.test(slug)) errors.push(`${file}: invalid slug "${slug}"`);
    if (seenSlugs.has(slug)) errors.push(`${file}: duplicate slug "${slug}"`);
    seenSlugs.add(slug);

    const manimSrcMatches = [...raw.matchAll(/<ManimVideo[^>]*\ssrc=["']([^"']+)["']/g)];
    for (const match of manimSrcMatches) {
      const src = match[1];
      if (!src.startsWith("/")) {
        errors.push(`${file}: ManimVideo src must start with "/" (found "${src}")`);
        continue;
      }
      if (!fileExistsInPublic(src)) {
        errors.push(`${file}: ManimVideo asset not found in public "${src}"`);
      }
    }
  }
}

function validateAnalytics() {
  if (!fs.existsSync(analyticsPath)) return;

  const raw = fs.readFileSync(analyticsPath, "utf-8");
  let projects = [];

  try {
    projects = JSON.parse(raw);
  } catch {
    errors.push("content/analytics/projects.json: invalid JSON");
    return;
  }

  if (!Array.isArray(projects)) {
    errors.push("content/analytics/projects.json: root must be an array");
    return;
  }

  for (const project of projects) {
    if (!project.slug || !slugPattern.test(project.slug)) {
      errors.push(`analytics "${project.name ?? "unknown"}": invalid slug`);
    }
    const links = project.links ?? {};
    for (const [name, value] of Object.entries(links)) {
      if (typeof value !== "string") {
        errors.push(`analytics "${project.slug}": link "${name}" must be string`);
        continue;
      }
      try {
        const parsed = new URL(value);
        if (!allowedProtocols.has(parsed.protocol)) {
          errors.push(`analytics "${project.slug}": unsafe protocol in link "${name}"`);
        }
      } catch {
        errors.push(`analytics "${project.slug}": invalid URL in link "${name}"`);
      }
    }
  }
}

validateArticles();
validateAnalytics();

if (errors.length > 0) {
  console.error("Smoke check failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Smoke check passed.");

import type { MetadataRoute } from "next";
import { getAllItems } from "@/lib/mdx";
import { getPublishedAnalyticsProjects } from "@/lib/analytics";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/articles", "/projects", "/analytics", "/donate"];
  const articleRoutes = getAllItems("articles")
    .filter((article) => article.published !== false)
    .map((article) => `/articles/${article.slug}`);
  const projectRoutes = getAllItems("projects")
    .filter((project) => project.published !== false)
    .map((project) => `/projects/${project.slug}`);
  const analyticsRoutes = getPublishedAnalyticsProjects().map(
    (project) => `/analytics/${project.slug}`
  );

  const urls = [...staticRoutes, ...articleRoutes, ...projectRoutes, ...analyticsRoutes];

  return urls.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));
}

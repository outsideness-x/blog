import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/projects",
    "/contacts",
    ...projects.map((p) => `/projects/${p.slug}`),
  ].map((route) => ({ url: `${SITE_URL}${route}` }));
}

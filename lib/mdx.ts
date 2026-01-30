import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Frontmatter } from "./types";

const root = process.cwd();

// read all mdx files from a directory
export function getMDXFiles(dir: string) {
  const contentDir = path.join(root, "content", dir);
  if (!fs.existsSync(contentDir)) return [];
  return fs.readdirSync(contentDir).filter((file) => path.extname(file) === ".mdx");
}

// read single mdx file content and frontmatter
export function readMDXFile(dir: string, slug: string) {
  const filePath = path.join(root, "content", dir, `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  return matter(fileContent);
}

// get all items with frontmatter sorted by date
export function getAllItems(dir: string) {
  const files = getMDXFiles(dir);
  
  const items = files.map((file) => {
    const { data } = readMDXFile(dir, file.replace(".mdx", ""));
    return {
      ...(data as Frontmatter),
      slug: file.replace(".mdx", ""),
    };
  });

  return items.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
}
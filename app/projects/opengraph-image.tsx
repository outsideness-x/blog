import { ogContentType, ogSize, projectsOg } from "@/lib/og";

export const alt = "OROT, diple. and inkept — apps designed and built by Alex.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return projectsOg();
}

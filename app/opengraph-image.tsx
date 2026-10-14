import { homeOg, ogContentType, ogSize } from "@/lib/og";

export const alt = "Alex — UI/UX designer and iOS developer. I design it. I build it.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return homeOg();
}

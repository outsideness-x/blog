import { chemicalOg, ogContentType, ogSize } from "@/lib/og";

export const alt =
  "chemical — a hand-drawn marker typeface for Latin, Cyrillic and Hangul.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return chemicalOg();
}

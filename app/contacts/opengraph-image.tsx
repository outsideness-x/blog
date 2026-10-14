import { contactOg, ogContentType, ogSize } from "@/lib/og";

export const alt = "Let’s make something good. Email or Telegram Alex.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return contactOg();
}

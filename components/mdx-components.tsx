import Link from "next/link";
import Image from "next/image";
import type { AnchorHTMLAttributes, HTMLAttributes, ImgHTMLAttributes } from "react";
import { ManimVideo } from "./manim-video";
import { isExternalHref, sanitizeHref } from "@/lib/security";

function MdxAnchor(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const safeHref = sanitizeHref(props.href);
  const isExternal = isExternalHref(safeHref);
  const shouldOpenNewTab = props.target === "_blank" || isExternal;
  const rel = shouldOpenNewTab
    ? [props.rel, "noopener", "noreferrer"].filter(Boolean).join(" ")
    : props.rel;

  return (
    <a
      {...props}
      href={safeHref}
      target={shouldOpenNewTab ? "_blank" : props.target}
      rel={rel}
      className="text-primary hover:underline underline-offset-4"
    />
  );
}

export const components = {
  Image,
  Link,
  ManimVideo,
  img: (props: ImgHTMLAttributes<HTMLImageElement>) => {
    if (!props.src) return null;
    const safeSrc = sanitizeHref(props.src);
    if (safeSrc === "#") return null;
    const normalizedSrc =
      isExternalHref(safeSrc) || safeSrc.startsWith("/")
        ? safeSrc
        : `/${safeSrc.replace(/^\.?\//, "")}`;

    return (
      <Image
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        width={800}
        height={400}
        unoptimized
        className="rounded-lg border border-border my-4"
        src={normalizedSrc}
        alt={props.alt ?? ""}
      />
    );
  },
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-2xl font-bold mt-8 mb-4 text-primary" {...props} />
  ),
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-xl font-bold mt-6 mb-3 text-zinc-100" {...props} />
  ),
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p className="leading-7 mb-4 text-zinc-300" {...props} />
  ),
  a: MdxAnchor,
  ul: (props: HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside mb-4 text-zinc-300" {...props} />
  ),
  li: (props: HTMLAttributes<HTMLLIElement>) => <li className="mb-1" {...props} />,
  code: (props: HTMLAttributes<HTMLElement>) => (
    <code className="bg-zinc-800 text-primary px-1 py-0.5 rounded text-sm font-mono" {...props} />
  ),
  pre: (props: HTMLAttributes<HTMLPreElement>) => (
    <pre className="bg-zinc-900 border border-border p-4 rounded-lg overflow-x-auto mb-4" {...props} />
  ),
};

import Image from "next/image";
import { cn } from "@/lib/utils";
import { sanitizeHref } from "@/lib/security";

interface ManimVideoProps {
  src?: string;
  webmSrc?: string;
  mp4Src?: string;
  sources?: Array<{
    src: string;
    type?: "video/mp4" | "video/webm" | "image/gif";
  }>;
  caption?: string;
  className?: string;
  poster?: string;
  aspectRatio?: string;
  autoPlay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  preload?: "none" | "metadata" | "auto";
}

function inferMimeType(src: string) {
  if (src.endsWith(".webm")) return "video/webm";
  if (src.endsWith(".mp4")) return "video/mp4";
  return undefined;
}

export function ManimVideo({
  src,
  webmSrc,
  mp4Src,
  sources,
  caption,
  className,
  poster,
  aspectRatio = "16 / 9",
  autoPlay = false,
  controls = true,
  loop = false,
  muted = true,
  preload = "metadata",
}: ManimVideoProps) {
  const sourceEntries =
    sources && sources.length > 0
      ? sources
      : webmSrc || mp4Src
      ? [
          ...(webmSrc ? [{ src: webmSrc, type: "video/webm" as const }] : []),
          ...(mp4Src ? [{ src: mp4Src, type: "video/mp4" as const }] : []),
        ]
      : src
      ? [{ src, type: inferMimeType(src) }]
      : [];

  const normalizedSources = sourceEntries.map((source) => ({
    ...source,
    src: sanitizeHref(source.src),
  }));

  const normalizedPoster = poster ? sanitizeHref(poster) : undefined;
  const safePoster = normalizedPoster === "#" ? undefined : normalizedPoster;
  const firstValidSource = normalizedSources.find((source) => source.src !== "#");
  const isGif = firstValidSource ? firstValidSource.src.toLowerCase().endsWith(".gif") : false;

  if (normalizedSources.length === 0 || normalizedSources.every((source) => source.src === "#")) {
    return (
      <figure className={cn("my-8", className)}>
        <div className="rounded-lg border border-border bg-zinc-900 p-4 text-sm text-zinc-400">
          <span className="lang-ru" lang="ru">Анимация недоступна.</span>
          <span className="lang-en" lang="en">Animation unavailable.</span>
        </div>
        {caption && (
          <figcaption className="mt-2 text-center text-xs text-zinc-500 font-mono">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  if (isGif && firstValidSource) {
    return (
      <figure className={cn("my-8", className)}>
        <div
          className="relative rounded-lg overflow-hidden border border-border bg-zinc-900"
          style={{ aspectRatio }}
        >
          <Image
            src={firstValidSource.src}
            alt={caption ?? "Manim animation"}
            fill
            sizes="100vw"
            unoptimized
            className="object-contain"
          />
        </div>
        {caption && (
          <figcaption className="mt-2 text-center text-xs text-zinc-500 font-mono">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure className={cn("my-8", className)}>
      <div
        className="relative rounded-lg overflow-hidden border border-border bg-zinc-900"
        style={{ aspectRatio }}
      >
        <video
          controls={controls}
          loop={loop}
          muted={muted}
          autoPlay={autoPlay}
          playsInline
          preload={preload}
          poster={safePoster}
          className="w-full h-full block object-contain"
        >
          {normalizedSources.map((source) =>
            source.src === "#" ? null : (
              <source key={source.src} src={source.src} type={source.type} />
            )
          )}
          Your browser does not support HTML5 video.
        </video>
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-zinc-500 font-mono">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

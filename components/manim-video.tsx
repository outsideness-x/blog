import { cn } from "@/lib/utils";

interface ManimVideoProps {
  src: string;
  caption?: string;
  className?: string;
}

export function ManimVideo({ src, caption, className }: ManimVideoProps) {
  return (
    <figure className={cn("my-8", className)}>
      <div className="relative rounded-lg overflow-hidden border border-border bg-zinc-900">
        <video
          src={src}
          controls
          loop
          muted
          playsInline
          className="w-full h-auto block"
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
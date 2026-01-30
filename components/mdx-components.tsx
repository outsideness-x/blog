import Link from "next/link";
import Image from "next/image";
import { ManimVideo } from "./manim-video";

export const components = {
  Image,
  Link,
  ManimVideo,
  // 
  img: (props: any) => (
    <Image
      sizes="100vw"
      style={{ width: '100%', height: 'auto' }}
      width={800}
      height={400}
      className="rounded-lg border border-border my-4"
      {...props}
    />
  ),
  //
  h1: (props: any) => <h1 className="text-2xl font-bold mt-8 mb-4 text-primary" {...props} />,
  h2: (props: any) => <h2 className="text-xl font-bold mt-6 mb-3 text-zinc-100" {...props} />,
  p: (props: any) => <p className="leading-7 mb-4 text-zinc-300" {...props} />,
  a: (props: any) => <a className="text-primary hover:underline underline-offset-4" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside mb-4 text-zinc-300" {...props} />,
  li: (props: any) => <li className="mb-1" {...props} />,
  code: (props: any) => <code className="bg-zinc-800 text-primary px-1 py-0.5 rounded text-sm font-mono" {...props} />,
  pre: (props: any) => <pre className="bg-zinc-900 border border-border p-4 rounded-lg overflow-x-auto mb-4" {...props} />,
};
import Link from "next/link";
import { InkMark } from "@/components/marks";
import { T } from "@/components/text";
import { Flower } from "@/components/project-art";
export default function NotFound() {
  return (
    <div className="not-found page-width">
      <Flower size={160} />
      <p className="eyebrow">
        404 / <T en="A LITTLE LOST" ru="НЕМНОГО ПОТЕРЯЛИСЬ" />
      </p>
      <h1>
        <T en="Nothing growing here. Yet." ru="Здесь пока ничего не выросло." />
      </h1>
      <Link href="/" className="button button-light">
        <T en="Back home" ru="На главную" /> <InkMark symbol="↗" />
      </Link>
    </div>
  );
}

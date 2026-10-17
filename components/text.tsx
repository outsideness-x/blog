import type { ReactNode } from "react";
import { InkMark, type InkSymbol } from "./marks";

function textWithMarks(text: ReactNode) {
  if (typeof text !== "string") return text;
  return text.split(/([✳↗↘↙↖]\uFE0E?)/).map((part, index) =>
    /^[✳↗↘↙↖]/.test(part) ? (
      <InkMark key={index} symbol={part[0] as InkSymbol} />
    ) : part,
  );
}

export type Bilingual = { en: string; ru: string };
export function T({ en, ru }: { en: ReactNode; ru: ReactNode }) {
  return (
    <>
      <span className="lang-en" lang="en">
        {textWithMarks(en)}
      </span>
      <span className="lang-ru" lang="ru">
        {textWithMarks(ru)}
      </span>
    </>
  );
}

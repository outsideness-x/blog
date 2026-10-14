import type { ReactNode } from "react";

export type Bilingual = { en: string; ru: string };
export function T({ en, ru }: { en: ReactNode; ru: ReactNode }) {
  return (
    <>
      <span className="lang-en" lang="en">
        {en}
      </span>
      <span className="lang-ru" lang="ru">
        {ru}
      </span>
    </>
  );
}

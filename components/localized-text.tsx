import type { ReactNode } from "react";

type LocalizedTextProps = {
  ru: ReactNode;
  en: ReactNode;
};

export function LocalizedText({ ru, en }: LocalizedTextProps) {
  return (
    <>
      <span className="lang-ru" lang="ru">
        {ru}
      </span>
      <span className="lang-en" lang="en">
        {en}
      </span>
    </>
  );
}

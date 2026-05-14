"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  DEFAULT_LANGUAGE,
  isLanguage,
  LANGUAGE_STORAGE_KEY,
  type Language,
} from "@/lib/i18n";

type LanguageSwitcherProps = {
  className?: string;
};

function applyLanguage(language: Language) {
  document.documentElement.dataset.lang = language;
  document.documentElement.lang = language;
  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(DEFAULT_LANGUAGE);

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    const nextLanguage = isLanguage(storedLanguage) ? storedLanguage : DEFAULT_LANGUAGE;

    applyLanguage(nextLanguage);
    setCurrentLanguage(nextLanguage);
  }, []);

  const selectLanguage = (language: Language) => {
    applyLanguage(language);
    setCurrentLanguage(language);
  };

  return (
    <div
      className={cn("flex items-center gap-1 font-mono text-xs", className)}
      aria-label="Language"
      role="group"
    >
      <button
        type="button"
        className="lang-switch__button"
        data-language-option="ru"
        aria-pressed={currentLanguage === "ru"}
        onClick={() => selectLanguage("ru")}
      >
        RU
      </button>
      <button
        type="button"
        className="lang-switch__button"
        data-language-option="en"
        aria-pressed={currentLanguage === "en"}
        onClick={() => selectLanguage("en")}
      >
        EN
      </button>
    </div>
  );
}

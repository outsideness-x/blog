export const DEFAULT_LANGUAGE = "ru";
export const LANGUAGE_STORAGE_KEY = "chemical-pink-language";

export const languages = ["ru", "en"] as const;

export type Language = (typeof languages)[number];

export function isLanguage(value: unknown): value is Language {
  return value === "ru" || value === "en";
}

export const languageInitScript = `
(function () {
  try {
    var stored = window.localStorage.getItem("${LANGUAGE_STORAGE_KEY}");
    var lang = stored === "en" || stored === "ru" ? stored : "${DEFAULT_LANGUAGE}";
    document.documentElement.dataset.lang = lang;
    document.documentElement.lang = lang;
  } catch (error) {
    document.documentElement.dataset.lang = "${DEFAULT_LANGUAGE}";
    document.documentElement.lang = "${DEFAULT_LANGUAGE}";
  }
})();
`;

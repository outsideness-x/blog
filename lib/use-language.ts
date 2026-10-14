import { useEffect, useState } from "react";

export type Language = "en" | "ru";

// The header switches language on <html data-lang>; client components that
// build text in code (rather than through <T>) follow it here.
export function useLanguage(): Language {
  const [language, setLanguage] = useState<Language>("en");
  useEffect(() => {
    const root = document.documentElement;
    const read = () => setLanguage(root.dataset.lang === "ru" ? "ru" : "en");
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ["data-lang"] });
    return () => observer.disconnect();
  }, []);
  return language;
}

import type { ReactNode } from "react";

type FormulaNotationItem = {
  symbol: string;
  meaning: string;
};

type FormulaExplainerProps = {
  children: ReactNode;
  label?: string;
  notation?: FormulaNotationItem[];
  intuition?: string;
  significance?: string;
  defaultOpen?: boolean;
  lang?: "ru" | "en";
};

type Locale = "ru" | "en";

function inferLocale(text: string): Locale {
  return /[А-Яа-яЁё]/.test(text) ? "ru" : "en";
}

function getLocalizedCopy(locale: Locale) {
  if (locale === "ru") {
    return {
      defaultLabel: "Пояснение к формуле",
      notationTitle: "Обозначения",
      intuitionTitle: "Интуиция",
      significanceTitle: "Почему это важно",
    };
  }

  return {
    defaultLabel: "Formula Notes",
    notationTitle: "Notation",
    intuitionTitle: "Intuition",
    significanceTitle: "Why It Matters",
  };
}

export function FormulaExplainer({
  children,
  label,
  notation,
  intuition,
  significance,
  defaultOpen = false,
  lang,
}: FormulaExplainerProps) {
  const textForLocale = [
    ...((notation ?? []).flatMap((item) => [item.symbol, item.meaning])),
    intuition ?? "",
    significance ?? "",
  ].join(" ");
  const locale = lang ?? inferLocale(textForLocale);
  const copy = getLocalizedCopy(locale);
  const resolvedLabel = label ?? copy.defaultLabel;

  return (
    <div className="formula-explainer not-prose">
      <div className="formula-explainer__formula">{children}</div>

      <details className="formula-explainer__details" open={defaultOpen}>
        <summary className="formula-explainer__summary">
          <span>{resolvedLabel}</span>
          <span className="formula-explainer__chevron" aria-hidden="true">
            ▾
          </span>
        </summary>

        <div className="formula-explainer__panel">
          {notation && notation.length > 0 && (
            <section className="formula-explainer__section" aria-label={copy.notationTitle}>
              <h4 className="formula-explainer__section-title">{copy.notationTitle}</h4>
              <ul className="formula-explainer__notation-list">
                {notation.map((item) => (
                  <li
                    key={`${item.symbol}:${item.meaning}`}
                    className="formula-explainer__notation-item"
                  >
                    <span className="formula-explainer__symbol">{item.symbol}</span>
                    <span className="formula-explainer__meaning">{item.meaning}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {intuition && (
            <section className="formula-explainer__section" aria-label={copy.intuitionTitle}>
              <h4 className="formula-explainer__section-title">{copy.intuitionTitle}</h4>
              <p className="formula-explainer__paragraph">{intuition}</p>
            </section>
          )}

          {significance && (
            <section className="formula-explainer__section" aria-label={copy.significanceTitle}>
              <h4 className="formula-explainer__section-title">{copy.significanceTitle}</h4>
              <p className="formula-explainer__paragraph">{significance}</p>
            </section>
          )}
        </div>
      </details>
    </div>
  );
}

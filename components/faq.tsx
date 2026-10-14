import { T, type Bilingual } from "./text";

const questions: { q: Bilingual; a: Bilingual }[] = [
  {
    q: { en: "How much does a project cost?", ru: "Сколько стоит проект?" },
    a: {
      en: "It depends on the scope. After a short conversation I’ll come back with a plan and an estimate, with no obligation.",
      ru: "Зависит от объёма. После короткого разговора я пришлю план и оценку, ни к чему не обязывающие.",
    },
  },
  {
    q: {
      en: "Do you only work on Apple platforms?",
      ru: "Вы работаете только с платформами Apple?",
    },
    a: {
      en: "Native iPhone, iPad and Mac apps in SwiftUI are what I build. Interface design isn’t limited to Apple: the design system can carry over to Android or the web.",
      ru: "Сам я разрабатываю нативные приложения для iPhone, iPad и Mac на SwiftUI. Дизайн интерфейсов этим не ограничен: дизайн-система переносится и на Android, и в веб.",
    },
  },
  {
    q: {
      en: "Can you join a product that already exists?",
      ru: "Можно подключить вас к уже существующему продукту?",
    },
    a: {
      en: "Yes. I can redesign parts of a live app, review its UX, or build features in an existing SwiftUI codebase.",
      ru: "Да. Могу переработать часть живого приложения, провести UX-аудит или разрабатывать фичи в существующем проекте на SwiftUI.",
    },
  },
  {
    q: { en: "What do I get at the end?", ru: "Что я получу в итоге?" },
    a: {
      en: "Figma files, the source code in your repository and the release under your App Store account. Everything is yours.",
      ru: "Файлы Figma, исходный код в вашем репозитории и релиз в вашем аккаунте App Store. Всё принадлежит вам.",
    },
  },
  {
    q: { en: "Which language do we work in?", ru: "На каком языке работаем?" },
    a: {
      en: "English or Russian, whichever is easier for you.",
      ru: "На русском или английском — как вам удобнее.",
    },
  },
];

export function Faq() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map(({ q, a }) => ({
      "@type": "Question",
      name: q.en,
      acceptedAnswer: { "@type": "Answer", text: a.en },
    })),
  };
  return (
    <section className="faq" aria-labelledby="faq-title">
      <div className="faq-intro">
        <p className="eyebrow">FAQ</p>
        <h2 id="faq-title">
          <T en="Good questions." ru="Хорошие вопросы." />
        </h2>
      </div>
      <div className="faq-list">
        {questions.map(({ q, a }) => (
          <details key={q.en} className="faq-item">
            <summary>
              <T {...q} />
              <span className="faq-toggle" aria-hidden="true">
                +
              </span>
            </summary>
            <p>
              <T {...a} />
            </p>
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  );
}

import type { Bilingual } from "@/components/text";
export type Project = {
  slug: string;
  name: string;
  number: string;
  platform: string;
  store: string;
  category: Bilingual;
  line: Bilingual;
  description: Bilingual;
  thesis: Bilingual;
  overview: Bilingual;
  features: { title: Bilingual; text: Bilingual }[];
};
export const projects: Project[] = [
  {
    slug: "orot",
    name: "OROT",
    number: "01",
    platform: "iPhone",
    store: "https://apps.apple.com/pl/app/orot-read-korean/id6783348321",
    category: { en: "Language & stories", ru: "Язык и истории" },
    line: {
      en: "A language begins with a story.",
      ru: "Язык начинается с истории.",
    },
    description: {
      en: "A reading-first way into Korean. Real stories, little discoveries, one sentence at a time.",
      ru: "Корейский через чтение. Настоящие истории, маленькие открытия — предложение за предложением.",
    },
    thesis: {
      en: "Read a line.\nFeel a language.",
      ru: "Прочитать строку.\nПочувствовать язык.",
    },
    overview: {
      en: "OROT puts the story at the centre of learning. Translation, grammar and audio live right beside the text, so an unfamiliar word becomes a small discovery instead of a reason to stop reading.",
      ru: "В центре OROT — история. Перевод, грамматика и аудио находятся рядом с текстом: незнакомое слово становится маленьким открытием, а не поводом перестать читать.",
    },
    features: [
      {
        title: { en: "Stay in the story", ru: "Остаться в истории" },
        text: {
          en: "Tap a word for its meaning or a sentence for a closer look at its grammar. The reading experience stays connected.",
          ru: "Нажать на слово, чтобы узнать значение, или на предложение, чтобы разобрать грамматику. Всё остаётся в контексте чтения.",
        },
      },
      {
        title: { en: "Listen as you read", ru: "Читать и слышать" },
        text: {
          en: "Read-along audio connects the written word to its sound, giving each sentence another way to make sense.",
          ru: "Озвучка связывает написанное со звучанием и помогает почувствовать каждое предложение.",
        },
      },
      {
        title: { en: "Keep what you discover", ru: "Сохранить открытия" },
        text: {
          en: "A personal notebook, spaced review and collectible lightsticks carry the story beyond its last line.",
          ru: "Личный словарь, интервальные повторения и коллекционные лайтстики продолжают историю после последней строки.",
        },
      },
    ],
  },
  {
    slug: "diple",
    name: "diple.",
    number: "02",
    platform: "iOS + macOS",
    store: "https://apps.apple.com/pl/app/diple/id6806528966",
    category: { en: "Reading & reflection", ru: "Чтение и мысли" },
    line: {
      en: "A quiet room for your mind.",
      ru: "Тихая комната для мыслей.",
    },
    description: {
      en: "Books, passages and the thoughts they leave behind. A reader and a notebook, together.",
      ru: "Книги, цитаты и мысли, которые остаются после чтения. Читалка и блокнот в одном месте.",
    },
    thesis: {
      en: "Read. Mark.\nMake it yours.",
      ru: "Читать. Отмечать.\nОсмыслять.",
    },
    overview: {
      en: "Reading rarely ends on the last page. diple brings EPUBs, PDFs, saved articles and a notebook into one quiet space. A passage can become a highlight, a highlight can become a note, and an idea can find its way back to you.",
      ru: "Чтение редко заканчивается на последней странице. diple объединяет EPUB, PDF, сохранённые статьи и блокнот. Отрывок становится выделением, выделение — заметкой, а мысль возвращается к тебе позже.",
    },
    features: [
      {
        title: { en: "Let the page breathe", ru: "Дать странице воздух" },
        text: {
          en: "Adjust type, margins, line spacing and paper tone. The reader makes room for the text and for the person reading it.",
          ru: "Шрифт, поля, интерлиньяж и оттенок бумаги настраиваются под человека и под текст.",
        },
      },
      {
        title: { en: "Think in the margins", ru: "Думать на полях" },
        text: {
          en: "Highlights and notes stay close to the passages that prompted them. Markdown gives longer thoughts a space of their own.",
          ru: "Выделения и заметки остаются рядом с текстом, который их вызвал. Для длинных мыслей есть отдельные Markdown-страницы.",
        },
      },
      {
        title: { en: "A second reading", ru: "Вернуться к прочитанному" },
        text: {
          en: "Second Read brings back marked passages and notes. Your library stays yours, with optional private iCloud sync and export.",
          ru: "Second Read возвращает к отмеченным отрывкам и заметкам. Библиотека принадлежит тебе: с экспортом и необязательной синхронизацией через личный iCloud.",
        },
      },
    ],
  },
  {
    slug: "inkept",
    name: "inkept",
    number: "03",
    platform: "iOS + macOS",
    store: "https://apps.apple.com/pl/app/inkept/id6819176738",
    category: { en: "Notes & memory", ru: "Заметки и память" },
    line: {
      en: "Good thoughts deserve to stay.",
      ru: "Хорошим мыслям стоит остаться.",
    },
    description: {
      en: "A paper-hearted place for notes, connected ideas and flashcards that come back at the right time.",
      ru: "Место с бумажным характером — для заметок, связанных идей и карточек, которые возвращаются вовремя.",
    },
    thesis: {
      en: "Put it in writing.\nKeep it.",
      ru: "Записать.\nСохранить в памяти.",
    },
    overview: {
      en: "inkept brings the familiarity of a notebook to a connected digital workspace. Hand-drawn details give the interface a human rhythm, while plain files and spaced repetition keep the useful parts quietly working underneath.",
      ru: "inkept переносит ощущение привычного блокнота в цифровую среду. Рукописные детали задают живой ритм интерфейсу, а обычные файлы и интервальные повторения незаметно делают свою работу.",
    },
    features: [
      {
        title: { en: "Write in your own way", ru: "Писать по-своему" },
        text: {
          en: "Markdown, formulas, code, checklists and on-device Typst diagrams share one page. Structure appears as you write.",
          ru: "Markdown, формулы, код, чеклисты и локальные Typst-диаграммы на одной странице. Структура появляется прямо во время письма.",
        },
      },
      {
        title: { en: "See the connections", ru: "Видеть связи" },
        text: {
          en: "Wiki links, a graph, a board and a timeline offer different views of the same growing collection of ideas.",
          ru: "Wiki-ссылки, граф, доска и таймлайн позволяют по-разному смотреть на одну растущую коллекцию идей.",
        },
      },
      {
        title: { en: "Remember, just in time", ru: "Вспоминать вовремя" },
        text: {
          en: "Turn a passage into a flashcard. FSRS schedules the next review; your notes remain plain files in the folder you choose.",
          ru: "Преврати отрывок в карточку. FSRS рассчитает время повторения, а заметки останутся обычными файлами в выбранной папке.",
        },
      },
    ],
  },
];

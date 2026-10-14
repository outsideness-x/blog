import type { ReelItem } from "@/components/reel";

const clip = (app: string, id: string) => ({
  id: `${app}-${id}`,
  video: `/projects/${app}/motion/${id}.mp4`,
  poster: `/projects/${app}/motion/${id}.webp`,
});

export const orotMotion: ReelItem[] = [
  {
    ...clip("orot", "read-along"),
    title: { en: "Read along", ru: "Чтение вслух" },
    text: {
      en: "Each word lights up as it’s spoken, so the sound and the script meet in the same place.",
      ru: "Каждое слово подсвечивается в момент, когда звучит: звук и письмо встречаются в одном месте.",
    },
  },
  {
    ...clip("orot", "morpheme-sheet"),
    title: { en: "A sentence, taken apart", ru: "Предложение по частям" },
    text: {
      en: "Tap a line and it opens into particles, endings and meaning, without leaving the page.",
      ru: "Нажатие на строку раскладывает её на частицы, окончания и смысл, не уводя со страницы.",
    },
  },
  {
    ...clip("orot", "page-turn"),
    title: { en: "A notebook that turns", ru: "Блокнот, который листается" },
    text: {
      en: "The Hangul course lives in a spiral notebook. Its pages turn like paper, not like slides.",
      ru: "Курс хангыля живёт в блокноте на пружине. Страницы перелистываются как бумага, а не как слайды.",
    },
  },
  {
    ...clip("orot", "mastered-stamp"),
    title: { en: "Learned, stamped", ru: "Выучено — штамп" },
    text: {
      en: "A word you know gets a 외웠다 stamp: a small ceremony instead of a progress bar.",
      ru: "Выученное слово получает штамп 외웠다 — маленький ритуал вместо полоски прогресса.",
    },
  },
  {
    ...clip("orot", "text-complete"),
    title: { en: "The end of a text", ru: "Конец текста" },
    text: {
      en: "Finishing a story scatters its letters and leaves a little receipt of what you read.",
      ru: "Дочитанная история рассыпает буквы и оставляет маленькую квитанцию о прочитанном.",
    },
  },
  {
    ...clip("orot", "lightstick"),
    title: { en: "A light, earned", ru: "Заслуженный свет" },
    text: {
      en: "Finishing a section unlocks a lightstick that swings and sparkles at a touch.",
      ru: "Пройденный раздел открывает лайтстик, который качается и искрится от касания.",
    },
  },
];

export const dipleMotion: ReelItem[] = [
  {
    ...clip("diple", "ink-highlight"),
    title: { en: "Ink, not a marker", ru: "Чернила, а не маркер" },
    text: {
      en: "A selection fills with colour the way ink soaks into paper.",
      ru: "Выделение заполняется цветом так, как чернила впитываются в бумагу.",
    },
  },
  {
    ...clip("diple", "living-margin"),
    title: { en: "The living margin", ru: "Живые поля" },
    text: {
      en: "The page slides aside to show the note you left next to a passage.",
      ru: "Страница отъезжает в сторону и показывает заметку, оставленную рядом с отрывком.",
    },
  },
  {
    ...clip("diple", "daily-swap"),
    title: { en: "Another passage", ru: "Другой отрывок" },
    text: {
      en: "Highlights resurface one at a time. Ask for another and it swaps with a soft blur.",
      ru: "Выделения возвращаются по одному. Попросите другое — и оно сменится с мягким размытием.",
    },
  },
  {
    ...clip("diple", "tabbar-collapse"),
    title: { en: "Out of the way", ru: "Не мешать" },
    text: {
      en: "While you scroll, the tab bar shrinks and gives the room back to the text.",
      ru: "Пока вы листаете, таб-бар сжимается и отдаёт место тексту.",
    },
  },
  {
    ...clip("diple", "mode-switch"),
    title: { en: "Two rooms", ru: "Две комнаты" },
    text: {
      en: "Reading and Notes are two modes of one app, and the whole interface changes with them.",
      ru: "Чтение и Заметки — два режима одного приложения, и интерфейс меняется вместе с ними.",
    },
  },
  {
    ...clip("diple", "intro-mark"),
    title: { en: "First launch", ru: "Первый запуск" },
    text: {
      en: "The mark draws itself, then a single line says what the app is for.",
      ru: "Знак рисует себя сам, а затем одна строка объясняет, для чего приложение.",
    },
  },
];

export type HeroItem = ReelItem & { app: "orot" | "diple" | "inkept" };

// The home page phone: a short loop through all three apps.
export const heroMotion: HeroItem[] = [
  {
    ...clip("orot", "read-along"),
    app: "orot",
    title: { en: "OROT", ru: "OROT" },
    text: { en: "words light up as they’re read", ru: "слова загораются, пока звучат" },
  },
  {
    ...clip("diple", "ink-highlight"),
    app: "diple",
    title: { en: "diple.", ru: "diple." },
    text: { en: "a highlight, like ink", ru: "выделение, как чернила" },
  },
  {
    id: "inkept-note",
    poster: "/projects/inkept/iphone-2-note-detail.webp",
    duration: 4,
    app: "inkept",
    title: { en: "inkept", ru: "inkept" },
    text: { en: "notes with a human hand", ru: "заметки с живым почерком" },
  },
  {
    ...clip("orot", "lightstick"),
    app: "orot",
    title: { en: "OROT", ru: "OROT" },
    text: { en: "a light for every story", ru: "свет за каждую историю" },
  },
  {
    ...clip("diple", "living-margin"),
    app: "diple",
    title: { en: "diple.", ru: "diple." },
    text: { en: "a thought in the margin", ru: "мысль на полях" },
  },
  {
    ...clip("orot", "text-complete"),
    app: "orot",
    title: { en: "OROT", ru: "OROT" },
    text: { en: "the end of a story", ru: "конец истории" },
  },
];

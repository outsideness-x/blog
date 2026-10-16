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
    title: { en: "A notebook that turns", ru: "Тетрадь, которая листается" },
    text: {
      en: "The Hangul course lives in the Notebook tab, on punched sheets. Its pages turn like paper, not like slides.",
      ru: "Курс хангыля живёт во вкладке «Тетрадь», на листах с дырочками. Страницы перелистываются как бумага, а не как слайды.",
    },
  },
  {
    ...clip("orot", "mastered-stamp"),
    title: { en: "Learned, stamped", ru: "Выучено — штамп" },
    text: {
      en: "The answer that makes a word learned stamps 외웠다 on its card: a small ceremony instead of a progress bar.",
      ru: "Ответ, после которого слово выучено, ставит на карточку штамп 외웠다 — маленький ритуал вместо полоски прогресса.",
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
      en: "The first finished text hands over a dark lightstick. Press the button on its grip and a crescent rises in the glass.",
      ru: "Первый дочитанный текст дарит тёмный лайтстик. Нажмите кнопку на ручке — и в стекле поднимется месяц.",
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
      en: "A small mark in the margin opens the note you left beside a passage, written in a hand rather than set in type.",
      ru: "Маленький знак на поле открывает заметку, оставленную рядом с отрывком, — написанную от руки, а не набранную.",
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
    ...clip("diple", "passages-notes"),
    title: { en: "Two halves", ru: "Две половины" },
    text: {
      en: "Highlights keeps the passages you marked and the notes they led to. One switch moves between them.",
      ru: "В Highlights лежат отмеченные отрывки и заметки, которые из них выросли. Между ними — один переключатель.",
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

"use client";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/use-language";
import { T, type Bilingual } from "./text";

type Feature = { tag: string; label: Bilingual; hint: Bilingual };
const features: Feature[] = [
  {
    tag: "calt",
    label: { en: "Alternates", ru: "Варианты" },
    hint: {
      en: "four drawings per letter, never twins",
      ru: "четыре рисунка на букву, без близнецов",
    },
  },
  {
    tag: "ss01",
    label: { en: "Fineliner", ru: "Линер" },
    hint: {
      en: "a thin-pen capital, now and then",
      ru: "иногда заглавная тонким пером",
    },
  },
  {
    tag: "ss02",
    label: { en: "Credits", ru: "Титры" },
    hint: {
      en: "lowercase jumps to capitals",
      ru: "строчные прыгают в заглавные",
    },
  },
  {
    tag: "ss03",
    label: { en: "Hearts", ru: "Сердечки" },
    hint: { en: "o becomes ♥", ru: "o становится ♥" },
  },
];

const samples: { id: string; label: Bilingual; text: Bilingual }[] = [
  {
    id: "note",
    label: { en: "A note", ru: "Записка" },
    text: {
      en: "good ideas have roots.\nwrite them down.",
      ru: "хорошие мысли пускают корни.\nзапишите их.",
    },
  },
  {
    id: "doubles",
    label: { en: "Doubles", ru: "Двойные" },
    text: {
      en: "coffee, llama, balloon, bookkeeper",
      ru: "аллея, ссора, длинношеее, жжёт",
    },
  },
  {
    id: "korean",
    label: { en: "Hangul", ru: "Хангыль" },
    text: {
      en: "안녕하세요\n오늘은 좋은 날이에요.",
      ru: "안녕하세요\n오늘은 좋은 날이에요.",
    },
  },
  {
    id: "alphabet",
    label: { en: "Alphabet", ru: "Алфавит" },
    text: {
      en: "Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm\nNn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz\n0123456789 ♥ ★ ✓ → ₩ ₽ €",
      ru: "Аа Бб Вв Гг Дд Ее Ёё Жж Зз Ии Йй Кк Лл\nМм Нн Оо Пп Рр Сс Тт Уу Фф Хх Цц Чч Шш\nЩщ Ъъ Ыы Ьь Ээ Юю Яя 0123456789 ♥ ₽",
    },
  },
];

export function TypeTester() {
  const language = useLanguage();
  const [sample, setSample] = useState(samples[0].id);
  const [text, setText] = useState(samples[0].text.en);
  const [edited, setEdited] = useState(false);
  const [size, setSize] = useState(64);
  const [on, setOn] = useState<Record<string, boolean>>({ calt: true });

  // Until someone types, the sample follows the site language.
  useEffect(() => {
    if (edited) return;
    const current = samples.find((s) => s.id === sample) ?? samples[0];
    setText(current.text[language]);
  }, [language, sample, edited]);

  const settings = features
    .map(({ tag }) => `"${tag}" ${on[tag] ? 1 : 0}`)
    .join(", ");

  return (
    <div className="type-tester">
      <div className="type-tester-bar">
        <div
          className="type-samples"
          role="group"
          aria-label="Samples / Образцы"
        >
          {samples.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={sample === item.id && !edited}
              onClick={() => {
                setSample(item.id);
                setEdited(false);
                setText(item.text[language]);
              }}
            >
              <T {...item.label} />
            </button>
          ))}
        </div>
        <label className="type-size">
          <span>
            <T en="Size" ru="Размер" /> {size}px
          </span>
          <input
            type="range"
            min={28}
            max={140}
            value={size}
            onChange={(event) => setSize(Number(event.target.value))}
          />
        </label>
      </div>
      <textarea
        className="type-specimen-area hand"
        value={text}
        spellCheck={false}
        aria-label="Type to try the chemical typeface / Напишите что-нибудь шрифтом chemical"
        onChange={(event) => {
          setText(event.target.value);
          setEdited(true);
        }}
        style={{ fontSize: size, fontFeatureSettings: settings }}
        rows={4}
      />
      <div
        className="type-features"
        role="group"
        aria-label="OpenType features"
      >
        {features.map((feature) => (
          <button
            key={feature.tag}
            type="button"
            aria-pressed={Boolean(on[feature.tag])}
            onClick={() =>
              setOn((current) => ({
                ...current,
                [feature.tag]: !current[feature.tag],
              }))
            }
          >
            <span className="type-feature-tag">{feature.tag}</span>
            <span className="type-feature-label">
              <T {...feature.label} />
            </span>
            <span className="type-feature-hint">
              <T {...feature.hint} />
            </span>
          </button>
        ))}
      </div>
      <p className="type-tester-note">
        <T
          en="Type anything. Latin and Cyrillic are complete here; Hangul on this page is a sample of the full 11,172 syllables."
          ru="Напишите что угодно. Латиница и кириллица здесь полные; хангыль на этой странице — образец из полных 11 172 слогов."
        />
      </p>
    </div>
  );
}

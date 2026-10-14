"use client";
import { useState } from "react";
import Image from "next/image";
import { T } from "./text";
import { Flower } from "./project-art";

export function KoreanStudy() {
  const [selected, setSelected] = useState(1);
  const words = [
    {
      word: "오늘은",
      en: "today",
      ru: "сегодня",
      role: {
        en: "오늘 + 은 · setting the topic",
        ru: "오늘 + 은 · тема предложения",
      },
    },
    {
      word: "좋은",
      en: "good",
      ru: "хороший",
      role: {
        en: "좋다 → 좋은 · describing a noun",
        ru: "좋다 → 좋은 · определение к существительному",
      },
    },
    {
      word: "날이에요.",
      en: "a day",
      ru: "день",
      role: {
        en: "날 + 이에요 · a polite ending",
        ru: "날 + 이에요 · вежливое окончание",
      },
    },
  ];
  return (
    <div className="korean-study interactive-study">
      <div className="prototype-topline">
        <span>OROT / READING</span>
        <span>01 — 03</span>
      </div>
      <p className="prototype-instruction">
        <T
          en="Tap a word. Stay in the story."
          ru="Нажми на слово. Останься в истории."
        />
      </p>
      <div className="korean-sentence" lang="ko">
        {words.map((word, i) => (
          <button
            key={word.word}
            aria-pressed={selected === i}
            onClick={() => setSelected(i)}
          >
            {word.word}
          </button>
        ))}
      </div>
      <p className="korean-translation">
        <T en="Today is a good day." ru="Сегодня хороший день." />
      </p>
      <div className="word-explanation" aria-live="polite">
        <div>
          <span lang="ko">{words[selected].word.replace(".", "")}</span>
          <strong>
            <T en={words[selected].en} ru={words[selected].ru} />
          </strong>
        </div>
        <p>
          <T {...words[selected].role} />
        </p>
      </div>
      <div className="prototype-bottomline">
        <span className="hand">
          <T
            en="the answer, right where you need it."
            ru="ответ там, где он нужен."
          />
        </span>
        <span>↗</span>
      </div>
    </div>
  );
}
export function ReadingStudy() {
  const [marked, setMarked] = useState(false);
  const [note, setNote] = useState(false);
  return (
    <div className="reading-study interactive-study">
      <div className="prototype-topline">
        <span>DIPLE. / THE MARGIN</span>
        <span>12 / 84</span>
      </div>
      <p className="reading-kicker">
        <T en="ON KEEPING A THOUGHT" ru="О ТОМ, КАК СОХРАНИТЬ МЫСЛЬ" />
      </p>
      <p className="reading-passage">
        <T
          en="Some sentences stay with you long after the page is turned. "
          ru="Некоторые предложения остаются с тобой, даже когда страница перевёрнута. "
        />
        <button
          className={marked ? "is-marked" : ""}
          aria-pressed={marked}
          onClick={() => {
            setMarked(!marked);
            if (marked) setNote(false);
          }}
        >
          <T
            en="Leave a little of yourself in the margin."
            ru="Оставь немного себя на полях."
          />
        </button>
      </p>
      <div className="reading-tools">
        <button
          onClick={() => {
            setMarked(true);
            setNote(false);
          }}
          aria-pressed={marked}
        >
          <span>▰</span>
          <T en="Highlight" ru="Выделить" />
        </button>
        <button
          onClick={() => {
            setMarked(true);
            setNote(!note);
          }}
          aria-expanded={note}
        >
          <span>↳</span>
          <T en="Add a thought" ru="Добавить мысль" />
        </button>
      </div>
      {note ? (
        <label className="margin-note">
          <span className="hand">
            <T
              en="Your thought, beside the text."
              ru="Твоя мысль рядом с текстом."
            />
          </span>
          <textarea
            rows={2}
            aria-label="Your note / Твоя заметка"
            placeholder="…"
          />
        </label>
      ) : (
        <p className="reading-hint">
          <T
            en="Select the line, then leave a thought beside it."
            ru="Выдели строку и оставь рядом свою мысль."
          />
        </p>
      )}
    </div>
  );
}
export function MemoryStudy() {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="memory-study interactive-study">
      <div className="prototype-topline">
        <span>INKEPT / A LITTLE REMINDER</span>
        <span>01 / 01</span>
      </div>
      <div className="memory-flower">
        <Flower size={100} />
      </div>
      <button
        className={`memory-card ${flipped ? "is-flipped" : ""}`}
        onClick={() => setFlipped(!flipped)}
        aria-pressed={flipped}
        aria-label={
          flipped
            ? "Show question / Показать вопрос"
            : "Reveal answer / Показать ответ"
        }
      >
        <span className="memory-card-front">
          <span className="memory-card-label">
            <T en="a question" ru="вопрос" />
          </span>
          <span className="hand">
            <T
              en={
                <>
                  What makes
                  <br />
                  an idea stick?
                </>
              }
              ru={
                <>
                  Как сохранить
                  <br />
                  мысль в памяти?
                </>
              }
            />
          </span>
          <span className="memory-card-prompt">
            <T en="tap to turn over ↗" ru="нажми, чтобы перевернуть ↗" />
          </span>
        </span>
        <span className="memory-card-back">
          <span className="memory-card-label">
            <T en="a small answer" ru="короткий ответ" />
          </span>
          <span className="hand">
            <T
              en={
                <>
                  Meet it again.
                  <br />
                  Before it fades.
                </>
              }
              ru={
                <>
                  Вернуться к ней.
                  <br />
                  Пока она не исчезла.
                </>
              }
            />
          </span>
          <span className="memory-card-prompt">
            <T en="tap to return ↶" ru="нажми, чтобы вернуться ↶" />
          </span>
        </span>
      </button>
      <p className="memory-footnote">
        <T
          en="In the app, FSRS decides when a card comes back."
          ru="В приложении FSRS определяет, когда карточка вернётся."
        />
      </p>
    </div>
  );
}
export function InkeptViews() {
  const [view, setView] = useState("board");
  const views = [
    { id: "board", file: "4-board", en: "Board", ru: "Доска" },
    { id: "graph", file: "3-graph", en: "Graph", ru: "Граф" },
    { id: "note", file: "2-note", en: "Note", ru: "Заметка" },
  ];
  const active = views.find((v) => v.id === view)!;
  return (
    <div className="inkept-views">
      <div
        className="view-selector"
        role="group"
        aria-label="Workspace view / Вид заметок"
      >
        {views.map((v) => (
          <button
            key={v.id}
            onClick={() => setView(v.id)}
            aria-pressed={view === v.id}
          >
            <T en={v.en} ru={v.ru} />
          </button>
        ))}
      </div>
      <div className="view-screen">
        <Image
          key={active.id}
          src={`/projects/inkept/mac-${active.file}-detail.webp`}
          width={1600}
          height={994}
          alt={`${active.en} view in inkept`}
          sizes="(max-width:760px) 90vw, 1100px"
        />
      </div>
      <p className="view-caption">
        <span>
          <T en="Actual app screens" ru="Оригинальные экраны приложения" />
        </span>
        <span className="hand">
          <T
            en="same ideas. a different perspective."
            ru="те же мысли. другой ракурс."
          />
        </span>
      </p>
    </div>
  );
}

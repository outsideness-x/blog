"use client";
import { useEffect, useRef, useState } from "react";
import { CONTACT, CONTACT_LINKS } from "@/lib/site";
import { useLanguage, type Language } from "@/lib/use-language";
import { T } from "./text";
import { Arrow } from "./marks";

type Option = { id: string; en: string; ru: string };
const needs: Option[] = [
  { id: "design", en: "App design", ru: "Дизайн приложения" },
  { id: "build", en: "Design + iOS app", ru: "Дизайн и iOS-приложение" },
  { id: "launch", en: "Launch kit", ru: "Всё для запуска" },
  { id: "review", en: "UX review", ru: "UX-аудит" },
  { id: "unsure", en: "Not sure yet", ru: "Пока не знаю" },
];
const timings: Option[] = [
  { id: "soon", en: "As soon as possible", ru: "Как можно скорее" },
  { id: "months", en: "In the next few months", ru: "В ближайшие месяцы" },
  { id: "exploring", en: "Just exploring", ru: "Пока присматриваюсь" },
];

function copyText(text: string) {
  if (navigator.clipboard?.writeText)
    return navigator.clipboard.writeText(text);
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.append(area);
  area.select();
  const ok = document.execCommand("copy");
  area.remove();
  return ok ? Promise.resolve() : Promise.reject(new Error("copy failed"));
}

function useFlag(duration = 2400) {
  const [on, setOn] = useState(false);
  const timer = useRef(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  return [
    on,
    () => {
      setOn(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setOn(false), duration);
    },
  ] as const;
}

export function CopyButton({ value }: { value: string }) {
  const [copied, flash] = useFlag();
  return (
    <button
      type="button"
      className="copy-button"
      onClick={() => copyText(value).then(flash, () => {})}
    >
      <span aria-live="polite">
        {copied ? (
          <T en="Copied" ru="Скопировано" />
        ) : (
          <T en="Copy" ru="Копировать" />
        )}
      </span>
    </button>
  );
}

function compose(
  language: Language,
  need: string[],
  timing: string,
  idea: string,
) {
  const pick = (ids: string[], list: Option[]) =>
    list
      .filter((option) => ids.includes(option.id))
      .map((option) => option[language])
      .join(", ");
  const what = pick(need, needs);
  const when = pick([timing], timings);
  const ru = language === "ru";
  const lines = [ru ? "Здравствуйте, Алексей!" : "Hi Alex,", ""];
  if (what) lines.push(ru ? `Что нужно: ${what}` : `What I need: ${what}`);
  if (when) lines.push(ru ? `Сроки: ${when}` : `Timeline: ${when}`);
  if (what || when) lines.push("");
  lines.push(ru ? "Об идее:" : "About the idea:", idea.trim() || "…");
  return {
    subject: ru
      ? `Проект: ${what || "новый проект"}`
      : `Project: ${what || "a new project"}`,
    body: lines.join("\n"),
  };
}

export function ContactBrief() {
  const language = useLanguage();
  const [need, setNeed] = useState<string[]>([]);
  const [timing, setTiming] = useState("");
  const [idea, setIdea] = useState("");
  const [copied, flash] = useFlag(4000);
  const message = compose(language, need, timing, idea);
  const mailto = `${CONTACT_LINKS.email}?subject=${encodeURIComponent(
    message.subject,
  )}&body=${encodeURIComponent(message.body)}`;

  return (
    <section className="brief" aria-labelledby="brief-title">
      <div className="brief-intro">
        <p className="eyebrow">
          <T en="A QUICK BRIEF" ru="КОРОТКИЙ БРИФ" />
        </p>
        <h2 id="brief-title">
          <T
            en={
              <>
                Not sure what
                <br />
                to write?
              </>
            }
            ru={
              <>
                Не знаете,
                <br />
                что написать?
              </>
            }
          />
        </h2>
        <p>
          <T
            en="Pick a couple of answers and the message writes itself. Send it by email, or copy it into Telegram."
            ru="Выберите пару ответов, и сообщение соберётся само. Отправьте его письмом или скопируйте в Telegram."
          />
        </p>
        <span className="hand">
          <T en="no forms, no sign-ups ↘" ru="без форм и регистраций ↘" />
        </span>
      </div>
      <div className="brief-form">
        <fieldset>
          <legend>
            <span>01</span>
            <T en="What do you need?" ru="Что нужно?" />
          </legend>
          <div className="brief-options">
            {needs.map((option) => (
              <button
                key={option.id}
                type="button"
                aria-pressed={need.includes(option.id)}
                onClick={() =>
                  setNeed((current) =>
                    current.includes(option.id)
                      ? current.filter((id) => id !== option.id)
                      : [...current, option.id],
                  )
                }
              >
                <T en={option.en} ru={option.ru} />
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <span>02</span>
            <T en="When would you like to start?" ru="Когда хотите начать?" />
          </legend>
          <div className="brief-options">
            {timings.map((option) => (
              <button
                key={option.id}
                type="button"
                aria-pressed={timing === option.id}
                onClick={() =>
                  setTiming((current) =>
                    current === option.id ? "" : option.id,
                  )
                }
              >
                <T en={option.en} ru={option.ru} />
              </button>
            ))}
          </div>
        </fieldset>
        <label className="brief-idea">
          <span className="brief-legend">
            <span>03</span>
            <T en="A few words about the idea" ru="Пара слов об идее" />
          </span>
          <textarea
            rows={3}
            value={idea}
            onChange={(event) => setIdea(event.target.value)}
            placeholder={
              language === "ru"
                ? "Для кого продукт, что он должен делать, что уже есть…"
                : "Who it’s for, what it should do, what already exists…"
            }
          />
        </label>
        <div className="brief-preview" aria-label="Message preview">
          <span className="brief-preview-label">
            <T en="YOUR MESSAGE" ru="ВАШЕ СООБЩЕНИЕ" />
          </span>
          <p>{message.body}</p>
        </div>
        <div className="brief-actions">
          <a className="button button-light" href={mailto}>
            <T en="Send by email" ru="Отправить письмом" />
            <Arrow diagonal />
          </a>
          <a
            className="brief-telegram"
            href={CONTACT_LINKS.telegram}
            target="_blank"
            rel="noreferrer"
            onClick={() => {
              copyText(message.body).then(flash, () => {});
            }}
          >
            <T en="Copy & open Telegram" ru="Скопировать и открыть Telegram" />
            <Arrow diagonal />
          </a>
          <p className="brief-status" aria-live="polite">
            {copied && (
              <T
                en={`Copied. Paste it into the chat with @${CONTACT.telegram}.`}
                ru={`Скопировано. Вставьте в чат с @${CONTACT.telegram}.`}
              />
            )}
          </p>
        </div>
      </div>
    </section>
  );
}

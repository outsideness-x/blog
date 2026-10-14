import Image from "next/image";
import type { ReactNode } from "react";
import { T } from "./text";
import { Flower } from "./project-art";
import { ScreenViewer } from "./screen-viewer";
import { Asterisk, Scribble } from "./marks";
import {
  KoreanStudy,
  ReadingStudy,
  MemoryStudy,
  InkeptViews,
} from "./interaction-study";

function Chapter({
  number,
  en,
  ru,
  children,
}: {
  number: string;
  en: string;
  ru: string;
  children: ReactNode;
}) {
  return (
    <div className="chapter-heading">
      <p className="eyebrow">
        <span>{number}</span> / <T en={en} ru={ru} />
      </p>
      <h2>{children}</h2>
    </div>
  );
}
function StudyLabel() {
  return (
    <p className="study-label">
      <span className="status-dot" />
      <T
        en="INTERACTION STUDY — TRY IT"
        ru="ИНТЕРАКТИВНЫЙ ФРАГМЕНТ — ПОПРОБУЙТЕ"
      />
      <span>↘</span>
    </p>
  );
}

export function OrotStudy() {
  return (
    <>
      <section className="case-premise">
        <span className="premise-index">01—03</span>
        <h2>
          <T
            en={
              <>
                The moment you stop
                <br />
                translating and start <em>reading.</em>
              </>
            }
            ru={
              <>
                Момент, когда перестаёшь
                <br />
                переводить и начинаешь <em>читать.</em>
              </>
            }
          />
        </h2>
        <div className="premise-aside">
          <span className="hand">읽다 / to read</span>
          <p>
            <T
              en="The interface has one job: keep the reader inside the story."
              ru="У интерфейса одна задача: сохранить читателя внутри истории."
            />
          </p>
        </div>
      </section>
      <section className="story-wall">
        <div className="story-wall-type">
          <span>01</span>
          <h3>
            <T
              en={
                <>
                  A world.
                  <br />
                  Not a worksheet.
                </>
              }
              ru={
                <>
                  Целый мир.
                  <br />
                  Не упражнение.
                </>
              }
            />
          </h3>
          <p>
            <T
              en="Story covers establish mood before the first sentence. The dark reading surface carries that atmosphere into the text."
              ru="Обложки задают настроение до первой строки. Тёмная поверхность чтения сохраняет эту атмосферу внутри текста."
            />
          </p>
        </div>
        <div className="story-wall-books">
          <figure>
            <Image
              src="/projects/orot/cover-1.webp"
              width={900}
              height={1592}
              alt="Terminal Station story artwork"
            />
            <figcaption>01 / TERMINAL STATION</figcaption>
          </figure>
          <figure>
            <Image
              src="/projects/orot/cover-2.webp"
              width={900}
              height={1592}
              alt="OROT original story artwork"
            />
            <figcaption>02 / ANOTHER WORLD</figcaption>
          </figure>
        </div>
        <span className="story-wall-note hand">
          <T en="a way into the language" ru="вход в новый язык" /> ↗
        </span>
      </section>
      <section className="decision-section">
        <div className="decision-copy">
          <Chapter
            number="02"
            en="UNDERSTANDING, IN CONTEXT"
            ru="ПОНИМАНИЕ В КОНТЕКСТЕ"
          >
            <T
              en={
                <>
                  An unfamiliar word.
                  <br />
                  <em>A familiar gesture.</em>
                </>
              }
              ru={
                <>
                  Незнакомое слово.
                  <br />
                  <em>Знакомый жест.</em>
                </>
              }
            />
          </Chapter>
          <p>
            <T
              en="A dictionary can explain a word. Keeping that explanation beside the sentence preserves why the word matters. A tap brings the meaning into focus without turning reading into a detour."
              ru="Словарь объясняет слово. Объяснение рядом с предложением сохраняет его смысл в контексте. Одно нажатие даёт значение, не превращая чтение в цепочку переходов."
            />
          </p>
          <div className="decision-callout">
            <span>↳</span>
            <p>
              <T
                en="Progressive disclosure: the text stays quiet until the reader asks for help."
                ru="Постепенное раскрытие: текст остаётся спокойным, пока читатель не попросит помощи."
              />
            </p>
          </div>
          <div className="decision-tags">
            <span>Interaction design</span>
            <span>Reading flow</span>
          </div>
        </div>
        <div>
          <StudyLabel />
          <KoreanStudy />
        </div>
      </section>
      <section className="orot-screen-spread">
        <div className="spread-side">
          <span className="eyebrow">READ → UNDERSTAND → KEEP</span>
          <h3 className="hand hand-mixed">
            <T
              en={
                <>
                  One sentence.
                  <br />
                  Three layers.
                </>
              }
              ru={
                <>
                  Одно предложение.
                  <br />
                  Три уровня.
                </>
              }
            />
          </h3>
          <svg viewBox="0 0 120 100" fill="none" aria-hidden="true">
            <path
              d="M5 10c75-9 109 12 80 70m0 0-3-24m3 24 23-11"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="orot-closeup">
          <ScreenViewer
            screen={{
              src: "/projects/orot/phone-reading.webp",
              width: 540,
              height: 1120,
              caption: {
                en: "The uninterrupted reading experience",
                ru: "Непрерывное чтение",
              },
            }}
          />
        </div>
        <div className="orot-closeup grammar">
          <ScreenViewer
            screen={{
              src: "/projects/orot/phone-grammar.webp",
              width: 540,
              height: 1120,
              caption: {
                en: "Grammar and meaning alongside the sentence",
                ru: "Грамматика и смысл рядом с предложением",
              },
            }}
          />
        </div>
        <p className="spread-footnote">
          <T
            en="Actual iPhone screens / Reading and sentence breakdown"
            ru="Оригинальные экраны iPhone / Чтение и разбор предложения"
          />
        </p>
      </section>
      <section className="reward-story">
        <div className="reward-copy">
          <Chapter
            number="03"
            en="A MEMORY OF THE JOURNEY"
            ru="ПАМЯТЬ О ПРОЙДЕННОМ"
          >
            <T
              en={
                <>
                  Make progress
                  <br />
                  <em>feel like something.</em>
                </>
              }
              ru={
                <>
                  Дать прогрессу
                  <br />
                  <em>ощутимую форму.</em>
                </>
              }
            />
          </Chapter>
          <p>
            <T
              en="A completed story becomes a collectible lightstick. A small object gives an abstract milestone a shape, a material and a place in a collection."
              ru="Прочитанная история превращается в коллекционный лайтстик. Маленький предмет даёт абстрактному достижению форму, материал и место в коллекции."
            />
          </p>
          <span className="hand">
            <T
              en="you don’t just finish it. you keep it."
              ru="не просто закончить. сохранить."
            />
          </span>
        </div>
        <div className="reward-object">
          <span className="reward-ring ring-a" />
          <span className="reward-ring ring-b" />
          <Image
            src="/projects/orot/lightstick.webp"
            width={600}
            height={900}
            alt="OROT collectible lightstick"
          />
          <span className="reward-label">OROT / STORY ARTEFACT 01</span>
        </div>
      </section>
    </>
  );
}
export function DipleStudy() {
  return (
    <>
      <section className="diple-editorial-statement">
        <p className="eyebrow">AN INTERFACE THAT KNOWS WHEN TO BE QUIET</p>
        <h2>
          <T
            en={
              <>
                A reading room.
                <br />
                <em>Not a feed.</em>
              </>
            }
            ru={
              <>
                Читальная комната.
                <br />
                <em>Не лента.</em>
              </>
            }
          />
        </h2>
        <div>
          <span className="editorial-star">✳</span>
          <p>
            <T
              en="The page gets the attention. Everything else earns its place."
              ru="Внимание достаётся странице. Всё остальное должно заслужить своё место."
            />
          </p>
        </div>
        <span className="editorial-folio">d. / 001</span>
      </section>
      <section className="book-spread">
        <div className="book-spread-left">
          <p className="eyebrow">
            01 / <T en="THE READING SURFACE" ru="ПОВЕРХНОСТЬ ЧТЕНИЯ" />
          </p>
          <div className="type-specimen">
            <span>Aa</span>
            <span className="specimen-baseline" />
            <span className="specimen-capline" />
          </div>
          <h3>
            <T
              en="A page with room to breathe."
              ru="Страница, которой есть чем дышать."
            />
          </h3>
          <p>
            <T
              en="Type size, margins, line spacing and paper tone are part of the reading experience. The interface lets the reader make those decisions."
              ru="Размер шрифта, поля, интерлиньяж и оттенок бумаги — часть опыта чтения. Интерфейс отдаёт эти решения читателю."
            />
          </p>
          <div className="paper-tones" aria-label="Reading paper tones">
            <span />
            <span />
            <span />
            <span />
          </div>
          <span className="hand">
            <T
              en="the details you feel before you notice."
              ru="детали, которые чувствуешь раньше, чем замечаешь."
            />
          </span>
        </div>
        <div className="book-spread-right">
          <div className="book-phone">
            <ScreenViewer
              screen={{
                src: "/projects/diple/reader.webp",
                width: 880,
                height: 1912,
                caption: {
                  en: "Typography and reading in diple",
                  ru: "Типографика и чтение в diple",
                },
              }}
            />
          </div>
          <span className="book-margin-note hand">
            <T
              en={
                <>
                  the page
                  <br />
                  comes first.
                </>
              }
              ru={
                <>
                  на первом месте —<br />
                  страница.
                </>
              }
            />
          </span>
          <span className="book-folio">02</span>
        </div>
      </section>
      <section className="decision-section">
        <div className="decision-copy">
          <Chapter
            number="02"
            en="FROM READING TO THINKING"
            ru="ОТ ЧТЕНИЯ К МЫСЛИ"
          >
            <T
              en={
                <>
                  The margin is
                  <br />
                  <em>part of the story.</em>
                </>
              }
              ru={
                <>
                  На полях
                  <br />
                  <em>продолжается история.</em>
                </>
              }
            />
          </Chapter>
          <p>
            <T
              en="A highlight should be the beginning of a thought. Notes sit beside the passages that prompted them; longer ideas can grow into their own pages."
              ru="Выделение должно быть началом мысли. Заметки живут рядом с породившими их отрывками, а длинные идеи могут вырасти в отдельные страницы."
            />
          </p>
          <div className="decision-callout">
            <span>↳</span>
            <p>
              <T
                en="One continuous flow: read → mark → reflect → return."
                ru="Один непрерывный путь: прочитать → отметить → осмыслить → вернуться."
              />
            </p>
          </div>
          <div className="decision-tags">
            <span>Information architecture</span>
            <span>Interaction design</span>
          </div>
        </div>
        <div>
          <StudyLabel />
          <ReadingStudy />
        </div>
      </section>
      <section className="desktop-editorial">
        <div className="desktop-editorial-title">
          <Chapter
            number="03"
            en="ONE PRODUCT. TWO SCALES."
            ru="ОДИН ПРОДУКТ. ДВА МАСШТАБА."
          >
            <T
              en={
                <>
                  A pocket library.
                  <br />
                  <em>A room on your Mac.</em>
                </>
              }
              ru={
                <>
                  Библиотека в кармане.
                  <br />
                  <em>Читальный зал на Mac.</em>
                </>
              }
            />
          </Chapter>
          <p>
            <T
              en="The same library has different needs on different screens. On Mac, a persistent sidebar, book grid and detail panel can share the space."
              ru="У одной библиотеки разные потребности на разных экранах. На Mac боковая панель, сетка книг и подробности могут занимать одно пространство."
            />
          </p>
        </div>
        <div className="mac-showcase">
          <div className="desktop-toolbar">
            <span>● ● ●</span>
            <span>diple. / macOS</span>
            <span>↗</span>
          </div>
          <ScreenViewer
            screen={{
              src: "/projects/diple/mac-library.webp",
              width: 2400,
              height: 1500,
              caption: {
                en: "diple library, designed for Mac",
                ru: "Библиотека diple, спроектированная для Mac",
              },
            }}
          />
        </div>
        <div className="desktop-annotations">
          <span>
            01 <T en="Navigate" ru="Навигация" />
          </span>
          <span>
            02 <T en="Explore" ru="Библиотека" />
          </span>
          <span>
            03 <T en="Continue" ru="Продолжить чтение" />
          </span>
        </div>
      </section>
    </>
  );
}
export function InkeptStudy() {
  return (
    <>
      <section className="inkept-manifesto">
        <Flower size={140} />
        <p className="eyebrow">A NOTEBOOK, RECONSIDERED</p>
        <h2 className="hand hand-mixed">
          <T
            en={
              <>
                Serious tools.
                <br />
                <span>A less serious face.</span>
              </>
            }
            ru={
              <>
                Серьёзный инструмент.
                <br />
                <span>Живой характер.</span>
              </>
            }
          />
        </h2>
        <p>
          <T
            en="A graph, formulas, spaced repetition. Enough structure to think deeply. Enough warmth to want to open it again."
            ru="Граф, формулы, интервальные повторения. Достаточно структуры, чтобы думать глубоко. Достаточно тепла, чтобы захотеть открыть снова."
          />
        </p>
        <Scribble />
      </section>
      <section className="craft-board">
        <div className="craft-board-heading">
          <p className="eyebrow">
            01 / <T en="THE VISUAL LANGUAGE" ru="ВИЗУАЛЬНЫЙ ЯЗЫК" />
          </p>
          <span className="hand">
            <T
              en="a few things that make it inkept ↘"
              ru="то, из чего складывается inkept ↘"
            />
          </span>
        </div>
        <div className="craft-pieces">
          <div className="craft-piece craft-ink">
            <span className="craft-label">01 / INK</span>
            <span className="hand">
              a thought
              <br />
              worth keeping.
            </span>
            <svg viewBox="0 0 200 30" aria-hidden="true">
              <path
                d="M8 15Q80 5 190 17M22 24Q110 14 175 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <p>
              <T en="A hand-drawn rhythm" ru="Рукописный ритм" />
            </p>
          </div>
          <div className="craft-piece craft-flower">
            <span className="craft-label">02 / CHARACTER</span>
            <Flower size={220} />
            <p className="hand">
              <T en="forget-me-not." ru="незабудка." />
            </p>
          </div>
          <div className="craft-piece craft-paper">
            <span className="craft-label">03 / MATERIAL</span>
            <div className="paper-sample sample-one" />
            <div className="paper-sample sample-two" />
            <div className="paper-sample sample-three" />
            <p>
              <T
                en="Paper. Graphite. Red pencil."
                ru="Бумага. Графит. Красный карандаш."
              />
            </p>
          </div>
        </div>
      </section>
      <section className="workspace-editorial">
        <div className="workspace-editorial-heading">
          <Chapter
            number="02"
            en="GIVE IDEAS MORE THAN ONE SHAPE"
            ru="ДАТЬ МЫСЛЯМ БОЛЬШЕ ОДНОЙ ФОРМЫ"
          >
            <T
              en={
                <>
                  A page. A board.
                  <br />
                  <em>A whole constellation.</em>
                </>
              }
              ru={
                <>
                  Страница. Доска.
                  <br />
                  <em>Целое созвездие.</em>
                </>
              }
            />
          </Chapter>
          <p>
            <T
              en="A note is linear. Thinking isn’t always. Different views let you see an idea in detail, beside its neighbours, or as part of a bigger pattern."
              ru="Заметка линейна. Мышление — не всегда. Разные представления позволяют увидеть идею подробно, рядом с соседними или как часть большой картины."
            />
          </p>
        </div>
        <InkeptViews />
      </section>
      <section className="decision-section">
        <div className="decision-copy">
          <Chapter
            number="03"
            en="TURN KNOWLEDGE INTO A HABIT"
            ru="ПРЕВРАТИТЬ ЗНАНИЕ В ПРИВЫЧКУ"
          >
            <T
              en={
                <>
                  Writing it down
                  <br />
                  <em>is only the beginning.</em>
                </>
              }
              ru={
                <>
                  Записать —<br />
                  <em>только начало.</em>
                </>
              }
            />
          </Chapter>
          <p>
            <T
              en="Any useful passage can become a flashcard. The interaction is deliberately simple: one question, one reveal, one moment of recall. FSRS handles when it returns."
              ru="Любой полезный отрывок может стать карточкой. Взаимодействие простое: один вопрос, одно раскрытие, один момент воспоминания. За время повторения отвечает FSRS."
            />
          </p>
          <div className="decision-callout">
            <span>↳</span>
            <p>
              <T
                en="The complex part stays underneath. The person just turns the card."
                ru="Сложная часть остаётся под поверхностью. Человек просто переворачивает карточку."
              />
            </p>
          </div>
          <div className="decision-tags">
            <span>Learning experience</span>
            <span>Native interaction</span>
          </div>
        </div>
        <div>
          <StudyLabel />
          <MemoryStudy />
        </div>
      </section>
      <section className="inkept-closing-spread">
        <div>
          <Asterisk />
          <h3 className="hand">
            <T
              en={
                <>
                  A little messy.
                  <br />
                  Entirely yours.
                </>
              }
              ru={
                <>
                  Немного живого
                  <br />
                  беспорядка. Твоего.
                </>
              }
            />
          </h3>
          <p>
            <T
              en="Plain files. Your folder. No account or tracking. A personal tool should leave you in control."
              ru="Обычные файлы. Твоя папка. Без аккаунта и трекинга. Личный инструмент оставляет контроль у тебя."
            />
          </p>
        </div>
        <div className="inkept-closing-phone">
          <ScreenViewer
            screen={{
              src: "/projects/inkept/iphone-5-typst-detail.webp",
              width: 745,
              height: 1600,
              caption: {
                en: "Diagrams inside an inkept note",
                ru: "Диаграммы внутри заметки inkept",
              },
            }}
          />
        </div>
        <div className="inkept-closing-phone closing-dark">
          <ScreenViewer
            screen={{
              src: "/projects/inkept/iphone-6-dark-detail.webp",
              width: 745,
              height: 1600,
              caption: {
                en: "inkept in dark appearance",
                ru: "Тёмная тема inkept",
              },
            }}
          />
        </div>
      </section>
    </>
  );
}

import Image from "next/image";
import { T } from "./text";
import { Scribble } from "./marks";

const tapes = [
  { label: "UI/UX", tone: "blue" },
  { label: "Swift & SwiftUI", tone: "pink" },
  { label: "Design engineering", tone: "green" },
  { label: "Figma", tone: "yellow" },
];

// "About" as an open sketchbook: a forget-me-not study on the left page, the
// words on the right. The plate is drawn in code by scripts/art/forget-me-not.mjs.
export function Sketchbook() {
  return (
    <section
      className="sketchbook-section page-width"
      aria-labelledby="about-title"
    >
      <div className="sketchbook">
        <div className="sketchbook-page sketchbook-plate">
          <div className="plate-board">
            <Image
              className="plate-art"
              src="/sketchbook/forget-me-not.webp"
              alt=""
              width={1120}
              height={1560}
              sizes="(max-width: 760px) 92vw, 590px"
              quality={90}
            />
            <div className="plate-notes" aria-hidden="true">
              <span className="plate-note note-fig">
                <T en="fig. 1 — myosotis" ru="рис. 1 — незабудка" />
              </span>
              <span className="plate-note note-buds">
                <T en="// buds start pink" ru="// бутоны розовые" />
              </span>
              <span className="plate-note note-open">
                <T en="…and open blue" ru="…а цветут голубым" />
              </span>
              <span className="plate-note note-zoom">
                <T en="fig. 2 — ×3" ru="рис. 2 — ×3" />
              </span>
              <span className="plate-note note-hex hex-blue">#93add6</span>
              <span className="plate-note note-hex hex-pink">#e2a8b8</span>
              <span className="plate-note note-hex hex-green">#a5b889</span>
            </div>
            <div className="plate-caption">
              <p className="hand">
                <T
                  en={
                    <>
                      Somewhere between
                      <br />a sketchbook
                      <br />& a code editor.
                    </>
                  }
                  ru={
                    <>
                      Где-то между
                      <br />
                      скетчбуком
                      <br />и редактором кода.
                    </>
                  }
                />
              </p>
              <span className="eyebrow">
                <T
                  en="THAT’S WHERE I FEEL AT HOME."
                  ru="ТАМ Я ЧУВСТВУЮ СЕБЯ ДОМА."
                />
              </span>
            </div>
          </div>
          <span className="folio" aria-hidden="true">
            24
          </span>
        </div>
        <div className="sketchbook-page sketchbook-words">
          <p className="eyebrow">
            <T en="A LITTLE ABOUT ME" ru="НЕМНОГО ОБО МНЕ" />
          </p>
          <h2 id="about-title">
            <T
              en={
                <>
                  I like when useful
                  <br />
                  also feels{" "}
                  <em>
                    personal.
                    <Scribble />
                  </em>
                </>
              }
              ru={
                <>
                  Люблю, когда в полезном
                  <br />
                  чувствуется{" "}
                  <em>
                    человек.
                    <Scribble />
                  </em>
                </>
              }
            />
          </h2>
          <p>
            <T
              en="I’m Alex, a UI/UX designer and iOS developer. I work across design and code because the way something feels matters as much as the way it works."
              ru="Я Алексей, UI/UX-дизайнер и iOS-разработчик. Соединяю дизайн и код, потому что ощущения от продукта для меня так же важны, как его работа."
            />
          </p>
          <p>
            <T
              en="My projects are places to read, learn and keep a thought. I’m drawn to quiet interfaces, tactile details and small moments that make a tool feel like your own."
              ru="Мои проекты — места для чтения, обучения и мыслей. Мне близки спокойные интерфейсы, осязаемые детали и мелочи, благодаря которым инструмент становится своим."
            />
          </p>
          <ul className="tape-tags">
            {tapes.map(({ label, tone }) => (
              <li key={label} className={`tape tape-${tone} hand`}>
                {label}
              </li>
            ))}
          </ul>
          <span className="folio" aria-hidden="true">
            25
          </span>
        </div>
        <span className="sketchbook-ribbon" aria-hidden="true">
          <span />
        </span>
      </div>
    </section>
  );
}

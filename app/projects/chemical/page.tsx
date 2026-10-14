import type { Metadata } from "next";
import Link from "next/link";
import { T } from "@/components/text";
import { Arrow } from "@/components/marks";
import { Flower } from "@/components/project-art";
import { TypeTester } from "@/components/type-tester";
import { SITE_URL } from "@/lib/site";

const SOURCE = "https://github.com/outsideness-x/chemical_font";

export const metadata: Metadata = {
  title: "chemical — a hand-drawn typeface",
  description:
    "chemical is a hand-drawn marker typeface for Latin, Cyrillic and all 11,172 Hangul syllables, inked by a simulated felt-tip pen. Try it in the browser.",
  alternates: { canonical: "/projects/chemical" },
};

export default function Chemical() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "chemical",
    genre: "Typeface",
    description:
      "A hand-drawn marker typeface for Latin, Cyrillic and Hangul, drawn as skeletons and inked by a simulated felt-tip pen.",
    url: `${SITE_URL}/projects/chemical`,
    author: { "@type": "Person", name: "Alex", url: SITE_URL },
  };
  return (
    <article className="case-page case-chemical">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <header className="case-cover cover-chemical">
        <div className="cover-topline">
          <Link href="/projects">
            ← <T en="Selected work" ru="Избранные проекты" />
          </Link>
          <span>TYPEFACE / 04</span>
          <a href={SOURCE} target="_blank" rel="noreferrer">
            GitHub <Arrow diagonal />
          </a>
        </div>
        <div className="cover-scene">
          <div className="cover-grid" aria-hidden="true" />
          <h1 className="hand">chemical</h1>
          <span className="chemical-sample chemical-sample-ru hand" aria-hidden="true">
            привет
          </span>
          <span className="chemical-sample chemical-sample-ko hand" aria-hidden="true">
            오롯
          </span>
          <span className="chemical-sample chemical-sample-hearts hand" aria-hidden="true">
            love notes
          </span>
          <span className="chemical-sample chemical-sample-credits hand" aria-hidden="true">
            film credits
          </span>
          <svg
            className="chemical-stroke"
            viewBox="0 0 600 120"
            fill="none"
            aria-hidden="true"
          >
            <path
              pathLength={1}
              d="M8 80C120 20 210 104 300 62S470 18 592 54"
              stroke="currentColor"
              strokeWidth="7"
              strokeLinecap="round"
            />
          </svg>
          <Flower className="chemical-flower" size={220} />
          <span className="cover-note hand">
            <T en="every letter, four ways ↙" ru="каждая буква — четырежды ↙" />
          </span>
        </div>
        <div className="cover-bottomline">
          <span>
            Latin · Cyrillic · Hangul <span className="cover-divider">/</span>{" "}
            <T en="Type design" ru="Дизайн шрифта" />
          </span>
          <p>
            <T
              en="A felt-tip pen that never draws the same letter twice."
              ru="Фломастер, который не рисует одну букву дважды."
            />
          </p>
          <a href="#try">
            <T en="Try it" ru="Попробовать" />
            <span>↓</span>
          </a>
        </div>
      </header>
      <div className="page-width" id="case-story">
        <dl className="case-facts">
          <div>
            <dt>
              <T en="MY PART" ru="МОЯ РОЛЬ" />
            </dt>
            <dd>
              <T en="Type design and tooling" ru="Дизайн шрифта и инструменты" />
            </dd>
          </div>
          <div>
            <dt>
              <T en="SCRIPTS" ru="ПИСЬМЕННОСТИ" />
            </dt>
            <dd>
              <T en="Latin, Cyrillic, Hangul" ru="Латиница, кириллица, хангыль" />
            </dd>
          </div>
          <div>
            <dt>
              <T en="HANGUL" ru="ХАНГЫЛЬ" />
            </dt>
            <dd>
              <T en="All 11,172 syllables" ru="Все 11 172 слога" />
            </dd>
          </div>
          <div>
            <dt>
              <T en="FEATURES" ru="ВОЗМОЖНОСТИ" />
            </dt>
            <dd>
              <T
                en="4 drawings per letter, 3 stylistic sets"
                ru="4 рисунка на букву, 3 стилистических набора"
              />
            </dd>
          </div>
        </dl>
        <section className="case-overview">
          <div>
            <p className="eyebrow">
              <T en="THE IDEA" ru="ИДЕЯ" />
            </p>
            <h2>
              <T
                en={"Drawn as a line.\nInked by a pen."}
                ru={"Нарисован линией.\nПрописан пером."}
              />
            </h2>
          </div>
          <p>
            <T
              en="Every letter is drawn as a skeleton, the centre line of a stroke, and then inked by a simulated felt-tip: a slightly flat nib held at an angle, pressure that swells and fades, ink that pools where the pen lands and bleeds at the edge. All 11,172 Hangul syllables go through the same pen, so text keeps one voice across languages."
              ru="Каждая буква рисуется как скелет — средняя линия штриха — и затем прописывается симулированным фломастером: чуть плоское перо под углом, нажим, который нарастает и слабеет, чернила, которые собираются там, где перо касается бумаги, и расплываются по краю. Все 11 172 слога хангыля проходят через то же перо, поэтому текст звучит одним голосом на всех языках."
            />
          </p>
        </section>
        <section className="type-try" id="try">
          <div className="chapter-heading">
            <p className="eyebrow">
              <span>01</span> / <T en="TRY IT" ru="ПОПРОБУЙТЕ" />
            </p>
            <h2>
              <T
                en={
                  <>
                    Type something.
                    <br />
                    <em>It writes back.</em>
                  </>
                }
                ru={
                  <>
                    Напишите что-нибудь.
                    <br />
                    <em>Шрифт ответит.</em>
                  </>
                }
              />
            </h2>
          </div>
          <TypeTester />
        </section>
        <section className="type-process">
          <div className="chapter-heading">
            <p className="eyebrow">
              <span>02</span> / <T en="HOW IT IS MADE" ru="КАК ОН СДЕЛАН" />
            </p>
            <h2>
              <T
                en={
                  <>
                    A pen, written
                    <br />
                    <em>in code.</em>
                  </>
                }
                ru={
                  <>
                    Перо,
                    <br />
                    <em>написанное кодом.</em>
                  </>
                }
              />
            </h2>
          </div>
          <ol className="type-steps">
            <li>
              <svg viewBox="0 0 120 120" fill="none" aria-hidden="true">
                <path
                  d="M28 66c18 2 52-2 58-20S70 18 52 22 22 52 34 76s50 24 64 10"
                  stroke="#9ebcdf"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx="28" cy="66" r="3" fill="#9ebcdf" />
                <circle cx="98" cy="86" r="3" fill="#9ebcdf" />
              </svg>
              <span className="type-step-index">01</span>
              <h3>
                <T en="Skeleton" ru="Скелет" />
              </h3>
              <p>
                <T
                  en="Each letter starts as its centre line, built from lines, curves, splines and bowls."
                  ru="Каждая буква начинается со средней линии, собранной из прямых, кривых, сплайнов и чаш."
                />
              </p>
            </li>
            <li>
              <svg viewBox="0 0 120 120" fill="none" aria-hidden="true">
                <defs>
                  <filter id="ragged" x="-20%" y="-20%" width="140%" height="140%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" />
                    <feDisplacementMap in="SourceGraphic" scale="3.2" />
                  </filter>
                </defs>
                <path
                  d="M28 66c18 2 52-2 58-20S70 18 52 22 22 52 34 76s50 24 64 10"
                  stroke="#eeeae2"
                  strokeWidth="9"
                  strokeLinecap="round"
                  filter="url(#ragged)"
                />
              </svg>
              <span className="type-step-index">02</span>
              <h3>
                <T en="Pen" ru="Перо" />
              </h3>
              <p>
                <T
                  en="A simulated felt-tip inks it: nib angle, pressure, ink pooling in tight turns, a ragged edge."
                  ru="Симулированный фломастер прописывает её: угол пера, нажим, чернила в тугих поворотах, рваный край."
                />
              </p>
            </li>
            <li>
              <span className="type-step-glyph hand" aria-hidden="true">
                e
              </span>
              <span className="type-step-index">03</span>
              <h3>
                <T en="Font" ru="Шрифт" />
              </h3>
              <p>
                <T
                  en="The ink is fitted back to clean curves, kerned from the ink itself and exported for iOS, the web and Figma."
                  ru="Чернила снова становятся чистыми кривыми, кернинг считается по самим чернилам, а шрифт собирается для iOS, веба и Figma."
                />
              </p>
            </li>
          </ol>
          <div className="type-twins">
            <p className="eyebrow">
              <T en="NEVER TWINS" ru="НИКАКИХ БЛИЗНЕЦОВ" />
            </p>
            <p className="type-twins-sample hand" aria-label="aaaaaa ллллл 오오오">
              <span>aaaaaa</span>
              <span>лллллл</span>
              <span lang="ko">오오오</span>
            </p>
            <p className="type-twins-note">
              <T
                en="The same letter typed six times, drawn four different ways. The drawing depends on the letter before it, so doubled letters never look copied."
                ru="Одна и та же буква шесть раз подряд, нарисованная четырьмя способами. Рисунок зависит от предыдущей буквы, поэтому двойные буквы не выглядят скопированными."
              />
            </p>
          </div>
        </section>
        <section className="case-try">
          <div>
            <p className="eyebrow">
              <T en="A TYPEFACE, A PRODUCT, A WHOLE IDENTITY" ru="ШРИФТ, ПРОДУКТ, ЦЕЛАЯ АЙДЕНТИКА" />
            </p>
            <h2>
              <T en="Need a hand like this?" ru="Нужен такой почерк?" />
            </h2>
          </div>
          <div className="case-contact-actions">
            <Link className="button button-light" href="/contacts">
              <T en="Discuss a project" ru="Обсудить проект" />
              <Arrow diagonal />
            </Link>
            <a className="text-link" href={SOURCE} target="_blank" rel="noreferrer">
              <T en="Source on GitHub" ru="Исходники на GitHub" />
              <Arrow diagonal />
            </a>
          </div>
        </section>
        <Link href="/projects/orot" className="next-project next-orot">
          <div>
            <p className="eyebrow">
              <T en="NEXT PROJECT" ru="СЛЕДУЮЩИЙ ПРОЕКТ" /> / 01
            </p>
            <h2>OROT</h2>
            <p>
              <T en="A language begins with a story." ru="Язык начинается с истории." />
            </p>
          </div>
          <span className="round-link glass">
            <Arrow diagonal />
          </span>
        </Link>
      </div>
    </article>
  );
}

import Image from "next/image";
import Link from "next/link";
import { T } from "./text";
import { Arrow } from "./marks";
import { Device } from "./reel";

// The work that isn't an app screen: a typeface, a character, motion.
export function Beyond({ showTypeface = true }: { showTypeface?: boolean }) {
  return (
    <section className="beyond page-width">
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            <T en="BEYOND THE APPS" ru="НЕ ТОЛЬКО ПРИЛОЖЕНИЯ" />
          </p>
          <h2>
            <T
              en="A typeface, a character, a lot of motion."
              ru="Шрифт, персонаж и много движения."
            />
          </h2>
        </div>
        <Link className="text-link" href="/playground">
          <T en="Open the playground" ru="Открыть площадку" />
          <Arrow diagonal />
        </Link>
      </div>
      <div className={`beyond-grid ${showTypeface ? "" : "beyond-grid-two"}`}>
        {showTypeface && (
          <Link href="/projects/chemical" className="beyond-card beyond-type">
            <div className="beyond-visual" aria-hidden="true">
              <span className="hand beyond-type-sample">Aa</span>
              <span className="hand beyond-type-ru">Яя</span>
              <span className="hand beyond-type-ko">한</span>
            </div>
            <div className="beyond-info">
              <h3>chemical</h3>
              <p>
                <T
                  en="My felt-tip typeface: Latin, Cyrillic and 11,172 Hangul syllables."
                  ru="Мой шрифт-фломастер: латиница, кириллица и 11 172 слога хангыля."
                />
              </p>
            </div>
          </Link>
        )}
        <Link href="/projects/orot#beyond" className="beyond-card beyond-mascot">
          <div className="beyond-visual" aria-hidden="true">
            <Image
              src="/projects/orot/brand/pose-wave.webp"
              alt=""
              width={480}
              height={480}
              sizes="220px"
            />
          </div>
          <div className="beyond-info">
            <h3>
              <T en="OROT’s dokkaebi" ru="Токкэби OROT" />
            </h3>
            <p>
              <T
                en="A character, six alternate icons and lessons on social media."
                ru="Персонаж, шесть альтернативных иконок и уроки в соцсетях."
              />
            </p>
          </div>
        </Link>
        <Link href="/playground" className="beyond-card beyond-play">
          <div className="beyond-visual" aria-hidden="true">
            <Device className="beyond-device">
              <Image
                src="/projects/orot/motion/lightstick.webp"
                alt=""
                fill
                sizes="120px"
                className="reel-poster"
              />
            </Device>
            <Device className="beyond-device beyond-device-two">
              <Image
                src="/projects/diple/motion/ink-highlight.webp"
                alt=""
                fill
                sizes="120px"
                className="reel-poster"
              />
            </Device>
          </div>
          <div className="beyond-info">
            <h3>
              <T en="Playground" ru="Площадка" />
            </h3>
            <p>
              <T
                en="Twelve interactions from the apps, recorded in motion."
                ru="Двенадцать взаимодействий из приложений, записанных в движении."
              />
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
}

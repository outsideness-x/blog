import Image from "next/image";
import { T } from "./text";
import { ScreenViewer } from "./screen-viewer";
import { FilmPlayer, LoopVideo } from "./media";

const icons = [
  { file: "banjjak_lightstick", ko: "반짝", en: "Sparkle", ru: "Блеск" },
  { file: "changmun_panel", ko: "창문", en: "Window", ru: "Окно" },
  { file: "dojang_seal", ko: "도장", en: "Seal", ru: "Печать" },
  { file: "sticker_name", ko: "스티커", en: "Sticker", ru: "Стикер" },
  { file: "kkakkung_peek", ko: "까꿍", en: "Peekaboo", ru: "Ку-ку" },
  {
    file: "daltokki_moon_rabbit",
    ko: "달토끼",
    en: "Moon rabbit",
    ru: "Лунный кролик",
  },
];
const poses = ["wave", "idea", "point", "bow", "thinking", "hop"];
const slides = ["01", "02", "03", "07", "08", "09"];

// Everything around the OROT app that gives it a face: a character, icons
// and a voice on social media, all drawn in the app's own hand.
export function BrandWorld() {
  return (
    <section className="brand-world" id="beyond">
      <div className="motion-intro">
        <div className="chapter-heading">
          <p className="eyebrow">
            <span>05</span> /{" "}
            <T en="BEYOND THE APP" ru="ЗА ПРЕДЕЛАМИ ПРИЛОЖЕНИЯ" />
          </p>
          <h2>
            <T
              en={
                <>
                  A world around
                  <br />
                  <em>the stories.</em>
                </>
              }
              ru={
                <>
                  Мир вокруг
                  <br />
                  <em>историй.</em>
                </>
              }
            />
          </h2>
        </div>
        <p>
          <T
            en="A product is more than its screens. OROT has a character, alternate icons and a voice on social media, all drawn in the app’s own hand: paper, ink and manhwa."
            ru="Продукт — это больше, чем экраны. У OROT есть персонаж, альтернативные иконки и голос в соцсетях, и всё нарисовано почерком самого приложения: бумага, тушь и манхва."
          />
        </p>
      </div>

      <div className="brand-mascot">
        <div className="brand-mascot-film">
          <T
            en={
              <LoopVideo
                src="/projects/orot/motion/mascot-hello-en.mp4"
                poster="/projects/orot/motion/mascot-hello-en.webp"
                width={720}
                height={900}
                label="OROT mascot"
              />
            }
            ru={
              <LoopVideo
                src="/projects/orot/motion/mascot-hello-ru.mp4"
                poster="/projects/orot/motion/mascot-hello-ru.webp"
                width={720}
                height={900}
                label="Маскот OROT"
              />
            }
          />
        </div>
        <div className="brand-mascot-copy">
          <p className="eyebrow">
            <T en="THE CHARACTER" ru="ПЕРСОНАЖ" />
          </p>
          <h3>
            <T en="A guide with no name." ru="Проводник без имени." />
          </h3>
          <p>
            <T
              en="A one-legged dokkaebi from Korean folk tales. He makes no sound and speaks only in balloons, always in the reader’s language. He guides the Hangul lessons on social media, and his next stop is the app itself."
              ru="Одноногий токкэби из корейских сказок. Он не издаёт ни звука и говорит только облачками, всегда на языке читателя. Он ведёт уроки хангыля в соцсетях, а следующая остановка — само приложение."
            />
          </p>
          <div className="brand-poses" aria-label="Poses">
            {poses.map((pose) => (
              <Image
                key={pose}
                src={`/projects/orot/brand/pose-${pose}.webp`}
                alt=""
                width={480}
                height={480}
                sizes="96px"
              />
            ))}
          </div>
          <div className="brand-sheet">
            <ScreenViewer
              screen={{
                src: "/projects/orot/brand/mascot-sheet.webp",
                width: 2000,
                height: 1125,
                caption: {
                  en: "OROT mascot model sheet: faces, working poses and inks",
                  ru: "Модельный лист маскота OROT: лица, рабочие позы и краски",
                },
              }}
            />
            <span className="hand">
              <T en="the model sheet ↗" ru="модельный лист ↗" />
            </span>
          </div>
        </div>
      </div>

      <div className="brand-icons">
        <div className="brand-icons-copy">
          <p className="eyebrow">
            <T en="ALTERNATE APP ICONS" ru="АЛЬТЕРНАТИВНЫЕ ИКОНКИ" />
          </p>
          <h3>
            <T
              en="Six ways to wear the app."
              ru="Шесть способов носить приложение."
            />
          </h3>
          <p>
            <T
              en="OROT Pro readers can pick their own icon. One rule for all six: flat pastel fills, wobbling ink outlines, light drawn as rays and sparkles. No gradients, no glow."
              ru="Читатели OROT Pro могут выбрать свою иконку. Одно правило для всех шести: плоские пастельные заливки, дрожащий контур тушью, свет нарисован лучами и искрами. Без градиентов и свечения."
            />
          </p>
        </div>
        <ul className="brand-icon-grid">
          {icons.map((icon) => (
            <li key={icon.file}>
              <Image
                src={`/projects/orot/brand/icon-${icon.file}.webp`}
                alt={`${icon.en} icon`}
                width={360}
                height={360}
                sizes="(max-width: 760px) 26vw, 120px"
              />
              <span lang="ko">{icon.ko}</span>
              <small>
                <T en={icon.en} ru={icon.ru} />
              </small>
            </li>
          ))}
        </ul>
      </div>

      <div className="brand-social">
        <div className="brand-social-copy">
          <p className="eyebrow">
            <T en="ON SOCIAL MEDIA" ru="В СОЦСЕТЯХ" />
          </p>
          <h3>
            <T
              en="Lessons where learners scroll."
              ru="Уроки там, где листают ленту."
            />
          </h3>
          <p>
            <T
              en="A ten-slide carousel teaches Hangul in one sitting, with the dokkaebi heckling from the margins. Short films explain a single word, like the difference between 켜다 and 켜지다."
              ru="Карусель из десяти слайдов учит хангыль за один присест, а токкэби комментирует с полей. Короткие ролики объясняют одно слово, например разницу между 켜다 и 켜지다."
            />
          </p>
        </div>
        <div
          className="brand-carousel"
          role="region"
          tabIndex={0}
          aria-label="Hangul carousel slides"
        >
          {slides.map((slide) => (
            <Image
              key={slide}
              src={`/projects/orot/brand/carousel-${slide}.webp`}
              alt=""
              width={640}
              height={853}
              sizes="(max-width: 760px) 62vw, 240px"
            />
          ))}
        </div>
        <div className="brand-film">
          <FilmPlayer
            src="/projects/orot/brand/reel-changmun.mp4"
            poster="/projects/orot/brand/reel-changmun.webp"
            width={540}
            height={960}
            title="OROT — 창문, a 15-second film about 켜다 and 켜지다"
          />
          <span className="hand">
            <T en="창문, a 15-second film" ru="창문, фильм на 15 секунд" />
          </span>
        </div>
      </div>
    </section>
  );
}

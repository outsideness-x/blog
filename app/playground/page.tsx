import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { T } from "@/components/text";
import { Arrow, Asterisk } from "@/components/marks";
import { Device } from "@/components/reel";
import { FilmPlayer, LoopVideo } from "@/components/media";
import { dipleMotion, orotMotion } from "@/lib/motion";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Interactions, characters and small experiments from OROT, diple. and inkept, recorded in the shipping apps.",
  alternates: { canonical: "/playground" },
};

const clips = orotMotion.flatMap((item, i) =>
  [
    { ...item, app: "OROT", href: "/projects/orot" },
    dipleMotion[i] && {
      ...dipleMotion[i],
      app: "diple.",
      href: "/projects/diple",
    },
  ].filter(Boolean),
) as ((typeof orotMotion)[number] & { app: string; href: string })[];

export default function Playground() {
  return (
    <div className="page-width playground-page">
      <div className="page-intro">
        <p className="eyebrow">
          <T en="PLAYGROUND / IN MOTION" ru="ПЛОЩАДКА / В ДВИЖЕНИИ" />
        </p>
        <h1>
          <T en="Small things, moving." ru="Мелочи в движении." />
          <Asterisk />
        </h1>
        <div className="intro-bottom">
          <p>
            <T
              en="Interactions, characters and experiments from the apps and around them. Everything here was recorded in a shipping product, nothing is a mock-up. Tap any clip to pause it."
              ru="Взаимодействия, персонажи и эксперименты из приложений и вокруг них. Всё записано в живых продуктах, ничего не нарисовано отдельно. Нажмите на любой ролик, чтобы поставить его на паузу."
            />
          </p>
          <span className="hand hand-mixed">
            <T en="the details are the design ↘" ru="детали и есть дизайн ↘" />
          </span>
        </div>
      </div>
      <div className="play-grid">
        {clips.map((clip, i) => (
          <Fragment key={clip.id}>
            <figure className="play-tile">
              <Device>
                <LoopVideo
                  src={clip.video!}
                  poster={clip.poster}
                  width={600}
                  height={1304}
                  label={clip.title.en}
                />
              </Device>
              <figcaption>
                <Link href={clip.href}>{clip.app}</Link>
                <span>
                  <T {...clip.title} />
                </span>
              </figcaption>
            </figure>
            {i === 3 && (
              <figure className="play-tile play-tile-wide play-paper">
                <LoopVideo
                  src="/projects/orot/motion/mascot-idle.mp4"
                  poster="/projects/orot/motion/mascot-idle.webp"
                  width={720}
                  height={900}
                  label="OROT mascot"
                />
                <figcaption>
                  <Link href="/projects/orot#beyond">OROT</Link>
                  <span>
                    <T
                      en="The dokkaebi, waiting for you to read"
                      ru="Токкэби ждёт, пока вы читаете"
                    />
                  </span>
                </figcaption>
              </figure>
            )}
            {i === 7 && (
              <figure className="play-tile play-tile-wide play-film">
                <FilmPlayer
                  src="/projects/orot/brand/reel-changmun.mp4"
                  poster="/projects/orot/brand/reel-changmun.webp"
                  width={540}
                  height={960}
                  title="OROT — 창문, a 15-second film about 켜다 and 켜지다"
                />
                <figcaption>
                  <Link href="/projects/orot#beyond">OROT</Link>
                  <span>
                    <T
                      en="창문: a 15-second film about one verb"
                      ru="창문: 15-секундный фильм об одном глаголе"
                    />
                  </span>
                </figcaption>
              </figure>
            )}
          </Fragment>
        ))}
        <Link href="/projects/chemical" className="play-tile play-note">
          <span className="eyebrow">
            <T en="AND A TYPEFACE" ru="И ЕЩЁ ШРИФТ" />
          </span>
          <span className="play-note-sample hand">Aa Яя 한</span>
          <span className="play-note-copy">
            <T
              en="Every handwritten note on this site is set in chemical, my own felt-tip typeface. Try it."
              ru="Все рукописные заметки на этом сайте набраны chemical — моим шрифтом-фломастером. Попробуйте его."
            />
          </span>
          <span className="play-note-link">
            <T en="Type something" ru="Написать что-нибудь" />
            <Arrow diagonal />
          </span>
        </Link>
        <div className="play-tile play-note play-note-glass">
          <span className="eyebrow">
            <T en="LOOK UP" ru="ПОСМОТРИТЕ НАВЕРХ" />
          </span>
          <span className="play-note-title">
            <T
              en="The navigation is real glass."
              ru="Навигация — настоящее стекло."
            />
          </span>
          <span className="play-note-copy">
            <T
              en="The bar at the top bends the page under it through a displacement lens, and turns its labels dark over pale artwork. Switch pages and watch the lens travel."
              ru="Панель наверху преломляет страницу под собой через линзу смещения и делает подписи тёмными над светлыми картинками. Переключите страницу и посмотрите, как линза едет."
            />
          </span>
        </div>
      </div>
      <div className="work-index-end">
        <p className="hand">
          <T
            en="Want details like these in your product?"
            ru="Хотите такие детали в своём продукте?"
          />
        </p>
        <Link href="/contacts" className="button button-light">
          <T en="Start a project" ru="Обсудить проект" />
          <Arrow diagonal />
        </Link>
      </div>
    </div>
  );
}

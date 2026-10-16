import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { T } from "@/components/text";
import { Arrow, Scribble } from "@/components/marks";
import { Flower } from "@/components/project-art";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects";
import { Services } from "@/components/services";
import { Beyond } from "@/components/beyond";
import { Sketchbook } from "@/components/sketchbook";
import { CONTACT, CONTACT_LINKS, PERSON_SCHEMA } from "@/lib/site";
export const metadata: Metadata = {
  title: { absolute: "Alex — UI/UX designer & iOS developer" },
  alternates: { canonical: "/" },
};
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_SCHEMA) }}
      />
      <section className="home-hero page-width">
        <div className="hero-eyebrow">
          <span className="tiny-cross">✳︎</span>
          <T
            en="INDEPENDENT DESIGNER & DEVELOPER"
            ru="НЕЗАВИСИМЫЙ ДИЗАЙНЕР И РАЗРАБОТЧИК"
          />
          <span className="hero-index">
            <T en="PORTFOLIO — 2026" ru="ПОРТФОЛИО — 2026" />
          </span>
        </div>
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="hand hero-hello">
              <T en="hey, I’m Alex" ru="привет, я Алексей" /> <span>↘︎</span>
            </p>
            <h1>
              <T
                en={
                  <>
                    I make it feel right.
                    <br />I make it{" "}
                    <span className="hero-feeling">
                      real.
                      <Scribble />
                    </span>
                  </>
                }
                ru={
                  <>
                    Продумываю, как ощущается.
                    <br />Делаю, чтобы{" "}
                    <span className="hero-feeling">
                      работало.
                      <Scribble />
                    </span>
                  </>
                }
              />
            </h1>
            <p className="hero-description">
              <T
                en="UI/UX design and native iOS development, in one pair of hands. From the first idea to the app you can actually use."
                ru="UI/UX-дизайн и нативная iOS-разработка в одних руках. От первой идеи до приложения, которым можно пользоваться."
              />
            </p>
            <div className="hero-actions">
              <Link className="button button-light" href="/projects">
                <T en="Explore my work" ru="Посмотреть проекты" />
                <Arrow diagonal />
              </Link>
              <Link href="/contacts" className="hero-talk">
                <T en="Let’s talk" ru="Обсудим проект" />
                <Arrow diagonal />
              </Link>
            </div>
          </div>
          {/* A working sketch: the screen is still pencil above the line and
              finished below it. The three apps are stuck on as stickers. */}
          <div className="hero-sketch" aria-hidden="true">
            <Image
              className="hero-sketch-art"
              src="/sketchbook/hero.webp"
              alt=""
              width={1240}
              height={1280}
              sizes="(max-width: 760px) 92vw, 600px"
              priority
            />
            <span className="sticker sticker-orot">
              <Image
                src="/projects/orot/icon.webp"
                alt=""
                width={150}
                height={150}
              />
            </span>
            <span className="sticker sticker-diple">
              <Image
                src="/projects/diple/icon.webp"
                alt=""
                width={150}
                height={150}
              />
            </span>
            <span className="sticker sticker-cut sticker-inkept">
              <Flower size={125} />
            </span>
            <span className="sketch-note note-sketch">
              <T en="v0.1 — a sketch ↗" ru="v0.1 — набросок ↗" />
            </span>
            <span className="sketch-note note-shipped">
              <T en="↖ v1.0 — shipped" ru="↖ v1.0 — в App Store" />
            </span>
            <div className="hero-paper">
              <span className="hand">
                <T
                  en={
                    <>
                      a little craft.
                      <br />a lot of care.
                    </>
                  }
                  ru={
                    <>
                      немного ремесла.
                      <br />
                      много внимания.
                    </>
                  }
                />
              </span>
              <span className="paper-star">✳︎</span>
            </div>
          </div>
        </div>
        <div className="hero-facts">
          <div>
            <strong>3</strong>
            <span>
              <T
                en="apps of my own, live on the App Store"
                ru="собственных приложения уже в App Store"
              />
            </span>
          </div>
          <div>
            <strong>iPhone · iPad · Mac</strong>
            <span>
              <T
                en="native, in Swift and SwiftUI"
                ru="нативно, на Swift и SwiftUI"
              />
            </span>
          </div>
          <div>
            <strong>1</strong>
            <span>
              <T
                en="person, from the first sketch to the release"
                ru="человек от первого наброска до релиза"
              />
            </span>
          </div>
          <a href="#selected">
            <T en="A few things I’ve made" ru="Несколько моих работ" />
            <span>↓</span>
          </a>
        </div>
      </section>
      <section id="selected" className="selected-section page-width">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              <T en="SELECTED WORK / 01—03" ru="ИЗБРАННОЕ / 01—03" />
            </p>
            <h2>
              <T
                en="Designed. Built. Shipped."
                ru="Спроектировано. Создано. Выпущено."
              />
            </h2>
          </div>
          <Link className="text-link" href="/projects">
            <T en="All projects" ru="Все проекты" />
            <Arrow diagonal />
          </Link>
        </div>
        <div className="selected-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
      <Beyond />
      <Services />
      <Sketchbook />
      {/* A postcard to finish: the message on the left, the address on the right. */}
      <section className="postcard-section page-width">
        <div className="postcard">
          <div className="postcard-message">
            <p className="hand">
              <T
                en="Your next product starts here."
                ru="Ваш следующий продукт начинается здесь."
              />
            </p>
            <h2>
              <T
                en="Let’s make something worth using."
                ru="Создадим то, чем захочется пользоваться."
              />
            </h2>
            <Link href="/contacts" className="button button-light">
              <T en="Start a project" ru="Обсудить проект" />
              <Arrow diagonal />
            </Link>
            <Image
              className="postcard-sprig"
              src="/sketchbook/sprig.webp"
              alt=""
              width={520}
              height={320}
              sizes="250px"
            />
          </div>
          <div className="postcard-address">
            <span className="postcard-stamp" aria-hidden="true">
              <Flower size={100} />
            </span>
            <span className="postcard-postmark" aria-hidden="true">
              chemical pink · 2026
            </span>
            <p className="eyebrow">
              <T en="WRITE TO" ru="КУДА ПИСАТЬ" />
            </p>
            <a className="hand" href={CONTACT_LINKS.email}>
              {CONTACT.email}
            </a>
            <a
              className="hand"
              href={CONTACT_LINKS.telegram}
              target="_blank"
              rel="noreferrer"
            >
              Telegram @{CONTACT.telegram}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

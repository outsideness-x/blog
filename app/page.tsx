import type { Metadata } from "next";
import Link from "next/link";
import { T } from "@/components/text";
import { Asterisk, Arrow, Scribble } from "@/components/marks";
import { Flower } from "@/components/project-art";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects";
import { Services } from "@/components/services";
import { HeroReel } from "@/components/hero-reel";
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
          <span className="tiny-cross">✳</span>
          <T
            en="INDEPENDENT DESIGNER & DEVELOPER"
            ru="НЕЗАВИСИМЫЙ ДИЗАЙНЕР И РАЗРАБОТЧИК"
          />
          <span className="hero-index">PORTFOLIO — 2026</span>
        </div>
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="hand hero-hello">
              <T en="hey, I’m Alex" ru="привет, я Алексей" /> <span>↘</span>
            </p>
            <h1>
              <T
                en={
                  <>
                    I design it.
                    <br />I{" "}
                    <span className="hero-feeling">
                      build
                      <Scribble />
                    </span>{" "}
                    it.
                  </>
                }
                ru={
                  <>
                    Я проектирую.
                    <br />И{" "}
                    <span className="hero-feeling">
                      создаю.
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
          <div className="hero-object">
            <HeroReel />
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
              <T en="native, in Swift and SwiftUI" ru="нативно, на Swift и SwiftUI" />
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
      <Services />
      <section className="about-section page-width">
        <div className="about-note">
          <Asterisk />
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
          <span className="eyebrow">THAT’S WHERE I FEEL AT HOME.</span>
        </div>
        <div className="about-copy">
          <p className="eyebrow">
            <T en="A LITTLE ABOUT ME" ru="НЕМНОГО ОБО МНЕ" />
          </p>
          <h2>
            <T
              en={
                <>
                  I like when useful
                  <br />
                  also feels <em>personal.</em>
                </>
              }
              ru={
                <>
                  Люблю, когда в полезном
                  <br />
                  чувствуется <em>человек.</em>
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
          <div className="skill-tags">
            <span>UI/UX</span>
            <span>Swift & SwiftUI</span>
            <span>Design engineering</span>
            <span>Figma</span>
          </div>
        </div>
      </section>
      <section className="contact-strip page-width">
        <Flower size={100} />
        <div>
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
          <div className="contact-strip-links">
            <a href={CONTACT_LINKS.email}>{CONTACT.email}</a>
            <a href={CONTACT_LINKS.telegram} target="_blank" rel="noreferrer">
              Telegram @{CONTACT.telegram}
            </a>
          </div>
        </div>
        <Link href="/contacts" className="button button-light">
          <T en="Start a project" ru="Обсудить проект" />
          <Arrow diagonal />
        </Link>
      </section>
    </>
  );
}

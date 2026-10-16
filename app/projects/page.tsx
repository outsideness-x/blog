import type { Metadata } from "next";
import Link from "next/link";
import { T } from "@/components/text";
import { ProjectArt } from "@/components/project-art";
import { projects } from "@/lib/projects";
import { Asterisk, Arrow } from "@/components/marks";
import { Beyond } from "@/components/beyond";
export const metadata: Metadata = {
  title: "Projects",
  description:
    "OROT, diple. and inkept, apps designed and built by Alex for iPhone, iPad and Mac, and chemical, a hand-drawn typeface.",
  alternates: { canonical: "/projects" },
};
export default function Projects() {
  return (
    <div className="page-width projects-page">
      <div className="page-intro">
        <p className="eyebrow">
          <T
            en="INDEPENDENT PRODUCTS / SELECTED WORK"
            ru="НЕЗАВИСИМЫЕ ПРОДУКТЫ / ИЗБРАННЫЕ РАБОТЫ"
          />
        </p>
        <h1>
          <T en="Made with intent." ru="Сделано со смыслом." />
          <Asterisk />
        </h1>
        <div className="intro-bottom">
          <p>
            <T
              en="Three apps and a typeface, from the first design decision to the version in your hands."
              ru="Три приложения и шрифт — от первого дизайн-решения до версии у вас в руках."
            />
          </p>
          <span className="hand hand-mixed">
            <T
              en="designed. built. out in the world. ↘︎"
              ru="спроектировано. разработано. выпущено. ↘︎"
            />
          </span>
        </div>
      </div>
      <div className="work-index">
        {projects.map((project) => (
          <Link
            href={`/projects/${project.slug}`}
            key={project.slug}
            className={`work-row work-row-${project.slug}`}
          >
            <div className="work-row-copy">
              <p className="eyebrow">
                /{project.number} <span>—</span> {project.platform}
              </p>
              <h2>{project.name}</h2>
              <h3>
                <T {...project.line} />
              </h3>
              <p className="work-row-description">
                <T {...project.description} />
              </p>
              <div className="work-row-tags">
                {project.tags.map((tag) => (
                  <span key={tag.en}>
                    <T {...tag} />
                  </span>
                ))}
              </div>
              <span className="work-row-link">
                <T en="Explore the case" ru="Смотреть кейс" />
                <Arrow diagonal />
              </span>
            </div>
            <div className="work-row-art">
              <ProjectArt slug={project.slug} />
              <span className="work-row-badge glass">
                <Arrow diagonal />
              </span>
            </div>
          </Link>
        ))}
        <Link href="/projects/chemical" className="work-row work-row-chemical">
          <div className="work-row-copy">
            <p className="eyebrow">
              /04 <span>—</span> <T en="Typeface" ru="Шрифт" />
            </p>
            <h2>chemical</h2>
            <h3>
              <T
                en="A pen that never draws the same letter twice."
                ru="Перо, которое не рисует одну букву дважды."
              />
            </h3>
            <p className="work-row-description">
              <T
                en="A hand-drawn marker typeface for Latin, Cyrillic and all 11,172 Hangul syllables, inked by a simulated felt-tip pen."
                ru="Рукописный маркерный шрифт для латиницы, кириллицы и всех 11 172 слогов хангыля, прописанный симулированным фломастером."
              />
            </p>
            <div className="work-row-tags">
              <span>
                <T en="Type design" ru="Дизайн шрифта" />
              </span>
              <span>
                <T en="Tooling" ru="Инструменты" />
              </span>
            </div>
            <span className="work-row-link">
              <T en="Try the typeface" ru="Попробовать шрифт" />
              <Arrow diagonal />
            </span>
          </div>
          <div className="work-row-art">
            <div className="project-art art-chemical" aria-hidden="true">
              <span className="art-chemical-word hand">chemical</span>
              <span className="art-chemical-ko hand">오롯</span>
              <span className="art-chemical-ru hand">привет</span>
              <span className="art-chemical-hearts hand">love notes</span>
            </div>
            <span className="work-row-badge glass">
              <Arrow diagonal />
            </span>
          </div>
        </Link>
      </div>
      <Beyond showTypeface={false} />
      <div className="work-index-end">
        <p className="hand">
          <T en="The next one could be yours." ru="Следующим может быть ваш." />
        </p>
        <Link href="/contacts" className="button button-light">
          <T en="Let’s talk" ru="Обсудим" />
          <Arrow diagonal />
        </Link>
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/projects";
import { T } from "./text";
import { Arrow, Asterisk } from "./marks";
import { Flower } from "./project-art";

export function CaseCover({ project }: { project: Project }) {
  return (
    <header className={`case-cover cover-${project.slug}`}>
      <div className="cover-topline">
        <Link href="/projects">
          ← <T en="Selected work" ru="Избранные проекты" />
        </Link>
        <span>INDEPENDENT PRODUCT / {project.number}</span>
        <a href={project.store} target="_blank" rel="noreferrer">
          App Store <Arrow diagonal />
        </a>
      </div>
      <div className="cover-scene">
        <div className="cover-grid" aria-hidden="true" />
        <h1>{project.name}</h1>
        {project.slug === "orot" && (
          <>
            <span className="cover-korean hand" aria-hidden="true">
              오롯
            </span>
            <div className="cover-orot-book">
              <Image
                src="/projects/orot/cover-1.webp"
                width={900}
                height={1592}
                alt="OROT — Terminal Station story cover"
                priority
              />
              <span className="hand">
                <T
                  en="a story worth getting lost in"
                  ru="история, в которой хочется остаться"
                />
              </span>
            </div>
            <Image
              className="cover-orot-reading"
              src="/projects/orot/phone-reading.webp"
              width={540}
              height={1120}
              alt="OROT Korean reading interface"
              priority
            />
            <Image
              className="cover-orot-grammar"
              src="/projects/orot/phone-grammar.webp"
              width={540}
              height={1120}
              alt="OROT sentence breakdown"
              priority
            />
            <span className="cover-stamp">
              <span>읽다</span>
              <T
                en="READ.\nFEEL.\nUNDERSTAND."
                ru="ЧИТАТЬ.\nЧУВСТВОВАТЬ.\nПОНИМАТЬ."
              />
            </span>
            <span className="cover-note hand">
              <T
                en="the language is in the story ↙"
                ru="язык живёт в истории ↙"
              />
            </span>
          </>
        )}
        {project.slug === "diple" && (
          <>
            <span className="cover-diple-quote" aria-hidden="true">
              “
            </span>
            <div className="cover-diple-desktop">
              <div className="cover-window-bar">
                <span>● ● ●</span>
                <span>diple. — your reading room</span>
                <span>↗</span>
              </div>
              <Image
                src="/projects/diple/mac-library.webp"
                width={2400}
                height={1500}
                alt="diple library on Mac"
                priority
              />
            </div>
            <div className="cover-diple-reader">
              <Image
                src="/projects/diple/reader.webp"
                width={880}
                height={1912}
                alt="diple reading on iPhone"
                priority
              />
            </div>
            <span className="cover-bookmark">
              <span>01</span>
              <T en="READ\nMARK\nREMEMBER" ru="ЧИТАТЬ\nОТМЕЧАТЬ\nПОМНИТЬ" />
            </span>
            <span className="cover-note hand">
              <T
                en="leave a thought in the margin ↙"
                ru="оставь мысль на полях ↙"
              />
            </span>
          </>
        )}
        {project.slug === "inkept" && (
          <>
            <span className="cover-inkept-orbit" aria-hidden="true" />
            <div className="cover-inkept-desktop">
              <Image
                src="/projects/inkept/mac-4-board-detail.webp"
                width={1600}
                height={994}
                alt="inkept board on Mac"
                priority
              />
            </div>
            <div className="cover-inkept-phone">
              <Image
                src="/projects/inkept/iphone-2-note-detail.webp"
                width={745}
                height={1600}
                alt="inkept handwritten note interface"
                priority
              />
            </div>
            <Flower className="cover-inkept-flower" size={340} />
            <div className="cover-inkept-note hand hand-mixed">
              <span className="paper-pin" />
              <T
                en={
                  <>
                    good ideas
                    <br />
                    have roots.
                  </>
                }
                ru={
                  <>
                    хорошие мысли
                    <br />
                    пускают корни.
                  </>
                }
              />
              <Asterisk />
            </div>
            <span className="cover-note hand">
              <T
                en="a notebook with a memory ↙"
                ru="блокнот, который помнит ↙"
              />
            </span>
          </>
        )}
      </div>
      <div className="cover-bottomline">
        <span>
          {project.platform} <span className="cover-divider">/</span>{" "}
          <T en="Design & development" ru="Дизайн и разработка" />
        </span>
        <p>
          <T {...project.line} />
        </p>
        <a href="#case-story">
          <T en="Explore the case" ru="Смотреть кейс" />
          <span>↓</span>
        </a>
      </div>
    </header>
  );
}

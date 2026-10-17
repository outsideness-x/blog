import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/projects";
import { T } from "./text";
import { Arrow, Asterisk, InkMark } from "./marks";
import { Flower } from "./project-art";
import { Device } from "./reel";

export function CaseCover({ project }: { project: Project }) {
  return (
    <header className={`case-cover cover-${project.slug}`}>
      <div className="cover-topline">
        <Link href="/projects">
          ← <T en="Selected work" ru="Избранные проекты" />
        </Link>
        <span>INDEPENDENT PRODUCT / {project.number}</span>
        <span className="cover-links">
          {project.source && (
            <a href={project.source} target="_blank" rel="noreferrer">
              GitHub <Arrow diagonal />
            </a>
          )}
          <a href={project.store} target="_blank" rel="noreferrer">
            App Store <Arrow diagonal />
          </a>
        </span>
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
                sizes="(max-width: 760px) 32vw, 330px"
                alt="OROT — Terminal Station story cover"
                priority
              />
            </div>
            <Device className="cover-orot-reading" island>
              <Image
                className="device-shot"
                src="/projects/orot/reading-hd.webp"
                fill
                sizes="(max-width: 760px) 45vw, 380px"
                alt="OROT Korean reading interface"
                priority
              />
            </Device>
            <Device className="cover-orot-grammar" island>
              <Image
                className="device-shot"
                src="/projects/orot/grammar-hd.webp"
                fill
                sizes="(max-width: 760px) 40vw, 350px"
                alt="OROT sentence breakdown"
                priority
              />
            </Device>
            <span className="cover-stamp">
              <span>읽다</span>
              <T
                en={"READ.\nFEEL.\nUNDERSTAND."}
                ru={"ЧИТАТЬ.\nЧУВСТВОВАТЬ.\nПОНИМАТЬ."}
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
                <span><InkMark symbol="↗" /></span>
              </div>
              <Image
                src="/projects/diple/mac-library.webp"
                width={2400}
                height={1500}
                sizes="(max-width: 760px) 100vw, 1000px"
                alt="diple library on Mac"
                priority
              />
            </div>
            <div className="cover-diple-reader">
              <Image
                src="/projects/diple/reader.webp"
                width={880}
                height={1912}
                sizes="(max-width: 760px) 36vw, 300px"
                alt="diple reading on iPhone"
                priority
              />
            </div>
            <span className="cover-bookmark">
              <span>01</span>
              <T en={"READ\nMARK\nREMEMBER"} ru={"ЧИТАТЬ\nОТМЕЧАТЬ\nПОМНИТЬ"} />
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
                sizes="(max-width: 760px) 110vw, 1000px"
                alt="inkept board on Mac"
                priority
              />
            </div>
            <div className="cover-inkept-phone">
              <Image
                src="/projects/inkept/iphone-2-note-detail.webp"
                width={745}
                height={1600}
                sizes="(max-width: 760px) 35vw, 290px"
                alt="inkept handwritten note interface"
                priority
              />
            </div>
            <Flower className="cover-inkept-flower" size={340} />
            <div className="cover-inkept-note hand hand-mixed">
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

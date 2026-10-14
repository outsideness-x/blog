import type { Metadata } from "next";
import { T } from "@/components/text";
import { Flower } from "@/components/project-art";
import { Arrow } from "@/components/marks";
import { ContactBrief, CopyButton } from "@/components/contact-brief";
import { CONTACT, CONTACT_LINKS } from "@/lib/site";
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Alex: app design, native iOS development and everything a launch needs. Email or Telegram.",
  alternates: { canonical: "/contacts" },
};
export default function Contacts() {
  return (
    <div className="contacts-page page-width">
      <p className="eyebrow">
        <T
          en="GOOD THINGS START WITH A CONVERSATION"
          ru="ХОРОШИЕ ВЕЩИ НАЧИНАЮТСЯ С РАЗГОВОРА"
        />
      </p>
      <div className="contact-heading">
        <h1>
          <T
            en={
              <>
                Let’s make
                <br />
                <span className="hand">something good.</span>
              </>
            }
            ru={
              <>
                Давайте сделаем
                <br />
                <span className="hand">что-то хорошее.</span>
              </>
            }
          />
        </h1>
        <Flower size={280} />
      </div>
      <div className="contact-details">
        <div className="contact-lead">
          <p>
            <T
              en="A thoughtful app, an interface with character, or an idea that needs both design and code. Tell me about it, and I’ll reply with questions and next steps."
              ru="Продуманное приложение, интерфейс с характером или идея, которой нужны и дизайн, и код. Расскажите о ней, и я отвечу вопросами и следующими шагами."
            />
          </p>
          <span className="availability">
            <span className="status-dot" />
            <T en="Open to new projects" ru="Открыт к новым проектам" />
          </span>
        </div>
        <div className="contact-list">
          <div className="contact-row contact-row-primary">
            <a href={CONTACT_LINKS.email}>
              <small>
                <T en="EMAIL" ru="ПОЧТА" />
              </small>
              {CONTACT.email}
            </a>
            <CopyButton value={CONTACT.email} />
            <a
              className="contact-row-arrow"
              href={CONTACT_LINKS.email}
              aria-hidden="true"
              tabIndex={-1}
            >
              <Arrow diagonal />
            </a>
          </div>
          <a
            className="contact-row"
            href={CONTACT_LINKS.telegram}
            target="_blank"
            rel="noreferrer"
          >
            <span>
              <small>TELEGRAM</small>@{CONTACT.telegram}
            </span>
            <span className="contact-handle">
              <T en="The fastest way" ru="Самый быстрый способ" />
            </span>
            <Arrow diagonal />
          </a>
          <a
            className="contact-row"
            href={CONTACT_LINKS.github}
            target="_blank"
            rel="noreferrer"
          >
            <span>
              <small>GITHUB</small>@{CONTACT.github}
            </span>
            <span className="contact-handle">
              <T en="Code & projects" ru="Код и проекты" />
            </span>
            <Arrow diagonal />
          </a>
        </div>
      </div>
      <ol className="contact-next">
        <li>
          <span className="contact-next-number">01</span>
          <T
            en="You write. A few sentences are enough."
            ru="Вы пишете. Пары предложений достаточно."
          />
        </li>
        <li>
          <span className="contact-next-number">02</span>
          <T
            en="I reply with questions, or we set up a short call."
            ru="Я отвечаю вопросами или предлагаю короткий созвон."
          />
        </li>
        <li>
          <span className="contact-next-number">03</span>
          <T
            en="You get a plan: what we make, in what order, and an estimate."
            ru="Вы получаете план: что делаем, в каком порядке и оценку."
          />
        </li>
      </ol>
      <ContactBrief />
      <div className="contact-colophon">
        <span className="hand">
          <T en="Thanks for stopping by :)" ru="Спасибо, что заглянули :)" />
        </span>
        <span className="eyebrow">DESIGN + CODE + A LITTLE SOUL</span>
      </div>
    </div>
  );
}

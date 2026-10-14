import type { Metadata } from "next";
import { T } from "@/components/text";
import { Flower } from "@/components/project-art";
import { Arrow } from "@/components/marks";
export const metadata: Metadata = {
  title: "Contact",
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
                Давай сделаем
                <br />
                <span className="hand">что-то хорошее.</span>
              </>
            }
          />
        </h1>
        <Flower size={280} />
      </div>
      <div className="contact-details">
        <p>
          <T
            en="A thoughtful app, an interface with character, or an idea that needs both design and code. This is where we can start."
            ru="Продуманное приложение, интерфейс с характером или идея, которой нужны и дизайн, и код. Отсюда можно начать."
          />
        </p>
        <a
          className="contact-row"
          href="https://github.com/outsideness-x"
          target="_blank"
          rel="noreferrer"
        >
          <span>
            <small>
              <T en="FIND MY WORK" ru="МОИ РАБОТЫ" />
            </small>
            GitHub
          </span>
          <span className="contact-handle">@outsideness-x</span>
          <Arrow diagonal />
        </a>
      </div>
      <div className="contact-colophon">
        <span className="hand">
          <T en="Thanks for stopping by :)" ru="Спасибо, что заглянули :)" />
        </span>
        <span className="eyebrow">DESIGN + CODE + A LITTLE SOUL</span>
      </div>
    </div>
  );
}

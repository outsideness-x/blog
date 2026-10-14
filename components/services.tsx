import Link from "next/link";
import { T } from "./text";
import { Arrow, Asterisk } from "./marks";
export function Services() {
  const services = [
    {
      number: "01",
      title: "UI/UX design",
      en: "A clear product. A distinct point of view.",
      ru: "Ясный продукт. Узнаваемый характер.",
      bodyEn:
        "User flows, interface architecture, visual direction and interactive prototypes. The decisions that make a product understandable, useful and recognisably yours.",
      bodyRu:
        "Пользовательские сценарии, архитектура интерфейса, визуальное направление и интерактивные прототипы. Решения, которые делают продукт понятным, полезным и узнаваемым.",
      tags: ["Product thinking", "Visual design", "Prototyping"],
    },
    {
      number: "02",
      title: "iOS development",
      en: "The details survive the build.",
      ru: "Детали остаются в готовом приложении.",
      bodyEn:
        "Native apps in Swift and SwiftUI. Navigation, gestures, motion and the small states between screens — carried through into a working app.",
      bodyRu:
        "Нативные приложения на Swift и SwiftUI. Навигация, жесты, движение и состояния между экранами — в работающем приложении.",
      tags: ["Swift", "SwiftUI", "iOS & macOS"],
    },
    {
      number: "03",
      title: "Design + engineering",
      en: "One person. The whole picture.",
      ru: "Один человек. Целая картина.",
      bodyEn:
        "From shaping the idea to building the interface and preparing an App Store release. Design and development can inform each other from the start.",
      bodyRu:
        "От формирования идеи до разработки интерфейса и подготовки релиза в App Store. Дизайн и разработка влияют друг на друга с самого начала.",
      tags: ["Concept → product", "End-to-end"],
    },
  ];
  return (
    <section className="services-section page-width">
      <div className="services-intro">
        <p className="eyebrow">
          <T en="HOW WE CAN WORK TOGETHER" ru="КАК МЫ МОЖЕМ РАБОТАТЬ ВМЕСТЕ" />
        </p>
        <h2>
          <T
            en={
              <>
                Good on a screen.
                <br />
                <span className="hand">Even better in your hands.</span>
              </>
            }
            ru={
              <>
                Хорошо на экране.
                <br />
                <span className="hand">Ещё лучше в руках.</span>
              </>
            }
          />
        </h2>
        <Asterisk />
      </div>
      <div className="services-list">
        {services.map((service) => (
          <details key={service.number} className="service-detail">
            <summary>
              <span className="service-number">{service.number}</span>
              <span className="service-title">{service.title}</span>
              <span className="service-description">
                <T en={service.en} ru={service.ru} />
              </span>
              <span className="service-toggle" aria-hidden="true">
                +
              </span>
            </summary>
            <div className="service-body">
              <p>
                <T en={service.bodyEn} ru={service.bodyRu} />
              </p>
              <div className="decision-tags">
                {service.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </details>
        ))}
      </div>
      <div className="services-bottom">
        <span className="hand">
          <T
            en="a project, not just a handoff."
            ru="работа над продуктом, а не передача макетов."
          />
        </span>
        <Link href="/contacts" className="text-link">
          <T en="Let’s discuss yours" ru="Обсудим твой проект" />
          <Arrow diagonal />
        </Link>
      </div>
    </section>
  );
}

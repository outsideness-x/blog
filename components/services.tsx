import Link from "next/link";
import { T, type Bilingual } from "./text";
import { Arrow, Asterisk } from "./marks";

type Service = {
  number: string;
  title: Bilingual;
  promise: Bilingual;
  text: Bilingual;
  includes: Bilingual[];
  fit: Bilingual;
};

const services: Service[] = [
  {
    number: "01",
    title: { en: "App design", ru: "Дизайн приложения" },
    promise: {
      en: "A clear product with a point of view.",
      ru: "Ясный продукт с характером.",
    },
    text: {
      en: "From a rough idea to an interface people understand at a glance: flows, structure, a visual language and a prototype you can tap through.",
      ru: "От сырой идеи до интерфейса, который понятен с первого взгляда: сценарии, структура, визуальный язык и прототип, который можно потрогать.",
    },
    includes: [
      { en: "User flows and structure", ru: "Сценарии и структура" },
      {
        en: "Visual language and UI for iPhone, iPad and Mac",
        ru: "Визуальный язык и UI для iPhone, iPad и Mac",
      },
      { en: "Interactive prototype", ru: "Интерактивный прототип" },
      { en: "Design system in Figma", ru: "Дизайн-система в Figma" },
    ],
    fit: {
      en: "a new product or a redesign",
      ru: "нового продукта или редизайна",
    },
  },
  {
    number: "02",
    title: { en: "Design + iOS development", ru: "Дизайн и iOS-разработка" },
    promise: {
      en: "Designed and built by the same hands.",
      ru: "Спроектировано и собрано одними руками.",
    },
    text: {
      en: "A native app in Swift and SwiftUI, where motion, gestures and the small states between screens survive the build, all the way to the App Store.",
      ru: "Нативное приложение на Swift и SwiftUI, где анимации, жесты и мелкие состояния между экранами доживают до релиза — вплоть до App Store.",
    },
    includes: [
      {
        en: "Native SwiftUI app for iPhone, iPad, Mac",
        ru: "Нативное приложение на SwiftUI для iPhone, iPad, Mac",
      },
      {
        en: "Motion and interaction details",
        ru: "Анимации и детали взаимодействия",
      },
      {
        en: "TestFlight builds along the way",
        ru: "Сборки в TestFlight по ходу работы",
      },
      { en: "App Store submission", ru: "Публикация в App Store" },
    ],
    fit: {
      en: "an MVP, or a product that has to feel right",
      ru: "MVP или продукта, который должен ощущаться правильно",
    },
  },
  {
    number: "03",
    title: { en: "Launch kit", ru: "Всё для запуска" },
    promise: {
      en: "Everything around the app.",
      ru: "Всё, что вокруг приложения.",
    },
    text: {
      en: "What people see before they install: the icon, the App Store page, a landing page, and characters or illustrations that give the product a face.",
      ru: "То, что люди видят до установки: иконка, страница в App Store, лендинг, а ещё персонажи и иллюстрации, которые дают продукту лицо.",
    },
    includes: [
      { en: "App icon", ru: "Иконка приложения" },
      {
        en: "App Store screenshots and listing",
        ru: "Скриншоты и описание для App Store",
      },
      { en: "Landing page", ru: "Лендинг" },
      {
        en: "Mascot, illustrations, social visuals",
        ru: "Маскот, иллюстрации, визуалы для соцсетей",
      },
    ],
    fit: {
      en: "a launch, or a refresh before one",
      ru: "запуска или обновления перед ним",
    },
  },
  {
    number: "04",
    title: { en: "UX review", ru: "UX-аудит" },
    promise: {
      en: "A fresh look at what you already have.",
      ru: "Свежий взгляд на то, что уже есть.",
    },
    text: {
      en: "I go through your app the way a new user would, then send a prioritised list of what to fix, with the key screens redesigned.",
      ru: "Прохожу ваше приложение глазами нового пользователя и присылаю список правок по приоритетам вместе с переработанными ключевыми экранами.",
    },
    includes: [
      {
        en: "Walkthrough of the key flows",
        ru: "Разбор ключевых сценариев",
      },
      { en: "Prioritised list of fixes", ru: "Список правок по приоритетам" },
      { en: "Redesigned key screens", ru: "Переработанные ключевые экраны" },
    ],
    fit: {
      en: "an app that works but doesn’t feel right yet",
      ru: "приложения, которое работает, но пока не радует",
    },
  },
];

const steps: { title: Bilingual; text: Bilingual }[] = [
  {
    title: { en: "Talk", ru: "Разговор" },
    text: {
      en: "The idea, the people it’s for and what a good result looks like.",
      ru: "Идея, для кого продукт и каким должен быть хороший результат.",
    },
  },
  {
    title: { en: "Shape", ru: "Форма" },
    text: {
      en: "Flows, look and feel, and a prototype you can tap through before anything is built.",
      ru: "Сценарии, визуальный язык и прототип, который можно потрогать до разработки.",
    },
  },
  {
    title: { en: "Build", ru: "Сборка" },
    text: {
      en: "Design and code move together. You follow along in TestFlight.",
      ru: "Дизайн и код идут вместе. Вы следите за прогрессом в TestFlight.",
    },
  },
  {
    title: { en: "Launch", ru: "Запуск" },
    text: {
      en: "App Store release, the store page and a landing page.",
      ru: "Релиз в App Store, страница в сторе и лендинг.",
    },
  },
];

export function Services() {
  return (
    <section className="services-section page-width" id="services">
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
      <div className="service-grid">
        {services.map((service) => (
          <article className="service-card" key={service.number}>
            <div className="service-card-top">
              <span className="service-card-number hand">
                {service.number}
              </span>
              <h3>
                <T {...service.title} />
              </h3>
            </div>
            <p className="service-promise">
              <T {...service.promise} />
            </p>
            <p className="service-text">
              <T {...service.text} />
            </p>
            <ul className="service-includes">
              {service.includes.map((item) => (
                <li key={item.en}>
                  <T {...item} />
                </li>
              ))}
            </ul>
            <p className="service-fit">
              <span className="service-fit-label">
                <T en="GOOD FOR" ru="ПОДХОДИТ ДЛЯ" />
              </span>
              <T {...service.fit} />
            </p>
          </article>
        ))}
      </div>
      <div className="process">
        <div className="process-heading">
          <p className="eyebrow">
            <T en="HOW A PROJECT GOES" ru="КАК ИДЁТ ПРОЕКТ" />
          </p>
          <span className="hand">
            <T
              en="from the first sketch to the App Store ↘"
              ru="от первого наброска до App Store ↘"
            />
          </span>
        </div>
        <ol className="process-steps">
          {steps.map((step, index) => (
            <li key={step.title.en}>
              <span className="process-index">0{index + 1}</span>
              <h3>
                <T {...step.title} />
              </h3>
              <p>
                <T {...step.text} />
              </p>
            </li>
          ))}
        </ol>
      </div>
      <div className="services-bottom">
        <span className="hand">
          <T
            en="a project, not just a handoff."
            ru="работа над продуктом, а не передача макетов."
          />
        </span>
        <Link href="/contacts" className="text-link">
          <T en="Let’s discuss yours" ru="Обсудим ваш проект" />
          <Arrow diagonal />
        </Link>
      </div>
    </section>
  );
}

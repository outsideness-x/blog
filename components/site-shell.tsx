"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CONTACT, CONTACT_LINKS } from "@/lib/site";
import { T } from "./text";
import { Asterisk, Arrow, InkMark } from "./marks";
import { LiquidNavigation } from "./liquid-navigation";

export function Header() {
  const pathname = usePathname();
  const [language, setLanguage] = useState("en");
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 48);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    setLanguage(document.documentElement.lang === "ru" ? "ru" : "en");
  }, []);
  function switchLanguage() {
    const next = language === "en" ? "ru" : "en";
    document.documentElement.lang = next;
    document.documentElement.dataset.lang = next;
    setLanguage(next);
    try {
      localStorage.setItem("portfolio-language", next);
    } catch {
      /* Works without storage. */
    }
  }
  return (
    <header className="site-header">
      <Link href="/" className="wordmark" aria-label="chemical-pink — home">
        <Asterisk />
        <span>
          chemical<span className="wordmark-pink">pink</span>
        </span>
      </Link>
      <LiquidNavigation language={language} scrolled={scrolled} />
      <div className="header-actions">
        <button
          className="language-button"
          onClick={switchLanguage}
          aria-label={
            language === "en"
              ? "Switch to Russian"
              : "Переключить на английский"
          }
        >
          <span className={language === "en" ? "active" : ""}>EN</span>
          <span className="language-divider">/</span>
          <span className={language === "ru" ? "active" : ""}>RU</span>
        </button>
        {!pathname.startsWith("/contacts") && (
          <Link href="/contacts" className="header-cta">
            <T en="Start a project" ru="Обсудить проект" />
            <Arrow diagonal />
          </Link>
        )}
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <Link className="footer-signature" href="/">
        chemical pink<span><InkMark symbol="✳" /></span>
      </Link>
      <p>
        <T
          en="Made with a little ink & a lot of care."
          ru="Немного чернил и много внимания."
        />
      </p>
      <nav className="footer-links" aria-label="Contacts">
        <a href={CONTACT_LINKS.email}>
          {CONTACT.email} <Arrow diagonal />
        </a>
        <a href={CONTACT_LINKS.telegram} target="_blank" rel="noreferrer">
          Telegram <Arrow diagonal />
        </a>
        <a href={CONTACT_LINKS.github} target="_blank" rel="noreferrer">
          GitHub <Arrow diagonal />
        </a>
      </nav>
      <span className="footer-year">© {new Date().getFullYear()}</span>
    </footer>
  );
}

'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { T } from './text';
import { Asterisk, Arrow } from './marks';
import { LiquidNavigation } from './liquid-navigation';

export function Header() {
  const [language, setLanguage] = useState('en');
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 48);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => { setLanguage(document.documentElement.lang === 'ru' ? 'ru' : 'en'); }, []);
  function switchLanguage() {
    const next = language === 'en' ? 'ru' : 'en';
    document.documentElement.lang = next;
    document.documentElement.dataset.lang = next;
    setLanguage(next);
    try { localStorage.setItem('portfolio-language', next); } catch { /* Works without storage. */ }
  }
  return <header className="site-header">
    <Link href="/" className="wordmark" aria-label="chemical-pink — home"><Asterisk /><span>chemical<span className="wordmark-pink">pink</span></span><span className="wordmark-period">®</span></Link>
    <LiquidNavigation language={language} scrolled={scrolled} />
    <button className="language-button" onClick={switchLanguage} aria-label={language === 'en' ? 'Switch to Russian' : 'Переключить на английский'}><span className={language === 'en' ? 'active' : ''}>EN</span><span className="language-divider">/</span><span className={language === 'ru' ? 'active' : ''}>RU</span></button>
  </header>;
}
export function Footer() {
  return <footer className="site-footer"><Link className="footer-signature" href="/">chemical pink<span>✳</span></Link><p><T en="Made with a little ink & a lot of care." ru="Немного чернил и много внимания." /></p><a href="https://github.com/outsideness-x" target="_blank" rel="noreferrer">GitHub <Arrow diagonal /></a><span className="footer-year">© {new Date().getFullYear()}</span></footer>;
}

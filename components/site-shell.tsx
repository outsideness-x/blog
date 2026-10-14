'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { T } from './text';
import { Asterisk, Arrow } from './marks';

export function Header() {
  const path = usePathname();
  const [language, setLanguage] = useState('en');
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
    <nav className="glass main-nav" aria-label={language === 'en' ? 'Main navigation' : 'Главная навигация'}>
      {[{ href: '/', en: 'Home', ru: 'Главная' }, { href: '/projects', en: 'Projects', ru: 'Проекты' }, { href: '/contacts', en: 'Contact', ru: 'Контакты' }].map(item => <Link key={item.href} href={item.href} aria-current={(item.href === '/' ? path === '/' : path.startsWith(item.href)) ? 'page' : undefined}><T en={item.en} ru={item.ru} />{item.href === '/projects' && <sup>03</sup>}</Link>)}
    </nav>
    <button className="language-button" onClick={switchLanguage} aria-label={language === 'en' ? 'Switch to Russian' : 'Переключить на английский'}><span className={language === 'en' ? 'active' : ''}>EN</span><span className="language-divider">/</span><span className={language === 'ru' ? 'active' : ''}>RU</span></button>
  </header>;
}
export function Footer() {
  return <footer className="site-footer"><Link className="footer-signature" href="/">chemical pink<span>✳</span></Link><p><T en="Made with a little ink & a lot of care." ru="Немного чернил и много внимания." /></p><a href="https://github.com/outsideness-x" target="_blank" rel="noreferrer">GitHub <Arrow diagonal /></a><span className="footer-year">© {new Date().getFullYear()}</span></footer>;
}

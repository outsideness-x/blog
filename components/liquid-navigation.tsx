'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { LiquidGlass, type LiquidGlassHandle } from 'liquid-glass-web-react';
import { T } from './text';

const links = [
  { href: '/', en: 'Home', ru: 'Главная' },
  { href: '/projects', en: 'Projects', ru: 'Проекты' },
  { href: '/contacts', en: 'Contact', ru: 'Контакты' },
];

export function LiquidNavigation({ language, scrolled }: { language: string; scrolled: boolean }) {
  const pathname = usePathname();
  const selected = pathname.startsWith('/projects') ? 1 : pathname.startsWith('/contacts') ? 2 : 0;
  const [target, setTarget] = useState(selected);
  const [lensWidth, setLensWidth] = useState(94);
  const [map, setMap] = useState('');
  const [backdropSupported, setBackdropSupported] = useState(false);
  const glass = useRef<LiquidGlassHandle>(null);
  const options = useRef<HTMLDivElement>(null);
  const backdrop = useRef<HTMLSpanElement>(null);
  const position = useRef((selected + .5) / 3);
  const velocity = useRef(0);
  const filterId = `nav-lens-${useId().replace(/:/g, '')}`;

  useEffect(() => { setTarget(selected); }, [selected, pathname]);
  useEffect(() => {
    // SVG backdrop filters are an additional enhancement in Chromium. The
    // actual DOM lens below also works in Safari and Firefox (Aave technique).
    setBackdropSupported(/Chrome|Chromium|Edg\//.test(navigator.userAgent));
    const initialMap = glass.current?.engine?.getMapUrl();
    if (initialMap) setMap(initialMap);
    const element = options.current;
    if (!element) return;
    const measure = () => setLensWidth((element.firstElementChild as HTMLElement).offsetWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const destination = (target + .5) / 3;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    let previous = 0;
    const render = () => {
      glass.current?.setPosition(position.current, .5);
      const width = options.current?.offsetWidth ?? 286;
      if (backdrop.current) backdrop.current.style.transform = `translateX(${position.current * width - lensWidth / 2}px)`;
    };
    const tick = (now: number) => {
      const dt = Math.min(previous ? (now - previous) / 1000 : 1 / 60, 1 / 30);
      previous = now;
      velocity.current += ((destination - position.current) * 230 - velocity.current * 27) * dt;
      position.current += velocity.current * dt;
      if (reduced || (Math.abs(destination - position.current) < .0002 && Math.abs(velocity.current) < .002)) {
        position.current = destination;
        velocity.current = 0;
        render();
        return;
      }
      render();
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, lensWidth]);

  return <nav data-scrolled={scrolled} className="glass main-nav liquid-nav" aria-label={language === 'en' ? 'Main navigation' : 'Главная навигация'}>
    {map && <svg className="lens-defs" aria-hidden="true"><defs><filter id={filterId} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB"><feImage href={map} x="0" y="0" width={lensWidth} height="40" preserveAspectRatio="none" result="lens-map"/><feDisplacementMap in="SourceGraphic" in2="lens-map" scale="16" xChannelSelector="R" yChannelSelector="G"/></filter></defs></svg>}
    <span ref={backdrop} aria-hidden="true" className="nav-backdrop-lens" style={{ width:lensWidth, backdropFilter: backdropSupported && map ? `url(#${filterId}) blur(.4px) saturate(1.2)` : 'blur(1px) saturate(1.2)' }}/>
    <LiquidGlass ref={glass} className="nav-optics" width={lensWidth} height={40} radius={20} strength={.035} depth={9} curvature={.85} glow={.07} edgeHighlight={.45} specular={.7} chromaticAberration={.025} blur={0} quality={256} shadow="inset 0 1px 1px #ffffff55, inset 0 -1px 1px #ffffff12, 0 3px 12px #00000022" onMapGenerated={setMap}>
      <div className="nav-options" ref={options}>{links.map((item, index) => <Link key={item.href} href={item.href} aria-current={selected === index ? 'page' : undefined} onClick={event => { if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) setTarget(index); }}><T en={item.en} ru={item.ru}/>{index === 1 && <sup>03</sup>}</Link>)}</div>
    </LiquidGlass>
  </nav>;
}

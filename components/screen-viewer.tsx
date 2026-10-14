'use client';
import Image from 'next/image';
import { useRef } from 'react';
import { T, type Bilingual } from './text';
import { Arrow } from './marks';
export type Screen = { src: string; width: number; height: number; caption: Bilingual };
export function ScreenViewer({ screen, className = '' }: { screen: Screen; className?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  return <>
    <button className={`screen-button ${className}`} onClick={() => dialog.current?.showModal()} aria-haspopup="dialog">
      <Image src={screen.src} alt={screen.caption.en} width={screen.width} height={screen.height} sizes="(max-width: 760px) 90vw, 1000px" />
      <span className="screen-expand glass"><T en="Take a closer look" ru="Рассмотреть поближе" /><Arrow diagonal /></span>
    </button>
    <dialog ref={dialog} className="screen-dialog" aria-label={screen.caption.en} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="dialog-toolbar"><p><T {...screen.caption} /></p><button autoFocus className="dialog-close" onClick={() => dialog.current?.close()}><T en="Close" ru="Закрыть" /> <span>×</span></button></div>
      <Image src={screen.src} alt={screen.caption.en} width={screen.width} height={screen.height} sizes="95vw" />
    </dialog>
  </>;
}

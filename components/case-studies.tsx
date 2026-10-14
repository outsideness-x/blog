import Image from 'next/image';
import { T } from './text';
import { Flower } from './project-art';
import { ScreenViewer } from './screen-viewer';
import { Asterisk } from './marks';
export function OrotStudy() {
  return <>
    <section className="orot-reading-stage case-stage"><div className="stage-caption"><p className="eyebrow">01 / <T en="THE READING EXPERIENCE" ru="ОПЫТ ЧТЕНИЯ" /></p><h2><T en={<>The story comes first.<br /><span className="hand">Understanding follows.</span></>} ru={<>Сначала — история.<br /><span className="hand">Потом — понимание.</span></>} /></h2></div><div className="phone-triptych">{[
      { image:'phone-splash', en:'A world to step into',ru:'Мир, в который хочется войти' },
      { image:'phone-reading',en:'Read at your own pace',ru:'Читать в своём ритме' },
      { image:'phone-grammar',en:'A closer look at every line',ru:'Рассмотреть каждую строку' },
    ].map((item,i)=><figure key={item.image}><ScreenViewer screen={{src:`/projects/orot/${item.image}.webp`,width:540,height:1120,caption:{en:item.en,ru:item.ru}}}/><figcaption><span>0{i+1}</span><T en={item.en} ru={item.ru}/></figcaption></figure>)}</div></section>
    <section className="orot-editorial case-stage"><div><p className="eyebrow">02 / <T en="A REASON TO RETURN" ru="ПОВОД ВЕРНУТЬСЯ" /></p><h2><T en={<>A little light.<br />A finished chapter.</>} ru={<>Маленький свет.<br />Законченная глава.</>} /></h2><p><T en="Every completed arc has a lightstick to collect. A physical-looking keepsake for something intangible: a story you can now understand." ru="За каждую завершённую арку можно получить лайтстик. Осязаемый сувенир о неосязаемом: истории, которую теперь понимаешь." /></p><span className="hand hand-mixed"><T en="keep a little of the story." ru="сохрани частичку истории." /></span></div><div className="lightstick-display"><Image src="/projects/orot/lightstick.webp" alt="OROT collectible lightstick" width={600} height={900}/><span className="lightstick-orbit"/></div></section>
  </>;
}
export function DipleStudy() {
  return <>
    <section className="diple-desktop-stage case-stage"><div className="stage-caption"><p className="eyebrow">01 / <T en="A LIBRARY THAT FEELS LIKE YOURS" ru="БИБЛИОТЕКА, В КОТОРОЙ ТЫ ДОМА" /></p><h2><T en={<>Less between you<br />and <span className="serif-italic">a good book.</span></>} ru={<>Ближе к тебе.<br />Ближе к <span className="serif-italic">хорошей книге.</span></>} /></h2></div><div className="desktop-frame"><div className="desktop-toolbar"><span>● ● ●</span><span>diple. / macOS</span><span>↗</span></div><ScreenViewer screen={{src:'/projects/diple/mac-library.webp',width:2400,height:1500,caption:{en:'Your library on Mac',ru:'Библиотека на Mac'}}}/></div></section>
    <section className="diple-paper-stage case-stage"><div className="diple-paper-copy"><p className="eyebrow">02 / <T en="A PLACE FOR THE THOUGHT AFTER" ru="МЕСТО ДЛЯ МЫСЛИ ПОСЛЕ"/></p><h2><T en={<>The best part<br />is what <em>stays.</em></>} ru={<>Самое ценное —<br />то, что <em>остаётся.</em></>}/></h2><p><T en="A sentence catches your attention. You mark it, leave a note and follow the thought. Reading and writing belong in the same room." ru="Предложение цепляет внимание. Ты отмечаешь его, оставляешь заметку и следуешь за мыслью. Чтение и письмо живут в одной комнате."/></p><span className="hand hand-hearts"><T en="room for one more thought." ru="место для ещё одной мысли."/></span></div><div className="diple-reading-pair"><ScreenViewer screen={{src:'/projects/diple/reader.webp',width:400,height:870,caption:{en:'A quiet reading page',ru:'Спокойная страница для чтения'}}}/><ScreenViewer screen={{src:'/projects/diple/margin.webp',width:400,height:870,caption:{en:'Notes in the margins',ru:'Заметки на полях'}}}/></div></section>
    <section className="wide-screen-section"><div className="wide-screen-heading"><h3><T en="And a notebook of its own." ru="И отдельное место для заметок."/></h3><span className="eyebrow">MACOS / NOTES</span></div><ScreenViewer screen={{src:'/projects/diple/mac-notes.webp',width:2400,height:1500,caption:{en:'The diple notes workspace on Mac',ru:'Заметки diple на Mac'}}}/></section>
  </>;
}
export function InkeptStudy() {
  return <>
    <section className="inkept-editorial case-stage"><div className="stage-caption"><p className="eyebrow">01 / <T en="DIGITAL, WITH A PAPER HEART" ru="ЦИФРОВОЙ БЛОКНОТ С БУМАЖНЫМ СЕРДЦЕМ"/></p><h2 className="hand hand-mixed"><T en={<>A place for the things<br />you don’t want to lose.</>} ru={<>Место для того,<br />что не хочется потерять.</>}/></h2><Flower size={150}/></div><ScreenViewer screen={{src:'/projects/inkept/mac-2-note.webp',width:1800,height:1125,caption:{en:'Writing in inkept on Mac',ru:'Заметки в inkept на Mac'}}}/></section>
    <section className="inkept-mobile-stage case-stage"><div className="stage-caption"><p className="eyebrow">02 / <T en="FROM A NOTE TO A MEMORY" ru="ОТ ЗАМЕТКИ К ВОСПОМИНАНИЮ"/></p><h2><T en={<>Write. Connect.<br /><span className="hand">Remember.</span></>} ru={<>Записать. Связать.<br /><span className="hand">Запомнить.</span></>}/></h2></div><div className="inkept-screens">{[
      {image:'iphone-1-study',en:'Spaced repetition with FSRS',ru:'Интервальное повторение с FSRS'},
      {image:'iphone-3-graph',en:'A graph of connected ideas',ru:'Граф связанных идей'},
      {image:'iphone-5-typst',en:'Diagrams drawn on your device',ru:'Диаграммы прямо на устройстве'},
    ].map(item=><ScreenViewer key={item.image} screen={{src:`/projects/inkept/${item.image}.webp`,width:832,height:1800,caption:{en:item.en,ru:item.ru}}}/>)}</div></section>
    <section className="inkept-principle"><Asterisk/><h2 className="hand hand-mixed"><T en={<>Your thoughts.<br />Your files. <span className="heart-word">Your own.</span></>} ru={<>Твои мысли.<br />Твои файлы. <span>Твой мир.</span></>}/></h2><p><T en="Plain files in a folder you choose. No account, no ads, no tracking. A tool that feels personal should leave you in control." ru="Обычные файлы в выбранной папке. Без аккаунта, рекламы и трекинга. Личный инструмент должен оставлять контроль у тебя."/></p></section>
  </>;
}

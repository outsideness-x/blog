import type { Metadata } from 'next';
import Link from 'next/link';
import { T } from '@/components/text';
import { ProjectArt } from '@/components/project-art';
import { projects } from '@/lib/projects';
import { Asterisk, Arrow } from '@/components/marks';
export const metadata: Metadata = { title: 'Projects', description: 'OROT, diple. and inkept — independently designed and built apps for iOS and Mac.', alternates: { canonical: '/projects' } };
export default function Projects() {
  return <div className="page-width projects-page"><div className="page-intro"><p className="eyebrow"><T en="INDEPENDENT PRODUCTS / SELECTED WORK" ru="НЕЗАВИСИМЫЕ ПРОДУКТЫ / ИЗБРАННЫЕ РАБОТЫ"/></p><h1><T en="Made with intent." ru="Сделано со смыслом."/><Asterisk/></h1><div className="intro-bottom"><p><T en="Three products, from the first design decision to the version in your hands." ru="Три продукта — от первого дизайн-решения до приложения у тебя в руках."/></p><span className="hand hand-mixed"><T en="designed. built. out in the world. ↘" ru="спроектировано. разработано. выпущено. ↘"/></span></div></div>
    <div className="work-index">{projects.map(project=><Link href={`/projects/${project.slug}`} key={project.slug} className={`work-row work-row-${project.slug}`}><div className="work-row-copy"><p className="eyebrow">/{project.number} <span>—</span> {project.platform}</p><h2>{project.name}</h2><h3><T {...project.line}/></h3><p className="work-row-description"><T {...project.description}/></p><div className="work-row-tags"><span>UI/UX</span><span><T en="Development" ru="Разработка"/></span></div><span className="work-row-link"><T en="Explore the case" ru="Смотреть кейс"/><Arrow diagonal/></span></div><div className="work-row-art"><ProjectArt slug={project.slug}/><span className="work-row-badge glass"><Arrow diagonal/></span></div></Link>)}</div><div className="work-index-end"><p className="hand"><T en="The next one could be yours." ru="Следующим может быть твой."/></p><Link href="/contacts" className="button button-light"><T en="Let’s talk" ru="Обсудим"/><Arrow diagonal/></Link></div></div>;
}

import type { Metadata } from 'next';
import { T } from '@/components/text';
import { ProjectCard } from '@/components/project-card';
import { projects } from '@/lib/projects';
import { Asterisk } from '@/components/marks';
export const metadata: Metadata = { title: 'Projects', description: 'OROT, diple. and inkept — independently designed and built apps for iOS and Mac.', alternates: { canonical: '/projects' } };
export default function Projects() { return <div className="page-width projects-page"><div className="page-intro"><p className="eyebrow"><T en="THE THINGS I PUT INTO THE WORLD" ru="ТО, ЧТО Я СОЗДАЮ" /></p><h1><T en="Made with intent." ru="Сделано со смыслом." /><Asterisk /></h1><div className="intro-bottom"><p><T en="Three apps. Three different worlds. The same attention to how every little thing feels." ru="Три приложения. Три разных мира. Одинаковое внимание к каждой мелочи." /></p><span className="hand"><T en="from sketch to App Store ↘" ru="от наброска до App Store ↘" /></span></div></div><div className="projects-list">{projects.map(project => <ProjectCard key={project.slug} project={project} large />)}</div></div>; }

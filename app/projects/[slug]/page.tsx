import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/lib/projects';
import { T } from '@/components/text';
import { CaseCover } from '@/components/case-cover';
import { Arrow } from '@/components/marks';
import { OrotStudy, DipleStudy, InkeptStudy } from '@/components/case-studies';
export const dynamicParams = false;
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = projects.find(p => p.slug === params.slug);
  return { title: project?.name ?? 'Project', description: project?.description.en, alternates: { canonical: `/projects/${params.slug}` } };
}
export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find(p => p.slug === params.slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return <article className={`case-page case-${project.slug}`}><CaseCover project={project}/><div className="page-width" id="case-story">
    <dl className="case-facts"><div><dt><T en="MY PART" ru="МОЯ РОЛЬ" /></dt><dd><T en="UI/UX design & development" ru="UI/UX-дизайн и разработка" /></dd></div><div><dt><T en="PLATFORMS" ru="ПЛАТФОРМЫ" /></dt><dd>{project.platform}</dd></div><div><dt><T en="FOCUS" ru="НАПРАВЛЕНИЕ" /></dt><dd><T {...project.category} /></dd></div><div><dt><T en="STATUS" ru="СТАТУС" /></dt><dd><span className="status-dot" /> <T en="Live on the App Store" ru="Доступно в App Store" /></dd></div></dl>
    <section className="case-overview"><div><p className="eyebrow"><T en="THE IDEA" ru="ИДЕЯ" /></p><h2><T {...project.thesis} /></h2></div><p><T {...project.overview} /></p></section>
    {project.slug === 'orot' ? <OrotStudy/> : project.slug === 'diple' ? <DipleStudy/> : <InkeptStudy/>}
    <section className="case-details"><div className="section-heading"><div><p className="eyebrow"><T en="DESIGN DECISIONS, IN THE PRODUCT" ru="ДИЗАЙН-РЕШЕНИЯ В ПРОДУКТЕ" /></p><h2><T en="What ties it together." ru="Что собирает всё вместе." /></h2></div><span className="hand hand-hearts"><T en="from the idea to the last interaction." ru="от идеи до последнего взаимодействия." /></span></div><div className="case-feature-grid">{project.features.map((feature, index) => <div key={index}><span className="feature-number">0{index + 1}</span><h3><T {...feature.title} /></h3><p><T {...feature.text} /></p></div>)}</div></section>
    <section className="case-try"><div><p className="eyebrow"><T en="HAVE SOMETHING IN MIND?" ru="ЕСТЬ ИДЕЯ ПРОДУКТА?" /></p><h2><T en="Let’s make your next one." ru="Давай создадим твой." /></h2></div><div className="case-contact-actions"><Link className="button button-light" href="/contacts"><T en="Discuss a project" ru="Обсудить проект"/><Arrow diagonal/></Link><a className="text-link" href={project.store} target="_blank" rel="noreferrer"><T en="Try the app" ru="Попробовать приложение"/><Arrow diagonal/></a></div></section>
    <Link href={`/projects/${next.slug}`} className={`next-project next-${next.slug}`}><div><p className="eyebrow"><T en="NEXT PROJECT" ru="СЛЕДУЮЩИЙ ПРОЕКТ" /> / {next.number}</p><h2>{next.name}</h2><p><T {...next.line} /></p></div><span className="round-link glass"><Arrow diagonal /></span></Link>
    </div></article>;
}

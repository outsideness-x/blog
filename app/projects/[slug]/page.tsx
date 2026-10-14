import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/lib/projects';
import { T } from '@/components/text';
import { ProjectArt } from '@/components/project-art';
import { Arrow } from '@/components/marks';
export const dynamicParams = false;
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata { const project = projects.find(p => p.slug === params.slug); return { title: project?.name ?? 'Project', description: project?.description.en, alternates: { canonical: `/projects/${params.slug}` } }; }
export default function ProjectPage({ params }: { params: { slug: string } }) { const project = projects.find(p => p.slug === params.slug); if (!project) notFound(); return <article className={`case-page case-${project.slug}`}><div className="page-width"><Link className="back-link" href="/projects">← <T en="All projects" ru="Все проекты" /></Link><header className="case-heading"><p className="eyebrow">{project.platform} / <T {...project.category} /></p><h1>{project.name}</h1><p className="case-tagline"><T {...project.line} /></p><a className="button button-light" href={project.store} target="_blank" rel="noreferrer">App Store <Arrow diagonal /></a></header><ProjectArt slug={project.slug} hero /><section className="case-overview"><h2><T {...project.thesis} /></h2><p><T {...project.overview} /></p></section></div></article>; }

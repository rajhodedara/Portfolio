import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, GitBranch, ExternalLink } from 'lucide-react'
import { projects, getProjectBySlug } from '@/data/projects'
import HalftoneOverlay from '@/components/HalftoneOverlay'
import type { CSSProperties } from 'react'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return { title: 'Arc Not Found' }
  return {
    title: `${project.arcTitle} — ${project.arcSubtitle}`,
    description: project.hook,
    openGraph: {
      title: `${project.arcTitle} — ${project.arcSubtitle}`,
      description: project.hook,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(project.arcTitle)}&subtitle=${encodeURIComponent(project.arcSubtitle)}&color=${encodeURIComponent(project.accentColor)}`,
          width: 1200,
          height: 630,
          alt: project.arcTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.arcTitle} — ${project.arcSubtitle}`,
      description: project.hook,
      images: [`/api/og?title=${encodeURIComponent(project.arcTitle)}&subtitle=${encodeURIComponent(project.arcSubtitle)}&color=${encodeURIComponent(project.accentColor)}`],
    },
  }
}

export default async function ProjectSlugPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const prev = project.prevSlug ? getProjectBySlug(project.prevSlug) : null
  const next = project.nextSlug ? getProjectBySlug(project.nextSlug) : null

  const accentColor = project.accentColor

  return (
    <div
      className="project-detail min-h-screen manga-paper-texture"
      data-project={project.slug}
      style={{
        background: 'var(--bg)',
        '--project-accent': accentColor,
      } as CSSProperties}
    >
      {/* ── SPLASH COVER PANEL ── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: 'var(--ink)',
          borderBottom: '4px solid var(--ink)',
          minHeight: '300px',
          padding: '3px',
        }}
      >
        <HalftoneOverlay opacity={0.2} size={8} color="245,241,232" />

        {/* Speed lines bg */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            background: `conic-gradient(
              from 0deg at 30% 50%,
              transparent 0deg, ${accentColor}88 2deg,
              transparent 4deg, transparent 15deg,
              ${accentColor}55 17deg, transparent 19deg
            )`,
          }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 relative z-10">
          {/* Arc metadata */}
          <div className="flex items-center gap-3 mb-6">
            <Link
              href="/#projects"
              className="font-ibm-mono text-xs text-manga-paper hover:text-manga-yellow transition-colors flex items-center gap-1"
            >
              <ChevronLeft size={12} />
              ALL ARCS
            </Link>
            <span className="text-manga-gray-light opacity-40" aria-hidden="true">|</span>
            <span
              className="font-ibm-mono text-xs px-2 py-0.5"
              style={{
                background: 'var(--project-accent)',
                color: '#0A0A0A',
                border: '2px solid rgba(255,255,255,0.3)',
              }}
            >
              ARC {String(project.arcNumber).padStart(2, '0')}
            </span>
          </div>

          {/* Title */}
          <p
            className="font-ibm-mono text-sm tracking-widest mb-2 opacity-60"
            style={{ color: 'var(--project-accent)' }}
          >
            {project.arcSubtitle.toUpperCase()}
          </p>
          <h1
            className="font-bangers leading-none mb-4"
            style={{
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              color: 'var(--paper)',
              textShadow: '4px 4px 0 var(--project-accent)',
            }}
          >
            {project.arcTitle}
          </h1>
          <p className="font-ibm-mono text-sm text-manga-paper opacity-70 max-w-2xl mb-6">
            {project.hook}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="font-ibm-mono text-xs px-3 py-1.5 font-bold"
                style={{
                  background: 'transparent',
                  color: 'var(--project-accent)',
                  border: '2px solid var(--project-accent)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bangers text-sm tracking-wider px-4 py-2 flex items-center gap-2 transition-all hover:translate-x-[-2px] hover:translate-y-[-2px]"
                style={{
                  background: 'var(--paper)',
                  color: 'var(--ink)',
                  border: '2px solid rgba(255,255,255,0.3)',
                  boxShadow: '3px 3px 0 var(--project-accent)',
                }}
              >
                <GitBranch size={14} />
                VIEW SOURCE
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bangers text-sm tracking-wider px-4 py-2 flex items-center gap-2 transition-all hover:translate-x-[-2px] hover:translate-y-[-2px]"
                style={{
                  background: 'var(--project-accent)',
                  color: '#0A0A0A',
                  border: '2px solid rgba(255,255,255,0.3)',
                  boxShadow: '3px 3px 0 rgba(255,255,255,0.3)',
                }}
              >
                <ExternalLink size={14} />
                LIVE DEMO
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── STORY PANELS ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">

        {/* Problem → Approach → Result storyboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[
            { label: 'THE PROBLEM', jp: '問題', text: project.problem, num: '01', color: 'var(--red)' },
            { label: 'THE APPROACH', jp: 'アプローチ', text: project.approach, num: '02', color: 'var(--project-accent)' },
            { label: 'THE RESULT', jp: '結果', text: project.result, num: '03', color: 'var(--gray)' },
          ].map((panel) => (
            <div
              key={panel.label}
              className="relative overflow-hidden p-5"
              style={{
                border: '3px solid var(--ink)',
                boxShadow: `5px 5px 0 ${panel.color}`,
                background: 'var(--bg)',
              }}
            >
              <HalftoneOverlay opacity={0.07} size={10} />
              <div className="relative z-10">
                {/* Panel number */}
                <div
                  className="inline-block px-2 py-0.5 font-bangers text-xs mb-3"
                  style={{ background: panel.color, color: 'var(--paper)' }}
                >
                  PANEL {panel.num}
                </div>
                <h2 className="font-bangers text-xl text-manga-ink leading-tight" style={{ color: 'var(--ink)' }}>
                  {panel.label}
                </h2>
                <p className="font-noto-jp text-xs opacity-40 mb-3" style={{ color: 'var(--ink)' }}>
                  {panel.jp}
                </p>
                {/* Caption box */}
                <div
                  className="p-3 font-ibm-mono text-xs leading-relaxed italic"
                  style={{
                    border: '2px solid var(--ink)',
                    background: 'rgba(255,214,10,0.04)',
                    color: 'var(--ink)',
                  }}
                >
                  {panel.text}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Key highlights */}
        <div className="mb-12">
          <div className="mb-6">
            <p className="chapter-label text-[10px] mb-2">BATTLE HIGHLIGHTS 戦闘ハイライト</p>
            <h2 className="font-bangers text-3xl sm:text-4xl" style={{ color: 'var(--ink)' }}>
              KEY ACHIEVEMENTS
            </h2>
          </div>

          <div className="space-y-3">
            {project.bullets.map((bullet, i) => (
              <div
                key={i}
                className="relative overflow-hidden p-4 flex gap-4 items-start"
                style={{
                  border: '2px solid var(--ink)',
                  boxShadow: '3px 3px 0 var(--project-accent)',
                  background: 'var(--bg)',
                }}
              >
                <div
                  className="font-bangers text-2xl shrink-0 leading-none"
                  style={{ color: 'var(--project-accent)' }}
                >
                  {(i + 1).toString().padStart(2, '0')}
                </div>
                <p className="font-ibm-mono text-sm leading-relaxed" style={{ color: 'var(--ink)' }}>
                  {bullet}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech stack power-ups */}
        <div className="mb-16">
          <div className="mb-6">
            <p className="chapter-label text-[10px] mb-2">POWER-UPS USED 使用した技術</p>
            <h2 className="font-bangers text-3xl sm:text-4xl" style={{ color: 'var(--ink)' }}>
              TECH STACK
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {project.stack.map((tech, i) => (
              <div
                key={tech}
                className="relative overflow-hidden px-4 py-3 text-center"
                style={{
                  border: '3px solid var(--ink)',
                  boxShadow: `3px 3px 0 ${i % 2 === 0 ? 'var(--project-accent)' : 'var(--ink)'}`,
                  background: i % 2 === 0 ? 'var(--project-accent)' : 'var(--bg)',
                }}
              >
                <p
                  className="font-bangers text-base tracking-wider leading-none"
                  style={{ color: i % 2 === 0 ? '#0A0A0A' : 'var(--ink)' }}
                >
                  {tech}
                </p>
                <p
                  className="font-ibm-mono text-[9px] opacity-60 mt-0.5"
                  style={{ color: i % 2 === 0 ? '#0A0A0A' : 'var(--ink)' }}
                >
                  POWER-UP
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── ARC NAVIGATION ── */}
        <div
          className="flex flex-col sm:flex-row justify-between items-stretch gap-4"
          style={{
            borderTop: '3px solid var(--ink)',
            paddingTop: '2rem',
          }}
        >
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="flex-1 group block p-4 transition-all hover:translate-x-[-3px] hover:translate-y-[-3px]"
              style={{
                border: '3px solid var(--ink)',
                boxShadow: '5px 5px 0 var(--ink)',
                background: 'var(--bg)',
              }}
            >
              <div className="flex items-center gap-3">
                <ChevronLeft size={20} style={{ color: 'var(--red)' }} />
                <div>
                  <p className="font-ibm-mono text-[10px] opacity-50" style={{ color: 'var(--ink)' }}>
                    ← PREVIOUS ARC
                  </p>
                  <p className="font-bangers text-xl" style={{ color: 'var(--ink)' }}>
                    {prev.arcTitle}
                  </p>
                </div>
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          <Link
            href="/#projects"
            className="px-6 flex items-center justify-center font-bangers text-sm tracking-wider"
            style={{
              border: '3px solid var(--ink)',
              boxShadow: '4px 4px 0 var(--red)',
              background: 'var(--bg)',
              color: 'var(--ink)',
            }}
          >
            ALL ARCS
          </Link>

          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="flex-1 group block p-4 text-right transition-all hover:translate-x-[3px] hover:translate-y-[-3px]"
              style={{
                border: '3px solid var(--ink)',
                boxShadow: '5px 5px 0 var(--ink)',
                background: 'var(--bg)',
              }}
            >
              <div className="flex items-center justify-end gap-3">
                <div>
                  <p className="font-ibm-mono text-[10px] opacity-50" style={{ color: 'var(--ink)' }}>
                    NEXT ARC →
                  </p>
                  <p className="font-bangers text-xl" style={{ color: 'var(--ink)' }}>
                    {next.arcTitle}
                  </p>
                </div>
                <ChevronRight size={20} style={{ color: 'var(--red)' }} />
              </div>
            </Link>
          ) : (
            <div className="flex-1 flex items-center justify-end">
              <Link
                href="/#contact"
                className="group block p-4 transition-all hover:translate-x-[-3px] hover:translate-y-[-3px]"
                style={{
                  border: '3px solid var(--red)',
                  boxShadow: '5px 5px 0 var(--red)',
                  background: 'var(--red)',
                }}
              >
                <p className="font-ibm-mono text-[10px] text-manga-paper opacity-80">
                  SAGA COMPLETE →
                </p>
                <p className="font-bangers text-xl text-manga-paper">
                  CONTACT ME
                </p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

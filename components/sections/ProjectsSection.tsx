import { projects } from '@/data/projects'
import ArcCover from '@/components/ArcCover'
import HalftoneOverlay from '@/components/HalftoneOverlay'

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="manga-paper-texture pt-16"
      style={{ background: 'var(--bg)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* ── CHAPTER HEADER ── */}
        <div className="mb-12 sm:mb-16">
          <p className="chapter-label text-xs sm:text-sm mb-3">
            CHAPTER 02 // 第二話
          </p>
          <h2
            className="font-bangers leading-none"
            style={{
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              color: 'var(--ink)',
            }}
          >
            BATTLE ARCS
          </h2>
          <p
            className="font-noto-jp text-xl sm:text-2xl mt-2 opacity-50"
            style={{ color: 'var(--ink)' }}
          >
            プロジェクト一覧
          </p>
          <div className="mt-4 h-[4px] w-24" style={{ background: 'var(--red)' }} />
        </div>

        {/* ── ARCS INTRO ── */}
        <div
          className="relative overflow-hidden p-5 mb-10"
          style={{
            background: 'var(--ink)',
            border: '3px solid var(--ink)',
            boxShadow: '6px 6px 0 var(--red)',
          }}
        >
          <HalftoneOverlay opacity={0.06} size={8} color="var(--paper-rgb)" />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div
              className="font-bangers text-5xl sm:text-6xl text-manga-yellow leading-none shrink-0"
              style={{ textShadow: '3px 3px 0 var(--red)' }}
            >
              4
            </div>
            <div>
              <p className="font-bangers text-xl text-manga-paper tracking-wider">
                SOLO ARCS. ZERO TUTORIALS.
              </p>
              <p className="font-ibm-mono text-xs text-manga-paper opacity-60 mt-1">
                Each project was conceived, architected, and shipped alone — from database schema to production deployment.
                Click any arc to read the full story.
              </p>
            </div>
          </div>
        </div>

        {/* ── ARC GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <ArcCover key={project.slug} project={project} index={index} />
          ))}
        </div>

        {/* ── COMING SOON TEASER ── */}
        <div
          className="mt-10 p-5 relative overflow-hidden"
          style={{
            border: '3px dashed var(--ink)',
            background: 'transparent',
          }}
        >
          <HalftoneOverlay opacity={0.04} size={16} />
          <div className="relative z-10 text-center">
            <p className="font-bangers text-2xl" style={{ color: 'var(--ink)', opacity: 0.4 }}>
              MORE ARCS IN DEVELOPMENT...
            </p>
            <p className="font-noto-jp text-sm mt-1" style={{ color: 'var(--ink)', opacity: 0.3 }}>
              新しい物語が始まる
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

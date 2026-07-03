import { experiences } from '@/data/experience'
import MangaTimeline from '@/components/MangaTimeline'
import HalftoneOverlay from '@/components/HalftoneOverlay'

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="manga-paper-texture pt-16"
      style={{ background: 'var(--bg)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* ── CHAPTER HEADER ── */}
        <div className="mb-12 sm:mb-16">
          <p className="chapter-label text-xs sm:text-sm mb-3">
            CHAPTER 03 // 第三話
          </p>
          <h2
            className="font-bangers leading-none"
            style={{
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              color: 'var(--ink)',
            }}
          >
            TRAINING DAYS
          </h2>
          <p
            className="font-noto-jp text-xl sm:text-2xl mt-2 opacity-50"
            style={{ color: 'var(--ink)' }}
          >
            修行の日々
          </p>
          <div className="mt-4 h-[4px] w-24" style={{ background: 'var(--red)' }} />
        </div>

        {/* ── INTRO PANEL ── */}
        <div
          className="relative overflow-hidden p-5 sm:p-6 mb-14 sm:mb-20"
          style={{
            background: 'var(--ink)',
            border: '3px solid var(--ink)',
            boxShadow: '6px 6px 0 var(--sepia)',
          }}
        >
          <HalftoneOverlay opacity={0.15} size={8} color="var(--paper-rgb)" />
          <div className="relative z-10">
            <p className="font-ibm-mono text-xs text-manga-yellow tracking-widest mb-2">
              TRAINING ARC // 修行編
            </p>
            <p className="font-ibm-mono text-sm text-manga-paper leading-relaxed max-w-3xl opacity-80">
              Every great protagonist earns their power through experience. This flashback arc shows where
              the real-world operational insight behind the Courier DBMS project was forged — at a counter,
              with paper records and manual reconciliation, before the code even began.
            </p>
          </div>
        </div>

        {/* ── TIMELINE ── */}
        <MangaTimeline experiences={experiences} />
      </div>
    </section>
  )
}

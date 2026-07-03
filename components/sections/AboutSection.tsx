import Image from 'next/image'
import { personal } from '@/data/personal'
import { skills } from '@/data/skills'
import TechniqueCard from '@/components/TechniqueCard'
import HalftoneOverlay from '@/components/HalftoneOverlay'

export default function AboutSection() {
  return (
    <section
      id="about"
      className="manga-paper-texture pt-16"
      style={{ background: 'var(--bg)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* ── CHAPTER HEADER ── */}
        <div className="mb-12 sm:mb-16">
          <p className="chapter-label text-xs sm:text-sm mb-3">
            CHAPTER 01 // 第一話
          </p>
          <h2
            className="font-bangers leading-none"
            style={{
              fontSize: 'clamp(3.5rem, 10vw, 7rem)',
              color: 'var(--ink)',
            }}
          >
            ORIGIN STORY
          </h2>
          <p
            className="font-noto-jp text-xl sm:text-2xl mt-2 opacity-50"
            style={{ color: 'var(--ink)' }}
          >
            起源物語
          </p>
          {/* Ink divider */}
          <div className="mt-4 h-[4px] w-24" style={{ background: 'var(--red)' }} />
        </div>

        {/* ── ROW 1: Profile + Stats ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
          {/* Portrait panel */}
          <div
            className="lg:col-span-2 relative overflow-hidden"
            style={{
              border: '3px solid var(--ink)',
              boxShadow: '6px 6px 0 var(--ink)',
              minHeight: '300px',
              background: 'var(--bg)',
            }}
          >
            <HalftoneOverlay opacity={0.1} size={10} />
            <div className="relative h-full" style={{ minHeight: '300px' }}>
              <Image
                src="/manga/portrait.png"
                alt="Raj Odedara — manga portrait"
                fill
                className="object-cover object-top dark:brightness-90"
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div
                className="absolute inset-x-0 bottom-0 p-4 z-10"
                style={{
                  background: 'linear-gradient(to top, var(--ink) 0%, transparent 100%)',
                }}
              >
                <p className="font-bangers text-2xl text-manga-paper">RAJ ODEDARA</p>
                <p className="font-noto-jp text-xs text-manga-paper opacity-60">
                  {personal.nameKatakana}
                </p>
              </div>
            </div>
          </div>

          {/* Stats + Bio */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {/* Bio panel */}
            <div
              className="relative overflow-hidden p-5 sm:p-6 flex-1"
              style={{
                border: '3px solid var(--ink)',
                boxShadow: '6px 6px 0 var(--red)',
                background: 'var(--bg)',
              }}
            >
              <HalftoneOverlay opacity={0.06} size={12} />
              <div className="relative z-10">
                <p className="chapter-label text-[10px] mb-3">BIO // 経歴</p>
                <p
                  className="font-ibm-mono text-sm leading-relaxed"
                  style={{ color: 'var(--ink)' }}
                >
                  {personal.bio}
                </p>

                <div className="flex gap-3 mt-4">
                  <span
                    className="font-ibm-mono text-xs px-3 py-1"
                    style={{
                      background: 'var(--ink)',
                      color: 'var(--paper)',
                      border: '2px solid var(--ink)',
                    }}
                  >
                    📍 {personal.location}
                  </span>
                  <a
                    href={`mailto:${personal.email}`}
                    className="font-ibm-mono text-xs px-3 py-1 hover:bg-manga-red hover:text-manga-paper transition-colors"
                    style={{
                      border: '2px solid var(--ink)',
                      color: 'var(--ink)',
                    }}
                  >
                    ✉ {personal.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Stats table — power level style */}
            <div
              className="relative overflow-hidden p-5"
              style={{
                border: '3px solid var(--ink)',
                boxShadow: '6px 6px 0 var(--ink)',
                background: 'var(--ink)',
              }}
            >
              <HalftoneOverlay opacity={0.12} size={8} color="var(--paper-rgb)" />
              <p className="chapter-label text-[10px] mb-4" style={{ color: 'var(--yellow)', borderColor: 'var(--yellow)' }}>
                CHARACTER STATS キャラクターステータス
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 relative z-10">
                {personal.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="p-3"
                    style={{
                      border: '2px solid var(--gray)',
                      background: 'var(--paper)',
                    }}
                  >
                    <p className="font-ibm-mono text-[9px] text-manga-gray-light tracking-wider mb-1">
                      {stat.label}
                    </p>
                    <p className="font-bangers text-base leading-tight" style={{ color: 'var(--ink)' }}>
                      {stat.icon} {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── ROW 2: Education School Arc ── */}
        <div
          className="relative overflow-hidden p-6 sm:p-8 mb-4"
          style={{
            filter: 'sepia(0.3)',
            border: '3px solid var(--sepia)',
            boxShadow: '6px 6px 0 var(--sepia)',
            background: 'var(--cream)',
          }}
        >
          <HalftoneOverlay opacity={0.08} size={10} />
          <div className="relative z-10">
            {/* Flashback label */}
            <div
              className="inline-block px-3 py-1 mb-4 font-bangers text-sm tracking-wider text-manga-paper"
              style={{ background: 'var(--sepia)', border: '2px solid var(--ink)' }}
            >
              SCHOOL ARC FLASHBACK // 学校編
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="font-bangers text-3xl sm:text-4xl text-manga-ink leading-tight mb-2">
                  {personal.education.institution}
                </h3>
                <p className="font-ibm-mono text-sm text-manga-ink opacity-80 mb-1">
                  {personal.education.degree}
                </p>
                <p className="font-ibm-mono text-xs text-manga-sepia">
                  Expected Graduation: {personal.education.expectedYear}
                </p>
              </div>
              <div
                className="flex items-center justify-center p-6"
                style={{
                  border: '3px solid var(--ink)',
                  background: 'var(--ink)',
                }}
              >
                <div className="text-center">
                  <p className="font-ibm-mono text-xs text-manga-gray-light tracking-widest mb-1">
                    CUMULATIVE POWER LEVEL
                  </p>
                  <p
                    className="font-bangers text-7xl sm:text-8xl text-manga-yellow leading-none"
                    style={{
                      textShadow: '3px 3px 0 var(--red)',
                    }}
                  >
                    {personal.education.cgpa}
                  </p>
                  <p className="font-ibm-mono text-xs text-manga-paper mt-1 opacity-60">
                    CGPA / 10.0
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── ROW 3: Skills / Technique Cards ── */}
        <div>
          <div className="mb-8">
            <p className="chapter-label text-xs mb-2">ABILITIES UNLOCKED 解放された能力</p>
            <h3
              className="font-bangers text-4xl sm:text-5xl"
              style={{ color: 'var(--ink)' }}
            >
              TECHNIQUES
            </h3>
            <p className="font-noto-jp text-lg opacity-40 mt-1" style={{ color: 'var(--ink)' }}>
              技能一覧
            </p>
            <p className="font-ibm-mono text-xs opacity-60 mt-2" style={{ color: 'var(--ink)' }}>
              Click each card to reveal power level ↩
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill, i) => (
              <TechniqueCard key={skill.technique} skill={skill} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

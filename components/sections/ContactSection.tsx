import ContactForm from '@/components/ContactForm'
import HalftoneOverlay from '@/components/HalftoneOverlay'

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="manga-paper-texture pt-16"
      style={{ background: 'var(--bg)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* ── CHAPTER HEADER ── */}
        <div className="mb-12 sm:mb-16">
          <p className="chapter-label text-xs sm:text-sm mb-3">
            FINAL PANEL // 最終ページ
          </p>
          <h2
            className="font-bangers leading-none"
            style={{
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              color: 'var(--ink)',
            }}
          >
            CONTACT
          </h2>
          <p
            className="font-noto-jp text-xl sm:text-2xl mt-2 opacity-50"
            style={{ color: 'var(--ink)' }}
          >
            連絡先
          </p>
          <div className="mt-4 h-[4px] w-24" style={{ background: 'var(--red)' }} />
        </div>

        {/* ── INTRO SPEECH BUBBLE ── */}
        <div
          className="relative max-w-2xl mb-12 p-6"
          style={{
            background: 'var(--ink)',
            border: '3px solid var(--ink)',
            boxShadow: '6px 6px 0 var(--red)',
          }}
        >
          <HalftoneOverlay opacity={0.15} size={8} color="var(--paper-rgb)" />
          <div className="relative z-10">
            <p
              className="font-bangers text-3xl sm:text-4xl text-manga-yellow leading-tight mb-2"
              style={{ textShadow: '2px 2px 0 var(--red)' }}
            >
              「 LOOKING FOR AN INTERN? 」
            </p>
            <p className="font-ibm-mono text-sm text-manga-paper opacity-70 leading-relaxed">
              I&apos;m actively seeking Software Engineering or AI/ML internships where I can contribute immediately.
              I ship fast, I work solo, and I solve real problems. Let&apos;s talk.
            </p>
          </div>
          {/* Tail */}
          <div
            className="absolute -bottom-4 left-8 w-0 h-0"
            style={{
              borderLeft: '12px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '16px solid var(--ink)',
            }}
            aria-hidden="true"
          />
        </div>

        {/* ── CONTACT FORM ── */}
        <ContactForm />

        {/* ── THE END PANEL ── */}
        <div
          className="mt-20 relative overflow-hidden p-8 sm:p-12 text-center bg-manga-ink dark:bg-manga-paper text-manga-paper dark:text-manga-ink"
          style={{
            border: '3px solid var(--ink)',
            boxShadow: '8px 8px 0 var(--red)',
          }}
        >
          <HalftoneOverlay opacity={0.1} size={6} color="245, 241, 232" />
          <div className="relative z-10">
            <p
              className="font-bangers text-5xl sm:text-7xl leading-none mb-2"
              style={{ textShadow: '4px 4px 0 var(--red)' }}
            >
              THE END
            </p>
            <p className="font-noto-jp text-2xl sm:text-3xl opacity-60 mb-6">
              完
            </p>
            <div
              className="inline-block px-6 py-2 font-bangers text-xl tracking-widest"
              style={{
                border: '3px solid var(--red)',
                color: 'var(--red)',
              }}
            >
              TO BE CONTINUED... →
            </div>
            <p className="font-noto-jp text-sm opacity-30 mt-4">
              続く
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

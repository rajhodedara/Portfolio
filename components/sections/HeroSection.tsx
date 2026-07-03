'use client'

import Image from 'next/image'
import Link from 'next/link'
import { personal } from '@/data/personal'
import HalftoneOverlay from '@/components/HalftoneOverlay'
import { useAwakened } from '@/hooks/useAwakened'
import GuildCard from '@/components/GuildCard'

export default function HeroSection() {
  const isAwakened = useAwakened()
  
  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] overflow-hidden manga-paper-texture"
      style={{ background: 'var(--bg)' }}
    >
      {/* ── BACKGROUND SPEED LINES ── */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          background: `conic-gradient(
            from 0deg at 40% 50%,
            transparent 0deg, rgba(10,10,10,0.8) 1.5deg,
            transparent 3deg, transparent 8deg,
            rgba(10,10,10,0.6) 9.5deg, transparent 11deg,
            transparent 16deg, rgba(10,10,10,0.8) 17.5deg,
            transparent 19deg, transparent 24deg,
            rgba(10,10,10,0.5) 25.5deg, transparent 27deg
          )`,
        }}
        aria-hidden="true"
      />

      {/* ── HALFTONE DOTS ── */}
      <HalftoneOverlay opacity={0.08} size={14} />

      {/* ── START! SOUND EFFECT ── */}
      <div className="absolute top-20 right-4 sm:top-24 sm:right-8 z-20 pointer-events-none" aria-hidden="true">
        <div
          className="relative w-28 sm:w-36 h-28 sm:h-36 flex items-center justify-center"
          style={{
            background: '#FFD60A',
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          }}
        >
          <span
            className="font-bangers text-2xl sm:text-3xl text-manga-ink"
            style={{ transform: 'rotate(-8deg)', display: 'block', marginTop: '4px' }}
          >
            START!
          </span>
        </div>
      </div>

      {/* ── MAIN GRID ── */}
      <div
        className="relative z-10 min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] grid grid-cols-1 lg:grid-cols-5"
        style={{ gap: '4px', background: 'var(--ink)', padding: '4px' }}
      >
        {/* ── LEFT PANEL (Portrait) ── */}
        <div
          className="lg:col-span-3 relative overflow-hidden flex items-center justify-center"
          style={{
            background: 'var(--bg)',
            minHeight: '55vw',
          }}
        >
          <HalftoneOverlay opacity={0.1} size={12} />

          {/* Portrait image */}
          <div className="relative w-full h-full flex items-end justify-center" style={{ minHeight: '400px' }}>
            <Image
              src="/manga/portrait_new.png"
              alt="Raj Odedara — protagonist pose, manga style"
              fill
              className="object-cover object-top dark:brightness-90"
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />

            {/* Gradient overlay at bottom */}
            <div
              className="absolute inset-x-0 bottom-0 h-40 pointer-events-none z-10"
              style={{
                background: `linear-gradient(to top, var(--bg) 0%, transparent 100%)`,
              }}
            />

            {/* Chapter label overlay */}
            <div className="absolute top-4 left-4 z-20">
              <p className="chapter-label text-[10px] sm:text-xs">CHAPTER 0 // 第零話</p>
            </div>

            {/* Speed lines SVG behind portrait */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: `url('/manga/speed-lines.svg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* ── RIGHT PANELS ── */}
        <div className="lg:col-span-2 flex flex-col" style={{ gap: '4px' }}>
          {/* TOP: Name panel */}
          <div
            className="relative overflow-hidden flex-1 flex flex-col justify-center px-6 py-8"
            style={{ background: 'var(--bg)', minHeight: '240px' }}
          >
            <HalftoneOverlay opacity={0.06} size={10} />

            <div className="relative z-10">
              <p className="chapter-label text-[10px] sm:text-xs mb-3">
                THE PROTAGONIST 主人公
              </p>

              <h1
                className="font-bangers leading-[0.9] tracking-wide"
                style={{
                  fontSize: 'clamp(3rem, 7vw, 5rem)',
                  color: 'var(--ink)',
                  WebkitTextStroke: '1px var(--ink)',
                }}
              >
                RAJ<br />
                <span style={{ color: '#D62828' }}>ODEDARA</span>
              </h1>

              <p
                className="font-noto-jp mt-2 tracking-widest"
                style={{
                  fontSize: 'clamp(0.75rem, 2vw, 1rem)',
                  color: '#6B6B6B',
                }}
              >
                {personal.nameKatakana}
              </p>

              {/* Ink divider */}
              <div
                className="my-4 h-[3px]"
                style={{ background: 'var(--ink)' }}
              />

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-2 mt-2">
                {personal.stats.slice(0, 4).map((stat) => (
                  <div
                    key={stat.label}
                    className="p-2"
                    style={{
                      border: '2px solid var(--ink)',
                      background: 'rgba(255,214,10,0.05)',
                    }}
                  >
                    <p className="font-ibm-mono text-[9px] opacity-80" style={{ color: 'var(--ink)' }}>
                      {stat.label}
                    </p>
                    <p className="font-bangers text-sm" style={{ color: 'var(--ink)' }}>
                      {stat.icon} {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* BOTTOM: Tagline + CTAs */}
          <div
            className="relative overflow-hidden px-6 py-6 flex flex-col gap-4"
            style={{ background: 'var(--ink)' }}
          >
            <HalftoneOverlay opacity={0.15} size={8} color="var(--paper-rgb)" />

            {/* Speech bubble tagline */}
            <div
              className="relative p-4 font-ibm-mono text-sm text-manga-ink leading-relaxed"
              style={{
                background: 'var(--paper)',
                border: '3px solid var(--paper)',
                boxShadow: '4px 4px 0 var(--red)',
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 80%, 90% 80%, 85% 100%, 80% 80%, 0% 80%)',
                paddingBottom: '2.5rem',
              }}
            >
              <span className="font-bangers text-sm text-manga-red block mb-1">
                「 PROTAGONIST SPECS 」
              </span>
              {isAwakened ? 'UNLIMITED MANA // 限界突破 // THE AWAKENED DEVELOPER' : personal.tagline}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
              <Link
                href="#projects"
                className="w-full sm:w-1/2 text-center font-bangers text-lg tracking-wider py-4 transition-all hover:-translate-y-1 hover:shadow-lg"
                style={{
                  background: 'var(--red)',
                  color: 'var(--paper)',
                  border: '3px solid var(--paper)',
                  boxShadow: '4px 4px 0 var(--paper)',
                }}
                aria-label="View Projects"
              >
                VIEW PROJECTS →
              </Link>
              
              <div className="w-full sm:w-1/2 flex justify-center sm:justify-start">
                <GuildCard />
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="flex items-center gap-2 relative z-10">
              <div
                className="w-6 h-6 flex items-center justify-center font-bangers text-sm animate-bounce"
                style={{ color: 'var(--paper)' }}
                aria-hidden="true"
              >
                ↓
              </div>
              <p className="font-noto-jp text-xs" style={{ color: 'var(--paper)', opacity: 0.6 }}>
                続く — scroll to continue
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* ── INK SPLATTER DIVIDER ── */}
      <div className="relative overflow-hidden" aria-hidden="true">
        <Image
          src="/manga/ink-splatter.svg"
          alt=""
          width={800}
          height={120}
          className="w-full dark:invert"
        />
      </div>
    </section>
  )
}

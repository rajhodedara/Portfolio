'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

const chapters = [
  { id: 'hero',       num: '00', label: 'COVER',    jp: '表紙' },
  { id: 'about',      num: '01', label: 'ORIGIN',   jp: '起源' },
  { id: 'projects',   num: '02', label: 'BATTLES',  jp: '戦闘' },
  { id: 'experience', num: '03', label: 'TRAINING', jp: '修行' },
  { id: 'contact',    num: 'EX', label: 'CONTACT',  jp: '連絡' },
]

export default function ChapterProgressBar() {
  const pathname = usePathname()
  const [active, setActive] = useState('hero')
  const [scrollPct, setScrollPct] = useState(0)
  const [hovering, setHovering] = useState(false)

  // Only show on home page
  if (pathname !== '/') return null

  return (
    <ChapterProgressBarInner
      active={active}
      setActive={setActive}
      scrollPct={scrollPct}
      setScrollPct={setScrollPct}
      hovering={hovering}
      setHovering={setHovering}
    />
  )
}

function ChapterProgressBarInner({
  active, setActive, scrollPct, setScrollPct, hovering, setHovering,
}: {
  active: string
  setActive: (s: string) => void
  scrollPct: number
  setScrollPct: (n: number) => void
  hovering: boolean
  setHovering: (b: boolean) => void
}) {

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const pct = el.scrollTop / (el.scrollHeight - el.clientHeight)
      setScrollPct(Math.min(1, Math.max(0, pct)))
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -40% 0px' }
    )

    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s))
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [setActive, setScrollPct])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const activeIndex = chapters.findIndex((c) => c.id === active)

  return (
    <div
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-0"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      aria-label="Chapter navigation"
    >
      {/* Manga spine border */}
      <div
        className="absolute right-[7px] top-0 bottom-0 w-[3px]"
        style={{ background: 'var(--ink)' }}
        aria-hidden="true"
      />

      {/* Overall scroll progress fill */}
      <div
        className="absolute right-[7px] top-0 w-[3px] transition-all duration-300"
        style={{
          height: `${scrollPct * 100}%`,
          background: '#D62828',
        }}
        aria-hidden="true"
      />

      {chapters.map((ch, i) => {
        const isActive = ch.id === active
        const isPast = i < activeIndex

        return (
          <button
            key={ch.id}
            onClick={() => scrollToSection(ch.id)}
            className="relative flex items-center gap-3 py-3 group"
            aria-label={`Go to ${ch.label} section`}
          >
            {/* Label — slides in on hover */}
            <AnimatePresence>
              {hovering && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.18, delay: i * 0.04 }}
                  className="flex flex-col items-end"
                >
                  <span
                    className="font-ibm-mono text-[9px] opacity-50 leading-none"
                    style={{ color: 'var(--ink)' }}
                  >
                    CH.{ch.num}
                  </span>
                  <span
                    className="font-bangers text-sm leading-tight tracking-wide"
                    style={{ color: isActive ? '#D62828' : 'var(--ink)' }}
                  >
                    {ch.label}
                  </span>
                  <span
                    className="font-noto-jp text-[9px] opacity-40 leading-none"
                    style={{ color: 'var(--ink)' }}
                  >
                    {ch.jp}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dot node */}
            <div className="relative flex items-center justify-center w-[18px] h-[18px] z-10">
              {/* Active: red filled circle */}
              {isActive ? (
                <motion.div
                  layoutId="chapter-dot"
                  className="w-[16px] h-[16px] rounded-none"
                  style={{
                    background: '#D62828',
                    border: '2px solid var(--ink)',
                    boxShadow: '2px 2px 0 var(--ink)',
                  }}
                  transition={{ type: 'spring', bounce: 0.25, duration: 0.35 }}
                />
              ) : (
                <div
                  className="w-[10px] h-[10px] rounded-none transition-all duration-200 group-hover:scale-125"
                  style={{
                    background: isPast ? 'var(--ink)' : 'transparent',
                    border: '2px solid var(--ink)',
                  }}
                />
              )}
            </div>
          </button>
        )
      })}
    </div>
  )
}

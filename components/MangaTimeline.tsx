'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { Experience } from '@/data/experience'
import HalftoneOverlay from './HalftoneOverlay'

export interface MangaTimelineProps {
  experiences: Experience[]
}

function TimelineNode({ exp, index }: { exp: Experience; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Parallax movement for the whole container
  const y = useTransform(scrollYProgress, [0, 1], [150, -150])
  // Fade in at bottom, fade out at top
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0])
  
  // Parallax movement for the SFX background (moves faster than the panel)
  const sfxY = useTransform(scrollYProgress, [0, 1], [250, -250])

  const staticRotation = index % 2 === 0 ? -2 : 2

  return (
    <div ref={ref} className="relative mb-24">
      <motion.div
        className={`relative flex ${index % 2 === 0 ? 'sm:flex-row-reverse' : 'sm:flex-row'} items-start pl-20 sm:pl-0`}
        style={{ y, opacity }}
      >
      {/* Background SFX (Parallaxing at a different speed) */}
      <motion.div
        className="absolute hidden sm:block font-noto-jp pointer-events-none select-none"
        style={{
          fontSize: '140px',
          fontWeight: 900,
          color: 'var(--red)',
          opacity: 0.05,
          top: '-20%',
          [index % 2 === 0 ? 'right' : 'left']: '15%',
          rotate: index % 2 === 0 ? 15 : -15,
          y: sfxY
        }}
      >
        {index % 2 === 0 ? 'ドドドド' : 'ゴゴゴゴ'}
      </motion.div>

      {/* Timeline node */}
      <div
        className="absolute left-8 sm:left-1/2 top-6 w-5 h-5 -translate-x-1/2 z-10"
        style={{
          background: 'var(--red)',
          border: '3px solid var(--ink)',
        }}
        aria-hidden="true"
      />

      {/* Content panel — sepia flashback style */}
      <motion.div
        className={`w-full sm:w-[48%] ${index % 2 === 0 ? 'sm:mr-auto sm:ml-6' : 'sm:ml-auto sm:mr-6'} relative overflow-hidden`}
        style={{
          filter: 'sepia(0.4) contrast(1.05)',
          border: '3px solid var(--sepia)',
          boxShadow: '6px 6px 0 var(--sepia)',
          background: 'var(--cream)',
          rotate: staticRotation,
          transformOrigin: index % 2 === 0 ? 'right center' : 'left center'
        }}
        whileHover={{ scale: 1.02, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <HalftoneOverlay opacity={0.1} size={8} color="10,10,10" />

        {/* Flashback caption bar */}
        <div
          className="px-4 py-2 flex items-center justify-between relative z-20"
          style={{
            background: 'var(--sepia)',
            borderBottom: '2px solid var(--ink)',
          }}
        >
          <p className="font-bangers text-xs text-manga-paper tracking-widest">
            FLASHBACK // 回想
          </p>
          <p className="font-ibm-mono text-[10px] text-manga-paper opacity-80">
            {exp.startDate} — {exp.endDate}
          </p>
        </div>

        <div className="p-5 sm:p-7 relative z-10">
          {/* Role */}
          <h3 className="font-bangers text-3xl text-manga-ink leading-tight mb-1">
            {exp.role}
          </h3>
          <p className="font-ibm-mono text-sm text-manga-sepia font-bold mb-1">
            {exp.company}
          </p>
          <p className="font-ibm-mono text-[10px] text-manga-gray-light mb-5">
            📍 {exp.location}
          </p>

          {/* Description caption box */}
          <div
            className="p-4 mb-5 font-ibm-mono text-xs text-manga-ink leading-relaxed italic"
            style={{
              background: 'rgba(255,255,255,0.7)',
              border: '2px solid var(--sepia)',
              boxShadow: '3px 3px 0 rgba(0,0,0,0.1)'
            }}
          >
            &ldquo;{exp.description}&rdquo;
          </div>

          {/* Responsibilities as comic panels */}
          <div className="space-y-4">
            {exp.responsibilities.map((resp, ri) => (
              <div
                key={ri}
                className="flex gap-3 items-start"
              >
                <span
                  className="font-bangers text-xs px-2 py-1 shrink-0 mt-0.5"
                  style={{
                    background: 'var(--red)',
                    color: 'var(--paper)',
                    border: '1px solid var(--ink)',
                  }}
                >
                  {(ri + 1).toString().padStart(2, '0')}
                </span>
                <p className="font-ibm-mono text-xs text-manga-ink leading-relaxed">
                  {resp}
                </p>
              </div>
            ))}
          </div>

          {/* Experience badge */}
          <div className="mt-6 flex gap-2">
            <span
              className="font-bangers text-sm px-4 py-1.5 tracking-wider"
              style={{
                background: 'var(--ink)',
                color: 'var(--yellow)',
                border: '2px solid var(--ink)',
              }}
            >
              {exp.type.toUpperCase()}
            </span>
          </div>
        </div>
      </motion.div>
      </motion.div>
    </div>
  )
}

export default function MangaTimeline({ experiences }: MangaTimelineProps) {
  return (
    <div className="relative max-w-5xl mx-auto py-10">
      {/* Vertical ink line */}
      <div
        className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2"
        style={{ background: 'var(--ink)' }}
        aria-hidden="true"
      />

      {experiences.map((exp, index) => (
        <TimelineNode key={`${exp.company}-${exp.startDate}`} exp={exp} index={index} />
      ))}

      {/* Current status panel */}
      <motion.div
        className="relative flex justify-center mt-8"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <div
          className="px-6 py-3 font-bangers text-xl tracking-wider"
          style={{
            background: 'var(--red)',
            color: 'var(--paper)',
            border: '3px solid var(--ink)',
            boxShadow: '4px 4px 0 var(--shadow-color)',
          }}
        >
          TRAINING CONTINUES... 修行続く
        </div>
      </motion.div>
    </div>
  )
}

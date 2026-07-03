'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { SkillCategory } from '@/data/skills'
import { playClickSound } from '@/utils/audio'

interface TechniqueCardProps {
  skill: SkillCategory
  index: number
}

export default function TechniqueCard({ skill, index }: TechniqueCardProps) {
  const [flipped, setFlipped] = useState(false)

  const handleFlip = () => {
    playClickSound()
    setFlipped(!flipped)
  }

  return (
    <motion.div
      className="technique-card-wrapper cursor-pointer"
      style={{ minHeight: '300px', opacity: 0, transform: 'translateY(40px)' }}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onClick={handleFlip}
      role="button"
      tabIndex={0}
      aria-label={`${skill.technique} skills. Click to see details.`}
      onKeyDown={(e) => e.key === 'Enter' && handleFlip()}
    >
      <div
        className="technique-card-inner"
        style={{
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          minHeight: '300px',
        }}
      >
        {/* FRONT FACE */}
        <div className="technique-card-front bg-manga-paper absolute inset-0 p-5 flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-3 gap-2">
            <div className="flex-1 min-w-0">
              <p className="chapter-label text-[10px]">TECHNIQUE</p>
              <h3 className="font-bangers text-2xl sm:text-3xl text-manga-ink leading-none mt-1 break-words">
                {skill.technique}
              </h3>
              <span className="katakana-subtitle block truncate">{skill.techniquejp}</span>
            </div>
            <div
              className="w-10 h-10 shrink-0 flex items-center justify-center text-manga-paper font-bangers text-sm"
              style={{
                background: skill.color,
                border: '2px solid var(--ink)',
                boxShadow: '2px 2px 0 var(--shadow-color)',
              }}
            >
              {index + 1}
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-[2px] bg-manga-ink mb-3" />

          {/* Skills list */}
          <ul className="font-ibm-mono font-semibold text-xs sm:text-sm text-manga-ink grid grid-cols-2 gap-x-2 gap-y-2 flex-1 content-start mt-2">
            {skill.items.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 inline-block shrink-0"
                  style={{ background: skill.color, border: '1px solid var(--ink)' }}
                />
                {item}
              </li>
            ))}
          </ul>

          {/* Tap hint */}
          <p className="text-[9px] font-ibm-mono text-manga-gray-light mt-2 opacity-60">
            TAP TO FLIP ↩
          </p>
        </div>

        {/* BACK FACE */}
        <div className="technique-card-back absolute inset-0 p-5 flex flex-col justify-between">
          <div>
            <p className="font-ibm-mono text-[10px] tracking-widest opacity-60 text-manga-paper mb-1">
              POWER LEVEL
            </p>
            <p className="font-bangers text-6xl text-manga-yellow leading-none">
              {skill.proficiency}
            </p>
            <p className="font-noto-jp text-2xl text-manga-paper mt-2">
              {skill.techniquejp}
            </p>
          </div>

          {/* Proficiency bar */}
          <div>
            <div className="w-full h-3 bg-manga-gray border-2 border-manga-paper relative overflow-hidden">
              <motion.div
                className="h-full"
                style={{ background: skill.color }}
                initial={{ width: 0 }}
                animate={{ width: flipped ? `${skill.proficiency}%` : 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="font-ibm-mono text-[9px] text-manga-paper opacity-60">0</span>
              <span className="font-ibm-mono text-[9px] text-manga-yellow">{skill.proficiency}/100</span>
            </div>
          </div>

          <p className="text-[9px] font-ibm-mono text-manga-paper opacity-60 mt-2">
            TAP TO FLIP ↩
          </p>
        </div>
      </div>
    </motion.div>
  )
}

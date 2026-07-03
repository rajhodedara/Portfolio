'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import NextImage from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import HalftoneOverlay from '@/components/HalftoneOverlay'
import TearableModal from '@/components/TearableModal'
import { playHoverSound } from '@/utils/audio'
import type { Project } from '@/data/projects'

interface ArcCoverProps {
  project: Project
  index: number
}

const arcColors: Record<string, { bg: string; accent: string; text: string }> = {
  'origin-eats': { bg: '#1a0000', accent: '#FF4545', text: '#F5F1E8' },
  'stock-pulse': { bg: '#1a1500', accent: '#FFE600', text: '#F5F1E8' },
  synapse: { bg: '#0d0d0d', accent: '#CCCCCC', text: '#F5F1E8' },
  'courier-dbms': { bg: '#1a0f00', accent: '#D4A373', text: '#F5F1E8' },
}

export default function ArcCover({ project, index }: ArcCoverProps) {
  const colors = arcColors[project.slug] ?? { bg: '#0A0A0A', accent: '#D62828', text: '#F5F1E8' }
  const [isExpanded, setIsExpanded] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])


  return (
    <motion.div
      className="arc-cover relative"
      initial={false}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ opacity: 0, transform: 'translateY(40px) rotate(-1deg)' }}
    >
      <div className="block group">
        <div
          className="relative overflow-hidden transition-all duration-300 ease-out group-hover:-translate-y-2"
          style={{
            border: '3px solid #0A0A0A',
            boxShadow: `var(--hover-shadow-x, 6px) var(--hover-shadow-y, 6px) 0 ${colors.accent}`,
            aspectRatio: '3/4',
            background: colors.bg,
            // @ts-ignore
            '--hover-shadow-x': '6px',
            '--hover-shadow-y': '6px',
          }}
          onMouseEnter={(e) => {
            if (!isExpanded) playHoverSound();
            e.currentTarget.style.setProperty('--hover-shadow-x', '12px');
            e.currentTarget.style.setProperty('--hover-shadow-y', '12px');
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.setProperty('--hover-shadow-x', '6px');
            e.currentTarget.style.setProperty('--hover-shadow-y', '6px');
          }}
        >
          {/* Halftone overlay */}
          <HalftoneOverlay opacity={0.05} size={8} color="245,241,232" />

          {/* Arc number badge */}
          <div
            className="absolute top-4 left-4 z-10 font-bangers text-xs px-2 py-1"
            style={{
              background: colors.accent,
              color: colors.text,
              border: '2px solid #0A0A0A',
              boxShadow: '2px 2px 0 #0A0A0A',
            }}
          >
            ARC {project.arcNumber.toString().padStart(2, '0')}
          </div>

          {/* Project Cover Image */}
          <div className="absolute inset-0 opacity-40 dark:opacity-70 mix-blend-luminosity dark:mix-blend-normal">
            <NextImage
              src={`/manga/${project.slug}.png`}
              alt={`${project.arcTitle} cover art`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          </div>

          {/* Dark gradient to ensure text readability */}
          <div
            className="absolute inset-0 z-[5]"
            style={{
              background: `linear-gradient(to top, ${colors.bg} 40%, transparent 100%)`,
            }}
          />

          {/* Main content */}
          <div className="absolute inset-0 flex flex-col justify-end p-5 z-10">
            {/* Arc title */}
            <div className="mb-4">
              <p
                className="font-ibm-mono text-[10px] tracking-widest mb-1 opacity-70"
                style={{ color: colors.accent }}
              >
                {project.arcSubtitle.toUpperCase()}
              </p>
              <h3
                className="font-bangers text-4xl leading-none"
                style={{ color: colors.text }}
              >
                {project.arcTitle}
              </h3>
            </div>

            {/* Hook text */}
            <p
              className="font-ibm-mono text-xs leading-relaxed mb-4"
              style={{ color: colors.text }}
            >
              {project.hook}
            </p>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.stack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="font-ibm-mono text-[10px] px-2.5 py-1 transition-colors duration-200 group-hover:bg-[#1A1A1A]"
                  style={{
                    background: '#0A0A0A',
                    color: colors.accent,
                    border: `2px solid ${colors.accent}`,
                    fontWeight: 700,
                  }}
                >
                  {tech}
                </span>
              ))}
              {project.stack.length > 4 && (
                <span
                  className="font-ibm-mono text-[10px] px-2.5 py-1 opacity-80"
                  style={{
                    background: '#0A0A0A',
                    color: colors.accent,
                    border: `2px solid ${colors.accent}`,
                  }}
                >
                  +{project.stack.length - 4}
                </span>
              )}
            </div>

            {/* CTAs */}
            <div className="flex gap-3 relative z-30">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsExpanded(true);
                }}
                className="font-bangers text-sm tracking-wider px-4 py-2 text-center transition-all duration-200 uppercase"
                style={{
                  border: `2px solid ${colors.accent}`,
                  background: '#0A0A0A',
                  color: colors.accent,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = colors.accent;
                  e.currentTarget.style.color = '#0A0A0A';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#0A0A0A';
                  e.currentTarget.style.color = colors.accent;
                }}
              >
                TL;DR
              </button>
              <Link
                href={`/projects/${project.slug}`}
                className="flex-1 font-bangers text-sm tracking-wider px-4 py-2 text-center transition-all duration-200"
                style={{
                  border: '2px solid #0A0A0A',
                  boxShadow: '3px 3px 0 #0A0A0A',
                  background: colors.accent,
                  color: '#0A0A0A',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = colors.text;
                  e.currentTarget.style.color = '#0A0A0A';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = colors.accent;
                  e.currentTarget.style.color = '#0A0A0A';
                }}
              >
                READ ARC →
              </Link>
            </div>
          </div>

          {/* Hover glow overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at center, ${colors.accent}15 0%, transparent 70%)`,
            }}
          />

          {/* TL;DR Modal Overlay */}
          {mounted && createPortal(
            <TearableModal 
              isOpen={isExpanded} 
              onClose={() => setIsExpanded(false)} 
              colors={colors}
              title={project.arcTitle}
            >
              {/* Content */}
              <div className="flex flex-col gap-6 flex-1">
                <div>
                  <h5 className="font-ibm-mono text-xs font-bold mb-2 tracking-widest opacity-80" style={{ color: colors.accent }}>MISSION (PROBLEM)</h5>
                  <p className="font-sans text-sm sm:text-base leading-relaxed" style={{ color: colors.text }}>{project.problem}</p>
                </div>
                
                <div>
                  <h5 className="font-ibm-mono text-xs font-bold mb-2 tracking-widest opacity-80" style={{ color: colors.accent }}>WEAPONS (STACK)</h5>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map(tech => (
                      <span key={tech} className="font-ibm-mono text-[10px] sm:text-xs px-2.5 py-1" style={{ background: `${colors.accent}15`, color: colors.text, border: `1px solid ${colors.accent}40` }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="font-ibm-mono text-xs font-bold mb-2 tracking-widest opacity-80" style={{ color: colors.accent }}>VICTORY (IMPACT)</h5>
                  <p className="font-sans text-sm sm:text-base leading-relaxed" style={{ color: colors.text }}>{project.result}</p>
                </div>
              </div>

              {/* Read Arc CTA inside overlay */}
              <div className="mt-8 pt-5 border-t-2" style={{ borderColor: `${colors.accent}20` }}>
                <Link 
                  href={`/projects/${project.slug}`}
                  className="block w-full font-bangers text-lg tracking-wider px-4 py-3 text-center transition-all hover:scale-[1.02]"
                  style={{
                    background: colors.accent,
                    color: '#0A0A0A',
                  }}
                >
                  ENTER THE FULL ARC →
                </Link>
              </div>
            </TearableModal>, 
            document.body
          )}
        </div>
      </div>
    </motion.div>
  )
}

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HalftoneOverlay from './HalftoneOverlay'
import { playHoverSound } from '@/utils/audio'

const skillNodes = {
  core: {
    id: 'core',
    label: 'PROTAGONIST CORE',
    jp: '主人公の核',
    level: 'Lv. 99',
    description: 'Fundamental programming paradigms, languages, and version control. The foundational strength of the developer.',
    skills: ['Python', 'C/C++', 'Java', 'JavaScript', 'Git'],
    color: '#D62828'
  },
  frontend: {
    id: 'frontend',
    label: 'FRONTEND STANCE',
    jp: '前衛姿勢',
    level: 'Lv. 85',
    description: 'User interface, client-side architecture, and animations. The visible strikes that impact the user.',
    skills: ['React.js', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    color: '#FFD60A'
  },
  ai: {
    id: 'ai',
    label: 'AI DOMAIN',
    jp: '人工知能領域',
    level: 'Lv. 88',
    description: 'Machine learning, NLP, and data science. The awakened analytical powers.',
    skills: ['Scikit-learn', 'NLP', 'FinBERT', 'Pandas', 'NumPy', 'Sentiment Analysis'],
    color: '#D62828'
  },
  backend: {
    id: 'backend',
    label: 'BACKEND STRIKE',
    jp: '後衛攻撃',
    level: 'Lv. 80',
    description: 'Server architecture, APIs, and databases. The unseen but devastating foundational logic.',
    skills: ['FastAPI', 'Django', 'PostgreSQL', 'Supabase', 'REST API'],
    color: '#0A0A0A'
  }
}

export default function SkillTree() {
  const [activeNode, setActiveNode] = useState<string>('core')

  const Node = ({ id }: { id: keyof typeof skillNodes }) => {
    const node = skillNodes[id]
    const isActive = activeNode === id
    return (
      <motion.button
        onClick={() => {
          if (!isActive) playHoverSound()
          setActiveNode(id)
        }}
        className="relative px-3 py-2 sm:px-4 sm:py-3 w-[140px] sm:w-[160px] text-center z-10"
        style={{
          background: isActive ? node.color : 'var(--bg)',
          border: '3px solid var(--ink)',
          boxShadow: isActive ? 'none' : `4px 4px 0 ${node.color}`,
          transform: isActive ? 'translate(4px, 4px)' : 'none',
          color: isActive && node.color !== '#FFD60A' ? 'var(--paper)' : 'var(--ink)',
          transition: 'transform 0.1s ease, box-shadow 0.1s ease'
        }}
        whileHover={!isActive ? { x: -2, y: -2, boxShadow: `6px 6px 0 ${node.color}` } : {}}
      >
        <p className="font-bangers text-lg sm:text-xl tracking-wider leading-none">{node.label}</p>
        <p className="font-ibm-mono text-[10px] mt-1 opacity-70" style={{ color: isActive && node.color !== '#FFD60A' ? 'var(--paper)' : 'inherit' }}>{node.level}</p>
      </motion.button>
    )
  }

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 items-start mt-6">
      {/* Visual Tree */}
      <div className="flex-1 w-full overflow-x-auto pb-8 custom-scrollbar">
        <div className="min-w-[500px] flex flex-col items-center pt-2">
          
          <Node id="core" />
          
          {/* Vertical connecting line */}
          <div className="w-[3px] h-8 bg-manga-ink" />
          
          {/* Bottom Row */}
          <div className="flex gap-4 sm:gap-6 relative mt-6">
            {/* The horizontal connecting bar */}
            <div className="absolute left-[16%] right-[16%] top-[-24px] border-t-[3px] border-manga-ink h-6">
              <div className="absolute left-0 top-0 bottom-0 border-l-[3px] border-manga-ink" />
              <div className="absolute left-1/2 top-0 bottom-0 border-l-[3px] border-manga-ink -translate-x-1/2" />
              <div className="absolute right-0 top-0 bottom-0 border-r-[3px] border-manga-ink" />
            </div>
            
            <Node id="frontend" />
            <Node id="ai" />
            <Node id="backend" />
          </div>
        </div>
      </div>

      {/* Info Panel */}
      <div className="w-full lg:w-1/3 min-h-[300px] relative overflow-hidden" style={{
        background: 'var(--paper)',
        border: '3px solid var(--ink)',
        boxShadow: '8px 8px 0 var(--ink)'
      }}>
        <HalftoneOverlay opacity={0.05} size={10} />
        
        {/* Flashy corner */}
        <div
          className="absolute top-0 right-0 w-12 h-12 z-0"
          style={{
            background: skillNodes[activeNode as keyof typeof skillNodes].color,
            clipPath: 'polygon(100% 0, 0 0, 100% 100%)'
          }}
        />

        <AnimatePresence mode="wait">
          {activeNode && (
            <motion.div
              key={activeNode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="p-6 relative z-10"
            >
               <p className="font-ibm-mono text-xs tracking-widest mb-1" style={{ color: skillNodes[activeNode as keyof typeof skillNodes].color }}>
                 {skillNodes[activeNode as keyof typeof skillNodes].jp}
               </p>
               <h4 className="font-bangers text-4xl mb-4 text-manga-ink">
                 {skillNodes[activeNode as keyof typeof skillNodes].label}
               </h4>
               <p className="font-ibm-mono text-sm mb-6 leading-relaxed text-manga-ink opacity-90">
                 {skillNodes[activeNode as keyof typeof skillNodes].description}
               </p>
               
               <div className="space-y-3 mt-4">
                 <p className="font-bangers text-xl text-manga-ink tracking-wider">EQUIPPED SKILLS:</p>
                 <div className="flex flex-wrap gap-2">
                   {skillNodes[activeNode as keyof typeof skillNodes].skills.map(skill => (
                     <motion.span 
                       key={skill}
                       initial={{ opacity: 0, scale: 0.8 }}
                       animate={{ opacity: 1, scale: 1 }}
                       className="font-ibm-mono text-xs px-3 py-1.5 font-bold"
                       style={{ 
                         background: 'var(--bg)', 
                         border: '2px solid var(--ink)',
                         color: 'var(--ink)'
                       }}
                     >
                       {skill}
                     </motion.span>
                   ))}
                 </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { playClickSound } from '@/utils/audio'
import HalftoneOverlay from '@/components/HalftoneOverlay'
import { useAwakened } from '@/hooks/useAwakened'
import Image from 'next/image'
import { track } from '@vercel/analytics'

export default function GuildCard() {
  const [flipped, setFlipped] = useState(false)
  const isAwakened = useAwakened()

  const handleFlip = (e: React.MouseEvent) => {
    // If they click the download link itself, don't flip back immediately
    if ((e.target as HTMLElement).closest('a')) {
      return
    }
    playClickSound()
    setFlipped(!flipped)
  }

  return (
    <motion.div
      className="technique-card-wrapper cursor-pointer group"
      style={{ width: '280px', height: '160px' }}
      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: -4 }}
      transition={{ 
        type: 'spring', 
        stiffness: 260, 
        damping: 20, 
        delay: 0.5 
      }}
      whileHover={{ scale: 1.05, rotate: -2 }}
      onClick={handleFlip}
      role="button"
      tabIndex={0}
      aria-label="Hunter License Guild Card. Click to flip for resume download."
      onKeyDown={(e) => e.key === 'Enter' && handleFlip(e as any)}
    >
      <div
        className="technique-card-inner shadow-2xl"
        style={{
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          minHeight: '100%',
        }}
      >
        {/* FRONT FACE */}
        <div 
          className="absolute inset-0 p-3 flex flex-col justify-between overflow-hidden"
          style={{
            background: '#F5F1E8',
            border: '3px solid #0A0A0A',
            boxShadow: '6px 6px 0 #0A0A0A',
            backfaceVisibility: 'hidden',
          }}
        >
          <HalftoneOverlay opacity={0.08} size={6} />
          
          <div className="relative z-10 flex justify-between items-start border-b-2 border-[#0A0A0A] pb-1 mb-2">
            <div>
              <h4 className="font-bangers text-xl text-[#D62828] leading-none tracking-wide">
                {isAwakened ? 'DEAD OR ALIVE // ¥999,999,999' : 'GUILD ID // 1004'}
              </h4>
              <p className="font-ibm-mono text-[8px] tracking-widest text-[#0A0A0A] opacity-70">
                {isAwakened ? 'WANTED INDIVIDUAL' : 'OFFICIAL REGISTRATION'}
              </p>
            </div>
            <div className="w-8 h-8 border-2 border-[#0A0A0A] bg-[#FFD60A] flex items-center justify-center font-bangers text-xs">
              S
            </div>
          </div>

          <div className="relative z-10 flex-1 grid grid-cols-[1fr_auto] gap-2">
            <div className="flex flex-col gap-1.5 justify-center">
              <div>
                <p className="font-ibm-mono text-[7px] text-[#0A0A0A] opacity-60">NAME</p>
                <p className="font-bangers text-lg leading-none text-[#0A0A0A]">RAJ ODEDARA</p>
              </div>
              <div>
                <p className="font-ibm-mono text-[7px] text-[#0A0A0A] opacity-60">
                  {isAwakened ? 'THREAT LEVEL' : 'CLASS'}
                </p>
                <p className="font-ibm-mono text-[10px] font-bold text-[#0A0A0A]">
                  {isAwakened ? 'S-CLASS ANOMALY' : 'FULL STACK ENGINEER'}
                </p>
              </div>
            </div>
            
            {/* Photo Placeholder */}
            <div className="w-16 h-[100%] border-2 border-[#0A0A0A] bg-[#0A0A0A] flex items-center justify-center overflow-hidden relative">
                <Image 
                  src="/guild_card_portrait.webp" 
                  alt="Guild Avatar" 
                  fill
                  className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
                  style={{ filter: isAwakened ? 'invert(1) grayscale(100%) brightness(0.8)' : 'none' }}
                />
            </div>
          </div>

          {/* Barcode Footer */}
          <div className="relative z-10 mt-2 flex justify-between items-end">
              <div className="flex gap-[2px] h-4">
                {[2, 4, 2, 2, 4, 4, 2, 4, 2, 4, 2, 2, 4, 2, 4, 4, 2, 4, 2, 2].map((w, i) => (
                  <div key={i} className="bg-[#0A0A0A]" style={{ width: `${w}px` }}></div>
                ))}
             </div>
             <p className="font-ibm-mono text-[7px] text-[#0A0A0A] animate-pulse">TAP TO FLIP ↩</p>
          </div>
        </div>

        {/* BACK FACE */}
        <div 
          className="absolute inset-0 p-4 flex flex-col justify-center items-center text-center overflow-hidden"
          style={{
            background: '#0A0A0A',
            border: '3px solid #F5F1E8',
            boxShadow: '6px 6px 0 #D62828',
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
          }}
        >
          <HalftoneOverlay opacity={0.15} size={8} color="214,40,40" />
          
          <div className="relative z-10 w-full">
            <p className="font-ibm-mono text-[10px] text-[#FFD60A] mb-2 tracking-widest">DOSSIER UNLOCKED</p>
            
            <a 
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-2 font-bangers text-lg tracking-widest transition-transform hover:scale-105 active:scale-95"
              style={{
                background: '#D62828',
                color: '#F5F1E8',
                border: '2px solid #F5F1E8',
                boxShadow: '3px 3px 0 #F5F1E8',
              }}
              onClick={(e) => {
                e.stopPropagation()
                track('resume_download')
              }}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
            >
              DOWNLOAD RESUME ↓
            </a>
            
            <p className="font-ibm-mono text-[7px] text-[#F5F1E8] mt-3 opacity-50">PDF FORMAT // 1 PAGE // 100KB</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface HoverBubbleProps {
  children: React.ReactNode
  text: string
  direction?: 'top' | 'bottom' | 'left' | 'right'
}

export default function HoverBubble({ children, text, direction = 'top' }: HoverBubbleProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <div 
      className="relative inline-block w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      {children}
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ 
              opacity: 0, 
              scale: 0.8, 
              y: direction === 'top' ? 10 : direction === 'bottom' ? -10 : '-50%',
              x: direction === 'top' || direction === 'bottom' ? '-50%' : direction === 'left' ? 10 : -10 
            }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: direction === 'left' || direction === 'right' ? '-50%' : 0,
              x: direction === 'top' || direction === 'bottom' ? '-50%' : 0
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.8, 
              transition: { duration: 0.1 } 
            }}
            transition={{ type: 'spring', damping: 15, stiffness: 400 }}
            className="absolute z-50 pointer-events-none flex items-center justify-center speech-bubble"
            style={{
              ...(direction === 'top' ? { bottom: '100%', left: '50%', marginBottom: '8px' } : {}),
              ...(direction === 'bottom' ? { top: '100%', left: '50%', marginTop: '8px' } : {}),
              ...(direction === 'left' ? { right: '100%', top: '50%', marginRight: '8px' } : {}),
              ...(direction === 'right' ? { left: '100%', top: '50%', marginLeft: '8px' } : {}),
              minWidth: '130px',
              minHeight: '80px'
            }}
          >
            {/* The SVG Jagged Bubble */}
            <svg 
              viewBox="0 0 100 100" 
              preserveAspectRatio="none" 
              className="absolute inset-0 w-full h-full drop-shadow-[4px_4px_0_var(--red)]"
            >
              <polygon 
                points="50,0 60,15 80,10 75,30 100,40 85,55 95,75 70,70 60,95 45,80 25,100 25,75 0,70 15,50 0,25 25,25 20,0 40,15" 
                fill="var(--paper)" 
                stroke="var(--ink)" 
                strokeWidth="3"
                strokeLinejoin="miter"
              />
            </svg>
            
            {/* The Text */}
            <span 
              className="relative z-10 font-bangers text-xl text-center leading-tight px-6 py-4"
              style={{ color: 'var(--ink)' }}
            >
              {text}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

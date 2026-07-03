'use client'

import { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

interface PageTransitionProps {
  children: ReactNode
}

// Pre-compute so SSR and client always render identical SVG attributes
const SPEED_LINES = Array.from({ length: 24 }, (_, i) => {
  const angle = (i / 24) * Math.PI * 2
  return {
    x2: (Math.cos(angle) * 160 + 50).toFixed(2),
    y2: (Math.sin(angle) * 160 + 50).toFixed(2),
  }
})

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        className="w-full h-full"
        style={{ perspective: '2500px', transformStyle: 'preserve-3d' }}
      >
        <motion.div
          initial={{ 
            rotateY: 90, 
            transformOrigin: 'right center', 
            opacity: 0,
            scale: 0.95
          }}
          animate={{ 
            rotateY: 0, 
            opacity: 1, 
            scale: 1 
          }}
          exit={{ 
            rotateY: -90, 
            transformOrigin: 'left center', 
            opacity: 0,
            scale: 0.95
          }}
          transition={{ 
            duration: 0.6, 
            ease: [0.32, 0.72, 0, 1] 
          }}
          className="w-full h-full relative"
        >
          {children}
          
          {/* 3D Page Shadow Gradient */}
          <motion.div 
            className="absolute inset-0 pointer-events-none z-[9999]"
            initial={{ 
              background: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)',
              opacity: 1 
            }}
            animate={{ opacity: 0 }}
            exit={{ 
              background: 'linear-gradient(to left, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)',
              opacity: 1 
            }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

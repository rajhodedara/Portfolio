'use client'

import { useState, useEffect, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface TearableModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  colors: { bg: string; accent: string; text: string }
  title: string
}

export default function TearableModal({ isOpen, onClose, children, colors, title }: TearableModalProps) {
  const [isTearing, setIsTearing] = useState(false)
  const [shouldRender, setShouldRender] = useState(isOpen)

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      setIsTearing(false)
    }
  }, [isOpen])

  const handleClose = () => {
    if (isTearing) return
    setIsTearing(true)
    setTimeout(() => {
      setShouldRender(false)
      onClose()
    }, 600) // Duration of the tear animation
  }

  if (!shouldRender) return null

  const ModalContent = ({ clipPath }: { clipPath?: string }) => (
    <motion.div
      initial={!isTearing ? { opacity: 0, y: 20, scale: 0.95 } : undefined}
      animate={!isTearing ? { opacity: 1, y: 0, scale: 1 } : undefined}
      exit={!isTearing ? { opacity: 0, y: 20, scale: 0.95 } : undefined}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="absolute inset-0 flex flex-col overflow-y-auto custom-scrollbar"
      style={{
        background: colors.bg,
        border: `3px solid ${colors.accent}`,
        boxShadow: `8px 8px 0 ${colors.accent}`,
        clipPath: clipPath,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-6 sm:p-8 flex flex-col h-full relative">
         <div className="flex justify-between items-center mb-6 border-b-2 pb-3" style={{ borderColor: `${colors.accent}50` }}>
           <div>
             <p className="font-ibm-mono text-[10px] tracking-widest opacity-80 mb-1" style={{ color: colors.text }}>{title.toUpperCase()}</p>
             <h4 className="font-bangers text-3xl tracking-wide flex items-center gap-2" style={{ color: colors.accent }}>
               <span>⚡</span> BATTLE SUMMARY
             </h4>
           </div>
           <button
             onClick={(e) => {
               e.preventDefault();
               handleClose();
             }}
             className="font-ibm-mono text-sm font-bold hover:scale-110 transition-transform self-start mt-2"
             style={{ color: colors.text }}
           >
             [CLOSE]
           </button>
         </div>
         {children}
      </div>
    </motion.div>
  )

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12"
      role="dialog"
      aria-modal="true"
      onClick={handleClose}
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isTearing ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-2xl h-[90vh] max-h-[800px]">
        {!isTearing ? (
          <ModalContent />
        ) : (
          <>
            <motion.div
              className="absolute inset-0 z-10"
              initial={{ rotate: 0, x: 0, y: 0 }}
              animate={{ rotate: -15, x: '-30%', y: '100%', opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.32, 0, 0.67, 0] }}
            >
              <ModalContent clipPath="polygon(0% 0%, 50% 0%, 55% 10%, 45% 20%, 55% 30%, 45% 40%, 55% 50%, 45% 60%, 55% 70%, 45% 80%, 55% 90%, 50% 100%, 0% 100%)" />
            </motion.div>

            <motion.div
              className="absolute inset-0 z-10"
              initial={{ rotate: 0, x: 0, y: 0 }}
              animate={{ rotate: 15, x: '30%', y: '100%', opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.32, 0, 0.67, 0] }}
            >
              <ModalContent clipPath="polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%, 55% 90%, 45% 80%, 55% 70%, 45% 60%, 55% 50%, 45% 40%, 55% 30%, 45% 20%, 55% 10%)" />
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}

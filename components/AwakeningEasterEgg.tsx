'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { track } from '@vercel/analytics'

// Simple trigger: type "raj" anywhere on the page
const TRIGGER = ['r', 'a', 'j']

type Phase = 'idle' | 'blackout' | 'stamp' | 'glitch' | 'domain-expand' | 'reveal'

export default function AwakeningEasterEgg() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [showHint, setShowHint] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const inputBuffer = useRef<string[]>([])
  const phaseTimers = useRef<ReturnType<typeof setTimeout>[]>([])
  
  const [chargeProgress, setChargeProgress] = useState(0)
  const chargeStartRef = useRef<number>(0)
  const chargeAnimationRef = useRef<number | null>(null)

  const clearTimers = useCallback(() => {
    phaseTimers.current.forEach(clearTimeout)
    phaseTimers.current = []
    if (chargeAnimationRef.current) {
      cancelAnimationFrame(chargeAnimationRef.current)
      chargeAnimationRef.current = null
    }
  }, [])

  const enableAwakenedMode = useCallback(() => {
    const root = document.documentElement
    if (!root.classList.contains('awakened')) {
      root.classList.add('awakened')
      root.classList.add('awakened-domain')
      localStorage.setItem('manga-awakened-mode', 'true')
      window.dispatchEvent(new Event('awakening-toggled'))
      track('awakening_triggered')
      
      setShowToast(true)
      setTimeout(() => setShowToast(false), 4000)
    }
  }, [])

  // Initialize from localStorage
  useEffect(() => {
    if (localStorage.getItem('manga-awakened-mode') === 'true') {
      document.documentElement.classList.add('awakened')
      document.documentElement.classList.add('awakened-domain')
    }
  }, [])

  const triggerAwakening = useCallback(() => {
    clearTimers()
    
    // Accessibility check: prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      enableAwakenedMode()
      return
    }

    setPhase('blackout')

    phaseTimers.current = [
      setTimeout(() => setPhase('stamp'), 150),
      setTimeout(() => setPhase('glitch'), 600),
      setTimeout(() => setPhase('domain-expand'), 1200),
      setTimeout(() => {
        setPhase('reveal')
        enableAwakenedMode()
      }, 2000),
      setTimeout(() => setPhase('idle'), 2800),
    ]
  }, [clearTimers, enableAwakenedMode])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Ignore if typing in an input/textarea
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return

      const key = e.key.toLowerCase()
      inputBuffer.current = [...inputBuffer.current, key].slice(-TRIGGER.length)

      if (inputBuffer.current.join('') === TRIGGER.join('')) {
        inputBuffer.current = []
        triggerAwakening()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('keydown', handleKey)
      clearTimers()
    }
  }, [triggerAwakening, clearTimers])

  const dismiss = useCallback(() => {
    clearTimers()
    setPhase('reveal')
    phaseTimers.current = [setTimeout(() => {
      setPhase('idle')
      enableAwakenedMode()
    }, 800)]
  }, [clearTimers, enableAwakenedMode])

  const startCharge = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if ('button' in e && e.button !== 0) return
    
    chargeStartRef.current = Date.now()
    
    const updateProgress = () => {
      const elapsed = Date.now() - chargeStartRef.current
      const progress = Math.min(elapsed / 1200, 1)
      setChargeProgress(progress)
      
      if (progress >= 1) {
        setChargeProgress(0)
        triggerAwakening()
      } else {
        chargeAnimationRef.current = requestAnimationFrame(updateProgress)
      }
    }
    
    chargeAnimationRef.current = requestAnimationFrame(updateProgress)
  }, [triggerAwakening])

  const stopCharge = useCallback(() => {
    if (chargeAnimationRef.current) {
      cancelAnimationFrame(chargeAnimationRef.current)
      chargeAnimationRef.current = null
    }
    setChargeProgress(0)
  }, [])

  // Show hint tooltip briefly when hovering the watermark
  const handleHintHover = () => setShowHint(true)
  const handleHintLeave = () => {
    setShowHint(false)
    stopCharge()
  }

  return (
    <>
      {/* ── Subtle corner watermark hint ── */}
      <div
        className="awakening-watermark relative"
        onMouseEnter={handleHintHover}
        onMouseLeave={handleHintLeave}
        onMouseDown={startCharge}
        onMouseUp={stopCharge}
        onTouchStart={startCharge}
        onTouchEnd={stopCharge}
        onTouchCancel={stopCharge}
        aria-label="Secret: hold or type 'raj' to awaken"
        title="覚醒..."
      >
        <span className="relative z-10 text-2xl">覚</span>
        <span className="relative z-10 font-ibm-mono text-[8px] opacity-80 tracking-widest">HOLD</span>
        
        {/* Charge-up radial ring */}
        {chargeProgress > 0 && (
          <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 -scale-y-100 -rotate-90 pointer-events-none" viewBox="0 0 100 100">
            <circle
              cx="50" cy="50" r="44"
              fill="none"
              stroke="#D62828"
              strokeWidth="4"
              strokeDasharray={2 * Math.PI * 44}
              strokeDashoffset={2 * Math.PI * 44 * (1 - chargeProgress)}
              className="drop-shadow-[0_0_8px_rgba(214,40,40,0.8)] transition-none"
            />
          </svg>
        )}
        {/* Tooltip on hover */}
        <span
          className="awakening-watermark-tooltip"
          style={{ opacity: showHint ? 1 : 0, transform: showHint ? 'translateY(0)' : 'translateY(4px)' }}
        >
          type <strong>raj</strong>
        </span>
      </div>

      {/* ── Easter egg overlay (only when active) ── */}
      {phase !== 'idle' && (
        <div
          className="awakening-overlay fixed inset-0 z-[10000] pointer-events-none flex items-center justify-center overflow-hidden"
          onClick={dismiss}
          role="dialog"
          aria-modal="true"
          aria-label="Awakening Easter Egg"
          style={{
            opacity: phase === 'reveal' ? 0 : 1,
            transition: phase === 'reveal' ? 'opacity 0.8s ease-out' : 'none',
          }}
        >
          {/* Blackout background */}
          <div className="absolute inset-0 bg-[#050101]" />

          {/* Stamp & Glitch Phase */}
          {(phase === 'stamp' || phase === 'glitch') && (
            <div className={`relative z-10 flex flex-col items-center justify-center ${phase === 'glitch' ? 'animate-[screen-shake_0.2s_cubic-bezier(0.36,0.07,0.19,0.97)_both_infinite]' : ''}`}>
               <div className="font-zen-dots text-[10rem] sm:text-[16rem] leading-none text-manga-red opacity-20 absolute -translate-y-4 whitespace-nowrap">
                 領域展開
               </div>
               <div 
                  className={`font-bangers text-7xl sm:text-9xl text-manga-paper tracking-widest relative z-10 ${
                    phase === 'glitch' 
                      ? 'animate-[glitch-distortion_0.2s_steps(2,end)_infinite]' 
                      : 'animate-[impact-stamp_0.15s_cubic-bezier(0.175,0.885,0.32,1.275)_both]'
                  }`}
                  style={{
                    textShadow: '8px 8px 0 var(--red), -2px -2px 0 var(--yellow)',
                  }}
               >
                 DOMAIN EXPANSION
               </div>
            </div>
          )}

          {/* Domain Expansion Sphere Phase */}
          {phase === 'domain-expand' && (
            <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
               <div 
                 className="bg-black rounded-full"
                 style={{
                   width: '10px',
                   height: '10px',
                   animation: 'domain-expand-anim 0.8s cubic-bezier(0.5, 0, 0, 1) forwards'
                 }}
               />
               <style>{`
                 @keyframes domain-expand-anim {
                   0% { transform: scale(1); opacity: 1; box-shadow: 0 0 100px var(--red); }
                   100% { transform: scale(500); opacity: 1; box-shadow: 0 0 500px var(--red); }
                 }
               `}</style>
            </div>
          )}
        </div>
      )}

      {/* ── Manga-style Toast Notification ── */}
      {showToast && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[10001] pointer-events-none flex flex-col items-center animate-[awakening-hint-pop_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)_both]"
        >
          <div 
            className="px-6 py-3"
            style={{
              background: 'var(--ink)',
              border: '3px solid var(--paper)',
              boxShadow: '6px 6px 0 var(--red)',
            }}
          >
            <p className="font-bangers text-xl text-manga-paper tracking-widest text-center mb-1">
              POWER UNLOCKED
            </p>
            <p className="font-ibm-mono text-[10px] text-manga-red tracking-widest uppercase text-center">
              The layout has bent to your will.
            </p>
          </div>
        </div>
      )}
    </>
  )
}

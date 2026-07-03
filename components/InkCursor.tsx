'use client'

import { useEffect, useRef, useState } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
  createdAt: number
}

interface InkDot {
  x: number
  y: number
  radius: number
  alpha: number
  createdAt: number
}

export default function InkCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const blendHudRef = useRef<HTMLDivElement>(null)
  const solidCoreRef = useRef<HTMLDivElement>(null)
  
  const dotsRef = useRef<InkDot[]>([])
  const particlesRef = useRef<Particle[]>([])
  
  const mouseRef = useRef({ x: -100, y: -100, isHovering: false })
  const rafRef = useRef<number>(0)

  // Use React state ONLY for structural CSS class changes, not for X/Y coordinates
  const [isHoveringState, setIsHoveringState] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Hide default cursor globally
    document.body.style.cursor = 'none'
    const styleEl = document.createElement('style')
    styleEl.innerHTML = `
      * { cursor: none !important; }
    `
    document.head.appendChild(styleEl)

    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      
      const target = e.target as HTMLElement
      if (target) {
        const hovering = !!target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer, summary')
        if (mouseRef.current.isHovering !== hovering) {
          mouseRef.current.isHovering = hovering
          setIsHoveringState(hovering)
        }
      }

      // Add to Canvas Trail
      const last = dotsRef.current[dotsRef.current.length - 1]
      const dx = last ? e.clientX - last.x : Infinity
      const dy = last ? e.clientY - last.y : Infinity
      if (!last || Math.sqrt(dx * dx + dy * dy) > 8) {
        dotsRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 4,
          y: e.clientY + (Math.random() - 0.5) * 4,
          radius: Math.random() * 3 + 1.5,
          alpha: 0.7,
          createdAt: Date.now(),
        })
        if (dotsRef.current.length > 30) dotsRef.current.shift()
      }
    }

    const onClick = (e: MouseEvent) => {
      const count = 12 + Math.floor(Math.random() * 8)
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5
        const speed = Math.random() * 5 + 2
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 5 + 2,
          alpha: 1,
          createdAt: Date.now(),
        })
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('click', onClick)

    const isAwakened = () => document.documentElement.classList.contains('awakened')

    // Unified Render Loop (60 FPS)
    const draw = () => {
      const { x, y } = mouseRef.current
      const now = Date.now()

      // 1. UPDATE DOM CURSORS (Hardware Accelerated)
      if (blendHudRef.current && x !== -100) {
        blendHudRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      }
      if (solidCoreRef.current && x !== -100) {
        solidCoreRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      }

      // 2. UPDATE CANVAS PARTICLES
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const isAwake = isAwakened()
      // Base trail color is always white to pop against backgrounds
      const trailColor = isAwake ? '255,26,26' : '255,255,255'

      // Draw trail dots
      dotsRef.current = dotsRef.current.filter((dot) => {
        const age = now - dot.createdAt
        const alpha = Math.max(0, 0.7 - age / 500)
        if (alpha <= 0) return false
        const r = dot.radius * Math.max(0.1, 1 - age / 600)
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${trailColor},${alpha})`
        ctx.fill()
        return true
      })

      // Draw click-splash particles
      particlesRef.current = particlesRef.current.filter((p) => {
        const age = now - p.createdAt
        const alpha = Math.max(0, 1 - age / 400)
        if (alpha <= 0) return false
        p.x += p.vx * (1 - age / 500)
        p.y += p.vy * (1 - age / 500)
        p.vy += 0.15 // gravity
        const r = p.radius * alpha
        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fillStyle = isAwake ? `rgba(255,255,255,${alpha})` : `rgba(255,255,255,${alpha})`
        ctx.fill()
        return true
      })

      rafRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('click', onClick)
      cancelAnimationFrame(rafRef.current)
      document.head.removeChild(styleEl)
      document.body.style.cursor = 'auto'
    }
  }, [])

  return (
    <>
      {/* LAYER 3: Canvas Particles (Background) */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[10002] pointer-events-none"
        style={{ opacity: 0.6 }}
        aria-hidden="true"
      />

      {/* LAYER 1: Blend HUD (mix-blend-mode: difference) */}
      {/* Pure white inverts perfectly to black on light backgrounds, stays white on dark */}
      <div 
        ref={blendHudRef}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 z-[10003] pointer-events-none flex items-center justify-center transition-opacity duration-300"
        style={{ 
          willChange: 'transform',
          mixBlendMode: 'difference' 
        }}
      >
         {/* Dynamic Ring */}
         <div 
            className="absolute border-[2px] border-white rounded-full transition-all duration-200 ease-out" 
            style={{ 
                width: isHoveringState ? '36px' : '24px', 
                height: isHoveringState ? '36px' : '24px',
                opacity: isHoveringState ? 1 : 0.8
            }} 
         />
         {/* Crosshairs (Manga Targeting Reticle) */}
         <div className={`absolute w-[2px] h-[6px] bg-white transition-all duration-200 ${isHoveringState ? 'top-[-10px]' : 'top-[-4px]'}`} />
         <div className={`absolute w-[2px] h-[6px] bg-white transition-all duration-200 ${isHoveringState ? 'bottom-[-10px]' : 'bottom-[-4px]'}`} />
         <div className={`absolute w-[6px] h-[2px] bg-white transition-all duration-200 ${isHoveringState ? 'left-[-10px]' : 'left-[-4px]'}`} />
         <div className={`absolute w-[6px] h-[2px] bg-white transition-all duration-200 ${isHoveringState ? 'right-[-10px]' : 'right-[-4px]'}`} />
      </div>

      {/* LAYER 2: Solid Core (Solves the 50% Gray failure of Difference blending) */}
      {/* White center, crisp black stroke. Physically impossible to hide. */}
      <div
        ref={solidCoreRef}
        className="fixed top-0 left-0 z-[10004] pointer-events-none rounded-full bg-white transition-all duration-200 ease-out flex items-center justify-center"
        style={{ 
          width: '6px',
          height: '6px',
          marginLeft: '-3px',
          marginTop: '-3px',
          border: '1.5px solid #000000',
          willChange: 'transform',
          transform: isHoveringState ? 'scale(0.5)' : 'scale(1)'
        }}
      />
    </>
  )
}

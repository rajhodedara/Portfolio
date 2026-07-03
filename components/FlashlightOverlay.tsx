'use client'

import { useEffect, useState, useRef } from 'react'

export default function FlashlightOverlay() {
  const [isDark, setIsDark] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // Initial check
    setIsDark(document.documentElement.classList.contains('dark'))

    // Watch for class changes on HTML element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(document.documentElement.classList.contains('dark'))
        }
      })
    })

    observer.observe(document.documentElement, { attributes: true })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isDark) return

    let rafId: number
    const onMouseMove = (e: MouseEvent) => {
      // Use requestAnimationFrame for smooth 60fps tracking without React re-renders
      if (overlayRef.current) {
        cancelAnimationFrame(rafId)
        rafId = requestAnimationFrame(() => {
          if (overlayRef.current) {
             const x = e.clientX
             const y = e.clientY
             // The mask: a transparent circle at the cursor, surrounded by black
             overlayRef.current.style.background = `radial-gradient(circle 450px at ${x}px ${y}px, transparent 0%, rgba(5,1,1,0.95) 100%)`
          }
        })
      }
    }

    // Set initial background if mouse hasn't moved yet
    if (overlayRef.current) {
       overlayRef.current.style.background = `radial-gradient(circle 450px at 50% 50%, transparent 0%, rgba(5,1,1,0.95) 100%)`
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [isDark])

  if (!isDark) return null

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[9990] pointer-events-none transition-opacity duration-700"
      aria-hidden="true"
      style={{
        opacity: isDark ? 1 : 0
      }}
    />
  )
}

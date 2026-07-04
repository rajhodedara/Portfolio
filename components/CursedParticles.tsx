'use client'

import { useEffect, useRef } from 'react'
import { useAwakened } from '@/hooks/useAwakened'

class Particle {
  x: number
  y: number
  size: number
  speedY: number
  speedX: number
  life: number
  maxLife: number
  alpha: number

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth
    this.y = canvasHeight + Math.random() * 20 // Start below screen
    this.size = Math.random() * 2 + 1 // 1px to 3px
    this.speedY = Math.random() * 1.5 + 0.5 // Move up at 0.5 to 2px per frame
    this.speedX = (Math.random() - 0.5) * 1 // Drift left/right
    this.maxLife = Math.random() * 200 + 100 // Frames to live
    this.life = this.maxLife
    this.alpha = Math.random() * 0.5 + 0.3 // 0.3 to 0.8 opacity
  }

  update() {
    this.y -= this.speedY
    this.x += this.speedX + Math.sin(this.life * 0.05) * 0.5 // Sine wave drift
    this.life--
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Fade out as it dies
    const currentAlpha = this.alpha * (this.life / this.maxLife)
    
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 64, 64, ${currentAlpha})` // Glowing red
    ctx.shadowBlur = 10
    ctx.shadowColor = '#FF0000'
    ctx.fill()
  }
}

export default function CursedParticles() {
  const isAwakened = useAwakened()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!isAwakened) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    // Initial resize
    resize()
    window.addEventListener('resize', resize)

    // Initial particles
    for (let i = 0; i < 40; i++) {
      particles.push(new Particle(canvas.width, canvas.height))
      // Distribute them vertically for the initial frame
      particles[i].y = Math.random() * canvas.height
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Add new particles occasionally to maintain the count
      if (particles.length < 60 && Math.random() < 0.2) {
        particles.push(new Particle(canvas.width, canvas.height))
      }

      particles.forEach((p, index) => {
        p.update()
        p.draw(ctx)

        // Remove dead particles or particles that float off the top
        if (p.life <= 0 || p.y < -10) {
          particles.splice(index, 1)
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isAwakened])

  if (!isAwakened) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none mix-blend-screen"
      style={{ opacity: 0.8 }}
      aria-hidden="true"
    />
  )
}

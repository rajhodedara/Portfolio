'use client'

import { useRef } from 'react'
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion'

interface SpeedLinesProps {
  className?: string
  color?: string
  count?: number
  animated?: boolean
  dynamic?: boolean
}

export default function SpeedLines({
  className = '',
  color = 'var(--ink)',
  count = 24,
  animated = true,
  dynamic = false,
}: SpeedLinesProps) {
  const center = 250

  const lines = Array.from({ length: count }, (_, i) => {
    const angle = (i * 360) / count
    const rad = (angle * Math.PI) / 180
    const x2 = Math.round((center + Math.cos(rad) * 230) * 100) / 100
    const y2 = Math.round((center + Math.sin(rad) * 230) * 100) / 100
    const x1inner = Math.round((center + Math.cos(rad) * 40) * 100) / 100
    const y1inner = Math.round((center + Math.sin(rad) * 40) * 100) / 100
    return { x1: x1inner, y1: y1inner, x2, y2, angle }
  })

  // Scroll velocity logic
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  })

  // Transform velocity to opacity and scale
  // When scrolling fast (>500px/s), opacity peaks at 0.5 for subtle effect
  // Also scale it up slightly for a zooming effect
  const velocityOpacity = useTransform(smoothVelocity, [-1500, 0, 1500], [0.4, 0, 0.4])
  const velocityScale = useTransform(smoothVelocity, [-1500, 0, 1500], [1.2, 1, 1.2])

  // Use dynamic values if dynamic=true, otherwise use static animated/unanimated behavior
  const style = dynamic ? { opacity: velocityOpacity, scale: velocityScale } : {}

  return (
    <motion.svg
      viewBox="0 0 500 500"
      className={`speed-lines-element ${className}`}
      initial={animated && !dynamic ? { opacity: 0, scale: 0.8 } : undefined}
      animate={animated && !dynamic ? { opacity: 1, scale: 1 } : undefined}
      style={style}
      transition={(!dynamic && animated) ? { duration: 0.4, ease: 'easeOut' } : undefined}
      aria-hidden="true"
    >
      {lines.map((line, i) => (
        <motion.line
          key={i}
          x1={line.x1} y1={line.y1}
          x2={line.x2} y2={line.y2}
          stroke={color}
          strokeWidth={i % 4 === 0 ? 2 : 1}
          opacity={i % 4 === 0 ? 0.6 : 0.3}
          strokeLinecap="round"
          initial={animated && !dynamic ? { pathLength: 0 } : undefined}
          animate={animated && !dynamic ? { pathLength: 1 } : undefined}
          transition={(!dynamic && animated) ? {
            duration: 0.3,
            delay: i * 0.008,
            ease: 'easeOut',
          } : undefined}
        />
      ))}
    </motion.svg>
  )
}

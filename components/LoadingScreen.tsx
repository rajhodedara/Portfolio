'use client'

import { useEffect, useRef, useState } from 'react'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [phase, setPhase] = useState<'drawing' | 'fading'>('drawing')

  useEffect(() => {
    if (sessionStorage.getItem('manga-loaded')) {
      setVisible(false)
      return
    }

    // After 2s of drawing animation, fade out
    const drawTimer = setTimeout(() => setPhase('fading'), 2000)
    const hideTimer = setTimeout(() => {
      sessionStorage.setItem('manga-loaded', '1')
      setVisible(false)
    }, 2700)
    return () => {
      clearTimeout(drawTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className="loading-screen flex-col gap-6"
      style={{
        opacity: phase === 'fading' ? 0 : 1,
        transition: phase === 'fading' ? 'opacity 0.6s ease-out' : 'none',
      }}
      aria-label="Loading..."
      role="status"
    >
      {/* Animated manga panel SVG */}
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer border draw animation */}
        <rect
          x="4" y="4" width="192" height="192"
          stroke="#F5F1E8" strokeWidth="3"
          strokeDasharray="768" strokeDashoffset="768"
          style={{
            animation: 'ink-stroke 1.5s ease-out 0.1s forwards',
          }}
        />
        {/* Inner cross panel lines */}
        <line
          x1="100" y1="4" x2="100" y2="196"
          stroke="#F5F1E8" strokeWidth="2"
          strokeDasharray="192" strokeDashoffset="192"
          style={{ animation: 'ink-stroke 0.8s ease-out 0.5s forwards' }}
        />
        <line
          x1="4" y1="100" x2="196" y2="100"
          stroke="#F5F1E8" strokeWidth="2"
          strokeDasharray="192" strokeDashoffset="192"
          style={{ animation: 'ink-stroke 0.8s ease-out 0.7s forwards' }}
        />
        {/* Speed lines from center */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          const x2 = (100 + Math.cos(rad) * 80).toFixed(2)
          const y2 = (100 + Math.sin(rad) * 80).toFixed(2)
          return (
            <line
              key={angle}
              x1="100" y1="100"
              x2={x2} y2={y2}
              stroke="#D62828" strokeWidth="1.5" opacity="0.7"
              strokeDasharray="80" strokeDashoffset="80"
              style={{ animation: `ink-stroke 0.4s ease-out ${0.9 + i * 0.05}s forwards` }}
            />
          )
        })}
        {/* Central character silhouette (simple) */}
        <circle
          cx="100" cy="85" r="15"
          stroke="#F5F1E8" strokeWidth="2" fill="none"
          strokeDasharray="95" strokeDashoffset="95"
          style={{ animation: 'ink-stroke 0.5s ease-out 1.3s forwards' }}
        />
        <path
          d="M82 120 Q100 105 118 120 L122 150 H78 Z"
          stroke="#F5F1E8" strokeWidth="2" fill="none"
          strokeDasharray="130" strokeDashoffset="130"
          style={{ animation: 'ink-stroke 0.6s ease-out 1.5s forwards' }}
        />
      </svg>

      {/* Loading text */}
      <div className="text-center">
        <p
          className="font-ibm-mono text-sm tracking-widest"
          style={{
            color: '#F5F1E8',
            opacity: 0,
            animation: 'panel-slide-up 0.4s ease-out 0.8s forwards',
          }}
        >
          読み込み中...
        </p>
        <p
          className="font-bangers text-xs tracking-[0.4em] mt-2"
          style={{
            color: '#D62828',
            opacity: 0,
            animation: 'panel-slide-up 0.4s ease-out 1s forwards',
          }}
        >
          LOADING
        </p>
      </div>
    </div>
  )
}

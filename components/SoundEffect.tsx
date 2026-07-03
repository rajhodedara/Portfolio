import { ReactNode } from 'react'

interface SoundEffectProps {
  text: string
  className?: string
  color?: 'yellow' | 'red' | 'white' | 'black'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  rotate?: number
}

const sizeMap = {
  sm: 'text-2xl',
  md: 'text-4xl',
  lg: 'text-6xl',
  xl: 'text-8xl',
}

const colorMap = {
  yellow: 'text-manga-yellow',
  red: 'text-manga-red',
  white: 'text-manga-paper',
  black: 'text-manga-ink',
}

export default function SoundEffect({
  text,
  className = '',
  color = 'yellow',
  size = 'lg',
  rotate = -8,
}: SoundEffectProps) {
  return (
    <span
      className={`sound-effect inline-block font-bangers leading-none ${sizeMap[size]} ${colorMap[color]} ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        transformOrigin: 'center',
      }}
      aria-label={text}
    >
      {text}
    </span>
  )
}

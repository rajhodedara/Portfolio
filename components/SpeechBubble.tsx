import { ReactNode } from 'react'

type Tail = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' | 'none'

interface SpeechBubbleProps {
  children: ReactNode
  tail?: Tail
  className?: string
  jagged?: boolean
  dark?: boolean
}

export default function SpeechBubble({
  children,
  tail = 'bottom-left',
  className = '',
  jagged = false,
  dark = false,
}: SpeechBubbleProps) {
  const base = dark
    ? 'bg-manga-ink border-manga-paper text-manga-paper'
    : 'bg-manga-paper border-manga-ink text-manga-ink'

  if (jagged) {
    return (
      <div className={`speech-bubble-jagged font-ibm-mono ${base} ${className}`}>
        {children}
      </div>
    )
  }

  return (
    <div
      className={`speech-bubble font-ibm-mono ${base} ${className} ${
        tail === 'none' ? 'before:hidden after:hidden' : ''
      } ${
        tail === 'bottom-right' ? 'speech-bubble-tail-right' : ''
      }`}
    >
      {children}
    </div>
  )
}

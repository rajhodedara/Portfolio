import { ReactNode } from 'react'

interface MangaPanelProps {
  children: ReactNode
  className?: string
  dark?: boolean
  offsetColor?: string
  noPadding?: boolean
  style?: React.CSSProperties
}

export default function MangaPanel({
  children,
  className = '',
  dark = false,
  offsetColor = '#0A0A0A',
  noPadding = false,
  style,
}: MangaPanelProps) {
  return (
    <div
      className={`relative border-[3px] ${dark ? 'border-manga-paper bg-manga-ink' : 'border-manga-ink bg-manga-paper'} overflow-hidden ${noPadding ? '' : 'p-4'} ${className}`}
      style={{
        boxShadow: `4px 4px 0 ${offsetColor}`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

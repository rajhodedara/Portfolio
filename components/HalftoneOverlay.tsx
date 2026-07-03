interface HalftoneOverlayProps {
  opacity?: number
  size?: number
  className?: string
  color?: string
}

export default function HalftoneOverlay({
  opacity = 0.15,
  size = 10,
  className = '',
  color = 'var(--ink-rgb)',
}: HalftoneOverlayProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none z-[1] halftone-overlay-element ${className}`}
      style={{
        backgroundImage: `radial-gradient(circle, rgba(${color},${opacity}) 1.5px, transparent 1.5px)`,
        backgroundSize: `${size}px ${size}px`,
      }}
      aria-hidden="true"
    />
  )
}

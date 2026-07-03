'use client'

let audioCtx: AudioContext | null = null

// Initialize lazily on first user interaction
function getAudioContext() {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

// A fast, sharp "paper flip" / "click" sound
export function playClickSound() {
  const ctx = getAudioContext()
  if (!ctx) return

  const osc = ctx.createOscillator()
  const gainNode = ctx.createGain()

  osc.connect(gainNode)
  gainNode.connect(ctx.destination)

  osc.type = 'sine'
  // Rapid frequency drop (like a kick/impact)
  osc.frequency.setValueAtTime(150, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.1)

  // Short envelope
  gainNode.gain.setValueAtTime(0, ctx.currentTime)
  gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.01)
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)

  osc.start()
  osc.stop(ctx.currentTime + 0.15)
}

// A dynamic "swish" / "whoosh" sound for hovering
export function playHoverSound() {
  const ctx = getAudioContext()
  if (!ctx) return

  // Create white noise buffer
  const bufferSize = ctx.sampleRate * 0.2 // 0.2 seconds
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1
  }

  const noise = ctx.createBufferSource()
  noise.buffer = buffer

  const filter = ctx.createBiquadFilter()
  filter.type = 'bandpass'
  // Sweep frequency down
  filter.frequency.setValueAtTime(1000, ctx.currentTime)
  filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.2)
  filter.Q.value = 1

  const gainNode = ctx.createGain()
  // Swish envelope
  gainNode.gain.setValueAtTime(0, ctx.currentTime)
  gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05)
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2)

  noise.connect(filter)
  filter.connect(gainNode)
  gainNode.connect(ctx.destination)

  noise.start()
  noise.stop(ctx.currentTime + 0.2)
}

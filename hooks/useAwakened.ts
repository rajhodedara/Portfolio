'use client'

import { useState, useEffect } from 'react'

export function useAwakened() {
  const [isAwakened, setIsAwakened] = useState(false)

  useEffect(() => {
    const check = () => setIsAwakened(document.documentElement.classList.contains('awakened'))
    check()
    window.addEventListener('awakening-toggled', check)
    return () => window.removeEventListener('awakening-toggled', check)
  }, [])

  return isAwakened
}

export function disableAwakenedMode() {
  document.documentElement.classList.remove('awakened')
  localStorage.removeItem('manga-awakened-mode')
  window.dispatchEvent(new Event('awakening-toggled'))
}

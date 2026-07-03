'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, Download, Lock } from 'lucide-react'
import { useAwakened, disableAwakenedMode } from '@/hooks/useAwakened'

const chapters = [
  { href: '#hero', label: 'Chapter 0', sublabel: 'COVER', jp: '表紙' },
  { href: '#about', label: 'Chapter 1', sublabel: 'ORIGIN', jp: '起源' },
  { href: '#projects', label: 'Chapter 2', sublabel: 'BATTLES', jp: '戦闘' },
  { href: '#experience', label: 'Chapter 3', sublabel: 'TRAINING', jp: '修行' },
  { href: '#contact', label: 'Final Panel', sublabel: 'CONTACT', jp: '連絡' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('#hero')
  const isAwakened = useAwakened()

  useEffect(() => {
    const stored = localStorage.getItem('manga-dark-mode')
    if (stored === 'true') {
      document.documentElement.classList.add('dark')
      setDark(true)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDark = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('manga-dark-mode', String(next))
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`)
          }
        })
      },
      { rootMargin: '-20% 0px -80% 0px' }
    )

    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [])

  const isActive = (href: string) => {
    // If on a sub-page like /projects/stock-pulse, highlight BATTLES
    if (pathname.startsWith('/projects/') && href === '#projects') return true
    // Otherwise rely on intersection observer for single-page scroll
    if (pathname === '/') return activeSection === href
    // Fallback if somehow on another page but returning home
    return false
  }

  const getLinkHref = (hash: string) => {
    // If we're not on home page, link back to home + hash
    if (pathname !== '/') return `/${hash}`
    return hash
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? 'var(--bg)'
            : 'transparent',
          borderBottom: scrolled ? '3px solid var(--ink)' : 'none',
          boxShadow: scrolled ? '0 4px 0 var(--ink)' : 'none',
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="Home">
            <span
              className="font-bangers text-2xl sm:text-3xl leading-none"
              style={{ color: 'var(--ink)' }}
            >
              RAJ
            </span>
            <span
              className="font-bangers text-2xl sm:text-3xl leading-none"
              style={{ color: 'var(--red)' }}
            >
              ●
            </span>
            <span
              className="font-noto-jp text-xs hidden sm:block opacity-60"
              style={{ color: 'var(--ink)' }}
            >
              ラージ
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {chapters.map((ch) => (
              <Link
                key={ch.href}
                href={getLinkHref(ch.href)}
                className="relative px-3 py-2 group"
                aria-current={isActive(ch.href) ? 'page' : undefined}
                scroll={true}
              >
                <span
                  className="font-bangers text-lg tracking-wider block leading-none"
                  style={{ color: isActive(ch.href) ? 'var(--red)' : 'var(--ink)' }}
                >
                  {ch.sublabel}
                </span>
                <span
                  className="font-noto-jp text-[10px] block text-center opacity-50"
                  style={{ color: 'var(--ink)' }}
                >
                  {ch.jp}
                </span>
                {isActive(ch.href) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-manga-red"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {isAwakened ? (
              <button
                onClick={disableAwakenedMode}
                className="manga-btn w-9 h-9 flex items-center justify-center text-xs relative overflow-hidden group"
                style={{
                  background: 'var(--bg)',
                  color: 'var(--red)',
                  border: '2px solid var(--red)',
                  boxShadow: '0 0 10px rgba(255,0,0,0.5)',
                }}
                aria-label="Seal Power"
                title="Seal Power"
              >
                <span className="absolute inset-0 bg-manga-red opacity-0 group-hover:opacity-20 transition-opacity" />
                <Lock size={14} className="relative z-10" />
              </button>
            ) : (
              <button
                onClick={toggleDark}
                className="theme-toggle-btn manga-btn w-9 h-9 flex items-center justify-center text-xs"
                style={{
                  background: 'var(--bg)',
                  color: 'var(--ink)',
                }}
                aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {dark ? <Sun size={14} /> : <Moon size={14} />}
              </button>
            )}

            {/* Resume download */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="manga-btn flex items-center gap-1.5 px-2 py-1.5 sm:px-3 text-[10px] sm:text-sm"
              style={{
                background: 'var(--red)',
                color: 'var(--paper)',
                border: '3px solid var(--ink)',
              }}
              aria-label="Download Resume"
            >
              <Download size={12} />
              <span className="font-bangers tracking-wider text-sm">RESUME</span>
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden manga-btn w-9 h-9 flex items-center justify-center"
              style={{ background: 'var(--bg)', color: 'var(--ink)' }}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-manga-ink/80"
              onClick={() => setMenuOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="absolute top-14 right-0 bottom-0 w-72"
              style={{
                background: 'var(--bg)',
                borderLeft: '3px solid var(--ink)',
              }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            >
              <div className="p-6 space-y-1">
                {/* Chapter label */}
                <p className="chapter-label mb-4">VOLUME INDEX 目次</p>

                {chapters.map((ch, i) => (
                  <motion.div
                    key={ch.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={getLinkHref(ch.href)}
                      className="flex items-center justify-between py-3 border-b-2 group"
                      style={{ borderColor: 'var(--ink)', opacity: 0.9 }}
                      onClick={() => setMenuOpen(false)}
                      scroll={true}
                    >
                      <div>
                        <p
                          className="font-ibm-mono text-[10px] opacity-50"
                          style={{ color: 'var(--ink)' }}
                        >
                          {ch.label}
                        </p>
                        <p
                          className="font-bangers text-xl leading-tight"
                          style={{ color: isActive(ch.href) ? 'var(--red)' : 'var(--ink)' }}
                        >
                          {ch.sublabel}
                        </p>
                      </div>
                      <span className="font-noto-jp text-sm opacity-40" style={{ color: 'var(--ink)' }}>
                        {ch.jp}
                      </span>
                    </Link>
                  </motion.div>
                ))}

                <a
                  href="/resume.pdf"
                  download
                  className="mt-4 flex items-center justify-center gap-2 py-3 font-bangers tracking-wider text-lg"
                  style={{
                    background: 'var(--red)',
                    color: 'var(--paper)',
                    border: '3px solid var(--ink)',
                    boxShadow: '4px 4px 0 var(--shadow-color)',
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  <Download size={16} />
                  DOWNLOAD RESUME
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Code2, Send, BookOpen } from 'lucide-react'
import { personal } from '@/data/personal'

// Inline SVGs for brand icons not in lucide-react
function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.2 22 16.447 22 12.021 22 6.484 17.522 2 12 2z"/>
    </svg>
  )
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function LeetCodeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
    </svg>
  )
}

interface FormData {
  name: string
  email: string
  message: string
}

type SocialIcon = React.FC<{ size?: number; className?: string }>

const socialLinks: { label: string; jp: string; href: string; icon: SocialIcon; color: string }[] = [
  { label: 'GitHub', jp: 'ギットハブ', href: personal.socials.github, icon: GitHubIcon, color: '#0A0A0A' },
  { label: 'LinkedIn', jp: 'リンクドイン', href: personal.socials.linkedin, icon: LinkedInIcon, color: '#0077B5' },
  { label: 'LeetCode', jp: 'リートコード', href: personal.socials.leetcode, icon: LeetCodeIcon, color: '#FFA500' },
  { label: 'Blog', jp: 'ブログ', href: personal.socials.blog, icon: BookOpen, color: '#F57C00' },
  { label: 'Email', jp: 'メール', href: personal.socials.email, icon: Mail, color: '#D62828' },
]

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [hovering, setHovering] = useState(false)
  
  // Boss Battle state
  const [bossHp, setBossHp] = useState(9999)
  const [isAttacking, setIsAttacking] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsAttacking(true)

    // Boss HP drain animation
    let currentHp = 9999
    const hpInterval = setInterval(() => {
      currentHp -= 1200
      if (currentHp <= 0) {
        currentHp = 0
        clearInterval(hpInterval)
      }
      setBossHp(Math.max(0, currentHp))
    }, 50)

    // Wait for slash animation then show submitted screen
    setTimeout(() => {
      // Open mailto with form data
      const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`)
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
      )
      window.open(`mailto:${personal.email}?subject=${subject}&body=${body}`)
      setSubmitted(true)
    }, 900)
  }

  if (submitted) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center text-center py-20 relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="absolute font-bangers text-[120px] sm:text-[180px] pointer-events-none whitespace-nowrap z-0"
          style={{
            color: 'var(--red)',
            opacity: 0.1,
            rotate: '-5deg',
          }}
          initial={{ scale: 2 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
        >
          9999 DMG!
        </motion.div>

        <div
          className="font-bangers text-7xl sm:text-9xl mb-4 relative z-10"
          style={{
            color: '#FFD60A',
            textShadow: '4px 4px 0 #0A0A0A, -2px -2px 0 #0A0A0A',
          }}
        >
          VICTORY!
        </div>
        <p className="font-noto-jp text-2xl mb-4 relative z-10" style={{ color: 'var(--ink)' }}>
          ボス撃破！
        </p>
        <div
          className="font-ibm-mono text-sm px-6 py-4 max-w-sm relative z-10"
          style={{
            background: 'var(--bg)',
            border: '3px solid var(--ink)',
            boxShadow: '4px 4px 0 var(--ink)',
          }}
        >
          Boss defeated! Your message has been sent. I&apos;ll get back to you faster than a shonen power-up.
        </div>
        <p className="mt-8 font-bangers text-2xl relative z-10" style={{ color: '#D62828' }}>
          TO BE CONTINUED... →
        </p>
        <p className="font-noto-jp text-sm opacity-50 mt-1 relative z-10" style={{ color: 'var(--ink)' }}>
          続く
        </p>
      </motion.div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left: Social character cards */}
        <div>
          <p className="chapter-label mb-6">CONTACT POINTS 連絡手段</p>
          <div className="grid grid-cols-2 gap-3">
            {socialLinks.map((social, i) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="group block p-4 relative overflow-hidden"
                  style={{
                    background: 'var(--bg)',
                    border: '3px solid var(--ink)',
                    boxShadow: `4px 4px 0 ${social.color}`,
                    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: -3, y: -3 }}
                  aria-label={social.label}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span style={{ color: social.color }}><Icon size={16} /></span>
                    <span className="font-bangers text-base tracking-wider" style={{ color: 'var(--ink)' }}>
                      {social.label}
                    </span>
                  </div>
                  <p className="font-noto-jp text-xs opacity-50" style={{ color: 'var(--ink)' }}>
                    {social.jp}
                  </p>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"
                    style={{ background: social.color }}
                  />
                </motion.a>
              )
            })}
          </div>

          {/* Email display */}
          <motion.div
            className="mt-6 p-4"
            style={{
              background: '#0A0A0A',
              border: '3px solid #0A0A0A',
              boxShadow: '4px 4px 0 #D62828',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="font-ibm-mono text-[10px] text-manga-yellow tracking-widest mb-1">
              DIRECT TRANSMISSION // 直接連絡
            </p>
            <a
              href={personal.socials.email}
              className="font-ibm-mono text-sm text-manga-paper hover:text-manga-yellow transition-colors break-all"
            >
              {personal.email}
            </a>
          </motion.div>
        </div>

        {/* Right: Contact form as speech bubble */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="chapter-label mb-6">FINAL BOSS ENCOUNTER 最終ボス</p>

          {/* Speech bubble form wrapper */}
          <div
            className="relative p-6 sm:p-8 overflow-hidden"
            style={{
              background: 'var(--bg)',
              border: '3px solid var(--ink)',
              boxShadow: '6px 6px 0 var(--shadow-color)',
            }}
          >
            {/* Attack Animation Overlay */}
            <AnimatePresence>
              {isAttacking && (
                <motion.div 
                  className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div 
                    className="absolute w-[200%] h-6 bg-white rotate-[-35deg]"
                    style={{ boxShadow: '0 0 30px #fff, 0 0 60px var(--yellow)' }}
                    initial={{ scaleX: 0, opacity: 1 }}
                    animate={{ scaleX: 1, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                  <motion.div 
                    className="absolute w-[200%] h-2 bg-manga-red rotate-[-35deg]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
                  />
                  {/* Glitch flash */}
                  <motion.div 
                    className="absolute inset-0 bg-white mix-blend-difference"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0, 1, 0] }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Corner decoration */}
            <div
              className="absolute top-0 right-0 w-8 h-8"
              style={{
                background: '#FFD60A',
                borderLeft: '3px solid var(--ink)',
                borderBottom: '3px solid var(--ink)',
              }}
            />

            {/* Boss HP Bar */}
            <div className="mb-6 relative z-10">
              <div className="flex justify-between font-bangers text-lg text-manga-red mb-1">
                <span>THE RECRUITER</span>
                <span>HP: {bossHp} / 9999</span>
              </div>
              <div className="w-full h-4 bg-manga-paper border-2 border-manga-ink p-0.5">
                <div 
                  className="h-full bg-manga-red transition-all duration-[50ms]"
                  style={{ width: `${(bossHp / 9999) * 100}%` }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div>
                <label
                  htmlFor="contact-name"
                  className="font-bangers text-sm tracking-wider block mb-2"
                  style={{ color: 'var(--ink)' }}
                >
                  YOUR NAME 名前
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="manga-input"
                  placeholder="Enter your name..."
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="font-bangers text-sm tracking-wider block mb-2"
                  style={{ color: 'var(--ink)' }}
                >
                  EMAIL メール
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="manga-input"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="font-bangers text-sm tracking-wider block mb-2"
                  style={{ color: 'var(--ink)' }}
                >
                  MESSAGE メッセージ
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="manga-input resize-none"
                  placeholder="Your message..."
                />
              </div>

              <motion.button
                type="submit"
                className="w-full font-bangers text-xl tracking-widest py-4 relative overflow-hidden group"
                style={{
                  background: '#D62828',
                  color: '#F5F1E8',
                  border: '3px solid #0A0A0A',
                  boxShadow: '5px 5px 0 #0A0A0A',
                }}
                whileHover={{ x: -2, y: -2 }}
                whileTap={{ x: 2, y: 2 }}
                onHoverStart={() => setHovering(true)}
                onHoverEnd={() => setHovering(false)}
                disabled={isAttacking}
              >
                <AnimatePresence mode="wait">
                  {hovering ? (
                    <motion.span
                      key="send"
                      className="flex items-center justify-center gap-2"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                    >
                      <Send size={18} />
                      UNLEASH ATTACK! 攻撃！
                    </motion.span>
                  ) : (
                    <motion.span
                      key="submit"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                    >
                      CHARGE FINAL MOVE →
                    </motion.span>
                  )}
                </AnimatePresence>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

import type { Metadata } from 'next'
import { Bangers, Zen_Dots, Noto_Sans_JP, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import LoadingScreen from '@/components/LoadingScreen'
import InkCursor from '@/components/InkCursor'
import PageTransition from '@/components/PageTransition'
import ChapterProgressBar from '@/components/ChapterProgressBar'
import AwakeningEasterEgg from '@/components/AwakeningEasterEgg'
import SpeedLines from '@/components/SpeedLines'
import { Analytics } from '@vercel/analytics/next'

const bangers = Bangers({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bangers',
  display: 'swap',
})

const zenDots = Zen_Dots({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-zen-dots',
  display: 'swap',
})

const notoSansJP = Noto_Sans_JP({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-noto-jp',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-ibm-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Raj Odedara — AI & Full-Stack Developer',
    template: '%s | Raj Odedara',
  },
  description:
    'Third-year B.Tech student in AI & Data Science at KJ Somaiya Institute of Technology. Shipped a live SaaS platform, FinBERT trading engine, and production Windows app. Seeking SE/AI-ML internships.',
  keywords: [
    'Raj Odedara', 'AI developer', 'Full Stack', 'Machine Learning', 'Next.js',
    'Python', 'FastAPI', 'React', 'internship', 'KJ Somaiya',
  ],
  authors: [{ name: 'Raj Odedara', url: 'https://github.com/rajhodedara' }],
  creator: 'Raj Odedara',
  metadataBase: new URL('https://rajodedara.dev'),
  openGraph: {
    title: 'Raj Odedara — AI & Full-Stack Developer',
    description:
      'Manga-style portfolio for Raj Odedara: AI & Data Science student, solo SaaS builder, trading engine architect.',
    url: 'https://rajodedara.dev',
    siteName: 'Raj Odedara Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raj Odedara — AI & Full-Stack Developer',
    description:
      'Manga-style developer portfolio. 4 solo projects. Seeking SE/AI-ML internships.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${bangers.variable} ${zenDots.variable} ${notoSansJP.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <body className="manga-paper-texture min-h-screen antialiased">
        <LoadingScreen />
        <InkCursor />
        <ChapterProgressBar />
        <AwakeningEasterEgg />
        <SpeedLines className="fixed inset-0 z-[-1] pointer-events-none" dynamic={true} />
        <Navbar />
        <main className="pt-14 sm:pt-16">
          <PageTransition>{children}</PageTransition>
        </main>
        <Analytics />
      </body>
    </html>
  )
}

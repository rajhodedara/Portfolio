import Link from 'next/link'
import HalftoneOverlay from '@/components/HalftoneOverlay'
import SpeedLines from '@/components/SpeedLines'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center manga-paper-texture p-4 sm:p-8 relative overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Speed lines for intensity */}
      <SpeedLines className="fixed inset-0 z-0 opacity-40 pointer-events-none" animated={true} />
      
      <div 
        className="relative z-10 w-full max-w-2xl bg-white p-6 sm:p-12 text-center overflow-hidden"
        style={{
          background: 'var(--bg)',
          border: '4px solid var(--ink)',
          boxShadow: '12px 12px 0 var(--red)'
        }}
      >
        <HalftoneOverlay opacity={0.15} size={10} color="0,0,0" />
        
        <div className="relative z-10">
          {/* Chapter 404 label */}
          <div 
            className="inline-block px-4 py-1 font-bangers tracking-widest text-lg sm:text-xl mb-6"
            style={{ 
              background: 'var(--ink)', 
              color: 'var(--paper)',
              transform: 'rotate(-2deg)'
            }}
          >
            CHAPTER 404
          </div>
          
          <h1 
            className="font-bangers text-6xl sm:text-8xl leading-none mb-6"
            style={{ 
              color: 'var(--paper)',
              textShadow: '6px 6px 0 var(--ink), -2px -2px 0 var(--ink)',
              WebkitTextStroke: '2px var(--ink)'
            }}
          >
            MISSING PAGE
          </h1>
          
          {/* Torn edge effect (simulated with CSS border) */}
          <div 
            className="mx-auto border-t-2 border-b-2 border-dashed border-gray-400 py-6 mb-8 max-w-md"
            style={{ borderColor: 'var(--ink)' }}
          >
            <p className="font-ibm-mono text-sm sm:text-base leading-relaxed opacity-80" style={{ color: 'var(--ink)' }}>
              "The arc you are looking for has been erased from the manuscript. Only static remains."
            </p>
          </div>
          
          <Link 
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 font-bangers text-2xl tracking-widest transition-all hover:translate-x-[-4px] hover:translate-y-[-4px]"
            style={{
              background: 'var(--red)',
              color: '#F5F1E8',
              border: '3px solid var(--ink)',
              boxShadow: '6px 6px 0 var(--ink)'
            }}
          >
            <span className="text-xl">←</span>
            RETURN TO PREVIOUS CHAPTER
          </Link>
          
          <p className="font-noto-jp text-xs opacity-50 mt-4" style={{ color: 'var(--ink)' }}>
            前の章に戻る
          </p>
        </div>
      </div>
    </div>
  )
}

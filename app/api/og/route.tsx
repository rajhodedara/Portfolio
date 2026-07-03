import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const title = searchParams.get('title') || 'Raj Odedara'
    const subtitle = searchParams.get('subtitle') || 'AI & Full-Stack Developer'
    const color = searchParams.get('color') || '#D62828' // default red

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundColor: '#F5F1E8', // manga paper
            border: `32px solid #0A0A0A`,
            padding: '40px',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Halftone dots simulation using radial gradients */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.1,
              backgroundImage: 'radial-gradient(#0A0A0A 2px, transparent 2px)',
              backgroundSize: '16px 16px',
            }}
          />

          <div
            style={{
              display: 'flex',
              position: 'absolute',
              top: '60px',
              left: '60px',
              padding: '12px 24px',
              backgroundColor: color,
              border: '8px solid #0A0A0A',
              color: '#0A0A0A',
              fontSize: '28px',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              boxShadow: '8px 8px 0px #0A0A0A',
            }}
          >
            PROJECT ARC
          </div>
          
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              zIndex: 10,
              width: '80%',
            }}
          >
            <p
              style={{
                fontSize: '36px',
                color: color,
                marginBottom: '20px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
              }}
            >
              {subtitle}
            </p>
            <h1
              style={{
                fontSize: '96px',
                color: '#F5F1E8',
                fontWeight: 900,
                marginTop: '0',
                marginBottom: '40px',
                lineHeight: 1.1,
                textShadow: `10px 10px 0px ${color}, -2px -2px 0px #0A0A0A, 2px -2px 0px #0A0A0A, -2px 2px 0px #0A0A0A, 2px 2px 0px #0A0A0A`,
              }}
            >
              {title}
            </h1>
          </div>
          
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              bottom: '60px',
              right: '60px',
              fontSize: '24px',
              color: '#0A0A0A',
              fontWeight: 800,
              letterSpacing: '0.2em',
              borderBottom: '4px solid #D62828',
              paddingBottom: '4px',
            }}
          >
            RAJODEDARA.DEV
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.error(e)
    return new Response('Failed to generate OG image', { status: 500 })
  }
}

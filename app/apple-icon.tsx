import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Raj Odedara'
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

export default async function Icon() {
  const color = '#D62828' // manga-red

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F5F1E8', // manga paper
          border: `8px solid #0A0A0A`,
          fontFamily: 'sans-serif',
        }}
      >
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
        <h1
          style={{
            fontSize: '110px',
            color: '#F5F1E8',
            fontWeight: 900,
            marginTop: '0',
            marginBottom: '0',
            lineHeight: 1,
            textShadow: `6px 6px 0px ${color}, -2px -2px 0px #0A0A0A, 2px -2px 0px #0A0A0A, -2px 2px 0px #0A0A0A, 2px 2px 0px #0A0A0A`,
          }}
        >
          R
        </h1>
      </div>
    ),
    {
      ...size,
    }
  )
}

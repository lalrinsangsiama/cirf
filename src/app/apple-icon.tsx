import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1A1A1A',
          borderRadius: '40px',
        }}
      >
        <span
          style={{
            fontSize: '52px',
            fontFamily: 'Georgia, serif',
            color: '#FAFAFA',
            fontWeight: 200,
            letterSpacing: '-1px',
          }}
        >
          CIL
        </span>
        <div
          style={{
            width: '90px',
            height: '3px',
            backgroundColor: '#C9A227',
            borderRadius: '2px',
            marginTop: '8px',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}

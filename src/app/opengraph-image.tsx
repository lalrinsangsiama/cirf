import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'CIL - Cultural Innovation Lab'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)',
          padding: '80px',
        }}
      >
        {/* Left content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
          }}
        >
          {/* Main title */}
          <span
            style={{
              fontSize: '120px',
              fontFamily: 'Georgia, serif',
              color: '#FAFAFA',
              fontWeight: 200,
              letterSpacing: '-2px',
            }}
          >
            CIL
          </span>

          {/* Gold accent line */}
          <div
            style={{
              width: '200px',
              height: '4px',
              background: 'linear-gradient(90deg, #C9A227 0%, #B8860B 100%)',
              borderRadius: '2px',
              marginTop: '8px',
              marginBottom: '32px',
            }}
          />

          {/* Subtitle */}
          <span
            style={{
              fontSize: '28px',
              color: '#FAFAFA',
              opacity: 0.9,
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            Cultural Innovation
          </span>
          <span
            style={{
              fontSize: '28px',
              color: '#FAFAFA',
              opacity: 0.9,
              fontFamily: 'system-ui, -apple-system, sans-serif',
              marginTop: '8px',
            }}
          >
            Resilience Framework
          </span>

          {/* Tagline */}
          <span
            style={{
              fontSize: '20px',
              color: '#C9A227',
              opacity: 0.9,
              fontFamily: 'system-ui, -apple-system, sans-serif',
              marginTop: '48px',
            }}
          >
            Transforming indigenous wisdom into economic resilience
          </span>

          {/* Website */}
          <span
            style={{
              fontSize: '18px',
              color: '#FAFAFA',
              opacity: 0.6,
              fontFamily: 'system-ui, -apple-system, sans-serif',
              marginTop: '48px',
            }}
          >
            cirf-framework.org
          </span>
        </div>

        {/* Right decorative element */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '400px',
          }}
        >
          {/* Concentric circles */}
          <div
            style={{
              position: 'relative',
              width: '360px',
              height: '360px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: '360px',
                height: '360px',
                borderRadius: '50%',
                border: '1px solid rgba(201, 162, 39, 0.3)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                width: '280px',
                height: '280px',
                borderRadius: '50%',
                border: '1px solid rgba(201, 162, 39, 0.4)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                border: '1px solid rgba(201, 162, 39, 0.5)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                border: '2px solid rgba(201, 162, 39, 0.7)',
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

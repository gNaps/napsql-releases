import { ImageResponse } from 'next/og'
import { site } from '@/site.config'

/**
 * Social-sharing card (1200×630), rendered once at build time — no runtime
 * cost, no external image to host. Used for both Open Graph and Twitter.
 */
export const dynamic = 'force-static'
export const alt = 'napsql, the SQL Server client for Mac & Windows'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'linear-gradient(160deg, #0D1117 0%, #0E131A 60%, #0B1F1A 100%)',
          color: '#E8EDF4',
          fontFamily: 'monospace'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: '#34D1A6',
              color: '#06231b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 40,
              fontWeight: 800
            }}
          >
            N
          </div>
          <div style={{ fontSize: 40, fontWeight: 600, display: 'flex' }}>
            nap<span style={{ color: '#34D1A6' }}>sql</span>
          </div>
          <div style={{ marginLeft: 'auto', fontSize: 22, color: '#8B97A9' }}>{`v${site.version} · free beta`}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ fontSize: 76, fontWeight: 600, lineHeight: 1.02, letterSpacing: -3, display: 'flex', flexWrap: 'wrap' }}>
            Manage SQL Server from&nbsp;<span style={{ color: '#34D1A6' }}>any desktop.</span>
          </div>
          <div style={{ fontSize: 28, color: '#8B97A9', lineHeight: 1.4, maxWidth: 960 }}>
            The cross-platform alternative to SSMS. Query editor, graphical execution plans, backups, agent jobs and an
            AI copilot, on macOS and Windows.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 14, fontSize: 20, color: '#5A6675' }}>
          <span style={{ padding: '10px 18px', border: '1px solid #2C3848', borderRadius: 12 }}>macOS</span>
          <span style={{ padding: '10px 18px', border: '1px solid #2C3848', borderRadius: 12 }}>Windows</span>
          <span style={{ padding: '10px 18px', border: '1px solid #2C3848', borderRadius: 12 }}>SQL Server 2016–2022 · Azure SQL</span>
        </div>
      </div>
    ),
    { ...size }
  )
}

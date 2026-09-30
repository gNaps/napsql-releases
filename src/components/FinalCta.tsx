import type { JSX } from 'react'
import { site } from '@/site.config'
import { DownloadButtons } from './DownloadButtons'

export function FinalCta(): JSX.Element {
  return (
    <section className="final" id="download" aria-labelledby="download-title">
      <div className="wrap">
        <h2 id="download-title">Leave SSMS where it belongs.</h2>
        <p>Connect to your first server in under a minute. Free while in beta: no account, no card.</p>
        <DownloadButtons />
        <p style={{ marginTop: 18, fontFamily: 'var(--mono)', fontSize: 12.5, color: 'var(--faint)' }}>
          v{site.version} beta · Windows ~{site.windowsSizeMb} MB · macOS ~{site.macSizeMb} MB
        </p>
      </div>
    </section>
  )
}

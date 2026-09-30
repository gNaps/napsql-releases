import type { JSX } from 'react'
import { site } from '@/site.config'
import { AppleIcon, WindowsIcon } from './icons'

/**
 * Primary download CTA pair. The Windows link is a real <a download> pointing at
 * the configured installer; macOS shows "coming soon" until a .dmg URL is set.
 */
export function DownloadButtons({ note }: { note?: boolean }): JSX.Element {
  return (
    <div className="cta-row">
      <a className="btn btn-primary" href={site.windowsDownloadUrl} download rel="noopener">
        <WindowsIcon />
        Download for Windows
      </a>
      {site.macDownloadUrl ? (
        <a className="btn btn-ghost" href={site.macDownloadUrl} download rel="noopener">
          <AppleIcon />
          Download for macOS
        </a>
      ) : (
        <span className="btn btn-soon" aria-label="macOS version coming soon">
          <AppleIcon />
          macOS · coming soon
        </span>
      )}
      {note && (
        <span className="cta-note">
          Free beta · <b>v{site.version}</b> · no account required
        </span>
      )}
    </div>
  )
}

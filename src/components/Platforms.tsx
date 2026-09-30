import type { JSX } from 'react'
import { site } from '@/site.config'
import { AppleIcon, WindowsIcon } from './icons'

export function Platforms(): JSX.Element {
  return (
    <section className="platforms" aria-labelledby="platforms-title">
      <div className="wrap">
        <div className="sec-head" style={{ textAlign: 'center', margin: '0 auto' }}>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>
            One client, every desk
          </span>
          <h2 id="platforms-title">Built natively for the machine you already use.</h2>
        </div>
        <div className="os-row">
          <div className="os-card">
            <WindowsIcon />
            <h3>Windows</h3>
            <div className="meta">64-bit · Windows 10 &amp; 11 · ~{site.windowsSizeMb} MB</div>
            <a className="dl" href={site.windowsDownloadUrl} download rel="noopener">
              Download installer →
            </a>
          </div>
          <div className={`os-card${site.macDownloadUrl ? '' : ' os-soon'}`}>
            <AppleIcon />
            <h3>macOS</h3>
            <div className="meta">Apple Silicon · macOS 12+ · ~{site.macSizeMb} MB</div>
            {site.macDownloadUrl ? (
              <a className="dl" href={site.macDownloadUrl} download rel="noopener">
                Download .dmg →
              </a>
            ) : (
              <span className="dl-soon">Coming soon</span>
            )}
            <a className="os-hint" href="#macos">
              First launch needs one extra click →
            </a>
          </div>
        </div>
        <p style={{ marginTop: 34, color: 'var(--faint)', fontFamily: 'var(--mono)', fontSize: 13 }}>
          Works with SQL Server 2016–2022 &amp; Azure SQL Database
        </p>
      </div>
    </section>
  )
}

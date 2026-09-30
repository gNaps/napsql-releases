import type { JSX } from 'react'
import { site } from '@/site.config'

export function Footer(): JSX.Element {
  return (
    <footer>
      <div className="wrap foot">
        <span>
          <span style={{ color: 'var(--accent)' }}>~napsql</span> © {new Date().getFullYear()} · {site.tagline}
        </span>
        <span>Not affiliated with Microsoft. SQL Server and SSMS are trademarks of Microsoft Corporation.</span>
      </div>
    </footer>
  )
}

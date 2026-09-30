/**
 * Single source of truth for everything that changes between releases or
 * deployments. Values can be overridden at build time with NEXT_PUBLIC_* env
 * vars (the site is a static export, so they are baked in at `next build`).
 */
export const site = {
  name: 'napsql',
  tagline: 'The SQL Server client for Mac & Windows',
  /** Canonical origin — set NEXT_PUBLIC_SITE_URL before building for production. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://napsql.app').replace(/\/$/, ''),
  version: '0.4.1',
  /** Approximate installer size, shown next to the download buttons. */
  windowsSizeMb: 87,
  /** Windows installer. Recommended: a GitHub Releases asset, e.g.
   *  https://github.com/gNaps/napsql-releases/releases/latest/download/Napsql-0.4.1-setup.exe */
  windowsDownloadUrl:
    process.env.NEXT_PUBLIC_WIN_DOWNLOAD_URL ??
    'https://github.com/gNaps/napsql-releases/releases/latest/download/Napsql-0.4.1-setup.exe',
  /** macOS .dmg — leave unset to show "coming soon". */
  macDownloadUrl: process.env.NEXT_PUBLIC_MAC_DOWNLOAD_URL ?? null,
  twitterHandle: process.env.NEXT_PUBLIC_TWITTER ?? null
} as const

export const seo = {
  title: 'napsql: the SQL Server client for Mac & Windows',
  description:
    'napsql is a fast, native SQL Server client, the cross-platform alternative to SQL Server Management Studio. Query editor, graphical execution plans, backups, agent jobs and an AI copilot, on macOS and Windows.',
  keywords: [
    'SQL Server client',
    'SSMS alternative',
    'SQL Server Management Studio for Mac',
    'SQL Server macOS',
    'T-SQL editor',
    'execution plan viewer',
    'Azure SQL client',
    'database GUI'
  ]
} as const

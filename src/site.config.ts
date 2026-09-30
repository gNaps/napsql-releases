/**
 * Single source of truth for everything that changes between releases or
 * deployments. Values can be overridden at build time with NEXT_PUBLIC_* env
 * vars (the site is a static export, so they are baked in at `next build`).
 */

/**
 * Bump this at every release: the download URLs below are derived from it, so
 * the version lives in exactly one place. GitHub's `latest/download/<name>`
 * form is deliberately not used — it resolves the release *tag*, not the
 * asset, so a versioned filename 404s the moment a newer release exists.
 */
const version = '0.4.1'
const releaseAsset = (file: string): string =>
  `https://github.com/gNaps/napsql-releases/releases/download/v${version}/${file}`

export const site = {
  name: 'napsql',
  tagline: 'The SQL Server client for Mac & Windows',
  /** Canonical origin — set NEXT_PUBLIC_SITE_URL before building for production. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://napsql.app').replace(/\/$/, ''),
  version,
  /** Approximate installer size, shown next to the download buttons. */
  windowsSizeMb: 87,
  /** Approximate .dmg size (Apple Silicon build). */
  macSizeMb: 108,
  /** Windows installer (NSIS, x64), pinned to the tag for this version. */
  windowsDownloadUrl:
    process.env.NEXT_PUBLIC_WIN_DOWNLOAD_URL ?? releaseAsset(`Napsql-${version}-setup.exe`),
  /** macOS .dmg (Apple Silicon). Set to null to show "coming soon" instead. */
  macDownloadUrl:
    process.env.NEXT_PUBLIC_MAC_DOWNLOAD_URL ?? releaseAsset(`Napsql-${version}-arm64.dmg`),
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

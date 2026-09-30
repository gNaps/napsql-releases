import type { JSX } from 'react'
import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { seo, site } from '@/site.config'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: seo.title, template: `%s · ${site.name}` },
  description: seo.description,
  keywords: [...seo.keywords],
  applicationName: site.name,
  category: 'technology',
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 }
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: site.name,
    title: 'napsql: manage SQL Server from any desktop',
    description:
      'The cross-platform alternative to SSMS. Query editor, graphical execution plans, backups, agent jobs and an AI copilot, on macOS and Windows.',
    locale: 'en_US'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'napsql: manage SQL Server from any desktop',
    description: 'The cross-platform alternative to SSMS, on macOS and Windows.',
    ...(site.twitterHandle ? { site: site.twitterHandle, creator: site.twitterHandle } : {})
  },
  // The favicon is a vector replica of the application icon, so the browser tab
  // matches the installed app without shipping a 1024px PNG.
  // It is declared explicitly because an `icons` block suppresses the
  // file-convention link Next would otherwise inject.
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/app-icon.png', sizes: '1024x1024', type: 'image/png' }]
  }
}

export const viewport: Viewport = {
  themeColor: '#0D1117',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1
}

/** Structured data: lets search engines show napsql as a downloadable app (price, OS, version). */
function jsonLd(): string {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: site.name,
        applicationCategory: 'DeveloperApplication',
        applicationSubCategory: 'Database client',
        operatingSystem: 'Windows 10, Windows 11, macOS',
        softwareVersion: site.version,
        description: seo.description,
        url: site.url,
        image: `${site.url}/app-icon.png`,
        downloadUrl: site.windowsDownloadUrl,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR', description: 'Free while in beta' },
        featureList: [
          'Multi-tab T-SQL editor with schema-aware autocomplete',
          'Graphical estimated and actual execution plans',
          'Activity monitor with blocking chains',
          'Backup and restore',
          'Table designer with DDL preview',
          'SQL Agent jobs and logins management',
          'Editable result grid and CSV export',
          'AI assistant grounded in your schema'
        ]
      },
      {
        '@type': 'Organization',
        name: site.name,
        url: site.url,
        logo: `${site.url}/app-icon.png`
      },
      {
        '@type': 'WebSite',
        name: site.name,
        url: site.url
      }
    ]
  }
  return JSON.stringify(data)
}

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd() }} />
      </body>
    </html>
  )
}

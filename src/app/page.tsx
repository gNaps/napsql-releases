import type { JSX } from 'react'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { Compare } from '@/components/Compare'
import { Features } from '@/components/Features'
import { Mcp } from '@/components/Mcp'
import { Spotlights } from '@/components/Spotlights'
import { Changelog } from '@/components/Changelog'
import { Platforms } from '@/components/Platforms'
import { MacFirstLaunch } from '@/components/MacFirstLaunch'
import { FinalCta } from '@/components/FinalCta'
import { Footer } from '@/components/Footer'

/**
 * The landing page. Everything here is a Server Component rendered to static
 * HTML at build time: no client bundles beyond the React runtime, no data
 * fetching, no third-party scripts.
 */
export default function Page(): JSX.Element {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Compare />
        <Features />
        <Mcp />
        <Spotlights />
        <Changelog />
        <Platforms />
        <MacFirstLaunch />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}

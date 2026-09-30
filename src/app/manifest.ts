import type { MetadataRoute } from 'next'
import { seo, site } from '@/site.config'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: seo.description,
    start_url: '/',
    display: 'browser',
    background_color: '#0D1117',
    theme_color: '#0D1117',
    icons: [{ src: '/app-icon.png', sizes: '1024x1024', type: 'image/png' }]
  }
}

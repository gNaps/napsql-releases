import type { NextConfig } from 'next'

/**
 * Fully static export: the site is plain HTML + one CSS file + the minimal
 * React runtime, deployable to any static host or CDN (Vercel, Netlify,
 * Cloudflare Pages, S3…). No server, no images to optimize at runtime.
 */
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: false,
  poweredByHeader: false,
  reactStrictMode: true,
  images: { unoptimized: true }
}

export default nextConfig

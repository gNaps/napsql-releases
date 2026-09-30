# napsql — landing page (Next.js)

Marketing site for napsql, the cross-platform SQL Server client. Built with the
Next.js App Router and exported as a fully static site: plain HTML, one CSS
file, the minimal React runtime. No fonts, images or scripts from third parties.

```
landing/
├── next.config.ts          # output: 'export' (static), no image optimizer
├── src/site.config.ts      # version, download URLs, canonical URL, SEO copy
├── src/app/
│   ├── layout.tsx          # <head> metadata (OG/Twitter/canonical/robots) + JSON-LD
│   ├── page.tsx            # the page, composed of the sections below
│   ├── globals.css         # all styles (palette = the app's theme tokens)
│   ├── icon.svg            # favicon
│   ├── opengraph-image.tsx # 1200×630 social card, generated at build time
│   ├── sitemap.ts · robots.ts · manifest.ts
└── src/components/         # Nav, Hero (+ app mock), Compare, Features, Spotlights, Platforms, FinalCta, Footer
```

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
```

## Build & preview the static export

```bash
npm run build      # writes ./out
npm run start      # serves ./out with `serve`
```

## Configure before deploying

All release/deploy-specific values live in `src/site.config.ts` and can be set
with build-time env vars (they are baked into the static export):

| Variable                        | Purpose                                                    |
| ------------------------------- | ---------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | Canonical origin (sitemap, OG URLs, JSON-LD). **Required.** |
| `NEXT_PUBLIC_WIN_DOWNLOAD_URL`  | Windows installer. Recommended: a GitHub Releases asset.   |
| `NEXT_PUBLIC_MAC_DOWNLOAD_URL`  | macOS `.dmg`; unset ⇒ "coming soon".                       |
| `NEXT_PUBLIC_TWITTER`           | Optional `@handle` for Twitter cards.                      |

Bump `version` and `windowsSizeMb` in `site.config.ts` when you cut a release
(the installer is ~87 MB for 0.2.2).

## Deploy

- **Vercel**: import the repo, Root Directory `landing`, framework Next.js. Set
  the env vars above in the project settings. Nothing else to configure.
- **Any static host** (Netlify, Cloudflare Pages, S3 + CloudFront, nginx): run
  `npm run build` and publish the `out/` folder. Serve `out/404.html` for
  unknown paths and send long `Cache-Control` for `/_next/static/*` (hashed).

## Performance & SEO checklist (already done)

- Static HTML, zero client components, no third-party requests, system fonts.
- `content-visibility: auto` on below-the-fold sections; reduced-motion respected.
- Title/description, canonical, robots, Open Graph + Twitter card, generated OG image.
- JSON-LD `SoftwareApplication` (price, OS, version, download URL) + `Organization` + `WebSite`.
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, SVG favicon, Apple touch icon.
- Semantic landmarks (`nav`, `main`, `header`, `section` with headings), skip link, one `h1`.

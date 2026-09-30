// Post-build: turn the static export into pure HTML + CSS.
//
// The landing page has no client components — nothing to hydrate, no state,
// no event handlers (anchors and CSS only). Next.js still emits the React
// runtime (~550 KB raw) and an RSC payload on every page; for a marketing page
// that is dead weight on every visit. This removes the runtime scripts, their
// preloads and the inline RSC bootstrap from every exported HTML file, and
// deletes the now-unreferenced JS chunks. JSON-LD stays.
//
// Set KEEP_RUNTIME=1 to skip (e.g. if a client component is ever added).
import { readdir, readFile, writeFile, rm } from 'node:fs/promises'
import { join } from 'node:path'

const OUT = new URL('../out/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')

if (process.env.KEEP_RUNTIME) {
  console.log('[strip-runtime] KEEP_RUNTIME set — leaving the React runtime in place')
  process.exit(0)
}

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) yield* walk(p)
    else yield p
  }
}

let pages = 0
let removedBytes = 0
for await (const file of walk(OUT)) {
  if (!file.endsWith('.html')) continue
  const before = await readFile(file, 'utf8')
  const after = before
    // external runtime chunks (async / noModule / the "_R_" bootstrap)
    .replace(/<script\s+src="[^"]*"[^>]*><\/script>/g, '')
    // inline RSC bootstrap + hydration flags; keep JSON-LD (type=application/ld+json)
    .replace(/<script>(?:(?!<\/script>)[\s\S])*<\/script>/g, '')
    // script preloads
    .replace(/<link\s+rel="preload"\s+as="script"[^>]*\/?>/g, '')
  if (after !== before) {
    await writeFile(file, after)
    pages++
    removedBytes += before.length - after.length
  }
}

// The chunks are no longer referenced by any page: drop them from the export.
let chunks = 0
for await (const file of walk(join(OUT, '_next'))) {
  if (file.endsWith('.js')) {
    await rm(file)
    chunks++
  }
}
// RSC payloads are only fetched by the client router, which is gone too.
for await (const file of walk(OUT)) {
  if (file.endsWith('.txt') && !file.endsWith('robots.txt')) await rm(file)
}

console.log(`[strip-runtime] ${pages} page(s) cleaned, ${(removedBytes / 1024).toFixed(1)} KB of inline markup removed, ${chunks} JS chunk(s) deleted`)

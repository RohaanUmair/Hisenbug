/**
 * Journal articles are plain files in /src/journal/*.md. Add a file and it appears in the Journal
 * section automatically, newest first (the newest, or one marked `featured: true`, takes the big slot).
 * Files starting with "_" (like _template.md) are ignored; so are files with `draft: true`.
 *
 * Front matter (between the --- lines):
 *   title:    required
 *   date:     required, YYYY-MM-DD (used for ordering)
 *   summary:  one or two sentences (shown on the featured card)
 *   category: short label, e.g. Automation, Voice, Product
 *   cover:    optional image path, e.g. /journal/my-cover.webp (a generated cover is used if omitted)
 *   href:     optional link (external post or a page); without it the card is not clickable
 *   featured: optional, true to pin as the big card
 *   draft:    optional, true to hide while writing
 */
const files = import.meta.glob(['/src/journal/*.md', '!/src/journal/_*.md'], {
  query: '?raw',
  import: 'default',
  eager: true,
})

function parse(raw, path) {
  const text = String(raw).replace(/\r\n/g, '\n')
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  const meta = {}
  if (m) {
    m[1].split('\n').forEach((line) => {
      const i = line.indexOf(':')
      if (i < 1) return
      const key = line.slice(0, i).trim()
      let value = line.slice(i + 1).trim()
      if (/^(".*"|'.*')$/.test(value)) value = value.slice(1, -1)
      meta[key] = value === 'true' ? true : value === 'false' ? false : value
    })
  }
  const slug = path.split('/').pop().replace(/\.md$/, '')
  return { slug, body: (m ? m[2] : text).trim(), ...meta }
}

export const ARTICLES = Object.entries(files)
  .map(([path, raw]) => parse(raw, path))
  .filter((a) => a.title && !a.draft)
  .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))

export const formatDate = (d) =>
  d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''

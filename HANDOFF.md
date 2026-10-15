# HANDOFF — HisenBug site (2026-10-08)

## State
`npm run dev` → http://localhost:5173. `npm run build` passes. Nothing committed.

## Done
- Full copy rewrite in `src/data/content.js` (original phrasing, invented placeholder clients/quotes/awards).
- Typography: Plus Jakarta Sans (self-hosted, OFL) replaces all previous faces; one `--font-sans` token.
- Accents shifted: coral `#ff6a3d`, indigo `#6657ff` / `#7a72ff`. Background ink is neutral `#080808` (matched to the reference screenshot at the user's request).
- Third-party review-site wordmark replaced by a neutral "Reviews" wordmark (`ReviewMark` / `ReviewWord`).
- Metadata/icons: new `og-image.png`, favicon set, `apple-touch-icon`, `site.webmanifest`. No tracking IDs.
- Removed the comparison script, its screenshot cache and the Playwright dependency.

## Pending
- [ ] Replace placeholder stats, case studies, testimonials, awards and location with real facts.
- [ ] Replace placeholder client marks in `src/components/art/ClientArt.jsx`.
- [ ] Review the remaining layout/illustration structure for originality if full visual distinctness is required.
- [ ] Commit changes.

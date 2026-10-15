// Writes public/THIRD_PARTY_NOTICES.txt: the licence notice of every package that ships in the site bundle
// (production dependencies and their dependencies, plus the build tools that inject code into the bundle).
// Run with `npm run notices` after changing dependencies.
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const tree = JSON.parse(execSync('npm ls --omit=dev --all --json', { cwd: root, encoding: 'utf8' }))

const found = new Map()
const walk = (deps = {}) => {
  for (const [name, info] of Object.entries(deps)) {
    // optional peers that aren't installed don't ship
    if (info.missing || !info.version || !fs.existsSync(path.join(root, 'node_modules', name))) continue
    if (!found.has(name)) found.set(name, info.version)
    walk(info.dependencies)
  }
}
walk(tree.dependencies)

// Build tools are devDependencies, but these three put code of their own into the bundle: Tailwind's base
// styles in the CSS, Vite's module-preload helpers and Rolldown's module runtime in the JS.
const buildTools = {
  tailwindcss: {},
  // Vite's licence file goes on to list the dependencies bundled into Vite's own Node tooling; none of that ships.
  vite: { cut: '\n# Licenses of bundled dependencies' },
  // Rolldown's runtime helpers derive from the libraries in its THIRD-PARTY-LICENSE (Rollup, esbuild).
  rolldown: { extra: 'THIRD-PARTY-LICENSE' },
}
for (const name of Object.keys(buildTools)) {
  const pkg = JSON.parse(fs.readFileSync(path.join(root, 'node_modules', name, 'package.json'), 'utf8'))
  if (!found.has(name)) found.set(name, pkg.version)
}

const licenceText = (dir, name) => {
  const file = fs.readdirSync(dir).find((f) => /^(licen[cs]e|copying)(\.|$)/i.test(f))
  if (!file) return null
  const { cut, extra } = buildTools[name] || {}
  let text = fs.readFileSync(path.join(dir, file), 'utf8')
  if (cut) {
    if (!text.includes(cut)) throw new Error(`${name}: licence layout changed, check the cut point`)
    text = text.slice(0, text.indexOf(cut))
  }
  if (extra) text += `\n\n${extra}\n\n` + fs.readFileSync(path.join(dir, extra), 'utf8')
  return text.trim()
}
// GSAP ships no LICENSE file; its terms live at the URL in every source header.
const headerNotice = (dir) => {
  const src = path.join(dir, 'gsap-core.js')
  if (!fs.existsSync(src)) return null
  const m = fs.readFileSync(src, 'utf8').match(/\/\*![\s\S]*?@license[\s\S]*?\*\//)
  return m ? m[0] : null
}

const sections = [...found.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([name, version]) => {
  const dir = path.join(root, 'node_modules', name)
  const pkg = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'))
  const licence = typeof pkg.license === 'string' ? pkg.license : pkg.license?.type || 'see below'
  const text = licenceText(dir, name) || headerNotice(dir) || `No licence file is included in the package. Licence: ${licence}`
  return [`${name} ${version}`, `Licence: ${licence}`, pkg.homepage ? `Homepage: ${pkg.homepage}` : null, '', text].filter((l) => l !== null).join('\n')
})

const out = [
  'Third-party software notices',
  '',
  'This website includes the following open-source and third-party software. Each component is provided',
  'under its own licence, reproduced or referenced below.',
  '',
  ...sections.flatMap((s) => ['='.repeat(78), s, '']),
].join('\n')

fs.writeFileSync(path.join(root, 'public', 'THIRD_PARTY_NOTICES.txt'), out)
console.log(`THIRD_PARTY_NOTICES.txt: ${found.size} packages`)

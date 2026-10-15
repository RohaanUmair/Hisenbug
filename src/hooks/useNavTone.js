import { useEffect, useState } from 'react'

// computed colours arrive as rgb(r, g, b) or rgba(r, g, b, a)
const channels = (c) => (c.match(/[\d.]+/g) || []).map(Number)
const isSolid = (c) => { const v = channels(c); return v.length === 3 || (v.length === 4 && v[3] >= 0.9) }
const luminance = (c) => { const [r, g, b] = channels(c); return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 }

/**
 * Tone of the page surface just below the fixed header: 'light' or 'dark'.
 * Finds the page section (or footer) painted at a point under the nav, then walks up from it to
 * the first solid background colour. Section-level, so cards and images inside a section don't
 * flip the nav, and no section needs to be tagged.
 */
export function useNavTone(probeY = 48) {
  const [tone, setTone] = useState('dark')

  useEffect(() => {
    let raf = 0
    const read = () => {
      raf = 0
      const hit = document.elementsFromPoint(window.innerWidth / 2, probeY).find((el) => !el.closest('header'))
      let next = 'dark'
      for (let el = hit?.closest('section, footer') ?? hit; el && el !== document.documentElement; el = el.parentElement) {
        const bg = getComputedStyle(el).backgroundColor
        if (isSolid(bg)) { next = luminance(bg) > 0.6 ? 'light' : 'dark'; break }
      }
      setTone((prev) => (prev === next ? prev : next))
    }
    const schedule = () => { if (!raf) raf = requestAnimationFrame(read) }
    read()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [probeY])

  return tone
}

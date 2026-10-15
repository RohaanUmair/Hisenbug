import { useEffect } from 'react'

/**
 * Pauses looping CSS animations while their element is outside the viewport
 * (adds `.hb-paused`, see index.css) and resumes them on the way back in.
 * The page runs well over a hundred infinite SVG/CSS loops; only the ones on screen need to tick.
 */
const ANIMATED = 'svg, [class*="hb-"], [class*="animate-["], [style*="animation"]'

export function useOffscreenAnimationPause() {
  useEffect(() => {
    const root = document.getElementById('root')
    if (!root || typeof IntersectionObserver === 'undefined') return undefined

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.target.classList.toggle('hb-paused', !e.isIntersecting)
      },
      { rootMargin: '150px 0px' },
    )
    const seen = new WeakSet()
    let queued = 0
    const scan = () => {
      queued = 0
      root.querySelectorAll(ANIMATED).forEach((el) => {
        if (seen.has(el)) return
        seen.add(el)
        io.observe(el)
      })
    }
    const schedule = () => {
      if (!queued) queued = window.setTimeout(scan, 120)
    }

    scan()
    const mo = new MutationObserver(schedule)
    mo.observe(root, { childList: true, subtree: true })
    return () => {
      window.clearTimeout(queued)
      mo.disconnect()
      io.disconnect()
    }
  }, [])
}

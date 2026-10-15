import { useEffect, useState } from 'react'

/**
 * 'top' near the page top, 'down' while scrolling down, 'up' while scrolling up.
 * Nav logic: shrinks on scroll down, restores on scroll up.
 */
export function useScrollDirection(threshold = 4) {
  const [dir, setDir] = useState('top')

  useEffect(() => {
    let last = window.scrollY
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const y = window.scrollY
        if (y <= 8) setDir('top')
        else if (y > last + threshold) setDir('down')
        else if (y < last - threshold) setDir('up')
        last = y
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [threshold])

  return dir
}

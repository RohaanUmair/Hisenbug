import { useSyncExternalStore } from 'react'

/** Subscribes to a CSS media query without effects/state churn. */
export function useMediaQuery(query) {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', cb)
      return () => mq.removeEventListener('change', cb)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

/** The site flips layout at 767px — desktop is >= 768px. */
export const useIsDesktop = () => useMediaQuery('(min-width: 768px)')
export const useCanHover = () => useMediaQuery('(hover: hover) and (pointer: fine)')

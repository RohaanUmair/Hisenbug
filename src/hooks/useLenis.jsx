import { createContext, useContext, useEffect, useState } from 'react'
import Lenis from 'lenis'

const LenisContext = createContext(null)
export const useLenis = () => useContext(LenisContext)

/**
 * Smooth scroll
 * (lerp .09, wheelMultiplier .7). Driven by GSAP's ticker once dynamically
 * imported so ScrollTrigger and Lenis share one rAF loop and stay frame-perfect.
 */
export function LenisProvider({ children }) {
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    let unmounted = false
    let tickerHandler = null
    let activeGsap = null
    let nativeRafId = null

    const instance = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 0.7,
      gestureOrientation: 'vertical',
      syncTouch: false,
      anchors: true, // in-page links (#services, #blog…) glide instead of jumping
    })
    setLenis(instance)
    if (import.meta.env.DEV) window.__lenis = instance

    // Immediate native loop while GSAP chunk is loading
    const nativeLoop = (time) => {
      instance.raf(time)
      nativeRafId = requestAnimationFrame(nativeLoop)
    }
    nativeRafId = requestAnimationFrame(nativeLoop)

    // Dynamic import of GSAP & ScrollTrigger to keep initial bundle lean
    Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (unmounted) return
      activeGsap = gsap
      gsap.registerPlugin(ScrollTrigger)
      instance.on('scroll', ScrollTrigger.update)

      // Stop native loop and switch to GSAP ticker
      if (nativeRafId) cancelAnimationFrame(nativeRafId)
      tickerHandler = (time) => instance.raf(time * 1000)
      gsap.ticker.add(tickerHandler)
      gsap.ticker.lagSmoothing(0)
    }).catch((err) => {
      console.warn('GSAP dynamic import error:', err)
    })

    return () => {
      unmounted = true
      if (nativeRafId) cancelAnimationFrame(nativeRafId)
      if (activeGsap && tickerHandler) {
        activeGsap.ticker.remove(tickerHandler)
      }
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

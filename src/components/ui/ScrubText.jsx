import { Fragment, useEffect, useRef } from 'react'
import { useIsDesktop } from '../../hooks/useMediaQuery'

/**
 * Character-by-character reveal.
 *  - Desktop: scrubbed to scroll (stagger .05, start 'top 90%', end 'bottom 20%')
 *  - Mobile : fires as the block enters view (stagger .03, .25s)
 * GSAP & ScrollTrigger are dynamically imported on-demand to keep initial bundle size lean.
 *
 * segments: [{ text, className? } | { br: true }]
 */
export default function ScrubText({ as: Tag = 'h2', segments, className = '', ...rest }) {
  const ref = useRef(null)
  const isDesktop = useIsDesktop()
  const label = segments.map((s) => (s.br ? ' ' : s.text)).join('').replace(/\s+/g, ' ').trim()

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const chars = el.querySelectorAll('[data-char]')
    let ctx = null
    let activeGsap = null
    let io = null
    let cancelled = false

    if (isDesktop) {
      Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]).then(([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return
        activeGsap = gsap
        gsap.registerPlugin(ScrollTrigger)
        ctx = gsap.context(() => {
          gsap.from(chars, {
            opacity: 0,
            duration: 2,
            ease: 'power2.out',
            stagger: 0.05,
            scrollTrigger: { trigger: el, start: 'top 90%', end: 'bottom 20%', scrub: true },
          })
        }, el)
      }).catch((err) => console.warn('GSAP load error in ScrubText:', err))

      return () => {
        cancelled = true
        ctx?.revert()
      }
    }

    import('gsap').then(({ gsap }) => {
      if (cancelled) return
      activeGsap = gsap
      gsap.set(chars, { opacity: 0 })
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              gsap.fromTo(chars, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.inOut', stagger: 0.03 })
            }
          })
        },
        { threshold: 0.1 },
      )
      io.observe(el)
    }).catch((err) => console.warn('GSAP mobile load error in ScrubText:', err))

    return () => {
      cancelled = true
      io?.disconnect()
      if (activeGsap) {
        activeGsap.killTweensOf(chars)
        activeGsap.set(chars, { clearProps: 'opacity' })
      }
    }
  }, [isDesktop])

  return (
    <Tag ref={ref} aria-label={label} className={className} {...rest}>
      {segments.map((seg, i) => {
        if (seg.br) return <br key={i} />
        return (
          <span key={i} className={seg.className} aria-hidden>
            {seg.text.split(' ').map((word, w, arr) => (
              <Fragment key={w}>
                <span className="inline-block whitespace-nowrap">
                  {[...word].map((ch, c) => (
                    <span key={c} data-char className="inline-block">
                      {ch}
                    </span>
                  ))}
                </span>
                {w < arr.length - 1 ? ' ' : null}
              </Fragment>
            ))}
          </span>
        )
      })}
    </Tag>
  )
}

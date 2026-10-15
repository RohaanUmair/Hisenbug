import { Fragment, useLayoutEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import HeroArt, { HeroArtMobile } from '../art/HeroArt'
import Showreel, { SCENE_COUNT } from '../art/Showreel'
import { useLenis } from '../../hooks/useLenis'
import { HERO } from '../../data/content'
import { useMouseParallax } from '../../hooks/useMouseParallax'
import { useIsDesktop, useMediaQuery } from '../../hooks/useMediaQuery'

/** Status pill sized by its own label, with a light that travels around its hairline border. */
function HeroTag({ children }) {
  return (
    <div className="relative mx-auto w-fit overflow-hidden rounded-full p-[.07rem]">
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 block aspect-square w-[260%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: 'conic-gradient(from 0deg, transparent 0 62%, rgba(255,255,255,.75) 82%, transparent 100%)',
          animation: 'hb-glow-spin 4.5s linear infinite',
        }}
      />
      <div className="relative z-[2] flex h-[2.11rem] items-center gap-[.6rem] rounded-full bg-ink px-[1.6rem] pt-[.2rem] md:h-[2.43rem] md:px-[1.9rem]">
        <span className="relative flex size-[.5rem] md:size-[.55rem]">
          <span className="absolute inset-0 rounded-full bg-orange opacity-70" style={{ animation: 'hb-pulse 2s ease-out infinite' }} />
          <span className="relative size-full rounded-full bg-orange" />
        </span>
        <span className="whitespace-nowrap text-[1rem] text-white md:text-[1.25rem]">{children}</span>
      </div>
    </div>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)
  const isDesktop = useIsDesktop()
  const isWide = useMediaQuery('(min-width: 1921px)')
  const { x: mx, y: my, rotateX, rotateY } = useMouseParallax(isDesktop)

  // Scroll timeline, in vh of scrolling: [0, GROW_END] the frame rises and grows to full screen,
  // then each showreel scene gets SCENE_VH of scroll while the screen stays pinned, then it scrolls away.
  const GROW_START = 17
  const GROW_END = 92
  const SCENE_VH = 85
  const TOTAL = GROW_END + SCENE_VH * SCENE_COUNT + 100
  const at = (vh) => vh / TOTAL
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const start = isWide ? 60 : 48
  const width = useTransform(scrollYProgress, [0, at(GROW_START), at(GROW_END)], [`${start}%`, `${start}%`, '100%'])
  const radius = useTransform(scrollYProgress, [0, at(GROW_START), at(GROW_END)], ['1.70111vw', '1.70111vw', '0vw'])
  const radiusInner = useTransform(scrollYProgress, [0, at(GROW_START), at(GROW_END)], ['1.2vw', '1.2vw', '0vw'])

  // 0 -> 1 while the frame grows to full screen
  const grow = useTransform(scrollYProgress, [at(GROW_START), at(GROW_END)], [0, 1], { clamp: true })
  // 0 -> 1 while the pinned block slides up so the frame reaches the top of the viewport
  const slide = useTransform(scrollYProgress, [0, at(GROW_END)], [0, 1], { clamp: true })
  // 0 -> 1 across all showreel scenes (drives which scene is on screen)
  const sceneProgress = useTransform(scrollYProgress, [at(GROW_END), at(GROW_END + SCENE_VH * SCENE_COUNT)], [0, 1], { clamp: true })
  // the frame fills the whole viewport at the end of the growth
  const startH = (start * 2) / 3.8
  const height = useTransform(grow, (v) => `calc(${startH}vw + (100vh - ${startH}vw) * ${v})`)
  const innerSize = useTransform(grow, [0, 1], ['97.5%', '100%'])
  // screen starts tilted back like an open laptop lid and flattens as it grows
  const tilt = useTransform(scrollYProgress, [0, at(GROW_END - 8)], [34, 0], { clamp: true })
  const lift = useTransform(scrollYProgress, [0, at(GROW_END - 8)], ['4vw', '0vw'], { clamp: true })
  // pinned container: slides up so the frame can reach the very top of the viewport
  const pinTop = useRef({ from: 0, offset: 0 })
  const stickyTop = useTransform(slide, (v) => pinTop.current.from + (-pinTop.current.offset - pinTop.current.from) * v)
  const lenis = useLenis()
  const jumpToScene = (idx) => {
    const el = sectionRef.current
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY + ((GROW_END + SCENE_VH * (idx + 0.5)) / 100) * window.innerHeight
    if (lenis) lenis.scrollTo(y)
    else window.scrollTo({ top: y, behavior: 'smooth' })
  }
  const frameRef = useRef(null)
  useLayoutEffect(() => {
    if (!isDesktop) return undefined
    const measure = () => {
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
      pinTop.current = { from: rem * 7, offset: frameRef.current ? frameRef.current.offsetTop : 0 }
      stickyTop.set(pinTop.current.from + (-pinTop.current.offset - pinTop.current.from) * slide.get())
    }
    measure()
    window.addEventListener('resize', measure)
    window.addEventListener('load', measure)
    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('load', measure)
    }
  }, [isDesktop, slide, stickyTop])
  return (
    <div id="top" className="relative">
      <section
        ref={sectionRef}
        style={isDesktop ? { height: `${TOTAL}vh` } : undefined}
        className="relative z-[1] overflow-hidden pb-[4rem] pt-[8.25rem] md:overflow-visible md:pb-0 md:pt-[7vw]"
      >
        {/* spotlight: a soft cone of light falling from the nav down behind the headline */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 flex h-[135vw] justify-center overflow-hidden md:h-[46vw]">
          <div className="h-full w-[120vw] md:w-[40vw]" style={{ filter: 'blur(22px)' }}>
            <div
              className="h-full w-full"
              style={{
                background: 'linear-gradient(to bottom, rgba(255,255,255,.34) 0%, rgba(255,255,255,.2) 50%, rgba(255,255,255,.04) 88%, rgba(255,255,255,0) 100%)',
                clipPath: 'polygon(45% 0, 55% 0, 92% 100%, 8% 100%)',
              }}
            />
          </div>
          <div
            className="absolute top-[-6vw] h-[14vw] w-[26vw] rounded-full"
            style={{ background: 'radial-gradient(ellipse at center, rgba(255,255,255,.16), transparent 70%)', filter: 'blur(18px)' }}
          />
        </div>
        <motion.div className="relative w-full md:sticky md:top-[7rem]" style={isDesktop ? { top: stickyTop } : undefined}>
          {/* heading */}
          <div className="relative z-[3] px-[1.25rem] md:px-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <HeroTag>{HERO.tag}</HeroTag>
            </motion.div>
            <div className="relative mx-auto md:max-w-[44rem]">
              <h1 className="relative z-[5] mx-auto mt-[2.06rem] max-w-[49.9rem] text-center text-[2.625rem] font-medium leading-none tracking-[-.02625rem] text-white md:mt-[2.22rem] md:text-[4.44rem] md:tracking-[-.04444rem]">
                {HERO.title.split(' ').map((w, i, arr) => (
                  <Fragment key={i}>
                    <span className="inline-block overflow-hidden pb-[.08em] align-top">
                      <motion.span
                        className="inline-block"
                        initial={{ y: '105%' }}
                        animate={{ y: 0 }}
                        transition={{ delay: 1.75 + i * 0.07, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {w}
                      </motion.span>
                    </span>
                    {i < arr.length - 1 ? ' ' : null}
                  </Fragment>
                ))}
              </h1>
            </div>
          </div>

          {/* showreel */}
          <div
            ref={frameRef}
            className="relative z-10 mt-[3rem] max-w-[100vw] overflow-hidden md:mt-[2vw]"
            style={isDesktop ? { perspective: 1500 } : undefined}
          >
            <HeroArtMobile />
            <motion.div
              className="relative mx-auto aspect-[3.8/2] w-[80%] overflow-hidden rounded-[.68rem] p-[.1rem] md:aspect-auto md:rounded-none md:rounded-t-[1.70111vw]"
              style={
                isDesktop
                  ? { width, height, borderTopLeftRadius: radius, borderTopRightRadius: radius, rotateX: tilt, y: lift, transformOrigin: '50% 100%' }
                  : undefined
              }
            >
              <motion.div
                className="absolute inset-[.1rem] z-[2] rounded-t-[.68rem] bg-ink md:rounded-none"
                style={isDesktop ? { borderTopLeftRadius: radius, borderTopRightRadius: radius } : undefined}
              />
              <motion.div
                className="absolute inset-x-0 bottom-0 z-[2] mx-auto h-[97.5%] w-[97.5%] overflow-hidden rounded-[.68rem] md:rounded-none"
                style={isDesktop ? { borderRadius: radiusInner, width: innerSize, height: innerSize } : undefined}
              >
                <Showreel progress={isDesktop ? sceneProgress : undefined} onJump={jumpToScene} />
              </motion.div>
              {/* lit rim: light falls on the top edge of the frame and fades down its sides */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: 'radial-gradient(75% 95% at 50% 0%, rgb(255 255 255 / .42), rgb(255 255 255 / .12) 45%, rgb(255 255 255 / 0) 80%)' }}
              />
            </motion.div>
          </div>

        </motion.div>

        {/* floating cards (desktop): fixed to the page, so they stay where they are and scroll away with it */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[11.25vw] z-[11]">
          <HeroArt mx={mx} my={my} rotateX={rotateX} rotateY={rotateY} />
        </div>
      </section>
    </div>
  )
}

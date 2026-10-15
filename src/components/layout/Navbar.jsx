import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from '../art/Logo'
import { SOCIAL_ICONS } from '../art/Icons'
import FillButton from '../ui/FillButton'
import FlipLink from '../ui/FlipLink'
import { NAV_LINKS, FOOTER, SITE } from '../../data/content'
import { useScrollDirection } from '../../hooks/useScrollDirection'
import { useNavTone } from '../../hooks/useNavTone'
import { useIsDesktop } from '../../hooks/useMediaQuery'
import { useLenis } from '../../hooks/useLenis'
import { useBooking } from './BookingContext'

const EASE = [0.4, 0, 0.2, 1]
const SLIDE = { duration: 0.7, ease: EASE }

const near = (a, b, gap) =>
  a.left - gap < b.right && a.right + gap > b.left && a.top - gap < b.bottom && a.bottom + gap > b.top

/**
 * Phones: the fixed logo and menu button sit over the page, and at the bottom of the page a footer link can end up
 * underneath them (which one depends on the screen height). While that is the case the bar steps aside (fades out,
 * inert) and comes back once every footer link is clear: hide within 6px, show again at 16px clear for 300ms.
 */
function useClearOfFooterLinks(refs, enabled) {
  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    if (!enabled) {
      setHidden(false)
      return undefined
    }
    let raf = 0
    let current = false
    let showTimer = 0
    const blocked = (gap) => {
      const boxes = refs.map((r) => r.current?.getBoundingClientRect()).filter(Boolean)
      return [...document.querySelectorAll('footer a[href]')].some((el) => {
        const r = el.getBoundingClientRect()
        return r.width > 0 && r.height > 0 && boxes.some((box) => near(box, r, gap))
      })
    }
    const check = () => {
      raf = 0
      if (!current) {
        if (blocked(6)) { current = true; setHidden(true) }
      } else if (blocked(16)) {
        window.clearTimeout(showTimer)
        showTimer = 0
      } else if (!showTimer) {
        showTimer = window.setTimeout(() => {
          showTimer = 0
          if (!blocked(16)) { current = false; setHidden(false) } else schedule()
        }, 300)
      }
    }
    const schedule = () => { if (!raf) raf = requestAnimationFrame(check) }
    check()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    const timer = window.setInterval(schedule, 400)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      window.clearInterval(timer)
      window.clearTimeout(showTimer)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [enabled]) // refs are stable objects
  return hidden
}

/** Natural (unclipped) width of an element, kept current as fonts load or the root size changes. */
function useNaturalWidth() {
  const ref = useRef(null)
  const [width, setWidth] = useState(0)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const read = () => setWidth(el.offsetWidth)
    read()
    const ro = new ResizeObserver(read)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return [ref, width]
}

/**
 * Desktop nav pill. The pill has no fixed width: it is as wide as what it shows.
 *  - reading (scrolling down): the section links fold away and a "Book a call" button opens up
 *    next to Contact, so the pill narrows around logo + two buttons
 *  - browsing (at the top / scrolling up): links are back, the booking button is folded away
 * Each folding slot animates between 0 and its content's measured width.
 */
function DesktopNav({ compact, dark, onBook }) {
  const [linksRef, linksW] = useNaturalWidth()
  const [bookRef, bookW] = useNaturalWidth()
  const fg = dark ? '#ffffff' : '#080808'

  return (
    <motion.nav
      aria-label="Primary"
      className="pointer-events-auto flex h-[3.47222rem] flex-none items-center overflow-hidden rounded-[.83333rem] p-[.28rem]"
      initial={false}
      animate={{ backgroundColor: dark ? 'var(--color-ink-900)' : 'var(--color-paper)' }}
      transition={{ duration: 0.3 }}
    >
      <a href="#top" aria-label={SITE.homeAriaLabel} className="ml-[1.2rem] mr-[3.75rem] flex flex-none items-center">
        <Logo className="size-[2.5rem] transition-colors duration-300" style={{ color: fg }} />
      </a>

      {/* section links: folded away while reading */}
      <motion.div
        className="h-full flex-none overflow-hidden"
        initial={false}
        animate={{ width: compact ? 0 : linksW, opacity: compact ? 0 : 1 }}
        transition={SLIDE}
      >
        <motion.div
          ref={linksRef}
          className="flex h-full w-max items-center gap-[2.36rem] pl-[1.25rem] pr-[11rem] pt-[.2rem]"
          initial={false}
          animate={{ scale: compact ? 0.6 : 1 }}
          transition={SLIDE}
        >
          {NAV_LINKS.map((l) => (
            <FlipLink key={l.label} href={l.href} textClass="text-neutral-300" hoverClass={dark ? 'text-white' : 'text-ink'} tabIndex={compact ? -1 : 0}>
              {l.label}
            </FlipLink>
          ))}
        </motion.div>
      </motion.div>

      {/* booking button: opens up while reading */}
      <motion.div
        className="h-full flex-none overflow-hidden"
        initial={false}
        animate={{ width: compact ? bookW : 0 }}
        transition={SLIDE}
      >
        <motion.div
          ref={bookRef}
          className="h-full w-max pr-[.56rem]"
          initial={false}
          animate={{ scale: compact ? 1 : 0.6, opacity: compact ? 1 : 0 }}
          transition={SLIDE}
        >
          <FillButton
            as="button"
            type="button"
            onClick={onBook}
            tabIndex={compact ? 0 : -1}
            aria-hidden={compact ? undefined : true}
            className="flex h-full w-[8.33rem] items-center justify-center rounded-[.56rem] px-[1.46rem] pb-[.8rem] pt-[1.01rem] text-[.97222rem] transition-colors duration-300"
            style={{ backgroundColor: dark ? '#404040' : '#E5E5E5' }}
            innerStyle={{ color: fg }}
          >
            <span className="whitespace-nowrap opacity-90">Book a call</span>
          </FillButton>
        </motion.div>
      </motion.div>

      <FillButton
        href="#contact"
        className="flex h-full flex-none items-center justify-center rounded-[.56rem] bg-orange px-[1.46rem] pb-[.8rem] pt-[1.01rem] text-[.97222rem] text-white"
      >
        <span className="opacity-90">Contact</span>
      </FillButton>
    </motion.nav>
  )
}

export default function Navbar() {
  const dir = useScrollDirection()
  const tone = useNavTone()
  const isDesktop = useIsDesktop()
  const { open: openBooking } = useBooking()
  const lenis = useLenis()
  const [menuOpen, setMenuOpen] = useState(false)
  const logoRef = useRef(null)
  const menuBtnRef = useRef(null)
  const barHidden = useClearOfFooterLinks([logoRef, menuBtnRef], !isDesktop && !menuOpen)

  const dark = tone === 'dark'

  useEffect(() => {
    if (!menuOpen) return undefined
    lenis?.stop()
    return () => lenis?.start()
  }, [menuOpen, lenis])

  useEffect(() => {
    if (isDesktop) setMenuOpen(false)
  }, [isDesktop])

  const fg = dark || menuOpen ? '#ffffff' : '#080808'

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[99999] flex justify-center p-[1.25rem] md:p-[1.11rem]">
        {isDesktop ? (
          <DesktopNav compact={dir === 'down'} dark={dark} onBook={openBooking} />
        ) : (
          /* ---- mobile bar: only the logo and the menu button take taps, the space between them lets taps through ---- */
          <div
            inert={barHidden || undefined}
            className={`pointer-events-none flex h-[2rem] w-full items-center justify-between transition-opacity duration-300 ${barHidden ? 'opacity-0' : 'opacity-100'}`}
          >
            <a ref={logoRef} href="#top" aria-label={SITE.homeAriaLabel} className="pointer-events-auto block h-[2rem]">
              <Logo className="size-[2.5rem] transition-colors duration-300" style={{ color: fg }} />
            </a>
            <button
              ref={menuBtnRef}
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="pointer-events-auto flex h-full flex-col items-center justify-center gap-[.5rem] px-[.5rem]"
            >
              <motion.span
                className="block h-[1.5px] w-[1.6rem] bg-neutral-400"
                animate={{ y: menuOpen ? 3.5 : 0, rotate: menuOpen ? 45 : 0 }}
                transition={{ duration: 0.35, ease: EASE }}
              />
              <motion.span
                className="block h-[1.5px] w-[1.6rem] bg-neutral-400"
                animate={{ y: menuOpen ? -3.5 : 0, rotate: menuOpen ? -45 : 0 }}
                transition={{ duration: 0.35, ease: EASE }}
              />
            </button>
          </div>
        )}
      </header>

      {/* ---- mobile menu ---- */}
      <AnimatePresence>
        {!isDesktop && menuOpen && (
          <motion.div
            className="fixed inset-0 z-[99998] flex flex-col justify-between bg-ink px-[1.25rem] pb-[2rem] pt-[6rem]"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="flex flex-col gap-[1.25rem]">
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-[2.6rem] leading-[1.1] text-white"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <div className="flex flex-col gap-[1.25rem]">
              <a href={`mailto:${FOOTER.email}`} className="text-[1.75rem] text-white">{FOOTER.email}</a>
              {FOOTER.socials.length > 0 && (
              <div className="flex items-center gap-[.25rem]">
                {FOOTER.socials.map((s) => {
                  const Icon = SOCIAL_ICONS[s.name]
                  return (
                    <a
                      key={s.name}
                      href={s.href}
                      aria-label={s.name}
                      target="_blank"
                      rel="noreferrer"
                      className="flex size-[3rem] items-center justify-center rounded-[.75rem] bg-ink-700 text-white"
                    >
                      <Icon className="size-[1.4rem]" />
                    </a>
                  )
                })}
              </div>
              )}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="flex h-[3rem] items-center justify-center rounded-[.5rem] bg-orange text-[.97222rem] text-white"
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

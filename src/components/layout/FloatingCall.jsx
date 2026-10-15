import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useBooking } from './BookingContext'

const EASE = [0.22, 1, 0.36, 1]
// Never covered by the button:
//  - links and buttons inside a [data-fab-clear] region (showreel scene bars, contact buttons, footer links)
//  - any [data-fab-keep] element (e.g. the FAQ +/- icon); with data-fab-keep="text" only its actual lines of
//    text count, not the empty part of its box (FAQ questions and answers, footer copyright and location)
const CONTROLS = '[data-fab-clear] a[href], [data-fab-clear] button, [data-fab-keep]'
// Hide as soon as anything comes within 6px. Coming back needs it to stay clear for 300ms and:
//  - while the page is moving: 16px of clearance plus clear page ahead in the scroll direction (200px, or 0.6s of
//    travel at the current speed if that is more), so it doesn't pop up in a short gap only to step aside again
//  - once the page is still: 8px, so where it settles matches what a fresh page load would show
const HIDE_GAP = 6
const REST_GAP = 8
const SHOW_GAP = 16
const SHOW_DELAY = 300
const LOOKAHEAD = 200
const LOOKAHEAD_S = 0.6
const MOVING_MS = 250

const near = (a, b, gap) =>
  a.left - gap < b.right && a.right + gap > b.left && a.top - gap < b.bottom && a.bottom + gap > b.top

const textLines = (el) => {
  const range = document.createRange()
  range.selectNodeContents(el)
  return range.getClientRects()
}

const covers = (me, el, gap) => {
  const r = el.getBoundingClientRect()
  if (el.dataset.fabKeep === 'text') {
    if (!r.width || !r.height || !near(me, r, gap)) return false
    for (const line of textLines(el)) if (line.width > 0 && near(me, line, gap)) return true
    return false
  }
  if (!r.width && !r.height) return false
  if (near(me, r, gap)) return true
  // an icon's strokes can sit outside its own (even zero-height) box
  for (const child of el.children) if (near(me, child.getBoundingClientRect(), gap)) return true
  return false
}

/** Steps aside (hides) while it would cover anything listed in CONTROLS; fades back once clear. */
function useStepAside(slotRef) {
  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    let raf = 0
    let current = false
    let showTimer = 0
    let lastY = window.scrollY
    let dir = 0
    let movedAt = 0
    let speed = 0 // px/s, smoothed
    const blocked = (area, gap) => [...document.querySelectorAll(CONTROLS)].some((el) => covers(area, el, gap))
    const canShow = () => {
      const slot = slotRef.current
      if (!slot) return false
      const me = slot.getBoundingClientRect()
      if (performance.now() - movedAt > MOVING_MS) return !blocked(me, REST_GAP)
      const ahead = Math.max(LOOKAHEAD, speed * LOOKAHEAD_S)
      const area = dir > 0 ? { ...me.toJSON(), bottom: me.bottom + ahead } : { ...me.toJSON(), top: me.top - ahead }
      return !blocked(area, SHOW_GAP)
    }
    const check = () => {
      raf = 0
      const slot = slotRef.current
      if (!slot) return
      if (!current) {
        if (blocked(slot.getBoundingClientRect(), HIDE_GAP)) { current = true; setHidden(true) }
      } else if (!canShow()) {
        window.clearTimeout(showTimer)
        showTimer = 0
      } else if (!showTimer) {
        showTimer = window.setTimeout(() => {
          showTimer = 0
          // only come back if it is still clear now
          if (canShow()) { current = false; setHidden(false) } else schedule()
        }, SHOW_DELAY)
      }
    }
    const schedule = () => { if (!raf) raf = requestAnimationFrame(check) }
    const onScroll = () => {
      const y = window.scrollY
      if (y !== lastY) {
        const now = performance.now()
        const dt = Math.max(1, now - movedAt)
        // a fresh start after a pause counts from zero
        speed = dt > MOVING_MS ? 0 : speed * 0.7 + ((Math.abs(y - lastY) * 1000) / dt) * 0.3
        dir = y > lastY ? 1 : -1
        lastY = y
        movedAt = now
      }
      schedule()
    }
    check()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', schedule)
    // the showreel frame and lazy sections move without scrolling (growth, layout shifts), and scrolling may
    // have stopped: re-check now and then
    const timer = window.setInterval(schedule, 400)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', schedule)
      window.clearInterval(timer)
      window.clearTimeout(showTimer)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [slotRef])
  return hidden
}

/** Fixed violet "Book a call" pill in the bottom-right corner; opens the booking modal. */
export default function FloatingCall() {
  const { open } = useBooking()
  const slotRef = useRef(null)
  const btnRef = useRef(null)
  const hidden = useStepAside(slotRef)
  const [entered, setEntered] = useState(false)

  // a hidden button must not keep keyboard focus
  useEffect(() => {
    if (hidden && document.activeElement === btnRef.current) btnRef.current.blur()
  }, [hidden])

  return (
    // the slot never moves, so it is what gets measured; the button inside fades and slides
    <div
      ref={slotRef}
      inert={hidden || undefined}
      // visibility switches at once, so a hidden button is gone in the same frame whatever its animation is doing
      style={{ visibility: hidden ? 'hidden' : 'visible' }}
      className="pointer-events-none fixed bottom-[1.1rem] right-[1.1rem] z-20 h-[4rem] w-[11.125rem] md:h-[4.72222rem] md:w-[13.75rem]"
    >
      <motion.button
        ref={btnRef}
        type="button"
        onClick={open}
        aria-hidden={hidden || undefined}
        tabIndex={hidden ? -1 : 0}
        className={`group flex h-full w-full cursor-pointer items-center justify-center rounded-[6.94rem] bg-violet ${hidden ? 'pointer-events-none' : 'pointer-events-auto'}`}
        initial={{ opacity: 0, y: 40, scale: 0.8 }}
        // stepping aside is instant and cancels a pending or running intro; coming back fades in, and only the
        // very first appearance waits for the intro
        animate={
          hidden
            ? { opacity: 0, y: 24, scale: 0.9, transition: { duration: 0 } }
            : { opacity: 1, y: 0, scale: 1, transition: entered ? { duration: 0.35, ease: EASE } : { delay: 2, duration: 0.8, ease: EASE } }
        }
        onAnimationComplete={() => setEntered(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        <span className="flex items-center gap-[.5rem] pt-[.2rem] md:gap-[1.25rem]">
          <span className="pt-[.2rem] text-[1rem] text-white md:text-[1.25rem]">Book a call</span>
          <ArrowRight
            className="h-auto w-[1.2rem] transition-transform duration-500 ease-flip group-hover:translate-x-[.3rem] md:w-[1.6rem]"
            color="#fff"
            strokeWidth={1.8}
            aria-hidden
          />
        </span>
      </motion.button>
    </div>
  )
}

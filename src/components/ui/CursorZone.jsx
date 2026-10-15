import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useCanHover } from '../../hooks/useMediaQuery'

/**
 * Wraps a region and swaps the native cursor for a 146px disc that follows
 * the pointer on a spring.
 */
export default function CursorZone({
  label,
  sub,
  variant = 'white',
  className = '',
  children,
  as: Tag = 'div',
  ...rest
}) {
  const canHover = useCanHover()
  const [on, setOn] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 380, damping: 32, mass: 0.5 })
  const white = variant === 'white'
  const zoneRef = useRef(null)
  const pointer = useRef({ x: 0, y: 0 })

  // Smooth scrolling moves the zone out from under a still pointer without the
  // browser always sending `mouseleave` — re-test the pointer on scroll.
  useEffect(() => {
    if (!on) return undefined
    const check = () => {
      const r = zoneRef.current?.getBoundingClientRect()
      if (!r) return
      const { x: px, y: py } = pointer.current
      if (px < r.left || px > r.right || py < r.top || py > r.bottom) setOn(false)
    }
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [on])

  return (
    <Tag
      ref={zoneRef}
      className={`${canHover && on ? 'cursor-none' : ''} ${className}`}
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      onMouseMove={(e) => {
        pointer.current = { x: e.clientX, y: e.clientY }
        x.set(e.clientX)
        y.set(e.clientY)
      }}
      {...rest}
    >
      {children}
      {canHover && (
        <motion.div
          aria-hidden
          className={`pointer-events-none fixed left-0 top-0 z-[9999] -ml-[73px] -mt-[73px] flex size-[146px] flex-col items-center justify-center rounded-full text-[17px] leading-[1.15] shadow-[0_18px_40px_rgba(0,0,0,.35)] will-change-transform ${
            white ? 'bg-white text-ink' : 'bg-violet text-white'
          }`}
          style={{ x: sx, y: sy }}
          animate={{ scale: on ? 1 : 0.3, opacity: on ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>{label}</span>
          {sub && <span>{sub}</span>}
        </motion.div>
      )}
    </Tag>
  )
}

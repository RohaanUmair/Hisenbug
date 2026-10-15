import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * Pointer-driven 3D tilt with a spring return. `max` is the peak rotation in degrees.
 * Rotation is applied to a single GPU layer; the glare is a cheap gradient overlay.
 */
export default function TiltCard({ children, max = 7, className = '', glare = true, ...rest }) {
  const ref = useRef(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const sx = useSpring(px, { stiffness: 200, damping: 20, mass: 0.5 })
  const sy = useSpring(py, { stiffness: 200, damping: 20, mass: 0.5 })
  const rotateY = useTransform(sx, [0, 1], [-max, max])
  const rotateX = useTransform(sy, [0, 1], [max, -max])
  const gx = useTransform(sx, [0, 1], ['0%', '100%'])
  const gy = useTransform(sy, [0, 1], ['0%', '100%'])
  const glareBg = useTransform([gx, gy], ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,.55), transparent 55%)`)
  const glareOpacity = useMotionValue(0)
  const gOp = useSpring(glareOpacity, { stiffness: 160, damping: 22 })

  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
    glareOpacity.set(0.16)
  }
  const leave = () => {
    px.set(0.5)
    py.set(0.5)
    glareOpacity.set(0)
  }

  return (
    <div style={{ perspective: 900 }} className={className} {...rest}>
      <motion.div
        ref={ref}
        onMouseMove={move}
        onMouseLeave={leave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative h-full w-full will-change-transform"
      >
        {children}
        {glare && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-overlay"
            style={{ background: glareBg, opacity: gOp }}
          />
        )}
      </motion.div>
    </div>
  )
}

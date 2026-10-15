import { useEffect, useRef } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

/**
 * Lets an element lean toward the pointer while it hovers: the offset grows linearly from 0 at
 * the centre to `reach` px at the edges, on each axis, and springs back on leave.
 * Returns { ref, x, y } for a motion element's ref and style.
 */
export function useMagnet(reach = 5) {
  const ref = useRef(null)
  const tx = useMotionValue(0)
  const ty = useMotionValue(0)
  const spring = { stiffness: 220, damping: 16, mass: 0.4 }
  const x = useSpring(tx, spring)
  const y = useSpring(ty, spring)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const lean = (e) => {
      const { left, top, width, height } = el.getBoundingClientRect()
      // -1 .. 1 across the element on each axis
      const u = (2 * (e.clientX - left)) / width - 1
      const v = (2 * (e.clientY - top)) / height - 1
      tx.set(u * reach)
      ty.set(v * reach)
    }
    const settle = () => { tx.set(0); ty.set(0) }
    el.addEventListener('pointermove', lean)
    el.addEventListener('pointerleave', settle)
    return () => {
      el.removeEventListener('pointermove', lean)
      el.removeEventListener('pointerleave', settle)
    }
  }, [reach, tx, ty])

  return { ref, x, y }
}

import { useEffect } from 'react'
import { useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * Normalised (-0.5..0.5) smoothed pointer position relative to the viewport.
 * Tuned with high damping and mass for an organic, floating zero-g lag behind the cursor.
 * Exposes both linear translation (x, y) and 3D rotational tilt (rotateX, rotateY).
 */
export function useMouseParallax(enabled = true) {
  const nx = useMotionValue(0)
  const ny = useMotionValue(0)

  // Higher damping (28) and mass (0.85) ensures smooth lerp-style organic lag without abrupt snapping
  const springConfig = { stiffness: 42, damping: 28, mass: 0.85 }
  const x = useSpring(nx, springConfig)
  const y = useSpring(ny, springConfig)

  // 3D rotational tilt springs
  const rotXSpring = useSpring(ny, { stiffness: 48, damping: 26, mass: 0.75 })
  const rotYSpring = useSpring(nx, { stiffness: 48, damping: 26, mass: 0.75 })

  // When cursor moves down (ny > 0), element tilts up slightly (rotateX < 0)
  const rotateX = useTransform(rotXSpring, [-0.5, 0.5], [9, -9])
  // When cursor moves right (nx > 0), element tilts right (rotateY > 0)
  const rotateY = useTransform(rotYSpring, [-0.5, 0.5], [-11, 11])

  useEffect(() => {
    if (!enabled) return undefined
    const move = (e) => {
      // Smooth normalized coordinates relative to viewport center
      nx.set(e.clientX / window.innerWidth - 0.5)
      ny.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [enabled, nx, ny])

  return { x, y, rotateX, rotateY, nx, ny }
}

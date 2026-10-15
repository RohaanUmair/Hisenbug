import { motion } from 'framer-motion'

/**
 * Soft light disc placed behind a card. The card sits inside a wrapper with a hairline of padding,
 * so only a thin rim of the disc shows around the card: a border that is brightest where the disc
 * is centred and fades away along the edge.
 *   intensity - opacity of the light at the disc's centre (0..1)
 *   reach     - where the light has fully faded, as % of the disc radius
 * Pass motion values in `style` (x / y) to let the light move.
 */
export default function EdgeGlow({ className = '', intensity = 0.35, reach = 60, style }) {
  return (
    <motion.span
      aria-hidden
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={{ backgroundImage: `radial-gradient(circle, rgb(255 255 255 / ${intensity}), rgb(255 255 255 / 0) ${reach}%)`, ...style }}
    />
  )
}

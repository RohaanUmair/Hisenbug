/**
 * Wordless brand mark: a broken ring + an orbiting dot.
 * Colour follows currentColor so the nav can invert it.
 */
import { SITE } from '../../data/content'

export default function Logo({ className = '', accent = '#ff6a3d', ...rest }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-label={SITE.name} role="img" {...rest}>
      <path d="M24 6a18 18 0 1 0 17.2 12.6" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" />
      <circle cx="24" cy="24" r="4.6" fill={accent} />
      <circle cx="39.5" cy="11.5" r="3.6" fill="currentColor" />
    </svg>
  )
}

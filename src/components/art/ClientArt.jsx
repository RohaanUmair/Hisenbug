/** Small logo chip shown when a product row is hovered. */
export function ClientChip({ name, hue }) {
  return (
    <svg viewBox="0 0 206 51" className="h-full w-full" fill="none" aria-hidden>
      <rect x=".5" y=".5" width="205" height="50" rx="25" fill="#fff" stroke="#e5e5e5" />
      <circle cx="26" cy="25.5" r="12" fill={`hsl(${hue} 88% 58%)`} />
      <circle cx="26" cy="25.5" r="4.5" fill="#fff" />
      <text x="48" y="31" fontSize="15" fontWeight="700" fill="#080808">{name}</text>
    </svg>
  )
}

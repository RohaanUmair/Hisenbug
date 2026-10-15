/** Certificate-style thumbnail for the awards list (fades in beside the hovered row). */
export default function AwardThumb({ org, title, hue }) {
  const id = `aw-${org}-${hue}`
  return (
    <svg viewBox="0 0 130 98" className="block h-auto w-full" fill="none" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={`hsl(${hue} 85% 62%)`} />
          <stop offset="1" stopColor={`hsl(${(hue + 50) % 360} 80% 38%)`} />
        </linearGradient>
      </defs>
      <rect width="130" height="98" fill={`url(#${id})`} />
      <circle cx="104" cy="22" r="40" fill="#ffffff22" />
      <circle cx="22" cy="92" r="34" fill="#00000026" />
      <rect x="12" y="12" width="58" height="8" rx="4" fill="#ffffffcc" />
      <text x="12" y="52" fontSize="15" fontWeight="700" fill="#fff">{org}</text>
      <text x="12" y="68" fontSize="9" fill="#ffffffd9">{title}</text>
      <g transform="translate(92 62)">
        <circle r="17" fill="#fff" />
        <path d="m0-9 2.6 5.4 5.9.8-4.3 4.1 1 5.9L0 4.5l-5.2 2.7 1-5.9-4.3-4.1 5.9-.8z" fill={`hsl(${hue} 85% 48%)`} />
      </g>
    </svg>
  )
}

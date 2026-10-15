/** Illustrations for the four proof-point cards (inline SVG, transform/opacity loops only). */

/* 24/7: an always-on assistant */
export function ChatArt({ className = '' }) {
  return (
    <svg viewBox="0 0 266 190" className={className} fill="none" aria-hidden>
      <g className="hb-box" style={{ animation: 'hb-slide-in 7s ease-in-out infinite' }}>
        <rect x="14" y="14" width="176" height="62" rx="22" fill="#1b1b1b" stroke="#ffffff1f" strokeWidth="2" />
        <circle cx="46" cy="45" r="16" fill="#6657ff" />
        <rect x="72" y="32" width="96" height="9" rx="4.5" fill="#fff" />
        <rect x="72" y="50" width="64" height="8" rx="4" fill="#ffffff55" />
      </g>
      <g className="hb-box" style={{ animation: 'hb-slide-in 7s ease-in-out 1.2s infinite' }}>
        <rect x="60" y="88" width="192" height="64" rx="22" fill="#ff6a3d" />
        <text x="82" y="116" fill="#fff" fontSize="15" fontWeight="600">Call answered</text>
        <text x="82" y="136" fill="#ffe6df" fontSize="19" fontWeight="700">3:12 AM</text>
      </g>
      <g className="hb-box" style={{ animation: 'hb-pop 7s ease-in-out 2.4s infinite' }}>
        <rect x="14" y="156" width="62" height="28" rx="14" fill="#1b1b1b" stroke="#ffffff1f" strokeWidth="2" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={32 + i * 14} cy="170" r="3.4" fill="#fff" style={{ animation: `hb-blink 1.1s ${i * 0.18}s infinite` }} />
        ))}
      </g>
    </svg>
  )
}

/* 85%: donut ring */
export function DonutArt({ className = '' }) {
  const r = 78
  const c = 2 * Math.PI * r
  return (
    <svg viewBox="0 0 220 220" className={className} fill="none" aria-hidden>
      <defs>
        <linearGradient id="do-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff6a3d" />
          <stop offset="1" stopColor="#6657ff" />
        </linearGradient>
      </defs>
      <circle cx="110" cy="110" r={r} stroke="#ffffff1c" strokeWidth="22" />
      <g className="hb-spin" style={{ animationDuration: '16s', transformOrigin: '110px 110px', transformBox: 'view-box' }}>
        <circle
          cx="110"
          cy="110"
          r={r}
          stroke="url(#do-g)"
          strokeWidth="22"
          strokeLinecap="round"
          strokeDasharray={`${c * 0.85} ${c}`}
          transform="rotate(-90 110 110)"
        />
      </g>
      <circle cx="110" cy="110" r="52" fill="#101010" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={86 + i * 18} y="98" width="10" height="30" rx="4" fill={i === 2 ? '#ff6a3d' : '#ffffff55'} className="hb-box" style={{ animation: `hb-bar ${2 + i * 0.4}s ease-in-out ${i * 0.25}s infinite` }} />
      ))}
    </svg>
  )
}

/* 10x: rising bars with an arrow */
export function GrowthArt({ className = '' }) {
  return (
    <svg viewBox="0 0 220 190" className={className} fill="none" aria-hidden>
      {[34, 62, 96, 140].map((h, i) => (
        <rect
          key={i}
          x={26 + i * 46}
          y={170 - h}
          width="30"
          height={h}
          rx="9"
          fill={i === 3 ? '#ff6a3d' : '#ffffff2e'}
          className="hb-box"
          style={{ transformOrigin: '50% 100%', animation: `hb-bar ${2.6 + i * 0.3}s ease-in-out ${i * 0.2}s infinite` }}
        />
      ))}
      <path d="M22 118 82 88l44-18 62-40" stroke="#6657ff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="8 9" style={{ animation: 'hb-dash 5s linear infinite' }} />
      <path d="m176 26 14 4-6 14" stroke="#6657ff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

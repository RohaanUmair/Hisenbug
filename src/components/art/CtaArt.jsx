import { useId } from 'react'

/**
 * CTA artwork: an order flowing through an automation (order -> AI layer -> bill -> ledger),
 * with its status log and two floating notifications. Example data only, no performance figures.
 */
const Check = ({ cx, cy, fill = '#6657ff' }) => (
  <g>
    <circle cx={cx} cy={cy} r="7" fill={fill} />
    <path d={`M${cx - 3} ${cy}l2.2 2.2 4-4.4`} stroke="#fff" strokeWidth="1.8" strokeLinecap="round" fill="none" />
  </g>
)

export function CtaFlow({ className = '' }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 560 520" className={className} fill="none" aria-hidden>
      <defs>
        <linearGradient id={`fl-${id}`} x1="0" x2="1">
          <stop offset="0" stopColor="#6657ff" />
          <stop offset="1" stopColor="#ff6a3d" />
        </linearGradient>
      </defs>

      <g className="hb-float">
        <rect x="40" y="70" width="440" height="330" rx="28" fill="#161616" stroke="#ffffff26" strokeWidth="2" />
        <text x="68" y="114" fill="#fff" fontSize="17" fontWeight="700">Order flow</text>
        <rect x="384" y="96" width="74" height="26" rx="13" fill="#6657ff33" />
        <circle cx="398" cy="109" r="4" fill="#9a8cff" />
        <text x="428" y="113" fill="#c9c2ff" fontSize="11" textAnchor="middle">Running</text>

        {/* connectors between the four steps */}
        <path
          d="M118 184H170M234 184H286M350 184H402"
          stroke={`url(#fl-${id})`}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="6 7"
          style={{ animation: 'hb-flow 2.4s linear infinite' }}
        />

        {/* order (chat) */}
        <rect x="62" y="156" width="56" height="56" rx="16" fill="#1b1b1b" stroke="#ffffff22" />
        <path d="M78 172a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v11a4 4 0 0 1-4 4h-9l-6 5v-5h-1a4 4 0 0 1-4-4z" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
        {/* AI layer */}
        <circle cx="202" cy="184" r="32" fill="#141414" stroke="#ffffff33" strokeWidth="2" />
        <circle cx="202" cy="184" r="15" stroke="#6657ff" strokeWidth="5" />
        <circle cx="202" cy="184" r="4.5" fill="#ff6a3d" />
        {/* bill */}
        <rect x="290" y="156" width="56" height="56" rx="16" fill="#1b1b1b" stroke="#ffffff22" />
        <path d="M309 168h12l6 6v20h-18zM313 180h10M313 186h10" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
        {/* ledger */}
        <rect x="402" y="156" width="56" height="56" rx="16" fill="#1b1b1b" stroke="#ffffff22" />
        <path d="M420 168h20v24h-20zM425 175h10M425 181h10M425 187h6" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />

        <g fontSize="11" fill="#ffffff88" textAnchor="middle" className="hb-cta-label">
          <text x="90" y="232">Order</text>
          <text x="202" y="232">AI layer</text>
          <text x="318" y="232">Bill</text>
          <text x="430" y="232">Ledger</text>
        </g>

        {/* status log */}
        <g fontSize="12" fill="#fff" className="hb-cta-log">
          <rect x="62" y="248" width="396" height="34" rx="12" fill="#1b1b1b" />
          <Check cx={82} cy={265} />
          <text x="98" y="269">Bill #4 sent to Charlie</text>

          <rect x="62" y="290" width="396" height="34" rx="12" fill="#1b1b1b" />
          <Check cx={82} cy={307} />
          <text x="98" y="311">Ledger updated</text>
          <text x="446" y="311" fill="#ffffff88" textAnchor="end">+ Rs 70,000</text>

          <rect x="62" y="332" width="396" height="34" rx="12" fill="#1b1b1b" />
          <circle cx="82" cy="349" r="7" fill="#ff6a3d" />
          <text x="82" y="353" fontSize="10" fontWeight="700" textAnchor="middle">!</text>
          <text x="98" y="353">Stock: 2 left, reorder soon</text>
        </g>
      </g>

      <g className="hb-float-r" style={{ animationDelay: '-1.5s' }}>
        <rect x="372" y="22" width="170" height="60" rx="30" fill="#fff" />
        <circle cx="404" cy="52" r="15" fill="#ff6a3d" />
        <path d="M398 47h12v8h-6l-4 3v-3h-2z" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
        <text x="428" y="48" fill="#080808" fontSize="13" fontWeight="700">Order received</text>
        <text x="428" y="64" fill="#08080088" fontSize="10.5">via chat</text>
      </g>

      <g className="hb-float" style={{ animationDelay: '-3s' }}>
        <rect x="6" y="380" width="184" height="86" rx="22" fill="#ff6a3d" />
        <text x="26" y="414" fill="#fff" fontSize="14" fontWeight="600">Bill sent</text>
        <text x="26" y="444" fill="#fff" fontSize="22" fontWeight="700">PDF · #4</text>
      </g>
    </svg>
  )
}

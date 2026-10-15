/**
 * Three 478x270 illustrations that tell one story: a single order's journey through a small business.
 * The same cast appears in every chapter (customer message, order tag, coral thread, chapter dots),
 * so the three cards read as one continuous scene.
 */

const THREAD_Y = 135

const Frame = ({ children, id, chapter, title, caption }) => (
  <svg viewBox="0 0 478 270" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
    <defs>
      <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#2a2a2a" />
        <stop offset="1" stopColor="#1c1c1c" />
      </linearGradient>
    </defs>
    <rect width="478" height="270" fill={`url(#${id}-bg)`} />
    <g stroke="#ffffff10" strokeWidth="1">
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 44} y1="0" x2={i * 44} y2="270" />
      ))}
      {Array.from({ length: 7 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 44} x2="478" y2={i * 44} />
      ))}
    </g>

    {/* the coral thread: enters at the left edge and leaves at the right edge, at the same height in every chapter */}
    <path d={`M0 ${THREAD_Y}H478`} stroke="#ff6a3d" strokeWidth="2.4" strokeDasharray="6 7" opacity=".85" style={{ animation: 'hb-dash 6s linear infinite' }} />

    {children}

    {/* chapter chip, caption and progress dots */}
    <g transform="translate(16 14)">
      <rect width={title.length * 6.4 + 98} height="22" rx="11" fill="#00000066" stroke="#ffffff26" />
      <text x="12" y="15" fill="#ff6a3d" fontSize="10" fontWeight="700">CHAPTER {chapter}</text>
      <text x="86" y="15" fill="#fff" fontSize="10" fontWeight="600">{title}</text>
    </g>
    <text x="16" y="256" fill="#a3a3a3" fontSize="11">{caption}</text>
    {[1, 2, 3].map((n) => (
      <circle key={n} cx={426 + n * 14} cy="252" r={n === chapter ? 4.6 : 3.4} fill={n === chapter ? '#ff6a3d' : '#ffffff33'} />
    ))}
  </svg>
)

/** The recurring order tag that travels along the thread. */
const Token = ({ label, solid = true, dur = '7s', begin = '0s' }) => (
  <g>
    <rect x="-24" y="-11" width="48" height="22" rx="11" fill={solid ? '#ff6a3d' : '#1c1c1c'} stroke="#ff6a3d" strokeWidth="2" strokeDasharray={solid ? undefined : '4 3'} />
    <text y="4" textAnchor="middle" fill="#fff" fontSize="10.5" fontWeight="700">{label}</text>
    <animateMotion dur={dur} begin={begin} repeatCount="indefinite" path={`M-40 ${THREAD_Y}H520`} />
  </g>
)

const lines = (x, y, widths, fill = '#08080866', gap = 11) =>
  widths.map((w, i) => <rect key={i} x={x} y={y + i * gap} width={w} height="5" rx="2.5" fill={fill} />)

/* Chapter 1 — Idea & Prototype: the mess, and a sketch of the fix */
export function StageIdea() {
  return (
    <Frame id="st1" chapter={1} title="The mess" caption="Monday 9:00. Orders in chats, stock in a sheet, calls missed.">
      {/* scattered chat bubbles */}
      <g className="hb-float-r">
        <g transform="translate(26 50) rotate(-7)">
          <rect width="96" height="38" rx="12" fill="#f2f2f2" />
          {lines(12, 11, [58, 40])}
          <circle cx="90" cy="2" r="9" fill="#ff4d4d" />
          <text x="90" y="6" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">?</text>
        </g>
      </g>
      <g className="hb-float" style={{ animationDelay: '-1.5s' }}>
        <g transform="translate(86 92) rotate(5)">
          <rect width="104" height="38" rx="12" fill="#e4e4e4" />
          {lines(12, 11, [66, 46])}
        </g>
      </g>
      <g className="hb-float-r" style={{ animationDelay: '-3s' }}>
        <g transform="translate(30 150) rotate(-4)">
          <rect width="92" height="38" rx="12" fill="#f2f2f2" />
          {lines(12, 11, [54, 38])}
        </g>
      </g>
      {/* spreadsheet + missed calls */}
      <g transform="translate(136 150)">
        <rect width="78" height="58" rx="8" fill="#141414" stroke="#ffffff26" />
        {[1, 2, 3].map((i) => (
          <line key={i} x1="0" y1={i * 14.5} x2="78" y2={i * 14.5} stroke="#ffffff22" />
        ))}
        {[1, 2].map((i) => (
          <line key={i} x1={i * 26} y1="0" x2={i * 26} y2="58" stroke="#ffffff22" />
        ))}
        <text x="6" y="-6" fill="#737373" fontSize="9">stock.xlsx</text>
      </g>
      <g transform="translate(30 206)">
        <g className="hb-box" style={{ animation: 'hb-pop 6s ease-in-out infinite' }}>
          <rect width="106" height="24" rx="12" fill="#ff4d4d22" stroke="#ff4d4d" />
          <text x="53" y="16" textAnchor="middle" fill="#ff8a8a" fontSize="10.5" fontWeight="600">3 missed calls</text>
        </g>
      </g>

      {/* the sketch of the fix: Chat → Bill → Ledger, drawn as a dashed prototype */}
      <g transform="translate(262 62)">
        <rect width="196" height="146" rx="18" fill="#161616" stroke="#fff" strokeWidth="2.2" strokeDasharray="7 6" className="animate-[hb-dash_9s_linear_infinite]" />
        {['Chat', 'Bill', 'Ledger'].map((t, i) => (
          <g key={t} transform={`translate(${14 + i * 62} 22)`}>
            <rect width="52" height="34" rx="9" fill="none" stroke="#ffffffaa" strokeWidth="1.8" />
            <text x="26" y="21" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600">{t}</text>
          </g>
        ))}
        {[0, 1].map((i) => (
          <path key={i} d={`M${67 + i * 62} 39h9m-4-4 4 4-4 4`} stroke="#ff6a3d" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        ))}
        <rect x="14" y="76" width="130" height="6" rx="3" fill="#ffffff44" />
        <rect x="14" y="92" width="96" height="6" rx="3" fill="#ffffff2e" />
        <rect x="14" y="108" width="112" height="6" rx="3" fill="#ffffff2e" />
        <g transform="translate(150 96) rotate(5)" className="hb-float">
          <rect width="38" height="32" rx="5" fill="#ffb8e0" />
          <text x="19" y="21" textAnchor="middle" fontSize="11" fontWeight="700" fill="#08080899">Test?</text>
        </g>
      </g>
      <Token label="order?" solid={false} />
    </Frame>
  )
}

/* Chapter 2 — First Release: the same order, handled */
export function StageMvp() {
  return (
    <Frame id="st2" chapter={2} title="Live" caption="Same Monday. The bot takes the order, sends the bill, updates the ledger.">
      {/* the customer */}
      <g transform="translate(16 74)">
        <circle cx="16" cy="-12" r="9" fill="#88c0fc" />
        <rect y="0" width="118" height="46" rx="14" fill="#f2f2f2" />
        {lines(14, 13, [72, 50])}
        <text x="2" y="-26" fill="#737373" fontSize="9">Customer</text>
      </g>
      {/* the bot, in a phone */}
      <g transform="translate(150 34)"><g className="hb-float">
        <rect width="104" height="196" rx="20" fill="#0e0e0e" stroke="#ffffff30" strokeWidth="2.2" />
        <rect x="34" y="8" width="36" height="5" rx="2.5" fill="#ffffff22" />
        <g transform="translate(10 26)">
          <rect x="30" width="64" height="26" rx="9" fill="#6657ff" />
          {lines(38, 8, [40, 28], '#ffffffcc', 8)}
          <rect y="36" width="72" height="30" rx="9" fill="#262626" />
          {lines(8, 45, [46, 34], '#ffffff99', 8)}
          <circle cx="82" cy="52" r="8" fill="#3ecf6e" />
          <path d="m78 52 3 3 5-6" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <rect y="76" width="60" height="22" rx="9" fill="#262626" />
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={18 + i * 12} cy="87" r="2.8" fill="#ffffffcc" style={{ animation: `hb-blink 1.2s ${i * 0.18}s infinite` }} />
          ))}
        </g>
        <rect x="10" y="164" width="84" height="20" rx="10" fill="#ffffff12" />
      </g></g>
      {/* the bill and the ledger */}
      <g transform="translate(284 40) rotate(2)"><g className="hb-float-r">
        <rect width="150" height="86" rx="10" fill="#fff" />
        <rect width="150" height="20" rx="10" fill="#ff6a3d" />
        <rect y="10" width="150" height="10" fill="#ff6a3d" />
        <text x="12" y="14" fill="#fff" fontSize="10" fontWeight="700">PDF bill</text>
        {lines(12, 34, [92, 70, 80], '#08080833', 10)}
        <text x="138" y="76" textAnchor="end" fill="#080808" fontSize="12" fontWeight="700">Rs 70,000</text>
      </g></g>
      <g transform="translate(284 150)">
        <rect width="150" height="52" rx="12" fill="#141414" stroke="#ffffff26" strokeWidth="1.6" />
        <text x="12" y="20" fill="#737373" fontSize="10">Customer ledger</text>
        <text x="12" y="40" fill="#3ecf6e" fontSize="15" fontWeight="700">+ Rs 70,000</text>
        <circle cx="130" cy="30" r="10" fill="#3ecf6e" className="hb-box" style={{ animation: 'hb-pop 6s ease-in-out infinite' }} />
        <path d="m125 30 4 4 7-8" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <Token label="#42" />
    </Frame>
  )
}

/* Chapter 3 — Scale-Up: the same order flowing through connected systems */
export function StageScale() {
  const node = (x, y, label, color) => (
    <g transform={`translate(${x} ${y})`}>
      <rect width="92" height="32" rx="16" fill="#141414" stroke="#ffffff30" strokeWidth="1.6" />
      <circle cx="18" cy="16" r="6" fill={color} />
      <text x="32" y="20" fill="#fff" fontSize="11" fontWeight="600">{label}</text>
    </g>
  )
  const link = (d, begin) => (
    <g>
      <path d={d} stroke="#ffffff30" strokeWidth="1.8" fill="none" />
      <circle r="3.4" fill="#88c0fc">
        <animateMotion dur="3.6s" begin={begin} repeatCount="indefinite" path={d} />
      </circle>
    </g>
  )
  return (
    <Frame id="st3" chapter={3} title="Connected" caption="Next quarter. Stock, couriers and suppliers move on their own.">
      {link('M104 78C150 78 170 100 205 118', '0s')}
      {link('M104 196C150 196 170 168 205 150', '0.9s')}
      {link('M372 78C326 78 306 100 273 118', '1.8s')}
      {link('M372 196C326 196 306 168 273 150', '2.7s')}

      {node(14, 62, 'Online store', '#88c0fc')}
      {node(14, 180, 'Stock', '#ffb8e0')}
      {node(372, 62, 'Couriers', '#3ecf6e')}
      {node(372, 180, 'Suppliers', '#ffd84d')}

      {/* the AI layer at the centre */}
      <g transform="translate(239 135)">
        <circle r="36" fill="#6657ff22" className="hb-box" style={{ animation: 'hb-pulse 3s ease-out infinite' }} />
        <circle r="30" fill="#141414" stroke="#ffffff30" strokeWidth="2" />
        <path d="M0 -17a17 17 0 1 0 16 11" stroke="#fff" strokeWidth="4.6" strokeLinecap="round" fill="none" />
        <circle r="4" fill="#ff6a3d" />
        <circle cx="14" cy="-12" r="3.2" fill="#fff" />
      </g>

      {/* forecast and approval */}
      <g transform="translate(168 204)">
        <rect width="142" height="40" rx="12" fill="#141414" stroke="#ffffff26" strokeWidth="1.6" />
        <text x="10" y="16" fill="#737373" fontSize="9">Stock forecast</text>
        <path d="M10 33 32 28l20 4 22-12 20 6 24-14 14-2" stroke="#3ecf6e" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="200" style={{ animation: 'hb-dash 5s linear infinite' }} />
      </g>
      <g transform="translate(190 48)"><g className="hb-float">
        <rect width="98" height="24" rx="12" fill="#fff" />
        <circle cx="14" cy="12" r="7" fill="#3ecf6e" />
        <path d="m11 12 2.4 2.4 4.4-5" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="28" y="16" fill="#080808" fontSize="10.5" fontWeight="700">Auto-approved</text>
      </g></g>
      <Token label="#42 ✓" />
    </Frame>
  )
}

export const STAGE_ART = [StageIdea, StageMvp, StageScale]

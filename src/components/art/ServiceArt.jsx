import { AudioLines, Bot, CalendarCheck, Check, Headphones, MessageCircle, Mic, Phone } from 'lucide-react'

/** Illustrations for the six service cards. Pure inline SVG; loops are CSS transform/opacity only. */

const pill = (x, y, w, label, fill = '#1b1b1b', color = '#fff', stroke = '#ffffff26') => (
  <g transform={`translate(${x} ${y})`}>
    <rect width={w} height="38" rx="19" fill={fill} stroke={stroke} strokeWidth="2" />
    <text x={w / 2} y="25" textAnchor="middle" fill={color} fontSize="15" fontWeight="600">{label}</text>
  </g>
)

/* 1 — AI Business Automation: systems orbit an AI core → connect → forecast → approve */
export function AutomationArt() {
  return (
    <svg viewBox="0 0 553 420" className="h-full w-full" preserveAspectRatio="xMidYMax meet" fill="none" aria-hidden>
      <defs>
        <radialGradient id="sa-core" cx=".35" cy=".3" r=".9">
          <stop offset="0" stopColor="#a98bff" />
          <stop offset="1" stopColor="#5a2cff" />
        </radialGradient>
      </defs>
      {[78, 128, 182].map((r, i) => (
        <circle key={r} cx="276" cy="226" r={r} stroke="#ffffff1c" strokeWidth="1.6" strokeDasharray={i === 1 ? '3 9' : undefined} />
      ))}
      <g className="hb-spin" style={{ animationDuration: '26s', transformOrigin: '276px 226px', transformBox: 'view-box' }}>
        <circle cx="276" cy="44" r="9" fill="#ff6a3d" />
        <circle cx="458" cy="226" r="6" fill="#88c0fc" />
        <circle cx="94" cy="226" r="7" fill="#ffb8e0" />
      </g>
      <g className="hb-spin-rev" style={{ animationDuration: '38s', transformOrigin: '276px 226px', transformBox: 'view-box' }}>
        <circle cx="276" cy="98" r="5" fill="#fff" />
        <circle cx="404" cy="226" r="8" fill="#6657ff" />
      </g>
      <path d="M118 150C160 96 232 84 276 98" stroke="#ff6a3d" strokeWidth="2.4" strokeDasharray="7 8" style={{ animation: 'hb-dash 5s linear infinite' }} />
      <path d="M330 100c64 6 104 40 112 76" stroke="#88c0fc" strokeWidth="2.4" strokeDasharray="7 8" style={{ animation: 'hb-dash 5s linear infinite' }} />
      <path d="M432 262c-20 52-76 86-142 80" stroke="#ffb8e0" strokeWidth="2.4" strokeDasharray="7 8" style={{ animation: 'hb-dash 5s linear infinite' }} />
      <g className="hb-float-r">
        <circle cx="276" cy="226" r="54" fill="url(#sa-core)" />
        <circle cx="276" cy="226" r="34" stroke="#fff" strokeWidth="3" />
        <circle cx="276" cy="226" r="16" stroke="#fff" strokeWidth="3" />
        <circle cx="276" cy="226" r="5" fill="#fff" />
      </g>
      <g className="hb-float">{pill(40, 140, 112, 'Connect', '#ff6a3d', '#fff', '#ff6a3d')}</g>
      <g className="hb-float-r" style={{ animationDelay: '-2s' }}>{pill(394, 134, 116, 'Forecast')}</g>
      <g className="hb-float" style={{ animationDelay: '-4s' }}>{pill(214, 352, 116, 'Approve', '#fff', '#080808', '#fff')}</g>
    </svg>
  )
}

/* 2 — AI Voice Agents: marquee of voice / chat / booking tiles */
const tile = (children, bg) => (
  <svg viewBox="0 0 120 120" className="block w-[8.2rem] flex-none rounded-[1rem]" aria-hidden>
    <rect width="120" height="120" fill={bg} />
    {children}
  </svg>
)
const icon = (Icon, color) => <Icon x={30} y={30} width={60} height={60} color={color} strokeWidth={1.8} />

const TILES = [
  () => tile(icon(Mic, '#fff'), '#161616'),
  () => tile(icon(AudioLines, '#fff'), '#ff6a3d'),
  () => tile(icon(MessageCircle, '#fff'), '#6657ff'),
  () => tile(icon(Phone, '#080808'), '#d9d9d9'),
  () => tile(icon(CalendarCheck, '#080808'), '#ffb8e0'),
  () => tile(icon(Bot, '#fff'), '#1f1f1f'),
  () => tile(icon(Headphones, '#fff'), '#1b76ff'),
  () => tile(icon(Check, '#080808'), '#f3ead6'),
]

export function VoiceMarquee() {
  const row = (order, dir) => (
    <div className="flex w-max gap-[.6rem] will-change-transform hover:[animation-play-state:paused]" style={{ animation: `${dir} 36s linear infinite` }}>
      {[...order, ...order].map((i, k) => (
        <div key={k} className="flex-none">{TILES[i]()}</div>
      ))}
    </div>
  )
  return (
    <div className="flex flex-col gap-[.5rem] overflow-hidden">
      {row([0, 1, 2, 3, 4, 5, 6, 7], 'hb-marquee-l')}
      {row([4, 3, 7, 6, 1, 0, 5, 2], 'hb-marquee-r')}
    </div>
  )
}

/* 3 — Platforms: layered dashboard */
export function PlatformArt() {
  return (
    <svg viewBox="0 0 553 330" className="h-full w-full" preserveAspectRatio="xMidYMax meet" fill="none" aria-hidden>
      <g className="hb-float">
        <rect x="74" y="34" width="404" height="246" rx="20" fill="#161616" stroke="#ffffff26" strokeWidth="2" />
        <rect x="74" y="34" width="92" height="246" rx="20" fill="#0f0f0f" />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x="90" y={58 + i * 34} width="18" height="18" rx="6" fill={i === 0 ? '#6657ff' : '#ffffff22'} />
            <rect x="116" y={63 + i * 34} width="36" height="7" rx="3.5" fill={i === 0 ? '#fff' : '#ffffff44'} />
          </g>
        ))}
        <rect x="184" y="54" width="130" height="64" rx="14" fill="#1d1d1d" />
        <text x="198" y="84" fill="#fff" fontSize="22" fontWeight="700">Users</text>
        <text x="198" y="104" fill="#737373" fontSize="11">monthly users</text>
        <rect x="324" y="54" width="136" height="64" rx="14" fill="#1d1d1d" />
        <text x="338" y="84" fill="#3ecf6e" fontSize="22" fontWeight="700">Retention</text>
        <text x="338" y="104" fill="#737373" fontSize="11">retention</text>
        <rect x="184" y="132" width="276" height="130" rx="14" fill="#1d1d1d" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <rect
            key={i}
            x={202 + i * 28}
            y="150"
            width="16"
            height="96"
            rx="6"
            fill={i === 6 ? '#ff6a3d' : '#6657ff'}
            opacity={i === 6 ? 1 : 0.55}
            className="hb-box"
            style={{ animation: `hb-bar ${2.2 + (i % 4) * 0.45}s ease-in-out ${i * 0.18}s infinite`, transformOrigin: 'bottom', transformBox: 'fill-box' }}
          />
        ))}
      </g>
      <g className="hb-float-r" style={{ animationDelay: '-2s' }}>
        <rect x="18" y="176" width="110" height="68" rx="16" fill="#ff6a3d" />
        <text x="34" y="206" fill="#fff" fontSize="13" fontWeight="600">API · Auth</text>
        <text x="34" y="228" fill="#ffe6df" fontSize="11">Uptime checks</text>
      </g>
      <g className="hb-float" style={{ animationDelay: '-4s' }}>
        <rect x="424" y="10" width="118" height="46" rx="23" fill="#fff" />
        <circle cx="448" cy="33" r="12" fill="#3ecf6e" />
        <path d="m443 33 4 4 7-8" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <text x="468" y="38" fill="#080808" fontSize="13" fontWeight="700">Deployed</text>
      </g>
    </svg>
  )
}

/* Development: editor + terminal + git */
const tokenColors = ['#c792ea', '#82aaff', '#c3e88d', '#f78c6c', '#ffcb6b', '#89ddff']
export function DevArt() {
  const lines = [
    [0, 0, [60, 90, 40]],
    [1, 1, [90, 50]],
    [2, 1, [40, 120, 60]],
    [3, 2, [70, 80]],
    [4, 2, [110, 40, 50]],
    [5, 1, [50, 100]],
    [6, 0, [80]],
    [7, 0, [60, 60, 90]],
    [8, 1, [120, 40]],
  ]
  return (
    <svg viewBox="0 0 553 400" className="h-full w-full" preserveAspectRatio="xMidYMax meet" fill="none" aria-hidden>
      <g className="hb-float">
        <rect x="22" y="14" width="360" height="270" rx="18" fill="#141414" stroke="#ffffff26" strokeWidth="2" />
        <rect x="22" y="14" width="360" height="36" rx="18" fill="#1b1b1b" />
        <circle cx="46" cy="32" r="5" fill="#ff6a3d" />
        <circle cx="64" cy="32" r="5" fill="#ffc13b" />
        <circle cx="82" cy="32" r="5" fill="#3ecf6e" />
        <text x="140" y="36" fill="#737373" fontSize="12">product.tsx</text>
        {lines.map(([i, indent, toks]) => {
          let x = 70 + indent * 22
          return (
            <g key={i}>
              <text x="40" y={80 + i * 22} fill="#ffffff33" fontSize="11">{i + 1}</text>
              {toks.map((w, k) => {
                const el = (
                  <rect
                    key={k}
                    x={x}
                    y={72 + i * 22}
                    width={w}
                    height="9"
                    rx="4.5"
                    fill={tokenColors[(i + k) % tokenColors.length]}
                    opacity=".9"
                    className="hb-box"
                    style={{ transformOrigin: 'left', transformBox: 'fill-box', animation: `hb-line 9s ease-out ${(i * 0.45 + k * 0.12).toFixed(2)}s infinite` }}
                  />
                )
                x += w + 8
                return el
              })}
            </g>
          )
        })}
        <rect x="70" y="274" width="2" height="0" fill="#fff" />
        <rect x="260" y="224" width="2.6" height="14" fill="#fff" style={{ animation: 'hb-blink 1s steps(1) infinite' }} />
      </g>
      <g className="hb-float-r" style={{ animationDelay: '-2.5s' }}>
        <rect x="330" y="210" width="206" height="150" rx="16" fill="#0c0c0c" stroke="#ffffff26" strokeWidth="2" />
        <text x="348" y="238" fill="#3ecf6e" fontSize="12" fontWeight="600">✓ build passed</text>
        <text x="348" y="260" fill="#737373" fontSize="12">✓ tests passed</text>
        <text x="348" y="282" fill="#737373" fontSize="12">✓ performance checked</text>
        <text x="348" y="312" fill="#ff6a3d" fontSize="12" fontWeight="600">→ deploying…</text>
        <rect x="348" y="324" width="170" height="6" rx="3" fill="#ffffff1c" />
        <rect x="348" y="324" width="170" height="6" rx="3" fill="#ff6a3d" className="hb-box" style={{ transformOrigin: 'left', transformBox: 'fill-box', animation: 'hb-progress 4.5s ease-in-out infinite' }} />
      </g>
      <g transform="translate(404 40)" className="hb-float" style={{ animationDelay: '-1s' }}>
        <path d="M20 0v150" stroke="#ffffff33" strokeWidth="3" />
        <path d="M20 40c40 0 40 30 40 56" stroke="#6657ff" strokeWidth="3" fill="none" />
        {[0, 40, 96, 150].map((y, i) => (
          <circle key={y} cx={i === 2 ? 60 : 20} cy={i === 2 ? 96 : y} r="8" fill={['#fff', '#ff6a3d', '#6657ff', '#3ecf6e'][i]} stroke="#080808" strokeWidth="3" />
        ))}
        <text x="78" y="100" fill="#fff" fontSize="12" fontWeight="600">feat/launch</text>
      </g>
    </svg>
  )
}

/* 7 — Chatbots: a chat that fills in message by message */
export function ChatbotArt() {
  const bubble = (x, y, w, h, fill, delay, lines, textFill = '#ffffff99') => (
    <g style={{ animation: `hb-slide-in 9s ease-in-out ${delay}s infinite` }}>
      <rect x={x} y={y} width={w} height={h} rx="22" fill={fill} />
      {lines.map((lw, i) => (
        <rect key={i} x={x + 22} y={y + 20 + i * 18} width={lw} height="8" rx="4" fill={textFill} />
      ))}
    </g>
  )
  return (
    <svg viewBox="0 0 553 420" className="h-full w-full" preserveAspectRatio="xMidYMax meet" fill="none" aria-hidden>
      <rect x="146" y="12" width="261" height="396" rx="40" fill="#141414" stroke="#ffffff26" strokeWidth="2" />
      <rect x="226" y="26" width="101" height="10" rx="5" fill="#ffffff1f" />
      {bubble(170, 62, 150, 62, '#262626', 0, [100, 70])}
      {bubble(244, 140, 140, 62, '#6657ff', 1.2, [96, 62], '#ffffffcc')}
      {bubble(170, 218, 176, 80, '#262626', 2.4, [124, 100, 72])}
      <g style={{ animation: 'hb-slide-in 9s ease-in-out 3.6s infinite' }}>
        <rect x="244" y="314" width="140" height="46" rx="22" fill="#ff6a3d" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={288 + i * 20} cy="337" r="5" fill="#fff" style={{ animation: `hb-blink 1.2s ease-in-out ${i * 0.18}s infinite` }} />
        ))}
      </g>
      <rect x="166" y="360" width="221" height="32" rx="16" fill="#ffffff12" />
      <g className="hb-float">{pill(14, 96, 112, 'Orders', '#1b1b1b')}</g>
      <g className="hb-float-r" style={{ animationDelay: '-2s' }}>{pill(428, 196, 112, 'Ledger', '#fff', '#080808', '#fff')}</g>
      <g className="hb-float" style={{ animationDelay: '-4s' }}>{pill(22, 300, 104, 'Bills', '#6657ff', '#fff', '#6657ff')}</g>
    </svg>
  )
}

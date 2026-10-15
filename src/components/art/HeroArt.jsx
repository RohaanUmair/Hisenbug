import { useId } from 'react'
import { motion, useTransform } from 'framer-motion'

/**
 * Floating cards around the hero showreel, telling two product stories:
 *  left  - the AI Voice Agent on a call (transcript + microphone)
 *  right - an EzKhata order moving to a bill, the ledger and stock
 * Each card is sized by its container width (cqw units), so one design scales from tablet to desktop.
 * Content is illustrative product UI (example conversation and order), not performance data.
 */

// px measurements from the card's design width -> container-query units
const scale = (base) => (px) => `${((px / base) * 100).toFixed(3)}cqw`

const glass = (u, radius = 18) => ({
  borderRadius: u(radius),
  background: 'linear-gradient(to bottom, #232323, #121212)',
  border: '1px solid rgba(255,255,255,.15)',
  boxShadow: `0 ${u(8)} ${u(22)} rgba(0,0,0,.45)`,
})

function Bubble({ u, side = 'in', children, max = '84%' }) {
  const mine = side === 'out'
  return (
    <div
      style={{
        alignSelf: mine ? 'flex-end' : 'flex-start',
        maxWidth: max,
        padding: `${u(7)} ${u(10)}`,
        borderRadius: mine ? `${u(12)} ${u(12)} ${u(4)} ${u(12)}` : `${u(12)} ${u(12)} ${u(12)} ${u(4)}`,
        background: mine ? '#6657ff' : 'rgba(255,255,255,.09)',
        border: mine ? 'none' : '1px solid rgba(255,255,255,.08)',
      }}
    >
      {children}
    </div>
  )
}

/* A - live call transcript */
export function TranscriptCard() {
  const u = scale(236)
  return (
    <div className="w-full [container-type:inline-size]">
      <div style={{ ...glass(u), padding: u(14) }}>
        <div className="flex items-center justify-between" style={{ marginBottom: u(11) }}>
          <span className="font-semibold text-white" style={{ fontSize: u(13) }}>Transcript</span>
          <span className="rounded-full bg-orange font-bold leading-none text-white" style={{ fontSize: u(10.5), padding: `${u(4)} ${u(9)}` }}>AI</span>
        </div>
        <div className="flex flex-col text-white" style={{ gap: u(7), fontSize: u(11), lineHeight: 1.35 }}>
          <Bubble u={u} max="82%">Is the 3-bed still available?</Bubble>
          <Bubble u={u} side="out" max="86%">Yes. Would Thursday at 4 work for a viewing?</Bubble>
          <Bubble u={u} max="70%">Thursday works.</Bubble>
        </div>
      </div>
    </div>
  )
}

/* A - microphone with listening ripples */
export function MicOrb() {
  return (
    <svg viewBox="0 0 70 70" className="w-full overflow-visible" fill="none" aria-hidden>
      <circle cx="35" cy="35" r="26" stroke="#6657ff" strokeWidth="2" className="hb-box" style={{ animation: 'hb-pulse 2.6s ease-out infinite' }} />
      <circle cx="35" cy="35" r="26" stroke="#6657ff" strokeWidth="2" className="hb-box" style={{ animation: 'hb-pulse 2.6s ease-out 1.3s infinite' }} />
      <circle cx="35" cy="35" r="22" fill="#141414" stroke="#ffffff33" strokeWidth="1.5" />
      <g stroke="#fff" strokeWidth="2.4" strokeLinecap="round">
        <rect x="30.5" y="23" width="9" height="15" rx="4.5" />
        <path d="M26 33a9 9 0 0 0 18 0M35 42v4" />
      </g>
    </svg>
  )
}

/* B - an order arriving by chat and the bot's reply */
export function OrdersChatCard() {
  const u = scale(252)
  return (
    <div className="w-full [container-type:inline-size]">
      <div style={{ ...glass(u), padding: u(14) }}>
        <div className="flex items-center text-white" style={{ gap: u(8), marginBottom: u(11) }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" style={{ width: u(22) }} aria-hidden>
            <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4A1.5 1.5 0 0 1 4 14.5z" />
          </svg>
          <span className="font-semibold" style={{ fontSize: u(13) }}>Orders chat</span>
          <span className="ml-auto text-white/55" style={{ fontSize: u(10.5) }}>now</span>
        </div>
        <div className="flex flex-col text-white" style={{ gap: u(7), fontSize: u(11), lineHeight: 1.35 }}>
          <Bubble u={u} max="86%">2 washing machines for Charlie</Bubble>
          <Bubble u={u} side="out" max="88%">Order confirmed. Bill #4 sent ✓</Bubble>
        </div>
      </div>
    </div>
  )
}

/* B - ledger entry written after the sale */
export function LedgerPill() {
  const u = scale(212)
  return (
    <div className="w-full [container-type:inline-size]">
      <div
        className="flex items-center rounded-full bg-[#141414] text-white"
        style={{ gap: u(11), padding: `${u(8)} ${u(16)} ${u(8)} ${u(8)}`, border: `${u(2)} solid rgba(255,255,255,.13)`, boxShadow: `0 ${u(8)} ${u(22)} rgba(0,0,0,.45)` }}
      >
        <div className="grid flex-none place-items-center bg-violet" style={{ width: u(40), height: u(40), borderRadius: u(12) }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: u(20) }} aria-hidden>
            <path d="M5 4h11l3 3v13H5z" />
            <path d="M8.5 10h7M8.5 14h7M8.5 18h4" />
          </svg>
        </div>
        <div className="leading-none">
          <div className="font-bold" style={{ fontSize: u(12.5) }}>Ledger updated</div>
          <div className="text-white/55" style={{ fontSize: u(10.5), marginTop: u(4) }}>Charlie · + Rs 70,000</div>
        </div>
      </div>
    </div>
  )
}

/* B - stock level after the sale */
export function StockCard() {
  const u = scale(190)
  return (
    <div className="w-full [container-type:inline-size]">
      <div className="text-white" style={{ ...glass(u), padding: u(13) }}>
        <div className="flex items-center justify-between font-semibold" style={{ fontSize: u(12) }}>
          Stock
          <span className="rounded-full leading-none text-[#ff9a7a]" style={{ background: 'rgba(255,106,61,.16)', fontSize: u(10.5), padding: `${u(4)} ${u(9)}` }}>Reorder soon</span>
        </div>
        <div className="text-white/55" style={{ fontSize: u(10.5), marginTop: u(9) }}>Washing machine</div>
        <div className="flex" style={{ gap: u(4), marginTop: u(8) }}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <span key={i} className="flex-1" style={{ height: u(9), borderRadius: u(3), background: i < 2 ? '#ff6a3d' : 'rgba(255,255,255,.14)' }} />
          ))}
        </div>
        <div style={{ fontSize: u(11), marginTop: u(8) }}>
          <b>2</b> <span className="text-white/55">left</span>
        </div>
      </div>
    </div>
  )
}

/* B - faint dashed thread linking the order, ledger and stock cards */
function FlowThread() {
  return (
    <svg viewBox="30 140 130 290" className="w-full overflow-visible" fill="none" aria-hidden>
      <path d="M120 150 C 60 230, 40 260, 70 300 S 150 380, 140 420" stroke="#ffffff24" strokeWidth="2" strokeDasharray="5 7" />
    </svg>
  )
}

/* Existing phone card (kept) */
export function PhoneCard() {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 280 400" className="w-full" fill="none" aria-hidden>
      <defs>
        <linearGradient id={`ph-${id}`} gradientTransform="rotate(150 .5 .5)">
          <stop offset="0" stopColor="#7a52ff" />
          <stop offset="1" stopColor="#ff7a4d" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="272" height="392" rx="44" fill="#0e0e0e" stroke="#ffffff2a" strokeWidth="3" />
      <rect x="22" y="22" width="236" height="150" rx="30" fill={`url(#ph-${id})`} />
      <circle cx="210" cy="64" r="26" fill="#ffffff2e" />
      <rect x="40" y="52" width="92" height="14" rx="7" fill="#fff" />
      <rect x="40" y="78" width="140" height="10" rx="5" fill="#ffffffaa" />
      <rect x="40" y="124" width="84" height="32" rx="16" fill="#fff" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(0 ${i * 62})`}>
          <rect x="22" y="192" width="236" height="52" rx="18" fill="#1a1a1a" />
          <circle cx="52" cy="218" r="14" fill={['#ff6a3d', '#6657ff', '#88c0fc'][i]} />
          <rect x="78" y="208" width="96" height="9" rx="4.5" fill="#fff" />
          <rect x="78" y="224" width="62" height="7" rx="3.5" fill="#ffffff44" />
          <rect x="214" y="212" width="30" height="12" rx="6" fill="#ffffff22" />
        </g>
      ))}
    </svg>
  )
}

// Desktop/tablet placement inside the hero (vw-based, so the layout scales uniformly at 768px+).
// depth = mouse-parallax travel; neighbouring depths are kept close so idle floats never touch.
const ITEMS = [
  { key: 'transcript', node: <TranscriptCard />, depth: 24, cls: 'left-[3.05vw] top-[8.9vw] w-[16.4vw]', z: 3, float: 'hb-float' },
  { key: 'mic', node: <MicOrb />, depth: 30, cls: 'left-[8.75vw] top-[24.45vw] w-[4.86vw]', z: 3 },
  { key: 'phone', node: <PhoneCard />, depth: 40, cls: 'left-[15rem] top-[27.3vw] w-[12vw]', z: 12, float: 'hb-float' },
  { key: 'thread', node: <FlowThread />, depth: 22, cls: 'right-[14.17vw] top-[18.61vw] w-[9.03vw]', z: 1 },
  { key: 'chat', node: <OrdersChatCard />, depth: 18, cls: 'right-[1.94vw] top-[6.94vw] w-[17.5vw]', z: 4, float: 'hb-float-r' },
  { key: 'ledger', node: <LedgerPill />, depth: 20, cls: 'right-[9.3vw] top-[22.92vw] w-[14.72vw]', z: 2, float: 'hb-float' },
  { key: 'stock', node: <StockCard />, depth: 26, cls: 'right-[9.58vw] top-[35.69vw] w-[13.19vw]', z: 2, float: 'hb-float-r' },
]

function Floater({ item, index, mx, my, rotateX, rotateY }) {
  const x = useTransform(mx, (v) => v * item.depth * -1)
  const y = useTransform(my, (v) => v * item.depth * -1)
  // tilt grows with depth so nearer cards lean a little more
  const tilt = item.depth / 35
  const rotX = useTransform(rotateX, (v) => (v || 0) * tilt)
  const rotY = useTransform(rotateY, (v) => (v || 0) * tilt)

  return (
    <motion.div
      className={`absolute will-change-transform ${item.cls}`}
      style={{ x, y, rotateX: rotX, rotateY: rotY, transformPerspective: 1200, zIndex: item.z }}
    >
      <div className={item.float || ''} style={item.float ? { animationDelay: `${(index + 1) * -0.9}s` } : undefined}>
        {item.node}
      </div>
    </motion.div>
  )
}

export default function HeroArt({ mx, my, rotateX, rotateY }) {
  return (
    <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden>
      {ITEMS.map((item, i) => (
        <Floater key={item.key} item={item} index={i} mx={mx} my={my} rotateX={rotateX} rotateY={rotateY} />
      ))}
    </div>
  )
}

/** Mobile strip: one card per story on each side, plus the phone card. */
export function HeroArtMobile() {
  // Sized in container units (capped at 30rem) so the cards grow with the phone width and stay legible.
  return (
    <div className="pointer-events-none relative mx-auto mt-[2rem] aspect-[100/58.6] w-full max-w-[30rem] [container-type:inline-size] md:hidden" aria-hidden>
      <div className="absolute left-[2.44cqw] top-0 w-[44cqw] hb-float"><TranscriptCard /></div>
      <div className="absolute left-[4.39cqw] top-[41.5cqw] w-[45.9cqw] hb-float-r" style={{ animationDelay: '-2s' }}><LedgerPill /></div>
      <div className="absolute right-[2.44cqw] top-[1.46cqw] w-[44.9cqw] hb-float-r" style={{ animationDelay: '-1s' }}><OrdersChatCard /></div>
      <div className="absolute right-[9.28cqw] top-[32.2cqw] w-[18.55cqw] hb-float" style={{ animationDelay: '-3s' }}><PhoneCard /></div>
    </div>
  )
}

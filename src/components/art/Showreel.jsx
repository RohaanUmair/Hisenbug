import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, motionValue, useMotionValueEvent, useTransform } from 'framer-motion'
import Logo from './Logo'
import MotionBackground from '../ui/MotionBackground'

/**
 * Hero showreel: recorded project clips (compressed, muted) plus animated vector scenes,
 * on a procedural particle background. Each scene has its own duration.
 */

function BrandScene() {
  return (
    <svg viewBox="0 0 760 400" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <radialGradient id="sr-b-bg" cx=".5" cy=".55" r=".75">
          <stop offset="0" stopColor="#2a1670" />
          <stop offset=".6" stopColor="#120a2c" />
          <stop offset="1" stopColor="#080808" />
        </radialGradient>
      </defs>
      <rect width="760" height="400" fill="url(#sr-b-bg)" />
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx="380"
          cy="190"
          r="70"
          fill="none"
          stroke="#7a72ff"
          strokeWidth="2"
          className="hb-box"
          style={{ animation: `hb-pulse 4.2s ease-out ${i * 1.4}s infinite` }}
        />
      ))}
      <circle cx="380" cy="190" r="86" fill="#101010" stroke="#ffffff22" strokeWidth="2" />
      <foreignObject x="330" y="140" width="100" height="100">
        <div className="flex h-full w-full items-center justify-center text-white">
          <Logo className="size-[78px]" />
        </div>
      </foreignObject>
      <g className="hb-spin" style={{ transformOrigin: '380px 190px', transformBox: 'view-box' }}>
        <circle cx="380" cy="80" r="9" fill="#ff6a3d" />
        <circle cx="496" cy="250" r="6" fill="#88c0fc" />
        <circle cx="270" cy="262" r="7" fill="#ffb8e0" />
      </g>
      {[['#ff6a3d', 0], ['#6657ff', 1], ['#88c0fc', 2], ['#fff', 3], ['#262626', 4]].map(([c, i]) => (
        <rect key={c} x={250 + i * 52} y="322" width="44" height="44" rx="12" fill={c} stroke="#ffffff22" strokeWidth="2" />
      ))}
      {/* labels kept inside the part of the scene that stays visible when a wider-than-4:3 frame crops its sides */}
      <text x="140" y="70" fill="#fff" fontSize="48" fontWeight="700">HisenBug</text>
      <text x="140" y="96" fill="#a3a3a3" fontSize="14">Brand identity</text>
      <text x="620" y="70" fill="#ffffff" fontSize="14" textAnchor="end" opacity=".6">#6657ff · #ff6a3d</text>
    </svg>
  )
}

/** AI automation layer: a generated base illustration, with every label drawn in code so the meaning is explicit and crisp.
    Positions are in the source image's pixel space (1672 x 941) and converted to percentages. */
const IMG_W = 1672
const IMG_H = 941
const px = (x, y) => ({ left: `${(x / IMG_W) * 100}%`, top: `${(y / IMG_H) * 100}%` })
const AUTO_LEFT = [
  { t: 'Orders', x: 98, y: 82 },
  { t: 'Messages', x: 98, y: 226 },
  { t: 'Calls', x: 98, y: 370 },
  { t: 'Business records', x: 98, y: 514 },
  { t: 'Your existing tools', x: 98, y: 652 },
]
const AUTO_RIGHT = [
  { t: 'Automated workflows', x: 1236, y: 132 },
  { t: 'Approvals', x: 1236, y: 338 },
  { t: 'Customer updates', x: 1236, y: 544 },
]
const AUTO_BENEFITS = [
  { t: 'Agentic AI', x: 706 },
  { t: 'Custom-built', x: 836 },
  { t: 'Your workflow', x: 967 },
]

function AutomationScene() {
  const chip = 'absolute whitespace-nowrap rounded-full border border-white/20 bg-black/75 px-[.9cqw] py-[.35cqw] text-[1.05cqw] font-medium leading-none text-white backdrop-blur'
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#060606]" style={{ containerType: 'size' }}>
      <div className="absolute left-1/2 top-[11cqh] aspect-[1672/941] h-[88cqh] -translate-x-1/2" style={{ containerType: 'size' }}>
        <img src="/media/automation.webp" alt="" className="absolute inset-0 h-full w-full" />

        <span className="absolute whitespace-nowrap text-[.85cqw] font-semibold uppercase tracking-[.16em] text-white/55" style={px(86, 38)}>
          Your existing systems, kept as they are
        </span>
        <span className="absolute -translate-x-full whitespace-nowrap text-[.85cqw] font-semibold uppercase tracking-[.16em] text-white/55" style={px(1595, 38)}>
          What your team gets
        </span>

        {AUTO_LEFT.map((l) => (
          <span key={l.t} className={chip} style={px(l.x, l.y)}>{l.t}</span>
        ))}
        {AUTO_RIGHT.map((l) => (
          <span key={l.t} className={`${chip} border-orange/50`} style={px(l.x, l.y)}>{l.t}</span>
        ))}

        <div className="absolute -translate-x-1/2 -translate-y-1/2 text-center leading-none" style={px(836, 415)}>
          <div className="text-[3.2cqw] font-bold text-white">AI</div>
          <div className="mt-[.5cqw] text-[1cqw] font-medium uppercase tracking-[.14em] text-white/80">automation</div>
          <div className="mt-[.25cqw] text-[1cqw] font-medium uppercase tracking-[.14em] text-white/80">layer</div>
        </div>

        {AUTO_BENEFITS.map((l) => (
          <span key={l.t} className="absolute w-[7cqw] -translate-x-1/2 text-center text-[1cqw] font-medium leading-[1.2] text-white/85" style={px(l.x, 768)}>
            {l.t}
          </span>
        ))}

        <span
          className="absolute -translate-x-1/2 whitespace-nowrap rounded-full border border-white/20 bg-black/70 px-[1.4cqw] py-[.6cqw] text-[1.3cqw] font-medium text-white backdrop-blur"
          style={px(836, 868)}
        >
          Keep your systems. We automate the gaps between them.
        </span>
      </div>
    </div>
  )
}

/** EzKhata: WhatsApp business management. Real chat screenshots (contact details blurred) in a phone, plus the PDF bill it sends. */
const EZ_POINTS = ['Billing & payment reminders', 'Expenses, employees & records', 'English, Urdu & Roman Urdu', 'PDF bills sent in chat']

function EzkhataScene() {
  return (
    <div
      className="absolute inset-0 overflow-hidden bg-[radial-gradient(ellipse_at_28%_25%,#2b1a12_0%,#0d0b0a_62%)]"
      style={{ containerType: 'size' }}
    >
      <div className="absolute left-[7cqw] top-1/2 hidden w-[30cqw] -translate-y-1/2 @lg:block">
        <span className="inline-block rounded-full border border-white/15 bg-white/5 px-[1.6cqw] py-[.7cqw] text-[1.25cqw] text-white/70">
          WhatsApp · paid subscription
        </span>
        <h3 className="mt-[1.6cqw] text-[5.6cqw] font-bold leading-none text-white">EzKhata</h3>
        <p className="mt-[1.4cqw] text-[1.75cqw] leading-[1.45] text-white/65">
          Business management, run from a WhatsApp chat.
        </p>
        <ul className="mt-[2.2cqw] flex flex-col gap-[.9cqw]">
          {EZ_POINTS.map((t) => (
            <li key={t} className="flex items-center gap-[1cqw] text-[1.5cqw] text-white/85">
              <span className="size-[.9cqw] rounded-full bg-orange" />
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute left-[8cqw] top-[12cqh] aspect-[853/1694] h-[84cqh] @lg:left-[38cqw]">
        <div className="hb-float h-full w-full rounded-[4.2cqh] border border-white/20 bg-black p-[1cqh] shadow-[0_4cqh_9cqh_rgba(0,0,0,.6)]">
          <div className="relative h-full w-full overflow-hidden rounded-[3.3cqh] bg-[#111]">
            <img src="/media/ezkhata-chat.webp" alt="" className="absolute inset-0 h-full w-full object-cover" />
            <span className="absolute left-1/2 top-[1.2cqh] h-[2cqh] w-[14cqh] -translate-x-1/2 rounded-full bg-black" />
          </div>
        </div>
      </div>

      <div className="absolute left-[44cqw] top-[24cqh] w-[48cqw] @lg:left-[calc(40cqw+44cqh)] @lg:w-[min(29cqw,calc(100cqw-45cqw-44cqh))]">
        <div className="hb-float-r overflow-hidden rounded-[1.2cqw] bg-white shadow-[0_3cqh_8cqh_rgba(0,0,0,.55)]" style={{ animationDelay: '-2s' }}>
          <img src="/media/ezkhata-bill.webp" alt="" className="block w-full" />
        </div>
        <span className="mt-[2cqw] inline-block rounded-full border border-white/15 bg-black/60 px-[1.6cqw] py-[.8cqw] text-[1.3cqw] text-white backdrop-blur">
          PDF bill, sent right in the chat
        </span>
      </div>
    </div>
  )
}

/** A recorded project clip (compressed MP4/WebM in /public/media). Plays while on screen, muted. */
function VideoScene({ name }) {
  const ref = useRef(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return undefined
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !reduced) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.2 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])
  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover object-top"
      muted
      loop
      playsInline
      preload="metadata"
      poster={`/media/${name}.jpg`}
      aria-hidden
    >
      <source src={`/media/${name}.webm`} type="video/webm" />
      <source src={`/media/${name}.mp4`} type="video/mp4" />
    </video>
  )
}

const DURATION = 4000
const SCENES = [
  { id: 'voice', label: 'AI Voice Agent', video: true, duration: 18500, node: <VideoScene name="voice-agent" /> },
  { id: 'brand', label: 'HisenBug Brand', node: <BrandScene /> },
  { id: 'automation', label: 'AI Automation Layer', node: <AutomationScene /> },
  { id: 'ezkhata', label: 'EzKhata on WhatsApp', node: <EzkhataScene /> },
]
const ZERO = motionValue(0)
const durationOf = (scene) => scene.duration || DURATION
export const SCENE_COUNT = SCENES.length

/**
 * Progress bar under the reel: fills as the scroll moves through its scene. The button is a taller, invisible
 * touch target around the thin bar; negative margins keep the bar exactly where it was.
 */
function SceneDot({ idx, active, progress, label, onClick, timed, duration }) {
  const fill = useTransform(progress, (v) => Math.min(1, Math.max(0, v * SCENES.length - idx)))
  return (
    <button
      type="button"
      aria-label={`Jump to ${label} scene`}
      aria-current={idx === active ? 'true' : undefined}
      onClick={onClick}
      className="group -my-[.625rem] flex h-[1.5rem] w-[2.4rem] cursor-pointer items-center outline-none md:-my-[1.45rem] md:h-[3.2rem] md:w-[3.2rem]"
    >
      <span className="relative block h-[.25rem] w-full overflow-hidden rounded-full bg-white/20 outline-offset-2 transition-colors group-hover:bg-white/40 group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-white md:h-[.3rem]">
        {timed ? (
          <span
            key={`${idx}-${active}`}
            className="absolute inset-0 origin-left bg-white"
            style={{
              transform: idx < active ? 'scaleX(1)' : 'scaleX(0)',
              animation: idx === active ? `hb-progress ${duration}ms linear forwards` : undefined,
            }}
          />
        ) : (
          <motion.span className="absolute inset-0 origin-left bg-white" style={{ scaleX: fill }} />
        )}
      </span>
    </button>
  )
}

/**
 * `progress` (a 0-1 motion value) makes the reel scroll-driven: the scene follows the page scroll.
 * Without it the scenes advance on a timer (mobile, where the frame is not pinned).
 */
export default function Showreel({ progress, onJump }) {
  const [i, setI] = useState(0)
  const scrollDriven = !!progress

  useEffect(() => {
    if (scrollDriven) return undefined
    const t = window.setTimeout(() => setI((v) => (v + 1) % SCENES.length), durationOf(SCENES[i]))
    return () => window.clearTimeout(t)
  }, [i, scrollDriven])

  useMotionValueEvent(progress || ZERO, 'change', (v) => {
    if (!scrollDriven) return
    setI(Math.min(SCENES.length - 1, Math.max(0, Math.floor(v * SCENES.length))))
  })

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#080808]">
      {/* 1. Underlying Procedural Particle & Wave Motion Loop */}
      {!SCENES[i].video && (
        <div className="absolute inset-0 opacity-40">
          <MotionBackground overlayOpacity="bg-ink/50" />
        </div>
      )}

      {/* 2. Vector Showreel Scenes Crossfade */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={SCENES[i].id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {SCENES[i].node}
        </motion.div>
      </AnimatePresence>

      {/* 3. Interactive Scene Switcher & Badges */}
      {/* phones: the label sits a line above the bars, which would otherwise run past the frame's right edge */}
      <div className="absolute inset-x-0 bottom-0 z-[10] flex flex-col items-start gap-[.5rem] px-[1.4rem] pb-[1.2rem] md:flex-row md:items-end md:justify-between md:gap-0 md:px-[1.6rem] md:pb-[1.4rem]">
        <span className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap rounded-full border border-white/10 bg-black/60 px-[.9rem] py-[.45rem] text-[.75rem] font-medium text-white shadow-lg backdrop-blur md:text-[.9rem]">
          Showreel — {SCENES[i].label}
        </span>
        {/* a soft dark pill behind the bars keeps them readable on light scenes; drawn outside the layout */}
        <div
          data-fab-clear
          className="relative isolate flex gap-[.4rem] self-end before:absolute before:-inset-x-[.4rem] before:-inset-y-[.3rem] before:-z-10 before:rounded-full before:bg-black/45 before:backdrop-blur md:self-auto"
        >
          {SCENES.map((sc, idx) => (
            <SceneDot
              key={sc.id}
              idx={idx}
              active={i}
              progress={progress || ZERO}
              label={sc.label}
              timed={!scrollDriven}
              duration={durationOf(sc)}
              onClick={() => (scrollDriven && onJump ? onJump(idx) : setI(idx))}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

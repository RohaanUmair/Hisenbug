import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import FillButton from '../ui/FillButton'
import { STAGES, STAGES_HEADING } from '../../data/content'
import { STAGE_ART } from '../art/StageArt'
import { useIsDesktop } from '../../hooks/useMediaQuery'

// Trigonometric parameters for the 3D rotating elliptical wheel
const ARC_STEP_DEG = 16.5 // degrees per stage along the carousel rim
const ELLIPSE_RY = 36 // rem — vertical semi-major arc spacing
const ELLIPSE_RX = 15 // rem — horizontal semi-minor arc curvature
const WHEEL_DEPTH_PX = 180 // px — 3D z-depth pushback
const SPACING = 40 // rem between left-hand text blocks

const Body = ({ s }) => (
  <>
    <div className="text-[1.25rem] leading-[155%] text-neutral-500">{s.body}</div>
    <div className="mt-[1.5rem] text-[1.25rem] leading-[155%] text-neutral-500">
      {s.pre}
      <span className="text-white">{s.highlight}</span>
      {s.rest}
    </div>
  </>
)

/**
 * Right-hand card riding the rotating 3D elliptical wheel.
 * Uses trigonometric elliptical path calculation with perspective depth,
 * tangential rotateX tilt, radial rotateZ fanning, and rotateY yaw.
 */
function ArcCard({ index, active }) {
  const Art = STAGE_ART[index]

  const transform = useTransform(active, (a) => {
    const o = index - a // signed distance from focal card (-2..2)
    const theta = (o * ARC_STEP_DEG * Math.PI) / 180

    // Trigonometric elliptical calculations
    const yRem = (ELLIPSE_RY * Math.sin(theta)).toFixed(3)
    const xRem = (ELLIPSE_RX * (1 - Math.cos(theta)) * (o < 0 ? -0.35 : 1.15)).toFixed(3)
    const zPx = (-WHEEL_DEPTH_PX * (1 - Math.cos(theta)) - Math.abs(o) * 35).toFixed(1)

    // 3D wheel kinematics
    const rotX = (-o * 13.8).toFixed(2) // tangent tilt on the wheel rim
    const rotY = (o * 3.6).toFixed(2)   // latitudinal perspective yaw
    const rotZ = (-o * ARC_STEP_DEG * 0.72).toFixed(2) // radial wheel fanning
    const scale = (1 - Math.min(0.25, Math.abs(o) * 0.085)).toFixed(3)

    return `perspective(1200px) translate3d(${xRem}rem, ${yRem}rem, ${zPx}px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${scale})`
  })

  // Smooth cosine opacity falloff
  const opacity = useTransform(active, (a) => {
    const d = Math.abs(index - a)
    if (d >= 1.75) return 0
    return Math.max(0, Math.cos((d / 1.75) * (Math.PI / 2)))
  })

  // Stacking z-index: center active card stays on top
  const zIndex = useTransform(active, (a) => {
    const d = Math.abs(index - a)
    return Math.round(50 - d * 15)
  })

  return (
    <motion.div
      className="absolute left-1/2 top-[44%] -ml-[21.75rem] -mt-[12.3rem] aspect-[4.78/2.7] w-[43.5rem] overflow-hidden rounded-[1.77rem] bg-ink-600 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] will-change-transform"
      style={{
        transform,
        opacity,
        zIndex,
        transformStyle: 'preserve-3d',
      }}
    >
      <Art />
    </motion.div>
  )
}

function LeftItem({ stage, index, active }) {
  const y = useTransform(active, (a) => `${(index - a) * SPACING}rem`)
  const opacity = useTransform(active, (a) => {
    const d = Math.abs(index - a)
    if (d >= 1.25) return 0.06
    return 0.06 + 0.94 * Math.pow(Math.cos((d / 1.25) * (Math.PI / 2)), 2)
  })
  const scale = useTransform(active, (a) => {
    const d = Math.abs(index - a)
    return 1 - Math.min(0.08, d * 0.04)
  })

  return (
    <motion.div className="absolute inset-x-0 top-[calc(44%-12rem)] will-change-transform" style={{ y, opacity, scale }}>
      <h3 className="text-[3.19444rem] font-medium leading-[117%] text-white">{stage.name}</h3>
      <div className="mt-[1.5rem] max-w-[31rem]">
        <Body s={stage} />
      </div>
    </motion.div>
  )
}

function Desktop() {
  const track = useRef(null)
  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] })
  // Organic progressive curve through 3 stages with comfortable reading plateaus
  const raw = useTransform(scrollYProgress, [0, 0.12, 0.42, 0.58, 0.88, 1], [0, 0, 1, 1, 2, 2])
  const active = useSpring(raw, { stiffness: 75, damping: 24, mass: 0.75 })

  return (
    <div ref={track} className="relative h-[400vh]">
      <div className="sticky top-0 grid h-screen grid-cols-2 overflow-hidden">
        <div className="relative">
          <div className="absolute inset-0 pl-[11.1rem] pr-[7.43rem]">
            <div className="relative h-full">
              {STAGES.map((s, i) => (
                <LeftItem key={s.name} stage={s} index={i} active={active} />
              ))}
            </div>
          </div>
          {/* top fade */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[25vh] bg-[linear-gradient(#080808_19%,#080808cc_58%,transparent)]" />
        </div>
        <div className="relative overflow-hidden bg-ink-700 [perspective:1400px]">
          {STAGES.map((s, i) => (
            <ArcCard key={s.name} index={i} active={active} />
          ))}
          <span aria-hidden className="pointer-events-none absolute -right-[10rem] top-[20%] aspect-square w-[40rem] rounded-full" style={{ backgroundImage: 'radial-gradient(circle,#6657ff1f,transparent 65%)' }} />
        </div>
      </div>
    </div>
  )
}

function Mobile() {
  return (
    <div className="flex flex-col gap-[3rem] px-[1.25rem] pb-[5rem]">
      {STAGES.map((s, i) => {
        const Art = STAGE_ART[i]
        return (
          <motion.div
            key={s.name}
            className="overflow-hidden rounded-[1.25rem] bg-ink-700"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="aspect-[4.78/2.7] w-full"><Art /></div>
            <div className="p-[1.5rem]">
              <div className="text-[1.75rem] leading-[1.15] text-white">{s.name}</div>
              <div className="mt-[1rem] text-[1rem] leading-[1.55] text-neutral-500">
                {s.body}
                <br /><br />
                {s.pre}
                <span className="text-white">{s.highlight}</span>
                {s.rest}
              </div>
              <FillButton
                href="#contact"
                className="mt-[1.5rem] inline-flex h-[3rem] items-center justify-center rounded-[.5rem] bg-neutral-700 px-[1.46rem] text-[.97222rem] text-white"
              >
                View details
              </FillButton>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default function Stages() {
  const isDesktop = useIsDesktop()
  return (
    <section id="cases" className="relative bg-ink">
      <div className="flex justify-center px-[1.25rem] pb-[3rem] pt-[6rem] md:px-0 md:pb-[6rem] md:pt-[10rem]">
        <div className="flex w-full flex-col items-center md:w-[73.2rem]">
          <motion.h2
            className="max-w-[42.7rem] text-center text-[3.125rem] font-bold leading-[108%] tracking-[-.08333rem] text-white md:text-[4.44444rem]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {STAGES_HEADING.title}
          </motion.h2>
          <motion.p
            className="mt-[1.5rem] max-w-[36.5rem] text-center text-[1rem] leading-[1.4] text-neutral-500 md:mt-[2.3rem] md:text-[1.25rem]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {STAGES_HEADING.sub}
          </motion.p>
        </div>
      </div>
      {isDesktop ? <Desktop /> : <Mobile />}
    </section>
  )
}

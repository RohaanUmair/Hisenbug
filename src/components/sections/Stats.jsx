import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import ScrubText from '../ui/ScrubText'
import EdgeGlow from '../ui/EdgeGlow'
import { ChatArt, GrowthArt, DonutArt } from '../art/StatsArt'
import { STATS, STATS_HEADING } from '../../data/content'

/**
 * Proof-point card with a glowing rim (EdgeGlow behind a hairline gap). On hover the light drifts
 * toward the pointer and the card tilts slightly.
 */
function StatCard({ children, padding, className = '' }) {
  const ref = useRef(null)
  const gx = useMotionValue(0)
  const gy = useMotionValue(0)
  // Higher damping and mass ensures smooth lerp interpolation and organic lag
  const x = useSpring(gx, { stiffness: 48, damping: 28, mass: 0.85 })
  const y = useSpring(gy, { stiffness: 48, damping: 28, mass: 0.85 })

  // 3D rotational tilt on mouse move
  const rxValue = useMotionValue(0)
  const ryValue = useMotionValue(0)
  const rotateX = useSpring(rxValue, { stiffness: 55, damping: 26, mass: 0.8 })
  const rotateY = useSpring(ryValue, { stiffness: 55, damping: 26, mass: 0.8 })

  const onMove = (e) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    // Default glow centre sits at ~(28%, 45%) of the card; offset from there.
    gx.set((e.clientX - r.left - r.width * 0.28) * 0.9)
    gy.set((e.clientY - r.top - r.height * 0.45) * 0.9)

    // Rotational tilt based on distance from center
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    rxValue.set(-py * 7.5)
    ryValue.set(px * 8.5)
  }

  const onLeave = () => {
    gx.set(0)
    gy.set(0)
    rxValue.set(0)
    ryValue.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative h-[15rem] w-full overflow-hidden rounded-[1.25rem] p-[.07rem] md:h-[24rem] md:w-[28.4rem] md:rounded-[1.88rem] md:p-[.1rem] will-change-transform"
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
      }}
    >
      <EdgeGlow className="left-[-27%] top-[-10%] aspect-square w-[110%] will-change-transform" intensity={0.4} reach={58} style={{ x, y }} />
      <div
        className={`relative z-[100] flex h-full w-full flex-col items-start justify-between overflow-hidden rounded-[1.25rem] border border-white/10 bg-ink p-[1.5rem] text-center md:rounded-[1.88rem] ${padding} ${className}`}
      >
        {children}
      </div>
    </motion.div>
  )
}

const ARTS = [ChatArt, GrowthArt, DonutArt]

const Heading = ({ children, className = '' }) => (
  <h2 className={`text-[4.5rem] font-semibold leading-[68%] tracking-[-.07826rem] text-white md:text-[7.77778rem] ${className}`}>
    {children}
  </h2>
)
const Desc = ({ children, className = '' }) => (
  <p className={`mb-0 flex-none text-left text-[.875rem] leading-[1.4] text-neutral-500 md:text-[1.11rem] ${className}`}>{children}</p>
)

export default function Stats() {
  return (
    <section
      className="relative z-20 overflow-hidden bg-ink px-[1.25rem] pb-[3rem] md:-mt-[22.9rem] md:px-0 md:pb-0"
    >
      <div className="relative z-[5] mx-auto md:max-w-[92rem]">
        <div className="pt-0">
          <ScrubText
            segments={STATS_HEADING}
            className="mx-auto max-w-full text-center text-[1.75rem] font-bold leading-[128%] text-white md:max-w-[43.4rem] md:text-[3.19444rem] md:leading-[118.33%]"
          />
        </div>

        <motion.div
          className="relative mt-[2.5rem] flex flex-wrap items-center justify-center gap-[1.25rem] md:mt-[5rem] md:flex-nowrap md:gap-[2.22rem] md:pb-[8rem]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -12% 0px' }}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        >
          {/* ambient corner glows */}
          <span aria-hidden className="pointer-events-none absolute -left-[12rem] top-[-6rem] hidden aspect-square w-[34rem] rounded-full opacity-60 md:block" style={{ backgroundImage: 'radial-gradient(circle,#6657ff33,transparent 65%)' }} />
          <span aria-hidden className="pointer-events-none absolute -right-[12rem] bottom-[2rem] hidden aspect-square w-[34rem] rounded-full opacity-60 md:block" style={{ backgroundImage: 'radial-gradient(circle,#ff6a3d26,transparent 65%)' }} />

          {STATS.map((s, i) => {
            const Art = ARTS[i]
            return (
              <motion.div
                key={s.value}
                variants={{ hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } } }}
                className="w-full md:w-auto"
              >
                <StatCard padding="md:pb-[2rem] md:pl-[2.4rem] md:pr-[1.6rem] md:pt-[1.6rem]">
                  <Art className={`self-end ${i === 2 ? 'w-[7rem] md:w-[8.6rem]' : 'w-[8rem] md:w-[10.4rem]'}`} />
                  <div className="flex flex-col items-start gap-[1rem] md:gap-[1.6rem]">
                    <Heading className="md:mb-[1.1rem]">{s.value}</Heading>
                    <Desc className="max-w-[19.5rem]">{s.desc}</Desc>
                  </div>
                </StatCard>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

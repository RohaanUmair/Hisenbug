import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import CursorZone from '../ui/CursorZone'
import Reveal from '../ui/Reveal'
import EdgeGlow from '../ui/EdgeGlow'
import { SERVICES } from '../../data/content'
import { AutomationArt, VoiceMarquee, PlatformArt, DevArt, ChatbotArt } from '../art/ServiceArt'

const C = SERVICES.cards

function Title({ children }) {
  return (
    <h4 className="mx-auto max-w-[25.125rem] text-center text-[1.75rem] font-medium leading-[114%] text-white md:text-[3.19444rem] md:leading-[3.5rem]">
      {children}
    </h4>
  )
}
function Desc({ children, max = 'md:max-w-[22.9167rem]' }) {
  return (
    <p className={`relative z-[3] mx-auto mt-[.75rem] text-center text-[1.125rem] font-medium leading-[155%] text-neutral-500 md:text-[1.111rem] md:leading-[150%] ${max}`}>
      {children}
    </p>
  )
}

/**
 * One service card: a light disc behind the card shows through a 0.1rem gap as a glowing rim,
 * and a spotlight layer (lit by the grid's pointer tracking) brightens the area under the cursor.
 * Heights are fixed per card.
 */
function Card({ height, offset = '', gradient = 'w-[115%]', children, className = '', delay = 0 }) {
  return (
    <Reveal delay={delay} y={50} className={`w-full md:w-auto ${offset}`}>
      <div
        className={`relative w-full overflow-hidden rounded-[1.25rem] p-[.1rem] md:w-[34.5833rem] md:rounded-[1.88vw] ${className}`}
      >
        <EdgeGlow className={`left-[-7%] top-[-39%] aspect-[2/3] ${gradient}`} intensity={0.35} reach={62} />
        <div
          className={`relative z-[2] w-full overflow-hidden rounded-[1.25rem] bg-ink-800 pt-[4rem] md:max-w-[34.5833rem] md:rounded-[1.87792rem] md:pt-[4.5rem] ${height}`}
        >
          <span aria-hidden className="hb-spot z-[3]" />
          {children}
        </div>
      </div>
    </Reveal>
  )
}

export default function Services() {
  const gridRef = useRef(null)
  const frame = useRef(0)
  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  // Spotlight: once per frame, give every card's light layer the pointer position in its own coordinates,
  // so the light carries across the gaps between cards.
  const onPointerMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const { clientX, clientY } = e
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      gridRef.current?.querySelectorAll('.hb-spot').forEach((layer) => {
        const box = layer.getBoundingClientRect()
        layer.style.setProperty('--spot-x', `${clientX - box.left}px`)
        layer.style.setProperty('--spot-y', `${clientY - box.top}px`)
      })
    })
  }

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-ink px-[1.25rem] pb-[6.38rem] pt-[5rem] md:-mt-[5rem] md:px-0 md:pb-[13.33rem] md:pt-[18.3rem]"
    >
      <div className="relative mx-auto md:max-w-[77.5rem]">
        {/* heading */}
        <div className="relative overflow-hidden text-center">
          <h2 className="pt-0 text-[4.875rem] font-bold leading-[5rem] text-white md:pt-[1.3rem] md:text-[9.72222rem] md:leading-[8.75rem]">
            {SERVICES.title.split('').map((ch, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ y: '60%', opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                {ch}
              </motion.span>
            ))}
          </h2>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-[1rem] max-w-[40rem] text-[1.1259rem] leading-[140%] text-neutral-500 md:mt-[2.08rem] md:text-[1.38889rem]">
              {SERVICES.sub}
            </p>
          </Reveal>
          {/* tag pill sized by its own label, with a light travelling around its hairline border */}
          <Reveal delay={0.3} className="relative mx-auto mt-[1.94rem] h-[2.25rem] w-fit overflow-hidden rounded-full p-[.07rem] md:h-[3.125rem]">
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 block aspect-square w-[300%] -translate-x-1/2 -translate-y-1/2"
              style={{ background: 'conic-gradient(from 0deg, transparent 0 62%, rgba(255,255,255,.7) 82%, transparent 100%)', animation: 'hb-glow-spin 5s linear infinite' }}
            />
            <div className="relative z-[2] flex h-full items-center justify-center whitespace-nowrap rounded-full bg-ink px-[1.25rem] text-[1rem] text-white md:px-[1.9rem] md:text-[1.25rem]">
              {SERVICES.tag}
            </div>
          </Reveal>
        </div>

        {/* vertical line + lead */}
        <div className="mx-auto md:max-w-[40rem]">
          <div className="relative mx-auto my-[2rem] h-[11.25rem] w-[.12rem] overflow-hidden bg-white/10 md:my-[2.29rem] md:h-[17.7rem]">
            <span
              aria-hidden
              className="absolute left-0 top-0 h-[28%] w-full bg-[linear-gradient(transparent,#fff,transparent)] will-change-transform"
              style={{ animation: 'hb-run 3.2s cubic-bezier(.45,.03,.52,.96) infinite' }}
            />
          </div>
          <Reveal>
            <p className="mx-auto max-w-[33.47rem] text-center text-[1.256rem] leading-[140%] text-white md:text-[1.80556rem]">
              {SERVICES.lead}
            </p>
          </Reveal>
        </div>

        {/* cards */}
        <CursorZone label="View" sub="more" variant="white" className="mt-[4rem] md:mt-[5.5rem]">
          <div
            ref={gridRef}
            onPointerMove={onPointerMove}
            className="hb-spot-area flex flex-wrap items-start justify-center gap-[1.25rem] md:gap-[2.22rem]"
          >
            {/* row 1 */}
            <Card height="h-[32rem] md:h-[44rem]" gradient="w-[113%]">
              <Title>{C.automation.title}</Title>
              <Desc max="md:max-w-[28rem]">{C.automation.desc}</Desc>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[17.5rem] md:top-[19.5rem]">
                <AutomationArt />
              </div>
            </Card>
            <Card height="h-[28.875rem] md:h-[35.0694rem]" gradient="w-[113%]" delay={0.1}>
              <div className="flex h-full flex-col justify-between gap-[2rem] pb-0 md:gap-[4.44rem]">
                <div className="md:mt-[0.5rem]">
                  <Title>{C.voice.title}</Title>
                  <Desc max="md:max-w-[23.333rem]">{C.voice.desc}</Desc>
                </div>
                <div className="translate-y-[0.35rem]">
                  <VoiceMarquee />
                </div>
              </div>
            </Card>

            {/* row 2 */}
            <Card height="h-[30rem] md:h-[40.4167rem]" gradient="w-[115%]">
              <Title>{C.chatbots.title}</Title>
              <Desc max="md:max-w-[27.9167rem]">{C.chatbots.desc}</Desc>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[15rem] md:top-[15rem]">
                <ChatbotArt />
              </div>
            </Card>
            <Card height="h-[28rem] md:h-[36.1111rem]" offset="md:-mt-[6.78vw]" gradient="w-[115%]" delay={0.1}>
              <Title>{C.platforms.title}</Title>
              <Desc max="md:max-w-[29.44rem]">{C.platforms.desc}</Desc>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[14rem] md:top-[15rem]">
                <PlatformArt />
              </div>
            </Card>

            {/* row 3 */}
            <Card height="h-[31.0625rem] md:h-[45.5556rem]" gradient="w-[115%]">
              <Title>{C.dev.title}</Title>
              <Desc max="md:max-w-[27.9167rem]">{C.dev.desc}</Desc>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[16rem] md:top-[17rem]">
                <DevArt />
              </div>
            </Card>
          </div>
        </CursorZone>
      </div>
    </section>
  )
}

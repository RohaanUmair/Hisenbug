import { motion } from 'framer-motion'
import AwardThumb from '../art/AwardArt'
import Reveal from '../ui/Reveal'
import { AWARDS } from '../../data/content'
import { useClickSound } from '../../hooks/useClickSound'

function Row({ item, last, onEnter, index }) {
  return (
    <Reveal delay={Math.min(index * 0.05, 0.3)} y={24}>
      <div
        onMouseEnter={onEnter}
        className={`group relative cursor-pointer md:border-0 ${last ? 'border-b border-[#e5e5e5]/10 md:border-b-0' : ''} border-t border-[#e5e5e5]/10 md:border-t-0`}
      >
        <div className="relative flex flex-col items-start gap-0 py-[2rem] pr-[7.25rem] text-white md:grid md:h-[7.25rem] md:grid-cols-[1fr_1fr_2fr_1fr] md:place-items-center md:gap-[1rem] md:rounded-[.875rem] md:px-[2.6875rem] md:py-[2.4375rem]">
          {/* phones: the text wraps before the thumb on the right instead of running under it */}
          {/* hover fill grows out from the vertical centre */}
          <span
            aria-hidden
            className="absolute inset-x-0 top-1/2 z-[1] hidden h-0 -translate-y-1/2 rounded-[.875rem] bg-ink-700 transition-[height] duration-500 ease-flip group-hover:h-full md:block"
          />
          {/* certificate thumb */}
          <span
            aria-hidden
            className="pointer-events-none absolute right-0 top-1/2 z-[2] w-[6.25rem] -translate-y-1/2 overflow-hidden rounded-[.76rem] opacity-100 md:-top-[2.1rem] md:right-[15.6875rem] md:w-[8.125rem] md:translate-y-0 md:rotate-[-7deg] md:scale-90 md:opacity-0 md:transition-[opacity,transform] md:duration-500 md:ease-flip md:group-hover:rotate-0 md:group-hover:scale-100 md:group-hover:opacity-100"
          >
            <AwardThumb org={item.org} title={item.title} hue={item.hue} />
          </span>
          <h5 className="relative z-[2] text-[1.5rem] font-bold leading-[1.75rem] md:text-[2.222rem] md:leading-[2.375rem]">{item.org}</h5>
          <div className="relative z-[2] text-[1rem] leading-[1.5rem] text-neutral-500 md:text-[1.25rem] md:leading-[1.625rem]">{item.project}</div>
          <div className="relative z-[2] mt-[1.75rem] text-[1rem] leading-[1.5rem] md:mr-[6.25rem] md:mt-0 md:text-[1.25rem] md:leading-[1.625rem]">{item.title}</div>
          <div className="relative z-[2] text-[1rem] leading-[1.5rem] text-neutral-500 md:text-[1.25rem] md:leading-[1.625rem]">{item.date}</div>
        </div>
      </div>
    </Reveal>
  )
}

export default function Awards() {
  const play = useClickSound()
  const items = AWARDS.items.filter((i) => !i.hidden)

  return (
    <section className="relative overflow-hidden bg-ink px-[1.25rem] py-[5rem] md:px-0 md:pb-[5.11rem] md:pt-[13.33rem]">
      {/* soft violet wash */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 z-[5] h-[34rem] w-[110%] -translate-x-1/2 translate-y-[6vh] opacity-50 blur-[16px]"
        style={{ backgroundImage: 'radial-gradient(ellipse at 50% 0%, #6657ff26, transparent 60%)' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6 }}
      />
      <div className="relative z-[6] mx-auto md:max-w-[95rem]">
        <div className="mx-auto md:max-w-[77.5rem]">
          <Reveal className="pt-[1rem]">
            <h2 className="mx-auto max-w-[55rem] text-center text-[2.625rem] font-bold leading-none text-white md:text-[4.44rem]">
              {AWARDS.title}
            </h2>
          </Reveal>
          <div className="pb-0 pt-[4rem] md:py-[6rem]">
            {items.map((item, i) => (
              <Row key={`${item.org}-${item.project}`} item={item} index={i} last={i === items.length - 1} onEnter={play} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import Reveal from '../ui/Reveal'
import SecondaryButton from '../ui/SecondaryButton'
import { FOUNDERS, FOUNDERS_SECTION } from '../../data/content'
import { useBooking } from '../layout/BookingContext'

function Portrait({ person }) {
  const initials = person.name.split(' ').map((w) => w[0]).slice(0, 2).join('')
  if (person.image) {
    return <img src={person.image} alt={person.name} loading="lazy" className="h-full w-full object-cover object-top" />
  }
  return (
    <div className="relative grid h-full w-full place-items-center overflow-hidden bg-gradient-to-br from-violet/55 via-ink-700 to-orange/45">
      <span aria-hidden className="absolute -right-[20%] -top-[10%] size-[70%] rounded-full bg-white/10" />
      <span className="relative text-[5rem] font-bold text-white/85 md:text-[7rem]">{initials}</span>
    </div>
  )
}

/** Co-founders: a portrait, a name and a role each, then one shared note. Content lives in FOUNDERS (content.js). */
export default function Founders() {
  const { open } = useBooking()
  const cols = FOUNDERS.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'
  return (
    <section id="founders" className="relative overflow-hidden bg-ink px-[1.25rem] pb-[5rem] pt-[2rem] md:px-0 md:pb-[10rem] md:pt-[4rem]">
      <div className="relative mx-auto md:max-w-[77.5rem]">
        <Reveal>
          <h2 className="mx-auto max-w-[55rem] text-center text-[2.625rem] font-bold leading-none text-white md:text-[4.44rem]">
            {FOUNDERS_SECTION.title}
          </h2>
          <p className="mx-auto mt-[1.5rem] max-w-[40rem] text-center text-[1.1259rem] leading-[140%] text-neutral-500 md:mt-[2.08rem] md:text-[1.38889rem]">
            {FOUNDERS_SECTION.lead}
          </p>
        </Reveal>

        <div className={`mx-auto mt-[3rem] grid ${FOUNDERS.length >= 3 ? 'max-w-[76rem]' : 'max-w-[60rem]'} grid-cols-1 gap-[1.25rem] md:mt-[5.5rem] md:gap-[2.22rem] ${cols}`}>
          {FOUNDERS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1} y={40}>
              <article className="h-full rounded-[1.25rem] border border-white/10 bg-ink-800 p-[1rem] md:rounded-[1.67rem] md:p-[1.4rem]">
                <div className="aspect-[4/5] overflow-hidden rounded-[1rem] md:rounded-[1.25rem]">
                  <Portrait person={p} />
                </div>
                <div className="px-[.4rem] pb-[.4rem] pt-[1.4rem] md:px-[.6rem] md:pt-[1.8rem]">
                  <h3 className="text-[1.5rem] font-medium leading-[120%] text-white md:text-[2rem]">{p.name}</h3>
                  {p.role ? <div className="mt-[.5rem] text-[1rem] text-orange md:text-[1.11rem]">{p.role}</div> : null}
                  {p.bio ? <p className="mt-[1.1rem] text-[1rem] leading-[148%] text-neutral-400 md:text-[1.11rem]">{p.bio}</p> : null}
                  {p.href ? (
                    <SecondaryButton dark href={p.href} target="_blank" rel="noreferrer" className="mt-[1.4rem] md:mt-[1.8rem]">
                      Connect
                    </SecondaryButton>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* one shared note from the founders */}
        <Reveal delay={0.1} y={30}>
          <div className="mx-auto mt-[3.5rem] max-w-[46rem] text-center md:mt-[6rem]">
            {FOUNDERS_SECTION.note.map((t, i) => (
              <p
                key={i}
                className={`text-[1.25rem] font-medium leading-[145%] md:text-[1.8rem] ${i === 0 ? 'text-white' : 'mt-[1.2rem] text-neutral-400 md:mt-[1.6rem]'}`}
              >
                {t}
              </p>
            ))}
            <SecondaryButton dark href="#contact" onClick={(e) => { e.preventDefault(); open() }} className="mt-[2.2rem] md:mt-[3rem]">
              {FOUNDERS_SECTION.cta}
            </SecondaryButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

import ScrubText from '../ui/ScrubText'
import SecondaryButton from '../ui/SecondaryButton'
import Reveal from '../ui/Reveal'
import { ClientChip } from '../art/ClientArt'
import { STARTUPS, STARTUPS_HEADING } from '../../data/content'
import { useBooking } from '../layout/BookingContext'

const HUES = [268, 150, 212, 28]

function ProductItem({ item, hue }) {
  const { open } = useBooking()
  const external = /^https?:/.test(item.href)
  const props =
    item.action === 'book'
      ? { onClick: (e) => { e.preventDefault(); open() } }
      : external
        ? { target: '_blank', rel: 'noreferrer' }
        : {}
  return (
    <div className="group relative rounded-none p-0 transition-all duration-500 md:rounded-[1.111rem] md:py-[2.15rem] md:pb-[1.53rem] md:pl-[1.4rem] md:pr-[1.1rem] md:hover:bg-[#f5f5f5]">
      {/* text and the button are kept clear of the floating "Book a call" button (data-fab-keep) */}
      <div data-fab-keep="text" className="text-[1.5rem] leading-[120%] text-ink md:text-[2.22222rem]">{item.name}</div>
      <div className="mb-[1.25rem] mt-[.75rem] h-[.14rem] w-[2.06rem] bg-neutral-500 md:mb-[2.36rem] md:mt-[1.11rem] md:w-[2.29167rem]" />
      {item.tagline && <p data-fab-keep="text" className="mb-[.75rem] text-[1rem] font-medium leading-[144%] text-ink md:text-[1.11rem]">{item.tagline}</p>}
      {item.desc.map((para) => (
        <p key={para} data-fab-keep="text" className="mb-0 text-[1rem] leading-[144%] text-neutral-500 [&+&]:mt-[.75rem] md:text-[1.11rem]">
          {para}
        </p>
      ))}
      {item.status && (
        <p data-fab-keep="text" className="mb-0 mt-[1rem] text-[1rem] font-medium leading-[144%] text-ink md:text-[1.11rem]">
          {[item.status, item.pricing].filter(Boolean).join(' · ')}
        </p>
      )}
      <div className="pointer-events-none absolute right-[2rem] top-[-1.67rem] hidden h-[3.18rem] w-[12.92rem] origin-center scale-[.85] opacity-0 transition-[transform,opacity] duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 md:block">
        <ClientChip name={item.name} hue={hue} />
      </div>
      <SecondaryButton href={item.href} data-fab-keep aria-label={item.ctaLabel} className="mt-[1.25rem] md:mt-[2.3rem]" {...props}>
        {item.cta}
      </SecondaryButton>
    </div>
  )
}

/** Our own products, shown honestly: what is built, its status and how it is sold. */
export default function Clients() {
  return (
    <section
      id="work"
      className="relative z-[2] overflow-hidden bg-white px-[1.25rem] pt-[4rem] md:px-0 md:pt-[11.33rem]"
    >
      <div className="relative mx-auto md:max-w-[99rem]">
        <div className="pb-[3rem] pt-[2rem] md:pb-[12rem] md:pl-[6.94rem] md:pr-[4rem] md:pt-0">
          <ScrubText
            as="h3"
            segments={STARTUPS_HEADING}
            data-animate
            className="mx-auto w-auto text-center text-[1.5rem] font-medium leading-[125%] text-[#191919] md:w-[45vw] md:max-w-[44vw] md:text-[2.222rem]"
          />
          <div className="mx-auto mt-[4.5rem] flex max-w-[60rem] flex-col items-stretch gap-[3.5rem] md:mt-[9.31rem] md:grid md:grid-cols-2 md:gap-x-[2.5rem] md:gap-y-[4.44rem]">
            {STARTUPS.map((s, i) => (
              <Reveal key={s.name} delay={(i % 3) * 0.08} y={40}>
                <ProductItem item={s} hue={HUES[i % HUES.length]} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

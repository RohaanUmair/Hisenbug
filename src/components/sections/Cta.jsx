import FillButton from '../ui/FillButton'
import Reveal from '../ui/Reveal'
import { CtaFlow } from '../art/CtaArt'
import { CTA, SITE } from '../../data/content'
import { useBooking } from '../layout/BookingContext'

export default function Cta() {
  const { open } = useBooking()
  return (
    <section
      id="contact"
      className="relative z-[2] bg-ink px-[1.25rem] pb-[.6rem] pt-[5rem] md:-mt-[5rem] md:px-0 md:pt-[16rem]"
    >
      <div className="mx-auto md:max-w-[92.6rem]">
        <Reveal y={60}>
          <div className="relative w-full overflow-hidden rounded-[1.25rem] p-[.091rem] [container-type:inline-size] md:mx-auto md:h-[48.6111vw] md:w-[92.5rem] md:rounded-[1.88rem]">
            {/* lit rim: brightest along the upper-left edge; sized by card width so tall mobile cards stay subtle */}
            <span
              aria-hidden
              className="absolute inset-0"
              style={{ background: 'radial-gradient(circle 45cqw at 28% calc(55cqw - 75%), rgb(255 255 255 / .4), rgb(255 255 255 / 0))' }}
            />
            <div
              className="relative z-[3] flex h-full flex-col items-stretch gap-[3.5rem] overflow-hidden rounded-[1.25rem] bg-ink-800 pt-[2rem] md:flex-row md:items-center md:justify-between md:gap-[2rem] md:rounded-[1.885rem] md:pl-[6.94rem] md:pr-0 md:pt-0"
            >
              {/* decorative colour glows */}
              <span aria-hidden className="pointer-events-none absolute right-[-8%] top-[-10%] aspect-square w-[60%] rounded-full" style={{ backgroundImage: 'radial-gradient(circle,#6657ff40,transparent 66%)' }} />
              <span aria-hidden className="pointer-events-none absolute bottom-[-30%] right-[8%] aspect-square w-[44%] rounded-full" style={{ backgroundImage: 'radial-gradient(circle,#ff6a3d33,transparent 66%)' }} />

              <div className="relative z-[2] flex flex-col px-[2rem] md:px-0">
                <h2 className="mb-[1rem] max-w-[33.1rem] text-left text-[3.125rem] font-bold leading-[104%] tracking-normal text-white md:mb-[2.08rem] md:text-[7.78rem] md:leading-[97%] md:tracking-[-.13889rem]">
                  {CTA.title}
                </h2>
                <p className="max-w-[28.9rem] text-left text-[1rem] leading-[1.5rem] text-neutral-500 md:text-[1.25rem] md:leading-[1.94rem]">
                  {CTA.desc}
                </p>
                <div data-fab-clear className="mt-[3rem] flex flex-col gap-[.5rem] md:mt-[9.37rem] md:flex-row md:gap-[1.2rem]">
                  <FillButton
                    href={`mailto:${SITE.email}`}
                    fillColor="#6657ff"
                    className="flex h-[4rem] w-full items-center justify-center rounded-[.75rem] bg-orange text-[1.5rem] text-white md:h-[6.3rem] md:w-[13.88rem] md:rounded-[1.111rem]"
                  >
                    {CTA.write}
                  </FillButton>
                  <FillButton
                    as="button"
                    type="button"
                    onClick={open}
                    fillColor="#6657ff"
                    className="flex h-[4rem] items-center justify-center whitespace-nowrap rounded-[.75rem] bg-neutral-700 px-[3.8rem] text-[1.5rem] text-white md:h-[6.3rem] md:rounded-[1.111rem]"
                  >
                    {CTA.book}
                  </FillButton>
                </div>
              </div>

              <div className="relative z-[2] flex flex-none justify-end self-stretch md:self-center">
                <CtaFlow className="w-full md:w-[39vw]" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

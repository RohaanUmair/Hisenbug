import { motion } from 'framer-motion'
import FillButton from '../ui/FillButton'
import FlipLink from '../ui/FlipLink'
import { SOCIAL_ICONS } from '../art/Icons'
import { FOOTER } from '../../data/content'
import { useMagnet } from '../../hooks/useMagnet'

/** One social tile: leans up to 5px toward the pointer and floods orange on hover. */
function Social({ item }) {
  const { ref, x, y } = useMagnet(5)
  const Icon = SOCIAL_ICONS[item.name]
  return (
    <motion.a
      ref={ref}
      href={item.href}
      aria-label={item.name}
      target="_blank"
      rel="noreferrer"
      style={{ x, y }}
      className="relative size-[3rem] flex-none overflow-hidden rounded-[.75rem] p-[.06rem] md:size-[4.16667rem] md:rounded-[1.25rem]"
    >
      <FillButton
        as="div"
        fillColor="#ff6a3d"
        className="z-[100] flex h-full w-full items-center justify-center rounded-[.75rem] bg-ink-700 md:rounded-[1.25rem]"
      >
        <Icon className="size-[1.25rem] text-white md:size-[1.6667rem]" />
      </FillButton>
    </motion.a>
  )
}

export default function Footer() {
  return (
    <footer className="relative z-[5] bg-ink px-[1.25rem] pb-[1rem] pt-[4rem] md:px-0 md:pb-[2rem] md:pt-[6rem]">
      <div className="mx-auto md:max-w-[92.5rem]">
        <div className="mb-[2.5rem] flex flex-col gap-[2.5rem] md:mb-[3.5rem] md:flex-row md:justify-between md:gap-[8.625rem]">
          {/* social + mail block (first on mobile) */}
          <div data-fab-clear className="order-first flex w-full flex-col gap-[.5rem] md:order-none md:w-[34.5rem]">
            <a
              href={`mailto:${FOOTER.email}`}
              className="relative text-[1.75rem] leading-[1.2] text-white md:self-end md:text-[3.2rem]"
            >
              {FOOTER.email}
            </a>
            {FOOTER.socials.length > 0 && (
              <div className="flex gap-[.25rem] md:justify-end">
                {FOOTER.socials.map((s) => (
                  <Social key={s.name} item={s} />
                ))}
              </div>
            )}
          </div>

          {/* link columns: on phones each is as wide as its longest link (labels can't wrap: the flip needs one line) */}
          <div data-fab-clear className="flex w-full flex-wrap justify-between gap-x-[1.25rem] gap-y-[2.5rem] md:order-first md:w-[37.8125rem] md:flex-nowrap md:justify-start md:gap-[2.22rem]">
            {FOOTER.cols.map((col) => (
              <div key={col.main.label} className="flex w-max min-w-[8rem] flex-col items-start gap-[1rem] md:w-[12.5rem] md:gap-[1.5rem]">
                <div className="flex flex-col items-start gap-0 md:gap-[.3rem]">
                  <FlipLink
                    href={col.main.href}
                    className="mb-[.5rem] py-[.5rem]"
                    textClass="text-white"
                    hoverClass="text-white"
                  >
                    {col.main.label}
                  </FlipLink>
                  {col.links.map((l) => (
                    <FlipLink key={l.label} href={l.href} className="py-[.5rem]">
                      {l.label}
                    </FlipLink>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-[1rem] border-t border-ink-600 pt-[1.5rem] md:flex-row md:gap-0 md:pt-[2rem]">
          <p data-fab-keep="text" className="max-w-[14rem] text-[.875rem] leading-[1.25rem] text-neutral-400 md:max-w-none md:text-[1.125rem] md:leading-[1.75rem]">
            {FOOTER.copy}
          </p>
          <p data-fab-keep="text" className="text-[.875rem] leading-[1.25rem] text-neutral-400 md:text-[1.125rem] md:leading-[1.75rem]">
            {FOOTER.location}
          </p>
        </div>
      </div>
    </footer>
  )
}

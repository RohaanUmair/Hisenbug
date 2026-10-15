import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from '../ui/Reveal'
import { FAQ } from '../../data/content'

function Item({ item, open, onToggle }) {
  const id = useId()
  return (
    <div className="border-b border-neutral-700">
      <h4 className="m-0">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
          className="group flex w-full items-center py-[1.5rem] text-left md:py-[2.78rem]"
        >
          <span data-fab-keep="text" className="flex-1 pr-[1rem] text-[1.125rem] font-medium leading-[119%] text-white transition-colors duration-300 group-hover:text-neutral-300 md:text-[1.66667rem]">
            {item.q}
          </span>
          {/* plus → cross: both bars rotate 45deg when open */}
          <motion.span
            aria-hidden
            data-fab-keep
            className="relative flex w-[2rem] flex-none items-center justify-center"
            animate={{ rotate: open ? 135 : 0 }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
          >
            <span className="absolute h-[.13rem] w-[.9rem] rotate-90 bg-white md:w-[1.1rem]" />
            <span className="absolute h-[.13rem] w-[.9rem] bg-white md:w-[1.1rem]" />
          </motion.span>
        </button>
      </h4>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: { duration: 0.55, ease: [0.65, 0, 0.35, 1] }, opacity: { duration: 0.35 } }}
            className="overflow-hidden"
          >
            <div className="w-[90%] pb-[1.5rem] pr-[.5rem] md:w-[70%] md:pb-[2.78rem] md:pr-0">
              <p data-fab-keep="text" className="mb-0 text-[.875rem] font-medium leading-[140%] text-neutral-500 md:text-[1rem]">
                {item.a}
                {item.link && (
                  <a href={item.link.href} className="text-violet-link underline-offset-4 hover:underline" target={item.link.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                    {item.link.label}
                  </a>
                )}
                {item.link?.after}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Faq() {
  const [open, setOpen] = useState(() => new Set())
  const toggle = (i) =>
    setOpen((prev) => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })

  return (
    <section id="faq" className="relative overflow-hidden bg-ink px-[1.25rem] pb-[4rem] pt-[3rem] md:-mt-[5rem] md:px-0 md:pb-[6.5rem] md:pt-[16rem]">
      <div className="mx-auto md:max-w-[90rem]">
        <Reveal>
          <h3 className="text-center text-[2.625rem] font-medium leading-none text-white md:text-[3.88889rem]">{FAQ.title}</h3>
        </Reveal>
        <div className="relative mt-[3rem] md:mt-[4.3rem]">
          <div className="mx-auto w-full md:max-w-[71.3889rem]">
            {FAQ.items.map((item, i) => (
              <Reveal key={item.q} y={24} delay={Math.min(i * 0.04, 0.3)}>
                <Item item={item} open={open.has(i)} onToggle={() => toggle(i)} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

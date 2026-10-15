import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { useBooking } from './BookingContext'
import { useLenis } from '../../hooks/useLenis'

const SLOTS = ['10:00', '11:30', '14:00', '16:30']

function nextDays(n) {
  const out = []
  const d = new Date()
  while (out.length < n) {
    d.setDate(d.getDate() + 1)
    if (d.getDay() !== 0 && d.getDay() !== 6) out.push(new Date(d))
  }
  return out
}

/**
 * Self-contained slot
 * picker (no network, nothing is submitted anywhere).
 */
export default function BookCallModal() {
  const { isOpen, close } = useBooking()
  const lenis = useLenis()
  const days = useMemo(() => nextDays(4), [])
  const [day, setDay] = useState(0)
  const [slot, setSlot] = useState(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!isOpen) return undefined
    lenis?.stop()
    const onKey = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => {
      lenis?.start()
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, lenis, close])

  useEffect(() => {
    if (!isOpen) {
      const t = window.setTimeout(() => {
        setDone(false)
        setSlot(null)
        setDay(0)
      }, 400)
      return () => window.clearTimeout(t)
    }
    return undefined
  }, [isOpen])

  const fmt = (d) => d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[2147483000] flex items-center justify-center bg-black/70 p-[1rem] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && close()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Book a call"
            className="relative w-full max-w-[34rem] overflow-hidden rounded-[1.6rem] border border-white/10 bg-ink-800 p-[1.6rem] text-white md:max-w-[34rem] md:p-[2.2rem]"
            style={{ maxWidth: 'min(34rem, 100%)' }}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pointer-events-none absolute -right-[6rem] -top-[8rem] size-[18rem] rounded-full bg-violet/30 blur-3xl" />
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-[1.2rem] top-[1.2rem] flex size-[2.4rem] items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white hover:text-ink"
            >
              <X className="size-[1.1rem]" strokeWidth={1.8} aria-hidden />
            </button>

            {done ? (
              <div className="relative py-[2rem] text-center">
                <div className="mx-auto mb-[1.2rem] flex size-[4rem] items-center justify-center rounded-full bg-orange">
                  <Check className="size-[1.8rem]" color="#fff" strokeWidth={2.4} aria-hidden />
                </div>
                <h3 className="text-[1.8rem] leading-tight">You’re on the calendar</h3>
                <p className="mt-[.6rem] text-neutral-400">
                  {fmt(days[day])} · {slot} — demo confirmation, nothing was sent.
                </p>
                <button type="button" onClick={close} className="mt-[1.6rem] rounded-full bg-white px-[1.6rem] py-[.8rem] text-ink">
                  Done
                </button>
              </div>
            ) : (
              <div className="relative">
                <h3 className="text-[1.9rem] leading-tight md:text-[2.2rem]">Book a call</h3>
                <p className="mt-[.5rem] text-neutral-400">Pick a day and a time that suits you — 30 minutes, no strings.</p>

                <div className="mt-[1.6rem] grid grid-cols-2 gap-[.6rem] md:grid-cols-4">
                  {days.map((d, i) => (
                    <button
                      key={d.toISOString()}
                      type="button"
                      onClick={() => setDay(i)}
                      className={`rounded-[.9rem] border px-[.6rem] py-[.8rem] text-[.95rem] transition-colors ${
                        day === i ? 'border-violet bg-violet text-white' : 'border-white/12 text-neutral-300 hover:border-white/40'
                      }`}
                    >
                      {fmt(d)}
                    </button>
                  ))}
                </div>

                <div className="mt-[.8rem] grid grid-cols-2 gap-[.6rem] md:grid-cols-4">
                  {SLOTS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSlot(s)}
                      className={`rounded-[.9rem] border px-[.6rem] py-[.8rem] text-[.95rem] transition-colors ${
                        slot === s ? 'border-orange bg-orange text-white' : 'border-white/12 text-neutral-300 hover:border-white/40'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  disabled={!slot}
                  onClick={() => setDone(true)}
                  className="mt-[1.8rem] w-full rounded-full bg-white py-[1rem] text-[1rem] text-ink transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Confirm time
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { COOKIE_TEXT } from '../../data/content'

const KEY = 'hb-cookie-choice'

const read = () => {
  try {
    return localStorage.getItem(KEY)
  } catch {
    return null
  }
}

/** Consent card (bottom-right, gradient hairline border). Stores the choice locally only. */
export default function CookieBanner() {
  const [choice, setChoice] = useState(read)

  const pick = (v) => {
    try {
      localStorage.setItem(KEY, v)
    } catch { /* ignore */ }
    setChoice(v)
  }

  return (
    <AnimatePresence>
      {!choice && (
        <motion.div
          className="fixed bottom-[1rem] right-[1rem] z-[998] w-[calc(100%-2rem)] rounded-[2.2rem] bg-[linear-gradient(171deg,#505050,#191919_64%)] p-[.2rem] md:w-[26rem]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ delay: 2.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="rounded-[2rem] bg-ink-900 p-[1.4rem] md:p-[1.5rem]">
            <p className="text-[.85rem] leading-[1.5] text-neutral-400 md:text-[.9rem]">{COOKIE_TEXT}</p>
            <div className="mt-[1.1rem] flex gap-[.6rem]">
              <button
                type="button"
                onClick={() => pick('deny')}
                className="flex-1 rounded-full border border-white/15 py-[.75rem] text-[.85rem] text-white transition-colors hover:bg-white/10 md:text-[.9rem]"
              >
                Deny all
              </button>
              <button
                type="button"
                onClick={() => pick('accept')}
                className="flex-1 rounded-full bg-white py-[.75rem] text-[.85rem] text-ink transition-opacity hover:opacity-85 md:text-[.9rem]"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

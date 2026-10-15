import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from '../art/Logo'
import { SITE } from '../../data/content'
import { useLenis } from '../../hooks/useLenis'

const KEY = 'hb-preloader-seen'

const seen = () => {
  try {
    return sessionStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

/**
 * Page-load curtain (#404040):
 * the mark rises into a mask, holds, then the whole panel wipes upward.
 * Plays once per session; scroll is locked while it runs.
 */
export default function Preloader() {
  const lenis = useLenis()
  const [visible, setVisible] = useState(() => !seen())
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (!visible) return undefined
    lenis?.stop()
    const t = window.setTimeout(() => setLeaving(true), 1500)
    return () => window.clearTimeout(t)
  }, [visible, lenis])

  const done = () => {
    try {
      sessionStorage.setItem(KEY, '1')
    } catch { /* storage may be blocked */ }
    setVisible(false)
    lenis?.start()
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[2147483647] flex items-end justify-center overflow-hidden bg-neutral-700"
          initial={{ y: 0 }}
          animate={{ y: leaving ? '-100%' : 0 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={() => leaving && done()}
          aria-hidden
        >
          <div className="mb-[calc(50vh-3rem)] flex h-[4.2rem] items-center gap-[.9rem] overflow-hidden text-white md:h-[8.2rem] md:gap-[1.2rem]">
            <motion.div
              initial={{ y: '110%', rotate: -40 }}
              animate={{ y: 0, rotate: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <Logo className="size-[3rem] md:size-[5.4rem]" />
            </motion.div>
            <motion.span
              className="text-[2.2rem] font-semibold tracking-[-.03em] md:text-[4.6rem]"
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              {SITE.name}
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

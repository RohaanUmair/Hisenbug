import { motion } from 'framer-motion'

/** Fade/slide-up entry reveal, triggered once as the block scrolls into view. */
export default function Reveal({ children, delay = 0, y = 32, className = '', as = 'div', ...rest }) {
  const Comp = motion[as] || motion.div
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Comp>
  )
}

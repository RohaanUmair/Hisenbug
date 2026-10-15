import ArrowIcon from './ArrowIcon'

/**
 * "Case study ↗" text button: the label rolls up (two stacked copies) and the
 * arrow exits top-right while a second arrow enters from bottom-left.
 */
export default function SecondaryButton({ children, href = '#', dark = false, className = '', ...props }) {
  const ease = 'transition-transform duration-500 ease-flip'
  return (
    <a
      href={href}
      className={`group inline-flex w-auto items-center gap-[1rem] text-[.875rem] leading-none md:gap-[1.11rem] md:text-[1.11rem] ${dark ? 'text-white' : 'text-ink'} ${className}`}
      {...props}
    >
      <span className="mt-[3px] block h-[1.2rem] overflow-hidden whitespace-nowrap pt-[2px]">
        <span className={`block h-[1.2rem] leading-[1.2rem] ${ease} group-hover:-translate-y-[calc(100%+.1rem)]`}>{children}</span>
        <span
          aria-hidden
          className={`mt-[.1rem] block h-[1.2rem] leading-[1.2rem] ${ease} group-hover:-translate-y-[calc(100%+.1rem)]`}
        >
          {children}
        </span>
      </span>
      <span
        className={`relative flex size-[2.5rem] flex-none items-center justify-center overflow-hidden rounded-full border transition-colors duration-500 md:size-[2.78rem] ${
          dark
            ? 'border-white/20 group-hover:bg-white group-hover:text-ink'
            : 'border-[#e5e5e5] group-hover:bg-ink group-hover:text-white'
        }`}
      >
        <ArrowIcon className={`w-[1.5rem] md:w-[1.6667rem] ${ease} group-hover:-translate-y-full group-hover:translate-x-full`} />
        <ArrowIcon
          className={`absolute w-[1.5rem] -translate-x-full translate-y-full md:w-[1.6667rem] ${ease} group-hover:translate-x-0 group-hover:translate-y-0`}
        />
      </span>
    </a>
  )
}

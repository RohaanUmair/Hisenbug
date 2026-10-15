/**
 * 3D "flip" text link (footer + nav). Two copies of the label are stacked on
 * an X-rotating edge: hovering rotates the container 90deg so the hover copy
 * flips in from above.
 */
export default function FlipLink({
  href = '#',
  children,
  className = '',
  textClass = 'text-neutral-500',
  hoverClass = 'text-white',
  sizeClass = 'text-[.97222rem]',
  ...props
}) {
  return (
    <a
      href={href}
      className={`group block ${className}`}
      style={{ perspective: '600px' }}
      {...props}
    >
      <span className="relative block origin-[50%_0] transition-transform duration-500 ease-flip [transform-style:preserve-3d] group-hover:[transform:rotateX(90deg)]">
        <span className={`block whitespace-nowrap transition-colors duration-300 ${sizeClass} ${textClass}`}>{children}</span>
        <span
          aria-hidden
          className={`absolute left-0 top-0 block origin-[50%_0] whitespace-nowrap [backface-visibility:hidden] [transform-style:preserve-3d] [transform:rotateX(-90deg)] ${sizeClass} ${hoverClass}`}
        >
          {children}
        </span>
      </span>
    </a>
  )
}

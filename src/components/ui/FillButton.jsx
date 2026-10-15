import { useRef } from 'react'

/**
 * Button or link whose background floods with colour from the point where the pointer enters.
 * A colour layer is clipped to a circle centred on the pointer; the circle's radius eases
 * from 0 to the button's diagonal (always enough to cover it) and back to 0 on leave.
 * Pointer position and radius are CSS custom properties (see @property --fill-r in index.css),
 * so hovering never re-renders React.
 */
export default function FillButton({
  as: Tag = 'a',
  fillColor = '#6657ff',
  hoverTextColor = '#fff',
  className = '',
  labelClassName = '',
  innerStyle,
  children,
  ...props
}) {
  const rootRef = useRef(null)
  const fillRef = useRef(null)
  const labelRef = useRef(null)

  const track = (e) => {
    const root = rootRef.current
    const fill = fillRef.current
    if (!root || !fill) return
    const box = root.getBoundingClientRect()
    fill.style.setProperty('--fill-x', `${e.clientX - box.left}px`)
    fill.style.setProperty('--fill-y', `${e.clientY - box.top}px`)
    fill.style.setProperty('--fill-r', `${Math.ceil(Math.hypot(box.width, box.height))}px`)
    if (labelRef.current) labelRef.current.style.color = hoverTextColor
  }

  const release = () => {
    fillRef.current?.style.setProperty('--fill-r', '0px')
    // back to the label's own colour (innerStyle may set one, e.g. the nav's light/dark text)
    if (labelRef.current) labelRef.current.style.color = innerStyle?.color ?? ''
  }

  return (
    <Tag
      ref={rootRef}
      onPointerEnter={track}
      onPointerMove={track}
      onPointerLeave={release}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      <span
        ref={fillRef}
        aria-hidden
        className="hb-fill pointer-events-none absolute inset-0 z-[1]"
        style={{ backgroundColor: fillColor }}
      />
      <span ref={labelRef} className={`relative z-[2] transition-colors duration-300 ${labelClassName}`} style={innerStyle}>
        {children}
      </span>
    </Tag>
  )
}

import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const BookingContext = createContext({ open: () => {}, close: () => {}, isOpen: false })
export const useBooking = () => useContext(BookingContext)

/** Tiny context so every "Book a call" button (nav, CTA, floating pill) opens one modal. */
export function BookingProvider({ children }) {
  const [isOpen, setOpen] = useState(false)
  const open = useCallback(() => setOpen(true), [])
  const close = useCallback(() => setOpen(false), [])
  const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen])
  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

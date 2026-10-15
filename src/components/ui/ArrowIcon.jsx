import { ArrowUpRight } from 'lucide-react'

export default function ArrowIcon({ className = '', stroke = 'currentColor' }) {
  // h-auto keeps the square aspect driven by the width class, as the old inline svg did
  return <ArrowUpRight className={`h-auto ${className}`} color={stroke} strokeWidth={1.6} aria-hidden />
}

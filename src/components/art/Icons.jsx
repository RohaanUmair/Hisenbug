import { Briefcase, Camera, Layers, MessageCircle, Palette } from 'lucide-react'

// lucide has no brand marks, so each network maps to a neutral stand-in glyph.
// The tiles are icon-only, so the network name is carried by the link's aria-label.
const withStroke = (Icon) => (props) => <Icon strokeWidth={1.7} aria-hidden {...props} />

export const Dribbble = withStroke(Palette)
export const Behance = withStroke(Layers)
export const Instagram = withStroke(Camera)
export const XIcon = withStroke(MessageCircle)
export const LinkedIn = withStroke(Briefcase)

export const SOCIAL_ICONS = { Dribbble, Behance, Instagram, X: XIcon, LinkedIn }

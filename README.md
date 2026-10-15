# HisenBug — marketing site

React + Tailwind v4 + Framer Motion + GSAP marketing site for HisenBug.

**Provenance.** This site was not designed from scratch. Its layout, measurements and motion were first
built from a third-party website, and an intellectual-property remediation is in progress: literal copied
material has been replaced, but the design measurements, several gradients and the animation settings
still derive from that site. The audit records are kept privately in `audit/` (not in version control).
Don't describe the site as original or independently designed until that review is complete.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
npm run notices  # regenerate public/THIRD_PARTY_NOTICES.txt
```

## Brand configuration

- **Copy & identity** — `src/data/content.js` (single source of truth). `SITE` also fills the
  `{{site.*}}` tokens in `index.html` at build time via `vite.config.js`. Its comments record which
  content the founders confirmed and what is deliberately left out (social profiles, legal entity name).
- **Design tokens** — `src/index.css` (`@theme`): neutral-black ink tones, coral accent (`orange`), indigo accent (`violet`).
- **Typography** — [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (SIL OFL),
  self-hosted through `@fontsource-variable/plus-jakarta-sans`; no third-party font requests at runtime.
- **Graphics & media** — illustrations are inline SVG or CSS (`components/art/`). The showreel also
  uses images and a muted screen recording in `public/media/`, and the founders section uses photos in
  `public/team/`; their provenance records are still being completed.
- **Metadata & icons** — `index.html`, `public/` (`favicon.svg`/`.ico`, `apple-touch-icon.png`,
  `icon-*.png`, `og-image.png`, `site.webmanifest`). No analytics or tracking scripts are included;
  the cookie banner is UI-only and stores its choice in `localStorage`.
- **Licences** — `public/THIRD_PARTY_NOTICES.txt` ships with the site and lists every package whose code
  is in the bundle, including the build tools that add code of their own (Tailwind, Vite, Rolldown).
  Licence comments are kept in the built files (`vite.config.js`).

## Interactions → where they live

| Behaviour | File |
| --- | --- |
| Lenis smooth scroll driven by the GSAP ticker | `hooks/useLenis.jsx` |
| Hover-fill buttons | `ui/FillButton.jsx` |
| Nav pill collapse on scroll, section-aware colours | `layout/Navbar.jsx`, `hooks/useScrollDirection.js`, `hooks/useNavTone.js` |
| 3D flip links (nav + footer) | `ui/FlipLink.jsx` |
| Hero showreel growth on scroll, then pinned scenes | `sections/Hero.jsx`, `art/Showreel.jsx` |
| Char-by-char scrubbed text reveal | `ui/ScrubText.jsx` |
| Service-card spotlight + custom cursor disc | `sections/Services.jsx`, `ui/CursorZone.jsx`, `index.css` |
| Magnetic social icons | `hooks/useMagnet.js`, `layout/Footer.jsx` |
| Milestone rows with hover fill and click sound | `sections/Awards.jsx`, `hooks/useClickSound.js` |
| FAQ accordion | `sections/Faq.jsx` |
| Page-load curtain (once per session) | `layout/Preloader.jsx` |
| Stages 3D carousel | `sections/Stages.jsx` |
| Booking modal (local slot picker) | `layout/BookCallModal.jsx`, `layout/FloatingCall.jsx` |

## Structure

```
src/
  components/
    layout/    Navbar, Footer, Preloader, BookCallModal, BookingContext, FloatingCall, CookieBanner
    sections/  Hero, Stats, Stages, Services, Clients, Awards, Founders, Faq, Cta (Blog is not rendered)
    ui/        FillButton, FlipLink, SecondaryButton, ScrubText, CursorZone, EdgeGlow, MotionBackground, Reveal, ArrowIcon, TiltCard
    art/       inline-SVG illustrations and the showreel
  hooks/       useLenis, useScrollDirection, useNavTone, useMagnet, useMouseParallax, useMediaQuery, useClickSound, useOffscreenAnimationPause
  journal/     articles for the unused Blog section
  data/        content.js  (all copy)
```

## Notes

- The products section lists HisenBug's products (`STARTUPS` in `content.js`); hovering a row shows a
  small name chip drawn in `art/ClientArt.jsx`.
- The booking modal is a local slot picker; nothing is submitted anywhere.
- Animation mostly uses `transform` / `opacity`; the nav pill animates its measured width and the fill
  buttons a clip-path radius. `prefers-reduced-motion` is checked in `index.css`, `art/Showreel.jsx`
  and `ui/MotionBackground.jsx`.
- Dev only: the Lenis instance is exposed as `window.__lenis` for scripted scrolling.

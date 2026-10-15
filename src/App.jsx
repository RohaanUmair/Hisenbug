import { lazy, Suspense } from 'react'
import { LenisProvider } from './hooks/useLenis'
import { useOffscreenAnimationPause } from './hooks/useOffscreenAnimationPause'
import { BookingProvider } from './components/layout/BookingContext'
import Preloader from './components/layout/Preloader'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import FloatingCall from './components/layout/FloatingCall'
import BookCallModal from './components/layout/BookCallModal'
import CookieBanner from './components/layout/CookieBanner'
import Hero from './components/sections/Hero'
import Stats from './components/sections/Stats'
import Stages from './components/sections/Stages'
import Services from './components/sections/Services'
import Cta from './components/sections/Cta'

// Below-the-fold non-critical sections code-split via React.lazy
const Clients = lazy(() => import('./components/sections/Clients'))
const Awards = lazy(() => import('./components/sections/Awards'))
const Founders = lazy(() => import('./components/sections/Founders'))
const Faq = lazy(() => import('./components/sections/Faq'))

export default function App() {
  useOffscreenAnimationPause()
  return (
    <LenisProvider>
      <BookingProvider>
        <Preloader />
        <div className="relative bg-ink">
          <Navbar />
          <main className="relative">
            <Hero />
            <Stats />
            <Stages />
            <Services />
            <Suspense fallback={<div className="min-h-[50vh] bg-white" />}>
              <Clients />
            </Suspense>
            <Suspense fallback={<div className="min-h-[40vh] bg-ink" />}>
              <Awards />
            </Suspense>
            <Suspense fallback={<div className="min-h-[40vh] bg-ink" />}>
              <Founders />
            </Suspense>
            <Suspense fallback={<div className="min-h-[30vh] bg-ink" />}>
              <Faq />
            </Suspense>
            <Cta />
          </main>
          <Footer />
          <FloatingCall />
        </div>
        <BookCallModal />
        <CookieBanner />
      </BookingProvider>
    </LenisProvider>
  )
}

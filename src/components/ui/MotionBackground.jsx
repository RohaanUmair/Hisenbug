import { useCallback, useEffect, useRef, useState } from 'react'
import { useIsDesktop, useMediaQuery } from '../../hooks/useMediaQuery'

const PALETTE = ['102, 87, 255', '255, 106, 61'] // HisenBug indigo (#6657ff) & coral (#ff6a3d)

/**
 * Procedural, royalty-free background motion (no binary assets, nothing to license).
 *
 * - Canvas particle network + drifting gradient glows, DPR-aware.
 * - Loop only runs while the element is on screen AND the tab is visible.
 * - Mobile gets fewer particles / lower DPR; reduced-motion gets one static frame.
 * - Optional `videoSrc` (self-hosted, royalty-free loop): desktop-only, skipped on
 *   Save-Data / reduced-motion, falls back to the canvas on error, and is fully
 *   released on unmount.
 */
export default function MotionBackground({
  videoSrc = null,
  poster = null,
  className = '',
  overlayOpacity = 'bg-ink/75',
}) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const videoRef = useRef(null)
  const inViewRef = useRef(true)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)

  const isDesktop = useIsDesktop()
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  const saveData = typeof navigator !== 'undefined' && navigator.connection?.saveData === true
  const showVideo = Boolean(videoSrc) && isDesktop && !reduced && !saveData && !videoError

  // Release the decoder + network stream (pause alone keeps the buffer alive).
  const releaseVideo = useCallback((v) => {
    if (!v) return
    v.pause()
    v.removeAttribute('src')
    v.load()
  }, [])

  const setVideoRef = useCallback(
    (node) => {
      if (!node) releaseVideo(videoRef.current)
      videoRef.current = node
    },
    [releaseVideo],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !container || !ctx) return undefined

    const dpr = Math.min(window.devicePixelRatio || 1, isDesktop ? 2 : 1.5)
    let width = 0
    let height = 0
    let time = 0
    let raf = 0
    let particles = []

    const spawn = () => {
      const count = Math.min(isDesktop ? 48 : 22, Math.floor((width * height) / 12000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.65,
        vy: (Math.random() - 0.5) * 0.65,
        r: Math.random() * 2 + 1.2,
        a: Math.random() * 0.5 + 0.25,
        c: PALETTE[Math.random() > 0.4 ? 0 : 1],
      }))
    }

    const resize = () => {
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (!particles.length) spawn()
      else
        particles.forEach((p) => {
          p.x = Math.min(p.x, width)
          p.y = Math.min(p.y, height)
        })
      if (reduced) draw(false)
    }

    const glow = (cx, cy, r, ox, oy, rgb, a) => {
      const g = ctx.createRadialGradient(cx + ox, cy + oy, 10, cx, cy, r)
      g.addColorStop(0, `rgba(${rgb}, ${a})`)
      g.addColorStop(0.5, `rgba(${rgb}, ${a * 0.22})`)
      g.addColorStop(1, `rgba(${rgb}, 0)`)
      ctx.fillStyle = g
      ctx.fillRect(0, 0, width, height)
    }

    const draw = (advance = true) => {
      if (advance) time += 0.015
      ctx.clearRect(0, 0, width, height)
      glow(width * 0.35, height * 0.45, width * 0.65, Math.sin(time * 0.6) * 60, Math.cos(time * 0.5) * 50, PALETTE[0], 0.18)
      glow(width * 0.68, height * 0.55, width * 0.6, Math.cos(time * 0.7) * 70, Math.sin(time * 0.8) * 50, PALETTE[1], 0.14)

      const maxDist = 110
      ctx.lineWidth = 0.8
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        if (advance) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > width) p.vx *= -1
          if (p.y < 0 || p.y > height) p.vy *= -1
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.c}, ${p.a})`
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const d = Math.hypot(dx, dy)
          if (d < maxDist) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(160, 140, 255, ${(1 - d / maxDist) * 0.22})`
            ctx.stroke()
          }
        }
      }
    }

    const loop = () => {
      draw()
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (reduced || raf || !inViewRef.current || document.hidden) return
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    const sync = () => {
      const v = videoRef.current
      const active = inViewRef.current && !document.hidden
      if (active) {
        start()
        v?.play().catch(() => {})
      } else {
        stop()
        v?.pause()
      }
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting
        sync()
      },
      { threshold: 0.05 },
    )
    const ro = new ResizeObserver(resize)

    resize()
    io.observe(container)
    ro.observe(canvas)
    document.addEventListener('visibilitychange', sync)
    start()

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', sync)
    }
  }, [isDesktop, reduced])

  return (
    <div ref={containerRef} className={`relative h-full w-full overflow-hidden ${className}`}>
      {/* Optional self-hosted royalty-free loop (desktop only, canvas is the fallback). */}
      {showVideo && (
        <video
          ref={setVideoRef}
          src={videoSrc}
          poster={poster ?? undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={() => setVideoLoaded(true)}
          onError={() => setVideoError(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        />
      )}

      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      />

      <div className={`pointer-events-none absolute inset-0 ${overlayOpacity}`} aria-hidden="true" />
    </div>
  )
}

import { useCallback, useRef } from 'react'

/**
 * Tiny synthesised "tick" (WebAudio) played on
 * awards-row hover; synthesising it keeps the build asset-free.
 * Audio only starts after a user gesture (browser policy), so it's safe.
 */
export function useClickSound() {
  const ctxRef = useRef(null)
  return useCallback(() => {
    try {
      const AC = window.AudioContext || window.webkitAudioContext
      if (!AC) return
      const ctx = (ctxRef.current ||= new AC())
      if (ctx.state === 'suspended') {
        if (!navigator.userActivation?.hasBeenActive) return
        ctx.resume()
      }
      const t = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(1500, t)
      osc.frequency.exponentialRampToValueAtTime(380, t + 0.04)
      gain.gain.setValueAtTime(0.0001, t)
      gain.gain.exponentialRampToValueAtTime(0.05, t + 0.004)
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.06)
      osc.connect(gain).connect(ctx.destination)
      osc.start(t)
      osc.stop(t + 0.07)
    } catch { /* audio is a nicety, never fatal */ }
  }, [])
}

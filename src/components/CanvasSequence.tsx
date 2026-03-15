'use client'

import { useEffect, useRef, useState } from 'react'

const TOTAL_FRAMES = 60

// Clamp helper
function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v))
}

export default function CanvasSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const [loaded, setLoaded] = useState(0)

  // Render state kept in refs - never cause re-renders
  const currentFrameRef = useRef(0)   // smoothed float frame position
  const targetFrameRef  = useRef(0)   // raw target from scroll
  const rafRef          = useRef(0)
  const dprRef          = useRef(1)

  // ── Preload all frames eagerly ─────────────────────────────────────────────
  useEffect(() => {
    let count = 0
    const imgs: HTMLImageElement[] = new Array(TOTAL_FRAMES)

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image()
      const padded = String(i).padStart(3, '0')
      img.src = `/frames/ezgif-frame-${padded}.jpg`
      img.decoding = 'async'
      img.onload = () => {
        count++
        setLoaded(count)
        imgs[i - 1] = img
        if (count === TOTAL_FRAMES) {
          imagesRef.current = imgs
        }
      }
      img.onerror = () => { count++; setLoaded(count) }
    }
  }, [])

  // ── Canvas resize with DPR capped at 2 ────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      // Cap DPR at 2 to avoid GPU memory OOM on high-DPR phones
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      dprRef.current = dpr
      canvas.width  = Math.round(window.innerWidth  * dpr)
      canvas.height = Math.round(window.innerHeight * dpr)
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      }
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })
    return () => window.removeEventListener('resize', resize)
  }, [])

  // ── Native scroll listener → update targetFrame ───────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const docH   = document.documentElement.scrollHeight - window.innerHeight
      const prog   = docH > 0 ? clamp(window.scrollY / docH, 0, 1) : 0
      targetFrameRef.current = prog * (TOTAL_FRAMES - 1)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // init on mount
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── rAF render loop: lerp currentFrame → target, then draw ───────────────
  useEffect(() => {
    const isMobile = () => window.innerWidth < 768

    const render = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const imgs = imagesRef.current
      if (!imgs || imgs.length < TOTAL_FRAMES) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Lerp speed: faster on mobile so it feels responsive
      const lerpFactor = isMobile() ? 0.18 : 0.12
      currentFrameRef.current += (targetFrameRef.current - currentFrameRef.current) * lerpFactor

      const rawIdx   = clamp(currentFrameRef.current, 0, TOTAL_FRAMES - 1)
      const floorIdx = Math.floor(rawIdx)
      const ceilIdx  = Math.min(TOTAL_FRAMES - 1, floorIdx + 1)
      const blend    = rawIdx - floorIdx

      const imgA = imgs[floorIdx]
      const imgB = imgs[ceilIdx]
      if (!imgA) return

      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'

      const cw = window.innerWidth
      const ch = window.innerHeight

      // Subtle zoom arc keeps the image feeling dynamic
      const progress = rawIdx / (TOTAL_FRAMES - 1)
      const zoom = 0.85 + Math.sin(progress * Math.PI) * 0.15

      const drawParams = (img: HTMLImageElement) => {
        const base = Math.max(cw / img.width, ch / img.height) * zoom
        return {
          dw: img.width  * base,
          dh: img.height * base,
          dx: (cw - img.width  * base) / 2,
          dy: (ch - img.height * base) / 2,
        }
      }

      ctx.clearRect(0, 0, cw, ch)

      // Darken for text readability
      ctx.filter = 'brightness(0.55) contrast(1.1)'

      const a = drawParams(imgA)
      ctx.globalAlpha = 1
      ctx.drawImage(imgA, a.dx, a.dy, a.dw, a.dh)

      // Cross-dissolve to next frame
      if (blend > 0 && imgB) {
        const b = drawParams(imgB)
        ctx.globalAlpha = blend
        ctx.drawImage(imgB, b.dx, b.dy, b.dw, b.dh)
        ctx.globalAlpha = 1
      }

      ctx.filter = 'none'
    }

    const loop = () => {
      render()
      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const pct = Math.round((loaded / TOTAL_FRAMES) * 100)
  const isLoading = loaded < TOTAL_FRAMES

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          display: 'block',
          zIndex: 0,
          // Let the browser know we only need vertical scrolling - don't hijack touch
          touchAction: 'pan-y',
        }}
      />

      {/* Loading overlay */}
      {isLoading && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: '#000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
          }}
        >
          {/* Animated ring */}
          <div style={{ position: 'relative', width: '56px', height: '56px' }}>
            <svg viewBox="0 0 56 56" style={{ position: 'absolute', inset: 0, animation: 'spin 1.4s linear infinite' }}>
              <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,140,60,0.15)" strokeWidth="3" />
              <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,140,60,0.9)" strokeWidth="3"
                strokeDasharray={`${(pct / 100) * 150.8} 150.8`}
                strokeLinecap="round"
                strokeDashoffset="0"
                transform="rotate(-90 28 28)"
              />
            </svg>
            <span style={{
              position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'rgba(255,140,60,0.9)', fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 700,
            }}>
              {pct}
            </span>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter, sans-serif', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
            Loading
          </p>
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
      )}
    </>
  )
}

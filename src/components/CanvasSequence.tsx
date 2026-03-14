'use client'

import { useEffect, useRef, useState } from 'react'
import { useScroll, useTransform, useSpring } from 'framer-motion'

const TOTAL_FRAMES = 60

export default function CanvasSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const [loaded, setLoaded] = useState(0)
  const rafRef = useRef<number>(0)
  const dprRef = useRef<number>(1)

  const { scrollYProgress } = useScroll()

  // Ultra-smooth spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    mass: 0.3,
    restDelta: 0.0001,
  })

  const frameIndex = useTransform(smoothProgress, [0, 1], [0, TOTAL_FRAMES - 1])

  // ── Preload all frames eagerly ────────────────────────────────────────────
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

  // ── Canvas resize with DPR ────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      dprRef.current = dpr
      canvas.width = Math.round(window.innerWidth * dpr)
      canvas.height = Math.round(window.innerHeight * dpr)
      const ctx = canvas.getContext('2d')
      if (ctx) {
        // setTransform is ABSOLUTE — avoids compounding scale on every resize
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      }
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  // ── Render loop: smooth cross-dissolve between adjacent frames ───────────
  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const imgs = imagesRef.current
      if (!imgs || imgs.length < TOTAL_FRAMES) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Always enforce HQ smoothing — context state can be lost
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'

      // Raw float frame position — e.g. 12.73
      const rawIdx = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameIndex.get()))

      const floorIdx = Math.floor(rawIdx)                          // frame A
      const ceilIdx  = Math.min(TOTAL_FRAMES - 1, floorIdx + 1)   // frame B
      const blend    = rawIdx - floorIdx                           // 0..1 how much of B to show

      const imgA = imgs[floorIdx]
      const imgB = imgs[ceilIdx]
      if (!imgA) return

      const cw = window.innerWidth
      const ch = window.innerHeight

      // Dynamic zoom: slight zoom-out base (0.85) + sine curve peaks at midpoint
      // Lower base = more of the image visible = sharper appearance
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

      // Apply brightness/contrast filter to darken background for text readability
      ctx.filter = 'brightness(0.55) contrast(1.1)'

      // Draw frame A at full opacity
      const a = drawParams(imgA)
      ctx.globalAlpha = 1
      ctx.drawImage(imgA, a.dx, a.dy, a.dw, a.dh)

      // Cross-dissolve: draw frame B over A at blend opacity
      if (blend > 0 && imgB) {
        const b = drawParams(imgB)
        ctx.globalAlpha = blend
        ctx.drawImage(imgB, b.dx, b.dy, b.dw, b.dh)
        ctx.globalAlpha = 1
      }

      // Reset filter so nothing else is affected
      ctx.filter = 'none'
    }

    const loop = () => {
      render()
      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [frameIndex])

  const pct = Math.round((loaded / TOTAL_FRAMES) * 100)
  const isLoading = loaded < TOTAL_FRAMES

  return (
    <>
      {/* Fixed canvas always behind everything */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          display: 'block',
          zIndex: 0,
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
          {/* Progress bar */}
          <div style={{ width: '180px', height: '2px', background: 'rgba(255,255,255,0.15)', borderRadius: '99px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${pct}%`,
                background: 'white',
                borderRadius: '99px',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'sans-serif', fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            {pct}%
          </p>
        </div>
      )}
    </>
  )
}

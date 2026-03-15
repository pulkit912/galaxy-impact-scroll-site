'use client'

import { useEffect, useRef } from 'react'

// Each badge: scrollStart/End = 0–1 range of page progress where it's visible
interface Badge {
  id: string
  label: string
  sub: string
  scrollStart: number
  scrollEnd: number
  speed: number        // parallax speed multiplier
  position: React.CSSProperties
}

const BADGES: Badge[] = [
  {
    id: 'garp',
    label: 'Monkey D. Garp',
    sub: 'Hero of the Marines',
    scrollStart: 0.02,
    scrollEnd: 0.22,
    speed: -0.18,
    position: { left: '5%', top: '22%' },
  },
  {
    id: 'hachinosu',
    label: 'Hachinosu',
    sub: 'Island of Pirates',
    scrollStart: 0.28,
    scrollEnd: 0.52,
    speed: 0.14,
    position: { right: '5%', bottom: '28%' },
  },
  {
    id: 'galaxy',
    label: 'Galaxy Impact',
    sub: '銀河天翔',
    scrollStart: 0.55,
    scrollEnd: 0.80,
    speed: -0.22,
    position: { left: '50%', top: '55%', transform: 'translateX(-50%)' },
  },
]

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v))
}

export default function ParallaxTextOverlay() {
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([])
  const rafRef = useRef(0)
  const scrollRef = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const loop = () => {
      const scrollY = scrollRef.current
      const docH = document.documentElement.scrollHeight - window.innerHeight
      const prog = docH > 0 ? clamp(scrollY / docH, 0, 1) : 0

      BADGES.forEach((badge, i) => {
        const el = badgeRefs.current[i]
        if (!el) return

        // Fade window with smooth margins
        const fadeRange = 0.04
        let opacity = 0
        if (prog >= badge.scrollStart && prog <= badge.scrollEnd) {
          const fadeIn  = clamp((prog - badge.scrollStart) / fadeRange, 0, 1)
          const fadeOut = clamp((badge.scrollEnd - prog) / fadeRange, 0, 1)
          opacity = Math.min(fadeIn, fadeOut)
        }

        // Parallax offset based on scroll position within the badge window
        const windowCenter = (badge.scrollStart + badge.scrollEnd) / 2
        const offsetPx = (prog - windowCenter) * badge.speed * window.innerHeight

        el.style.opacity = String(opacity)
        el.style.transform = `translateY(${offsetPx}px)${badge.id === 'galaxy' ? ' translateX(-50%)' : ''}`
      })

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 8,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {BADGES.map((badge, i) => (
        <div
          key={badge.id}
          ref={(el) => { badgeRefs.current[i] = el }}
          style={{
            position: 'absolute',
            opacity: 0,
            willChange: 'transform, opacity',
            ...badge.position,
          }}
        >
          {/* Badge card */}
          <div
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              gap: '4px',
              padding: '10px 16px 10px 14px',
              background: 'rgba(0,0,0,0.45)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,140,60,0.25)',
              borderLeft: '3px solid rgba(255,140,60,0.8)',
              borderRadius: '6px',
              maxWidth: '200px',
              boxShadow: '0 4px 32px rgba(0,0,0,0.5), 0 0 40px rgba(255,100,30,0.08)',
            }}
          >
            <span
              style={{
                fontFamily: "'Bebas Neue', 'Inter', sans-serif",
                fontSize: 'clamp(14px, 3.5vw, 20px)',
                fontWeight: 900,
                letterSpacing: '0.08em',
                color: '#fff',
                textShadow: '0 0 20px rgba(255,140,60,0.45)',
                lineHeight: 1,
                whiteSpace: 'nowrap',
              }}
            >
              {badge.label}
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(9px, 2vw, 11px)',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(255,140,60,0.8)',
                lineHeight: 1,
                whiteSpace: 'nowrap',
              }}
            >
              {badge.sub}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

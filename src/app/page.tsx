import CanvasSequence from '@/components/CanvasSequence'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import CinematicSections from '@/components/CinematicSections'
import ParallaxTextOverlay from '@/components/ParallaxTextOverlay'
import ProjectGrid from '@/components/ProjectGrid'

export default function Home() {
  return (
    <>
      {/* ── Fixed background canvas (z 0) ─────────────────────────────────── */}
      <CanvasSequence />

      {/* ── Parallax text badges (z 8) ────────────────────────────────────── */}
      <ParallaxTextOverlay />

      {/* ── Vignette layers (z 1) ─────────────────────────────────────────── */}
      {/* Radial dark edges */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at center, transparent 28%, rgba(0,0,0,0.78) 100%)',
        }}
      />
      {/* Top / bottom gradient for navbar and footer readability */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* ── Fixed Navbar (z 50) ───────────────────────────────────────────── */}
      <Navbar />

      {/* ── Scrollable content (z 10) ─────────────────────────────────────── */}
      <main style={{ position: 'relative', zIndex: 10 }}>

        <HeroSection />

        <CinematicSections />

        {/* ── Project Grid ──────────────────────────────────────────────────── */}
        <ProjectGrid />

        {/* ── Ad slot ──────────────────────────────────────────────────────── */}
        <section className="py-8 sm:py-10 px-4 sm:px-6 flex justify-center">
          <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center min-h-[80px] sm:min-h-[100px]">
            <p className="text-white/20 text-xs tracking-widest uppercase font-semibold">Advertisement</p>
          </div>
        </section>

        {/* ── Footer ───────────────────────────────────────────────────────── */}
        <footer className="py-10 sm:py-16 px-5 sm:px-8 text-center border-t border-white/5 flex flex-col items-center gap-3 sm:gap-4">
          <div className="w-10 sm:w-12 h-px bg-gradient-to-r from-transparent via-orange-400/60 to-transparent" />
          <p className="text-white/40 text-xs sm:text-sm font-semibold tracking-wider sm:tracking-widest">
            Inspired by the legendary moment from One Piece.
          </p>
          <p className="text-white/20 text-[10px] sm:text-xs tracking-widest uppercase font-light">
            Galaxy Impact &copy; {new Date().getFullYear()}
          </p>
          <p className="text-white/25 text-[10px] tracking-widest font-medium">
            Built by <span className="text-orange-400/60">Pulkit</span>
          </p>
        </footer>
      </main>
    </>
  )
}

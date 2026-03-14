'use client'

import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center text-center px-5 sm:px-8"
    >
      {/* Top ornament */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent mb-8 sm:mb-10"
      />

      {/* Main title — scales gracefully from small phone to large desktop */}
      <motion.h1
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        className="text-[4rem] xs:text-7xl sm:text-8xl md:text-[9rem] lg:text-[12rem] xl:text-[14rem] font-black leading-none tracking-tighter uppercase"
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,140,60,0.85) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 0 60px rgba(255,110,40,0.55))',
        }}
      >
        GALAXY
        <br />
        IMPACT
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.9 }}
        className="mt-6 sm:mt-8 text-base sm:text-xl md:text-2xl text-white/80 font-semibold tracking-wide max-w-xs sm:max-w-sm md:max-w-lg"
        style={{ textShadow: '0 2px 16px rgba(0,0,0,0.9)' }}
      >
        The fist that shook the island.
      </motion.p>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 1.1 }}
        className="mt-8 w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
      />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 sm:bottom-12 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] text-white/50 uppercase">
          Scroll to experience
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1"
        >
          <div className="w-px h-6 sm:h-8 bg-gradient-to-b from-white/40 to-transparent" />
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M1 1L6 7L11 1" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}

'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// ── Shared styles ─────────────────────────────────────────────────────────────

const glowText = {
  textShadow: '0 0 40px rgba(255,120,50,0.5), 0 2px 20px rgba(0,0,0,0.95)',
}
const solidText = {
  textShadow: '0 2px 20px rgba(0,0,0,0.95), 0 0 60px rgba(0,0,0,0.8)',
}

// ── Standard story section ─────────────────────────────────────────────────────

interface StorySectionProps {
  id?: string
  chapter?: string
  heading: string
  body?: string
  align?: 'left' | 'center' | 'right'
  headingColor?: string
}

function StorySection({ id, chapter, heading, body, align = 'center', headingColor = 'white' }: StorySectionProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: false, amount: 0.3 })

  // Responsive alignment — on mobile always center for readability
  const alignClass =
    align === 'left'
      ? 'items-start text-left pl-5 sm:pl-10 md:pl-20 lg:pl-36 pr-5 sm:pr-8'
      : align === 'right'
      ? 'items-end text-right pr-5 sm:pr-10 md:pr-20 lg:pr-36 pl-5 sm:pl-8'
      : 'items-center text-center px-5 sm:px-10 md:px-20'

  return (
    <section
      id={id}
      ref={ref}
      className={`min-h-[100dvh] flex flex-col justify-center ${alignClass} py-20 sm:py-24`}
    >
      {chapter && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="text-[10px] sm:text-xs font-black tracking-[0.4em] uppercase text-orange-400/80 mb-4 sm:mb-5"
          style={solidText}
        >
          {chapter}
        </motion.p>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="text-[2.2rem] leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight max-w-3xl"
        style={{ color: headingColor, ...glowText }}
      >
        {heading}
      </motion.h2>

      {body && (
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.85, ease: 'easeOut', delay: 0.3 }}
          className="mt-5 sm:mt-7 text-sm sm:text-base md:text-lg lg:text-xl text-white font-semibold max-w-xs sm:max-w-sm md:max-w-xl leading-relaxed"
          style={solidText}
        >
          {body}
        </motion.p>
      )}
    </section>
  )
}

// ── Galaxy Impact stamp ─────────────────────────────────────────────────────

function GalaxyImpactStamp() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: false, amount: 0.35 })

  return (
    <section
      id="impact"
      ref={ref}
      className="min-h-[100dvh] flex flex-col items-center justify-center text-center px-4 sm:px-8 gap-4 sm:gap-6"
    >
      <motion.div
        initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8 }}
        className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.75 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.75 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Responsive font: starts at 4rem on tiny phones, scales to 14rem on large desktop */}
        <span className="block text-[3.5rem] xs:text-6xl sm:text-8xl md:text-[9rem] lg:text-[12rem] xl:text-[14rem] font-black leading-none tracking-tighter"
          style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #FF8C32 60%, #FF3A10 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            filter: 'drop-shadow(0 0 60px rgba(255,100,30,0.65))',
          }}>
          GALAXY
        </span>
        <span className="block text-[3.5rem] xs:text-6xl sm:text-8xl md:text-[9rem] lg:text-[12rem] xl:text-[14rem] font-black leading-none tracking-tighter"
          style={{
            background: 'linear-gradient(180deg, #FF8C32 0%, #FF2200 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            filter: 'drop-shadow(0 0 80px rgba(255,50,10,0.7))',
          }}>
          IMPACT
        </span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-sm sm:text-lg md:text-xl text-white/85 font-semibold tracking-wide max-w-xs sm:max-w-none"
        style={solidText}
      >
        A punch carrying the power of the cosmos.
      </motion.p>

      <motion.div
        initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent"
      />
    </section>
  )
}

// ── Final banner ────────────────────────────────────────────────────────────

function FinalBanner() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: false, amount: 0.25 })

  return (
    <section
      ref={ref}
      className="min-h-[100dvh] flex flex-col items-center justify-center text-center px-5 sm:px-10 md:px-20 gap-6 sm:gap-8"
    >
      <motion.p
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.7 }}
        className="text-[10px] sm:text-xs font-black tracking-[0.4em] text-orange-400/80 uppercase"
        style={solidText}
      >
        The Legend
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="text-[2rem] leading-tight sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white max-w-xs sm:max-w-2xl md:max-w-4xl"
        style={{ textShadow: '0 0 80px rgba(255,120,50,0.4), 0 2px 30px rgba(0,0,0,0.98)' }}
      >
        WHEN A SINGLE FIST STRUCK LIKE A GALAXY
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.1, delay: 0.5 }}
        className="w-28 sm:w-40 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent"
      />

      <motion.p
        initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-xs sm:text-base md:text-lg text-white/60 font-semibold tracking-wider"
        style={solidText}
      >
        — Monkey D. Garp · Hachinosu · One Piece
      </motion.p>
    </section>
  )
}

// ── Main export ─────────────────────────────────────────────────────────────

export default function CinematicSections() {
  return (
    <div className="relative z-10" id="story">
      <StorySection id="story" chapter="Chapter I · Hachinosu" heading="THE SKY GREW QUIET"
        body="Above the pirate island of Hachinosu, chaos filled the streets. Pirates laughed and buildings burned, unaware of the shadow forming in the sky."
        align="left" />

      <StorySection chapter="Chapter II · The Arrival" heading="A LEGEND DESCENDS"
        body="A man who once cornered the Pirate King. The Hero of the Marines. Monkey D. Garp."
        align="right" headingColor="#FFB97A" />

      <StorySection chapter="Chapter III · The Gathering" heading="THE AIR BEGAN TO TREMBLE"
        body="Garp raised his fist. The clouds twisted. The ocean roared. An unimaginable force gathered in the sky."
        align="left" />

      <GalaxyImpactStamp />

      <StorySection chapter="Chapter V · The Aftermath" heading="THE SHOCKWAVE SPREAD"
        body="Buildings shattered. The island trembled. Pirates were thrown into the sky by the force of a single punch."
        align="right" />

      <StorySection chapter="Chapter VI · The Stillness" heading="SILENCE"
        body="Dust drifted through the air. The battlefield froze in shock."
        align="center" headingColor="#C8DCFF" />

      <StorySection id="about" chapter="Chapter VII · The Man" heading="THE HERO OF THE MARINES"
        body="The man who once fought the Pirate King. Monkey D. Garp."
        align="left" headingColor="#FFB97A" />

      <FinalBanner />
    </div>
  )
}

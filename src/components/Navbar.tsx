'use client'

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const NAV_LINKS = ['Story', 'Impact', 'About']

export default function Navbar() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 60)
    if (y > 60) setMenuOpen(false) // auto-close on scroll
  })

  return (
    <>
      <motion.nav
        animate={{
          backgroundColor: scrolled || menuOpen ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0)',
          backdropFilter: scrolled || menuOpen ? 'blur(14px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
        }}
        className="px-5 sm:px-8 md:px-12 py-3 sm:py-4 flex items-center justify-between"
      >
        {/* Site title */}
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-white font-black text-base sm:text-lg md:text-xl tracking-widest uppercase"
          style={{ textShadow: '0 0 30px rgba(255,140,60,0.5)' }}
        >
          GALAXY IMPACT
        </motion.span>

        {/* Desktop nav links */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="hidden md:flex items-center gap-8 lg:gap-10"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-white/70 hover:text-white text-sm font-semibold tracking-widest uppercase transition-colors duration-200"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
            >
              {link}
            </a>
          ))}
        </motion.div>

        {/* Mobile hamburger button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] focus:outline-none"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="block w-6 h-[2px] bg-white rounded-full origin-center"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            className="block w-6 h-[2px] bg-white rounded-full"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className="block w-6 h-[2px] bg-white rounded-full origin-center"
          />
        </motion.button>
      </motion.nav>

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              top: '56px',
              left: 0,
              right: 0,
              zIndex: 49,
              background: 'rgba(0,0,0,0.92)',
              backdropFilter: 'blur(16px)',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}
            className="flex flex-col px-6 py-6 gap-5 md:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setMenuOpen(false)}
                className="text-white font-black text-2xl tracking-widest uppercase border-b border-white/10 pb-4 last:border-0 last:pb-0"
                style={{ textShadow: '0 0 20px rgba(255,140,60,0.4)' }}
              >
                {link}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

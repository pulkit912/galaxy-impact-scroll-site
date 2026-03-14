'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

export default function OverlayUI() {
  const { scrollYProgress } = useScroll();
  
  // Fade out early in the scroll (e.g., first 5%)
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <motion.div 
      style={{ opacity }}
      className="absolute top-0 left-0 w-full h-screen flex flex-col items-center justify-center p-8 pointer-events-none z-10"
    >
      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 mb-6 drop-shadow-2xl">
        Cosmic Impact
      </h1>
      <p className="text-lg md:text-xl text-white/70 max-w-2xl text-center mb-12">
        Scroll down to experience the galaxy.
      </p>
      
      <div className="absolute bottom-12 flex flex-col items-center opacity-80 animate-bounce">
        <span className="text-sm font-medium tracking-widest text-white/60 mb-2 uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
      </div>
    </motion.div>
  )
}

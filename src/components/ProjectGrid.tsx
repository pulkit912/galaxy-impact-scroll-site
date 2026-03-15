'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface Project {
  title: string
  description: string
  tags: string[]
  accentColor: string
  icon: string
  year: string
}

const PROJECTS: Project[] = [
  {
    title: 'Galaxy Impact',
    description: 'Scroll-driven cinematic tribute site with canvas image sequences synced to scroll progress. Inspired by One Piece.',
    tags: ['Next.js', 'Canvas API', 'Framer Motion'],
    accentColor: '#FF8C32',
    icon: '✦',
    year: '2024',
  },
  {
    title: 'Nexus Particle Engine',
    description: 'WebGL-powered interactive particle simulation with real-time mouse physics and 50k+ particle support.',
    tags: ['WebGL', 'GLSL', 'React'],
    accentColor: '#6EE7F7',
    icon: '◈',
    year: '2024',
  },
  {
    title: 'Voxel Parallax World',
    description: '2D cinematic parallax landscape with day/night cycle transitions driven entirely by scroll position.',
    tags: ['React', 'CSS Shaders', 'Vite'],
    accentColor: '#A78BFA',
    icon: '⬡',
    year: '2024',
  },
  {
    title: 'Galaxy Simulator',
    description: 'Real-time GPU-accelerated galaxy particle simulation with mouse-driven gravitational interactions.',
    tags: ['WebGL2', 'GLSL', 'TypeScript'],
    accentColor: '#34D399',
    icon: '⊛',
    year: '2024',
  },
  {
    title: 'Fluid Shader Playground',
    description: 'Interactive fluid dynamics simulation using compute-style fragment shaders with touch/mouse support.',
    tags: ['GLSL', 'WebGL', 'Canvas'],
    accentColor: '#F472B6',
    icon: '≋',
    year: '2024',
  },
  {
    title: 'Developer Portfolio',
    description: 'Dark-theme developer portfolio with animated sections, smooth scroll navigation, and project showcases.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    accentColor: '#FBBF24',
    icon: '◉',
    year: '2024',
  },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.12 }}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        padding: '28px 24px 24px',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
      }}
      whileHover={{
        y: -6,
        boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${project.accentColor}18`,
        borderColor: `${project.accentColor}40`,
      }}
    >
      {/* Top glow line */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: '20%', right: '20%',
          height: '1px',
          background: `linear-gradient(to right, transparent, ${project.accentColor}80, transparent)`,
        }}
      />

      {/* Icon + year row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <span
          style={{
            fontSize: '28px',
            lineHeight: 1,
            color: project.accentColor,
            filter: `drop-shadow(0 0 8px ${project.accentColor}80)`,
          }}
        >
          {project.icon}
        </span>
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.25)',
          }}
        >
          {project.year}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "'Bebas Neue', 'Inter', sans-serif",
          fontSize: 'clamp(20px, 4vw, 26px)',
          fontWeight: 900,
          letterSpacing: '0.06em',
          color: '#fff',
          marginBottom: '10px',
          textShadow: `0 0 24px ${project.accentColor}40`,
        }}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '13px',
          lineHeight: 1.65,
          color: 'rgba(255,255,255,0.55)',
          marginBottom: '20px',
          fontWeight: 400,
        }}
      >
        {project.description}
      </p>

      {/* Tech tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: project.accentColor,
              background: `${project.accentColor}15`,
              border: `1px solid ${project.accentColor}30`,
              borderRadius: '99px',
              padding: '3px 10px',
              lineHeight: 1.8,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function ProjectGrid() {
  const headingRef = useRef<HTMLDivElement>(null)
  const headingInView = useInView(headingRef, { once: true, amount: 0.4 })

  return (
    <section
      id="projects"
      style={{
        position: 'relative',
        zIndex: 10,
        padding: 'clamp(64px, 10vw, 120px) clamp(20px, 5vw, 80px)',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {/* Section header */}
      <div
        ref={headingRef}
        style={{ textAlign: 'center', marginBottom: 'clamp(40px, 7vw, 72px)' }}
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'rgba(255,140,60,0.8)',
            marginBottom: '16px',
            textShadow: '0 2px 16px rgba(0,0,0,0.8)',
          }}
        >
          Selected Work
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{
            fontFamily: "'Bebas Neue', 'Inter', sans-serif",
            fontSize: 'clamp(42px, 8vw, 88px)',
            fontWeight: 900,
            letterSpacing: '0.04em',
            color: '#fff',
            lineHeight: 1,
            textShadow: '0 0 60px rgba(255,120,50,0.3), 0 2px 24px rgba(0,0,0,0.98)',
          }}
        >
          PROJECTS
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={headingInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.3 }}
          style={{
            width: '80px',
            height: '2px',
            background: 'linear-gradient(to right, transparent, rgba(255,140,60,0.8), transparent)',
            margin: '20px auto 0',
          }}
        />
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
          gap: 'clamp(16px, 3vw, 28px)',
        }}
      >
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}

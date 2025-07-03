import './Skills.scss'
import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules'
import { motion } from 'framer-motion'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

const skills = [
  { name: 'HTML5', icon: '/solis-portfolio/assets/html.png', level: 95 },
  { name: 'CSS3', icon: '/solis-portfolio/assets/css.png', level: 90 },
  { name: 'JS', icon: '/solis-portfolio/assets/js.png', level: 92 },
  { name: 'Bootstrap', icon: '/solis-portfolio/assets/bootstrap.png', level: 85 },
  { name: 'Python', icon: '/solis-portfolio/assets/python.png', level: 93 },
  { name: 'Django', icon: '/solis-portfolio/assets/django.png', level: 88 },
  { name: 'PHP', icon: '/solis-portfolio/assets/php.png', level: 80 },
  { name: 'MySQL', icon: '/solis-portfolio/assets/mysql.png', level: 87 },
]

// Firecracker spark effect component
const FirecrackerSpark = () => (
  <span className="skill-bar-spark firecracker">
    {[0, 1, 2, 3, 4].map(i => (
      <span
        key={i}
        className={`sparkle sparkle-${i}`}
        style={{
          left: `${i * 6 - 12}px`,
          animation: `sparkle-burst-${i} 1.2s ${i * 0.08}s infinite alternate`
        }}
      />
    ))}
  </span>
)

// Custom hook for responsive breakpoint
function useIsDesktop(breakpoint = 900) {
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= breakpoint : false)
  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= breakpoint)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [breakpoint])
  return isDesktop
}

const Rocketship = () => {
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const [pulse, setPulse] = useState(false)
  const [bezier, setBezier] = useState({
    t: 0,
    duration: 2.5,
    start: { x: 50, y: 50 },
    cp: { x: 50, y: 50 },
    end: { x: 50, y: 50 }
  })
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const [_, setRerender] = useState(0) // force rerender for rocket position

  // Particle system state (not in React state for perf)
  const particles = useRef([])
  const MAX_PARTICLES = 200;

  // Helper: generate a new random bezier path from a given point
  function newBezier(from) {
    const angle = Math.random() * 2 * Math.PI
    const dist = 30 + Math.random() * 40
    const end = {
      x: Math.max(5, Math.min(95, from.x + Math.cos(angle) * dist)),
      y: Math.max(5, Math.min(90, from.y + Math.sin(angle) * dist))
    }
    // Control point for arc/curve
    const midAngle = angle + (Math.random() - 0.5) * Math.PI / 2
    const cp = {
      x: Math.max(5, Math.min(95, (from.x + end.x) / 2 + Math.cos(midAngle) * dist * 0.4)),
      y: Math.max(5, Math.min(90, (from.y + end.y) / 2 + Math.sin(midAngle) * dist * 0.4))
    }
    return {
      t: 0,
      duration: 2 + Math.random() * 1.5,
      start: from,
      cp,
      end
    }
  }

  // Animate rocket and emit fire particles
  useEffect(() => {
    let running = true
    let last = performance.now()
    function animate(now) {
      if (!running) return
      const dt = (now - last) / 1000
      last = now
      setBezier(bz => {
        let t = bz.t + dt / bz.duration
        if (t >= 1) {
          const next = newBezier(bz.end)
          setPos({ x: bz.end.x, y: bz.end.y })
          return { ...next, t: 0 }
        }
        // Quadratic Bezier interpolation
        const lerp = (a, b, t) => a + (b - a) * t
        const bezierPt = (t, p0, p1, p2) =>
          lerp(lerp(p0, p1, t), lerp(p1, p2, t), t)
        const x = bezierPt(t, bz.start.x, bz.cp.x, bz.end.x)
        const y = bezierPt(t, bz.start.y, bz.cp.y, bz.end.y)
        setPos({ x, y })
        setRerender(r => r + 1) // force rerender for rocket
        // Emit fire particles from tail (1 per frame)
        const section = document.getElementById('skills')
        const width = section ? section.offsetWidth : window.innerWidth
        const height = section ? section.offsetHeight : window.innerHeight
        const tailOffsetPx = 32
        const px = (x / 100) * width
        const py = ((y + (tailOffsetPx / height) * 100) / 100) * height
        for (let i = 0; i < 1; ++i) { // emit 1 particle per frame
          const angle = Math.PI / 2 + (Math.random() - 0.5) * 0.4 // less random, more downward
          const speed = 28 + Math.random() * 22 // slightly slower
          particles.current.push({
            x: px,
            y: py,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            r: 5 + Math.random() * 4, // smaller particles
            life: 1,
            color: [
              [255, 255, 200], // yellow
              [255, 200, 80],  // orange
              [255, 80, 0]     // red
            ][Math.floor(Math.random() * 3)]
          })
        }
        // Cap the number of particles
        if (particles.current.length > MAX_PARTICLES) {
          particles.current.splice(0, particles.current.length - MAX_PARTICLES)
        }
        return { ...bz, t }
      })
      requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
    return () => { running = false }
  }, [])

  // Animate and draw fire particles (throttle to 30 FPS)
  useEffect(() => {
    let running = true
    let lastDraw = 0;
    function draw(now) {
      if (!running) return
      if (now - lastDraw < 1000 / 30) {
        requestAnimationFrame(draw)
        return
      }
      lastDraw = now
      const canvas = canvasRef.current
      const section = document.getElementById('skills')
      if (!canvas || !section) return requestAnimationFrame(draw)
      const width = section.offsetWidth
      const height = section.offsetHeight
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, width, height)
      // Animate and draw
      particles.current = particles.current.filter(p => p.life > 0)
      for (const p of particles.current) {
        // Animate
        p.x += p.vx * 0.016
        p.y += p.vy * 0.016
        p.r *= 0.985 // fade radius more gradually
        p.life -= 0.016 * 0.18 // fade out a bit faster
        // Draw
        const [r, g, b] = p.color
        ctx.save()
        ctx.globalAlpha = Math.max(0, p.life)
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r)
        grad.addColorStop(0, `rgba(${r},${g},${b},1)`)
        grad.addColorStop(0.3, `rgba(${r},${g},${b},0.7)`)
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI)
        ctx.fillStyle = grad
        ctx.shadowColor = `rgba(${r},${g},${b},0.7)`
        ctx.shadowBlur = 24
        ctx.fill()
        ctx.restore()
      }
      requestAnimationFrame(draw)
    }
    requestAnimationFrame(draw)
    return () => { running = false }
  }, [])

  // Pulse flicker
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true)
      setTimeout(() => setPulse(false), 180)
    }, 900)
    return () => clearInterval(interval)
  }, [])

  // Get section size for rocket position
  useEffect(() => {
    sectionRef.current = document.getElementById('skills')
  }, [])
  const width = sectionRef.current ? sectionRef.current.offsetWidth : window.innerWidth
  const height = sectionRef.current ? sectionRef.current.offsetHeight : window.innerHeight
  const tailOffsetPx = 32
  const rocketLeft = `${pos.x}%`
  const rocketTop = `${pos.y}%`

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: rocketLeft,
          top: rocketTop,
          zIndex: 3,
          pointerEvents: 'none',
          transition: 'filter 0.18s',
          filter: pulse ? 'drop-shadow(0 0 32px #fff) brightness(2)' : 'none',
          width: 64,
          height: 64,
          transform: `translate(-50%, -50%) scale(${pulse ? 1.12 : 1})`,
          opacity: pulse ? 0.7 : 1,
        }}
        aria-label="Rocketship"
      >
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
            <ellipse cx="32" cy="54" rx="8" ry="4" fill="#222" fillOpacity="0.18"/>
            <path d="M32 6C36 16 44 32 32 58C20 32 28 16 32 6Z" fill="#ffe066" stroke="#a80000" strokeWidth="2"/>
            <circle cx="32" cy="20" r="6" fill="#fff" stroke="#a80000" strokeWidth="2"/>
            <rect x="29" y="44" width="6" height="10" rx="3" fill="#a80000"/>
            <polygon points="32,54 36,62 28,62" fill="#ffe066" stroke="#a80000" strokeWidth="1"/>
          </g>
        </svg>
      </div>
    </>
  )
}

// FireParticles: fire effect for card hover, emits along left/right edges
const FireParticles = ({ parentRef, active }) => {
  const canvasRef = useRef(null)
  const particles = useRef([])
  const MAX_PARTICLES = 200
  // Emit and animate particles
  useEffect(() => {
    if (!active) return
    let running = true
    function emit() {
      if (!running) return
      const parent = parentRef.current
      if (!parent) return requestAnimationFrame(emit)
      const rect = parent.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      // Emit 1 particle per frame from left and right edges, random y
      for (let i = 0; i < 1; ++i) {
        // Left edge
        let y = Math.random() * height
        let angle = Math.PI + (Math.random() - 0.5) * 0.7 // mostly leftward
        let speed = 18 + Math.random() * 12
        particles.current.push({
          x: 0,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: 12 + Math.random() * 8, // bigger radius
          life: 1,
          color: [
            [255, 255, 200],
            [255, 200, 80],
            [255, 80, 0]
          ][Math.floor(Math.random() * 3)]
        })
        // Right edge
        y = Math.random() * height
        angle = 0 + (Math.random() - 0.5) * 0.7 // mostly rightward
        speed = 18 + Math.random() * 12
        particles.current.push({
          x: width,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: 12 + Math.random() * 8, // bigger radius
          life: 1,
          color: [
            [255, 255, 200],
            [255, 200, 80],
            [255, 80, 0]
          ][Math.floor(Math.random() * 3)]
        })
      }
      if (particles.current.length > MAX_PARTICLES) {
        particles.current.splice(0, particles.current.length - MAX_PARTICLES)
      }
      requestAnimationFrame(emit)
    }
    requestAnimationFrame(emit)
    return () => { running = false }
  }, [active, parentRef])
  // Animate and draw
  useEffect(() => {
    if (!active) return
    let running = true
    let lastDraw = 0
    function draw(now) {
      if (!running) return
      if (now - lastDraw < 1000 / 30) {
        requestAnimationFrame(draw)
        return
      }
      lastDraw = now
      const canvas = canvasRef.current
      const parent = parentRef.current
      if (!canvas || !parent) return requestAnimationFrame(draw)
      const width = parent.offsetWidth
      const height = parent.offsetHeight
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, width, height)
      particles.current = particles.current.filter(p => p.life > 0)
      for (const p of particles.current) {
        p.x += p.vx * 0.016
        p.y += p.vy * 0.016
        p.r *= 0.985
        p.life -= 0.016 * 0.18
        const [r, g, b] = p.color
        ctx.save()
        ctx.globalAlpha = Math.max(0, p.life)
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r)
        grad.addColorStop(0, `rgba(${r},${g},${b},1)`)
        grad.addColorStop(0.3, `rgba(${r},${g},${b},0.7)`)
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI)
        ctx.fillStyle = grad
        ctx.shadowColor = `rgba(${r},${g},${b},0.7)`
        ctx.shadowBlur = 48 // bigger glow
        ctx.fill()
        ctx.restore()
      }
      requestAnimationFrame(draw)
    }
    requestAnimationFrame(draw)
    return () => { running = false }
  }, [active, parentRef])
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 4,
      }}
    />
  )
}

const Skills = () => {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)
  const isDesktop = useIsDesktop(900)
  const [hoveredCard, setHoveredCard] = useState(null)

  useEffect(() => {
    function onScroll() {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      if (rect.top < window.innerHeight - 80) setVisible(true)
    }

    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <div className="skills-wrapper" style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
    <section
      className="skills-section"
      id="skills"
      ref={ref}
      aria-labelledby="skills-heading"
        style={{ overflowX: 'hidden', position: 'relative', maxWidth: '100vw' }}
    >
      <Rocketship />
      <h2 className="skills-title" id="skills-heading">Skills</h2>
        <p className="skills-intro">A quick look at the technologies and tools I use to build, design, and deliver modern web solutions.</p>
        {isDesktop ? (
          <div className="skills-grid">
            {skills.map((skill, idx) => {
              const cardRef = useRef(null)
              return (
                <motion.div
                  className="skill-card"
                  key={skill.name}
                  ref={cardRef}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={visible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  onMouseEnter={() => setHoveredCard(skill.name)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{ position: 'relative', overflow: 'visible' }}
                >
                  <FireParticles parentRef={cardRef} active={hoveredCard === skill.name} />
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="skill-icon"
                    draggable="false"
                    loading="lazy"
                  />
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-bar-bg">
                      <div
                        className="skill-bar-fill"
                        style={{
                          width: visible ? skill.level + '%' : 0,
                          transition: 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)'
                        }}
                      >
                        {visible && !prefersReducedMotion && <FirecrackerSpark />}
                      </div>
                    </div>
                    <span className="skill-level">{skill.level}%</span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <div className="skills-swiper">
          <Swiper
            modules={[Navigation, Pagination, EffectCoverflow]}
            navigation
              pagination={{ clickable: true, el: '.skills-swiper-dots' }}
            effect="coverflow"
            centeredSlides
            slidesPerView={1}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 120,
              modifier: 2,
              slideShadows: false
            }}
            style={{ minHeight: 300 }}
          >
            {skills.map((skill, idx) => {
              const cardRef = useRef(null)
              return (
                <SwiperSlide key={skill.name} role="listitem">
                  <motion.div
                    className="skill-card"
                    ref={cardRef}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={visible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    onMouseEnter={() => setHoveredCard(skill.name)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{ position: 'relative', overflow: 'visible' }}
                  >
                    <FireParticles parentRef={cardRef} active={hoveredCard === skill.name} />
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="skill-icon"
                      draggable="false"
                      loading="lazy"
                    />
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <div className="skill-bar-bg">
                        <div
                          className="skill-bar-fill"
                          style={{
                            width: visible ? skill.level + '%' : 0,
                            transition: 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)'
                          }}
                        >
                          {visible && !prefersReducedMotion && <FirecrackerSpark />}
                        </div>
                      </div>
                      <span className="skill-level">{skill.level}%</span>
                    </div>
                  </motion.div>
                </SwiperSlide>
              )
            })}
          </Swiper>
            <div className="skills-swiper-dots" />
        </div>
        )}
    </section>
    </div>
  )
}

export default Skills

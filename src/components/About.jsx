import './About.scss'
import { useEffect, useState, useRef } from 'react'
import { Parallax } from 'react-scroll-parallax'
import { motion } from 'framer-motion'

const summary = `Web developer and machine learning enthusiast skilled in Python, Django, React, and modern web technologies. Experienced in IT support at Sumitomo Electric's Pilipinas Kyohritsu Inc. Built projects with BERT, Random Forest, and SVM. Passionate about building innovative, efficient web solutions.`

const techPngs = [
  { name: 'html', src: '/solis-portfolio/assets/html.png' },
  { name: 'css', src: '/solis-portfolio/assets/css.png' },
  { name: 'js', src: '/solis-portfolio/assets/js.png' },
  { name: 'bootstrap', src: '/solis-portfolio/assets/bootstrap.png' },
  { name: 'django', src: '/solis-portfolio/assets/django.png' },
  { name: 'python', src: '/solis-portfolio/assets/python.png' },
  { name: 'php', src: '/solis-portfolio/assets/php.png' },
  { name: 'mysql', src: '/solis-portfolio/assets/mysql.png' },
]

const LOGO_SIZE_DESKTOP = 120;
const LOGO_SIZE_MOBILE = 72;
const BASE_SPEED_DESKTOP = 0.35; // slower
const BASE_SPEED_MOBILE = 0.18; // slower

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDirection() {
  // -1 or 1 for x and y
  return (Math.random() < 0.5 ? -1 : 1);
}

const About = () => {
  const [typed, setTyped] = useState('')
  const [index, setIndex] = useState(0)
  const [shootingStar, setShootingStar] = useState({ show: false, start: { top: 0, left: 0 }, end: { top: 100, left: 100 }, angle: 90 })
  const [logoPositions, setLogoPositions] = useState([])
  const aboutRef = useRef(null)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600)

  // Typing effect
  useEffect(() => {
    if (index < summary.length) {
      const timeout = setTimeout(() => {
        setTyped(summary.slice(0, index + 1))
        setIndex(index + 1)
      }, 32)
      return () => clearTimeout(timeout)
    }
  }, [index])

  // Shooting star effect
  useEffect(() => {
    function getRandomTrajectory() {
      const fromEdge = Math.random() < 0.5 ? 'top' : 'left';
      let start, end, angle;
      if (fromEdge === 'top') {
        start = { top: 0, left: getRandomInt(10, 90) };
        end = { top: 100, left: getRandomInt(10, 90) };
        angle = Math.atan2(end.top - start.top, end.left - start.left) * 180 / Math.PI + 90;
      } else {
        start = { top: getRandomInt(10, 90), left: 0 };
        end = { top: getRandomInt(10, 90), left: 100 };
        angle = Math.atan2(end.top - start.top, end.left - start.left) * 180 / Math.PI + 90;
      }
      return { start, end, angle };
    }
    const interval = setInterval(() => {
      const traj = getRandomTrajectory();
      setShootingStar({ show: true, ...traj })
      setTimeout(() => setShootingStar(s => ({ ...s, show: false })), 1400)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Responsive logo size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600)
      if (aboutRef.current) {
        setContainerSize({
          width: aboutRef.current.offsetWidth,
          height: aboutRef.current.offsetHeight
        })
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Initialize logo positions and unique directions
  useEffect(() => {
    if (!containerSize.width || !containerSize.height) return;
    const n = techPngs.length;
    setLogoPositions(techPngs.map((_, i) => {
      const angle = (Math.PI * 2 * i) / n + Math.PI / n; // unique angle for each logo
      const speed = isMobile ? BASE_SPEED_MOBILE : BASE_SPEED_DESKTOP;
      return {
        x: getRandomInt(0, containerSize.width - (isMobile ? LOGO_SIZE_MOBILE : LOGO_SIZE_DESKTOP)),
        y: getRandomInt(0, containerSize.height - (isMobile ? LOGO_SIZE_MOBILE : LOGO_SIZE_DESKTOP)),
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed
      }
    }))
    // eslint-disable-next-line
  }, [containerSize.width, containerSize.height, isMobile])

  // Animate logo positions (DVD bounce)
  useEffect(() => {
    if (!containerSize.width || !containerSize.height || logoPositions.length !== techPngs.length) return;
    let raf;
    function animate() {
      setLogoPositions(prev => prev.map((pos, i) => {
        let { x, y, dx, dy } = pos;
        const size = isMobile ? LOGO_SIZE_MOBILE : LOGO_SIZE_DESKTOP;
        x += dx;
        y += dy;
        if (x <= 0 || x >= containerSize.width - size) dx *= -1;
        if (y <= 0 || y >= containerSize.height - size) dy *= -1;
        x = Math.max(0, Math.min(x, containerSize.width - size));
        y = Math.max(0, Math.min(y, containerSize.height - size));
        return { x, y, dx, dy };
      }))
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line
  }, [containerSize.width, containerSize.height, isMobile, logoPositions.length])

  return (
    <section id="about" className="about-section" ref={aboutRef}>
      <Parallax speed={-20}>
        <div className="about-bg" />
      </Parallax>
      {/* PNG tech logos in the background, DVD bounce */}
      <div className="about-tech-bg">
        {logoPositions.length === techPngs.length && techPngs.map((icon, i) => (
          <img
            key={icon.name}
            src={icon.src}
            alt=""
            aria-hidden="true"
            className={`about-tech-icon about-tech-icon-${icon.name}`}
            style={{
              left: logoPositions[i].x,
              top: logoPositions[i].y,
              width: isMobile ? LOGO_SIZE_MOBILE : LOGO_SIZE_DESKTOP,
              height: isMobile ? LOGO_SIZE_MOBILE : LOGO_SIZE_DESKTOP
            }}
            draggable="false"
          />
        ))}
      </div>
      {/* Shooting star */}
      {shootingStar.show && (
        <div
          className="shooting-star"
          style={{
            top: `${shootingStar.start.top}%`,
            left: `${shootingStar.start.left}%`,
            transform: `rotate(${shootingStar.angle}deg)`
          }}
      >
          <div className="shooting-star-head" />
          <div className="shooting-star-tail" />
        </div>
      )}
      <motion.div
        className="about-center-content"
        initial={{ opacity: 0, y: 100, scale: 0.92 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ type: 'spring', stiffness: 60, damping: 18, mass: 0.7 }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 60, scale: 0.92 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ type: 'spring', stiffness: 70, damping: 16, mass: 0.7 }}
        >
          About Jake Ronald Solis – Web Developer & Machine Learning Enthusiast
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 60, scale: 0.92 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ type: 'spring', stiffness: 70, damping: 16, mass: 0.7, delay: 0.1 }}
        >
          {typed}<span className="about-cursor">|</span>
        </motion.p>
      </motion.div>
    </section>
  )
}

export default About
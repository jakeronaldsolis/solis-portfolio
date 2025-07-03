import './Hero.scss'
import { motion } from 'framer-motion'
import { FaGithub, FaEnvelope, FaLinkedin, FaInstagram, FaFileAlt } from 'react-icons/fa'
import { useEffect, useRef } from 'react'

const NUM_SPARKS = 18

const getRandom = (min, max) => Math.random() * (max - min) + min

const Hero = () => {
  const sparksRef = useRef([])

  useEffect(() => {
    const interval = setInterval(() => {
      if (!sparksRef.current) return
      const sparks = document.querySelectorAll('.ironman-spark')
      sparks.forEach(spark => {
        spark.style.top = getRandom(10, 90) + '%'
        spark.style.left = getRandom(5, 95) + '%'
        spark.style.opacity = Math.random() * 0.7 + 0.3
        spark.style.transform = `scale(${getRandom(0.5, 1.2)}) rotate(${getRandom(0, 360)}deg)`
        spark.style.animationDuration = getRandom(0.7, 2.2) + 's'
      })
    }, 1200)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="hero-ironman">
      <div className="hero-bg-text">JAKE SOLIS</div>
      {/* Iron Man sparks */}
      {Array.from({ length: NUM_SPARKS }).map((_, i) => (
        <div
          key={i}
          className="ironman-spark"
          ref={el => (sparksRef.current[i] = el)}
          style={{
            top: getRandom(10, 90) + '%',
            left: getRandom(5, 95) + '%',
            opacity: Math.random() * 0.7 + 0.3,
            animationDuration: getRandom(0.7, 2.2) + 's',
            transform: `scale(${getRandom(0.5, 1.2)}) rotate(${getRandom(0, 360)}deg)`
          }}
        />
      ))}
      <div className="hero-center-content">
        <motion.img
          src="/solis-portfolio/assets/jakesolis.png"
          alt="Jake Solis"
          className="hero-ironman-img"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="hero-ironman-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          JAKE RONALD SOLIS
        </motion.div>
        <motion.p
          className="hero-ironman-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Web Developer · Machine Learning Enthusiast
        </motion.p>
        <motion.div
          className="hero-ironman-socials"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 1 }}
        >
          <a href="mailto:jakeronaldsolis@gmail.com" target="_blank" rel="noreferrer">
            <FaEnvelope />
          </a>
          <a href="/solis-portfolio/assets/Solis_Jake_Ronald.pdf" download target="_blank" rel="noopener noreferrer" aria-label="Download Resume" className="cv-download-btn">
            RESUME
          </a>
          <a href="https://www.instagram.com/padimsolis/" target="_blank" rel="noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero